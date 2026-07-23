/* Meta Pixel helper
 * Safe to call before pixel loads — events are queued automatically by fbq.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq: (...args: any[]) => void
    _fbq: unknown
  }
}

/** ID unic pt deduplicarea intre evenimentul de Pixel si perechea trimisa de pe server (Conversions API). */
export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackEvent(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  if (eventId) window.fbq('track', event, params ?? {}, { eventID: eventId })
  else window.fbq('track', event, params)
}

export function trackCustomEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('trackCustom', event, params)
}
