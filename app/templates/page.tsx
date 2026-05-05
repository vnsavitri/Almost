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

/* ── Card colour system ──────────────────────────────────────────────────── */

type CardConfig = {
  headerBg:   string
  headerText: string
  bodyBg:     string
  shadowCol:  string
  tag:        string
  tagline:    string
}

const CARD_CONFIG: Record<TemplateId, CardConfig> = {
  'linkedin-ghost': {
    headerBg:   '#0A66C2',
    headerText: '#ffffff',
    bodyBg:     '#ffffff',
    shadowCol:  '#083d77',
    tag:        'linkedin',
    tagline:    'uncanny-valley profile',
  },
  'wiki-stub': {
    headerBg:   '#f78764',
    headerText: '#083d77',
    bodyBg:     '#ffffff',
    shadowCol:  '#083d77',
    tag:        'wikipedia',
    tagline:    'barely notable',
  },
  'museum-plaque': {
    headerBg:   '#f4d35e',
    headerText: '#083d77',
    bodyBg:     '#ebebd3',
    shadowCol:  '#083d77',
    tag:        'gallery',
    tagline:    'gallery wall card',
  },
  'tarot-card': {
    headerBg:   '#da4167',
    headerText: '#ebebd3',
    bodyBg:     '#083d77',
    shadowCol:  '#da4167',
    tag:        'tarot',
    tagline:    'fortune foretold',
  },
}

/* ── CSS-drawn preview thumbnails ──────────────────────────────────────── */

