/**
 * Merges the four data layers into one queryable dataset, once, at module load.
 *
 *   1. src/generated/issues.json   the expanded runs   (never hand-edited)
 *   2. data/overrides.js           corrections + notes (wins over 1)
 *   3. data/appearances.js         guest spots         (not generable)
 *   4. data/arcs.js                arcs and crossovers (adds connections)
 *
 * Layer 1 is disposable; everything else is curation. That split is what lets
 * us regenerate the skeleton without losing hand-written work.
 */

import generated from '../generated/issues.json'
import { OVERRIDES } from '../../data/overrides.js'
import { APPEARANCES, APPEARANCE_DEFAULTS } from '../../data/appearances.js'
import { ARCS } from '../../data/arcs.js'
import { SERIES } from '../../data/series.js'

/* -- 1 + 2 + 3: build the issue list -------------------------------------- */

const merged = [
  ...generated.map((iss) => ({ ...iss, ...(OVERRIDES[iss.id] || {}) })),
  ...APPEARANCES.map((app) => ({
    ...APPEARANCE_DEFAULTS,
    seriesKey: 'guest',
    ...app,
    series: app.series || 'guest',
    arcs: app.arcs || [],
    connections: app.connections || [],
    firstAppearances: app.firstAppearances || [],
    note: app.note || '',
  })),
]

const byId = new Map(merged.map((i) => [i.id, i]))

/* -- 4: arcs contribute both membership and connections ------------------- */

for (const arc of ARCS) {
  const present = arc.issues.filter((id) => byId.has(id))

  present.forEach((id, i) => {
    const issue = byId.get(id)
    if (!issue.arcs.includes(arc.key)) issue.arcs.push(arc.key)

    // Chain each arc in reading order. A crossover arc jumps between titles,
    // which is exactly the edge the focus graph exists to show.
    if (i > 0) {
      issue.connections.push({
        to: present[i - 1],
        type: arc.crossover ? 'crossover' : 'arc',
        arc: arc.key,
        dir: 'back',
      })
    }
    if (i < present.length - 1) {
      issue.connections.push({
        to: present[i + 1],
        type: arc.crossover ? 'crossover' : 'arc',
        arc: arc.key,
        dir: 'forward',
      })
    }
  })
}

/* -- implicit connections: the next and previous issue of the same run ----- */

const runs = new Map()
for (const iss of merged) {
  if (!iss.generated) continue
  if (!runs.has(iss.series)) runs.set(iss.series, [])
  runs.get(iss.series).push(iss)
}

for (const run of runs.values()) {
  run.sort((a, b) => a.number - b.number)
  run.forEach((iss, i) => {
    if (i > 0) iss.connections.push({ to: run[i - 1].id, type: 'continues', dir: 'back' })
    if (i < run.length - 1) iss.connections.push({ to: run[i + 1].id, type: 'continues', dir: 'forward' })
  })
}

/* -- ordering ------------------------------------------------------------- */

const monthIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

const seriesRank = Object.fromEntries(SERIES.map((s, i) => [s.key, i]))

merged.sort(
  (a, b) =>
    monthIndex(a.coverDate) - monthIndex(b.coverDate) ||
    (seriesRank[a.series] ?? 99) - (seriesRank[b.series] ?? 99) ||
    a.number - b.number,
)

/* -- indices -------------------------------------------------------------- */

export const ISSUES = merged
export const ISSUE_BY_ID = byId

/** Chronological tree: [{ year, months: [{ month, issues }] }] */
export const TIMELINE = (() => {
  const years = new Map()
  for (const iss of merged) {
    const [y, m] = iss.coverDate.split('-')
    if (!years.has(y)) years.set(y, new Map())
    const months = years.get(y)
    if (!months.has(m)) months.set(m, [])
    months.get(m).push(iss)
  }
  return [...years.entries()]
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, months]) => ({
      year: Number(year),
      count: [...months.values()].reduce((n, l) => n + l.length, 0),
      months: [...months.entries()]
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([month, issues]) => ({ month: Number(month), issues })),
    }))
})()

/** Every series that actually produced an issue, for the filter bar. */
export const SERIES_LIST = [
  ...SERIES.map((s) => ({
    key: s.key,
    name: s.name,
    abbr: s.abbr,
    accent: s.accent,
    relevance: s.relevance,
    count: merged.filter((i) => i.series === s.key).length,
  })),
  {
    key: 'guest',
    name: 'Guest appearances',
    abbr: 'GUEST',
    accent: 'guest',
    relevance: 'notable',
    count: merged.filter((i) => i.series === 'guest').length,
  },
].filter((s) => s.count > 0)

/** Sorted, de-duplicated character list drawn from every firstAppearances field. */
export const CHARACTERS = [
  ...new Set(merged.flatMap((i) => i.firstAppearances || [])),
].sort()

export const YEAR_RANGE = [
  merged.length ? Number(merged[0].coverDate.slice(0, 4)) : 1962,
  merged.length ? Number(merged[merged.length - 1].coverDate.slice(0, 4)) : 1990,
]

export const STATS = {
  total: merged.length,
  exactDates: merged.filter((i) => i.dateExact).length,
  keyIssues: merged.filter((i) => i.keyIssue).length,
  guest: merged.filter((i) => i.role === 'guest').length,
}
