import { useEffect, useRef, useState } from 'react'
import IssueCard from './IssueCard.jsx'

const MONTHS = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

/**
 * One year of the timeline.
 *
 * Card contents mount only when the band is near the viewport. Rendering all
 * ~1100 cards at once is survivable but makes the first paint and every filter
 * change sluggish; this keeps both instant while the year headings — which give
 * the page its scroll structure — always stay in the DOM.
 */
export default function YearBand({
  year, months, count, visibleIds, pathOrder, pathActive, selectedId, onSelect,
}) {
  const ref = useRef(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setNear(true) },
      { rootMargin: '1200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near])

  // Reserve the height the cards will take, so scrolling doesn't jump as
  // bands mount. Rough but stable: rows of cards per month.
  const placeholderHeight = months.length * 96

  return (
    <section className="year" ref={ref} id={`year-${year}`}>
      <header className="year__header halftone-blue">
        <h2 className="year__number">{year}</h2>
        <span className="year__count">{count} issues</span>
      </header>

      {near ? (
        <div className="year__months">
          {months.map(({ month, issues }) => (
            <div className="month" key={month}>
              <div className="month__rail">
                <span className="month__name">{MONTHS[month]}</span>
              </div>
              <div className="month__issues">
                {issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    dimmed={
                      !visibleIds.has(issue.id) ||
                      (pathActive && !pathOrder.has(issue.id))
                    }
                    selected={selectedId === issue.id}
                    pathIndex={pathOrder.get(issue.id)}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="year__placeholder" style={{ height: placeholderHeight }} />
      )}
    </section>
  )
}
