import { useEffect, useMemo, useState } from 'react'

import { ISSUE_BY_ID } from '../lib/dataset.js'
import { arcDuo, duoBackground, useArcLift } from '../lib/palette.js'
import { SHELVED, READING, READ } from '../lib/progress.js'

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const PER_PAGE = 25

const coverDate = (d) => {
  const [y, m] = (d || '').split('-')
  return m ? `${MONTHS[Number(m)]} ${y}` : y || ''
}

/**
 * What a selection actually is, once you have made one.
 *
 * Choosing an arc used to dim the other two thousand issues and scroll you
 * somewhere into sixty-four years of timeline, with the six you asked for
 * scattered across three title strips. The answer to "what did I just select"
 * was a shape you had to reconstruct.
 *
 * So a selection replaces the timeline with itself: what it is, how long it
 * runs, and its issues in reading order. The first issue is a button rather
 * than a row to find, because starting is what a reading guide is for.
 *
 * The timeline is one click back and keeps its scroll position, which is what
 * makes replacing it rather than splitting the screen the cheap move.
 */
export default function SelectionView({
  title, kind, blurb, issues, order, shelfMarks, onSelect, onRead, onClear,
  route, arcKey, arcAccent,
}) {
  const [page, setPage] = useState(0)
  const [all, setAll] = useState(false)
  const lift = useArcLift()

  // A new selection starts at its beginning, not wherever the last one ended.
  useEffect(() => { setPage(0); setAll(false) }, [route])

  const total = issues.length
  const paged = !all && total > PER_PAGE
  const from = paged ? page * PER_PAGE : 0
  const to = paged ? Math.min(from + PER_PAGE, total) : total
  const slice = issues.slice(from, to)

  // One title all the way down needs saying once, in the header. Six issues
  // across three of them needs saying on every row.
  const oneSeries = useMemo(
    () => new Set(issues.map((i) => i.seriesName)).size === 1,
    [issues],
  )

  const first = issues[0]
  const span = useMemo(() => {
    if (!total) return ''
    const a = issues[0].coverDate.slice(0, 4)
    const b = issues[total - 1].coverDate.slice(0, 4)
    return a === b ? a : `${a}–${b}`
  }, [issues, total])

  const onShelf = useMemo(
    () => issues.filter((i) => shelfMarks.has(i.id)).length,
    [issues, shelfMarks],
  )

  const duo = arcKey ? arcDuo(arcKey, arcAccent, lift) : null

  const start = () => {
    if (!first) return
    // Reading is the point; the panel is the consolation when there is no file.
    if (shelfMarks.has(first.id)) onRead(first.id)
    else onSelect(first.id)
  }

  return (
    <section className="selection" aria-label={title}>
      {duo && (
        <div className="selection__band" aria-hidden="true">
          <i style={{ background: duo[0] }} />
          <i style={{ background: duo[1] }} />
        </div>
      )}

      <div className="selection__inner">
      <button className="selection__back" onClick={onClear}>
        ← Back to the timeline
      </button>

      <header className="selection__head">
        <p className="selection__kind">{kind}</p>
        <h2 className="selection__title">{title}</h2>
        {blurb && <p className="selection__blurb">{blurb}</p>}

        <p className="selection__meta">
          <span><strong>{total}</strong> issue{total === 1 ? '' : 's'}</span>
          {span && <span>{span}</span>}
          {oneSeries && <span>{issues[0].seriesName}</span>}
          <span><strong>{onShelf}</strong> on the shelf</span>
          {route && <code className="selection__route">{route}</code>}
        </p>

        {first && (
          <button className="selection__start" onClick={start}>
            ▶ Start with {first.seriesAbbr} #{first.number}
          </button>
        )}
      </header>

      {total === 0 && (
        <p className="selection__empty">Nothing in the tree matches this yet.</p>
      )}

      <ol className="selection__rows" start={from + 1}>
        {slice.map((issue, n) => {
          const mark = shelfMarks.get(issue.id)
          return (
            <li key={issue.id} className="selection__row">
              <span className="selection__n">{order ? order.get(issue.id) : from + n + 1}</span>
              <span
                className="selection__accent"
                style={{ background: `var(--s-${issue.accent})` }}
                aria-hidden="true"
              />
              <button className="selection__issue" onClick={() => onSelect(issue.id)}>
                <b>{issue.seriesAbbr} #{issue.number}</b>
                {!oneSeries && <span>{issue.seriesName}</span>}
              </button>
              <span className="selection__date">{coverDate(issue.coverDate)}</span>
              {mark ? (
                <button
                  className={`selection__dot selection__dot--${
                    mark === READ ? 'read' : mark === READING ? 'reading' : 'shelved'}`}
                  onClick={() => onRead(issue.id)}
                  title={mark === READ ? 'Read — open again'
                       : mark === READING ? 'Part-read — pick up where you left off'
                       : 'On the shelf — read it here'}
                >
                  <span className="sr-only">Read {issue.seriesAbbr} #{issue.number}</span>
                </button>
              ) : (
                <span className="selection__dot selection__dot--absent" title="No file on the shelf" />
              )}
            </li>
          )
        })}
      </ol>

      {paged && (
        <div className="selection__pager">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>← Previous</button>
          <span>{from + 1}–{to} of {total}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={to >= total}>Next →</button>
          <button className="selection__all" onClick={() => setAll(true)}>Show all {total}</button>
        </div>
      )}
      {!paged && total > PER_PAGE && (
        <div className="selection__pager">
          <span>all {total}, in one run</span>
          <button className="selection__all" onClick={() => { setAll(false); setPage(0) }}>
            Back to pages
          </button>
        </div>
      )}
      </div>
    </section>
  )
}
