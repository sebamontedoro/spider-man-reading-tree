#!/usr/bin/env node
/**
 * Expands data/series.js into src/generated/issues.json.
 *
 * This file is the ONLY thing that writes issues.json. The output is disposable
 * and regenerated from scratch every run — never hand-edit it. All curation
 * lives in data/ (overrides, appearances, arcs, paths) and is merged at runtime
 * by src/lib/dataset.js.
 *
 *   npm run build:data
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SERIES } from '../data/series.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'src/generated/issues.json')

const RANGE_START = '1962-01'
const RANGE_END = '2020-12'

/* -- date helpers: months since year 0, so arithmetic is plain integers ---- */

const toMonthIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

const fromMonthIndex = (idx) => {
  const y = Math.floor(idx / 12)
  const m = (idx % 12) + 1
  return `${y}-${String(m).padStart(2, '0')}`
}

/**
 * Spread `count` issues evenly between two month anchors.
 * Interpolating between verified endpoints beats accumulating a fixed cadence:
 * a run of 300 issues drifts by years if each step just adds a month.
 */
const interpolate = (startYm, endYm, count) => {
  const a = toMonthIndex(startYm)
  const b = endYm ? toMonthIndex(endYm) : a + count - 1
  if (count === 1) return [a]
  const span = b - a
  return Array.from({ length: count }, (_, i) =>
    a + Math.round((i * span) / (count - 1)),
  )
}

/**
 * Annuals are yearly, so interpolate over years rather than months and park
 * each one in August — the month most of the checked annuals actually carry.
 */
const ANNUAL_MONTH = 7 // zero-based: August

const interpolateAnnual = (startYm, endYm, count) => {
  const ay = Math.floor(toMonthIndex(startYm) / 12)
  const by = endYm ? Math.floor(toMonthIndex(endYm) / 12) : ay + count - 1
  if (count === 1) return [ay * 12 + ANNUAL_MONTH]
  const span = by - ay
  return Array.from({ length: count }, (_, i) =>
    (ay + Math.round((i * span) / (count - 1))) * 12 + ANNUAL_MONTH,
  )
}

/* -- expansion ------------------------------------------------------------ */

const issues = []

for (const series of SERIES) {
  for (const seg of series.segments) {
    const count = seg.to - seg.from + 1
    const annual = seg.cadence === 'annual' || series.isAnnual
    const months = annual
      ? interpolateAnnual(seg.startDate, seg.endDate, count)
      : interpolate(seg.startDate, seg.endDate, count)

    for (let i = 0; i < count; i++) {
      const number = seg.from + i
      const coverDate = fromMonthIndex(months[i])
      const dateExact =
        seg.exact === true ||
        (i === 0 && seg.startExact === true) ||
        (i === count - 1 && seg.endExact === true)

      issues.push({
        id: `${series.key}-${number}`,
        series: series.key,
        seriesName: series.name,
        seriesAbbr: series.abbr,
        // A renamed series is filed under a different wiki page mid-run, so the
        // segment's title wins over the series default when present.
        wikiTitle: seg.wikiTitle || series.wikiTitle,
        number,
        coverDate,
        yearOnly: Boolean(annual),
        dateExact,
        accent: series.accent,
        // Defaults to the main continuity; only a parallel line declares its own.
        universe: series.universe || 'earth-616',
        role: series.role,
        relevance: series.relevance,
        isAnnual: Boolean(annual),
        isReprint: Boolean(series.isReprint),
        outOfContinuity: Boolean(series.outOfContinuity),
        arcs: [],
        connections: [],
        firstAppearances: [],
        note: '',
        generated: true,
      })
    }
  }
}

/* -- ordering ------------------------------------------------------------- */

// Sort chronologically, then by series, then by number, so the timeline order
// is deterministic. sortKey lets the UI order without re-deriving this.
const seriesRank = Object.fromEntries(SERIES.map((s, i) => [s.key, i]))

issues.sort(
  (a, b) =>
    toMonthIndex(a.coverDate) - toMonthIndex(b.coverDate) ||
    seriesRank[a.series] - seriesRank[b.series] ||
    a.number - b.number,
)

issues.forEach((iss, i) => {
  iss.sortKey = i
})

/* -- validation ----------------------------------------------------------- */

const errors = []
const seen = new Set()

for (const iss of issues) {
  if (seen.has(iss.id)) errors.push(`duplicate id: ${iss.id}`)
  seen.add(iss.id)

  const idx = toMonthIndex(iss.coverDate)
  if (idx < toMonthIndex(RANGE_START) || idx > toMonthIndex(RANGE_END)) {
    errors.push(`${iss.id}: cover date ${iss.coverDate} falls outside ${RANGE_START}..${RANGE_END}`)
  }
}

// Non-decreasing issue numbers within a series is a cheap sanity check on dates.
for (const series of SERIES) {
  const run = issues.filter((i) => i.series === series.key)
  for (let i = 1; i < run.length; i++) {
    if (toMonthIndex(run[i].coverDate) < toMonthIndex(run[i - 1].coverDate)) {
      errors.push(`${series.key}: #${run[i].number} is dated before #${run[i - 1].number}`)
    }
  }
}

if (errors.length) {
  console.error('\n  Dataset validation failed:\n')
  for (const e of errors.slice(0, 40)) console.error(`   · ${e}`)
  if (errors.length > 40) console.error(`   … and ${errors.length - 40} more`)
  console.error('')
  process.exit(1)
}

/* -- write ---------------------------------------------------------------- */

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(issues, null, 0) + '\n')

/* -- report --------------------------------------------------------------- */

const pad = (s, n) => String(s).padEnd(n)
console.log(`\n  Spider-Man reading tree — dataset\n`)
console.log(`  ${pad('SERIES', 40)}${pad('ISSUES', 8)}${pad('FROM', 10)}TO`)
console.log(`  ${'-'.repeat(68)}`)

for (const series of SERIES) {
  const run = issues.filter((i) => i.series === series.key)
  if (!run.length) continue
  console.log(
    `  ${pad(series.name.slice(0, 38), 40)}${pad(run.length, 8)}` +
      `${pad(run[0].coverDate, 10)}${run[run.length - 1].coverDate}`,
  )
}

const byRelevance = issues.reduce((acc, i) => {
  acc[i.relevance] = (acc[i.relevance] || 0) + 1
  return acc
}, {})

console.log(`  ${'-'.repeat(68)}`)
console.log(`  ${pad('TOTAL', 40)}${issues.length}`)
console.log(
  `\n  by relevance   ` +
    Object.entries(byRelevance).map(([k, v]) => `${k} ${v}`).join('   '),
)
console.log(`  exact dates    ${issues.filter((i) => i.dateExact).length} of ${issues.length}`)
console.log(`\n  → ${OUT}\n`)
