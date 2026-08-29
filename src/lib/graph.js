/**
 * Builds the small neighbourhood graph shown when an issue is focused.
 *
 * The subgraph is tiny — typically five to fifteen nodes — so it gets a
 * deterministic column layout rather than a force simulation: nodes are placed
 * by hop distance from the focused issue, which reads as "what came before,
 * what comes after" instead of an arbitrary cloud. That also means no graph
 * library, and no ~100 kB dependency for a diagram this small.
 */

const MAX_HOPS = 2

/** Collect ids within MAX_HOPS of the focus, recording each one's distance. */
const walk = (rootId, byId) => {
  const dist = new Map([[rootId, 0]])
  const queue = [rootId]

  while (queue.length) {
    const id = queue.shift()
    const d = dist.get(id)
    if (d >= MAX_HOPS) continue

    for (const c of byId.get(id)?.connections || []) {
      if (!byId.has(c.to) || dist.has(c.to)) continue
      dist.set(c.to, d + 1)
      queue.push(c.to)
    }
  }
  return dist
}

const monthIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

export const buildFocusGraph = (rootId, byId) => {
  const root = byId.get(rootId)
  if (!root) return { nodes: [], edges: [], width: 0, height: 0 }

  const dist = walk(rootId, byId)
  const rootMonth = monthIndex(root.coverDate)

  // Column = chronological position relative to the focus, clamped to the hop
  // budget, so earlier issues sit left and later ones right.
  const nodes = [...dist.keys()].map((id) => {
    const iss = byId.get(id)
    const delta = monthIndex(iss.coverDate) - rootMonth
    const col = id === rootId ? 0 : Math.sign(delta) * dist.get(id)
    return { id, issue: iss, col, hop: dist.get(id) }
  })

  // Stack nodes that share a column, focus first so it sits on the centre line.
  const columns = new Map()
  for (const n of nodes) {
    if (!columns.has(n.col)) columns.set(n.col, [])
    columns.get(n.col).push(n)
  }
  for (const list of columns.values()) {
    list.sort((a, b) => a.issue.coverDate.localeCompare(b.issue.coverDate))
  }

  const COL_W = 168
  const ROW_H = 76
  const cols = [...columns.keys()].sort((a, b) => a - b)
  const minCol = cols[0] ?? 0
  const maxRows = Math.max(...[...columns.values()].map((l) => l.length), 1)

  for (const [col, list] of columns) {
    list.forEach((n, i) => {
      n.x = (col - minCol) * COL_W + COL_W / 2
      // Centre each column's stack vertically.
      n.y = (maxRows * ROW_H) / 2 + (i - (list.length - 1) / 2) * ROW_H
    })
  }

  const positions = new Map(nodes.map((n) => [n.id, n]))
  const edges = []
  const seen = new Set()

  for (const n of nodes) {
    for (const c of n.issue.connections || []) {
      if (!positions.has(c.to)) continue
      // Connections are stored on both ends; draw each pair once.
      const key = [n.id, c.to].sort().join('|') + c.type
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ from: positions.get(n.id), to: positions.get(c.to), type: c.type })
    }
  }

  return {
    nodes,
    edges,
    width: (cols.length || 1) * COL_W,
    height: maxRows * ROW_H,
  }
}
