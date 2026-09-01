/**
 * What is actually on the shelf, and which issue each file is.
 *
 * The reader service knows about files and nothing about the reading tree; it
 * hands back, for every archive, the issue ids that archive *could* be, best
 * guess first. This module does the matching, because the dataset lives here:
 * the first candidate that names a real issue wins.
 *
 * That split is what lets the two move independently. Extending the tree to
 * cover more issues changes nothing on the server, and dropping a folder of
 * comics onto the shelf changes nothing in the bundle.
 *
 * A missing service is a normal state, not an error: the site is still a
 * reading guide without it, so the shelf resolves to empty and the reader
 * simply never offers itself.
 */

import { useEffect, useState } from 'react'
import { ISSUE_BY_ID } from './dataset.js'

const API = '/api'

/** issueId → { key, file, bytes } for the archive that holds it. */
const resolve = (manifest) => {
  const byIssue = new Map()
  const spare = []

  for (const comic of manifest.comics || []) {
    const id = (comic.ids || []).find((c) => ISSUE_BY_ID.has(c) && !byIssue.has(c))
    if (id) byIssue.set(id, { key: comic.key, file: comic.file, bytes: comic.bytes })
    // Files whose number matches no issue in the tree — annuals the tree does
    // not reach yet, point issues the generator does not model. Counted so the
    // gap is visible rather than silently swallowed.
    else spare.push(comic)
  }

  return { byIssue, unmatched: spare, total: manifest.count || 0 }
}

const EMPTY = { byIssue: new Map(), unmatched: [], total: 0 }

let cached = null

export function loadShelf() {
  if (cached) return cached
  cached = fetch(`${API}/library`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then(resolve)
    .catch(() => EMPTY)
  return cached
}

/**
 * The shelf, once it arrives. Starts empty so the timeline paints without
 * waiting on a service that may not be running at all.
 */
export function useShelf() {
  const [shelf, setShelf] = useState(EMPTY)

  useEffect(() => {
    let live = true
    loadShelf().then((s) => { if (live) setShelf(s) })
    return () => { live = false }
  }, [])

  return shelf
}

/* -- one comic -------------------------------------------------------------- */

/** Page count and page names. The bytes themselves come one page at a time. */
export const fetchComic = (key) =>
  fetch(`${API}/comic/${key}`).then((r) =>
    r.ok ? r.json() : Promise.reject(new Error(`could not open the comic (HTTP ${r.status})`)),
  )

/** The URL of one page, 1-based. Cached hard by the browser — see the ETag. */
export const pageUrl = (key, n) => `${API}/comic/${key}/page/${n}`
