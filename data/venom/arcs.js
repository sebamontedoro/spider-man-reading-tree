/**
 * Story arcs and events in the Venom tree. Shape and rules as in
 * data/spider-man/arcs.js: `issues` in reading order, blurbs our own and
 * spoiler-light, `crossover: true` where the arc runs through more than one
 * title.
 *
 * Where the names and ranges come from, 2026-09-12. Marvel Database tags most
 * of this tree's arcs in each issue's StoryArc or Event field, and those are
 * used as tagged. Others come from story titles that carry the arc's name and
 * part ("Kindred Spirits, Part 2"). The Spider-Man-book stories of 1984-93
 * predate both habits and are named by their first chapter or their subject,
 * as the Spider-Man tree names them where it has them.
 *
 * READING ORDER is, by default, the order the issues shipped, from each
 * page's release date — not cover month, which puts a crossover's weekly
 * parts in the wrong order. Maximum Carnage is the case in point: its fourteen
 * numbered parts rotate through four titles, one a week. Where a crossover
 * numbers its parts, the numbering is followed as printed. And where the story
 * runs against the shipping, the story wins: Amazing Spider-Man #252 shipped
 * seven months before Secret Wars #8, the issue that explains the costume it
 * opens with, and is read after it.
 *
 * The nineties miniseries are not arcs here: each one is a series of its own,
 * already a pick in the series picker.
 */


