import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse')
import { MODEL, EXTRACT_BRANCHES_PROMPT } from '@/lib/prompts'
import type { Branch } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 60

const MOCK_BRANCHES: Branch[] = [
  {
    id: '1',
    year: 2019,
    summary: 'You turned down the senior role to go freelance. What if you\'d stayed?',
    whatHappened: 'Left to start an independent consulting practice',
    whatCouldHaveHappened: 'Stayed, got the promotion, and became the person who signs off on budgets',
  },
  {
    id: '2',
    year: 2016,
    summary: 'You moved cities for the job. What if you\'d stayed put and made it work?',
    whatHappened: 'Relocated for a role that turned out to be a stepping stone',
    whatCouldHaveHappened: 'Stayed in your city, built deeper roots, found a different ladder to climb',
  },
  {
    id: '3',
    year: 2013,
    summary: 'You took the safe grad scheme. What if you\'d taken the startup offer?',
    whatHappened: 'Joined a structured graduate programme at a large employer',
    whatCouldHaveHappened: 'Joined the four-person startup that needed someone exactly like you',
  },
]

function extractJson(text: string): Branch[] {
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed.branches)) return parsed.branches as Branch[]
  } catch { /* fallthrough */ }

  const match = text.match(/\{[\s\S]*\}/)
  if (match) {
    try {
      const parsed = JSON.parse(match[0])
      if (Array.isArray(parsed.branches)) return parsed.branches as Branch[]
    } catch { /* fallthrough */ }
  }

  throw new Error('Could not parse branches from response')
}

export async function POST(req: NextRequest) {
  try {
    if (process.env.ALMOST_MOCK === '1') {
      await new Promise(r => setTimeout(r, 1200))
      return NextResponse.json({ branches: MOCK_BRANCHES })
    }

    const { resumeBase64 } = await req.json() as { resumeBase64: string }

    if (!resumeBase64) {
      return NextResponse.json({ ok: false, error: 'No resume provided' }, { status: 400 })
    }

    const pdfBuffer = Buffer.from(resumeBase64, 'base64')
    const pdfData = await pdfParse(pdfBuffer)
    const resumeText = pdfData.text?.trim()

    if (!resumeText) {
      return NextResponse.json({ ok: false, error: 'Could not read text from your PDF. Try a text-based PDF rather than a scanned image.' }, { status: 400 })
    }

    const client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    })

    const response = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        { role: 'system', content: EXTRACT_BRANCHES_PROMPT },
        {
          role: 'user',
          content: `Here is the resume/LinkedIn profile:\n\n${resumeText}\n\nFind 3 to 5 fork points in this person's career timeline and return them as JSON.`,
        },
      ],
    })

    const text = response.choices[0]?.message?.content ?? ''
    const branches = extractJson(text)

    return NextResponse.json({ branches })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
