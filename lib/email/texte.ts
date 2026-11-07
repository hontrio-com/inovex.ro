/* Textele emailurilor catre client in cele 4 limbi (2026-11-06): cadrul comun (antet, subsol, „suna-ne
   direct”) si confirmarile pentru formularul de contact si cererea de oferta. Romana e textul de pana acum
   (fara diacritice, ca in restul emailurilor). Emailurile interne raman in romana, cu limba clientului in
   subiect ([EN], [DE], [FR]). */

import { existaIn } from '@/lib/i18n/config';

export type LimbaEmail = 'ro' | 'en' | 'de' | 'fr';

export const limbaEmail = (v: unknown): LimbaEmail => (v === 'en' || v === 'de' || v === 'fr' ? v : 'ro');

/** Eticheta limbii pentru emailurile interne si CRM: '' in romana, altfel „[EN] ”. */
export const etichetaLimba = (lang: LimbaEmail) => (lang === 'ro' ? '' : `[${lang.toUpperCase()}] `);

/** Limba la coada sursei (CRM, subsolul emailului intern): '' in romana, altfel „ (EN)”. */
export const sufixLimba = (lang: LimbaEmail | undefined) => (!lang || lang === 'ro' ? '' : ` (${lang.toUpperCase()})`);

export const CADRU: Record<LimbaEmail, { subtitlu: string; telefon: string; site: string; oras: string }> = {
  ro: { subtitlu: 'Agentie Web Design Romania', telefon: '0750 456 096', site: 'https://inovex.ro', oras: 'Targu Jiu, Gorj &nbsp;·&nbsp; Bucuresti' },
  en: { subtitlu: 'Web development agency · Romania', telefon: '+40 750 456 096', site: 'https://inovex.ro/en', oras: 'Târgu Jiu &nbsp;·&nbsp; Bucharest, Romania' },
  de: { subtitlu: 'Webagentur · Rumänien', telefon: '+40 750 456 096', site: 'https://inovex.ro/de', oras: 'Târgu Jiu &nbsp;·&nbsp; Bukarest, Rumänien' },
  fr: { subtitlu: 'Agence web · Roumanie', telefon: '+40 750 456 096', site: 'https://inovex.ro/fr', oras: 'Târgu Jiu &nbsp;·&nbsp; Bucarest, Roumanie' },
};

export const SUNA_DIRECT: Record<LimbaEmail, { titlu: string; telefon: string; program: string }> = {
  ro: { titlu: 'Nu vrei sa astepti? Suna-ne direct:', telefon: '0750 456 096', program: 'Luni-Vineri, 09:00-18:00' },
  en: { titlu: 'Don’t want to wait? Call us directly:', telefon: '+40 750 456 096', program: 'Monday–Friday, 09:00–18:00 (Romanian time)' },
  de: { titlu: 'Sie möchten nicht warten? Rufen Sie uns direkt an:', telefon: '+40 750 456 096', program: 'Montag–Freitag, 09:00–18:00 Uhr (rumänische Zeit)' },
  fr: { titlu: 'Vous ne voulez pas attendre\u202f? Appelez-nous directement\u202f:', telefon: '+40 750 456 096', program: 'Du lundi au vendredi, 9h–18h (heure de Roumanie)' },
};

type TextContact = {
  subiect: string;
  titlu: string;
  multumim: (nume: string) => string;
  aiScris: string;
  avertisment: string;
  previzualizare: string;
  eticheta: string;
};

