const PRO_KEY = 'almost_pro'

export function isPro(): boolean {
  try {
    return localStorage.getItem(PRO_KEY) === '1'
  } catch {
    return false
  }
}

export function setPro(value: boolean): void {
  try {
    if (value) {
      localStorage.setItem(PRO_KEY, '1')
    } else {
      localStorage.removeItem(PRO_KEY)
    }
  } catch { /* noop */ }
}

/**
 * Persist the Pro unlock server-side so the API can verify via Vercel KV.
 * Fire-and-forget — the localStorage flag is the source of truth for the client.
 */
export async function syncProToServer(userId: string): Promise<void> {
  if (!userId) return
  try {
    await fetch('/api/unlock-pro', {
      method: 'POST',
      headers: { 'x-user-id': userId },
    })
  } catch { /* fails open — localStorage is the fallback */ }
}

export function clearPro(): void {
  try {
    localStorage.removeItem(PRO_KEY)
  } catch { /* noop */ }
}
