import { memo } from 'react'

import { SHELVED, READING, READ } from '../lib/progress.js'

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * How far into an issue you are, when there is a local file behind it. A
 * number rather than an object so the card's memo keeps holding: the shelf
 * marks change on every page turn, and re-rendering a thousand cards for one
 * of them would be felt.
 */
const SHELF_LABEL = {
  [SHELVED]: 'on the shelf',
  [READING]: 'part-read',
  [READ]: 'read',
}
const SHELF_CLASS = {
  [SHELVED]: 'issue__shelf--new',
  [READING]: 'issue__shelf--part',
  [READ]: 'issue__shelf--done',
}

function IssueCard({ issue, dimmed, selected, pathIndex, onSelect, shelf = 0 }) {
  const [, m] = issue.coverDate.split('-')
  const date = issue.yearOnly ? 'Annual' : MONTHS[Number(m)]

  const cls = [
    'issue',
    `issue--${issue.accent}`,
    `issue--${issue.relevance}`,
    dimmed ? 'dimmed' : '',
    selected ? 'issue--selected' : '',
    issue.keyIssue ? 'issue--key' : '',
    shelf ? 'issue--shelved' : '',
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
        (issue.digital ? ' · available digitally' : ' · no digital edition') +
        (shelf ? ` · ${SHELF_LABEL[shelf]}` : '')
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

      {/* A file on the shelf, and how far through it you are. Kept to a mark
          in the corner: the card already carries five other signals. */}
      {shelf > 0 && (
        <span className={`issue__shelf ${SHELF_CLASS[shelf]}`} aria-hidden="true" />
      )}
    </button>
  )
}

export default memo(IssueCard)
