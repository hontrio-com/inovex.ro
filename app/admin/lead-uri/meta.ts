import type { LeadStatus } from '@/types/crm';

export const LEAD_COLUMNS: { key: LeadStatus; label: string; color: string }[] = [
  { key: 'nou',         label: 'Nou',          color: '#64748B' },
  { key: 'necalificat', label: 'Necalificat',  color: '#D97706' },
  { key: 'calificat',   label: 'Calificat',    color: '#7C3AED' },
  { key: 'convertit',   label: 'Convertit',    color: '#15803D' },
  { key: 'edinio',      label: 'Catre Edinio', color: '#0D9488' },
  { key: 'pierdut',     label: 'Pierdut',      color: '#DC2626' },
];

export const STATUS_LABEL: Record<LeadStatus, string> = {
  nou: 'Nou', necalificat: 'Necalificat', calificat: 'Calificat', convertit: 'Convertit', edinio: 'Catre Edinio', pierdut: 'Pierdut',
};

export const PLATFORM_META: Record<string, { label: string; color: string }> = {
  meta:    { label: 'Meta',    color: '#1877F2' },
  google:  { label: 'Google',  color: '#EA4335' },
  tiktok:  { label: 'TikTok',  color: '#111827' },
  website: { label: 'Website', color: '#2B8FCC' },
  manual:  { label: 'Manual',  color: '#64748B' },
};

export function fmtMoney(v: number | null, cur: string | null) {
  if (v == null) return null;
  try { return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: cur || 'RON', maximumFractionDigits: 0 }).format(v); }
  catch { return `${v} ${cur || 'RON'}`; }
}
export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' });
}
export function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
