/**
 * Reading pages out of a comic archive, whichever container it happens to be.
 *
 * The library is two thirds .cbz (zip) and one third .cbr (rar), and the two
 * are handled differently on purpose:
 *
 *   zip  read in process, seeking straight to the one entry a request wants.
 *   rar  extracted once, whole, into the page cache by an external tool, then
 *        served from disk. Unpacking 40 MB once beats re-scanning the archive
 *        on every page turn, and libarchive reads both RAR3 and RAR5.
 *
 * The extension is a hint, not a fact — misnamed .cbz files that are really
 * RAR are common in scanned collections — so the container is decided by the
 * archive's magic bytes.
 */

import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, open, readFile, readdir, rm, stat, utimes } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

import { listZip, readZipEntry } from './zip.mjs'

const run = promisify(execFile)

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.avif'])

export const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.gif': 'image/gif', '.webp': 'image/webp', '.bmp': 'image/bmp',
  '.avif': 'image/avif',
}

/** Junk every scanned collection carries: resource forks, metadata, thumbs. */
const isPage = (name) => {
  const base = path.basename(name)
  if (name.endsWith('/')) return false
  if (base.startsWith('.') || name.includes('__MACOSX')) return false
  return IMAGE_EXT.has(path.extname(base).toLowerCase())
}

/**
 * Page order is the archive's own filename order, compared numerically.
 * Plain string sort puts page 10 before page 2 whenever a scanner did not
 * zero-pad, which is often enough to matter.
 */
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
const byName = (a, b) => collator.compare(a, b)

/* -- container detection ---------------------------------------------------- */

export async function containerOf(file) {
  const fh = await open(file, 'r')
  try {
    const magic = Buffer.alloc(8)
    const { bytesRead } = await fh.read(magic, 0, 8, 0)
    if (bytesRead >= 4 && magic.subarray(0, 4).toString('latin1') === 'PK\x03\x04') return 'zip'
    if (bytesRead >= 4 && magic.subarray(0, 4).toString('latin1') === 'Rar!') return 'rar'
    if (bytesRead >= 6 && magic.subarray(0, 6).toString('latin1') === '7z\xbc\xaf\x27\x1c') return '7z'
    return 'unknown'
  } finally {
    await fh.close()
  }
}

/* -- listing ---------------------------------------------------------------- */

/**
 * Which external extractor this host actually has.
 *
 * All three of these can *list* a rar; not all of them can decompress one.
 * Debian's `7z` ships without the RAR decoder because its licence is not free,
 * so it lists an archive happily and then fails every entry with "Unsupported
 * Method". libarchive's own RAR reader has no such restriction, which is why
 * `bsdtar` leads the order and is what the container installs.
 *
 * Probed lazily, once per binary, and chosen per container: a .cb7 needs a
 * 7-Zip, a .cbr does not.
 */
const TOOLS = {
  bsdtar: {
    probe: ['--version'],
    list: (f) => ['-tf', f],
    extract: (f, d) => ['-xf', f, '-C', d],
    parse: (out) => out.split('\n').map((l) => l.trim()).filter(Boolean),
  },
  unrar: {
    probe: ['-inul'],
    list: (f) => ['lb', '-idq', f],
    // unrar takes its destination as a positional argument, and wants the
    // trailing separator to read it as a directory rather than a new name.
    extract: (f, d) => ['x', '-y', '-idq', f, d + path.sep],
    parse: (out) => out.split('\n').map((l) => l.trim()).filter(Boolean),
  },
  sevenzip: {
    bins: ['7zz', '7z', '7za'],
    probe: ['--help'],
    list: (f) => ['l', '-ba', '-slt', f],
    extract: (f, d) => ['x', '-y', '-bd', `-o${d}`, f],
    // -slt prints a block per entry; only the Path lines matter, and directory
    // entries are filtered out later by their lack of an image suffix.
    parse: (out) => out.split('\n')
      .filter((l) => l.startsWith('Path = '))
      .map((l) => l.slice(7).trim())
      .filter(Boolean),
  },
}

const PREFERENCE = {
  rar: ['bsdtar', 'unrar', 'sevenzip'],
  '7z': ['sevenzip', 'bsdtar'],
}

const probed = new Map()

/** Resolves a tool to the first of its binaries that is actually installed. */
async function resolve(name) {
  if (probed.has(name)) return probed.get(name)
  const spec = TOOLS[name]
  const job = (async () => {
    for (const bin of spec.bins || [name]) {
      try {
        await run(bin, spec.probe, { maxBuffer: 1 << 20 })
        return { ...spec, bin }
      } catch (err) {
        // A non-zero exit still proves the binary exists; only "not found" rules it out.
        if (err.code !== 'ENOENT') return { ...spec, bin }
      }
    }
    return null
  })()
  probed.set(name, job)
  return job
}

