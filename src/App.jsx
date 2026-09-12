import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ISSUES, ISSUE_BY_ID, TIMELINE, STATS, YEAR_RANGE } from './lib/dataset.js'
import { DEFAULT_FILTERS, applyFilters, resolvePath, isFilterActive } from './lib/filters.js'
import { ACTIVE, ALL_CHARACTERS } from './lib/character.js'

import {
  hasSelection, describe, readingOrder, toRoute, fromRoute, arcAccent,
} from './lib/selection.js'
import { scrollToIssue } from './lib/scrollToIssue.js'
import { useShelf } from './lib/shelf.js'
import { statusOf, useProgress } from './lib/progress.js'

import FilterBar from './components/FilterBar.jsx'
import Timeline from './components/Timeline.jsx'
import SelectionView from './components/SelectionView.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import Reader from './components/Reader.jsx'

import './styles/app.css'

const { PATHS_BY_KEY, ARCS_BY_KEY } = ACTIVE.data

export default function App() {
  // A route in the address bar is a selection someone shared or came back to,
  // so it wins over the defaults on the first render rather than being applied
  // after one — otherwise the timeline paints, then jumps.
  const booted = fromRoute(typeof window === 'undefined' ? '' : window.location.hash)
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    series: booted.series, arc: booted.arc, character: booted.character,
  })
  const [pathKey, setPathKey] = useState(booted.path)
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

    // And with a selection open there is nothing to scroll to: its issues are
    // the page.
    if (hasSelection(filters, pathKey)) return

    // Let a search settle before moving, so typing does not chase the page.
    const t = setTimeout(() => {
      const issue = ISSUE_BY_ID.get(firstShownId)
      if (issue) scrollToIssue(issue)
    }, 260)
    return () => clearTimeout(t)
  }, [firstShownId, filters, path])

  /* -- the selection ------------------------------------------------------ */

  const selecting = hasSelection(filters, pathKey)
  const route = toRoute(filters, pathKey)

  // replaceState, not push: the pickers are a way of looking, not a trail of
  // pages, and every keystroke of narrowing would otherwise need a Back press
  // to undo.
  useEffect(() => {
    const next = `${window.location.pathname}${window.location.search}${route}`
    if (next !== window.location.href.replace(window.location.origin, '')) {
      window.history.replaceState(null, '', next)
    }
  }, [route])

  const chosen = useMemo(() => describe(filters, pathKey), [filters, pathKey])
  const order = useMemo(() => readingOrder(filters, pathKey), [filters, pathKey])

  /**
   * The issues the selection holds, in the order it wants them.
   *
   * The filter pipeline already intersects series, arc and character, and the
   * path is intersected here — which is the same intersection the pickers
   * enforce, so this list is never empty by surprise.
   */
  const chosenIssues = useMemo(() => {
    if (!selecting) return []
    const list = ISSUES.filter(
      (i) => visibleIds.has(i.id) && (!path || pathOrder.has(i.id)),
    )
    if (!order) return list
    return [...list].sort((a, b) => (order.get(a.id) ?? 1e9) - (order.get(b.id) ?? 1e9))
  }, [selecting, visibleIds, path, pathOrder, order])

  const clearSelection = useCallback(() => {
    setFilters((f) => ({ ...f, series: null, arc: null, character: null }))
    setPathKey(null)
  }, [])

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
            {/* Non-breaking hyphens: "Spider-" alone on a line reads as a typo. */}
            {ACTIVE.meta.name.replace(/-/g, '\u2011')}
            <span className="masthead__subtitle">Reading Tree</span>
          </h1>
          <div className="masthead__range">
            {ALL_CHARACTERS.length > 1 && (
              // A link, not a toggle: each tree is its own page load — see
              // src/lib/character.js — and its own address to come back to.
              // Inside the range block rather than beside it, so it adds a line
              // to a block that already stacks instead of a row to the masthead.
              <nav className="masthead__trees" aria-label="Reading trees">
                {ALL_CHARACTERS.map((c) => (
                  <a key={c.key} href={`/${c.key}/`}
                     aria-current={c.key === ACTIVE.key ? 'page' : undefined}>
                    {c.name.replace(/-/g, '\u2011')}
                  </a>
                ))}
              </nav>
            )}
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
        {selecting && chosen ? (
          <SelectionView
            title={chosen.title}
            kind={chosen.kind}
            blurb={chosen.blurb}
            issues={chosenIssues}
            order={order}
            shelfMarks={shelfMarks}
            onSelect={handleSelect}
            onRead={setReadingId}
            onClear={clearSelection}
            route={route}
            arcKey={filters.arc}
            arcAccent={filters.arc ? arcAccent(filters.arc) : undefined}
          />
        ) : (
        <Timeline
          timeline={TIMELINE}
          visibleIds={visibleIds}
          pathOrder={pathOrder}
          pathActive={Boolean(path)}
          selectedId={selectedId}
          onSelect={handleSelect}
          shelfMarks={shelfMarks}
        />
        )}
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
