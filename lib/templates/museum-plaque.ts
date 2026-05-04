import type { MuseumPlaqueLife } from '@/lib/types'

export function buildMuseumPlaque(life: MuseumPlaqueLife): string {
  // Hard cap at 80 words
  const words = life.paragraph.trim().split(/\s+/)
  const paragraph = words.length > 80
    ? words.slice(0, 79).join(' ') + '…'
    : life.paragraph.trim()

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(life.name)}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body { height: 100%; }

  /* Subtle textured "gallery wall" — radial light + paper grain */
  body {
    min-height: 100%;
    background:
      radial-gradient(ellipse at 50% 30%, #ECE4D6 0%, #E0D6C3 65%, #D4C8B2 100%),
      #E0D6C3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 22px;
    font-family: 'Inter', -apple-system, system-ui, sans-serif;
    position: relative;
  }

  /* Faint paper-grain noise overlay so the wall isn't flat */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(rgba(26,26,26,0.04) 1px, transparent 1px),
      radial-gradient(rgba(26,26,26,0.03) 1px, transparent 1px);
    background-size: 3px 3px, 7px 7px;
    background-position: 0 0, 1px 1px;
    pointer-events: none;
    opacity: 0.55;
  }

  /* Hairline frame line on the wall — gives the plaque visual weight */
  .frame-mark {
    position: fixed;
    border: 1px solid rgba(26,26,26,0.07);
    pointer-events: none;
  }
  .frame-mark.outer { inset: 16px; }
  .frame-mark.inner { inset: 24px; border-color: rgba(26,26,26,0.04); }

  /* The plaque itself */
  .plaque {
    position: relative;
    background: #F5EFE6;
    max-width: 360px;
    width: 100%;
    padding: 36px 32px 32px;
    box-shadow:
      0 1px 0 rgba(255,255,255,0.7) inset,
      0 18px 32px -16px rgba(26,26,26,0.18),
      0 2px 4px rgba(26,26,26,0.06);
    border: 1px solid rgba(26,26,26,0.08);
  }

  /* Tiny mount marks at the corners — like a real plaque pinned to the wall */
  .plaque::before,
  .plaque::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(26,26,26,0.18);
  }
  .plaque::before { top: 8px; left: 8px; }
  .plaque::after  { top: 8px; right: 8px; }

  .name {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #1A1A1A;
    margin-bottom: 6px;
  }
  .dates {
    font-size: 11px;
    font-weight: 300;
    color: rgba(26,26,26,0.5);
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }
  .occupation {
    font-size: 11px;
    font-weight: 300;
    color: rgba(26,26,26,0.55);
    font-style: italic;
    margin-bottom: 22px;
  }
  .divider {
    width: 22px;
    height: 1px;
    background: rgba(26,26,26,0.22);
    margin-bottom: 20px;
  }
  .paragraph {
    font-size: 12.5px;
    font-weight: 300;
    color: #1A1A1A;
    line-height: 1.7;
  }
  .footer-note {
    margin-top: 26px;
    font-size: 8px;
    color: rgba(26,26,26,0.28);
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  /* Catalogue tag below the plaque — small, like a museum accession number */
  .accession {
    position: absolute;
    bottom: -28px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 8px;
    letter-spacing: 0.22em;
    color: rgba(26,26,26,0.32);
    text-transform: uppercase;
  }
</style>
</head>
<body>

<div class="frame-mark outer"></div>
<div class="frame-mark inner"></div>

<div class="plaque">
  <div class="name">${esc(life.name)}</div>
  <div class="dates">${esc(life.dates)}</div>
  <div class="occupation">${esc(life.occupation)}</div>
  <div class="divider"></div>
  <div class="paragraph">${esc(paragraph)}</div>
  <div class="footer-note">Almost &mdash; the life you didn&rsquo;t quite live</div>
  <div class="accession">cat. no. AL.${randomCat(life.name)}</div>
</div>

</body>
</html>`
}

/** Deterministic-ish accession number from the name */
function randomCat(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0
  const n = Math.abs(h) % 9999
  return String(n).padStart(4, '0') + '.a'
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
