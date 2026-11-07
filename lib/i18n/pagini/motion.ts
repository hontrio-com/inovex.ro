import type { Limba } from '@/lib/i18n/config';

/* Textele paginii Video Motion Design, in fiecare limba (2026-11-06). Romana e textul de pana acum, neschimbat.
   Preturile se pun la afisare in locul lui {pret} / {suma} (lei in romana, euro in rest: lib/motion-design.ts).
   Componentele de client primesc doar bucata lor (comanda, lipit, video) prin props. In franceza, spatiile
   fine (U+202F) si cele care nu se rup (U+00A0) sunt scrise ca   /  . */

const ro = {
  meta: {
    titlu: 'Videoclipuri Animate de Promovare pentru Afaceri - Gata in 48 de Ore',
    descriere:
      'Videoclipuri animate (motion design) pentru promovarea afacerii tale: reclame video, clipuri promo si trailere pentru site si social media. De la {pret}, livrare in maximum 48 de ore, comanda online.',
    ogDescriere: 'Reclame video, clipuri promo si trailere animate pentru afacerea ta. De la {pret}, gata in maximum 48 de ore.',
    serviciu: 'Videoclipuri Motion Design',
    serviciuDescriere:
      'Videoclipuri motion design pentru promovarea afacerilor: clipuri promo, trailere si reclame animate pentru site si social media.',
    /** firimiturile din datele structurate; in romana exista si pagina „Servicii” */
    firimituri: ['Acasa', 'Servicii', 'Video Motion Design'],
  },

  hero: {
    navigare: 'Navigare secundară',
    acasa: 'Acasă',
    pagina: 'Video Motion Design',
    titlu: 'Reclamă video animată pentru afacerea ta, gata în 48 de ore',
    lead: 'Ne spui ce vinzi, iar noi îți facem un videoclip animat cu textele, culorile și logo-ul tău. Îl pui direct în reclame pe Facebook, Instagram și TikTok sau pe site. Fără filmări, fără actori, de la {pret}.',
    comanda: 'Comandă de la {pret}',
    exemple: 'Vezi exemple',
    banda: 'Ce fel de videoclipuri facem',
    rand1: ['Promo afacere', 'Trailer produs', 'Reclame Meta și TikTok', 'Explainer video', 'Lansare aplicație', 'Logo animat'],
    rand2: ['Reels și Shorts', 'Video pentru website', 'Prezentare servicii', 'Teaser eveniment', 'Video SaaS', 'Oferte și campanii'],
  },

  beneficii: {
    titlu: 'De ce să cumperi un videoclip de la noi?',
    lista: [
      { titlu: 'Gata în maximum 48 de ore', text: 'Comanzi azi, iar în cel mult două zile ai videoclipul. Nu aștepți săptămâni după o agenție.' },
      { titlu: 'De la {pret}, preț fix', text: 'Știi exact cât plătești înainte să comanzi. Fără filmări, fără actori, fără costuri ascunse.' },
      { titlu: 'Făcut pentru afacerea ta', text: 'Logo-ul, culorile și oferta ta, animate de la zero. Nu un șablon în care schimbăm doar numele.' },
      { titlu: 'Gata de pus în reclame', text: 'Îl primești în formatele pentru Facebook, Instagram, TikTok, YouTube și site. Doar îl încarci.' },
    ],
  },

  exemple: {
    titlu: 'Exemple de videoclipuri făcute de noi',
    lead: 'Videoclipuri făcute de echipa Inovex pentru clienții noștri. Al tău va fi construit pe brandul și oferta ta. Apasă pe difuzor pentru sunet.',
    /** in ordinea din MOTION_PORTFOLIO */
    titluri: ['Reclama video', 'Video de prezentare', '2015 vs 2026', 'Bonul'],
    video: {
      eticheta: 'Videoclip: {titlu}',
      porneste: 'Porneste sunetul pentru {titlu}',
      opreste: 'Opreste sunetul pentru {titlu}',
    },
  },

  /** „1 videoclip”, „3 videoclipuri” */
  eticheta: { unu: '1 videoclip', mai: '{n} videoclipuri' },

  comanda: {
    titlu: 'Configurează-ți videoclipul',
    lead: 'Alege câte videoclipuri vrei, spune-ne despre ce sunt și atașează materialele tale. Cu cât comanzi mai multe, cu atât scade prețul pe fiecare, până la -50%.',
    pas1: 'Câte videoclipuri vrei?',
    grup: 'Număr de videoclipuri',
    celMaiAles: 'Cel mai ales',
    perVideo: '{pret} / videoclip',
    unSingur: 'Un singur videoclip',
    economisesti: ' · economisești {suma}',
    maiMulte: 'Mai multe videoclipuri',
    panaLa: 'până la ',
    maiMulteDetalii: 'Cu cât comanzi mai multe, cu atât crește reducerea',
    numar: 'Număr de videoclipuri',
    minus: 'Mai puține videoclipuri',
    plus: 'Mai multe videoclipuri',
    pas2: 'Despre ce este videoclipul?',
    descriere: 'Descrierea videoclipului',
    descriereIndiciu:
      'Ce promovezi, cui te adresezi, ce mesaj vrei să rămână și unde vei folosi videoclipul (site, reclame, social media). Pentru mai multe videoclipuri, descrie-l pe fiecare.',
    descriereEroare: 'Spune-ne în câteva propoziții despre ce este videoclipul.',
    link: 'Site sau pagina de social media',
    linkIndiciu: 'https://firma-ta.ro',
    materiale: 'Materiale: logo, imagini, texte',
    alege: 'Alege fișierele',
    trage: ' sau trage-le aici',
    notaFisiere: 'Imagini, PDF, AI, PSD, ZIP, video · maximum {n} fișiere, {mb} MB fiecare',
    fisierTip: '"{nume}" nu este un tip de fișier acceptat.',
    fisierMare: '"{nume}" depășește {mb} MB.',
    fisiereMax: 'Poți atașa cel mult {n} fișiere.',
    elimina: 'Elimină {nume}',
    optional: '(opțional)',
    sumarTitlu: 'Ce primești pentru fiecare videoclip',
    inclus: [
      'Videoclip de până la 60 de secunde',
      'Scenariu și storyboard realizate de noi',
      'Animație în identitatea vizuală a brandului tău',
      'Muzică și efecte sonore cu licență comercială',
      'Formate 16:9, 9:16 și 1:1 pentru toate platformele',
      '2 runde de revizii incluse',
      'Livrare în maximum 48 de ore',
      'Factură emisă automat în SPV (e-Factura)',
    ],
    pas3: 'Datele tale de contact',
    nume: 'Nume complet',
    numeIndiciu: 'Ion Popescu',
    numeEroare: 'Introdu numele tău.',
    email: 'Email',
    emailIndiciu: 'ion@firma.ro',
    emailEroare: 'Introdu o adresă de email validă.',
    telefon: 'Telefon',
    telefonIndiciu: '07xx xxx xxx',
    telefonEroare: 'Introdu un număr de telefon valid.',
    total: 'Total de plată',
    seIncarca: 'Se încarcă fișierele...',
    spre: 'Te ducem la plată...',
    comandaUnul: 'Comandă videoclipul',
    comandaMai: 'Comandă videoclipurile',
    securizat: 'Plată securizată cu cardul, prin Stripe',
    factura: 'Factura se emite automat și ajunge în SPV (e-Factura).',
    acord: 'Prin trimiterea comenzii ești de acord cu',
    politica: 'Politica de confidențialitate',
    eroare: 'Nu am putut porni plata. Încearcă din nou.',
    eroareFisiere: 'Nu am putut încărca fișierele. Încearcă din nou.',
    eroareFisier: 'Nu am putut încărca „{nume}”. Încearcă din nou.',
  },

  lipit: { tare: 'Reclamă video animată, gata în 48 de ore.', dela: 'De la {pret}.', buton: 'Comandă acum' },

  intrebari: [
    {
      q: 'Ce se întâmplă după ce plătesc?',
      a: 'Primești confirmarea pe email și ne apucăm imediat de lucru, pe baza descrierii și a materialelor trimise la comandă. În maximum 48 de ore ai videoclipul. Dacă avem nevoie de lămuriri, te contactăm noi.',
    },
    {
      q: 'Ce trebuie să vă trimit?',
      a: 'În formularul de comandă ne spui pe scurt despre ce este videoclipul și atașezi logo-ul, imagini sau alte materiale de brand. Dacă ai deja texte sau capturi de ecran, ne ajută, dar nu sunt obligatorii.',
    },
    {
      q: 'Cât durează până primesc videoclipul?',
      a: 'Maximum 48 de ore de la plată. Termenul curge din momentul în care avem comanda plătită, cu descrierea și materialele tale.',
    },
    {
      q: 'Pot cere modificări?',
      a: 'Da. Reviziile incluse în preț acoperă ajustări de text, ritm, culori și sunet. Un concept complet nou se discută separat.',
    },
    {
      q: 'De ce e mai ieftin dacă iau mai multe videoclipuri?',
      a: 'Cu cât comanzi mai multe, cu atât scade prețul pe fiecare: reducerea pornește de la 20% la două videoclipuri și ajunge până la 50%. Fiecare videoclip poate fi despre alt produs, alt serviciu sau altă campanie.',
    },
    {
      q: 'Primesc factură?',
      a: 'Da. La plată completezi datele firmei și codul fiscal, iar factura se emite automat și se transmite în SPV (e-Factura).',
    },
    {
      q: 'Am nevoie de un video mai lung sau de un proiect mai complex. Se poate?',
      a: 'Sigur. Pachetele de pe pagină acoperă cele mai frecvente cereri. Pentru videoclipuri mai lungi, serii de clipuri sau animație 3D, scrie-ne și îți facem o ofertă personalizată.',
    },
  ],

  multumim: {
    meta: 'Comandă confirmată - Video Motion Design',
    titluOk: 'Plata a fost confirmată. Mulțumim!',
    titluEroare: 'Nu am putut confirma plata',
    textOk: 'Am primit brief-ul și materialele tale și ne apucăm de videoclip. Dacă avem nevoie de lămuriri, te contactăm în maximum 24 de ore.',
    trimisa: 'Confirmarea a fost trimisă la',
    comanda: 'Comanda',
    total: 'Total plătit',
    livrare: 'Livrare',
    livrareValoare: 'În maximum 48 de ore',
    acasa: 'Înapoi la prima pagină',
    portofoliu: 'Vezi portofoliul',
    textEroare: 'Dacă ai finalizat plata, vei primi confirmarea pe email în câteva minute. Dacă nu, poți relua comanda sau ne poți scrie direct.',
    reia: 'Reia comanda',
    contact: 'Contactează-ne',
  },

  /** pe server: produsul din Stripe Checkout si erorile rutelor de plata */
  stripe: {
    produs: 'Video Motion Design - {pachet}',
    descriere: 'Scenariu, animatie, muzica si formate pentru toate platformele. Realizat de Inovex.',
  },
  erori: {
    preaMulte: 'Prea multe cereri. Incearca din nou mai tarziu.',
    indisponibil: 'Plata online nu este disponibila momentan. Te rugam sa ne contactezi.',
    dateInvalide: 'Date invalide. Verifica formularul.',
    numarInvalid: 'Numar de videoclipuri invalid.',
    plata: 'Nu am putut porni plata. Incearca din nou.',
    fisiere: 'Fisiere invalide.',
    tipFisier: 'Tip de fisier nepermis: {nume}',
    incarcare: 'Nu am putut pregati incarcarea fisierelor.',
  },
};

