export type AppType = 'ecommerce' | 'rezervari' | 'fitness' | 'livrari' | 'business';

export interface AppMeta {
  id: AppType;
  label: string;
  icon: string;
  screenTitles: [string, string, string];
  screenDescriptions: [string, string, string];
  screenFeatures: [string[], string[], string[]];
  infoTitle: string;
  infoFeatures: [string, string];
}

export const APP_METAS: AppMeta[] = [
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: 'ShoppingBag',
    screenTitles: ['Home & Catalog', 'Detalii Produs', 'Cos si Checkout'],
    screenDescriptions: [
      'Pagina principala cu categorii, bannere promotionale si produse recomandate.',
      'Pagina produs cu imagini, variante, recenzii si optiuni de cumparare.',
      'Cosul de cumparaturi cu sumar comanda si finalizare plata.',
    ],
    screenFeatures: [
      ['Search inteligent cu autocomplete', 'Bannere promotionale dinamice', 'Grid produse cu lazy loading', 'Bottom navigation nativa'],
      ['Galerie imagini cu zoom', 'Selector variante (marime, culoare)', 'Recenzii si rating', 'Adaugare rapida in cos'],
      ['Stepper cantitate per produs', 'Cod promotional cu validare', 'Sumar comanda cu TVA', 'Finalizare cu Apple/Google Pay'],
    ],
    infoTitle: 'Aplicatie E-commerce',
    infoFeatures: ['Catalog produse cu filtre si sortare', 'Checkout cu plati mobile native'],
  },
  {
    id: 'rezervari',
    label: 'Servicii & Rezervari',
    icon: 'CalendarCheck',
    screenTitles: ['Home Servicii', 'Selectare Data si Ora', 'Confirmare Rezervare'],
    screenDescriptions: [
      'Lista servicii disponibile cu preturi orientative si specialisti.',
      'Calendar saptamanal cu slot-uri de timp disponibile si ocupate.',
      'Confirmare rezervare cu detalii complete si optiuni calendar.',
    ],
    screenFeatures: [
      ['Catalog servicii cu durata si pret', 'Profiluri specialisti cu rating', 'Filtrare dupa categorie', 'Rezervare rapida in 2 tap-uri'],
      ['Calendar saptamanal cu disponibilitate live', 'Slot-uri de timp cu stare vizuala', 'Selectare specialist preferat', 'Confirmare instant'],
      ['Confirmare vizuala animata', 'Sumar complet rezervare', 'Adaugare in calendar nativ', 'SMS si email de confirmare'],
    ],
    infoTitle: 'App Rezervari & Programari',
    infoFeatures: ['Calendar cu sincronizare in timp real', 'Notificari automate de reamintire'],
  },
  {
    id: 'fitness',
    label: 'Fitness & Sanatate',
    icon: 'Activity',
    screenTitles: ['Dashboard Activitate', 'Lista Antrenamente', 'Detalii Antrenament'],
    screenDescriptions: [
      'Dashboard zilnic cu inele de progres, statistici si antrenamentul de azi.',
      'Biblioteca de antrenamente cu filtrare pe nivel si categorie.',
      'Detalii complete antrenament cu exercitii si buton de start.',
    ],
    screenFeatures: [
      ['Inele de progres pentru 3 obiective', 'Statistici zilnice: pasi, calorii, km', 'Antrenamentul zilei recomandat', 'Integrare HealthKit / Google Fit'],
      ['Filtrare pe nivel si durata', 'Preview antrenament inainte de start', 'Antrenamente salvate offline', 'Progres si istoricul tau'],
      ['Lista exercitii cu animatii demonstrative', 'Temporizator integrat per exercitiu', 'Tracking calorii in timp real', 'Partajare rezultate social'],
    ],
    infoTitle: 'App Fitness & Wellness',
    infoFeatures: ['Inele de progres cu animatii native', 'Integrare completa cu platformele de sanatate'],
  },
  {
    id: 'livrari',
    label: 'Livrari & Logistica',
    icon: 'Truck',
    screenTitles: ['Dashboard Curier', 'Detalii Livrare', 'Confirmare Livrare'],
    screenDescriptions: [
      'Overview tura cu lista livrari, progres si navigare rapida.',
      'Detalii complete livrare cu informatii client si instructiuni speciale.',
      'Confirmare livrare cu cod, fotografie si semnatura digitala.',
    ],
    screenFeatures: [
      ['Lista livrari cu prioritate si status', 'Harta ruta optimizata', 'Progres tura in timp real', 'Comunicare directa cu dispatch'],
      ['Date complete client cu apel direct', 'Instructiuni speciale de livrare', 'Cod confirmare generat automat', 'Raportare probleme cu foto'],
      ['Confirmare cu cod unic', 'Fotografie dovada de livrare', 'Semnatura digitala client', 'Trimitere automata receipt'],
    ],
    infoTitle: 'App Livrari si Logistica',
    infoFeatures: ['GPS si ruta optimizata in timp real', 'Confirmare livrare cu semnatura digitala'],
  },
  {
    id: 'business',
    label: 'Business intern',
    icon: 'Briefcase',
    screenTitles: ['Dashboard Echipa', 'Detalii Task', 'Raport Finalizare'],
    screenDescriptions: [
      'Overview task-uri zilnice, prioritati si starea echipei de teren.',
      'Detalii complete task cu checklist, upload foto si note tehnice.',
      'Raport finalizare cu sumar, fotografii si semnatura client.',
    ],
    screenFeatures: [
      ['Task-uri prioritizate cu status live', 'Notificari push pentru task-uri noi', 'Localizare echipa pe harta', 'Comunicare interna in-app'],
      ['Checklist pasi cu bifuri functionale', 'Upload fotografii dovada', 'Note tehnice cu timestamp', 'Geolocationare automata la sosire'],
      ['Raport PDF generat automat', 'Semnatura digitala client', 'Trimitere email automat', 'Arhiva rapoarte accesibila offline'],
    ],
    infoTitle: 'App Business Intern',
    infoFeatures: ['Checklist-uri interactive cu validare', 'Rapoarte generate si trimise automat'],
  },
];
