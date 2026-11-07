import type { Limba } from '../config';

/* Pagina /portofoliu in cele 4 limbi (2026-11-07). Romana e textul de pana acum. Proiectele sunt altele:
   in romana cele 22 din lib/portfolio-data.ts, in engleza, germana si franceza portofoliul international din
   lib/portofoliu-international.ts (acelasi pentru toate trei, cerut de proprietar). Aici sunt si etichetele
   fisei de proiect (FisaProiect) si numele limbilor de langa steaguri (Steaguri, din Sigle.tsx). */

type Nota = [inainte: string, link: string, dupa: string];

const ro = {
  meta: {
    titlu: 'Portofoliu - 200+ Proiecte Web Livrate',
    descriere:
      'Descoperă proiectele realizate de echipa Inovex: magazine online, website-uri de prezentare, platforme SaaS și aplicații web pentru clienți din toată România. 200+ proiecte livrate cu succes.',
    ogTitlu: 'Portofoliu - 200+ Proiecte Web Livrate',
    ogDescriere: '200+ proiecte livrate: magazine online, website-uri, platforme SaaS pentru clienti din toata Romania.',
    twitterTitlu: 'Portofoliu Inovex - 200+ Proiecte',
    twitterDescriere: '200+ proiecte web livrate in Romania.',
    cuvinte: ['portofoliu web', 'proiecte magazine online', 'website realizat Romania', 'exemple website'],
  },
  firimituri: ['Acasa', 'Portofoliu'],
  listaJsonLd: 'Portofoliu Inovex',
  acasa: 'Acasă',
  navigare: 'Navigare secundară',
  cale: 'Portofoliu',
  titlu: 'Peste 200 de proiecte realizate cu succes',
  lead: 'Am ajutat companii din România și din afara țării să își dezvolte prezența online și să transforme vizitatorii în clienți, prin platforme gândite strategic pentru creștere.',
  nota: ['Mai jos sunt câteva proiecte reprezentative din domenii diferite. Pentru exemple din industria ta, ', 'scrie-ne', '.'] as Nota,
  // fisa fiecarui proiect
  fisa: {
    include: 'Include',
    integrari: 'Integrări',
    tehnologie: 'Tehnologie',
    limbi: 'Limbi',
    lansat: 'Lansat',
    realizat: '{an}, realizat în {durata}',
    filaNoua: ' (se deschide într-o filă nouă)',
  },
  // limbile de langa steaguri
  limbi: {
    ro: 'Română',
    en: 'Engleză',
    de: 'Germană',
    fr: 'Franceză',
    it: 'Italiană',
    es: 'Spaniolă',
    tr: 'Turcă',
    pt: 'Portugheză',
    nl: 'Olandeză',
    pl: 'Poloneză',
    zh: 'Chineză',
    ja: 'Japoneză',
    ko: 'Coreeană',
  } as Record<string, string>,
  incaLimbi: 'Încă {n} limbi',
  limbiAscuns: ' limbi',
};

export type TextPortofoliu = typeof ro;

const en: TextPortofoliu = {
  meta: {
    titlu: 'Portfolio – web projects for businesses worldwide',
    descriere:
      'Explore projects built by the Inovex team: online stores, business websites, SaaS platforms and web apps for clients around the world.',
    ogTitlu: 'Portfolio – web projects for businesses worldwide',
    ogDescriere: 'Online stores, websites and SaaS platforms built for clients around the world.',
    twitterTitlu: 'Inovex portfolio',
    twitterDescriere: 'Web projects built for clients around the world.',
    cuvinte: ['web development portfolio', 'ecommerce projects', 'SaaS development', 'website examples'],
  },
  firimituri: ['Home', 'Portfolio'],
  listaJsonLd: 'Inovex portfolio',
  acasa: 'Home',
  navigare: 'Breadcrumb',
  cale: 'Portfolio',
  titlu: 'Work we’re proud of',
  lead: 'We’ve helped companies in Romania and around the world grow their online presence and turn visitors into customers, with platforms designed strategically for growth.',
  nota: ['Below are some representative projects from different industries. For examples from your industry, ', 'get in touch', '.'],
  fisa: {
    include: 'Includes',
    integrari: 'Integrations',
    tehnologie: 'Technology',
    limbi: 'Languages',
    lansat: 'Launched',
    realizat: '{an}, built in {durata}',
    filaNoua: ' (opens in a new tab)',
  },
  limbi: {
    ro: 'Romanian',
    en: 'English',
    de: 'German',
    fr: 'French',
    it: 'Italian',
    es: 'Spanish',
    tr: 'Turkish',
    pt: 'Portuguese',
    nl: 'Dutch',
    pl: 'Polish',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
  },
  incaLimbi: '{n} more languages',
  limbiAscuns: ' languages',
};

