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
    note: 'Spider-Man co-leads a stand-in Fantastic Four.',
    keyIssue: true,
  },

  /* ==================================================================== 1990s
     Every entry below was checked by looking for the character in the issue's
     own appearance list, not by assuming an event tie-in included him. That
     mattered: the Onslaught tie-ins in Fantastic Four and Incredible Hulk do
     not have him, and neither do half the issues of Infinity Gauntlet and
     Infinity War, despite all of them being filed under events he took part in.

     It also cut the other way. New Warriors #62-67 contains no Peter Parker at
     all, and searching for him alone would have dropped six legitimate issues:
     in 1995 the man in the suit was Ben Reilly.
     ======================================================================== */
  {
    id: 'infinity-gauntlet-1',
    seriesName: 'The Infinity Gauntlet', seriesAbbr: 'IG',
    wikiTitle: 'Infinity Gauntlet Vol 1', number: 1, coverDate: '1991-07',
    note: 'The decade opens with a cosmic event that sweeps up most of the line.',
  },
  {
    id: 'infinity-gauntlet-4',
    seriesName: 'The Infinity Gauntlet', seriesAbbr: 'IG',
    wikiTitle: 'Infinity Gauntlet Vol 1', number: 4, coverDate: '1991-10',
    relevance: 'optional',
  },
  {
    id: 'infinity-gauntlet-6',
    seriesName: 'The Infinity Gauntlet', seriesAbbr: 'IG',
    wikiTitle: 'Infinity Gauntlet Vol 1', number: 6, coverDate: '1991-12',
    note: 'He is absent from #5 \u2014 the event does not keep him on the board throughout.',
  },
  {
    id: 'infinity-war-1',
    seriesName: 'Infinity War', seriesAbbr: 'IW',
    wikiTitle: 'Infinity War Vol 1', number: 1, coverDate: '1992-06',
    note: 'He appears in the first three issues only.',
    relevance: 'optional',
  },
  {
    id: 'venom-lethal-protector-1',
    seriesName: 'Venom: Lethal Protector', seriesAbbr: 'VLP',
    wikiTitle: 'Venom: Lethal Protector Vol 1', number: 1, coverDate: '1993-02',
    note: 'Venom gets his own book, and Spider-Man is in all six issues of it.',
    keyIssue: true,
  },
  {
    id: 'venom-lethal-protector-6',
    seriesName: 'Venom: Lethal Protector', seriesAbbr: 'VLP',
    wikiTitle: 'Venom: Lethal Protector Vol 1', number: 6, coverDate: '1993-07',
  },
  {
    id: 'infinity-crusade-1',
    seriesName: 'Infinity Crusade', seriesAbbr: 'IC',
    wikiTitle: 'Infinity Crusade Vol 1', number: 1, coverDate: '1993-06',
    relevance: 'optional',
  },
  {
    id: 'infinity-crusade-6',
    seriesName: 'Infinity Crusade', seriesAbbr: 'IC',
    wikiTitle: 'Infinity Crusade Vol 1', number: 6, coverDate: '1993-11',
    relevance: 'optional',
  },
  {
    id: 'spider-man-jackal-files-1',
    seriesName: 'Spider-Man: The Jackal Files', seriesAbbr: 'JF',
    wikiTitle: 'Spider-Man: The Jackal Files Vol 1', number: 1, coverDate: '1995-08',
    note: 'A Clone Saga reference one-shot. Both Peter and Ben appear in it.',
  },
  {
    id: 'new-warriors-62',
    seriesName: 'The New Warriors', seriesAbbr: 'NW',
    wikiTitle: 'New Warriors Vol 1', number: 62, coverDate: '1995-08',
    note: 'The Clone Saga reaches another team\u2019s book. The Spider-Man here is Ben Reilly, not Peter.',
    keyIssue: true,
  },
  {
    id: 'new-warriors-67',
    seriesName: 'The New Warriors', seriesAbbr: 'NW',
    wikiTitle: 'New Warriors Vol 1', number: 67, coverDate: '1996-01',
    note: 'Closes the six-issue stretch Ben Reilly runs through.',
  },
  {
    id: 'daredevil-354',
    seriesName: 'Daredevil', seriesAbbr: 'DD',
    wikiTitle: 'Daredevil Vol 1', number: 354, coverDate: '1996-07',
    note: 'Thirty years on from their first team-up, and still a reliable pairing.',
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
