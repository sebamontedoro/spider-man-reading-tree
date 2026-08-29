import YearBand from './YearBand.jsx'

export default function Timeline({
  timeline, visibleIds, pathOrder, pathActive, selectedId, onSelect,
}) {
  return (
    <div className="timeline halftone-ground">
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
          />
        ))}
      </div>
    </div>
  )
}
