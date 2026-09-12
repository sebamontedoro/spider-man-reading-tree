/**
 * Curated reading paths through the Venom tree. Shape as in
 * data/spider-man/paths.js: `match`, `arcs` and `issues`, combinable, and the
 * result sorted by cover date.
 *
 * The tree follows the symbiote, so most paths follow a host — Eddie, Flash,
 * Dylan — or the writer who defined one. Guest issues carry `series: 'guest'`,
 * so a path reaches them by id or through an arc, never by series.
 */

const inSeries = (i, key, from = -Infinity, to = Infinity) =>
  i.series === key && i.number >= from && i.number <= to

// The nineties had no ongoing Venom: these miniseries, in order, were it.
const NINETIES = new Set([
  'venom-lethal-protector', 'venom-funeral-pyre', 'venom-the-madness', 'venom-enemy-within',
  'venom-the-mace', 'venom-nights-of-vengeance', 'venom-separation-anxiety', 'venom-carnage-unleashed',
  'venom-super-special', 'venom-sinner-takes-all', 'venom-along-came-a-spider', 'venom-the-hunted',
  'venom-the-hunger', 'venom-tooth-and-claw', 'venom-on-trial', 'venom-license-to-kill',
  'venom-seed-of-darkness', 'venom-sign-of-the-boss', 'venom-the-finale',
])

export const PATHS = [
  {
    key: 'essentials',
    name: 'The Essentials',
    blurb: 'The shortest route that still makes sense: every change of host, and the few issues the rest is built on.',
    match: (i) => i.keyIssue === true,
  },
  {
    key: 'first-appearances',
    name: 'First Appearances',
    blurb: 'Only the issues that introduce someone who mattered afterwards.',
    match: (i) => Array.isArray(i.firstAppearances) && i.firstAppearances.length > 0,
  },
  {
    key: 'before-venom',
    name: 'The Costume and the First Venom',
    blurb: 'Everything in the Spider-Man books up to the deal: the black costume, Venom’s first stories, and Carnage’s.',
    arcs: [
      'black-suit', 'venom-arrives', 'venom-returns', 'styx-and-stone', 'the-boneyard-hop',
      'carnage-arrives', 'bride-of-venom',
    ],
  },
  {
    key: 'nineties',
    name: 'Lethal Protector',
    blurb: 'The nineties: twenty miniseries back to back, with Maximum Carnage and the Planet of the Symbiotes where they fall.',
    arcs: ['maximum-carnage', 'planet-of-the-symbiotes'],
    match: (i) => NINETIES.has(i.series),
  },
  {
    key: 'eddie-between-suits',
    name: 'Eddie Between Suits',
    blurb: 'Eddie Brock from 2003 to 2017: the hunger, the cancer, Anti-Venom, Toxin, and the night he takes Venom back.',
    arcs: ['the-hunger', 'venomous', 'last-temptation-of-eddie-brock', 'new-ways-to-die'],
    issues: ['venom-v2-15', 'venom-v2-17', 'venom-v3-6'],
    match: (i) => i.id.startsWith('anti-venom-new-ways-to-live-'),
  },
  {
    key: 'agent-venom',
    name: 'Agent Venom',
    blurb: 'Flash Thompson in the suit, from the government’s leash to deep space, and the issue where his story ends.',
    arcs: ['minimum-carnage'],
    issues: [
      'amazing-spider-man-v2-654', 'amazing-spider-man-v2-654.1', 'guardians-of-the-galaxy-v3-21',
      'guardians-of-the-galaxy-v3-22', 'guardians-of-the-galaxy-v3-23', 'amazing-spider-man-v4-800',
    ],
    match: (i) => i.series === 'venom-v2' || i.series === 'venom-space-knight',
  },
  {
    key: 'costa',
    name: 'The Costa Run',
    blurb: 'Mike Costa’s volume: Lee Price, Eddie’s return, legacy numbering from #150, Venom Inc. and Poison-X.',
    arcs: ['venom-inc', 'poison-x'],
    match: (i) => i.series === 'venom-v3',
  },
  {
    key: 'cates',
    name: 'The Cates Run',
    blurb: 'Donny Cates’s Venom: Knull, Dylan, Absolute Carnage and King in Black.',
    arcs: ['absolute-carnage', 'king-in-black'],
    match: (i) => ['venom-v4', 'venom-annual', 'venom-annual-v2'].includes(i.series),
  },
  {
    key: 'ewing-ram-v',
    name: 'Al Ewing and Ram V',
    blurb: 'Dylan in the suit, Eddie a god loose in time, the war between them, and what came after.',
    arcs: ['symbiosis-necrosis', 'venom-war', 'death-spiral', 'queen-in-black'],
    match: (i) => ['venom-v5', 'venom-annual-v3', 'all-new-venom', 'venom-v6'].includes(i.series),
  },
  {
    key: 'carnage',
    name: 'The Carnage Thread',
    blurb: 'Kasady and the red symbiote: every Carnage book, and every crossover built around him.',
    arcs: [
      'carnage-arrives', 'maximum-carnage', 'web-of-carnage', 'minimum-carnage', 'absolute-carnage',
      'extreme-carnage', 'carnage-reigns',
    ],
    issues: ['amazing-spider-man-344', 'new-avengers-2'],
    match: (i) => i.accent === 'carnage',
  },
  {
    key: 'events',
    name: 'The Symbiote Events',
    blurb: 'The crossovers the symbiotes headline, from Maximum Carnage to Queen in Black.',
    arcs: [
      'maximum-carnage', 'planet-of-the-symbiotes', 'venomverse', 'venom-inc', 'absolute-carnage',
      'king-in-black', 'extreme-carnage', 'venom-war', 'death-spiral', 'queen-in-black',
    ],
  },
]

export const PATHS_BY_KEY = Object.fromEntries(PATHS.map((p) => [p.key, p]))
