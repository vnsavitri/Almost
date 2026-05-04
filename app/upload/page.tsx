import Link from 'next/link'
import UploadZone from '@/components/UploadZone'
import StepBar from '@/components/StepBar'
import Lockup from '@/components/Lockup'
import Taxonomy from '@/components/Taxonomy'

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">

      {/* Nav */}
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
          <span className="w-16 md:w-24" />
        </div>
        <div className="flex items-center justify-between">
          <StepBar current={1} />
          <span className="font-mono text-[8px] text-ink/30">1 / 4</span>
        </div>
        <div className="mt-3 h-px bg-ink/8" />
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-14 py-12 max-w-xl">

        <Lockup
          variant="page"
          eyebrow={<><span className="text-coral/70">( 01 )</span>&nbsp;&nbsp;Upload</>}
          display={<><span className="font-extralight italic">drop your</span> LinkedIn <span className="font-extralight italic">here</span></>}
          caption="pdf · max 10mb · client-side, never sent until you submit"
          className="mb-8"
        />

        <UploadZone />

        <Taxonomy
          className="mt-8"
          items={[
            'pdf-only',
            'client-side',
            'no-trace',
          ]}
        />

      </div>

    </main>
  )
}
