export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

const CONSENT_KEY = 'cookie_consent';
/** Emis pe `window` la salvarea preferintelor, ca pixelii sa reactioneze pe loc. */
export const CONSENT_CHANGED_EVENT = 'cookie-consent-changed';
const CONSENT_TTL = 365 * 24 * 60 * 60 * 1000; // 12 months
const CURRENT_VERSION = '1.0';

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (Date.now() - parsed.timestamp > CONSENT_TTL) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setCookieConsent(prefs: { analytics: boolean; marketing: boolean }): void {
  if (typeof window === 'undefined') return;
  try {
    const consent: CookieConsent = {
      necessary: true,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      timestamp: Date.now(),
      version: CURRENT_VERSION,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    // Anunta pixelii care trebuie sa reactioneze imediat la decizie (ex. OpenAI
    // Ads, care are un apel propriu de consent), fara sa astepte o navigare.
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: consent }));
  } catch {
    // localStorage may be blocked
  }
}

export function hasConsented(): boolean {
  const c = getCookieConsent();
  return c !== null && c.version === CURRENT_VERSION;
}

export function acceptAll(): void {
  setCookieConsent({ analytics: true, marketing: true });
}

export function rejectAll(): void {
  setCookieConsent({ analytics: false, marketing: false });
}

export function isAnalyticsAllowed(): boolean {
  return getCookieConsent()?.analytics === true;
}

export function isMarketingAllowed(): boolean {
  return getCookieConsent()?.marketing === true;
}
