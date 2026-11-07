import type { LimbaStraina } from '@/lib/i18n/config';
import type { PortfolioProject } from '@/lib/portfolio-data';

/* Portofoliul pentru engleza, germana si franceza (2026-11-07): acelasi in toate trei, cu proiectele trimise
   de proprietar, in ordinea lui. Romana pastreaza cele 22 de proiecte din lib/portfolio-data.ts.
   Integrarile, tehnologia si limbile sunt cele care se vad pe fiecare site (vizitat pe 2026-11-07: scripturile
   incarcate, metodele de plata din subsol, legaturile spre versiunile traduse, cookie-urile de sesiune);
   siglele lor sunt in components/sections/portofoliu/Sigle.tsx. Capturile (1424 x 2560) sunt in
   public/imagini/portofoliu, ca la cele romanesti.
   Petco (petco.com) si Scheels (scheels.com), 2 si 3 pe lista proprietarului, lipsesc deocamdata: ambele
   blocheaza browserul automat, deci nu au putut fi vizitate pentru captura si fisa. */

type TextProiect = {
  // ce fel de proiect e si domeniul
  tip: string;
  domeniu: string;
  descriere: string;
  // descrierea scurta de pe prima pagina
  scurt: string;
  // ce include, fara ce apare deja la integrari sau la limbi
  include: [string, string, string];
};

type ProiectInternational = {
  id: string;
  title: string;
  url: string;
  urlDisplay: string;
  image: string;
  integrari?: string[];
  tehnologii?: string[];
  limbi?: string[];
  limbiTotal?: number;
  texte: Record<LimbaStraina, TextProiect>;
};

const IMG = '/imagini/portofoliu';

