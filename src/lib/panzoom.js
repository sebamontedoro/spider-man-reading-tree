/**
 * Pan and zoom for a single comic page.
 *
 * Written by hand rather than delegated to the browser's own scrolling for one
 * reason: a comic page needs a two-finger pinch that zooms *the page*, not the
 * document. Native pinch scales the visual viewport, which on a full-screen
 * reader magnifies the toolbar along with the artwork and leaves the two out of
 * step. So the stage takes `touch-action: none` and every gesture is handled
 * here — one finger pans, two pinch, and a horizontal drag turns the page when
 * there is nothing to pan sideways.
 *
 * The page is drawn with `transform: translate(x, y) scale(k)` from a
 * `0 0` origin, so `x`/`y` are the image's top-left corner in stage
 * coordinates and the maths stays a plain affine transform in one space.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

export const FIT_PAGE = 'page'    // the whole page visible
export const FIT_WIDTH = 'width'  // fills the width, scrolls down

const MAX_SCALE = 8
const SWIPE_PX = 60       // shortest drag that counts as a page turn
const SWIPE_RATIO = 1.5   // …and how much more horizontal than vertical it must be

const boxOf = (el) => {
  const r = el?.getBoundingClientRect()
  return { width: r?.width || 0, height: r?.height || 0 }
}

const fitScale = (mode, nat, box) => {
  if (!nat?.w || !nat.h || !box.width || !box.height) return 1
  const byWidth = box.width / nat.w
  return mode === FIT_WIDTH ? byWidth : Math.min(byWidth, box.height / nat.h)
}

/**
 * Keeps the page inside the stage: an axis with room to spare is centred, an
 * axis that overflows is held so no edge pulls away from the frame. Without
 * this a flick sends the artwork off into the void and the reader looks broken.
 */
const clampView = (v, nat, box) => {
  const w = nat.w * v.scale
  const h = nat.h * v.scale
  return {
    scale: v.scale,
    x: w <= box.width ? (box.width - w) / 2 : Math.min(0, Math.max(box.width - w, v.x)),
    y: h <= box.height ? (box.height - h) / 2 : Math.min(0, Math.max(box.height - h, v.y)),
  }
}

/**
 * @param natural  the page's pixel size, `{ w, h }`, once it has loaded
 * @param fit      FIT_PAGE, FIT_WIDTH, or null once the reader has zoomed by hand
 * @param onFitBroken  called when a manual zoom leaves the current fit mode
 * @param onSwipe  called with -1 or +1 when a drag reads as a page turn
 */
