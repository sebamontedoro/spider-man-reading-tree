/**
 * Arc colours — a duo per arc, taken from whoever is at its centre.
 *
 * A ninth hand-curated layer, and the only one that is purely presentation:
 * nothing here changes what an issue is, only how an arc is recognised.
 *
 * The point is the picker. Eighty-six arcs in an alphabetical list are eighty-
 * six names to read; with a colour on each, "the Kraven one" and "the black
 * suit one" are found before the name is. So the pairs are the character's own
 * palette rather than a spread of hues assigned for contrast — Kraven's lion
 * mane against the suit he buries Peter in, the Sin-Eater's slate and blood,
 * Kingpin's ivory and magenta.
 *
 * Only arcs with a visual signature that obvious are listed. The rest derive a
 * flat swatch from the series they mostly run in, which is honest about the
 * difference: a split square is a curated arc, a solid one is a derived one.
 *
 * Colours are written as they are, for the light skin. Painting them on the
 * void ground is src/lib/palette.js's job — Kingpin's ivory and the black
 * suit's black cannot both be legible against both grounds unlifted, and
 * keeping two hand-tuned sets in step is the maintenance nobody does.
 */

export const ARC_PALETTE = {
  origin:                       ['#cf1d24', '#1b40b0'],  // the first costume
  'goblin-unmasked':            ['#2f7d32', '#6a2fa0'],  // the Green Goblin
  'master-planner':             ['#3f7d20', '#d4a017'],  // Doctor Octopus
  'six-arms':                   ['#cf1d24', '#6b8f3a'],  // the mutation
  'gwen-stacy':                 ['#2e8b57', '#6a2fa0'],  // Gwen's coat, the Goblin
  'clone-saga-original':        ['#4e8c3a', '#a8102b'],  // the Jackal, the clone
  'a-new-goblin':               ['#2f7d32', '#d4630f'],  // the Goblin who follows
  'jean-dewolff':               ['#4a5568', '#8b1a1a'],  // slate and blood
  'black-suit':                 ['#14110f', '#dcdce4'],  // the suit, its white spider
  'hobgoblin-mystery':          ['#d4630f', '#1b40b0'],  // the Hobgoblin
  'gang-war':                   ['#d8d2c4', '#a02060'],  // Kingpin's ivory
  'kravens-last-hunt':          ['#b5852f', '#14110f'],  // the mane, the buried suit
  inferno:                      ['#e2571e', '#a01020'],  // hellfire
  'missing-in-action':          ['#4a5568', '#0d7a6b'],  // the eastern bloc
  'cult-of-love':               ['#7226a8', '#c2407e'],  // the cult
  'assassin-nation-plot':       ['#b0b6bd', '#cf1d24'],  // Silver Sable
  'return-of-the-sinister-six': ['#3f7d20', '#6a2fa0'],  // the Sinister Six
}