export const CONTACT: Record<LimbaEmail, TextContact> = {
  ro: {
    subiect: 'Mesajul tau a ajuns la noi | Inovex',
    titlu: 'Am primit mesajul tau!',
    multumim: (nume) => `Multumim ca ne-ai contactat, <strong>${nume}</strong>. Unul dintre membrii echipei noastre iti va raspunde in maximum <strong>24 de ore</strong>.`,
    aiScris: 'Ai scris:',
    avertisment: 'Daca nu ai trimis tu acest mesaj, ignora acest email.',
    previzualizare: 'Multumim! Iti raspundem in maximum 24 de ore.',
    eticheta: 'Confirmare',
  },
  en: {
    subiect: 'We received your message | Inovex',
    titlu: 'We got your message!',
    multumim: (nume) => `Thank you for contacting us, <strong>${nume}</strong>. A member of our team will get back to you within <strong>24 hours</strong>.`,
    aiScris: 'You wrote:',
    avertisment: 'If you didn’t send this message, please ignore this email.',
    previzualizare: 'Thank you! We’ll reply within 24 hours.',
    eticheta: 'Confirmation',
  },
  de: {
    subiect: 'Wir haben Ihre Nachricht erhalten | Inovex',
    titlu: 'Ihre Nachricht ist angekommen!',
    multumim: (nume) => `Vielen Dank für Ihre Nachricht, <strong>${nume}</strong>. Ein Mitglied unseres Teams meldet sich innerhalb von <strong>24 Stunden</strong> bei Ihnen.`,
    aiScris: 'Ihre Nachricht:',
    avertisment: 'Falls Sie diese Nachricht nicht gesendet haben, ignorieren Sie bitte diese E-Mail.',
    previzualizare: 'Vielen Dank! Wir antworten innerhalb von 24 Stunden.',
    eticheta: 'Bestätigung',
  },
  fr: {
    subiect: 'Nous avons bien reçu votre message | Inovex',
    titlu: 'Nous avons bien reçu votre message\u202f!',
    multumim: (nume) => `Merci de nous avoir contactés, <strong>${nume}</strong>. Un membre de notre équipe vous répondra sous <strong>24\u00a0heures</strong>.`,
    aiScris: 'Votre message\u202f:',
    avertisment: 'Si vous n’avez pas envoyé ce message, ignorez simplement cet e-mail.',
    previzualizare: 'Merci\u202f! Nous vous répondons sous 24\u00a0heures.',
    eticheta: 'Confirmation',
  },
};

type TextOferta = {
  subiect: string;
  salut: (nume: string) => string;
  primit: (serviciu: string) => string;
  rezumat: string;
  serviciu: string;
  website: string;
  descriere: string;
  urmeaza: string;
  pasi: { title: string; desc: string }[];
  portofoliu: [url: string, text: string];
  avertisment: string;
  previzualizare: string;
  eticheta: string;
};

