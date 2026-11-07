import type { TextLegal } from './tipuri';

/* Paginile legale in romana: textul de pana acum (fara diacritice, pe paginile vechi), cu diacritice si
   cateva corecturi de forma. Romana e versiunea care se aplica; EN/DE/FR sunt traduceri ale ei. */

const COOKIE_GOOGLE = 'https://policies.google.com/privacy';
const COOKIE_TIKTOK = 'https://www.tiktok.com/legal/page/global/privacy-policy';
const COOKIE_LINKEDIN = 'https://www.linkedin.com/legal/cookie-policy';
const COOKIE_META = 'https://www.facebook.com/privacy/policies/cookies/';
const COOKIE_OPENAI = 'https://openai.com/policies/privacy-policy/';

export const ro: TextLegal = {
  ui: {
    acasa: 'Acasă',
    navigare: 'Cale de navigare',
    cuprins: 'Cuprins',
    sectiuni: '{n} secțiuni',
    actualizat: 'Ultima actualizare',
    ancora: 'sectiunea',
    capTabel: ['Nume cookie', 'Furnizor', 'Scop', 'Durată', 'Tip'],
    telefon: 'Telefon',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  confidentialitate: {
    meta: {
      titlu: 'Politica de confidențialitate',
      descriere:
        'Politica de confidențialitate și de prelucrare a datelor cu caracter personal a Inovex (VOID SFT GAMES SRL, CUI RO43474393), conform GDPR și legislației române. Află cum îți protejăm datele.',
    },
    titlu: 'Politica de confidențialitate',
    intro:
      'Confidențialitatea datelor tale este o prioritate pentru Inovex. Acest document explică transparent ce date colectăm, de ce și cum le protejăm, conform Regulamentului European GDPR.',
    actualizat: '7 noiembrie 2026',
    data: '2026-11-07',
    rezumat: {
      titlu: 'Rezumat: punctele cheie',
      randuri: [
        ['Operator', 'VOID SFT GAMES SRL (Inovex)'],
        ['Temei juridic principal', 'Contract, consimțământ, interes legitim'],
        ['Date colectate', 'Nume, email, telefon, date despre proiect'],
        ['Scopul principal', 'Prestarea serviciilor contractate'],
        ['Durata de păstrare', '2 ani (formulare), 5–10 ani (contracte)'],
        ['Transferuri internaționale', 'SUA (de exemplu Google, Vercel, Supabase, Meta, OpenAI), cu clauze contractuale standard (SCC)'],
        ['Autoritatea de supraveghere', 'ANSPDCP, [dataprotection.ro](https://www.dataprotection.ro)'],
        ['Contact GDPR', '[contact@inovex.ro](mailto:contact@inovex.ro)'],
      ],
      nota: 'Detaliile complete sunt în secțiunile de mai jos.',
    },
    sectiuni: [
      {
        scurt: 'Cine suntem și cum ne contactezi',
        titlu: 'Identitatea și datele de contact ale operatorului',
        continut: [
          { p: 'Operatorul de date cu caracter personal pentru site-ul inovex.ro și serviciile asociate este:' },
          {
            ul: [
              '**Denumire:** VOID SFT GAMES SRL',
              '**Denumire comercială:** Inovex',
              '**CUI:** RO43474393',
              '**Sediu social:** Târgu Jiu, județul Gorj, România',
              '**Email:** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Telefon:** [0750 456 096](tel:+40750456096)',
              '**Site:** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'Responsabilul cu protecția datelor (DPO) poate fi contactat la adresa de email [contact@inovex.ro](mailto:contact@inovex.ro), cu subiectul „GDPR – [solicitarea ta]”.',
          },
          {
            p: 'Vom răspunde oricărei solicitări legate de datele tale personale în maximum 30 (treizeci) de zile calendaristice de la primire, conform art. 12 din GDPR.',
          },
        ],
      },
      {
        scurt: 'Ce date colectăm și de unde',
        titlu: 'Categoriile de date cu caracter personal colectate',
        continut: [
          { p: 'Inovex colectează date cu caracter personal în următoarele contexte:' },
          { h3: '2.1. Date colectate prin formularele de pe site' },
          { p: 'Prin completarea formularelor de contact, de configurare a ofertei sau de solicitare a serviciilor, colectăm:' },
          {
            ul: [
              'Numele și prenumele (sau denumirea firmei)',
              'Adresa de email',
              'Numărul de telefon',
              'Informații despre proiectul sau serviciul dorit',
              'Datele completate în configuratoarele de servicii (industrie, tip de entitate, specificațiile proiectului) și fișierele pe care alegi să le atașezi (de exemplu, un plan sau o schiță a aplicației)',
            ],
          },
          { p: 'Aceste date sunt furnizate voluntar de tine și sunt necesare pentru a-ți putea răspunde și a-ți oferi serviciile solicitate.' },
          { h3: '2.2. Date colectate prin Marketplace' },
          { p: 'La achiziționarea unui produs din Marketplace-ul Inovex, colectăm:' },
          {
            ul: [
              'Numele și prenumele sau denumirea firmei',
              'Adresa de email, pentru trimiterea confirmării',
              'Datele de facturare (conform obligațiilor fiscale)',
            ],
          },
          { h3: '2.3. Date colectate prin secțiunea Învață gratuit' },
          { p: 'La descărcarea resurselor gratuite (PDF-uri, template-uri), colectăm:' },
          { ul: ['Prenumele', 'Adresa de email', 'Consimțământul GDPR bifat de tine'] },
          { h3: '2.4. Date colectate automat prin utilizarea site-ului' },
          { p: 'Prin simpla accesare a site-ului inovex.ro, sistemele noastre colectează automat anumite date tehnice:' },
          {
            ul: [
              'Adresa IP (anonimizată prin Google Analytics 4)',
              'Tipul și versiunea browserului',
              'Sistemul de operare',
              'Paginile vizitate și durata vizitei',
              'Sursa de proveniență (cum ai ajuns pe site)',
              'Dispozitivul folosit (desktop, mobil, tabletă)',
              'Țara din care accesezi site-ul (dedusă din adresa IP de furnizorul de găzduire, Vercel) și limba browserului, folosite doar ca să-ți afișăm site-ul în limba potrivită; nu le stocăm',
            ],
          },
          {
            p: 'Aceste date sunt colectate prin cookie-uri și instrumente de analiză web (Google Analytics 4, Google Tag Manager), descrise în detaliu în [Politica de cookies](/politica-cookies).',
          },
          { h3: '2.5. Date colectate în cadrul relației contractuale' },
          { p: 'Pentru clienții care contractează servicii Inovex, colectăm și:' },
          {
            ul: [
              'Datele de identificare ale persoanei fizice sau juridice',
              'Datele de facturare și plată',
              'Datele de acces la sistemele clientului (hosting, domeniu etc.), necesare pentru prestarea serviciilor contractate',
              'Corespondența prin email pe durata proiectului',
            ],
          },
          { h3: '2.6. Date pe care nu le colectăm' },
          {
            p: 'Inovex nu colectează și nu prelucrează categorii speciale de date cu caracter personal, conform art. 9 din GDPR (date privind originea rasială sau etnică, convingerile politice sau religioase, date genetice, biometrice, privind sănătatea, viața sexuală sau orientarea sexuală).',
          },
          { p: 'Nu colectăm date despre minori sub 16 ani. Dacă ești minor, te rugăm să nu completezi formularele de pe site fără acordul părinților.' },
        ],
      },
      {
        scurt: 'De ce prelucrăm datele tale',
        titlu: 'Scopurile și temeiurile juridice ale prelucrării',
        continut: [
          { p: 'Prelucrăm datele tale cu caracter personal în baza următoarelor temeiuri juridice, conform art. 6 din GDPR:' },
          { h3: '3.1. Executarea unui contract sau măsuri precontractuale (art. 6 alin. 1 lit. b GDPR)' },
          { p: 'Prelucrăm datele tale pentru:' },
          {
            ul: [
              'Răspunsul la solicitările de ofertă și consultanță',
              'Semnarea și executarea contractelor de servicii',
              'Facturarea serviciilor prestate',
              'Comunicarea pe durata proiectului',
              'Livrarea și predarea proiectelor finalizate',
            ],
          },
          { h3: '3.2. Consimțământul tău (art. 6 alin. 1 lit. a GDPR)' },
          { p: 'Cu consimțământul tău explicit, colectat prin bifarea casetei GDPR de pe formulare, prelucrăm datele tale pentru:' },
          {
            ul: [
              'Descărcarea resurselor gratuite din secțiunea Învață gratuit',
              'Primirea de informații despre serviciile Inovex',
              'Măsurarea traficului pe site (Google Analytics 4) și a campaniilor noastre publicitare (Google Ads, Meta, TikTok, LinkedIn, ChatGPT Ads), prin cookie-urile analitice și de marketing descrise în [Politica de cookies](/politica-cookies)',
            ],
          },
          {
            p: 'Consimțământul poate fi retras oricând, fără costuri, prin trimiterea unui email la [contact@inovex.ro](mailto:contact@inovex.ro) cu subiectul „Retragere consimțământ”. Retragerea consimțământului nu afectează legalitatea prelucrărilor efectuate anterior retragerii.',
          },
          { h3: '3.3. Interesul legitim al operatorului (art. 6 alin. 1 lit. f GDPR)' },
          { p: 'În baza interesului nostru legitim, prelucrăm date pentru:' },
          {
            ul: [
              'Îmbunătățirea serviciilor și a experienței pe site',
              'Securitatea site-ului și prevenirea fraudei',
              'Apărarea drepturilor noastre în cazul unui litigiu',
            ],
          },
          { h3: '3.4. Obligație legală (art. 6 alin. 1 lit. c GDPR)' },
          { p: 'Prelucrăm datele pentru îndeplinirea obligațiilor legale, inclusiv:' },
          {
            ul: [
              'Emiterea și arhivarea facturilor conform Codului fiscal',
              'Respectarea obligațiilor din Legea contabilității nr. 82/1991',
              'Răspunsul la solicitările autorităților competente',
            ],
          },
        ],
      },
      {
        scurt: 'Cu cine împărtășim datele tale',
        titlu: 'Destinatarii datelor cu caracter personal',
        continut: [
          { p: 'Nu vindem și nu comercializăm datele tale cu caracter personal niciunui terț. Datele pot fi accesate sau prelucrate de:' },
          { h3: '4.1. Furnizori de servicii tehnice (operatori împuterniciți)' },
          {
            ul: [
              '**Vercel Inc.** (SUA): infrastructura de hosting a site-ului inovex.ro, acoperită de clauzele contractuale standard (SCC) prevăzute de GDPR',
              '**Supabase Inc.** (SUA): baza de date a site-ului (mesajele din formulare, cererile de ofertă și evidența clienților) și stocarea fișierelor; acoperit de SCC',
              '**Stripe Payments Europe Ltd.** (Irlanda): procesarea plăților online cu cardul (de exemplu, comenzile Video Motion Design); Inovex nu primește și nu stochează datele cardului; datele pot ajunge la Stripe, Inc. (SUA), transfer acoperit de SCC',
              '**Google LLC** (SUA): Google Analytics 4 (date anonimizate), Google Tag Manager, Google Ads; acoperit de SCC',
              '**Meta Platforms Ireland Limited** (Irlanda): Meta Pixel, pentru măsurarea campaniilor Facebook și Instagram Ads; datele pot ajunge la Meta Platforms, Inc. (SUA), transfer acoperit de SCC',
              '**TikTok** (TikTok Pixel): măsurarea campaniilor TikTok Ads; datele pot ajunge în afara Spațiului Economic European, transfer acoperit de SCC',
              '**LinkedIn Ireland Unlimited Company** (Irlanda): LinkedIn Insight Tag, pentru măsurarea campaniilor LinkedIn Ads; datele pot ajunge la LinkedIn Corporation (SUA), transfer acoperit de SCC',
              '**OpenAI** (pixelul ChatGPT Ads): măsurarea campaniilor noastre publicitare din ChatGPT; datele pot ajunge în SUA, transfer acoperit de SCC',
              'Furnizorul de hosting cPanel pentru emailul contact@inovex.ro, prin care trimitem și emailurile automate de confirmare (server localizat în Europa)',
            ],
          },
          { h3: '4.2. Autorități publice' },
          {
            p: 'Datele pot fi divulgate autorităților publice (ANAF, instanțe judecătorești, organe de urmărire penală) exclusiv în baza unor obligații legale sau a unor hotărâri judecătorești.',
          },
          { h3: '4.3. Parteneri de afaceri' },
          { p: 'Nu împărtășim datele tale cu parteneri de afaceri sau cu terți în scopuri de marketing fără consimțământul tău explicit.' },
          { h3: '4.4. Transferuri internaționale de date' },
          {
            p: 'Unii furnizori de servicii sunt localizați în Statele Unite ale Americii. Transferurile de date sunt realizate cu garanții adecvate, în conformitate cu Capitolul V din GDPR (clauzele contractuale standard adoptate de Comisia Europeană).',
          },
        ],
      },
      {
        scurt: 'Cât timp păstrăm datele tale',
        titlu: 'Durata prelucrării și criteriile de stabilire a perioadei de păstrare',
        continut: [
          { h3: '5.1. Date din formulare (ofertă, contact, configuratoare)' },
          {
            p: 'Datele din formularele de pe site sunt păstrate timp de 2 (doi) ani de la data colectării sau până la retragerea consimțământului, în cazul în care nu s-a încheiat un contract.',
          },
          { h3: '5.2. Date din relația contractuală' },
          {
            p: 'Datele clienților care au contractat servicii sunt păstrate timp de 5 (cinci) ani de la finalizarea contractului, conform termenelor de prescripție din dreptul civil român, și timp de 10 (zece) ani pentru documentele contabile, conform Legii contabilității nr. 82/1991.',
          },
          { h3: '5.3. Date din secțiunea Învață gratuit (lead-uri)' },
          { p: 'Adresele de email colectate la descărcarea resurselor gratuite sunt păstrate timp de 2 (doi) ani sau până la retragerea consimțământului.' },
          { h3: '5.4. Date tehnice (jurnale, adrese IP)' },
          { p: 'Datele tehnice colectate automat sunt anonimizate sau șterse în maximum 14 (paisprezece) luni, conform setărilor Google Analytics 4.' },
          { h3: '5.5. Date de acces la sisteme' },
          {
            p: 'Datele de acces la sistemele clienților (parole, credențiale) sunt șterse imediat după predarea proiectului, conform practicii descrise în [Termenii și condițiile](/termeni-si-conditii) noastre.',
          },
        ],
      },
      {
        scurt: 'Drepturile tale conform GDPR',
        titlu: 'Drepturile persoanei vizate',
        continut: [
          { p: 'În calitate de persoană vizată, ai următoarele drepturi garantate de Regulamentul (UE) 2016/679:' },
          { h3: '6.1. Dreptul de acces (art. 15 GDPR)' },
          {
            p: 'Ai dreptul de a obține confirmarea că prelucrăm sau nu date cu caracter personal care te privesc și, în caz afirmativ, acces la acele date și la informații despre prelucrarea lor.',
          },
          { h3: '6.2. Dreptul la rectificare (art. 16 GDPR)' },
          { p: 'Ai dreptul de a obține rectificarea datelor inexacte care te privesc sau completarea datelor incomplete.' },
          { h3: '6.3. Dreptul la ștergere („dreptul de a fi uitat”) (art. 17 GDPR)' },
          {
            p: 'Ai dreptul de a obține ștergerea datelor care te privesc atunci când nu mai sunt necesare scopului pentru care au fost colectate, ți-ai retras consimțământul sau datele au fost prelucrate ilegal. Acest drept nu se aplică atunci când prelucrarea este necesară pentru respectarea unei obligații legale sau pentru apărarea unui drept în instanță.',
          },
          { h3: '6.4. Dreptul la restricționarea prelucrării (art. 18 GDPR)' },
          {
            p: 'Ai dreptul de a obține restricționarea prelucrării datelor tale în anumite circumstanțe prevăzute de GDPR (contestarea exactității datelor, prelucrare ilegală etc.).',
          },
          { h3: '6.5. Dreptul la portabilitatea datelor (art. 20 GDPR)' },
          {
            p: 'Ai dreptul de a primi datele care te privesc, pe care ni le-ai furnizat, într-un format structurat, utilizat în mod curent și care poate fi citit automat (JSON, CSV etc.), și de a transmite aceste date altui operator.',
          },
          { h3: '6.6. Dreptul la opoziție (art. 21 GDPR)' },
          {
            p: 'Ai dreptul de a te opune prelucrării datelor tale în baza interesului legitim al operatorului. Inovex va înceta prelucrarea, cu excepția cazului în care demonstrează că are motive legitime și imperioase care justifică prelucrarea.',
          },
          { h3: '6.7. Dreptul de a nu face obiectul unei decizii automate (art. 22 GDPR)' },
          {
            p: 'Inovex nu utilizează sisteme de decizie automatizată sau de profilare care să producă efecte juridice ori care să te afecteze în mod semnificativ.',
          },
          { h3: '6.8. Cum îți exerciți drepturile' },
          {
            p: 'Pentru exercitarea oricăruia dintre drepturile de mai sus, trimite o solicitare scrisă la [contact@inovex.ro](mailto:contact@inovex.ro), cu subiectul „Drepturi GDPR – [tipul solicitării]”.',
          },
          {
            p: 'Vom răspunde în maximum 30 de zile calendaristice. Dacă solicitarea este complexă sau avem un număr mare de solicitări, putem prelungi termenul cu încă 60 de zile, cu notificarea ta în primele 30 de zile.',
          },
          {
            p: 'Exercitarea drepturilor este gratuită. Dacă solicitările sunt vădit nefondate sau excesive, putem percepe o taxă administrativă rezonabilă sau putem refuza să le dăm curs.',
          },
          { h3: '6.9. Dreptul de a depune plângere la autoritatea de supraveghere' },
          { p: 'Ai dreptul de a depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP):' },
          {
            caseta: [
              '**ANSPDCP**',
              'B-dul G-ral. Gheorghe Magheru nr. 28-30, sector 1, București',
              'Email: [anspdcp@dataprotection.ro](mailto:anspdcp@dataprotection.ro)',
              'Telefon: +40 31 805 9211',
              'Site: [www.dataprotection.ro](https://www.dataprotection.ro)',
            ],
          },
        ],
      },
      {
        scurt: 'Cookie-uri și tehnologii similare',
        titlu: 'Cookie-uri și tehnologii de urmărire',
        continut: [
          { p: 'Site-ul inovex.ro utilizează cookie-uri și tehnologii similare pentru funcționarea corectă a site-ului și pentru analiza traficului.' },
          { h3: '7.1. Ce sunt cookie-urile' },
          {
            p: 'Cookie-urile sunt fișiere text mici, stocate pe dispozitivul tău la accesarea unui site web. Ele permit site-ului să memoreze preferințele tale și să analizeze modul în care folosești site-ul.',
          },
          { h3: '7.2. Tipurile de cookie-uri folosite' },
          {
            ol: [
              '**Cookie-uri strict necesare:** necesare pentru funcționarea de bază a site-ului (sesiune, securitate CSRF). Nu pot fi dezactivate.',
              '**Cookie-uri analitice:** utilizăm Google Analytics 4 pentru analiza anonimizată a traficului. Adresele IP sunt anonimizate. Poți dezactiva aceste cookie-uri din bannerul de cookie-uri.',
              '**Cookie-uri de marketing:** utilizăm Google Ads, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag și pixelul ChatGPT Ads (OpenAI) pentru măsurarea eficienței campaniilor publicitare. Poți dezactiva aceste cookie-uri din bannerul de cookie-uri.',
            ],
          },
          { h3: '7.3. Gestionarea cookie-urilor' },
          {
            p: 'La prima accesare a site-ului, ești informat despre utilizarea cookie-urilor printr-un banner de consimțământ. Poți accepta toate cookie-urile, le poți configura individual sau le poți refuza pe toate cele neesențiale.',
          },
          {
            p: 'Poți, de asemenea, gestiona cookie-urile direct din setările browserului tău. Dezactivarea cookie-urilor poate afecta funcționarea unor pagini ale site-ului.',
          },
          { p: 'Informații detaliate despre fiecare cookie utilizat sunt disponibile în [Politica de cookies](/politica-cookies).' },
        ],
      },
      {
        scurt: 'Securitatea datelor',
        titlu: 'Măsuri de securitate implementate',
        continut: [
          {
            p: 'Inovex implementează măsuri tehnice și organizatorice adecvate pentru protejarea datelor cu caracter personal împotriva accesului neautorizat, modificării, divulgării sau distrugerii:',
          },
          {
            ol: [
              'Toate comunicațiile dintre browser și serverele noastre sunt criptate prin protocolul HTTPS, cu certificat SSL/TLS valid',
              'Accesul la baza de date și la panoul de administrare este restricționat și protejat prin autentificare cu parolă robustă',
              'Parolele utilizatorilor sunt stocate exclusiv în format criptat (hash + salt), niciodată în text simplu',
              'Serverele sunt găzduite la furnizori cu certificări de securitate recunoscute (Vercel, care operează pe infrastructura AWS)',
              'Copiile de siguranță ale bazei de date sunt realizate automat și stocate în locații separate',
              'Accesul intern la datele personale este limitat la personalul care are nevoie de aceste date pentru prestarea serviciilor',
            ],
          },
          { h3: '8.1. Notificarea în caz de incident de securitate' },
          {
            p: 'În cazul unui incident de securitate care implică date cu caracter personal și care prezintă un risc pentru drepturile și libertățile persoanelor vizate, Inovex va notifica ANSPDCP în maximum 72 de ore de la momentul în care a luat cunoștință de incident, conform art. 33 din GDPR.',
          },
          {
            p: 'Persoanele vizate vor fi notificate fără întârzieri nejustificate, dacă incidentul prezintă un risc ridicat pentru drepturile și libertățile lor, conform art. 34 din GDPR.',
          },
        ],
      },
      {
        scurt: 'Datele minorilor',
        titlu: 'Protecția datelor minorilor',
        continut: [
          {
            p: 'Site-ul inovex.ro și serviciile Inovex nu sunt destinate persoanelor cu vârsta sub 16 (șaisprezece) ani. Nu colectăm în mod intenționat date cu caracter personal ale minorilor.',
          },
          {
            p: 'Dacă ești părinte sau tutore legal și ai descoperit că minorul aflat în grija ta a furnizat date personale pe site-ul nostru fără consimțământul tău, te rugăm să ne contactezi la [contact@inovex.ro](mailto:contact@inovex.ro). Vom șterge acele date în cel mai scurt timp posibil.',
          },
        ],
      },
      {
        scurt: 'Linkuri către site-uri terțe',
        titlu: 'Site-uri terțe și responsabilitate',
        continut: [
          {
            p: 'Site-ul inovex.ro poate conține linkuri către site-uri web operate de terți (parteneri, clienți, resurse externe). Inovex nu este responsabilă pentru practicile de confidențialitate ale acestor site-uri și nu controlează modul în care acestea colectează sau utilizează datele tale personale.',
          },
          { p: 'Te încurajăm să citești politica de confidențialitate a oricărui site terț pe care îl vizitezi prin intermediul linkurilor de pe site-ul nostru.' },
        ],
      },
      {
        scurt: 'Modificări ale politicii',
        titlu: 'Actualizarea prezentului document',
        continut: [
          {
            p: 'Inovex poate actualiza periodic această Politică de confidențialitate pentru a reflecta modificări legislative, schimbări în practicile noastre de prelucrare sau alte motive operaționale.',
          },
          {
            p: 'Data ultimei modificări este indicată la începutul documentului. Continuarea utilizării site-ului sau a serviciilor noastre după publicarea unei versiuni actualizate constituie acceptarea noilor prevederi.',
          },
          {
            p: 'Pentru modificările semnificative care îți afectează drepturile, vom face eforturi rezonabile pentru a te notifica prin email (dacă ne-ai furnizat adresa) sau prin afișarea unui banner vizibil pe site.',
          },
        ],
      },
      {
        scurt: 'Contact și exercitarea drepturilor',
        titlu: 'Contact pentru probleme de confidențialitate',
        continut: [
          { p: 'Pentru orice întrebare, solicitare sau plângere legată de prelucrarea datelor tale cu caracter personal, ne poți contacta:' },
          { contact: { titlu: 'Contactează-ne pentru GDPR', subiect: 'GDPR - Solicitarea mea', buton: 'Trimite solicitare GDPR' } },
          {
            p: 'Termenul de răspuns: maximum 30 (treizeci) de zile calendaristice de la primirea solicitării tale, conform art. 12 alin. 3 din GDPR.',
          },
          {
            p: 'Dacă nu ești mulțumit de răspunsul nostru sau consideri că datele tale sunt prelucrate în mod ilegal, ai dreptul de a depune plângere la ANSPDCP ([www.dataprotection.ro](https://www.dataprotection.ro)) sau de a te adresa instanțelor judecătorești competente.',
          },
          {
            p: 'Prezenta Politică de confidențialitate a fost redactată în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și cu legislația română aplicabilă, în vigoare la data de 7 noiembrie 2026.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  cookies: {
    meta: {
      titlu: 'Politica de cookies',
      descriere:
        'Informații despre cookie-urile utilizate pe inovex.ro și despre cum îți poți gestiona preferințele: cookie-uri necesare, analitice și de marketing.',
    },
    titlu: 'Politica de cookies',
    intro:
      'Această pagină explică exact ce cookie-uri folosim, de ce și cum le poți controla. Poți modifica preferințele oricând din bannerul de cookie-uri sau din setările browserului.',
    actualizat: '7 noiembrie 2026',
    data: '2026-11-07',
    sectiuni: [
      {
        scurt: 'Ce sunt cookie-urile',
        titlu: 'Ce sunt cookie-urile',
        continut: [
          {
            p: 'Cookie-urile sunt fișiere text de mici dimensiuni pe care un site web le stochează pe dispozitivul tău (computer, telefon, tabletă) atunci când îl vizitezi. Ele permit site-ului să memoreze acțiunile și preferințele tale pe o perioadă de timp, astfel încât să nu fie nevoie să le reintroduci la fiecare vizită sau când navighezi de la o pagină la alta.',
          },
          {
            p: 'Cookie-urile nu sunt programe și nu pot executa cod, nu pot transmite viruși și nu pot accesa informații de pe hard diskul tău. Ele conțin exclusiv date pe care le-ai furnizat tu sau care au fost colectate în cadrul utilizării site-ului.',
          },
          {
            p: 'Pe lângă cookie-urile propriu-zise, folosim și tehnologii similare (local storage, session storage, pixeli de urmărire, web beacons), care funcționează în mod asemănător. Termenul „cookie-uri” din acest document acoperă toate aceste tehnologii.',
          },
        ],
      },
      {
        scurt: 'De ce folosim cookie-uri',
        titlu: 'De ce folosim cookie-uri',
        continut: [
          { p: 'Folosim cookie-uri și tehnologii similare pentru:' },
          {
            ol: [
              'Funcționarea corectă a site-ului inovex.ro (cookie-uri esențiale)',
              'Înțelegerea modului în care vizitatorii utilizează site-ul nostru, pentru a-l îmbunătăți continuu (cookie-uri analitice)',
              'Măsurarea eficienței campaniilor noastre publicitare pe Google Ads, Meta (Facebook și Instagram), TikTok Ads, LinkedIn Ads și ChatGPT Ads (cookie-uri de marketing)',
              'Memorarea preferințelor tale de cookie-uri pentru vizitele ulterioare',
            ],
          },
          {
            p: 'Nu folosim cookie-uri pentru a vinde date terților sau pentru a crea profiluri de comportament în alte scopuri decât cele menționate.',
          },
        ],
      },
      {
        scurt: 'Tipurile de cookie-uri folosite',
        titlu: 'Tipurile de cookie-uri utilizate pe inovex.ro',
        continut: [
          { p: 'Cookie-urile sunt clasificate în funcție de scopul lor:' },
          { h3: '3.1. Cookie-uri strict necesare (esențiale)' },
          {
            p: 'Aceste cookie-uri sunt indispensabile pentru funcționarea site-ului și nu pot fi dezactivate. Fără ele, site-ul nu poate funcționa corect. Nu necesită consimțământul tău, conform art. 5 alin. (3) din Directiva ePrivacy, transpusă prin Legea nr. 506/2004.',
          },
          { p: 'Nu stochează informații care te pot identifica personal.' },
          { h3: '3.2. Cookie-uri analitice (statistici)' },
          {
            p: 'Aceste cookie-uri ne ajută să înțelegem cum interacționează vizitatorii cu site-ul (ce pagini vizitează, cât timp petrec, de unde vin). Toate datele sunt anonimizate sau pseudonimizate și nu pot fi folosite pentru identificarea directă a persoanelor.',
          },
          { p: 'Necesită consimțământul tău. Le poți refuza fără a afecta funcționarea site-ului.' },
          { h3: '3.3. Cookie-uri de marketing (publicitate)' },
          {
            p: 'Aceste cookie-uri sunt folosite pentru măsurarea eficienței campaniilor noastre publicitare pe Google Ads, Meta (Facebook și Instagram), TikTok Ads, LinkedIn Ads și ChatGPT Ads. Ele permit platformelor publicitare să știe dacă ai vizitat site-ul nostru după ce ai văzut un anunț al nostru.',
          },
          {
            p: 'Nu afișăm reclame personalizate pe site-ul nostru. Aceste cookie-uri sunt folosite exclusiv pentru atribuirea conversiilor în campaniile noastre plătite.',
          },
          { p: 'Necesită consimțământul tău. Le poți refuza fără a afecta funcționarea site-ului.' },
          { h3: '3.4. Cookie-uri de preferințe' },
          {
            p: 'Aceste cookie-uri memorează alegerile tale (inclusiv preferințele de cookie-uri), pentru a nu fi nevoie să le reintroduci la fiecare vizită.',
          },
        ],
      },
      {
        scurt: 'Lista completă a cookie-urilor',
        titlu: 'Lista detaliată a cookie-urilor utilizate',
        continut: [
          { p: 'Mai jos găsești toate cookie-urile și tehnologiile similare pe care le folosim, grupate pe categorii.' },
          {
            setari: {
              titlu: 'Gestionează preferințele tale',
              text: 'Poți schimba oricând ce cookie-uri accepți: bannerul de cookie-uri se redeschide și îți poți face din nou alegerea.',
              buton: 'Deschide setările cookie',
            },
          },
          {
            cookies: [
              {
                nume: 'Esențiale',
                descriere: 'Necesare pentru funcționarea de bază a site-ului. Nu necesită consimțământ.',
                cookies: [
                  ['__Host-next-auth.csrf-token', 'inovex.ro', 'https://inovex.ro', 'Protecție CSRF pentru formulare', 'Sesiune', 'HTTP'],
                  ['__Secure-next-auth.session-token', 'inovex.ro', 'https://inovex.ro', 'Menținerea sesiunii autentificate', '30 de zile', 'HTTP'],
                  ['cookie_consent', 'inovex.ro', 'https://inovex.ro', 'Memorează preferințele tale de cookie-uri', '12 luni', 'localStorage'],
                  ['inovex_limba', 'inovex.ro', 'https://inovex.ro', 'Memorează limba site-ului: cea aleasă de tine sau cea potrivită automat la prima vizită, după țară (dedusă din adresa IP, fără s-o stocăm) și limba browserului', '12 luni', 'HTTP'],
                ],
              },
              {
                nume: 'Analitice',
                descriere: 'Google Analytics 4: analiza anonimizată a traficului. Necesită consimțământ.',
                cookies: [
                  ['_ga', 'google.com', COOKIE_GOOGLE, 'Identifică sesiunile unice ale utilizatorilor (anonimizat)', '13 luni', 'HTTP'],
                  ['_ga_*', 'google.com', COOKIE_GOOGLE, 'Menține starea sesiunii GA4', '13 luni', 'HTTP'],
                  ['_gid', 'google.com', COOKIE_GOOGLE, 'Distinge utilizatorii (date șterse după 24 de ore)', '24 de ore', 'HTTP'],
                ],
              },
              {
                nume: 'Marketing',
                descriere: 'Google Ads, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag și pixelul ChatGPT Ads (OpenAI): măsurarea conversiilor din campanii. Necesită consimțământ.',
                cookies: [
                  ['_gcl_au', 'google.com', COOKIE_GOOGLE, 'Google Ads: stochează experimentele de conversie', '90 de zile', 'HTTP'],
                  ['IDE', 'doubleclick.net', COOKIE_GOOGLE, 'Google Ads: remarketing și măsurarea conversiilor', '13 luni', 'HTTP'],
                  ['_fbp', 'facebook.com', COOKIE_META, 'Meta Pixel: identificarea browserului pentru măsurarea campaniilor Facebook și Instagram', '90 de zile', 'HTTP'],
                  ['_fbc', 'facebook.com', COOKIE_META, 'Meta Pixel: păstrează identificatorul clicului, dacă ai ajuns pe site dintr-un anunț Meta', '90 de zile', 'HTTP'],
                  ['fr', 'facebook.com', COOKIE_META, 'Meta: afișarea și măsurarea reclamelor', '90 de zile', 'HTTP'],
                  ['_ttp', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel: măsurarea conversiilor din campaniile TikTok', '13 luni', 'HTTP'],
                  ['tt_webid_v2', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel: identificarea vizitatorului pentru atribuire', '1 an', 'HTTP'],
                  ['li_sugr', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Insight Tag: identificarea browserului pentru măsurarea campaniilor LinkedIn', '3 luni', 'HTTP'],
                  ['bcookie', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: identificator de browser', '1 an', 'HTTP'],
                  ['lidc', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: alegerea centrului de date care răspunde cererilor', '24 de ore', 'HTTP'],
                  ['UserMatchHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads: sincronizarea identificatorului pentru reclame', '30 de zile', 'HTTP'],
                  ['AnalyticsSyncHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: momentul ultimei sincronizări a datelor de măsurare', '30 de zile', 'HTTP'],
                  ['li_fat_id', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads: atribuirea conversiilor din campaniile LinkedIn', '30 de zile', 'HTTP'],
                  ['__oppref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: păstrează referința clicului pe un anunț din ChatGPT, pentru atribuirea conversiilor', '30 de zile', 'HTTP'],
                  ['__obref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: identificator de browser pentru măsurarea campaniilor', '1 an', 'HTTP'],
                  ['__oaiq_consent', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: memorează alegerea ta privind consimțământul pentru pixel', '30 de zile', 'HTTP'],
                ],
              },
              {
                nume: 'Google Tag Manager',
                descriere: 'Gestionarea etichetelor de urmărire.',
                cookies: [['_gtm_*', 'googletagmanager.com', COOKIE_GOOGLE, 'Google Tag Manager: gestionarea etichetelor', 'Sesiune', 'HTTP']],
              },
            ],
          },
        ],
      },
      {
        scurt: 'Consimțământul și controlul tău',
        titlu: 'Consimțământul și controlul preferințelor tale',
        continut: [
          { h3: '5.1. Bannerul de cookie-uri' },
          {
            p: 'La prima vizită pe site-ul inovex.ro, îți afișăm un banner care îți permite să alegi ce cookie-uri accepți. Ai trei opțiuni:',
          },
          {
            ol: [
              '**„Acceptă toate”:** accepți toate categoriile de cookie-uri',
              '**„Refuză toate”:** accepți doar cookie-urile strict necesare',
              '**„Personalizează”:** alegi individual fiecare categorie',
            ],
          },
          {
            p: 'Alegerea ta este memorată timp de 12 luni. Poți modifica preferințele oricând, din butonul „Setări cookies” din subsolul site-ului.',
          },
          { h3: '5.2. Retragerea consimțământului' },
          { p: 'Poți retrage sau modifica consimțământul în orice moment:' },
          {
            ul: [
              'Din butonul „Setări cookies” din subsolul site-ului',
              'Din setările browserului tău (instrucțiunile sunt mai jos)',
              'Trimițând un email la [contact@inovex.ro](mailto:contact@inovex.ro)',
            ],
          },
          {
            p: 'Retragerea consimțământului nu afectează legalitatea prelucrărilor efectuate în baza consimțământului înainte de retragere.',
          },
          { h3: '5.3. Controlul prin setările browserului' },
          { p: 'Poți gestiona sau dezactiva cookie-urile direct din browserul tău:' },
          {
            ul: [
              '**Google Chrome:** Setări › Confidențialitate și securitate › Cookie-uri',
              '**Mozilla Firefox:** Setări › Confidențialitate și securitate › Cookie-uri',
              '**Safari:** Preferințe › Confidențialitate › Cookie-uri',
              '**Microsoft Edge:** Setări › Cookie-uri și permisiuni pentru site-uri',
            ],
          },
          { p: 'Reține că dezactivarea cookie-urilor esențiale poate afecta funcționarea site-ului.' },
          { h3: '5.4. Dezactivarea pe fiecare platformă' },
          {
            ul: [
              '**Google Analytics:** [tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)',
              '**Google Ads:** [adssettings.google.com](https://adssettings.google.com)',
              '**TikTok:** [tiktok.com/legal/page/global/privacy-policy](https://www.tiktok.com/legal/page/global/privacy-policy)',
            ],
          },
        ],
      },
      {
        scurt: 'Transferuri de date',
        titlu: 'Transferuri internaționale prin cookie-uri',
        continut: [
          {
            p: 'Unele cookie-uri sunt setate de furnizori cu sediul în Statele Unite ale Americii (Google LLC, TikTok Inc., OpenAI) sau de furnizori care pot transfera date în SUA (Meta, LinkedIn). Transferurile de date sunt realizate cu garanții adecvate, conform GDPR:',
          },
          {
            ul: [
              '**Google LLC:** acoperit de clauzele contractuale standard (SCC) adoptate de Comisia Europeană, disponibile la [privacy.google.com/businesses/processorterms](https://privacy.google.com/businesses/processorterms/)',
              '**TikTok Inc.:** acoperit de clauzele contractuale standard (SCC), disponibile în Politica de confidențialitate TikTok',
              '**LinkedIn Ireland Unlimited Company:** datele pot ajunge la LinkedIn Corporation (SUA); transfer acoperit de clauzele contractuale standard (SCC)',
              '**Meta Platforms Ireland Limited:** datele pot ajunge la Meta Platforms, Inc. (SUA); transfer acoperit de clauzele contractuale standard (SCC)',
              '**OpenAI:** datele pot ajunge în SUA; transfer acoperit de clauzele contractuale standard (SCC)',
            ],
          },
        ],
      },
      {
        scurt: 'Actualizări ale politicii',
        titlu: 'Actualizări ale prezentei politici',
        continut: [
          {
            p: 'Această Politică de cookies poate fi actualizată periodic pentru a reflecta modificări ale cookie-urilor utilizate sau ale cerințelor legale.',
          },
          {
            p: 'Data ultimei modificări este afișată la începutul documentului. Modificările semnificative vor fi comunicate prin bannerul de cookie-uri sau prin afișare vizibilă pe site.',
          },
          { p: 'Te rugăm să verifici periodic această pagină, pentru a fi la curent cu practicile noastre privind cookie-urile.' },
        ],
      },
      {
        scurt: 'Contact',
        titlu: 'Contact',
        continut: [
          { p: 'Pentru întrebări despre utilizarea cookie-urilor pe inovex.ro:' },
          {
            ul: [
              '**Email:** [contact@inovex.ro](mailto:contact@inovex.ro) (subiect: „Cookie-uri – [întrebarea ta]”)',
              '**Telefon:** [0750 456 096](tel:+40750456096) (luni–vineri, 09:00–18:00)',
            ],
          },
          { p: 'Autoritatea competentă pentru plângeri privind cookie-urile: ANSPDCP, [www.dataprotection.ro](https://www.dataprotection.ro).' },
          {
            p: 'Prezenta Politică de cookies a fost redactată conform Legii nr. 506/2004 și Regulamentului (UE) 2016/679 (GDPR), în vigoare la data de 7 noiembrie 2026.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  termeni: {
    meta: {
      titlu: 'Termeni și condiții',
      descriere:
        'Termenii și condițiile de utilizare a serviciilor și a site-ului Inovex, operat de VOID SFT GAMES SRL, CUI RO43474393. Legea aplicabilă: legea română.',
    },
    titlu: 'Termeni și condiții',
    intro:
      'Te rugăm să citești cu atenție acest document înainte de a utiliza serviciile sau site-ul Inovex. Prin accesarea site-ului sau contractarea oricărui serviciu, ești de acord cu acești termeni.',
    actualizat: '6 noiembrie 2026',
    data: '2026-11-06',
    sectiuni: [
      {
        scurt: 'Informații despre operator',
        titlu: 'Informații despre operator',
        continut: [
          {
            p: 'Site-ul inovex.ro este operat de VOID SFT GAMES SRL, societate cu răspundere limitată înregistrată în conformitate cu legislația din România, cu sediul social în județul Gorj, cod unic de înregistrare RO43474393, înregistrată la Registrul Comerțului.',
          },
          {
            ul: [
              '**Denumire comercială:** Inovex',
              '**Persoană juridică:** VOID SFT GAMES SRL',
              '**CUI:** RO43474393',
              '**Sediu:** Târgu Jiu, județul Gorj, România',
              '**Email:** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Telefon:** [0750 456 096](tel:+40750456096)',
              '**Site:** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'Inovex oferă servicii de creare și dezvoltare web, inclusiv magazine online, website-uri de prezentare, aplicații web și mobile, sisteme CRM/ERP/CMS și implementarea de automatizări cu inteligență artificială, destinate persoanelor fizice și juridice.',
          },
        ],
      },
      {
        scurt: 'Acceptarea termenilor',
        titlu: 'Acceptarea termenilor',
        continut: [
          {
            p: 'Prin accesarea și utilizarea site-ului inovex.ro sau prin contractarea oricărui serviciu oferit de VOID SFT GAMES SRL sub marca Inovex, confirmi că ai citit, ai înțeles și ești de acord să respecți acești Termeni și condiții în integralitatea lor.',
          },
          {
            p: 'Dacă nu ești de acord cu oricare dintre prevederile prezentului document, te rugăm să nu utilizezi site-ul și să nu contractezi serviciile noastre.',
          },
          {
            p: 'Prezentul document constituie un acord juridic valabil între tine (persoană fizică sau juridică, denumită în continuare „Client”) și VOID SFT GAMES SRL (denumită în continuare „Inovex” sau „Prestatorul”).',
          },
          {
            p: 'Inovex își rezervă dreptul de a modifica acești termeni în orice moment, cu notificarea utilizatorilor prin publicarea versiunii actualizate pe site. Continuarea utilizării serviciilor după publicarea modificărilor constituie acceptarea noilor termeni.',
          },
        ],
      },
      {
        scurt: 'Servicii oferite',
        titlu: 'Servicii oferite',
        continut: [
          { p: 'Inovex oferă, fără a se limita la acestea, următoarele categorii de servicii:' },
          {
            ol: [
              'Creare de magazine online la cheie, incluzând design personalizat, integrarea procesatorilor de plată, a firmelor de curierat și a programelor de facturare, precum și optimizare SEO;',
              'Creare de website-uri de prezentare, incluzând design personalizat, sistem de administrare a conținutului și optimizare pentru motoarele de căutare;',
              'Dezvoltare de aplicații web și platforme SaaS, incluzând sisteme de autentificare, dashboard-uri, API-uri și infrastructură cloud;',
              'Implementare de sisteme CRM, CMS și ERP personalizate, adaptate proceselor interne ale clientului;',
              'Dezvoltare de aplicații mobile pentru platformele iOS și Android;',
              'Implementare de automatizări cu inteligență artificială, incluzând chatboți, procesarea automată a documentelor și fluxuri de automatizare;',
              'Produse digitale disponibile în Marketplace-ul Inovex, incluzând template-uri și soluții web preconfigurate.',
            ],
          },
          {
            p: 'Toate serviciile sunt prestate în baza unui contract individual semnat cu fiecare client, care detaliază specificațiile tehnice, termenele de livrare și modalitățile de plată aplicabile proiectului respectiv. Prezentul document se aplică în completarea contractului individual și nu îl înlocuiește.',
          },
        ],
      },
      {
        scurt: 'Prețuri și modalități de plată',
        titlu: 'Prețuri și modalități de plată',
        continut: [
          {
            p: '**4.1.** Prețurile proiectelor personalizate sunt stabilite individual, în funcție de complexitate, volumul de muncă și specificațiile tehnice agreate, deoarece fiecare proiect este unic și necesită o evaluare individuală. Pentru serviciile cu preț afișat pe site (de exemplu, Video Motion Design) și pentru produsele din Marketplace se aplică prețul afișat la momentul comenzii.',
          },
          { p: '**4.2.** Modalități de plată acceptate:' },
          {
            ol: [
              'Plata integrală în avans, înainte de începerea lucrărilor;',
              'Plata în tranșe: un avans de minimum 20% (douăzeci la sută) din valoarea totală a contractului, achitat înainte de începerea lucrărilor, diferența urmând a fi achitată la livrarea finală a proiectului, înainte de predarea accesurilor.',
            ],
          },
          {
            p: '**4.3.** Facturile emise de Inovex au termen de plată de 5 (cinci) zile lucrătoare de la data emiterii, dacă nu este prevăzut altfel în contractul individual.',
          },
          {
            p: '**4.4.** Neachitarea facturilor la termen atrage penalități de întârziere de 0,1% (zero virgulă unu la sută) din valoarea facturii neachitate pentru fiecare zi de întârziere, începând cu prima zi de după scadență.',
          },
          {
            p: '**4.5.** Inovex are dreptul de a suspenda lucrările în cazul neplății facturilor la termen, fără a fi considerată responsabilă pentru eventualele prejudicii rezultate din această suspendare.',
          },
          {
            p: '**4.6.** Predarea livrabilelor finale, inclusiv a accesurilor la cont, a codului sursă și a documentației, se realizează exclusiv după achitarea integrală a sumelor datorate.',
          },
          {
            p: '**4.7.** Prețurile afișate sau comunicate sunt exprimate fără TVA, dacă nu este specificat altfel. TVA se aplică conform legislației fiscale în vigoare.',
          },
        ],
      },
      {
        scurt: 'Livrare și termene',
        titlu: 'Livrare și termene',
        continut: [
          {
            p: '**5.1.** Termenele de livrare sunt stabilite în contractul individual semnat cu fiecare client și încep să curgă de la data achitării avansului și a primirii tuturor materialelor necesare de la client (texte, imagini, date de acces, specificații tehnice etc.).',
          },
          {
            p: '**5.2.** Inovex depune toate eforturile rezonabile pentru respectarea termenelor de livrare agreate. Cu toate acestea, termenele pot fi afectate de:',
          },
          {
            ol: [
              'Întârzierea clientului în furnizarea materialelor sau a feedbackului solicitat;',
              'Modificări ale specificațiilor tehnice solicitate de client pe parcursul proiectului;',
              'Factori externi, independenți de voința Inovex (cazuri de forță majoră, probleme ale furnizorilor terți etc.).',
            ],
          },
          {
            p: '**5.3.** Inovex va notifica clientul în timp util cu privire la orice întârziere previzibilă și va propune un nou termen de livrare rezonabil.',
          },
          {
            p: '**5.4.** Clientul beneficiază de o perioadă de revizuire și aprobare de minimum 5 (cinci) zile lucrătoare pentru fiecare livrabil primit. Lipsa unui răspuns în termenul de revizuire agreat constituie acceptarea tacită a livrabilului respectiv.',
          },
          {
            p: '**5.5.** Livrarea finală se consideră efectuată la data predării accesurilor și a documentației complete, după achitarea integrală a valorii contractului.',
          },
        ],
      },
      {
        scurt: 'Garanție post-lansare',
        titlu: 'Garanție post-lansare',
        continut: [
          {
            p: '**6.1.** Inovex oferă o perioadă de garanție de 30 (treizeci) de zile calendaristice de la data livrării finale a proiectului, în cadrul căreia remediază gratuit orice defect sau eroare de funcționare constatată, care nu este cauzată de:',
          },
          {
            ol: [
              'Modificări efectuate de client sau de terți asupra codului sursă ori a configurației sistemului, fără acordul prealabil al Inovex;',
              'Actualizări ale platformelor terțe (WordPress, WooCommerce, sisteme de operare, browsere) efectuate după livrarea finală;',
              'Utilizarea incorectă a sistemului de către client sau de către angajații acestuia;',
              'Atacuri informatice, malware sau acces neautorizat la sistemele clientului;',
              'Probleme de infrastructură aparținând furnizorului de hosting ales de client.',
            ],
          },
          {
            p: '**6.2.** Cererile de garanție se transmit la [contact@inovex.ro](mailto:contact@inovex.ro), cu descrierea detaliată a problemei constatate. Inovex va răspunde în maximum 2 (două) zile lucrătoare și va remedia problema în termenul comunicat.',
          },
          {
            p: '**6.3.** Garanția acoperă exclusiv funcționalitățile agreate în contractul inițial. Solicitările de funcționalități noi sau de modificare a celor existente nu intră în sfera garanției și se tratează ca proiecte noi.',
          },
          {
            p: '**6.4.** După expirarea perioadei de garanție, serviciile de mentenanță și suport sunt disponibile contra cost, în baza unui contract separat de mentenanță.',
          },
        ],
      },
      {
        scurt: 'Proprietate intelectuală',
        titlu: 'Proprietate intelectuală și drepturi de autor',
        continut: [
          {
            p: '**7.1.** La achitarea integrală a valorii contractului și la livrarea finală a proiectului, clientul dobândește drepturile complete de utilizare asupra tuturor elementelor create de Inovex în cadrul proiectului, inclusiv designul grafic, codul sursă, structura bazei de date și documentația tehnică.',
          },
          {
            p: '**7.2.** Transferul drepturilor prevăzut la articolul 7.1 se referă exclusiv la elementele create de Inovex special pentru proiectul clientului. Nu include:',
          },
          {
            ol: [
              'Bibliotecile, framework-urile și componentele software open-source utilizate, care rămân supuse propriilor licențe (MIT, GPL, Apache etc.);',
              'Temele, pluginurile sau componentele terțe achiziționate separat, care rămân supuse licențelor emitenților respectivi;',
              'Elementele grafice sau fotografiile achiziționate de la terți (bănci de imagini, licențe de fonturi etc.), care rămân supuse condițiilor de licențiere ale furnizorilor respectivi.',
            ],
          },
          {
            p: '**7.3.** Inovex își rezervă dreptul de a prezenta proiectele finalizate în portofoliul propriu (site, rețele sociale, materiale de marketing), cu excepția cazului în care clientul solicită în scris confidențialitate cu privire la acestea, înainte de semnarea contractului.',
          },
          {
            p: '**7.4.** Clientul garantează că materialele furnizate către Inovex pentru realizarea proiectului (texte, imagini, logo-uri, elemente de brand) nu încalcă drepturile de autor ale terților. Orice răspundere decurgând din utilizarea materialelor furnizate de client fără drepturi legale revine exclusiv clientului.',
          },
          {
            p: '**7.5.** Este interzisă reproducerea, distribuirea sau modificarea conținutului site-ului inovex.ro (texte, imagini, logo, design) fără acordul scris prealabil al VOID SFT GAMES SRL.',
          },
        ],
      },
      {
        scurt: 'Confidențialitate și date de acces',
        titlu: 'Confidențialitate și date de acces',
        continut: [
          {
            p: '**8.1.** Pe durata prestării serviciilor, Inovex poate avea acces la datele de acces ale clientului (hosting, domeniu, conturi de email, rețele sociale, procesatori de plată etc.). Aceste date sunt tratate ca strict confidențiale și sunt utilizate exclusiv în scopul realizării proiectului contractat.',
          },
          {
            p: '**8.2.** La finalizarea proiectului, Inovex predă clientului toate datele de acces create sau gestionate în cadrul proiectului. Clientul este responsabil să schimbe parolele imediat după predare.',
          },
          {
            p: '**8.3.** Inovex nu stochează și nu arhivează date de acces după finalizarea proiectului și predarea acestora și nu poate fi considerată responsabilă pentru incidentele de securitate survenite ca urmare a neschimbării parolelor de către client după predare.',
          },
          {
            p: '**8.4.** Ambele părți se obligă să păstreze confidențialitatea informațiilor comerciale, tehnice și financiare ale celeilalte părți, de care iau cunoștință pe durata colaborării, atât pe durata contractului, cât și pentru o perioadă de 2 (doi) ani după încetarea acestuia.',
          },
          {
            p: '**8.5.** Prelucrarea datelor cu caracter personal se realizează conform [Politicii de confidențialitate](/politica-de-confidentialitate), care face parte integrantă din prezentul document.',
          },
        ],
      },
      {
        scurt: 'Rezilierea contractului',
        titlu: 'Rezilierea contractului',
        continut: [
          { p: '**9.1.** Clientul poate rezilia contractul în orice moment, cu notificarea scrisă a Inovex. În acest caz:' },
          {
            ol: [
              'Avansul achitat este reținut integral de Inovex, ca despăgubire pentru munca depusă și resursele alocate proiectului;',
              'Dacă lucrările au depășit valoarea avansului achitat, clientul datorează plata pentru munca efectuată până la data rezilierii, calculată proporțional cu stadiul de avansare a proiectului;',
              'Inovex predă clientului toate materialele și livrabilele realizate până la data rezilierii, în starea în care se află la acel moment.',
            ],
          },
          {
            p: '**9.2.** Inovex poate rezilia contractul cu notificarea scrisă a clientului, cu minimum 15 (cincisprezece) zile calendaristice înainte, în cazuri justificate (imposibilitate obiectivă de executare, comportament abuziv al clientului, furnizarea de informații false la încheierea contractului). În acest caz, Inovex returnează avansul achitat, mai puțin valoarea muncii deja efectuate.',
          },
          {
            p: '**9.3.** Inovex poate rezilia contractul fără preaviz și fără restituirea avansului în cazul în care clientul solicită realizarea de conținut ilegal, care promovează activități ilegale, care încalcă drepturile terților sau care contravine bunelor moravuri.',
          },
          { p: '**9.4.** Rezilierea contractului nu afectează obligațiile de plată scadente anterior rezilierii.' },
        ],
      },
      {
        scurt: 'Limitarea răspunderii',
        titlu: 'Limitarea răspunderii',
        continut: [
          {
            p: '**10.1.** Inovex răspunde pentru prejudiciile directe cauzate clientului prin neîndeplinirea sau îndeplinirea necorespunzătoare a obligațiilor contractuale, în limita valorii totale a contractului în cauză.',
          },
          { p: '**10.2.** Inovex nu răspunde pentru:' },
          {
            ol: [
              'Prejudicii indirecte, pierderi de profit, pierderi de date sau pierderi de oportunități de afaceri ale clientului;',
              'Defecțiuni sau indisponibilitatea serviciilor terților de care depinde funcționarea proiectului (hosting, servicii de email, procesatori de plată, API-uri terțe, CDN etc.);',
              'Prejudicii rezultate din utilizarea necorespunzătoare a proiectului livrat de către client sau de către angajații acestuia;',
              'Pierderea de date cauzată de lipsa copiilor de siguranță sau de configurarea necorespunzătoare a infrastructurii de către client;',
              'Atacuri informatice, vulnerabilități de securitate sau acces neautorizat la sistemele clientului, survenite după livrarea finală și predarea accesurilor;',
              'Modificările legislative sau de politici ale platformelor terțe (Google, Meta, Apple, Google Play etc.) care afectează funcționarea proiectului livrat.',
            ],
          },
          {
            p: '**10.3.** Site-ul inovex.ro poate conține linkuri către site-uri terțe. Inovex nu este responsabilă pentru conținutul, politicile de confidențialitate sau practicile acestor site-uri.',
          },
          {
            p: '**10.4.** Inovex depune eforturi rezonabile pentru a menține site-ul inovex.ro disponibil și funcțional, dar nu garantează disponibilitatea neîntreruptă a acestuia.',
          },
        ],
      },
      {
        scurt: 'Forța majoră',
        titlu: 'Forța majoră',
        continut: [
          {
            p: '**11.1.** Niciuna dintre părți nu răspunde pentru neexecutarea sau executarea cu întârziere a obligațiilor contractuale, dacă aceasta este cauzată de un eveniment de forță majoră, conform definiției din Codul civil român.',
          },
          {
            p: '**11.2.** Constituie forță majoră, fără a se limita la acestea: calamitățile naturale, pandemiile declarate de autoritățile competente, conflictele armate, actele de terorism, grevele generale, întreruperile furnizării de energie sau ale serviciilor de internet la nivel național sau regional și actele autorităților publice care împiedică executarea contractului.',
          },
          {
            p: '**11.3.** Partea afectată de forța majoră are obligația de a notifica cealaltă parte în scris, în maximum 5 (cinci) zile calendaristice de la producerea evenimentului, indicând natura acestuia și durata estimată.',
          },
          {
            p: '**11.4.** Dacă evenimentul de forță majoră durează mai mult de 60 (șaizeci) de zile calendaristice, oricare dintre părți poate rezilia contractul, cu returnarea proporțională a sumelor achitate pentru serviciile neefectuate.',
          },
        ],
      },
      {
        scurt: 'Marketplace Inovex',
        titlu: 'Marketplace Inovex',
        continut: [
          {
            p: '**12.1.** Marketplace-ul Inovex oferă produse digitale preconfigurate (template-uri de website-uri și magazine online), disponibile pentru achiziție și personalizare.',
          },
          {
            p: '**12.2.** Produsele din Marketplace sunt vândute în regim de licență de utilizare. La achiziție, cumpărătorul dobândește dreptul de utilizare a produsului pentru un singur proiect/domeniu, dacă nu este specificat altfel în descrierea produsului.',
          },
          {
            p: '**12.3.** Produsele din Marketplace sunt furnizate „ca atare” (as-is), cu personalizare în limita specificată în descrierea produsului. Garanția de 30 de zile se aplică și produselor din Marketplace, acoperind funcționarea corectă a funcționalităților descrise.',
          },
          {
            p: '**12.4.** Produsele marcate ca „Exclusiv” sau cu licență exclusivă sunt vândute o singură dată. După vânzare, produsul este marcat ca indisponibil și nu mai poate fi achiziționat de alți cumpărători.',
          },
          {
            p: '**12.5.** Nu se admit retururi pentru produsele digitale din Marketplace, conform excepției prevăzute la art. 16 lit. m) din OUG nr. 34/2014, pentru conținutul digital furnizat altfel decât pe un suport material, a cărui executare a început cu acordul prealabil al consumatorului.',
          },
          {
            p: '**12.6.** Prețurile din Marketplace includ TVA, dacă este aplicabil, și sunt afișate în EUR. Facturarea se realizează în RON, la cursul BNR din data facturării.',
          },
        ],
      },
      {
        scurt: 'Soluționarea litigiilor',
        titlu: 'Soluționarea litigiilor',
        continut: [
          { p: '**13.1.** Prezentul document este guvernat de legislația din România și interpretat în conformitate cu aceasta.' },
          {
            p: '**13.2.** Orice litigiu, dispută sau pretenție decurgând din sau în legătură cu prezentul document ori cu serviciile Inovex se va soluționa cu prioritate pe cale amiabilă, prin negociere directă între părți.',
          },
          {
            p: '**13.3.** Termenul pentru soluționarea amiabilă este de 30 (treizeci) de zile calendaristice de la data notificării scrise a litigiului de către oricare dintre părți.',
          },
          {
            p: '**13.4.** Dacă soluționarea amiabilă nu este posibilă în termenul prevăzut la articolul 13.3, litigiul va fi soluționat de instanțele judecătorești competente din circumscripția Tribunalului Gorj, cu sediul în Târgu Jiu, județul Gorj, România.',
          },
          {
            p: '**13.5.** Consumatorii persoane fizice pot apela și la procedura de soluționare alternativă a litigiilor (SAL), prin platforma Autorității Naționale pentru Protecția Consumatorilor, disponibilă la [https://reclamatiisal.anpc.ro](https://reclamatiisal.anpc.ro).',
          },
          {
            p: '**13.6.** ANPC (Autoritatea Națională pentru Protecția Consumatorilor) poate fi sesizată de consumatori la adresa [https://anpc.ro](https://anpc.ro) sau la numărul de telefon 0219551.',
          },
        ],
      },
      {
        scurt: 'Dispoziții finale',
        titlu: 'Dispoziții finale',
        continut: [
          {
            p: '**14.1.** Dacă oricare dintre prevederile prezentului document este declarată nulă sau inaplicabilă, celelalte prevederi rămân valabile și continuă să producă efecte juridice.',
          },
          { p: '**14.2.** Neexercitarea de către Inovex a oricărui drept prevăzut în prezentul document nu constituie o renunțare la acel drept.' },
          {
            p: '**14.3.** Prezentul document, împreună cu contractul individual semnat și Politica de confidențialitate disponibilă pe site, reprezintă acordul complet dintre părți cu privire la obiectul său și înlocuiește orice negocieri, înțelegeri sau acorduri anterioare.',
          },
          {
            p: '**14.4.** Orice comunicare oficială între părți se realizează în scris, prin email, la adresele menționate în contractul individual, sau prin scrisoare recomandată cu confirmare de primire.',
          },
          { p: '**14.5.** Prezentul document a fost redactat în conformitate cu legislația română în vigoare la data de 6 noiembrie 2026.' },
        ],
      },
    ],
  },
};
