export const MODEL = 'claude-sonnet-4-6'

export const BANNED_WORDS = [
  'navigating', 'tapestry', 'embark', 'journey', 'landscape',
  'transformative', 'robust', 'seamless', 'leverage', 'dance of',
  'symphony of', 'delve', 'paradigm', 'testament', 'thriving',
  'holistic', 'ecosystem', 'reimagine', 'elevate', 'synergy', 'authentic',
]

const bannedWordsBlock = `
BANNED WORDS — never use any of these, ever, under any circumstances:
${BANNED_WORDS.join(', ')}

If your output sounds like a LinkedIn post or a ChatGPT marketing email, you have failed.
The tone is: funny first, melancholy underneath. Confident, specific, slightly unhinged, secretly tender.
`

export const EXTRACT_BRANCHES_PROMPT = `
You are reading someone's LinkedIn profile PDF to find the moments where their life could have gone a completely different direction.

Your job: identify 3 to 5 real career fork points — decisions, transitions, gaps, or pivots that were genuinely consequential. Not vague life philosophy. Actual inflection points visible in the timeline: a job they took, a role they left, a gap, an unexpected move, a degree they chose.

For each fork point, describe:
- what they actually did (the real timeline)
- what they could have done instead (the alternate path — be specific and a little audacious)
- a short framing line that makes the alternate path sound almost reasonable

The framing should feel like: "In another life you did X and it turned out to be fine, actually."

${bannedWordsBlock}

CRITICAL: Respond with ONLY a valid JSON object. No markdown. No preamble. No explanation. No trailing text.

The exact shape required:
{
  "branches": [
    {
      "id": "1",
      "year": 2018,
      "summary": "One-line framing of the alternate path — specific, slightly wry",
      "whatHappened": "What they actually did (real timeline, one sentence)",
      "whatCouldHaveHappened": "What they could have done instead — be specific, make it real"
    }
  ]
}

Rules:
- id is a string "1", "2", etc.
- year is a number (the year the fork happened)
- summary is the alternate-path framing: punchy, specific, under 15 words
- whatHappened is factual, grounded in the actual PDF
- whatCouldHaveHappened is the alternate life — specific enough to be believable
- 3 to 5 branches, ordered chronologically
- Do not invent details not implied by the document
`

export const GENERATE_LIFE_LINKEDIN = `
You are writing the LinkedIn profile of an alternate version of this person — someone who took a different path at a specific fork in their career.

You will be given:
- Their real LinkedIn profile
- The fork point: what they actually did, and what they could have done instead
- A request for a LinkedIn Ghost profile

Write the alternate LinkedIn profile as if this person actually lived that other path. Be specific. Use real-sounding job titles, company names, timeframes, and details. The profile should feel uncanny — like you're looking at a parallel universe version of someone you know.

${bannedWordsBlock}

The alternate life should be: funny first, melancholy underneath. Not a fantasy upgrade. Not a cautionary tale. Just... another plausible life. One that has its own quiet victories and its own quiet costs.

openToWork should be true only if the alternate life clearly went sideways, or if there's a dark humour reason to include it.

CRITICAL: Respond with ONLY a valid JSON object. No markdown. No preamble. No explanation.

Exact shape:
{
  "name": "full name",
  "headline": "LinkedIn headline — role, company, a couple of keywords, under 20 words",
  "location": "City, Region",
  "about": [
    "First paragraph of About section — 3 to 5 sentences, first person, confident",
    "Second paragraph — continues the story, ends on something that lands"
  ],
  "jobs": [
    {
      "title": "Job title",
      "company": "Company name",
      "dateRange": "Mon YYYY – Mon YYYY · X years Y months",
      "description": "2–3 sentence job description, first person, specific"
    },
    { "title": "...", "company": "...", "dateRange": "...", "description": "..." },
    { "title": "...", "company": "...", "dateRange": "...", "description": "..." }
  ],
  "endorsements": [
    {
      "name": "Full name of fictional colleague",
      "title": "Their title and company",
      "text": "2–3 sentence recommendation, first person, sounds like a real LinkedIn rec"
    },
    {
      "name": "...",
      "title": "...",
      "text": "..."
    }
  ],
  "openToWork": false
}
`

export const GENERATE_LIFE_WIKI = `
You are writing the Wikipedia stub article for an alternate version of this person — someone who took a different path at a specific fork in their career.

Write as if this person actually lived that other life and is notable enough to have a Wikipedia page, but just barely — hence the stub. The article should feel like it was written by someone who finds this person mildly interesting but doesn't have all the facts.

${bannedWordsBlock}

Make the citations sound plausible — reference real-sounding journals, newspapers, and books. The controversies section should be real but minor. The personal life section should be specific and a little sad or a little surprising.

CRITICAL: Respond with ONLY a valid JSON object. No markdown. No preamble. No explanation.

Exact shape:
{
  "name": "full name",
  "infobox": {
    "born": "Year (age X)",
    "nationality": "Nationality",
    "occupation": "Occupation or occupations",
    "knownFor": "What they are known for"
  },
  "intro": "Opening paragraph introducing the person, 3–4 sentences",
  "sections": {
    "earlyLife": "2–3 sentences",
    "career": "3–4 sentences covering the alternate career path",
    "personalLife": "2–3 sentences, specific details",
    "controversies": "2–3 sentences, a real but minor controversy"
  },
  "citations": [
    { "index": 1, "text": "Author Last, First. Title. Publication, Year." },
    { "index": 2, "text": "..." },
    { "index": 3, "text": "..." }
  ]
}
`

export const GENERATE_LIFE_PLAQUE = `
You are writing the museum wall plaque for an alternate version of this person — a sparse, authoritative card mounted next to an artifact in a gallery.

The Museum Plaque format:
- Name
- Dates (birth year – present or a plausible death year)
- One-line occupation
- One short paragraph, maximum 80 words

The paragraph should be quietly devastating or quietly triumphant. The restraint is the point. No adjectives that mean "very good" or "very bad". Just facts, arranged so the reader feels something.

${bannedWordsBlock}

CRITICAL: Respond with ONLY a valid JSON object. No markdown. No preamble. Paragraph must be 80 words or fewer.

Exact shape:
{
  "name": "Full name",
  "dates": "YYYY – YYYY",
  "occupation": "One-line occupation",
  "paragraph": "The paragraph. Maximum 80 words. No exceptions."
}
`

export const GENERATE_LIFE_TAROT = `
You are writing the tarot card for an alternate version of this person — a card in a deck called "The Almost Deck", which is a tarot of alternate lives and near-misses.

The card has:
- A suit (one of: Cups, Wands, Swords, Pentacles — choose based on the alternate life's dominant energy)
- A roman numeral (I through XXI)
- The card name (the alternate person's name, or a title like "The Consultant" or "The Potter")
- Upright meaning: what this card means when drawn right-side up (2–3 sentences)
- Reversed meaning: what it means reversed (2–3 sentences)

The upright and reversed meanings should clearly relate to the alternate life. Specific, not generic tarot boilerplate.

${bannedWordsBlock}

CRITICAL: Respond with ONLY a valid JSON object. No markdown. No preamble.

Exact shape:
{
  "name": "The card title",
  "suit": "Cups",
  "romanNumeral": "VII",
  "upright": "2–3 sentences on upright meaning, grounded in the alternate life",
  "reversed": "2–3 sentences on reversed meaning"
}
`
