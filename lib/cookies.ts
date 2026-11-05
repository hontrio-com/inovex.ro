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

/**
 * Decizia proprietarului (2026-11-05): pixelii (Google Tag Manager, Meta, TikTok, OpenAI, LinkedIn) si
 * conversiile pornesc fara sa astepte acordul din bannerul de cookie-uri; riscul (GDPR / ePrivacy) si-l
 * asuma el. Bannerul ramane si isi salveaza alegerea, dar pixelii nu o mai asteapta. Cu `false`, totul
 * revine la acord: OpenAI si LinkedIn, plus conversiile GTM, TikTok si LinkedIn, asteapta iar „Accepta”.
 */
export const PIXELI_FARA_ACORD = true;

export function isAnalyticsAllowed(): boolean {
  return PIXELI_FARA_ACORD || getCookieConsent()?.analytics === true;
}

export function isMarketingAllowed(): boolean {
  return PIXELI_FARA_ACORD || getCookieConsent()?.marketing === true;
}
