/**
 * Daredevil — the series he headlines, expanded into issues by the generator.
 *
 * Same model as data/spider-man/series.js, which documents it: segments between
 * anchor dates, `extras` for numbers that are not steps in a run, `wikiPages`
 * where the number does not derive the Marvel Database page. The anchors below
 * were read off the wiki on 2026-09-11; `npm run verify:wiki` then replaces
 * every estimate with the issue's own date.
 *
 * KEYS ARE GLOBAL. The Spider-Man tree already carries Daredevil issues as
 * guest appearances, and fixed two keys by doing so: `daredevil` is the 1964
 * volume (its `daredevil-16` is this tree's #16) and `devils-reign` is the 2021
 * event. Later volumes follow the Spider-Man convention, `-v2` to `-v9`.
 *
 * Out of continuity, and therefore `optional`, is whatever the wiki sets in
 * another reality — End of Days (Earth-12121), Cold Day in Hell (Earth-25696),
 * Season One (Earth-46266), Noir, 2099, the 2026 Born Again (the screen
 * universe, Earth-199999) — plus the film adaptation and the two company
 * crossovers. Checked per issue page, not assumed from the title: Yellow and
 * the 1993 Man Without Fear read like retellings and are both Earth-616.
 *
 * Deliberately left out:
 *   Daredevil: The Target #2   cancelled; Kevin Smith never finished it.
 *   Protection Racket (1998)   a Marvel CyberComics web serial, never printed.
 *   Daredevil/Punisher: Seventh Circle Infinite Comic   the digital first
 *                              release of the story Daredevil/Punisher #1-4
 *                              prints; one of the two is enough.
 *   Child's Play (1988), Daredevils (1983), Facsimile Editions   reprints.
 *   Shadowland and Devil's Reign tie-ins   other characters' books; they are
 *                              for data/daredevil/appearances.js, one by one,
 *                              if he carries weight in them.
 */

