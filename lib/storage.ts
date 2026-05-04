import type { Branch } from './types'

const KEYS = {
  resume: 'almost:resume',
  branches: 'almost:branches',
  selectedBranch: 'almost:selected-branch',
  selectedTemplate: 'almost:selected-template',
  demo: 'almost:demo',
  gen: (branchId: string, templateId: string) => `almost:gen:${branchId}:${templateId}`,
} as const

function write(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    throw new Error('Storage unavailable — try disabling private browsing mode.')
  }
}

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

export function saveResume(base64: string): void {
  write(KEYS.resume, base64)
}

export function loadResume(): string | null {
  return read(KEYS.resume)
}

export function saveBranches(branches: Branch[]): void {
  write(KEYS.branches, JSON.stringify(branches))
}

export function loadBranches(): Branch[] | null {
  const raw = read(KEYS.branches)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Branch[]
  } catch {
    return null
  }
}

export function saveSelectedBranch(branch: Branch): void {
  write(KEYS.selectedBranch, JSON.stringify(branch))
}

export function loadSelectedBranch(): Branch | null {
  const raw = read(KEYS.selectedBranch)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Branch
  } catch {
    return null
  }
}

export function saveSelectedTemplate(templateId: string): void {
  write(KEYS.selectedTemplate, templateId)
}

export function loadSelectedTemplate(): string | null {
  return read(KEYS.selectedTemplate)
}

export function saveGeneration(branchId: string, templateId: string, html: string): void {
  write(KEYS.gen(branchId, templateId), html)
}

export function loadGeneration(branchId: string, templateId: string): string | null {
  return read(KEYS.gen(branchId, templateId))
}

export function hasGeneration(branchId: string, templateId: string): boolean {
  return loadGeneration(branchId, templateId) !== null
}

export function saveDemoMode(): void {
  write(KEYS.demo, '1')
}

export function clearDemoMode(): void {
  try { sessionStorage.removeItem(KEYS.demo) } catch { /* noop */ }
}

export function isDemoMode(): boolean {
  return read(KEYS.demo) === '1'
}

export function clearAll(): void {
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith('almost:')) keysToRemove.push(key)
    }
    keysToRemove.forEach(k => sessionStorage.removeItem(k))
  } catch { /* noop */ }
}

export function hasAnyBranchGeneration(excludeBranchId?: string): boolean {
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith('almost:gen:')) {
        if (excludeBranchId && key.startsWith(`almost:gen:${excludeBranchId}:`)) continue
        return true
      }
    }
    return false
  } catch {
    return false
  }
}
