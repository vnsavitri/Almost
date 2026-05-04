import { kv } from '@vercel/kv'

export { kv }

export function kvAvailable(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

// Key helpers — all prefixed almost: for easy inspection in Vercel dashboard
export const K = {
  pro:    (uid: string) => `almost:pro:${uid}`,
  branch: (uid: string) => `almost:branch:${uid}`,
  gen:    (uid: string, branchId: string, templateId: string) =>
            `almost:gen:${uid}:${branchId}:${templateId}`,
}
