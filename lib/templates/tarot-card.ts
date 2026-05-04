import type { TarotCardLife } from '@/lib/types'

const SUIT_COLORS: Record<string, string> = {
  Cups:      '#7a9eb5',
  Wands:     '#c17f3a',
  Swords:    '#8a8a9a',
  Pentacles: '#7a9e7a',
}

export function buildTarotCard(life: TarotCardLife): string {
  const accentColor = SUIT_COLORS[life.suit] ?? '#c4a882'
  const illustration = buildIllustration(life.suit, accentColor)

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(life.name)}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    height: 100%;
  }

  body {
    background: #0d0a07;
    display: flex;
    justify-content: center;
    min-height: 100%;
    font-family: 'Times New Roman', Georgia, serif;
  }

  /* Full-height column — the card IS the page */
  .page {
    width: 100%;
    max-width: 420px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px 28px 36px;
    border-left:  1px solid ${accentColor}18;
    border-right: 1px solid ${accentColor}18;
    position: relative;
  }

  /* Faint inner border frame */
  .page::before {
    content: '';
    position: absolute;
    inset: 14px;
    border: 1px solid ${accentColor}10;
    pointer-events: none;
  }

  /* ── Header ── */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  .numeral {
    font-size: 11px;
    letter-spacing: 0.22em;
    color: ${accentColor}88;
    text-transform: uppercase;
  }
  .suit-label {
    font-family: -apple-system, system-ui, sans-serif;
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${accentColor}55;
  }

  /* ── Illustration — flex-grows to fill mid-section ── */
  .illustration-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    min-height: 160px;
  }
  .illustration-wrap svg {
    width: clamp(120px, 40%, 180px);
    height: auto;
  }

  /* ── Card name ── */
  .card-name {
    font-size: clamp(18px, 4vw, 26px);
    font-weight: normal;
    color: #f0e8d8;
    text-align: center;
    letter-spacing: 0.05em;
    line-height: 1.25;
    margin-bottom: 28px;
  }

  /* ── Divider ── */
  .divider {
    width: 48px;
    height: 1px;
    background: ${accentColor}33;
    margin: 0 auto 28px;
  }

  /* ── Meanings ── */
  .meanings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .meaning-label {
    font-family: -apple-system, system-ui, sans-serif;
    font-size: 8px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${accentColor};
    margin-bottom: 8px;
  }
  .meaning-text {
    font-size: 13px;
    color: #c8bfb0;
    line-height: 1.6;
  }

  /* ── Footer ── */
  .footer {
    margin-top: 36px;
    font-family: -apple-system, system-ui, sans-serif;
    font-size: 8px;
    color: ${accentColor}33;
    letter-spacing: 0.12em;
    text-align: center;
    text-transform: uppercase;
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <span class="numeral">${esc(life.romanNumeral)}</span>
    <span class="suit-label">${esc(life.suit)}</span>
  </div>

  <div class="illustration-wrap">
    ${illustration}
  </div>

  <h1 class="card-name">${esc(life.name)}</h1>
  <div class="divider"></div>

  <div class="meanings">
    <div>
      <div class="meaning-label">Upright</div>
      <div class="meaning-text">${esc(life.upright)}</div>
    </div>
    <div>
      <div class="meaning-label">Reversed</div>
      <div class="meaning-text">${esc(life.reversed)}</div>
    </div>
  </div>

  <div class="footer">Almost &mdash; the life you didn&rsquo;t quite live</div>
</div>
</body>
</html>`
}

function buildIllustration(suit: string, color: string): string {
  const c = color
  switch (suit) {
    case 'Cups':
      return `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="56" cy="80" r="36" stroke="${c}" stroke-width="1" stroke-opacity="0.6" fill="${c}" fill-opacity="0.07"/>
        <circle cx="104" cy="80" r="36" stroke="${c}" stroke-width="1" stroke-opacity="0.6" fill="${c}" fill-opacity="0.07"/>
        <circle cx="80" cy="54" r="26" stroke="${c}" stroke-width="0.8" stroke-opacity="0.3" fill="none"/>
        <circle cx="80" cy="80" r="10" fill="${c}" fill-opacity="0.2"/>
      </svg>`
    case 'Wands':
      return `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30) * Math.PI / 180
          const x2 = (80 + Math.cos(a) * 58).toFixed(1)
          const y2 = (80 + Math.sin(a) * 58).toFixed(1)
          return `<line x1="80" y1="80" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="0.8" stroke-opacity="0.5"/>`
        }).join('')}
        <circle cx="80" cy="80" r="8" fill="${c}" fill-opacity="0.5"/>
        <circle cx="80" cy="80" r="24" stroke="${c}" stroke-width="0.8" stroke-opacity="0.25" fill="none"/>
        <circle cx="80" cy="80" r="44" stroke="${c}" stroke-width="0.5" stroke-opacity="0.15" fill="none"/>
      </svg>`
    case 'Swords':
      return `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="80,18 128,80 80,142 32,80" stroke="${c}" stroke-width="1" stroke-opacity="0.55" fill="${c}" fill-opacity="0.06"/>
        <line x1="80" y1="10" x2="80" y2="150" stroke="${c}" stroke-width="0.7" stroke-opacity="0.3"/>
        <line x1="10" y1="80" x2="150" y2="80" stroke="${c}" stroke-width="0.7" stroke-opacity="0.3"/>
        <circle cx="80" cy="80" r="12" stroke="${c}" stroke-opacity="0.5" stroke-width="1" fill="none"/>
        <circle cx="80" cy="80" r="4" fill="${c}" fill-opacity="0.6"/>
      </svg>`
    default: // Pentacles
      return `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="80,18 96,66 146,66 106,94 122,142 80,114 38,142 54,94 14,66 64,66"
          stroke="${c}" stroke-width="1" stroke-opacity="0.55" fill="${c}" fill-opacity="0.07"/>
        <circle cx="80" cy="80" r="44" stroke="${c}" stroke-width="0.7" stroke-opacity="0.2" fill="none"/>
        <circle cx="80" cy="80" r="10" stroke="${c}" stroke-width="1" stroke-opacity="0.4" fill="none"/>
      </svg>`
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
