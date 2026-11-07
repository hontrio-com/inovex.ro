import type { Limba } from '../config';

/* Textele primei pagini in cele 4 limbi (2026-11-05). Romana e textul de pe site de pana acum; forma ei
   e tipul pentru celelalte. Recenziile sunt cele de pe Google, traduse; intrebarile frecvente in romana
   vin din admin (tabelul faq), iar aici stau traducerile lor. In franceza, inaintea semnelor ! ? : sta
   spatiul ingust care nu se rupe ( ), ca in tipografia franceza. */

const ro = {
  hero: {
    inceput: 'Construim',
    // semnul de dupa pastila (in germana, virgula ceruta inaintea propozitiei relative)
    dupaCuvant: '',
    cuvinte: ['magazine online', 'aplicații web', 'automatizări', 'website-uri de prezentare'],
    continuare: 'care îți aduc clienți, nu doar trafic',
    titluComplet:
      'Construim magazine online, aplicații web, automatizări și website-uri de prezentare care îți aduc clienți, nu doar trafic',
    lead: 'De la magazine online și website-uri de prezentare până la aplicații web și platforme SaaS, dezvoltăm soluții rapide, optimizate SEO și construite pentru conversii.',
    clienti: 'Câțiva dintre clienții noștri',
    stele: 'Evaluare de 5 stele pe Google',
    recomandat: ['Recomandați de ', 'peste 200 de afaceri', ' din România'] as [string, string, string],
  },

  tehnologii: { titlu: 'Lucrăm cu tehnologii de top', aria: 'Tehnologii cu care lucrăm' },

  servicii: {
    titlu: 'Soluții construite pentru rezultate',
    lead: 'Nu doar pentru aspect. Fiecare proiect are un obiectiv clar: mai mulți clienți, conversii mai mari sau operațiuni mai eficiente.',
    ofertaPentru: 'Solicită ofertă pentru {serviciu}',
    calendar: { inainte: 'Calendar de programări + ', si: ' și ' },
    lista: {
      'magazine-online': {
        titlu: 'Magazin online la cheie, cu toate integrările',
        descriere:
          'Realizăm magazinul tău online complet, de la design și structură până la integrările de plată, curierat, facturare și automatizările necesare pentru a începe să vinzi online.',
        scurt: 'magazine online',
        puncte: [
          'Plată cu cardul, ramburs sau în rate',
          'Facturi automate în SmartBill, Oblio sau FGO',
          'Livrare cu Cargus, FAN Courier, Sameday sau DPD',
        ],
      },
      'website-de-prezentare': {
        titlu: 'Website de prezentare care aduce clienți',
        descriere:
          'Am construit site-uri pentru stomatologi, avocați, firme de construcții, restaurante și zeci de alte domenii. Știm ce funcționează în fiecare industrie.',
        scurt: 'website-uri de prezentare',
        puncte: ['Design creat de la zero pentru domeniul tău', '', 'SEO tehnic complet, configurat de la lansare'],
      },
      'aplicatii-web-saas': {
        titlu: 'Aplicații web și SaaS, de la idee la lansare',
        descriere:
          'Ai o idee pentru o platformă online sau un instrument care rezolvă o problemă reală? Tu ne spui ce trebuie să facă, noi construim tot ce e în spate.',
        scurt: 'aplicații web și SaaS',
        puncte: ['Dashboard-uri cu date în timp real', 'Abonamente și plăți recurente', 'Portaluri pentru clienți și parteneri'],
      },
      'cms-crm-erp': {
        titlu: 'CRM și ERP creat pentru afacerea ta',
        descriere:
          'Vedem cum funcționează afacerea ta și unde se pierd timp și bani, apoi construim sistemul care rezolvă exact acele probleme. Livrat complet, cu echipa instruită.',
        scurt: 'CMS, CRM și ERP',
        puncte: [
          'Toată echipa lucrează din același loc',
          'Stoc, comenzi și facturi în timp real',
          'Rapoarte generate automat, în câteva secunde',
        ],
      },
      'aplicatii-mobile': {
        titlu: 'Aplicații mobile pentru iOS și Android',
        descriere:
          'Aplicații rapide și ușor de folosit, construite cu React Native sau Flutter, cu o experiență fluidă pe orice telefon.',
        scurt: 'aplicații mobile',
        puncte: [] as string[],
      },
      'automatizari-ai': {
        titlu: 'Automatizări cu AI',
        descriere:
          'Chatboți, procesarea emailurilor, calificarea lead-urilor și rapoarte generate automat, ca echipa ta să se ocupe de ce contează.',
        scurt: 'automatizări cu AI',
        puncte: [] as string[],
      },
    },
  },

  portofoliu: {
    titlu: 'Proiecte care vorbesc de la sine',
    lead: 'Peste 200 de proiecte livrate. Aici e o parte din ele, fiecare cu obiectivul lui, fiecare livrat la termen.',
    filaNoua: ' (se deschide într-o filă nouă)',
    descrieri: {
      hobbyroom: 'Magazin online de seturi de construcție',
      esafe: 'Magazin online de echipamente de protecție',
      'atp-autoteile': 'Magazin online de piese auto',
      edinio: 'Platformă SaaS pentru magazine online',
      bridge: 'Platformă SaaS pentru întâlniri video cu AI',
      inpardoseala: 'Website pentru pardoseli din beton',
    } as Record<string, string>,
  },

  // doar in limbile straine (in romana sectiunea are harta judetelor, cu textele ei)
  glob: {
    titlu: 'Lucrăm cu afaceri din toată lumea',
    descriere: 'Nu contează unde ești. Toată colaborarea se face online, de la prima discuție până la lansare.',
    cifre: [
      { n: 200, dupa: '+', text: 'proiecte livrate' },
      { n: 100, dupa: '%', text: 'colaborare online' },
      { n: 5, dupa: '★', text: 'rating pe Google' },
    ],
    aria: 'Ilustrație: glob cu legături între orașe din toată lumea',
  },

  recenzii: {
    titlu: 'Ce spun clienții noștri',
    verificate: 'Recenzii verificate pe Google',
    tradus: '',
    stele: 'Evaluare de 5 stele pe Google',
    cinciStele: '5 stele',
    verificata: 'Recenzie verificată',
    texte: [
      'Colaborarea a fost peste așteptări. Răbdare, soluții rapide și un rezultat final foarte bine pus la punct. Se vede experiența și pasiunea pentru ceea ce face. Recomand!',
      'Recomand cu toată încrederea! Site-ul de prezentare a fost realizat exact așa cum mi-am dorit: modern, clar, bine structurat și ușor de folosit. Comunicarea a fost foarte bună, a fost receptiv la toate cerințele mele și a respectat termenele stabilite. Se vede că este implicat și atent la detalii. Mulțumesc pentru profesionalism!',
      'Mi-au făcut un website de nota 10 pentru firma mea de evenimente. Recomand cu cea mai mare încredere dacă doriți ceva profesional și modern.',
      'Servicii calitative, atenție la detalii, idei productive privind organizarea și gestiunea activității în online.',
      'Sunt foarte mulțumită de rezultatele colaborării mele cu ei. Recomand cu încredere!',
      'Per total am fost foarte mulțumit de serviciile oferite, singura problemă minoră a fost faptul că au întârziat 5 zile. În rest, totul perfect! Recomand!',
    ],
  },

  intrebari: {
    titlu: 'Întrebări frecvente',
    // cratimele care nu se rup (U+2011): „sună-ne” nu se mai desparte la capat de rand
    descriere:
      'Răspunsuri clare, fără surprize, la tot ce vrei să știi înainte să începem. Nu găsești răspunsul aici? Scrie‑ne sau sună‑ne.',
    // in romana raman intrebarile din admin; acestea sunt rezerva, daca adminul e gol
    lista: [
      { q: 'Cât durează realizarea unui magazin online?', a: 'Un magazin online se realizează în 14 până la 35 de zile lucrătoare, în funcție de complexitatea proiectului și de numărul de produse adăugate.' },
      { q: 'Oferiți garanție pentru proiectele dezvoltate?', a: 'Da. Toate proiectele vin cu 1 an garanție. Orice problemă apărută din vina noastră este remediată gratuit în această perioadă.' },
      { q: 'Pot să îmi administrez singur site-ul după lansare?', a: 'Da. Integrăm un panou de administrare intuitiv și la finalizarea proiectului îți facem un tutorial video complet în care îți arătăm absolut tot. Nu ai nevoie de cunoștințe tehnice pentru a adăuga produse, articole sau a modifica conținut.' },
      { q: 'Lucrați cu clienți din toată România sau doar local?', a: 'Colaborăm cu firme din toată țara. Nu contează unde ești, ne descurcăm perfect și la distanță.' },
      { q: 'Ce se întâmplă dacă nu sunt mulțumit de design?', a: 'Procesul nostru include revizii nelimitate în faza de design, înainte de a trece la dezvoltare. Nu trecem la cod până când nu ești 100% mulțumit de aspectul vizual.' },
      { q: 'Oferiți servicii de mentenanță?', a: 'Da. Avem pachete de mentenanță lunară care includ actualizări de securitate, backup zilnic, monitorizare uptime, modificări de conținut și suport tehnic prioritar. Hosting-ul nu este inclus, însă te putem îndruma către soluțiile potrivite.' },
      { q: 'Puteți prelua un proiect existent neterminat sau vechi?', a: 'Da, analizăm orice proiect existent și oferim o evaluare onestă. Uneori este mai eficient să reconstruim, alteori optimizăm ce există. Recomandăm întotdeauna soluția în interesul clientului.' },
    ],
  },

  final: {
    eticheta: 'Estimare gratuită, fără angajamente',
    titlu: 'Ești gata să îți duci afacerea la nivelul următor?',
    lead: 'Spune-ne ce vrei să construiești și îți pregătim o ofertă pe măsura proiectului tău.',
    suna: 'Sună acum',
    scrie: 'Preferi să scrii?',
    mesaj: 'Trimite-ne un mesaj',
  },
};

