interface Props {
  current: 1 | 2 | 3 | 4
}

const STEPS: { n: string; label: string }[] = [
  { n: '01', label: 'UPLOAD' },
  { n: '02', label: 'FORK'   },
  { n: '03', label: 'FORMAT' },
  { n: '04', label: 'RESULT' },
]

export default function StepBar({ current }: Props) {
  return (
    <div className="flex items-center">
      {STEPS.map((step, i) => {
        const active = i + 1 === current
        const done   = i + 1 < current
        return (
          <div key={step.n} className="flex items-center">
            <span className={[
              'font-mono text-[8px] tracking-[0.18em] whitespace-nowrap',
              active ? 'text-ink'
              : done  ? 'text-ink/35'
              :         'text-ink/18',
            ].join(' ')}>
              {step.n} {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-2 md:mx-3 font-mono text-[8px] text-ink/15">·</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
