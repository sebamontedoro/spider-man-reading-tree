import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchComic, pageUrl } from '../lib/shelf.js'
import { progressFor, recordPage } from '../lib/progress.js'
import { usePanZoom, fitScale, FIT_PAGE, FIT_WIDTH } from '../lib/panzoom.js'
import { useMediaQuery, PHONE } from '../lib/useMediaQuery.js'

import '../styles/reader.css'

/**
 * How far a sized page may be magnified before the original is fetched: device
 * pixels per image pixel. A little over one is invisible; double-tap zoom is
 * well past it.
 */
const SHARP = 1.15

/** Comic pages run about two wide to three tall — enough to size a fitted page
 *  before the first one has arrived to measure. */
const PAGE_ASPECT = 2 / 3

const ratio = () => (typeof window !== 'undefined' && window.devicePixelRatio) || 1

/**
 * The narrowest width the service offers that still covers the page as it will
 * be drawn, in device pixels — or null for the original, when the screen needs
 * every pixel or the service offers no widths at all.
 */
function widthFor(widths, box, fit) {
  if (!widths?.length || !box?.width) return null
  const drawn = fit === FIT_WIDTH ? box.width : Math.min(box.width, box.height * PAGE_ASPECT)
  const need = drawn * ratio()
  return widths.find((w) => w >= need) ?? null
}

/**
 * The size a page is laid out at, whichever copy of it is loaded.
 *
 * Pan and zoom work in the image's own pixels, and a hand zoom is kept across
 * page turns. If that space were the loaded bitmap's, the same zoom would mean
 * a different magnification on a page that came in sized than on one that came
 * in whole. So every page is laid out at the sized width, and the original, when
 * it arrives, is drawn into the same box — sharper, and not one pixel moved.
 */
const layoutSize = (img, width) => {
  const w = img.naturalWidth
  const h = img.naturalHeight
  if (!width || w <= width) return { w, h }
  return { w: width, h: Math.round((h * width) / w) }
}

/**
 * The comic reader.
 *
 * Opens over the timeline rather than routing away from it: you come back to
 * the same scroll position, with the issue still selected, which is what makes
 * "read this, then follow the thread" work at all.
 *
 * Pages arrive one at a time from the reader service — see src/lib/shelf.js —
 * so opening a 40 MB archive costs one page, not forty. A page is only swapped
 * in once it has decoded, so turning a page never flashes an empty frame; the
 * one you were reading stays up, dimmed, until the next is ready.
 */
