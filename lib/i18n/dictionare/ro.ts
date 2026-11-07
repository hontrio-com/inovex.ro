/* Textele comune ale site-ului in romana: sursa de adevar pentru forma dictionarelor (en, de, fr au
   exact aceleasi chei, verificat de TypeScript prin tipul Dictionar). Textele paginilor se adauga aici
   pe masura ce paginile se traduc. */

export const ro = {
  meta: {
    titlu: 'Inovex | Agentie Web Premium | Magazine Online, Website-uri, Aplicatii',
    descriere:
      'Agentie de dezvoltare web din Romania. Construim magazine online, website-uri de prezentare si aplicatii web care performeaza, se incarca rapid si convertesc. 200+ proiecte livrate.',
    cuvinte: [
      'agentie web Romania',
      'dezvoltare web',
      'magazine online',
      'website de prezentare',
      'aplicatii web',
      'web design Romania',
      'WooCommerce Romania',
      'Shopify Romania',
      'SEO Romania',
      'Inovex',
    ],
    ogAlt: 'Inovex - Agentie Web Premium din Romania',
  },

  telefon: '0750 456 096',

  limba: {
    eticheta: 'Limba',
    schimba: 'Schimbă limba',
  },

  antet: {
    acasa: 'Inovex, prima pagină',
    navigare: 'Navigare principală',
    servicii: 'Servicii',
    motion: 'Motion Design',
    nou: 'Nou',
    portofoliu: 'Portofoliu',
    marketplace: 'Marketplace',
    contact: 'Contact',
    oferta: 'Solicită ofertă',
    deschideMeniul: 'Deschide meniul',
    inchideMeniul: 'Închide meniul',
    suna: 'Sună',
  },

  // numele serviciilor (meniu, subsol), dupa calea interna a paginii
  servicii: {
    grupDezvoltare: 'Dezvoltare web',
    grupSolutii: 'Soluții complete',
    proiectTip: 'Platformă imobiliară',
    veziPortofoliul: 'Vezi portofoliul',
    lista: {
      '/servicii/magazine-online': { titlu: 'Magazine online', descriere: 'WooCommerce, Shopify, soluții custom care vând' },
      '/servicii/website-de-prezentare': {
        titlu: 'Website de prezentare',
        descriere: 'Design modern, încărcare rapidă, construit pentru conversii',
      },
      '/servicii/aplicatii-web-saas': { titlu: 'Aplicații web & SaaS', descriere: 'Platforme scalabile, dezvoltate pentru creștere reală' },
      '/servicii/cms-crm-erp': { titlu: 'CMS, CRM & ERP', descriere: 'Sisteme personalizate pentru automatizare și control total' },
      '/servicii/aplicatii-mobile': { titlu: 'Aplicații mobile', descriere: 'iOS și Android, experiență fluidă și performanță ridicată' },
      '/servicii/automatizari-ai': {
        titlu: 'Automatizări AI',
        descriere: 'Reducem costurile și munca manuală prin automatizări inteligente',
      },
    } as Record<string, { titlu: string; descriere: string }>,
    motion: 'Video motion design',
  },

  subsol: {
    aria: 'Subsol',
    despre:
      'Construim magazine online, website-uri de prezentare și aplicații web care se încarcă rapid, arată profesional și aduc rezultate reale pentru afacerea ta.',
    retea: 'Inovex pe {retea}',
    titluServicii: 'Servicii',
    titluCompanie: 'Companie',
    titluLegal: 'Legal',
    titluContact: 'Contact',
    portofoliu: 'Portofoliu',
    marketplace: 'Marketplace',
    invataGratuit: 'Învață gratuit',
    oferta: 'Solicită ofertă',
    contact: 'Contact',
    audit: 'Audit website gratuit',
    termeni: 'Termeni și condiții',
    confidentialitate: 'Politica de confidențialitate',
    cookies: 'Politica de cookies',
    locatie: 'Târgu Jiu / București',
    drepturi: '© {an} Inovex. Toate drepturile rezervate.',
    sal: 'Soluționarea alternativă a litigiilor (ANPC)',
    // doar in EN/DE/FR, unde datele firmei nu mai stau in subsol: linkul spre ele (sectiunea 1 din termeni)
    impressum: 'Date de identificare',
    impressumAncora: 'sectiunea-1',
    setariCookies: 'Setări cookies',
  },

  butoane: {
    aria: 'Butoane contact rapid',
    whatsapp: 'Mesaj WhatsApp',
    mesajWhatsapp: 'Bună ziua, am o întrebare despre serviciile Inovex.',
    suna: 'Sună acum',
  },

  cookies: {
    text: 'Folosim cookie-uri pentru a îmbunătăți experiența ta pe site și pentru a analiza traficul.',
    politica: 'Politica de cookies',
    politicaCompleta: 'Politica de cookies completă',
    personalizeaza: 'Personalizează',
    refuzaToate: 'Refuză toate',
    acceptaToate: 'Acceptă toate',
    acceptaSelectate: 'Acceptă selectate',
    titluPanou: 'Personalizează preferințele de cookie-uri',
    inchidePanou: 'Închide panoul',
    mereuActive: 'Întotdeauna active',
    esentiale: 'Cookie-uri esențiale',
    esentialeText: 'Necesare pentru funcționarea de bază a site-ului. Nu pot fi dezactivate.',
    analitice: 'Cookie-uri analitice (Google Analytics 4)',
    analiticeText: 'Ne ajută să înțelegem cum folosești site-ul. Datele sunt anonimizate.',
    marketing: 'Cookie-uri de marketing (Google Ads, Meta, TikTok, LinkedIn, ChatGPT Ads)',
    marketingText: 'Folosite pentru măsurarea eficienței campaniilor noastre publicitare. Nu afișăm reclame pe site.',
  },

  configuratoare: {
    contract: 'Contract de prestări servicii',
    factura: 'Factură fiscală inclusă',
    garantie: 'Garanție și asistență gratuită',
  },
};

export type Dictionar = typeof ro;
