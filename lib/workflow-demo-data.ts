export type NodeType = 'trigger' | 'ai' | 'conditie' | 'actiune' | 'notificare';

export type NodeStatus = 'idle' | 'processing' | 'completed' | 'error';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  title: string;
  subtitle?: string;
  icon: string; // lucide icon name as string
  branches?: string[]; // for conditie nodes
}

export interface WorkflowConnection {
  from: string;
  to: string;
  label?: string;
}

export interface LogEntry {
  time: string;
  status: 'ok' | 'processing' | 'error';
  text: string;
  sub?: string;
}

export interface ScenarioStats {
  stat1: string;
  stat2: string;
  stat3: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: number;
  stats: ScenarioStats;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  logs: LogEntry[];
  actionsCount: number;
  duration: string;
}

// NODE TYPE COLORS (for reference in components):
// trigger: amber #F59E0B, bg #FEF3C7
// ai: violet #8B5CF6, bg #EDE9FE
// conditie: orange #F97316, bg #FFEDD5
// actiune: blue #2B8FCC, bg #EAF5FF
// notificare: green #10B981, bg #D1FAE5

export const SCENARIOS: Scenario[] = [
  {
    id: 'emailuri',
    title: 'Emailuri primite',
    description: 'Clasificare si raspuns automat',
    icon: 'Mail',
    steps: 6,
    stats: {
      stat1: '2.4h/zi economite',
      stat2: 'Zero emailuri pierdute',
      stat3: '-60% timp procesare',
    },
    nodes: [
      { id: 'n1', type: 'trigger', title: 'Email primit', subtitle: 'inbox@firma.ro', icon: 'Mail' },
      { id: 'n2', type: 'ai', title: 'Intelege mesajul', subtitle: 'Ce vrea expeditorul?', icon: 'Brain' },
      { id: 'n3', type: 'conditie', title: 'Ce tip de email?', icon: 'GitBranch', branches: ['Client nou', 'Reclamatie', 'Altele'] },
      { id: 'n4a', type: 'actiune', title: 'Salveaza clientul nou', icon: 'UserPlus' },
      { id: 'n4b', type: 'actiune', title: 'Deschide cerere suport', icon: 'Ticket' },
      { id: 'n5', type: 'ai', title: 'Scrie raspunsul', subtitle: 'Adaptat la situatie', icon: 'PenLine' },
      { id: 'n6', type: 'actiune', title: 'Trimite raspuns automat', icon: 'Send' },
      { id: 'n7', type: 'notificare', title: 'Anunta echipa', subtitle: 'Email + notificare interna', icon: 'Bell' },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4a', label: 'Lead nou' },
      { from: 'n3', to: 'n4b', label: 'Reclamatie' },
      { from: 'n4a', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n6', to: 'n7' },
    ],
    logs: [
      { time: '00:00:00', status: 'ok', text: 'Trigger declansat - email primit de la andrei@startup.ro' },
      { time: '00:00:01', status: 'processing', text: 'AI analizeaza continutul emailului...' },
      { time: '00:00:02', status: 'ok', text: 'Analiza completa - clasificat ca: Lead nou', sub: 'Confidenta: 94.2% - Industrie: SaaS - Buget: estimat mediu' },
      { time: '00:00:02', status: 'processing', text: 'Se adauga lead in CRM...' },
      { time: '00:00:03', status: 'ok', text: 'Lead creat in CRM - ID: #LD-2847', sub: 'Alocat automat: Ion Popescu (agent disponibil)' },
      { time: '00:00:03', status: 'processing', text: 'AI genereaza raspuns personalizat...' },
      { time: '00:00:04', status: 'ok', text: 'Raspuns generat - 3 paragrafe, ton profesional' },
      { time: '00:00:04', status: 'processing', text: 'Se trimite reply automat...' },
      { time: '00:00:05', status: 'ok', text: 'Reply trimis cu succes la andrei@startup.ro' },
      { time: '00:00:05', status: 'ok', text: 'Notificare trimisa pe Slack lui Ion Popescu' },
    ],
    actionsCount: 6,
    duration: '5.2 secunde',
  },
  {
    id: 'leaduri',
    title: 'Calificare lead-uri',
    description: 'Scoring si alocare automata',
    icon: 'Target',
    steps: 7,
    stats: {
      stat1: '15min -> instant',
      stat2: 'Scor obiectiv per lead',
      stat3: '+34% conversie',
    },
    nodes: [
      { id: 'n1', type: 'trigger', title: 'Formular completat', icon: 'ClipboardList' },
      { id: 'n2', type: 'ai', title: 'Analizeaza profilul', subtitle: 'Industrie, buget, urgenta', icon: 'UserSearch' },
      { id: 'n3', type: 'ai', title: 'Calculeaza scor lead', subtitle: 'Scor 0-100 per lead', icon: 'Star' },
      { id: 'n4', type: 'conditie', title: 'Scor lead?', icon: 'Filter', branches: ['> 70 Hot', '40-70 Warm', '< 40 Cold'] },
      { id: 'n5a', type: 'actiune', title: 'Aloca agent senior', icon: 'UserCheck' },
      { id: 'n5b', type: 'actiune', title: 'Secventa nurturing', icon: 'Mail' },
      { id: 'n5c', type: 'actiune', title: 'Adauga in newsletter', icon: 'Rss' },
      { id: 'n6', type: 'actiune', title: 'Adauga in CRM cu scor', icon: 'Database' },
      { id: 'n7', type: 'notificare', title: 'Alert agent pe Slack', subtitle: 'Cu toate detaliile', icon: 'MessageSquare' },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5a', label: 'Hot' },
      { from: 'n4', to: 'n5b', label: 'Warm' },
      { from: 'n5a', to: 'n6' },
      { from: 'n6', to: 'n7' },
    ],
    logs: [
      { time: '00:00:00', status: 'ok', text: 'Formular completat - Maria Ionescu, director marketing' },
      { time: '00:00:01', status: 'processing', text: 'AI analizeaza profilul companiei...' },
      { time: '00:00:02', status: 'ok', text: 'Profil analizat - Industrie: Retail, 50-100 angajati', sub: 'Buget estimat: mediu-mare, urgenta: ridicata' },
      { time: '00:00:02', status: 'processing', text: 'Se calculeaza scorul lead-ului...' },
      { time: '00:00:03', status: 'ok', text: 'Scor calculat: 82/100 - calificat HOT', sub: 'Criterii: buget, urgenta, dimensiune companie, industrie' },
      { time: '00:00:03', status: 'processing', text: 'Se aloca agent senior...' },
      { time: '00:00:04', status: 'ok', text: 'Alocat: Ana Dumitru (senior sales)', sub: 'Notificat pe Slack cu toate datele lead-ului' },
      { time: '00:00:04', status: 'ok', text: 'Lead adaugat in CRM cu scor si context complet' },
    ],
    actionsCount: 7,
    duration: '4.8 secunde',
  },
  {
    id: 'documente',
    title: 'Procesare documente',
    description: 'OCR, extragere date, arhivare',
    icon: 'FileSearch',
    steps: 5,
    stats: {
      stat1: '3h/document -> 30sec',
      stat2: 'Zero erori transcriere',
      stat3: '-80% timp manual',
    },
    nodes: [
      { id: 'n1', type: 'trigger', title: 'Document uploadat', icon: 'Upload' },
      { id: 'n2', type: 'ai', title: 'OCR + extragere date', subtitle: 'Factura, contract, formular', icon: 'ScanLine' },
      { id: 'n3', type: 'ai', title: 'Validare si structurare', subtitle: 'Completitudine si acuratete', icon: 'CheckSquare' },
      { id: 'n4', type: 'actiune', title: 'Inregistrare in sistem', subtitle: 'ERP sau CRM, automat', icon: 'Database' },
      { id: 'n5', type: 'actiune', title: 'Arhivare si notificare', icon: 'Archive' },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
    logs: [
      { time: '00:00:00', status: 'ok', text: 'Document primit: factura_furnizor_0447.pdf' },
      { time: '00:00:01', status: 'processing', text: 'OCR in curs - extragere text si date structurate...' },
      { time: '00:00:02', status: 'ok', text: 'Date extrase: furnizor, suma, data, nr. factura', sub: 'Tip document: Factura fiscala - Confidenta: 98.1%' },
      { time: '00:00:02', status: 'processing', text: 'Validare date extrase...' },
      { time: '00:00:03', status: 'ok', text: 'Validare completa - toate campurile prezente si corecte' },
      { time: '00:00:03', status: 'ok', text: 'Inregistrata in sistem - ID: FAC-2024-0447' },
      { time: '00:00:04', status: 'ok', text: 'Arhivata si notificare trimisa echipei contabilitate' },
    ],
    actionsCount: 5,
    duration: '3.8 secunde',
  },
  {
    id: 'suport',
    title: 'Suport clienti 24/7',
    description: 'Chatbot + escalare umana',
    icon: 'MessageSquare',
    steps: 6,
    stats: {
      stat1: '24/7 disponibil',
      stat2: '80% cazuri rezolvate auto',
      stat3: '-70% volum tichete',
    },
    nodes: [
      { id: 'n1', type: 'trigger', title: 'Mesaj client primit', subtitle: 'Chat, email sau WhatsApp', icon: 'MessageCircle' },
      { id: 'n2', type: 'ai', title: 'Intelege intentia', subtitle: 'NLP pe mesajul clientului', icon: 'Brain' },
      { id: 'n3', type: 'conditie', title: 'Poate AI rezolva?', icon: 'HelpCircle', branches: ['Da', 'Nu - agent uman'] },
      { id: 'n4a', type: 'ai', title: 'Genereaza raspuns complet', icon: 'Bot' },
      { id: 'n4b', type: 'actiune', title: 'Transfera la agent uman', subtitle: 'Cu istoricul conversatiei', icon: 'Users' },
      { id: 'n5', type: 'actiune', title: 'Trimite raspuns', icon: 'Send' },
      { id: 'n6', type: 'actiune', title: 'Actualizeaza baza cunostinte', subtitle: 'Imbunatatire continua', icon: 'BookOpen' },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4a', label: 'Da' },
      { from: 'n3', to: 'n4b', label: 'Nu' },
      { from: 'n4a', to: 'n5' },
      { from: 'n5', to: 'n6' },
    ],
    logs: [
      { time: '00:00:00', status: 'ok', text: 'Mesaj primit de la client: "Cum resetez parola?"' },
      { time: '00:00:01', status: 'processing', text: 'AI analizeaza intentia mesajului...' },
      { time: '00:00:01', status: 'ok', text: 'Intentie identificata: reset parola - subiect standard', sub: 'Confidenta: 97.3% - Categoria: Suport tehnic' },
      { time: '00:00:02', status: 'processing', text: 'AI genereaza raspuns din baza de cunostinte...' },
      { time: '00:00:03', status: 'ok', text: 'Raspuns generat cu pasii exacti pentru reset parola' },
      { time: '00:00:03', status: 'ok', text: 'Raspuns trimis clientului in 3.1 secunde' },
      { time: '00:00:04', status: 'ok', text: 'Conversatie salvata si baza de cunostinte actualizata' },
    ],
    actionsCount: 6,
    duration: '4.1 secunde',
  },
  {
    id: 'raportare',
    title: 'Raportare automata',
    description: 'Colectare, generare, trimitere',
    icon: 'BarChart3',
    steps: 5,
    stats: {
      stat1: '0 minute manual',
      stat2: 'Date intotdeauna actualizate',
      stat3: 'Raport in 5 sec',
    },
    nodes: [
      { id: 'n1', type: 'trigger', title: 'Programare timp', subtitle: 'Luni 07:00, saptamanal', icon: 'Clock' },
      { id: 'n2', type: 'actiune', title: 'Colectare date', subtitle: 'CRM + ERP + Analytics', icon: 'Download' },
      { id: 'n3', type: 'ai', title: 'Analiza si insights', subtitle: 'Tendinte si anomalii', icon: 'TrendingUp' },
      { id: 'n4', type: 'ai', title: 'Genereaza raport', subtitle: 'PDF formatat, branded', icon: 'FileBarChart' },
      { id: 'n5', type: 'actiune', title: 'Distribuie echipei', subtitle: 'Email + Slack automat', icon: 'Share2' },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
    logs: [
      { time: '00:00:00', status: 'ok', text: 'Trigger saptamanal declansat - Luni 07:00' },
      { time: '00:00:01', status: 'processing', text: 'Colectare date din CRM, ERP si Analytics...' },
      { time: '00:00:02', status: 'ok', text: 'Date colectate: 847 inregistrari procesate', sub: 'CRM: 124 lead-uri, ERP: 89 comenzi, Analytics: 12.400 vizite' },
      { time: '00:00:02', status: 'processing', text: 'AI analizeaza tendintele si anomaliile...' },
      { time: '00:00:03', status: 'ok', text: 'Analiza completa - 3 insights cheie identificate', sub: 'Anomalie detectata: scadere 12% conversii joi-vineri' },
      { time: '00:00:04', status: 'ok', text: 'Raport PDF generat - 8 pagini, branded Inovex' },
      { time: '00:00:05', status: 'ok', text: 'Distribuit echipei pe email si Slack' },
    ],
    actionsCount: 5,
    duration: '5.0 secunde',
  },
];
