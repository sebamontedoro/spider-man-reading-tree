/**
 * What kinds of milestone there are, and how each is drawn.
 *
 * Shared by every character: a debut or a death reads the same in any tree,
 * and a filter that meant something different per character would be a filter
 * nobody could learn. Each character's milestones.js holds the milestones
 * themselves; their `type` is a key of this table.
 */

export const MILESTONE_TYPES = {
  debut: {
    key: 'debut',
    label: 'Debut',
    glyph: '★',
    accent: 'var(--blue)',
    description: 'First appearance of a character who mattered afterwards',
  },
  death: {
    key: 'death',
    label: 'Death',
    glyph: '✝',
    accent: 'var(--red-deep)',
    description: 'A character dies',
  },
  event: {
    key: 'event',
    label: 'Event',
    glyph: '◈',
    accent: 'var(--s-mtu)',
    description: 'A crossover or line-wide event reaches the book',
  },
  'status-quo': {
    key: 'status-quo',
    label: 'Status quo',
    glyph: '⟳',
    accent: 'var(--s-spec-mag)',
    description: 'The premise of the book changes for good',
  },
  universe: {
    key: 'universe',
    label: 'New continuity',
    glyph: '⑂',
    accent: 'var(--s-ultimate)',
    description: 'A separate continuity begins — the tree forks here',
  },
}
