/**
 * Which skin the page wears, and remembering the choice.
 *
 * Three states, not two. The default is to follow the machine, and a plain
 * toggle cannot express that — once it is flipped there is no way back to
 * "whatever the system says", which is what most people want most of the time
 * and the only setting that follows a laptop from day into evening.
 *
 * An explicit choice stamps data-theme on the root, which is what the token
 * blocks in tokens.css are keyed on; the system setting stamps nothing and
 * lets prefers-color-scheme decide.
 *
 * Stored in localStorage like the reading positions, and for the same reason:
 * it is per browser, it never leaves the machine, and storage can be
 * unavailable — a private window, blocked site data — so every access is
 * guarded and failure degrades to following the system.
 */

import { useSyncExternalStore } from 'react'

const KEY = 'spider-man:skin:v1'

export const SYSTEM = 'system'
export const LIGHT = 'light'
export const DARK = 'dark'

export const SKINS = [
  { key: SYSTEM, label: 'System' },
  { key: LIGHT, label: 'Spider-Man' },
  { key: DARK, label: 'Venom' },
]

const read = () => {
  try {
    const v = localStorage.getItem(KEY)
    return v === LIGHT || v === DARK ? v : SYSTEM
  } catch {
    return SYSTEM
  }
}

let state = read()
const listeners = new Set()

/** The stamp has to be on the root before first paint, or the page flashes the
 *  other skin. Called at module load, which is before React mounts. */
function apply(skin) {
  if (typeof document === 'undefined') return
  if (skin === SYSTEM) delete document.documentElement.dataset.theme
  else document.documentElement.dataset.theme = skin
}

apply(state)

export function setSkin(skin) {
  state = skin
  try {
    if (skin === SYSTEM) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, skin)
  } catch { /* nothing to remember it with; the page still changes */ }
  apply(skin)
  listeners.forEach((fn) => fn())
}

const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const useSkin = () =>
  useSyncExternalStore(subscribe, () => state, () => SYSTEM)
