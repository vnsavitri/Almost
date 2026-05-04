import { NextRequest, NextResponse } from 'next/server'
import { kv, kvAvailable, K } from '@/lib/kv'

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')?.trim()
  if (!userId || !kvAvailable()) {
    return NextResponse.json({ ok: true })
  }
  await kv.set(K.pro(userId), '1')
  return NextResponse.json({ ok: true })
}
