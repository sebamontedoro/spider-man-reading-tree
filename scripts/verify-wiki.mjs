#!/usr/bin/env node
/**
 * Pulls per-issue facts from Marvel Database and writes them as verified layers.
 *
 * Two things come out of a single crawl, because both live in the same page and
 * fetching twice would be gratuitous load on someone else's wiki:
 *
 *   data/cover-dates.json       real cover dates, replacing the generator's
 *                               interpolated estimates
 *   data/marvel-unlimited.json  Marvel's own issue id, which is what makes a
 *                               direct "read it here" link possible
 *
 * Both are layered over the generated dataset by src/lib/dataset.js. Anything
 * that cannot be confirmed is simply left out: the date estimate stands and
 * keeps its "~", and the issue is shown as having no known digital edition.
 *
 *   npm run verify:wiki            all issues
 *   npm run verify:wiki -- --only=amazing-spider-man-annual,marvel-tales
 *   npm run verify:wiki -- --missing       only issues not already verified
 *
 * The wiki API accepts 50 page titles per request, so the whole dataset costs
 * about twenty calls. Be a good citizen: the delay between batches stays.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ISSUES = resolve(ROOT, 'src/generated/issues.json')
const OUT = resolve(ROOT, 'data/cover-dates.json')
const OUT_MU = resolve(ROOT, 'data/marvel-unlimited.json')

const API = 'https://marvel.fandom.com/api.php'
const BATCH = 50
const DELAY_MS = 600

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
}

/* -- args ----------------------------------------------------------------- */

const args = process.argv.slice(2)
const onlyArg = args.find((a) => a.startsWith('--only='))
const only = onlyArg ? onlyArg.slice(7).split(',').map((s) => s.trim()) : null
const missingOnly = args.includes('--missing')

/* -- helpers -------------------------------------------------------------- */

const pageTitle = (issue) => `${issue.wikiTitle} ${issue.number}`

const field = (text, name) => {
  const m = text.match(new RegExp(`\\|\\s*${name}\\d*\\s*=\\s*([^\\n|]+)`))
  return m ? m[1].trim() : null
}

/**
 * Marvel used "Late September" and similar for semi-monthly shipping, so strip
 * the qualifier before looking the month up.
 */
const parseMonth = (raw) => {
  if (!raw) return null
  const cleaned = raw.toLowerCase().replace(/^(late|early|mid)\s+/, '').trim()
  return MONTHS[cleaned] || null
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchBatch(titles) {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    titles: titles.join('|'),
    format: 'json',
    formatversion: '2',
  })

  const res = await fetch(`${API}?${params}`, {
    headers: { 'User-Agent': 'spider-man-reading-tree/1.0 (local project)' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} on batch of ${titles.length}`)

  const data = await res.json()
  const out = new Map()

  for (const page of data?.query?.pages || []) {
    // Fandom normalises some titles; key on what it returns and reconcile after.
    const text = page?.revisions?.[0]?.slots?.main?.content
    if (!text) continue
    out.set(page.title, text)
  }
  return out
}

/* -- run ------------------------------------------------------------------ */

const issues = JSON.parse(readFileSync(ISSUES, 'utf8'))
const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {}
const existingMU = existsSync(OUT_MU) ? JSON.parse(readFileSync(OUT_MU, 'utf8')) : {}

let targets = issues
if (only) targets = targets.filter((i) => only.includes(i.series))
if (missingOnly) targets = targets.filter((i) => !existing[i.id])

console.log(`\n  Verifying ${targets.length} cover dates against Marvel Database`)
console.log(`  ${Math.ceil(targets.length / BATCH)} requests, ~${DELAY_MS}ms apart\n`)

const verified = { ...existing }
const unlimited = { ...existingMU }
let withMU = 0
let found = 0
let missing = 0
let changed = 0
const notFound = []

for (let i = 0; i < targets.length; i += BATCH) {
  const slice = targets.slice(i, i + BATCH)
  const titles = slice.map(pageTitle)

  let pages
  try {
    pages = await fetchBatch(titles)
  } catch (err) {
    console.error(`  batch ${i / BATCH + 1} failed: ${err.message}`)
    await sleep(DELAY_MS * 3)
    continue
  }

  for (const issue of slice) {
    const text = pages.get(pageTitle(issue))
    if (!text) {
      missing++
      notFound.push(issue.id)
      continue
    }

    const year = field(text, 'Year')
    const month = parseMonth(field(text, 'Month'))
    if (!year || !/^\d{4}$/.test(year)) {
      missing++
      notFound.push(issue.id)
      continue
    }

    // Marvel's own catalogue id for the issue. Its presence is what lets the
    // detail panel link straight to the issue instead of a fuzzy site search.
    const muId = field(text, 'MarvelUnlimitedID')
    if (muId && /^\d+$/.test(muId)) {
      unlimited[issue.id] = Number(muId)
      withMU++
    }

    // Annuals and some specials carry a year with no month. Keep the generated
    // month in that case rather than inventing one, but trust the year.
    const finalMonth = month || Number(issue.coverDate.split('-')[1])
    const coverDate = `${year}-${String(finalMonth).padStart(2, '0')}`

    if (verified[issue.id]?.coverDate !== coverDate) changed++
    verified[issue.id] = {
      coverDate,
      monthKnown: Boolean(month),
    }
    found++
  }

  const done = Math.min(i + BATCH, targets.length)
  process.stdout.write(`\r  ${done}/${targets.length}  verified ${found}  unresolved ${missing}   `)
  if (i + BATCH < targets.length) await sleep(DELAY_MS)
}

writeFileSync(OUT, JSON.stringify(verified, null, 0) + '\n')
writeFileSync(OUT_MU, JSON.stringify(unlimited, null, 0) + '\n')

console.log(`\n`)
console.log(`  dates verified   ${found}`)
console.log(`  unresolved       ${missing}`)
console.log(`  changed          ${changed}`)
console.log(`  digital edition  ${withMU} of ${targets.length} have a Marvel issue id`)

if (notFound.length) {
  console.log(`\n  Unresolved (estimate retained):`)
  for (const id of notFound.slice(0, 15)) console.log(`   · ${id}`)
  if (notFound.length > 15) console.log(`   … and ${notFound.length - 15} more`)
}

/* -- how far off were the estimates? -------------------------------------- */

const mi = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

const deltas = issues
  .filter((i) => verified[i.id])
  .map((i) => Math.abs(mi(i.coverDate) - mi(verified[i.id].coverDate)))

if (deltas.length) {
  const exact = deltas.filter((d) => d === 0).length
  const within1 = deltas.filter((d) => d <= 1).length
  console.log(`\n  Estimate accuracy before this run:`)
  console.log(`   exact          ${exact} (${((exact / deltas.length) * 100).toFixed(1)}%)`)
  console.log(`   within 1 month ${within1} (${((within1 / deltas.length) * 100).toFixed(1)}%)`)
  console.log(`   worst          ${Math.max(...deltas)} months off`)
}

console.log(`\n  → ${OUT}`)
console.log(`  → ${OUT_MU}\n`)
