/**
 * Hand-curated corrections and enrichment, merged over the generated dataset
 * at runtime by src/lib/dataset.js.
 *
 * Keyed by generated issue id. Any field here wins over the generated value, so
 * this is where an estimated cover date gets pinned down, a note gets added, or
 * a first appearance gets recorded.
 *
 * Set `dateExact: true` alongside a corrected `coverDate` so the UI stops
 * marking it as an estimate.
 *
 * Notes are our own brief framing — no synopses lifted from other sources.
 */

export const OVERRIDES = {
  /* ---------------------------------------------------------- the debut */
  'amazing-fantasy-15': {
    note: 'The origin. Sixteen pages at the back of an anthology already cancelled.',
    firstAppearances: ['Spider-Man', 'Peter Parker', 'Aunt May', 'Uncle Ben', 'Flash Thompson'],
    keyIssue: true,
  },

  /* ------------------------------------------ the Lee / Ditko villains */
  'amazing-spider-man-1': {
    note: 'The ongoing begins. Establishes the Bugle and the money problems that drive the book.',
    firstAppearances: ['J. Jonah Jameson', 'The Chameleon'],
    keyIssue: true,
  },
  'amazing-spider-man-2': { firstAppearances: ['The Vulture', 'The Tinkerer'] },
  'amazing-spider-man-3': { firstAppearances: ['Doctor Octopus'], keyIssue: true },
  'amazing-spider-man-4': { firstAppearances: ['The Sandman', 'Betty Brant'] },
  'amazing-spider-man-6': { firstAppearances: ['The Lizard'] },
  'amazing-spider-man-9': { firstAppearances: ['Electro'] },
  'amazing-spider-man-13': { firstAppearances: ['Mysterio'] },
  'amazing-spider-man-14': {
    note: 'The Goblin arrives, with his identity held back for another twenty-five issues.',
    firstAppearances: ['The Green Goblin'],
    keyIssue: true,
  },
  'amazing-spider-man-15': { firstAppearances: ['Kraven the Hunter'] },
  'amazing-spider-man-20': { firstAppearances: ['The Scorpion'] },
  'amazing-spider-man-31': {
    note: 'Opens the Master Planner saga and introduces two of the core supporting cast.',
    firstAppearances: ['Gwen Stacy', 'Harry Osborn'],
    keyIssue: true,
  },
  'amazing-spider-man-33': {
    note: 'The sequence the book is most often remembered for.',
    keyIssue: true,
  },
  'amazing-spider-man-39': {
    note: "Romita takes over the art, and the Goblin's identity is finally revealed.",
    keyIssue: true,
  },
  'amazing-spider-man-41': { firstAppearances: ['The Rhino'] },
  'amazing-spider-man-42': { firstAppearances: ['Mary Jane Watson (revealed)'], keyIssue: true },
  'amazing-spider-man-50': {
    note: 'Introduces the Kingpin, who would outgrow the title entirely.',
    firstAppearances: ['The Kingpin'],
    keyIssue: true,
  },

  /* -------------------------------------------------------------- 1970s */
  'amazing-spider-man-96': {
    note: 'Published without Comics Code approval, over a story about drug use.',
    keyIssue: true,
  },
  'amazing-spider-man-101': { firstAppearances: ['Morbius'] },
  'amazing-spider-man-121': {
    note: 'The issue that ends the Silver Age of the book.',
    keyIssue: true,
  },
  'amazing-spider-man-122': { keyIssue: true },
  'amazing-spider-man-129': {
    note: 'A one-off antagonist who did not stay one.',
    firstAppearances: ['The Punisher', 'The Jackal'],
    keyIssue: true,
  },
  'peter-parker-spectacular-1': {
    note: 'The second ongoing launches, giving the character a monthly B-title.',
    keyIssue: true,
  },

  /* -------------------------------------------------------------- 1980s */
  'amazing-spider-man-194': { firstAppearances: ['The Black Cat'] },
  'amazing-spider-man-238': { firstAppearances: ['The Hobgoblin'], keyIssue: true },
  'amazing-spider-man-252': {
    note: 'The black costume arrives, brought back from a company-wide crossover.',
    keyIssue: true,
  },
  'peter-parker-spectacular-107': {
    note: 'Opens the darkest story the Spectacular run attempted.',
    keyIssue: true,
  },
  'web-of-spider-man-1': {
    note: 'The third ongoing launches into the slot Marvel Team-Up vacated.',
    keyIssue: true,
  },
  'web-of-spider-man-31': {
    note: "Part one of Kraven's Last Hunt, which runs across all three titles.",
    keyIssue: true,
  },
  'amazing-spider-man-annual-21': {
    note: 'The wedding issue, timed to a live event staged at a baseball stadium.',
    keyIssue: true,
  },
  'amazing-spider-man-298': {
    note: 'McFarlane starts as regular artist.',
    keyIssue: true,
  },
  'amazing-spider-man-300': {
    note: "Venom's first full appearance, and the best-known issue of the era.",
    firstAppearances: ['Venom'],
    keyIssue: true,
  },
  'amazing-spider-man-328': {
    note: "McFarlane's last issue on the title before launching his own book.",
    keyIssue: true,
  },
}
