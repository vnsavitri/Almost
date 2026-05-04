import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { MODEL, GENERATE_LIFE_LINKEDIN, GENERATE_LIFE_WIKI, GENERATE_LIFE_PLAQUE, GENERATE_LIFE_TAROT } from '@/lib/prompts'
import { buildTemplate } from '@/lib/templates'
import { ZELDA_DEMO_PROFILE } from '@/lib/demo/zelda-profile'
import { kv, kvAvailable, K } from '@/lib/kv'
import type { TemplateId } from '@/lib/types'

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

  throw new Error('Could not parse life data from Claude response')
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
        // Block regeneration of same (branch, template)
        const alreadyGenerated = await kv.get(K.gen(userId, branchId, templateId))
        if (alreadyGenerated) {
          return NextResponse.json(
            { ok: false, error: 'upgrade_required', code: 'regen' },
            { status: 402 }
          )
        }

        // Block second branch
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

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const userContent: Anthropic.MessageParam['content'] = isDemoMode
      ? [{ type: 'text', text: `Here is the LinkedIn profile:\n\n${ZELDA_DEMO_PROFILE.raw_linkedin_text}` }]
      : [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: resumeBase64 } }]

    const demoZeldaBranch = isDemoMode
      ? ZELDA_DEMO_PROFILE.branches.find(b => b.id === branchId)
      : null

    let branchContext = ''
    if (demoZeldaBranch) {
      branchContext = `\n\nFork point: ${demoZeldaBranch.context}\nWhat they could have done instead: ${demoZeldaBranch.framing}`
    } else if (branchFromClient) {
      branchContext = `\n\nFork point at ${branchFromClient.year}: ${branchFromClient.whatHappened}\nWhat could have happened instead: ${branchFromClient.whatCouldHaveHappened}`
    }

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS[templateId],
      system: PROMPTS[templateId],
      messages: [{
        role: 'user',
        content: [
          ...(Array.isArray(userContent) ? userContent : [userContent]),
          { type: 'text', text: `Generate the ${templateId} alternate life for this person.${branchContext}\n\nReturn ONLY the JSON object.` },
        ],
      }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const lifeData = extractJson(text)
    const html = buildTemplate(templateId, lifeData)

    // ── Record the generation in KV ──────────────────────────────────────────
    if (!isDemoMode && userId && kvAvailable()) {
      await Promise.all([
        kv.set(K.gen(userId, branchId, templateId), '1'),
        kv.setnx(K.branch(userId), branchId), // only sets if not already set
      ])
    }
    // ────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ html })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
