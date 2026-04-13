import { isMarketingAllowed } from '@/lib/cookies';

export const GTM_ID = 'GTM-MMN893Q3';

function pushEvent(event: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

export const trackConversions = {
  formularOferta:      (): void => { if (isMarketingAllowed()) pushEvent('conversion_oferta'); },
  formularContact:     (): void => { if (isMarketingAllowed()) pushEvent('conversion_contact'); },
  configuratorMagazin: (): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_magazin'); },
  configuratorWebsite: (): void => { if (isMarketingAllowed()) pushEvent('conversion_configurator_website'); },
  whatsapp:            (): void => { if (isMarketingAllowed()) pushEvent('conversion_whatsapp'); },
  telefon:             (): void => { if (isMarketingAllowed()) pushEvent('conversion_telefon'); },
};
