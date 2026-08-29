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
  'amazing-spider-man-90': {
    note: 'A death in the supporting cast that the book refuses to undo.',
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
  'amazing-spider-man-136': {
    note: 'The Goblin legacy passes to the next generation, closing a decade-long thread.',
    keyIssue: true,
  },
  'amazing-spider-man-149': {
    note: 'The climax of the clone story, and a question the 1990s reopened.',
    keyIssue: true,
  },
  'marvel-team-up-1': {
    note: 'Launches the team-up book that gave him a second monthly slot for thirteen years.',
    firstAppearances: ['Misty Knight'],
  },
  'peter-parker-spectacular-1': {
    note: 'The second ongoing launches, giving the character a monthly B-title.',
    keyIssue: true,
  },

  /* -------------------------------------------------------------- 1980s */
  'amazing-spider-man-194': { firstAppearances: ['The Black Cat'] },
  'amazing-spider-man-238': { firstAppearances: ['The Hobgoblin'], keyIssue: true },
  'amazing-spider-man-252': {
    note: 'The black costume arrives, brought back from a company-wide crossover. Read Secret Wars #8 first.',
    keyIssue: true,
  },
  'amazing-spider-man-258': {
    note: 'The costume is identified for what it is.',
    keyIssue: true,
  },
  'amazing-spider-man-259': {
    note: 'He gives up the costume — which does not settle the matter.',
  },
  'amazing-spider-man-239': { note: 'Second Hobgoblin appearance, establishing him as a recurring threat.' },
  'amazing-spider-man-251': { note: 'Closes the first Hobgoblin sequence, immediately before the costume change.' },
  'peter-parker-spectacular-107': {
    note: 'Opens the darkest story the Spectacular run attempted.',
    firstAppearances: ['The Sin-Eater'],
    keyIssue: true,
  },
  'peter-parker-spectacular-110': {
    note: 'Its conclusion, and the reason the arc is still recommended.',
  },
  'amazing-spider-man-311': {
    note: 'The line-wide Inferno event reaches the Spider-Man titles.',
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
    note: 'McFarlane starts as regular artist, and the new villain gets a brief first look.',
    firstAppearances: ['Venom (cameo)', 'The Life Foundation'],
    keyIssue: true,
  },
  'amazing-spider-man-300': {
    note: "Venom's first full appearance, and the best-known issue of the era.",
    firstAppearances: ['Venom (full appearance)'],
    keyIssue: true,
  },
  'amazing-spider-man-328': {
    note: "McFarlane's last issue on the title before launching his own book.",
    keyIssue: true,
  },

  /* ======================================================================
     The 1970s — the decade the book spends replacing its entire supporting
     cast. First appearances below were read off the {{1st}} markers on each
     issue's Marvel Database page rather than recalled.
     ====================================================================== */

  'amazing-spider-man-100': {
    note: 'Opens the Six Arms Saga, a three-issue detour into body horror.',
    keyIssue: true,
  },
  'amazing-spider-man-102': {
    note: 'Closes the Six Arms Saga. Morbius comes out of it with his own career.',
  },
  'amazing-spider-man-113': { firstAppearances: ['Hammerhead'] },
  'amazing-spider-man-124': {
    note: 'Turns a long-running supporting character into a monster.',
    firstAppearances: ['Man-Wolf'],
  },
  'amazing-spider-man-130': {
    note: 'The Spider-Mobile — an editorial idea the book itself never stopped mocking.',
    firstAppearances: ['The Spider-Mobile'],
  },
  'amazing-spider-man-135': { firstAppearances: ['Tarantula'] },
  'amazing-spider-man-140': { firstAppearances: ['Glory Grant'] },
  'amazing-spider-man-161': { firstAppearances: ['Jigsaw'] },
  'amazing-spider-man-167': { firstAppearances: ["Will O' The Wisp"] },
  'amazing-spider-man-172': { firstAppearances: ['Rocket Racer'] },
  'amazing-spider-man-176': {
    note: 'A third man takes the Goblin identity, opening a five-part arc.',
    firstAppearances: ['Green Goblin (Bart Hamilton)'],
  },
  'amazing-spider-man-180': { note: 'Closes the Goblin arc and, for a while, the whole idea.' },
  'amazing-spider-man-196': { firstAppearances: ['Debra Whitman'] },
  'amazing-spider-man-200': {
    note: 'The anniversary issue returns to the burglar from the origin.',
    keyIssue: true,
  },

  /* ---- Peter Parker, The Spectacular Spider-Man ---- */
  'peter-parker-spectacular-3': { firstAppearances: ['Lightmaster'] },
  'peter-parker-spectacular-25': {
    note: 'Introduces a villain built directly out of the clone story.',
    firstAppearances: ['Carrion'],
  },
  'peter-parker-spectacular-27': {
    note: 'Frank Miller pencils a Daredevil guest appearance, months before taking over that book.',
    keyIssue: true,
  },
  'peter-parker-spectacular-28': { note: 'Second and last of the Miller-drawn pair.' },
  'peter-parker-spectacular-32': { firstAppearances: ['The Iguana'] },

  /* ---- Marvel Team-Up ---- */
  'marvel-team-up-65': {
    note: 'Captain Britain\u2019s first American appearance, in a two-parter set at a killer funfair.',
    firstAppearances: ['Arcade'],
    keyIssue: true,
  },
  'marvel-team-up-74': {
    note: 'The Saturday Night Live cast guest-star as themselves. A genuine oddity of the run.',
  },
  'marvel-team-up-100': {
    note: 'An anniversary issue that quietly introduces a character the X-Men books would take up.',
    firstAppearances: ['Karma'],
  },

  /* ======================================================================
     The 1980s — three ongoing titles running at once, so the decade is as
     much about crossovers as about individual issues. First appearances
     again read off the {{1st}} markers rather than recalled.
     ====================================================================== */

  'amazing-spider-man-209': { firstAppearances: ['Calypso'] },
  'amazing-spider-man-210': { firstAppearances: ['Madame Web'] },
  'amazing-spider-man-212': { firstAppearances: ['Hydro-Man'] },
  'amazing-spider-man-222': { firstAppearances: ['Speed Demon'] },
  'amazing-spider-man-245': {
    note: 'A decoy Hobgoblin, planted to keep the identity question open.',
    firstAppearances: ['Hobgoblin (Lefty Donovan)'],
  },
  'amazing-spider-man-248': {
    note: 'A short back-up story about a boy who collects the comic. Frequently named the best single issue of the run.',
    keyIssue: true,
  },
  'amazing-spider-man-283': { firstAppearances: ['Mongoose'] },
  'amazing-spider-man-295': {
    note: 'Opens a three-title crossover, run immediately after Kraven\u2019s Last Hunt.',
  },
  'amazing-spider-man-309': { firstAppearances: ['Styx', 'Stone'] },
  'amazing-spider-man-320': {
    note: 'Opens a six-part thriller, drawn at the peak of the McFarlane run.',
  },
  'amazing-spider-man-329': {
    note: 'Closes the Acts of Vengeance tie-ins with a brief and enormous power upgrade.',
    firstAppearances: ['Tri-Sentinel'],
  },
  'amazing-spider-man-334': {
    note: 'The Sinister Six reassemble after twenty-five years apart.',
    keyIssue: true,
  },
  'amazing-spider-man-340': { firstAppearances: ['Femme Fatales'] },
  'amazing-spider-man-341': {
    note: 'Opens the last arc inside this guide\u2019s range.',
  },
  'amazing-spider-man-342': {
    note: 'The last Spider-Man issue of 1990, and where this tree stops.',
  },

  /* ---- Spectacular ---- */
  'peter-parker-spectacular-86': {
    note: 'A lighter one-off from the month Marvel handed its titles to the assistant editors.',
  },
  'peter-parker-spectacular-111': { note: 'Secret Wars II reaches the Spectacular title.' },
  'peter-parker-spectacular-117': {
    note: 'The Spectacular half of a crossover otherwise running through Web.',
  },
  'peter-parker-spectacular-133': { note: 'The Spectacular chapter of the Mad Dog Ward crossover.' },
  'peter-parker-spectacular-134': {
    note: 'The run returns to the villain from its best-remembered story. Also where the title drops the Peter Parker name.',
  },

  /* ---- Web of Spider-Man ---- */
  'web-of-spider-man-6': { note: 'Secret Wars II reaches the newest of the three titles.' },
  'web-of-spider-man-16': {
    note: 'Opens the first Web arc to pull another title into it.',
  },
  'web-of-spider-man-32': { note: "Closes Kraven's Last Hunt." },
  'web-of-spider-man-40': {
    note: 'Opens a four-part arc, and the closest Web came to a signature story of its own.',
  },
}
