export type DealStatus = 'Calificat' | 'Propunere trimisa' | 'Negociere' | 'Castigat';
export type ClientStatus = 'Client activ' | 'Prospect' | 'Negociere' | 'Inactiv';
export type ActivityType = 'Phone' | 'Mail' | 'Meeting' | 'Task' | 'Auto' | 'Note';
export type OfertaStatus = 'Draft' | 'Trimisa' | 'In negociere' | 'Acceptata' | 'Refuzata' | 'Expirata';

export interface KanbanDeal {
  id: string;
  company: string;
  value: number;
  agent: string;
  date: string;
  tag: string;
  status: DealStatus;
  probability?: number;
  description?: string;
}

export interface CrmClient {
  id: string;
  company: string;
  cui: string;
  contact: string;
  email: string;
  phone: string;
  status: ClientStatus;
  totalValue: number;
  agent: string;
  industry: string;
  address?: string;
  website?: string;
  employees?: number;
}

export interface CrmActivity {
  id: string;
  time: string;
  type: ActivityType;
  title: string;
  agent: string;
  company?: string;
  status: 'Finalizat' | 'Programat' | 'Intarziat';
  important?: boolean;
  auto?: boolean;
}

export interface CrmOferta {
  id: string;
  nr: string;
  client: string;
  contact: string;
  agent: string;
  value: number;
  dateTrimisa: string;
  valabilaPana: string;
  status: OfertaStatus;
}

export interface TeamPerformance {
  agent: string;
  initials: string;
  revenue: number;
  target: number;
  deals: number;
  color: string;
}

export interface RecentDeal {
  id: string;
  company: string;
  value: number;
  status: DealStatus;
  agent: string;
  date: string;
}

export interface TeamActivityItem {
  id: string;
  agent: string;
  initials: string;
  action: string;
  company: string;
  time: string;
  color: string;
}

export const KANBAN_DEALS: KanbanDeal[] = [
  {
    id: 'd1',
    company: 'Grup Industrial Oltenia SRL',
    value: 48000,
    agent: 'Ion Popescu',
    date: '12 Apr',
    tag: 'ERP',
    status: 'Calificat',
    probability: 20,
    description: 'Implementare sistem ERP pentru gestiunea stocurilor si productiei. Client cu 3 fabrici in Oltenia.',
  },
  {
    id: 'd2',
    company: 'Constructii Premium SA',
    value: 32000,
    agent: 'Maria Ionescu',
    date: '14 Apr',
    tag: 'CRM',
    status: 'Calificat',
    probability: 25,
    description: 'CRM pentru forta de vanzari - 15 agenti. Integrare cu sistemul de ofertare existent.',
  },
  {
    id: 'd3',
    company: 'Retail Fast SRL',
    value: 22000,
    agent: 'Andrei Stancu',
    date: '15 Apr',
    tag: 'CMS',
    status: 'Calificat',
    probability: 30,
    description: 'Platforma CMS multi-site pentru 5 magazine online cu stoc centralizat.',
  },
  {
    id: 'd4',
    company: 'Farmaceutica Moldova SA',
    value: 67000,
    agent: 'Ion Popescu',
    date: '10 Apr',
    tag: 'ERP',
    status: 'Propunere trimisa',
    probability: 45,
    description: 'ERP farmaceutic cu modul de trasabilitate produse, conformitate FDA si integrare cu ANSVSA.',
  },
  {
    id: 'd5',
    company: 'Turism Carpati SRL',
    value: 28000,
    agent: 'Elena Dumitrescu',
    date: '11 Apr',
    tag: 'CRM',
    status: 'Propunere trimisa',
    probability: 40,
    description: 'CRM pentru agentie de turism - rezervari, clienti fideli, campanii sezoniere.',
  },
  {
    id: 'd6',
    company: 'Logistica Trans-Europa SRL',
    value: 41000,
    agent: 'Mihai Georgescu',
    date: '09 Apr',
    tag: 'ERP',
    status: 'Propunere trimisa',
    probability: 50,
    description: 'Modul de gestiune flota si rute pentru 120 vehicule. Integrare GPS si tachografe digitale.',
  },
  {
    id: 'd7',
    company: 'Imobiliare Premium Grup',
    value: 35000,
    agent: 'Ion Popescu',
    date: '08 Apr',
    tag: 'CRM',
    status: 'Negociere',
    probability: 65,
    description: 'CRM imobiliar cu portofoliu proprietati, automatizari marketing si portalul agentilor.',
  },
  {
    id: 'd8',
    company: 'AutoService Pro SRL',
    value: 19000,
    agent: 'Maria Ionescu',
    date: '07 Apr',
    tag: 'CMS',
    status: 'Negociere',
    probability: 70,
    description: 'Sistem de programari online si gestiune service auto. Notificari SMS automate.',
  },
  {
    id: 'd9',
    company: 'Medical Center Cluj SA',
    value: 54000,
    agent: 'Andrei Stancu',
    date: '06 Apr',
    tag: 'ERP',
    status: 'Negociere',
    probability: 75,
    description: 'Sistem integrat clinica - programari, dosare pacient, facturare Casa de Sanatate.',
  },
  {
    id: 'd10',
    company: 'Software Solutions Timisoara',
    value: 38000,
    agent: 'Elena Dumitrescu',
    date: '01 Apr',
    tag: 'CRM',
    status: 'Castigat',
    probability: 100,
    description: 'CRM B2B cu pipeline de vanzari, email automation si integrare cu sistemul de ticketing.',
  },
  {
    id: 'd11',
    company: 'Producator Lactate Arges SRL',
    value: 72000,
    agent: 'Ion Popescu',
    date: '28 Mar',
    tag: 'ERP',
    status: 'Castigat',
    probability: 100,
    description: 'ERP productie alimentara cu trasabilitate lot, gestiune retete si raportare ANSVSA.',
  },
  {
    id: 'd12',
    company: 'eCommerce Rapid SRL',
    value: 25000,
    agent: 'Mihai Georgescu',
    date: '25 Mar',
    tag: 'CMS',
    status: 'Castigat',
    probability: 100,
    description: 'Platforma headless CMS cu integrare marketplace-uri (eMAG, Altex, PC Garage).',
  },
];

