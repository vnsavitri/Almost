const PRO_KEY = 'almost_pro'

export function isPro(): boolean {
  try {
    return localStorage.getItem(PRO_KEY) === '1'
  } catch {
    return false
  }
}

export async function requestPurchase(userId: string): Promise<boolean> {
  // Phase 6a stub — simulates a successful purchase.
  // Phase 6b: swap the setTimeout body for the RevenueCat web SDK flow.
  // NEXT_PUBLIC_REVENUECAT_API_KEY is available for 6b.
  return new Promise(resolve => {
    setTimeout(async () => {
      try { localStorage.setItem(PRO_KEY, '1') } catch { /* noop */ }

      // Persist server-side so the API route can verify
      if (userId) {
        try {
          await fetch('/api/unlock-pro', {
            method: 'POST',
            headers: { 'x-user-id': userId },
          })
        } catch { /* noop — fails open, localStorage is the fallback signal */ }
      }

      resolve(true)
    }, 1200)
  })
}

export function clearPro(): void {
  try {
    localStorage.removeItem(PRO_KEY)
  } catch { /* noop */ }
}