export function usePanZoom({ natural, fit, onFitBroken, onSwipe }) {
  const stageRef = useRef(null)
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 })

  // Pointer handlers run outside React's render. Panning and zooming go
  // through functional updates so they never read a stale view; this mirror is
  // only for the one place that has to *ask* about the current scale — deciding
  // whether a drag was a pan or a page turn.
  const viewRef = useRef(view)
  viewRef.current = view
  const natRef = useRef(natural)
  natRef.current = natural

  const minScale = useCallback(() => {
    const nat = natRef.current
    if (!nat) return 0.05
    return Math.max(0.05, fitScale(FIT_PAGE, nat, boxOf(stageRef.current)) * 0.5)
  }, [])

  const applyFit = useCallback((mode) => {
    const nat = natRef.current
    const box = boxOf(stageRef.current)
    if (!nat || !box.width) return
    // x:0 lands on the left edge when the page overflows and is re-centred by
    // clampView when it does not; y:0 is the top, which is where you start.
    setView(clampView({ scale: fitScale(mode, nat, box), x: 0, y: 0 }, nat, box))
  }, [])

  /**
   * Zoom by `factor` about a point in stage coordinates.
   *
   * Computed from the previous view rather than from a ref, so two zooms in
   * one tick — a fast double click, a pinch reported as two moves — compose
   * instead of the second overwriting the first.
   */
  const zoomAt = useCallback((factor, px, py) => {
    const nat = natRef.current
    if (!nat) return
    const box = boxOf(stageRef.current)
    setView((v) => {
      const scale = Math.min(MAX_SCALE, Math.max(minScale(), v.scale * factor))
      if (scale === v.scale) return v
      const ratio = scale / v.scale
      return clampView({
        scale,
        x: px - (px - v.x) * ratio,
        y: py - (py - v.y) * ratio,
      }, nat, box)
    })
  }, [minScale])

  /** Zoom about the middle of the stage — what the toolbar buttons do. */
  const zoomBy = useCallback((factor) => {
    const box = boxOf(stageRef.current)
    onFitBroken?.()
    zoomAt(factor, box.width / 2, box.height / 2)
  }, [zoomAt, onFitBroken])

  const panBy = useCallback((dx, dy) => {
    const nat = natRef.current
    if (!nat) return
    const box = boxOf(stageRef.current)
    setView((v) => clampView({ scale: v.scale, x: v.x + dx, y: v.y + dy }, nat, box))
  }, [])

  /* -- re-fit when the page, the mode or the stage changes ----------------- */

  useEffect(() => {
    if (fit) { applyFit(fit); return }
    // Zoomed by hand: keep the magnification across the page turn — you zoomed
    // in to read, not to look at one page — but pull it back inside the frame,
    // because the next page need not be the same size. Scanned collections mix
    // resolutions freely; a credit page half the width of the artwork would
    // otherwise arrive parked off-screen.
    const nat = natRef.current
    if (nat) setView((v) => clampView(v, nat, boxOf(stageRef.current)))
  }, [fit, natural, applyFit])

  useEffect(() => {
    const el = stageRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => {
      // A rotated phone or a resized window re-fits; a hand-zoomed page keeps
      // its magnification and is only pulled back inside the frame.
      if (fit) applyFit(fit)
      else {
        const nat = natRef.current
        if (nat) setView((v) => clampView(v, nat, boxOf(el)))
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [fit, applyFit])

  /* -- wheel --------------------------------------------------------------- */

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      if (e.ctrlKey || e.metaKey) {
        onFitBroken?.()
        zoomAt(Math.exp(-e.deltaY / 200), e.clientX - r.left, e.clientY - r.top)
      } else {
        panBy(-e.deltaX, -e.deltaY)
      }
    }
    // Passive listeners cannot preventDefault, and without that a trackpad
    // pinch zooms the whole document instead of the page.
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt, panBy, onFitBroken])

  /* -- pointers ------------------------------------------------------------ */

  const pointers = useRef(new Map())
  const gesture = useRef(null)

  const stagePoint = (e) => {
    const r = stageRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) {
      gesture.current = { startX: e.clientX, startY: e.clientY, dx: 0, dy: 0, pinched: false }
    } else {
      // A second finger turns a pan into a pinch; it is no longer a swipe.
      if (gesture.current) gesture.current.pinched = true
    }
  }, [])

  const onPointerMove = useCallback((e) => {
    const pts = pointers.current
    if (!pts.has(e.pointerId)) return

    if (pts.size === 1) {
      const prev = pts.get(e.pointerId)
      panBy(e.clientX - prev.x, e.clientY - prev.y)
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
      const g = gesture.current
      if (g) { g.dx = e.clientX - g.startX; g.dy = e.clientY - g.startY }
      return
    }

    // Pinch, measured across the first two pointers down. A Map keeps its
    // insertion order when an existing key is updated, so `before` and `after`
    // describe the same two fingers; a third finger moving is a no-op.
    const before = [...pts.values()].slice(0, 2)
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const after = [...pts.values()].slice(0, 2)

    const spread = (p) => Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y)
    const centre = (p) => ({ x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 })

    const d0 = spread(before)
    if (d0 === 0) return
    const m0 = centre(before)
    const m1 = centre(after)
    const r = stageRef.current.getBoundingClientRect()

    onFitBroken?.()
    // The fingers may drag as well as spread; both are applied.
    panBy(m1.x - m0.x, m1.y - m0.y)
    zoomAt(spread(after) / d0, m1.x - r.left, m1.y - r.top)
    if (gesture.current) gesture.current.pinched = true
  }, [panBy, zoomAt, onFitBroken])

  const onPointerUp = useCallback((e) => {
    const pts = pointers.current
    pts.delete(e.pointerId)
    if (pts.size > 0) return

    const g = gesture.current
    gesture.current = null
    if (!g || g.pinched) return

    // A drag only reads as a page turn when there is nothing to pan sideways —
    // otherwise dragging a zoomed page across would skip the page under it.
    const nat = natRef.current
    const box = boxOf(stageRef.current)
    const overflowsX = nat && nat.w * viewRef.current.scale > box.width + 1
    if (overflowsX) return

    if (Math.abs(g.dx) > SWIPE_PX && Math.abs(g.dx) > Math.abs(g.dy) * SWIPE_RATIO) {
      onSwipe?.(g.dx > 0 ? -1 : 1)
    }
  }, [onSwipe])

  /** Double click or double tap: alternate between the fit and a close-up. */
  const onDoubleClick = useCallback((e) => {
    const p = stagePoint(e)
    const nat = natRef.current
    if (!nat) return
    const fitted = fitScale(fit || FIT_PAGE, nat, boxOf(stageRef.current))
    if (viewRef.current.scale > fitted * 1.05) {
      applyFit(fit || FIT_PAGE)
    } else {
      onFitBroken?.()
      zoomAt(2, p.x, p.y)
    }
  }, [fit, applyFit, zoomAt, onFitBroken])

  return {
    stageRef,
    view,
    zoomBy,
    applyFit,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onDoubleClick,
    },
  }
}
