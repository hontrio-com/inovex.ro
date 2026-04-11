export const TIKTOK_PIXEL_ID = 'CSJBSCJC77U0SUN6SKH0'

function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (!window.ttq) return
  window.ttq.track(event, params)
}

export const trackTikTok = {
  formularOferta: (): void =>
    track('SubmitForm', { content_name: 'Formular Oferta' }),

  formularContact: (): void =>
    track('SubmitForm', { content_name: 'Formular Contact' }),

  configuratorMagazin: (): void =>
    track('SubmitForm', { content_name: 'Configurator Magazin Online' }),

  configuratorWebsite: (): void =>
    track('SubmitForm', { content_name: 'Configurator Website Prezentare' }),

  whatsapp: (): void =>
    track('Contact', { content_name: 'WhatsApp' }),

  telefon: (): void =>
    track('Contact', { content_name: 'Telefon' }),

  viewContent: (productName: string): void =>
    track('ViewContent', { content_name: productName }),

  marketplace: (productName: string): void =>
    track('SubmitForm', { content_name: `Marketplace: ${productName}` }),
}
