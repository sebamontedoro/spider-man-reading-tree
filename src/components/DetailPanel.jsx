import { useCallback, useEffect, useRef, useState } from 'react'

import { linksFor } from '../lib/links.js'
import { useMediaQuery, PHONE } from '../lib/useMediaQuery.js'
import { ARCS_BY_KEY } from '../../data/arcs.js'
import { MILESTONE_TYPES } from '../../data/milestones.js'
import FocusGraph from './FocusGraph.jsx'

const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const formatDate = (issue) => {
  const [y, m] = issue.coverDate.split('-')
  if (issue.yearOnly) return y
  return `${MONTHS[Number(m)]} ${y}`
}

/** Where the sheet rests: mostly open, or nearly full. */
const PEEK = 0.38   // fraction of the viewport left showing the timeline
const FULL = 0.06

export default function DetailPanel({ issue, byId, onSelect, onClose }) {
  const isPhone = useMediaQuery(PHONE)
  const [offset, setOffset] = useState(null)   // null = resting at PEEK
  const drag = useRef(null)
  const sheetRef = useRef(null)

  // A new issue resets the sheet to its resting height, so tapping a
  // neighbouring card does not leave it wherever it was dragged.
  useEffect(() => { setOffset(null) }, [issue?.id])

  const onPointerDown = useCallback((e) => {
    if (!isPhone) return
    const h = window.innerHeight
    drag.current = { startY: e.clientY, startOffset: offset ?? h * PEEK }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }, [isPhone, offset])

  const onPointerMove = useCallback((e) => {
    if (!drag.current) return
    const h = window.innerHeight
    const next = drag.current.startOffset + (e.clientY - drag.current.startY)
    setOffset(Math.max(h * FULL, Math.min(next, h)))
  }, [])

  const onPointerUp = useCallback(() => {
    if (!drag.current) return
    const h = window.innerHeight
    const resting = offset ?? h * PEEK
    drag.current = null
    // Dragged most of the way down: treat it as a dismissal.
    if (resting > h * 0.72) { onClose(); return }
    setOffset(resting < h * (PEEK - 0.1) ? h * FULL : null)
  }, [offset, onClose])

  if (!issue) return null

  const links = linksFor(issue)
  const arcs = (issue.arcs || []).map((k) => ARCS_BY_KEY[k]).filter(Boolean)

  // Neighbours in the same run, for the previous/next buttons.
  const prev = (issue.connections || []).find((c) => c.type === 'continues' && c.dir === 'back')
  const next = (issue.connections || []).find((c) => c.type === 'continues' && c.dir === 'forward')

  return (
    <aside
      ref={sheetRef}
      className={`detail ${isPhone ? 'detail--sheet' : ''}`}
      aria-label="Issue detail"
      style={isPhone && offset !== null ? { top: `${offset}px` } : undefined}
    >
      {isPhone && (
        <div
          className="detail__grip"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="separator"
          aria-label="Drag to resize, or drag down to close"
        >
          <i />
        </div>
      )}
      <div className="detail__head halftone-blue">
        <button className="detail__close" onClick={onClose} aria-label="Close">×</button>
        <span className="label detail__kicker">{issue.seriesName}</span>
        <h2 className="detail__number">#{issue.number}</h2>
        <p className="detail__date">
          {issue.dateExact
            ? formatDate(issue)
            : <>~{formatDate(issue)} <span className="detail__est">estimated</span></>}
        </p>
      </div>

      <div className="detail__body">
        {issue.milestones?.length > 0 && (
          <div className="detail__milestones">
            {issue.milestones.map((m, i) => {
              const t = MILESTONE_TYPES[m.type] || MILESTONE_TYPES.debut
              return (
                <div
                  key={i}
                  className={`detail__milestone detail__milestone--${m.type}`}
                >
                  <span className="detail__ms-head">
                    <span aria-hidden="true">{t.glyph}</span> {t.label}
                  </span>
                  <strong className="detail__ms-label">{m.label}</strong>
                  {m.blurb && <p className="detail__ms-blurb">{m.blurb}</p>}
                </div>
              )
            })}
          </div>
        )}

        {issue.note && <p className="detail__note">{issue.note}</p>}

        {!issue.digital && (
          <p className="detail__nodigital">
            No digital edition found. Try a library service such as Hoopla or
            Libby, or a collected edition.
          </p>
        )}

        <div className="detail__nav">
          <button disabled={!prev} onClick={() => prev && onSelect(prev.to)}>
            ← Previous
          </button>
          <button disabled={!next} onClick={() => next && onSelect(next.to)}>
            Next →
          </button>
        </div>

        {issue.firstAppearances?.length > 0 && (
          <section className="detail__section">
            <h3 className="label">First appearances</h3>
            <ul className="taglist">
              {issue.firstAppearances.map((c) => (
                <li key={c} className="tag tag--first">{c}</li>
              ))}
            </ul>
          </section>
        )}

        {arcs.length > 0 && (
          <section className="detail__section">
            <h3 className="label">Story arcs</h3>
            {arcs.map((a) => (
              <div className="arc" key={a.key}>
                <strong className="arc__name">{a.name}</strong>
                {a.blurb && <p className="arc__blurb">{a.blurb}</p>}
              </div>
            ))}
          </section>
        )}

        <section className="detail__section">
          <h3 className="label">Connections</h3>
          <FocusGraph rootId={issue.id} byId={byId} onSelect={onSelect} />
        </section>

        <section className="detail__section">
          <h3 className="label">Look it up</h3>
          <ul className="linklist">
            {links.map((l) => (
              <li key={l.key}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label}
                  {!l.direct && <span className="linklist__badge">search</span>}
                </a>
                <span className="linklist__hint">{l.hint}</span>
              </li>
            ))}
          </ul>
          <p className="detail__disclaimer">
            Covers and story text stay on the sites above — this guide holds only
            publication data and its own notes.
          </p>
        </section>
      </div>
    </aside>
  )
}
