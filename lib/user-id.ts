const UID_KEY = 'almost_uid'

export function getUserId(): string {
  if (typeof window === 'undefined') return ''
  try {
    let id = localStorage.getItem(UID_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(UID_KEY, id)
    }
    return id
  } catch {
    return ''
  }
}
