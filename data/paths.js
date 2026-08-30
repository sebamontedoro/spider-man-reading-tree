/**
 * Curated reading paths.
 *
 * A path is an ordered walk through the tree. Selecting one dims everything
 * outside it and numbers the issues along the route.
 *
 * Three ways to build one, combinable:
 *
 *   match   a predicate over every issue
 *   arcs    arc keys, expanded to those arcs' issues — a path assembled from
 *           storylines already curated in data/arcs.js rather than a list of ids
 *   issues  explicit ids, for the parts no arc covers
 *
 * The result is always sorted by cover date, which for a path crossing decades
 * and several titles is the only order that reads.
 */

export const PATHS = [
  {
    key: 'essentials',
    name: 'The Essentials',
    blurb: 'The shortest route that still makes sense: every issue where the premise changes for good, or a continuity begins or ends.',
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

  /* ============================================ Rutas que salen de sus títulos */
  {
    key: 'beyond-his-own-books',
    name: 'Outside His Own Titles',
    blurb: 'Every issue in the tree that he appears in without headlining — from the 1963 Human Torch crossings to Spider-Geddon.',
    match: (i) => i.role === 'guest',
  },
  {
    key: 'line-wide-events',
    name: 'When the Whole Line Arrives',
    blurb: 'The company-wide events that reach him, each starting in the book where it actually happens rather than in his tie-in.',
    arcs: [
      'black-suit', 'inferno', 'acts-of-vengeance', 'maximum-carnage',
      'the-other', 'civil-war', 'civil-war-ii', 'secret-empire',
      'spider-verse', 'ultimatum',
    ],
    issues: [
      'infinity-gauntlet-1', 'infinity-war-1', 'infinity-crusade-1',
      'secret-invasion-1', 'fear-itself-1', 'avengers-vs-x-men-1',
      'original-sin-1', 'secret-wars-2015-1', 'secret-wars-2015-9',
      'spider-geddon-1',
    ],
  },
  {
    key: 'the-kraven-thread',
    name: 'The Kraven Thread',
    blurb: 'Fifty-five years of one family, from a 1964 debut through the story that killed him to the two hunts his children mounted afterwards.',
    arcs: ['kravens-last-hunt', 'grim-hunt', 'hunted'],
    issues: [
      'amazing-spider-man-15', 'amazing-spider-man-104',
      'spider-man-1990-47', 'spider-man-1990-55',
      'amazing-spider-man-v2-565', 'amazing-spider-man-v2-567',
      'amazing-spider-man-v5-16',
    ],
  },
  {
    key: 'the-osborn-thread',
    name: 'The Osborn Thread',
    blurb: 'Every claimant to the Goblin identity, and the man who kept coming back — 1964 to 2018.',
    arcs: ['goblin-unmasked', 'a-new-goblin', 'gwen-stacy', 'revelations',
           'go-down-swinging', 'osborn-identity'],
    issues: [
      'amazing-spider-man-14', 'amazing-spider-man-136', 'amazing-spider-man-180',
      'peter-parker-spectacular-200', 'osborn-journals-1',
      'amazing-spider-man-v2-568',
    ],
  },
  {
    key: 'the-symbiote-thread',
    name: 'The Symbiote Thread',
    blurb: 'One costume, followed for thirty-six years: a crossover souvenir that becomes a villain, then several.',
    arcs: ['black-suit', 'venom-arrives', 'maximum-carnage', 'web-of-carnage'],
    issues: [
      'secret-wars-8', 'amazing-spider-man-259',
      'venom-lethal-protector-1', 'venom-lethal-protector-6',
      'amazing-spider-man-v2-569',
    ],
  },

  /* ================================================ Rutas de las épocas nuevas */
  {
    key: 'the-clone-saga-navigable',
    name: 'The Clone Saga, Navigable',
    blurb: 'The seventy-six-issue original reduced to the chapters that carry the plot, plus the 2016 sequel that revisits it on purpose.',
    arcs: [
      'power-and-responsibility', 'trial-of-peter-parker', 'maximum-clonage',
      'greatest-responsibility', 'revelations', 'clone-conspiracy',
    ],
    issues: ['web-of-spider-man-117', 'web-of-spider-man-119', 'spider-man-1990-52', 'amazing-spider-man-400'],
  },
  {
    key: 'the-ultimate-line',
    name: 'The Ultimate Line, Start to Finish',
    blurb: 'The parallel continuity as its own read: 176 issues from a 2000 origin to a 2015 ending, requiring nothing from the main sequence.',
    match: (i) => i.universe === 'ultimate',
  },
  {
    key: 'miles-morales',
    name: 'Miles Morales',
    blurb: 'From a debut in the parallel line, through the crossing where the two meet, to the continuity he ends up in.',
    match: (i) =>
      ['ultimate-comics-spider-man', 'miles-morales-ultimate',
       'spider-man-miles-v2', 'miles-morales-spider-man'].includes(i.series),
    issues: ['spider-men-1', 'spider-men-5', 'secret-wars-2015-9', 'spider-men-ii-1'],
  },
  {
    key: 'the-superior-run',
    name: 'The Superior Run',
    blurb: 'The thirty-three issues where Spider-Man is somebody else, with the arc that sets it up and the one that ends it.',
    arcs: ['dying-wish', 'my-own-worst-enemy', 'necessary-evil', 'darkest-hours'],
    match: (i) => i.series === 'superior-spider-man',
  },
  {
    key: 'every-milestone',
    name: 'Every Milestone',
    blurb: 'Walk the whole tree by its story beats alone — every debut, death, event and change of premise, in order.',
    match: (i) => Boolean(i.milestones?.length),
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
