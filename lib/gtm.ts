import { isMarketingAllowed } from '@/lib/cookies';
import { trackLinkedIn } from '@/lib/linkedin';

export const GTM_ID = 'GTM-MMN893Q3';

function pushEvent(event: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

// fiecare conversie merge in GTM (Google Ads) si, din 2026-11-05, la LinkedIn Ads (conversiile „Site – …” din
// lib/linkedin.ts); ambele cand marketingul e permis (isMarketingAllowed; mereu, cat timp PIXELI_FARA_ACORD).
// La formulare, `eventId` e ID-ul trimis serverului in X-Meta-Event-Id: LinkedIn deduplica cu el lead-ul trimis
// de pe server prin Conversions API.
export const trackConversions = {
  formularOferta:      (eventId?: string): void => { if (isMarketingAllowed()) pushEvent('conversion_oferta'); trackLinkedIn('oferta', eventId); },
  formularContact:     (eventId?: string): void => { if (isMarketingAllowed()) pushEvent('conversion_contact'); trackLinkedIn('contact', eventId); },
  configuratorMagazin: (eventId?: string): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_magazin'); trackLinkedIn('configurator', eventId); },
  configuratorWebsite:      (eventId?: string): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_website'); trackLinkedIn('configurator', eventId); },
  configuratorAplicatieWeb: (eventId?: string): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_aplicatie_web'); trackLinkedIn('configurator', eventId); },
  configuratorAutomatizari: (eventId?: string): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_automatizari'); trackLinkedIn('configurator', eventId); },
  whatsapp:            (): void => { if (isMarketingAllowed()) pushEvent('conversion_whatsapp'); trackLinkedIn('whatsapp'); },
  telefon:             (): void => { if (isMarketingAllowed()) pushEvent('conversion_telefon'); trackLinkedIn('telefon'); },
};
