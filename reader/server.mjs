#!/usr/bin/env node
/**
 * The comic reader service.
 *
 * A small companion to the static site: it holds nothing the site knows about
 * issues, and the site holds nothing about files on disk. This end indexes a
 * directory of .cbz/.cbr archives and serves individual page images out of
 * them; the browser end matches those archives to issues using the dataset it
 * already has.
 *
 *   GET /api/health                    liveness, plus what the shelf looks like
 *   GET /api/library                   the manifest: every archive and the
 *                                      issue ids it could be, best guess first
 *   GET /api/comic/:key                page count and page names for one comic
 *   GET /api/comic/:key/page/:n        one page, as its original image bytes
 *
 * `:key` is a hash of the archive's path in the manifest, never a path from
 * the request — the service will not open a file it did not index.
 *
 * Nothing is written to the shelf: it is mounted read-only, and extracted rar
 * pages go to a separate cache volume that is safe to delete at any time.
 */

import http from 'node:http'
import path from 'node:path'
import { access, mkdir } from 'node:fs/promises'
import { constants as FS } from 'node:fs'

import { scanLibrary } from './lib/index.mjs'
import { evictCache, listPages, readPage, MIME } from './lib/archive.mjs'

const COMICS_DIR = process.env.COMICS_DIR || '/comics'
const CACHE_DIR = process.env.CACHE_DIR || '/cache'
const CACHE_MAX_BYTES = Number(process.env.CACHE_MAX_BYTES || 4 * 1024 ** 3)
const PORT = Number(process.env.PORT || 8787)
const SCAN_TTL_MS = Number(process.env.SCAN_TTL_MS || 5 * 60_000)
const CACHE_SWEEP_MS = Number(process.env.CACHE_SWEEP_MS || 10 * 60_000)

const log = (...a) => console.log(new Date().toISOString(), ...a)

/* -- the manifest ----------------------------------------------------------- */

let manifest = null
let manifestAt = 0
let scanning = null

async function getManifest(force = false) {
  if (!force && manifest && Date.now() - manifestAt < SCAN_TTL_MS) return manifest
  if (scanning) return scanning

  scanning = (async () => {
    const started = Date.now()
    const comics = await scanLibrary(COMICS_DIR)
    manifest = {
      version: 1,
      scannedAt: new Date().toISOString(),
      count: comics.length,
      matchable: comics.filter((c) => c.ids.length > 0).length,
      comics,
    }
    manifestAt = Date.now()
    log(`indexed ${comics.length} archives in ${Date.now() - started}ms`)
    return manifest
  })().finally(() => { scanning = null })

  return scanning
}

/** Page listings are stable for the life of a file; opening one costs a read. */
const pageCache = new Map()

async function getPages(comic) {
  const hit = pageCache.get(comic.key)
  if (hit) return hit
  const pages = await listPages(path.join(COMICS_DIR, comic.file))
  pageCache.set(comic.key, pages)
  return pages
}

/* -- responses -------------------------------------------------------------- */

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, { 'Content-Length': Buffer.byteLength(body), ...headers })
  res.end(body)
}

const sendJson = (res, status, obj, headers = {}) =>
  send(res, status, JSON.stringify(obj), { 'Content-Type': 'application/json; charset=utf-8', ...headers })

const notFound = (res, what) => sendJson(res, 404, { error: what })

/* -- routes ----------------------------------------------------------------- */

