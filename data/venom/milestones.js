/**
 * Milestones in the Venom tree — the moments that make the timeline read as a
 * story. Shape and rules as in data/spider-man/milestones.js; types from
 * data/milestone-types.js.
 *
 * How these were chosen, 2026-09-12, by the method of the Daredevil tree.
 * Every issue page of the tree, and of its guest issues, was read off Marvel
 * Database. Debuts are the pages' own {{1st}} and {{1stas}} markers — the
 * second is how the wiki marks a new identity, She-Venom or Anti-Venom — kept
 * when the character went on to matter. Deaths and status changes were each
 * confirmed in a synopsis before they went in, because for symbiotes the
 * {{Death}} marker is close to useless: the five Life Foundation symbiotes
 * "die" in Lethal Protector #5 and are back a year later, and the Venom
 * symbiote is marked dead four times.
 *
 * Where a page has no synopsis, a change went in only if another page states
 * it: King in Black #5 has none, but Venom vol. 5 #1 and Extreme Carnage Alpha
 * both describe Eddie as the new King in Black. Venom War's ending and most
 * of 2025 on have nothing to confirm against, and are left out for now.
 *
 * A status-quo milestone makes its issue a key issue — see src/lib/dataset.js
 * — so that type marks a change of host, or of what the symbiote is for.
 */

