'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  loadResume,
  loadSelectedBranch,
  loadSelectedTemplate,
  loadGeneration,
  saveGeneration,
  isDemoMode,
  clearAll,
} from '@/lib/storage'
import { getLoadingPhrases } from '@/lib/loading-phrases'
import { getUserId } from '@/lib/user-id'
import Taxonomy from '@/components/Taxonomy'
import Lockup from '@/components/Lockup'
import type { TemplateId } from '@/lib/types'

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function LoadingPage() {
  const router = useRouter()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [shuffled, setShuffled] = useState<string[]>([])
  const [demo, setDemo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [templateId, setTemplateId] = useState<TemplateId | null>(null)
  const fetching = useRef(false)

  useEffect(() => {
    const isDemo = isDemoMode()
    setDemo(isDemo)
    const branch = loadSelectedBranch()
    const tid = loadSelectedTemplate() as TemplateId | null
    setTemplateId(tid)
    if (!branch || !tid) { router.push('/branches'); return }
    const cached = loadGeneration(branch.id, tid)
    if (cached) { router.push('/result'); return }
    if (fetching.current) return
    fetching.current = true
    const resume = loadResume()
    fetch('/api/generate-life', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': getUserId() },
      body: JSON.stringify({ resumeBase64: resume, branchId: branch.id, branch, templateId: tid, isDemoMode: isDemo }),
    })
      .then(async res => {
        let data: { html?: string; ok?: boolean; error?: string }
        try {
          data = await res.json()
        } catch {
          throw new Error(
            res.ok
              ? 'Unexpected response from server — try again.'
              : `Server error (${res.status}) — try again in a moment.`
          )
        }
        if (data.ok === false || !data.html) throw new Error(data.error ?? 'Could not generate your alternate life.')
        saveGeneration(branch.id, tid, data.html)
        router.push('/result')
      })
      .catch(e => { setError((e as Error).message); fetching.current = false })
  }, [router])

  useEffect(() => {
    const deck = shuffle(getLoadingPhrases(demo))
    setShuffled(deck)
    setPhraseIndex(0)
  }, [demo])

  useEffect(() => {
    if (shuffled.length === 0) return
    const interval = setInterval(() => {
      setPhraseIndex(i => {
        const next = i + 1
        if (next >= shuffled.length) { setShuffled(shuffle(getLoadingPhrases(demo))); return 0 }
        return next
      })
    }, 2600)
    return () => clearInterval(interval)
  }, [shuffled, demo])

  function handleStartOver() { clearAll(); router.push('/upload') }

  const phrases = shuffled.length ? shuffled : getLoadingPhrases(demo)

  if (error) {
    return (
      <main className="h-dvh bg-cream flex flex-col px-6 md:px-14 py-8 overflow-hidden">
        <nav>
          <Link href="/" className="font-display font-light italic text-xl text-ink hover:text-coral transition-colors" style={{ letterSpacing: '-0.02em' }}>
            Almost
          </Link>
        </nav>
        <div className="flex-1 flex flex-col justify-center max-w-sm gap-6">
          <Lockup
            variant="page"
            eyebrow={<><span className="text-coral/70">( ! )</span>&nbsp;&nbsp;Error</>}
            display={<>almost <span className="font-extralight italic">worked</span>.</>}
            caption={error}
          />
          <div className="flex gap-6 mt-2">
            <button onClick={() => router.push('/branches')} className="font-inter text-sm text-coral hover:text-glow transition-colors">← try a different fork</button>
            <button onClick={handleStartOver} className="font-inter text-sm text-ink/30 hover:text-ink transition-colors">start over</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-dvh bg-cream flex flex-col px-6 md:px-14 py-8 overflow-hidden">
      <nav>
        <Link href="/" className="font-display font-light italic text-xl text-ink hover:text-coral transition-colors" style={{ letterSpacing: '-0.02em' }}>
          Almost
        </Link>
      </nav>

      <div className="flex-1 flex flex-col justify-center max-w-xs gap-8">

        {/* Taxonomy — what's happening */}
        <Taxonomy
          items={[
            'generating',
            '≈-15-seconds',
            ...(templateId ? [templateId] : []),
          ]}
        />

        {/* Fork — Magenta main, Coral Glow secondary, Gold junction dot */}
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

        <p className="font-display text-2xl font-light text-ink almost-pulse leading-snug">
          {phrases[phraseIndex]}
        </p>

      </div>
    </main>
  )
}