export const CRM_CLIENTS: CrmClient[] = [
  {
    id: 'c1',
    company: 'Grup Industrial Oltenia SRL',
    cui: 'RO 12345678',
    contact: 'Gheorghe Marin',
    email: 'g.marin@grupoltenia.ro',
    phone: '0740 123 456',
    status: 'Negociere',
    totalValue: 48000,
    agent: 'Ion Popescu',
    industry: 'Productie industriala',
    address: 'Str. Industriilor 45, Craiova, Dolj',
    website: 'www.grupoltenia.ro',
    employees: 240,
  },
  {
    id: 'c2',
    company: 'Farmaceutica Moldova SA',
    cui: 'RO 23456789',
    contact: 'Dr. Anca Petrescu',
    email: 'a.petrescu@farmaceutica.md',
    phone: '0756 234 567',
    status: 'Client activ',
    totalValue: 67000,
    agent: 'Ion Popescu',
    industry: 'Farmaceutic',
    address: 'Bd. Stefan cel Mare 12, Iasi, Iasi',
    website: 'www.farmaceutica-moldova.ro',
    employees: 180,
  },
  {
    id: 'c3',
    company: 'Software Solutions Timisoara',
    cui: 'RO 34567890',
    contact: 'Radu Nicolin',
    email: 'r.nicolin@softsol.ro',
    phone: '0721 345 678',
    status: 'Client activ',
    totalValue: 38000,
    agent: 'Elena Dumitrescu',
    industry: 'IT & Software',
    address: 'Str. Take Ionescu 8, Timisoara, Timis',
    website: 'www.softsol.ro',
    employees: 65,
  },
  {
    id: 'c4',
    company: 'Medical Center Cluj SA',
    cui: 'RO 45678901',
    contact: 'Dr. Mihai Pop',
    email: 'm.pop@medcentercluj.ro',
    phone: '0733 456 789',
    status: 'Negociere',
    totalValue: 54000,
    agent: 'Andrei Stancu',
    industry: 'Sanatate',
    address: 'Str. Clinicilor 22, Cluj-Napoca, Cluj',
    website: 'www.medicalcentercluj.ro',
    employees: 120,
  },
  {
    id: 'c5',
    company: 'Retail Fast SRL',
    cui: 'RO 56789012',
    contact: 'Cristina Teodorescu',
    email: 'c.teodorescu@retailfast.ro',
    phone: '0745 567 890',
    status: 'Prospect',
    totalValue: 22000,
    agent: 'Andrei Stancu',
    industry: 'Comert cu amanuntul',
    address: 'Bd. Magheru 15, Bucuresti, Ilfov',
    website: 'www.retailfast.ro',
    employees: 85,
  },
  {
    id: 'c6',
    company: 'Logistica Trans-Europa SRL',
    cui: 'RO 67890123',
    contact: 'Bogdan Alexe',
    email: 'b.alexe@transeuropa.ro',
    phone: '0768 678 901',
    status: 'Client activ',
    totalValue: 41000,
    agent: 'Mihai Georgescu',
    industry: 'Transport & Logistica',
    address: 'Calea Victoriei 100, Ploiesti, Prahova',
    website: 'www.transeuropa.ro',
    employees: 310,
  },
  {
    id: 'c7',
    company: 'Turism Carpati SRL',
    cui: 'RO 78901234',
    contact: 'Simona Badea',
    email: 's.badea@turismcarpati.ro',
    phone: '0752 789 012',
    status: 'Prospect',
    totalValue: 28000,
    agent: 'Elena Dumitrescu',
    industry: 'Turism & Ospitalitate',
    address: 'Str. Republicii 5, Brasov, Brasov',
    website: 'www.turismcarpati.ro',
    employees: 42,
  },
  {
    id: 'c8',
    company: 'Constructii Premium SA',
    cui: 'RO 89012345',
    contact: 'Victor Popa',
    email: 'v.popa@constructiipremium.ro',
    phone: '0724 890 123',
    status: 'Prospect',
    totalValue: 32000,
    agent: 'Maria Ionescu',
    industry: 'Constructii',
    address: 'Str. Aviatorilor 30, Pitesti, Arges',
    website: 'www.constructiipremium.ro',
    employees: 155,
  },
  {
    id: 'c9',
    company: 'Imobiliare Premium Grup',
    cui: 'RO 90123456',
    contact: 'Daniela Florea',
    email: 'd.florea@impremium.ro',
    phone: '0739 901 234',
    status: 'Negociere',
    totalValue: 35000,
    agent: 'Ion Popescu',
    industry: 'Imobiliare',
    address: 'Bd. Decebal 78, Constanta, Constanta',
    website: 'www.impremium.ro',
    employees: 28,
  },
  {
    id: 'c10',
    company: 'eCommerce Rapid SRL',
    cui: 'RO 01234567',
    contact: 'Alexandru Nita',
    email: 'a.nita@ecomrapid.ro',
    phone: '0712 012 345',
    status: 'Client activ',
    totalValue: 25000,
    agent: 'Mihai Georgescu',
    industry: 'eCommerce',
    address: 'Str. Ion Mihalache 4, Bucuresti, Ilfov',
    website: 'www.ecomrapid.ro',
    employees: 38,
  },
];