export default function Reader({ issue, comic: shelved, nextIssue, onOpenIssue, onClose }) {
  const comicKey = shelved.key
  /**
   * A collected edition holds this issue between two pages of a much longer
   * book. The window is applied here rather than in the service, which keeps
   * the service serving plain page numbers and means everything below — the
   * counter, the slider, the preloader, the saved position — counts pages of
   * *this issue*, starting at one, exactly as it would for a standalone file.
   */
  const offset = (shelved.from || 1) - 1
  const windowed = Boolean(shelved.from)
  const isPhone = useMediaQuery(PHONE)

  const [comic, setComic] = useState(null)
  const [page, setPage] = useState(1)
  // What is painted: its URL, the page it belongs to, and whether it is the
  // original or a sized copy that zooming may still have to replace.
  const [shown, setShown] = useState(null)
  const [natural, setNatural] = useState(null) // its layout size — see layoutSize
  // The width pages are asked for, fixed when the comic opens. Null means
  // originals.
  const [width, setWidth] = useState(null)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState(null)

  // A phone reads a comic page down the screen; a wide screen holds the whole
  // page at once. Starting anywhere else means every reader's first act is to
  // change it.
  const [fit, setFit] = useState(isPhone ? FIT_WIDTH : FIT_PAGE)

  const rootRef = useRef(null)
  const fitRef = useRef(fit)
  fitRef.current = fit

  const turn = useCallback((delta) => {
    setPage((p) => {
      const last = comic?.count || 1
      return Math.min(last, Math.max(1, p + delta))
    })
  }, [comic])

  const { stageRef, view, zoomBy, handlers } = usePanZoom({
    natural,
    fit,
    onFitBroken: useCallback(() => setFit(null), []),
    onSwipe: turn,
  })

  // Magnified past what a sized page holds. Read through a ref where a page is
  // being chosen, so a pinch does not re-run the loaders on every move.
  //
  // Only once a page has been measured, and under a fit, from the fit itself
  // rather than from the view. The view catches up a render late: for that one
  // render a new page is drawn at the old scale — on opening, the pan-zoom's
  // starting 1 — and on any phone that reads as "zoomed in" and downloads the
  // whole original only to throw it away.
  const scaleNow = fit && natural
    ? fitScale(fit, natural, stageRef.current?.getBoundingClientRect() || {})
    : view.scale
  const needSharp = Boolean(width && natural) && scaleNow * ratio() > SHARP

  // The zoom readout, as a multiple of the whole page on screen. It used to be
  // the scale over the bitmap, which meant nothing to a reader even then, and
  // now would change with which copy of the page happened to be loaded.
  const pagePct = natural
    ? Math.round((view.scale / fitScale(FIT_PAGE, natural, stageRef.current?.getBoundingClientRect() || {})) * 100)
    : 100
  const sharpRef = useRef(needSharp)
  sharpRef.current = needSharp

  /* -- open ---------------------------------------------------------------- */

  useEffect(() => {
    let live = true
    setComic(null); setShown(null); setNatural(null); setWidth(null); setError(null); setBusy(true)

    fetchComic(comicKey).then(
      (whole) => {
        if (!live) return
        const c = windowed
          ? { ...whole, count: shelved.to - shelved.from + 1 }
          : whole
        setWidth(widthFor(whole.widths, stageRef.current?.getBoundingClientRect(), fitRef.current))
        setComic(c)
        // Resume where you stopped — unless you finished it, in which case
        // reopening means re-reading, and that starts at the cover.
        const saved = progressFor(issue.id)
        const resume = saved && !saved.done ? Math.min(Math.max(1, saved.page), c.count) : 1
        setPage(resume)
      },
      (err) => { if (live) { setError(err.message); setBusy(false) } },
    )
    return () => { live = false }
  }, [comicKey, issue.id, windowed, shelved.from, shelved.to])

  /* -- the current page ---------------------------------------------------- */

  useEffect(() => {
    if (!comic) return
    let live = true
    setBusy(true)
    // A page that failed should not leave its message over the next one.
    setError(null)

    // Already zoomed in: go straight to the original, or every page turn would
    // arrive soft and sharpen a moment later.
    const full = !width || sharpRef.current
    const url = pageUrl(comic.key, page + offset, full ? null : width)
    const img = new Image()
    img.src = url
    // decode() rather than onload: it resolves when the bitmap is ready to
    // paint, so the swap cannot land mid-decode and stutter.
    img.decode()
      .then(() => {
        if (!live) return
        setNatural(layoutSize(img, width))
        // A sized copy narrower than the width asked for is the whole page:
        // the service never enlarges, so there is nothing sharper to fetch.
        setShown({ url, page, full: full || img.naturalWidth < width })
        setBusy(false)
      })
      .catch(() => { if (live) { setError(`Page ${page} would not load.`); setBusy(false) } })

    return () => { live = false }
  }, [comic, page, offset, width])

  // Zoomed into a sized page: fetch the original and swap it in once decoded.
  // The layout size does not change, so the view stays exactly where it is.
  useEffect(() => {
    if (!comic || !shown || shown.full || shown.page !== page || !needSharp) return
    let live = true
    const url = pageUrl(comic.key, page + offset)
    const img = new Image()
    img.src = url
    img.decode()
      .then(() => { if (live) setShown({ url, page, full: true }) })
      .catch(() => {})   // the sized page is still up; soft beats broken
    return () => { live = false }
  }, [comic, page, offset, shown, needSharp])

  // The next page or two, fetched while you read this one. Turning a page then
  // costs nothing, which is most of what makes the reader feel local.
  useEffect(() => {
    if (!comic) return
    const w = !width || sharpRef.current ? null : width
    for (const n of [page + 1, page + 2, page - 1]) {
      if (n >= 1 && n <= comic.count) new Image().src = pageUrl(comic.key, n + offset, w)
    }
  }, [comic, page, offset, width])

  useEffect(() => {
    if (comic) recordPage(issue.id, page, comic.count)
  }, [comic, page, issue.id])

  /* -- keyboard, scroll lock ----------------------------------------------- */

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else rootRef.current?.requestFullscreen?.().catch(() => {})
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' && e.key !== 'Escape') return
      switch (e.key) {
        case 'Escape': onClose(); break
        case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); turn(1); break
        case 'ArrowLeft': case 'PageUp': e.preventDefault(); turn(-1); break
        case 'Home': setPage(1); break
        case 'End': setPage(comic?.count || 1); break
        case '+': case '=': zoomBy(1.25); break
        case '-': case '_': zoomBy(1 / 1.25); break
        case '0': setFit(FIT_PAGE); break
        case 'w': setFit(FIT_WIDTH); break
        case 'f': toggleFullscreen(); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, turn, zoomBy, comic, toggleFullscreen])

  /* -- render -------------------------------------------------------------- */

  const last = comic?.count || 0
  const atEnd = comic && page >= last
  const canContinue = atEnd && nextIssue

  return (
    <div className="reader" ref={rootRef} role="dialog" aria-modal="true"
         aria-label={`${issue.seriesName} #${issue.number}`}>
      <header className="reader__bar">
        <button className="reader__close" onClick={onClose} aria-label="Close the reader">×</button>

        <div className="reader__id">
          <span className="label reader__series">{issue.seriesName}</span>
          <strong className="reader__number">#{issue.number}</strong>
          {windowed && (
            <span className="reader__from" title={shelved.file}>en un tomo</span>
          )}
        </div>

        <div className="reader__tools">
          <button
            className={`reader__tool ${fit === FIT_PAGE ? 'reader__tool--on' : ''}`}
            onClick={() => setFit(FIT_PAGE)} title="Fit the whole page (0)"
          >Fit page</button>
          <button
            className={`reader__tool ${fit === FIT_WIDTH ? 'reader__tool--on' : ''}`}
            onClick={() => setFit(FIT_WIDTH)} title="Fit the width (w)"
          >Fit width</button>

          <span className="reader__zoom">
            <button className="reader__tool" onClick={() => zoomBy(1 / 1.25)} aria-label="Zoom out">−</button>
            <span className="reader__pct">{pagePct}%</span>
            <button className="reader__tool" onClick={() => zoomBy(1.25)} aria-label="Zoom in">+</button>
          </span>

          {!isPhone && (
            <button className="reader__tool" onClick={toggleFullscreen} title="Full screen (f)">
              Full screen
            </button>
          )}
        </div>
      </header>

      <div
        className={`reader__stage ${busy ? 'is-busy' : ''}`}
        ref={stageRef}
        {...handlers}
      >
        {shown && natural && (
          <img
            className="reader__page"
            src={shown.url}
            alt={`Page ${page} of ${last}`}
            draggable={false}
            style={{
              width: `${natural.w}px`,
              height: `${natural.h}px`,
              transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
            }}
          />
        )}

        {error && (
          <div className="reader__message">
            <p>{error}</p>
            <button className="reader__tool" onClick={onClose}>Close</button>
          </div>
        )}

        {busy && !error && <div className="reader__spinner" aria-label="Loading" />}
      </div>

      <footer className="reader__foot">
        <button
          className="reader__turn" onClick={() => turn(-1)}
          disabled={page <= 1} aria-label="Previous page"
        >‹</button>

        <label className="reader__scrub">
          <span className="sr-only">Page</span>
          <input
            type="range" min={1} max={Math.max(1, last)} value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            disabled={!comic}
          />
        </label>

        <span className="reader__count">{comic ? `${page} / ${last}` : '…'}</span>

        {canContinue ? (
          <button
            className="reader__turn reader__turn--next-issue"
            onClick={() => onOpenIssue(nextIssue.id)}
            title={`${nextIssue.seriesName} #${nextIssue.number}`}
          >Next issue ›</button>
        ) : (
          <button
            className="reader__turn" onClick={() => turn(1)}
            disabled={!comic || atEnd} aria-label="Next page"
          >›</button>
        )}
      </footer>
    </div>
  )
}