export const SERIES = [
  /* --------------------------------------------------------- 1964 → 1998 */
  {
    key: 'daredevil',
    name: 'Daredevil',
    abbr: 'DD',
    vol: 1,
    wikiTitle: 'Daredevil Vol 1',
    accent: 'dd',
    role: 'lead',
    relevance: 'core',
    note: 'The first volume, thirty-four years long. Bimonthly for its first two.',
    segments: [
      // Bimonthly out of the gate, and for all of 1965.
      { from: 1,   to: 5,   startDate: '1964-04', endDate: '1964-12', startExact: true, endExact: true },
      { from: 6,   to: 11,  startDate: '1965-02', endDate: '1965-12', startExact: true, endExact: true },
      { from: 12,  to: 50,  startDate: '1966-01', endDate: '1969-03', startExact: true, endExact: true },
      { from: 51,  to: 100, startDate: '1969-04', endDate: '1973-06', endExact: true },
      { from: 101, to: 150, startDate: '1973-07', endDate: '1978-01', endExact: true },
      // Bimonthly again from 1978 to the end of 1980, which is where Miller
      // took over: a monthly estimate had his first issues six months early.
      { from: 151, to: 158, startDate: '1978-03', endDate: '1979-05', endExact: true },
      { from: 159, to: 167, startDate: '1979-07', endDate: '1980-11', startExact: true, endExact: true },
      { from: 168, to: 200, startDate: '1981-01', endDate: '1983-11', startExact: true, endExact: true },
      { from: 201, to: 250, startDate: '1983-12', endDate: '1988-01', endExact: true },
      { from: 251, to: 300, startDate: '1988-02', endDate: '1992-01', endExact: true },
      { from: 301, to: 350, startDate: '1992-02', endDate: '1996-03', endExact: true },
      { from: 351, to: 380, startDate: '1996-04', endDate: '1998-10', endExact: true },
    ],
    extras: [
      { number: -1, coverDate: '1997-07', relevance: 'notable' },
    ],
  },
  {
    key: 'daredevil-annual',
    name: 'Daredevil Annual',
    abbr: 'DD ANN',
    vol: 1,
    wikiTitle: 'Daredevil Annual Vol 1',
    accent: 'dd',
    role: 'lead',
    relevance: 'notable',
    isAnnual: true,
    segments: [
      { from: 1, to: 4, startDate: '1967-09', endDate: '1976-10', cadence: 'annual', startExact: true, endExact: true },
      // Marvel printed two Annual #4s, in 1976 and 1989. The wiki keeps the
      // second at "4B" and redirects "5" to it; this tree calls it #5, since a
      // number shared by two issues cannot be an id. Its file will say 004 —
      // alias it in data/library.js or it claims the 1976 one.
      { from: 5, to: 10, startDate: '1989-09', endDate: '1994-05', cadence: 'annual',
        startExact: true, endExact: true,
        wikiPages: { 5: 'Daredevil Annual Vol 1 4B' } },
    ],
  },

  /* --------------------------------------------------------- 1998 → 2011 */
  {
    key: 'daredevil-v2',
    name: 'Daredevil (vol. 2)',
    abbr: 'DD v2',
    vol: 2,
    wikiTitle: 'Daredevil Vol 2',
    accent: 'dd-mk',
    role: 'lead',
    relevance: 'core',
    note: 'The Marvel Knights relaunch. Returns to the original count at #500.',
    segments: [
      { from: 1,   to: 12,  startDate: '1998-11', endDate: '2000-06', startExact: true, endExact: true },
      // The run's famous delays: #13 to #27 took fifteen months to ship.
      { from: 13,  to: 27,  startDate: '2000-10', endDate: '2002-01', startExact: true, endExact: true },
      { from: 28,  to: 50,  startDate: '2002-02', endDate: '2003-10', startExact: true, endExact: true },
      { from: 51,  to: 100, startDate: '2003-11', endDate: '2007-10', endExact: true },
      { from: 101, to: 119, startDate: '2007-11', endDate: '2009-08', endExact: true },
      // Same volume on the wiki, 381 numbers further on.
      { from: 500, to: 512, startDate: '2009-10', endDate: '2011-02', startExact: true, endExact: true },
    ],
    extras: [
      // Dated two months before #1, as a #0 usually is.
      { number: 0, coverDate: '1998-09', relevance: 'notable' },
    ],
  },
  {
    key: 'daredevil-annual-v2',
    name: 'Daredevil Annual (2007)', abbr: 'DD ANN 07', vol: 2,
    wikiTitle: 'Daredevil Annual Vol 2', accent: 'dd-mk',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2007-12', endDate: '2007-12', startExact: true, endExact: true }],
  },

  /* ------------------------------------------------ the miniseries, 1993-2010 */
  {
    key: 'daredevil-man-without-fear',
    name: 'Daredevil: The Man Without Fear', abbr: 'MWF', vol: 1,
    wikiTitle: 'Daredevil: The Man Without Fear Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    note: 'The origin, retold at length. In continuity, not beside it.',
    segments: [{ from: 1, to: 5, startDate: '1993-10', endDate: '1994-02', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-deadpool-annual',
    name: 'Daredevil/Deadpool Annual ’97', abbr: 'DD/DP', vol: 1,
    wikiTitle: 'Daredevil/Deadpool Annual Vol 1', accent: 'dd',
    role: 'lead', relevance: 'notable', isAnnual: true,
    // Filed by year, like the late Spider-Man annuals.
    segments: [{ from: 1, to: 1, startDate: '1997-09', endDate: '1997-09', startExact: true, endExact: true,
      wikiPages: { 1: 'Daredevil/Deadpool Annual Vol 1 1997' } }],
  },
  {
    key: 'daredevil-ninja',
    name: 'Daredevil: Ninja', abbr: 'NIN', vol: 1,
    wikiTitle: 'Daredevil: Ninja Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2000-12', endDate: '2001-02', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-spider-man',
    name: 'Daredevil/Spider-Man', abbr: 'DD/SM', vol: 1,
    wikiTitle: 'Daredevil/Spider-Man Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2001-01', endDate: '2001-04', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-yellow',
    name: 'Daredevil: Yellow', abbr: 'YEL', vol: 1,
    wikiTitle: 'Daredevil: Yellow Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    note: 'The first year, in the first costume, as a letter to Karen Page.',
    segments: [{ from: 1, to: 6, startDate: '2001-08', endDate: '2002-01', startExact: true, endExact: true }],
  },
  {
    key: 'spider-man-daredevil',
    name: 'Spider-Man/Daredevil', abbr: 'SM/DD', vol: 1,
    wikiTitle: 'Spider-Man/Daredevil Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2002-10', endDate: '2002-10', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-target',
    name: 'Daredevil: The Target', abbr: 'TGT', vol: 1,
    wikiTitle: 'Daredevil: The Target Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    note: 'One issue of a planned run. The second was never finished.',
    segments: [{ from: 1, to: 1, startDate: '2003-01', endDate: '2003-01', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-father',
    name: 'Daredevil: Father', abbr: 'FAT', vol: 1,
    wikiTitle: 'Daredevil: Father Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    note: 'Six issues across nearly three years: the delays are in the dates.',
    // A sixteen-month gap after #1 and a thirteen-month one before #6.
    segments: [
      { from: 1, to: 1, startDate: '2004-06', endDate: '2004-06', startExact: true, endExact: true },
      { from: 2, to: 5, startDate: '2005-10', endDate: '2006-01', startExact: true, endExact: true },
      { from: 6, to: 6, startDate: '2007-02', endDate: '2007-02', startExact: true, endExact: true },
    ],
  },
  {
    key: 'daredevil-redemption',
    name: 'Daredevil: Redemption', abbr: 'RED', vol: 1,
    wikiTitle: 'Daredevil: Redemption Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 6, startDate: '2005-04', endDate: '2005-08', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-vs-punisher',
    name: 'Daredevil vs. Punisher', abbr: 'DDvP', vol: 1,
    wikiTitle: 'Daredevil vs. Punisher Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 6, startDate: '2005-09', endDate: '2006-01', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-battlin-jack-murdock',
    name: 'Daredevil: Battlin’ Jack Murdock', abbr: 'BJM', vol: 1,
    wikiTitle: 'Daredevil: Battlin\' Jack Murdock Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    note: 'His father’s story, before the son took up the name.',
    segments: [{ from: 1, to: 4, startDate: '2007-08', endDate: '2007-11', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-blood-of-the-tarantula',
    name: 'Daredevil: Blood of the Tarantula', abbr: 'BOT', vol: 1,
    // No colon on the wiki, unlike every other Daredevil one-shot.
    wikiTitle: 'Daredevil Blood of the Tarantula Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2008-06', endDate: '2008-06', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-captain-america-dead-on-arrival',
    name: 'Daredevil & Captain America: Dead on Arrival', abbr: 'DOA', vol: 1,
    wikiTitle: 'Daredevil & Captain America: Dead on Arrival Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2008-11', endDate: '2008-11', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-cage-match',
    name: 'Daredevil: Cage Match', abbr: 'CM', vol: 1,
    wikiTitle: 'Daredevil: Cage Match Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2010-07', endDate: '2010-07', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-black-and-white',
    name: 'Daredevil: Black & White', abbr: 'B&W', vol: 1,
    wikiTitle: 'Daredevil Black & White Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2010-10', endDate: '2010-10', startExact: true, endExact: true }],
  },

  /* ============================================================ Shadowland
     The 2010 event is his, headlined in its own series: the Hand's army under
     Matt, and the fall that ends the second volume. Its tie-ins belong to other
     characters and are left for the guest layer. */
  {
    key: 'shadowland',
    name: 'Shadowland', abbr: 'SHA', vol: 1,
    wikiTitle: 'Shadowland Vol 1', accent: 'dd-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 5, startDate: '2010-09', endDate: '2011-01', startExact: true, endExact: true }],
  },
  {
    key: 'shadowland-after-the-fall',
    name: 'Shadowland: After the Fall', abbr: 'SHA AF', vol: 1,
    wikiTitle: 'Shadowland: After the Fall Vol 1', accent: 'dd-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2011-02', endDate: '2011-02', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-reborn',
    name: 'Daredevil: Reborn', abbr: 'REB', vol: 1,
    wikiTitle: 'Daredevil: Reborn Vol 1', accent: 'dd-event',
    role: 'lead', relevance: 'core',
    note: 'The way back from Shadowland, and the bridge to the third volume.',
    segments: [{ from: 1, to: 4, startDate: '2011-03', endDate: '2011-07', startExact: true, endExact: true }],
  },

  /* --------------------------------------------------------- 2011 → 2015 */
  {
    key: 'daredevil-v3',
    name: 'Daredevil (vol. 3)',
    abbr: 'DD v3',
    vol: 3,
    wikiTitle: 'Daredevil Vol 3',
    accent: 'dd-waid',
    role: 'lead',
    relevance: 'core',
    note: 'Mark Waid’s relaunch, lighter on its feet after a decade of catastrophe.',
    segments: [{ from: 1, to: 36, startDate: '2011-09', endDate: '2014-04', startExact: true, endExact: true }],
    extras: [
      { number: 10.1, coverDate: '2012-06', relevance: 'notable' },
    ],
  },
  {
    key: 'daredevil-annual-v3',
    name: 'Daredevil Annual (2012)', abbr: 'DD ANN 12', vol: 3,
    wikiTitle: 'Daredevil Annual Vol 3', accent: 'dd-waid',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2012-10', endDate: '2012-10', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-dark-nights',
    name: 'Daredevil: Dark Nights', abbr: 'DN', vol: 1,
    wikiTitle: 'Daredevil: Dark Nights Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 8, startDate: '2013-08', endDate: '2014-03', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-road-warrior',
    name: 'Daredevil: Road Warrior', abbr: 'RW', vol: 1,
    // Digital first, as an Infinite Comic; the page carries the format in its name.
    wikiTitle: 'Daredevil: Road Warrior Infinite Comic Vol 1', accent: 'dd-waid',
    role: 'lead', relevance: 'notable',
    note: 'Four digital chapters of the drive west, between the third volume and the fourth.',
    segments: [{ from: 1, to: 4, startDate: '2014-04', endDate: '2014-05', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-v4',
    name: 'Daredevil (vol. 4)',
    abbr: 'DD v4',
    vol: 4,
    wikiTitle: 'Daredevil Vol 4',
    accent: 'dd-waid',
    role: 'lead',
    relevance: 'core',
    note: 'Waid’s run continues, moved to San Francisco.',
    segments: [{ from: 1, to: 18, startDate: '2014-05', endDate: '2015-11', startExact: true, endExact: true }],
    extras: [
      // Dated four months after #1 and read after #6: a point-one is where it
      // falls, not where it is numbered.
      { number: 0.1, coverDate: '2014-09', relevance: 'notable' },
      // The fiftieth-anniversary issue, printed as #1.50. The id reads 1.5; the
      // wiki page keeps the printed number.
      { number: 1.5, coverDate: '2014-06', relevance: 'notable', wikiPage: 'Daredevil Vol 4 1.50' },
      { number: 15.1, coverDate: '2015-07', relevance: 'notable' },
    ],
  },

  /* --------------------------------------------------------- 2016 → 2019 */
  {
    key: 'daredevil-v5',
    name: 'Daredevil (vol. 5)',
    abbr: 'DD v5',
    vol: 5,
    wikiTitle: 'Daredevil Vol 5',
    accent: 'dd-soule',
    role: 'lead',
    relevance: 'core',
    note: 'Charles Soule brings him back to New York, identity secret again. Legacy numbering from #595.',
    segments: [
      { from: 1,   to: 28,  startDate: '2016-02', endDate: '2017-12', startExact: true, endExact: true },
      { from: 595, to: 612, startDate: '2018-01', endDate: '2019-01', startExact: true, endExact: true },
    ],
  },
  {
    key: 'daredevil-annual-v4',
    name: 'Daredevil Annual (2016)', abbr: 'DD ANN 16', vol: 4,
    wikiTitle: 'Daredevil Annual Vol 4', accent: 'dd-soule',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2016-10', endDate: '2016-10', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-punisher',
    name: 'Daredevil/Punisher', abbr: 'DD/PUN', vol: 1,
    wikiTitle: 'Daredevil/Punisher Vol 1', accent: 'dd-soule',
    role: 'lead', relevance: 'notable',
    note: 'The print edition of Seventh Circle.',
    segments: [{ from: 1, to: 4, startDate: '2016-07', endDate: '2016-10', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-annual-v5',
    name: 'Daredevil Annual (2018)', abbr: 'DD ANN 18', vol: 5,
    wikiTitle: 'Daredevil Annual Vol 5', accent: 'dd-soule',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2018-10', endDate: '2018-10', startExact: true, endExact: true }],
  },
  {
    key: 'man-without-fear',
    name: 'Man Without Fear', abbr: 'MWF 19', vol: 1,
    wikiTitle: 'Man Without Fear Vol 1', accent: 'dd-soule',
    role: 'lead', relevance: 'core',
    note: 'Five weekly issues between Soule’s run and Zdarsky’s, all in one cover month.',
    segments: [{ from: 1, to: 5, startDate: '2019-03', endDate: '2019-03', startExact: true, endExact: true }],
  },

  /* --------------------------------------------------------- 2019 → 2023 */
  {
    key: 'daredevil-v6',
    name: 'Daredevil (vol. 6)',
    abbr: 'DD v6',
    vol: 6,
    wikiTitle: 'Daredevil Vol 6',
    accent: 'dd-zdarsky',
    role: 'lead',
    relevance: 'core',
    note: 'Chip Zdarsky’s run begins.',
    segments: [{ from: 1, to: 36, startDate: '2019-04', endDate: '2022-02', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-annual-v6',
    name: 'Daredevil Annual (2020)', abbr: 'DD ANN 20', vol: 6,
    wikiTitle: 'Daredevil Annual Vol 6', accent: 'dd-zdarsky',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2020-10', endDate: '2020-10', startExact: true, endExact: true }],
  },
  {
    // The key the Spider-Man tree fixed first, for the same six issues.
    key: 'devils-reign',
    name: 'Devil’s Reign', abbr: 'DR', vol: 1,
    wikiTitle: 'Devil\'s Reign Vol 1', accent: 'dd-event',
    role: 'lead', relevance: 'core',
    note: 'Zdarsky’s run as a line-wide event: Mayor Fisk outlaws the heroes.',
    segments: [{ from: 1, to: 6, startDate: '2022-02', endDate: '2022-06', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-woman-without-fear',
    name: 'Daredevil: Woman Without Fear', abbr: 'WWF', vol: 1,
    wikiTitle: 'Daredevil: Woman Without Fear Vol 1', accent: 'elektra',
    role: 'lead', relevance: 'core',
    note: 'Elektra in the costume, inside Zdarsky’s run.',
    segments: [{ from: 1, to: 3, startDate: '2022-03', endDate: '2022-05', startExact: true, endExact: true }],
  },
  {
    key: 'devils-reign-omega',
    name: 'Devil’s Reign: Omega', abbr: 'DR Ω', vol: 1,
    wikiTitle: 'Devil\'s Reign: Omega Vol 1', accent: 'dd-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2022-07', endDate: '2022-07', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-v7',
    name: 'Daredevil (vol. 7)',
    abbr: 'DD v7',
    vol: 7,
    wikiTitle: 'Daredevil Vol 7',
    accent: 'dd-zdarsky',
    role: 'lead',
    relevance: 'core',
    note: 'Zdarsky’s run continues under a new number one.',
    segments: [{ from: 1, to: 14, startDate: '2022-09', endDate: '2023-10', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-echo',
    name: 'Daredevil & Echo', abbr: 'DD&E', vol: 1,
    wikiTitle: 'Daredevil & Echo Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2023-07', endDate: '2023-10', startExact: true, endExact: true }],
  },

  /* --------------------------------------------------------- 2023 → 2026 */
  {
    key: 'daredevil-v8',
    name: 'Daredevil (vol. 8)',
    abbr: 'DD v8',
    vol: 8,
    wikiTitle: 'Daredevil Vol 8',
    accent: 'dd-2023',
    role: 'lead',
    relevance: 'core',
    segments: [{ from: 1, to: 25, startDate: '2023-11', endDate: '2025-11', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-black-armor',
    name: 'Daredevil: Black Armor', abbr: 'BA', vol: 1,
    wikiTitle: 'Daredevil: Black Armor Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2024-01', endDate: '2024-04', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-gang-war',
    name: 'Daredevil: Gang War', abbr: 'GW', vol: 1,
    wikiTitle: 'Daredevil: Gang War Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2024-02', endDate: '2024-05', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-woman-without-fear-v2',
    name: 'Daredevil: Woman Without Fear (2024)', abbr: 'WWF 24', vol: 2,
    wikiTitle: 'Daredevil: Woman Without Fear Vol 2', accent: 'elektra',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2024-09', endDate: '2024-12', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-unleash-hell',
    name: 'Daredevil: Unleash Hell', abbr: 'UH', vol: 1,
    // An en dash in the wiki's title, not a hyphen.
    wikiTitle: 'Daredevil: Unleash Hell – Red Band Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    note: 'A Red Band book — Marvel’s label for its adult-rated line.',
    segments: [{ from: 1, to: 5, startDate: '2025-03', endDate: '2025-07', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-punisher-devils-trigger',
    name: 'Daredevil/Punisher: The Devil’s Trigger', abbr: 'DT', vol: 1,
    wikiTitle: 'Daredevil/Punisher: The Devil\'s Trigger Vol 1', accent: 'dd-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '2026-01', endDate: '2026-05', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-v9',
    name: 'Daredevil (vol. 9)',
    abbr: 'DD v9',
    vol: 9,
    wikiTitle: 'Daredevil Vol 9',
    accent: 'dd-2023',
    role: 'lead',
    relevance: 'core',
    // Ongoing. #7 goes on sale on 2026-09-16; extend `to` as issues come out,
    // not as they are solicited — the tree lists what can be read.
    segments: [{ from: 1, to: 6, startDate: '2026-05', endDate: '2026-11', startExact: true, endExact: true }],
  },

  /* ------------------------------------------- Optional / hidden by default */
  {
    key: 'daredevil-vs-vapora',
    name: 'Daredevil vs. Vapora', abbr: 'VAP', vol: 1,
    wikiTitle: 'Daredevil vs Vapora Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional',
    note: 'A promotional giveaway. In continuity, and slight.',
    segments: [{ from: 1, to: 1, startDate: '1993-12', endDate: '1993-12', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-batman',
    name: 'Daredevil/Batman', abbr: 'DD/BAT', vol: 1,
    wikiTitle: 'Daredevil/Batman Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    note: 'A Marvel and DC crossover, outside both companies’ continuity.',
    segments: [{ from: 1, to: 1, startDate: '1997-01', endDate: '1997-01', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-shi',
    name: 'Daredevil/Shi', abbr: 'DD/SHI', vol: 1,
    wikiTitle: 'Daredevil/Shi Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 1, startDate: '1997-02', endDate: '1997-02', startExact: true, endExact: true }],
  },
  {
    key: 'batman-daredevil',
    name: 'Batman/Daredevil', abbr: 'BAT/DD', vol: 1,
    wikiTitle: 'Batman/Daredevil Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    // The wiki dates it by year alone; the month is a placeholder.
    segments: [{ from: 1, to: 1, startDate: '2000-06', endDate: '2000-06' }],
  },
  {
    key: 'daredevil-the-movie',
    name: 'Daredevil: The Movie', abbr: 'MOV', vol: 1,
    wikiTitle: 'Daredevil: The Movie Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    note: 'The 2003 film, adapted.',
    segments: [{ from: 1, to: 1, startDate: '2003-03', endDate: '2003-03', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-2099',
    name: 'Daredevil 2099', abbr: '2099', vol: 1,
    wikiTitle: 'Daredevil 2099 Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 1, startDate: '2004-11', endDate: '2004-11', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-noir',
    name: 'Daredevil Noir', abbr: 'NOIR', vol: 1,
    wikiTitle: 'Daredevil Noir Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 4, startDate: '2009-06', endDate: '2009-09', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-season-one',
    name: 'Daredevil: Season One', abbr: 'S1', vol: 1,
    wikiTitle: 'Daredevil: Season One Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 1, startDate: '2012-02', endDate: '2012-02', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-end-of-days',
    name: 'Daredevil: End of Days', abbr: 'EOD', vol: 1,
    wikiTitle: 'Daredevil: End of Days Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    note: 'A possible last chapter, set in a future of its own.',
    segments: [{ from: 1, to: 8, startDate: '2012-12', endDate: '2013-08', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-cold-day-in-hell',
    name: 'Daredevil: Cold Day in Hell', abbr: 'CDH', vol: 1,
    wikiTitle: 'Daredevil: Cold Day in Hell Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 3, startDate: '2025-06', endDate: '2025-09', startExact: true, endExact: true }],
  },
  {
    key: 'daredevil-born-again-2026',
    name: 'Daredevil: Born Again (2026)', abbr: 'BA 26', vol: 1,
    wikiTitle: 'Daredevil: Born Again Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    note: 'Set in the television series’ continuity, not the comics’.',
    segments: [{ from: 1, to: 1, startDate: '2026-05', endDate: '2026-05', startExact: true, endExact: true }],
  },
]

export const SERIES_BY_KEY = Object.fromEntries(SERIES.map((s) => [s.key, s]))
