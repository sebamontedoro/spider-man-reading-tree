import { useCallback, useMemo, useState } from 'react'

import { ISSUES, ISSUE_BY_ID, TIMELINE, STATS, YEAR_RANGE } from './lib/dataset.js'
import { DEFAULT_FILTERS, applyFilters, resolvePath } from './lib/filters.js'
import { PATHS_BY_KEY } from '../data/paths.js'

import FilterBar from './components/FilterBar.jsx'
import Timeline from './components/Timeline.jsx'
import DetailPanel from './components/DetailPanel.jsx'

import './styles/app.css'

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [pathKey, setPathKey] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const path = pathKey ? PATHS_BY_KEY[pathKey] : null

  // Ids surviving the filters. Everything else is dimmed rather than removed,
  // so the shape of the timeline stays readable while you narrow it down.
  const visibleIds = useMemo(
    () => new Set(applyFilters(ISSUES, filters).map((i) => i.id)),
    [filters],
  )

  // Position along the active reading path, used to number the route.
  const pathOrder = useMemo(() => {
    const ids = resolvePath(path, ISSUES)
    return new Map(ids.map((id, i) => [id, i + 1]))
  }, [path])

  const selected = selectedId ? ISSUE_BY_ID.get(selectedId) : null

  const handleSelect = useCallback(
    (id) => setSelectedId((cur) => (cur === id ? null : id)),
    [],
  )

  const shownCount = path ? pathOrder.size : visibleIds.size

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
              {STATS.total} issues · {STATS.keyIssues} key · {STATS.guest} guest appearances
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
      />

      <main className="app__body">
        <Timeline
          timeline={TIMELINE}
          visibleIds={visibleIds}
          pathOrder={pathOrder}
          pathActive={Boolean(path)}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </main>

      <DetailPanel
        issue={selected}
        byId={ISSUE_BY_ID}
        onSelect={handleSelect}
        onClose={() => setSelectedId(null)}
      />
    </div>
  )
}
