/**
 * Series metadata — the source of truth the generator expands into issues.
 *
 * DATES: a segment is defined by anchors, not by accumulating a cadence.
 * Give `startDate` and `endDate` and the generator spreads the issues evenly
 * between them. Accumulating "+1 month" over a 28-year run drifts by years;
 * interpolating between two checked anchors does not. This matters more than it
 * sounds: The Amazing Spider-Man went semi-monthly in 1988, so a naive monthly
 * cadence lands its 1990 issues eight months late.
 *
 * `startExact` / `endExact` mark an endpoint whose cover date was checked
 * against Marvel Database. Issues generated *between* two anchors are estimates
 * and carry dateExact:false, which the UI marks with a "~" before the date.
 * Pin down any individual issue by adding it to data/overrides.js.
 *
 * `wikiTitle` may be set per segment: Marvel Database files a renamed series
 * under a different page title mid-run (see peter-parker-spectacular, which
 * becomes "Spectacular Spider-Man Vol 1" from #134).
 *
 * UNIVERSE  Defaults to 'earth-616', the main continuity. A series set in a
 *           separate continuity carries its own value, and the tree renders it
 *           as a distinct line rather than mixing it into the main one. The
 *           Ultimate books are a parallel retelling, not a continuation: they
 *           share a character, not a history.
 *
 * ROLE      lead   — Spider-Man headlines the book
 *           guest  — he appears with narrative weight, someone else headlines
 * RELEVANCE core     — the spine of the reading tree
 *           notable  — worth reading, not required
 *           optional — reprints and out-of-continuity material, hidden by default
 */

