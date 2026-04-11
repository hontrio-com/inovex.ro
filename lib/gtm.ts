/* GTM dataLayer helper
 * Pushes events to window.dataLayer for GTM to pick up.
 * Safe to call server-side (no-op) or before GTM loads.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function pushEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...params })
}
