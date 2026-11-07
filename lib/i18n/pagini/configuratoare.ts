import type { Limba } from '../config';
import { CURS_EUR_RON } from '@/lib/motion-design';

/* Configuratoarele (magazin online, website de prezentare, aplicatie web, automatizari AI) in cele 4
   limbi (2026-11-07). Romana e textul de pana acum, neschimbat. Valorile trimise la server (tipul de
   entitate, industria, bugetul etc.) raman cele romanesti in toate limbile, ca in CRM si in emailul
   intern sa arate la fel; se traduc doar etichetele. Componentele de client primesc bucati din aceste
   texte prin props (pagina) si prin contextul din layout (`comun`), ca sa nu ajunga toate limbile in
   browser. Emailurile catre client iau etichetele tot de aici. */

export type Optiune = { valoare: string; eticheta: string; desc?: string };
type Acord = [inainte: string, link: string, dupa: string];
type Avertisment = [tare: string, inainte: string, dupa: string];

/** Eticheta unei valori din configurator (ex. pentru emailul clientului); valoarea insasi daca nu e in lista. */
export const etichetaOptiune = (lista: Optiune[], valoare: string) =>
  lista.find((o) => o.valoare === valoare)?.eticheta ?? valoare;

// Bugetul magazinului in euro (decizia userului: EUR la cursul BNR, rotunjit): pragurile de 5.000 si
// 10.000 lei, rotunjite la suta de euro => 900 si 1.900 €. Valoarea trimisa ramane cea in lei.
const [PRAG_MIC, PRAG_MARE] = [5000, 10000].map((lei) => Math.round(lei / CURS_EUR_RON / 100) * 100);
const nr = (n: number, loc: string) => n.toLocaleString(loc);

