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
      // Marvel wound the annuals down mid-decade; this line stops at #28.
      { from: 25, to: 28, startDate: '1991-09', endDate: '1994-05', cadence: 'annual', startExact: true, endExact: true },
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
      { from: 14, to: 24, startDate: '2000-02', endDate: '2000-12' },
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
      { from: 14, to: 24, startDate: '2000-02', endDate: '2000-12' },
    ],
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
