import { memo } from 'react'

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function IssueCard({ issue, dimmed, selected, pathIndex, onSelect }) {
  const [, m] = issue.coverDate.split('-')
  const date = issue.yearOnly ? 'Annual' : MONTHS[Number(m)]

  const cls = [
    'issue',
    `issue--${issue.accent}`,
    `issue--${issue.relevance}`,
    dimmed ? 'dimmed' : '',
    selected ? 'issue--selected' : '',
    issue.keyIssue ? 'issue--key' : '',
    // A parallel continuity gets a visibly different card, not just a colour.
    (issue.universe && issue.universe !== 'earth-616') ? 'issue--other-universe' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      id={`issue-${issue.id}`}
      className={cls}
      onClick={() => onSelect(issue.id)}
      aria-pressed={selected}
      title={
        `${issue.seriesName} #${issue.number}` +
        (issue.digital ? ' · available digitally' : ' · no digital edition')
      }
    >
      {pathIndex ? <span className="issue__step">{pathIndex}</span> : null}

      <span className="issue__series">{issue.seriesAbbr}</span>
      <span className="issue__number">{issue.number}</span>

      <span className="issue__date">
        {/* A dot marks an issue with a digital edition; a tilde marks an
            estimated cover date — see data/series.js. */}
        {issue.digital && <i className="issue__digital" aria-hidden="true" />}
        {issue.dateExact ? '' : '~'}{date}
      </span>

      {issue.keyIssue && <span className="issue__star" aria-label="Key issue">★</span>}
    </button>
  )
}

export default memo(IssueCard)
