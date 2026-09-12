/**
 * The Spider-Man tree, as one module: every hand-curated layer in this folder
 * plus the generated runs. What src/lib/dataset.js merges, and what
 * data/characters.js loads — see there for which layers are shared instead.
 */

import generated from '../../src/generated/spider-man.json' with { type: 'json' }

export { SERIES, SERIES_BY_KEY } from './series.js'
export { OVERRIDES } from './overrides.js'
export { APPEARANCES, APPEARANCE_DEFAULTS } from './appearances.js'
export { ARCS, ARCS_SORTED, ARCS_BY_KEY } from './arcs.js'
export { MILESTONES, MILESTONES_BY_ISSUE } from './milestones.js'
export { PATHS, PATHS_BY_KEY } from './paths.js'
export { ARC_PALETTE } from './arc-palette.js'

export const GENERATED = generated
