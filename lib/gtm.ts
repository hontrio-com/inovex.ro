export const GTM_ID = 'GTM-MMN893Q3'

function pushEvent(event: string): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event })
}

export const trackConversions = {
  formularOferta:         (): void => pushEvent('conversion_oferta'),
  formularContact:        (): void => pushEvent('conversion_contact'),
  configuratorMagazin:    (): void => pushEvent('conversion_configurator_magazin'),
  configuratorWebsite:    (): void => pushEvent('conversion_configurator_website'),
  whatsapp:               (): void => pushEvent('conversion_whatsapp'),
  telefon:                (): void => pushEvent('conversion_telefon'),
}
