/**
 * What each selectable thing covers, and what that leaves selectable.
 *
 * Four dimensions can be picked at once — a series, an arc, a reading path, a
 * character's first appearance — and they combine as an intersection. Which
 * means most combinations select nothing at all: Kraven's Last Hunt never
 * touches Marvel Team-Up, and a view of that pairing is an empty page with
 * nothing to say about why.
 *
 * Rather than design that page, the combination is made unreachable. Every
 * selectable declares the series it covers, and a picker only offers what
 * still crosses whatever is already chosen. Pick Web of Spider-Man and the arc
 * list drops from eighty-six to the twelve that run through it.
 *
 * One rule serves all four, instead of a case per pair. That matters as much
 * for what it prevents as for what it saves: a pairwise table has twelve
 * entries and stays right only while someone remembers to add the thirteenth.
 *
 * The scopes are computed once, from the merged dataset, so a path built from
 * a `match` over derived fields resolves exactly rather than being guessed at.
 */

import { ISSUES, ISSUE_BY_ID } from './dataset.js'
import { resolvePath } from './filters.js'
import { ARCS, ARCS_BY_KEY } from '../../data/arcs.js'
import { PATHS } from '../../data/paths.js'

const seriesOf = (ids) => {
  const out = new Set()
  for (const id of ids) {
    const issue = ISSUE_BY_ID.get(id)
    if (issue) out.add(issue.series)
  }
  return out
}

/** series key → the series it is, which is the whole of its scope. */
const SERIES_SCOPE = new Map(ISSUES.map((i) => [i.series, new Set([i.series])]))

const ARC_SCOPE = new Map(ARCS.map((a) => [a.key, seriesOf(a.issues)]))

const PATH_SCOPE = new Map(
  PATHS.map((p) => [p.key, seriesOf(resolvePath(p, ISSUES, ARCS_BY_KEY))]),
)

const CHARACTER_SCOPE = (() => {
  const out = new Map()
  for (const issue of ISSUES) {
    for (const name of issue.firstAppearances || []) {
      if (!out.has(name)) out.set(name, new Set())
      out.get(name).add(issue.series)
    }
  }
  return out
})()

const SCOPES = {
  series: SERIES_SCOPE,
  arc: ARC_SCOPE,
  path: PATH_SCOPE,
  character: CHARACTER_SCOPE,
}

/** The series a single choice covers, or null when it is not one we index. */
export function scopeOf(kind, key) {
  if (!key) return null
  return SCOPES[kind]?.get(key) || null
}

/**
 * The series still in play, given everything chosen but `except`.
 *
 * Null means nothing narrows the field — which is not the same as nothing
 * being selected, since a choice we have no scope for cannot narrow anything
 * and must not be allowed to empty the others.
 */
export function narrowedTo(selection, except = null) {
  let live = null
  for (const kind of ['series', 'arc', 'path', 'character']) {
    if (kind === except) continue
    const scope = scopeOf(kind, selection[kind])
    if (!scope || !scope.size) continue
    live = live === null ? new Set(scope) : new Set([...live].filter((s) => scope.has(s)))
  }
  return live
}

/** Does this option survive what is already chosen? */
export function fitsIn(live, kind, key) {
  if (!live) return true
  const scope = scopeOf(kind, key)
  if (!scope) return true          // unscoped options never get filtered out
  for (const s of scope) if (live.has(s)) return true
  return false
}

/** The options of one picker, narrowed by the other three. */
export function optionsFor(kind, options, selection, keyOf = (o) => o.key) {
  const live = narrowedTo(selection, kind)
  if (!live) return options
  return options.filter((o) => fitsIn(live, kind, keyOf(o)))
}

/** What is doing the narrowing, for the picker to say so out loud. */
export function narrowedBy(selection, except, labels) {
  return ['series', 'arc', 'path', 'character']
    .filter((k) => k !== except && selection[k] && scopeOf(k, selection[k])?.size)
    .map((k) => labels[k])
    .filter(Boolean)
}
