import { isMarketingAllowed } from '@/lib/cookies';

export const TIKTOK_PIXEL_ID = 'CSJBSCJC77U0SUN6SKH0';

function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (!window.ttq) return;
  window.ttq.track(event, params);
}

export const trackTikTok = {
  formularOferta: (): void => {
    if (!isMarketingAllowed()) return;
    track('SubmitForm', { content_name: 'Formular Oferta' });
  },
  formularContact: (): void => {
    if (!isMarketingAllowed()) return;
    track('SubmitForm', { content_name: 'Formular Contact' });
  },
  configuratorMagazin: (): void => {
    if (!isMarketingAllowed()) return;
    track('SubmitForm', { content_name: 'Configurator Magazin Online' });
  },
  configuratorWebsite: (): void => {
    if (!isMarketingAllowed()) return;
    track('SubmitForm', { content_name: 'Configurator Website Prezentare' });
  },
  configuratorAplicatieWeb: (): void => {
    if (!isMarketingAllowed()) return;
    track('SubmitForm', { content_name: 'Configurator Aplicatie Web' });
  },
  configuratorAutomatizari: (): void => {
    if (!isMarketingAllowed()) return;
    track('SubmitForm', { content_name: 'Configurator Automatizari AI' });
  },
  whatsapp: (): void => {
    if (!isMarketingAllowed()) return;
    track('Contact', { content_name: 'WhatsApp' });
  },
  telefon: (): void => {
    if (!isMarketingAllowed()) return;
    track('Contact', { content_name: 'Telefon' });
  },
  viewContent: (productName: string): void => {
    if (!isMarketingAllowed()) return;
    track('ViewContent', { content_name: productName });
  },
  marketplace: (productName: string): void => {
    if (!isMarketingAllowed()) return;
    track('SubmitForm', { content_name: `Marketplace: ${productName}` });
  },
};
