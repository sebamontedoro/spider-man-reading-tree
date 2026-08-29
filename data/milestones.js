/**
 * Milestones — the moments that make the timeline readable as a story.
 *
 * A milestone is an editorial claim, not a mechanical extraction. The wiki
 * records 66 confirmed deaths and 45 apparent ones across this range, but most
 * are villains who were back within a year; listing them all would bury the
 * handful that actually changed the book. So the deaths below were verified
 * against Marvel Database, then filtered down by hand to the ones that matter.
 *
 * `type` drives the visual treatment:
 *   debut       a character arrives who mattered afterwards
 *   death       a character dies (apparent deaths are labelled as such)
 *   event       a crossover or line-wide event reaches Spider-Man
 *   status-quo  the premise of the book changes and does not change back
 *
 * `label` is what the timeline shows — keep it under about 40 characters, it
 * has to read at a glance while scrolling. `blurb` is the one-line expansion
 * shown in the detail panel. Both are our own words.
 *
 * One issue can carry several milestones: Amazing Fantasy #15 is both the
 * debut of Spider-Man and the death of Uncle Ben.
 *
 * A note on the nineties: the wiki's {{1st}} markers get unreliable from about
 * 1991 on — Carnage's arrival in Amazing #361 is tagged as a plain appearance,
 * and the marker sits on his host in #344 instead. So the debut entries for
 * that decade lean on what could be checked, and the decade's backbone here is
 * its deaths and its structural changes, both of which verified cleanly.
 */

export const MILESTONE_TYPES = {
  debut: {
    key: 'debut',
    label: 'Debut',
    glyph: '★',
    accent: 'var(--blue)',
    description: 'First appearance of a character who mattered afterwards',
  },
  death: {
    key: 'death',
    label: 'Death',
    glyph: '✝',
    accent: 'var(--red-deep)',
    description: 'A character dies',
  },
  event: {
    key: 'event',
    label: 'Event',
    glyph: '◈',
    accent: 'var(--s-mtu)',
    description: 'A crossover or line-wide event reaches Spider-Man',
  },
  'status-quo': {
    key: 'status-quo',
    label: 'Status quo',
    glyph: '⟳',
    accent: 'var(--s-spec-mag)',
    description: 'The premise of the book changes for good',
  },
  universe: {
    key: 'universe',
    label: 'New continuity',
    glyph: '⑂',
    accent: 'var(--s-ultimate)',
    description: 'A separate continuity begins — the tree forks here',
  },
}