async function route(req, res, url) {
  const parts = url.pathname.replace(/^\/+|\/+$/g, '').split('/')
  if (parts[0] !== 'api') return notFound(res, 'not found')

  if (parts[1] === 'health' && parts.length === 2) {
    const m = await getManifest()
    return sendJson(res, 200, {
      ok: true,
      root: COMICS_DIR,
      archives: m.count,
      matchable: m.matchable,
      scannedAt: m.scannedAt,
    })
  }

  if (parts[1] === 'library' && parts.length === 2) {
    const m = await getManifest(url.searchParams.get('refresh') === '1')
    // The manifest is a few hundred kilobytes and changes only when the shelf
    // does; a short cache keeps a page reload from re-fetching it.
    return sendJson(res, 200, m, { 'Cache-Control': 'public, max-age=60' })
  }

  if (parts[1] === 'comic' && parts.length >= 3) {
    const m = await getManifest()
    const comic = m.comics.find((c) => c.key === parts[2])
    if (!comic) return notFound(res, 'no such comic')

    // GET /api/comic/:key — the page index.
    if (parts.length === 3) {
      const pages = await getPages(comic)
      return sendJson(res, 200, {
        key: comic.key,
        file: comic.file,
        container: pages.container,
        bytes: comic.bytes,
        count: pages.names.length,
        names: pages.names,
      }, { 'Cache-Control': 'public, max-age=3600' })
    }

    // GET /api/comic/:key/page/:n — one page, 1-based.
    if (parts[3] === 'page' && parts.length === 5) {
      const n = Number(parts[4])
      if (!Number.isInteger(n) || n < 1) return sendJson(res, 400, { error: 'page must be a positive integer' })

      const pages = await getPages(comic)
      if (n > pages.names.length) return notFound(res, `comic has ${pages.names.length} pages`)

      const name = pages.names[n - 1]
      const type = MIME[path.extname(name).toLowerCase()] || 'application/octet-stream'
      const etag = `"${comic.key}-${n}-${comic.bytes}"`

      if (req.headers['if-none-match'] === etag) {
        res.writeHead(304, { ETag: etag, 'Cache-Control': 'public, max-age=86400' })
        return res.end()
      }

      const bytes = await readPage(path.join(COMICS_DIR, comic.file), pages, n - 1, CACHE_DIR)
      return send(res, 200, bytes, {
        'Content-Type': type,
        ETag: etag,
        'Cache-Control': 'public, max-age=86400',
      })
    }
  }

  return notFound(res, 'not found')
}

/* -- server ----------------------------------------------------------------- */

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { error: 'only GET' }, { Allow: 'GET, HEAD' })
  }

  route(req, res, url).catch((err) => {
    log('error', url.pathname, err.message)
    if (!res.headersSent) sendJson(res, 500, { error: err.message })
    else res.end()
  })
})

// Pages are large and the client is on the far side of a proxy; the default
// 5s header timeout is fine, but a slow first rar extraction is not a stall.
server.requestTimeout = 120_000
server.headersTimeout = 65_000

/**
 * Rar pages are unpacked into the cache, so a cache that cannot be written to
 * means every .cbr on the shelf fails — one request at a time, with a
 * permission error nobody is reading. Say so once, loudly, at startup instead:
 * the usual cause is a bind-mounted host directory owned by root, where the
 * container runs unprivileged.
 */
async function checkCache() {
  await mkdir(CACHE_DIR, { recursive: true }).catch(() => {})
  try {
    await access(CACHE_DIR, FS.W_OK)
  } catch {
    log(`WARNING: ${CACHE_DIR} is not writable — .cbr archives cannot be read.`)
    log('         Give it to this process\'s user, or use a named volume.')
  }
}

const sweepCache = () =>
  evictCache(CACHE_DIR, CACHE_MAX_BYTES)
    .then((r) => {
      if (r.evicted) log(`cache: evicted ${r.evicted} comics, freed ${(r.bytes / 1e6).toFixed(0)} MB`)
    })
    .catch((err) => log('cache sweep failed:', err.message))

await checkCache()

server.listen(PORT, () => {
  log(`reader listening on :${PORT}  shelf=${COMICS_DIR}  cache=${CACHE_DIR}`)
  getManifest().catch((err) => log('initial scan failed:', err.message))
  // A restart is the moment the cache is most likely to be over its ceiling,
  // because nothing swept it while the service was down.
  sweepCache()
})

const sweep = setInterval(sweepCache, CACHE_SWEEP_MS)
sweep.unref()

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => { log(`${sig} — shutting down`); server.close(() => process.exit(0)) })
}
