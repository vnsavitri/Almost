'use client'

import { useState } from 'react'
import { requestPurchase } from '@/lib/paywall'
import { getUserId } from '@/lib/user-id'

interface Props {
  reason: 'regenerate' | 'new-branch'
  onSuccess: () => void
  onDismiss: () => void
}

const COPY = {
  'regenerate': {
    heading: 'not quite right?',
    body: 'Re-roll the alternate you as many times as you want. Pro unlocks unlimited regenerations across all forks.',
  },
  'new-branch': {
    heading: 'another fork?',
    body: 'You\'ve already explored one path. Pro unlocks unlimited branch switching — go back, pick a different fork, see who else you could have been.',
  },
}

export default function PaywallModal({ reason, onSuccess, onDismiss }: Props) {
  const [purchasing, setPurchasing] = useState(false)
  const [done, setDone] = useState(false)

  const copy = COPY[reason]

  async function handlePurchase() {
    setPurchasing(true)
    const ok = await requestPurchase(getUserId())
    if (ok) {
      setDone(true)
      setTimeout(() => onSuccess(), 600)
    } else {
      setPurchasing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cream/80 backdrop-blur-sm"
        onClick={onDismiss}
      />

      {/* Panel — bottom sheet on mobile, centered card on md+ */}
      <div className="relative w-full md:max-w-sm bg-cream border border-ink/10 px-8 py-10 pb-12 md:pb-10 flex flex-col gap-8 md:mx-4">

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-coral">
            Almost Pro — $9
          </p>
          <h2 className="font-fraunces text-3xl font-light text-ink leading-tight">
            {copy.heading}
          </h2>
          <p className="font-inter text-sm text-ink/50 leading-relaxed">
            {copy.body}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink/30">
            one-time unlock · no subscription
          </p>
          <div className="flex flex-col gap-2 font-inter text-[11px] text-ink/40">
            <span>✓ unlimited regenerations</span>
            <span>✓ unlimited branch switching</span>
            <span>✓ all 4 formats, always free</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={onDismiss}
            className="font-inter text-sm text-ink/25 hover:text-ink/50 transition-colors"
          >
            not now
          </button>
          <button
            onClick={handlePurchase}
            disabled={purchasing || done}
            className={[
              'group inline-flex items-center gap-2 font-inter text-sm transition-colors duration-150',
              done
                ? 'text-coral'
                : purchasing
                  ? 'text-ink/30 cursor-not-allowed'
                  : 'text-ink hover:text-coral',
            ].join(' ')}
          >
            {done ? 'unlocked.' : purchasing ? 'unlocking…' : 'unlock for $9'}
            {!purchasing && !done && (
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