export const OFERTA: Record<LimbaEmail, TextOferta> = {
  ro: {
    subiect: 'Cererea ta de oferta a fost primita | Inovex',
    salut: (nume) => `Buna, ${nume}!`,
    primit: (s) => `Am primit cererea ta de oferta pentru <strong>${s}</strong> si ne-am apucat deja sa o analizam. Un specialist din echipa Inovex te va contacta in maximum <strong>24 de ore</strong> cu o propunere tehnica personalizata.`,
    rezumat: 'Rezumatul cererii tale',
    serviciu: 'Serviciu solicitat',
    website: 'Website existent',
    descriere: 'Descrierea ta:',
    urmeaza: 'Ce urmeaza?',
    pasi: [
      { title: 'Analiza cerere', desc: 'Echipa noastra analizeaza detaliile proiectului tau si pregateste intrebarile relevante.' },
      { title: 'Te contactam', desc: 'Un specialist te suna sau iti trimite email in maximum 24 de ore.' },
      { title: 'Propunere detaliata', desc: 'Primesti o propunere tehnica completa cu tot ce include proiectul si termenul de livrare.' },
    ],
    portofoliu: ['https://inovex.ro/portofoliu', 'Exploreaza portofoliul nostru'],
    avertisment: 'Daca nu ai completat tu aceasta cerere sau e o greseala, ignora acest email. Nu ai niciun angajament.',
    previzualizare: 'Cererea ta a fost primita. Te contactam in 24 de ore.',
    eticheta: 'Confirmare',
  },
  en: {
    subiect: 'We received your quote request | Inovex',
    salut: (nume) => `Hi ${nume}!`,
    primit: (s) => `We received your quote request for <strong>${s}</strong> and have already started reviewing it. A specialist from the Inovex team will contact you within <strong>24 hours</strong> with a tailored technical proposal.`,
    rezumat: 'Summary of your request',
    serviciu: 'Service requested',
    website: 'Existing website',
    descriere: 'Your description:',
    urmeaza: 'What happens next?',
    pasi: [
      { title: 'Request review', desc: 'Our team reviews your project details and prepares the relevant questions.' },
      { title: 'We contact you', desc: 'A specialist calls or emails you within 24 hours.' },
      { title: 'Detailed proposal', desc: 'You receive a complete technical proposal with everything the project includes and the delivery timeline.' },
    ],
    portofoliu: ['https://inovex.ro/en/portfolio', 'Explore our portfolio'],
    avertisment: 'If you didn’t fill in this request or it was a mistake, please ignore this email. There’s no commitment.',
    previzualizare: 'Your request has been received. We’ll contact you within 24 hours.',
    eticheta: 'Confirmation',
  },
  de: {
    subiect: 'Ihre Angebotsanfrage ist eingegangen | Inovex',
    salut: (nume) => `Hallo ${nume}!`,
    primit: (s) => `Wir haben Ihre Angebotsanfrage für <strong>${s}</strong> erhalten und prüfen sie bereits. Ein Spezialist aus dem Inovex-Team meldet sich innerhalb von <strong>24 Stunden</strong> mit einem individuellen technischen Angebot bei Ihnen.`,
    rezumat: 'Ihre Anfrage im Überblick',
    serviciu: 'Gewünschte Leistung',
    website: 'Bestehende Website',
    descriere: 'Ihre Beschreibung:',
    urmeaza: 'Wie geht es weiter?',
    pasi: [
      { title: 'Prüfung der Anfrage', desc: 'Unser Team prüft Ihre Projektdetails und bereitet die wichtigsten Fragen vor.' },
      { title: 'Wir melden uns', desc: 'Ein Spezialist ruft Sie an oder schreibt Ihnen innerhalb von 24 Stunden.' },
      { title: 'Detailliertes Angebot', desc: 'Sie erhalten ein vollständiges technisches Angebot mit allen Leistungen und dem Liefertermin.' },
    ],
    portofoliu: ['https://inovex.ro/de/referenzen', 'Unsere Referenzen ansehen'],
    avertisment: 'Falls Sie diese Anfrage nicht gestellt haben oder es sich um einen Irrtum handelt, ignorieren Sie bitte diese E-Mail. Es entsteht keinerlei Verpflichtung.',
    previzualizare: 'Ihre Anfrage ist eingegangen. Wir melden uns innerhalb von 24 Stunden.',
    eticheta: 'Bestätigung',
  },
  fr: {
    subiect: 'Votre demande de devis a bien été reçue | Inovex',
    salut: (nume) => `Bonjour ${nume}\u202f!`,
    primit: (s) => `Nous avons bien reçu votre demande de devis pour <strong>${s}</strong> et avons déjà commencé à l’analyser. Un spécialiste de l’équipe Inovex vous contactera sous <strong>24\u00a0heures</strong> avec une proposition technique sur mesure.`,
    rezumat: 'Récapitulatif de votre demande',
    serviciu: 'Service souhaité',
    website: 'Site existant',
    descriere: 'Votre description\u202f:',
    urmeaza: 'Et ensuite\u202f?',
    pasi: [
      { title: 'Analyse de la demande', desc: 'Notre équipe étudie les détails de votre projet et prépare les questions utiles.' },
      { title: 'Nous vous contactons', desc: 'Un spécialiste vous appelle ou vous écrit sous 24\u00a0heures.' },
      { title: 'Proposition détaillée', desc: 'Vous recevez une proposition technique complète avec tout ce que comprend le projet et le délai de livraison.' },
    ],
    portofoliu: ['https://inovex.ro/fr/realisations', 'Découvrir nos réalisations'],
    avertisment: 'Si vous n’avez pas fait cette demande ou s’il s’agit d’une erreur, ignorez cet e-mail. Vous n’avez aucun engagement.',
    previzualizare: 'Votre demande a bien été reçue. Nous vous contactons sous 24\u00a0heures.',
    eticheta: 'Confirmation',
  },
};

type TextMotion = {
  subiect: string;
  titlu: string;
  multumim: (nume: string) => string;
  pachet: string;
  total: string;
  text: string;
  previzualizare: string;
  eticheta: string;
};

