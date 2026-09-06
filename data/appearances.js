/**
 * Guest appearances in books Spider-Man does not headline.
 *
 * These cannot be generated — there is no run to expand — so each one is added
 * by hand and only when it carries narrative weight. A single-panel cameo does
 * not belong here; the point of the tree is what you would actually read.
 *
 * The file has two halves. First the singles, by decade: one issue of someone
 * else's book worth reading on its own. Then complete events, by event: a story
 * that happens to him elsewhere and runs its whole length there. Keeping only
 * an event's first issue was the older habit and it left the tree holding
 * causes with no effects — Civil War as one issue, with One More Day two years
 * later collecting on a debt incurred in an issue that was not here.
 *
 * The test for an event is whether his own book afterwards treats it as
 * settled fact. Registration, the unmasking, Osborn's year in charge, Fisk as
 * mayor and the Maker's new universe all pass it. A crossover his book merely
 * shipped a tie-in for does not.
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
    id: 'new-avengers-1',
    seriesName: 'New Avengers', seriesAbbr: 'NAV',
    wikiTitle: 'New Avengers Vol 1', number: 1, coverDate: '2005-01',
    note: 'He joins a team full-time for the first time, which shapes the next seven years of his appearances.',
    keyIssue: true,
  },
  {
    id: 'civil-war-2',
    seriesName: 'Civil War', seriesAbbr: 'CW',
    wikiTitle: 'Civil War Vol 1', number: 2, coverDate: '2006-08',
    note: 'The unmasking happens here, in the event itself — the Amazing tie-ins run alongside it, not through it.',
    keyIssue: true,
  },
  {
    id: 'daredevil-354',
    seriesName: 'Daredevil', seriesAbbr: 'DD',
    wikiTitle: 'Daredevil Vol 1', number: 354, coverDate: '1996-07',
    note: 'Thirty years on from their first team-up, and still a reliable pairing.',
  },

  /* ==================================================================== 2008+
     Checked the same way as the rest: present in the issue's own appearance
     list, or not included. Siege #1 is the clearest exclusion — a line-wide
     event of exactly the kind he usually turns up in, and he is not in it.
     ======================================================================== */
  {
    id: 'secret-invasion-1',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 1, coverDate: '2008-06',
    relevance: 'optional',
  },
  {
    id: 'ff-1',
    seriesName: 'FF', seriesAbbr: 'FF2',
    wikiTitle: 'FF Vol 1', number: 1, coverDate: '2011-05',
    note: 'He takes a seat in the Fantastic Four\u2019s replacement line-up.',
  },
  {
    id: 'fear-itself-1',
    seriesName: 'Fear Itself', seriesAbbr: 'FI',
    wikiTitle: 'Fear Itself Vol 1', number: 1, coverDate: '2011-06',
    relevance: 'optional',
  },
  {
    id: 'avengers-vs-x-men-1',
    seriesName: 'Avengers vs. X-Men', seriesAbbr: 'AvX',
    wikiTitle: 'Avengers vs. X-Men Vol 1', number: 1, coverDate: '2012-06',
    relevance: 'optional',
  },
  {
    id: 'spider-men-1',
    seriesName: 'Spider-Men', seriesAbbr: 'SMEN',
    wikiTitle: 'Spider-Men Vol 1', number: 1, coverDate: '2012-08',
    note: 'The two continuities meet for the first time. This issue carries Peter of the main line, and both Peter and Miles of the other.',
    keyIssue: true,
  },
  {
    id: 'spider-men-5',
    seriesName: 'Spider-Men', seriesAbbr: 'SMEN',
    wikiTitle: 'Spider-Men Vol 1', number: 5, coverDate: '2012-11',
    note: 'Closes the crossing. The lines separate again and stay apart for three more years.',
  },
  {
    id: 'original-sin-1',
    seriesName: 'Original Sin', seriesAbbr: 'OS',
    wikiTitle: 'Original Sin Vol 1', number: 1, coverDate: '2014-07',
    relevance: 'optional',
  },
  {
    id: 'secret-wars-2015-1',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 1, coverDate: '2015-07',
    note: 'The event that collapses the separate continuities into one. Not the 1984 crossover of the same name.',
    keyIssue: true,
  },
  {
    id: 'secret-wars-2015-9',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 9, coverDate: '2016-03',
    note: 'Its conclusion. What comes out the other side is the continuity Miles continues in.',
  },
  {
    id: 'spider-men-ii-1',
    seriesName: 'Spider-Men II', seriesAbbr: 'SMEN2',
    wikiTitle: 'Spider-Men II Vol 1', number: 1, coverDate: '2017-09',
    note: 'A sequel to the 2012 crossing, now that both are in the same continuity.',
  },
  {
    id: 'spider-geddon-1',
    seriesName: 'Spider-Geddon', seriesAbbr: 'SGED',
    wikiTitle: 'Spider-Geddon Vol 1', number: 1, coverDate: '2018-12',
    note: 'The sequel event to Spider-Verse.',
  },

  /* ==================================================================== */
  /* Complete events                                                      */
  /*                                                                      */
  /* The entries above are singles: one issue of someone else's book that  */
  /* is worth reading on its own. These are the other case — a story that  */
  /* happens to him somewhere else and runs for its whole length there,    */
  /* so taking only its first issue leaves the tree with a cause and no    */
  /* effect. Grouped by event and ordered within it; the merge sorts       */
  /* everything by cover date anyway.                                     */
  /* ==================================================================== */

  /* ---------------------------------------------- Secret Wars (1984) — the twelve issues around #8 */
  {
    id: 'secret-wars-2',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 2, coverDate: '1984-06',
    relevance: 'optional',
    note: 'The assembled heroes take stock of the world they were dropped into, and of who came with them.',
  },
  {
    id: 'secret-wars-3',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 3, coverDate: '1984-07',
    relevance: 'optional',
    note: 'The first defections, and the villains discovering the rules of the place.',
  },
  {
    id: 'secret-wars-4',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 4, coverDate: '1984-08',
    note: 'The Hulk holds a mountain up. The issue everyone remembers out of the middle stretch.',
  },
  {
    id: 'secret-wars-5',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 5, coverDate: '1984-09',
    relevance: 'optional',
    note: 'Reinforcements reach both sides and the shape of the fight changes.',
  },
  {
    id: 'secret-wars-6',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 6, coverDate: '1984-10',
    relevance: 'optional',
    note: 'Doom starts thinking past the game he was invited to play.',
  },
  {
    id: 'secret-wars-7',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 7, coverDate: '1984-11',
    relevance: 'optional',
    note: 'A second Spider-Woman debuts and the roster shifts again.',
  },
  {
    id: 'secret-wars-9',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 9, coverDate: '1985-01',
    relevance: 'optional',
    note: 'The aftermath of Doom\'s gambit, with the heroes at their lowest.',
  },
  {
    id: 'secret-wars-10',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 10, coverDate: '1985-02',
    note: 'Doom at the furthest reach of what the Beyonder\'s power allows.',
  },
  {
    id: 'secret-wars-11',
    seriesName: 'Marvel Super Heroes Secret Wars', seriesAbbr: 'SW',
    wikiTitle: 'Marvel Super Heroes Secret Wars Vol 1', number: 11, coverDate: '1985-03',
    relevance: 'optional',
    note: 'The survivors regroup for the last assault.',
  },

  /* ---------------------------------------------- The Infinity Gauntlet — the three issues between the ones already here */
  {
    id: 'infinity-gauntlet-2',
    seriesName: 'The Infinity Gauntlet', seriesAbbr: 'IG',
    wikiTitle: 'Infinity Gauntlet Vol 1', number: 2, coverDate: '1991-08',
    relevance: 'optional',
    note: 'Thanos begins spending the power, and half of everything pays for it.',
  },
  {
    id: 'infinity-gauntlet-3',
    seriesName: 'The Infinity Gauntlet', seriesAbbr: 'IG',
    wikiTitle: 'Infinity Gauntlet Vol 1', number: 3, coverDate: '1991-09',
    relevance: 'optional',
    note: 'What is left of Earth\'s heroes assembles for an assault they know is hopeless.',
  },
  {
    id: 'infinity-gauntlet-5',
    seriesName: 'The Infinity Gauntlet', seriesAbbr: 'IG',
    wikiTitle: 'Infinity Gauntlet Vol 1', number: 5, coverDate: '1991-11',
    relevance: 'optional',
    note: 'The fight moves somewhere a street-level hero cannot follow, which is the point.',
  },

  /* ---------------------------------------------- Marvels (1994) — the Marvel Universe from the sidewalk */
  {
    id: 'marvels-1',
    seriesName: 'Marvels', seriesAbbr: 'MVLS',
    wikiTitle: 'Marvels Vol 1', number: 1, coverDate: '1994-01',
    note: 'The Human Torch and the Sub-Mariner seen by a news photographer, which is the vantage the whole series is about.',
  },
  {
    id: 'marvels-2',
    seriesName: 'Marvels', seriesAbbr: 'MVLS',
    wikiTitle: 'Marvels Vol 1', number: 2, coverDate: '1994-02',
    note: 'The mutant question written as something that happens to a neighbourhood.',
  },
  {
    id: 'marvels-3',
    seriesName: 'Marvels', seriesAbbr: 'MVLS',
    wikiTitle: 'Marvels Vol 1', number: 3, coverDate: '1994-03',
    note: 'Galactus arrives and the city has to decide what it thinks of the people who saved it.',
  },
  {
    id: 'marvels-4',
    seriesName: 'Marvels', seriesAbbr: 'MVLS',
    wikiTitle: 'Marvels Vol 1', number: 4, coverDate: '1994-04',
    note: 'Gwen Stacy\'s death told by a man who only ever read about Spider-Man in the paper. The counterweight to Amazing Spider-Man #121.',
  },

  /* ---------------------------------------------- The New Fantastic Four — completing what Fantastic Four #347 opens */
  {
    id: 'fantastic-four-348',
    seriesName: 'Fantastic Four', seriesAbbr: 'FF',
    wikiTitle: 'Fantastic Four Vol 1', number: 348, coverDate: '1991-01',
    note: 'The substitute team well past the joke, and taking the job seriously.',
  },
  {
    id: 'fantastic-four-349',
    seriesName: 'Fantastic Four', seriesAbbr: 'FF',
    wikiTitle: 'Fantastic Four Vol 1', number: 349, coverDate: '1991-02',
    note: 'The arc closes and the four go home. Completes the story Fantastic Four #347 starts.',
  },

  /* ---------------------------------------------- Ultimate Six (2003) — an Ultimate Spider-Man story that ran outside the book */
  {
    id: 'ultimate-six-1',
    universe: 'ultimate',
    seriesName: 'Ultimate Six', seriesAbbr: 'U6',
    wikiTitle: 'Ultimate Six Vol 1', number: 1, coverDate: '2003-11',
    note: 'The Ultimate Sinister Six break out of a facility built for them, and Peter is the reason they know each other.',
  },
  {
    id: 'ultimate-six-2',
    universe: 'ultimate',
    seriesName: 'Ultimate Six', seriesAbbr: 'U6',
    wikiTitle: 'Ultimate Six Vol 1', number: 2, coverDate: '2003-11',
    relevance: 'optional',
    note: 'The Ultimates get handed a problem that began in a book they do not read.',
  },
  {
    id: 'ultimate-six-3',
    universe: 'ultimate',
    seriesName: 'Ultimate Six', seriesAbbr: 'U6',
    wikiTitle: 'Ultimate Six Vol 1', number: 3, coverDate: '2003-12',
    relevance: 'optional',
    note: 'Norman Osborn negotiates from inside custody.',
  },
  {
    id: 'ultimate-six-4',
    universe: 'ultimate',
    seriesName: 'Ultimate Six', seriesAbbr: 'U6',
    wikiTitle: 'Ultimate Six Vol 1', number: 4, coverDate: '2004-01',
    relevance: 'optional',
    note: 'Peter is brought in by the people who are supposed to be on his side.',
  },
  {
    id: 'ultimate-six-5',
    universe: 'ultimate',
    seriesName: 'Ultimate Six', seriesAbbr: 'U6',
    wikiTitle: 'Ultimate Six Vol 1', number: 5, coverDate: '2004-02',
    relevance: 'optional',
    note: 'The six make their move on Washington.',
  },
  {
    id: 'ultimate-six-6',
    universe: 'ultimate',
    seriesName: 'Ultimate Six', seriesAbbr: 'U6',
    wikiTitle: 'Ultimate Six Vol 1', number: 6, coverDate: '2004-03',
    relevance: 'optional',
    note: 'The fight the whole mini was built toward.',
  },
  {
    id: 'ultimate-six-7',
    universe: 'ultimate',
    seriesName: 'Ultimate Six', seriesAbbr: 'U6',
    wikiTitle: 'Ultimate Six Vol 1', number: 7, coverDate: '2004-06',
    note: 'How it ends, and what the Ultimates decide to do about a fifteen-year-old.',
  },

  /* ---------------------------------------------- Breakout (2005) — the arc where he joins the Avengers */
  {
    id: 'new-avengers-2',
    seriesName: 'New Avengers', seriesAbbr: 'NAV',
    wikiTitle: 'New Avengers Vol 1', number: 2, coverDate: '2005-02',
    note: 'The Raft breakout, and the people who happened to be standing there when it happened.',
  },
  {
    id: 'new-avengers-3',
    seriesName: 'New Avengers', seriesAbbr: 'NAV',
    wikiTitle: 'New Avengers Vol 1', number: 3, coverDate: '2005-03',
    relevance: 'optional',
    note: 'The escapees scatter and the accidental team decides to keep going.',
  },
  {
    id: 'new-avengers-4',
    seriesName: 'New Avengers', seriesAbbr: 'NAV',
    wikiTitle: 'New Avengers Vol 1', number: 4, coverDate: '2005-04',
    relevance: 'optional',
    note: 'The trail leads somewhere none of the roster expected.',
  },
  {
    id: 'new-avengers-5',
    seriesName: 'New Avengers', seriesAbbr: 'NAV',
    wikiTitle: 'New Avengers Vol 1', number: 5, coverDate: '2005-05',
    relevance: 'optional',
    note: 'The Savage Land, and the first real test of whether these people work together.',
  },
  {
    id: 'new-avengers-6',
    seriesName: 'New Avengers', seriesAbbr: 'NAV',
    wikiTitle: 'New Avengers Vol 1', number: 6, coverDate: '2005-06',
    note: 'The team is made official with him on it — the arrangement his own book runs on for the next five years.',
  },

  /* ---------------------------------------------- The Pulse (2004) — the Daily Bugle as a working newsroom */
  {
    id: 'the-pulse-1',
    seriesName: 'The Pulse', seriesAbbr: 'PLS',
    wikiTitle: 'The Pulse Vol 1', number: 1, coverDate: '2004-04',
    note: 'Jessica Jones on staff at the Bugle, which puts Peter\'s day job on the page as a job.',
  },
  {
    id: 'the-pulse-2',
    seriesName: 'The Pulse', seriesAbbr: 'PLS',
    wikiTitle: 'The Pulse Vol 1', number: 2, coverDate: '2004-05',
    relevance: 'optional',
    note: 'A reporter goes missing and the paper has to decide what it is willing to print.',
  },
  {
    id: 'the-pulse-3',
    seriesName: 'The Pulse', seriesAbbr: 'PLS',
    wikiTitle: 'The Pulse Vol 1', number: 3, coverDate: '2004-07',
    relevance: 'optional',
    note: 'The story leads back to Norman Osborn.',
  },
  {
    id: 'the-pulse-4',
    seriesName: 'The Pulse', seriesAbbr: 'PLS',
    wikiTitle: 'The Pulse Vol 1', number: 4, coverDate: '2004-09',
    relevance: 'optional',
    note: 'Jameson runs it anyway.',
  },
  {
    id: 'the-pulse-5',
    seriesName: 'The Pulse', seriesAbbr: 'PLS',
    wikiTitle: 'The Pulse Vol 1', number: 5, coverDate: '2004-11',
    note: 'The Osborn thread closes from the press side, with Peter watching it happen from a desk.',
  },

  /* ---------------------------------------------- Civil War (2006) — the six issues around the unmasking */
  {
    id: 'civil-war-1',
    seriesName: 'Civil War', seriesAbbr: 'CW',
    wikiTitle: 'Civil War Vol 1', number: 1, coverDate: '2006-07',
    note: 'Stamford, and the registration act. Two years of his life start on these pages.',
  },
  {
    id: 'civil-war-3',
    seriesName: 'Civil War', seriesAbbr: 'CW',
    wikiTitle: 'Civil War Vol 1', number: 3, coverDate: '2006-09',
    note: 'The first casualty of the split, and the point past which neither side can walk it back.',
  },
  {
    id: 'civil-war-4',
    seriesName: 'Civil War', seriesAbbr: 'CW',
    wikiTitle: 'Civil War Vol 1', number: 4, coverDate: '2006-10',
    note: 'A funeral, and the prison built for the people who would not sign.',
  },
  {
    id: 'civil-war-5',
    seriesName: 'Civil War', seriesAbbr: 'CW',
    wikiTitle: 'Civil War Vol 1', number: 5, coverDate: '2006-11',
    note: 'He changes sides. His own books cover the reasoning; this is the moment.',
  },
  {
    id: 'civil-war-6',
    seriesName: 'Civil War', seriesAbbr: 'CW',
    wikiTitle: 'Civil War Vol 1', number: 6, coverDate: '2006-12',
    relevance: 'optional',
    note: 'The hunt for the unregistered, with him now among them.',
  },
  {
    id: 'civil-war-7',
    seriesName: 'Civil War', seriesAbbr: 'CW',
    wikiTitle: 'Civil War Vol 1', number: 7, coverDate: '2007-01',
    note: 'How it ends, and the debt that One More Day comes to collect.',
  },

  /* ---------------------------------------------- World War Hulk (2007) */
  {
    id: 'world-war-hulk-1',
    seriesName: 'World War Hulk', seriesAbbr: 'WWH',
    wikiTitle: 'World War Hulk Vol 1', number: 1, coverDate: '2007-08',
    note: 'The Hulk comes back for the people who exiled him, and lands on the city Spider-Man works.',
  },
  {
    id: 'world-war-hulk-2',
    seriesName: 'World War Hulk', seriesAbbr: 'WWH',
    wikiTitle: 'World War Hulk Vol 1', number: 2, coverDate: '2007-09',
    relevance: 'optional',
    note: 'The first line of defence fails, publicly.',
  },
  {
    id: 'world-war-hulk-3',
    seriesName: 'World War Hulk', seriesAbbr: 'WWH',
    wikiTitle: 'World War Hulk Vol 1', number: 3, coverDate: '2007-10',
    relevance: 'optional',
    note: 'Manhattan under occupation, which his own book spends three issues inside.',
  },
  {
    id: 'world-war-hulk-4',
    seriesName: 'World War Hulk', seriesAbbr: 'WWH',
    wikiTitle: 'World War Hulk Vol 1', number: 4, coverDate: '2007-11',
    relevance: 'optional',
    note: 'The heroes who had no part in the exile get their turn anyway.',
  },
  {
    id: 'world-war-hulk-5',
    seriesName: 'World War Hulk', seriesAbbr: 'WWH',
    wikiTitle: 'World War Hulk Vol 1', number: 5, coverDate: '2008-01',
    note: 'How it stops, and what was actually being asked for.',
  },

  /* ---------------------------------------------- Secret Invasion (2008) — the seven issues that end in Dark Reign */
  {
    id: 'secret-invasion-2',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 2, coverDate: '2008-07',
    relevance: 'optional',
    note: 'Nobody can prove who they are, which is the whole mechanism of the event.',
  },
  {
    id: 'secret-invasion-3',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 3, coverDate: '2008-08',
    relevance: 'optional',
    note: 'The heroes stranded in the Savage Land start turning on each other.',
  },
  {
    id: 'secret-invasion-4',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 4, coverDate: '2008-09',
    relevance: 'optional',
    note: 'The invasion goes public and the Initiative comes apart.',
  },
  {
    id: 'secret-invasion-5',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 5, coverDate: '2008-10',
    relevance: 'optional',
    note: 'New York becomes the battlefield.',
  },
  {
    id: 'secret-invasion-6',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 6, coverDate: '2008-11',
    relevance: 'optional',
    note: 'The captives come home and the list of who was replaced becomes clear.',
  },
  {
    id: 'secret-invasion-7',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 7, coverDate: '2008-12',
    relevance: 'optional',
    note: 'The last push, fought in the open.',
  },
  {
    id: 'secret-invasion-8',
    seriesName: 'Secret Invasion', seriesAbbr: 'SI',
    wikiTitle: 'Secret Invasion Vol 1', number: 8, coverDate: '2009-01',
    note: 'It ends and Norman Osborn walks away with the country. Dark Reign starts on the last page.',
  },

  /* ---------------------------------------------- Siege (2010) — how Dark Reign ends */
  {
    id: 'siege-1',
    seriesName: 'Siege', seriesAbbr: 'SGE',
    wikiTitle: 'Siege Vol 1', number: 1, coverDate: '2010-03',
    note: 'Osborn invades Asgard on a lie, spending the authority he won in Secret Invasion.',
  },
  {
    id: 'siege-2',
    seriesName: 'Siege', seriesAbbr: 'SGE',
    wikiTitle: 'Siege Vol 1', number: 2, coverDate: '2010-04',
    relevance: 'optional',
    note: 'The heroes he outlawed come back into the open to stop him.',
  },
  {
    id: 'siege-3',
    seriesName: 'Siege', seriesAbbr: 'SGE',
    wikiTitle: 'Siege Vol 1', number: 3, coverDate: '2010-05',
    relevance: 'optional',
    note: 'The Sentry, and the cost of what Osborn had been keeping on a leash.',
  },
  {
    id: 'siege-4',
    seriesName: 'Siege', seriesAbbr: 'SGE',
    wikiTitle: 'Siege Vol 1', number: 4, coverDate: '2010-06',
    note: 'Dark Reign ends and the Heroic Age begins — the world his book runs in afterwards.',
  },

  /* ---------------------------------------------- Ultimate Fallout (2011) — between Peter's death and Miles */
  {
    id: 'ultimate-fallout-1',
    universe: 'ultimate',
    seriesName: 'Ultimate Fallout', seriesAbbr: 'UFO',
    wikiTitle: 'Ultimate Fallout Vol 1', number: 1, coverDate: '2011-09',
    note: 'The Ultimate line the morning after the funeral.',
  },
  {
    id: 'ultimate-fallout-2',
    universe: 'ultimate',
    seriesName: 'Ultimate Fallout', seriesAbbr: 'UFO',
    wikiTitle: 'Ultimate Fallout Vol 1', number: 2, coverDate: '2011-09',
    relevance: 'optional',
    note: 'The city works out what it lost, mostly by arguing about it.',
  },
  {
    id: 'ultimate-fallout-3',
    universe: 'ultimate',
    seriesName: 'Ultimate Fallout', seriesAbbr: 'UFO',
    wikiTitle: 'Ultimate Fallout Vol 1', number: 3, coverDate: '2011-09',
    relevance: 'optional',
    note: 'The people closest to him deal with it separately, which is the honest way.',
  },
  {
    id: 'ultimate-fallout-4',
    universe: 'ultimate',
    seriesName: 'Ultimate Fallout', seriesAbbr: 'UFO',
    wikiTitle: 'Ultimate Fallout Vol 1', number: 4, coverDate: '2011-10',
    note: 'The last pages introduce Miles Morales. Everything the tree holds under his name begins here.',
  },
  {
    id: 'ultimate-fallout-5',
    universe: 'ultimate',
    seriesName: 'Ultimate Fallout', seriesAbbr: 'UFO',
    wikiTitle: 'Ultimate Fallout Vol 1', number: 5, coverDate: '2011-10',
    relevance: 'optional',
    note: 'The line rearranges itself around the absence.',
  },
  {
    id: 'ultimate-fallout-6',
    universe: 'ultimate',
    seriesName: 'Ultimate Fallout', seriesAbbr: 'UFO',
    wikiTitle: 'Ultimate Fallout Vol 1', number: 6, coverDate: '2011-10',
    note: 'The handoff into Ultimate Comics Spider-Man.',
  },

  /* ---------------------------------------------- Edge of Spider-Verse (2014) — the five one-shots that stock the event */
  {
    id: 'edge-of-spider-verse-1',
    seriesName: 'Edge of Spider-Verse', seriesAbbr: 'EOSV',
    wikiTitle: 'Edge of Spider-Verse Vol 1', number: 1, coverDate: '2014-11',
    relevance: 'optional',
    note: 'Peni Parker and SP//dr, the premise rebuilt as a mecha cockpit.',
  },
  {
    id: 'edge-of-spider-verse-2',
    seriesName: 'Edge of Spider-Verse', seriesAbbr: 'EOSV',
    wikiTitle: 'Edge of Spider-Verse Vol 1', number: 2, coverDate: '2014-11',
    note: 'Gwen Stacy bitten instead of Peter. The most consequential single issue Marvel published that year.',
  },
  {
    id: 'edge-of-spider-verse-3',
    seriesName: 'Edge of Spider-Verse', seriesAbbr: 'EOSV',
    wikiTitle: 'Edge of Spider-Verse Vol 1', number: 3, coverDate: '2014-11',
    relevance: 'optional',
    note: 'Aaron Aikman, the premise run through hard science fiction.',
  },
  {
    id: 'edge-of-spider-verse-4',
    seriesName: 'Edge of Spider-Verse', seriesAbbr: 'EOSV',
    wikiTitle: 'Edge of Spider-Verse Vol 1', number: 4, coverDate: '2014-12',
    relevance: 'optional',
    note: 'Spider-Man Noir gets the issue that earns him a seat at the event.',
  },
  {
    id: 'edge-of-spider-verse-5',
    seriesName: 'Edge of Spider-Verse', seriesAbbr: 'EOSV',
    wikiTitle: 'Edge of Spider-Verse Vol 1', number: 5, coverDate: '2014-12',
    relevance: 'optional',
    note: 'What the premise looks like with the lesson taken out of it.',
  },

  /* ---------------------------------------------- Absolute Carnage (2019) */
  {
    id: 'absolute-carnage-1',
    seriesName: 'Absolute Carnage', seriesAbbr: 'ABSC',
    wikiTitle: 'Absolute Carnage Vol 1', number: 1, coverDate: '2019-10',
    note: 'Cletus Kasady comes back for everyone who ever wore a symbiote, which puts Spider-Man at the centre by default.',
  },
  {
    id: 'absolute-carnage-2',
    seriesName: 'Absolute Carnage', seriesAbbr: 'ABSC',
    wikiTitle: 'Absolute Carnage Vol 1', number: 2, coverDate: '2019-10',
    relevance: 'optional',
    note: 'The list of targets turns out to be most of the cast.',
  },
  {
    id: 'absolute-carnage-3',
    seriesName: 'Absolute Carnage', seriesAbbr: 'ABSC',
    wikiTitle: 'Absolute Carnage Vol 1', number: 3, coverDate: '2019-11',
    relevance: 'optional',
    note: 'The safe house, and the argument about who is worth saving.',
  },
  {
    id: 'absolute-carnage-4',
    seriesName: 'Absolute Carnage', seriesAbbr: 'ABSC',
    wikiTitle: 'Absolute Carnage Vol 1', number: 4, coverDate: '2019-12',
    relevance: 'optional',
    note: 'Kasady closes in with the numbers on his side.',
  },
  {
    id: 'absolute-carnage-5',
    seriesName: 'Absolute Carnage', seriesAbbr: 'ABSC',
    wikiTitle: 'Absolute Carnage Vol 1', number: 5, coverDate: '2020-01',
    note: 'The ending, and what it leaves behind for King in Black to pick up.',
  },

  /* ---------------------------------------------- King in Black (2020) — the symbiote thread reaches its source */
  {
    id: 'king-in-black-1',
    seriesName: 'King in Black', seriesAbbr: 'KIB',
    wikiTitle: 'King in Black Vol 1', number: 1, coverDate: '2021-02',
    note: 'Knull reaches Earth. The thread that starts with a black suit in 1984 arrives at where the suit came from.',
  },
  {
    id: 'king-in-black-2',
    seriesName: 'King in Black', seriesAbbr: 'KIB',
    wikiTitle: 'King in Black Vol 1', number: 2, coverDate: '2021-02',
    relevance: 'optional',
    note: 'The planet goes dark and the heroes lose the sky.',
  },
  {
    id: 'king-in-black-3',
    seriesName: 'King in Black', seriesAbbr: 'KIB',
    wikiTitle: 'King in Black Vol 1', number: 3, coverDate: '2021-03',
    relevance: 'optional',
    note: 'What is left of the resistance works out what it is fighting.',
  },
  {
    id: 'king-in-black-4',
    seriesName: 'King in Black', seriesAbbr: 'KIB',
    wikiTitle: 'King in Black Vol 1', number: 4, coverDate: '2021-03',
    relevance: 'optional',
    note: 'The cost of holding the line.',
  },
  {
    id: 'king-in-black-5',
    seriesName: 'King in Black', seriesAbbr: 'KIB',
    wikiTitle: 'King in Black Vol 1', number: 5, coverDate: '2021-05',
    note: 'How it ends, and the state the symbiote books are in afterwards.',
  },

  /* ---------------------------------------------- Devil's Reign (2021) — Fisk as mayor */
  {
    id: 'devils-reign-1',
    seriesName: 'Devil\'s Reign', seriesAbbr: 'DVR',
    wikiTitle: 'Devil\'s Reign Vol 1', number: 1, coverDate: '2022-02',
    note: 'Wilson Fisk, elected, outlaws costumed heroes in his own city. Amazing Spider-Man runs on this premise for a year.',
  },
  {
    id: 'devils-reign-2',
    seriesName: 'Devil\'s Reign', seriesAbbr: 'DVR',
    wikiTitle: 'Devil\'s Reign Vol 1', number: 2, coverDate: '2022-02',
    relevance: 'optional',
    note: 'The arrests begin and the city takes a side.',
  },
  {
    id: 'devils-reign-3',
    seriesName: 'Devil\'s Reign', seriesAbbr: 'DVR',
    wikiTitle: 'Devil\'s Reign Vol 1', number: 3, coverDate: '2022-03',
    relevance: 'optional',
    note: 'The Thunderbolts as a municipal police force.',
  },
  {
    id: 'devils-reign-4',
    seriesName: 'Devil\'s Reign', seriesAbbr: 'DVR',
    wikiTitle: 'Devil\'s Reign Vol 1', number: 4, coverDate: '2022-04',
    relevance: 'optional',
    note: 'The heroes organise underground.',
  },
  {
    id: 'devils-reign-5',
    seriesName: 'Devil\'s Reign', seriesAbbr: 'DVR',
    wikiTitle: 'Devil\'s Reign Vol 1', number: 5, coverDate: '2022-05',
    relevance: 'optional',
    note: 'Fisk overreaches, as he does.',
  },
  {
    id: 'devils-reign-6',
    seriesName: 'Devil\'s Reign', seriesAbbr: 'DVR',
    wikiTitle: 'Devil\'s Reign Vol 1', number: 6, coverDate: '2022-06',
    note: 'How the term ends, and what the city is left holding.',
  },

  /* ---------------------------------------------- Dark Web (2022) — the crossover Amazing Spider-Man spends a season inside */
  {
    id: 'dark-web-1',
    seriesName: 'Dark Web', seriesAbbr: 'DWEB',
    wikiTitle: 'Dark Web Vol 1', number: 1, coverDate: '2023-02',
    note: 'Chasm and Madelyne Pryor open a crossover that runs through his book, Venom\'s and the X-Men\'s.',
  },

  /* ---------------------------------------------- Ultimate Invasion (2023) — where the 2024 Ultimate line comes from */
  {
    id: 'ultimate-invasion-1',
    seriesName: 'Ultimate Invasion', seriesAbbr: 'UINV',
    wikiTitle: 'Ultimate Invasion Vol 1', number: 1, coverDate: '2023-08',
    note: 'The Maker builds a universe to his own specification. Every Ultimate book in the tree from 2024 on descends from this issue.',
  },
  {
    id: 'ultimate-invasion-2',
    seriesName: 'Ultimate Invasion', seriesAbbr: 'UINV',
    wikiTitle: 'Ultimate Invasion Vol 1', number: 2, coverDate: '2023-09',
    relevance: 'optional',
    note: 'The rules of the new world, written by someone with no interest in fairness.',
  },
  {
    id: 'ultimate-invasion-3',
    seriesName: 'Ultimate Invasion', seriesAbbr: 'UINV',
    wikiTitle: 'Ultimate Invasion Vol 1', number: 3, coverDate: '2023-10',
    relevance: 'optional',
    note: 'The people who notice they are living inside a design.',
  },
  {
    id: 'ultimate-invasion-4',
    seriesName: 'Ultimate Invasion', seriesAbbr: 'UINV',
    wikiTitle: 'Ultimate Invasion Vol 1', number: 4, coverDate: '2023-11',
    note: 'The universe is sealed and left running, which is the premise Ultimate Spider-Man opens on.',
  },

  /* ---------------------------------------------- Ultimate Universe (2023) */
  {
    id: 'ultimate-universe-1',
    universe: 'ultimate-6160',
    seriesName: 'Ultimate Universe', seriesAbbr: 'UUNI',
    wikiTitle: 'Ultimate Universe Vol 1', number: 1, coverDate: '2024-01',
    note: 'The map of what the Maker built, and where a middle-aged Peter Parker sits on it.',
  },

  /* ---------------------------------------------- Secret Wars (2015) — the seven issues between the ones already here */
  {
    id: 'secret-wars-2015-2',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 2, coverDate: '2015-07',
    relevance: 'optional',
    note: 'Battleworld assembled, with Doom installed as its god.',
  },
  {
    id: 'secret-wars-2015-3',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 3, coverDate: '2015-08',
    relevance: 'optional',
    note: 'The survivors of the old universe wake up somewhere they should not exist.',
  },
  {
    id: 'secret-wars-2015-4',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 4, coverDate: '2015-09',
    relevance: 'optional',
    note: 'The domains begin coming apart at the seams.',
  },
  {
    id: 'secret-wars-2015-5',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 5, coverDate: '2015-10',
    relevance: 'optional',
    note: 'The history Doom wrote for himself starts to leak.',
  },
  {
    id: 'secret-wars-2015-6',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 6, coverDate: '2015-12',
    note: 'What actually happened at the end of everything.',
  },
  {
    id: 'secret-wars-2015-7',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 7, coverDate: '2016-01',
    relevance: 'optional',
    note: 'The last of the resistance moves on Doom.',
  },
  {
    id: 'secret-wars-2015-8',
    seriesName: 'Secret Wars (2015)', seriesAbbr: 'SW15',
    wikiTitle: 'Secret Wars Vol 1', number: 8, coverDate: '2016-02',
    relevance: 'optional',
    note: 'The confrontation, and the price of putting a universe back.',
  },
]

/** Defaults applied to every appearance unless the entry overrides them. */
export const APPEARANCE_DEFAULTS = {
  series: 'guest',
  universe: 'earth-616',
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
