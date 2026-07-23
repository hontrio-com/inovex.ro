// Tipuri partajate pentru modulele CRM (client + server).

export type ClientType = 'PF' | 'PJ';
export type ClientStatus = 'activ' | 'inactiv' | 'prospect';

export interface CrmClient {
  id: string;
  name: string;
  type: ClientType;
  cui: string | null;
  reg_com: string | null;
  iban: string | null;
  bank: string | null;
  address: string | null;
  city: string | null;
  county: string | null;
  country: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  contact_person: string | null;
  status: ClientStatus;
  source: string | null;
  assigned_to: string | null;
  gdpr_consent: boolean;
  notes: string | null;
  legacy_source: string | null;
  legacy_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

/** Client cu campuri derivate pentru afisare (nume agent alocat). */
export interface CrmClientWithMeta extends CrmClient {
  assigned_name?: string | null;
}

export interface CrmClientFile {
  id: string;
  client_id: string;
  file_name: string;
  file_url: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_by: string | null;
  created_at: string;
  /** URL semnat temporar (generat la citire; bucket privat). */
  signed_url?: string | null;
}

export type ActivityType = 'note' | 'call' | 'email' | 'meeting' | 'task' | 'status_change' | 'system';

export interface CrmActivity {
  id: string;
  type: ActivityType;
  title: string | null;
  body: string | null;
  client_id: string | null;
  lead_id: string | null;
  contract_id: string | null;
  created_by: string | null;
  created_at: string;
  /** Nume autor (derivat la citire). */
  author_name?: string | null;
}

export type ContractStatus = 'draft' | 'trimis' | 'semnat' | 'expirat' | 'anulat';

export interface CrmContractLite {
  id: string;
  contract_number: string | null;
  title: string | null;
  status: ContractStatus;
  value: number | null;
  currency: string | null;
  created_at: string;
  signed_at: string | null;
}

export type SubscriptionStatus = 'activ' | 'suspendat' | 'expirat' | 'anulat';
export type BillingCycle = 'lunar' | 'trimestrial' | 'semestrial' | 'anual';

/** Un beneficiu dintr-un pachet de mentenanta. */
export interface CrmMaintenancePackage {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  billing_cycle: BillingCycle;
  features: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  /** Numar de abonamente care folosesc pachetul (derivat la citire). */
  usage_count?: number;
}

/** O intrare de logare pentru un website (parola decriptata doar la nevoie, server-side). */
export interface WebsiteCredential {
  label: string;
  url: string | null;
  username: string | null;
  password: string | null;
}

export type WebsiteStatus = 'activ' | 'in_dezvoltare' | 'suspendat' | 'arhivat';

export interface CrmWebsite {
  id: string;
  client_id: string;
  subscription_id: string | null;
  label: string | null;
  domain: string | null;
  platform: string | null;
  hosting: string | null;
  hosting_url: string | null;
  admin_url: string | null;
  status: WebsiteStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  client?: { id: string; name: string } | null;
  subscription?: { id: string; name: string; status: SubscriptionStatus } | null;
  /** Prezente doar in detaliu (decriptate server-side). */
  credentials?: WebsiteCredential[];
  /** Cate intrari de logare are (pentru lista, fara a expune parolele). */
  credentials_count?: number;
}

export interface CrmSubscriptionLite {
  id: string;
  name: string;
  status: SubscriptionStatus;
  price: number | null;
  currency: string | null;
  billing_cycle: BillingCycle;
  next_renewal_date: string | null;
}

export interface CrmSubscription {
  id: string;
  client_id: string;
  name: string;
  type: string;
  status: SubscriptionStatus;
  price: number | null;
  currency: string | null;
  billing_cycle: BillingCycle;
  start_date: string | null;
  next_renewal_date: string | null;
  contract_id: string | null;
  package_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  client?: { id: string; name: string } | null;
  package?: { id: string; name: string } | null;
}

export interface Member {
  id: string;
  full_name: string | null;
  email: string;
  role: 'owner' | 'admin' | 'agent';
  is_active: boolean;
}

export type LeadStatus = 'nou' | 'calificat' | 'convertit' | 'edinio' | 'necalificat' | 'pierdut';
export type LeadPlatform = 'meta' | 'google' | 'tiktok' | 'website' | 'manual';

export interface CrmLead {
  id: string;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  status: LeadStatus;
  source: string | null;
  platform: LeadPlatform | null;
  campaign: string | null;
  estimated_value: number | null;
  currency: string | null;
  assigned_to: string | null;
  lost_reason: string | null;
  converted_client_id: string | null;
  converted_at: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}