/** Confirmarea comenzii Video Motion Design, dupa plata (webhook-ul Stripe), in limba clientului. */
export const MOTION: Record<LimbaEmail, TextMotion> = {
  ro: {
    subiect: 'Am primit comanda ta de Motion Design | Inovex',
    titlu: 'Plata a fost confirmata!',
    multumim: (nume) => `Multumim, <strong>${nume}</strong>. Am primit comanda ta si ne apucam de treaba.`,
    pachet: 'Pachet',
    total: 'Total platit',
    text: 'Avem deja brief-ul si materialele trimise la comanda, asa ca incepem cu scenariul. Daca avem nevoie de lamuriri, te contactam in maximum <strong>24 de ore</strong>.',
    previzualizare: 'Plata confirmata. Ne apucam de videoclipul tau.',
    eticheta: 'Confirmare comanda',
  },
  en: {
    subiect: 'We received your Motion Design order | Inovex',
    titlu: 'Payment confirmed!',
    multumim: (nume) => `Thank you, <strong>${nume}</strong>. We’ve received your order and we’re getting started.`,
    pachet: 'Package',
    total: 'Total paid',
    text: 'We already have the brief and materials you sent with your order, so we’re starting with the script. If we need any clarification, we’ll contact you within <strong>24 hours</strong>.',
    previzualizare: 'Payment confirmed. We’re starting on your video.',
    eticheta: 'Order confirmation',
  },
  de: {
    subiect: 'Ihre Motion-Design-Bestellung ist eingegangen | Inovex',
    titlu: 'Zahlung bestätigt!',
    multumim: (nume) => `Vielen Dank, <strong>${nume}</strong>. Wir haben Ihre Bestellung erhalten und legen los.`,
    pachet: 'Paket',
    total: 'Bezahlter Betrag',
    text: 'Das Briefing und die Materialien aus Ihrer Bestellung liegen uns bereits vor, daher beginnen wir mit dem Drehbuch. Wenn wir Rückfragen haben, melden wir uns innerhalb von <strong>24 Stunden</strong>.',
    previzualizare: 'Zahlung bestätigt. Wir beginnen mit Ihrem Video.',
    eticheta: 'Bestellbestätigung',
  },
  fr: {
    subiect: 'Nous avons bien reçu votre commande Motion Design | Inovex',
    titlu: 'Paiement confirmé\u202f!',
    multumim: (nume) => `Merci, <strong>${nume}</strong>. Nous avons bien reçu votre commande et nous nous mettons au travail.`,
    pachet: 'Formule',
    total: 'Total payé',
    text: 'Nous avons déjà le brief et les fichiers envoyés avec votre commande, nous commençons donc par le scénario. Si nous avons besoin de précisions, nous vous contactons sous <strong>24\u00a0heures</strong>.',
    previzualizare: 'Paiement confirmé. Nous commençons votre vidéo.',
    eticheta: 'Confirmation de commande',
  },
};

/**
 * Butonul de sub confirmari: portofoliul, in limba clientului. Daca pagina de portofoliu n-ar exista intr-o
 * limba, butonul duce la proiectele de pe prima pagina (/en#portofoliu), ca linkul din email sa nu dea 404.
 */
export function butonPortofoliu(lang: LimbaEmail): [url: string, text: string] {
  const [url, text] = OFERTA[lang].portofoliu;
  return existaIn(lang, '/portofoliu') ? [url, text] : [`${CADRU[lang].site}#portofoliu`, text];
}

type Pas = { title: string; desc: string };

type TextConfigurator = {
  subiect: string;
  magazin: {
    primit: string;
    previzualizare: string;
    randuri: { entitate: string; produse: string; areProduse: string; nrProduse: string; buget: string };
  };
  website: {
    primit: string;
    previzualizare: string;
    randuri: { entitate: string; industrie: string; nrPagini: string; obiectiv: string };
  };
  aplicatie: {
    primit: string;
    pasi: Pas[];
    previzualizare: string;
    randuri: { claritate: string; tip: string; descriere: string; atasamente: string };
  };
  automatizari: {
    primit: string;
    pasi: Pas[];
    previzualizare: string;
    randuri: { tip: string; procese: string; descriere: string };
  };
};

/**
 * Confirmarile celor 4 configuratoare (2026-11-07). Salutul, „Rezumatul cererii tale”, „Ce urmeaza?”,
 * avertismentul, eticheta din antet si pasii (la magazin si website) sunt cei din OFERTA: acelasi text era
 * si pana acum, in romana. Valorile din rezumat vin, in EN/DE/FR, din etichetele paginii
 * (lib/i18n/pagini/configuratoare.ts).
 */
