/**
 * Curated reading paths.
 *
 * A path is an ordered walk through the tree. Selecting one dims everything
 * outside it and numbers the issues along the route.
 *
 * `issues` may list explicit ids, or a path may instead supply a `match`
 * predicate evaluated against each merged issue — useful for paths defined by a
 * property ("everything flagged as a key issue") rather than a fixed list.
 */

export const PATHS = [
  {
    key: 'essentials',
    name: 'The Essentials',
    blurb: 'The shortest route that still makes sense — every issue flagged as key.',
    match: (i) => i.keyIssue === true,
  },
  {
    key: 'ditko-era',
    name: 'The Ditko Era',
    blurb: 'Amazing Fantasy #15 through Amazing Spider-Man #38, the founding run.',
    match: (i) =>
      i.id === 'amazing-fantasy-15' ||
      (i.series === 'amazing-spider-man' && i.number <= 38),
  },
  {
    key: 'romita-era',
    name: 'The Romita Era',
    blurb: 'Amazing Spider-Man #39 to #100, where the book found its widest audience.',
    match: (i) =>
      i.series === 'amazing-spider-man' && i.number >= 39 && i.number <= 100,
  },
  {
    key: 'first-appearances',
    name: 'First Appearances',
    blurb: 'Only the issues that introduce a character who mattered afterwards.',
    match: (i) => Array.isArray(i.firstAppearances) && i.firstAppearances.length > 0,
  },
  {
    key: 'green-goblin',
    name: 'The Green Goblin',
    blurb: 'The single longest thread in the character’s first three decades.',
    issues: [
      'amazing-spider-man-14', 'amazing-spider-man-17', 'amazing-spider-man-23',
      'amazing-spider-man-26', 'amazing-spider-man-27', 'amazing-spider-man-39',
      'amazing-spider-man-40', 'amazing-spider-man-66', 'amazing-spider-man-67',
      'amazing-spider-man-96', 'amazing-spider-man-97', 'amazing-spider-man-98',
      'amazing-spider-man-121', 'amazing-spider-man-122', 'amazing-spider-man-136',
      'amazing-spider-man-137',
    ],
  },
  {
    key: 'black-suit-to-venom',
    name: 'From the Black Suit to Venom',
    blurb: 'One continuous thread from a crossover costume change to a new archenemy.',
    issues: [
      'secret-wars-8', 'amazing-spider-man-252', 'amazing-spider-man-258',
      'web-of-spider-man-1', 'amazing-spider-man-298', 'amazing-spider-man-299',
      'amazing-spider-man-300',
    ],
  },
  {
    key: 'the-eighties-peaks',
    name: 'Peaks of the Eighties',
    blurb: 'The handful of late-run stories that still get recommended first.',
    issues: [
      'peter-parker-spectacular-107', 'peter-parker-spectacular-108',
      'peter-parker-spectacular-109', 'peter-parker-spectacular-110',
      'web-of-spider-man-31', 'amazing-spider-man-293', 'peter-parker-spectacular-131',
      'web-of-spider-man-32', 'amazing-spider-man-294', 'peter-parker-spectacular-132',
      'amazing-spider-man-annual-21', 'amazing-spider-man-300',
    ],
  },
]

export const PATHS_BY_KEY = Object.fromEntries(PATHS.map((p) => [p.key, p]))
