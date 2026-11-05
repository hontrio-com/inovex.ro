// Datele meniului de servicii din antet: meniul mare de pe desktop si lista de pe telefon.
// Video motion design si auditul gratuit (novin.ro) au fost scoase din meniu la cererea
// proprietarului (2026-10-17); paginile lor raman.

export type Serviciu = { href: string; titlu: string; descriere: string };

export const DEZVOLTARE_WEB: Serviciu[] = [
  { href: '/servicii/magazine-online', titlu: 'Magazine online', descriere: 'WooCommerce, Shopify, soluții custom care vând' },
  { href: '/servicii/website-de-prezentare', titlu: 'Website de prezentare', descriere: 'Design modern, încărcare rapidă, construit pentru conversii' },
  { href: '/servicii/aplicatii-web-saas', titlu: 'Aplicații web & SaaS', descriere: 'Platforme scalabile, dezvoltate pentru creștere reală' },
];

export const SOLUTII_COMPLETE: Serviciu[] = [
  { href: '/servicii/cms-crm-erp', titlu: 'CMS, CRM & ERP', descriere: 'Sisteme personalizate pentru automatizare și control total' },
  { href: '/servicii/aplicatii-mobile', titlu: 'Aplicații mobile', descriere: 'iOS și Android, experiență fluidă și performanță ridicată' },
  { href: '/servicii/automatizari-ai', titlu: 'Automatizări AI', descriere: 'Reducem costurile și munca manuală prin automatizări inteligente' },
];

export const GRUPURI = [
  { titlu: 'Dezvoltare web', servicii: DEZVOLTARE_WEB },
  { titlu: 'Soluții complete', servicii: SOLUTII_COMPLETE },
];

export const TELEFON = { href: 'tel:+40750456096', text: '0750 456 096' };

// Proiectul real din portofoliu (lib/portfolio-data.ts) aratat in dreapta meniului.
export const PROIECT_MENIU = {
  titlu: 'Fortas Estate',
  tip: 'Platformă imobiliară',
  imagine: '/imagini/portofoliu/FORTASESTATE.RO.webp',
};