export const CONFIGURATOR: Record<LimbaEmail, TextConfigurator> = {
  ro: {
    subiect: 'Am primit cererea ta - te contactam in 24 de ore | Inovex',
    magazin: {
      primit: 'Am primit cererea ta pentru un <strong>magazin online</strong> si ne-am apucat deja sa o analizam. Un specialist din echipa Inovex te va contacta in maximum <strong>24 de ore</strong> pentru a discuta proiectul tau in detaliu.',
      previzualizare: 'Multumim! Echipa Inovex analizeaza proiectul tau acum.',
      randuri: { entitate: 'Tip entitate', produse: 'Produse vandute', areProduse: 'Are produse', nrProduse: 'Numar produse', buget: 'Buget estimat' },
    },
    website: {
      primit: 'Am primit cererea ta pentru un <strong>website de prezentare</strong> si ne-am apucat deja sa o analizam. Un specialist din echipa Inovex te va contacta in maximum <strong>24 de ore</strong> pentru a discuta proiectul tau in detaliu.',
      previzualizare: 'Multumim! Echipa Inovex analizeaza proiectul tau acum.',
      randuri: { entitate: 'Tip entitate', industrie: 'Industrie', nrPagini: 'Numar pagini', obiectiv: 'Obiectiv principal' },
    },
    aplicatie: {
      primit: 'Am primit cererea ta pentru o <strong>aplicatie web / platforma SaaS</strong> si ne-am apucat deja sa o analizam. Un consultant din echipa Inovex te va contacta in maximum <strong>24 de ore</strong> pentru a discuta detaliile aplicatiei tale.',
      pasi: [
        { title: 'Analiza cerere', desc: 'Echipa noastra analizeaza detaliile aplicatiei tale si pregateste intrebarile relevante.' },
        { title: 'Te contactam', desc: 'Un consultant te suna sau iti trimite email in maximum 24 de ore.' },
        { title: 'Propunere detaliata', desc: 'Primesti o propunere tehnica completa cu arhitectura, functionalitati si termen de livrare.' },
      ],
      previzualizare: 'Multumim! Echipa Inovex analizeaza proiectul tau acum.',
      randuri: { claritate: 'Claritate idee', tip: 'Tip aplicatie', descriere: 'Descriere', atasamente: 'Atasamente' },
    },
    automatizari: {
      primit: 'Am primit cererea ta pentru <strong>automatizari AI</strong> si ne-am apucat deja sa o analizam. Un specialist Inovex in automatizari te va contacta in maximum <strong>24 de ore</strong> pentru a discuta detaliile implementarii.',
      pasi: [
        { title: 'Analiza cerere', desc: 'Echipa noastra analizeaza procesele tale si identifica cele mai bune solutii de automatizare.' },
        { title: 'Te contactam', desc: 'Un specialist te suna sau iti trimite email in maximum 24 de ore.' },
        { title: 'Propunere detaliata', desc: 'Primesti o propunere completa cu solutiile recomandate si estimarea timpului de implementare.' },
      ],
      previzualizare: 'Multumim! Echipa Inovex analizeaza procesele tale acum.',
      randuri: { tip: 'Tip afacere', procese: 'Procese de automatizat', descriere: 'Descriere' },
    },
  },
  en: {
    subiect: 'We received your request – we’ll contact you within 24 hours | Inovex',
    magazin: {
      primit: 'We received your request for an <strong>online store</strong> and have already started reviewing it. A specialist from the Inovex team will contact you within <strong>24 hours</strong> to discuss your project in detail.',
      previzualizare: 'Thank you! The Inovex team is reviewing your project now.',
      randuri: { entitate: 'Customer type', produse: 'Products you sell', areProduse: 'Product stock', nrProduse: 'Number of products', buget: 'Estimated budget' },
    },
    website: {
      primit: 'We received your request for a <strong>business website</strong> and have already started reviewing it. A specialist from the Inovex team will contact you within <strong>24 hours</strong> to discuss your project in detail.',
      previzualizare: 'Thank you! The Inovex team is reviewing your project now.',
      randuri: { entitate: 'Customer type', industrie: 'Industry', nrPagini: 'Number of pages', obiectiv: 'Main goal' },
    },
    aplicatie: {
      primit: 'We received your request for a <strong>web app / SaaS platform</strong> and have already started reviewing it. A consultant from the Inovex team will contact you within <strong>24 hours</strong> to discuss the details of your app.',
      pasi: [
        { title: 'Request review', desc: 'Our team reviews the details of your app and prepares the relevant questions.' },
        { title: 'We contact you', desc: 'A consultant calls or emails you within 24 hours.' },
        { title: 'Detailed proposal', desc: 'You receive a complete technical proposal covering the architecture, features and delivery timeline.' },
      ],
      previzualizare: 'Thank you! The Inovex team is reviewing your project now.',
      randuri: { claritate: 'Your idea', tip: 'App type', descriere: 'Description', atasamente: 'Attachments' },
    },
    automatizari: {
      primit: 'We received your request for <strong>AI automation</strong> and have already started reviewing it. An Inovex automation specialist will contact you within <strong>24 hours</strong> to discuss the implementation details.',
      pasi: [
        { title: 'Request review', desc: 'Our team reviews your processes and identifies the best automation solutions.' },
        { title: 'We contact you', desc: 'A specialist calls or emails you within 24 hours.' },
        { title: 'Detailed proposal', desc: 'You receive a complete proposal with the recommended solutions and an estimated implementation time.' },
      ],
      previzualizare: 'Thank you! The Inovex team is reviewing your processes now.',
      randuri: { tip: 'Business type', procese: 'Processes to automate', descriere: 'Description' },
    },
  },
  de: {
    subiect: 'Ihre Anfrage ist eingegangen – wir melden uns innerhalb von 24 Stunden | Inovex',
    magazin: {
      primit: 'Wir haben Ihre Anfrage für einen <strong>Online-Shop</strong> erhalten und prüfen sie bereits. Ein Spezialist aus dem Inovex-Team meldet sich innerhalb von <strong>24 Stunden</strong> bei Ihnen, um Ihr Projekt im Detail zu besprechen.',
      previzualizare: 'Vielen Dank! Das Inovex-Team prüft Ihr Projekt bereits.',
      randuri: { entitate: 'Kundentyp', produse: 'Ihre Produkte', areProduse: 'Warenbestand', nrProduse: 'Anzahl der Produkte', buget: 'Geschätztes Budget' },
    },
    website: {
      primit: 'Wir haben Ihre Anfrage für eine <strong>Unternehmenswebsite</strong> erhalten und prüfen sie bereits. Ein Spezialist aus dem Inovex-Team meldet sich innerhalb von <strong>24 Stunden</strong> bei Ihnen, um Ihr Projekt im Detail zu besprechen.',
      previzualizare: 'Vielen Dank! Das Inovex-Team prüft Ihr Projekt bereits.',
      randuri: { entitate: 'Kundentyp', industrie: 'Branche', nrPagini: 'Anzahl der Seiten', obiectiv: 'Hauptziel' },
    },
    aplicatie: {
      primit: 'Wir haben Ihre Anfrage für eine <strong>Web-App / SaaS-Plattform</strong> erhalten und prüfen sie bereits. Ein Berater aus dem Inovex-Team meldet sich innerhalb von <strong>24 Stunden</strong> bei Ihnen, um die Details Ihrer App zu besprechen.',
      pasi: [
        { title: 'Prüfung der Anfrage', desc: 'Unser Team prüft die Details Ihrer App und bereitet die wichtigsten Fragen vor.' },
        { title: 'Wir melden uns', desc: 'Ein Berater ruft Sie an oder schreibt Ihnen innerhalb von 24 Stunden.' },
        { title: 'Detailliertes Angebot', desc: 'Sie erhalten ein vollständiges technisches Angebot mit Architektur, Funktionen und Liefertermin.' },
      ],
      previzualizare: 'Vielen Dank! Das Inovex-Team prüft Ihr Projekt bereits.',
      randuri: { claritate: 'Ihre Idee', tip: 'Art der App', descriere: 'Beschreibung', atasamente: 'Anhänge' },
    },
    automatizari: {
      primit: 'Wir haben Ihre Anfrage zur <strong>KI-Automatisierung</strong> erhalten und prüfen sie bereits. Ein Automatisierungsspezialist von Inovex meldet sich innerhalb von <strong>24 Stunden</strong> bei Ihnen, um die Details der Umsetzung zu besprechen.',
      pasi: [
        { title: 'Prüfung der Anfrage', desc: 'Unser Team analysiert Ihre Prozesse und ermittelt die besten Automatisierungslösungen.' },
        { title: 'Wir melden uns', desc: 'Ein Spezialist ruft Sie an oder schreibt Ihnen innerhalb von 24 Stunden.' },
        { title: 'Detailliertes Angebot', desc: 'Sie erhalten ein vollständiges Angebot mit den empfohlenen Lösungen und einer Schätzung der Umsetzungsdauer.' },
      ],
      previzualizare: 'Vielen Dank! Das Inovex-Team prüft Ihre Prozesse bereits.',
      randuri: { tip: 'Art des Unternehmens', procese: 'Zu automatisierende Prozesse', descriere: 'Beschreibung' },
    },
  },
  fr: {
    subiect: 'Nous avons bien reçu votre demande – nous vous contactons sous 24 heures | Inovex',
    magazin: {
      primit: 'Nous avons bien reçu votre demande pour une <strong>boutique en ligne</strong> et avons déjà commencé à l’analyser. Un spécialiste de l’équipe Inovex vous contactera sous <strong>24 heures</strong> pour discuter de votre projet en détail.',
      previzualizare: 'Merci ! L’équipe Inovex étudie votre projet dès maintenant.',
      randuri: { entitate: 'Type de client', produse: 'Produits vendus', areProduse: 'Stock de produits', nrProduse: 'Nombre de produits', buget: 'Budget estimé' },
    },
    website: {
      primit: 'Nous avons bien reçu votre demande pour un <strong>site vitrine</strong> et avons déjà commencé à l’analyser. Un spécialiste de l’équipe Inovex vous contactera sous <strong>24 heures</strong> pour discuter de votre projet en détail.',
      previzualizare: 'Merci ! L’équipe Inovex étudie votre projet dès maintenant.',
      randuri: { entitate: 'Type de client', industrie: 'Secteur', nrPagini: 'Nombre de pages', obiectiv: 'Objectif principal' },
    },
    aplicatie: {
      primit: 'Nous avons bien reçu votre demande pour une <strong>application web / plateforme SaaS</strong> et avons déjà commencé à l’analyser. Un consultant de l’équipe Inovex vous contactera sous <strong>24 heures</strong> pour discuter des détails de votre application.',
      pasi: [
        { title: 'Analyse de la demande', desc: 'Notre équipe étudie les détails de votre application et prépare les questions utiles.' },
        { title: 'Nous vous contactons', desc: 'Un consultant vous appelle ou vous écrit sous 24 heures.' },
        { title: 'Proposition détaillée', desc: 'Vous recevez une proposition technique complète avec l’architecture, les fonctionnalités et le délai de livraison.' },
      ],
      previzualizare: 'Merci ! L’équipe Inovex étudie votre projet dès maintenant.',
      randuri: { claritate: 'Votre idée', tip: 'Type d’application', descriere: 'Description', atasamente: 'Pièces jointes' },
    },
    automatizari: {
      primit: 'Nous avons bien reçu votre demande d’<strong>automatisation IA</strong> et avons déjà commencé à l’analyser. Un spécialiste Inovex de l’automatisation vous contactera sous <strong>24 heures</strong> pour discuter des détails de la mise en œuvre.',
      pasi: [
        { title: 'Analyse de la demande', desc: 'Notre équipe étudie vos processus et identifie les meilleures solutions d’automatisation.' },
        { title: 'Nous vous contactons', desc: 'Un spécialiste vous appelle ou vous écrit sous 24 heures.' },
        { title: 'Proposition détaillée', desc: 'Vous recevez une proposition complète avec les solutions recommandées et une estimation du délai de mise en œuvre.' },
      ],
      previzualizare: 'Merci ! L’équipe Inovex étudie vos processus dès maintenant.',
      randuri: { tip: 'Type d’activité', procese: 'Processus à automatiser', descriere: 'Description' },
    },
  },
};
