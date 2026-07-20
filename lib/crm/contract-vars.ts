import type { CrmClient } from '@/types/crm';

/** Variabilele disponibile in sabloanele de contract (pentru editor + completare). */
export const CONTRACT_VARS: { key: string; label: string }[] = [
  { key: 'contract_number', label: 'Numar contract' },
  { key: 'contract_title',  label: 'Titlu contract' },
  { key: 'date',            label: 'Data' },
  { key: 'value',           label: 'Valoare' },
  { key: 'currency',        label: 'Moneda' },
  { key: 'client_name',     label: 'Nume client' },
  { key: 'client_type',     label: 'Tip client' },
  { key: 'client_cui',      label: 'CUI client' },
  { key: 'client_reg_com',  label: 'Reg. Com. client' },
  { key: 'client_address',  label: 'Adresa client' },
  { key: 'client_email',    label: 'Email client' },
  { key: 'client_phone',    label: 'Telefon client' },
  { key: 'client_iban',     label: 'IBAN client' },
  { key: 'client_bank',     label: 'Banca client' },
  { key: 'contact_person',  label: 'Persoana de contact' },
  { key: 'company_name',    label: 'Nume firma' },
  { key: 'company_cui',     label: 'CUI firma' },
  { key: 'company_reg_com', label: 'Reg. Com. firma' },
  { key: 'company_address', label: 'Adresa firma' },
  { key: 'company_iban',    label: 'IBAN firma' },
  { key: 'company_bank',    label: 'Banca firma' },
  { key: 'company_signer',  label: 'Semnatar firma' },
];

export interface OrgVars {
  company_name?: string | null;
  company_cui?: string | null;
  company_reg_com?: string | null;
  company_address?: string | null;
  company_iban?: string | null;
  company_bank?: string | null;
  signer_name?: string | null;
}

export interface ContractMeta {
  number?: string | null;
  title?: string | null;
  value?: number | null;
  currency?: string | null;
  date?: string;
}

/** Construieste maparea variabila -> valoare din client + firma + meta contract. */
export function buildContractValues(client: CrmClient, org: OrgVars, contract: ContractMeta): Record<string, string> {
  const money = contract.value != null
    ? new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(contract.value)
    : '';
  return {
    contract_number: contract.number ?? '',
    contract_title:  contract.title ?? '',
    date:            contract.date ?? new Date().toLocaleDateString('ro-RO'),
    value:           money,
    currency:        contract.currency ?? 'RON',
    client_name:     client.name ?? '',
    client_type:     client.type === 'PF' ? 'Persoana fizica' : 'Persoana juridica',
    client_cui:      client.cui ?? '',
    client_reg_com:  client.reg_com ?? '',
    client_address:  [client.address, client.city, client.county].filter(Boolean).join(', '),
    client_email:    client.email ?? '',
    client_phone:    client.phone ?? '',
    client_iban:     client.iban ?? '',
    client_bank:     client.bank ?? '',
    contact_person:  client.contact_person ?? '',
    company_name:    org.company_name ?? '',
    company_cui:     org.company_cui ?? '',
    company_reg_com: org.company_reg_com ?? '',
    company_address: org.company_address ?? '',
    company_iban:    org.company_iban ?? '',
    company_bank:    org.company_bank ?? '',
    company_signer:  org.signer_name ?? '',
  };
}

/** Inlocuieste {{variabila}} cu valorile date. Variabilele necunoscute devin sir gol. */
export function fillVariables(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{\s*([a-zA-Z_]+)\s*\}\}/g, (_, k: string) => values[k.toLowerCase()] ?? '');
}
