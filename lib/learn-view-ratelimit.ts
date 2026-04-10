// Map<"ip:contentId", timestamp>
const viewMap = new Map<string, number>()

export function canCountView(ip: string, contentId: string): boolean {
  const key = `${ip}:${contentId}`
  const now = Date.now()
  const last = viewMap.get(key)
  if (last && now - last < 24 * 60 * 60 * 1000) return false
  viewMap.set(key, now)
  return true
}
