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

export type SubscriptionStatus = 'activ' | 'suspendat' | 'anulat';
export type BillingCycle = 'lunar' | 'trimestrial' | 'anual';

export interface CrmSubscriptionLite {
  id: string;
  name: string;
  status: SubscriptionStatus;
  price: number | null;
  currency: string | null;
  billing_cycle: BillingCycle;
  next_renewal_date: string | null;
}

export interface Member {
  id: string;
  full_name: string | null;
  email: string;
  role: 'owner' | 'admin' | 'agent';
  is_active: boolean;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}
