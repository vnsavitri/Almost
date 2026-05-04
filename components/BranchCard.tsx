'use client'

import type { Branch } from '@/lib/types'

interface Props {
  branch: Branch
  index: number          // 1-based index for the parenthesized number
  selected: boolean
  onSelect: (branch: Branch) => void
}

export default function BranchCard({ branch, index, selected, onSelect }: Props) {
  const idx = String(index).padStart(2, '0')

  return (
    <button
      onClick={() => onSelect(branch)}
      className={[
        'w-full text-left py-6 border-b border-l-2 pl-4 transition-all duration-150 group',
        selected
          ? 'border-b-ink/10 border-l-gold'
          : 'border-b-ink/8 border-l-transparent hover:border-b-ink/15 hover:border-l-ink/12',
      ].join(' ')}
    >
      <div className="flex items-start gap-4 md:gap-6">

        {/* Parenthesized index — decorative, aria-hidden so SR doesn't read "( 01 ) ( 02 )" */}
        <span
          aria-hidden
          className={[
            'shrink-0 pt-2 font-mono text-[10px] tracking-[0.18em] transition-colors duration-150 select-none',
            selected ? 'text-coral' : 'text-ink/30 group-hover:text-ink/55',
          ].join(' ')}
        >
          ( {idx} )
        </span>

        {/* Italic year — display-scale, mixed-style is OK here (italic vs upright nav) */}
        <span className={[
          'font-display font-light italic text-[2rem] leading-none shrink-0 pt-0.5 transition-colors duration-150',
          selected ? 'text-coral' : 'text-ink/22 group-hover:text-ink/42',
        ].join(' ')}>
          {branch.year}
        </span>

        {/* Content */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <p className={[
            'font-display text-[1.05rem] font-light leading-snug transition-colors duration-150',
            selected ? 'text-ink' : 'text-ink/65 group-hover:text-ink',
          ].join(' ')}>
            {branch.summary}
          </p>
          <p className={[
            'font-inter text-caption italic leading-relaxed transition-colors duration-150',
            selected ? 'text-ink/55' : 'text-ink/35 group-hover:text-ink/55',
          ].join(' ')}>
            {branch.whatHappened}
          </p>
        </div>

      </div>
    </button>
  )
}
