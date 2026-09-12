/**
 * Hand-curated corrections and enrichment for the Daredevil tree, merged over
 * the generated dataset by src/lib/dataset.js. Keyed by issue id; any field
 * here wins. Notes are our own brief framing — no synopses from other sources.
 * See data/spider-man/overrides.js for the full conventions.
 */

export const OVERRIDES = {
  /* --------------------------------------- annuals that are not new stories */
  // The wiki's own pages mark both as reprints of earlier issues. They keep
  // their place in the numbering and are hidden with the rest of the optional
  // material, rather than dropped and leaving a gap between #1 and #4.
  'daredevil-annual-2': { relevance: 'optional', isReprint: true, note: 'A reprint annual.' },
  'daredevil-annual-3': { relevance: 'optional', isReprint: true, note: 'A reprint annual.' },

  /* ----------------------------------------------- numbers the id misreads */
  'daredevil-annual-5': {
    note: 'Printed as a second Annual #4, in 1989. Numbered #5 here because two issues cannot share an id.',
  },
  'daredevil-v4-1.5': {
    note: 'Printed as #1.50, for the character’s fiftieth anniversary.',
  },

  /* ------------------------------------------ a Marvel id the wiki copied */
  // On 2026-09-11 the wiki gave #3 and #4 the same Marvel Unlimited id, so one
  // of the two pages is wrong — the usual slip is a page created by copying
  // the previous issue's. marvel.com refuses scripted requests, so which one
  // could not be checked. #4 loses the direct link and falls back to a site
  // search, which is honest, instead of opening #3. Drop this once the wiki
  // is fixed and a crawl brings #4 an id of its own.
  'daredevil-punisher-devils-trigger-4': { marvelId: undefined },
}
