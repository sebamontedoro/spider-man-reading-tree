/**
 * Bring one issue into view, mounting its year band on the way if needed.
 *
 * Two steps, because the timeline mounts its cards lazily: only the year band
 * is always in the DOM. Scrolling the band into view is what trips its
 * observer and renders the cards, so the card cannot be targeted until after
 * that has happened — hence the retry rather than a single lookup.
 */
// The retry has to outlast the smooth scroll, not just the mount. Crossing
// sixty years of timeline can take a couple of seconds, and the target band
// only mounts once it is close, so a short budget gives up before the card
// exists. Costs nothing to be generous: the loop stops the moment it lands.
const MAX_FRAMES = 300 // about five seconds at 60fps

export function scrollToIssue(issue, { highlight = true } = {}) {
  if (!issue || typeof document === 'undefined') return

  const year = issue.coverDate.slice(0, 4)
  document.getElementById(`year-${year}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })

  let frames = 0
  const find = () => {
    const el = document.getElementById(`issue-${issue.id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      if (highlight) {
        el.classList.remove('issue--landed')
        // Force a reflow so the animation restarts when the same card is
        // targeted twice in a row.
        void el.offsetWidth
        el.classList.add('issue--landed')
        setTimeout(() => el.classList.remove('issue--landed'), 2000)
      }
      return
    }
    if (++frames < MAX_FRAMES) requestAnimationFrame(find)
  }
  requestAnimationFrame(find)
}
