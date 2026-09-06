import { useMemo, useState } from 'react'

import { SERIES_LIST, CHARACTERS, YEAR_RANGE, UNIVERSES, ISSUE_BY_ID } from '../lib/dataset.js'
import { DEFAULT_FILTERS, isFilterActive, countActiveFilters } from '../lib/filters.js'
import { optionsFor, narrowedBy } from '../lib/scope.js'
import { arcDuo, duoBackground, useArcLift } from '../lib/palette.js'
import { useMediaQuery, PHONE } from '../lib/useMediaQuery.js'
import Picker from './Picker.jsx'
import { ARCS_SORTED, ARCS_BY_KEY } from '../../data/arcs.js'
import { PATHS, PATHS_BY_KEY } from '../../data/paths.js'
import { MILESTONE_TYPES } from '../../data/milestones.js'

const RELEVANCE = [
  { key: 'core', label: 'Core' },
  { key: 'notable', label: 'Notable' },
  // Sin Marvel Tales no quedan reediciones: lo que agrupa hoy son los 57
  // numeros de Spidey Super Stories y el manual del Clone Journal.
  { key: 'optional', label: 'Tie-ins & handbooks' },
]

/** The series accent an uncurated arc borrows, taken from where it mostly runs. */
const ARC_ACCENT = new Map(
  ARCS_SORTED.map((a) => {
    const counts = new Map()
    for (const id of a.issues) {
      const accent = ISSUE_BY_ID.get(id)?.accent
      if (accent) counts.set(accent, (counts.get(accent) || 0) + 1)
    }
    const best = [...counts.entries()].sort((x, y) => y[1] - x[1])[0]
    return [a.key, best ? best[0] : 'asm']
  }),
)

export default function FilterBar({
  filters, onChange, pathKey, onPathChange, shownCount, totalCount, shelfCount = 0,
}) {
  const isPhone = useMediaQuery(PHONE)
  const [sheetOpen, setSheetOpen] = useState(false)
  const lift = useArcLift()

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

  /* -- the four dimensions ------------------------------------------------ */

  /** What each picker is narrowed by, named so it can be said out loud. */
  const selection = { series: filters.series, arc: filters.arc, path: pathKey, character: filters.character }
  const labels = {
    series: SERIES_LIST.find((s) => s.key === filters.series)?.name,
    arc: ARCS_BY_KEY[filters.arc]?.name,
    path: PATHS_BY_KEY[pathKey]?.name,
    character: filters.character,
  }
  const by = (kind) => narrowedBy(selection, kind, labels)

  const seriesOptions = useMemo(
    () => optionsFor('series', SERIES_LIST, selection),
    [filters.arc, pathKey, filters.character],
  )
  const arcOptions = useMemo(
    () => optionsFor('arc', ARCS_SORTED, selection),
    [filters.series, pathKey, filters.character],
  )
  const pathOptions = useMemo(
    () => optionsFor('path', PATHS, selection),
    [filters.series, filters.arc, filters.character],
  )
  const charOptions = useMemo(
    () => optionsFor('character', CHARACTERS, selection, (c) => c),
    [filters.series, filters.arc, pathKey],
  )

  const pickers = (
    <>
      <Picker
        kind="series" noun="series" label="Series"
        options={seriesOptions} value={filters.series}
        onChange={(key) => set({ series: key })}
        narrowedBy={by('series')}
        labelOf={(s) => s.name}
        metaOf={(s) => `${s.count}`}
        swatchOf={(s) => `var(--s-${s.accent})`}
      />
      <Picker
        kind="arc" noun="arcs" label="Arc"
        options={arcOptions} value={filters.arc}
        onChange={(key) => set({ arc: key })}
        narrowedBy={by('arc')}
        labelOf={(a) => a.name}
        metaOf={(a) => `${a.year} · ${a.issues.length}`}
        swatchOf={(a) => duoBackground(arcDuo(a.key, ARC_ACCENT.get(a.key), lift))}
      />
      <Picker
        kind="path" noun="reading paths" label="Reading path"
        options={pathOptions} value={pathKey}
        onChange={onPathChange}
        narrowedBy={by('path')}
        labelOf={(p) => p.name}
        metaOf={() => 'path'}
      />
      <Picker
        kind="character" noun="characters" label="First appearance of…"
        options={charOptions} value={filters.character}
        onChange={(key) => set({ character: key })}
        narrowedBy={by('character')}
        keyOf={(c) => c}
        labelOf={(c) => c}
      />
    </>
  )

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

  /**
   * Everything that is not a dimension.
   *
   * These used to sit open across two rows, and between them and the legend
   * the scaffolding stood taller than the first row of cards. They are still
   * one click away, and the button carries the count — filtering without
   * noticing is the mistake collapsing them could cause, and the count is what
   * stops it.
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

  const sheet = sheetOpen && (
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
          <button className="sheet__close" onClick={() => setSheetOpen(false)}>Done</button>
        </div>
        <div className="sheet__body">
          {controls}
          {(isFilterActive(filters) || pathKey) && (
            <button className="filterbar__reset sheet__reset" onClick={reset}>
              Reset everything
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const filtersButton = (
    <button
      className={`sheet-open ${activeCount ? 'sheet-open--on' : ''}`}
      onClick={() => setSheetOpen(true)}
      aria-expanded={sheetOpen}
    >
      Filters
      {activeCount > 0 && <span className="sheet-open__count">{activeCount}</span>}
    </button>
  )

  if (isPhone) {
    return (
      <>
        <div className="filterbar filterbar--compact">
          {search}
          {filtersButton}
        </div>
        <div className="filterbar filterbar--pickers">{pickers}</div>
        {sheet}
      </>
    )
  }

  return (
    <div className="filterbar">
      <div className="filterbar__row">
        {search}
        {pickers}
        <span className="filterbar__count">
          <strong>{shownCount}</strong> of {totalCount}
        </span>
        {filtersButton}
        {(isFilterActive(filters) || pathKey) && (
          <button className="filterbar__reset" onClick={reset}>Reset</button>
        )}
      </div>
      {sheet}
    </div>
  )
}