async function getExtractor(container) {
  for (const name of PREFERENCE[container] || []) {
    const tool = await resolve(name)
    if (tool) return tool
  }
  throw new Error(
    `no extractor available for ${container} archives — install bsdtar (libarchive-tools), unrar or p7zip`,
  )
}

async function listExternal(file, container) {
  const e = await getExtractor(container)
  // 7z's verbose listing is far larger than the default buffer allows.
  const { stdout } = await run(e.bin, e.list(file), { maxBuffer: 32 << 20 })
  return e.parse(stdout)
}

/**
 * The ordered page names inside an archive, plus the container it turned out
 * to be. Cheap for zip (central directory only); for rar this reads the
 * archive's index, not its contents.
 */
export async function listPages(file) {
  const container = await containerOf(file)

  let names
  if (container === 'zip') {
    const entries = await listZip(file)
    const pages = entries.filter((e) => isPage(e.name)).sort((a, b) => byName(a.name, b.name))
    return { container, names: pages.map((e) => e.name), entries: pages }
  }

  if (container === 'rar' || container === '7z') {
    names = (await listExternal(file, container)).filter(isPage).sort(byName)
    return { container, names }
  }

  throw new Error(`unrecognised archive container for ${path.basename(file)}`)
}

/* -- extraction ------------------------------------------------------------- */

/**
 * Extracting the same archive twice concurrently would have two extractor
 * processes writing the same files. One in-flight promise per archive, shared
 * by every request that arrives while it runs.
 */
const inFlight = new Map()

const cacheDirFor = (root, file) =>
  path.join(root, createHash('sha1').update(file).digest('hex').slice(0, 16))

async function extractAll(file, dir, container) {
  await mkdir(dir, { recursive: true })
  try {
    const e = await getExtractor(container)
    await run(e.bin, e.extract(file, dir), { maxBuffer: 32 << 20 })
  } catch (err) {
    // A half-written directory would be served as a truncated comic.
    await rm(dir, { recursive: true, force: true })
    throw err
  }
}

async function ensureExtracted(file, dir, container) {
  const marker = path.join(dir, '.complete')
  try {
    await stat(marker)
    await utimes(dir, new Date(), new Date())   // touch: the cache evicts by age
    return
  } catch { /* not extracted yet */ }

  if (inFlight.has(dir)) return inFlight.get(dir)

  const job = (async () => {
    await extractAll(file, dir, container)
    const fh = await open(marker, 'w')
    await fh.close()
  })().finally(() => inFlight.delete(dir))

  inFlight.set(dir, job)
  return job
}

/**
 * The bytes of one page. `pages` is the listing from `listPages`, so the
 * caller does not pay to re-open the archive index on every page turn.
 */
export async function readPage(file, pages, index, cacheRoot) {
  const name = pages.names[index]
  if (name === undefined) throw new Error(`page ${index + 1} is out of range`)

  if (pages.container === 'zip') {
    const entry = pages.entries[index]
    return readZipEntry(file, entry)
  }

  const dir = cacheDirFor(cacheRoot, file)
  await ensureExtracted(file, dir, pages.container)
  return readFile(path.join(dir, name))
}

/* -- cache eviction --------------------------------------------------------- */

const dirSize = async (dir) => {
  let total = 0
  for (const e of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (!e.isFile()) continue
    try { total += (await stat(path.join(e.parentPath ?? e.path, e.name))).size } catch { /* raced */ }
  }
  return total
}

/**
 * Keeps the extracted-page cache under a ceiling, dropping whole comics
 * least-recently-read first. Reading a comic touches its directory, so this
 * evicts by "not opened in a while" rather than "unpacked a while ago".
 */
export async function evictCache(root, maxBytes) {
  let dirs
  try {
    dirs = await readdir(root, { withFileTypes: true })
  } catch { return { evicted: 0, bytes: 0 } }

  const entries = []
  let total = 0
  for (const d of dirs) {
    if (!d.isDirectory()) continue
    const full = path.join(root, d.name)
    if (inFlight.has(full)) continue
    try {
      const [{ mtimeMs }, bytes] = await Promise.all([stat(full), dirSize(full)])
      entries.push({ full, mtimeMs, bytes })
      total += bytes
    } catch { /* raced with another eviction */ }
  }

  entries.sort((a, b) => a.mtimeMs - b.mtimeMs)
  let evicted = 0
  let freed = 0
  while (total > maxBytes && entries.length) {
    const victim = entries.shift()
    await rm(victim.full, { recursive: true, force: true }).catch(() => {})
    total -= victim.bytes
    freed += victim.bytes
    evicted++
  }
  return { evicted, bytes: freed, remaining: total }
}
