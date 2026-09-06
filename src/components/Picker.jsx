import { useEffect, useId, useMemo, useRef, useState } from 'react'

/**
 * One dimension of the selection, as a list you can type into.
 *
 * These were four native selects, and the lists outgrew them: eighty-six arcs
 * and fifty-seven series in alphabetical order, with nothing on the row to say
 * what year an arc is or how long it runs. Picking "Kraven's Last Hunt" meant
 * scrolling eighty-six names that all begin the same way.
 *
 * So: a filter field, and every row carries its own context — the arc's year
 * and length, the series' issue count, the colours of whoever the arc is
 * about. The swatch is the part that earns its width. In a list this long the
 * colour is recognised before the name is read, which is the whole reason
 * data/arc-palette.js exists.
 *
 * The button doubles as the clear: once something is chosen the row it came
 * from is not interesting any more, and a separate ✕ is another target to hit.
 */
export default function Picker({
  kind, label, noun, options, value, onChange, narrowedBy = [], swatchOf,
  metaOf, labelOf, keyOf = (o) => o.key,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const box = useRef(null)
  const field = useRef(null)
  const listId = useId()

  const chosen = value ? options.find((o) => keyOf(o) === value)
    // A choice can outlive its list: narrowing the others may drop the row it
    // came from. The button keeps naming it rather than going blank.
    : null

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => labelOf(o).toLowerCase().includes(q))
  }, [options, query, labelOf])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setCursor(0)
    const t = setTimeout(() => field.current?.focus(), 0)
    const away = (e) => { if (!box.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', away)
    return () => { clearTimeout(t); document.removeEventListener('mousedown', away) }
  }, [open])

  const narrowed = narrowedBy.length > 0
  const empty = options.length === 0

  const pick = (o) => { onChange(keyOf(o)); setOpen(false) }

  const onKey = (e) => {
    if (e.key === 'Escape') { setOpen(false); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, shown.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
    else if (e.key === 'Enter' && shown[cursor]) { e.preventDefault(); pick(shown[cursor]) }
  }

  return (
    <div className="picker" ref={box}>
      <button
        type="button"
        className={`picker__btn ${value ? 'picker__btn--set' : ''}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={empty && !value}
        title={empty && !value ? `No ${noun} run through ${narrowedBy.join(' + ')}` : undefined}
        onClick={() => (value ? onChange(null) : setOpen((o) => !o))}
      >
        {chosen ? labelOf(chosen) : value ? value : label}
        {narrowed && !value && <em className="picker__count">{options.length}</em>}
        <i aria-hidden="true">{value ? '✕' : '▾'}</i>
      </button>

      {open && (
        <div className="picker__pop" role="dialog" aria-label={label}>
          <div className="picker__filter">
            <input
              ref={field}
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCursor(0) }}
              onKeyDown={onKey}
              placeholder={`Filter ${options.length} ${noun}…`}
              aria-controls={listId}
            />
          </div>

          {/* Why the list is shorter than it was — otherwise a picker that
              silently drops three quarters of its rows looks broken. */}
          {narrowed && (
            <p className="picker__why">
              Only what crosses <b>{narrowedBy.join(' + ')}</b>.
            </p>
          )}

          <ul className="picker__list" id={listId} role="listbox">
            {shown.map((o, i) => {
              const k = keyOf(o)
              const swatch = swatchOf?.(o)
              return (
                <li key={k} role="option" aria-selected={k === value}>
                  <button
                    type="button"
                    className={`picker__opt ${i === cursor ? 'picker__opt--cursor' : ''}`}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => pick(o)}
                  >
                    {swatch && <i className="picker__swatch" style={{ background: swatch }} />}
                    <b>{labelOf(o)}</b>
                    <span>{metaOf?.(o)}</span>
                  </button>
                </li>
              )
            })}
            {shown.length === 0 && (
              <li className="picker__none">Nothing matches “{query}”.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
