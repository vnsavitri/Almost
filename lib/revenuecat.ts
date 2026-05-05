import { Purchases, ErrorCode, PurchasesError } from '@revenuecat/purchases-js'

export const ENTITLEMENT_ID = 'Almost Life Pro'

const API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY ?? ''

/**
 * Configure the RC SDK singleton (safe to call multiple times — skips if already configured).
 */
export function configurePurchases(appUserId: string): Purchases {
  if (!Purchases.isConfigured()) {
    return Purchases.configure({ apiKey: API_KEY, appUserId })
  }
  return Purchases.getSharedInstance()
}

/**
 * Get the configured RC instance, or null if SDK hasn't been initialised yet.
 */
export function getRC(): Purchases | null {
  if (!Purchases.isConfigured()) return null
  return Purchases.getSharedInstance()
}

/**
 * Ask RC whether the current user has the "Almost Life Pro" entitlement.
 * Returns false on any error (network, not configured, etc.).
 */
export async function checkIsPro(): Promise<boolean> {
  const rc = getRC()
  if (!rc) return false
  try {
    const info = await rc.getCustomerInfo()
    return !!info.entitlements.active[ENTITLEMENT_ID]
  } catch {
    return false
  }
}

/**
 * Helper to detect a user-cancelled purchase error from RC.
 */
export function isUserCancelled(err: unknown): boolean {
  return err instanceof PurchasesError && err.errorCode === ErrorCode.UserCancelledError
}
