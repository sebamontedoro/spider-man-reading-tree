/**
 * Milestones in the Daredevil tree — the moments that make the timeline read
 * as a story. Shape and rules as in data/spider-man/milestones.js; types from
 * data/milestone-types.js.
 *
 * How these were chosen, 2026-09-11. Every issue page of the tree was read off
 * Marvel Database. Debuts are the pages' own {{1st}} markers, kept when the
 * character went on to matter — measured, as a first cut, by how many issues
 * of this tree they appear in (Karen Page 252, Bullseye 145, Elektra 183) and
 * then judged. Deaths are the pages' {{Death}} markers, and each was read in
 * context before it went in, because the marker lies in two directions:
 *
 *   It marks recaps. Karen Page "dies" again in vol. 5 #600 and Elektra in
 *   #208 — both {{RecapOnly}}, a panel remembering an older death.
 *   It misses real ones. Karen's death in vol. 2 #5 carries no marker at all;
 *   it is in the synopsis.
 *
 * Status changes were confirmed from each issue's synopsis. Where a recent
 * page has no synopsis to confirm against — most of 2022 on — nothing went
 * in on the strength of a marker alone: the deaths marked in vol. 7 #9 and
 * #12, Daredevil & Echo #3, vol. 8 #19 and Unleash Hell #3 are left out until
 * they can be read. That is why the last years here are thin.
 *
 * A status-quo milestone makes its issue a key issue — see src/lib/dataset.js
 * — so that type is used only for changes that stay changed.
 */