export const SERIES = [
  /* ---------------------------------------------------------------- 1962 */
  {
    key: 'amazing-fantasy',
    name: 'Amazing Fantasy',
    abbr: 'AF',
    vol: 1,
    wikiTitle: 'Amazing Fantasy Vol 1',
    accent: 'origin',
    role: 'lead',
    relevance: 'core',
    note: 'The debut, in the final issue of a cancelled anthology.',
    segments: [
      { from: 15, to: 15, startDate: '1962-08', endDate: '1962-08', startExact: true, endExact: true },
    ],
  },

  /* --------------------------------------------------------- 1963 → 1990 */
  {
    key: 'amazing-spider-man',
    name: 'The Amazing Spider-Man',
    abbr: 'ASM',
    vol: 1,
    wikiTitle: 'Amazing Spider-Man Vol 1',
    accent: 'asm',
    role: 'lead',
    relevance: 'core',
    note: 'The main title and the backbone of the whole tree. Semi-monthly from 1988.',
    segments: [
      // Bimonthly out of the gate.
      { from: 1,   to: 4,   startDate: '1963-03', endDate: '1963-09', startExact: true },
      // Settles into monthly for twenty-five years.
      { from: 5,   to: 31,  startDate: '1963-10', endDate: '1965-12', startExact: true, endExact: true },
      { from: 32,  to: 100, startDate: '1966-01', endDate: '1971-09', endExact: true },
      { from: 101, to: 200, startDate: '1971-10', endDate: '1980-01', endExact: true },
      { from: 201, to: 300, startDate: '1980-02', endDate: '1988-05', endExact: true },
      // Semi-monthly era: more than twelve issues a year, so anchors sit close together.
      { from: 301, to: 310, startDate: '1988-06', endDate: '1988-12', endExact: true },
      { from: 311, to: 320, startDate: '1989-01', endDate: '1989-09', endExact: true },
      { from: 321, to: 325, startDate: '1989-10', endDate: '1989-11', endExact: true },
      { from: 326, to: 328, startDate: '1989-12', endDate: '1990-01', endExact: true },
      { from: 329, to: 335, startDate: '1990-02', endDate: '1990-07', endExact: true },
      { from: 336, to: 340, startDate: '1990-08', endDate: '1990-10', endExact: true },
      { from: 341, to: 342, startDate: '1990-11', endDate: '1990-12', startExact: true, endExact: true },
      // Back to a steady monthly cadence for the rest of the volume.
      { from: 343, to: 441, startDate: '1991-01', endDate: '1998-11', endExact: true },
    ],
  },
  {
    key: 'amazing-spider-man-annual',
    name: 'The Amazing Spider-Man Annual',
    abbr: 'ASM ANN',
    vol: 1,
    wikiTitle: 'Amazing Spider-Man Annual Vol 1',
    accent: 'asm',
    role: 'lead',
    relevance: 'notable',
    isAnnual: true,
    note: 'Oversized yearly specials. Several carry major first appearances.',
    segments: [
      { from: 1,  to: 24, startDate: '1964-10', endDate: '1990-08', cadence: 'annual', startExact: true, endExact: true },
      { from: 25, to: 28, startDate: '1991-09', endDate: '1994-05', cadence: 'annual', startExact: true, endExact: true },
      // 1995 had no annual, and from 1996 Marvel stopped numbering them: the
      // covers read "Amazing Spider-Man '96" and the wiki files each one under
      // its year. The numbers below are the legacy numbering the wiki itself
      // assigns in its LegacyNumber field, which is the only thing tying
      // "Vol 1 1998" to annual #31 — there is no "Vol 1 31" page to find.
      { from: 29, to: 34, startDate: '1996-10', endDate: '2001-05', cadence: 'annual',
        startExact: true, endExact: true,
        wikiPages: {
          29: 'Amazing Spider-Man Annual Vol 1 1996',
          30: 'Amazing Spider-Man Annual Vol 1 1997',
          31: 'Amazing Spider-Man Annual Vol 1 1998',
          32: 'Amazing Spider-Man Annual Vol 1 1999',
          33: 'Amazing Spider-Man Annual Vol 1 2000',
          34: 'Amazing Spider-Man Annual Vol 1 2001',
        } },
      // Then nothing for seven years. The 2008 revival is a fresh volume that
      // restarts at #1 and then, from the following year, jumps to the legacy
      // number — so #35 is "Vol 2 1" while #36 to #39 are "Vol 2 36" to
      // "Vol 2 39", and only the first needs naming.
      { from: 35, to: 39, startDate: '2008-12', endDate: '2012-07', cadence: 'annual',
        startExact: true, endExact: true,
        wikiTitle: 'Amazing Spider-Man Annual Vol 2',
        wikiPages: { 35: 'Amazing Spider-Man Annual Vol 2 1' } },
    ],
  },

  /* ---------------------------------------------------------------- 1968 */
  {
    key: 'spectacular-spider-man-magazine',
    name: 'The Spectacular Spider-Man (magazine)',
    abbr: 'SSM MAG',
    vol: 1,
    wikiTitle: 'Spectacular Spider-Man Magazine Vol 1',
    accent: 'spec-mag',
    role: 'lead',
    relevance: 'notable',
    note: 'A short-lived magazine-format experiment. Two issues only.',
    segments: [
      { from: 1, to: 2, startDate: '1968-07', endDate: '1968-11', startExact: true, endExact: true },
    ],
  },

  /* --------------------------------------------------------- 1972 → 1985 */
  {
    key: 'marvel-team-up',
    name: 'Marvel Team-Up',
    abbr: 'MTU',
    vol: 1,
    wikiTitle: 'Marvel Team-Up Vol 1',
    accent: 'mtu',
    role: 'lead',
    relevance: 'notable',
    note: 'Spider-Man headlines the great majority of the run, paired with a rotating guest.',
    segments: [
      // Bimonthly at first, then monthly — needs mid-run anchors or it drifts.
      { from: 1,   to: 20,  startDate: '1972-03', endDate: '1974-04', startExact: true, endExact: true },
      { from: 21,  to: 25,  startDate: '1974-05', endDate: '1974-09', endExact: true },
      { from: 26,  to: 50,  startDate: '1974-10', endDate: '1976-10', endExact: true },
      { from: 51,  to: 100, startDate: '1976-11', endDate: '1980-12', endExact: true },
      { from: 101, to: 150, startDate: '1981-01', endDate: '1985-02', endExact: true },
    ],
  },
  {
    key: 'marvel-team-up-annual',
    name: 'Marvel Team-Up Annual',
    abbr: 'MTU ANN',
    vol: 1,
    wikiTitle: 'Marvel Team-Up Annual Vol 1',
    accent: 'mtu',
    role: 'lead',
    relevance: 'optional',
    isAnnual: true,
    segments: [
      { from: 1, to: 7, startDate: '1976-08', endDate: '1984-08', cadence: 'annual' },
    ],
  },

  /* --------------------------------------------------------- 1976 → 1990 */
  {
    key: 'peter-parker-spectacular',
    name: 'Peter Parker, The Spectacular Spider-Man',
    abbr: 'PPSSM',
    vol: 1,
    wikiTitle: 'Peter Parker, The Spectacular Spider-Man Vol 1',
    accent: 'ppssm',
    role: 'lead',
    relevance: 'core',
    note: 'The second ongoing. Retitled simply The Spectacular Spider-Man from #134.',
    segments: [
      { from: 1,   to: 133, startDate: '1976-12', endDate: '1987-12', startExact: true, endExact: true },
      // Marvel Database files the renamed run under a different page title.
      { from: 134, to: 171, startDate: '1988-01', endDate: '1990-12',
        wikiTitle: 'Spectacular Spider-Man Vol 1', startExact: true, endExact: true },
      { from: 172, to: 263, startDate: '1991-01', endDate: '1998-11',
        wikiTitle: 'Spectacular Spider-Man Vol 1', startExact: true, endExact: true },
    ],
  },
  {
    key: 'spectacular-spider-man-annual',
    name: 'The Spectacular Spider-Man Annual',
    abbr: 'PPSSM ANN',
    vol: 1,
    wikiTitle: 'Spectacular Spider-Man Annual Vol 1',
    accent: 'ppssm',
    role: 'lead',
    relevance: 'notable',
    isAnnual: true,
    segments: [
      // Same title split as the parent series: the wiki files the early annuals
      // under the "Peter Parker" name and drops it from #8.
      { from: 1, to: 7,  startDate: '1979-12', endDate: '1987-08', cadence: 'annual',
        wikiTitle: 'Peter Parker, The Spectacular Spider-Man Annual Vol 1', startExact: true },
      { from: 8,  to: 10, startDate: '1988-11', endDate: '1990-08', cadence: 'annual',
        startExact: true, endExact: true },
      { from: 11, to: 14, startDate: '1991-09', endDate: '1994-06', cadence: 'annual',
        startExact: true, endExact: true },
    ],
  },

  /* --------------------------------------------------------- 1985 → 1990 */
  {
    key: 'web-of-spider-man',
    name: 'Web of Spider-Man',
    abbr: 'WEB',
    vol: 1,
    wikiTitle: 'Web of Spider-Man Vol 1',
    accent: 'web',
    role: 'lead',
    relevance: 'core',
    note: 'The third ongoing, launched into the slot Marvel Team-Up vacated.',
    segments: [
      { from: 1,  to: 36, startDate: '1985-04', endDate: '1988-03', startExact: true, endExact: true },
      { from: 37, to: 69, startDate: '1988-04', endDate: '1990-10', endExact: true },
      { from: 70,  to: 71,  startDate: '1990-11', endDate: '1990-12', startExact: true, endExact: true },
      { from: 72,  to: 129, startDate: '1991-01', endDate: '1995-10', endExact: true },
    ],
  },
  {
    key: 'web-of-spider-man-annual',
    name: 'Web of Spider-Man Annual',
    abbr: 'WEB ANN',
    vol: 1,
    wikiTitle: 'Web of Spider-Man Annual Vol 1',
    accent: 'web',
    role: 'lead',
    relevance: 'notable',
    isAnnual: true,
    segments: [
      { from: 1, to: 6,  startDate: '1985-08', endDate: '1990-08', cadence: 'annual', endExact: true },
      { from: 7, to: 10, startDate: '1991-09', endDate: '1994-06', cadence: 'annual', startExact: true, endExact: true },
    ],
  },


  /* --------------------------------------------------------- 1990 → 1998 */
  {
    key: 'spider-man-1990',
    name: 'Spider-Man',
    abbr: 'SM',
    vol: 1,
    wikiTitle: 'Spider-Man Vol 1',
    accent: 'sm90',
    role: 'lead',
    relevance: 'core',
    note: 'Launched for McFarlane as writer-artist. Retitled Peter Parker: Spider-Man from #75.',
    segments: [
      { from: 1,  to: 75, startDate: '1990-08', endDate: '1996-12', startExact: true, endExact: true },
      { from: 76, to: 98, startDate: '1997-01', endDate: '1998-11', endExact: true },
    ],
  },

  /* --------------------------------------------------------- 1993 → 1998 */
  {
    key: 'spider-man-unlimited',
    name: 'Spider-Man Unlimited',
    abbr: 'SMU',
    vol: 1,
    wikiTitle: 'Spider-Man Unlimited Vol 1',
    accent: 'unlimited',
    role: 'lead',
    relevance: 'notable',
    note: 'Quarterly, oversized. Carries several chapters of the decade’s big arcs.',
    segments: [
      { from: 1, to: 22, startDate: '1993-05', endDate: '1998-11', startExact: true, endExact: true },
    ],
  },

  /* --------------------------------------------------------- 1996 → 1998 */
  {
    key: 'sensational-spider-man',
    name: 'The Sensational Spider-Man',
    abbr: 'SEN',
    vol: 1,
    wikiTitle: 'Sensational Spider-Man Vol 1',
    accent: 'sensational',
    role: 'lead',
    relevance: 'core',
    note: 'Replaced Web of Spider-Man in the rotation. Starts at #0.',
    segments: [
      { from: 0, to: 33, startDate: '1996-01', endDate: '1998-11', startExact: true, endExact: true },
    ],
  },

  /* --------------------------------------------------------- 1999 → 2000 */
  {
    key: 'amazing-spider-man-v2',
    name: 'The Amazing Spider-Man (vol. 2)',
    abbr: 'ASM v2',
    vol: 2,
    wikiTitle: 'Amazing Spider-Man Vol 2',
    accent: 'asm',
    role: 'lead',
    relevance: 'core',
    note: 'The 1998 relaunch renumbers from #1 after 441 issues.',
    segments: [
      { from: 1,  to: 13, startDate: '1999-01', endDate: '2000-01', startExact: true, endExact: true },
      { from: 14, to: 58, startDate: '2000-02', endDate: '2003-11', endExact: true },
      // The volume keeps its number on the wiki but resumes the original count
      // at #500. Same title, same volume, a 442-issue jump.
      { from: 500, to: 545, startDate: '2003-12', endDate: '2008-01', startExact: true, endExact: true },
      // Brand New Day: three issues a month, so the anchors sit close together.
      { from: 546, to: 583, startDate: '2008-02', endDate: '2009-03', startExact: true, endExact: true },
      { from: 584, to: 600, startDate: '2009-04', endDate: '2009-09', endExact: true },
      { from: 601, to: 618, startDate: '2009-10', endDate: '2010-03', endExact: true },
      { from: 619, to: 640, startDate: '2010-04', endDate: '2010-10', endExact: true },
      { from: 641, to: 647, startDate: '2010-11', endDate: '2010-12', endExact: true },
      { from: 648, to: 700, startDate: '2011-01', endDate: '2013-02', endExact: true },
    ],
  },
  {
    key: 'peter-parker-spider-man-v2',
    name: 'Peter Parker: Spider-Man (vol. 2)',
    abbr: 'PPSM v2',
    vol: 2,
    wikiTitle: 'Peter Parker: Spider-Man Vol 1',
    accent: 'ppssm',
    role: 'lead',
    relevance: 'core',
    note: 'The relaunch companion to Amazing vol. 2.',
    segments: [
      { from: 1,  to: 13, startDate: '1999-01', endDate: '2000-01', startExact: true, endExact: true },
      { from: 14, to: 57, startDate: '2000-02', endDate: '2003-08', endExact: true },
    ],
  },



  /* ========================================================= 2003 → 2010 */
  {
    key: 'spectacular-spider-man-v2',
    name: 'The Spectacular Spider-Man (vol. 2)',
    abbr: 'SSM v2', vol: 2,
    wikiTitle: 'Spectacular Spider-Man Vol 2', accent: 'ppssm',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 27, startDate: '2003-09', endDate: '2005-06', startExact: true, endExact: true }],
  },
  {
    key: 'marvel-knights-spider-man',
    name: 'Marvel Knights: Spider-Man',
    abbr: 'MK', vol: 1,
    wikiTitle: 'Marvel Knights: Spider-Man Vol 1', accent: 'sm90',
    role: 'lead', relevance: 'core',
    note: 'Its numbering continues into Sensational Spider-Man vol. 2 at #23.',
    segments: [{ from: 1, to: 22, startDate: '2004-06', endDate: '2006-03', startExact: true }],
  },
  {
    key: 'sensational-spider-man-v2',
    name: 'The Sensational Spider-Man (vol. 2)',
    abbr: 'SEN v2', vol: 2,
    wikiTitle: 'Sensational Spider-Man Vol 2', accent: 'sensational',
    role: 'lead', relevance: 'core',
    note: 'Picks up the Marvel Knights numbering rather than starting at #1.',
    segments: [{ from: 23, to: 41, startDate: '2006-04', endDate: '2007-12', startExact: true, endExact: true }],
  },
  {
    key: 'friendly-neighborhood-spider-man',
    name: 'Friendly Neighborhood Spider-Man',
    abbr: 'FNSM', vol: 1,
    wikiTitle: 'Friendly Neighborhood Spider-Man Vol 1', accent: 'unlimited',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 24, startDate: '2005-12', endDate: '2007-11', startExact: true, endExact: true }],
  },

  /* ===================================================== OTRO UNIVERSO
     A separate continuity, started from scratch in 2000. Not a continuation
     of anything above: same character, no shared history. The tree renders it
     as its own line, which is the honest way to show it — reading it does not
     require, and is not required by, anything in the main sequence.
     ==================================================================== */
  {
    key: 'ultimate-spider-man',
    name: 'Ultimate Spider-Man',
    abbr: 'USM', vol: 1,
    wikiTitle: 'Ultimate Spider-Man Vol 1', accent: 'ultimate',
    universe: 'ultimate',
    role: 'lead', relevance: 'core',
    note: 'Retells the origin for a new readership, in a continuity of its own.',
    segments: [{ from: 1, to: 133, startDate: '2000-10', endDate: '2009-08', startExact: true, endExact: true }],
  },
  {
    key: 'ultimate-spider-man-annual',
    name: 'Ultimate Spider-Man Annual',
    abbr: 'USM ANN', vol: 1,
    wikiTitle: 'Ultimate Spider-Man Annual Vol 1', accent: 'ultimate',
    universe: 'ultimate',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 3, startDate: '2005-10', endDate: '2008-12', cadence: 'annual', startExact: true, endExact: true }],
  },


  /* ========================================================= 2013 → 2020 */
  {
    key: 'superior-spider-man',
    name: 'The Superior Spider-Man', abbr: 'SUP', vol: 1,
    wikiTitle: 'Superior Spider-Man Vol 1', accent: 'superior',
    role: 'lead', relevance: 'core',
    note: 'Someone else is Spider-Man for thirty-three issues, and the book does not pretend otherwise.',
    segments: [{ from: 1, to: 33, startDate: '2013-03', endDate: '2014-11', startExact: true, endExact: true }],
  },
  {
    key: 'amazing-spider-man-v3',
    name: 'The Amazing Spider-Man (vol. 3)', abbr: 'ASM v3', vol: 3,
    wikiTitle: 'Amazing Spider-Man Vol 3', accent: 'asm',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 18, startDate: '2014-06', endDate: '2015-07', startExact: true, endExact: true }],
  },
  {
    key: 'amazing-spider-man-v4',
    name: 'The Amazing Spider-Man (vol. 4)', abbr: 'ASM v4', vol: 4,
    wikiTitle: 'Amazing Spider-Man Vol 4', accent: 'asm',
    role: 'lead', relevance: 'core',
    note: 'Runs #1-32, then switches to legacy numbering and finishes at #801.',
    segments: [
      { from: 1,   to: 32,  startDate: '2015-12', endDate: '2017-11', startExact: true, endExact: true },
      { from: 789, to: 801, startDate: '2017-12', endDate: '2018-08', startExact: true, endExact: true },
    ],
  },
  {
    key: 'amazing-spider-man-v5',
    name: 'The Amazing Spider-Man (vol. 5)', abbr: 'ASM v5', vol: 5,
    wikiTitle: 'Amazing Spider-Man Vol 5', accent: 'asm',
    role: 'lead', relevance: 'core',
    segments: [
      { from: 1,  to: 51, startDate: '2018-09', endDate: '2020-12', startExact: true, endExact: true },
      { from: 52, to: 93, startDate: '2021-01', endDate: '2022-05', endExact: true },
    ],
  },

  /* ===================================== Miles Morales, en la línea principal
     After the 2015 crossover folded the Ultimate line into the main one, Miles
     continues here. Same character, different continuity from where he began —
     which is why his Ultimate books below carry a different universe.
     ======================================================================== */
  {
    key: 'spider-man-miles-v2',
    name: 'Spider-Man (Miles Morales)', abbr: 'SM-M', vol: 2,
    wikiTitle: 'Spider-Man Vol 2', accent: 'miles',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 21, startDate: '2016-04', endDate: '2017-12', startExact: true, endExact: true }],
  },
  {
    key: 'miles-morales-spider-man',
    name: 'Miles Morales: Spider-Man', abbr: 'MM', vol: 1,
    wikiTitle: 'Miles Morales: Spider-Man Vol 1', accent: 'miles',
    role: 'lead', relevance: 'core',
    segments: [
      { from: 1,  to: 19, startDate: '2019-02', endDate: '2020-12', startExact: true, endExact: true },
      { from: 20, to: 42, startDate: '2021-01', endDate: '2022-11', endExact: true },
    ],
  },

  /* ================================= La rama Ultimate, segunda generación */
  {
    key: 'ultimate-comics-spider-man',
    name: 'Ultimate Comics Spider-Man', abbr: 'UCSM', vol: 1,
    wikiTitle: 'Ultimate Comics Spider-Man Vol 1', accent: 'miles',
    universe: 'ultimate',
    role: 'lead', relevance: 'core',
    note: 'A new Spider-Man in the parallel line: Miles Morales.',
    segments: [{ from: 1, to: 28, startDate: '2011-11', endDate: '2013-12', startExact: true, endExact: true }],
  },
  {
    key: 'miles-morales-ultimate',
    name: 'Miles Morales: Ultimate Spider-Man', abbr: 'MMU', vol: 1,
    wikiTitle: 'Miles Morales: Ultimate Spider-Man Vol 1', accent: 'miles',
    universe: 'ultimate',
    role: 'lead', relevance: 'core',
    note: 'The last Ultimate Spider-Man book. The line ends with its twelfth issue.',
    segments: [{ from: 1, to: 12, startDate: '2014-07', endDate: '2015-06', startExact: true, endExact: true }],
  },


  /* ===================================== Títulos de team-up de los 2010s
     Both are books he headlines, so they belong here rather than in the guest
     appearances layer — a distinction worth keeping straight, since a team-up
     title reads very differently from a walk-on part in someone else's book.
     ======================================================================== */
  {
    key: 'avenging-spider-man',
    name: 'Avenging Spider-Man', abbr: 'AVSM', vol: 1,
    wikiTitle: 'Avenging Spider-Man Vol 1', accent: 'mtu',
    role: 'lead', relevance: 'notable',
    // Known gap: this run also has a #15.1. The generator models whole numbers
    // only, so decimal issues of this era are missing here and in Superior.
    segments: [{ from: 1, to: 22, startDate: '2012-01', endDate: '2013-08', startExact: true, endExact: true }],
  },
  {
    key: 'superior-spider-man-team-up',
    name: 'Superior Spider-Man Team-Up', abbr: 'SUP TU', vol: 1,
    wikiTitle: 'Superior Spider-Man Team-Up Vol 1', accent: 'superior',
    role: 'lead', relevance: 'notable',
    note: 'The team-up book during the run where Spider-Man was somebody else.',
    segments: [{ from: 1, to: 12, startDate: '2013-09', endDate: '2014-06', startExact: true, endExact: true }],
  },


  /* ========================================================= 2019 → 2026 */
  {
    key: 'superior-spider-man-v2',
    name: 'The Superior Spider-Man (vol. 2)', abbr: 'SUP v2', vol: 2,
    wikiTitle: 'Superior Spider-Man Vol 2', accent: 'superior',
    role: 'lead', relevance: 'notable',
    note: 'A twelve-issue return to the premise, five years after the original run.',
    segments: [{ from: 1, to: 12, startDate: '2019-02', endDate: '2019-12', startExact: true, endExact: true }],
  },
  {
    key: 'amazing-spider-man-v6',
    name: 'The Amazing Spider-Man (vol. 6)', abbr: 'ASM v6', vol: 6,
    wikiTitle: 'Amazing Spider-Man Vol 6', accent: 'asm',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 70, startDate: '2022-06', endDate: '2025-05', startExact: true, endExact: true }],
  },
  {
    key: 'spider-man-v4',
    name: 'Spider-Man (vol. 4)', abbr: 'SM v4', vol: 4,
    wikiTitle: 'Spider-Man Vol 4', accent: 'sm90',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 11, startDate: '2022-12', endDate: '2023-10', startExact: true, endExact: true }],
  },
  {
    key: 'miles-morales-spider-man-v2',
    name: 'Miles Morales: Spider-Man (vol. 2)', abbr: 'MM v2', vol: 2,
    wikiTitle: 'Miles Morales: Spider-Man Vol 2', accent: 'miles',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 35, startDate: '2023-02', endDate: '2025-09', startExact: true, endExact: true }],
  },
  {
    key: 'superior-spider-man-v3',
    name: 'The Superior Spider-Man (vol. 3)', abbr: 'SUP v3', vol: 3,
    wikiTitle: 'Superior Spider-Man Vol 3', accent: 'superior',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 8, startDate: '2024-01', endDate: '2024-08', startExact: true, endExact: true }],
  },

  /* ============================================== UNA TERCERA CONTINUIDAD
     A second Ultimate line, started in 2024 and unrelated to the 2000 one
     beyond the name. Its own universe key, so the tree forks again rather than
     folding it in with a continuity that ended in 2015.
     ==================================================================== */
  {
    key: 'ultimate-spider-man-2024',
    name: 'Ultimate Spider-Man (2024)', abbr: 'USM24', vol: 3,
    wikiTitle: 'Ultimate Spider-Man Vol 3', accent: 'ultimate2',
    universe: 'ultimate-6160',
    role: 'lead', relevance: 'core',
    note: 'A Peter Parker who reaches middle age before becoming Spider-Man. Shares nothing with the 2000 line but the label.',
    segments: [{ from: 1, to: 24, startDate: '2024-03', endDate: '2026-02', startExact: true, endExact: true }],
  },

  /* ============================================= La era del clon: miniseries
     The Clone Saga did not stay inside the four ongoing titles. Marvel spun off
     a shelf of short series around it, and a reading guide that omits them
     leaves gaps mid-story. Discovered by querying the wiki's own category for
     the event rather than from memory, which is also how the collections and
     omnibuses were kept out: those reprint, they do not continue.

     Deliberately excluded: New Warriors #61-67, Green Goblin #3 and Daredevil
     #354 carry chapters but are other characters' books — they belong in
     data/appearances.js if they are ever added.
     ======================================================================== */
  {
    key: 'web-of-scarlet-spider', name: 'Web of Scarlet Spider', abbr: 'WSS', vol: 1,
    wikiTitle: 'Web of Scarlet Spider Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '1995-11', endDate: '1996-02', startExact: true, endExact: true }],
  },
  {
    key: 'scarlet-spider', name: 'Scarlet Spider', abbr: 'SS', vol: 1,
    wikiTitle: 'Scarlet Spider Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 2, startDate: '1995-11', endDate: '1995-12', startExact: true, endExact: true }],
  },
  {
    key: 'amazing-scarlet-spider', name: 'The Amazing Scarlet Spider', abbr: 'ASS', vol: 1,
    wikiTitle: 'Amazing Scarlet Spider Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 2, startDate: '1995-11', endDate: '1995-12', startExact: true, endExact: true }],
  },
  {
    key: 'spectacular-scarlet-spider', name: 'The Spectacular Scarlet Spider', abbr: 'SSS2', vol: 1,
    wikiTitle: 'Spectacular Scarlet Spider Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 2, startDate: '1995-11', endDate: '1995-12', startExact: true, endExact: true }],
  },
  {
    key: 'scarlet-spider-unlimited', name: 'Scarlet Spider Unlimited', abbr: 'SSU', vol: 1,
    wikiTitle: 'Scarlet Spider Unlimited Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '1995-11', endDate: '1995-11', startExact: true, endExact: true }],
  },
  {
    key: 'lost-years', name: 'Spider-Man: The Lost Years', abbr: 'LY', vol: 1,
    wikiTitle: 'Spider-Man: The Lost Years Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    note: 'Ben Reilly’s missing years. #0 shipped after #3, so the timeline places it in 1996.',
    segments: [{ from: 0, to: 3, startDate: '1995-08', endDate: '1995-10' }],
  },
  {
    key: 'final-adventure', name: 'Spider-Man: The Final Adventure', abbr: 'FA', vol: 1,
    wikiTitle: 'Spider-Man: The Final Adventure Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '1995-12', endDate: '1996-03', startExact: true, endExact: true }],
  },
  {
    key: 'redemption', name: 'Spider-Man: Redemption', abbr: 'RED', vol: 1,
    wikiTitle: 'Spider-Man: Redemption Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '1996-09', endDate: '1996-12', startExact: true, endExact: true }],
  },
  {
    key: 'funeral-for-an-octopus', name: 'Spider-Man: Funeral for an Octopus', abbr: 'FFO', vol: 1,
    wikiTitle: 'Spider-Man: Funeral for an Octopus Vol 1', accent: 'unlimited',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '1995-03', endDate: '1995-05', startExact: true, endExact: true }],
  },
  {
    key: 'spider-man-team-up', name: 'Spider-Man Team-Up', abbr: 'SMTU', vol: 1,
    wikiTitle: 'Spider-Man Team-Up Vol 1', accent: 'mtu',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '1995-12', endDate: '1996-12', startExact: true, endExact: true }],
  },
  {
    key: 'maximum-clonage-alpha', name: 'Spider-Man: Maximum Clonage Alpha', abbr: 'MCA', vol: 1,
    wikiTitle: 'Spider-Man: Maximum Clonage Alpha Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '1995-08', endDate: '1995-08', startExact: true, endExact: true }],
  },
  {
    key: 'maximum-clonage-omega', name: 'Spider-Man: Maximum Clonage Omega', abbr: 'MCO', vol: 1,
    wikiTitle: 'Spider-Man: Maximum Clonage Omega Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '1995-08', endDate: '1995-08', startExact: true, endExact: true }],
  },
  {
    key: 'clone-journal', name: 'Spider-Man: The Clone Journal', abbr: 'CJ', vol: 1,
    wikiTitle: 'Spider-Man The Clone Journal Vol 1', accent: 'scarlet',
    role: 'lead', relevance: 'optional',
    segments: [{ from: 1, to: 1, startDate: '1995-03', endDate: '1995-03', startExact: true, endExact: true }],
  },
  {
    key: 'osborn-journals', name: 'Osborn Journals', abbr: 'OJ', vol: 1,
    wikiTitle: 'Osborn Journals Vol 1', accent: 'sm90',
    role: 'lead', relevance: 'notable',
    note: 'Fills in what Norman Osborn was doing during the years he was believed dead.',
    segments: [{ from: 1, to: 1, startDate: '1997-02', endDate: '1997-02', startExact: true, endExact: true }],
  },

  /* ------------------------------------------- Optional / hidden by default */
  {
    key: 'marvel-tales',
    name: 'Marvel Tales',
    abbr: 'MTALES',
    vol: 2,
    wikiTitle: 'Marvel Tales Vol 2',
    accent: 'reprint',
    role: 'lead',
    relevance: 'optional',
    isReprint: true,
    note: 'Reprint anthology. No new story — useful only as a reading substitute.',
    segments: [
      { from: 1,   to: 241, startDate: '1964-01', endDate: '1990-09', endExact: true },
      { from: 242, to: 244, startDate: '1990-10', endDate: '1990-12', startExact: true, endExact: true },
      { from: 245, to: 291, startDate: '1991-01', endDate: '1994-11', endExact: true },
    ],
  },
  {
    key: 'spidey-super-stories',
    name: 'Spidey Super Stories',
    abbr: 'SSS',
    vol: 1,
    wikiTitle: 'Spidey Super Stories Vol 1',
    accent: 'kids',
    role: 'lead',
    relevance: 'optional',
    outOfContinuity: true,
    note: 'All-ages tie-in to The Electric Company. Outside main continuity.',
    segments: [
      { from: 1, to: 57, startDate: '1974-10', endDate: '1982-03', startExact: true, endExact: true },
    ],
  },
]

export const SERIES_BY_KEY = Object.fromEntries(SERIES.map((s) => [s.key, s]))