export const CRM_ACTIVITIES: CrmActivity[] = [
  {
    id: 'a1',
    time: '09:00',
    type: 'Phone',
    title: 'Apel de follow-up - propunere ERP',
    agent: 'Ion Popescu',
    company: 'Farmaceutica Moldova SA',
    status: 'Finalizat',
    important: true,
  },
  {
    id: 'a2',
    time: '09:45',
    type: 'Mail',
    title: 'Trimis contract semnat catre client',
    agent: 'Elena Dumitrescu',
    company: 'Software Solutions Timisoara',
    status: 'Finalizat',
    auto: true,
  },
  {
    id: 'a3',
    time: '10:30',
    type: 'Meeting',
    title: 'Demo produs - echipa de management',
    agent: 'Andrei Stancu',
    company: 'Medical Center Cluj SA',
    status: 'Programat',
    important: true,
  },
  {
    id: 'a4',
    time: '11:00',
    type: 'Auto',
    title: 'Email automat: oferta expirata in 3 zile',
    agent: 'Sistem',
    company: 'Turism Carpati SRL',
    status: 'Finalizat',
    auto: true,
  },
  {
    id: 'a5',
    time: '12:00',
    type: 'Task',
    title: 'Pregatire analiza procese - vizita client',
    agent: 'Maria Ionescu',
    company: 'Constructii Premium SA',
    status: 'Programat',
  },
  {
    id: 'a6',
    time: '13:30',
    type: 'Phone',
    title: 'Apel negociere - reducere termen implementare',
    agent: 'Ion Popescu',
    company: 'Imobiliare Premium Grup',
    status: 'Programat',
  },
  {
    id: 'a7',
    time: '14:15',
    type: 'Mail',
    title: 'Raspuns la clarificari tehnice - anexa 3',
    agent: 'Andrei Stancu',
    company: 'Grup Industrial Oltenia SRL',
    status: 'Intarziat',
    important: true,
  },
  {
    id: 'a8',
    time: '15:00',
    type: 'Meeting',
    title: 'Workshop analiza fluxuri logistica',
    agent: 'Mihai Georgescu',
    company: 'Logistica Trans-Europa SRL',
    status: 'Programat',
  },
  {
    id: 'a9',
    time: '16:00',
    type: 'Note',
    title: 'Nota interna: client solicita modul HR suplimentar',
    agent: 'Ion Popescu',
    company: 'Farmaceutica Moldova SA',
    status: 'Finalizat',
  },
  {
    id: 'a10',
    time: '17:00',
    type: 'Auto',
    title: 'Raport saptamanal activitate echipa generat',
    agent: 'Sistem',
    status: 'Finalizat',
    auto: true,
  },
];

