'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadSelectedBranch, saveSelectedTemplate, clearAll } from '@/lib/storage'
import { TEMPLATE_META } from '@/lib/templates/index'
import StepBar from '@/components/StepBar'
import Lockup from '@/components/Lockup'
import type { TemplateId } from '@/lib/types'

const TEMPLATE_IDS: TemplateId[] = [
  'linkedin-ghost',
  'wiki-stub',
  'museum-plaque',
  'tarot-card',
]

/* ── CSS-drawn mini-preview thumbnails ── */

function LinkedInPreview() {
  return (
    <div style={{ background: '#fff', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '38%', background: 'linear-gradient(135deg, #0A66C2 0%, #1E88D4 100%)', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: -14, left: 12, width: 28, height: 28, borderRadius: '50%', background: '#C8DBF0', border: '2.5px solid #fff' }} />
      </div>
      <div style={{ padding: '18px 12px 10px', flex: 1 }}>
        <div style={{ height: 5, background: '#083d77', borderRadius: 3, width: '52%', marginBottom: 5 }} />
        <div style={{ height: 3, background: '#555', borderRadius: 2, width: '72%', marginBottom: 10 }} />
        <div style={{ height: 2, background: '#dde5f0', borderRadius: 1, width: '88%', marginBottom: 3 }} />
        <div style={{ height: 2, background: '#dde5f0', borderRadius: 1, width: '75%', marginBottom: 3 }} />
        <div style={{ height: 2, background: '#dde5f0', borderRadius: 1, width: '60%' }} />
      </div>
    </div>
  )
}

function WikiPreview() {
  return (
    <div style={{ background: '#fff', overflow: 'hidden', height: '100%', padding: '8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ borderBottom: '1px solid #a2a9b1', paddingBottom: 5 }}>
        <div style={{ height: 7, background: '#202122', borderRadius: 1, width: '48%' }} />
      </div>
      <div style={{ display: 'flex', gap: 5, flex: 1 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1, width: '85%' }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1, width: '92%' }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1, width: '70%' }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1 }} />
        </div>
        <div style={{ width: '33%', border: '1px solid #a2a9b1', padding: 5, background: '#f8f9fa', display: 'flex', flexDirection: 'column', gap: 2.5, flexShrink: 0 }}>
          <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1, width: '70%' }} />
        </div>
      </div>
    </div>
  )
}

function PlaquePreview() {
  return (
    <div style={{ background: '#ebebd3', border: '1px solid rgba(8,61,119,0.25)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6, padding: '16px 14px' }}>
      <div style={{ height: 5, background: '#083d77', borderRadius: 1, width: '52%' }} />
      <div style={{ height: 3, background: 'rgba(8,61,119,0.42)', borderRadius: 1, width: '30%' }} />
      <div style={{ width: 22, height: 1, background: 'rgba(8,61,119,0.2)', marginTop: 3 }} />
      <div style={{ height: 2, background: 'rgba(8,61,119,0.2)', borderRadius: 1, width: '82%' }} />
      <div style={{ height: 2, background: 'rgba(8,61,119,0.2)', borderRadius: 1, width: '70%' }} />
      <div style={{ height: 2, background: 'rgba(8,61,119,0.2)', borderRadius: 1, width: '55%' }} />
    </div>
  )
}

function TarotPreview() {
  return (
    <div style={{ background: '#083d77', border: '1px solid #f4d35e', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px' }}>
      <div style={{ height: 3, background: '#f4d35e', borderRadius: 1, width: '20%', opacity: 0.9 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 30, height: 30, border: '1.5px solid #f4d35e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 13, height: 13, background: '#f4d35e', transform: 'rotate(45deg)', opacity: 0.9 }} />
        </div>
      </div>
      <div style={{ height: 3, background: '#ebebd3', borderRadius: 1, width: '58%', opacity: 0.65 }} />
    </div>
  )
}

const PREVIEWS: Record<TemplateId, React.ComponentType> = {
  'linkedin-ghost': LinkedInPreview,
  'wiki-stub':      WikiPreview,
  'museum-plaque':  PlaquePreview,
  'tarot-card':     TarotPreview,
}

const TAGLINES: Record<TemplateId, string> = {
  'linkedin-ghost': 'uncanny-valley profile',
  'wiki-stub':      'wikipedia article',
  'museum-plaque':  'gallery wall card',
  'tarot-card':     'fortune foretold',
}

/* Asymmetric grid spans (12-col grid, md+ only) — diagonal rhythm.
   Tile 0 large L,  Tile 1 small R
   Tile 2 small L,  Tile 3 large R   */
const SPANS: string[] = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7']

export default function TemplatesPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<TemplateId | null>(null)
  const [branch, setBranch] = useState<{ year: number; summary: string } | null>(null)

  useEffect(() => {
    const b = loadSelectedBranch()
    if (!b) { router.push('/branches'); return }
    setBranch({ year: b.year, summary: b.summary })
  }, [router])

  function handleStartOver() { clearAll(); router.push('/upload') }

  function handleGenerate() {
    if (!selected) return
    saveSelectedTemplate(selected)
    router.push('/loading')
  }

  return (
    <main className="h-dvh bg-cream flex flex-col overflow-hidden">

      {/* Nav */}
      <header className="shrink-0 px-6 md:px-14 pt-7">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.back()}
            className="font-eyebrow text-eyebrow text-ink/35 hover:text-ink transition-colors w-16 md:w-24 text-left"
          >
            ← back
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
          <StepBar current={3} />
          <span className="font-mono text-[8px] text-ink/30">3 / 4</span>
        </div>
        <div className="mt-3 h-px bg-ink/8" />
      </header>

      {/* Page header lockup */}
      <div className="shrink-0 px-6 md:px-14 pt-5 pb-2">
        <Lockup
          variant="page"
          eyebrow={<><span className="text-coral/70">( 03 )</span>&nbsp;&nbsp;Format</>}
          display={<>pick a <span className="font-extralight italic">format</span></>}
          caption={branch ? `fork at ${branch.year} — ${branch.summary.slice(0, 60)}${branch.summary.length > 60 ? '…' : ''}` : ''}
        />
      </div>

      {/* Asymmetric template grid */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 md:px-14 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 pb-4">
          {TEMPLATE_IDS.map((id, i) => {
            const meta = TEMPLATE_META[id]
            const Preview = PREVIEWS[id]
            const isSelected = selected === id
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={[
                  'template-card w-full text-left',
                  SPANS[i],
                  isSelected ? 'template-card--selected' : '',
                ].join(' ')}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <div className="absolute inset-0">
                    <Preview />
                  </div>
                </div>
                {/* Three-line lockup label */}
                <div className="px-3 py-3 border-t border-ink/8">
                  <div className="font-tax text-tax text-ink/40 mb-1.5">
                    <span className="text-ink/25">_</span>{id}
                  </div>
                  <p className="font-display text-[15px] font-light text-ink leading-tight">
                    {meta.label}
                  </p>
                  <p className="font-inter text-caption italic text-ink/40 mt-0.5">
                    {TAGLINES[id]}
                  </p>
                </div>
              </button>
            )
          })}
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
          {selected ? 'generate this life →' : 'pick a format first'}
        </button>
        <button
          onClick={() => router.back()}
          className="w-full text-center mt-3 font-eyebrow text-eyebrow text-ink/35 hover:text-ink transition-colors"
        >
          ← back
        </button>
      </div>

    </main>
  )
}
