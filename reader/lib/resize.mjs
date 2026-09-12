/**
 * Pages sized to the screen that reads them.
 *
 * A scanned page is typically 2000×3000 and 1.5–2.5 MB, because zoom needs the
 * pixels. A phone does not, until it zooms: one 1220-pixel-wide screen shows a
 * fitted page with a third of them, and pays for all of them twice — once on
 * the wire and once decoded, at 24 MB of bitmap a page, with the reader holding
 * three pages ahead.
 *
 * So a page can be asked for at a width, and is then resized by libvips — an
 * external binary, like bsdtar, so the service still ships no npm code. Widths
 * come from a short fixed list rather than whatever the client measures, which
 * keeps both caches useful: every phone of a similar size asks for the same URL,
 * and the disk holds at most four copies of a page, not one per window size.
 *
 * The client never depends on this working. `widths` is empty when there is no
 * libvips, and a page libvips cannot read comes back as the original.
 */

import { spawn, execFile } from 'node:child_process'
import { availableParallelism } from 'node:os'
import { mkdir, readFile, rename, utimes, writeFile } from 'node:fs/promises'
import path from 'node:path'

/** What the client may ask for. Anything wider is served as the original. */
const WIDTHS = [720, 1080, 1440, 1920]

// Quality 82 is where the halftone and the lettering stop showing blocks at
// phone density; above it the bytes grow faster than anything visible.
const ENCODE = '.jpg[Q=82,keep=none]'

let available = null

/** Whether libvips is installed. Probed once; the answer does not change. */
export function resizer() {
  if (available) return available
  available = new Promise((resolve) => {
    execFile('vips', ['--version'], (err) => resolve(!err))
  })
  return available
}

/** The widths this service can produce — empty without libvips. */
export async function widths() {
  return (await resizer()) ? WIDTHS : []
}

export const isWidth = (w) => WIDTHS.includes(w)

/* -- one resize ------------------------------------------------------------- */

/**
 * Resizing is the one CPU-bound thing the service does, and a reader turning
 * pages asks for three at once. A small pool keeps a burst from starving the
 * rest of the host; the queue is short because the client asks for little.
 */
const POOL = Math.max(1, Math.min(3, Math.floor(availableParallelism() / 2)))
let running = 0
const queue = []

const slot = () =>
  running < POOL
    ? (running++, Promise.resolve())
    : new Promise((resolve) => queue.push(resolve))

const release = () => {
  const next = queue.shift()
  if (next) next()
  else running--
}

/**
 * `bytes` in, JPEG `width` pixels wide out, over stdin and stdout so a zip page
 * never touches the disk. `--size down` never enlarges: a page already narrower
 * than the width comes back at its own size, re-encoded. The height is left
 * free — thumbnail otherwise treats the width as a bounding box and returns a
 * page 1440 *tall*.
 */
async function vipsResize(bytes, width) {
  await slot()
  try {
    return await new Promise((resolve, reject) => {
      const p = spawn('vips', [
        'thumbnail_source', '[descriptor=0]', ENCODE, String(width),
        '--height', '100000', '--size', 'down',
      ])
      const out = []
      let err = ''
      p.stdout.on('data', (c) => out.push(c))
      p.stderr.on('data', (c) => { err += c })
      p.on('error', reject)
      p.on('close', (code) =>
        code === 0 && out.length
          ? resolve(Buffer.concat(out))
          : reject(new Error(err.trim().split('\n')[0] || `vips exited ${code}`)))
      // A page it cannot parse ends the process before stdin drains.
      p.stdin.on('error', () => {})
      p.stdin.end(bytes)
    })
  } finally {
    release()
  }
}

/* -- cached ----------------------------------------------------------------- */

/**
 * One directory per comic and width, at the top of the cache, so the existing
 * eviction — whole directories, least recently read first — covers these with
 * no changes. Reading a page touches its directory for the same reason.
 */
const dirFor = (cacheRoot, comicKey, width) => path.join(cacheRoot, `${comicKey}-w${width}`)

const inFlight = new Map()

/**
 * The page at `width`: `{ bytes, type }`. `original` is a thunk so a cache hit
 * never opens the archive at all.
 *
 * The resize has to earn its place. A page already narrower than the width is
 * only re-encoded, which loses quality and can save as little as 1% — so it
 * wins only when it is at least a tenth lighter. A page that fails to resize is
 * served as it came: the original is always a correct answer.
 */
export async function sizedPage({ cacheRoot, comicKey, n, width, original, type }) {
  const dir = dirFor(cacheRoot, comicKey, width)
  const file = path.join(dir, `${n}`)

  try {
    const bytes = await readFile(file)
    utimes(dir, new Date(), new Date()).catch(() => {})
    return { bytes, type: bytes[0] === 0xff && bytes[1] === 0xd8 ? 'image/jpeg' : type }
  } catch { /* not made yet */ }

  if (inFlight.has(file)) return inFlight.get(file)

  const job = (async () => {
    const src = await original()
    let bytes = src
    let outType = type
    try {
      const sized = await vipsResize(src, width)
      if (sized.length < src.length * 0.9) { bytes = sized; outType = 'image/jpeg' }
    } catch (err) {
      console.log(new Date().toISOString(), `resize failed, serving original: ${err.message}`)
    }

    // Written aside and renamed, so a request arriving mid-write never reads
    // half a page. A failure here costs a cache entry, not the response.
    try {
      await mkdir(dir, { recursive: true })
      const tmp = `${file}.${process.pid}.tmp`
      await writeFile(tmp, bytes)
      await rename(tmp, file)
    } catch { /* evicted underneath us, or the cache is read-only */ }

    return { bytes, type: outType }
  })().finally(() => inFlight.delete(file))

  inFlight.set(file, job)
  return job
}