export const MILESTONES = [
  /* ============================================================== 1960s */
  {
    issue: 'amazing-fantasy-15',
    type: 'debut',
    label: 'Spider-Man debuts',
    blurb: 'Sixteen pages at the back of an anthology already cancelled.',
  },
  {
    issue: 'amazing-fantasy-15',
    type: 'death',
    label: 'Uncle Ben is killed',
    blurb: 'The death the entire character is built on, in his very first story.',
  },
  {
    issue: 'amazing-spider-man-1',
    type: 'debut',
    label: 'J. Jonah Jameson and the Chameleon',
    blurb: 'The ongoing begins, and with it the Bugle and the money problems.',
  },
  { issue: 'amazing-spider-man-3',  type: 'debut', label: 'Doctor Octopus debuts' },
  { issue: 'amazing-spider-man-6',  type: 'debut', label: 'The Lizard debuts' },
  { issue: 'amazing-spider-man-9',  type: 'debut', label: 'Electro debuts' },
  { issue: 'amazing-spider-man-13', type: 'debut', label: 'Mysterio debuts' },
  {
    issue: 'amazing-spider-man-14',
    type: 'debut',
    label: 'The Green Goblin debuts',
    blurb: 'His identity would stay hidden for another twenty-five issues.',
  },
  { issue: 'amazing-spider-man-15', type: 'debut', label: 'Kraven the Hunter debuts' },
  { issue: 'amazing-spider-man-20', type: 'debut', label: 'The Scorpion debuts' },
  {
    issue: 'amazing-spider-man-31',
    type: 'debut',
    label: 'Gwen Stacy and Harry Osborn',
    blurb: 'Two of the core supporting cast arrive, in the issue that opens the Master Planner saga.',
  },
  {
    issue: 'amazing-spider-man-39',
    type: 'status-quo',
    label: 'The Goblin is unmasked',
    blurb: 'Romita takes over the art and the Goblin turns out to be someone already in the cast.',
  },
  { issue: 'amazing-spider-man-41', type: 'debut', label: 'The Rhino debuts' },
  { issue: 'amazing-spider-man-42', type: 'debut', label: 'Mary Jane Watson, revealed' },
  {
    issue: 'amazing-spider-man-50',
    type: 'debut',
    label: 'The Kingpin debuts',
    blurb: 'A villain who would outgrow this title entirely.',
  },
  {
    issue: 'amazing-spider-man-50',
    type: 'status-quo',
    label: 'Peter quits being Spider-Man',
    blurb: 'The first of many retirements, and the template for all of them.',
  },

  /* ============================================================== 1970s */
  {
    issue: 'amazing-spider-man-90',
    type: 'death',
    label: 'Captain George Stacy dies',
    blurb: 'A death the book refuses to undo, and the first that sticks.',
  },
  {
    issue: 'amazing-spider-man-96',
    type: 'status-quo',
    label: 'Published without Comics Code approval',
    blurb: 'Marvel ran the story over the Code authority’s objection, and the Code changed soon after.',
  },
  { issue: 'amazing-spider-man-101', type: 'debut', label: 'Morbius debuts' },
  { issue: 'amazing-spider-man-113', type: 'debut', label: 'Hammerhead debuts' },
  {
    issue: 'amazing-spider-man-121',
    type: 'death',
    label: 'Gwen Stacy dies',
    blurb: 'The issue usually named as the end of the Silver Age of comics.',
  },
  {
    issue: 'amazing-spider-man-122',
    type: 'death',
    label: 'The Green Goblin dies — apparently',
    blurb: 'Filed by Marvel Database as an apparent death, and rightly: he was brought back two decades later.',
  },
  { issue: 'amazing-spider-man-124', type: 'debut', label: 'Man-Wolf debuts' },
  {
    issue: 'amazing-spider-man-129',
    type: 'debut',
    label: 'The Punisher and the Jackal',
    blurb: 'A one-off antagonist who did not stay one.',
  },
  {
    issue: 'amazing-spider-man-149',
    type: 'status-quo',
    label: 'The clone story reaches its climax',
    blurb: 'It left a question open that the 1990s would spend years reopening.',
  },
  {
    issue: 'amazing-spider-man-180',
    type: 'death',
    label: 'The third Green Goblin dies',
    blurb: 'Closes the 1970s run of claimants to the identity.',
  },
  { issue: 'marvel-team-up-65',       type: 'debut', label: 'Arcade, and Captain Britain in the US' },
  { issue: 'peter-parker-spectacular-25', type: 'debut', label: 'Carrion debuts' },
  {
    issue: 'peter-parker-spectacular-1',
    type: 'status-quo',
    label: 'A second monthly title launches',
    blurb: 'From here the character carries more than one ongoing book at a time.',
  },
  { issue: 'amazing-spider-man-194', type: 'debut', label: 'The Black Cat debuts' },

  /* ============================================================== 1980s */
  {
    issue: 'amazing-spider-man-238',
    type: 'debut',
    label: 'The Hobgoblin debuts',
    blurb: 'An identity deliberately left open, then left open by accident for years.',
  },
  {
    issue: 'amazing-spider-man-245',
    type: 'death',
    label: 'The decoy Hobgoblin dies',
    blurb: 'Planted and discarded to keep the real identity in play.',
  },
  {
    issue: 'secret-wars-8',
    type: 'event',
    label: 'Secret Wars: the black costume',
    blurb: 'Where the costume actually comes from. Read before Amazing #252.',
  },
  {
    issue: 'amazing-spider-man-252',
    type: 'status-quo',
    label: 'The black costume arrives',
    blurb: 'Brought back from a crossover happening in another book entirely.',
  },
  {
    issue: 'amazing-spider-man-258',
    type: 'status-quo',
    label: 'The costume is alive',
    blurb: 'It turns out not to be cloth.',
  },
  {
    issue: 'peter-parker-spectacular-107',
    type: 'death',
    label: 'Jean DeWolff is murdered',
    blurb: 'Opens the hardest-edged story the Spectacular run attempted.',
  },
  {
    issue: 'web-of-spider-man-1',
    type: 'status-quo',
    label: 'A third ongoing launches',
    blurb: 'Into the monthly slot Marvel Team-Up had just vacated.',
  },
  {
    issue: 'web-of-spider-man-31',
    type: 'event',
    label: 'Kraven’s Last Hunt begins',
    blurb: 'Six parts across all three titles, and the decade’s most acclaimed story.',
  },
  {
    issue: 'amazing-spider-man-294',
    type: 'death',
    label: 'Kraven the Hunter dies',
    blurb: 'By his own hand, and it held for over twenty years.',
  },
  {
    issue: 'amazing-spider-man-annual-21',
    type: 'status-quo',
    label: 'Peter and Mary Jane marry',
    blurb: 'Timed to a live ceremony staged at a baseball stadium.',
  },
  {
    issue: 'peter-parker-spectacular-136',
    type: 'death',
    label: 'The Sin-Eater dies',
    blurb: 'Closing the thread opened by the DeWolff murder three years earlier.',
  },
  {
    issue: 'amazing-spider-man-298',
    type: 'debut',
    label: 'Venom, in glimpses',
    blurb: 'McFarlane starts as regular artist and the new villain gets a brief first look.',
  },
  {
    issue: 'amazing-spider-man-300',
    type: 'debut',
    label: 'Venom, in full',
    blurb: 'The best-known issue of the era, and the one that reset the title’s fortunes.',
  },
  {
    issue: 'web-of-spider-man-63',
    type: 'death',
    label: 'Ned Leeds dies',
    blurb: 'A supporting character since the 1960s, killed off inside the Hobgoblin mystery.',
  },
  {
    issue: 'amazing-spider-man-311',
    type: 'event',
    label: 'Inferno reaches the Spider-Man titles',
    blurb: 'Eight tie-in issues across all three ongoing books.',
  },

  /* ============================================================== 1990 */
  {
    issue: 'peter-parker-spectacular-158',
    type: 'event',
    label: 'Acts of Vengeance begins',
    blurb: 'Twelve issues across the three titles; Spider-Man briefly holds cosmic power.',
  },
  {
    issue: 'amazing-spider-man-334',
    type: 'event',
    label: 'The Sinister Six return',
    blurb: 'The villain team reassembles after twenty-five years apart.',
  },

  /* ============================================================== 1990s */
  {
    issue: 'spider-man-1990-1',
    type: 'status-quo',
    label: 'A fourth ongoing, built around an artist',
    blurb: 'Launched for McFarlane as writer-artist, and one of the best-selling comics ever printed.',
  },
  {
    issue: 'amazing-spider-man-344',
    type: 'debut',
    label: 'Cletus Kasady appears',
    blurb: 'The man who would become Carnage, seventeen issues before the symbiote finds him.',
  },
  {
    issue: 'amazing-spider-man-360',
    type: 'debut',
    label: 'Carnage arrives',
    blurb: 'A cameo first — his full appearance is the following issue. The symbiote spawns an offspring and the decade gets its villain.',
  },
  {
    issue: 'peter-parker-spectacular-200',
    type: 'death',
    label: 'Harry Osborn dies',
    blurb: 'The last of the original supporting cast to take the Goblin identity, and the end of that thread.',
  },
  {
    issue: 'web-of-spider-man-109',
    type: 'death',
    label: 'Calypso dies',
  },
  {
    issue: 'spider-man-1990-48',
    type: 'death',
    label: 'Demogoblin dies',
  },
  {
    issue: 'spider-man-1990-55',
    type: 'death',
    label: 'The Grim Hunter dies',
    blurb: 'Kraven’s son, killed off two years after taking up his father’s name.',
  },
  {
    issue: 'peter-parker-spectacular-221',
    type: 'death',
    label: 'Doctor Octopus dies',
    blurb: 'The oldest surviving villain in the book, killed off after thirty-one years.',
  },
  {
    issue: 'spider-man-1990-52',
    type: 'debut',
    label: 'The Scarlet Spider',
    blurb: 'Ben Reilly takes a costume and a name of his own, nineteen years after first appearing as a clone.',
  },
  {
    issue: 'web-of-spider-man-117',
    type: 'debut',
    label: 'Judas Traveller',
    blurb: 'The figure the Clone Saga was built around, arriving as it begins.',
  },
  {
    issue: 'web-of-spider-man-119',
    type: 'debut',
    label: 'Kaine',
    blurb: 'The clone that came out wrong, and the saga\u2019s most durable creation.',
  },
  {
    issue: 'amazing-spider-man-400',
    type: 'death',
    label: 'Aunt May dies — or an impostor does',
    blurb: 'Marvel Database files the death against an impostor, which is how it was later undone.',
  },
  {
    issue: 'spider-man-1990-75',
    type: 'status-quo',
    label: 'The Clone Saga ends',
    blurb: 'Two years of it, resolved in the issue where the title also drops its original name.',
  },
  {
    issue: 'sensational-spider-man-0',
    type: 'status-quo',
    label: 'Web of Spider-Man is replaced',
    blurb: 'The rotation keeps four monthly books, but swaps one of them out.',
  },
  {
    issue: 'spider-man-1990-47',
    type: 'debut',
    label: 'The Grim Hunter',
    blurb: 'Kraven\u2019s son takes up his father\u2019s name, eight years after his death.',
  },
  {
    issue: 'spider-man-unlimited-1',
    type: 'debut',
    label: 'Shriek',
    blurb: 'Introduced in the quarterly, and central to Maximum Carnage a year later.',
  },
  {
    issue: 'web-of-spider-man-86',
    type: 'debut',
    label: 'Demogoblin',
    blurb: 'The Hobgoblin\u2019s demon half, split off into its own villain.',
  },
  {
    issue: 'amazing-scarlet-spider-1',
    type: 'debut',
    label: 'A second Scarlet Spider',
    blurb: 'A government-made impostor, launched in one of the four Scarlet Spider titles.',
  },
  {
    issue: 'amazing-spider-man-441',
    type: 'status-quo',
    label: 'Volume one ends at #441',
    blurb: 'Thirty-five years and 441 issues, cancelled to make room for a renumbering.',
  },

  /* ============================================================== 2000s */
  {
    issue: 'amazing-spider-man-v2-500',
    type: 'status-quo',
    label: 'The original numbering returns',
    blurb: 'The volume keeps its number but resumes the count it abandoned in 1998, jumping from #58 to #500.',
  },
  {
    issue: 'civil-war-2',
    type: 'status-quo',
    label: 'He unmasks on television',
    blurb: 'A secret kept for forty-four years, given up voluntarily. It happens in the event itself, not in his own title \u2014 the Amazing issues of these months are tie-ins running beside it.',
  },
  {
    issue: 'amazing-spider-man-v2-545',
    type: 'status-quo',
    label: 'The marriage is undone',
    blurb: 'One More Day trades twenty years of continuity away. The most argued-over decision in the character’s publishing history.',
  },
  {
    issue: 'amazing-spider-man-v2-546',
    type: 'status-quo',
    label: 'Brand New Day, three times a month',
    blurb: 'The line collapses to a single title shipping thrice monthly — more issues a year than the whole of the sixties.',
  },
  {
    issue: 'amazing-spider-man-v2-600',
    type: 'status-quo',
    label: 'Issue 600',
    blurb: 'Reached under the restored numbering, forty-seven years after Amazing Fantasy #15.',
  },
  {
    issue: 'ultimate-spider-man-133',
    type: 'event',
    label: 'Ultimatum ends the Ultimate volume',
    blurb: 'The parallel line closes its first run at #133, after nine years.',
  },
  {
    issue: 'ultimate-spider-man-1',
    type: 'universe',
    label: 'A second Spider-Man begins',
    blurb: 'The origin retold from scratch in a continuity of its own. Nothing before this leads into it, and nothing after it feeds back — the tree forks here and the two lines never rejoin.',
  },
  {
    issue: 'amazing-spider-man-v2-1',
    type: 'status-quo',
    label: 'The relaunch: back to #1',
    blurb: 'All four titles restart, and the line is cut from four books to two.',
  },
]

/** Milestones grouped by issue id — one issue can carry several. */
export const MILESTONES_BY_ISSUE = MILESTONES.reduce((acc, m) => {
  ;(acc[m.issue] ||= []).push(m)
  return acc
}, {})
