/**
 * Story arcs and events.
 *
 * An arc groups issues that read as one story, and is what the focus graph uses
 * to draw sibling connections. `issues` holds generated ids in reading order —
 * the generator's id scheme is `<series-key>-<number>`.
 *
 * Descriptions are our own one-line framing, kept deliberately spoiler-light.
 */

export const ARCS = [
  {
    key: 'origin',
    name: 'Origin',
    year: 1962,
    issues: ['amazing-fantasy-15'],
    blurb: 'The debut story that establishes the character and his central lesson.',
  },
  {
    key: 'goblin-unmasked',
    name: "The Green Goblin's Identity",
    year: 1966,
    issues: ['amazing-spider-man-39', 'amazing-spider-man-40'],
    blurb: 'The Goblin is unmasked and his origin told, reframing the whole cast.',
  },
  {
    key: 'master-planner',
    name: 'If This Be My Destiny (The Master Planner Saga)',
    year: 1965,
    issues: ['amazing-spider-man-31', 'amazing-spider-man-32', 'amazing-spider-man-33'],
    blurb: 'Ditko’s peak. Widely cited as the definitive Spider-Man sequence.',
  },
  {
    key: 'six-arms',
    name: 'The Six Arms Saga',
    year: 1971,
    issues: ['amazing-spider-man-100', 'amazing-spider-man-101', 'amazing-spider-man-102'],
    blurb: 'A short body-horror detour that also launches Morbius.',
  },
  {
    key: 'gwen-stacy',
    name: 'The Night Gwen Stacy Died',
    year: 1973,
    issues: ['amazing-spider-man-121', 'amazing-spider-man-122'],
    blurb: 'The turning point that closes the Silver Age tone of the book.',
  },
  {
    key: 'clone-saga-original',
    name: 'The Original Clone Story',
    year: 1975,
    issues: [
      'amazing-spider-man-144', 'amazing-spider-man-145', 'amazing-spider-man-146',
      'amazing-spider-man-147', 'amazing-spider-man-148', 'amazing-spider-man-149',
      'amazing-spider-man-150', 'amazing-spider-man-151',
    ],
    blurb: 'The Jackal storyline whose consequences the 1990s would revisit at length.',
  },
  {
    key: 'a-new-goblin',
    name: 'A New Goblin',
    year: 1978,
    issues: [
      'amazing-spider-man-176', 'amazing-spider-man-177', 'amazing-spider-man-178',
      'amazing-spider-man-179', 'amazing-spider-man-180',
    ],
    blurb: 'A third claimant to the Goblin identity, and the end of the 1970s run of them.',
  },
  {
    key: 'jean-dewolff',
    name: 'The Death of Jean DeWolff',
    year: 1985,
    issues: [
      'peter-parker-spectacular-107', 'peter-parker-spectacular-108',
      'peter-parker-spectacular-109', 'peter-parker-spectacular-110',
    ],
    blurb: 'A hard-edged murder story, and the high point of the Spectacular run.',
  },
  {
    key: 'black-suit',
    name: 'The Alien Costume',
    year: 1984,
    // Starts in the crossover, not in his own title — the reading order only
    // makes sense if Secret Wars #8 comes first.
    issues: [
      'secret-wars-8', 'amazing-spider-man-252', 'amazing-spider-man-258',
      'amazing-spider-man-259',
    ],
    blurb: 'The new costume arrives from a crossover, and turns out not to be cloth.',
    crossover: true,
  },
  {
    key: 'hobgoblin-mystery',
    name: 'The Hobgoblin',
    year: 1983,
    issues: [
      'amazing-spider-man-238', 'amazing-spider-man-239', 'amazing-spider-man-244',
      'amazing-spider-man-245', 'amazing-spider-man-249', 'amazing-spider-man-250',
      'amazing-spider-man-251',
    ],
    blurb: 'A new Goblin whose identity was left open for years, by design and then by accident.',
  },
  {
    key: 'gang-war',
    name: 'Gang War',
    year: 1987,
    issues: [
      'amazing-spider-man-284', 'amazing-spider-man-285', 'amazing-spider-man-286',
      'amazing-spider-man-287', 'amazing-spider-man-288',
    ],
    blurb: 'The Kingpin’s hold on the city fractures into open war.',
  },
  {
    key: 'kravens-last-hunt',
    name: "Kraven's Last Hunt",
    year: 1987,
    // Runs across all three ongoing titles in publication order.
    issues: [
      'web-of-spider-man-31', 'amazing-spider-man-293', 'peter-parker-spectacular-131',
      'web-of-spider-man-32', 'amazing-spider-man-294', 'peter-parker-spectacular-132',
    ],
    blurb: 'A six-part crossover, and the most acclaimed Spider-Man story of the decade.',
    crossover: true,
  },
  {
    key: 'the-wedding',
    name: 'The Wedding',
    year: 1987,
    issues: ['amazing-spider-man-annual-21'],
    blurb: 'Peter and Mary Jane marry, changing the book’s premise for two decades.',
  },
  {
    key: 'venom-arrives',
    name: 'Venom',
    year: 1988,
    issues: ['amazing-spider-man-298', 'amazing-spider-man-299', 'amazing-spider-man-300'],
    blurb: 'The symbiote returns with a host, in the run that reset the title’s commercial fortunes.',
  },
  {
    key: 'inferno',
    name: 'Inferno',
    year: 1989,
    // Tie-in issues confirmed against the Event field on each wiki page.
    issues: [
      'amazing-spider-man-311', 'peter-parker-spectacular-146', 'web-of-spider-man-47',
      'amazing-spider-man-312', 'peter-parker-spectacular-147', 'web-of-spider-man-48',
      'amazing-spider-man-313', 'peter-parker-spectacular-148',
    ],
    blurb: 'A line-wide event reaches all three Spider-Man titles at once.',
    crossover: true,
  },
  {
    key: 'missing-in-action',
    name: 'Missing in Action',
    year: 1986,
    // Ordered by cover date across the two titles it runs through.
    issues: [
      'web-of-spider-man-16', 'peter-parker-spectacular-117',
      'web-of-spider-man-17', 'web-of-spider-man-18',
    ],
    blurb: 'An early Web of Spider-Man arc that reaches across into Spectacular.',
    crossover: true,
  },
  {
    key: 'mad-dog-ward',
    name: 'Life in the Mad Dog Ward',
    year: 1987,
    issues: [
      'amazing-spider-man-295', 'peter-parker-spectacular-133', 'web-of-spider-man-33',
    ],
    blurb: 'A three-title crossover run immediately after Kraven\u2019s Last Hunt.',
    crossover: true,
  },
  {
    key: 'sin-eater-through-hell',
    name: 'Sin-Eater Through Hell',
    year: 1988,
    issues: [
      'peter-parker-spectacular-134', 'peter-parker-spectacular-135',
      'peter-parker-spectacular-136',
    ],
    blurb: 'The Spectacular run returns to the villain from its best-remembered story.',
  },
  {
    key: 'cult-of-love',
    name: 'Cult of Love',
    year: 1988,
    issues: [
      'web-of-spider-man-40', 'web-of-spider-man-41',
      'web-of-spider-man-42', 'web-of-spider-man-43',
    ],
    blurb: 'A four-part Web arc, and the closest that title got to a signature story.',
  },
  {
    key: 'assassin-nation-plot',
    name: 'The Assassin Nation Plot',
    year: 1989,
    issues: [
      'amazing-spider-man-320', 'amazing-spider-man-321', 'amazing-spider-man-322',
      'amazing-spider-man-323', 'amazing-spider-man-324', 'amazing-spider-man-325',
    ],
    blurb: 'A six-part political thriller, drawn at the height of the McFarlane run.',
  },
  {
    key: 'return-of-the-sinister-six',
    name: 'Return of the Sinister Six',
    year: 1990,
    issues: [
      'amazing-spider-man-334', 'amazing-spider-man-335', 'amazing-spider-man-336',
      'amazing-spider-man-337', 'amazing-spider-man-338', 'amazing-spider-man-339',
    ],
    blurb: 'The villain team reassembles after twenty-five years away.',
  },
  {
    key: 'powerless',
    name: 'Powerless',
    year: 1990,
    issues: ['amazing-spider-man-341', 'amazing-spider-man-342'],
    blurb: 'The last arc inside our range, and the last two issues of 1990.',
  },
  {
    key: 'acts-of-vengeance',
    name: 'Acts of Vengeance',
    year: 1990,
    issues: [
      'peter-parker-spectacular-158', 'peter-parker-spectacular-159',
      'web-of-spider-man-59', 'amazing-spider-man-326', 'amazing-spider-man-327',
      'peter-parker-spectacular-160', 'web-of-spider-man-60',
      'amazing-spider-man-328', 'web-of-spider-man-61', 'amazing-spider-man-329',
      'web-of-spider-man-64', 'web-of-spider-man-65',
    ],
    blurb: 'A line-wide event crosses all three titles; Spider-Man briefly holds cosmic power.',
    crossover: true,
  },
  {
    key: 'new-fantastic-four',
    name: 'The New Fantastic Four',
    year: 1990,
    issues: ['fantastic-four-347'],
    blurb: 'A replacement team assembled from four of the line\u2019s biggest sellers.',
  },
]

/** Chronological, so the arc filter reads as a timeline rather than a grab bag. */
export const ARCS_SORTED = [...ARCS].sort((a, b) => a.year - b.year)

export const ARCS_BY_KEY = Object.fromEntries(ARCS.map((a) => [a.key, a]))
