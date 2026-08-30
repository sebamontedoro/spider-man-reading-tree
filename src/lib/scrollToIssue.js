/**
 * Bring one issue into view.
 *
 * Harder than it sounds, because the timeline mounts its cards lazily. Only
 * the year bands are always in the DOM, and an unmounted band reserves an
 * estimated height that is always wrong — badly so on a phone, where cards wrap
 * three to a row instead of eight and a month is far taller than reserved.
 *
 * So scrolling once does not work: the bands between here and the target mount
 * on the way, each growing as it does, the document stretches underneath, and
 * the position you scrolled to now belongs to an earlier year. The target band
 * never comes close enough to mount and you are left somewhere short of it —
 * asking for 2001 and landing in 1995.
 *
 * The fix is to re-assert rather than estimate better: scroll, let a frame
 * pass, look at where the target actually is now, scroll again. Repeat until it
 * stops moving. Instant scrolling rather than smooth, because a smooth scroll
 * in flight fights every correction; converging takes a handful of frames and
 * reads as a direct jump.
 */
const MAX_FRAMES = 240
const STABLE_FRAMES = 3   // consecutive frames unmoved before we call it landed
const MOVED_PX = 2

export function scrollToIssue(issue, { highlight = true } = {}) {
  if (!issue || typeof document === 'undefined') return

  const year = issue.coverDate.slice(0, 4)
  let frames = 0
  let lastTop = null
  let stable = 0

  const step = () => {
    frames++

    // Prefer the card once it exists; fall back to its year band, which is what
    // gets us close enough for the card to mount at all.
    const card = document.getElementById(`issue-${issue.id}`)
    const target = card || document.getElementById(`year-${year}`)

    if (!target) {
      if (frames < MAX_FRAMES) requestAnimationFrame(step)
      return
    }

    const top = target.getBoundingClientRect().top
    stable = lastTop !== null && Math.abs(top - lastTop) < MOVED_PX ? stable + 1 : 0
    lastTop = top

    target.scrollIntoView({ behavior: 'auto', block: card ? 'center' : 'start' })

    if (card && stable >= STABLE_FRAMES) {
      if (highlight) {
        card.classList.remove('issue--landed')
        void card.offsetWidth  // restart the animation if we land here twice
        card.classList.add('issue--landed')
        setTimeout(() => card.classList.remove('issue--landed'), 2000)
      }
      return
    }

    if (frames < MAX_FRAMES) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
