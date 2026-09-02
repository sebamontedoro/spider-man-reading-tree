import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchComic, pageUrl } from '../lib/shelf.js'
import { progressFor, recordPage } from '../lib/progress.js'
import { usePanZoom, FIT_PAGE, FIT_WIDTH } from '../lib/panzoom.js'
import { useMediaQuery, PHONE } from '../lib/useMediaQuery.js'

import '../styles/reader.css'

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
  const [shown, setShown] = useState(null)     // the src currently painted
  const [natural, setNatural] = useState(null) // its pixel size
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState(null)

  // A phone reads a comic page down the screen; a wide screen holds the whole
  // page at once. Starting anywhere else means every reader's first act is to
  // change it.
  const [fit, setFit] = useState(isPhone ? FIT_WIDTH : FIT_PAGE)

  const rootRef = useRef(null)

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

  /* -- open ---------------------------------------------------------------- */

  useEffect(() => {
    let live = true
    setComic(null); setShown(null); setNatural(null); setError(null); setBusy(true)

    fetchComic(comicKey).then(
      (whole) => {
        if (!live) return
        const c = windowed
          ? { ...whole, count: shelved.to - shelved.from + 1 }
          : whole
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

    const url = pageUrl(comic.key, page + offset)
    const img = new Image()
    img.src = url
    // decode() rather than onload: it resolves when the bitmap is ready to
    // paint, so the swap cannot land mid-decode and stutter.
    img.decode()
      .then(() => {
        if (!live) return
        setNatural({ w: img.naturalWidth, h: img.naturalHeight })
        setShown(url)
        setBusy(false)
      })
      .catch(() => { if (live) { setError(`Page ${page} would not load.`); setBusy(false) } })

    return () => { live = false }
  }, [comic, page, offset])

  // The next page or two, fetched while you read this one. Turning a page then
  // costs nothing, which is most of what makes the reader feel local.
  useEffect(() => {
    if (!comic) return
    for (const n of [page + 1, page + 2, page - 1]) {
      if (n >= 1 && n <= comic.count) new Image().src = pageUrl(comic.key, n + offset)
    }
  }, [comic, page, offset])

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
            <span className="reader__pct">{Math.round(view.scale * 100)}%</span>
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
            src={shown}
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
