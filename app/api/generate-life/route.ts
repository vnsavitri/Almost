import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { MODEL, GENERATE_LIFE_LINKEDIN, GENERATE_LIFE_WIKI, GENERATE_LIFE_PLAQUE, GENERATE_LIFE_TAROT } from '@/lib/prompts'
import { buildTemplate } from '@/lib/templates'
import { ZELDA_DEMO_PROFILE } from '@/lib/demo/zelda-profile'
import { kv, kvAvailable, K } from '@/lib/kv'
import type { TemplateId } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 60

const PROMPTS: Record<TemplateId, string> = {
  'linkedin-ghost': GENERATE_LIFE_LINKEDIN,
  'wiki-stub': GENERATE_LIFE_WIKI,
  'museum-plaque': GENERATE_LIFE_PLAQUE,
  'tarot-card': GENERATE_LIFE_TAROT,
}

const MAX_TOKENS: Record<TemplateId, number> = {
  'linkedin-ghost': 1500,
  'wiki-stub': 2500,
  'museum-plaque': 400,
  'tarot-card': 600,
}

function extractJson(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch { /* fallthrough */ }

  const match = text.match(/\{[\s\S]*\}/)
  if (match) {
    try { return JSON.parse(match[0]) } catch { /* fallthrough */ }
  }

  throw new Error('Could not parse life data from response')
}

export async function POST(req: NextRequest) {
  try {
    const { resumeBase64, branchId, branch: branchFromClient, templateId, isDemoMode } = await req.json() as {
      resumeBase64: string
      branchId: string
      branch?: { year: number; summary: string; whatHappened: string; whatCouldHaveHappened: string }
      templateId: TemplateId
      isDemoMode?: boolean
    }

    // Demo mode bypasses all caps
    if (isDemoMode && branchId === '1' && templateId === 'linkedin-ghost') {
      const html = buildTemplate('linkedin-ghost', ZELDA_DEMO_PROFILE.pregenerated_output.linkedin_ghost)
      return NextResponse.json({ html })
    }

    if (!resumeBase64 && !isDemoMode) {
      return NextResponse.json({ ok: false, error: 'No resume provided' }, { status: 400 })
    }

    // ── Server-side cap (skip for demo) ─────────────────────────────────────
    const userId = req.headers.get('x-user-id')?.trim()
    if (!isDemoMode && userId && kvAvailable()) {
      const isPro = await kv.get(K.pro(userId)) === '1'

      if (!isPro) {
        const alreadyGenerated = await kv.get(K.gen(userId, branchId, templateId))
        if (alreadyGenerated) {
          return NextResponse.json(
            { ok: false, error: 'upgrade_required', code: 'regen' },
            { status: 402 }
          )
        }

        const usedBranch = await kv.get(K.branch(userId))
        if (usedBranch && usedBranch !== branchId) {
          return NextResponse.json(
            { ok: false, error: 'upgrade_required', code: 'new_branch' },
            { status: 402 }
          )
        }
      }
    }
    // ────────────────────────────────────────────────────────────────────────

    const client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    })

    // Extract text from PDF (or use demo text)
    let resumeText: string
    if (isDemoMode) {
      resumeText = ZELDA_DEMO_PROFILE.raw_linkedin_text
    } else {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse')
      const pdfBuffer = Buffer.from(resumeBase64, 'base64')
      const pdfData = await pdfParse(pdfBuffer)
      resumeText = pdfData.text?.trim() ?? ''
      if (!resumeText) {
        return NextResponse.json({ ok: false, error: 'Could not read text from your PDF. Try a text-based PDF rather than a scanned image.' }, { status: 400 })
      }
    }

    const demoZeldaBranch = isDemoMode
      ? ZELDA_DEMO_PROFILE.branches.find(b => b.id === branchId)
      : null

    let branchContext = ''
    if (demoZeldaBranch) {
      branchContext = `\n\nFork point: ${demoZeldaBranch.context}\nWhat they could have done instead: ${demoZeldaBranch.framing}`
    } else if (branchFromClient) {
      branchContext = `\n\nFork point at ${branchFromClient.year}: ${branchFromClient.whatHappened}\nWhat could have happened instead: ${branchFromClient.whatCouldHaveHappened}`
    }

    const response = await client.chat.completions.create({
      model: MODEL,
      max_tokens: MAX_TOKENS[templateId],
      messages: [
        { role: 'system', content: PROMPTS[templateId] },
        {
          role: 'user',
          content: `Here is the resume/LinkedIn profile:\n\n${resumeText}\n\nGenerate the ${templateId} alternate life for this person.${branchContext}\n\nReturn ONLY the JSON object.`,
        },
      ],
    })

    const text = response.choices[0]?.message?.content ?? ''
    const lifeData = extractJson(text)
    const html = buildTemplate(templateId, lifeData)

    // ── Record the generation in KV ──────────────────────────────────────────
    if (!isDemoMode && userId && kvAvailable()) {
      await Promise.all([
        kv.set(K.gen(userId, branchId, templateId), '1'),
        kv.setnx(K.branch(userId), branchId),
      ])
    }
    // ────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ html })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
