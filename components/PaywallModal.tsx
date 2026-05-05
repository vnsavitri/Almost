'use client'

import { useState } from 'react'
import { getRC, checkIsPro, isUserCancelled, ENTITLEMENT_ID } from '@/lib/revenuecat'
import { setPro, syncProToServer } from '@/lib/paywall'
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
  const [error, setError] = useState<string | null>(null)

  const copy = COPY[reason]

  async function handlePurchase() {
    setPurchasing(true)
    setError(null)

    const rc = getRC()

    if (!rc) {
      // RC not configured — shouldn't normally happen, but fail gracefully.
      setError('Payment system unavailable. Please refresh and try again.')
      setPurchasing(false)
      return
    }

    try {
      // RC renders its full paywall as a full-screen overlay (htmlTarget: null).
      const result = await rc.presentPaywall({})

      // Purchase was made — check if the entitlement is now active.
      const entitled = !!result.customerInfo.entitlements.active[ENTITLEMENT_ID]

      if (entitled) {
        setPro(true)
        syncProToServer(getUserId()) // fire-and-forget
        setDone(true)
        setTimeout(() => onSuccess(), 600)
      } else {
        // Edge case: purchase completed but entitlement not yet active.
        // Try a fresh fetch from RC before giving up.
        const nowPro = await checkIsPro()
        if (nowPro) {
          setPro(true)
          syncProToServer(getUserId())
          setDone(true)
          setTimeout(() => onSuccess(), 600)
        } else {
          setError('Purchase recorded but entitlement not yet active — please wait a moment and try again.')
          setPurchasing(false)
        }
      }
    } catch (err) {
      if (isUserCancelled(err)) {
        // User dismissed RC's paywall — just restore our modal.
        setPurchasing(false)
      } else {
        const msg = err instanceof Error ? err.message : String(err)
        console.error('[RC] presentPaywall error:', err)
        setError(`Payment error: ${msg}`)
        setPurchasing(false)
      }
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
            Almost Pro
          </p>
          <h2 className="font-display text-3xl font-light text-ink leading-tight">
            {copy.heading}
          </h2>
          <p className="font-inter text-sm text-ink/50 leading-relaxed">
            {copy.body}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink/30">
            billed via RevenueCat · cancel any time
          </p>
          <div className="flex flex-col gap-2 font-inter text-[11px] text-ink/40">
            <span>✓ unlimited regenerations</span>
            <span>✓ unlimited branch switching</span>
            <span>✓ all 4 formats, always free</span>
          </div>
        </div>

        {error && (
          <p className="font-inter text-[11px] text-coral leading-relaxed">
            {error}
          </p>
        )}

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
            {done ? 'unlocked.' : purchasing ? 'opening…' : 'see plans →'}
          </button>
        </div>

      </div>
    </div>
  )
}
