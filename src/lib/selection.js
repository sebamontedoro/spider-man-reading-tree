/**
 * What the four dimensions add up to, and how it survives a reload.
 *
 * The pickers set four independent fields; a reader has picked one thing. This
 * turns the former into the latter — a title, a kind, the issues in the order
 * they should be read, and a route that can be shared or come back to.
 *
 * Reading order is not one rule. An arc declares its own, and a crossover's
 * declared order is the point of it: Kraven's Last Hunt runs Web #31, Amazing
 * #293, Spectacular #131, and all three carry the same cover date, so sorting
 * by date would shuffle the story. A reading path likewise. Everything else is
 * chronological, which is what the tree is sorted by already.
 */

import { ISSUES, ISSUE_BY_ID, SERIES_LIST, CHARACTERS } from './dataset.js'
import { resolvePath } from './filters.js'
import { ACTIVE } from './character.js'

const { ARCS_BY_KEY, PATHS_BY_KEY } = ACTIVE.data

const DIMENSIONS = ['arc', 'series', 'path', 'character']

/** Nothing chosen means the timeline, not an empty selection. */
export const hasSelection = (filters, pathKey) =>
  Boolean(filters.series || filters.arc || filters.character || pathKey)

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** `#/arc/kravens-last-hunt/series/web-of-spider-man` — order fixed, so the
 *  same selection always writes the same route. */
export function toRoute(filters, pathKey) {
  const parts = []
  if (filters.arc) parts.push(`arc/${filters.arc}`)
  if (filters.series) parts.push(`series/${filters.series}`)
  if (pathKey) parts.push(`path/${pathKey}`)
  if (filters.character) parts.push(`character/${slug(filters.character)}`)
  return parts.length ? `#/${parts.join('/')}` : ''
}

/**
 * The other direction, and every key is checked against the real thing.
 *
 * A URL is typed, edited and shared, so it arrives wrong sooner or later. An
 * unchecked key does not fail loudly: it names nothing, so the header shows
 * the raw slug and the filter it drives matches everything — a selection of
 * 2359 issues called `kraven-thread`. Dropping what does not resolve turns
 * that into the timeline, which is what a route to nowhere should be.
 *
 * Characters are matched by slug rather than stored by one, because their
 * names are display strings with punctuation in them and a URL should not be
 * the reason a name cannot be edited.
 */
export function fromRoute(hash) {
  const out = { arc: null, series: null, path: null, character: null }
  const parts = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean)
  for (let i = 0; i < parts.length - 1; i += 2) {
    const kind = parts[i]
    const value = parts[i + 1]
    if (!DIMENSIONS.includes(kind)) continue
    if (kind === 'arc') out.arc = ARCS_BY_KEY[value] ? value : null
    else if (kind === 'path') out.path = PATHS_BY_KEY[value] ? value : null
    else if (kind === 'series') {
      out.series = SERIES_LIST.some((s) => s.key === value) ? value : null
    } else if (kind === 'character') {
      out.character = CHARACTERS.find((c) => slug(c) === value) || null
    }
  }
  return out
}

/** Reading order for the current selection, as an id → position map, or null
 *  when chronological order is the right one. */
export function readingOrder(filters, pathKey) {
  if (pathKey) {
    // ISSUES, not ISSUE_BY_ID: the map is built before the final sort, so it
    // holds the generator's estimated order with every guest appearance last.
    const ids = resolvePath(PATHS_BY_KEY[pathKey], ISSUES, ARCS_BY_KEY)
    return new Map(ids.map((id, i) => [id, i + 1]))
  }
  if (filters.arc) {
    const arc = ARCS_BY_KEY[filters.arc]
    if (arc) return new Map(arc.issues.map((id, i) => [id, i + 1]))
  }
  return null
}

/** Title, kind and blurb for whatever is chosen — the intersection named as
 *  what it is rather than as a list of filters. */
export function describe(filters, pathKey) {
  const bits = []
  if (filters.arc) bits.push({ kind: 'Arc', name: ARCS_BY_KEY[filters.arc]?.name || filters.arc,
                               blurb: ARCS_BY_KEY[filters.arc]?.blurb })
  if (pathKey) bits.push({ kind: 'Reading path', name: PATHS_BY_KEY[pathKey]?.name || pathKey,
                           blurb: PATHS_BY_KEY[pathKey]?.blurb })
  if (filters.series) bits.push({ kind: 'Series',
                                  name: SERIES_LIST.find((s) => s.key === filters.series)?.name || filters.series })
  if (filters.character) bits.push({ kind: 'First appearance', name: filters.character })

  if (!bits.length) return null
  if (bits.length === 1) return { kind: bits[0].kind, title: bits[0].name, blurb: bits[0].blurb }

  // Two or more: the first is the subject and the rest say where to look. The
  // blurb is dropped, because it describes the whole arc and this is a slice.
  return {
    kind: bits.map((b) => b.kind).join(' × '),
    title: bits.map((b) => b.name).join(' in '),
    blurb: null,
  }
}

/** The series accent an arc borrows for its swatch when it has no curated duo. */
export function arcAccent(arcKey) {
  const arc = ARCS_BY_KEY[arcKey]
  if (!arc) return 'asm'
  const counts = new Map()
  for (const id of arc.issues) {
    const accent = ISSUE_BY_ID.get(id)?.accent
    if (accent) counts.set(accent, (counts.get(accent) || 0) + 1)
  }
  const best = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]
  return best ? best[0] : 'asm'
}
