import type { MarketplaceProduct } from '@/types/marketplace';

/* ══════════════════════════════════════════════════════
   PRODUSE MARKETPLACE — Date statice
   Gestionezi produsele direct din acest fisier.
   badge?: string  →  text custom afisat pe card (ex: 'NOU', 'CEL MAI VIZIONAT')
   status: 'published' | 'draft' | 'sold'
══════════════════════════════════════════════════════ */

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [

  /* ─────────────────────────────────────────── */
  /* 1. MAGAZIN ONLINE FASHION                  */
  /* ─────────────────────────────────────────── */
  {
    id: '1',
    slug: 'magazin-online-fashion',
    category: 'magazin-online',
    platform: 'WooCommerce',
    niche: 'Fashion si Imbracaminte',
    title: 'Magazin Online Fashion Complet',
    tagline: 'Afacere digitala gata de folosit pentru vanzarea online de imbracaminte si accesorii',
    description: 'Magazin online pentru fashion si imbracaminte, cu design modern, plati integrate si logistica automatizata. Gata sa vanda din prima zi.',
    fullDescription: 'Un magazin online complet construit pe WooCommerce pentru nisa de fashion si imbracaminte. Design modern si premium, optimizat pentru conversii ridicate, cu toate integrarile necesare: plati card, ramburs, rate, curieri, facturare automata.',
    mainImage: '/imagini/marketplace/fashion-main.jpg',
    gallery: [
      { src: '/imagini/marketplace/fashion-homepage.jpg', label: 'Homepage', alt: 'Homepage magazin fashion' },
      { src: '/imagini/marketplace/fashion-produs.jpg', label: 'Pagina Produs', alt: 'Pagina de produs' },
      { src: '/imagini/marketplace/fashion-cos.jpg', label: 'Cos Cumparaturi', alt: 'Cos de cumparaturi' },
      { src: '/imagini/marketplace/fashion-mobile.jpg', label: 'Versiune Mobile', alt: 'Versiune mobile' },
    ],
    demoUrl: 'https://demo-fashion.inovex.ro',
    price: 1299,
    deliveryDays: 2,
    badge: 'CEL MAI VANDUT',
    featured: true,
    status: 'published',
    totalSales: 47,
    publishedAt: '2024-09-15',
    seo: {
      metaTitle: 'Magazin Online Fashion WooCommerce — Inovex Marketplace',
      metaDescription: 'Cumpara un magazin online complet pentru fashion si imbracaminte, gata de folosit in 48 de ore. Personalizat cu datele tale.',
    },
    relatedSlugs: ['magazin-online-cosmetice', 'magazin-online-suplimente'],
    includedPages: [
      { pageName: 'Homepage', pageDescription: 'Hero cu colectii, slider produse noi, bannere promotionale' },
      { pageName: 'Catalog Produse', pageDescription: 'Listing cu filtre avansate: marime, culoare, pret, brand' },
      { pageName: 'Pagina Produs', pageDescription: 'Galerie foto, variante produs, tabel marimi, recenzii' },
      { pageName: 'Cos Cumparaturi', pageDescription: 'Cos cu coduri promotionale si calcul livrare' },
      { pageName: 'Checkout', pageDescription: 'Checkout rapid cu card, ramburs si plata in rate' },
      { pageName: 'Contul Meu', pageDescription: 'Istoric comenzi, adrese salvate, wishlist' },
      { pageName: 'Pagina Contact', pageDescription: 'Formular contact + harta + retele sociale' },
      { pageName: 'Blog', pageDescription: 'Sectiune blog pentru articole de fashion si tendinte' },
    ],
    includedFeatures: [
      {
        category: 'Plati & Checkout',
        features: [
          'Plata cu cardul prin Stripe sau PayU',
          'Plata ramburs la livrare',
          'Plata in rate (Twisto / PayU Rate)',
          'Coduri de reducere si cupoane',
        ],
      },
      {
        category: 'Logistica',
        features: [
          'Integrare FanCourier, Cargus, DPD, Sameday',
          'Calcul automat cost livrare',
          'Tracking colet in cont client',
          'Facturare automata SmartBill',
        ],
      },
      {
        category: 'Marketing & SEO',
        features: [
          'SEO complet cu schema markup',
          'Google Analytics 4 integrat',
          'Facebook Pixel configurat',
          'Google Shopping feed',
          'Newsletter pop-up si integrare Mailchimp',
        ],
      },
      {
        category: 'Personalizare inclusa',
        features: [
          'Logo, culori si fonturi ale brandului tau',
          'Texte si descrieri personalizate',
          'Pana la 100 produse importate',
          'Configurare domeniu si SSL',
        ],
      },
    ],
    notIncluded: [
      { item: 'Hosting si domeniu', explanation: 'Necesita hosting WordPress (~30-60 EUR/an) si domeniu (~15 EUR/an)' },
      { item: 'Sedinta foto produse', explanation: 'Fotografiile produselor tale nu sunt incluse' },
      { item: 'Abonament curier', explanation: 'Contractele cu curierii sunt ale tale' },
      { item: 'Modificari post-livrare', explanation: 'Modificarile ulterioare se factureaza separat' },
    ],
    techSpecs: {
      platform: 'WordPress + WooCommerce',
      phpVersion: '8.2+',
      hostingRequirements: 'Hosting WordPress 4GB RAM, PHP 8.2, MySQL 8, SSL',
      browserCompatibility: 'Chrome, Firefox, Safari, Edge (ultimele 2 versiuni)',
      language: 'Romana (poate fi tradus)',
      technologies: ['WordPress 6.x', 'WooCommerce 9.x', 'PHP 8.2', 'MySQL 8', 'Redis Cache'],
    },
    deliverySteps: [
      { stepNumber: 1, timeframe: 'Ziua 1 — ora 1', title: 'Colectare date', description: 'Trimiti logo, culori, texte si credentialele de hosting. Incepem configurarea.', icon: 'ClipboardList' },
      { stepNumber: 2, timeframe: 'Ziua 1 — ora 4', title: 'Instalare & configurare', description: 'Instalam WordPress, WooCommerce si toate plugin-urile necesare pe hostingul tau.', icon: 'Settings' },
      { stepNumber: 3, timeframe: 'Ziua 1 — ora 8', title: 'Personalizare design', description: 'Aplicam brandingul tau: logo, culori, fonturi, texte si importam produsele.', icon: 'Eye' },
      { stepNumber: 4, timeframe: 'Ziua 2 — ora 6', title: 'Testare & lansare', description: 'Testam toate fluxurile: comanda, plata, livrare. Lansam site-ul live.', icon: 'Rocket' },
      { stepNumber: 5, timeframe: 'Post-livrare', title: 'Suport & training', description: 'Training utilizare platforma + suport tehnic 14 zile pentru orice intrebari.', icon: 'Headphones' },
    ],
    faq: [
      { question: 'Pot adauga produse dupa livrare?', answer: 'Da, WooCommerce iti permite sa adaugi produse nelimitate din panoul de administrare. Vei primi si un training de utilizare.' },
      { question: 'Cum se face plata catre client?', answer: 'Platile cu cardul intra direct in contul tau de Stripe sau PayU. Platile ramburs le primesti de la curier.' },
      { question: 'Ce hosting recomanzi?', answer: 'Recomandam Hosterion, Exim Host sau Namecheap. Costul mediu este 30-60 EUR/an pentru un plan WordPress.' },
      { question: 'Pot schimba designul dupa livrare?', answer: 'Da, ai acces complet la WordPress si poti modifica orice. Modificarile complexe le putem face noi contra cost.' },
      { question: 'E inclus SEO?', answer: 'Da, configuram SEO de baza (meta titluri, descrieri, schema markup, sitemap XML) pentru toate paginile principale.' },
    ],
  },

  /* ─────────────────────────────────────────── */
  /* 2. MAGAZIN ONLINE COSMETICE                */
  /* ─────────────────────────────────────────── */
  {
    id: '2',
    slug: 'magazin-online-cosmetice',
    category: 'magazin-online',
    platform: 'WooCommerce',
    niche: 'Cosmetice si Ingrijire',
    title: 'Magazin Online Cosmetice & Beauty',
    tagline: 'Platforma completa pentru vanzarea online de cosmetice, skincare si produse de ingrijire',
    description: 'Magazin online dedicat cosmeticelor si beauty-ului, cu design elegant, sistem de fidelizare si integrari complete pentru comert online.',
    fullDescription: 'Magazin online premium pentru nisa de cosmetice si ingrijire personala, construit pe WooCommerce. Design elegant cu accent pe culori pastelate si experienta de cumparare premium.',
    mainImage: '/imagini/marketplace/cosmetice-main.jpg',
    gallery: [
      { src: '/imagini/marketplace/cosmetice-homepage.jpg', label: 'Homepage', alt: 'Homepage magazin cosmetice' },
      { src: '/imagini/marketplace/cosmetice-produs.jpg', label: 'Pagina Produs', alt: 'Pagina produs cosmetice' },
      { src: '/imagini/marketplace/cosmetice-categorie.jpg', label: 'Categorii', alt: 'Pagina categorii' },
    ],
    demoUrl: 'https://demo-cosmetice.inovex.ro',
    price: 1199,
    deliveryDays: 2,
    badge: 'NOU',
    featured: true,
    status: 'published',
    totalSales: 31,
    publishedAt: '2024-10-20',
    seo: {
      metaTitle: 'Magazin Online Cosmetice WooCommerce — Inovex Marketplace',
      metaDescription: 'Magazin online complet pentru cosmetice si beauty, personalizat si livrat in 48 de ore.',
    },
    relatedSlugs: ['magazin-online-fashion', 'magazin-online-suplimente'],
    includedPages: [
      { pageName: 'Homepage', pageDescription: 'Hero elegant, colectii featured, bannere promotionale' },
      { pageName: 'Catalog Produse', pageDescription: 'Filtre dupa tip produs, brand, ingredient, pret' },
      { pageName: 'Pagina Produs', pageDescription: 'Galerie foto, ingrediente, mod de utilizare, recenzii' },
      { pageName: 'Cos & Checkout', pageDescription: 'Checkout rapid cu toate metodele de plata' },
      { pageName: 'Contul Meu', pageDescription: 'Comenzi, puncte fidelitate, wishlist' },
      { pageName: 'Blog Beauty', pageDescription: 'Articole, tutoriale si ghiduri de ingrijire' },
    ],
    includedFeatures: [
      {
        category: 'Functionalitati Speciale',
        features: [
          'Program de fidelitate cu puncte',
          'Quiz tip de ten pentru recomandari produse',
          'Seturi si bundle-uri de produse',
          'Ambalaj cadou optional la checkout',
        ],
      },
      {
        category: 'Plati & Livrare',
        features: [
          'Card, ramburs, PayPal',
          'Integrare curieri principali',
          'Livrare gratuita peste prag configurat',
          'Facturare automata SmartBill',
        ],
      },
    ],
    notIncluded: [
      { item: 'Hosting si domeniu', explanation: 'Necesita hosting WordPress si domeniu' },
      { item: 'Fotografii produse', explanation: 'Fotografiile produselor tale nu sunt incluse' },
    ],
    techSpecs: {
      platform: 'WordPress + WooCommerce',
      phpVersion: '8.2+',
      hostingRequirements: 'Hosting WordPress 4GB RAM, PHP 8.2, MySQL 8, SSL',
      browserCompatibility: 'Chrome, Firefox, Safari, Edge (ultimele 2 versiuni)',
      language: 'Romana',
      technologies: ['WordPress 6.x', 'WooCommerce 9.x', 'PHP 8.2', 'MySQL 8'],
    },
    deliverySteps: [
      { stepNumber: 1, timeframe: 'Ziua 1 — ora 1', title: 'Colectare date', description: 'Trimiti logo, culori, texte si credentialele de hosting.', icon: 'ClipboardList' },
      { stepNumber: 2, timeframe: 'Ziua 1 — ora 4', title: 'Instalare & configurare', description: 'Instalam si configuram platforma completa pe hostingul tau.', icon: 'Settings' },
      { stepNumber: 3, timeframe: 'Ziua 1 — ora 8', title: 'Personalizare design', description: 'Aplicam brandingul si importam produsele tale.', icon: 'Eye' },
      { stepNumber: 4, timeframe: 'Ziua 2 — ora 6', title: 'Testare & lansare', description: 'Testam toate fluxurile si lansam live.', icon: 'Rocket' },
      { stepNumber: 5, timeframe: 'Post-livrare', title: 'Suport & training', description: 'Training utilizare si suport tehnic 14 zile.', icon: 'Headphones' },
    ],
    faq: [
      { question: 'Pot adauga categorii noi de produse?', answer: 'Da, poti adauga categorii, subcategorii si atribute nelimitate din panoul WordPress.' },
      { question: 'Functioneaza programul de fidelitate automat?', answer: 'Da, punctele se acumuleaza automat la fiecare comanda si pot fi folosite ca reducere.' },
    ],
  },

  /* ─────────────────────────────────────────── */
  /* 3. MAGAZIN ONLINE SUPLIMENTE               */
  /* ─────────────────────────────────────────── */
  {
    id: '3',
    slug: 'magazin-online-suplimente',
    category: 'magazin-online',
    platform: 'WooCommerce',
    niche: 'Suplimente Nutritive si Fitness',
    title: 'Magazin Online Suplimente & Fitness',
    tagline: 'Magazin specializat pentru suplimente nutritive, proteine si echipamente fitness',
    description: 'Platforma completa pentru vanzarea online de suplimente nutritive si produse fitness, cu calculator nutritional si abonamente automate.',
    fullDescription: 'Magazin online specializat pentru nisa de suplimente si fitness. Include calculator calorii, abonamente lunare pentru produse consumabile si integrari cu branduri de top.',
    mainImage: '/imagini/marketplace/suplimente-main.jpg',
    gallery: [
      { src: '/imagini/marketplace/suplimente-homepage.jpg', label: 'Homepage', alt: 'Homepage magazin suplimente' },
      { src: '/imagini/marketplace/suplimente-produs.jpg', label: 'Pagina Produs', alt: 'Pagina produs suplimente' },
    ],
    demoUrl: 'https://demo-suplimente.inovex.ro',
    price: 1349,
    deliveryDays: 2,
    badge: undefined,
    featured: false,
    status: 'published',
    totalSales: 22,
    publishedAt: '2024-11-05',
    seo: {
      metaTitle: 'Magazin Online Suplimente Fitness WooCommerce — Inovex Marketplace',
      metaDescription: 'Magazin online complet pentru suplimente nutritive si fitness, cu calculator nutritional si abonamente.',
    },
    relatedSlugs: ['magazin-online-fashion', 'magazin-online-cosmetice'],
    includedPages: [
      { pageName: 'Homepage', pageDescription: 'Hero cu oferte, produse bestseller, brand-uri partenere' },
      { pageName: 'Catalog cu Filtre', pageDescription: 'Filtre: scop, brand, forma, pret, rating' },
      { pageName: 'Pagina Produs', pageDescription: 'Informatii nutritionale, mod utilizare, recenzii verificate' },
      { pageName: 'Abonamente Lunare', pageDescription: 'Sistem de abonament pentru livrare lunara automata' },
      { pageName: 'Calculator Nutritional', pageDescription: 'Calculator calorii si macronutrienti integrat' },
    ],
    includedFeatures: [
      {
        category: 'Functionalitati Speciale',
        features: [
          'Calculator nutritional integrat',
          'Sistem abonament lunar automat',
          'Tabel informatii nutritionale',
          'Stoc si alerte epuizare',
        ],
      },
      {
        category: 'Plati & Livrare',
        features: [
          'Card, ramburs, rate',
          'Curieri: FanCourier, Cargus, DPD',
          'Facturare automata',
        ],
      },
    ],
    notIncluded: [
      { item: 'Hosting si domeniu', explanation: 'Necesita hosting WordPress si domeniu' },
      { item: 'Imagini produse', explanation: 'Fotografiile produselor nu sunt incluse' },
    ],
    techSpecs: {
      platform: 'WordPress + WooCommerce',
      phpVersion: '8.2+',
      hostingRequirements: 'Hosting WordPress 4GB RAM, PHP 8.2, MySQL 8, SSL',
      browserCompatibility: 'Chrome, Firefox, Safari, Edge',
      language: 'Romana',
      technologies: ['WordPress 6.x', 'WooCommerce 9.x', 'PHP 8.2', 'MySQL 8'],
    },
    deliverySteps: [
      { stepNumber: 1, timeframe: 'Ziua 1 — ora 1', title: 'Colectare date', description: 'Trimiti logo, culori, texte si credentialele de hosting.', icon: 'ClipboardList' },
      { stepNumber: 2, timeframe: 'Ziua 1 — ora 4', title: 'Configurare platforma', description: 'Instalam si configuram toate modulele.', icon: 'Settings' },
      { stepNumber: 3, timeframe: 'Ziua 1 — ora 8', title: 'Personalizare', description: 'Design, produse si configurare calculator nutritional.', icon: 'Eye' },
      { stepNumber: 4, timeframe: 'Ziua 2 — ora 6', title: 'Testare & lansare', description: 'Testam si lansam live.', icon: 'Rocket' },
      { stepNumber: 5, timeframe: 'Post-livrare', title: 'Suport', description: 'Training si suport 14 zile.', icon: 'Headphones' },
    ],
    faq: [
      { question: 'Sistemul de abonament functioneaza automat?', answer: 'Da, clientii isi pot configura abonamentul lunar si platile se proceseaza automat.' },
      { question: 'Pot adauga tabelele nutritionale?', answer: 'Da, exista un camp dedicat pentru informatii nutritionale la fiecare produs.' },
    ],
  },

  /* ─────────────────────────────────────────── */
  /* 4. WEBSITE PREZENTARE STOMATOLOGIE         */
  /* ─────────────────────────────────────────── */
  {
    id: '4',
    slug: 'website-prezentare-stomatologie',
    category: 'website-prezentare',
    platform: 'WordPress',
    niche: 'Stomatologie si Clinici Dentare',
    title: 'Website Stomatologie Profesional',
    tagline: 'Website de prezentare modern pentru cabinete si clinici stomatologice',
    description: 'Website profesional pentru stomatologie cu sistem de programari online, galerie inainte/dupa si prezentare servicii detaliata.',
    fullDescription: 'Website complet pentru cabinet sau clinica stomatologica. Include sistem de programari online cu calendar, galerie de tratamente inainte/dupa, prezentare echipa medicala si optimizare SEO locala pentru atragerea pacientilor din zona.',
    mainImage: '/imagini/marketplace/stomatologie-main.jpg',
    gallery: [
      { src: '/imagini/marketplace/stomatologie-homepage.jpg', label: 'Homepage', alt: 'Homepage website stomatologie' },
      { src: '/imagini/marketplace/stomatologie-servicii.jpg', label: 'Servicii', alt: 'Pagina servicii stomatologice' },
      { src: '/imagini/marketplace/stomatologie-programare.jpg', label: 'Programare', alt: 'Sistem programare online' },
    ],
    demoUrl: 'https://demo-stomatologie.inovex.ro',
    price: 799,
    deliveryDays: 2,
    badge: 'CEL MAI VIZIONAT',
    featured: true,
    status: 'published',
    totalSales: 28,
    publishedAt: '2024-08-10',
    seo: {
      metaTitle: 'Website Stomatologie WordPress — Inovex Marketplace',
      metaDescription: 'Website profesional pentru stomatologie cu programari online si galerie tratamente. Livrat in 48h.',
    },
    relatedSlugs: ['website-prezentare-clinica', 'website-prezentare-salon'],
    includedPages: [
      { pageName: 'Homepage', pageDescription: 'Hero cu CTA programare, servicii principale, testimoniale pacienti' },
      { pageName: 'Servicii', pageDescription: 'Prezentare detaliata a tuturor tratamentelor cu preturi' },
      { pageName: 'Echipa Medicala', pageDescription: 'Profiluri medici cu specializari si experienta' },
      { pageName: 'Galerie Inainte/Dupa', pageDescription: 'Galerie foto cu rezultate reale ale tratamentelor' },
      { pageName: 'Programare Online', pageDescription: 'Calendar online cu selectie medic, serviciu si ora' },
      { pageName: 'Despre Clinica', pageDescription: 'Povestea, valorile si dotarile cabinetului' },
      { pageName: 'Contact', pageDescription: 'Harta, program, telefon, formular contact' },
      { pageName: 'Blog Medical', pageDescription: 'Articole despre sanatatea dentara si sfaturi' },
    ],
    includedFeatures: [
      {
        category: 'Programari & Pacienti',
        features: [
          'Sistem programare online cu calendar',
          'Notificari email/SMS automata',
          'Selectie medic si serviciu la programare',
          'Confirmare si reminder automat',
        ],
      },
      {
        category: 'Continut & SEO',
        features: [
          'SEO local optimizat (Google Maps, schema LocalBusiness)',
          'Galerie inainte/dupa cu lightbox',
          'Blog medical cu categorii',
          'Schema markup MedicalClinic pentru Google',
        ],
      },
    ],
    notIncluded: [
      { item: 'Hosting si domeniu', explanation: 'Necesita hosting WordPress si domeniu' },
      { item: 'Fotografii cabinet si echipa', explanation: 'Fotografiile profesionale nu sunt incluse' },
      { item: 'Abonament SMS', explanation: 'Notificarile SMS necesita un abonament separat (Twilio, etc.)' },
    ],
    techSpecs: {
      platform: 'WordPress',
      phpVersion: '8.2+',
      hostingRequirements: 'Hosting WordPress 2GB RAM, PHP 8.2, SSL',
      browserCompatibility: 'Chrome, Firefox, Safari, Edge',
      language: 'Romana',
      technologies: ['WordPress 6.x', 'PHP 8.2', 'MySQL 8', 'Elementor Pro'],
    },
    deliverySteps: [
      { stepNumber: 1, timeframe: 'Ziua 1 — ora 1', title: 'Colectare date', description: 'Logo, culori, texte servicii, fotografii, program cabinet.', icon: 'ClipboardList' },
      { stepNumber: 2, timeframe: 'Ziua 1 — ora 4', title: 'Instalare & configurare', description: 'Instalam WordPress si configurare sistem programari.', icon: 'Settings' },
      { stepNumber: 3, timeframe: 'Ziua 1 — ora 8', title: 'Personalizare design', description: 'Aplicam brandingul si populam cu continut.', icon: 'Eye' },
      { stepNumber: 4, timeframe: 'Ziua 2 — ora 6', title: 'Testare & lansare', description: 'Testam programarile si lansam live.', icon: 'Rocket' },
      { stepNumber: 5, timeframe: 'Post-livrare', title: 'Suport', description: 'Training admin si suport 14 zile.', icon: 'Headphones' },
    ],
    faq: [
      { question: 'Pot adauga mai multi medici in sistem?', answer: 'Da, poti adauga un numar nelimitat de medici, fiecare cu propriul calendar de disponibilitate.' },
      { question: 'Pacientii primesc reminder pentru programari?', answer: 'Da, se trimit automat confirmari si remindere pe email. SMS-urile necesita un abonament Twilio.' },
      { question: 'Pot modifica preturile serviciilor?', answer: 'Da, ai acces complet la panoul de administrare si poti modifica orice text, pret sau imagine.' },
    ],
  },

  /* ─────────────────────────────────────────── */
  /* 5. WEBSITE PREZENTARE CLINICA               */
  /* ─────────────────────────────────────────── */
  {
    id: '5',
    slug: 'website-prezentare-clinica',
    category: 'website-prezentare',
    platform: 'WordPress',
    niche: 'Clinica Medicala',
    title: 'Website Clinica Medicala',
    tagline: 'Website complet pentru clinici medicale private cu programari online si prezentare specialitati',
    description: 'Website modern pentru clinici medicale private, cu sistem de programari pe specialitati, prezentare medici si SEO medical optimizat.',
    fullDescription: 'Website profesional pentru clinici medicale private. Sistem de programari organizat pe specialitati medicale, profiluri complete pentru fiecare medic, blog medical si optimizare SEO locala.',
    mainImage: '/imagini/marketplace/clinica-main.jpg',
    gallery: [
      { src: '/imagini/marketplace/clinica-homepage.jpg', label: 'Homepage', alt: 'Homepage clinica' },
      { src: '/imagini/marketplace/clinica-medici.jpg', label: 'Medici', alt: 'Pagina echipa medicala' },
    ],
    demoUrl: 'https://demo-clinica.inovex.ro',
    price: 899,
    deliveryDays: 2,
    badge: undefined,
    featured: false,
    status: 'published',
    totalSales: 19,
    publishedAt: '2024-09-28',
    seo: {
      metaTitle: 'Website Clinica Medicala WordPress — Inovex Marketplace',
      metaDescription: 'Website complet pentru clinici medicale cu programari online pe specialitati si profil medici.',
    },
    relatedSlugs: ['website-prezentare-stomatologie', 'website-prezentare-salon'],
    includedPages: [
      { pageName: 'Homepage', pageDescription: 'Hero, specialitati, medici vedeta, testimoniale pacienti' },
      { pageName: 'Specialitati', pageDescription: 'Lista completa specialitati cu descrieri detaliate' },
      { pageName: 'Medici', pageDescription: 'Grid medici cu specializare, educatie si programare directa' },
      { pageName: 'Programare Online', pageDescription: 'Programare pe specialitate, medic si interval orar' },
      { pageName: 'Tarife', pageDescription: 'Pagina preturi cu servicii si pachete' },
      { pageName: 'Blog Medical', pageDescription: 'Articole medicale organizate pe specialitati' },
      { pageName: 'Contact', pageDescription: 'Locatii multiple, program, harti' },
    ],
    includedFeatures: [
      {
        category: 'Programari',
        features: [
          'Programari pe specialitate si medic',
          'Calendar cu disponibilitati in timp real',
          'Notificari automate email',
          'Formular pre-consultatie optional',
        ],
      },
      {
        category: 'SEO & Vizibilitate',
        features: [
          'SEO local pentru fiecare specialitate',
          'Schema markup Physician si MedicalClinic',
          'Google My Business optimizat',
        ],
      },
    ],
    notIncluded: [
      { item: 'Hosting si domeniu', explanation: 'Necesita hosting WordPress si domeniu' },
      { item: 'Fotografii profesionale', explanation: 'Fotografiile medicilor si clinicii nu sunt incluse' },
    ],
    techSpecs: {
      platform: 'WordPress',
      phpVersion: '8.2+',
      hostingRequirements: 'Hosting WordPress 2GB RAM, PHP 8.2, SSL',
      browserCompatibility: 'Chrome, Firefox, Safari, Edge',
      language: 'Romana',
      technologies: ['WordPress 6.x', 'PHP 8.2', 'MySQL 8'],
    },
    deliverySteps: [
      { stepNumber: 1, timeframe: 'Ziua 1 — ora 1', title: 'Colectare date', description: 'Specialitati, medici, logo, culori, texte.', icon: 'ClipboardList' },
      { stepNumber: 2, timeframe: 'Ziua 1 — ora 4', title: 'Configurare', description: 'Instalare si configurare completa.', icon: 'Settings' },
      { stepNumber: 3, timeframe: 'Ziua 1 — ora 8', title: 'Personalizare', description: 'Design si continut personalizat.', icon: 'Eye' },
      { stepNumber: 4, timeframe: 'Ziua 2 — ora 6', title: 'Lansare', description: 'Testare si publicare live.', icon: 'Rocket' },
      { stepNumber: 5, timeframe: 'Post-livrare', title: 'Suport', description: 'Training si suport 14 zile.', icon: 'Headphones' },
    ],
    faq: [
      { question: 'Pot adauga mai multe locatii ale clinicii?', answer: 'Da, pot fi configurate multiple locatii cu harti si program diferit pentru fiecare.' },
      { question: 'Functioneaza pe mobil?', answer: 'Da, design-ul este 100% responsive si optimizat pentru telefon si tableta.' },
    ],
  },

  /* ─────────────────────────────────────────── */
  /* 6. WEBSITE PREZENTARE SALON                */
  /* ─────────────────────────────────────────── */
  {
    id: '6',
    slug: 'website-prezentare-salon',
    category: 'website-prezentare',
    platform: 'Next.js',
    niche: 'Salon de Frumusete & Spa',
    title: 'Website Salon & Spa Premium',
    tagline: 'Website elegant pentru saloane de frumusete, spa si centre de relaxare',
    description: 'Website premium pentru saloane si spa-uri, cu rezervari online, galerie servicii si prezentare atmosfera unica a locatiei tale.',
    fullDescription: 'Website ultra-modern construit in Next.js pentru saloane de frumusete, spa si centre de relaxare. Performanta maxima, animatii fluide si sistem de rezervari online complet.',
    mainImage: '/imagini/marketplace/salon-main.jpg',
    gallery: [
      { src: '/imagini/marketplace/salon-homepage.jpg', label: 'Homepage', alt: 'Homepage salon' },
      { src: '/imagini/marketplace/salon-servicii.jpg', label: 'Servicii', alt: 'Pagina servicii salon' },
      { src: '/imagini/marketplace/salon-rezervare.jpg', label: 'Rezervare', alt: 'Sistem rezervare salon' },
    ],
    demoUrl: 'https://demo-salon.inovex.ro',
    price: 999,
    deliveryDays: 2,
    badge: 'CEL MAI VIZIONAT',
    featured: true,
    status: 'published',
    totalSales: 38,
    publishedAt: '2024-07-22',
    seo: {
      metaTitle: 'Website Salon Frumusete Next.js — Inovex Marketplace',
      metaDescription: 'Website premium pentru salon si spa cu rezervari online. Design ultra-modern, livrat in 48h.',
    },
    relatedSlugs: ['website-prezentare-stomatologie', 'website-prezentare-clinica'],
    includedPages: [
      { pageName: 'Homepage', pageDescription: 'Hero cinematic, servicii principale, galerie, testimoniale' },
      { pageName: 'Servicii & Preturi', pageDescription: 'Catalog servicii cu durata, pret si buton rezervare' },
      { pageName: 'Galerie', pageDescription: 'Galerie foto / video cu atmosfera salonului' },
      { pageName: 'Echipa', pageDescription: 'Profil stilisti si terapeuti cu specializari' },
      { pageName: 'Rezervare Online', pageDescription: 'Selectie serviciu, stilist, data si ora' },
      { pageName: 'Gift Card', pageDescription: 'Vanzare si verificare carduri cadou online' },
      { pageName: 'Contact', pageDescription: 'Locatie, program, formular contact' },
    ],
    includedFeatures: [
      {
        category: 'Rezervari & Client',
        features: [
          'Rezervari online cu calendar live',
          'Selectie serviciu si specialist',
          'Confirmare automata pe email',
          'Vanzare gift card-uri online',
        ],
      },
      {
        category: 'Design & Performance',
        features: [
          'Animatii premium Framer Motion',
          'Scor Lighthouse 95+ performance',
          'Galerie foto/video optimizata',
          'Dark mode optional',
        ],
      },
    ],
    notIncluded: [
      { item: 'Hosting', explanation: 'Necesita hosting Node.js/Vercel (~20 EUR/luna pentru Vercel Pro sau hosting VPS)' },
      { item: 'Domeniu', explanation: 'Domeniu propriu (~15 EUR/an)' },
      { item: 'Fotografii profesionale', explanation: 'Fotografiile salonului nu sunt incluse' },
    ],
    techSpecs: {
      platform: 'Next.js',
      hostingRequirements: 'Vercel, Railway sau VPS Node.js 20+',
      browserCompatibility: 'Chrome, Firefox, Safari, Edge (ultimele 2 versiuni)',
      language: 'Romana',
      technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    },
    deliverySteps: [
      { stepNumber: 1, timeframe: 'Ziua 1 — ora 1', title: 'Colectare date', description: 'Logo, culori, servicii, preturi, fotografii, echipa.', icon: 'ClipboardList' },
      { stepNumber: 2, timeframe: 'Ziua 1 — ora 4', title: 'Configurare & deploy', description: 'Configuram si deployam pe Vercel sau hostingul ales.', icon: 'Settings' },
      { stepNumber: 3, timeframe: 'Ziua 1 — ora 8', title: 'Personalizare', description: 'Aplicam brandingul si populam cu continut.', icon: 'Eye' },
      { stepNumber: 4, timeframe: 'Ziua 2 — ora 6', title: 'Testare & lansare', description: 'Testam si lansam live.', icon: 'Rocket' },
      { stepNumber: 5, timeframe: 'Post-livrare', title: 'Suport', description: 'Training si suport 14 zile.', icon: 'Headphones' },
    ],
    faq: [
      { question: 'Ce hosting recomandati pentru Next.js?', answer: 'Recomandam Vercel (creatorul Next.js) pentru performanta maxima. Costul este ~0 EUR pe planul Hobby sau ~20 EUR/luna pe Pro.' },
      { question: 'Pot adauga produse de vanzare (cosmetice)?', answer: 'Da, poate fi extins cu un mini-shop pentru vanzarea produselor utilizate in salon.' },
      { question: 'Functioneaza rezervarile fara intreruperi?', answer: 'Da, sistemul de rezervari este robust si include gestionarea intervalelor ocupate in timp real.' },
    ],
  },
];

/* ══════════════════════════════════════════════════════
   HELPER FUNCTIONS
══════════════════════════════════════════════════════ */

export function getAllProducts(): MarketplaceProduct[] {
  return MARKETPLACE_PRODUCTS.filter((p) => p.status === 'published');
}

export function getProductBySlug(slug: string): MarketplaceProduct | undefined {
  return MARKETPLACE_PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit?: number): MarketplaceProduct[] {
  const featured = MARKETPLACE_PRODUCTS.filter((p) => p.featured && p.status === 'published');
  return limit ? featured.slice(0, limit) : featured;
}

export function getProductsByCategory(category: string): MarketplaceProduct[] {
  return MARKETPLACE_PRODUCTS.filter((p) => p.category === category && p.status === 'published');
}

export function getRelatedProducts(product: MarketplaceProduct): MarketplaceProduct[] {
  return product.relatedSlugs
    .map((slug) => MARKETPLACE_PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is MarketplaceProduct => !!p && p.status === 'published');
}

export function getMinPrice(product: MarketplaceProduct): number {
  return product.price;
}