const ro = {
  // textele comune (components/configurator/Configurator.tsx), din layout prin context
  comun: {
    ariaPasi: 'Pașii configuratorului',
    stiaiCa: 'Știai că?',
    optional: '(opțional)',
    acord: ['Sunt de acord cu ', 'Politica de confidențialitate', ''] as Acord,
    eroare: 'A apărut o eroare. Te rugăm să încerci din nou sau să ne suni la {telefon}.',
    inapoi: 'Înapoi',
    continua: 'Continuă',
    trimite: 'Trimite cererea',
    seTrimite: 'Se trimite...',
    succesTitlu: 'Cererea ta a fost trimisă',
    succesVerifica: 'Verifică telefonul și emailul în următoarele ore.',
    acasa: 'Înapoi la prima pagină',
    erori: {
      nume: 'Numele trebuie să aibă cel puțin 2 caractere',
      email: 'Email invalid',
      telefon: 'Telefonul trebuie să aibă cel puțin 10 cifre',
      acord: 'Trebuie să accepți politica de confidențialitate',
    },
    // primul pas la magazin si website: cine semneaza contractul
    entitate: {
      titlu: 'Ești persoană fizică sau juridică?',
      subtitlu: 'Alege tipul de entitate cu care vei semna contractul.',
      optiuni: [
        { valoare: 'Persoana fizica', eticheta: 'Persoană fizică', desc: 'Fără firmă înregistrată' },
        { valoare: 'Persoana juridica', eticheta: 'Persoană juridică', desc: 'SRL, PFA, II, SA' },
      ] as Optiune[],
    },
    // ultimul pas la magazin si website
    contact: {
      titlu: 'Ultimul pas: datele tale de contact',
      subtitlu: 'Te contactăm în maximum 24 de ore cu o propunere.',
      nume: 'Nume complet',
      email: 'Email',
      telefon: 'Telefon',
      observatii: 'Alte observații',
      exObservatii: 'Orice detalii suplimentare despre proiect...',
    },
  },

  magazin: {
    meta: {
      titlu: 'Configurator magazin online',
      descriere: 'Configurează cererea ta pentru un magazin online profesional. Răspuns în 24 de ore.',
    },
    anunt: 'Peste 200 de magazine online livrate pentru antreprenori din România',
    pasi: ['Entitate & Industrie', 'Produse', 'Buget', 'Contact'],
    avertisment: [
      'Ne pare rău, lucrăm doar cu persoane juridice.',
      'Pentru a crea un magazin online ai nevoie de o firmă înregistrată (SRL, PFA, II, SA). Dacă ai deja una, alege ',
      '.',
    ] as Avertisment,
    produse: 'Ce produse vinzi?',
    exProduse: 'Ex: Haine și accesorii pentru femei, genți din piele, bijuterii handmade...',
    stiaiCa: [
      'Un magazin online lucrează 24/7 fără să plătești angajați. 70% din comenzile online se plasează în afara orelor de program.',
      'Magazinele cu un catalog bine organizat și imagini de calitate au o rată de conversie cu până la 40% mai mare decât cele cu imagini slabe sau categorii haotice.',
    ],
    stoc: {
      titlu: 'Ai deja stocul de produse?',
      subtitlu: 'Acest lucru ne ajută să recomandăm soluția potrivită.',
    },
    areProduse: [
      { valoare: 'da', eticheta: 'Da, am produse', desc: 'Știu ce vreau să vând' },
      { valoare: 'nu', eticheta: 'Nu, încă', desc: 'Sunt în curs de planificare' },
    ] as Optiune[],
    cateProduse: 'Câte produse vrei să vinzi?',
    nrProduse: [
      { valoare: '1-50', eticheta: '1-50' },
      { valoare: '50-200', eticheta: '50-200' },
      { valoare: '200-1000', eticheta: '200-1000' },
      { valoare: 'Peste 1000', eticheta: 'Peste 1000' },
    ] as Optiune[],
    buget: {
      titlu: 'Care este bugetul estimat pentru proiect?',
      subtitlu: 'Ne ajută să îți recomandăm de la bun început soluția potrivită.',
    },
    bugete: [
      { valoare: 'Sub 5.000 lei', eticheta: 'Sub 5.000 lei' },
      { valoare: 'Între 5.000 și 10.000 lei', eticheta: 'Între 5.000 și 10.000 lei' },
      { valoare: 'Peste 10.000 lei', eticheta: 'Peste 10.000 lei' },
      { valoare: 'Nu știu încă', eticheta: 'Nu știu încă' },
    ] as Optiune[],
    ex: { nume: 'Ion Popescu', email: 'ion@companie.ro', telefon: '07xx xxx xxx' },
    succes: 'Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile proiectului tău.',
  },

  website: {
    meta: {
      titlu: 'Configurator website de prezentare',
      descriere: 'Configurează cererea ta pentru un website de prezentare profesional. Răspuns în 24 de ore.',
    },
    anunt: 'Peste 200 de website-uri profesionale livrate pentru firme din România',
    pasi: ['Entitate & Industrie', 'Structură', 'Contact'],
    avertisment: [
      'Ne pare rău, lucrăm doar cu persoane juridice.',
      'Pentru a crea un website de prezentare ai nevoie de o firmă înregistrată (SRL, PFA, II, SA). Dacă ai deja una, selectează ',
      '.',
    ] as Avertisment,
    industrie: 'În ce industrie activezi?',
    industrii: [
      { valoare: 'Construcții', eticheta: 'Construcții' },
      { valoare: 'Auto', eticheta: 'Auto' },
      { valoare: 'Pensiuni', eticheta: 'Pensiuni' },
      { valoare: 'Restaurant', eticheta: 'Restaurant' },
      { valoare: 'Imobiliare', eticheta: 'Imobiliare' },
      { valoare: 'Transport', eticheta: 'Transport' },
      { valoare: 'Fitness', eticheta: 'Fitness' },
      { valoare: 'Alt domeniu', eticheta: 'Alt domeniu' },
    ] as Optiune[],
    altDomeniu: 'Domeniul tău de activitate',
    exAltDomeniu: 'Scrie domeniul tău de activitate...',
    stiaiCa: [
      'Astăzi, 81% din consumatori caută online înainte de a contacta o firmă. Fără un website profesional, pierzi clienți în fiecare zi în favoarea concurenților.',
      'Un website bine construit este cel mai rentabil instrument de marketing pe termen lung. Spre deosebire de reclamele plătite, un site optimizat îți aduce clienți și fără buget publicitar.',
    ],
    structura: {
      titlu: 'Cum vrei să arate site-ul?',
      subtitlu: 'Alege structura potrivită pentru tine.',
    },
    pagini: 'Câte pagini aproximativ?',
    nrPagini: [
      { valoare: '1-5', eticheta: '1-5', desc: 'Site simplu' },
      { valoare: '6-10', eticheta: '6-10', desc: 'Site mediu' },
      { valoare: '11-20', eticheta: '11-20', desc: 'Site complex' },
      { valoare: 'Personalizat', eticheta: 'Personalizat', desc: 'Discutăm' },
    ] as Optiune[],
    obiectiv: 'Care este obiectivul principal?',
    obiective: [
      { valoare: 'Prezentare servicii', eticheta: 'Prezentare servicii', desc: 'Portofoliu, servicii' },
      { valoare: 'Generare de lead-uri', eticheta: 'Generare de lead-uri', desc: 'Formular de contact, telefon' },
      { valoare: 'Rezervari online', eticheta: 'Rezervări online', desc: 'Programări, booking' },
      { valoare: 'Nu stiu inca', eticheta: 'Nu știu încă', desc: 'Mă ajutați voi' },
    ] as Optiune[],
    ex: { nume: 'Ion Popescu', email: 'ion@companie.ro', telefon: '0750 456 096' },
    succes: 'Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile proiectului tău.',
  },

  aplicatie: {
    meta: {
      titlu: 'Configurează aplicația ta web',
      descriere:
        'Spune-ne despre aplicația sau platforma SaaS pe care vrei să o construiești. Primești o propunere personalizată în 24 de ore.',
    },
    anunt: 'Peste 50 de aplicații web și platforme SaaS livrate pentru antreprenori din România',
    pasi: ['Ideea ta', 'Tipul aplicației', 'Contact'],
    idee: {
      titlu: 'Hai să configurăm aplicația ta web',
      subtitlu: 'Spune-ne câteva detalii despre ce vrei să construiești',
      intrebare: 'Ai deja o idee clară pentru aplicația ta?',
    },
    claritate: [
      { valoare: 'da-stiu-exact', eticheta: 'Da, știu exact ce vreau', desc: 'Am viziunea clară și vreau să o implementăm' },
      { valoare: 'am-o-idee', eticheta: 'Am o idee, dar nu este încă bine definită', desc: 'Știu direcția, dar mai am întrebări' },
      { valoare: 'am-nevoie-de-ajutor', eticheta: 'Nu, am nevoie de ajutor', desc: 'Vreau să discutăm și să găsim soluția potrivită' },
    ] as Optiune[],
    tip: {
      titlu: 'Tipul aplicației tale',
      subtitlu: 'Selectează varianta care se potrivește cel mai bine',
      intrebare: 'Cum ai descrie pe scurt aplicația ta?',
    },
    tipuri: [
      { valoare: 'platforma-utilizatori', eticheta: 'Platformă cu utilizatori', desc: 'Conturi, panou de control, diferite funcții' },
      { valoare: 'marketplace', eticheta: 'Marketplace', desc: 'Stil eMag, OLX, platforme de vânzare între utilizatori' },
      { valoare: 'aplicatie-servicii', eticheta: 'Aplicație de servicii', desc: 'Programări, rezervări, booking online' },
      { valoare: 'sistem-intern', eticheta: 'Sistem intern pentru business', desc: 'Gestionare clienți, comenzi, procese interne' },
      { valoare: 'alt-tip', eticheta: 'Alt tip', desc: 'Alt tip de aplicație web' },
    ] as Optiune[],
    descriere: 'Descrie pe scurt ideea ta',
    exDescriere:
      'Ex: Vreau o platformă unde furnizorii pot lista servicii și clienții le pot rezerva online, cu plata integrată...',
    // sectiunea de atasamente de la pasul 2 (lib/configurator-atasamente.ts)
    atasamente: {
      eticheta: 'Atașamente',
      descriere: 'Ai un plan, o schiță sau o structură a aplicației? Atașează-le, ne ajută să înțelegem ideea mai repede.',
      alege: 'Alege fișierele',
      trage: ' sau trage-le aici',
      limite: 'PDF, imagini, Word, Excel, PowerPoint, TXT sau ZIP · cel mult {n} fișiere, de până la {mb} MB fiecare',
      elimina: 'Elimină {nume}',
      tip: 'Fișierul „{nume}” nu are un format acceptat.',
      mare: 'Fișierul „{nume}” are peste {mb} MB.',
      maxim: 'Poți atașa cel mult {n} fișiere.',
      seIncarca: 'Se încarcă fișierele...',
      eroare: 'Fișierele nu au putut fi încărcate. Încearcă din nou sau elimină-le și trimite cererea fără ele.',
      preaMulte: 'Prea multe încărcări într-un timp scurt. Încearcă din nou peste o oră.',
    },
    stiaiCa: [
      'Majoritatea aplicațiilor de succes pornesc de la o idee simplă, dar bine executată.',
      'Aplicațiile SaaS pot genera venit recurent lunar, nu doar vânzări unice.',
    ],
    contact: {
      titlu: 'Aproape gata!',
      subtitlu: 'Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile aplicației tale.',
    },
    ex: { nume: 'Numele tău complet', email: 'adresa@email.ro', telefon: '07XX XXX XXX' },
    // dupa linkul spre politica, in eticheta acordului
    acordExtra: ' și prelucrarea datelor mele în scopul răspunsului la această cerere.',
    succes: 'Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile aplicației tale.',
  },

  automatizari: {
    meta: {
      titlu: 'Configurează automatizările tale',
      descriere:
        'Spune-ne ce procese vrei să automatizezi în afacerea ta. Primești o propunere personalizată de implementare AI în 24 de ore.',
    },
    anunt: 'Automatizările AI pot economisi zilnic ore întregi echipei tale',
    pasi: ['Tipul afacerii', 'Ce automatizezi', 'Contact'],
    afacere: {
      titlu: 'Hai să configurăm automatizările tale',
      subtitlu: 'Câteva întrebări rapide pentru a înțelege afacerea ta',
      intrebare: 'Tip afacere',
    },
    tipuri: [
      { valoare: 'magazin-online', eticheta: 'Magazin online', desc: 'eCommerce, vânzări produse online' },
      { valoare: 'prestari-servicii', eticheta: 'Prestări servicii', desc: 'Consultanță, servicii profesionale' },
      { valoare: 'afacere-locala', eticheta: 'Afacere locală', desc: 'Clinică, salon, restaurant etc.' },
      { valoare: 'alt-tip', eticheta: 'Alt tip', desc: 'Altă categorie de business' },
    ] as Optiune[],
    procese: {
      titlu: 'Ce vrei să automatizezi?',
      subtitlu: 'Poți selecta mai multe variante',
      intrebare: 'Ce procese dorești să automatizezi?',
    },
    listaProcese: [
      { valoare: 'comunicare-clienti', eticheta: 'Comunicarea cu clienții', desc: 'Mesaje, emailuri automate' },
      { valoare: 'confirmare-comenzi', eticheta: 'Confirmarea comenzilor', desc: 'Notificări și confirmare automată' },
      { valoare: 'gestionare-date', eticheta: 'Introducerea / gestionarea datelor', desc: 'Actualizare automată baze de date' },
      { valoare: 'taskuri-interne', eticheta: 'Taskuri repetitive interne', desc: 'Procese recurente ale echipei' },
      { valoare: 'facturi-documente', eticheta: 'Facturi / documente', desc: 'Generare și trimitere automată' },
      { valoare: 'altceva', eticheta: 'Altceva', desc: 'Descrie mai jos ce ai nevoie' },
    ] as Optiune[],
    altceva: 'Descrie pe scurt ce vrei să automatizezi',
    exAltceva: 'Ex: Vreau să automatizez trimiterea rapoartelor săptămânale pe email către echipa mea...',
    erori: {
      procese: 'Te rugăm să alegi cel puțin un proces',
      altceva: 'Te rugăm să descrii ce proces vrei să automatizezi',
    },
    stiaiCa: [
      'Majoritatea afacerilor pierd zilnic ore întregi pe taskuri repetitive.',
      'Automatizarea proceselor poate reduce semnificativ costurile operaționale.',
    ],
    contact: {
      titlu: 'Aproape gata!',
      subtitlu: 'Un specialist Inovex în automatizări îți va răspunde în maximum 24 de ore.',
    },
    ex: { nume: 'Numele tău complet', email: 'adresa@email.ro', telefon: '07XX XXX XXX' },
    acordExtra: ' și prelucrarea datelor mele în scopul răspunsului la această cerere.',
    succes: 'Un specialist Inovex în automatizări te va contacta în maximum 24 de ore.',
  },
};

