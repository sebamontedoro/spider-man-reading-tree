import { linksFor } from '../lib/links.js'
import { ARCS_BY_KEY } from '../../data/arcs.js'
import FocusGraph from './FocusGraph.jsx'

const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const formatDate = (issue) => {
  const [y, m] = issue.coverDate.split('-')
  if (issue.yearOnly) return y
  return `${MONTHS[Number(m)]} ${y}`
}

export default function DetailPanel({ issue, byId, onSelect, onClose }) {
  if (!issue) return null

  const links = linksFor(issue)
  const arcs = (issue.arcs || []).map((k) => ARCS_BY_KEY[k]).filter(Boolean)

  // Neighbours in the same run, for the previous/next buttons.
  const prev = (issue.connections || []).find((c) => c.type === 'continues' && c.dir === 'back')
  const next = (issue.connections || []).find((c) => c.type === 'continues' && c.dir === 'forward')

  return (
    <aside className="detail" aria-label="Issue detail">
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
        {issue.note && <p className="detail__note">{issue.note}</p>}

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
