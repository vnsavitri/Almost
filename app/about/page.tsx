import Link from 'next/link'
import Lockup from '@/components/Lockup'
import Taxonomy from '@/components/Taxonomy'

/* ── Step cards ─────────────────────────────────────────────────────────── */

const STEPS = [
  {
    n: '01',
    label: 'Upload',
    headerBg:   '#da4167',
    headerText: '#ebebd3',
    text: 'Your LinkedIn PDF or resume/CV. Almost reads the contours — titles, transitions, the moments where the road branched.',
  },
  {
    n: '02',
    label: 'Fork',
    headerBg:   '#f78764',
    headerText: '#083d77',
    text: 'Almost surfaces 3–5 genuine choice-points in your career. Real inflection points, not vague life philosophy.',
  },
  {
    n: '03',
    label: 'Format',
    headerBg:   '#f4d35e',
    headerText: '#083d77',
    text: 'Choose how your alternate life gets told. LinkedIn profile. Wikipedia stub. Museum plaque. Tarot card.',
  },
  {
    n: '04',
    label: 'Result',
    headerBg:   '#083d77',
    headerText: '#ebebd3',
    text: 'The other version of you, fully rendered. Download it. Leave it open in a tab for a while.',
  },
]

/* ── SVG icons ──────────────────────────────────────────────────────────── */

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */

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

      {/* ── HERO + WHAT IT IS ─────────────────────────────────────────── */}
      <div className="px-6 md:px-14 pt-10 md:pt-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12">

          {/* Left */}
          <div className="md:col-span-7 flex flex-col gap-8 pb-12">

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

            <div className="flex flex-col gap-5">
              <p className="font-display text-display font-light text-ink leading-snug">
                Almost reads your LinkedIn PDF, finds the moments where your career could have gone differently, and generates the other version of you.
              </p>
              <p className="font-inter text-body text-ink/65 leading-relaxed">
                Not the better version. Not the worse one. Just the one that happened when you said yes instead of no. Or stayed instead of left. Or took the PhD and told the startup to wait.
              </p>
            </div>

          </div>

          {/* Right — decorative */}
          <div className="hidden md:flex md:col-span-5 flex-col items-end justify-between pt-2 pb-12 pointer-events-none select-none">
            <span
              aria-hidden
              className="font-display font-light italic text-ink leading-none"
              style={{ fontSize: 'clamp(6rem, 10vw, 11rem)', opacity: 0.045 }}
            >
              2011
            </span>
            <div className="text-right flex flex-col gap-3 max-w-[18rem]">
              <div className="w-8 h-px bg-coral/40 ml-auto" />
              <p className="font-display text-display font-extralight italic text-ink/40 leading-snug">
                the fork in the road ·<br />the version of you<br />who took it.
              </p>
            </div>
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

      {/* ── HOW IT WORKS — 2×2 coloured step cards ───────────────────── */}
      <div className="px-6 md:px-14 pb-14">
        <p className="font-eyebrow text-eyebrow text-ink/40 tracking-[0.22em] uppercase mb-6">
          How it works
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STEPS.map(({ n, label, headerBg, headerText, text }) => (
            <div
              key={n}
              className="flex flex-col overflow-hidden"
              style={{
                border: '2px solid #083d77',
                boxShadow: '4px 4px 0 rgba(8,61,119,0.18)',
              }}
            >
              {/* Coloured header */}
              <div
                className="shrink-0 flex items-center justify-between px-3 py-2"
                style={{ background: headerBg }}
              >
                <span
                  className="font-display italic font-light text-2xl leading-none"
                  style={{ color: headerText }}
                >
                  {n}
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: headerText, opacity: 0.75 }}
                >
                  {label}
                </span>
              </div>
              {/* Body */}
              <div className="px-3 py-3 flex-1 bg-cream">
                <p className="font-inter text-[13px] leading-relaxed text-ink/65">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FULL-BLEED DARK QUOTE BLOCK ───────────────────────────────── */}
      <div className="bg-ink px-6 md:px-14 py-14 md:py-24">
        {/* Fork graphic */}
        <div className="relative w-12 h-10 mb-12" aria-hidden>
          <div className="absolute left-1/2 top-0 w-px h-5 bg-cream/20 -translate-x-1/2" />
          <div className="absolute left-0 top-5 right-1/2 h-px bg-coral/60" />
          <div className="absolute left-1/2 top-5 right-0 h-px bg-glow/60" />
          <div className="absolute left-1/2 top-5 w-2 h-2 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Intro — dimmed, flows naturally at full width */}
        <p className="font-display text-display font-extralight italic text-cream/55 leading-snug max-w-3xl">
          &ldquo;The unlived life is not a mistake. It&rsquo;s the other book on the shelf.&rdquo;
        </p>

        {/* Separator */}
        <div className="w-10 h-px bg-coral/40 my-8" />

        {/* Punchline — big title callout */}
        <p
          className="font-display font-light italic text-cream leading-tight"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', letterSpacing: '-0.025em' }}
        >
          Same author,<br className="md:hidden" /> different ending.
        </p>

        <div className="w-10 h-0.5 bg-gold mt-10" />
      </div>

      {/* ── PREMISE + PRIVACY ─────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
          <div className="md:col-span-7 flex flex-col gap-10">

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

            <section className="flex flex-col gap-5">
              <Taxonomy items={['no-account', 'no-storage', 'gone-when-you-close']} />
              <p className="font-inter text-body text-ink/65 leading-relaxed">
                Your PDF is read once, in memory, then gone. We don&rsquo;t store it. We don&rsquo;t save your name. We don&rsquo;t track which fork you picked. Close the tab: it never happened.
              </p>
            </section>

          </div>

          <div className="hidden md:flex md:col-span-5 items-start justify-end pt-2">
            <span
              aria-hidden
              className="font-display font-light italic text-ink leading-none"
              style={{ fontSize: 'clamp(5rem, 8vw, 9rem)', opacity: 0.04 }}
            >
              2004
            </span>
          </div>
        </div>
      </div>

      {/* ── BUILT BY VIVID ────────────────────────────────────────────── */}
      <div
        className="px-6 md:px-14 py-14 md:py-16"
        style={{ borderTop: '2px solid #083d77', background: 'rgba(8,61,119,0.04)' }}
      >
        <p className="font-eyebrow text-eyebrow text-ink/40 tracking-[0.22em] uppercase mb-10">
          Built by
        </p>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8">

          {/* Left — name + links */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <p
              className="font-display font-light italic leading-none text-coral"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', letterSpacing: '-0.025em' }}
            >
              Vivid
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/vnsavitri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/40 hover:text-coral transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/vnsavitri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/40 hover:text-coral transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
            <div className="w-8 h-px bg-coral/30" />
            <p className="font-mono text-[10px] tracking-[0.14em] text-ink/35 uppercase">
              Sydney · AI/ML Product
            </p>
          </div>

          {/* Right — bio */}
          <div className="md:col-span-8 flex flex-col gap-5">
            <p className="font-inter text-body text-ink/65 leading-relaxed">
              I&rsquo;m an AI product builder with 15+ years working across design, technology, and data science. My career has taken me across four continents and a wide range of domains, from games and immersive media to AI-driven consumer products and biotech.
            </p>
            <p className="font-inter text-body text-ink/65 leading-relaxed">
              I&rsquo;ve lived in 12 countries on four continents, which shaped how I think about systems, uncertainty, and people. I started trading stocks as a teenager, and that early exposure still influences how I approach product work today. I care about clear thinking, fast learning loops, and being honest about what actually works.
            </p>
            <p className="font-inter text-body text-ink/65 leading-relaxed">
              I&rsquo;m currently based in Sydney, leading AI/ML product work at Breville. My focus is on taking AI from idea to production — building practical LLM-powered tools, agents, and platforms that ship and get used by real people across global teams.
            </p>
            <p className="font-inter text-body text-ink/65 leading-relaxed">
              More recently, I&rsquo;ve been spending time on a personal project — an open research repo exploring how AI can support cancer understanding, sense-making, and patient-facing knowledge. It&rsquo;s a learning-first project, grounded in curiosity and care, and a way for me to apply AI to something deeply human rather than purely commercial.
            </p>
          </div>

        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-14 md:py-20">
        <p
          className="font-display font-extralight italic text-ink leading-tight mb-8"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
        >
          Ready to meet<br />the other you?
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/upload"
            className="inline-flex items-center gap-3 bg-ink text-cream font-inter text-sm font-medium px-6 py-3 hover:bg-coral transition-colors duration-200"
          >
            Begin →
          </Link>
          <Link
            href="/branches"
            className="font-display font-light italic text-ink/45 hover:text-coral text-sm transition-colors duration-200 underline underline-offset-4"
          >
            or try Zelda&rsquo;s what-if
          </Link>
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