export type TextConfiguratoare = typeof ro;

/* ── Engleza (britanica) ── */

const en: TextConfiguratoare = {
  comun: {
    ariaPasi: 'Configurator steps',
    stiaiCa: 'Did you know?',
    optional: '(optional)',
    acord: ['I agree to the ', 'Privacy policy', ''],
    eroare: 'Something went wrong. Please try again or call us on {telefon}.',
    inapoi: 'Back',
    continua: 'Continue',
    trimite: 'Send request',
    seTrimite: 'Sending...',
    succesTitlu: 'Your request has been sent',
    succesVerifica: 'Keep an eye on your phone and inbox over the next few hours.',
    acasa: 'Back to home page',
    erori: {
      nume: 'Your name must be at least 2 characters',
      email: 'Invalid email address',
      telefon: 'Your phone number must have at least 10 digits',
      acord: 'You need to accept the privacy policy',
    },
    entitate: {
      titlu: 'Are you an individual or a business?',
      subtitlu: 'Choose who will sign the contract.',
      optiuni: [
        { valoare: 'Persoana fizica', eticheta: 'Individual', desc: 'No registered business' },
        { valoare: 'Persoana juridica', eticheta: 'Business', desc: 'Ltd, LLP, sole trader, PLC' },
      ],
    },
    contact: {
      titlu: 'Last step: your contact details',
      subtitlu: 'We’ll contact you within 24 hours with a proposal.',
      nume: 'Full name',
      email: 'Email',
      telefon: 'Phone',
      observatii: 'Additional notes',
      exObservatii: 'Any other details about the project...',
    },
  },

  magazin: {
    meta: {
      titlu: 'Online store configurator',
      descriere: 'Tell us about the online store you need. We reply within 24 hours.',
    },
    anunt: 'Online stores built for businesses around the world',
    pasi: ['Business & industry', 'Products', 'Budget', 'Contact'],
    avertisment: [
      'Sorry, we only work with businesses.',
      'To have an online store built, you need a registered business (Ltd, LLP, sole trader, PLC). If you already have one, choose ',
      '.',
    ],
    produse: 'What products do you sell?',
    exProduse: 'E.g. women’s clothing and accessories, leather bags, handmade jewellery...',
    stiaiCa: [
      'An online store sells 24/7 without you paying staff. 70% of online orders are placed outside business hours.',
      'Stores with a well-organised catalogue and high-quality images convert up to 40% better than those with poor images or messy categories.',
    ],
    stoc: {
      titlu: 'Do you already have products to sell?',
      subtitlu: 'This helps us recommend the right solution.',
    },
    areProduse: [
      { valoare: 'da', eticheta: 'Yes, I have products', desc: 'I know what I want to sell' },
      { valoare: 'nu', eticheta: 'Not yet', desc: 'I’m still planning' },
    ],
    cateProduse: 'How many products do you want to sell?',
    nrProduse: [
      { valoare: '1-50', eticheta: '1–50' },
      { valoare: '50-200', eticheta: '50–200' },
      { valoare: '200-1000', eticheta: '200–1,000' },
      { valoare: 'Peste 1000', eticheta: 'Over 1,000' },
    ],
    buget: {
      titlu: 'What is your estimated budget for the project?',
      subtitlu: 'It helps us recommend the right solution from the start.',
    },
    bugete: [
      { valoare: 'Sub 5.000 lei', eticheta: `Under €${nr(PRAG_MIC, 'en-GB')}` },
      { valoare: 'Între 5.000 și 10.000 lei', eticheta: `Between €${nr(PRAG_MIC, 'en-GB')} and €${nr(PRAG_MARE, 'en-GB')}` },
      { valoare: 'Peste 10.000 lei', eticheta: `Over €${nr(PRAG_MARE, 'en-GB')}` },
      { valoare: 'Nu știu încă', eticheta: 'Not sure yet' },
    ],
    ex: { nume: 'John Smith', email: 'john@company.com', telefon: '+44 7xxx xxxxxx' },
    succes: 'An Inovex consultant will contact you within 24 hours to discuss the details of your project.',
  },

  website: {
    meta: {
      titlu: 'Business website configurator',
      descriere: 'Tell us about the business website you need. We reply within 24 hours.',
    },
    anunt: 'Professional websites for businesses around the world',
    pasi: ['Business & industry', 'Structure', 'Contact'],
    avertisment: [
      'Sorry, we only work with businesses.',
      'To have a business website built, you need a registered business (Ltd, LLP, sole trader, PLC). If you already have one, select ',
      '.',
    ],
    industrie: 'What industry are you in?',
    industrii: [
      { valoare: 'Construcții', eticheta: 'Construction' },
      { valoare: 'Auto', eticheta: 'Automotive' },
      { valoare: 'Pensiuni', eticheta: 'Guesthouses' },
      { valoare: 'Restaurant', eticheta: 'Restaurant' },
      { valoare: 'Imobiliare', eticheta: 'Real estate' },
      { valoare: 'Transport', eticheta: 'Transport' },
      { valoare: 'Fitness', eticheta: 'Fitness' },
      { valoare: 'Alt domeniu', eticheta: 'Other' },
    ],
    altDomeniu: 'Your industry',
    exAltDomeniu: 'Type your industry...',
    stiaiCa: [
      'Today, 81% of consumers search online before contacting a business. Without a professional website, you lose customers to your competitors every day.',
      'A well-built website is the most cost-effective long-term marketing tool. Unlike paid ads, an optimised site keeps bringing you customers even without an advertising budget.',
    ],
    structura: {
      titlu: 'What should your website look like?',
      subtitlu: 'Choose the right structure for you.',
    },
    pagini: 'Roughly how many pages?',
    nrPagini: [
      { valoare: '1-5', eticheta: '1–5', desc: 'Simple site' },
      { valoare: '6-10', eticheta: '6–10', desc: 'Medium site' },
      { valoare: '11-20', eticheta: '11–20', desc: 'Complex site' },
      { valoare: 'Personalizat', eticheta: 'Custom', desc: 'Let’s talk' },
    ],
    obiectiv: 'What is the main goal?',
    obiective: [
      { valoare: 'Prezentare servicii', eticheta: 'Showcase services', desc: 'Portfolio, services' },
      { valoare: 'Generare de lead-uri', eticheta: 'Lead generation', desc: 'Contact form, phone' },
      { valoare: 'Rezervari online', eticheta: 'Online bookings', desc: 'Appointments, booking' },
      { valoare: 'Nu stiu inca', eticheta: 'Not sure yet', desc: 'Help me decide' },
    ],
    ex: { nume: 'John Smith', email: 'john@company.com', telefon: '+44 7xxx xxxxxx' },
    succes: 'An Inovex consultant will contact you within 24 hours to discuss the details of your project.',
  },

  aplicatie: {
    meta: {
      titlu: 'Configure your web app',
      descriere: 'Tell us about the app or SaaS platform you want to build. Get a tailored proposal within 24 hours.',
    },
    anunt: 'Web apps and SaaS platforms for businesses around the world',
    pasi: ['Your idea', 'App type', 'Contact'],
    idee: {
      titlu: 'Let’s configure your web app',
      subtitlu: 'Tell us a few details about what you want to build',
      intrebare: 'Do you already have a clear idea for your app?',
    },
    claritate: [
      { valoare: 'da-stiu-exact', eticheta: 'Yes, I know exactly what I want', desc: 'I have a clear vision and want to build it' },
      { valoare: 'am-o-idee', eticheta: 'I have an idea, but it’s not fully defined yet', desc: 'I know the direction, but I still have questions' },
      { valoare: 'am-nevoie-de-ajutor', eticheta: 'No, I need help', desc: 'I’d like to talk it through and find the right solution' },
    ],
    tip: {
      titlu: 'Your app type',
      subtitlu: 'Select the option that fits best',
      intrebare: 'How would you briefly describe your app?',
    },
    tipuri: [
      { valoare: 'platforma-utilizatori', eticheta: 'User platform', desc: 'Accounts, dashboard, different features' },
      { valoare: 'marketplace', eticheta: 'Marketplace', desc: 'Like eBay or Etsy: platforms where users sell to each other' },
      { valoare: 'aplicatie-servicii', eticheta: 'Service app', desc: 'Appointments, reservations, online booking' },
      { valoare: 'sistem-intern', eticheta: 'Internal business system', desc: 'Managing clients, orders, internal processes' },
      { valoare: 'alt-tip', eticheta: 'Other', desc: 'Another type of web app' },
    ],
    descriere: 'Briefly describe your idea',
    exDescriere:
      'E.g. I want a platform where providers can list services and customers can book them online, with integrated payments...',
    // sectiunea de atasamente de la pasul 2 (lib/configurator-atasamente.ts)
    atasamente: {
      eticheta: 'Attachments',
      descriere: 'Got a plan, a sketch or a structure for your app? Attach it, it helps us understand your idea faster.',
      alege: 'Choose files',
      trage: ' or drag them here',
      limite: 'PDF, images, Word, Excel, PowerPoint, TXT or ZIP · up to {n} files, max {mb} MB each',
      elimina: 'Remove {nume}',
      tip: 'The file “{nume}” is not in a supported format.',
      mare: 'The file “{nume}” is larger than {mb} MB.',
      maxim: 'You can attach up to {n} files.',
      seIncarca: 'Uploading files...',
      eroare: 'The files could not be uploaded. Please try again, or remove them and send your request without them.',
      preaMulte: 'Too many uploads in a short time. Please try again in an hour.',
    },
    stiaiCa: [
      'Most successful apps start from a simple idea that is well executed.',
      'SaaS apps can generate monthly recurring revenue, not just one-off sales.',
    ],
    contact: {
      titlu: 'Almost done!',
      subtitlu: 'An Inovex consultant will contact you within 24 hours to discuss the details of your app.',
    },
    ex: { nume: 'Your full name', email: 'name@email.com', telefon: '+44 7xxx xxxxxx' },
    acordExtra: ' and to the processing of my data to respond to this request.',
    succes: 'An Inovex consultant will contact you within 24 hours to discuss the details of your app.',
  },

  automatizari: {
    meta: {
      titlu: 'Configure your automations',
      descriere:
        'Tell us which processes you want to automate in your business. Get a tailored AI implementation proposal within 24 hours.',
    },
    anunt: 'AI automation can save your team hours every day',
    pasi: ['Business type', 'What to automate', 'Contact'],
    afacere: {
      titlu: 'Let’s configure your automations',
      subtitlu: 'A few quick questions to understand your business',
      intrebare: 'Business type',
    },
    tipuri: [
      { valoare: 'magazin-online', eticheta: 'Online store', desc: 'eCommerce, selling products online' },
      { valoare: 'prestari-servicii', eticheta: 'Service provider', desc: 'Consulting, professional services' },
      { valoare: 'afacere-locala', eticheta: 'Local business', desc: 'Clinic, salon, restaurant, etc.' },
      { valoare: 'alt-tip', eticheta: 'Other', desc: 'Another kind of business' },
    ],
    procese: {
      titlu: 'What do you want to automate?',
      subtitlu: 'You can select several options',
      intrebare: 'Which processes would you like to automate?',
    },
    listaProcese: [
      { valoare: 'comunicare-clienti', eticheta: 'Customer communication', desc: 'Automated messages and emails' },
      { valoare: 'confirmare-comenzi', eticheta: 'Order confirmation', desc: 'Automatic notifications and confirmation' },
      { valoare: 'gestionare-date', eticheta: 'Data entry / management', desc: 'Automatic database updates' },
      { valoare: 'taskuri-interne', eticheta: 'Repetitive internal tasks', desc: 'Your team’s recurring processes' },
      { valoare: 'facturi-documente', eticheta: 'Invoices / documents', desc: 'Automatic generation and sending' },
      { valoare: 'altceva', eticheta: 'Something else', desc: 'Describe what you need below' },
    ],
    altceva: 'Briefly describe what you want to automate',
    exAltceva: 'E.g. I want to automate sending weekly reports by email to my team...',
    erori: {
      procese: 'Please choose at least one process',
      altceva: 'Please describe the process you want to automate',
    },
    stiaiCa: [
      'Most businesses lose hours every day to repetitive tasks.',
      'Automating processes can significantly reduce operating costs.',
    ],
    contact: {
      titlu: 'Almost done!',
      subtitlu: 'An Inovex automation specialist will get back to you within 24 hours.',
    },
    ex: { nume: 'Your full name', email: 'name@email.com', telefon: '+44 7xxx xxxxxx' },
    acordExtra: ' and to the processing of my data to respond to this request.',
    succes: 'An Inovex automation specialist will contact you within 24 hours.',
  },
};

