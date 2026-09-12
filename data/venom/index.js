/**
 * The Venom tree, as one module: every hand-curated layer in this folder
 * plus the generated runs. Same shape as data/spider-man/index.js.
 */

import generated from '../../src/generated/venom.json' with { type: 'json' }

export { SERIES, SERIES_BY_KEY } from './series.js'
export { OVERRIDES } from './overrides.js'
export { APPEARANCES, APPEARANCE_DEFAULTS } from './appearances.js'
export { ARCS, ARCS_SORTED, ARCS_BY_KEY } from './arcs.js'
export { MILESTONES, MILESTONES_BY_ISSUE } from './milestones.js'
export { PATHS, PATHS_BY_KEY } from './paths.js'
export { ARC_PALETTE } from './arc-palette.js'

export const GENERATED = generated
