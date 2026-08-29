import { SERIES_LIST, CHARACTERS, YEAR_RANGE } from '../lib/dataset.js'
import { DEFAULT_FILTERS, isFilterActive } from '../lib/filters.js'
import { ARCS_SORTED } from '../../data/arcs.js'
import { PATHS } from '../../data/paths.js'

const RELEVANCE = [
  { key: 'core', label: 'Core' },
  { key: 'notable', label: 'Notable' },
  { key: 'optional', label: 'Reprints & tie-ins' },
]

export default function FilterBar({
  filters, onChange, pathKey, onPathChange, shownCount, totalCount,
}) {
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
  }

  return (
    <div className="filterbar">
      <div className="filterbar__row">
        <label className="filterbar__search">
          <span className="sr-only">Search issues</span>
          <input
            type="search"
            placeholder="Search a series, issue number, character or arc…"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
          />
        </label>

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

        <span className="filterbar__count">
          <strong>{shownCount}</strong> of {totalCount}
        </span>

        {(isFilterActive(filters) || pathKey) && (
          <button className="filterbar__reset" onClick={reset}>Reset</button>
        )}
      </div>

      <div className="filterbar__row filterbar__row--secondary">
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
            className={`chip ${filters.digitalOnly ? 'chip--on' : ''}`}
            onClick={() => set({ digitalOnly: !filters.digitalOnly })}
            aria-pressed={filters.digitalOnly}
            title="Only issues with a digital edition on Marvel Unlimited"
          >
            Readable now
          </button>
        </span>
      </div>
    </div>
  )
}
