export type Plan = 'Free' | 'Pro' | 'Enterprise';
export type UserStatus = 'Activ' | 'Inactiv';
export type Priority = 'High' | 'Medium' | 'Low';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: UserStatus;
  date: string;
  mrr: string;
}

export interface RevenueItem {
  month: string;
  value: number;
}

export interface QuarterItem {
  quarter: string;
  value: number;
}

export interface AnnualItem {
  year: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
}

export interface KanbanItem {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
  dueDate: string;
  progress: number;
}

export interface KanbanBoard {
  backlog: KanbanItem[];
  in_progress: KanbanItem[];
  review: KanbanItem[];
  done: KanbanItem[];
}

export interface PlanDistributionItem {
  label: string;
  percent: number;
  color: string;
}

export interface IntegrationItem {
  name: string;
  users: number;
}

export interface RevenueBreakdownItem {
  plan: string;
  users: number;
  mrr: string;
  percent: string;
}

export const USERS: DemoUser[] = [
  { id: '1', name: 'Alexandru Ionescu', email: 'alex.ionescu@empresa.ro', plan: 'Pro', status: 'Activ', date: '12 Ian 2024', mrr: '€49' },
  { id: '2', name: 'Maria Popescu', email: 'maria.p@techstartup.ro', plan: 'Enterprise', status: 'Activ', date: '03 Feb 2024', mrr: '€199' },
  { id: '3', name: 'Andrei Constantin', email: 'andrei.c@freelancer.ro', plan: 'Free', status: 'Activ', date: '18 Feb 2024', mrr: '-' },
  { id: '4', name: 'Elena Dumitrescu', email: 'elena.d@agentie.ro', plan: 'Pro', status: 'Inactiv', date: '01 Mar 2024', mrr: '€49' },
  { id: '5', name: 'Bogdan Stanescu', email: 'bogdan.s@firma.ro', plan: 'Free', status: 'Activ', date: '15 Mar 2024', mrr: '-' },
  { id: '6', name: 'Cristina Radu', email: 'cristina.r@startup.ro', plan: 'Pro', status: 'Activ', date: '22 Mar 2024', mrr: '€49' },
  { id: '7', name: 'Mihai Georgescu', email: 'mihai.g@corp.ro', plan: 'Enterprise', status: 'Activ', date: '05 Apr 2024', mrr: '€199' },
  { id: '8', name: 'Ana Popa', email: 'ana.popa@business.ro', plan: 'Free', status: 'Inactiv', date: '10 Apr 2024', mrr: '-' },
  { id: '9', name: 'Razvan Nica', email: 'razvan.n@dev.ro', plan: 'Pro', status: 'Activ', date: '20 Apr 2024', mrr: '€49' },
  { id: '10', name: 'Ioana Munteanu', email: 'ioana.m@studio.ro', plan: 'Pro', status: 'Activ', date: '02 Mai 2024', mrr: '€49' },
];

export const REVENUE_MONTHLY: RevenueItem[] = [
  { month: 'Ian', value: 22400 },
  { month: 'Feb', value: 24800 },
  { month: 'Mar', value: 26100 },
  { month: 'Apr', value: 28500 },
  { month: 'Mai', value: 29800 },
  { month: 'Iun', value: 32400 },
  { month: 'Iul', value: 34200 },
  { month: 'Aug', value: 36700 },
  { month: 'Sep', value: 39100 },
  { month: 'Oct', value: 42300 },
  { month: 'Nov', value: 45800 },
  { month: 'Dec', value: 48320 },
];

export const REVENUE_QUARTERLY: QuarterItem[] = [
  { quarter: 'T1', value: 73300 },
  { quarter: 'T2', value: 90700 },
  { quarter: 'T3', value: 110000 },
  { quarter: 'T4', value: 136420 },
];

export const REVENUE_ANNUAL: AnnualItem[] = [
  { year: '2021', value: 148000 },
  { year: '2022', value: 220000 },
  { year: '2023', value: 310000 },
  { year: '2024', value: 410420 },
  { year: '2025', value: 579840 },
];

