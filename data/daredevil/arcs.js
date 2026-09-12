/**
 * Story arcs and events in the Daredevil tree. Empty until curated; shape and
 * rules as in data/spider-man/arcs.js — `issues` in reading order, blurbs our
 * own and spoiler-light.
 */

export const ARCS = []

export const ARCS_SORTED = [...ARCS].sort((a, b) => a.year - b.year)

export const ARCS_BY_KEY = Object.fromEntries(ARCS.map((a) => [a.key, a]))