const PROIECTE: ProiectInternational[] = [
  {
    id: 'acanva',
    title: 'Acanva',
    url: 'https://www.acanva.com/',
    urlDisplay: 'acanva.com',
    image: `${IMG}/ACANVA.COM.webp`,
    integrari: ['Klarna', 'PayPal', 'Apple Pay', 'Klaviyo', 'Trustpilot', 'Tidio'],
    tehnologii: ['Shopify'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'Online store',
        domeniu: 'Furniture',
        descriere: 'Online store for contemporary, minimalist furniture: modular sofas, sectionals and outdoor sets, with free shipping sitewide.',
        scurt: 'Online store for modern furniture',
        include: ['Shop-by-room navigation', 'Customer photo and video galleries', 'Free shipping sitewide'],
      },
      de: {
        tip: 'Online-Shop',
        domeniu: 'Möbel',
        descriere: 'Online-Shop für zeitgenössische, minimalistische Möbel: modulare Sofas, Ecksofas und Outdoor-Sets, mit kostenlosem Versand im gesamten Shop.',
        scurt: 'Online-Shop für moderne Möbel',
        include: ['Navigation nach Räumen', 'Foto- und Videogalerien von Kunden', 'Kostenloser Versand im gesamten Shop'],
      },
      fr: {
        tip: 'Boutique en ligne',
        domeniu: 'Mobilier',
        descriere: 'Boutique en ligne de mobilier contemporain et minimaliste : canapés modulables, canapés d’angle et salons de jardin, avec livraison gratuite sur tout le site.',
        scurt: 'Boutique en ligne de mobilier moderne',
        include: ['Navigation par pièce', 'Galeries photo et vidéo de clients', 'Livraison gratuite sur tout le site'],
      },
    },
  },
  {
    id: 'hsamuel',
    title: 'H.Samuel',
    url: 'https://www.hsamuel.co.uk/',
    urlDisplay: 'hsamuel.co.uk',
    image: `${IMG}/HSAMUEL.CO.UK.webp`,
    integrari: ['PayPal', 'Clearpay', 'Apple Pay', 'Google Pay', 'Trustpilot'],
    tehnologii: ['Angular', 'Node.js'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'Online store',
        domeniu: 'Jewellery',
        descriere: 'Online store for H.Samuel, the UK jeweller founded in 1862: rings, watches and diamond jewellery, with in-store appointment booking.',
        scurt: 'Online store for a UK jeweller',
        include: ['In-store appointment booking', 'Store finder', 'Smart search and recommendations'],
      },
      de: {
        tip: 'Online-Shop',
        domeniu: 'Schmuck',
        descriere: 'Online-Shop von H.Samuel, dem 1862 gegründeten britischen Juwelier: Ringe, Uhren und Diamantschmuck, mit Terminbuchung für die Filialen.',
        scurt: 'Online-Shop eines britischen Juweliers',
        include: ['Terminbuchung in der Filiale', 'Filialsuche', 'Intelligente Suche und Empfehlungen'],
      },
      fr: {
        tip: 'Boutique en ligne',
        domeniu: 'Bijouterie',
        descriere: 'Boutique en ligne de H.Samuel, bijoutier britannique fondé en 1862 : bagues, montres et bijoux en diamant, avec prise de rendez-vous en magasin.',
        scurt: 'Boutique en ligne d’un bijoutier britannique',
        include: ['Prise de rendez-vous en magasin', 'Localisateur de magasins', 'Recherche intelligente et recommandations'],
      },
    },
  },
  {
    id: 'atomicparts',
    title: 'Atomic Parts',
    url: 'https://atomicparts.ie/',
    urlDisplay: 'atomicparts.ie',
    image: `${IMG}/ATOMICPARTS.IE.webp`,
    integrari: ['Apple Pay', 'Google Pay', 'Tidio'],
    tehnologii: ['PHP', 'Laravel'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'Online store',
        domeniu: 'Car parts',
        descriere: 'Irish online store for BMW parts from brands like Mahle, Bosch and Lemförder, with a vehicle selector and fast delivery across Ireland.',
        scurt: 'Online store for BMW parts',
        include: ['BMW vehicle selector', 'Fitment check by VIN', 'Catalogue by brand and category'],
      },
      de: {
        tip: 'Online-Shop',
        domeniu: 'Autoteile',
        descriere: 'Irischer Online-Shop für BMW-Teile von Marken wie Mahle, Bosch und Lemförder, mit Fahrzeugauswahl und schneller Lieferung in ganz Irland.',
        scurt: 'Online-Shop für BMW-Teile',
        include: ['Fahrzeugauswahl für BMW', 'Passgenauigkeitsprüfung per FIN', 'Katalog nach Marken und Kategorien'],
      },
      fr: {
        tip: 'Boutique en ligne',
        domeniu: 'Pièces auto',
        descriere: 'Boutique en ligne irlandaise de pièces BMW de marques comme Mahle, Bosch et Lemförder, avec sélecteur de véhicule et livraison rapide dans toute l’Irlande.',
        scurt: 'Boutique en ligne de pièces BMW',
        include: ['Sélecteur de véhicule BMW', 'Vérification de compatibilité par VIN', 'Catalogue par marque et par catégorie'],
      },
    },
  },
  {
    id: 'resollm',
    title: 'ReSO',
    url: 'https://www.resollm.ai/',
    urlDisplay: 'resollm.ai',
    image: `${IMG}/RESOLLM.AI.webp`,
    integrari: ['ChatGPT', 'Perplexity'],
    tehnologii: ['Next.js', 'WordPress'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'SaaS platform',
        domeniu: 'AI search',
        descriere: 'SaaS platform that helps brands get recommended in AI search on ChatGPT and Perplexity: prompt intelligence, competitor tracking, content and technical audits.',
        scurt: 'SaaS platform for AI search visibility',
        include: ['AI visibility check', 'Competitor share of voice', 'Content strategy for LLMs'],
      },
      de: {
        tip: 'SaaS-Plattform',
        domeniu: 'KI-Suche',
        descriere: 'SaaS-Plattform, mit der Marken in der KI-Suche auf ChatGPT und Perplexity empfohlen werden: Prompt-Analysen, Wettbewerbsvergleich sowie Content- und Technik-Audits.',
        scurt: 'SaaS-Plattform für Sichtbarkeit in der KI-Suche',
        include: ['KI-Sichtbarkeitscheck', 'Share of Voice im Wettbewerb', 'Content-Strategie für LLMs'],
      },
      fr: {
        tip: 'Plateforme SaaS',
        domeniu: 'Recherche IA',
        descriere: 'Plateforme SaaS qui aide les marques à être recommandées dans la recherche IA sur ChatGPT et Perplexity : analyse des prompts, suivi des concurrents, audits de contenu et techniques.',
        scurt: 'Plateforme SaaS de visibilité dans la recherche IA',
        include: ['Audit de visibilité IA', 'Part de voix face aux concurrents', 'Stratégie de contenu pour les LLM'],
      },
    },
  },
  {
    id: 'knocket',
    title: 'Knocket',
    url: 'https://knocket.trtc.io/',
    urlDisplay: 'knocket.trtc.io',
    image: `${IMG}/KNOCKET.TRTC.IO.webp`,
    integrari: ['Telegram', 'WordPress', 'Shopify'],
    tehnologii: ['Astro', 'Tencent Cloud'],
    limbi: ['en', 'de', 'fr', 'es', 'it', 'tr'],
    limbiTotal: 18,
    texte: {
      en: {
        tip: 'SaaS platform',
        domeniu: 'Customer communication',
        descriere: 'Free contact layer for products: a live chat widget, a shareable contact page and in-app chat for iOS and Android, all in one inbox, with replies from Telegram and an AI agent.',
        scurt: 'SaaS platform for live chat and support',
        include: ['Live chat widget for any website', 'In-app chat SDK for iOS and Android', 'AI agent trained on your docs'],
      },
      de: {
        tip: 'SaaS-Plattform',
        domeniu: 'Kundenkommunikation',
        descriere: 'Kostenlose Kontaktebene für Produkte: Live-Chat-Widget, teilbare Kontaktseite und In-App-Chat für iOS und Android, alles in einem Posteingang, mit Antworten aus Telegram und einem KI-Agenten.',
        scurt: 'SaaS-Plattform für Live-Chat und Support',
        include: ['Live-Chat-Widget für jede Website', 'In-App-Chat-SDK für iOS und Android', 'KI-Agent mit Ihrem Wissen'],
      },
      fr: {
        tip: 'Plateforme SaaS',
        domeniu: 'Communication client',
        descriere: 'Couche de contact gratuite pour les produits : widget de chat en direct, page de contact partageable et chat intégré pour iOS et Android, le tout dans une seule boîte de réception, avec réponses depuis Telegram et un agent IA.',
        scurt: 'Plateforme SaaS de chat en direct et de support',
        include: ['Widget de chat pour tout site web', 'SDK de chat pour iOS et Android', 'Agent IA formé sur votre documentation'],
      },
    },
  },
  {
    id: 'zernio',
    title: 'Zernio',
    url: 'https://zernio.com/',
    urlDisplay: 'zernio.com',
    image: `${IMG}/ZERNIO.COM.webp`,
    integrari: ['Instagram', 'TikTok', 'YouTube', 'WhatsApp', 'Gmail', 'MCP'],
    tehnologii: ['Next.js', 'Tailwind CSS', 'Vercel'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'SaaS platform',
        domeniu: 'Marketing API',
        descriere: 'Marketing infrastructure for AI agents: one API and an MCP server for 16 social networks, 9 ad platforms, WhatsApp, SMS, calls and email.',
        scurt: 'API platform for marketing with AI agents',
        include: ['Unified social media API', 'Advertising API across 9 ad platforms', 'Developer docs and SDKs'],
      },
      de: {
        tip: 'SaaS-Plattform',
        domeniu: 'Marketing-API',
        descriere: 'Marketing-Infrastruktur für KI-Agenten: eine API und ein MCP-Server für 16 soziale Netzwerke, 9 Werbeplattformen, WhatsApp, SMS, Anrufe und E-Mail.',
        scurt: 'API-Plattform für Marketing mit KI-Agenten',
        include: ['Einheitliche Social-Media-API', 'Werbe-API für 9 Plattformen', 'Entwicklerdokumentation und SDKs'],
      },
      fr: {
        tip: 'Plateforme SaaS',
        domeniu: 'API marketing',
        descriere: 'Infrastructure marketing pour agents IA : une API et un serveur MCP pour 16 réseaux sociaux, 9 régies publicitaires, WhatsApp, SMS, appels et e-mail.',
        scurt: 'Plateforme API de marketing pour agents IA',
        include: ['API unifiée pour les réseaux sociaux', 'API publicitaire pour 9 régies', 'Documentation et SDK pour développeurs'],
      },
    },
  },
  {
    id: 'overmindlab',
    title: 'Overmind',
    url: 'https://www.overmindlab.ai/',
    urlDisplay: 'overmindlab.ai',
    image: `${IMG}/OVERMINDLAB.AI.webp`,
    integrari: ['GitHub', 'Hugging Face', 'MCP'],
    tehnologii: ['Next.js', 'Sanity', 'Vercel'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'SaaS platform',
        domeniu: 'AI model training',
        descriere: 'Training platform for specialised AI agents: it turns production data into smaller models you own, with observability, dataset preparation, evaluation and fine-tuning.',
        scurt: 'SaaS platform for training AI models',
        include: ['Agent observability', 'Data workshop for training sets', 'Open source and self-hostable'],
      },
      de: {
        tip: 'SaaS-Plattform',
        domeniu: 'KI-Modelltraining',
        descriere: 'Trainingsplattform für spezialisierte KI-Agenten: Sie macht aus Produktionsdaten kleinere, eigene Modelle, mit Observability, Datensatzaufbereitung, Evaluierung und Fine-Tuning.',
        scurt: 'SaaS-Plattform für das Training von KI-Modellen',
        include: ['Observability für Agenten', 'Data Workshop für Trainingsdaten', 'Open Source und selbst hostbar'],
      },
      fr: {
        tip: 'Plateforme SaaS',
        domeniu: 'Entraînement de modèles IA',
        descriere: 'Plateforme d’entraînement pour agents IA spécialisés : elle transforme les données de production en modèles plus petits qui vous appartiennent, avec observabilité, préparation des données, évaluation et fine-tuning.',
        scurt: 'Plateforme SaaS d’entraînement de modèles IA',
        include: ['Observabilité des agents', 'Atelier de préparation des données', 'Open source et auto-hébergeable'],
      },
    },
  },
  {
    id: 'incredible',
    title: 'Incredible',
    url: 'https://www.incredible.one/',
    urlDisplay: 'incredible.one',
    image: `${IMG}/INCREDIBLE.ONE.webp`,
    integrari: ['Gmail', 'HubSpot', 'Google Sheets', 'Notion'],
    tehnologii: ['Next.js', 'Vercel'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'SaaS platform',
        domeniu: 'AI agents',
        descriere: 'AI that does tasks on your computer, on Mac and Windows: it clicks and types in your browser, files and apps, from prospecting to updating your CRM.',
        scurt: 'AI agent that works on your computer',
        include: ['Desktop app for Mac and Windows', 'Works with 3,000+ apps', 'Use cases for sales and operations'],
      },
      de: {
        tip: 'SaaS-Plattform',
        domeniu: 'KI-Agenten',
        descriere: 'KI, die Aufgaben an Ihrem Computer erledigt, auf Mac und Windows: Sie klickt und tippt in Browser, Dateien und Apps, von der Akquise bis zur Pflege Ihres CRM.',
        scurt: 'KI-Agent, der an Ihrem Computer arbeitet',
        include: ['Desktop-App für Mac und Windows', 'Funktioniert mit über 3.000 Apps', 'Anwendungsfälle für Vertrieb und Betrieb'],
      },
      fr: {
        tip: 'Plateforme SaaS',
        domeniu: 'Agents IA',
        descriere: 'Une IA qui accomplit des tâches sur votre ordinateur, sur Mac et Windows : elle clique et tape dans votre navigateur, vos fichiers et vos applications, de la prospection à la mise à jour de votre CRM.',
        scurt: 'Agent IA qui travaille sur votre ordinateur',
        include: ['Application de bureau pour Mac et Windows', 'Compatible avec plus de 3 000 applications', 'Cas d’usage pour les ventes et les opérations'],
      },
    },
  },
  {
    id: 'yedric',
    title: 'Yedric AI',
    url: 'https://www.yedric.ai/',
    urlDisplay: 'yedric.ai',
    image: `${IMG}/YEDRIC.AI.webp`,
    integrari: ['OpenAI', 'Anthropic', 'Gemini', 'Shopify', 'Klaviyo', 'MCP'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'SaaS platform',
        domeniu: 'AI assistants',
        descriere: 'Platform that turns apps into AI-native products: an in-app assistant that takes real actions through your APIs and tools, instead of just pointing to a help doc.',
        scurt: 'SaaS platform for in-app AI assistants',
        include: ['Actions through your APIs (tool calling)', 'Knowledge from docs, PDFs and URLs', 'Built-in observability'],
      },
      de: {
        tip: 'SaaS-Plattform',
        domeniu: 'KI-Assistenten',
        descriere: 'Plattform, die Apps zu KI-nativen Produkten macht: ein Assistent in der App, der über Ihre APIs und Tools echte Aktionen ausführt, statt nur auf die Hilfe zu verweisen.',
        scurt: 'SaaS-Plattform für KI-Assistenten in Apps',
        include: ['Aktionen über Ihre APIs (Tool Calling)', 'Wissen aus Dokumenten, PDFs und URLs', 'Integrierte Observability'],
      },
      fr: {
        tip: 'Plateforme SaaS',
        domeniu: 'Assistants IA',
        descriere: 'Plateforme qui transforme les applications en produits nativement IA : un assistant intégré qui agit réellement via vos API et vos outils, au lieu de renvoyer vers une page d’aide.',
        scurt: 'Plateforme SaaS d’assistants IA intégrés',
        include: ['Actions via vos API (tool calling)', 'Connaissances issues de docs, PDF et URL', 'Observabilité intégrée'],
      },
    },
  },
  {
    id: 'rtrvr',
    title: 'Retriever AI',
    url: 'https://rtrvr.ai/',
    urlDisplay: 'rtrvr.ai',
    image: `${IMG}/RTRVR.AI.webp`,
    integrari: ['Chrome', 'Google Sheets', 'Claude', 'MCP'],
    tehnologii: ['Next.js', 'Firebase', 'Vercel'],
    limbi: ['en'],
    texte: {
      en: {
        tip: 'SaaS platform',
        domeniu: 'AI agents',
        descriere: 'AI browser agent that runs as a Chrome extension or in the cloud: it works across the open web and the sites you’re signed into, from lead research to data enrichment. Over 7 million tasks automated.',
        scurt: 'AI browser agent for Chrome',
        include: ['Cloud runs', 'Reusable AI subroutines', 'Lead research and data enrichment'],
      },
      de: {
        tip: 'SaaS-Plattform',
        domeniu: 'KI-Agenten',
        descriere: 'KI-Browser-Agent als Chrome-Erweiterung oder in der Cloud: Er arbeitet im offenen Web und auf den Websites, bei denen Sie angemeldet sind, von der Lead-Recherche bis zur Datenanreicherung. Über 7 Millionen automatisierte Aufgaben.',
        scurt: 'KI-Browser-Agent für Chrome',
        include: ['Ausführung in der Cloud', 'Wiederverwendbare KI-Subroutinen', 'Lead-Recherche und Datenanreicherung'],
      },
      fr: {
        tip: 'Plateforme SaaS',
        domeniu: 'Agents IA',
        descriere: 'Agent IA de navigation, en extension Chrome ou dans le cloud : il travaille sur le web ouvert et sur les sites où vous êtes connecté, de la recherche de prospects à l’enrichissement de données. Plus de 7 millions de tâches automatisées.',
        scurt: 'Agent IA de navigation pour Chrome',
        include: ['Exécution dans le cloud', 'Sous-routines IA réutilisables', 'Recherche de prospects et enrichissement de données'],
      },
    },
  },
];

/** Proiectele, in ordinea proprietarului, in forma folosita de FisaProiect si Proiect, cu textele limbii date. */
export function portofoliuInternational(lang: LimbaStraina): PortfolioProject[] {
  return PROIECTE.map((p, k) => {
    const t = p.texte[lang];
    return {
      id: p.id,
      order: k + 1,
      title: p.title,
      url: p.url,
      urlDisplay: p.urlDisplay,
      category: t.domeniu,
      categoryLabel: t.domeniu,
      description: t.descriere,
      features: t.include,
      image: p.image,
      filterKey: '',
      tip: t.tip,
      include: t.include,
      integrari: p.integrari,
      tehnologii: p.tehnologii,
      limbi: p.limbi,
      limbiTotal: p.limbiTotal,
    };
  });
}

/** Descrierea scurta a unui proiect international, pentru prima pagina. */
export const descriereScurta = (lang: LimbaStraina, id: string) =>
  PROIECTE.find((p) => p.id === id)?.texte[lang].scurt ?? '';
