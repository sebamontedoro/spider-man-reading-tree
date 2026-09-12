/**
 * Hand-curated corrections and enrichment for the Venom tree, merged over the
 * generated dataset by src/lib/dataset.js. Keyed by issue id; any field here
 * wins. Notes are our own brief framing — no synopses from other sources. See
 * data/spider-man/overrides.js for the full conventions.
 */

export const OVERRIDES = {
  /* ------------------------------------------------ key issues, by hand */
  // The Essentials are the status-quo milestones plus these: the death the
  // Cates run turns on. Venom's first appearance and Carnage's first story are
  // guest issues, set key in data/venom/appearances.js.
  'absolute-carnage-5': { keyIssue: true },

  /* ------------------------------------------ the pandemic's digital issues */
  // #6-8 lost their print run to the 2020 shutdown and came out digitally in
  // May and June. The wiki kept #7's solicited October cover, which sorts it
  // after #8; it sits with its neighbours instead.
  'scream-curse-of-carnage-7': { coverDate: '2020-08', dateExact: true },
}