export const MILESTONES = [
  /* ================================================== the costume, 1984 */
  {
    issue: 'amazing-spider-man-258',
    type: 'status-quo',
    label: 'The costume is alive',
    blurb: 'Reed Richards examines Spider-Man’s black costume and finds a living thing.',
  },

  /* ============================================================== 1988-93 */
  {
    issue: 'amazing-spider-man-300',
    type: 'debut',
    character: ['Venom', 'Eddie Brock'],
    label: 'Venom debuts',
    blurb: 'Eddie Brock and the rejected costume, both wanting Spider-Man dead.',
  },
  { issue: 'amazing-spider-man-344', type: 'debut', character: 'Cletus Kasady', label: 'Cletus Kasady debuts' },
  {
    issue: 'amazing-spider-man-360',
    type: 'debut',
    character: 'Carnage',
    label: 'Carnage debuts',
    blurb: 'The symbiote’s spawn, bonded to Eddie’s cellmate.',
  },
  {
    issue: 'venom-lethal-protector-1',
    type: 'status-quo',
    label: 'Lethal protector',
    blurb: 'He calls off the war on Spider-Man and moves to San Francisco to protect the innocent, his way.',
  },
  {
    issue: 'venom-lethal-protector-4',
    type: 'debut',
    character: ['Scream', 'Agony', 'Phage', 'Riot', 'Lasher'],
    label: 'The Life Foundation’s five',
    blurb: 'Seeds pulled out of Venom’s symbiote, made into five symbiote soldiers.',
  },

  /* ============================================================== 1995-96 */
  {
    issue: 'venom-sinner-takes-all-2',
    type: 'debut',
    character: 'She-Venom',
    label: 'Anne Weying as She-Venom',
    blurb: 'Wounded by the Sin-Eater, his ex-wife wears the symbiote herself.',
  },
  { issue: 'venom-along-came-a-spider-1', type: 'debut', character: 'Hybrid', label: 'Hybrid debuts' },

  /* ============================================================== 2003-10 */
  {
    issue: 'venom-1',
    type: 'debut',
    character: 'Mania',
    label: 'The clone symbiote',
    blurb: 'A copy of the Venom symbiote, loose in the Arctic. Years later it is Mania.',
  },
  {
    issue: 'venom-vs-carnage-2',
    type: 'debut',
    character: 'Toxin',
    label: 'Toxin is born',
    blurb: 'Carnage’s newborn spawn, bonded to a police officer.',
  },
  {
    issue: 'new-avengers-2',
    type: 'death',
    label: 'The Sentry tears Carnage in half',
    blurb: 'Out in space, at the end of the Raft breakout. He is back in 2010.',
  },
  {
    issue: 'amazing-spider-man-v2-569',
    type: 'debut',
    character: 'Anti-Venom',
    label: 'Anti-Venom',
    blurb: 'The symbiote reaches for Eddie again and becomes its own cure.',
  },
  { issue: 'carnage-4', type: 'debut', character: 'Scorn', label: 'Scorn debuts' },

  /* ============================================================== 2011-16 */
  {
    issue: 'amazing-spider-man-v2-654',
    type: 'status-quo',
    label: 'Flash Thompson is Venom',
    blurb: 'The government’s new soldier in the suit: Peter’s old bully, who lost his legs in Iraq.',
  },
  {
    issue: 'venom-v2-7',
    type: 'death',
    label: 'Flash’s father dies',
    blurb: 'Harrison Thompson and his son make their peace first.',
  },
  {
    issue: 'venom-v2-15',
    type: 'death',
    label: 'Scream and Hybrid are hunted down',
    blurb: 'Eddie Brock, crusading against the symbiotes, kills both hosts.',
  },
  {
    issue: 'venom-v2-17',
    type: 'status-quo',
    label: 'Eddie Brock becomes Toxin',
    blurb: 'The Crime-Master forces a symbiote on the man who hunts them.',
  },
  { issue: 'venom-v2-31', type: 'debut', character: 'Andi Benton', label: 'Andi Benton debuts', blurb: 'Later Mania.' },

  /* ============================================================== 2017-21 */
  {
    issue: 'venom-v3-1',
    type: 'status-quo',
    label: 'Lee Price takes the suit',
    blurb: 'Alone in New York, the symbiote bonds to an ex-soldier with nothing left to lose.',
  },
  {
    issue: 'venom-v3-6',
    type: 'status-quo',
    label: 'Eddie Brock is Venom again',
    blurb: 'He breaks the symbiote out of federal custody himself.',
  },
  { issue: 'venomverse-1', type: 'event', label: 'Venomverse' },
  {
    issue: 'venom-v3-165',
    type: 'debut',
    character: 'Sleeper',
    label: 'Venom’s spawn',
    blurb: 'Born in secret: the symbiote feared it would turn out like the others.',
  },
  { issue: 'amazing-spider-man-venom-inc-alpha-1', type: 'event', label: 'Venom Inc.' },
  {
    issue: 'amazing-spider-man-v4-800',
    type: 'death',
    label: 'Flash Thompson dies',
    blurb: 'Agent Anti-Venom does not survive the Red Goblin.',
  },
  { issue: 'venom-v4-1', type: 'debut', character: 'Grendel', label: 'Grendel debuts' },
  {
    issue: 'venom-v4-4',
    type: 'debut',
    character: 'Knull',
    label: 'Knull, god of the symbiotes',
    blurb: 'The dark god who forged the first of them, shown whole for the first time.',
  },
  { issue: 'venom-v4-7', type: 'debut', character: 'Dylan Brock', label: 'Dylan Brock debuts' },
  {
    issue: 'venom-v4-12',
    type: 'status-quo',
    label: 'Dylan is his son',
    blurb: 'The boy raised as Eddie’s little brother is Anne’s son, and his.',
  },
  { issue: 'absolute-carnage-1', type: 'event', label: 'Absolute Carnage' },
  {
    issue: 'absolute-carnage-5',
    type: 'death',
    label: 'Cletus Kasady is killed',
    blurb: 'Eddie cuts Dark Carnage in half to save Dylan, and Knull wakes.',
  },
  { issue: 'king-in-black-1', type: 'event', label: 'King in Black' },
  {
    issue: 'king-in-black-5',
    type: 'status-quo',
    label: 'Eddie Brock, King in Black',
    blurb: 'The war ends with Eddie as the new god of the symbiote hive.',
  },

  /* ============================================================== 2021-24 */
  {
    issue: 'extreme-carnage-alpha-1',
    type: 'event',
    label: 'Extreme Carnage',
    blurb: 'A surviving piece of Carnage bonds again, carrying Kasady’s mind with it.',
  },
  {
    issue: 'venom-v5-1',
    type: 'status-quo',
    label: 'Dylan Brock is Venom',
    blurb: 'Eddie is gone to the stars as King in Black; his son wears the suit now.',
  },
  { issue: 'venom-v5-1', type: 'debut', character: 'Meridius', label: 'Meridius debuts', blurb: 'An Eddie Brock from the future.' },
  {
    issue: 'carnage-v3-1',
    type: 'status-quo',
    label: 'Carnage without Kasady',
    blurb: 'The symbiote goes looking for a purpose of its own.',
  },
  {
    issue: 'venom-war-1',
    type: 'event',
    label: 'Venom War',
    blurb: 'Eddie comes back through time to take the symbiote from his son.',
  },
]

/** Milestones grouped by issue id — one issue can carry several. */
export const MILESTONES_BY_ISSUE = MILESTONES.reduce((acc, m) => {
  ;(acc[m.issue] ||= []).push(m)
  return acc
}, {})
