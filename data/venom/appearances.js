/**
 * Guest appearances in books no symbiote headlines.
 *
 * Empty until curated, and curated by the rules of data/spider-man/appearances.js:
 * narrative weight, never a cameo; whole events only where his own book
 * afterwards treats them as settled fact. The event tie-ins other heroes
 * headline — Absolute Carnage, King in Black, Venom War — start here, if they
 * earn it.
 *
 * An issue that is a lead issue in another tree keeps that tree's id —
 * Amazing Spider-Man #300 is `amazing-spider-man-300` here too.
 */

export const APPEARANCES = []

/** Defaults applied to every appearance unless the entry overrides them. */
export const APPEARANCE_DEFAULTS = {
  series: 'guest',
  universe: 'earth-616',
  accent: 'guest',
  role: 'guest',
  relevance: 'notable',
  dateExact: true,
  yearOnly: false,
  isAnnual: false,
  isReprint: false,
  outOfContinuity: false,
  generated: false,
}
