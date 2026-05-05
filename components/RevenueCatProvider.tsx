'use client'

import { useEffect } from 'react'
import { configurePurchases, checkIsPro } from '@/lib/revenuecat'
import { getUserId } from '@/lib/user-id'
import { setPro } from '@/lib/paywall'

/**
 * Client-only component that initialises the RevenueCat SDK once per session
 * and syncs the current entitlement status into localStorage.
 *
 * Renders nothing — drop it anywhere in the tree (layout.tsx is ideal).
 */
export default function RevenueCatProvider() {
  useEffect(() => {
    const userId = getUserId()
    try {
      configurePurchases(userId)
    } catch (err) {
      console.warn('[RC] configure failed:', err)
      return
    }

    // Silently sync entitlement → localStorage so isPro() is always fresh.
    checkIsPro()
      .then(pro => { if (pro) setPro(true) })
      .catch(() => { /* network issues — keep whatever was in localStorage */ })
  }, [])

  return null
}
