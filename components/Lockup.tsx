import type { ReactNode } from 'react'

type Variant = 'hero' | 'page' | 'inline'

interface Props {
  /** Small mono uppercase eyebrow above the display line, e.g. "( 02 ) fork" */
  eyebrow?: ReactNode
  /** Large Fraunces headline. ReactNode so callers can interleave weight/italic spans. */
  display: ReactNode
  /** Tiny italic caption beneath the display. */
  caption?: ReactNode
  /** Size variant. `page` is the default for inner-page H1s. */
  variant?: Variant
  className?: string
}

/**
 * Three-slot editorial lockup: eyebrow → display → caption.
 *
 * The display line takes ReactNode so callers can mix weights within a single
 * line (e.g. `<><span className="font-light">the</span> <strong>Tarot Card</strong></>`).
 * Mixed-weight is reserved for `hero` and `page` variants — body-scale
 * mixed-weight reads as a font-loading bug.
 */
export default function Lockup({
  eyebrow,
  display,
  caption,
  variant = 'page',
  className = '',
}: Props) {
  const displayClass =
    variant === 'hero'   ? 'font-display text-display-xl font-extralight italic text-ink' :
    variant === 'page'   ? 'font-display text-display-lg font-light text-ink' :
                           'font-display text-display font-light text-ink'

  const eyebrowClass = 'font-eyebrow text-eyebrow text-ink/55'
  const captionClass = 'font-inter text-caption italic text-ink/45'

  const gapClass =
    variant === 'hero'   ? 'gap-4' :
    variant === 'page'   ? 'gap-2' :
                           'gap-1.5'

  return (
    <div className={`flex flex-col ${gapClass} ${className}`}>
      {eyebrow && <div className={eyebrowClass}>{eyebrow}</div>}
      <div className={displayClass}>{display}</div>
      {caption && <div className={captionClass}>{caption}</div>}
    </div>
  )
}
