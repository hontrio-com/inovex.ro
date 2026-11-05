import { isMarketingAllowed } from '@/lib/cookies';

/* LinkedIn Insight Tag (adaugat pe 2026-11-05, pentru reclamele LinkedIn Ads). Tagul
   (components/analytics/LinkedInInsight.tsx) si conversiile, care pleaca din trackConversions (lib/gtm.ts),
   merg cand marketingul e permis: isMarketingAllowed din lib/cookies.ts (mereu, cat timp PIXELI_FARA_ACORD).

   Perechea de pe server: la fiecare formular, website-lead.ts trimite prin Conversions API „Server – Lead de pe
   site” (lib/crm/ads/linkedin.ts) cu ACELASI event_id. LinkedIn deduplica dupa cont + event_id: pastreaza
   evenimentul din tag si il arunca pe cel de pe server, care ramane sa conteze doar cand tagul e blocat. */

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

// conversiile „Site – …” din Campaign Manager (Insight Tag, „Event-specific”), cate una pe fiecare actiune
const CONVERSII: Record<ConversieLinkedIn, number> = {
  oferta: 31928810, // Site – Formular ofertă (LEAD)
  contact: 31928818, // Site – Formular contact (LEAD)
  configurator: 31928826, // Site – Configurator (LEAD)
  telefon: 31928834, // Site – Click telefon (OTHER)
  whatsapp: 31928842, // Site – Click WhatsApp (OTHER)
};

/** `eventId`: acelasi ID trimis serverului (X-Meta-Event-Id), ca LinkedIn sa numere lead-ul o singura data. */
export function trackLinkedIn(conversie: ConversieLinkedIn, eventId?: string | null): void {
  if (typeof window === 'undefined' || !isMarketingAllowed() || typeof window.lintrk !== 'function') return;
  window.lintrk('track', { conversion_id: CONVERSII[conversie], ...(eventId ? { event_id: eventId } : {}) });
}
