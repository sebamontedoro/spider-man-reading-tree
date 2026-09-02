import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ISSUES, ISSUE_BY_ID, TIMELINE, STATS, YEAR_RANGE } from './lib/dataset.js'
import { DEFAULT_FILTERS, applyFilters, resolvePath, isFilterActive } from './lib/filters.js'
import { PATHS_BY_KEY } from '../data/paths.js'
import { ARCS_BY_KEY } from '../data/arcs.js'

import { scrollToIssue } from './lib/scrollToIssue.js'
import { useShelf } from './lib/shelf.js'
import { statusOf, useProgress } from './lib/progress.js'

import FilterBar from './components/FilterBar.jsx'
import Timeline from './components/Timeline.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import Reader from './components/Reader.jsx'

import './styles/app.css'

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [pathKey, setPathKey] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [readingId, setReadingId] = useState(null)

  const path = pathKey ? PATHS_BY_KEY[pathKey] : null

  // Which issues have a local file behind them, and how far into each you got.
  // Empty until the reader service answers — and permanently empty when there
  // is none, which is a supported way to run this.
  const shelf = useShelf()
  const progress = useProgress()

  const shelfMarks = useMemo(() => {
    const marks = new Map()
    for (const id of shelf.byIssue.keys()) marks.set(id, statusOf(id))
    return marks
  }, [shelf, progress])

  // Ids surviving the filters. Everything else is dimmed rather than removed,
  // so the shape of the timeline stays readable while you narrow it down.
  const visibleIds = useMemo(
    () => new Set(applyFilters(ISSUES, filters, shelfMarks).map((i) => i.id)),
    [filters, shelfMarks],
  )

  // Position along the active reading path, used to number the route.
  const pathOrder = useMemo(() => {
    const ids = resolvePath(path, ISSUES, ARCS_BY_KEY)
    return new Map(ids.map((id, i) => [id, i + 1]))
  }, [path])

  /**
   * Narrowing the view should take you to the result, not just grey out
   * everything else. Otherwise every filter is followed by a scroll hunt
   * through sixty-four years of timeline.
   *
   * The trigger is the first *shown* issue changing, which covers every filter
   * with one rule — year range, series, arc, character, search, a reading path
   * — instead of a special case each. Selecting an arc lands on its earliest
   * issue for free, because that is the first one still shown.
   */
  const firstShownId = useMemo(() => {
    for (const i of ISSUES) {
      if (!visibleIds.has(i.id)) continue
      if (path && !pathOrder.has(i.id)) continue
      return i.id
    }
    return null
  }, [visibleIds, path, pathOrder])

  const lastJump = useRef(undefined)
  useEffect(() => {
    const previous = lastJump.current
    lastJump.current = firstShownId

    // First render: record where we are, do not move.
    if (previous === undefined) return
    if (!firstShownId || firstShownId === previous) return

    // Clearing filters would otherwise fling you back to 1962, which is a
    // reset of the view rather than a request to go somewhere.
    if (!isFilterActive(filters) && !path) return

    // Let a search settle before moving, so typing does not chase the page.
    const t = setTimeout(() => {
      const issue = ISSUE_BY_ID.get(firstShownId)
      if (issue) scrollToIssue(issue)
    }, 260)
    return () => clearTimeout(t)
  }, [firstShownId, filters, path])

  const selected = selectedId ? ISSUE_BY_ID.get(selectedId) : null

  const handleSelect = useCallback(
    (id) => setSelectedId((cur) => (cur === id ? null : id)),
    [],
  )

  const shownCount = path ? pathOrder.size : visibleIds.size

  /* -- the reader --------------------------------------------------------- */

  const reading = readingId ? ISSUE_BY_ID.get(readingId) : null
  const readingComic = readingId ? shelf.byIssue.get(readingId) : null

  /**
   * The next issue of the same run, but only when it too is on the shelf —
   * that is what the reader offers at the last page. Following a "continues"
   * connection keeps this in step with the tree rather than guessing that the
   * next issue is this number plus one.
   */
  const nextOnShelf = useMemo(() => {
    if (!reading) return null
    const link = (reading.connections || [])
      .find((c) => c.type === 'continues' && c.dir === 'forward')
    const next = link ? ISSUE_BY_ID.get(link.to) : null
    return next && shelf.byIssue.has(next.id) ? next : null
  }, [reading, shelf])

  return (
    <div className={`app ${selected ? 'app--panel-open' : ''}`}>
      <header className="masthead halftone-red">
        <div className="masthead__inner">
          <h1 className="masthead__title">
            Spider&#8209;Man
            <span className="masthead__subtitle">Reading Tree</span>
          </h1>
          <div className="masthead__range">
            <span className="masthead__years">
              {YEAR_RANGE[0]}&ndash;{YEAR_RANGE[1]}
            </span>
            <span className="masthead__stats">
              {STATS.total} issues · {STATS.keyIssues} key ·{' '}
              {STATS.digitalCore.available}/{STATS.digitalCore.total} readable digitally
            </span>
          </div>
        </div>
      </header>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        pathKey={pathKey}
        onPathChange={setPathKey}
        shownCount={shownCount}
        totalCount={STATS.total}
        shelfCount={shelf.byIssue.size}
      />

      <main className="app__body">
        <Timeline
          timeline={TIMELINE}
          visibleIds={visibleIds}
          pathOrder={pathOrder}
          pathActive={Boolean(path)}
          selectedId={selectedId}
          onSelect={handleSelect}
          shelfMarks={shelfMarks}
        />
      </main>

      <DetailPanel
        issue={selected}
        byId={ISSUE_BY_ID}
        onSelect={handleSelect}
        onClose={() => setSelectedId(null)}
        onRead={setReadingId}
        onShelf={selected ? shelf.byIssue.has(selected.id) : false}
      />

      {reading && readingComic && (
        <Reader
          issue={reading}
          comic={readingComic}
          nextIssue={nextOnShelf}
          onOpenIssue={(id) => { setReadingId(id); setSelectedId(id) }}
          onClose={() => setReadingId(null)}
        />
      )}
    </div>
  )
}
