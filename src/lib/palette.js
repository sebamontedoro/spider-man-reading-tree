/**
 * Painting an arc's colours on whichever ground is under them.
 *
 * The duos in data/arc-palette.js are written once, as the character wears
 * them. On the light skin they are used as they are; on the void ground the
 * dark half of a pair disappears — the black suit's black and Kraven's near-
 * black would both read as a hole in the row.
 *
 * So a lightness floor is applied at paint time instead of a second hand-tuned
 * set being kept in step with the first. The floor is a token (--arc-lift):
 * zero in the light skin, high enough in the dark one that ivory and black both
 * survive. Reading it from the CSS is what keeps the two skins from needing a
 * branch in here.
 */

import { useEffect, useState } from 'react'

import { ARC_PALETTE } from '../../data/arc-palette.js'

/** #rrggbb → {h, s, l}, all 0..1. */
function toHsl(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  if (!d) return { h: 0, s: 0, l }
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = (max === r ? (g - b) / d + (g < b ? 6 : 0)
           : max === g ? (b - r) / d + 2
           : (r - g) / d + 4) / 6
  return { h, s, l }
}

function toHex({ h, s, l }) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const channel = (t) => {
    t = (t + 1) % 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 0.5) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const pair = (v) => Math.round(v * 255).toString(16).padStart(2, '0')
  return '#' + pair(channel(h + 1 / 3)) + pair(channel(h)) + pair(channel(h - 1 / 3))
}

/**
 * Raised to the floor, and saturated a little as it goes: lightening alone
 * turns a deep colour into a pastel, and a quarter of the lift back into
 * saturation keeps it recognisable as the same colour.
 */
function lift(hex, floor) {
  if (!floor) return hex
  const c = toHsl(hex)
  if (c.l >= floor) return hex
  return toHex({ h: c.h, s: Math.min(c.s + (floor - c.l) * 0.25, 1), l: floor })
}

/** The floor the current skin asks for. Zero anywhere it cannot be read. */
export function arcLift() {
  if (typeof window === 'undefined') return 0
  const v = getComputedStyle(document.documentElement).getPropertyValue('--arc-lift')
  return Number(v) || 0
}

/**
 * The two colours for an arc, ready to paint.
 *
 * An arc with no curated pair gets a flat swatch in the accent of the series
 * it mostly runs in — same colour twice, which is what makes a derived arc
 * look different from a curated one without anyone having to say so.
 */
export function arcDuo(arcKey, fallbackAccent = 'asm', floor = arcLift()) {
  const curated = ARC_PALETTE[arcKey]
  if (curated) return curated.map((c) => lift(c, floor))
  const derived = `var(--s-${fallbackAccent})`
  return [derived, derived]
}

export const isCurated = (arcKey) => Boolean(ARC_PALETTE[arcKey])

/** A duo as a background, split on the diagonal. */
export function duoBackground(duo) {
  const [a, b] = duo
  return a === b ? a : `linear-gradient(135deg, ${a} 0 50%, ${b} 50% 100%)`
}

/**
 * The lift, kept current across a change of skin.
 *
 * The floor is read from the CSS, so React has no idea it moved when the
 * system flips to dark. Without this the swatches keep the light skin's
 * colours until something else happens to re-render them, which on a picker
 * that only paints when it opens can be a while.
 */
export function useArcLift() {
  const [floor, setFloor] = useState(arcLift)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setFloor(arcLift())
    mq.addEventListener('change', sync)
    // An explicit choice stamps the root instead of moving the media query.
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => { mq.removeEventListener('change', sync); obs.disconnect() }
  }, [])
  return floor
}