export type TextMotion = typeof ro;

const en: TextMotion = {
  meta: {
    titlu: 'Animated promo videos for businesses - ready in 48 hours',
    descriere:
      'Animated videos (motion design) to promote your business: video ads, promo clips and trailers for your website and social media. From {pret}, delivered within 48 hours, order online.',
    ogDescriere: 'Video ads, promo clips and animated trailers for your business. From {pret}, ready within 48 hours.',
    serviciu: 'Motion design videos',
    serviciuDescriere: 'Motion design videos to promote businesses: promo clips, trailers and animated ads for websites and social media.',
    firimituri: ['Home', 'Motion design videos'],
  },

  hero: {
    navigare: 'Breadcrumb',
    acasa: 'Home',
    pagina: 'Motion design videos',
    titlu: 'An animated video ad for your business, ready in 48 hours',
    lead: 'Tell us what you sell and we’ll create an animated video with your copy, colours and logo. Use it straight away in Facebook, Instagram and TikTok ads or on your website. No filming, no actors, from {pret}.',
    comanda: 'Order from {pret}',
    exemple: 'See examples',
    banda: 'The kinds of videos we make',
    rand1: ['Business promo', 'Product trailer', 'Meta & TikTok ads', 'Explainer video', 'App launch', 'Animated logo'],
    rand2: ['Reels & Shorts', 'Website video', 'Service showcase', 'Event teaser', 'SaaS video', 'Offers & campaigns'],
  },

  beneficii: {
    titlu: 'Why buy a video from us?',
    lista: [
      { titlu: 'Ready within 48 hours', text: 'Order today and have your video within two days. No waiting weeks for an agency.' },
      { titlu: 'From {pret}, fixed price', text: 'You know exactly what you’ll pay before you order. No filming, no actors, no hidden costs.' },
      { titlu: 'Made for your business', text: 'Your logo, colours and offer, animated from scratch. Not a template where we just swap the name.' },
      { titlu: 'Ready for your ads', text: 'You get it in the formats for Facebook, Instagram, TikTok, YouTube and your website. Just upload it.' },
    ],
  },

  exemple: {
    titlu: 'Examples of videos we’ve made',
    lead: 'Videos made by the Inovex team for our clients. Yours will be built around your brand and your offer. Tap the speaker for sound.',
    titluri: ['Video ad', 'Presentation video', '2015 vs 2026', 'The receipt'],
    video: {
      eticheta: 'Video: {titlu}',
      porneste: 'Turn on sound for {titlu}',
      opreste: 'Turn off sound for {titlu}',
    },
  },

  eticheta: { unu: '1 video', mai: '{n} videos' },

  comanda: {
    titlu: 'Configure your video',
    lead: 'Choose how many videos you want, tell us what they’re about and attach your materials. The more you order, the lower the price of each one, down to -50%.',
    pas1: 'How many videos do you want?',
    grup: 'Number of videos',
    celMaiAles: 'Most popular',
    perVideo: '{pret} / video',
    unSingur: 'A single video',
    economisesti: ' · you save {suma}',
    maiMulte: 'More videos',
    panaLa: 'up to ',
    maiMulteDetalii: 'The more you order, the bigger the discount',
    numar: 'Number of videos',
    minus: 'Fewer videos',
    plus: 'More videos',
    pas2: 'What is the video about?',
    descriere: 'Video description',
    descriereIndiciu:
      'What you’re promoting, who it’s for, the message people should remember and where you’ll use the video (website, ads, social media). For several videos, describe each one.',
    descriereEroare: 'Tell us in a few sentences what the video is about.',
    link: 'Website or social media page',
    linkIndiciu: 'https://your-company.com',
    materiale: 'Materials: logo, images, copy',
    alege: 'Choose files',
    trage: ' or drag them here',
    notaFisiere: 'Images, PDF, AI, PSD, ZIP, video · up to {n} files, {mb} MB each',
    fisierTip: '“{nume}” is not an accepted file type.',
    fisierMare: '“{nume}” is larger than {mb} MB.',
    fisiereMax: 'You can attach up to {n} files.',
    elimina: 'Remove {nume}',
    optional: '(optional)',
    sumarTitlu: 'What you get with each video',
    inclus: [
      'A video of up to 60 seconds',
      'Script and storyboard written by us',
      'Animation in your brand’s visual identity',
      'Music and sound effects with a commercial licence',
      '16:9, 9:16 and 1:1 formats for every platform',
      '2 rounds of revisions included',
      'Delivery within 48 hours',
      'Invoice for your order',
    ],
    pas3: 'Your contact details',
    nume: 'Full name',
    numeIndiciu: 'John Smith',
    numeEroare: 'Please enter your name.',
    email: 'Email',
    emailIndiciu: 'john@company.com',
    emailEroare: 'Please enter a valid email address.',
    telefon: 'Phone',
    telefonIndiciu: '+44 7700 900000',
    telefonEroare: 'Please enter a valid phone number.',
    total: 'Total to pay',
    seIncarca: 'Uploading files...',
    spre: 'Taking you to payment...',
    comandaUnul: 'Continue to payment',
    comandaMai: 'Continue to payment',
    securizat: 'Secure card payment via Stripe',
    factura: 'You can add your company details and VAT number at checkout, for the invoice.',
    acord: 'To learn how we process your data, see our',
    politica: 'Privacy policy',
    eroare: 'We couldn’t start the payment. Please try again.',
    eroareFisiere: 'We couldn’t upload the files. Please try again.',
    eroareFisier: 'We couldn’t upload “{nume}”. Please try again.',
  },

  lipit: { tare: 'An animated video ad, ready in 48 hours.', dela: 'From {pret}.', buton: 'Order now' },

  intrebari: [
    {
      q: 'What happens after I pay?',
      a: 'You receive a confirmation by email and we start work straight away, based on the description and materials you sent with your order. You’ll have your video within 48 hours. If we need any clarification, we’ll get in touch.',
    },
    {
      q: 'What do I need to send you?',
      a: 'In the order form, tell us briefly what the video is about and attach your logo, images or other brand materials. If you already have copy or screenshots, they help, but they’re not required.',
    },
    {
      q: 'How long until I receive the video?',
      a: 'Within 48 hours of payment. The clock starts once we have your paid order, with your description and materials.',
    },
    {
      q: 'Can I ask for changes?',
      a: 'Yes. The revisions included in the price cover adjustments to text, pacing, colours and sound. A completely new concept is discussed separately.',
    },
    {
      q: 'Why is it cheaper if I order more videos?',
      a: 'The more you order, the lower the price of each video: the discount starts at 20% for two videos and goes up to 50%. Each video can be about a different product, service or campaign.',
    },
    {
      q: 'Do I get an invoice?',
      a: 'Yes. At checkout you can enter your company details and VAT number, and you’ll receive an invoice for your order.',
    },
    {
      q: 'I need a longer video or a more complex project. Is that possible?',
      a: 'Of course. The packages on this page cover the most common requests. For longer videos, video series or 3D animation, write to us and we’ll send you a tailored quote.',
    },
  ],

  multumim: {
    meta: 'Order confirmed - Motion design video',
    titluOk: 'Payment confirmed. Thank you!',
    titluEroare: 'We couldn’t confirm the payment',
    textOk: 'We’ve received your brief and materials and we’re starting on your video. If we need any clarification, we’ll contact you within 24 hours.',
    trimisa: 'A confirmation has been sent to',
    comanda: 'Order',
    total: 'Total paid',
    livrare: 'Delivery',
    livrareValoare: 'Within 48 hours',
    acasa: 'Back to the home page',
    portofoliu: 'See our portfolio',
    textEroare: 'If you completed the payment, you’ll receive a confirmation by email within a few minutes. If not, you can place the order again or write to us directly.',
    reia: 'Place the order again',
    contact: 'Contact us',
  },

  stripe: {
    produs: 'Motion design video - {pachet}',
    descriere: 'Script, animation, music and formats for every platform. Made by Inovex.',
  },
  erori: {
    preaMulte: 'Too many requests. Please try again later.',
    indisponibil: 'Online payment isn’t available right now. Please contact us.',
    dateInvalide: 'Invalid details. Please check the form.',
    numarInvalid: 'Invalid number of videos.',
    plata: 'We couldn’t start the payment. Please try again.',
    fisiere: 'Invalid files.',
    tipFisier: 'File type not allowed: {nume}',
    incarcare: 'We couldn’t prepare the file upload.',
  },
};

