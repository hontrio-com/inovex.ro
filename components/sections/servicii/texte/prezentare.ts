import type { Limba } from '@/lib/i18n/config';
import type { Tr } from '.';

/* Animatia website-ului de prezentare (filmPrezentare.ts: Arcadia, birou de arhitectura) in engleza,
   germana, franceza. Orasul biroului e din tara limbii (Londra, München, Lyon), cu domeniul de acolo.
   In editorul de cod, numele din cod sunt in engleza (Services, projects), ca in orice proiect; codul e
   construit direct pe limba (fisiere()), restul textelor se traduc dupa scena (STATIC). */

export const STATIC: Record<string, Tr> = {
  'arcadia-studio.ro': ['arcadia-studio.co.uk', 'arcadia-studio.de', 'arcadia-studio.fr'],
  Acasă: ['Home', 'Startseite', 'Accueil'],
  Proiecte: ['Projects', 'Projekte', 'Projets'],
  Servicii: ['Services', 'Leistungen', 'Services'],
  Despre: ['About', 'Über uns', 'À propos'],
  Contact: ['Contact', 'Kontakt', 'Contact'],
  'Programează o vizită': ['Book a visit', 'Besuch vereinbaren', 'Prendre rendez-vous'],
  'Spații gândite pentru tine': ['Spaces designed for you', 'Räume, für Sie gedacht', 'Des espaces pensés pour vous'],
  'Case și birouri proiectate de la zero, cu materiale alese atent și grijă pentru fiecare detaliu.': [
    'Homes and offices designed from scratch, with carefully chosen materials and attention to every detail.',
    'Häuser und Büros, von Grund auf geplant, mit sorgfältig ausgewählten Materialien und Liebe zum Detail.',
    'Maisons et bureaux conçus de zéro, avec des matériaux choisis avec soin et une attention à chaque détail.',
  ],
  'Află mai multe': ['Learn more', 'Mehr erfahren', 'En savoir plus'],
  'Te ghidăm de la primul teren vizitat până la cheile casei, cu un singur partener.': [
    'We guide you from the first site visit to the keys of your home, with a single partner.',
    'Wir begleiten Sie vom ersten Grundstücksbesuch bis zur Schlüsselübergabe, mit einem einzigen Partner.',
    'Nous vous accompagnons de la première visite du terrain jusqu’à la remise des clés, avec un seul partenaire.',
  ],
  'Caută un proiect sau o locație': ['Search for a project or location', 'Projekt oder Ort suchen', 'Rechercher un projet ou un lieu'],
  Filtrează: ['Filter', 'Filtern', 'Filtrer'],
  'Nr.1': ['No. 1', 'Nr. 1', 'N° 1'],
  'Nr.2': ['No. 2', 'Nr. 2', 'N° 2'],
  'Nr.3': ['No. 3', 'Nr. 3', 'N° 3'],
  'Analizăm terenul': ['We analyse the site', 'Wir analysieren das Grundstück', 'Nous analysons le terrain'],
  'Vizităm locul, studiem orientarea și reglementările, ca să știi exact ce poți construi.': [
    'We visit the plot and study its orientation and regulations, so you know exactly what you can build.',
    'Wir besichtigen das Grundstück und prüfen Ausrichtung und Vorschriften, damit Sie genau wissen, was Sie bauen können.',
    'Nous visitons le terrain, étudions l’orientation et la réglementation, pour que vous sachiez exactement ce que vous pouvez construire.',
  ],
  'Proiectăm de la zero': ['We design from scratch', 'Wir planen von Grund auf', 'Nous concevons de zéro'],
  'Schițe, randări și planuri tehnice, ajustate împreună cu tine până la ultimul detaliu.': [
    'Sketches, renders and technical drawings, refined together with you down to the last detail.',
    'Skizzen, Renderings und technische Pläne, gemeinsam mit Ihnen bis ins letzte Detail abgestimmt.',
    'Croquis, rendus et plans techniques, ajustés avec vous jusqu’au moindre détail.',
  ],
  'Construim împreună': ['We build together', 'Wir bauen gemeinsam', 'Nous construisons ensemble'],
  'Coordonăm autorizațiile și echipele, iar tu primești cheile unei case gata de locuit.': [
    'We coordinate the permits and the teams, and you get the keys to a home that’s ready to live in.',
    'Wir koordinieren Genehmigungen und Teams, und Sie erhalten die Schlüssel für ein bezugsfertiges Haus.',
    'Nous coordonnons les autorisations et les équipes, et vous recevez les clés d’une maison prête à habiter.',
  ],
  'Case moderne, birouri și renovări care pun lumina, materialele și oamenii pe primul loc.': [
    'Modern homes, offices and renovations that put light, materials and people first.',
    'Moderne Häuser, Büros und Renovierungen, bei denen Licht, Materialien und Menschen an erster Stelle stehen.',
    'Maisons modernes, bureaux et rénovations qui placent la lumière, les matériaux et les gens au premier plan.',
  ],
  'Casa Feleac': ['Meadow House', 'Wiesenhaus', 'Maison des prés'],
  '2024 · Cluj': ['2024 · London', '2024 · München', '2024 · Lyon'],
  'Casa din pădure': ['Forest House', 'Haus im Wald', 'Maison dans les bois'],
  'Casa Lumina': ['Lumina House', 'Haus Lumina', 'Maison Lumina'],
  'Refugiul Beliș': ['Lakeside Retreat', 'Refugium am See', 'Refuge du lac'],
  'Casa Sălicea': ['Hillside House', 'Haus am Hang', 'Maison de la colline'],
  FIȘIERE: ['FILES', 'DATEIEN', 'FICHIERS'],
  'Servicii.jsx': ['Services.jsx', 'Services.jsx', 'Services.jsx'],
  PROBLEME: ['PROBLEMS', 'PROBLEME', 'PROBLÈMES'],
  IEȘIRE: ['OUTPUT', 'AUSGABE', 'SORTIE'],
  '✓ Compilat cu succes în 0,8 s': ['✓ Compiled successfully in 0.8 s', '✓ Erfolgreich kompiliert in 0,8 s', '✓ Compilé avec succès en 0,8 s'],
  '✓ Baza de date e pregătită': ['✓ Database is ready', '✓ Datenbank ist bereit', '✓ Base de données prête'],
  '✓ 0 erori': ['✓ 0 errors', '✓ 0 Fehler', '✓ 0 erreur'],
  'https://arcadia-studio.ro/': ['https://arcadia-studio.co.uk/', 'https://arcadia-studio.de/', 'https://arcadia-studio.fr/'],
  Mobil: ['Mobile', 'Mobil', 'Mobile'],
  Desktop: ['Desktop', 'Desktop', 'Ordinateur'],
  Performanță: ['Performance', 'Leistung', 'Performances'],
  Accesibilitate: ['Accessibility', 'Barrierefreiheit', 'Accessibilité'],
  'Cele mai bune practici': ['Best practices', 'Best Practices', 'Bonnes pratiques'],
  '0,6 s': ['0.6 s', '0,6 s', '0,6 s'],
  '0,9 s': ['0.9 s', '0,9 s', '0,9 s'],
  'arhitect cluj': ['architect london', 'architekt münchen', 'architecte lyon'],
  Toate: ['All', 'Alle', 'Tous'],
  Imagini: ['Images', 'Bilder', 'Images'],
  Hărți: ['Maps', 'Maps', 'Maps'],
  Știri: ['News', 'News', 'Actualités'],
  Videoclipuri: ['Videos', 'Videos', 'Vidéos'],
  'Mai mult': ['More', 'Mehr', 'Plus'],
  'Aproximativ 1.240.000 de rezultate (0,38 secunde)': [
    'About 1,240,000 results (0.38 seconds)',
    'Ungefähr 1.240.000 Ergebnisse (0,38 Sekunden)',
    'Environ 1 240 000 résultats (0,38 secondes)',
  ],
  'Atelier Demo Arhitecți': ['Demo Architects Studio', 'Atelier Demo Architekten', 'Atelier Démo Architectes'],
  'https://atelier-demo.ro › proiectare': ['https://atelier-demo.co.uk › design', 'https://atelier-demo.de › planung', 'https://atelier-demo.fr › conception'],
  'Atelier Demo – Birou de arhitectură': ['Demo Studio – Architecture practice', 'Atelier Demo – Architekturbüro', 'Atelier Démo – Cabinet d’architecture'],
  'Proiectare clădiri rezidențiale și industriale în toată țara.': [
    'Residential and industrial building design nationwide.',
    'Planung von Wohn- und Industriegebäuden bundesweit.',
    'Conception de bâtiments résidentiels et industriels dans toute la France.',
  ],
  'Birou Exemplu': ['Example Office', 'Büro Beispiel', 'Bureau Exemple'],
  'https://birou-exemplu.ro': ['https://example-office.co.uk', 'https://buero-beispiel.de', 'https://bureau-exemple.fr'],
  'Birou Exemplu – Proiectare și execuție': ['Example Office – Design and build', 'Büro Beispiel – Planung und Ausführung', 'Bureau Exemple – Conception et réalisation'],
  'Servicii complete de proiectare și execuție în Transilvania.': [
    'Full design and build services across South East England.',
    'Komplette Planung und Ausführung in ganz Bayern.',
    'Conception et réalisation clés en main en Auvergne-Rhône-Alpes.',
  ],
  'https://arcadia-studio.ro › proiecte': ['https://arcadia-studio.co.uk › projects', 'https://arcadia-studio.de › projekte', 'https://arcadia-studio.fr › projets'],
  'Arcadia Studio – Arhitectură și design interior în Cluj': [
    'Arcadia Studio – Architecture and interior design in London',
    'Arcadia Studio – Architektur und Innenarchitektur in München',
    'Arcadia Studio – Architecture et design d’intérieur à Lyon',
  ],
  'Evaluare: 4,9 · 128 de recenzii': ['Rating: 4.9 · 128 reviews', 'Bewertung: 4,9 · 128 Rezensionen', 'Note : 4,9 · 128 avis'],
  'Asistent AI': ['AI assistant', 'KI-Assistent', 'Assistant IA'],
  'Ce birou de arhitectură îmi recomanzi în Cluj?': [
    'Which architecture firm would you recommend in London?',
    'Welches Architekturbüro in München können Sie mir empfehlen?',
    'Quel cabinet d’architecture me recommandez-vous à Lyon ?',
  ],
  'Am căutat pe web · 4 surse': ['Searched the web · 4 sources', 'Im Web gesucht · 4 Quellen', 'Recherche sur le web · 4 sources'],
  'Întreabă orice': ['Ask anything', 'Alles fragen', 'Posez une question'],
  'Site-ul tău, recomandat de asistenții AI': [
    'Your website, recommended by AI assistants',
    'Ihre Website, empfohlen von KI-Assistenten',
    'Votre site, recommandé par les assistants IA',
  ],
};

