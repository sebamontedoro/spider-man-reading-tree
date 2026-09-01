/**
 * Turning a directory of .cbz/.cbr files into a manifest the reading tree can
 * match against.
 *
 * The service never decides which issue a file *is*. It parses a series title
 * and an issue number out of the filename, turns those into candidate issue
 * ids in priority order, and lets the browser — which holds the dataset —
 * take the first candidate that exists. That keeps the two sides independent:
 * adding issues to the tree needs no redeploy here, and adding comics to the
 * shelf needs no rebuild there.
 */

import { createHash } from 'node:crypto'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import { LIBRARY_FOLDERS } from '../../data/library.js'
import { SERIES } from '../../data/series.js'

const ARCHIVE_EXT = new Set(['.cbz', '.cbr', '.cb7', '.zip', '.rar'])

/** `The Amazing Spider-Man Annual` and `amazing spider-man annual` are one key. */
const normalise = (title) =>
  title
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/\bvol(?:ume)?\.?\s+\d+\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

/**
 * Series name → candidate keys, derived from data/series.js so that dropping a
 * folder of, say, Web of Spider-Man onto the shelf resolves without anyone
 * editing a mapping first. Names collide by design — "amazing spider man"
 * belongs to six volumes — so every value is a list in dataset order, and the
 * browser picks the volume whose numbering actually contains the issue.
 */
const TITLE_FALLBACK = (() => {
  const map = new Map()
  const add = (title, key) => {
    if (!title) return
    const k = normalise(title)
    if (!k) return
    const list = map.get(k) || []
    if (!list.includes(key)) list.push(key)
    map.set(k, list)
  }
  for (const s of SERIES) {
    add(s.name, s.key)
    add(s.wikiTitle, s.key)
    add(s.abbr, s.key)
  }
  return map
})()

/**
 * Scene-release filenames are a title, a number, then a pile of parenthesised
 * tags: scanner, year, format. Everything before the first tag is therefore
 * "<title> <number>", and reading only that far is what makes the parse robust
 * against how badly the tags themselves are formed. Sixty-one files on the
 * shelf have an unclosed bracket, and five carry a bare "c2c" after the last
 * group; stripping balanced groups instead would lose the number in all of them.
 *
 *   "Amazing Spider-Man 700.3 (2014) (digital-Empire).cbr"        → 700.3
 *   "Amazing Spider-Man Annual 003(1966)(Digital)(TLK).cbr"       → 3
 *   "Amazing Spider-Man -001 (1997) (FB-DCP)(C2C).cbr"            → -1
 *   "Amazing Spider-Man 214 (1981) (Digital) (Shadowcat-Empire"   → 214
 *   "Amazing Spider-Man Annual 007 (1970) [Marvel] (dcp) c2c.cbr" → 7
 */
const trailingNumber = (s) => {
  const m = /^(.*?)[\s#]*(-?\d+(?:\.\d+)?)$/.exec(s)
  if (!m) return null
  const raw = Number(m[2])
  if (!Number.isFinite(raw)) return null
  // "001" and "1" are the same issue; "700.3" is not issue 700.
  const number = Number.isInteger(raw) ? String(raw) : m[2].replace(/^-?0+(?=\d)/, (z) => z[0] === '-' ? '-' : '')
  return { title: m[1].trim(), number }
}

export function parseFilename(base) {
  const stem = base.replace(/\.[^.]+$/, '')

  const head = stem.split(/[([{]/)[0].trim()
  const fromHead = trailingNumber(head)
  if (fromHead) return fromHead

  // A descriptor can follow the number instead of going in a bracket, as in
  // "Amazing Fantasy 015 - Facsimile Edition (1962)". Cutting at the dash and
  // retrying costs nothing when there is no dash, and only ever accepts a
  // result that still ends in a number.
  const beforeDash = trailingNumber(head.split(/\s+[-\u2013\u2014]\s+/)[0].trim())
  if (beforeDash) return beforeDash

  // Or the descriptor is a bare word: "Spectacular Spider-Man V1 -1 Flashback".
  // Drop one trailing word and retry — one, not any number of them, because
  // each extra word dropped is another chance to read a year or a volume as
  // the issue number.
  const dropped = trailingNumber(head.replace(/\s+\S+$/, ''))
  if (dropped) return dropped

  // No number before the first tag — a filename like "ASM (1963) 001". Fall
  // back to removing the balanced groups and reading what is left.
  const stripped = stem.replace(/[([{][^)\]}]*[)\]}]/g, ' ').replace(/\s+/g, ' ').trim()
  return trailingNumber(stripped) || { title: stem, number: null }
}

/** Issue ids this file could be, best guess first. */
function candidatesFor(relDir, title, number) {
  if (number === null) return []
  const folder = LIBRARY_FOLDERS.find((f) => f.dir === relDir)

  // A folder may pin a number to specific issues, for the files whose name is
  // simply wrong about which issue they hold.
  const alias = folder?.aliases?.[number]
  if (alias) return alias

  // …and it may route by what the filename calls the book, for the folders
  // that hold a run and its annuals together: "Spectacular Spider-Man V1 12"
  // and "Spectacular Spider-Man V1 Annual 12" are both number 12, and only the
  // title tells them apart. Keys are substrings of the normalised title,
  // tested in order.
  if (folder?.titles) {
    const t = normalise(title)
    for (const [needle, keys] of Object.entries(folder.titles)) {
      if (t.includes(needle)) return keys.map((k) => `${k}-${number}`)
    }
  }

  const keys = folder ? folder.series : (TITLE_FALLBACK.get(normalise(title)) || [])
  return keys.map((k) => `${k}-${number}`)
}

const keyFor = (rel) => createHash('sha1').update(rel).digest('hex').slice(0, 16)

/**
 * Walks the shelf. Returns one entry per archive, sorted by path so the
 * manifest is stable between restarts and cheap to diff.
 */
export async function scanLibrary(root, { maxDepth = 4 } = {}) {
  const comics = []

  const walk = async (dir, depth) => {
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return   // unreadable subdirectory: skip it rather than fail the scan
    }
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (depth < maxDepth) await walk(full, depth + 1)
        continue
      }
      if (!e.isFile()) continue
      if (!ARCHIVE_EXT.has(path.extname(e.name).toLowerCase())) continue

      const rel = path.relative(root, full)
      const { title, number } = parseFilename(e.name)
      let bytes = 0
      try { bytes = (await stat(full)).size } catch { /* vanished mid-scan */ }

      comics.push({
        key: keyFor(rel),
        file: rel,
        dir: path.dirname(rel) === '.' ? '' : path.dirname(rel),
        title,
        number,
        bytes,
        ids: candidatesFor(path.dirname(rel), title, number),
      })
    }
  }

  await walk(root, 0)
  comics.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0))
  return comics
}
