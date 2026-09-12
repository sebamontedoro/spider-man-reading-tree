/**
 * The characters this app holds a reading tree for.
 *
 * One app, one shelf, one reader; a tree per character. Each character owns a
 * folder in data/ with the same layers — series, overrides, appearances, arcs,
 * milestones, paths, arc colours — and everything else is shared: the verified
 * dates and Marvel ids (keyed by issue id, which is global), the shelf mapping,
 * the collected editions, and all of the code.
 *
 * Issue ids are global on purpose. Daredevil #16 is a guest appearance in the
 * Spider-Man tree and a lead issue in the Daredevil one, and both call it
 * `daredevil-16`: one file on the shelf, one reading position, one verified
 * date. A series key therefore means the same run in every tree — never reuse
 * one for something else.
 *
 * `load` is a dynamic import, so each character's data is its own chunk and a
 * page only downloads the tree it shows. Node can import this file too: the
 * imports only run when called.
 */

export const CHARACTERS = [
  {
    key: 'spider-man',
    name: 'Spider-Man',
    // The two skins are named for whoever wears each palette: the suit in
    // daylight, and the symbiote.
    skins: { light: 'Spider-Man', dark: 'Venom' },
    // Hostnames that served this tree alone before there were others. A visit
    // there moves to the shared site with its reading positions — see
    // src/lib/character.js.
    legacyHosts: ['spiderman.lan'],
    load: () => import('./spider-man/index.js'),
  },
  {
    key: 'daredevil',
    name: 'Daredevil',
    // The suit, and the one who wore it after him: Elektra's crimson on black.
    skins: { light: 'Daredevil', dark: 'Elektra' },
    legacyHosts: [],
    load: () => import('./daredevil/index.js'),
  },
  {
    key: 'venom',
    name: 'Venom',
    // The symbiote and its cure: Anti-Venom's white by day, Venom's black by
    // night. In the Spider-Man tree "Venom" is the dark mirror of the suit; here
    // it is the character himself.
    skins: { light: 'Anti-Venom', dark: 'Venom' },
    legacyHosts: [],
    load: () => import('./venom/index.js'),
  },
]

export const DEFAULT_CHARACTER = 'spider-man'

export const CHARACTER_BY_KEY = Object.fromEntries(CHARACTERS.map((c) => [c.key, c]))