export type TextAcasa = typeof ro;

const en: TextAcasa = {
  hero: {
    inceput: 'We build',
    dupaCuvant: '',
    cuvinte: ['online stores', 'web apps', 'automations', 'business websites'],
    continuare: 'that bring you customers, not just traffic',
    titluComplet: 'We build online stores, web apps, automations and business websites that bring you customers, not just traffic',
    lead: 'From online stores and business websites to web apps and SaaS platforms, we build fast, SEO-optimised solutions designed to convert.',
    clienti: 'Some of our clients',
    stele: '5-star rating on Google',
    recomandat: ['Recommended by ', 'businesses around the world', ''],
  },

  tehnologii: { titlu: 'We work with top technologies', aria: 'Technologies we work with' },

  servicii: {
    titlu: 'Solutions built for results',
    lead: 'Not just for looks. Every project has a clear goal: more customers, higher conversions or more efficient operations.',
    ofertaPentru: 'Get a quote for {serviciu}',
    calendar: { inainte: 'Booking calendar + ', si: ' and ' },
    lista: {
      'magazine-online': {
        titlu: 'Turnkey online store, with every integration',
        descriere:
          'We build your complete online store, from design and structure to payment, shipping and invoicing integrations, plus the automations you need to start selling online.',
        scurt: 'online stores',
        puncte: [
          'Card, PayPal, Apple Pay or Google Pay payments',
          'Automatic invoices and accounting integrations',
          'Shipping with DHL, UPS or DPD',
        ],
      },
      'website-de-prezentare': {
        titlu: 'A business website that brings in customers',
        descriere:
          'We have built websites for dentists, lawyers, construction companies, restaurants and dozens of other industries. We know what works in each one.',
        scurt: 'business websites',
        puncte: ['Design created from scratch for your industry', '', 'Complete technical SEO, set up from launch'],
      },
      'aplicatii-web-saas': {
        titlu: 'Web apps and SaaS, from idea to launch',
        descriere:
          'Have an idea for an online platform or a tool that solves a real problem? You tell us what it needs to do, we build everything behind it.',
        scurt: 'web apps and SaaS',
        puncte: ['Real-time data dashboards', 'Subscriptions and recurring payments', 'Portals for clients and partners'],
      },
      'cms-crm-erp': {
        titlu: 'CRM and ERP built for your business',
        descriere:
          'We look at how your business works and where time and money are lost, then build the system that solves exactly those problems. Delivered complete, with your team trained.',
        scurt: 'CMS, CRM and ERP',
        puncte: ['Your whole team works from one place', 'Stock, orders and invoices in real time', 'Reports generated automatically, in seconds'],
      },
      'aplicatii-mobile': {
        titlu: 'Mobile apps for iOS and Android',
        descriere: 'Fast, easy-to-use apps built with React Native or Flutter, with a smooth experience on any phone.',
        scurt: 'mobile apps',
        puncte: [],
      },
      'automatizari-ai': {
        titlu: 'AI automation',
        descriere: 'Chatbots, email processing, lead qualification and automatic reports, so your team can focus on what matters.',
        scurt: 'AI automation',
        puncte: [],
      },
    },
  },

  portofoliu: {
    titlu: 'Projects that speak for themselves',
    lead: 'A selection of our work: each project with its own goal, each delivered on time.',
    filaNoua: ' (opens in a new tab)',
    // in EN/DE/FR descrierile scurte ale proiectelor sunt in lib/portofoliu-international.ts
    descrieri: {},
  },

  glob: {
    titlu: 'We work with businesses from all over the world',
    descriere: "It doesn't matter where you are. All collaboration happens online, from the first call to launch.",
    cifre: [
      { n: 24, dupa: 'h', text: 'response time' },
      { n: 100, dupa: '%', text: 'online collaboration' },
      { n: 5, dupa: '★', text: 'rating on Google' },
    ],
    aria: 'Illustration: a globe with connections between cities around the world',
  },

  recenzii: {
    titlu: 'What our clients say',
    verificate: 'Verified reviews on Google',
    tradus: 'Translated from Romanian',
    stele: '5-star rating on Google',
    cinciStele: '5 stars',
    verificata: 'Verified review',
    texte: [
      'The collaboration exceeded our expectations. Patience, quick solutions and a very polished final result. You can see the experience and the passion for what they do. Highly recommended!',
      'I recommend them with complete confidence! The business website was made exactly the way I wanted: modern, clear, well structured and easy to use. Communication was very good, they responded to all my requests and met the agreed deadlines. You can tell they are committed and attentive to detail. Thank you for your professionalism!',
      'They built a top-notch website for my events company. I recommend them with the greatest confidence if you want something professional and modern.',
      'Quality services, attention to detail and productive ideas on organising and managing the business online.',
      'I am very happy with the results of working with them. Highly recommended!',
      'Overall I was very happy with the services provided; the only minor issue was that they were 5 days late. Otherwise, everything was perfect! Recommended!',
    ],
  },

  intrebari: {
    titlu: 'Frequently asked questions',
    descriere: "Clear answers, no surprises, to everything you want to know before we start. Can't find your answer here? Write to us or give us a call.",
    lista: [
      { q: 'How long does it take to build an online store?', a: 'A standard online store with up to 500 products is delivered in 4–6 weeks from design approval. For more complex projects, the timeline is set out in the technical proposal.' },
      { q: 'Do you offer a warranty for the projects you build?', a: 'Yes. Every project comes with a 30-day post-launch warranty included: any bug caused by us is fixed free of charge. It can be extended with our monthly maintenance plans.' },
      { q: 'Can I manage the website myself after launch?', a: "Absolutely. We integrate an intuitive admin panel and a training session is included. You don't need any technical knowledge to add products or articles or to change content." },
      { q: 'Do you work with clients outside Romania?', a: 'Yes. We work with businesses from all over the world. Collaboration happens 100% online: video meetings, shared Figma files and access to a staging server. We also have offices in Târgu Jiu and Bucharest for face-to-face meetings.' },
      { q: "What if I'm not happy with the design?", a: "Our process includes unlimited revisions in the design phase, before development starts. We don't start coding until you're 100% happy with how it looks." },
      { q: 'Do you also offer maintenance and hosting?', a: 'Yes. Our monthly maintenance plans include security updates, daily backups, uptime monitoring, content changes and priority technical support.' },
      { q: 'Can you take over an existing project, unfinished or outdated?', a: "Yes. We review any existing project and give you an honest assessment. Sometimes it's more efficient to rebuild, other times we optimise what's already there. We always recommend the solution that's in the client's best interest." },
    ],
  },

  final: {
    eticheta: 'Free estimate, no commitment',
    titlu: 'Ready to take your business to the next level?',
    lead: "Tell us what you want to build and we'll prepare a quote tailored to your project.",
    suna: 'Call now',
    scrie: 'Prefer to write?',
    mesaj: 'Send us a message',
  },
};

