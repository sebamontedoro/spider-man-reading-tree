import { memo } from 'react'
import { MILESTONE_TYPES } from '../../data/milestones.js'

/**
 * A story beat, given a full-width row of its own.
 *
 * Milestones deliberately break the compact grid the ordinary issues sit in.
 * Scrolling twenty-eight years of publication, these are what make the timeline
 * read as a story rather than a catalogue — so they are allowed to interrupt.
 */
function MilestoneRow({ milestone, issue, dimmed, selected, onSelect }) {
  const type = MILESTONE_TYPES[milestone.type] || MILESTONE_TYPES.debut

  return (
    <button
      className={[
        'milestone',
        `milestone--${milestone.type}`,
        dimmed ? 'dimmed' : '',
        selected ? 'milestone--selected' : '',
      ].filter(Boolean).join(' ')}
      onClick={() => onSelect(issue.id)}
      aria-pressed={selected}
      title={`${issue.seriesName} #${issue.number}`}
    >
      <span className="milestone__glyph" aria-hidden="true">{type.glyph}</span>

      <span className="milestone__body">
        <span className="milestone__head">
          <span className="milestone__type">{type.label}</span>
          <span className="milestone__issue">
            {issue.seriesAbbr} #{issue.number}
          </span>
        </span>
        <span className="milestone__label">{milestone.label}</span>
        {milestone.blurb && (
          <span className="milestone__blurb">{milestone.blurb}</span>
        )}
      </span>
    </button>
  )
}

export default memo(MilestoneRow)
