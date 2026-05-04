import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Coolors palette — https://coolors.co/083d77-ebebd3-da4167-f4d35e-f78764
        cream: '#ebebd3',   // Beige           — page background, text on dark
        ink:   '#083d77',   // Regal Navy      — primary text, dark fills
        coral: '#da4167',   // Magenta Bloom   — primary accent: CTAs, selection
        gold:  '#f4d35e',   // Royal Gold      — on-dark only: save btn, year badge
        glow:  '#f78764',   // Coral Glow      — warm CTA hover + fork secondary
      },
      fontFamily: {
        // Display — Fraunces, serif. Loaded via next/font in app/layout.tsx
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        // Body — Inter, sans
        inter:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Mono — system stack for editorial taxonomy + eyebrows. No external fetch.
        mono:     ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        // ── Display scale (Fraunces) ────────────────────────────────────────
        // Tuple syntax: [size, { lineHeight, letterSpacing }]
        'display-xl': ['clamp(5rem, 18vw, 13rem)',   { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 5vw, 3.5rem)',   { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'display':    ['clamp(1.4rem, 3.5vw, 2.2rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],

        // ── Body scale (Inter) ──────────────────────────────────────────────
        'body-lg': ['1rem',     { lineHeight: '1.55' }],
        'body':    ['0.875rem', { lineHeight: '1.55' }],
        'body-sm': ['0.75rem',  { lineHeight: '1.5'  }],

        // ── Editorial micro-scale ───────────────────────────────────────────
        // eyebrow: small caps mono label (used in Lockup + section headers)
        'eyebrow': ['0.625rem',  { lineHeight: '1', letterSpacing: '0.22em' }],
        // tax: underscore taxonomy tags (mono, no tracking)
        'tax':     ['0.6875rem', { lineHeight: '1.2' }],
        // caption: italic Inter caption beneath display
        'caption': ['0.75rem',   { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}

export default config