/* ── Germana (cu Sie) ── */

const de: TextConfiguratoare = {
  comun: {
    ariaPasi: 'Schritte des Konfigurators',
    stiaiCa: 'Schon gewusst?',
    optional: '(optional)',
    acord: ['Ich stimme der ', 'Datenschutzerklärung', ' zu'],
    eroare: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an: {telefon}.',
    inapoi: 'Zurück',
    continua: 'Weiter',
    trimite: 'Anfrage senden',
    seTrimite: 'Wird gesendet...',
    succesTitlu: 'Ihre Anfrage wurde gesendet',
    succesVerifica: 'Bitte behalten Sie in den nächsten Stunden Ihr Telefon und Ihr E-Mail-Postfach im Blick.',
    acasa: 'Zurück zur Startseite',
    erori: {
      nume: 'Der Name muss mindestens 2 Zeichen lang sein',
      email: 'Ungültige E-Mail-Adresse',
      telefon: 'Die Telefonnummer muss mindestens 10 Ziffern haben',
      acord: 'Bitte akzeptieren Sie die Datenschutzerklärung',
    },
    entitate: {
      titlu: 'Sind Sie Privatperson oder Unternehmen?',
      subtitlu: 'Wählen Sie, wer den Vertrag unterschreibt.',
      optiuni: [
        { valoare: 'Persoana fizica', eticheta: 'Privatperson', desc: 'Ohne angemeldetes Gewerbe' },
        { valoare: 'Persoana juridica', eticheta: 'Unternehmen', desc: 'GmbH, UG, Einzelunternehmen, AG' },
      ],
    },
    contact: {
      titlu: 'Letzter Schritt: Ihre Kontaktdaten',
      subtitlu: 'Wir melden uns innerhalb von 24 Stunden mit einem Angebot.',
      nume: 'Vollständiger Name',
      email: 'E-Mail',
      telefon: 'Telefon',
      observatii: 'Weitere Anmerkungen',
      exObservatii: 'Weitere Details zu Ihrem Projekt...',
    },
  },

  magazin: {
    meta: {
      titlu: 'Online-Shop-Konfigurator',
      descriere: 'Beschreiben Sie den Online-Shop, den Sie brauchen. Antwort innerhalb von 24 Stunden.',
    },
    anunt: 'Online-Shops für Unternehmen auf der ganzen Welt',
    pasi: ['Unternehmen & Branche', 'Produkte', 'Budget', 'Kontakt'],
    avertisment: [
      'Leider arbeiten wir nur mit Unternehmen.',
      'Für einen Online-Shop benötigen Sie ein angemeldetes Unternehmen (GmbH, UG, Einzelunternehmen, AG). Wenn Sie bereits eines haben, wählen Sie ',
      '.',
    ],
    produse: 'Welche Produkte verkaufen Sie?',
    exProduse: 'Z. B. Damenmode und Accessoires, Ledertaschen, handgemachter Schmuck...',
    stiaiCa: [
      'Ein Online-Shop verkauft rund um die Uhr, ohne dass Sie Personal bezahlen. 70 % der Online-Bestellungen gehen außerhalb der Geschäftszeiten ein.',
      'Shops mit gut strukturiertem Katalog und hochwertigen Bildern erzielen eine bis zu 40 % höhere Conversion-Rate als Shops mit schwachen Bildern oder chaotischen Kategorien.',
    ],
    stoc: {
      titlu: 'Haben Sie Ihre Produkte bereits?',
      subtitlu: 'So können wir Ihnen die passende Lösung empfehlen.',
    },
    areProduse: [
      { valoare: 'da', eticheta: 'Ja, ich habe Produkte', desc: 'Ich weiß, was ich verkaufen will' },
      { valoare: 'nu', eticheta: 'Noch nicht', desc: 'Ich bin noch in der Planung' },
    ],
    cateProduse: 'Wie viele Produkte möchten Sie verkaufen?',
    nrProduse: [
      { valoare: '1-50', eticheta: '1–50' },
      { valoare: '50-200', eticheta: '50–200' },
      { valoare: '200-1000', eticheta: '200–1.000' },
      { valoare: 'Peste 1000', eticheta: 'Über 1.000' },
    ],
    buget: {
      titlu: 'Wie hoch ist Ihr geschätztes Budget für das Projekt?',
      subtitlu: 'So können wir Ihnen von Anfang an die passende Lösung empfehlen.',
    },
    bugete: [
      { valoare: 'Sub 5.000 lei', eticheta: `Unter ${nr(PRAG_MIC, 'de-DE')} €` },
      { valoare: 'Între 5.000 și 10.000 lei', eticheta: `Zwischen ${nr(PRAG_MIC, 'de-DE')} € und ${nr(PRAG_MARE, 'de-DE')} €` },
      { valoare: 'Peste 10.000 lei', eticheta: `Über ${nr(PRAG_MARE, 'de-DE')} €` },
      { valoare: 'Nu știu încă', eticheta: 'Weiß ich noch nicht' },
    ],
    ex: { nume: 'Max Mustermann', email: 'max@firma.de', telefon: '+49 1xx xxxxxxx' },
    succes: 'Ein Inovex-Berater meldet sich innerhalb von 24 Stunden bei Ihnen, um die Details Ihres Projekts zu besprechen.',
  },

  website: {
    meta: {
      titlu: 'Konfigurator für Unternehmenswebsites',
      descriere: 'Beschreiben Sie die Unternehmenswebsite, die Sie brauchen. Antwort innerhalb von 24 Stunden.',
    },
    anunt: 'Professionelle Websites für Unternehmen auf der ganzen Welt',
    pasi: ['Unternehmen & Branche', 'Struktur', 'Kontakt'],
    avertisment: [
      'Leider arbeiten wir nur mit Unternehmen.',
      'Für eine Unternehmenswebsite benötigen Sie ein angemeldetes Unternehmen (GmbH, UG, Einzelunternehmen, AG). Wenn Sie bereits eines haben, wählen Sie ',
      '.',
    ],
    industrie: 'In welcher Branche sind Sie tätig?',
    industrii: [
      { valoare: 'Construcții', eticheta: 'Bau' },
      { valoare: 'Auto', eticheta: 'Kfz' },
      { valoare: 'Pensiuni', eticheta: 'Pensionen' },
      { valoare: 'Restaurant', eticheta: 'Restaurant' },
      { valoare: 'Imobiliare', eticheta: 'Immobilien' },
      { valoare: 'Transport', eticheta: 'Transport' },
      { valoare: 'Fitness', eticheta: 'Fitness' },
      { valoare: 'Alt domeniu', eticheta: 'Andere Branche' },
    ],
    altDomeniu: 'Ihre Branche',
    exAltDomeniu: 'Geben Sie Ihre Branche ein...',
    stiaiCa: [
      'Heute recherchieren 81 % der Verbraucher online, bevor sie ein Unternehmen kontaktieren. Ohne professionelle Website verlieren Sie jeden Tag Kunden an die Konkurrenz.',
      'Eine gut gebaute Website ist langfristig das rentabelste Marketinginstrument. Anders als bezahlte Werbung bringt Ihnen eine optimierte Website auch ohne Werbebudget Kunden.',
    ],
    structura: {
      titlu: 'Wie soll Ihre Website aussehen?',
      subtitlu: 'Wählen Sie die passende Struktur.',
    },
    pagini: 'Wie viele Seiten ungefähr?',
    nrPagini: [
      { valoare: '1-5', eticheta: '1–5', desc: 'Einfache Website' },
      { valoare: '6-10', eticheta: '6–10', desc: 'Mittlere Website' },
      { valoare: '11-20', eticheta: '11–20', desc: 'Umfangreiche Website' },
      { valoare: 'Personalizat', eticheta: 'Individuell', desc: 'Sprechen wir darüber' },
    ],
    obiectiv: 'Was ist das Hauptziel?',
    obiective: [
      { valoare: 'Prezentare servicii', eticheta: 'Leistungen präsentieren', desc: 'Portfolio, Leistungen' },
      { valoare: 'Generare de lead-uri', eticheta: 'Anfragen gewinnen', desc: 'Kontaktformular, Telefon' },
      { valoare: 'Rezervari online', eticheta: 'Online-Buchungen', desc: 'Termine, Reservierungen' },
      { valoare: 'Nu stiu inca', eticheta: 'Weiß ich noch nicht', desc: 'Beraten Sie mich' },
    ],
    ex: { nume: 'Max Mustermann', email: 'max@firma.de', telefon: '+49 1xx xxxxxxx' },
    succes: 'Ein Inovex-Berater meldet sich innerhalb von 24 Stunden bei Ihnen, um die Details Ihres Projekts zu besprechen.',
  },

  aplicatie: {
    meta: {
      titlu: 'Konfigurieren Sie Ihre Web-App',
      descriere:
        'Erzählen Sie uns von der App oder SaaS-Plattform, die Sie bauen möchten. Sie erhalten innerhalb von 24 Stunden ein individuelles Angebot.',
    },
    anunt: 'Web-Apps und SaaS-Plattformen für Unternehmen auf der ganzen Welt',
    pasi: ['Ihre Idee', 'Art der App', 'Kontakt'],
    idee: {
      titlu: 'Konfigurieren wir Ihre Web-App',
      subtitlu: 'Erzählen Sie uns kurz, was Sie bauen möchten',
      intrebare: 'Haben Sie bereits eine klare Vorstellung von Ihrer App?',
    },
    claritate: [
      { valoare: 'da-stiu-exact', eticheta: 'Ja, ich weiß genau, was ich will', desc: 'Ich habe eine klare Vision und möchte sie umsetzen' },
      { valoare: 'am-o-idee', eticheta: 'Ich habe eine Idee, aber sie ist noch nicht ausgereift', desc: 'Die Richtung steht, aber ich habe noch Fragen' },
      { valoare: 'am-nevoie-de-ajutor', eticheta: 'Nein, ich brauche Hilfe', desc: 'Ich möchte darüber sprechen und die passende Lösung finden' },
    ],
    tip: {
      titlu: 'Die Art Ihrer App',
      subtitlu: 'Wählen Sie die Option, die am besten passt',
      intrebare: 'Wie würden Sie Ihre App kurz beschreiben?',
    },
    tipuri: [
      { valoare: 'platforma-utilizatori', eticheta: 'Plattform mit Nutzerkonten', desc: 'Konten, Dashboard, verschiedene Funktionen' },
      { valoare: 'marketplace', eticheta: 'Marktplatz', desc: 'Wie eBay oder Etsy: Plattformen, auf denen Nutzer untereinander verkaufen' },
      { valoare: 'aplicatie-servicii', eticheta: 'Service-App', desc: 'Termine, Reservierungen, Online-Buchung' },
      { valoare: 'sistem-intern', eticheta: 'Internes System für Ihr Unternehmen', desc: 'Kunden, Aufträge und interne Abläufe verwalten' },
      { valoare: 'alt-tip', eticheta: 'Andere Art', desc: 'Eine andere Art von Web-App' },
    ],
    descriere: 'Beschreiben Sie Ihre Idee kurz',
    exDescriere:
      'Z. B. Ich möchte eine Plattform, auf der Anbieter Leistungen einstellen und Kunden sie online buchen können, mit integrierter Zahlung...',
    // sectiunea de atasamente de la pasul 2 (lib/configurator-atasamente.ts)
    atasamente: {
      eticheta: 'Anhänge',
      descriere: 'Sie haben einen Plan, eine Skizze oder eine Struktur Ihrer App? Hängen Sie sie an, so verstehen wir Ihre Idee schneller.',
      alege: 'Dateien auswählen',
      trage: ' oder hierher ziehen',
      limite: 'PDF, Bilder, Word, Excel, PowerPoint, TXT oder ZIP · bis zu {n} Dateien, je max. {mb} MB',
      elimina: '{nume} entfernen',
      tip: 'Die Datei „{nume}“ hat kein unterstütztes Format.',
      mare: 'Die Datei „{nume}“ ist größer als {mb} MB.',
      maxim: 'Sie können bis zu {n} Dateien anhängen.',
      seIncarca: 'Dateien werden hochgeladen...',
      eroare: 'Die Dateien konnten nicht hochgeladen werden. Bitte versuchen Sie es erneut oder entfernen Sie sie und senden Sie die Anfrage ohne Anhänge.',
      preaMulte: 'Zu viele Uploads in kurzer Zeit. Bitte versuchen Sie es in einer Stunde erneut.',
    },
    stiaiCa: [
      'Die meisten erfolgreichen Apps beginnen mit einer einfachen, aber gut umgesetzten Idee.',
      'SaaS-Apps können monatlich wiederkehrende Umsätze erzielen, nicht nur Einmalverkäufe.',
    ],
    contact: {
      titlu: 'Fast geschafft!',
      subtitlu: 'Ein Inovex-Berater meldet sich innerhalb von 24 Stunden bei Ihnen, um die Details Ihrer App zu besprechen.',
    },
    ex: { nume: 'Ihr vollständiger Name', email: 'name@email.de', telefon: '+49 1xx xxxxxxx' },
    acordExtra: ' und der Verarbeitung meiner Daten zur Beantwortung dieser Anfrage',
    succes: 'Ein Inovex-Berater meldet sich innerhalb von 24 Stunden bei Ihnen, um die Details Ihrer App zu besprechen.',
  },

  automatizari: {
    meta: {
      titlu: 'Konfigurieren Sie Ihre Automatisierungen',
      descriere:
        'Sagen Sie uns, welche Prozesse Sie in Ihrem Unternehmen automatisieren möchten. Sie erhalten innerhalb von 24 Stunden ein individuelles Angebot für die KI-Umsetzung.',
    },
    anunt: 'KI-Automatisierungen können Ihrem Team täglich Stunden sparen',
    pasi: ['Art des Unternehmens', 'Was automatisieren', 'Kontakt'],
    afacere: {
      titlu: 'Konfigurieren wir Ihre Automatisierungen',
      subtitlu: 'Ein paar kurze Fragen, um Ihr Unternehmen zu verstehen',
      intrebare: 'Art des Unternehmens',
    },
    tipuri: [
      { valoare: 'magazin-online', eticheta: 'Online-Shop', desc: 'E-Commerce, Produkte online verkaufen' },
      { valoare: 'prestari-servicii', eticheta: 'Dienstleister', desc: 'Beratung, professionelle Dienstleistungen' },
      { valoare: 'afacere-locala', eticheta: 'Lokales Unternehmen', desc: 'Praxis, Salon, Restaurant usw.' },
      { valoare: 'alt-tip', eticheta: 'Andere Art', desc: 'Eine andere Unternehmenskategorie' },
    ],
    procese: {
      titlu: 'Was möchten Sie automatisieren?',
      subtitlu: 'Mehrfachauswahl möglich',
      intrebare: 'Welche Prozesse möchten Sie automatisieren?',
    },
    listaProcese: [
      { valoare: 'comunicare-clienti', eticheta: 'Kundenkommunikation', desc: 'Automatische Nachrichten und E-Mails' },
      { valoare: 'confirmare-comenzi', eticheta: 'Bestellbestätigungen', desc: 'Automatische Benachrichtigung und Bestätigung' },
      { valoare: 'gestionare-date', eticheta: 'Dateneingabe / Datenpflege', desc: 'Automatische Aktualisierung von Datenbanken' },
      { valoare: 'taskuri-interne', eticheta: 'Wiederkehrende interne Aufgaben', desc: 'Wiederkehrende Abläufe im Team' },
      { valoare: 'facturi-documente', eticheta: 'Rechnungen / Dokumente', desc: 'Automatisch erstellen und versenden' },
      { valoare: 'altceva', eticheta: 'Etwas anderes', desc: 'Beschreiben Sie unten, was Sie brauchen' },
    ],
    altceva: 'Beschreiben Sie kurz, was Sie automatisieren möchten',
    exAltceva: 'Z. B. Ich möchte den wöchentlichen Versand von Berichten per E-Mail an mein Team automatisieren...',
    erori: {
      procese: 'Bitte wählen Sie mindestens einen Prozess',
      altceva: 'Bitte beschreiben Sie, welchen Prozess Sie automatisieren möchten',
    },
    stiaiCa: [
      'Die meisten Unternehmen verlieren täglich Stunden mit wiederkehrenden Aufgaben.',
      'Automatisierte Prozesse können die Betriebskosten deutlich senken.',
    ],
    contact: {
      titlu: 'Fast geschafft!',
      subtitlu: 'Ein Inovex-Spezialist für Automatisierung antwortet Ihnen innerhalb von 24 Stunden.',
    },
    ex: { nume: 'Ihr vollständiger Name', email: 'name@email.de', telefon: '+49 1xx xxxxxxx' },
    acordExtra: ' und der Verarbeitung meiner Daten zur Beantwortung dieser Anfrage',
    succes: 'Ein Inovex-Spezialist für Automatisierung meldet sich innerhalb von 24 Stunden bei Ihnen.',
  },
};

