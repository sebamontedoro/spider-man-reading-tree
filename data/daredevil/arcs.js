/**
 * Story arcs and events in the Daredevil tree. Shape and rules as in
 * data/spider-man/arcs.js: `issues` in reading order, blurbs our own and
 * spoiler-light, `crossover: true` where the arc runs through more than one
 * title.
 *
 * Where the names and ranges come from, 2026-09-11. Marvel Database tags 46
 * of this tree's arcs in each issue's own StoryArc field, and those are used
 * as tagged. The rest come from the issues' story titles, which carry the
 * arc's name and part number from the Marvel Knights volume on ("Guardian
 * Devil Part Five"). Before that the book titled each issue on its own, so
 * the Miller arcs are bounded by who is in them instead: the Elektra arc is
 * the issues of #168-182 she appears in, read off the pages.
 *
 * Waid's run is barely titled on the wiki and has no arcs here yet; its
 * volumes and the Road Warrior serial are still one pick each in the series
 * picker.
 */

export const ARCS = [
  /* ============================================================== 1960s-70s */
  {
    key: 'origin',
    name: 'The Origin',
    year: 1964,
    issues: ['daredevil-1'],
    blurb: 'The accident, the father, the suit — the whole premise in one issue.',
  },
  {
    key: 'bullseye-arrives',
    name: 'Bullseye',
    year: 1976,
    issues: ['daredevil-131', 'daredevil-132', 'daredevil-133'],
    blurb: 'The first appearances of the enemy who matters most.',
  },

  /* ============================================================== Miller */
  {
    key: 'kingpin-must-die',
    name: 'The Kingpin Must Die',
    year: 1981,
    issues: ['daredevil-170', 'daredevil-171', 'daredevil-172'],
    blurb: 'Fisk comes back to New York, and becomes this book’s villain for good.',
  },
  {
    key: 'elektra',
    name: 'Elektra',
    year: 1981,
    issues: [
      'daredevil-168', 'daredevil-169', 'daredevil-174', 'daredevil-175', 'daredevil-176',
      'daredevil-177', 'daredevil-178', 'daredevil-179', 'daredevil-180', 'daredevil-181',
      'daredevil-182',
    ],
    blurb: 'A love from his past returns as an assassin, and the Hand arrives with her.',
  },
  {
    key: 'resurrection',
    name: 'Resurrection',
    year: 1982,
    issues: ['daredevil-187', 'daredevil-188', 'daredevil-189', 'daredevil-190'],
    blurb: 'The Chaste against the Hand, over a body neither side will leave buried.',
  },
  {
    key: 'born-again',
    name: 'Born Again',
    year: 1986,
    issues: [
      'daredevil-227', 'daredevil-228', 'daredevil-229', 'daredevil-230', 'daredevil-231',
      'daredevil-232', 'daredevil-233',
    ],
    blurb: 'The Kingpin learns who he is and takes everything. Widely held to be the best of the book.',
  },

  /* ============================================================== late 1980s */
  {
    key: 'inferno',
    name: 'Inferno',
    year: 1989,
    crossover: true,
    issues: ['daredevil-262', 'daredevil-263', 'daredevil-265'],
    blurb: 'The line-wide demonic invasion, seen from Hell’s Kitchen.',
  },
  {
    key: 'acts-of-vengeance',
    name: 'Acts of Vengeance',
    year: 1989,
    crossover: true,
    issues: ['daredevil-275', 'daredevil-276'],
    blurb: 'The villains trade enemies across the line; his share arrives here.',
  },

  /* ============================================================== 1990s */
  {
    key: 'last-rites',
    name: 'Last Rites',
    year: 1991,
    issues: ['daredevil-297', 'daredevil-298', 'daredevil-299', 'daredevil-300'],
    blurb: 'Matt works the Kingpin’s circle apart, Typhoid Mary first, until Fisk falls.',
  },
  {
    key: 'dead-mans-hand',
    name: 'Dead Man’s Hand',
    year: 1992,
    crossover: true,
    issues: ['daredevil-307', 'daredevil-308', 'daredevil-309'],
    blurb: 'A struggle over the Kingpin’s vacant throne, run across several street-level books.',
  },
  {
    key: 'fall-from-grace',
    name: 'Fall from Grace',
    year: 1993,
    issues: [
      'daredevil-319', 'daredevil-320', 'daredevil-321', 'daredevil-322', 'daredevil-323',
      'daredevil-324', 'daredevil-325',
    ],
    blurb: 'Elektra in every chapter, and the red suit set aside for a new costume.',
  },
  {
    key: 'tree-of-knowledge',
    name: 'Tree of Knowledge',
    year: 1994,
    issues: [
      'daredevil-326', 'daredevil-327', 'daredevil-328', 'daredevil-329', 'daredevil-330',
      'daredevil-331', 'daredevil-332',
    ],
    blurb: 'Seven parts against a crew of tech-born villains.',
  },
  {
    key: 'fathoms-of-humanity',
    name: 'Fathoms of Humanity',
    year: 1994,
    issues: ['daredevil-333', 'daredevil-334', 'daredevil-335', 'daredevil-336', 'daredevil-337'],
    blurb: 'Five issues across 1994 and 1995.',
  },
  {
    key: 'inferno-1995',
    name: 'Inferno (1995)',
    year: 1995,
    issues: ['daredevil-345', 'daredevil-346', 'daredevil-347'],
    blurb: 'No relation to the 1989 event: a three-part story of the mid-nineties book.',
  },
  {
    key: 'paradiso',
    name: 'Paradiso',
    year: 1996,
    issues: ['daredevil-349', 'daredevil-350'],
    blurb: 'Two issues, the second the book’s three-hundred-and-fiftieth.',
  },
  {
    key: 'widows-kiss',
    name: 'Widow’s Kiss',
    year: 1997,
    issues: ['daredevil-368', 'daredevil-369', 'daredevil-370'],
    blurb: 'The Black Widow back in his orbit, near the end of the first volume.',
  },
  {
    key: 'flying-blind',
    name: 'Flying Blind',
    year: 1998,
    issues: ['daredevil-376', 'daredevil-377', 'daredevil-378', 'daredevil-379'],
    blurb: 'The last arc of the first volume, before the relaunch.',
  },

  /* ============================================================== Marvel Knights */
  {
    key: 'guardian-devil',
    name: 'Guardian Devil',
    year: 1998,
    issues: [
      'daredevil-v2-1', 'daredevil-v2-2', 'daredevil-v2-3', 'daredevil-v2-4',
      'daredevil-v2-5', 'daredevil-v2-6', 'daredevil-v2-7', 'daredevil-v2-8',
    ],
    blurb: 'A baby who may be a messiah, a crisis of faith, and a loss he never recovers from.',
  },
  {
    key: 'parts-of-a-hole',
    name: 'Parts of a Hole',
    year: 1999,
    issues: [
      'daredevil-v2-9', 'daredevil-v2-10', 'daredevil-v2-11', 'daredevil-v2-12',
      'daredevil-v2-13', 'daredevil-v2-14', 'daredevil-v2-15',
    ],
    blurb: 'Echo’s story, told as much in pictures as in words.',
  },
  {
    key: 'wake-up',
    name: 'Wake Up',
    year: 2001,
    issues: ['daredevil-v2-16', 'daredevil-v2-17', 'daredevil-v2-18', 'daredevil-v2-19'],
    blurb: 'Ben Urich, and a boy who will only talk about Daredevil.',
  },
  {
    key: 'playing-to-the-camera',
    name: 'Playing to the Camera',
    year: 2001,
    issues: [
      'daredevil-v2-20', 'daredevil-v2-21', 'daredevil-v2-22', 'daredevil-v2-23',
      'daredevil-v2-24', 'daredevil-v2-25',
    ],
    blurb: 'A man sues Daredevil for damages, and the firm has to take a side.',
  },
  {
    key: 'underboss',
    name: 'Underboss',
    year: 2001,
    issues: [
      'daredevil-v2-26', 'daredevil-v2-27', 'daredevil-v2-28', 'daredevil-v2-29',
      'daredevil-v2-30', 'daredevil-v2-31',
    ],
    blurb: 'A coup against the Kingpin, and a secret sold to the FBI.',
  },
  {
    key: 'out',
    name: 'Out',
    year: 2002,
    issues: [
      'daredevil-v2-32', 'daredevil-v2-33', 'daredevil-v2-34', 'daredevil-v2-35',
      'daredevil-v2-36', 'daredevil-v2-37',
    ],
    blurb: 'His name on the front page, and a life spent denying it.',
  },
  {
    key: 'trial-of-the-century',
    name: 'The Trial of the Century',
    year: 2002,
    issues: ['daredevil-v2-38', 'daredevil-v2-39', 'daredevil-v2-40'],
    blurb: 'Matt in court, defending a vigilante while suspected of being one.',
  },
  {
    key: 'lowlife',
    name: 'Lowlife',
    year: 2003,
    issues: ['daredevil-v2-41', 'daredevil-v2-42', 'daredevil-v2-43', 'daredevil-v2-44', 'daredevil-v2-45'],
    blurb: 'Milla Donovan arrives, and so does the fallout from the Kingpin’s empire.',
  },
  {
    key: 'hardcore',
    name: 'Hardcore',
    year: 2003,
    issues: ['daredevil-v2-46', 'daredevil-v2-47', 'daredevil-v2-48', 'daredevil-v2-49', 'daredevil-v2-50'],
    blurb: 'The Kingpin comes home, and Matt answers him the only way left.',
  },
  {
    key: 'echo-vision-quest',
    name: 'Echo: Vision Quest',
    year: 2003,
    issues: ['daredevil-v2-51', 'daredevil-v2-52', 'daredevil-v2-53', 'daredevil-v2-54', 'daredevil-v2-55'],
    blurb: 'Maya Lopez’s story, told by the artist who created her.',
  },
  {
    key: 'king-of-hells-kitchen',
    name: 'The King of Hell’s Kitchen',
    year: 2004,
    issues: ['daredevil-v2-56', 'daredevil-v2-57', 'daredevil-v2-58', 'daredevil-v2-59', 'daredevil-v2-60'],
    blurb: 'A year into ruling his neighbourhood, and the rest of the underworld wants it.',
  },
  {
    key: 'the-widow',
    name: 'The Widow',
    year: 2004,
    issues: ['daredevil-v2-61', 'daredevil-v2-62', 'daredevil-v2-63', 'daredevil-v2-64'],
    blurb: 'Natasha on the run, hiding in the glare of his very public life.',
  },
  {
    key: 'golden-age',
    name: 'Golden Age',
    year: 2004,
    issues: ['daredevil-v2-66', 'daredevil-v2-67', 'daredevil-v2-68', 'daredevil-v2-69', 'daredevil-v2-70'],
    blurb: 'Hell’s Kitchen’s crime bosses across the decades.',
  },
  {
    key: 'decalogue',
    name: 'Decalogue',
    year: 2005,
    issues: ['daredevil-v2-71', 'daredevil-v2-72', 'daredevil-v2-73', 'daredevil-v2-74', 'daredevil-v2-75'],
    blurb: 'His neighbours, in a church basement, on what his crusade did to them.',
  },
  {
    key: 'murdock-papers',
    name: 'The Murdock Papers',
    year: 2005,
    issues: [
      'daredevil-v2-76', 'daredevil-v2-77', 'daredevil-v2-78', 'daredevil-v2-79',
      'daredevil-v2-80', 'daredevil-v2-81',
    ],
    blurb: 'Proof of who he is, for sale, and everyone bidding.',
  },

  /* ============================================================== Brubaker */
  {
    key: 'cell-block-d',
    name: 'The Devil in Cell-Block D',
    year: 2006,
    issues: [
      'daredevil-v2-82', 'daredevil-v2-83', 'daredevil-v2-84', 'daredevil-v2-85',
      'daredevil-v2-86', 'daredevil-v2-87',
    ],
    blurb: 'Matt behind bars, with men he put there, and someone else in the suit outside.',
  },
  {
    key: 'devil-takes-a-ride',
    name: 'The Devil Takes a Ride',
    year: 2006,
    issues: ['daredevil-v2-89', 'daredevil-v2-90', 'daredevil-v2-91', 'daredevil-v2-92', 'daredevil-v2-93'],
    blurb: 'Out of prison and across Europe, after whoever arranged it.',
  },
  {
    key: 'to-the-devil-his-due',
    name: 'To the Devil, His Due',
    year: 2007,
    issues: ['daredevil-v2-95', 'daredevil-v2-96', 'daredevil-v2-97', 'daredevil-v2-98', 'daredevil-v2-99'],
    blurb: 'The Gladiator stands accused of murder inside Rikers, and Matt defends him.',
  },
  {
    key: 'without-fear',
    name: 'Without Fear',
    year: 2007,
    issues: [
      'daredevil-v2-100', 'daredevil-v2-101', 'daredevil-v2-102', 'daredevil-v2-103',
      'daredevil-v2-104', 'daredevil-v2-105',
    ],
    blurb: 'Mister Fear, and what he has done to Milla.',
  },
  {
    key: 'cruel-and-unusual',
    name: 'Cruel & Unusual',
    year: 2008,
    issues: ['daredevil-v2-107', 'daredevil-v2-108', 'daredevil-v2-109', 'daredevil-v2-110'],
    blurb: 'A villain on death row, and a last-minute appeal.',
  },
  {
    key: 'lady-bullseye',
    name: 'Lady Bullseye',
    year: 2008,
    issues: ['daredevil-v2-111', 'daredevil-v2-112', 'daredevil-v2-113', 'daredevil-v2-114', 'daredevil-v2-115'],
    blurb: 'A new assassin, inspired by the old one, working for the Hand.',
  },
  {
    key: 'return-of-the-king',
    name: 'Return of the King',
    year: 2009,
    issues: ['daredevil-v2-116', 'daredevil-v2-117', 'daredevil-v2-118', 'daredevil-v2-119', 'daredevil-v2-500'],
    blurb: 'Fisk comes back from exile, and the volume returns to its old count.',
  },

  /* ============================================================== Shadowland */
  {
    key: 'devils-hand',
    name: 'The Devil’s Hand',
    year: 2009,
    issues: ['daredevil-v2-501', 'daredevil-v2-502', 'daredevil-v2-503', 'daredevil-v2-504'],
    blurb: 'Matt at the head of the Hand, sure he can steer it.',
  },
  {
    key: 'shadowland',
    name: 'Shadowland',
    year: 2010,
    crossover: true,
    // The order the wiki's event tags give, which interleaves the two titles.
    issues: [
      'daredevil-v2-508', 'shadowland-1', 'daredevil-v2-509', 'shadowland-2', 'daredevil-v2-510',
      'shadowland-3', 'shadowland-4', 'daredevil-v2-511', 'shadowland-5', 'daredevil-v2-512',
      'shadowland-after-the-fall-1',
    ],
    blurb: 'The Hand’s fortress in Hell’s Kitchen, and the heroes who come to tear it down.',
  },

  /* ============================================================== Soule */
  {
    key: 'elektric-connection',
    name: 'Elektric Connection',
    year: 2016,
    issues: ['daredevil-v5-6', 'daredevil-v5-7'],
    blurb: 'Elektra, back in New York.',
  },
  {
    key: 'blind-mans-bluff',
    name: 'Blind Man’s Bluff',
    year: 2016,
    issues: ['daredevil-v5-8', 'daredevil-v5-9'],
    blurb: 'Matt at a poker table on the far side of the world.',
  },
  {
    key: 'dark-art',
    name: 'Dark Art',
    year: 2016,
    issues: ['daredevil-v5-10', 'daredevil-v5-11', 'daredevil-v5-12', 'daredevil-v5-13', 'daredevil-v5-14'],
    blurb: 'Muse, an artist whose medium is murder.',
  },
  {
    key: 'seventh-day',
    name: 'The Seventh Day',
    year: 2017,
    issues: ['daredevil-v5-15', 'daredevil-v5-16'],
    blurb: 'A bounty on his head, and a client nobody saw coming.',
  },
  {
    key: 'purple',
    name: 'Purple',
    year: 2017,
    issues: ['daredevil-v5-17', 'daredevil-v5-18', 'daredevil-v5-19', 'daredevil-v5-20'],
    blurb: 'How he got his secret back, told in a confessional, and the Purple Man’s children.',
  },
  {
    key: 'supreme',
    name: 'Supreme',
    year: 2017,
    issues: ['daredevil-v5-21', 'daredevil-v5-22', 'daredevil-v5-23', 'daredevil-v5-24', 'daredevil-v5-25'],
    blurb: 'A case that goes all the way to the Supreme Court.',
  },
  {
    key: 'land-of-the-blind',
    name: 'Land of the Blind',
    year: 2017,
    issues: ['daredevil-v5-26', 'daredevil-v5-27', 'daredevil-v5-28'],
    blurb: 'The close of the fifth volume’s own numbering.',
  },
  {
    key: 'mayor-fisk',
    name: 'Mayor Fisk',
    year: 2018,
    issues: [
      'daredevil-v5-595', 'daredevil-v5-596', 'daredevil-v5-597', 'daredevil-v5-598',
      'daredevil-v5-599', 'daredevil-v5-600',
    ],
    blurb: 'The Kingpin elected, and a prosecutor who works for his city.',
  },
  {
    key: 'death-of-daredevil',
    name: 'The Death of Daredevil',
    year: 2018,
    issues: ['daredevil-v5-609', 'daredevil-v5-610', 'daredevil-v5-611', 'daredevil-v5-612'],
    blurb: 'Soule’s last arc, under a title that means what it says.',
  },

  /* ============================================================== Zdarsky */
  {
    key: 'know-fear',
    name: 'Know Fear',
    year: 2019,
    issues: ['daredevil-v6-1', 'daredevil-v6-2', 'daredevil-v6-3', 'daredevil-v6-4', 'daredevil-v6-5'],
    blurb: 'A night that goes wrong, and a man who stops trusting himself in the suit.',
  },
  {
    key: 'no-devils-only-god',
    name: 'No Devils, Only God',
    year: 2019,
    issues: ['daredevil-v6-6', 'daredevil-v6-7', 'daredevil-v6-8', 'daredevil-v6-9', 'daredevil-v6-10'],
    blurb: 'The second story of Zdarsky’s run.',
  },
  {
    key: 'through-hell',
    name: 'Through Hell',
    year: 2019,
    issues: [
      'daredevil-v6-11', 'daredevil-v6-12', 'daredevil-v6-13', 'daredevil-v6-14',
      'daredevil-v6-15', 'daredevil-v6-16', 'daredevil-v6-17', 'daredevil-v6-18',
    ],
    blurb: 'The Stromwyn siblings arrive.',
  },
  {
    key: 'inferno-2020',
    name: 'Inferno (2020)',
    year: 2020,
    issues: ['daredevil-v6-19', 'daredevil-v6-20'],
    blurb: 'The story arc, not the 1989 event.',
  },
  {
    key: 'truth-dare',
    name: 'Truth/Dare',
    year: 2020,
    issues: ['daredevil-v6-21', 'daredevil-v6-22', 'daredevil-v6-23', 'daredevil-v6-24'],
    blurb: 'Matt settles his account for what happened in the first arc.',
  },
  {
    key: 'doing-time',
    name: 'Doing Time',
    year: 2021,
    issues: ['daredevil-v6-25', 'daredevil-v6-29', 'daredevil-v6-30'],
    blurb: 'Matt serving his sentence, and Elektra in the horns outside.',
  },
  {
    key: 'black-kitchen',
    name: 'The Black Kitchen',
    year: 2021,
    issues: ['daredevil-v6-26', 'daredevil-v6-27'],
    blurb: 'Hell’s Kitchen during King in Black.',
  },
  {
    key: 'lockdown',
    name: 'Lockdown',
    year: 2021,
    issues: [
      'daredevil-v6-31', 'daredevil-v6-32', 'daredevil-v6-33', 'daredevil-v6-34',
      'daredevil-v6-35', 'daredevil-v6-36',
    ],
    blurb: 'The prison stretch comes to a head.',
  },
  {
    key: 'devils-reign',
    name: 'Devil’s Reign',
    year: 2022,
    crossover: true,
    issues: [
      'devils-reign-1', 'devils-reign-2', 'daredevil-woman-without-fear-1', 'devils-reign-3',
      'devils-reign-4', 'daredevil-woman-without-fear-2', 'daredevil-woman-without-fear-3',
      'devils-reign-5', 'devils-reign-6', 'devils-reign-omega-1',
    ],
    blurb: 'Mayor Fisk against every costumed hero in the city, with the whole line watching.',
  },
  {
    key: 'red-fist-saga',
    name: 'The Red Fist Saga',
    year: 2022,
    issues: [
      'daredevil-v7-1', 'daredevil-v7-2', 'daredevil-v7-3', 'daredevil-v7-4', 'daredevil-v7-5',
      'daredevil-v7-6', 'daredevil-v7-7', 'daredevil-v7-8', 'daredevil-v7-9', 'daredevil-v7-10',
      'daredevil-v7-11', 'daredevil-v7-12', 'daredevil-v7-13', 'daredevil-v7-14',
    ],
    blurb: 'Zdarsky’s last act, after Devil’s Reign, with Elektra beside him.',
  },

  /* ============================================================== 2023 on */
  {
    key: 'introductory-rites',
    name: 'Introductory Rites',
    year: 2023,
    issues: Array.from({ length: 19 }, (_, i) => `daredevil-v8-${i + 1}`),
    blurb: 'The eighth volume’s long opening story, nineteen parts.',
  },
  {
    key: 'rites-of-reconciliation',
    name: 'Rites of Reconciliation',
    year: 2025,
    issues: Array.from({ length: 6 }, (_, i) => `daredevil-v8-${i + 20}`),
    blurb: 'The eighth volume’s closing story.',
  },
  {
    key: 'tomorrows-devil',
    name: 'Tomorrow’s Devil',
    year: 2026,
    issues: ['daredevil-v9-1', 'daredevil-v9-2', 'daredevil-v9-3', 'daredevil-v9-4', 'daredevil-v9-5'],
    blurb: 'The ninth volume’s first story.',
  },
]

export const ARCS_SORTED = [...ARCS].sort((a, b) => a.year - b.year)

export const ARCS_BY_KEY = Object.fromEntries(ARCS.map((a) => [a.key, a]))
