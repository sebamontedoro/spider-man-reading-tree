/**
 * Milestones in the Venom tree. Empty until curated; shape and rules as in
 * data/spider-man/milestones.js, types from data/milestone-types.js. Verify
 * each against Marvel Database before it goes in.
 */

export const MILESTONES = []

/** Milestones grouped by issue id — one issue can carry several. */
export const MILESTONES_BY_ISSUE = MILESTONES.reduce((acc, m) => {
  ;(acc[m.issue] ||= []).push(m)
  return acc
}, {})
