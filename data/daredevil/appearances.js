/**
 * Guest appearances in books Daredevil does not headline.
 *
 * Empty until curated, and curated by the rules of data/spider-man/appearances.js:
 * narrative weight, never a cameo; whole events only where his own book
 * afterwards treats them as settled fact. The Shadowland and Devil's Reign
 * tie-ins start here, if they earn it.
 *
 * An issue that is a lead issue in another tree keeps that tree's id —
 * Amazing Spider-Man #16 is `amazing-spider-man-16` here too.
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
