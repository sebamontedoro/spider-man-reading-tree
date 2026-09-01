/**
 * Where you got to, per issue.
 *
 * Read/unread tracking was deliberately left out of the first pass, and this
 * brings back only the part the reader cannot do without: a comic you close on
 * page nine should open on page nine. Everything else — the marker on the card,
 * the "unread" filter — falls out of that one fact for free.
 *
 * It lives in localStorage, so it is per browser and never leaves the machine.
 * There are no accounts here and nothing to sync; a reading position is not
 * worth a database. Storage can be unavailable (private windows, blocked site
 * data), so every access is guarded and failure degrades to "no memory of
 * where you were" rather than a broken reader.
 */

import { useSyncExternalStore } from 'react'

const KEY = 'spider-man:reading:v1'

/** A comic is "read" once you reach the last page, not when you open it. */
/** Not on the shelf at all — no local file matches this issue. */
export const ABSENT = 0
export const SHELVED = 1   // on the shelf, never opened
export const READING = 2
export const READ = 3

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

let state = read()
const listeners = new Set()

const commit = (next) => {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Quota or a blocked store: the session keeps working, it just forgets.
  }
  for (const l of listeners) l()
}

const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/* -- reading ---------------------------------------------------------------- */

export const progressFor = (id) => state[id] || null

/** SHELVED / READING / READ for an issue known to be on the shelf. */
export const statusOf = (id) => {
  const p = state[id]
  if (!p) return SHELVED
  if (p.done) return READ
  return p.page > 1 ? READING : SHELVED
}

/** The whole map, for components that need to react to any change. */
export const useProgress = () => useSyncExternalStore(subscribe, () => state, () => state)

/* -- writing ---------------------------------------------------------------- */

export const recordPage = (id, page, pages) => {
  const prev = state[id]
  // Reaching the last page marks it read, and it stays read afterwards: paging
  // back to re-read a panel should not un-finish the issue.
  const done = Boolean(prev?.done) || (pages > 0 && page >= pages)
  if (prev && prev.page === page && prev.pages === pages && prev.done === done) return
  commit({ ...state, [id]: { page, pages, done, at: Date.now() } })
}

/**
 * Marking an issue read jumps the position to the end; marking it unread sends
 * it back to the cover. "Unread" is a statement that you have not read it, so
 * the next open should start at page one rather than where you happened to
 * stop.
 */
export const setRead = (id, done) => {
  const prev = state[id] || { page: 1, pages: 0 }
  commit({
    ...state,
    [id]: { ...prev, done, page: done ? (prev.pages || prev.page) : 1, at: Date.now() },
  })
}

export const forget = (id) => {
  if (!state[id]) return
  const next = { ...state }
  delete next[id]
  commit(next)
}

export const forgetAll = () => commit({})
