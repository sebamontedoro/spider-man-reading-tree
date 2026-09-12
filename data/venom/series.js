/**
 * Venom — the series the symbiote headlines, and Carnage's, expanded into
 * issues by the generator.
 *
 * Same model as data/spider-man/series.js, which documents it. The anchors
 * below were read off Marvel Database on 2026-09-12; `npm run verify:wiki` then
 * replaces every estimate with the issue's own date.
 *
 * KEYS ARE GLOBAL. The Spider-Man tree already carries three of these events
 * as guest appearances and fixed their keys: `venom-lethal-protector` is the
 * 1993 miniseries, `absolute-carnage` and `king-in-black` the 2019 and 2020
 * events. The 2022 Lethal Protector is `-v2`; the 2023 sequel, printed as
 * "II", keeps its numeral as a word.
 *
 * WHO WEARS IT. The tree follows the symbiote, not the man: the 2003 series is
 * a clone, vol. 2 is Flash Thompson's, vol. 5 is Dylan Brock's. Each era has
 * its own colour so the change of host shows on the timeline.
 *
 * EVENTS. The main series of an event is in, and so is a tie-in when a
 * symbiote headlines it. Extreme Carnage is told in its one-shots — Alpha, six
 * tie-ins, Omega — so all eight are the event. Tie-ins headlined by other
 * heroes (Absolute Carnage's Avengers or Miles Morales, Venom War's Deadpool
 * or Wolverine) are for data/venom/appearances.js, one by one.
 *
 * Out of continuity, and therefore `optional`, is whatever the wiki sets in
 * another reality, checked on each first issue's featured characters: Edge of
 * Venomverse (both), War Stories, Death of the Venomverse, The End (Earth-23203),
 * 2099, and the Sony film prelude. Venomverse and Venomverse Reborn feature
 * the Earth-616 Eddie and stay in.
 *
 * Deliberately left out:
 *   Venom: Deathtrap: The Vault (1993)  a reprint of the 1991 Avengers graphic
 *                              novel under a new title.
 *   Venomnibus, Maximum Carnage (1994), Venom: Flashpoint,
 *   Venom/Deadpool: What If?   collected editions the wiki files as series.
 *   Carnage (Eternity, 1987)   another publisher's character.
 *   Symbiote Spider-Man (2019-2024)   Peter Parker headlines them: they are in
 *                              the Spider-Man tree.
 *   Venom vol. 7 (2026)        solicited, not yet on sale.
 */


