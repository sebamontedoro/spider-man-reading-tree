import { SKINS, setSkin, useSkin } from '../lib/skin.js'

/**
 * The two skins, and the option to stop choosing.
 *
 * It sits in the masthead because that is the one band that never scrolls
 * away and never changes with what you selected — and because a skin is a
 * property of the whole page, not of the filters.
 */
export default function SkinToggle() {
  const current = useSkin()
  return (
    <div className="skin" role="group" aria-label="Skin">
      {SKINS.map((s) => (
        <button
          key={s.key}
          type="button"
          className="skin__btn"
          aria-pressed={current === s.key}
          onClick={() => setSkin(s.key)}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
