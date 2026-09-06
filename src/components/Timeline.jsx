import { useEffect, useRef } from 'react'

import YearBand from './YearBand.jsx'

/**
 * Where the timeline was left, across the times it is not on screen.
 *
 * Choosing something swaps the timeline out for the selection, so React
 * unmounts it and the scroll goes with it — come back from an arc in 1987 and
 * you are looking at 1962 again. Module scope rather than component state
 * because the component is exactly what stops existing.
 */
let lastScroll = 0

export default function Timeline({
  timeline, visibleIds, pathOrder, pathActive, selectedId, onSelect, shelfMarks,
}) {
  const scroller = useRef(null)

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollTop = lastScroll
    const remember = () => { lastScroll = el.scrollTop }
    el.addEventListener('scroll', remember, { passive: true })
    return () => { remember(); el.removeEventListener('scroll', remember) }
  }, [])

  return (
    <div className="timeline halftone-ground" ref={scroller}>
      <nav className="timeline__jump" aria-label="Jump to year">
        {timeline.map(({ year }) => (
          <a key={year} href={`#year-${year}`}>{String(year).slice(2)}</a>
        ))}
      </nav>

      <div className="timeline__track">
        {timeline.map((band) => (
          <YearBand
            key={band.year}
            {...band}
            visibleIds={visibleIds}
            pathOrder={pathOrder}
            pathActive={pathActive}
            selectedId={selectedId}
            onSelect={onSelect}
            shelfMarks={shelfMarks}
          />
        ))}
      </div>
    </div>
  )
}
