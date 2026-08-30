/**
 * Merges the data layers into one queryable dataset, once, at module load.
 *
 *   1. src/generated/issues.json   the expanded runs    (never hand-edited)
 *   2. data/cover-dates.json       real dates from the wiki  (wins over 1)
 *   3. data/marvel-unlimited.json  Marvel issue ids, for direct read links
 *   4. data/overrides.js           corrections + notes  (wins over 2 and 3)
 *   5. data/appearances.js         guest spots          (not generable)
 *   6. data/arcs.js                arcs and crossovers  (adds connections)
 *   7. data/milestones.js          the story beats      (drives the timeline)
 *
 * Layers 1 and 2 are both machine-produced and disposable — 1 from our own
 * generator, 2 from `npm run verify:dates`. Layers 3 to 5 are hand-curated, and
 * always win. That ordering is what lets us regenerate or re-verify the
 * skeleton without ever losing written work.
 */

import generated from '../generated/issues.json'
import coverDates from '../../data/cover-dates.json'
import marvelUnlimited from '../../data/marvel-unlimited.json'
import { OVERRIDES } from '../../data/overrides.js'
import { APPEARANCES, APPEARANCE_DEFAULTS } from '../../data/appearances.js'
import { ARCS } from '../../data/arcs.js'
import { MILESTONES, MILESTONES_BY_ISSUE, MILESTONE_TYPES } from '../../data/milestones.js'
import { SERIES } from '../../data/series.js'

/* -- 1 + 2 + 3 + 4: build the issue list ---------------------------------- */

/**
 * A verified date replaces the interpolated one and clears the estimate flag.
 * `monthKnown` is false for issues the wiki dates by year alone (some annuals),
 * where we keep the generated month but trust the year.
 */
const withVerifiedDate = (iss) => {
  const v = coverDates[iss.id]
  if (!v) return iss
  return {
    ...iss,
    coverDate: v.coverDate,
    dateExact: v.monthKnown !== false,
    yearOnly: iss.yearOnly && v.monthKnown === false,
  }
}

/**
 * Marvel's own catalogue id, where the issue has one. Its absence is itself
 * useful information: roughly a third of the tree has no digital edition, and
 * the reader deserves to know that before planning a run.
 */
const withDigital = (iss) => {
  const id = marvelUnlimited[iss.id]
  return id ? { ...iss, marvelId: id, digital: true } : { ...iss, digital: false }
}

const merged = [
  ...generated.map((iss) => ({
    ...withDigital(withVerifiedDate(iss)),
    ...(OVERRIDES[iss.id] || {}),
  })),
  ...APPEARANCES.map((app) => ({
    ...APPEARANCE_DEFAULTS,
    universe: 'earth-616',
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

/* -- 5: arcs contribute both membership and connections ------------------- */

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

/* -- 7: milestones -------------------------------------------------------- */

// Attached rather than merged: an issue can carry several, and the timeline
// renders each one as its own row.
for (const [id, list] of Object.entries(MILESTONES_BY_ISSUE)) {
  const issue = byId.get(id)
  if (issue) issue.milestones = list
}

/**
 * `keyIssue` is partly derived, and deliberately so.
 *
 * Set by hand it drifted badly: 33 of 42 flags landed before 1991, because the
 * early decades got the most careful curation. That skew reached three places
 * at once — the star on the card, the Key issues filter, and the Essentials
 * path — and made all of them read as though the character stopped having
 * important issues in 1990.
 *
 * An issue whose premise changes for good, or where a continuity begins or
 * ends, is a key issue by definition. Deriving that from the milestone layer
 * keeps the three in step and rebalances them: 9/11/13/10/7/7 across the
 * decades instead of 9/11/13/5/2/2. Hand-set flags still win, so an editorial
 * call is never overridden.
 */
/**
 * A debut milestone that names its character feeds the firstAppearances field.
 *
 * The same drift as keyIssue had hit this too, harder: the field was written
 * for the first three decades and is empty from 2001 on, while the debuts of
 * those years went in as milestones instead. That emptied the character index
 * and the "first appearance of" filter for two whole decades.
 *
 * Deriving one from the other keeps a debut in a single place. The milestone
 * label is written to read in a timeline row ("Carnage arrives"); `character`
 * is the indexable name.
 */
for (const issue of byId.values()) {
  for (const m of issue.milestones || []) {
    if (m.type !== 'debut' || !m.character) continue
    issue.firstAppearances = issue.firstAppearances || []
    if (!issue.firstAppearances.includes(m.character)) {
      issue.firstAppearances.push(m.character)
    }
  }
}

const PREMISE_CHANGING = new Set(['status-quo', 'universe'])

for (const issue of byId.values()) {
  if (issue.keyIssue) continue
  if ((issue.milestones || []).some((m) => PREMISE_CHANGING.has(m.type))) {
    issue.keyIssue = true
  }
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

/** Milestones that resolved to a real issue, in chronological order. */
export const MILESTONE_LIST = merged
  .filter((i) => i.milestones?.length)
  .flatMap((i) => i.milestones.map((m) => ({ ...m, issueRef: i })))

export { MILESTONE_TYPES }

/** The continuities present, each with its issue count. */
export const UNIVERSES = (() => {
  const counts = merged.reduce((acc, i) => {
    const u = i.universe || 'earth-616'
    acc[u] = (acc[u] || 0) + 1
    return acc
  }, {})
  return [
    { key: 'earth-616', label: 'Main continuity', count: counts['earth-616'] || 0 },
    ...Object.keys(counts)
      .filter((k) => k !== 'earth-616')
      .map((k) => ({
        key: k,
        label: k === 'ultimate' ? 'Ultimate' : k,
        count: counts[k],
      })),
  ].filter((u) => u.count > 0)
})()

export const STATS = {
  total: merged.length,
  milestones: MILESTONE_LIST.length,
  exactDates: merged.filter((i) => i.dateExact).length,
  keyIssues: merged.filter((i) => i.keyIssue).length,
  guest: merged.filter((i) => i.role === 'guest').length,
  digital: merged.filter((i) => i.digital).length,
  // Availability across the material actually worth reading, which is the
  // number that matters — reprints drag the headline figure down misleadingly.
  digitalCore: (() => {
    const core = merged.filter(
      (i) => i.relevance !== 'optional' && !i.isReprint && !i.outOfContinuity,
    )
    return { available: core.filter((i) => i.digital).length, total: core.length }
  })(),
}
