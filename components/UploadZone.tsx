'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveResume, saveBranches, saveDemoMode, clearAll } from '@/lib/storage'
import { getDemoBranches } from '@/lib/demo/zelda-profile'

const MAX_BYTES = 10 * 1024 * 1024

export default function UploadZone() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleFile(file: File) {
    setError(null)

    if (file.type !== 'application/pdf') {
      setError('that\'s not a PDF — LinkedIn → More → Save to PDF, then try again.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('file is over 10MB. LinkedIn PDFs are usually under 1MB.')
      return
    }

    setLoading(true)
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const dataUrl = reader.result as string
        const base64 = dataUrl.replace(/^data:application\/pdf;base64,/, '')
        clearAll()
        saveResume(base64)
        router.push('/branches')
      } catch (e) {
        setError(e instanceof Error ? e.message : 'something went wrong. try again.')
        setLoading(false)
      }
    }

    reader.onerror = () => {
      setError('couldn\'t read that file. try again.')
      setLoading(false)
    }

    reader.readAsDataURL(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDemo() {
    setLoading(true)
    clearAll()
    saveDemoMode()
    saveBranches(getDemoBranches())
    router.push('/branches')
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Drop zone */}
      <button
        onClick={() => !loading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        disabled={loading}
        className={[
          'w-full text-left border px-8 py-12 transition-all duration-150 cursor-pointer group',
          dragging
            ? 'border-coral bg-coral/[0.04]'
            : 'border-ink/20 hover:border-ink/50',
          loading ? 'opacity-40 cursor-not-allowed' : '',
        ].join(' ')}
      >
        <p className={[
          'font-fraunces text-2xl font-light leading-snug transition-colors duration-150',
          dragging ? 'text-coral' : 'text-ink/55 group-hover:text-ink',
        ].join(' ')}>
          {loading ? 'reading…' : dragging ? 'drop it.' : 'drop file here'}
        </p>
        <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink/35 mt-2">
          PDF · max 10 MB
        </p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      {error && (
        <p className="font-inter text-sm text-coral">{error}</p>
      )}

      {/* Demo */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-ink/8" />
        <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-ink/25">or</span>
        <div className="flex-1 h-px bg-ink/8" />
      </div>

      <button
        onClick={handleDemo}
        disabled={loading}
        className="group inline-flex items-center gap-2 font-inter text-sm text-ink/50 hover:text-ink transition-colors disabled:opacity-30"
      >
        try Zelda&apos;s LinkedIn instead
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </button>

    </div>
  )
}
