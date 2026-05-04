import Link from 'next/link'
import Taxonomy from '@/components/Taxonomy'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Almost — the life you didn\'t quite live',
}

export default function Home() {
  return (
    <main className="h-dvh bg-cream flex flex-col overflow-hidden relative">

      {/* Ghost year numbers — decorative background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="absolute font-display font-light italic text-ink leading-none"
          style={{ fontSize: 'clamp(8rem, 26vw, 20rem)', opacity: 0.045, top: '-1.5rem', left: '-2rem' }}
        >
          1997
        </span>
        <span
          className="absolute font-display font-light italic text-ink leading-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 15rem)', opacity: 0.035, top: '36%', right: '-2rem' }}
        >
          2004
        </span>
        <span
          className="absolute font-display font-light italic text-ink leading-none"
          style={{ fontSize: 'clamp(9rem, 30vw, 22rem)', opacity: 0.04, bottom: '-3rem', left: '12%' }}
        >
          2011
        </span>
      </div>

      {/* Nav */}
      <nav className="shrink-0 flex items-center justify-between px-6 md:px-14 pt-8">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-coral">a parallel life generator</span>
        <Link
          href="/about"
          className="font-mono text-[11px] tracking-[0.12em] uppercase bg-coral text-cream px-2 py-1 hover:bg-ink transition-colors"
        >
          about
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-14 pb-6">

        {/* Wordmark */}
        <h1 className="font-display text-display-xl font-extralight italic text-ink">
          Almost
        </h1>

        {/* Staggered subheading — three lines, mixed weights, baseline offsets at md+ */}
        <div className="stagger-stack mt-6 flex flex-col leading-[0.95] font-display text-[clamp(1.05rem,2.6vw,1.6rem)] text-ink">
          <span className="font-extralight italic">the life</span>
          <span className="font-medium">you didn&apos;t</span>
          <span className="font-extralight italic">quite live<span className="text-coral">.</span></span>
        </div>

        {/* Magenta rule */}
        <div className="mt-8 w-10 h-px bg-coral" />

        {/* Taxonomy row — body-content metadata */}
        <Taxonomy
          className="mt-4"
          items={[
            'a-parallel-life-generator',
            'no-account',
            'gone-when-you-close-the-tab',
          ]}
        />

        {/* Numbered CTA */}
        <Link
          href="/upload"
          className="group mt-8 inline-flex items-center gap-3 font-eyebrow text-eyebrow text-ink hover:text-coral transition-colors duration-200"
        >
          <span className="text-coral/60 group-hover:text-coral transition-colors">( 01 )</span>
          Begin
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="shrink-0 px-6 md:px-14 pb-7">
        <p className="font-eyebrow text-eyebrow text-ink/22">
          The fork in the road · the version of you who took it
        </p>
      </div>

    </main>
  )
}
