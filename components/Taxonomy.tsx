import type { ReactNode } from 'react'

type Item =
  | string                        // single underscore tag, e.g. "career"
  | { label: string; count?: number | string }  // label + count, e.g. { label: 'branches', count: 3 }

interface Props {
  items: Item[]
  /** Decorative — won't be announced to screen readers when true. Default: true. */
  decorative?: boolean
  className?: string
}

/**
 * Underscore-taxonomy row: `_career   _branches_3   _gone-when-tab-closes`.
 *
 * Each tag is a `_label` or `label_count`. Used in headers, card metadata
 * rows, and as a Mara-SRL-style index motif. Decorative by default —
 * the real semantic data should also live elsewhere (e.g. in `<h1>` text).
 */
export default function Taxonomy({ items, decorative = true, className = '' }: Props) {
  const ariaProps = decorative ? { 'aria-hidden': true as const } : {}
  return (
    <div
      {...ariaProps}
      className={`flex flex-wrap items-center gap-x-5 gap-y-1 font-tax text-tax text-ink/40 ${className}`}
    >
      {items.map((item, i) => {
        if (typeof item === 'string') {
          return <span key={i}><span className="text-ink/25">_</span>{item}</span>
        }
        return (
          <span key={i}>
            <span className="text-ink/25">_</span>
            {item.label}
            {item.count !== undefined && <span className="text-ink/55">_{item.count}</span>}
          </span>
        )
      })}
    </div>
  )
}