export const CRM_OFERTE: CrmOferta[] = [
  {
    id: 'o1',
    nr: 'OF-2026-047',
    client: 'Farmaceutica Moldova SA',
    contact: 'Dr. Anca Petrescu',
    agent: 'Ion Popescu',
    value: 67000,
    dateTrimisa: '02 Apr 2026',
    valabilaPana: '02 Mai 2026',
    status: 'In negociere',
  },
  {
    id: 'o2',
    nr: 'OF-2026-046',
    client: 'Medical Center Cluj SA',
    contact: 'Dr. Mihai Pop',
    agent: 'Andrei Stancu',
    value: 54000,
    dateTrimisa: '01 Apr 2026',
    valabilaPana: '01 Mai 2026',
    status: 'Trimisa',
  },
  {
    id: 'o3',
    nr: 'OF-2026-045',
    client: 'Software Solutions Timisoara',
    contact: 'Radu Nicolin',
    agent: 'Elena Dumitrescu',
    value: 38000,
    dateTrimisa: '28 Mar 2026',
    valabilaPana: '28 Apr 2026',
    status: 'Acceptata',
  },
  {
    id: 'o4',
    nr: 'OF-2026-044',
    client: 'Imobiliare Premium Grup',
    contact: 'Daniela Florea',
    agent: 'Ion Popescu',
    value: 35000,
    dateTrimisa: '27 Mar 2026',
    valabilaPana: '27 Apr 2026',
    status: 'In negociere',
  },
  {
    id: 'o5',
    nr: 'OF-2026-043',
    client: 'Logistica Trans-Europa SRL',
    contact: 'Bogdan Alexe',
    agent: 'Mihai Georgescu',
    value: 41000,
    dateTrimisa: '25 Mar 2026',
    valabilaPana: '25 Apr 2026',
    status: 'Trimisa',
  },
  {
    id: 'o6',
    nr: 'OF-2026-042',
    client: 'Grup Industrial Oltenia SRL',
    contact: 'Gheorghe Marin',
    agent: 'Ion Popescu',
    value: 48000,
    dateTrimisa: '22 Mar 2026',
    valabilaPana: '22 Apr 2026',
    status: 'Draft',
  },
  {
    id: 'o7',
    nr: 'OF-2026-041',
    client: 'Constructii Premium SA',
    contact: 'Victor Popa',
    agent: 'Maria Ionescu',
    value: 32000,
    dateTrimisa: '20 Mar 2026',
    valabilaPana: '20 Apr 2026',
    status: 'Trimisa',
  },
  {
    id: 'o8',
    nr: 'OF-2026-040',
    client: 'Turism Carpati SRL',
    contact: 'Simona Badea',
    agent: 'Elena Dumitrescu',
    value: 28000,
    dateTrimisa: '18 Mar 2026',
    valabilaPana: '18 Apr 2026',
    status: 'Expirata',
  },
  {
    id: 'o9',
    nr: 'OF-2026-039',
    client: 'Retail Fast SRL',
    contact: 'Cristina Teodorescu',
    agent: 'Andrei Stancu',
    value: 22000,
    dateTrimisa: '15 Mar 2026',
    valabilaPana: '15 Apr 2026',
    status: 'Refuzata',
  },
  {
    id: 'o10',
    nr: 'OF-2026-038',
    client: 'eCommerce Rapid SRL',
    contact: 'Alexandru Nita',
    agent: 'Mihai Georgescu',
    value: 25000,
    dateTrimisa: '12 Mar 2026',
    valabilaPana: '12 Apr 2026',
    status: 'Acceptata',
  },
  {
    id: 'o11',
    nr: 'OF-2026-037',
    client: 'AutoService Pro SRL',
    contact: 'Dan Avram',
    agent: 'Maria Ionescu',
    value: 19000,
    dateTrimisa: '10 Mar 2026',
    valabilaPana: '10 Apr 2026',
    status: 'In negociere',
  },
  {
    id: 'o12',
    nr: 'OF-2026-036',
    client: 'Producator Lactate Arges SRL',
    contact: 'Florin Toma',
    agent: 'Ion Popescu',
    value: 72000,
    dateTrimisa: '05 Mar 2026',
    valabilaPana: '05 Apr 2026',
    status: 'Acceptata',
  },
];

