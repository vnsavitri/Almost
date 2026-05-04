import Link from 'next/link'
import Lockup from '@/components/Lockup'
import Taxonomy from '@/components/Taxonomy'

const STEPS = [
  { n: '01', text: 'Upload your LinkedIn PDF or resume/CV' },
  { n: '02', text: 'Almost finds 3–5 real fork points in your career' },
  { n: '03', text: 'You pick one moment' },
  { n: '04', text: 'Almost generates that alternate life — as a LinkedIn profile, a Wikipedia stub, a museum plaque, or a tarot card' },
]

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-cream flex flex-col overflow-x-hidden">

      {/* Nav */}
      <header className="shrink-0 px-6 md:px-14 pt-7 pb-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-eyebrow text-eyebrow text-ink/35 hover:text-ink transition-colors w-16 md:w-24 text-left"
          >
            ← back
          </Link>
          <Link
            href="/"
            className="font-display font-light italic text-xl text-ink hover:text-coral transition-colors"
            style={{ letterSpacing: '-0.02em' }}
          >
            Almost
          </Link>
          <div className="w-16 md:w-24 flex justify-end">
            <Link
              href="/upload"
              className="font-eyebrow text-eyebrow text-ink/35 hover:text-coral transition-colors"
            >
              begin →
            </Link>
          </div>
        </div>
        <div className="mt-5 h-px bg-ink/8" />
      </header>

      {/* Content — 12-col grid at md+ */}
      <div className="flex-1 px-6 md:px-14 pt-10 md:pt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-0">

          {/* ── Left column — main content ── */}
          <div className="md:col-span-7 flex flex-col gap-10">

            <Lockup
              variant="page"
              eyebrow={<><span className="text-coral/70">( 00 )</span>&nbsp;&nbsp;About</>}
              display={<>a <span className="font-extralight italic">thought</span> experiment</>}
              caption="not a product. not a service. a question."
            />

            <Taxonomy
              items={[
                'ai-powered',
                'no-account',
                'no-data-stored',
                'gone-when-you-close-the-tab',
              ]}
            />

            <div className="h-px bg-ink/8" />

            {/* What it is */}
            <section className="flex flex-col gap-5">
              <p className="font-display text-display font-light text-ink leading-snug">
                Almost reads your LinkedIn PDF, finds the moments where your career could have gone differently, and generates the other version of you.
              </p>
              <p className="font-inter text-body text-ink/65 leading-relaxed">
                Not the better version. Not the worse one. Just the one that happened when you said yes instead of no. Or stayed instead of left. Or took the PhD and told the startup to wait.
              </p>
            </section>

            <div className="h-px bg-ink/8" />

            {/* How it works */}
            <section className="flex flex-col gap-7">
              <p className="font-eyebrow text-eyebrow text-ink/40 tracking-[0.22em] uppercase">
                How it works
              </p>
              <ol className="flex flex-col gap-8">
                {STEPS.map(({ n, text }) => (
                  <li key={n} className="flex items-start gap-5">
                    <span
                      aria-hidden
                      className="font-mono text-[10px] tracking-[0.18em] text-coral/45 shrink-0 pt-1.5"
                    >
                      ( {n} )
                    </span>
                    <span className="font-display text-display font-light text-ink leading-snug">
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="h-px bg-ink/8" />

            {/* The premise */}
            <section className="flex flex-col gap-5">
              <p className="font-eyebrow text-eyebrow text-ink/40 tracking-[0.22em] uppercase">
                The premise
              </p>
              <p className="font-display text-display font-extralight italic text-ink leading-snug">
                &ldquo;There&rsquo;s a version of you who stayed.&rdquo;
              </p>
              <p className="font-inter text-body text-ink/65 leading-relaxed">
                One who took the startup offer instead of the safe job. One who didn&rsquo;t move cities. One who stayed in academia and is now, somehow, publishing papers on topics nobody asked about but everyone secretly finds fascinating.
              </p>
              <p className="font-inter text-body text-ink/65 leading-relaxed">
                Almost doesn&rsquo;t tell you which choice was right. It just shows you what was possible. What you almost were.
              </p>
            </section>

            <div className="h-px bg-ink/8" />

            {/* Privacy */}
            <section className="flex flex-col gap-5">
              <Taxonomy items={['no-account', 'no-storage', 'gone-when-you-close']} />
              <p className="font-inter text-body text-ink/65 leading-relaxed">
                Your PDF is read once, in memory, then gone. We don&rsquo;t store it. We don&rsquo;t save your name. We don&rsquo;t track which fork you picked. Close the tab: it never happened.
              </p>
            </section>

            {/* CTA */}
            <Link
              href="/upload"
              className="group inline-flex items-center gap-3 font-eyebrow text-eyebrow text-ink hover:text-coral transition-colors duration-200 mt-2"
            >
              <span className="text-coral/60 group-hover:text-coral transition-colors">( 01 )</span>
              begin your own
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>

          </div>

          {/* ── Right column — decorative, desktop only ── */}
          <div className="hidden md:flex md:col-span-5 flex-col items-end justify-between pt-2 pb-4 pointer-events-none select-none">

            {/* Ghost year — top-right */}
            <span
              aria-hidden
              className="font-display font-light italic text-ink leading-none"
              style={{ fontSize: 'clamp(6rem, 10vw, 11rem)', opacity: 0.045 }}
            >
              2011
            </span>

            {/* Pull-quote — midway down */}
            <div className="text-right flex flex-col gap-3 max-w-[18rem]">
              <div className="w-8 h-px bg-coral/40 ml-auto" />
              <p className="font-display text-display font-extralight italic text-ink/40 leading-snug">
                the fork in the road ·<br />the version of you<br />who took it.
              </p>
            </div>

            {/* Bottom ghost year */}
            <span
              aria-hidden
              className="font-display font-light italic text-ink leading-none"
              style={{ fontSize: 'clamp(5rem, 8vw, 9rem)', opacity: 0.03 }}
            >
              1998
            </span>

          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="shrink-0 px-6 md:px-14 pb-7 pt-5 border-t border-ink/8">
        <p className="font-eyebrow text-eyebrow text-ink/22">
          The fork in the road · the version of you who took it
        </p>
      </footer>

    </main>
  )
}