type Dinamic = { adresa: string; raspuns: string; oras: string; titlu: string; link: string };

export const DINAMIC: Record<Limba, Dinamic> = {
  ro: {
    adresa: 'arcadia-studio.ro',
    raspuns:
      'Îți recomand Arcadia Studio, un birou de arhitectură din Cluj-Napoca. Fac proiecte rezidențiale și comerciale, design interior și consultanță, totul gândit de la zero, și au recenzii foarte bune de la clienți.',
    oras: 'Cluj',
    titlu: 'Spații gândite pentru tine.',
    link: 'Vezi proiectele',
  },
  en: {
    adresa: 'arcadia-studio.co.uk',
    raspuns:
      'I recommend Arcadia Studio, an architecture practice in London. They do residential and commercial projects, interior design and consultancy, all designed from scratch, and they have excellent reviews from clients.',
    oras: 'London',
    titlu: 'Spaces designed for you.',
    link: 'View projects',
  },
  de: {
    adresa: 'arcadia-studio.de',
    raspuns:
      'Ich empfehle Arcadia Studio, ein Architekturbüro in München. Es plant Wohn- und Gewerbeprojekte, Innenarchitektur und Beratung, alles von Grund auf, und hat sehr gute Kundenbewertungen.',
    oras: 'München',
    titlu: 'Räume, für Sie gedacht.',
    link: 'Projekte ansehen',
  },
  fr: {
    adresa: 'arcadia-studio.fr',
    raspuns:
      'Je vous recommande Arcadia Studio, un cabinet d’architecture à Lyon. Ils réalisent des projets résidentiels et commerciaux, du design d’intérieur et du conseil, le tout conçu de zéro, et ont d’excellents avis clients.',
    oras: 'Lyon',
    titlu: 'Des espaces pensés pour vous.',
    link: 'Voir les projets',
  },
};

/** Fisierele din editorul de cod, in limbile straine (in romana raman cele din filmPrezentare.ts). */
export function fisiere(d: Dinamic): [string, string[]][] {
  return [
    ['page.tsx', ["import Hero from '@/components/Hero'", "import Services from '@/components/Services'", '', 'export const metadata = {', "  title: 'Arcadia Studio – " + d.oras + "',", '}', '', 'export default function Page() {', '  return <><Hero /><Services /></>', '}']],
    ['Hero.jsx', ['export default function Hero() {', '  return (', '    <section className="hero">', '      <h1>' + d.titlu + '</h1>', '      <a href="/projects">' + d.link + '</a>', '    </section>', '  )', '}']],
    ['web.php', ['<?php', '', 'use App\\Http\\Controllers\\Projects;', '', "Route::get('/', fn () => view('home'));", "Route::resource('projects', Projects::class);", "Route::post('/contact', Contact::class);"]],
  ];
}