function LinkedInPreview() {
  return (
    <div style={{ background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header band */}
      <div style={{ height: '40%', background: 'linear-gradient(135deg,#0A66C2 0%,#1E88D4 100%)', flexShrink: 0, position: 'relative' }}>
        {/* Avatar */}
        <div style={{ position: 'absolute', bottom: -16, left: 14, width: 32, height: 32, borderRadius: '50%', background: '#C8DBF0', border: '3px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
      </div>
      {/* Body */}
      <div style={{ padding: '22px 14px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ height: 6, background: '#083d77', borderRadius: 2, width: '54%' }} />
        <div style={{ height: 3.5, background: '#444', borderRadius: 2, width: '76%' }} />
        <div style={{ height: 3, background: '#b0b0b0', borderRadius: 2, width: '44%', marginBottom: 4 }} />
        {/* Open to work badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#d4edda', border: '1px solid #28a745', borderRadius: 999, padding: '2px 6px', alignSelf: 'flex-start' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#28a745' }} />
          <div style={{ height: 2.5, background: '#28a745', borderRadius: 1, width: 30 }} />
        </div>
        <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <div style={{ height: 2, background: '#e0e6f0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#e0e6f0', borderRadius: 1, width: '80%' }} />
          <div style={{ height: 2, background: '#e0e6f0', borderRadius: 1, width: '65%' }} />
        </div>
      </div>
    </div>
  )
}

function WikiPreview() {
  return (
    <div style={{ background: '#fff', height: '100%', padding: '8px', display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden' }}>
      {/* Stub banner */}
      <div style={{ background: '#eaf3fb', border: '1px solid #a2c8e8', padding: '3px 6px', display: 'flex', gap: 4, alignItems: 'center' }}>
        <div style={{ width: 8, height: 8, borderRadius: 1, background: '#3d77c2', flexShrink: 0 }} />
        <div style={{ height: 2.5, background: '#3d77c2', borderRadius: 1, flex: 1 }} />
      </div>
      {/* Title */}
      <div style={{ height: 7, background: '#202122', borderRadius: 1, width: '60%' }} />
      {/* Main layout */}
      <div style={{ display: 'flex', gap: 5, flex: 1 }}>
        {/* Text column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1, width: '90%' }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1, width: '82%' }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1, width: '74%' }} />
          {/* Section heading */}
          <div style={{ height: 3.5, background: '#083d77', borderRadius: 1, width: '50%', marginTop: 2 }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#e0e0e0', borderRadius: 1, width: '88%' }} />
        </div>
        {/* Infobox */}
        <div style={{ width: '34%', border: '1px solid #a2a9b1', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: '#eaecf0', borderBottom: '1px solid #a2a9b1', padding: '3px 4px' }}>
            <div style={{ height: 2.5, background: '#54595d', borderRadius: 1, width: '70%' }} />
          </div>
          <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1 }} />
            <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1 }} />
            <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1, width: '80%' }} />
            <div style={{ height: 2, background: '#c0c0c0', borderRadius: 1, width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PlaquePreview() {
  return (
    <div style={{ background: '#ebebd3', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Inner inset border */}
      <div style={{ border: '1px solid rgba(8,61,119,0.25)', margin: '10px', flex: 1, height: 'calc(100% - 20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '12px 16px' }}>
        <div style={{ height: 5, background: '#083d77', borderRadius: 1, width: '55%' }} />
        <div style={{ height: 3, background: 'rgba(8,61,119,0.45)', borderRadius: 1, width: '28%' }} />
        {/* Gold rule */}
        <div style={{ width: 28, height: 1.5, background: '#f4d35e', margin: '1px 0' }} />
        <div style={{ height: 2, background: 'rgba(8,61,119,0.22)', borderRadius: 1, width: '85%' }} />
        <div style={{ height: 2, background: 'rgba(8,61,119,0.22)', borderRadius: 1, width: '75%' }} />
        <div style={{ height: 2, background: 'rgba(8,61,119,0.22)', borderRadius: 1, width: '65%' }} />
        <div style={{ height: 2, background: 'rgba(8,61,119,0.22)', borderRadius: 1, width: '52%' }} />
      </div>
    </div>
  )
}

function TarotPreview() {
  return (
    <div style={{ background: '#083d77', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '8px', overflow: 'hidden', border: '1px solid rgba(244,211,94,0.25)' }}>
      {/* Roman numeral */}
      <div style={{ height: 3, background: '#f4d35e', borderRadius: 1, width: '18%', opacity: 0.9 }} />
      {/* Central symbol — circle + star */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #f4d35e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Star shape via rotated squares */}
          <div style={{ position: 'relative', width: 16, height: 16 }}>
            <div style={{ position: 'absolute', inset: 0, background: '#f4d35e', transform: 'rotate(0deg)', opacity: 0.9 }} />
            <div style={{ position: 'absolute', inset: 0, background: '#f4d35e', transform: 'rotate(45deg)', opacity: 0.9 }} />
          </div>
        </div>
        {/* Suit dots */}
        <div style={{ display: 'flex', gap: 3 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#f4d35e', opacity: 0.6 }} />
          ))}
        </div>
      </div>
      {/* Card title */}
      <div style={{ height: 3, background: '#ebebd3', borderRadius: 1, width: '62%', opacity: 0.65 }} />
    </div>
  )
}

const PREVIEWS: Record<TemplateId, React.ComponentType> = {
  'linkedin-ghost': LinkedInPreview,
  'wiki-stub':      WikiPreview,
  'museum-plaque':  PlaquePreview,
  'tarot-card':     TarotPreview,
}

/* ── Page ───────────────────────────────────────────────────────────────── */

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

      {/* Page header */}
      <div className="shrink-0 px-6 md:px-14 pt-4 pb-2">
        <Lockup
          variant="page"
          eyebrow={<><span className="text-coral/70">( 03 )</span>&nbsp;&nbsp;Format</>}
          display={<>pick a <span className="font-extralight italic">format</span></>}
          caption={branch ? `fork at ${branch.year} — ${branch.summary.slice(0, 55)}${branch.summary.length > 55 ? '…' : ''}` : ''}
        />
      </div>

      {/* 2 × 2 card grid — always fills the remaining height */}
      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-3 px-4 md:px-14 py-3 pb-4">
        {TEMPLATE_IDS.map((id) => {
          const cfg = CARD_CONFIG[id]
          const meta = TEMPLATE_META[id]
          const Preview = PREVIEWS[id]
          const isSelected = selected === id

          return (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className="group text-left flex flex-col overflow-hidden h-full"
              style={{
                background: cfg.bodyBg,
                border: `2px solid #083d77`,
                boxShadow: isSelected
                  ? `1px 1px 0 ${cfg.shadowCol}`
                  : `5px 5px 0 ${cfg.shadowCol}`,
                transform: isSelected ? 'translate(4px, 4px)' : 'translate(0, 0)',
                transition: 'box-shadow 0.12s ease, transform 0.12s ease',
                outline: isSelected ? `2px solid ${cfg.headerBg}` : 'none',
                outlineOffset: '-4px',
              }}
            >
              {/* Coloured header strip */}
              <div
                className="shrink-0 flex items-center justify-between px-3 py-2"
                style={{ background: cfg.headerBg }}
              >
                <span
                  className="font-mono text-[8px] uppercase tracking-widest"
                  style={{ color: cfg.headerText, opacity: 0.85 }}
                >
                  _{cfg.tag}
                </span>
                {isSelected && (
                  <span
                    className="font-mono text-[9px] font-bold"
                    style={{ color: cfg.headerText }}
                  >
                    ✓
                  </span>
                )}
              </div>

              {/* Preview — fills remaining card height */}
              <div className="flex-1 min-h-0 relative">
                <div className="absolute inset-0">
                  <Preview />
                </div>
              </div>

              {/* Label footer */}
              <div
                className="shrink-0 px-3 py-2"
                style={{ borderTop: '1px solid rgba(8,61,119,0.12)', background: cfg.bodyBg }}
              >
                <p
                  className="font-display font-light text-ink leading-none"
                  style={{ fontSize: 'clamp(11px, 1.5vw, 14px)' }}
                >
                  {meta.label}
                </p>
                <p className="font-mono text-[8px] uppercase tracking-widest mt-1" style={{ color: 'rgba(8,61,119,0.4)' }}>
                  {cfg.tagline}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Sticky CTA */}
      <div className="shrink-0 px-6 md:px-14 pt-3 pb-5 md:pb-8 border-t border-ink/8 bg-cream">
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
          {selected ? `generate this life →` : 'pick a format first'}
        </button>
      </div>

    </main>
  )
}