export const ARCS = [
  {
    key: 'black-suit',
    name: 'The Alien Costume',
    year: 1984,
    issues: [
      'secret-wars-8', 'amazing-spider-man-252', 'amazing-spider-man-258',
      'web-of-spider-man-1',
    ],
    blurb: 'A black costume from Battleworld that turns out to be alive, and will not let go.',
    crossover: true,
  },
  {
    key: 'venom-arrives',
    name: 'Venom',
    year: 1988,
    issues: [
      'amazing-spider-man-298', 'amazing-spider-man-299', 'amazing-spider-man-300',
    ],
    blurb: 'Eddie Brock and the rejected costume find each other.',
  },
  {
    key: 'venom-returns',
    name: 'Venom Returns',
    year: 1989,
    issues: [
      'amazing-spider-man-315', 'amazing-spider-man-316', 'amazing-spider-man-317',
    ],
    blurb: 'Out of prison and after Spider-Man again.',
  },
  {
    key: 'styx-and-stone',
    name: 'Styx and Stone',
    year: 1990,
    issues: [
      'amazing-spider-man-332', 'amazing-spider-man-333',
    ],
    blurb: 'Venom, Styx and Stone, and Spider-Man in between.',
  },
  {
    key: 'the-boneyard-hop',
    name: 'The Cellmate',
    year: 1991,
    issues: [
      'amazing-spider-man-344', 'amazing-spider-man-345', 'amazing-spider-man-346',
      'amazing-spider-man-347',
    ],
    blurb: 'Eddie shares a cell with Cletus Kasady, then takes Spider-Man to an island to finish it.',
  },
  {
    key: 'carnage-arrives',
    name: 'Carnage',
    year: 1992,
    issues: [
      'amazing-spider-man-360', 'amazing-spider-man-361', 'amazing-spider-man-362',
      'amazing-spider-man-363',
    ],
    blurb: 'Kasady gets a symbiote of his own, and Spider-Man needs Venom to stop him.',
  },
  {
    key: 'bride-of-venom',
    name: 'The Bride of Venom',
    year: 1993,
    issues: [
      'amazing-spider-man-374', 'amazing-spider-man-375',
    ],
    blurb: 'Anne Weying, and the deal that ends the hunt.',
  },
  {
    key: 'maximum-carnage',
    name: 'Maximum Carnage',
    year: 1993,
    issues: [
      'spider-man-unlimited-1', 'web-of-spider-man-101', 'amazing-spider-man-378',
      'spider-man-1990-35', 'peter-parker-spectacular-201', 'web-of-spider-man-102',
      'amazing-spider-man-379', 'spider-man-1990-36', 'peter-parker-spectacular-202',
      'web-of-spider-man-103', 'amazing-spider-man-380', 'spider-man-1990-37',
      'peter-parker-spectacular-203', 'spider-man-unlimited-2',
    ],
    blurb: 'Carnage breaks out of Ravencroft and gathers a family of killers; every Spider-Man title, for fourteen weeks.',
    crossover: true,
  },
  {
    key: 'planet-of-the-symbiotes',
    name: 'Planet of the Symbiotes',
    year: 1995,
    issues: [
      'amazing-spider-man-super-special-1', 'spider-man-super-special-1', 'venom-super-special-1',
      'spectacular-spider-man-super-special-1', 'web-of-spider-man-super-special-1',
    ],
    blurb: 'Eddie begins to doubt the symbiote, and more of its kind reach Earth.',
    crossover: true,
  },
  {
    key: 'web-of-carnage',
    name: 'Web of Carnage',
    year: 1996,
    issues: [
      'sensational-spider-man-3', 'amazing-spider-man-410', 'spider-man-1990-67',
      'peter-parker-spectacular-233',
    ],
    blurb: 'Carnage against Ben Reilly’s Spider-Man, and a symbiote that will not stay with one host.',
    crossover: true,
  },
  {
    key: 'the-hunger',
    name: 'The Hunger',
    year: 2003,
    issues: [
      'spectacular-spider-man-v2-1', 'spectacular-spider-man-v2-2', 'spectacular-spider-man-v2-3',
      'spectacular-spider-man-v2-4', 'spectacular-spider-man-v2-5',
    ],
    blurb: 'Eddie Brock at the end of his rope, and a symbiote that wants to feed.',
  },
  {
    key: 'venomous',
    name: 'Venomous',
    year: 2004,
    issues: [
      'marvel-knights-spider-man-5', 'marvel-knights-spider-man-6', 'marvel-knights-spider-man-7',
      'marvel-knights-spider-man-8',
    ],
    blurb: 'Venom in the Marvel Knights Spider-Man run.',
  },
  {
    key: 'last-temptation-of-eddie-brock',
    name: 'The Last Temptation of Eddie Brock',
    year: 2007,
    issues: [
      'sensational-spider-man-v2-38', 'sensational-spider-man-v2-39',
    ],
    blurb: 'Eddie, dying, and the part of him that was Venom.',
  },
  {
    key: 'new-ways-to-die',
    name: 'New Ways to Die',
    year: 2008,
    issues: [
      'amazing-spider-man-v2-568', 'amazing-spider-man-v2-569', 'amazing-spider-man-v2-570',
      'amazing-spider-man-v2-571', 'amazing-spider-man-v2-572', 'amazing-spider-man-v2-573',
    ],
    blurb: 'The Thunderbolts come to New York, and Eddie Brock comes back as Anti-Venom.',
    crossover: true,
  },
  {
    key: 'shiver',
    name: 'Shiver',
    year: 2003,
    issues: [
      'venom-1', 'venom-2', 'venom-3',
      'venom-4', 'venom-5',
    ],
    blurb: 'A research station in the Arctic, and something in it.',
  },
  {
    key: 'run',
    name: 'Run',
    year: 2003,
    issues: [
      'venom-6', 'venom-7', 'venom-8',
      'venom-9', 'venom-10',
    ],
    blurb: 'On foot through Alaska, with the soldier who survived the station.',
  },
  {
    key: 'patterns',
    name: 'Patterns',
    year: 2004,
    issues: [
      'venom-11', 'venom-12', 'venom-13',
    ],
    blurb: 'A detour into the past: Venom and Spider-Man, two years before.',
  },
  {
    key: 'twist',
    name: 'Twist',
    year: 2004,
    issues: [
      'venom-14', 'venom-15', 'venom-16',
      'venom-17', 'venom-18',
    ],
    blurb: 'S.H.I.E.L.D. closes in.',
  },
  {
    key: 'spider-island',
    name: 'Spider-Island',
    year: 2011,
    issues: [
      'venom-v2-6', 'venom-v2-7', 'venom-v2-8',
    ],
    blurb: 'The Venom issues of the Spider-Island event.',
    crossover: true,
  },
  {
    key: 'road-trip',
    name: 'Road Trip',
    year: 2011,
    issues: [
      'venom-v2-10', 'venom-v2-11', 'venom-v2-12',
    ],
    blurb: 'Flash on the road.',
  },
  {
    key: 'circle-of-four',
    name: 'Circle of Four',
    year: 2012,
    issues: [
      'venom-v2-13', 'venom-v2-13.1', 'venom-v2-13.2',
      'venom-v2-13.3', 'venom-v2-13.4', 'venom-v2-14',
    ],
    blurb: 'Venom, Red Hulk, X-23 and Ghost Rider, as one team.',
  },
  {
    key: 'savage-six',
    name: 'Savage Six',
    year: 2012,
    issues: [
      'venom-v2-17', 'venom-v2-18', 'venom-v2-19',
      'venom-v2-20', 'venom-v2-21',
    ],
    blurb: 'The Crime-Master’s Savage Six, and the people around Flash in the line of fire.',
  },
  {
    key: 'monsters-of-evil',
    name: 'Monsters of Evil',
    year: 2012,
    issues: [
      'venom-v2-23', 'venom-v2-24', 'venom-v2-25',
    ],
    blurb: 'Flash against the Monsters of Evil.',
  },
  {
    key: 'minimum-carnage',
    name: 'Minimum Carnage',
    year: 2012,
    issues: [
      'minimum-carnage-alpha-1', 'venom-v2-26', 'scarlet-spider-v2-10',
      'venom-v2-27', 'scarlet-spider-v2-11', 'minimum-carnage-omega-1',
    ],
    blurb: 'Carnage in the Microverse, with Venom and the Scarlet Spider after him.',
    crossover: true,
  },
  {
    key: 'kindred-spirits',
    name: 'Kindred Spirits',
    year: 2013,
    issues: [
      'venom-v2-37', 'venom-v2-38', 'venom-v2-39',
    ],
    blurb: 'A three-part story near the end of Flash’s run.',
  },
  {
    key: 'mania',
    name: 'Mania',
    year: 2013,
    issues: [
      'venom-v2-40', 'venom-v2-41', 'venom-v2-42',
    ],
    blurb: 'Andi Benton’s symbiote, and the Devil’s mark on it.',
  },
  {
    key: 'the-one-that-got-away',
    name: 'The One That Got Away',
    year: 2016,
    issues: [
      'carnage-v2-1', 'carnage-v2-2', 'carnage-v2-3',
      'carnage-v2-4', 'carnage-v2-5',
    ],
    blurb: 'A task force built to bring Carnage in.',
  },
  {
    key: 'sea-devil',
    name: 'Sea Devil',
    year: 2016,
    issues: [
      'carnage-v2-6', 'carnage-v2-7', 'carnage-v2-8',
      'carnage-v2-9', 'carnage-v2-10',
    ],
    blurb: 'Carnage and the Darkhold.',
  },
  {
    key: 'what-dwells-beneath',
    name: 'What Dwells Beneath',
    year: 2016,
    issues: [
      'carnage-v2-11', 'carnage-v2-12', 'carnage-v2-13',
      'carnage-v2-14', 'carnage-v2-15', 'carnage-v2-16',
    ],
    blurb: 'The Darkhold story’s end.',
  },
  {
    key: 'land-before-crime',
    name: 'The Land Before Crime',
    year: 2017,
    issues: [
      'venom-v3-151', 'venom-v3-152', 'venom-v3-153',
    ],
    blurb: 'Something in the subway tunnels.',
  },
  {
    key: 'lethal-protector-2017',
    name: 'Lethal Protector',
    year: 2017,
    issues: [
      'venom-v3-155', 'venom-v3-156', 'venom-v3-157',
      'venom-v3-158',
    ],
    blurb: 'Lee Price, in a prison full of people who want him dead.',
  },
  {
    key: 'venom-inc',
    name: 'Venom Inc.',
    year: 2018,
    issues: [
      'amazing-spider-man-venom-inc-alpha-1', 'amazing-spider-man-v4-792', 'venom-v3-159',
      'amazing-spider-man-v4-793', 'venom-v3-160', 'amazing-spider-man-venom-inc-omega-1',
    ],
    blurb: 'Lee Price comes back with a symbiote and a business plan.',
    crossover: true,
  },
  {
    key: 'poison-x',
    name: 'Poison-X',
    year: 2018,
    issues: [
      'x-men-blue-annual-1', 'x-men-blue-21', 'venom-v3-162',
      'x-men-blue-22', 'venom-v3-163',
    ],
    blurb: 'Venom and the time-displaced X-Men against the Poisons.',
    crossover: true,
  },
  {
    key: 'the-nativity',
    name: 'The Nativity',
    year: 2018,
    issues: [
      'venom-v3-164', 'venom-v3-165',
    ],
    blurb: 'The symbiote is keeping a secret.',
  },
  {
    key: 'venomverse',
    name: 'Venomverse',
    year: 2017,
    issues: [
      'edge-of-venomverse-1', 'edge-of-venomverse-2', 'edge-of-venomverse-3',
      'edge-of-venomverse-4', 'edge-of-venomverse-5', 'venomverse-1',
      'venomverse-war-stories-1', 'venomverse-2', 'venomverse-3',
      'venomverse-4', 'venomverse-5',
    ],
    blurb: 'Venoms from across the multiverse, drafted for a war.',
    crossover: true,
  },
  {
    key: 'rex',
    name: 'Rex',
    year: 2018,
    issues: [
      'venom-v4-1', 'venom-v4-2', 'venom-v4-3',
      'venom-v4-4', 'venom-v4-5', 'venom-v4-6',
    ],
    blurb: 'Donny Cates begins: a symbiote dragon, and the name Knull.',
  },
  {
    key: 'abyss',
    name: 'Abyss',
    year: 2019,
    issues: [
      'venom-v4-9', 'venom-v4-10', 'venom-v4-11',
      'venom-v4-12',
    ],
    blurb: 'Eddie and the symbiote apart, and the truth about Dylan.',
  },
  {
    key: 'war-of-the-realms',
    name: 'War of the Realms',
    year: 2019,
    issues: [
      'venom-v4-13', 'venom-v4-14', 'venom-v4-15',
    ],
    blurb: 'The Venom issues of the War of the Realms.',
    crossover: true,
  },
  {
    key: 'absolute-carnage',
    name: 'Absolute Carnage',
    year: 2019,
    issues: [
      'free-comic-book-day-2019-spider-man-venom-1', 'absolute-carnage-1', 'absolute-carnage-separation-anxiety-1',
      'absolute-carnage-scream-1', 'absolute-carnage-lethal-protectors-1', 'absolute-carnage-2',
      'venom-v4-17', 'absolute-carnage-scream-2', 'venom-v4-18',
      'absolute-carnage-lethal-protectors-2', 'absolute-carnage-3', 'absolute-carnage-scream-3',
      'absolute-carnage-4', 'absolute-carnage-lethal-protectors-3', 'venom-v4-19',
      'absolute-carnage-5', 'venom-v4-20',
    ],
    blurb: 'Carnage hunts everyone who ever wore a symbiote.',
    crossover: true,
  },
  {
    key: 'venom-island',
    name: 'Venom Island',
    year: 2020,
    issues: [
      'venom-v4-21', 'venom-v4-22', 'venom-v4-23',
      'venom-v4-24', 'venom-v4-25',
    ],
    blurb: 'Knull is on the way, and Eddie has one thing to do first.',
  },
  {
    key: 'venom-beyond',
    name: 'Venom Beyond',
    year: 2020,
    issues: [
      'venom-v4-26', 'venom-v4-27', 'venom-v4-28',
      'venom-v4-29', 'venom-v4-30',
    ],
    blurb: 'Eddie, a long way from home.',
  },
  {
    key: 'king-in-black',
    name: 'King in Black',
    year: 2021,
    issues: [
      'web-of-venom-empyres-end-1', 'king-in-black-1', 'venom-v4-31',
      'king-in-black-2', 'venom-v4-32', 'king-in-black-planet-of-the-symbiotes-1',
      'king-in-black-gwenom-vs-carnage-1', 'king-in-black-3', 'king-in-black-gwenom-vs-carnage-2',
      'venom-v4-33', 'king-in-black-planet-of-the-symbiotes-2', 'king-in-black-4',
      'king-in-black-gwenom-vs-carnage-3', 'king-in-black-scream-1', 'king-in-black-planet-of-the-symbiotes-3',
      'king-in-black-5', 'venom-v4-34',
    ],
    blurb: 'Knull reaches Earth.',
    crossover: true,
  },
  {
    key: 'extreme-carnage',
    name: 'Extreme Carnage',
    year: 2021,
    issues: [
      'extreme-carnage-alpha-1', 'extreme-carnage-scream-1', 'extreme-carnage-phage-1',
      'extreme-carnage-lasher-1', 'extreme-carnage-riot-1', 'extreme-carnage-toxin-1',
      'extreme-carnage-agony-1', 'extreme-carnage-omega-1',
    ],
    blurb: 'Carnage returns, and the symbiote family closes ranks.',
    crossover: true,
  },
  {
    key: 'too-late-for-heroes',
    name: 'Too Late for Heroes',
    year: 2022,
    issues: [
      'venom-v5-6', 'venom-v5-7',
    ],
    blurb: 'Alchemax, Liz Allan, and what they want with Dylan.',
  },
  {
    key: 'venomworld',
    name: 'Venomworld',
    year: 2022,
    issues: [
      'venom-v5-11', 'venom-v5-12',
    ],
    blurb: 'Dylan trapped in Venomworld.',
  },
  {
    key: 'dark-web',
    name: 'Dark Web',
    year: 2022,
    issues: [
      'venom-v5-13', 'venom-v5-14', 'venom-v5-15',
      'venom-v5-16',
    ],
    blurb: 'The Venom issues of the Dark Web event.',
    crossover: true,
  },
  {
    key: 'a-wild-hunt',
    name: 'A Wild Hunt',
    year: 2022,
    issues: [
      'carnage-v3-4', 'carnage-v3-5',
    ],
    blurb: 'Carnage and its host fired into space, with a hunter behind them.',
  },
  {
    key: 'carnage-in-hell',
    name: 'Carnage in Hell',
    year: 2022,
    issues: [
      'carnage-v3-6', 'carnage-v3-7',
    ],
    blurb: 'The symbiote goes down to Hell.',
  },
  {
    key: 'carnage-reigns',
    name: 'Carnage Reigns',
    year: 2023,
    issues: [
      'carnage-reigns-alpha-1', 'miles-morales-spider-man-v2-6', 'carnage-v3-13',
      'red-goblin-5', 'carnage-v3-14', 'miles-morales-spider-man-v2-7',
      'carnage-reigns-omega-1',
    ],
    blurb: 'Carnage comes for Miles Morales and the Red Goblin.',
    crossover: true,
  },
  {
    key: 'state-of-grace',
    name: 'State of Grace',
    year: 2024,
    issues: [
      'venom-v5-26', 'venom-v5-27', 'venom-v5-28',
    ],
    blurb: 'A three-part story in Dylan’s run.',
  },
  {
    key: 'symbiosis-necrosis',
    name: 'Symbiosis Necrosis',
    year: 2024,
    issues: [
      'venom-v5-31', 'carnage-v4-5', 'venom-v5-32',
      'carnage-v4-6',
    ],
    blurb: 'Venom and Carnage, back to back.',
    crossover: true,
  },
  {
    key: 'blood-hunt',
    name: 'Blood Hunt',
    year: 2024,
    issues: [
      'venom-v5-33', 'venom-v5-34',
    ],
    blurb: 'The Venom issues of the Blood Hunt event.',
    crossover: true,
  },
  {
    key: 'venom-war',
    name: 'Venom War',
    year: 2024,
    issues: [
      'carnage-v4-8', 'venom-v5-35', 'venom-war-1',
      'venom-v5-36', 'venom-war-venomous-1', 'venom-war-carnage-1',
      'venom-war-zombiotes-1', 'venom-war-2', 'venom-war-carnage-2',
      'venom-v5-37', 'venom-war-lethal-protectors-1', 'venom-war-venomous-2',
      'venom-war-zombiotes-2', 'venom-war-3', 'venom-v5-38',
      'venom-war-venomous-3', 'venom-war-lethal-protectors-2', 'venom-war-carnage-3',
      'venom-war-zombiotes-3', 'venom-war-4', 'venom-v5-39',
      'venom-war-lethal-protectors-3', 'venom-war-5',
    ],
    blurb: 'Father against son for the suit.',
    crossover: true,
  },
  {
    key: 'death-spiral',
    name: 'Death Spiral',
    year: 2026,
    issues: [
      'amazing-spider-man-venom-death-spiral-1', 'amazing-spider-man-v7-23', 'venom-v6-255',
      'amazing-spider-man-v7-24', 'amazing-spider-man-v7-25', 'venom-v6-256',
      'amazing-spider-man-v7-26', 'venom-v6-257', 'amazing-spider-man-v7-27',
      'amazing-spider-man-venom-death-spiral-body-count-1',
    ],
    blurb: 'Nine parts across Venom and Amazing Spider-Man, and an epilogue.',
    crossover: true,
  },
  {
    key: 'queen-in-black',
    name: 'Queen in Black',
    year: 2026,
    issues: [
      'venom-v6-260', 'venom-v6-261', 'queen-in-black-1',
      'queen-in-black-venom-unchained-1', 'queen-in-black-2', 'queen-in-black-venom-unchained-2',
      'queen-in-black-3',
    ],
    blurb: 'Al Ewing’s 2026 event, as far as it has come out.',
    crossover: true,
  },
]

export const ARCS_SORTED = [...ARCS].sort((a, b) => a.year - b.year)

export const ARCS_BY_KEY = Object.fromEntries(ARCS.map((a) => [a.key, a]))
