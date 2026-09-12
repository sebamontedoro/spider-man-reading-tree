/**
 * Curated reading paths through the Daredevil tree. Shape as in
 * data/spider-man/paths.js: `match`, `arcs` and `issues`, combinable, and the
 * result sorted by cover date.
 *
 * The runs are named for who wrote them because that is how this book is
 * read: a Daredevil reader asks for "the Bendis run", not for 2001-2006. The
 * ranges are the writers' own stretches of the numbering.
 */

const inSeries = (i, key, from = -Infinity, to = Infinity) =>
  i.series === key && i.number >= from && i.number <= to

export const PATHS = [
  {
    key: 'essentials',
    name: 'The Essentials',
    blurb: 'The shortest route that still makes sense: every issue where the premise changes for good, and the few losses the book is built around.',
    match: (i) => i.keyIssue === true,
  },
  {
    key: 'first-appearances',
    name: 'First Appearances',
    blurb: 'Only the issues that introduce someone who mattered afterwards.',
    match: (i) => Array.isArray(i.firstAppearances) && i.firstAppearances.length > 0,
  },
  {
    key: 'origins',
    name: 'The Origin, Three Times',
    blurb: 'The first telling, the 1993 retelling at length, and the first year in the yellow suit.',
    issues: ['daredevil-1', 'daredevil-7'],
    match: (i) => i.series === 'daredevil-man-without-fear' || i.series === 'daredevil-yellow',
  },
  {
    key: 'miller',
    name: 'Frank Miller’s Daredevil',
    blurb: 'Drawing from #158, writing from #168 to #191, and back for Born Again. The run that remade the character.',
    match: (i) => inSeries(i, 'daredevil', 158, 191) || inSeries(i, 'daredevil', 227, 233),
  },
  {
    key: 'elektra',
    name: 'Elektra',
    blurb: 'Her arrival, her death, her return, and the years she wore the horns herself.',
    arcs: ['elektra', 'resurrection', 'fall-from-grace', 'elektric-connection', 'doing-time'],
    match: (i) => i.series === 'daredevil-woman-without-fear' || i.series === 'daredevil-woman-without-fear-v2',
  },
  {
    key: 'kingpin',
    name: 'The Kingpin Thread',
    blurb: 'Wilson Fisk, from his arrival in this book to the mayor’s office.',
    arcs: [
      'kingpin-must-die', 'born-again', 'last-rites', 'underboss', 'hardcore',
      'return-of-the-king', 'mayor-fisk', 'devils-reign',
    ],
  },
  {
    key: 'bullseye',
    name: 'The Bullseye Thread',
    blurb: 'Everything Bullseye takes from him, and the night Matt takes something back.',
    arcs: ['bullseye-arrives', 'elektra', 'guardian-devil'],
    issues: ['shadowland-1'],
  },
  {
    key: 'marvel-knights',
    name: 'Kevin Smith to Bendis',
    blurb: 'The Marvel Knights relaunch: Guardian Devil, Echo’s arrival, and the Bendis and Maleev years that follow.',
    match: (i) => inSeries(i, 'daredevil-v2', 1, 81),
  },
  {
    key: 'brubaker',
    name: 'The Brubaker Run',
    blurb: 'From the prison cell to the Hand: Ed Brubaker’s stretch of the second volume.',
    match: (i) => inSeries(i, 'daredevil-v2', 82, 119) || i.id === 'daredevil-v2-500',
  },
  {
    key: 'shadowland',
    name: 'Shadowland and After',
    blurb: 'Matt at the head of the Hand, what it costs, and the way back.',
    arcs: ['devils-hand', 'shadowland'],
    match: (i) => i.series === 'daredevil-reborn',
  },
  {
    key: 'waid',
    name: 'The Waid Run',
    blurb: 'Mark Waid’s two volumes, New York and then San Francisco, and the drive between them.',
    match: (i) =>
      ['daredevil-v3', 'daredevil-v4', 'daredevil-road-warrior', 'daredevil-annual-v3'].includes(i.series),
  },
  {
    key: 'soule',
    name: 'The Soule Run',
    blurb: 'Charles Soule’s volume: back in New York, secret again, through to Mayor Fisk.',
    match: (i) => ['daredevil-v5', 'daredevil-annual-v4', 'daredevil-annual-v5'].includes(i.series),
  },
  {
    key: 'zdarsky',
    name: 'The Zdarsky Run',
    blurb: 'Chip Zdarsky’s two volumes, with Devil’s Reign and Elektra’s turn in the costume.',
    match: (i) =>
      [
        'daredevil-v6', 'daredevil-annual-v6', 'devils-reign', 'devils-reign-omega',
        'daredevil-woman-without-fear', 'daredevil-v7',
      ].includes(i.series),
  },
]

export const PATHS_BY_KEY = Object.fromEntries(PATHS.map((p) => [p.key, p]))
