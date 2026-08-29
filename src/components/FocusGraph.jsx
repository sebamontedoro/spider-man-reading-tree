import { useMemo } from 'react'
import { buildFocusGraph } from '../lib/graph.js'

const EDGE_STYLE = {
  continues: { stroke: 'var(--ink-faint)', dash: null },
  arc:       { stroke: 'var(--blue)',      dash: null },
  crossover: { stroke: 'var(--red)',       dash: '6 4' },
}

const NODE_W = 128
const NODE_H = 46
const PAD = 20

/**
 * The neighbourhood of the focused issue: what leads into it, what follows,
 * and which other titles it crosses over with. Drawn straight to SVG — the
 * subgraph is small enough that a layout library would cost more than it saves.
 */
export default function FocusGraph({ rootId, byId, onSelect }) {
  const { nodes, edges, width, height } = useMemo(
    () => buildFocusGraph(rootId, byId),
    [rootId, byId],
  )

  if (!nodes.length) return null

  const w = width + PAD * 2
  const h = height + PAD * 2

  return (
    <div className="focusgraph">
      <div className="focusgraph__scroll">
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="Connections to and from this issue"
        >
          <g transform={`translate(${PAD} ${PAD})`}>
            {edges.map((e, i) => {
              const style = EDGE_STYLE[e.type] || EDGE_STYLE.continues
              return (
                <line
                  key={i}
                  x1={e.from.x} y1={e.from.y}
                  x2={e.to.x}   y2={e.to.y}
                  stroke={style.stroke}
                  strokeWidth={e.type === 'crossover' ? 2.5 : 1.5}
                  strokeDasharray={style.dash || undefined}
                />
              )
            })}

            {nodes.map((n) => {
              const isRoot = n.id === rootId
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x - NODE_W / 2} ${n.y - NODE_H / 2})`}
                  className={`gnode ${isRoot ? 'gnode--root' : ''}`}
                  onClick={() => !isRoot && onSelect(n.id)}
                  role={isRoot ? undefined : 'button'}
                  tabIndex={isRoot ? undefined : 0}
                  onKeyDown={(ev) => {
                    if (!isRoot && (ev.key === 'Enter' || ev.key === ' ')) {
                      ev.preventDefault()
                      onSelect(n.id)
                    }
                  }}
                >
                  <rect
                    width={NODE_W} height={NODE_H}
                    fill={isRoot ? 'var(--ink)' : 'var(--paper-raised)'}
                    stroke="var(--ink)"
                    strokeWidth={isRoot ? 3 : 2}
                  />
                  <text
                    x={10} y={19}
                    className="gnode__series"
                    fill={isRoot ? 'var(--paper)' : 'var(--ink-faint)'}
                  >
                    {n.issue.seriesAbbr}
                  </text>
                  <text
                    x={10} y={37}
                    className="gnode__number"
                    fill={isRoot ? 'var(--paper)' : 'var(--ink)'}
                  >
                    #{n.issue.number}
                  </text>
                  <text
                    x={NODE_W - 10} y={37}
                    textAnchor="end"
                    className="gnode__date"
                    fill={isRoot ? 'var(--paper)' : 'var(--ink-faint)'}
                  >
                    {n.issue.coverDate}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      <ul className="focusgraph__legend">
        <li><i className="key key--continues" />Same run</li>
        <li><i className="key key--arc" />Same arc</li>
        <li><i className="key key--crossover" />Crossover</li>
      </ul>
    </div>
  )
}