/* ── Franceza (cu vous; spatiu fin U+202F inainte de ? ! : ; % si €, U+00A0 intre numar si unitate) ── */

const fr: TextConfiguratoare = {
  comun: {
    ariaPasi: 'Étapes du configurateur',
    stiaiCa: 'Le saviez-vous ?',
    optional: '(facultatif)',
    acord: ['J’accepte la ', 'Politique de confidentialité', ''],
    eroare: 'Une erreur est survenue. Réessayez ou appelez-nous au {telefon}.',
    inapoi: 'Retour',
    continua: 'Continuer',
    trimite: 'Envoyer la demande',
    seTrimite: 'Envoi en cours...',
    succesTitlu: 'Votre demande a bien été envoyée',
    succesVerifica: 'Surveillez votre téléphone et votre boîte mail dans les prochaines heures.',
    acasa: 'Retour à l’accueil',
    erori: {
      nume: 'Le nom doit contenir au moins 2 caractères',
      email: 'Adresse e-mail invalide',
      telefon: 'Le numéro doit contenir au moins 10 chiffres',
      acord: 'Vous devez accepter la politique de confidentialité',
    },
    entitate: {
      titlu: 'Êtes-vous un particulier ou un professionnel ?',
      subtitlu: 'Choisissez qui signera le contrat.',
      optiuni: [
        { valoare: 'Persoana fizica', eticheta: 'Particulier', desc: 'Sans entreprise immatriculée' },
        { valoare: 'Persoana juridica', eticheta: 'Professionnel', desc: 'SARL, SAS, EURL, micro-entreprise' },
      ],
    },
    contact: {
      titlu: 'Dernière étape : vos coordonnées',
      subtitlu: 'Nous vous contactons sous 24 heures avec une proposition.',
      nume: 'Nom complet',
      email: 'E-mail',
      telefon: 'Téléphone',
      observatii: 'Autres remarques',
      exObservatii: 'Toute autre précision sur le projet...',
    },
  },

  magazin: {
    meta: {
      titlu: 'Configurateur de boutique en ligne',
      descriere: 'Décrivez la boutique en ligne dont vous avez besoin. Réponse sous 24 heures.',
    },
    anunt: 'Des boutiques en ligne pour des entreprises du monde entier',
    pasi: ['Entreprise & secteur', 'Produits', 'Budget', 'Contact'],
    avertisment: [
      'Désolés, nous travaillons uniquement avec des professionnels.',
      'Pour créer une boutique en ligne, il vous faut une entreprise immatriculée (SARL, SAS, EURL, micro-entreprise). Si c’est votre cas, choisissez ',
      '.',
    ],
    produse: 'Que vendez-vous ?',
    exProduse: 'Ex. : vêtements et accessoires pour femmes, sacs en cuir, bijoux faits main...',
    stiaiCa: [
      'Une boutique en ligne vend 24 h/24 et 7 j/7 sans salariés à payer. 70 % des commandes en ligne sont passées en dehors des heures d’ouverture.',
      'Les boutiques au catalogue bien organisé et aux images de qualité ont un taux de conversion jusqu’à 40 % supérieur à celles aux images médiocres ou aux catégories désordonnées.',
    ],
    stoc: {
      titlu: 'Avez-vous déjà vos produits ?',
      subtitlu: 'Cela nous aide à vous recommander la bonne solution.',
    },
    areProduse: [
      { valoare: 'da', eticheta: 'Oui, j’ai mes produits', desc: 'Je sais ce que je veux vendre' },
      { valoare: 'nu', eticheta: 'Pas encore', desc: 'Je suis encore en phase de préparation' },
    ],
    cateProduse: 'Combien de produits voulez-vous vendre ?',
    nrProduse: [
      { valoare: '1-50', eticheta: '1–50' },
      { valoare: '50-200', eticheta: '50–200' },
      { valoare: '200-1000', eticheta: '200–1 000' },
      { valoare: 'Peste 1000', eticheta: 'Plus de 1 000' },
    ],
    buget: {
      titlu: 'Quel est le budget estimé du projet ?',
      subtitlu: 'Cela nous aide à vous recommander d’emblée la bonne solution.',
    },
    bugete: [
      { valoare: 'Sub 5.000 lei', eticheta: `Moins de ${nr(PRAG_MIC, 'fr-FR')} €` },
      { valoare: 'Între 5.000 și 10.000 lei', eticheta: `Entre ${nr(PRAG_MIC, 'fr-FR')} € et ${nr(PRAG_MARE, 'fr-FR')} €` },
      { valoare: 'Peste 10.000 lei', eticheta: `Plus de ${nr(PRAG_MARE, 'fr-FR')} €` },
      { valoare: 'Nu știu încă', eticheta: 'Je ne sais pas encore' },
    ],
    ex: { nume: 'Jean Dupont', email: 'jean@entreprise.fr', telefon: '+33 6 xx xx xx xx' },
    succes: 'Un consultant Inovex vous contactera sous 24 heures pour discuter des détails de votre projet.',
  },

  website: {
    meta: {
      titlu: 'Configurateur de site vitrine',
      descriere: 'Décrivez le site vitrine dont vous avez besoin. Réponse sous 24 heures.',
    },
    anunt: 'Des sites professionnels pour des entreprises du monde entier',
    pasi: ['Entreprise & secteur', 'Structure', 'Contact'],
    avertisment: [
      'Désolés, nous travaillons uniquement avec des professionnels.',
      'Pour créer un site vitrine, il vous faut une entreprise immatriculée (SARL, SAS, EURL, micro-entreprise). Si c’est votre cas, sélectionnez ',
      '.',
    ],
    industrie: 'Dans quel secteur travaillez-vous ?',
    industrii: [
      { valoare: 'Construcții', eticheta: 'BTP' },
      { valoare: 'Auto', eticheta: 'Automobile' },
      { valoare: 'Pensiuni', eticheta: 'Chambres d’hôtes' },
      { valoare: 'Restaurant', eticheta: 'Restauration' },
      { valoare: 'Imobiliare', eticheta: 'Immobilier' },
      { valoare: 'Transport', eticheta: 'Transport' },
      { valoare: 'Fitness', eticheta: 'Fitness' },
      { valoare: 'Alt domeniu', eticheta: 'Autre secteur' },
    ],
    altDomeniu: 'Votre secteur d’activité',
    exAltDomeniu: 'Indiquez votre secteur d’activité...',
    stiaiCa: [
      'Aujourd’hui, 81 % des consommateurs font des recherches en ligne avant de contacter une entreprise. Sans site professionnel, vous perdez chaque jour des clients au profit de vos concurrents.',
      'Un site bien conçu est l’outil marketing le plus rentable sur le long terme. Contrairement à la publicité payante, un site optimisé vous amène des clients même sans budget publicitaire.',
    ],
    structura: {
      titlu: 'À quoi doit ressembler votre site ?',
      subtitlu: 'Choisissez la structure qui vous convient.',
    },
    pagini: 'Combien de pages environ ?',
    nrPagini: [
      { valoare: '1-5', eticheta: '1–5', desc: 'Site simple' },
      { valoare: '6-10', eticheta: '6–10', desc: 'Site moyen' },
      { valoare: '11-20', eticheta: '11–20', desc: 'Site complexe' },
      { valoare: 'Personalizat', eticheta: 'Sur mesure', desc: 'Parlons-en' },
    ],
    obiectiv: 'Quel est l’objectif principal ?',
    obiective: [
      { valoare: 'Prezentare servicii', eticheta: 'Présenter vos services', desc: 'Portfolio, services' },
      { valoare: 'Generare de lead-uri', eticheta: 'Générer des contacts', desc: 'Formulaire de contact, téléphone' },
      { valoare: 'Rezervari online', eticheta: 'Réservations en ligne', desc: 'Rendez-vous, réservations' },
      { valoare: 'Nu stiu inca', eticheta: 'Je ne sais pas encore', desc: 'Conseillez-moi' },
    ],
    ex: { nume: 'Jean Dupont', email: 'jean@entreprise.fr', telefon: '+33 6 xx xx xx xx' },
    succes: 'Un consultant Inovex vous contactera sous 24 heures pour discuter des détails de votre projet.',
  },

  aplicatie: {
    meta: {
      titlu: 'Configurez votre application web',
      descriere:
        'Parlez-nous de l’application ou de la plateforme SaaS que vous voulez créer. Recevez une proposition sur mesure sous 24 heures.',
    },
    anunt: 'Des applications web et plateformes SaaS pour des entreprises du monde entier',
    pasi: ['Votre idée', 'Type d’application', 'Contact'],
    idee: {
      titlu: 'Configurons votre application web',
      subtitlu: 'Donnez-nous quelques détails sur ce que vous voulez créer',
      intrebare: 'Avez-vous déjà une idée claire de votre application ?',
    },
    claritate: [
      { valoare: 'da-stiu-exact', eticheta: 'Oui, je sais exactement ce que je veux', desc: 'J’ai une vision claire et je veux la concrétiser' },
      { valoare: 'am-o-idee', eticheta: 'J’ai une idée, mais elle n’est pas encore bien définie', desc: 'Je connais la direction, mais j’ai encore des questions' },
      { valoare: 'am-nevoie-de-ajutor', eticheta: 'Non, j’ai besoin d’aide', desc: 'Je veux en discuter et trouver la bonne solution' },
    ],
    tip: {
      titlu: 'Le type de votre application',
      subtitlu: 'Sélectionnez l’option qui correspond le mieux',
      intrebare: 'Comment décririez-vous votre application en quelques mots ?',
    },
    tipuri: [
      { valoare: 'platforma-utilizatori', eticheta: 'Plateforme avec comptes utilisateurs', desc: 'Comptes, tableau de bord, fonctionnalités variées' },
      { valoare: 'marketplace', eticheta: 'Marketplace', desc: 'Comme Leboncoin ou Vinted : vente entre utilisateurs' },
      { valoare: 'aplicatie-servicii', eticheta: 'Application de services', desc: 'Rendez-vous, réservations en ligne' },
      { valoare: 'sistem-intern', eticheta: 'Système interne pour l’entreprise', desc: 'Gestion des clients, des commandes, des processus internes' },
      { valoare: 'alt-tip', eticheta: 'Autre type', desc: 'Un autre type d’application web' },
    ],
    descriere: 'Décrivez votre idée en quelques mots',
    exDescriere:
      'Ex. : je veux une plateforme où des prestataires publient leurs services et où les clients les réservent en ligne, avec paiement intégré...',
    // sectiunea de atasamente de la pasul 2 (lib/configurator-atasamente.ts)
    atasamente: {
      eticheta: 'Pièces jointes',
      descriere: 'Vous avez un plan, une maquette ou une structure de votre application ? Joignez-les, cela nous aide à comprendre votre idée plus vite.',
      alege: 'Choisissez des fichiers',
      trage: ' ou glissez-les ici',
      limite: 'PDF, images, Word, Excel, PowerPoint, TXT ou ZIP · jusqu’à {n} fichiers, {mb} Mo maximum chacun',
      elimina: 'Supprimer {nume}',
      tip: 'Le fichier « {nume} » n’est pas dans un format accepté.',
      mare: 'Le fichier « {nume} » dépasse {mb} Mo.',
      maxim: 'Vous pouvez joindre jusqu’à {n} fichiers.',
      seIncarca: 'Envoi des fichiers...',
      eroare: 'Les fichiers n’ont pas pu être envoyés. Réessayez, ou supprimez-les et envoyez votre demande sans eux.',
      preaMulte: 'Trop d’envois en peu de temps. Réessayez dans une heure.',
    },
    stiaiCa: [
      'La plupart des applications à succès partent d’une idée simple, mais bien exécutée.',
      'Les applications SaaS peuvent générer un revenu mensuel récurrent, pas seulement des ventes ponctuelles.',
    ],
    contact: {
      titlu: 'Presque terminé !',
      subtitlu: 'Un consultant Inovex vous contactera sous 24 heures pour discuter des détails de votre application.',
    },
    ex: { nume: 'Votre nom complet', email: 'adresse@email.fr', telefon: '+33 6 xx xx xx xx' },
    acordExtra: ' et le traitement de mes données pour répondre à cette demande.',
    succes: 'Un consultant Inovex vous contactera sous 24 heures pour discuter des détails de votre application.',
  },

  automatizari: {
    meta: {
      titlu: 'Configurez vos automatisations',
      descriere:
        'Dites-nous quels processus vous voulez automatiser dans votre entreprise. Recevez une proposition d’implémentation IA sur mesure sous 24 heures.',
    },
    anunt: 'Les automatisations IA peuvent faire gagner des heures chaque jour à votre équipe',
    pasi: ['Type d’activité', 'Quoi automatiser', 'Contact'],
    afacere: {
      titlu: 'Configurons vos automatisations',
      subtitlu: 'Quelques questions rapides pour comprendre votre activité',
      intrebare: 'Type d’activité',
    },
    tipuri: [
      { valoare: 'magazin-online', eticheta: 'Boutique en ligne', desc: 'E-commerce, vente de produits en ligne' },
      { valoare: 'prestari-servicii', eticheta: 'Prestation de services', desc: 'Conseil, services professionnels' },
      { valoare: 'afacere-locala', eticheta: 'Commerce local', desc: 'Cabinet, salon, restaurant, etc.' },
      { valoare: 'alt-tip', eticheta: 'Autre type', desc: 'Une autre catégorie d’activité' },
    ],
    procese: {
      titlu: 'Que voulez-vous automatiser ?',
      subtitlu: 'Vous pouvez sélectionner plusieurs options',
      intrebare: 'Quels processus souhaitez-vous automatiser ?',
    },
    listaProcese: [
      { valoare: 'comunicare-clienti', eticheta: 'Communication avec les clients', desc: 'Messages et e-mails automatiques' },
      { valoare: 'confirmare-comenzi', eticheta: 'Confirmation des commandes', desc: 'Notifications et confirmation automatiques' },
      { valoare: 'gestionare-date', eticheta: 'Saisie / gestion des données', desc: 'Mise à jour automatique des bases de données' },
      { valoare: 'taskuri-interne', eticheta: 'Tâches internes répétitives', desc: 'Processus récurrents de l’équipe' },
      { valoare: 'facturi-documente', eticheta: 'Factures / documents', desc: 'Création et envoi automatiques' },
      { valoare: 'altceva', eticheta: 'Autre chose', desc: 'Décrivez votre besoin ci-dessous' },
    ],
    altceva: 'Décrivez en quelques mots ce que vous voulez automatiser',
    exAltceva: 'Ex. : je veux automatiser l’envoi des rapports hebdomadaires par e-mail à mon équipe...',
    erori: {
      procese: 'Veuillez choisir au moins un processus',
      altceva: 'Veuillez décrire le processus que vous voulez automatiser',
    },
    stiaiCa: [
      'La plupart des entreprises perdent des heures chaque jour sur des tâches répétitives.',
      'Automatiser les processus peut réduire nettement les coûts opérationnels.',
    ],
    contact: {
      titlu: 'Presque terminé !',
      subtitlu: 'Un spécialiste Inovex de l’automatisation vous répondra sous 24 heures.',
    },
    ex: { nume: 'Votre nom complet', email: 'adresse@email.fr', telefon: '+33 6 xx xx xx xx' },
    acordExtra: ' et le traitement de mes données pour répondre à cette demande.',
    succes: 'Un spécialiste Inovex de l’automatisation vous contactera sous 24 heures.',
  },
};

const TEXTE: Record<Limba, TextConfiguratoare> = { ro, en, de, fr };

export const textConfiguratoare = (lang: Limba): TextConfiguratoare => TEXTE[lang];