export const TEAM_PERFORMANCE: TeamPerformance[] = [
  {
    agent: 'Ion Popescu',
    initials: 'IP',
    revenue: 270000,
    target: 90,
    deals: 8,
    color: 'from-[#2B8FCC] to-[#1a6fa8]',
  },
  {
    agent: 'Elena Dumitrescu',
    initials: 'ED',
    revenue: 185000,
    target: 74,
    deals: 5,
    color: 'from-[#16a34a] to-[#15803d]',
  },
  {
    agent: 'Andrei Stancu',
    initials: 'AS',
    revenue: 214000,
    target: 82,
    deals: 6,
    color: 'from-[#9333ea] to-[#7e22ce]',
  },
  {
    agent: 'Maria Ionescu',
    initials: 'MI',
    revenue: 163000,
    target: 65,
    deals: 4,
    color: 'from-[#ea580c] to-[#c2410c]',
  },
  {
    agent: 'Mihai Georgescu',
    initials: 'MG',
    revenue: 198000,
    target: 79,
    deals: 5,
    color: 'from-[#0891b2] to-[#0e7490]',
  },
];

export const RECENT_DEALS: RecentDeal[] = [
  {
    id: 'rd1',
    company: 'Producator Lactate Arges SRL',
    value: 72000,
    status: 'Castigat',
    agent: 'Ion Popescu',
    date: '28 Mar',
  },
  {
    id: 'rd2',
    company: 'Software Solutions Timisoara',
    value: 38000,
    status: 'Castigat',
    agent: 'Elena Dumitrescu',
    date: '01 Apr',
  },
  {
    id: 'rd3',
    company: 'eCommerce Rapid SRL',
    value: 25000,
    status: 'Castigat',
    agent: 'Mihai Georgescu',
    date: '25 Mar',
  },
  {
    id: 'rd4',
    company: 'Farmaceutica Moldova SA',
    value: 67000,
    status: 'Negociere',
    agent: 'Ion Popescu',
    date: '02 Apr',
  },
  {
    id: 'rd5',
    company: 'Medical Center Cluj SA',
    value: 54000,
    status: 'Negociere',
    agent: 'Andrei Stancu',
    date: '01 Apr',
  },
];

export const TEAM_ACTIVITY: TeamActivityItem[] = [
  {
    id: 'ta1',
    agent: 'Ion Popescu',
    initials: 'IP',
    action: 'a castigat deal-ul cu',
    company: 'Producator Lactate Arges SRL',
    time: '28 Mar, 16:42',
    color: 'from-[#2B8FCC] to-[#1a6fa8]',
  },
  {
    id: 'ta2',
    agent: 'Elena Dumitrescu',
    initials: 'ED',
    action: 'a trimis oferta catre',
    company: 'Software Solutions Timisoara',
    time: '01 Apr, 10:15',
    color: 'from-[#16a34a] to-[#15803d]',
  },
  {
    id: 'ta3',
    agent: 'Andrei Stancu',
    initials: 'AS',
    action: 'a programat demo cu',
    company: 'Medical Center Cluj SA',
    time: '01 Apr, 14:30',
    color: 'from-[#9333ea] to-[#7e22ce]',
  },
  {
    id: 'ta4',
    agent: 'Maria Ionescu',
    initials: 'MI',
    action: 'a adaugat oportunitate la',
    company: 'Constructii Premium SA',
    time: '02 Apr, 09:00',
    color: 'from-[#ea580c] to-[#c2410c]',
  },
  {
    id: 'ta5',
    agent: 'Mihai Georgescu',
    initials: 'MG',
    action: 'a finalizat negocierea cu',
    company: 'eCommerce Rapid SRL',
    time: '02 Apr, 11:20',
    color: 'from-[#0891b2] to-[#0e7490]',
  },
];
