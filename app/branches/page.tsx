'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  loadResume,
  loadBranches,
  saveBranches,
  saveSelectedBranch,
  isDemoMode,
  hasAnyBranchGeneration,
  clearAll,
} from '@/lib/storage'
import { isPro } from '@/lib/paywall'
import { getLoadingPhrases } from '@/lib/loading-phrases'
import type { Branch } from '@/lib/types'
import BranchCard from '@/components/BranchCard'
import StepBar from '@/components/StepBar'
import Lockup from '@/components/Lockup'
import Taxonomy from '@/components/Taxonomy'
import PaywallModal from '@/components/PaywallModal'

function PageNav({ onStartOver }: { onStartOver: () => void }) {
  return (
    <header className="shrink-0 px-6 md:px-14 pt-7">
      <div className="flex items-center justify-between mb-3">
        <span className="w-16 md:w-24" />
        <Link
          href="/"
          className="font-display font-light italic text-xl text-ink hover:text-coral transition-colors"
          style={{ letterSpacing: '-0.02em' }}
        >
          Almost
        </Link>
        <div className="w-16 md:w-24 flex justify-end">
          <button
            onClick={onStartOver}
            className="font-eyebrow text-eyebrow text-ink/35 hover:text-coral transition-colors"
          >
            start over
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <StepBar current={2} />
        <span className="font-mono text-[8px] text-ink/30">2 / 4</span>
      </div>
      <div className="mt-3 h-px bg-ink/8" />
    </header>
  )
}

export default function BranchesPage() {
  const router = useRouter()
  const [branches, setBranches] = useState<Branch[] | null>(null)
  const [selected, setSelected] = useState<Branch | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [demo, setDemo] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const fetching = useRef(false)

  useEffect(() => {
    if (branches || error) return
    const phrases = getLoadingPhrases(demo)
    const interval = setInterval(() => {
      setPhraseIndex(i => (i + 1) % phrases.length)
    }, 2600)
    return () => clearInterval(interval)
  }, [branches, error, demo])

  const fetchBranches = useCallback(async (resumeBase64: string) => {
    const res = await fetch('/api/extract-branches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeBase64 }),
    })
    const data = await res.json() as { branches?: Branch[]; ok?: boolean; error?: string }
    if (data.ok === false || !data.branches) {
      throw new Error(data.error ?? 'Could not find fork points in your profile.')
    }
    return data.branches
  }, [])

  useEffect(() => {
    const isDemo = isDemoMode()
    setDemo(isDemo)
    const cached = loadBranches()
    if (cached) { setBranches(cached); return }
    const resume = loadResume()
    if (!resume) { router.push('/upload'); return }
    if (fetching.current) return
    fetching.current = true
    fetchBranches(resume)
      .then(result => { saveBranches(result); setBranches(result) })
      .catch(e => { setError((e as Error).message); fetching.current = false })
  }, [router, fetchBranches])

  function handleGenerate() {
    if (!selected) return
    if (hasAnyBranchGeneration(selected.id) && !isPro()) { setShowPaywall(true); return }
    saveSelectedBranch(selected)
    router.push('/templates')
  }

  function handlePaywallSuccess() {
    setShowPaywall(false)
    if (!selected) return
    saveSelectedBranch(selected)
    router.push('/templates')
  }

  function handleStartOver() { clearAll(); router.push('/upload') }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (!branches && !error) {
    const phrases = getLoadingPhrases(demo)
    return (
      <main className="h-dvh bg-cream flex flex-col overflow-hidden">
        <PageNav onStartOver={handleStartOver} />
        <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-14 gap-8">
          <Taxonomy
            items={[
              { label: 'reading', count: 'pdf' },
              '≈-15-seconds',
              'no-trace',
            ]}
          />
          <div className="relative w-20 h-14">
            <div className="absolute left-1/2 top-0 w-px h-5 bg-ink/15 -translate-x-1/2" />
            <div className="absolute left-0 top-5 right-1/2 h-px overflow-hidden">
              <div className="h-full bg-coral almost-line" />
            </div>
            <div className="absolute left-1/2 top-5 right-0 h-px overflow-hidden">
              <div className="h-full bg-glow almost-line-r" />
            </div>
            <div className="absolute left-1/2 top-5 w-1.5 h-1.5 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2 almost-pulse" />
          </div>
          <p className="font-display text-2xl font-light text-ink almost-pulse leading-snug max-w-xs">
            {phrases[phraseIndex]}
          </p>
        </div>
      </main>
    )
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <main className="h-dvh bg-cream flex flex-col overflow-hidden">
        <PageNav onStartOver={handleStartOver} />
        <div className="flex-1 flex flex-col justify-center px-6 md:px-14 max-w-sm gap-6">
          <Lockup
            variant="page"
            eyebrow={<><span className="text-coral/70">( ! )</span>&nbsp;&nbsp;Error</>}
            display={<>almost <span className="font-extralight italic">worked</span>.</>}
            caption={error}
          />
          <div className="flex gap-6 mt-2">
            <button onClick={() => router.push('/upload')} className="font-inter text-sm text-coral hover:text-glow transition-colors">← try again</button>
            <button onClick={handleStartOver} className="font-inter text-sm text-ink/30 hover:text-ink transition-colors">start over</button>
          </div>
        </div>
      </main>
    )
  }

  // ── Branch selection ───────────────────────────────────────────────────────
  return (
    <main className="h-dvh bg-cream flex flex-col overflow-hidden">

      {showPaywall && (
        <PaywallModal
          reason="new-branch"
          onSuccess={handlePaywallSuccess}
          onDismiss={() => setShowPaywall(false)}
        />
      )}

      <PageNav onStartOver={handleStartOver} />

      <div className="flex-1 min-h-0 overflow-y-auto px-6 md:px-14">
        <div className="max-w-xl pt-7 pb-4">

          <Lockup
            variant="page"
            eyebrow={<><span className="text-coral/70">( 02 )</span>&nbsp;&nbsp;Fork</>}
            display={<>pick a <span className="font-extralight italic">fork</span><br />in the road</>}
            caption="the moments where your life could have gone differently"
            className="mb-3"
          />

          <Taxonomy
            className="mb-4"
            items={[
              { label: 'paths', count: branches!.length },
              'life-decisions',
              'pick-one',
            ]}
          />

          <div className="flex flex-col">
            {branches!.map((branch, i) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                index={i + 1}
                selected={selected?.id === branch.id}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="shrink-0 px-6 md:px-14 pt-3 pb-6 md:pb-8 border-t border-ink/8 bg-cream">
        <button
          onClick={handleGenerate}
          disabled={!selected}
          className={[
            'w-full py-4 font-inter text-sm font-medium transition-all duration-200',
            selected
              ? 'bg-coral text-cream hover:bg-glow cursor-pointer'
              : 'bg-ink/8 text-ink/22 cursor-not-allowed',
          ].join(' ')}
        >
          {selected ? `take this fork — ${selected.year} →` : 'pick a fork point first'}
        </button>
        <button
          onClick={() => router.push('/upload')}
          className="w-full text-center mt-3 font-eyebrow text-eyebrow text-ink/35 hover:text-ink transition-colors"
        >
          ← back to upload
        </button>
      </div>

    </main>
  )
}
