/**
 * Filtering and search, evaluated in memory against the merged dataset.
 *
 * `optional` material (reprints, out-of-continuity tie-ins) is excluded by
 * default: it triples the node count without adding a story.
 */

export const DEFAULT_FILTERS = {
  series: null,        // series key, or null for all
  yearFrom: null,
  yearTo: null,
  relevance: ['core', 'notable'],
  arc: null,
  character: null,
  query: '',
  keyOnly: false,
  digitalOnly: false,
  milestoneOnly: false,
  milestoneType: null,   // 'debut' | 'death' | 'event' | 'status-quo' | 'universe'
  universe: null,        // null shows every continuity
}

const normalize = (s) => String(s || '').toLowerCase()

/** Free-text search across the fields a reader would actually type. */
const matchesQuery = (issue, q) => {
  if (!q) return true
  const needle = normalize(q)
  return (
    normalize(issue.seriesName).includes(needle) ||
    normalize(issue.seriesAbbr).includes(needle) ||
    normalize(issue.note).includes(needle) ||
    normalize(`#${issue.number}`).includes(needle) ||
    String(issue.number) === needle.replace('#', '') ||
    (issue.firstAppearances || []).some((c) => normalize(c).includes(needle)) ||
    (issue.arcs || []).some((a) => normalize(a).includes(needle))
  )
}

export const applyFilters = (issues, f) => {
  const year = (i) => Number(i.coverDate.slice(0, 4))

  return issues.filter((i) => {
    if (f.series && i.series !== f.series) return false
    if (f.relevance?.length && !f.relevance.includes(i.relevance)) return false
    if (f.yearFrom && year(i) < f.yearFrom) return false
    if (f.yearTo && year(i) > f.yearTo) return false
    if (f.arc && !(i.arcs || []).includes(f.arc)) return false
    if (f.character && !(i.firstAppearances || []).includes(f.character)) return false
    if (f.keyOnly && !i.keyIssue) return false
    if (f.digitalOnly && !i.digital) return false
    if (f.universe && (i.universe || 'earth-616') !== f.universe) return false
    if (f.milestoneOnly && !i.milestones?.length) return false
    if (f.milestoneType && !(i.milestones || []).some((m) => m.type === f.milestoneType)) return false
    if (!matchesQuery(i, f.query)) return false
    return true
  })
}

/**
 * Ids on the selected reading path, in route order.
 *
 * A path can be built three ways, and may combine them:
 *   match   a predicate over every issue
 *   arcs    arc keys, expanded to their issues — lets a path be assembled from
 *           storylines already curated elsewhere instead of a list of ids
 *   issues  explicit ids, for the bits no arc covers
 *
 * The result is de-duplicated and returned in cover-date order, which for a
 * path spanning decades and several titles is the only order that reads.
 */
export const resolvePath = (path, issues, arcsByKey = {}) => {
  if (!path) return []

  const ids = new Set()
  if (path.match) for (const i of issues) if (path.match(i)) ids.add(i.id)
  if (path.arcs) {
    for (const key of path.arcs) {
      for (const id of arcsByKey[key]?.issues || []) ids.add(id)
    }
  }
  if (path.issues) for (const id of path.issues) ids.add(id)

  const order = new Map(issues.map((i, n) => [i.id, n]))
  return [...ids].filter((id) => order.has(id)).sort((a, b) => order.get(a) - order.get(b))
}

/**
 * How many filters are narrowing the view right now.
 *
 * Shown on the button that collapses the filter bar on a phone. Without it,
 * filtering silently is the easiest mistake to make in this interface — the
 * timeline just looks emptier than you remember.
 */
export const countActiveFilters = (f) => {
  let n = 0
  if (f.series) n++
  if (f.arc) n++
  if (f.character) n++
  if (f.query) n++
  if (f.universe) n++
  if (f.keyOnly) n++
  if (f.digitalOnly) n++
  if (f.milestoneOnly) n++
  if (f.milestoneType) n++
  if (f.yearFrom || f.yearTo) n++
  // Relevance counts only when it differs from the default set.
  if (f.relevance.length !== DEFAULT_FILTERS.relevance.length) n++
  return n
}

export const isFilterActive = (f) =>
  Boolean(
    f.series ||
      f.arc ||
      f.character ||
      f.query ||
      f.keyOnly ||
      f.digitalOnly ||
      f.milestoneOnly ||
      f.milestoneType ||
      f.universe ||
      f.yearFrom ||
      f.yearTo ||
      f.relevance.length !== DEFAULT_FILTERS.relevance.length,
  )