const de: TextAcasa = {
  hero: {
    inceput: 'Wir entwickeln',
    dupaCuvant: ',',
    cuvinte: ['Online-Shops', 'Web-Apps', 'Automatisierungen', 'Unternehmenswebsites'],
    continuare: 'die Ihnen Kunden bringen, nicht nur Traffic',
    titluComplet:
      'Wir entwickeln Online-Shops, Web-Apps, Automatisierungen und Unternehmenswebsites, die Ihnen Kunden bringen, nicht nur Traffic',
    lead: 'Von Online-Shops und Unternehmenswebsites bis zu Web-Apps und SaaS-Plattformen: Wir entwickeln schnelle, SEO-optimierte Lösungen, die auf Conversions ausgelegt sind.',
    clienti: 'Einige unserer Kunden',
    stele: '5-Sterne-Bewertung auf Google',
    recomandat: ['Empfohlen von ', 'Unternehmen auf der ganzen Welt', ''],
  },

  tehnologii: { titlu: 'Wir arbeiten mit Top-Technologien', aria: 'Technologien, mit denen wir arbeiten' },

  servicii: {
    titlu: 'Lösungen, die Ergebnisse liefern',
    lead: 'Nicht nur fürs Auge. Jedes Projekt hat ein klares Ziel: mehr Kunden, höhere Conversions oder effizientere Abläufe.',
    ofertaPentru: 'Angebot anfordern: {serviciu}',
    calendar: { inainte: 'Terminkalender + ', si: ' und ' },
    lista: {
      'magazine-online': {
        titlu: 'Schlüsselfertiger Online-Shop mit allen Integrationen',
        descriere:
          'Wir entwickeln Ihren kompletten Online-Shop: von Design und Struktur bis zu den Integrationen für Zahlung, Versand und Rechnungsstellung, samt den Automatisierungen, die Sie für den Online-Verkauf brauchen.',
        scurt: 'Online-Shops',
        puncte: [
          'Zahlung per Karte, PayPal, Apple Pay oder Google Pay',
          'Automatische Rechnungen und Anbindung an Ihre Buchhaltung',
          'Versand mit DHL, UPS oder DPD',
        ],
      },
      'website-de-prezentare': {
        titlu: 'Eine Unternehmenswebsite, die Kunden bringt',
        descriere:
          'Wir haben Websites für Zahnärzte, Anwälte, Bauunternehmen, Restaurants und Dutzende weitere Branchen gebaut. Wir wissen, was in jeder Branche funktioniert.',
        scurt: 'Unternehmenswebsites',
        puncte: ['Design von Grund auf für Ihre Branche', '', 'Komplettes technisches SEO, ab dem Launch eingerichtet'],
      },
      'aplicatii-web-saas': {
        titlu: 'Web-Apps und SaaS, von der Idee bis zum Launch',
        descriere:
          'Sie haben eine Idee für eine Online-Plattform oder ein Tool, das ein echtes Problem löst? Sie sagen uns, was es können soll, und wir bauen alles, was dahintersteckt.',
        scurt: 'Web-Apps und SaaS',
        puncte: ['Dashboards mit Echtzeitdaten', 'Abonnements und wiederkehrende Zahlungen', 'Portale für Kunden und Partner'],
      },
      'cms-crm-erp': {
        titlu: 'CRM und ERP, maßgeschneidert für Ihr Unternehmen',
        descriere:
          'Wir sehen uns an, wie Ihr Unternehmen arbeitet und wo Zeit und Geld verloren gehen, und bauen dann das System, das genau diese Probleme löst. Komplett geliefert, mit geschultem Team.',
        scurt: 'CMS, CRM und ERP',
        puncte: ['Ihr ganzes Team arbeitet an einem Ort', 'Lager, Bestellungen und Rechnungen in Echtzeit', 'Automatisch erstellte Berichte, in Sekunden'],
      },
      'aplicatii-mobile': {
        titlu: 'Mobile Apps für iOS und Android',
        descriere: 'Schnelle, einfach zu bedienende Apps mit React Native oder Flutter, flüssig auf jedem Smartphone.',
        scurt: 'mobile Apps',
        puncte: [],
      },
      'automatizari-ai': {
        titlu: 'Automatisierung mit KI',
        descriere:
          'Chatbots, E-Mail-Verarbeitung, Lead-Qualifizierung und automatische Berichte, damit sich Ihr Team auf das Wesentliche konzentrieren kann.',
        scurt: 'KI-Automatisierung',
        puncte: [],
      },
    },
  },

  portofoliu: {
    titlu: 'Projekte, die für sich sprechen',
    lead: 'Eine Auswahl unserer Arbeiten: jedes Projekt mit seinem eigenen Ziel, jedes pünktlich geliefert.',
    filaNoua: ' (öffnet in einem neuen Tab)',
    // in EN/DE/FR descrierile scurte ale proiectelor sunt in lib/portofoliu-international.ts
    descrieri: {},
  },

  glob: {
    titlu: 'Wir arbeiten mit Unternehmen auf der ganzen Welt',
    descriere: 'Egal, wo Sie sind: Die gesamte Zusammenarbeit läuft online, vom ersten Gespräch bis zum Launch.',
    cifre: [
      { n: 24, dupa: '\u00a0h', text: 'Antwortzeit' },
      { n: 100, dupa: '%', text: 'Online-Zusammenarbeit' },
      { n: 5, dupa: '★', text: 'Bewertung auf Google' },
    ],
    aria: 'Illustration: ein Globus mit Verbindungen zwischen Städten auf der ganzen Welt',
  },

  recenzii: {
    titlu: 'Was unsere Kunden sagen',
    verificate: 'Verifizierte Bewertungen auf Google',
    tradus: 'Aus dem Rumänischen übersetzt',
    stele: '5-Sterne-Bewertung auf Google',
    cinciStele: '5 Sterne',
    verificata: 'Verifizierte Bewertung',
    texte: [
      'Die Zusammenarbeit hat unsere Erwartungen übertroffen. Geduld, schnelle Lösungen und ein sehr ausgereiftes Endergebnis. Man merkt die Erfahrung und die Leidenschaft für das, was sie tun. Absolut empfehlenswert!',
      'Ich kann sie uneingeschränkt empfehlen! Die Unternehmenswebsite wurde genau so umgesetzt, wie ich es mir gewünscht hatte: modern, klar, gut strukturiert und einfach zu bedienen. Die Kommunikation war sehr gut, auf alle meine Wünsche wurde eingegangen und die vereinbarten Termine wurden eingehalten. Man sieht, dass sie engagiert und detailverliebt sind. Danke für die Professionalität!',
      'Sie haben für meine Eventfirma eine erstklassige Website erstellt. Ich empfehle sie mit größtem Vertrauen, wenn Sie etwas Professionelles und Modernes möchten.',
      'Hochwertige Leistungen, Liebe zum Detail und produktive Ideen zur Organisation und Verwaltung des Online-Geschäfts.',
      'Ich bin mit den Ergebnissen unserer Zusammenarbeit sehr zufrieden. Absolut empfehlenswert!',
      'Insgesamt war ich mit den Leistungen sehr zufrieden; das einzige kleine Problem war eine Verspätung von 5 Tagen. Ansonsten alles perfekt! Empfehlenswert!',
    ],
  },

  intrebari: {
    titlu: 'Häufige Fragen',
    descriere:
      'Klare Antworten ohne Überraschungen auf alles, was Sie vor dem Start wissen möchten. Ihre Frage ist nicht dabei? Schreiben Sie uns oder rufen Sie an.',
    lista: [
      { q: 'Wie lange dauert die Entwicklung eines Online-Shops?', a: 'Ein Standard-Online-Shop mit bis zu 500 Produkten wird 4–6 Wochen nach Freigabe des Designs geliefert. Bei komplexeren Projekten legen wir den Zeitplan im technischen Angebot fest.' },
      { q: 'Gibt es eine Garantie auf die entwickelten Projekte?', a: 'Ja. Jedes Projekt enthält 30 Tage Garantie nach dem Launch: Jeder Fehler, den wir verursacht haben, wird kostenlos behoben. Mit unseren monatlichen Wartungspaketen lässt sich das verlängern.' },
      { q: 'Kann ich die Website nach dem Launch selbst verwalten?', a: 'Auf jeden Fall. Wir integrieren ein intuitives Admin-Panel, eine Schulung ist inklusive. Sie brauchen keine technischen Kenntnisse, um Produkte oder Artikel hinzuzufügen oder Inhalte zu ändern.' },
      { q: 'Arbeiten Sie auch mit Kunden außerhalb Rumäniens?', a: 'Ja. Wir arbeiten mit Unternehmen auf der ganzen Welt. Die Zusammenarbeit läuft zu 100 % online: Videomeetings, geteilte Figma-Dateien und Zugriff auf einen Staging-Server. Für persönliche Treffen haben wir Büros in Târgu Jiu und Bukarest.' },
      { q: 'Was passiert, wenn mir das Design nicht gefällt?', a: 'Unser Prozess umfasst unbegrenzte Überarbeitungen in der Designphase, bevor die Entwicklung beginnt. Wir schreiben keine Zeile Code, bis Sie zu 100 % mit dem Design zufrieden sind.' },
      { q: 'Bieten Sie auch Wartung und Hosting an?', a: 'Ja. Unsere monatlichen Wartungspakete umfassen Sicherheitsupdates, tägliche Backups, Uptime-Monitoring, Inhaltsänderungen und priorisierten technischen Support.' },
      { q: 'Können Sie ein bestehendes, unfertiges oder veraltetes Projekt übernehmen?', a: 'Ja. Wir prüfen jedes bestehende Projekt und geben Ihnen eine ehrliche Einschätzung. Manchmal ist ein Neuaufbau effizienter, manchmal optimieren wir das Bestehende. Wir empfehlen immer die Lösung, die im Interesse des Kunden liegt.' },
    ],
  },

  final: {
    eticheta: 'Kostenlose Einschätzung, unverbindlich',
    titlu: 'Bereit, Ihr Unternehmen auf das nächste Level zu bringen?',
    lead: 'Sagen Sie uns, was Sie bauen möchten, und wir erstellen Ihnen ein Angebot, das genau zu Ihrem Projekt passt.',
    suna: 'Jetzt anrufen',
    scrie: 'Lieber schreiben?',
    mesaj: 'Senden Sie uns eine Nachricht',
  },
};

