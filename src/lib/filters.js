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
  milestoneType: null,   // 'debut' | 'death' | 'event' | 'status-quo'
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
    if (f.milestoneOnly && !i.milestones?.length) return false
    if (f.milestoneType && !(i.milestones || []).some((m) => m.type === f.milestoneType)) return false
    if (!matchesQuery(i, f.query)) return false
    return true
  })
}

/** Ids on the selected reading path, in route order. Empty when none is active. */
export const resolvePath = (path, issues) => {
  if (!path) return []
  if (path.issues) return path.issues
  if (path.match) return issues.filter(path.match).map((i) => i.id)
  return []
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
      f.yearFrom ||
      f.yearTo ||
      f.relevance.length !== DEFAULT_FILTERS.relevance.length,
  )
