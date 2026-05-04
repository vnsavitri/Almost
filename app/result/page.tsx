'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  loadSelectedBranch,
  loadSelectedTemplate,
  loadGeneration,
  saveGeneration,
  isDemoMode,
  clearAll,
} from '@/lib/storage'
import { isPro } from '@/lib/paywall'
import { getUserId } from '@/lib/user-id'
import { TEMPLATE_META } from '@/lib/templates/index'
import StepBar from '@/components/StepBar'
import Lockup from '@/components/Lockup'
import Taxonomy from '@/components/Taxonomy'
import PaywallModal from '@/components/PaywallModal'
import type { TemplateId } from '@/lib/types'

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
}

/** Split a template label so we can render mixed-weight Fraunces.
 *  e.g. "The Tarot Card" → first word italic+light, rest medium.
 */
function MixedWeightTitle({ label }: { label: string }) {
  const words = label.split(' ')
  if (words.length < 2) {
    return <span className="font-medium">{label}</span>
  }
  const [first, ...rest] = words
  return (
    <>
      <span className="font-extralight italic">{first}</span>{' '}
      <span className="font-medium">{rest.join(' ')}</span>
    </>
  )
}

export default function ResultPage() {
  const router = useRouter()
  const [html, setHtml] = useState<string | null>(null)
  const [templateId, setTemplateId] = useState<TemplateId | null>(null)
  const [branchId, setBranchId] = useState<string | null>(null)
  const [branchSummary, setBranchSummary] = useState<string>('')
  const [branchYear, setBranchYear] = useState<number | null>(null)
  const [regenerating, setRegenerating] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    const branch = loadSelectedBranch()
    const tid = loadSelectedTemplate() as TemplateId | null
    if (!branch || !tid) { router.push('/branches'); return }
    const saved = loadGeneration(branch.id, tid)
    if (!saved) { router.push('/loading'); return }
    setBranchId(branch.id)
    setBranchSummary(branch.summary)
    setBranchYear(branch.year)
    setTemplateId(tid)
    setHtml(saved)
  }, [router])

  async function handleRegenerate() {
    if (!isPro()) { setShowPaywall(true); return }
    await doRegenerate()
  }

  async function doRegenerate() {
    const branch = loadSelectedBranch()
    const tid = loadSelectedTemplate() as TemplateId | null
    if (!branch || !tid) return
    setRegenerating(true)
    try {
      const resume = (await import('@/lib/storage')).loadResume()
      const isDemo = isDemoMode()
      const res = await fetch('/api/generate-life', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': getUserId() },
        body: JSON.stringify({ resumeBase64: resume, branchId: branch.id, branch, templateId: tid, isDemoMode: isDemo }),
      })
      if (res.status === 402) { setShowPaywall(true); return }
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
      if (data.html) { saveGeneration(branch.id, tid, data.html); setHtml(data.html) }
    } finally {
      setRegenerating(false)
    }
  }

  function handleDownload() {
    if (!html || !templateId) return
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `almost-${templateId}-${slugify(branchSummary)}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleStartOver() { clearAll(); router.push('/upload') }

  if (!html || !templateId) {
    return (
      <main className="h-dvh bg-cream flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-coral/50 animate-pulse" />
      </main>
    )
  }

  return (
    <main className="h-dvh bg-cream flex flex-col overflow-hidden">

      {showPaywall && (
        <PaywallModal
          reason="regenerate"
          onSuccess={() => { setShowPaywall(false); doRegenerate() }}
          onDismiss={() => setShowPaywall(false)}
        />
      )}

      {/* Nav */}
      <header className="shrink-0 px-6 md:px-14 pt-7">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.push('/branches')}
            className="font-eyebrow text-eyebrow text-ink/35 hover:text-ink transition-colors w-16 md:w-24 text-left"
          >
            ← fork
          </button>
          <Link
            href="/"
            className="font-display font-light italic text-xl text-ink hover:text-coral transition-colors"
            style={{ letterSpacing: '-0.02em' }}
          >
            Almost
          </Link>
          <div className="w-16 md:w-24 flex justify-end">
            <button
              onClick={handleStartOver}
              className="font-eyebrow text-eyebrow text-ink/35 hover:text-coral transition-colors"
            >
              start over
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <StepBar current={4} />
          <span className="font-mono text-[8px] text-ink/30">4 / 4</span>
        </div>
        <div className="mt-3 h-px bg-ink/8" />
      </header>

      {/* Result lockup — kinetic mixed-weight title */}
      <div className="shrink-0 px-6 md:px-14 pt-4 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Lockup
              variant="page"
              eyebrow={
                <span className="flex items-center gap-3">
                  <span className="text-coral/70">( 04 )</span>
                  Result
                  {branchYear && (
                    <>
                      <span className="text-ink/20">·</span>
                      <span className="bg-ink text-gold px-1.5 py-0.5 -my-0.5">
                        {branchYear}
                      </span>
                    </>
                  )}
                </span>
              }
              display={<MixedWeightTitle label={TEMPLATE_META[templateId].label} />}
              caption={branchSummary}
            />
            <Taxonomy
              className="mt-3"
              items={[
                templateId,
                `branch-${branchId ?? '0'}`,
                'generated',
              ]}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              title="Regenerate"
              className={[
                'font-mono text-[10px] px-2.5 py-1.5 border transition-colors duration-150',
                regenerating
                  ? 'border-ink/10 text-ink/20 cursor-not-allowed'
                  : 'border-ink/20 text-ink/45 hover:border-coral hover:text-coral',
              ].join(' ')}
            >
              {regenerating ? '…' : '↺'}
            </button>
            <button
              onClick={handleDownload}
              title="Download"
              className="font-mono text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 bg-glow text-ink hover:bg-coral hover:text-cream transition-all duration-150"
            >
              ↓ save
            </button>
          </div>
        </div>
      </div>

      {/* Preview iframe */}
      <div className={[
        'flex-1 min-h-0 px-6 md:px-14 pb-4 transition-opacity duration-300',
        regenerating ? 'opacity-20' : 'opacity-100',
      ].join(' ')}>
        <div className="w-full h-full border border-ink/10 overflow-hidden">
          <iframe
            srcDoc={html}
            sandbox="allow-same-origin"
            className="w-full h-full block border-0"
            title="Your alternate life"
          />
        </div>
      </div>

      {/* Footer nav */}
      <div className="shrink-0 flex items-center gap-5 px-6 md:px-14 pb-5 pt-1 border-t border-ink/8">
        <button
          onClick={() => router.push('/branches')}
          className="font-inter text-[12px] text-ink/38 hover:text-coral transition-colors"
        >
          ← different fork
        </button>
        <span className="text-ink/15 font-mono text-[10px]">·</span>
        <button
          onClick={() => router.push('/templates')}
          className="font-inter text-[12px] text-ink/38 hover:text-coral transition-colors"
        >
          ← change format
        </button>
      </div>

    </main>
  )
}