export const ACTIVITY: ActivityItem[] = [
  { id: '1', user: 'Alexandru I.', action: 'A actualizat planul la Pro', time: '2 min in urma' },
  { id: '2', user: 'Maria P.', action: 'A creat un proiect nou "Dashboard Analytics"', time: '15 min in urma' },
  { id: '3', user: 'Andrei C.', action: 'S-a inregistrat pe platforma', time: '1 ora in urma' },
  { id: '4', user: 'Cristina R.', action: 'A exportat raportul lunar', time: '3 ore in urma' },
  { id: '5', user: 'Mihai G.', action: 'A adaugat 3 membri noi in echipa', time: '5 ore in urma' },
  { id: '6', user: 'Razvan N.', action: 'A integrat Stripe Payments', time: 'ieri' },
];

export const KANBAN_ITEMS: KanbanBoard = {
  backlog: [
    { id: 'b1', title: 'Integrare API Stripe v4', assignee: 'Andrei C.', priority: 'High', dueDate: '20 Apr', progress: 0 },
    { id: 'b2', title: 'Sistem notificari push', assignee: 'Ioana M.', priority: 'Medium', dueDate: '25 Apr', progress: 0 },
    { id: 'b3', title: 'Export CSV raporturi', assignee: 'Bogdan S.', priority: 'Low', dueDate: '30 Apr', progress: 0 },
  ],
  in_progress: [
    { id: 'p1', title: 'Dashboard Analytics v2', assignee: 'Maria P.', priority: 'High', dueDate: '15 Apr', progress: 65 },
    { id: 'p2', title: 'Autentificare 2FA', assignee: 'Alexandru I.', priority: 'High', dueDate: '18 Apr', progress: 40 },
    { id: 'p3', title: 'Redesign pagina profil', assignee: 'Cristina R.', priority: 'Medium', dueDate: '22 Apr', progress: 80 },
  ],
  review: [
    { id: 'r1', title: 'Optimizare performanta DB', assignee: 'Mihai G.', priority: 'High', dueDate: '12 Apr', progress: 95 },
    { id: 'r2', title: 'Documentatie API REST', assignee: 'Razvan N.', priority: 'Medium', dueDate: '14 Apr', progress: 90 },
  ],
  done: [
    { id: 'd1', title: 'Setup CI/CD pipeline', assignee: 'Mihai G.', priority: 'High', dueDate: '05 Apr', progress: 100 },
    { id: 'd2', title: 'Migrare PostgreSQL 16', assignee: 'Alexandru I.', priority: 'Medium', dueDate: '08 Apr', progress: 100 },
    { id: 'd3', title: 'Landing page redesign', assignee: 'Elena D.', priority: 'Low', dueDate: '10 Apr', progress: 100 },
  ],
};

export const PLAN_DISTRIBUTION: PlanDistributionItem[] = [
  { label: 'Free', percent: 58, color: '#E2E8F0' },
  { label: 'Pro', percent: 32, color: '#2B8FCC' },
  { label: 'Enterprise', percent: 10, color: '#0D1117' },
];

export const TOP_INTEGRATIONS: IntegrationItem[] = [
  { name: 'Stripe Payments', users: 1240 },
  { name: 'Slack Notifications', users: 980 },
  { name: 'GitHub Actions', users: 756 },
  { name: 'Google Analytics', users: 634 },
  { name: 'Intercom', users: 412 },
];

export const REVENUE_BREAKDOWN: RevenueBreakdownItem[] = [
  { plan: 'Free', users: 1652, mrr: '€0', percent: '0%' },
  { plan: 'Pro', users: 911, mrr: '€44.639', percent: '92.4%' },
  { plan: 'Enterprise', users: 284, mrr: '€56.516', percent: '7.6%' },
  { plan: 'Total', users: 2847, mrr: '€48.320', percent: '100%' },
];