const de: TextMotion = {
  meta: {
    titlu: 'Animierte Werbevideos für Unternehmen - fertig in 48 Stunden',
    descriere:
      'Animierte Videos (Motion Design) für die Werbung Ihres Unternehmens: Werbevideos, Promo-Clips und Trailer für Website und Social Media. Ab {pret}, Lieferung in maximal 48 Stunden, online bestellen.',
    ogDescriere: 'Werbevideos, Promo-Clips und animierte Trailer für Ihr Unternehmen. Ab {pret}, fertig in maximal 48 Stunden.',
    serviciu: 'Motion-Design-Videos',
    serviciuDescriere: 'Motion-Design-Videos für die Unternehmenswerbung: Promo-Clips, Trailer und animierte Anzeigen für Website und Social Media.',
    firimituri: ['Startseite', 'Motion-Design-Videos'],
  },

  hero: {
    navigare: 'Brotkrumennavigation',
    acasa: 'Startseite',
    pagina: 'Motion-Design-Videos',
    titlu: 'Ein animiertes Werbevideo für Ihr Unternehmen, fertig in 48 Stunden',
    lead: 'Sie sagen uns, was Sie verkaufen, und wir erstellen ein animiertes Video mit Ihren Texten, Farben und Ihrem Logo. Setzen Sie es direkt in Anzeigen auf Facebook, Instagram und TikTok oder auf Ihrer Website ein. Ohne Dreh, ohne Schauspieler, ab {pret}.',
    comanda: 'Bestellen ab {pret}',
    exemple: 'Beispiele ansehen',
    banda: 'Welche Videos wir erstellen',
    rand1: ['Unternehmensvideo', 'Produkttrailer', 'Meta- und TikTok-Anzeigen', 'Erklärvideo', 'App-Launch', 'Animiertes Logo'],
    rand2: ['Reels und Shorts', 'Video für die Website', 'Leistungspräsentation', 'Event-Teaser', 'SaaS-Video', 'Angebote und Kampagnen'],
  },

  beneficii: {
    titlu: 'Warum ein Video bei uns kaufen?',
    lista: [
      { titlu: 'Fertig in maximal 48 Stunden', text: 'Sie bestellen heute und haben Ihr Video spätestens in zwei Tagen. Kein wochenlanges Warten auf eine Agentur.' },
      { titlu: 'Ab {pret}, Festpreis', text: 'Sie wissen vor der Bestellung genau, was Sie zahlen. Ohne Dreh, ohne Schauspieler, ohne versteckte Kosten.' },
      { titlu: 'Für Ihr Unternehmen gemacht', text: 'Ihr Logo, Ihre Farben und Ihr Angebot, von Grund auf animiert. Keine Vorlage, in der wir nur den Namen austauschen.' },
      { titlu: 'Bereit für Ihre Anzeigen', text: 'Sie erhalten es in den Formaten für Facebook, Instagram, TikTok, YouTube und Ihre Website. Einfach hochladen.' },
    ],
  },

  exemple: {
    titlu: 'Beispiele unserer Videos',
    lead: 'Videos, die das Inovex-Team für unsere Kunden erstellt hat. Ihres wird auf Ihre Marke und Ihr Angebot zugeschnitten. Tippen Sie auf den Lautsprecher, um den Ton einzuschalten.',
    titluri: ['Werbevideo', 'Präsentationsvideo', '2015 vs. 2026', 'Der Kassenbon'],
    video: {
      eticheta: 'Video: {titlu}',
      porneste: 'Ton einschalten für {titlu}',
      opreste: 'Ton ausschalten für {titlu}',
    },
  },

  eticheta: { unu: '1 Video', mai: '{n} Videos' },

  comanda: {
    titlu: 'Konfigurieren Sie Ihr Video',
    lead: 'Wählen Sie, wie viele Videos Sie möchten, beschreiben Sie, worum es geht, und fügen Sie Ihre Materialien hinzu. Je mehr Sie bestellen, desto günstiger wird jedes Video, bis zu -50 %.',
    pas1: 'Wie viele Videos möchten Sie?',
    grup: 'Anzahl der Videos',
    celMaiAles: 'Am beliebtesten',
    perVideo: '{pret} / Video',
    unSingur: 'Ein einzelnes Video',
    economisesti: ' · Sie sparen {suma}',
    maiMulte: 'Mehr Videos',
    panaLa: 'bis zu ',
    maiMulteDetalii: 'Je mehr Sie bestellen, desto höher der Rabatt',
    numar: 'Anzahl der Videos',
    minus: 'Weniger Videos',
    plus: 'Mehr Videos',
    pas2: 'Worum geht es in dem Video?',
    descriere: 'Beschreibung des Videos',
    descriereIndiciu:
      'Was Sie bewerben, an wen Sie sich richten, welche Botschaft hängen bleiben soll und wo Sie das Video einsetzen (Website, Anzeigen, Social Media). Bei mehreren Videos beschreiben Sie bitte jedes einzeln.',
    descriereEroare: 'Beschreiben Sie in ein paar Sätzen, worum es in dem Video geht.',
    link: 'Website oder Social-Media-Seite',
    linkIndiciu: 'https://ihre-firma.de',
    materiale: 'Materialien: Logo, Bilder, Texte',
    alege: 'Dateien auswählen',
    trage: ' oder hierher ziehen',
    notaFisiere: 'Bilder, PDF, AI, PSD, ZIP, Video · maximal {n} Dateien, je {mb} MB',
    fisierTip: '„{nume}“ ist kein zulässiger Dateityp.',
    fisierMare: '„{nume}“ ist größer als {mb} MB.',
    fisiereMax: 'Sie können maximal {n} Dateien anhängen.',
    elimina: '{nume} entfernen',
    optional: '(optional)',
    sumarTitlu: 'Das erhalten Sie für jedes Video',
    inclus: [
      'Video mit bis zu 60 Sekunden',
      'Drehbuch und Storyboard von uns',
      'Animation im Erscheinungsbild Ihrer Marke',
      'Musik und Soundeffekte mit kommerzieller Lizenz',
      'Formate 16:9, 9:16 und 1:1 für alle Plattformen',
      '2 Korrekturschleifen inklusive',
      'Lieferung in maximal 48 Stunden',
      'Rechnung zu Ihrer Bestellung',
    ],
    pas3: 'Ihre Kontaktdaten',
    nume: 'Vollständiger Name',
    numeIndiciu: 'Max Mustermann',
    numeEroare: 'Bitte geben Sie Ihren Namen ein.',
    email: 'E-Mail',
    emailIndiciu: 'max@firma.de',
    emailEroare: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    telefon: 'Telefon',
    telefonIndiciu: '+49 151 23456789',
    telefonEroare: 'Bitte geben Sie eine gültige Telefonnummer ein.',
    total: 'Gesamtbetrag',
    seIncarca: 'Dateien werden hochgeladen...',
    spre: 'Weiterleitung zur Zahlung...',
    comandaUnul: 'Weiter zur Zahlung',
    comandaMai: 'Weiter zur Zahlung',
    securizat: 'Sichere Kartenzahlung über Stripe',
    factura: 'Firmendaten und USt-IdNr. für die Rechnung können Sie im Bezahlvorgang angeben.',
    acord: 'Wie wir Ihre Daten verarbeiten, erfahren Sie in unserer',
    politica: 'Datenschutzerklärung',
    eroare: 'Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.',
    eroareFisiere: 'Die Dateien konnten nicht hochgeladen werden. Bitte versuchen Sie es erneut.',
    eroareFisier: '„{nume}“ konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.',
  },

  lipit: { tare: 'Animiertes Werbevideo, fertig in 48 Stunden.', dela: 'Ab {pret}.', buton: 'Jetzt bestellen' },

  intrebari: [
    {
      q: 'Was passiert nach der Zahlung?',
      a: 'Sie erhalten eine Bestätigung per E-Mail, und wir legen sofort los, auf Grundlage Ihrer Beschreibung und der Materialien aus der Bestellung. Spätestens nach 48 Stunden haben Sie Ihr Video. Wenn wir Rückfragen haben, melden wir uns bei Ihnen.',
    },
    {
      q: 'Was muss ich Ihnen schicken?',
      a: 'Im Bestellformular beschreiben Sie kurz, worum es in dem Video geht, und fügen Ihr Logo, Bilder oder andere Markenmaterialien hinzu. Vorhandene Texte oder Screenshots helfen uns, sind aber nicht erforderlich.',
    },
    {
      q: 'Wie lange dauert es, bis ich das Video bekomme?',
      a: 'Maximal 48 Stunden ab Zahlung. Die Frist beginnt, sobald uns Ihre bezahlte Bestellung mit Beschreibung und Materialien vorliegt.',
    },
    {
      q: 'Kann ich Änderungen verlangen?',
      a: 'Ja. Die im Preis enthaltenen Korrekturschleifen umfassen Anpassungen an Text, Tempo, Farben und Ton. Ein komplett neues Konzept besprechen wir gesondert.',
    },
    {
      q: 'Warum ist es günstiger, wenn ich mehrere Videos bestelle?',
      a: 'Je mehr Sie bestellen, desto niedriger ist der Preis pro Video: Der Rabatt beginnt bei 20 % für zwei Videos und steigt auf bis zu 50 %. Jedes Video kann ein anderes Produkt, eine andere Leistung oder eine andere Kampagne zeigen.',
    },
    {
      q: 'Bekomme ich eine Rechnung?',
      a: 'Ja. Im Bezahlvorgang können Sie Ihre Firmendaten und Ihre USt-IdNr. angeben, und Sie erhalten eine Rechnung zu Ihrer Bestellung.',
    },
    {
      q: 'Ich brauche ein längeres Video oder ein komplexeres Projekt. Geht das?',
      a: 'Natürlich. Die Pakete auf dieser Seite decken die häufigsten Anfragen ab. Für längere Videos, Videoserien oder 3D-Animation schreiben Sie uns, und wir erstellen Ihnen ein individuelles Angebot.',
    },
  ],

  multumim: {
    meta: 'Bestellung bestätigt - Motion-Design-Video',
    titluOk: 'Zahlung bestätigt. Vielen Dank!',
    titluEroare: 'Wir konnten die Zahlung nicht bestätigen',
    textOk: 'Wir haben Ihr Briefing und Ihre Materialien erhalten und beginnen mit Ihrem Video. Wenn wir Rückfragen haben, melden wir uns innerhalb von 24 Stunden.',
    trimisa: 'Die Bestätigung wurde gesendet an',
    comanda: 'Bestellung',
    total: 'Bezahlter Betrag',
    livrare: 'Lieferung',
    livrareValoare: 'In maximal 48 Stunden',
    acasa: 'Zurück zur Startseite',
    portofoliu: 'Referenzen ansehen',
    textEroare: 'Wenn Sie die Zahlung abgeschlossen haben, erhalten Sie in wenigen Minuten eine Bestätigung per E-Mail. Andernfalls können Sie erneut bestellen oder uns direkt schreiben.',
    reia: 'Erneut bestellen',
    contact: 'Kontakt aufnehmen',
  },

  stripe: {
    produs: 'Motion-Design-Video - {pachet}',
    descriere: 'Drehbuch, Animation, Musik und Formate für alle Plattformen. Erstellt von Inovex.',
  },
  erori: {
    preaMulte: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
    indisponibil: 'Die Online-Zahlung ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns.',
    dateInvalide: 'Ungültige Angaben. Bitte prüfen Sie das Formular.',
    numarInvalid: 'Ungültige Anzahl an Videos.',
    plata: 'Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.',
    fisiere: 'Ungültige Dateien.',
    tipFisier: 'Dateityp nicht zulässig: {nume}',
    incarcare: 'Der Upload der Dateien konnte nicht vorbereitet werden.',
  },
};