export const SERIES = [
  /* ========================================================== 1993 → 1998
     No ongoing series in the nineties: Venom was a run of miniseries, one after
     another, each its own title. Read in order they are the first volume. */
  {
    key: 'venom-lethal-protector',
    name: 'Venom: Lethal Protector', abbr: 'LP', vol: 1,
    wikiTitle: 'Venom: Lethal Protector Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    note: 'His own book at last: San Francisco, and a truce with Spider-Man.',
    segments: [{ from: 1, to: 6, startDate: '1993-02', endDate: '1993-07', startExact: true, endExact: true }],
  },
  {
    key: 'venom-funeral-pyre',
    name: 'Venom: Funeral Pyre', abbr: 'FP', vol: 1,
    wikiTitle: 'Venom: Funeral Pyre Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1993-08', endDate: '1993-10', startExact: true, endExact: true }],
  },
  {
    key: 'venom-the-madness',
    name: 'Venom: The Madness', abbr: 'MAD', vol: 1,
    wikiTitle: 'Venom: The Madness Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1993-11', endDate: '1994-01', startExact: true, endExact: true }],
  },
  {
    key: 'venom-enemy-within',
    name: 'Venom: The Enemy Within', abbr: 'EW', vol: 1,
    wikiTitle: 'Venom: Enemy Within Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1994-02', endDate: '1994-04', startExact: true, endExact: true }],
  },
  {
    key: 'venom-the-mace',
    name: 'Venom: The Mace', abbr: 'MACE', vol: 1,
    wikiTitle: 'Venom: The Mace Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1994-05', endDate: '1994-07', startExact: true, endExact: true }],
  },
  {
    key: 'venom-nights-of-vengeance',
    name: 'Venom: Nights of Vengeance', abbr: 'NOV', vol: 1,
    wikiTitle: 'Venom: Nights of Vengeance Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 4, startDate: '1994-08', endDate: '1994-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-separation-anxiety',
    name: 'Venom: Separation Anxiety', abbr: 'SA', vol: 1,
    wikiTitle: 'Venom: Separation Anxiety Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    note: 'The Life Foundation’s five symbiotes come for Eddie.',
    segments: [{ from: 1, to: 4, startDate: '1994-12', endDate: '1995-03', startExact: true, endExact: true }],
  },
  {
    key: 'venom-carnage-unleashed',
    name: 'Venom: Carnage Unleashed', abbr: 'CU', vol: 1,
    wikiTitle: 'Venom: Carnage Unleashed Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 4, startDate: '1995-04', endDate: '1995-07', startExact: true, endExact: true }],
  },
  {
    key: 'venom-super-special',
    name: 'Venom Super Special', abbr: 'SS', vol: 1,
    wikiTitle: 'Venom Super Special Vol 1', accent: 'venom',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '1995-08', endDate: '1995-08', startExact: true, endExact: true }],
  },
  {
    key: 'venom-sinner-takes-all',
    name: 'Venom: Sinner Takes All', abbr: 'STA', vol: 1,
    wikiTitle: 'Venom: Sinner Takes All Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 5, startDate: '1995-08', endDate: '1995-12', startExact: true, endExact: true }],
  },
  {
    key: 'venom-along-came-a-spider',
    name: 'Venom: Along Came a Spider', abbr: 'ACS', vol: 1,
    wikiTitle: 'Venom: Along Came a Spider Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 4, startDate: '1996-01', endDate: '1996-04', startExact: true, endExact: true }],
  },
  {
    key: 'venom-the-hunted',
    name: 'Venom: The Hunted', abbr: 'HUN', vol: 1,
    wikiTitle: 'Venom: The Hunted Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1996-05', endDate: '1996-07', startExact: true, endExact: true }],
  },
  {
    key: 'venom-the-hunger',
    name: 'Venom: The Hunger', abbr: 'HGR', vol: 1,
    wikiTitle: 'Venom: The Hunger Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 4, startDate: '1996-08', endDate: '1996-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-tooth-and-claw',
    name: 'Venom: Tooth and Claw', abbr: 'T&C', vol: 1,
    wikiTitle: 'Venom: Tooth and Claw Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1996-12', endDate: '1997-02', startExact: true, endExact: true }],
  },
  {
    key: 'venom-on-trial',
    name: 'Venom: On Trial', abbr: 'TRI', vol: 1,
    wikiTitle: 'Venom: On Trial Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1997-03', endDate: '1997-05', startExact: true, endExact: true }],
  },
  {
    key: 'venom-license-to-kill',
    name: 'Venom: License to Kill', abbr: 'LTK', vol: 1,
    wikiTitle: 'Venom: License to Kill Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 3, startDate: '1997-06', endDate: '1997-08', startExact: true, endExact: true }],
  },
  {
    key: 'venom-seed-of-darkness',
    name: 'Venom: Seed of Darkness', abbr: 'SOD', vol: 1,
    wikiTitle: 'Venom: Seed of Darkness Vol 1', accent: 'venom',
    role: 'lead', relevance: 'notable',
    note: 'The Flashback month’s #-1: a tale from the vault, introduced by Stan Lee.',
    segments: [],
    extras: [
      { number: -1, coverDate: '1997-07', exact: true },
    ],
  },
  {
    key: 'venom-sign-of-the-boss',
    name: 'Venom: Sign of the Boss', abbr: 'SOB', vol: 1,
    wikiTitle: 'Venom: Sign of the Boss Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 2, startDate: '1997-09', endDate: '1997-10', startExact: true, endExact: true }],
  },
  {
    key: 'venom-the-finale',
    name: 'Venom: The Finale', abbr: 'FIN', vol: 1,
    wikiTitle: 'Venom: The Finale Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    note: 'The last of the nineties miniseries.',
    segments: [{ from: 1, to: 3, startDate: '1997-11', endDate: '1998-01', startExact: true, endExact: true }],
  },
  /* ----------------------------------------------------------- 2003 → 2009 */
  {
    key: 'venom',
    name: 'Venom', abbr: 'VEN', vol: 1,
    wikiTitle: 'Venom Vol 1', accent: 'venom',
    role: 'lead', relevance: 'core',
    note: 'The first ongoing Venom, and not Eddie’s: a cloned symbiote loose in the Arctic.',
    segments: [{ from: 1, to: 18, startDate: '2003-06', endDate: '2004-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-vs-carnage',
    name: 'Venom vs. Carnage', abbr: 'VvC', vol: 1,
    wikiTitle: 'Venom Vs. Carnage Vol 1', accent: 'venom-mini',
    role: 'lead', relevance: 'notable',
    note: 'Carnage’s own spawn, and the birth of Toxin.',
    segments: [{ from: 1, to: 4, startDate: '2004-09', endDate: '2004-12', startExact: true, endExact: true }],
  },
  {
    key: 'venom-dark-origin',
    name: 'Venom: Dark Origin', abbr: 'DO', vol: 1,
    wikiTitle: 'Venom: Dark Origin Vol 1', accent: 'venom-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '2008-10', endDate: '2009-02', startExact: true, endExact: true }],
  },
  /* ========================================================== 2011 → 2016
     Flash Thompson in the suit — a soldier on a leash, then an Avenger, then a
     Guardian of the Galaxy. */
  {
    key: 'venom-v2',
    name: 'Venom (vol. 2)', abbr: 'VEN v2', vol: 2,
    wikiTitle: 'Venom Vol 2', accent: 'venom-flash',
    role: 'lead', relevance: 'core',
    note: 'Flash Thompson, legless veteran, wears the symbiote for the government.',
    segments: [{ from: 1, to: 42, startDate: '2011-05', endDate: '2013-12', startExact: true, endExact: true }],
    extras: [
      { number: 13.1, coverDate: '2012-04', relevance: 'notable' },
      { number: 13.2, coverDate: '2012-04', relevance: 'notable' },
      { number: 13.3, coverDate: '2012-04', relevance: 'notable' },
      { number: 13.4, coverDate: '2012-04', relevance: 'notable' },
      { number: 27.1, coverDate: '2013-01', relevance: 'notable' },
    ],
  },
  {
    key: 'venom-space-knight',
    name: 'Venom: Space Knight', abbr: 'VSK', vol: 1,
    wikiTitle: 'Venom: Space Knight Vol 1', accent: 'venom-flash',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 13, startDate: '2016-01', endDate: '2016-12', startExact: true, endExact: true }],
  },
  /* ========================================================== 2017 → 2021
     Eddie takes the suit back. Legacy numbering from #150, then Donny Cates
     rewrites where the symbiotes came from. */
  {
    key: 'venom-v3',
    name: 'Venom (vol. 3)', abbr: 'VEN v3', vol: 3,
    wikiTitle: 'Venom Vol 3', accent: 'venom-cates',
    role: 'lead', relevance: 'core',
    note: 'Lee Price, then Eddie again. Legacy numbering from #150.',
    segments: [
      { from: 1, to: 6, startDate: '2017-01', endDate: '2017-06', startExact: true, endExact: true },
      { from: 150, to: 165, startDate: '2017-07', endDate: '2018-06', startExact: true, endExact: true },
    ],
  },
  {
    key: 'edge-of-venomverse',
    name: 'Edge of Venomverse', abbr: 'EOV', vol: 1,
    wikiTitle: 'Edge of Venomverse Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 5, startDate: '2017-08', endDate: '2017-10', startExact: true, endExact: true }],
  },
  {
    key: 'venomverse',
    name: 'Venomverse', abbr: 'VV', vol: 1,
    wikiTitle: 'Venomverse Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    note: 'Venoms from across the multiverse, drafted for a war against the Poisons.',
    segments: [{ from: 1, to: 5, startDate: '2017-11', endDate: '2017-12', startExact: true, endExact: true }],
  },
  {
    key: 'venomverse-war-stories',
    name: 'Venomverse: War Stories', abbr: 'VVWS', vol: 1,
    wikiTitle: 'Venomverse: War Stories Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 1, startDate: '2017-11', endDate: '2017-11', startExact: true, endExact: true }],
  },
  {
    key: 'amazing-spider-man-venom-inc-alpha',
    name: 'Amazing Spider-Man: Venom Inc. Alpha', abbr: 'VI α', vol: 1,
    wikiTitle: 'Amazing Spider-Man: Venom Inc. Alpha Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2018-02', endDate: '2018-02', startExact: true, endExact: true }],
  },
  {
    key: 'amazing-spider-man-venom-inc-omega',
    name: 'Amazing Spider-Man: Venom Inc. Omega', abbr: 'VI Ω', vol: 1,
    wikiTitle: 'Amazing Spider-Man: Venom Inc. Omega Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2018-03', endDate: '2018-03', startExact: true, endExact: true }],
  },
  {
    key: 'venomized',
    name: 'Venomized', abbr: 'VZD', vol: 1,
    wikiTitle: 'Venomized Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '2018-06', endDate: '2018-07', startExact: true, endExact: true }],
  },
  {
    key: 'venom-v4',
    name: 'Venom (vol. 4)', abbr: 'VEN v4', vol: 4,
    wikiTitle: 'Venom Vol 4', accent: 'venom-cates',
    role: 'lead', relevance: 'core',
    note: 'Donny Cates and Ryan Stegman: Knull, the god who made the symbiotes.',
    segments: [{ from: 1, to: 35, startDate: '2018-07', endDate: '2021-07', startExact: true, endExact: true }],
  },
  {
    key: 'venom-annual',
    name: 'Venom Annual (2018)', abbr: 'VEN ANN 18', vol: 1,
    wikiTitle: 'Venom Annual Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2018-12', endDate: '2018-12', startExact: true, endExact: true }],
  },
  {
    key: 'venom-first-host',
    name: 'Venom: First Host', abbr: 'FH', vol: 1,
    wikiTitle: 'Venom: First Host Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '2018-10', endDate: '2018-11', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-venam',
    name: "Web of Venom: Ve'Nam", abbr: 'WOV', vol: 1,
    wikiTitle: "Web of Venom: Ve'Nam Vol 1", accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2018-10', endDate: '2018-10', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-carnage-born',
    name: 'Web of Venom: Carnage Born', abbr: 'WOV', vol: 1,
    wikiTitle: 'Web of Venom: Carnage Born Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2019-01', endDate: '2019-01', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-unleashed',
    name: 'Web of Venom: Unleashed', abbr: 'WOV', vol: 1,
    wikiTitle: 'Web of Venom: Unleashed Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2019-03', endDate: '2019-03', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-cult-of-carnage',
    name: 'Web of Venom: Cult of Carnage', abbr: 'WOV', vol: 1,
    wikiTitle: 'Web of Venom: Cult of Carnage Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2019-06', endDate: '2019-06', startExact: true, endExact: true }],
  },
  {
    key: 'venom-annual-v2',
    name: 'Venom Annual (2019)', abbr: 'VEN ANN 19', vol: 2,
    wikiTitle: 'Venom Annual Vol 2', accent: 'venom-cates',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2019-09', endDate: '2019-09', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-funeral-pyre',
    name: 'Web of Venom: Funeral Pyre', abbr: 'WOV', vol: 1,
    wikiTitle: 'Web of Venom: Funeral Pyre Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2019-09', endDate: '2019-09', startExact: true, endExact: true }],
  },
  {
    key: 'absolute-carnage',
    name: 'Absolute Carnage', abbr: 'AC', vol: 1,
    wikiTitle: 'Absolute Carnage Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    note: 'Carnage hunts everyone who ever wore a symbiote, for the codices they left behind.',
    segments: [{ from: 1, to: 5, startDate: '2019-10', endDate: '2020-01', startExact: true, endExact: true }],
  },
  {
    key: 'absolute-carnage-lethal-protectors',
    name: 'Absolute Carnage: Lethal Protectors', abbr: 'AC LP', vol: 1,
    wikiTitle: 'Absolute Carnage: Lethal Protectors Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2019-10', endDate: '2019-12', startExact: true, endExact: true }],
  },
  {
    key: 'absolute-carnage-separation-anxiety',
    name: 'Absolute Carnage: Separation Anxiety', abbr: 'AC SA', vol: 1,
    wikiTitle: 'Absolute Carnage: Separation Anxiety Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2019-10', endDate: '2019-10', startExact: true, endExact: true }],
  },
  {
    key: 'absolute-carnage-scream',
    name: 'Absolute Carnage: Scream', abbr: 'AC SCR', vol: 1,
    wikiTitle: 'Absolute Carnage: Scream Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2019-10', endDate: '2019-12', startExact: true, endExact: true }],
  },
  {
    key: 'venom-the-end',
    name: 'Venom: The End', abbr: 'END', vol: 1,
    wikiTitle: 'Venom: The End Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 1, startDate: '2020-03', endDate: '2020-03', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-the-good-son',
    name: 'Web of Venom: The Good Son', abbr: 'WOV', vol: 1,
    wikiTitle: 'Web of Venom: The Good Son Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2020-03', endDate: '2020-03', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-wraith',
    name: 'Web of Venom: Wraith', abbr: 'WOV', vol: 1,
    wikiTitle: 'Web of Venom: Wraith Vol 1', accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2020-11', endDate: '2020-11', startExact: true, endExact: true }],
  },
  {
    key: 'web-of-venom-empyres-end',
    name: "Web of Venom: Empyre's End", abbr: 'WOV', vol: 1,
    wikiTitle: "Web of Venom: Empyre's End Vol 1", accent: 'venom-cates',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2021-01', endDate: '2021-01', startExact: true, endExact: true }],
  },
  {
    key: 'king-in-black',
    name: 'King in Black', abbr: 'KIB', vol: 1,
    wikiTitle: 'King in Black Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    note: 'Knull arrives, and the Earth goes dark.',
    segments: [{ from: 1, to: 5, startDate: '2021-02', endDate: '2021-05', startExact: true, endExact: true }],
  },
  {
    key: 'king-in-black-planet-of-the-symbiotes',
    name: 'King in Black: Planet of the Symbiotes', abbr: 'KIB POS', vol: 1,
    wikiTitle: 'King in Black: Planet of the Symbiotes Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2021-03', endDate: '2021-05', startExact: true, endExact: true }],
  },
  {
    key: 'king-in-black-gwenom-vs-carnage',
    name: 'King in Black: Gwenom vs. Carnage', abbr: 'KIB GvC', vol: 1,
    wikiTitle: 'King in Black: Gwenom vs. Carnage Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2021-03', endDate: '2021-05', startExact: true, endExact: true }],
  },
  {
    key: 'king-in-black-scream',
    name: 'King in Black: Scream', abbr: 'KIB SCR', vol: 1,
    wikiTitle: 'King in Black: Scream Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2021-05', endDate: '2021-05', startExact: true, endExact: true }],
  },
  /* ========================================================== 2021 → 2026
     Eddie becomes the new King in Black and his son Dylan takes the suit; Al
     Ewing and Ram V split the book between them. */
  {
    key: 'extreme-carnage-alpha',
    name: 'Extreme Carnage Alpha', abbr: 'EC α', vol: 1,
    wikiTitle: 'Extreme Carnage Alpha Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    note: 'Told across eight one-shots: Alpha, six tie-ins, Omega.',
    segments: [{ from: 1, to: 1, startDate: '2021-09', endDate: '2021-09', startExact: true, endExact: true }],
  },
  {
    key: 'extreme-carnage-scream',
    name: 'Extreme Carnage: Scream', abbr: 'EC SCR', vol: 1,
    wikiTitle: 'Extreme Carnage: Scream Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2021-09', endDate: '2021-09', startExact: true, endExact: true }],
  },
  {
    key: 'extreme-carnage-phage',
    name: 'Extreme Carnage: Phage', abbr: 'EC PHG', vol: 1,
    wikiTitle: 'Extreme Carnage: Phage Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2021-09', endDate: '2021-09', startExact: true, endExact: true }],
  },
  {
    key: 'extreme-carnage-riot',
    name: 'Extreme Carnage: Riot', abbr: 'EC RIOT', vol: 1,
    wikiTitle: 'Extreme Carnage: Riot Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2021-10', endDate: '2021-10', startExact: true, endExact: true }],
  },
  {
    key: 'extreme-carnage-lasher',
    name: 'Extreme Carnage: Lasher', abbr: 'EC LSH', vol: 1,
    wikiTitle: 'Extreme Carnage: Lasher Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2021-10', endDate: '2021-10', startExact: true, endExact: true }],
  },
  {
    key: 'extreme-carnage-agony',
    name: 'Extreme Carnage: Agony', abbr: 'EC AGO', vol: 1,
    wikiTitle: 'Extreme Carnage: Agony Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2021-11', endDate: '2021-11', startExact: true, endExact: true }],
  },
  {
    key: 'extreme-carnage-toxin',
    name: 'Extreme Carnage: Toxin', abbr: 'EC TOX', vol: 1,
    wikiTitle: 'Extreme Carnage: Toxin Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2021-11', endDate: '2021-11', startExact: true, endExact: true }],
  },
  {
    key: 'extreme-carnage-omega',
    name: 'Extreme Carnage Omega', abbr: 'EC Ω', vol: 1,
    wikiTitle: 'Extreme Carnage Omega Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 1, startDate: '2021-11', endDate: '2021-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-v5',
    name: 'Venom (vol. 5)', abbr: 'VEN v5', vol: 5,
    wikiTitle: 'Venom Vol 5', accent: 'venom-2022',
    role: 'lead', relevance: 'core',
    note: 'Al Ewing and Ram V: Dylan Brock in the suit, Eddie lost in time as its god.',
    segments: [{ from: 1, to: 39, startDate: '2022-01', endDate: '2025-01', startExact: true, endExact: true }],
  },
  {
    key: 'venom-lethal-protector-v2',
    name: 'Venom: Lethal Protector (2022)', abbr: 'LP 22', vol: 2,
    wikiTitle: 'Venom: Lethal Protector Vol 2', accent: 'venom-mini',
    role: 'lead', relevance: 'notable',
    note: 'David Michelinie, who co-created him, back on the character.',
    segments: [{ from: 1, to: 5, startDate: '2022-05', endDate: '2022-10', startExact: true, endExact: true }],
  },
  {
    key: 'venom-lethal-protector-ii',
    name: 'Venom: Lethal Protector II', abbr: 'LP II', vol: 1,
    wikiTitle: 'Venom: Lethal Protector II Vol 1', accent: 'venom-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '2023-05', endDate: '2023-09', startExact: true, endExact: true }],
  },
  {
    key: 'death-of-the-venomverse',
    name: 'Death of the Venomverse', abbr: 'DOTV', vol: 1,
    wikiTitle: 'Death of the Venomverse Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 5, startDate: '2023-10', endDate: '2023-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-annual-v3',
    name: 'Venom Annual (2023)', abbr: 'VEN ANN 23', vol: 3,
    wikiTitle: 'Venom Annual Vol 3', accent: 'venom-2022',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2023-11', endDate: '2023-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-separation-anxiety-v2',
    name: 'Venom: Separation Anxiety (2024)', abbr: 'SA 24', vol: 2,
    wikiTitle: 'Venom: Separation Anxiety Vol 2', accent: 'venom-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '2024-07', endDate: '2024-11', startExact: true, endExact: true }],
  },
  {
    key: 'venomverse-reborn',
    name: 'Venomverse Reborn', abbr: 'VVR', vol: 1,
    wikiTitle: 'Venomverse Reborn Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2024-08', endDate: '2024-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-war',
    name: 'Venom War', abbr: 'VW', vol: 1,
    wikiTitle: 'Venom War Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'core',
    note: 'Eddie and Dylan, father against son, for the suit.',
    segments: [{ from: 1, to: 5, startDate: '2024-10', endDate: '2025-01', startExact: true, endExact: true }],
  },
  {
    key: 'venom-war-venomous',
    name: 'Venom War: Venomous', abbr: 'VW VEN', vol: 1,
    wikiTitle: 'Venom War: Venomous Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2024-10', endDate: '2024-12', startExact: true, endExact: true }],
  },
  {
    key: 'venom-war-carnage',
    name: 'Venom War: Carnage', abbr: 'VW CAR', vol: 1,
    wikiTitle: 'Venom War: Carnage Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2024-10', endDate: '2024-12', startExact: true, endExact: true }],
  },
  {
    key: 'venom-war-zombiotes',
    name: 'Venom War: Zombiotes', abbr: 'VW ZOM', vol: 1,
    wikiTitle: 'Venom War: Zombiotes Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2024-10', endDate: '2024-12', startExact: true, endExact: true }],
  },
  {
    key: 'venom-war-lethal-protectors',
    name: 'Venom War: Lethal Protectors', abbr: 'VW LP', vol: 1,
    wikiTitle: 'Venom War: Lethal Protectors Vol 1', accent: 'venom-event',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 3, startDate: '2024-11', endDate: '2025-01', startExact: true, endExact: true }],
  },
  {
    key: 'all-new-venom',
    name: 'All-New Venom', abbr: 'ANV', vol: 1,
    wikiTitle: 'All-New Venom Vol 1', accent: 'venom-2022',
    role: 'lead', relevance: 'core',
    note: 'After the war: a new host, and the mystery of who it is.',
    segments: [{ from: 1, to: 10, startDate: '2025-02', endDate: '2025-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-original-sin',
    name: 'Venom: Original Sin', abbr: 'OS', vol: 1,
    wikiTitle: 'Venom: Original Sin Vol 1', accent: 'venom-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2025-07', endDate: '2025-07', startExact: true, endExact: true }],
  },
  {
    key: 'venom-black-white-and-blood',
    name: 'Venom: Black, White & Blood', abbr: 'BWB', vol: 1,
    wikiTitle: 'Venom: Black, White & Blood Vol 1', accent: 'venom-mini',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2025-10', endDate: '2026-01', startExact: true, endExact: true }],
  },
  {
    key: 'edge-of-venomverse-v2',
    name: 'Edge of Venomverse (2025)', abbr: 'EOV 25', vol: 2,
    wikiTitle: 'Edge of Venomverse Vol 2', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 1, startDate: '2025-11', endDate: '2025-11', startExact: true, endExact: true }],
  },
  {
    key: 'venom-v6',
    name: 'Venom (vol. 6)', abbr: 'VEN v6', vol: 6,
    wikiTitle: 'Venom Vol 6', accent: 'venom-2022',
    role: 'lead', relevance: 'core',
    note: 'Legacy numbering from #250.',
    // Ongoing: lists what is on sale. Extend `to` as issues come out.
    segments: [{ from: 250, to: 261, startDate: '2025-12', endDate: '2026-11', startExact: true, endExact: true }],
  },
  /* ============================================================== Carnage
     Cletus Kasady and the red symbiote, Venom’s child: his own branch, in his
     own colour. */
  {
    key: 'carnage-mind-bomb',
    name: 'Carnage: Mind Bomb', abbr: 'MB', vol: 1,
    wikiTitle: 'Carnage: Mind Bomb Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '1996-02', endDate: '1996-02', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-its-a-wonderful-life',
    name: "Carnage: It's a Wonderful Life", abbr: 'IAWL', vol: 1,
    wikiTitle: "Carnage: It's a Wonderful Life Vol 1", accent: 'carnage',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '1996-10', endDate: '1996-10', startExact: true, endExact: true }],
  },
  {
    key: 'carnage',
    name: 'Carnage', abbr: 'CAR', vol: 1,
    wikiTitle: 'Carnage Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'core',
    note: 'Cletus Kasady returns.',
    segments: [{ from: 1, to: 5, startDate: '2010-12', endDate: '2011-08', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-usa',
    name: 'Carnage, U.S.A.', abbr: 'USA', vol: 1,
    wikiTitle: 'Carnage, U.S.A. Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 5, startDate: '2012-02', endDate: '2012-06', startExact: true, endExact: true }],
  },
  {
    key: 'superior-carnage',
    name: 'Superior Carnage', abbr: 'SUP', vol: 1,
    wikiTitle: 'Superior Carnage Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 5, startDate: '2013-09', endDate: '2014-01', startExact: true, endExact: true }],
  },
  {
    key: 'superior-carnage-annual',
    name: 'Superior Carnage Annual', abbr: 'SUP ANN', vol: 1,
    wikiTitle: 'Superior Carnage Annual Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'notable', isAnnual: true,
    segments: [{ from: 1, to: 1, startDate: '2014-04', endDate: '2014-04', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-v2',
    name: 'Carnage (vol. 2)', abbr: 'CAR v2', vol: 2,
    wikiTitle: 'Carnage Vol 2', accent: 'carnage',
    role: 'lead', relevance: 'core',
    note: 'Gerry Conway: the Darkhold, and a hunt that turns into a horror book.',
    segments: [{ from: 1, to: 16, startDate: '2016-01', endDate: '2017-03', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-black-white-and-blood',
    name: 'Carnage: Black, White & Blood', abbr: 'CBWB', vol: 1,
    wikiTitle: 'Carnage: Black, White & Blood Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 4, startDate: '2021-05', endDate: '2021-08', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-forever',
    name: 'Carnage Forever', abbr: 'CF', vol: 1,
    wikiTitle: 'Carnage Forever Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2022-04', endDate: '2022-04', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-v3',
    name: 'Carnage (vol. 3)', abbr: 'CAR v3', vol: 3,
    wikiTitle: 'Carnage Vol 3', accent: 'carnage',
    role: 'lead', relevance: 'core',
    note: 'The symbiote without Kasady, looking for a host worthy of it.',
    segments: [{ from: 1, to: 14, startDate: '2022-05', endDate: '2023-08', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-reigns-alpha',
    name: 'Carnage Reigns Alpha', abbr: 'CR α', vol: 1,
    wikiTitle: 'Carnage Reigns Alpha Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2023-07', endDate: '2023-07', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-reigns-omega',
    name: 'Carnage Reigns Omega', abbr: 'CR Ω', vol: 1,
    wikiTitle: 'Carnage Reigns Omega Vol 1', accent: 'carnage',
    role: 'lead', relevance: 'notable',
    segments: [{ from: 1, to: 1, startDate: '2023-08', endDate: '2023-08', startExact: true, endExact: true }],
  },
  {
    key: 'carnage-v4',
    name: 'Carnage (vol. 4)', abbr: 'CAR v4', vol: 4,
    wikiTitle: 'Carnage Vol 4', accent: 'carnage',
    role: 'lead', relevance: 'core',
    segments: [{ from: 1, to: 8, startDate: '2024-01', endDate: '2024-08', startExact: true, endExact: true }],
  },
  /* ============================================================ Elsewhere
     Other realities and the screen: hidden with the rest of the optional material. */
  {
    key: 'venom-2099',
    name: 'Venom 2099', abbr: '2099', vol: 1,
    wikiTitle: 'Venom 2099 Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    segments: [{ from: 1, to: 1, startDate: '2020-02', endDate: '2020-02', startExact: true, endExact: true }],
  },
  {
    key: 'venom-sony',
    name: 'Venom: The Movie Prelude', abbr: 'SONY', vol: 1,
    wikiTitle: 'Venom (Sony) Vol 1', accent: 'elsewhere',
    role: 'lead', relevance: 'optional', outOfContinuity: true,
    note: 'A digital prelude to the 2018 film.',
    segments: [{ from: 1, to: 1, startDate: '2018-11', endDate: '2018-11', startExact: true, endExact: true }],
  },
]

export const SERIES_BY_KEY = Object.fromEntries(SERIES.map((s) => [s.key, s]))
