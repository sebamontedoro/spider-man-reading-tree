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

  /* ==================================================================== 2000s
     Same method as the previous decades: read off the StoryArc and Event fields
     of all 441 issues, then cut to what crosses titles or defines the period.
     The scan found 60 arcs.

     The Ultimate entries at the end belong to the parallel continuity and are
     kept separate on purpose. Its Clone Saga is not the 1994 one — it is a
     different story with the same name, told in nine issues instead of
     seventy-six.
     ==================================================================== */
  {
    key: 'avengers-disassembled',
    name: "Avengers Disassembled",
    year: 2004,
    issues: [
      'spectacular-spider-man-v2-17', 'spectacular-spider-man-v2-18', 'spectacular-spider-man-v2-19',
      'spectacular-spider-man-v2-20',
    ],
    blurb: "A line-wide event reaches the Spectacular title.",
    crossover: true,
  },
  {
    key: 'sins-past',
    name: "Sins Past",
    year: 2004,
    issues: [
      'amazing-spider-man-v2-509', 'amazing-spider-man-v2-510', 'amazing-spider-man-v2-511',
      'amazing-spider-man-v2-512', 'amazing-spider-man-v2-513', 'amazing-spider-man-v2-514',
    ],
    blurb: "Retroactively rewrites Gwen Stacy's last years. Contested from the day it shipped.",
  },
  {
    key: 'the-other',
    name: "The Other: Evolve or Die",
    year: 2005,
    issues: [
      'amazing-spider-man-v2-525', 'friendly-neighborhood-spider-man-1', 'marvel-knights-spider-man-19',
      'amazing-spider-man-v2-526', 'friendly-neighborhood-spider-man-2', 'marvel-knights-spider-man-20',
      'amazing-spider-man-v2-527', 'friendly-neighborhood-spider-man-3', 'marvel-knights-spider-man-21',
      'amazing-spider-man-v2-528', 'friendly-neighborhood-spider-man-4', 'marvel-knights-spider-man-22',
    ],
    blurb: "Twelve parts across three titles, ending with a physical transformation.",
    crossover: true,
  },
  {
    key: 'war-at-home',
    name: "The War at Home",
    year: 2006,
    issues: [
      'amazing-spider-man-v2-532', 'amazing-spider-man-v2-533', 'amazing-spider-man-v2-534',
      'amazing-spider-man-v2-535', 'amazing-spider-man-v2-536', 'amazing-spider-man-v2-537',
      'amazing-spider-man-v2-538',
    ],
    blurb: "Amazing's own seven-part run through the superhero registration fight.",
  },
  {
    key: 'civil-war',
    name: "Civil War",
    year: 2006,
    issues: [
      'amazing-spider-man-v2-532', 'amazing-spider-man-v2-533', 'amazing-spider-man-v2-534',
      'friendly-neighborhood-spider-man-11', 'amazing-spider-man-v2-535', 'amazing-spider-man-v2-536',
      'friendly-neighborhood-spider-man-12', 'friendly-neighborhood-spider-man-13', 'amazing-spider-man-v2-537',
      'amazing-spider-man-v2-538',
    ],
    blurb: "He takes a public side, and unmasks on television. The consequences drive the next two years.",
    crossover: true,
  },
  {
    key: 'spider-man-unmasked',
    name: "Spider-Man Unmasked",
    year: 2007,
    issues: [
      'sensational-spider-man-v2-32', 'sensational-spider-man-v2-33', 'sensational-spider-man-v2-34',
    ],
    blurb: "The fallout of a secret identity given up voluntarily.",
    crossover: true,
  },
  {
    key: 'back-in-black',
    name: "Back in Black",
    year: 2007,
    issues: [
      'amazing-spider-man-v2-539', 'friendly-neighborhood-spider-man-17', 'amazing-spider-man-v2-540',
      'friendly-neighborhood-spider-man-18', 'amazing-spider-man-v2-541', 'friendly-neighborhood-spider-man-19',
      'friendly-neighborhood-spider-man-20', 'amazing-spider-man-v2-542', 'friendly-neighborhood-spider-man-21',
      'friendly-neighborhood-spider-man-22', 'amazing-spider-man-v2-543', 'friendly-neighborhood-spider-man-23',
      'sensational-spider-man-v2-40',
    ],
    blurb: "The black costume returns as mourning dress, across three titles.",
    crossover: true,
  },
  {
    key: 'one-more-day',
    name: "One More Day",
    year: 2007,
    issues: [
      'amazing-spider-man-v2-544', 'friendly-neighborhood-spider-man-24', 'sensational-spider-man-v2-41',
      'amazing-spider-man-v2-545',
    ],
    blurb: "Four parts that undo the marriage and reset the premise. The most argued-over story in the character's history.",
    crossover: true,
  },
  {
    key: 'brand-new-day',
    name: "Brand New Day",
    year: 2008,
    issues: [
      'amazing-spider-man-v2-546', 'amazing-spider-man-v2-547', 'amazing-spider-man-v2-548',
      'amazing-spider-man-v2-549', 'amazing-spider-man-v2-550', 'amazing-spider-man-v2-551',
      'amazing-spider-man-v2-552', 'amazing-spider-man-v2-553', 'amazing-spider-man-v2-554',
      'amazing-spider-man-v2-555', 'amazing-spider-man-v2-556', 'amazing-spider-man-v2-557',
      'amazing-spider-man-v2-558', 'amazing-spider-man-v2-559', 'amazing-spider-man-v2-560',
      'amazing-spider-man-v2-561', 'amazing-spider-man-v2-562', 'amazing-spider-man-v2-563',
      'amazing-spider-man-v2-564',
    ],
    blurb: "Nineteen issues relaunching the status quo, shipping three times a month.",
    crossover: true,
  },
  {
    key: 'new-ways-to-die',
    name: "New Ways to Die",
    year: 2008,
    issues: [
      'amazing-spider-man-v2-568', 'amazing-spider-man-v2-569', 'amazing-spider-man-v2-570',
      'amazing-spider-man-v2-571', 'amazing-spider-man-v2-572', 'amazing-spider-man-v2-573',
    ],
    blurb: "Norman Osborn's return to the title under the new regime.",
  },
  {
    key: 'character-assassination',
    name: "Character Assassination",
    year: 2009,
    issues: [
      'amazing-spider-man-v2-584', 'amazing-spider-man-v2-585', 'amazing-spider-man-v2-586',
      'amazing-spider-man-v2-587', 'amazing-spider-man-v2-588',
    ],
    blurb: "Closes the first year of the relaunch.",
  },
  {
    key: 'american-son',
    name: "American Son",
    year: 2009,
    issues: [
      'amazing-spider-man-v2-595', 'amazing-spider-man-v2-596', 'amazing-spider-man-v2-597',
      'amazing-spider-man-v2-598', 'amazing-spider-man-v2-599',
    ],
    blurb: "Harry Osborn caught between his father and Peter.",
  },
  {
    key: 'dark-reign',
    name: "Dark Reign",
    year: 2009,
    issues: [
      'amazing-spider-man-v2-595', 'amazing-spider-man-v2-596', 'amazing-spider-man-v2-597',
      'amazing-spider-man-v2-598', 'amazing-spider-man-v2-599',
    ],
    blurb: "Osborn running national security is the backdrop for a year of the book.",
    crossover: true,
  },
  {
    key: 'grim-hunt',
    name: "Grim Hunt",
    year: 2010,
    issues: [
      'amazing-spider-man-v2-634', 'amazing-spider-man-v2-635', 'amazing-spider-man-v2-636',
      'amazing-spider-man-v2-637',
    ],
    blurb: "The Kravinoff family collects on twenty-three years of debt.",
  },
  {
    key: 'shed',
    name: "Shed",
    year: 2010,
    issues: [
      'amazing-spider-man-v2-629', 'amazing-spider-man-v2-630', 'amazing-spider-man-v2-631',
      'amazing-spider-man-v2-632', 'amazing-spider-man-v2-633',
    ],
    blurb: "The Lizard story the decade is most often pointed to.",
  },
  {
    key: 'one-moment-in-time',
    name: "One Moment in Time",
    year: 2010,
    issues: [
      'amazing-spider-man-v2-638', 'amazing-spider-man-v2-639', 'amazing-spider-man-v2-640',
      'amazing-spider-man-v2-641',
    ],
    blurb: "Fills in what One More Day left deliberately blank.",
  },
  {
    key: 'origin-of-the-species',
    name: "Origin of the Species",
    year: 2010,
    issues: [
      'amazing-spider-man-v2-642', 'amazing-spider-man-v2-643', 'amazing-spider-man-v2-644',
      'amazing-spider-man-v2-645', 'amazing-spider-man-v2-646',
    ],
    blurb: "The last arc inside this range.",
  },
  {
    key: 'ultimate-carnage',
    name: "Carnage",
    year: 2004,
    issues: [
      'ultimate-spider-man-60', 'ultimate-spider-man-61', 'ultimate-spider-man-62',
      'ultimate-spider-man-63', 'ultimate-spider-man-64',
    ],
    blurb: "The Ultimate line's own take, unrelated to the 1992 original.",
  },
  {
    key: 'ultimate-hobgoblin',
    name: "Hobgoblin",
    year: 2005,
    issues: [
      'ultimate-spider-man-72', 'ultimate-spider-man-73', 'ultimate-spider-man-74',
      'ultimate-spider-man-75', 'ultimate-spider-man-76', 'ultimate-spider-man-77',
    ],
    blurb: "Harry Osborn's turn, retold for the new continuity.",
  },
  {
    key: 'ultimate-clone-saga',
    name: "The Clone Saga",
    year: 2006,
    issues: [
      'ultimate-spider-man-97', 'ultimate-spider-man-98', 'ultimate-spider-man-99',
      'ultimate-spider-man-100', 'ultimate-spider-man-101', 'ultimate-spider-man-102',
      'ultimate-spider-man-103', 'ultimate-spider-man-104', 'ultimate-spider-man-105',
    ],
    blurb: "Nine issues doing in one title what the original took seventy-six and six titles to do.",
  },
  {
    key: 'ultimate-death-of-a-goblin',
    name: "Death of a Goblin",
    year: 2007,
    issues: [
      'ultimate-spider-man-112', 'ultimate-spider-man-113', 'ultimate-spider-man-114',
      'ultimate-spider-man-115', 'ultimate-spider-man-116', 'ultimate-spider-man-117',
    ],
    blurb: "The Ultimate line settles its own Goblin thread.",
  },
  {
    key: 'ultimate-war-of-symbiotes',
    name: "War of the Symbiotes",
    year: 2008,
    issues: [
      'ultimate-spider-man-123', 'ultimate-spider-man-124', 'ultimate-spider-man-125',
      'ultimate-spider-man-126', 'ultimate-spider-man-127', 'ultimate-spider-man-128',
    ],
    blurb: "Venom and Carnage, this continuity's versions.",
  },
  {
    key: 'ultimatum',
    name: "Ultimatum",
    year: 2008,
    issues: [
      'ultimate-spider-man-annual-3', 'ultimate-spider-man-129', 'ultimate-spider-man-130',
      'ultimate-spider-man-131', 'ultimate-spider-man-132', 'ultimate-spider-man-133',
    ],
    blurb: "The event that ends this volume at #133.",
    crossover: true,
  },

  /* ==================================================================== 2010s
     Read off the StoryArc and Event fields of all 280 issues of the decade.
     The scan found 43 arcs; these are the twenty-one worth navigating by.

     Spider-Verse is the one the universe model was waiting for: it gathers
     versions of the character from continuities that otherwise never touch.
     The Ultimate entries at the end stay on their own side of the fork.
     ==================================================================== */
  {
    key: 'spider-island',
    name: "Spider-Island",
    year: 2011,
    issues: [
      'amazing-spider-man-v2-659', 'amazing-spider-man-v2-660', 'amazing-spider-man-v2-662',
      'amazing-spider-man-v2-663', 'amazing-spider-man-v2-664', 'amazing-spider-man-v2-665',
      'amazing-spider-man-v2-666', 'amazing-spider-man-v2-667', 'amazing-spider-man-v2-668',
      'amazing-spider-man-v2-669', 'amazing-spider-man-v2-670', 'amazing-spider-man-v2-671',
      'amazing-spider-man-v2-672', 'amazing-spider-man-v2-673',
    ],
    blurb: "Manhattan gets his powers, all of it at once. Fourteen parts.",
    crossover: true,
  },
  {
    key: 'ends-of-the-earth',
    name: "Ends of the Earth",
    year: 2012,
    issues: [
      'amazing-spider-man-v2-682', 'amazing-spider-man-v2-683', 'amazing-spider-man-v2-684',
      'amazing-spider-man-v2-685', 'amazing-spider-man-v2-686', 'amazing-spider-man-v2-687',
    ],
    blurb: "Doctor Octopus, dying, makes his last play global.",
  },
  {
    key: 'dying-wish',
    name: "Dying Wish",
    year: 2013,
    issues: [
      'amazing-spider-man-v2-698', 'amazing-spider-man-v2-699', 'amazing-spider-man-v2-700',
    ],
    blurb: "The three issues that close volume two and hand the book to somebody else.",
  },
  {
    key: 'my-own-worst-enemy',
    name: "My Own Worst Enemy",
    year: 2013,
    issues: [
      'superior-spider-man-1', 'superior-spider-man-2', 'superior-spider-man-3',
      'superior-spider-man-4', 'superior-spider-man-5',
    ],
    blurb: "Octavius takes the role seriously, which is what makes the run work.",
  },
  {
    key: 'necessary-evil',
    name: "Necessary Evil",
    year: 2013,
    issues: [
      'superior-spider-man-17', 'superior-spider-man-18', 'superior-spider-man-19',
    ],
    blurb: "The Superior run at its least comfortable.",
  },
  {
    key: 'darkest-hours',
    name: "Darkest Hours",
    year: 2014,
    issues: [
      'superior-spider-man-22', 'superior-spider-man-23', 'superior-spider-man-24',
      'superior-spider-man-25',
    ],
    blurb: "The arrangement starts coming apart.",
  },
  {
    key: 'parker-luck',
    name: "Parker Luck",
    year: 2014,
    issues: [
      'amazing-spider-man-v3-1', 'amazing-spider-man-v3-2', 'amazing-spider-man-v3-3',
      'amazing-spider-man-v3-4', 'amazing-spider-man-v3-5', 'amazing-spider-man-v3-6',
    ],
    blurb: "Peter picks his own book back up after a year away from it.",
  },
  {
    key: 'spider-verse',
    name: "Spider-Verse",
    year: 2014,
    issues: [
      'superior-spider-man-32', 'superior-spider-man-33', 'amazing-spider-man-v3-7',
      'amazing-spider-man-v3-8', 'amazing-spider-man-v3-9', 'amazing-spider-man-v3-10',
      'amazing-spider-man-v3-11', 'amazing-spider-man-v3-12', 'amazing-spider-man-v3-13',
      'amazing-spider-man-v3-14', 'amazing-spider-man-v3-15',
    ],
    blurb: "Every Spider-Man from every continuity, hunted at once. The event the universe model exists for.",
    crossover: true,
  },
  {
    key: 'worldwide',
    name: "Worldwide",
    year: 2015,
    issues: [
      'amazing-spider-man-v4-1', 'amazing-spider-man-v4-2', 'amazing-spider-man-v4-3',
      'amazing-spider-man-v4-4', 'amazing-spider-man-v4-5',
    ],
    blurb: "Parker Industries goes global, and so does the book.",
  },
  {
    key: 'clone-conspiracy',
    name: "Dead No More: The Clone Conspiracy",
    year: 2016,
    issues: [
      'amazing-spider-man-v4-16', 'amazing-spider-man-v4-17', 'amazing-spider-man-v4-18',
      'amazing-spider-man-v4-19', 'amazing-spider-man-v4-20', 'amazing-spider-man-v4-21',
      'amazing-spider-man-v4-22', 'amazing-spider-man-v4-23', 'amazing-spider-man-v4-24',
    ],
    blurb: "Twenty years on, the clone premise returns on purpose rather than by accident.",
    crossover: true,
  },
  {
    key: 'civil-war-ii',
    name: "Civil War II",
    year: 2016,
    issues: [
      'spider-man-miles-v2-6', 'spider-man-miles-v2-7', 'spider-man-miles-v2-8',
      'spider-man-miles-v2-9', 'spider-man-miles-v2-10',
    ],
    blurb: "The second registration fight reaches Miles rather than Peter.",
    crossover: true,
  },
  {
    key: 'secret-empire',
    name: "Secret Empire",
    year: 2017,
    issues: [
      'amazing-spider-man-v4-29', 'amazing-spider-man-v4-30', 'amazing-spider-man-v4-31',
    ],
    blurb: "A line-wide event passes through the title.",
    crossover: true,
  },
  {
    key: 'osborn-identity',
    name: "The Osborn Identity",
    year: 2017,
    issues: [
      'amazing-spider-man-v4-25', 'amazing-spider-man-v4-26', 'amazing-spider-man-v4-27',
      'amazing-spider-man-v4-28',
    ],
    blurb: "Norman Osborn without the Goblin, which turns out to be worse.",
  },
  {
    key: 'fall-of-parker',
    name: "Fall of Parker",
    year: 2017,
    issues: [
      'amazing-spider-man-v4-789', 'amazing-spider-man-v4-790', 'amazing-spider-man-v4-791',
    ],
    blurb: "Parker Industries collapses and the status quo resets again.",
  },
  {
    key: 'go-down-swinging',
    name: "Go Down Swinging",
    year: 2018,
    issues: [
      'amazing-spider-man-v4-797', 'amazing-spider-man-v4-798', 'amazing-spider-man-v4-799',
      'amazing-spider-man-v4-800',
    ],
    blurb: "The last arc of volume four, and of that creative run.",
  },
  {
    key: 'back-to-basics',
    name: "Back to Basics",
    year: 2018,
    issues: [
      'amazing-spider-man-v5-1', 'amazing-spider-man-v5-2', 'amazing-spider-man-v5-3',
      'amazing-spider-man-v5-4', 'amazing-spider-man-v5-5',
    ],
    blurb: "Volume five opens by putting everything back where it was.",
  },
  {
    key: 'hunted',
    name: "Hunted",
    year: 2019,
    issues: [
      'amazing-spider-man-v5-16', 'amazing-spider-man-v5-17', 'amazing-spider-man-v5-18',
      'amazing-spider-man-v5-19', 'amazing-spider-man-v5-20', 'amazing-spider-man-v5-21',
      'amazing-spider-man-v5-22', 'amazing-spider-man-v5-23',
    ],
    blurb: "Kraven's family again, thirty-two years after the first hunt.",
  },
  {
    key: 'sins-rising',
    name: "Sins Rising",
    year: 2020,
    issues: [
      'amazing-spider-man-v5-45', 'amazing-spider-man-v5-46', 'amazing-spider-man-v5-47',
      'amazing-spider-man-v5-48', 'amazing-spider-man-v5-49',
    ],
    blurb: "The last arc inside this range.",
  },
  {
    key: 'ultimate-prowler',
    name: "Prowler",
    year: 2012,
    issues: [
      'ultimate-comics-spider-man-6', 'ultimate-comics-spider-man-7', 'ultimate-comics-spider-man-8',
      'ultimate-comics-spider-man-9', 'ultimate-comics-spider-man-10', 'ultimate-comics-spider-man-11',
      'ultimate-comics-spider-man-12',
    ],
    blurb: "Miles' second year, in the parallel continuity.",
  },
  {
    key: 'ultimate-united-we-stand',
    name: "United We Stand",
    year: 2012,
    issues: [
      'ultimate-comics-spider-man-15', 'ultimate-comics-spider-man-16', 'ultimate-comics-spider-man-17',
      'ultimate-comics-spider-man-18',
    ],
    blurb: "The Ultimate line's own crossover reaches his book.",
  },
  {
    key: 'ultimate-venom-war',
    name: "Venom War",
    year: 2013,
    issues: [
      'ultimate-comics-spider-man-19', 'ultimate-comics-spider-man-20', 'ultimate-comics-spider-man-21',
      'ultimate-comics-spider-man-22',
    ],
    blurb: "That continuity settles its own symbiote thread.",
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