const fr: TextMotion = {
  meta: {
    titlu: 'Vidéos promotionnelles animées pour entreprises - prêtes en 48 heures',
    descriere:
      'Vidéos animées (motion design) pour promouvoir votre entreprise : publicités vidéo, clips promo et bandes-annonces pour votre site et les réseaux sociaux. Dès {pret}, livraison en 48 heures maximum, commande en ligne.',
    ogDescriere: 'Publicités vidéo, clips promo et bandes-annonces animées pour votre entreprise. Dès {pret}, prêtes en 48 heures maximum.',
    serviciu: 'Vidéos en motion design',
    serviciuDescriere:
      'Vidéos en motion design pour promouvoir les entreprises : clips promo, bandes-annonces et publicités animées pour sites web et réseaux sociaux.',
    firimituri: ['Accueil', 'Vidéos en motion design'],
  },

  hero: {
    navigare: 'Fil d’Ariane',
    acasa: 'Accueil',
    pagina: 'Vidéos en motion design',
    titlu: 'Une publicité vidéo animée pour votre entreprise, prête en 48 heures',
    lead: 'Dites-nous ce que vous vendez, et nous créons une vidéo animée avec vos textes, vos couleurs et votre logo. Utilisez-la directement dans vos publicités Facebook, Instagram et TikTok ou sur votre site. Sans tournage, sans acteurs, à partir de {pret}.',
    comanda: 'Commander dès {pret}',
    exemple: 'Voir des exemples',
    banda: 'Les types de vidéos que nous réalisons',
    rand1: ['Promo d’entreprise', 'Bande-annonce produit', 'Publicités Meta et TikTok', 'Vidéo explicative', 'Lancement d’appli', 'Logo animé'],
    rand2: ['Reels et Shorts', 'Vidéo pour site web', 'Présentation de services', 'Teaser d’événement', 'Vidéo SaaS', 'Offres et campagnes'],
  },

  beneficii: {
    titlu: 'Pourquoi commander votre vidéo chez nous ?',
    lista: [
      { titlu: 'Prête en 48 heures maximum', text: 'Vous commandez aujourd’hui, et votre vidéo est prête en deux jours au plus. Inutile d’attendre des semaines une agence.' },
      { titlu: 'Dès {pret}, prix fixe', text: 'Vous savez exactement combien vous payez avant de commander. Sans tournage, sans acteurs, sans frais cachés.' },
      { titlu: 'Conçue pour votre entreprise', text: 'Votre logo, vos couleurs et votre offre, animés de zéro. Pas un modèle dont on change simplement le nom.' },
      { titlu: 'Prête pour vos publicités', text: 'Vous la recevez aux formats Facebook, Instagram, TikTok, YouTube et site web. Il ne vous reste qu’à la mettre en ligne.' },
    ],
  },

  exemple: {
    titlu: 'Exemples de vidéos que nous avons réalisées',
    lead: 'Des vidéos réalisées par l’équipe Inovex pour nos clients. La vôtre sera construite autour de votre marque et de votre offre. Touchez le haut-parleur pour activer le son.',
    titluri: ['Publicité vidéo', 'Vidéo de présentation', '2015 vs 2026', 'Le ticket de caisse'],
    video: {
      eticheta: 'Vidéo : {titlu}',
      porneste: 'Activer le son de {titlu}',
      opreste: 'Couper le son de {titlu}',
    },
  },

  eticheta: { unu: '1 vidéo', mai: '{n} vidéos' },

  comanda: {
    titlu: 'Configurez votre vidéo',
    lead: 'Choisissez le nombre de vidéos, dites-nous de quoi elles parlent et joignez vos fichiers. Plus vous en commandez, plus le prix de chaque vidéo baisse, jusqu’à -50 %.',
    pas1: 'Combien de vidéos souhaitez-vous ?',
    grup: 'Nombre de vidéos',
    celMaiAles: 'Le plus choisi',
    perVideo: '{pret} / vidéo',
    unSingur: 'Une seule vidéo',
    economisesti: ' · vous économisez {suma}',
    maiMulte: 'Plus de vidéos',
    panaLa: 'jusqu’à ',
    maiMulteDetalii: 'Plus vous en commandez, plus la remise augmente',
    numar: 'Nombre de vidéos',
    minus: 'Moins de vidéos',
    plus: 'Plus de vidéos',
    pas2: 'De quoi parle la vidéo ?',
    descriere: 'Description de la vidéo',
    descriereIndiciu:
      'Ce que vous promouvez, à qui vous vous adressez, le message à retenir et où vous utiliserez la vidéo (site, publicités, réseaux sociaux). Pour plusieurs vidéos, décrivez chacune d’elles.',
    descriereEroare: 'Dites-nous en quelques phrases de quoi parle la vidéo.',
    link: 'Site web ou page de réseau social',
    linkIndiciu: 'https://votre-entreprise.fr',
    materiale: 'Fichiers : logo, images, textes',
    alege: 'Choisissez les fichiers',
    trage: ' ou glissez-les ici',
    notaFisiere: 'Images, PDF, AI, PSD, ZIP, vidéo · {n} fichiers maximum, {mb} Mo chacun',
    fisierTip: '« {nume} » n’est pas un type de fichier accepté.',
    fisierMare: '« {nume} » dépasse {mb} Mo.',
    fisiereMax: 'Vous pouvez joindre {n} fichiers au maximum.',
    elimina: 'Retirer {nume}',
    optional: '(facultatif)',
    sumarTitlu: 'Ce que vous recevez pour chaque vidéo',
    inclus: [
      'Vidéo de 60 secondes maximum',
      'Scénario et storyboard réalisés par nos soins',
      'Animation aux couleurs de votre marque',
      'Musique et effets sonores sous licence commerciale',
      'Formats 16:9, 9:16 et 1:1 pour toutes les plateformes',
      '2 séries de retouches incluses',
      'Livraison en 48 heures maximum',
      'Facture pour votre commande',
    ],
    pas3: 'Vos coordonnées',
    nume: 'Nom complet',
    numeIndiciu: 'Marie Dupont',
    numeEroare: 'Veuillez saisir votre nom.',
    email: 'E-mail',
    emailIndiciu: 'marie@entreprise.fr',
    emailEroare: 'Veuillez saisir une adresse e-mail valide.',
    telefon: 'Téléphone',
    telefonIndiciu: '+33 6 12 34 56 78',
    telefonEroare: 'Veuillez saisir un numéro de téléphone valide.',
    total: 'Total à payer',
    seIncarca: 'Envoi des fichiers...',
    spre: 'Redirection vers le paiement...',
    comandaUnul: 'Passer au paiement',
    comandaMai: 'Passer au paiement',
    securizat: 'Paiement sécurisé par carte, via Stripe',
    factura: 'Vous pourrez indiquer les coordonnées de votre entreprise et votre numéro de TVA lors du paiement, pour la facture.',
    acord: 'Pour savoir comment nous traitons vos données, consultez notre',
    politica: 'Politique de confidentialité',
    eroare: 'Nous n’avons pas pu lancer le paiement. Veuillez réessayer.',
    eroareFisiere: 'Nous n’avons pas pu envoyer les fichiers. Veuillez réessayer.',
    eroareFisier: 'Nous n’avons pas pu envoyer « {nume} ». Veuillez réessayer.',
  },

  lipit: { tare: 'Publicité vidéo animée, prête en 48 heures.', dela: 'Dès {pret}.', buton: 'Commander' },

  intrebari: [
    {
      q: 'Que se passe-t-il après le paiement ?',
      a: 'Vous recevez une confirmation par e-mail et nous nous mettons au travail immédiatement, à partir de la description et des fichiers envoyés avec la commande. Votre vidéo est prête en 48 heures maximum. Si nous avons besoin de précisions, nous vous contactons.',
    },
    {
      q: 'Que dois-je vous envoyer ?',
      a: 'Dans le formulaire de commande, décrivez brièvement le sujet de la vidéo et joignez votre logo, des images ou d’autres éléments de votre marque. Si vous avez déjà des textes ou des captures d’écran, ils nous aident, mais ils ne sont pas obligatoires.',
    },
    {
      q: 'Combien de temps faut-il pour recevoir la vidéo ?',
      a: '48 heures maximum après le paiement. Le délai commence dès que nous avons votre commande payée, avec la description et vos fichiers.',
    },
    {
      q: 'Puis-je demander des modifications ?',
      a: 'Oui. Les retouches incluses dans le prix couvrent les ajustements de texte, de rythme, de couleurs et de son. Un concept entièrement nouveau se discute à part.',
    },
    {
      q: 'Pourquoi est-ce moins cher si je commande plusieurs vidéos ?',
      a: 'Plus vous en commandez, plus le prix de chaque vidéo baisse : la remise commence à 20 % pour deux vidéos et va jusqu’à 50 %. Chaque vidéo peut porter sur un produit, un service ou une campagne différents.',
    },
    {
      q: 'Est-ce que je reçois une facture ?',
      a: 'Oui. Lors du paiement, vous pouvez indiquer les coordonnées de votre entreprise et votre numéro de TVA, et vous recevez une facture pour votre commande.',
    },
    {
      q: 'J’ai besoin d’une vidéo plus longue ou d’un projet plus complexe. Est-ce possible ?',
      a: 'Bien sûr. Les formules de cette page couvrent les demandes les plus fréquentes. Pour des vidéos plus longues, des séries de vidéos ou de l’animation 3D, écrivez-nous et nous vous ferons un devis sur mesure.',
    },
  ],

  multumim: {
    meta: 'Commande confirmée - Vidéo en motion design',
    titluOk: 'Paiement confirmé. Merci !',
    titluEroare: 'Nous n’avons pas pu confirmer le paiement',
    textOk: 'Nous avons bien reçu votre brief et vos fichiers, et nous commençons votre vidéo. Si nous avons besoin de précisions, nous vous contactons sous 24 heures.',
    trimisa: 'La confirmation a été envoyée à',
    comanda: 'Commande',
    total: 'Total payé',
    livrare: 'Livraison',
    livrareValoare: 'En 48 heures maximum',
    acasa: 'Retour à l’accueil',
    portofoliu: 'Voir nos réalisations',
    textEroare: 'Si vous avez finalisé le paiement, vous recevrez une confirmation par e-mail dans quelques minutes. Sinon, vous pouvez reprendre la commande ou nous écrire directement.',
    reia: 'Reprendre la commande',
    contact: 'Nous contacter',
  },

  stripe: {
    produs: 'Vidéo en motion design - {pachet}',
    descriere: 'Scénario, animation, musique et formats pour toutes les plateformes. Réalisé par Inovex.',
  },
  erori: {
    preaMulte: 'Trop de demandes. Veuillez réessayer plus tard.',
    indisponibil: 'Le paiement en ligne n’est pas disponible pour le moment. Veuillez nous contacter.',
    dateInvalide: 'Données invalides. Veuillez vérifier le formulaire.',
    numarInvalid: 'Nombre de vidéos invalide.',
    plata: 'Nous n’avons pas pu lancer le paiement. Veuillez réessayer.',
    fisiere: 'Fichiers invalides.',
    tipFisier: 'Type de fichier non autorisé : {nume}',
    incarcare: 'Nous n’avons pas pu préparer l’envoi des fichiers.',
  },
};

const TEXTE: Record<Limba, TextMotion> = { ro, en, de, fr };

export const textMotion = (lang: Limba): TextMotion => TEXTE[lang];

export { completeaza, etichetaVideo } from '@/lib/i18n/completeaza';