export const MILESTONES = [
  /* ============================================================== 1960s */
  {
    issue: 'daredevil-1',
    type: 'debut',
    character: ['Daredevil', 'Foggy Nelson', 'Karen Page'],
    label: 'Daredevil, Foggy and Karen',
    blurb: 'The origin: the accident, the heightened senses, the law firm and the suit.',
  },
  {
    issue: 'daredevil-1',
    type: 'death',
    label: 'Battlin’ Jack Murdock is killed',
    blurb: 'Murdered for refusing to throw a fight. The reason the costume exists.',
  },
  { issue: 'daredevil-3', type: 'debut', character: 'The Owl', label: 'The Owl debuts' },
  { issue: 'daredevil-4', type: 'debut', character: 'The Purple Man', label: 'The Purple Man debuts' },
  { issue: 'daredevil-6', type: 'debut', character: 'Mister Fear', label: 'Mister Fear debuts' },
  {
    issue: 'daredevil-7',
    type: 'status-quo',
    label: 'The red costume',
    blurb: 'The yellow suit is gone, first worn in a fight with Namor that he loses.',
  },
  { issue: 'daredevil-8', type: 'debut', character: 'Stilt-Man', label: 'Stilt-Man debuts' },
  { issue: 'daredevil-18', type: 'debut', character: 'The Gladiator', label: 'The Gladiator debuts' },
  { issue: 'daredevil-39', type: 'debut', character: 'Death-Stalker', label: 'The Exterminator, later Death-Stalker' },
  { issue: 'daredevil-42', type: 'debut', character: 'The Jester', label: 'The Jester debuts' },

  /* ============================================================== 1970s */
  { issue: 'daredevil-78', type: 'debut', character: 'Man-Bull', label: 'Man-Bull debuts' },
  {
    issue: 'daredevil-87',
    type: 'status-quo',
    label: 'West, with the Black Widow',
    blurb: 'Matt and Natasha move to San Francisco together.',
  },
  { issue: 'daredevil-126', type: 'debut', character: 'Heather Glenn', label: 'Heather Glenn debuts' },
  {
    issue: 'daredevil-131',
    type: 'debut',
    character: 'Bullseye',
    label: 'Bullseye debuts',
    blurb: 'The enemy who will keep taking the people around him.',
  },
  { issue: 'daredevil-153', type: 'debut', character: 'Ben Urich', label: 'Ben Urich debuts' },

  /* ============================================================== 1980s */
  {
    issue: 'daredevil-164',
    type: 'status-quo',
    label: 'Ben Urich learns who he is',
    blurb: 'The reporter works it out, and Matt tells him the whole story.',
  },
  {
    issue: 'daredevil-168',
    type: 'debut',
    character: 'Elektra',
    label: 'Elektra debuts',
    blurb: 'Introduced as someone he already loved, years before the book began.',
  },
  { issue: 'daredevil-174', type: 'debut', character: 'The Hand', label: 'The Hand debuts' },
  { issue: 'daredevil-176', type: 'debut', character: 'Stick', label: 'Stick debuts' },
  {
    issue: 'daredevil-181',
    type: 'death',
    label: 'Elektra is killed',
    blurb: 'Bullseye kills her with her own sai.',
  },
  { issue: 'daredevil-187', type: 'debut', character: 'The Chaste', label: 'The Chaste debuts' },
  {
    issue: 'daredevil-189',
    type: 'death',
    label: 'Stick dies',
    blurb: 'He gives his life against the Hand to save Matt.',
  },
  {
    issue: 'daredevil-190',
    type: 'status-quo',
    label: 'Elektra lives again',
    blurb: 'The Hand begins the resurrection, and Stone of the Chaste finishes it.',
  },
  { issue: 'daredevil-220', type: 'death', label: 'Heather Glenn dies' },
  {
    issue: 'daredevil-227',
    type: 'status-quo',
    label: 'Born Again: his secret is sold',
    blurb: 'Karen, broke and addicted, sells his identity. It reaches the Kingpin.',
  },
  {
    issue: 'daredevil-229',
    type: 'debut',
    character: 'Sister Maggie',
    label: 'Sister Maggie debuts',
    blurb: 'The nun who takes him in turns out to be his mother.',
  },
  { issue: 'daredevil-232', type: 'debut', character: 'Nuke', label: 'Nuke debuts' },
  { issue: 'daredevil-254', type: 'debut', character: 'Typhoid Mary', label: 'Typhoid Mary debuts' },
  { issue: 'daredevil-262', type: 'event', label: 'Inferno reaches Hell’s Kitchen' },
  { issue: 'daredevil-275', type: 'event', label: 'Acts of Vengeance' },

  /* ============================================================== 1990s */
  {
    issue: 'daredevil-300',
    type: 'status-quo',
    label: 'The Kingpin falls',
    blurb: 'Fisk is exposed at last, and Matt gets his law license back.',
  },
  {
    issue: 'daredevil-v2-5',
    type: 'death',
    label: 'Karen Page is killed',
    blurb: 'Bullseye throws the billy club at Matt; she steps into its path.',
  },
  { issue: 'daredevil-v2-9', type: 'debut', character: 'Echo', label: 'Echo debuts' },

  /* ============================================================== 2000s */
  {
    issue: 'daredevil-v2-32',
    type: 'status-quo',
    label: 'His identity is in the papers',
    blurb: 'A tabloid prints that Matt Murdock is Daredevil. He denies it.',
  },
  { issue: 'daredevil-v2-41', type: 'debut', character: 'Milla Donovan', label: 'Milla Donovan debuts' },
  {
    issue: 'daredevil-v2-50',
    type: 'status-quo',
    label: 'Kingpin of Hell’s Kitchen',
    blurb: 'He beats Fisk down and takes the title for himself.',
  },
  {
    issue: 'daredevil-v2-57',
    type: 'status-quo',
    label: 'Matt and Milla are married',
  },
  {
    issue: 'daredevil-v2-81',
    type: 'status-quo',
    label: 'Matt Murdock goes to prison',
    blurb: 'Sent to Rikers to await trial, beside men he put there.',
  },
  { issue: 'daredevil-v2-111', type: 'debut', character: 'Lady Bullseye', label: 'Lady Bullseye debuts' },
  {
    issue: 'daredevil-v2-501',
    type: 'status-quo',
    label: 'Daredevil leads the Hand',
    blurb: 'He takes command of the order that has hunted him since the Miller years.',
  },

  /* ============================================================== 2010s */
  { issue: 'shadowland-1', type: 'event', label: 'Shadowland' },
  {
    issue: 'shadowland-1',
    type: 'death',
    label: 'Daredevil kills Bullseye',
    blurb: 'The line the character was built on, crossed.',
  },
  { issue: 'daredevil-v3-1', type: 'debut', character: 'Kirsten McDuffie', label: 'Kirsten McDuffie debuts' },
  {
    issue: 'daredevil-v3-36',
    type: 'status-quo',
    label: 'He tells the world',
    blurb: 'In the open, and then before a court, Matt admits he is Daredevil.',
  },
  {
    issue: 'daredevil-v4-1',
    type: 'status-quo',
    label: 'Moves to San Francisco',
    blurb: 'A public figure now, he starts over on the other coast.',
  },
  {
    issue: 'daredevil-v5-1',
    type: 'status-quo',
    label: 'Back in New York, as a prosecutor',
    blurb: 'Home again, working for the District Attorney, with Blindspot in tow.',
  },
  { issue: 'daredevil-v5-11', type: 'debut', character: 'Muse', label: 'Muse debuts' },
  {
    issue: 'daredevil-v5-595',
    type: 'status-quo',
    label: 'Mayor Fisk',
    blurb: 'The Kingpin wins an election and runs the city.',
  },
  { issue: 'daredevil-v6-1', type: 'debut', character: 'Detective Cole North', label: 'Detective Cole North debuts' },

  /* ============================================================== 2020s */
  {
    issue: 'daredevil-v6-25',
    type: 'status-quo',
    label: 'Elektra wears the horns',
    blurb: 'With Matt serving his sentence, she takes the name to the streets.',
  },
  { issue: 'daredevil-v6-26', type: 'event', label: 'King in Black' },
  {
    issue: 'devils-reign-1',
    type: 'event',
    label: 'Devil’s Reign',
    blurb: 'Mayor Fisk turns the city against its costumed heroes.',
  },
  { issue: 'daredevil-gang-war-1', type: 'event', label: 'Gang War' },
]

/** Milestones grouped by issue id — one issue can carry several. */
export const MILESTONES_BY_ISSUE = MILESTONES.reduce((acc, m) => {
  ;(acc[m.issue] ||= []).push(m)
  return acc
}, {})
