/**
 * Guest appearances in books Spider-Man does not headline.
 *
 * These cannot be generated — there is no run to expand — so each one is added
 * by hand and only when it carries narrative weight. A single-panel cameo does
 * not belong here; the point of the tree is what you would actually read.
 *
 * Every cover date below was checked against Marvel Database, so these all ship
 * with dateExact: true.
 *
 * Shape matches the generated issues so the merge in src/lib/dataset.js can
 * treat both alike.
 */

export const APPEARANCES = [
  {
    id: 'strange-tales-annual-2',
    seriesName: 'Strange Tales Annual',
    seriesAbbr: 'ST ANN',
    wikiTitle: 'Strange Tales Annual Vol 1',
    number: 2,
    coverDate: '1963-10',
    note: 'An early crossover with the Human Torch, one of the first outside his own book.',
  },
  {
    id: 'fantastic-four-annual-1',
    seriesName: 'Fantastic Four Annual',
    seriesAbbr: 'FF ANN',
    wikiTitle: 'Fantastic Four Annual Vol 1',
    number: 1,
    coverDate: '1963-09',
    note: 'Ties the new character into the established Marvel line.',
  },
  {
    id: 'avengers-11',
    seriesName: 'The Avengers',
    seriesAbbr: 'AVN',
    wikiTitle: 'Avengers Vol 1',
    number: 11,
    coverDate: '1964-12',
    note: 'His first brush with the Avengers, and not on the terms you would expect.',
  },
  {
    id: 'daredevil-16',
    seriesName: 'Daredevil',
    seriesAbbr: 'DD',
    wikiTitle: 'Daredevil Vol 1',
    number: 16,
    coverDate: '1966-05',
    note: 'First of a two-parter, and the start of a long association between the two.',
  },
  {
    id: 'daredevil-17',
    seriesName: 'Daredevil',
    seriesAbbr: 'DD',
    wikiTitle: 'Daredevil Vol 1',
    number: 17,
    coverDate: '1966-06',
  },
  {
    id: 'fantastic-four-73',
    seriesName: 'Fantastic Four',
    seriesAbbr: 'FF',
    wikiTitle: 'Fantastic Four Vol 1',
    number: 73,
    coverDate: '1968-04',
    note: 'A crossover resolving a plot carried over from Daredevil.',
  },
  {
    id: 'marvel-feature-4',
    seriesName: 'Marvel Feature',
    seriesAbbr: 'MFEAT',
    wikiTitle: 'Marvel Feature Vol 1',
    number: 4,
    coverDate: '1972-07',
    relevance: 'optional',
  },
  {
    id: 'marvel-two-in-one-17',
    seriesName: 'Marvel Two-In-One',
    seriesAbbr: 'MTIO',
    wikiTitle: 'Marvel Two-In-One Vol 1',
    number: 17,
    coverDate: '1976-07',
    relevance: 'optional',
  },
  {
    id: 'fantastic-four-218',
    seriesName: 'Fantastic Four',
    seriesAbbr: 'FF',
    wikiTitle: 'Fantastic Four Vol 1',
    number: 218,
    coverDate: '1980-05',
    relevance: 'optional',
  },

  /* ------------------------------------------------- the 1984 crossover */
  {
    id: 'secret-wars-1',
    seriesName: 'Marvel Super Heroes Secret Wars',
    seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1',
    number: 1,
    coverDate: '1984-05',
    note: 'The line-wide crossover that pulls him off Earth mid-continuity.',
    keyIssue: true,
  },
  {
    id: 'secret-wars-8',
    seriesName: 'Marvel Super Heroes Secret Wars',
    seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1',
    number: 8,
    coverDate: '1984-12',
    note: 'Where the black costume actually comes from. Read before Amazing #252.',
    keyIssue: true,
  },
  {
    id: 'secret-wars-12',
    seriesName: 'Marvel Super Heroes Secret Wars',
    seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1',
    number: 12,
    coverDate: '1985-04',
  },
  {
    id: 'secret-wars-ii-1',
    seriesName: 'Secret Wars II',
    seriesAbbr: 'SWII',
    wikiTitle: 'Secret Wars II Vol 1',
    number: 1,
    coverDate: '1985-07',
    relevance: 'optional',
  },
]

/** Defaults applied to every appearance unless the entry overrides them. */
export const APPEARANCE_DEFAULTS = {
  series: 'guest',
  accent: 'guest',
  role: 'guest',
  relevance: 'notable',
  dateExact: true,
  yearOnly: false,
  isAnnual: false,
  isReprint: false,
  outOfContinuity: false,
  generated: false,
}
