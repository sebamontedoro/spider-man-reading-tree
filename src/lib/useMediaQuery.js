import { useEffect, useState } from 'react'

/**
 * Track a media query in React state.
 *
 * The phone layout is not just narrower CSS: filters move into a sheet and the
 * detail panel becomes a draggable one, which are different components rather
 * than restyled ones. So the breakpoint has to be readable from JS, not only
 * from a stylesheet.
 *
 * Guarded for the case where there is no window, so the module stays safe to
 * import anywhere.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(query).matches
      : false,
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** One place to state where the phone layout starts. */
export const PHONE = '(max-width: 760px)'
