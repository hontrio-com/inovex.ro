import { isMarketingAllowed } from '@/lib/cookies';
import { trackLinkedIn } from '@/lib/linkedin';

export const GTM_ID = 'GTM-MMN893Q3';

function pushEvent(event: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

// fiecare conversie merge in GTM (Google Ads) si, din 2026-11-05, la LinkedIn Ads (doar cand conversia are ID
// in lib/linkedin.ts); ambele cand marketingul e permis (isMarketingAllowed; mereu, cat timp PIXELI_FARA_ACORD)
export const trackConversions = {
  formularOferta:      (): void => { if (isMarketingAllowed()) pushEvent('conversion_oferta'); trackLinkedIn('oferta'); },
  formularContact:     (): void => { if (isMarketingAllowed()) pushEvent('conversion_contact'); trackLinkedIn('contact'); },
  configuratorMagazin: (): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_magazin'); trackLinkedIn('configurator'); },
  configuratorWebsite:      (): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_website'); trackLinkedIn('configurator'); },
  configuratorAplicatieWeb: (): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_aplicatie_web'); trackLinkedIn('configurator'); },
  configuratorAutomatizari: (): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_automatizari'); trackLinkedIn('configurator'); },
  whatsapp:            (): void => { if (isMarketingAllowed()) pushEvent('conversion_whatsapp'); trackLinkedIn('whatsapp'); },
  telefon:             (): void => { if (isMarketingAllowed()) pushEvent('conversion_telefon'); trackLinkedIn('telefon'); },
};