const de: TextPortofoliu = {
  meta: {
    titlu: 'Referenzen – Webprojekte für Unternehmen weltweit',
    descriere:
      'Entdecken Sie Projekte des Inovex-Teams: Online-Shops, Unternehmenswebsites, SaaS-Plattformen und Web-Apps für Kunden auf der ganzen Welt.',
    ogTitlu: 'Referenzen – Webprojekte für Unternehmen weltweit',
    ogDescriere: 'Online-Shops, Websites und SaaS-Plattformen für Kunden auf der ganzen Welt.',
    twitterTitlu: 'Inovex-Referenzen',
    twitterDescriere: 'Webprojekte für Kunden auf der ganzen Welt.',
    cuvinte: ['Webentwicklung Referenzen', 'Online-Shop Projekte', 'SaaS-Entwicklung', 'Website Beispiele'],
  },
  firimituri: ['Startseite', 'Referenzen'],
  listaJsonLd: 'Inovex-Referenzen',
  acasa: 'Startseite',
  navigare: 'Brotkrumen-Navigation',
  cale: 'Referenzen',
  titlu: 'Projekte, auf die wir stolz sind',
  lead: 'Wir haben Unternehmen in Rumänien und auf der ganzen Welt geholfen, ihre Online-Präsenz auszubauen und Besucher zu Kunden zu machen – mit Plattformen, die strategisch auf Wachstum ausgelegt sind.',
  nota: ['Unten finden Sie eine Auswahl repräsentativer Projekte aus verschiedenen Branchen. Für Beispiele aus Ihrer Branche ', 'schreiben Sie uns', '.'],
  fisa: {
    include: 'Umfang',
    integrari: 'Integrationen',
    tehnologie: 'Technologie',
    limbi: 'Sprachen',
    lansat: 'Gestartet',
    realizat: '{an}, umgesetzt in {durata}',
    filaNoua: ' (öffnet in einem neuen Tab)',
  },
  limbi: {
    ro: 'Rumänisch',
    en: 'Englisch',
    de: 'Deutsch',
    fr: 'Französisch',
    it: 'Italienisch',
    es: 'Spanisch',
    tr: 'Türkisch',
    pt: 'Portugiesisch',
    nl: 'Niederländisch',
    pl: 'Polnisch',
    zh: 'Chinesisch',
    ja: 'Japanisch',
    ko: 'Koreanisch',
  },
  incaLimbi: 'Noch {n} Sprachen',
  limbiAscuns: ' Sprachen',
};

const fr: TextPortofoliu = {
  meta: {
    titlu: 'Réalisations – projets web pour des entreprises du monde entier',
    descriere:
      'Découvrez les projets réalisés par l’équipe Inovex : boutiques en ligne, sites vitrines, plateformes SaaS et applications web pour des clients du monde entier.',
    ogTitlu: 'Réalisations – projets web pour des entreprises du monde entier',
    ogDescriere: 'Boutiques en ligne, sites web et plateformes SaaS pour des clients du monde entier.',
    twitterTitlu: 'Réalisations Inovex',
    twitterDescriere: 'Des projets web pour des clients du monde entier.',
    cuvinte: ['portfolio développement web', 'projets e-commerce', 'développement SaaS', 'exemples de sites'],
  },
  firimituri: ['Accueil', 'Réalisations'],
  listaJsonLd: 'Réalisations Inovex',
  acasa: 'Accueil',
  navigare: 'Fil d’Ariane',
  cale: 'Réalisations',
  titlu: 'Des projets dont nous sommes fiers',
  lead: 'Nous avons aidé des entreprises en Roumanie et dans le monde entier à développer leur présence en ligne et à transformer leurs visiteurs en clients, grâce à des plateformes pensées pour la croissance.',
  nota: ['Voici quelques projets représentatifs de différents secteurs. Pour des exemples dans votre secteur, ', 'écrivez-nous', '.'],
  fisa: {
    include: 'Comprend',
    integrari: 'Intégrations',
    tehnologie: 'Technologie',
    limbi: 'Langues',
    lansat: 'Lancé',
    realizat: '{an}, réalisé en {durata}',
    filaNoua: ' (s’ouvre dans un nouvel onglet)',
  },
  limbi: {
    ro: 'Roumain',
    en: 'Anglais',
    de: 'Allemand',
    fr: 'Français',
    it: 'Italien',
    es: 'Espagnol',
    tr: 'Turc',
    pt: 'Portugais',
    nl: 'Néerlandais',
    pl: 'Polonais',
    zh: 'Chinois',
    ja: 'Japonais',
    ko: 'Coréen',
  },
  incaLimbi: '{n} autres langues',
  limbiAscuns: ' langues',
};

const TEXTE: Record<Limba, TextPortofoliu> = { ro, en, de, fr };

export const textPortofoliu = (lang: Limba): TextPortofoliu => TEXTE[lang];