const fr: TextAcasa = {
  hero: {
    inceput: 'Nous créons des',
    dupaCuvant: '',
    cuvinte: ['boutiques en ligne', 'applications web', 'automatisations', 'sites vitrines'],
    continuare: 'qui vous apportent des clients, pas seulement du trafic',
    titluComplet:
      'Nous créons des boutiques en ligne, des applications web, des automatisations et des sites vitrines qui vous apportent des clients, pas seulement du trafic',
    lead: 'Des boutiques en ligne et sites vitrines aux applications web et plateformes SaaS, nous développons des solutions rapides, optimisées pour le SEO et conçues pour convertir.',
    clienti: 'Quelques-uns de nos clients',
    stele: 'Note de 5 étoiles sur Google',
    recomandat: ['Recommandés par ', 'des entreprises du monde entier', ''],
  },

  tehnologii: { titlu: 'Nous travaillons avec les meilleures technologies', aria: 'Technologies que nous utilisons' },

  servicii: {
    titlu: 'Des solutions conçues pour des résultats',
    lead: 'Pas seulement pour l’apparence. Chaque projet a un objectif clair : plus de clients, plus de conversions ou des opérations plus efficaces.',
    ofertaPentru: 'Demander un devis – {serviciu}',
    calendar: { inainte: 'Agenda de rendez-vous + ', si: ' et ' },
    lista: {
      'magazine-online': {
        titlu: 'Boutique en ligne clé en main, avec toutes les intégrations',
        descriere:
          'Nous réalisons votre boutique en ligne complète, du design et de la structure aux intégrations de paiement, de livraison et de facturation, avec les automatisations nécessaires pour commencer à vendre en ligne.',
        scurt: 'boutiques en ligne',
        puncte: [
          'Paiement par carte, PayPal, Apple Pay ou Google Pay',
          'Factures automatiques et intégration comptable',
          'Livraison avec DHL, UPS ou DPD',
        ],
      },
      'website-de-prezentare': {
        titlu: 'Un site vitrine qui vous amène des clients',
        descriere:
          'Nous avons créé des sites pour des dentistes, des avocats, des entreprises de construction, des restaurants et des dizaines d’autres secteurs. Nous savons ce qui fonctionne dans chacun.',
        scurt: 'sites vitrines',
        puncte: ['Design créé sur mesure pour votre secteur', '', 'SEO technique complet, configuré dès le lancement'],
      },
      'aplicatii-web-saas': {
        titlu: 'Applications web et SaaS, de l’idée au lancement',
        descriere:
          'Vous avez une idée de plateforme en ligne ou d’outil qui résout un vrai problème ? Vous nous dites ce qu’il doit faire, nous construisons tout ce qu’il y a derrière.',
        scurt: 'applications web et SaaS',
        puncte: ['Tableaux de bord avec données en temps réel', 'Abonnements et paiements récurrents', 'Portails pour clients et partenaires'],
      },
      'cms-crm-erp': {
        titlu: 'CRM et ERP conçus pour votre entreprise',
        descriere:
          'Nous analysons le fonctionnement de votre entreprise et les endroits où se perdent du temps et de l’argent, puis nous construisons le système qui résout exactement ces problèmes. Livré complet, avec votre équipe formée.',
        scurt: 'CMS, CRM et ERP',
        puncte: ['Toute votre équipe travaille au même endroit', 'Stocks, commandes et factures en temps réel', 'Rapports générés automatiquement, en quelques secondes'],
      },
      'aplicatii-mobile': {
        titlu: 'Applications mobiles pour iOS et Android',
        descriere:
          'Des applications rapides et faciles à utiliser, développées avec React Native ou Flutter, pour une expérience fluide sur tous les smartphones.',
        scurt: 'applications mobiles',
        puncte: [],
      },
      'automatizari-ai': {
        titlu: 'Automatisation avec l’IA',
        descriere:
          'Chatbots, traitement des e-mails, qualification des leads et rapports automatiques, pour que votre équipe se concentre sur l’essentiel.',
        scurt: 'automatisation IA',
        puncte: [],
      },
    },
  },

  portofoliu: {
    titlu: 'Des projets qui parlent d’eux-mêmes',
    lead: 'Une sélection de nos réalisations\u202f: chaque projet avec son objectif, chacun livré dans les délais.',
    filaNoua: ' (s’ouvre dans un nouvel onglet)',
    // in EN/DE/FR descrierile scurte ale proiectelor sunt in lib/portofoliu-international.ts
    descrieri: {},
  },

  glob: {
    titlu: 'Nous travaillons avec des entreprises du monde entier',
    descriere: 'Peu importe où vous êtes. Toute la collaboration se fait en ligne, du premier échange jusqu’au lancement.',
    cifre: [
      { n: 24, dupa: '\u00a0h', text: 'délai de réponse' },
      { n: 100, dupa: '%', text: 'collaboration en ligne' },
      { n: 5, dupa: '★', text: 'note sur Google' },
    ],
    aria: 'Illustration : un globe avec des liaisons entre des villes du monde entier',
  },

  recenzii: {
    titlu: 'Ce que disent nos clients',
    verificate: 'Avis vérifiés sur Google',
    tradus: 'Traduits du roumain',
    stele: 'Note de 5 étoiles sur Google',
    cinciStele: '5 étoiles',
    verificata: 'Avis vérifié',
    texte: [
      'La collaboration a dépassé nos attentes. De la patience, des solutions rapides et un résultat final très abouti. On sent l’expérience et la passion pour ce qu’ils font. Je recommande !',
      'Je les recommande en toute confiance ! Le site vitrine a été réalisé exactement comme je le souhaitais : moderne, clair, bien structuré et facile à utiliser. La communication a été excellente, ils ont été à l’écoute de toutes mes demandes et ont respecté les délais convenus. On voit qu’ils sont impliqués et attentifs aux détails. Merci pour votre professionnalisme !',
      'Ils ont réalisé un excellent site web pour mon entreprise d’événementiel. Je les recommande en toute confiance si vous voulez quelque chose de professionnel et de moderne.',
      'Des services de qualité, une grande attention aux détails et des idées utiles pour organiser et gérer l’activité en ligne.',
      'Je suis très satisfaite des résultats de notre collaboration. Je recommande en toute confiance !',
      'Dans l’ensemble, j’ai été très satisfait des services ; le seul petit problème a été un retard de 5 jours. Pour le reste, tout était parfait ! Je recommande !',
    ],
  },

  intrebari: {
    titlu: 'Questions fréquentes',
    // cratimes insecables (U+2011) dans « écrivez‑nous », « appelez‑nous »
    descriere:
      'Des réponses claires, sans surprises, à tout ce que vous voulez savoir avant de commencer. Vous ne trouvez pas votre réponse ? Écrivez‑nous ou appelez‑nous.',
    lista: [
      { q: 'Combien de temps faut-il pour créer une boutique en ligne ?', a: 'Une boutique en ligne standard, jusqu’à 500 produits, est livrée en 4 à 6 semaines après la validation du design. Pour les projets plus complexes, le calendrier est fixé dans la proposition technique.' },
      { q: 'Offrez-vous une garantie sur les projets réalisés ?', a: 'Oui. Chaque projet inclut une garantie de 30 jours après le lancement : tout bug de notre fait est corrigé gratuitement. Elle peut être prolongée avec nos forfaits de maintenance mensuelle.' },
      { q: 'Puis-je gérer le site moi-même après le lancement ?', a: 'Absolument. Nous intégrons un panneau d’administration intuitif et une session de formation est incluse. Aucune compétence technique n’est nécessaire pour ajouter des produits ou des articles, ou pour modifier le contenu.' },
      { q: 'Travaillez-vous avec des clients hors de Roumanie ?', a: 'Oui. Nous travaillons avec des entreprises du monde entier. La collaboration se fait à 100 % en ligne : réunions vidéo, partage Figma et accès à un serveur de préproduction. Nous avons aussi des bureaux à Târgu Jiu et à Bucarest pour les rencontres en personne.' },
      { q: 'Que se passe-t-il si le design ne me plaît pas ?', a: 'Notre processus inclut des révisions illimitées pendant la phase de design, avant de passer au développement. Nous ne commençons pas à coder tant que vous n’êtes pas satisfait à 100 % du rendu visuel.' },
      { q: 'Proposez-vous aussi la maintenance et l’hébergement ?', a: 'Oui. Nos forfaits de maintenance mensuelle comprennent les mises à jour de sécurité, une sauvegarde quotidienne, la surveillance de la disponibilité, les modifications de contenu et un support technique prioritaire.' },
      { q: 'Pouvez-vous reprendre un projet existant, inachevé ou ancien ?', a: 'Oui. Nous analysons tout projet existant et vous donnons un avis honnête. Parfois il est plus efficace de reconstruire, parfois nous optimisons l’existant. Nous recommandons toujours la solution dans l’intérêt du client.' },
    ],
  },

  final: {
    eticheta: 'Estimation gratuite, sans engagement',
    titlu: 'Prêt à faire passer votre entreprise au niveau supérieur ?',
    lead: 'Dites-nous ce que vous voulez construire et nous préparons un devis adapté à votre projet.',
    suna: 'Appeler maintenant',
    scrie: 'Vous préférez écrire ?',
    mesaj: 'Envoyez-nous un message',
  },
};

const ACASA: Record<Limba, TextAcasa> = { ro, en, de, fr };

export const textAcasa = (lang: Limba): TextAcasa => ACASA[lang];
