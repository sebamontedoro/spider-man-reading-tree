/**
 * Which character this page shows, and that character's data.
 *
 * The character is the first segment of the path — /spider-man/, /daredevil/ —
 * and is settled before anything that reads a tree is imported. Every module
 * that builds from the data does so once, at load, from `ACTIVE.data`; so
 * main.jsx calls `boot()` first and only then imports the app. Changing
 * character is a page load, which is what keeps all of that module-scope work
 * correct without a second code path for "the tree changed under me".
 *
 * It also moves visitors off the hostnames that served one tree before there
 * were several, and brings their browser storage with them — reading
 * positions and skin live in localStorage, which is per origin, so a plain
 * redirect would have silently thrown every one of them away.
 */

import { CHARACTER_BY_KEY, CHARACTERS, DEFAULT_CHARACTER } from '../../data/characters.js'

/** The one site every tree now lives on. */
const HOME_HOST = 'comics.lan'

/**
 * What the browser remembers, shared by every tree: issue ids are global, so a
 * position saved reading Daredevil #16 from one tree is the same issue in the
 * other. The prefix is historical — renaming it would lose what is stored.
 */
export const STORAGE = {
  reading: 'spider-man:reading:v1',
  skin: 'spider-man:skin:v1',
}

export const ACTIVE = { key: null, meta: null, data: null }

export const characterFromPath = (pathname) => {
  const first = String(pathname || '').split('/').filter(Boolean)[0]
  return CHARACTER_BY_KEY[first] ? first : null
}

/** The trees there are, for the switcher. */
export const ALL_CHARACTERS = CHARACTERS

/* -- moving off a legacy hostname ------------------------------------------ */

const IMPORT = /^#\/import\/([^/]*)\/?/

const storageGet = (k) => { try { return localStorage.getItem(k) } catch { return null } }
const storageSet = (k, v) => { try { localStorage.setItem(k, v) } catch { /* nowhere to put it */ } }

/** On an old hostname: pack up storage and go home, keeping the route. */
function leaveLegacyHost(key) {
  const payload = {}
  for (const k of Object.values(STORAGE)) {
    const v = storageGet(k)
    if (v !== null) payload[k] = v
  }
  const route = window.location.hash.replace(/^#\/?/, '')
  const carried = Object.keys(payload).length
    ? `#/import/${encodeURIComponent(JSON.stringify(payload))}/${route}`
    : route ? `#/${route}` : ''
  window.location.replace(`${window.location.protocol}//${HOME_HOST}/${key}/${carried}`)
}

/**
 * On arrival: merge what an old hostname sent. Reading positions are merged
 * per issue, the more recent winning, so arriving twice — or after reading a
 * little here first — never rolls a position back. A skin already chosen
 * here stays chosen.
 */
function absorbImport() {
  const m = IMPORT.exec(window.location.hash)
  if (!m) return
  try {
    const payload = JSON.parse(decodeURIComponent(m[1]))
    const theirs = JSON.parse(payload[STORAGE.reading] || '{}')
    const ours = JSON.parse(storageGet(STORAGE.reading) || '{}')
    for (const [id, p] of Object.entries(theirs)) {
      if (!ours[id] || (p.at || 0) > (ours[id].at || 0)) ours[id] = p
    }
    storageSet(STORAGE.reading, JSON.stringify(ours))
    if (payload[STORAGE.skin] && storageGet(STORAGE.skin) === null) {
      storageSet(STORAGE.skin, payload[STORAGE.skin])
    }
  } catch { /* a mangled payload is dropped, not fatal */ }
  const rest = window.location.hash.replace(IMPORT, '')
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${rest ? `#/${rest}` : ''}`)
}

/* -- boot ------------------------------------------------------------------- */

/**
 * Settles the character and loads its tree. Resolves false when the page is
 * leaving instead — a legacy hostname redirecting — so nothing renders.
 */
export async function boot() {
  const pathKey = characterFromPath(window.location.pathname)

  const legacy = CHARACTERS.find((c) => c.legacyHosts?.includes(window.location.hostname))
  if (legacy) {
    leaveLegacyHost(pathKey || legacy.key)
    return false
  }

  absorbImport()

  // The skin is stamped here rather than waiting for skin.js, which only loads
  // with the app — after the tree has downloaded. Until then the page would sit
  // in the light palette and flip.
  const skin = storageGet(STORAGE.skin)
  if (skin === 'light' || skin === 'dark') document.documentElement.dataset.theme = skin

  // A bare / or an unknown path is the default tree, and says so in the
  // address bar, so a link copied from it keeps working when there are more.
  const key = pathKey || DEFAULT_CHARACTER
  if (!pathKey) {
    window.history.replaceState(null, '', `/${key}/${window.location.search}${window.location.hash}`)
  }

  const meta = CHARACTER_BY_KEY[key]
  ACTIVE.key = key
  ACTIVE.meta = meta
  ACTIVE.data = await meta.load()

  document.documentElement.dataset.character = key
  document.title = `${meta.name} Reading Tree`
  return true
}
