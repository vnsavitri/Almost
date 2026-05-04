# Almost

**the life you didn't quite live**

Almost is a parallel-life generator. Upload your LinkedIn PDF or resume. It finds the real moments where your career could have gone differently. You pick one. Almost generates the other version of you — rendered as a styled artifact in one of four formats.

Not the better version. Not the worse one. Just the one that happened when you said yes instead of no.

---

## What it does

1. **Upload** your LinkedIn PDF or resume/CV
2. **Almost finds** 3–5 real fork points in your career history
3. **You pick** one moment
4. **Almost generates** your alternate life in one of four formats:

| Format | What you get |
|---|---|
| **LinkedIn Ghost** | Uncanny-valley LinkedIn profile of the alternate you — complete with headline, job history, and two endorsements from fictional colleagues |
| **The Wiki Stub** | Wikipedia article about the alternate you, including infobox, sections, fake citations, and a stub banner |
| **Museum Plaque** | Minimalist gallery wall card. Max 80 words. Cream background. Just the facts of a life. |
| **The Tarot Card** | CSS-only illustrated tarot card with Upright and Reversed readings |

---

## Tech stack

- **Framework** — Next.js 14 (App Router), TypeScript
- **Styling** — Tailwind CSS, Fraunces + Inter typefaces
- **AI** — Anthropic Claude API (`claude-sonnet-4-20250514`)
- **PDF parsing** — Claude's native document support (no PDF libraries)
- **Payments** — RevenueCat web SDK
- **Deploy** — Vercel

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` in the project root:

```env
ANTHROPIC_API_KEY=your_key_here
NEXT_PUBLIC_REVENUECAT_API_KEY=your_key_here
```

- `ANTHROPIC_API_KEY` — get one at [console.anthropic.com](https://console.anthropic.com)
- `NEXT_PUBLIC_REVENUECAT_API_KEY` — RevenueCat public key (optional, gates Pro features)

---

## Project structure

```
app/
├── page.tsx                    # Landing
├── upload/page.tsx             # PDF upload
├── branches/page.tsx           # Fork point selection
├── templates/page.tsx          # Format picker
├── loading/page.tsx            # Generation in progress
├── result/page.tsx             # Output + download
├── about/page.tsx              # About page
└── api/
    ├── extract-branches/       # PDF → fork points
    └── generate-life/          # Fork + template → HTML

components/
├── Lockup.tsx                  # Eyebrow + display + caption editorial block
├── Taxonomy.tsx                # _underscore mono tag rows
├── StepBar.tsx                 # 4-step progress indicator
├── BranchCard.tsx              # Fork point selection card
├── UploadZone.tsx              # PDF drag-and-drop zone
└── PaywallModal.tsx            # Pro upgrade modal

lib/
├── prompts.ts                  # All Claude system prompts
├── storage.ts                  # sessionStorage helpers
├── templates/                  # HTML template builders
│   ├── linkedin-ghost.ts
│   ├── wiki-stub.ts
│   ├── museum-plaque.ts
│   └── tarot-card.ts
└── loading-phrases.ts          # 100+ loading screen phrases
```

---

## Design

Five-color palette, no gradients, no drop shadows.

| Token | Hex | Used for |
|---|---|---|
| `cream` | `#ebebd3` | Background |
| `ink` | `#083d77` | Primary text |
| `coral` | `#da4167` | Accents, CTAs |
| `gold` | `#f4d35e` | On-dark only (year badges, tarot) |
| `glow` | `#f78764` | Hover states, save button |

Typography: **Fraunces** (display, variable weight + italic) + **Inter** (body) + system mono (eyebrow/taxonomy labels).

---

## Privacy

Your PDF is read once, in memory, then gone. Nothing is stored server-side. No account required. Close the tab: it never happened.

---

## License

MIT
