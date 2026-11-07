// Datele meniului de servicii din antet: meniul mare de pe desktop si lista de pe telefon (si coloana
// Servicii din subsol). Video motion design si auditul gratuit (novin.ro) au fost scoase din meniu la
// cererea proprietarului (2026-10-17); paginile lor raman.
// Din 2026-11-05 aici stau doar caile interne ale paginilor; titlurile si descrierile, in fiecare limba,
// sunt in lib/i18n/dictionare (servicii.lista), iar adresa publica o da cale(lang, href).

export const DEZVOLTARE_WEB = ['/servicii/magazine-online', '/servicii/website-de-prezentare', '/servicii/aplicatii-web-saas'];

export const SOLUTII_COMPLETE = ['/servicii/cms-crm-erp', '/servicii/aplicatii-mobile', '/servicii/automatizari-ai'];

// numarul afisat in romana; in celelalte limbi textul vine din dictionar (+40 750 456 096)
export const TELEFON = { href: 'tel:+40750456096', text: '0750 456 096' };

// Proiectul real din portofoliu (lib/portfolio-data.ts) aratat in dreapta meniului; tipul e in dictionar.
export const PROIECT_MENIU = {
  titlu: 'Fortas Estate',
  imagine: '/imagini/portofoliu/FORTASESTATE.RO.webp',
};
