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
  /* ------------------------------------------------------------ 1960s */
  {
    id: 'strange-tales-115',
    seriesName: 'Strange Tales',
    seriesAbbr: 'ST',
    wikiTitle: 'Strange Tales Vol 1',
    number: 115,
    coverDate: '1963-12',
    note: 'A Human Torch story that pulls Spider-Man in — the two were built to rub against each other.',
  },
  {
    id: 'x-men-27',
    seriesName: 'The X-Men',
    seriesAbbr: 'XM',
    wikiTitle: 'X-Men Vol 1',
    number: 27,
    coverDate: '1966-12',
    relevance: 'optional',
    note: 'A brief crossing of paths, well before the two franchises shared much.',
  },
  {
    id: 'daredevil-27',
    seriesName: 'Daredevil',
    seriesAbbr: 'DD',
    wikiTitle: 'Daredevil Vol 1',
    number: 27,
    coverDate: '1967-04',
    note: 'A second Daredevil team-up, a year after the first.',
  },

  /* ------------------------------------------------------------ 1970s */
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
    id: 'nova-12',
    seriesName: 'Nova',
    seriesAbbr: 'NOVA',
    wikiTitle: 'Nova Vol 1',
    number: 12,
    coverDate: '1977-08',
    note: 'A team-up with Marvel\u2019s then-new teenage hero, built on the obvious parallel.',
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

  /* ------------------------------------------------------------ 1980s */
  {
    id: 'contest-of-champions-1',
    seriesName: 'Marvel Super Hero Contest of Champions',
    seriesAbbr: 'COC',
    wikiTitle: 'Marvel Super Hero Contest of Champions Vol 1',
    number: 1,
    coverDate: '1982-06',
    relevance: 'optional',
    note: 'Marvel\u2019s first limited-series crossover. He is one of a very large cast.',
  },
  {
    id: 'contest-of-champions-3',
    seriesName: 'Marvel Super Hero Contest of Champions',
    seriesAbbr: 'COC',
    wikiTitle: 'Marvel Super Hero Contest of Champions Vol 1',
    number: 3,
    coverDate: '1982-08',
    relevance: 'optional',
  },
  {
    id: 'avengers-236',
    seriesName: 'The Avengers',
    seriesAbbr: 'AVN',
    wikiTitle: 'Avengers Vol 1',
    number: 236,
    coverDate: '1983-10',
    note: 'A two-parter revisiting the question of whether he belongs on a team.',
  },
  {
    id: 'avengers-237',
    seriesName: 'The Avengers',
    seriesAbbr: 'AVN',
    wikiTitle: 'Avengers Vol 1',
    number: 237,
    coverDate: '1983-11',
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
  {
    id: 'secret-wars-ii-9',
    seriesName: 'Secret Wars II',
    seriesAbbr: 'SWII',
    wikiTitle: 'Secret Wars II Vol 1',
    number: 9,
    coverDate: '1986-03',
    relevance: 'optional',
  },

  /* ------------------------------------------------------- late eighties */
  {
    id: 'daredevil-270',
    seriesName: 'Daredevil',
    seriesAbbr: 'DD',
    wikiTitle: 'Daredevil Vol 1',
    number: 270,
    coverDate: '1989-09',
    note: 'Two decades on, the Daredevil pairing had become one of the reliable ones.',
  },
  {
    id: 'fantastic-four-347',
    seriesName: 'Fantastic Four',
    seriesAbbr: 'FF',
    wikiTitle: 'Fantastic Four Vol 1',
    number: 347,
    coverDate: '1990-12',
    note: 'Spider-Man co-leads a stand-in Fantastic Four. The last issue in our range.',
    keyIssue: true,
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
