# CLAUDE.md — Almost

> Read this file fully before doing anything. It is the source of truth for this project.

---

## What this project is

**Almost** is a parallel-life generator. Users upload their LinkedIn PDF. The app finds 3–5 real career fork points. They pick one. Claude generates the alternate-universe version of their life, rendered as a styled HTML page in one of four templates.

Repo: https://github.com/vnsavitri/Almost
Local path: /Users/vividm4/Documents/Projects/Personal/almost/claude-code

---

## Your operating rules

1. **Do one thing at a time.** Never jump phases. After each phase, stop and show output.
2. **Don't hallucinate APIs or libraries.** If you're unsure a package exists or how it works, say so.
3. **Ask before you invent.** If a spec is ambiguous, ask — don't guess.
4. **Read MEMORY.md before starting any session.** It holds current state, decisions, and what's already been built.
5. **Update MEMORY.md after every significant change.** A change is significant if it touches architecture, adds a dependency, or closes a phase.
6. **Never install a library without a clear reason.** This is a lean hackathon build.
7. **Prefer server components.** Use client components only when you need interactivity (event handlers, state).
8. **No test files unless asked.** No Storybook, no Playwright, no Jest scaffolding unless I ask for it.
9. **Keep prompts in `/lib/prompts.ts` only.** Don't inline Claude system prompts in API routes.
10. **Voice check before any AI output.** See the banned words list below. Run it against every prompt you write.

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | TypeScript strict mode on |
| Styling | Tailwind CSS | No component libraries (no shadcn, no radix unless I ask) |
| AI | Anthropic Claude API | Model: `claude-sonnet-4-20250514`. Key in `.env.local` as `ANTHROPIC_API_KEY` |
| PDF parsing | Native Claude document type | Do NOT install pdf-parse, pdf.js, or any PDF library |
| Download | Blob + anchor click | Self-contained HTML string |
| Payments | RevenueCat web SDK | Stub only until Phase 6 |
| Deploy | Vercel (primary) / Replit (comparison) | |

---

## Folder structure

```
almost/
├── app/
│   ├── page.tsx                       # Landing page
│   ├── upload/page.tsx                # Upload + onboarding instructions
│   ├── branches/page.tsx              # Fork point selection
│   ├── loading/page.tsx               # Parallel universe animation
│   ├── result/page.tsx                # Template picker + output + download
│   └── api/
│       ├── extract-branches/route.ts  # PDF → fork points (JSON)
│       └── generate-life/route.ts     # Fork point + template → HTML string
├── components/
│   ├── UploadZone.tsx
│   ├── BranchCard.tsx
│   ├── ParallelAnimation.tsx
│   └── TemplatePreview.tsx
├── lib/
│   ├── prompts.ts                     # ALL Claude prompts live here
│   └── templates/
│       ├── linkedin-ghost.ts          # HTML template builders
│       ├── wiki-stub.ts
│       ├── museum-plaque.ts
│       └── tarot-card.ts
├── public/
├── CLAUDE.md                          # This file
└── MEMORY.md                          # Session state
```

Do not deviate from this structure without noting it in MEMORY.md.

---

## The four output templates

### 1. LinkedIn Ghost
Uncanny-valley LinkedIn profile of the alternate you. Includes: name, headline, location, "500+ connections", About section (2 paragraphs), 3 job entries with dates and descriptions, 2 endorsements from fictional colleagues. Styled to look like LinkedIn circa 2024. Optional "Open to Work" banner if the alternate life went sideways.

### 2. The Wiki Stub
Wikipedia-style article. Includes: infobox (born, nationality, occupation, known_for), intro paragraph, sections: Early Life, Career, Personal Life, Controversies, References. Fake citations formatted as `[1]`, `[2]` etc. with a References section that lists plausible-sounding journal entries and news sources. "This article is a stub. You can help Wikipedia by expanding it." banner at top.

### 3. Museum Plaque
Minimalist gallery wall card. Cream background (#F5EFE6). Dark ink (#1A1A1A). Max 80 words. Single sans-serif font (Inter). No decoration. Just the alternate name, dates, one sentence occupation, and a short paragraph. The restraint is the design.

### 4. The Tarot Card
CSS-only illustrated tarot card. No image generation. The card includes: suit name, a roman numeral, a simple geometric CSS illustration in the centre (abstract, not literal), the alternate you's name as the card title, and two short text blocks: "Upright:" and "Reversed:". Vertical card format. Dark background with gold/cream accent text.

---

## Brand

- **Name:** Almost
- **Tagline:** "the life you didn't quite live"
- **Colors:** Cream `#F5EFE6` | Ink `#1A1A1A` | Coral `#E07856`
- **Typography:** Fraunces (headings) + Inter (body) + monospace where contextually appropriate
- **UI rules:** No emoji in the product UI. No gradients. No drop shadows. Generous whitespace. Every screen should look like a real product.

---

## Voice — read this before writing any AI prompt

The output must be: funny first, melancholy underneath. Confident, specific, slightly unhinged, secretly tender.

The energy is: *"In another life I committed to that yoga teacher training and now I sell crystals to divorced women in Byron Bay and I am, statistically, much happier than you."*

### Banned words — never appear in Claude output or UI copy
`navigating`, `tapestry`, `embark`, `journey`, `landscape`, `transformative`, `robust`, `seamless`, `leverage`, `dance of`, `symphony of`, `delve`, `paradigm`, `testament`, `thriving`, `holistic`, `ecosystem`, `reimagine`, `elevate`, `synergy`, `authentic`

If the output sounds like ChatGPT, it has failed. Run every prompt against this list.

---

## Build phases

| Phase | What gets built | Gate |
|---|---|---|
| 1 | Scaffold + landing page | Show landing, get approval |
| 2 | Upload flow + PDF onboarding instructions | Show upload page, get approval |
| 3 | `extract-branches` API + branch selection UI | Show branch selection with mock data, get approval |
| 4 | `generate-life` API + all 4 template builders | Test one template end-to-end, get approval |
| 5 | Loading animation (`ParallelAnimation`) + result page | Full happy path demo, get approval |
| 6 | RevenueCat paywall (stub → real) | Paywall gates Pro templates |
| 7 | Polish pass | Responsive, error states, edge cases |

**Current phase is recorded in MEMORY.md. Check there first.**

---

## Environment variables

```env
ANTHROPIC_API_KEY=          # Anthropic API key — never commit
NEXT_PUBLIC_REVENUECAT_API_KEY=   # RevenueCat public key — safe to commit
```

---

## What NOT to do

- Do not install `pdf-parse`, `pdfjs-dist`, `react-pdf`, or any PDF processing library. Claude reads PDFs natively.
- Do not use `fetch` directly to call the Anthropic API — use the `@anthropic-ai/sdk` client.
- Do not put system prompts inline in route handlers — they belong in `/lib/prompts.ts`.
- Do not generate images or use image-generation APIs.
- Do not add animation libraries (framer-motion, GSAP) without asking. CSS animations only.
- Do not add a database. No Prisma, no Supabase, no SQLite.
- Do not add auth. No NextAuth, no Clerk.
- Do not start Phase N+1 without explicit confirmation.
