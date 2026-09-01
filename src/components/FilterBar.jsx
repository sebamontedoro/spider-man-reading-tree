import { useState } from 'react'

import { SERIES_LIST, CHARACTERS, YEAR_RANGE, UNIVERSES } from '../lib/dataset.js'
import { DEFAULT_FILTERS, isFilterActive, countActiveFilters } from '../lib/filters.js'
import { useMediaQuery, PHONE } from '../lib/useMediaQuery.js'
import { ARCS_SORTED } from '../../data/arcs.js'
import { PATHS } from '../../data/paths.js'
import { MILESTONE_TYPES } from '../../data/milestones.js'

const RELEVANCE = [
  { key: 'core', label: 'Core' },
  { key: 'notable', label: 'Notable' },
  { key: 'optional', label: 'Reprints & tie-ins' },
]

export default function FilterBar({
  filters, onChange, pathKey, onPathChange, shownCount, totalCount, shelfCount = 0,
}) {
  const isPhone = useMediaQuery(PHONE)
  const [sheetOpen, setSheetOpen] = useState(false)

  const activeCount = countActiveFilters(filters)
  const set = (patch) => onChange({ ...filters, ...patch })

  const toggleRelevance = (key) => {
    const next = filters.relevance.includes(key)
      ? filters.relevance.filter((r) => r !== key)
      : [...filters.relevance, key]
    set({ relevance: next })
  }

  const reset = () => {
    onChange(DEFAULT_FILTERS)
    onPathChange(null)
    setSheetOpen(false)
  }

  const search = (
    <label className="filterbar__search">
      <span className="sr-only">Search issues</span>
      <input
        type="search"
        placeholder={isPhone ? 'Search…' : 'Search a series, issue number, character or arc…'}
        value={filters.query}
        onChange={(e) => set({ query: e.target.value })}
      />
    </label>
  )

  const pathSelect = (
    <select
      className="filterbar__select"
      value={pathKey || ''}
      onChange={(e) => onPathChange(e.target.value || null)}
      aria-label="Reading path"
    >
      <option value="">Reading path — none</option>
      {PATHS.map((p) => (
        <option key={p.key} value={p.key}>{p.name}</option>
      ))}
    </select>
  )

  /**
   * Defined once, rendered inline on a wide screen and inside the sheet on a
   * phone. Sharing the markup is what stops the two layouts drifting apart as
   * filters get added — there is only one place to add them.
   */
  const controls = (
    <>
      <div className="filterbar__row filterbar__row--secondary">
        {UNIVERSES.length > 1 && (
          <select
            className="filterbar__select"
            value={filters.universe || ''}
            onChange={(e) => set({ universe: e.target.value || null })}
            aria-label="Continuity"
          >
            <option value="">All continuities</option>
            {UNIVERSES.map((u) => (
              <option key={u.key} value={u.key}>{u.label} ({u.count})</option>
            ))}
          </select>
        )}

        <select
          className="filterbar__select"
          value={filters.series || ''}
          onChange={(e) => set({ series: e.target.value || null })}
          aria-label="Series"
        >
          <option value="">All series</option>
          {SERIES_LIST.map((s) => (
            <option key={s.key} value={s.key}>{s.name} ({s.count})</option>
          ))}
        </select>

        <select
          className="filterbar__select"
          value={filters.arc || ''}
          onChange={(e) => set({ arc: e.target.value || null })}
          aria-label="Story arc"
        >
          <option value="">All arcs</option>
          {ARCS_SORTED.map((a) => (
            <option key={a.key} value={a.key}>{a.name}</option>
          ))}
        </select>

        <select
          className="filterbar__select"
          value={filters.character || ''}
          onChange={(e) => set({ character: e.target.value || null })}
          aria-label="First appearance of"
        >
          <option value="">First appearance of…</option>
          {CHARACTERS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <span className="filterbar__years">
          <input
            type="number" min={YEAR_RANGE[0]} max={YEAR_RANGE[1]}
            placeholder={String(YEAR_RANGE[0])}
            value={filters.yearFrom || ''}
            onChange={(e) => set({ yearFrom: Number(e.target.value) || null })}
            aria-label="From year"
          />
          <span aria-hidden="true">–</span>
          <input
            type="number" min={YEAR_RANGE[0]} max={YEAR_RANGE[1]}
            placeholder={String(YEAR_RANGE[1])}
            value={filters.yearTo || ''}
            onChange={(e) => set({ yearTo: Number(e.target.value) || null })}
            aria-label="To year"
          />
        </span>

        <span className="filterbar__toggles">
          {RELEVANCE.map((r) => (
            <button
              key={r.key}
              className={`chip ${filters.relevance.includes(r.key) ? 'chip--on' : ''}`}
              onClick={() => toggleRelevance(r.key)}
              aria-pressed={filters.relevance.includes(r.key)}
            >
              {r.label}
            </button>
          ))}
          <button
            className={`chip ${filters.keyOnly ? 'chip--on' : ''}`}
            onClick={() => set({ keyOnly: !filters.keyOnly })}
            aria-pressed={filters.keyOnly}
          >
            Key issues
          </button>
          <button
            className={`chip ${filters.milestoneOnly ? 'chip--on' : ''}`}
            onClick={() => set({ milestoneOnly: !filters.milestoneOnly, milestoneType: null })}
            aria-pressed={filters.milestoneOnly}
            title="Only issues carrying a story milestone"
          >
            Milestones
          </button>
          <button
            className={`chip ${filters.digitalOnly ? 'chip--on' : ''}`}
            onClick={() => set({ digitalOnly: !filters.digitalOnly })}
            aria-pressed={filters.digitalOnly}
            title="Only issues with a digital edition on Marvel Unlimited"
          >
            Readable now
          </button>

          {/* Only offered when there is a shelf to filter by. Without the
              reader service these would just empty the timeline with no way
              for anyone to work out why. */}
          {shelfCount > 0 && (
            <>
              <button
                className={`chip chip--shelf ${filters.onShelf ? 'chip--on' : ''}`}
                onClick={() => set({ onShelf: !filters.onShelf })}
                aria-pressed={filters.onShelf}
                title={`Only the ${shelfCount} issues held on the shelf`}
              >
                On my shelf
              </button>
              <button
                className={`chip chip--shelf ${filters.unreadOnly ? 'chip--on' : ''}`}
                onClick={() => set({ unreadOnly: !filters.unreadOnly })}
                aria-pressed={filters.unreadOnly}
                title="On the shelf and not finished"
              >
                Not read yet
              </button>
            </>
          )}
        </span>
      </div>

      <div className="filterbar__row filterbar__row--legend">
        <span className="ms-legend">
          {Object.values(MILESTONE_TYPES).map((t) => {
            const on = filters.milestoneType === t.key
            return (
              <button
                key={t.key}
                className={`ms-legend__item ${on ? 'ms-legend__item--on' : ''}`}
                style={{ color: on ? t.accent : undefined }}
                onClick={() =>
                  set({ milestoneType: on ? null : t.key, milestoneOnly: false })
                }
                aria-pressed={on}
                title={t.description}
              >
                <i className="ms-legend__glyph" style={{ color: t.accent }}>
                  {t.glyph}
                </i>
                {t.label}
              </button>
            )
          })}
        </span>
      </div>
    </>
  )

  /* -- phone: search stays out, everything else moves into a sheet --------- */

  if (isPhone) {
    return (
      <>
        <div className="filterbar filterbar--compact">
          {search}
          <button
            className={`sheet-open ${activeCount ? 'sheet-open--on' : ''}`}
            onClick={() => setSheetOpen(true)}
            aria-expanded={sheetOpen}
          >
            Filters
            {/* The count is the whole point of collapsing them: filtering
                without noticing is otherwise the easiest mistake here. */}
            {activeCount > 0 && <span className="sheet-open__count">{activeCount}</span>}
          </button>
        </div>

        {sheetOpen && (
          <div className="sheet-backdrop" onClick={() => setSheetOpen(false)}>
            <div
              className="sheet"
              role="dialog"
              aria-label="Filters"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet__grip" aria-hidden="true" />
              <div className="sheet__head">
                <strong>Filters</strong>
                <span className="filterbar__count">
                  <strong>{shownCount}</strong> of {totalCount}
                </span>
                <button className="sheet__close" onClick={() => setSheetOpen(false)}>
                  Done
                </button>
              </div>
              <div className="sheet__body">
                {pathSelect}
                {controls}
                {(isFilterActive(filters) || pathKey) && (
                  <button className="filterbar__reset sheet__reset" onClick={reset}>
                    Reset everything
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  /* -- wide screen: everything inline ------------------------------------- */

  return (
    <div className="filterbar">
      <div className="filterbar__row">
        {search}
        {pathSelect}

        <span className="filterbar__count">
          <strong>{shownCount}</strong> of {totalCount}
        </span>

        {(isFilterActive(filters) || pathKey) && (
          <button className="filterbar__reset" onClick={reset}>Reset</button>
        )}
      </div>

      {controls}
    </div>
  )
}
