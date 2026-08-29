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

  /* ==================================================================== 1990s
     Discovered by reading the StoryArc and Event fields off every issue in the
     decade rather than from memory, then cut down to the ones that cross
     titles or that the period is actually remembered for. The scan found 73
     arcs; these are the eighteen worth navigating by.

     The Clone Saga is listed in full at 76 issues across six titles. That is
     not a mistake: arcs chain their issues in reading order rather than
     linking every pair, so even this one stays readable in the focus graph.
     ==================================================================== */
  {
    key: 'child-within',
    name: "The Child Within",
    year: 1991,
    issues: [
      'peter-parker-spectacular-178', 'peter-parker-spectacular-179', 'peter-parker-spectacular-180',
      'peter-parker-spectacular-181', 'peter-parker-spectacular-182', 'peter-parker-spectacular-183',
      'peter-parker-spectacular-184',
    ],
    blurb: "Harry Osborn's decline, told over seven issues of Spectacular.",
  },
  {
    key: 'revenge-sinister-six',
    name: "Revenge of the Sinister Six",
    year: 1992,
    issues: [
      'spider-man-1990-18', 'spider-man-1990-19', 'spider-man-1990-20',
      'spider-man-1990-21', 'spider-man-1990-22', 'spider-man-1990-23',
    ],
    blurb: "The team returns, this time over six issues of the McFarlane-launched title.",
  },
  {
    key: 'invasion-spider-slayers',
    name: "Invasion of the Spider-Slayers",
    year: 1992,
    issues: [
      'amazing-spider-man-368', 'amazing-spider-man-369', 'amazing-spider-man-370',
      'amazing-spider-man-371', 'amazing-spider-man-372', 'amazing-spider-man-373',
    ],
    blurb: "Smythe's machines come back in force.",
  },
  {
    key: 'thirtieth-anniversary',
    name: "30th Anniversary",
    year: 1992,
    issues: [
      'peter-parker-spectacular-189', 'web-of-spider-man-90', 'amazing-spider-man-365',
      'spider-man-1990-26',
    ],
    blurb: "Three titles mark thirty years with hologram covers.",
    crossover: true,
  },
  {
    key: 'maximum-carnage',
    name: "Maximum Carnage",
    year: 1993,
    issues: [
      'spider-man-unlimited-1', 'amazing-spider-man-378', 'peter-parker-spectacular-201',
      'spider-man-1990-35', 'web-of-spider-man-101', 'amazing-spider-man-379',
      'peter-parker-spectacular-202', 'spider-man-1990-36', 'web-of-spider-man-102',
      'amazing-spider-man-380', 'peter-parker-spectacular-203', 'spider-man-1990-37',
      'spider-man-unlimited-2', 'web-of-spider-man-103',
    ],
    blurb: "Fourteen parts across five titles. The decade's first true mega-crossover.",
    crossover: true,
  },
  {
    key: 'pursuit',
    name: "Pursuit",
    year: 1994,
    issues: [
      'peter-parker-spectacular-211', 'spider-man-1990-45', 'amazing-spider-man-389',
      'web-of-spider-man-112',
    ],
    blurb: "A four-part chase running one chapter through each ongoing title.",
    crossover: true,
  },
  {
    key: 'power-and-responsibility',
    name: "Power and Responsibility",
    year: 1994,
    issues: [
      'amazing-spider-man-394', 'peter-parker-spectacular-217', 'spider-man-1990-51',
      'web-of-spider-man-117',
    ],
    blurb: "The four-part opening that sets the Clone Saga in motion.",
    crossover: true,
  },
  {
    key: 'clone-saga-1990s',
    name: "The Clone Saga",
    year: 1994,
    issues: [
      'spider-man-unlimited-7', 'peter-parker-spectacular-220', 'spider-man-1990-54',
      'spider-man-1990-55', 'spider-man-unlimited-8', 'amazing-spider-man-401',
      'peter-parker-spectacular-224', 'spider-man-1990-58', 'spider-man-unlimited-9',
      'web-of-spider-man-124', 'amazing-spider-man-402', 'spider-man-1990-59',
      'web-of-spider-man-125', 'amazing-spider-man-403', 'spider-man-1990-60',
      'web-of-spider-man-126', 'amazing-spider-man-405', 'peter-parker-spectacular-228',
      'spider-man-1990-62', 'spider-man-unlimited-10', 'web-of-spider-man-128',
      'amazing-spider-man-406', 'peter-parker-spectacular-229', 'spider-man-1990-63',
      'web-of-spider-man-129', 'amazing-spider-man-407', 'peter-parker-spectacular-230',
      'sensational-spider-man-0', 'spider-man-1990-64', 'spider-man-unlimited-11',
      'amazing-spider-man-408', 'peter-parker-spectacular-231', 'sensational-spider-man-1',
      'spider-man-1990-65', 'amazing-spider-man-409', 'peter-parker-spectacular-232',
      'sensational-spider-man-2', 'spider-man-1990-66', 'amazing-spider-man-410',
      'peter-parker-spectacular-233', 'sensational-spider-man-3', 'spider-man-1990-67',
      'amazing-spider-man-411', 'peter-parker-spectacular-234', 'sensational-spider-man-4',
      'spider-man-1990-68', 'spider-man-unlimited-12', 'amazing-spider-man-412',
      'peter-parker-spectacular-235', 'sensational-spider-man-5', 'spider-man-1990-69',
      'amazing-spider-man-413', 'peter-parker-spectacular-236', 'sensational-spider-man-6',
      'spider-man-1990-70', 'amazing-spider-man-414', 'peter-parker-spectacular-237',
      'sensational-spider-man-7', 'spider-man-1990-71', 'spider-man-unlimited-13',
      'amazing-spider-man-415', 'peter-parker-spectacular-238', 'sensational-spider-man-8',
      'spider-man-1990-72', 'amazing-spider-man-416', 'peter-parker-spectacular-239',
      'sensational-spider-man-9', 'spider-man-1990-73', 'amazing-spider-man-417',
      'peter-parker-spectacular-240', 'sensational-spider-man-10', 'spider-man-1990-74',
      'amazing-spider-man-418', 'sensational-spider-man-11', 'spider-man-1990-75',
      'spider-man-unlimited-14',
    ],
    blurb: "Seventy-six issues across six titles over two years. The decade's defining and most divisive storyline.",
    crossover: true,
  },
  {
    key: 'trial-of-peter-parker',
    name: "The Trial of Peter Parker",
    year: 1995,
    issues: [
      'amazing-spider-man-403', 'peter-parker-spectacular-226', 'spider-man-1990-60',
      'web-of-spider-man-126',
    ],
    blurb: "A four-part crossover at the midpoint of the Clone Saga.",
    crossover: true,
  },
  {
    key: 'maximum-clonage',
    name: "Maximum Clonage",
    year: 1995,
    issues: [
      'amazing-spider-man-404', 'peter-parker-spectacular-227', 'spider-man-1990-61',
      'web-of-spider-man-127',
    ],
    blurb: "The Clone Saga's own mega-crossover inside the mega-crossover.",
    crossover: true,
  },
  {
    key: 'greatest-responsibility',
    name: "The Greatest Responsibility",
    year: 1995,
    issues: [
      'amazing-spider-man-406', 'peter-parker-spectacular-229', 'spider-man-1990-63',
    ],
    blurb: "Where the Clone Saga was meant to end, before it was extended.",
    crossover: true,
  },
  {
    key: 'web-of-carnage',
    name: "Web of Carnage",
    year: 1996,
    issues: [
      'amazing-spider-man-410', 'peter-parker-spectacular-233', 'sensational-spider-man-3',
      'spider-man-1990-67',
    ],
    blurb: "Carnage's symbiote finds a new host across four titles.",
    crossover: true,
  },
  {
    key: 'revelations',
    name: "Revelations",
    year: 1996,
    issues: [
      'peter-parker-spectacular-240', 'amazing-spider-man-418', 'sensational-spider-man-11',
      'spider-man-1990-75',
    ],
    blurb: "The Clone Saga's real ending, and the return of a villain dead since 1973.",
    crossover: true,
  },
  {
    key: 'spider-hunt',
    name: "Spider-Hunt",
    year: 1998,
    issues: [
      'amazing-spider-man-432', 'peter-parker-spectacular-255', 'sensational-spider-man-25',
      'spider-man-1990-89',
    ],
    blurb: "Peter is hunted across all four titles at once.",
    crossover: true,
  },
  {
    key: 'identity-crisis-1998',
    name: "Identity Crisis",
    year: 1998,
    issues: [
      'amazing-spider-man-433', 'peter-parker-spectacular-256', 'sensational-spider-man-26',
      'spider-man-1990-90', 'amazing-spider-man-434', 'peter-parker-spectacular-257',
      'sensational-spider-man-27', 'spider-man-1990-91', 'amazing-spider-man-435',
      'peter-parker-spectacular-258', 'sensational-spider-man-28', 'spider-man-1990-92',
    ],
    blurb: "Twelve issues in which he adopts four new identities to keep working.",
    crossover: true,
  },
  {
    key: 'gathering-of-five',
    name: "The Gathering of Five",
    year: 1998,
    issues: [
      'amazing-spider-man-440', 'peter-parker-spectacular-262', 'sensational-spider-man-32',
      'spider-man-1990-96', 'sensational-spider-man-33',
    ],
    blurb: "The five-part run-up to the end of volume one.",
    crossover: true,
  },
  {
    key: 'final-chapter',
    name: "The Final Chapter",
    year: 1998,
    issues: [
      'amazing-spider-man-441', 'peter-parker-spectacular-263', 'spider-man-1990-97',
      'spider-man-1990-98',
    ],
    blurb: "The last arc of Amazing volume one, 441 issues in.",
    crossover: true,
  },
  {
    key: 'maximum-security',
    name: "Maximum Security",
    year: 2000,
    issues: [
      'amazing-spider-man-v2-24', 'peter-parker-spider-man-v2-24',
    ],
    blurb: "A line-wide event reaching the relaunched titles.",
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
