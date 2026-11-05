import { isMarketingAllowed } from '@/lib/cookies';

/* LinkedIn Insight Tag (adaugat pe 2026-11-05, pentru reclamele LinkedIn Ads). Tagul se incarca doar dupa
   acordul pentru cookie-urile de marketing (components/analytics/LinkedInInsight.tsx), iar conversiile pleaca
   din trackConversions (lib/gtm.ts), tot doar cu acord. */

type Lintrk = ((actiune: string, date?: Record<string, unknown>) => void) & { q?: unknown[] };

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    lintrk?: Lintrk;
  }
}

// ID-ul de partener din Campaign Manager (din scriptul Insight Tag)
export const LINKEDIN_PARTNER_ID = '10045906';

export type ConversieLinkedIn = 'oferta' | 'contact' | 'configurator' | 'whatsapp' | 'telefon';

// ID-urile conversiilor create in LinkedIn Campaign Manager (Analyze > Conversion tracking > Create conversion >
// Insight Tag, „Event-specific”), cate unul pe fiecare actiune. O actiune fara ID nu trimite nimic.
const CONVERSII: Partial<Record<ConversieLinkedIn, number>> = {};

export function trackLinkedIn(conversie: ConversieLinkedIn): void {
  const id = CONVERSII[conversie];
  if (!id || typeof window === 'undefined' || !isMarketingAllowed() || typeof window.lintrk !== 'function') return;
  window.lintrk('track', { conversion_id: id });
}
