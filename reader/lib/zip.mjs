/**
 * A minimal random-access ZIP reader, for .cbz.
 *
 * Two thirds of the library are zip archives, and a page request only ever
 * wants one entry out of forty. Reading the central directory and then seeking
 * straight to that entry costs a few kilobytes; shelling out to an extractor
 * would rewrite 40 MB to disk to answer a request for 800 KB.
 *
 * Deliberately partial: no ZIP64, no encryption, no split archives. Comic
 * archives are a few dozen images under 4 GB, so the 32-bit fields always fit.
 * Anything outside that throws rather than guessing, and the caller falls back
 * to the external extractor used for .cbr.
 */

import { open } from 'node:fs/promises'
import { inflateRaw } from 'node:zlib'
import { promisify } from 'node:util'

const inflate = promisify(inflateRaw)

const SIG_EOCD = 0x06054b50
const SIG_CD = 0x02014b50
const SIG_LOCAL = 0x04034b50

/** The end-of-central-directory record sits in the last 64 KB, after the comment. */
const findEocd = (buf) => {
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) !== SIG_EOCD) continue
    const commentLen = buf.readUInt16LE(i + 20)
    if (i + 22 + commentLen === buf.length) return i
  }
  return -1
}

/**
 * Entry list for an archive: `{ name, method, compressedSize, size, offset }`.
 * `offset` points at the local header, not the data — the data offset needs a
 * second read, because only the local header knows its own extra-field length.
 */
export async function listZip(path) {
  const fh = await open(path, 'r')
  try {
    const { size } = await fh.stat()
    const tailLen = Math.min(size, 65557 + 22)
    const tail = Buffer.alloc(tailLen)
    await fh.read(tail, 0, tailLen, size - tailLen)

    const eocd = findEocd(tail)
    if (eocd < 0) throw new Error('not a zip archive (no end-of-central-directory)')

    const count = tail.readUInt16LE(eocd + 10)
    const cdSize = tail.readUInt32LE(eocd + 12)
    const cdOffset = tail.readUInt32LE(eocd + 16)
    if (cdOffset === 0xffffffff || count === 0xffff) throw new Error('zip64 archive')

    const cd = Buffer.alloc(cdSize)
    await fh.read(cd, 0, cdSize, cdOffset)

    const entries = []
    let p = 0
    for (let i = 0; i < count && p + 46 <= cd.length; i++) {
      if (cd.readUInt32LE(p) !== SIG_CD) throw new Error('corrupt central directory')
      const method = cd.readUInt16LE(p + 10)
      const compressedSize = cd.readUInt32LE(p + 20)
      const uncompressedSize = cd.readUInt32LE(p + 24)
      const nameLen = cd.readUInt16LE(p + 28)
      const extraLen = cd.readUInt16LE(p + 30)
      const commentLen = cd.readUInt16LE(p + 32)
      const offset = cd.readUInt32LE(p + 42)
      const name = cd.toString('utf8', p + 46, p + 46 + nameLen)

      if (offset === 0xffffffff || compressedSize === 0xffffffff) throw new Error('zip64 entry')
      entries.push({ name, method, compressedSize, size: uncompressedSize, offset })
      p += 46 + nameLen + extraLen + commentLen
    }
    return entries
  } finally {
    await fh.close()
  }
}

/** The bytes of one entry, decompressed. Only stored and deflated are supported. */
export async function readZipEntry(path, entry) {
  const fh = await open(path, 'r')
  try {
    const head = Buffer.alloc(30)
    await fh.read(head, 0, 30, entry.offset)
    if (head.readUInt32LE(0) !== SIG_LOCAL) throw new Error(`bad local header for ${entry.name}`)

    const dataAt = entry.offset + 30 + head.readUInt16LE(26) + head.readUInt16LE(28)
    const raw = Buffer.alloc(entry.compressedSize)
    await fh.read(raw, 0, entry.compressedSize, dataAt)

    if (entry.method === 0) return raw
    if (entry.method === 8) return await inflate(raw)
    throw new Error(`unsupported compression method ${entry.method} for ${entry.name}`)
  } finally {
    await fh.close()
  }
}
