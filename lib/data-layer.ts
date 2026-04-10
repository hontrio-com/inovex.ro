/**
 * Data layer — citeste/scrie date in Supabase.
 *
 * Tabelele suportate: faq, testimonials, portfolio, process, services, settings, bids
 *
 * Settings e special: e un singur rand cu key='settings' si value=JSONB obiect.
 * Restul sunt array-uri de inregistrari.
 */

import { supabaseAdmin } from './supabase';

type Section = 'faq' | 'testimonials' | 'portfolio' | 'process' | 'services' | 'settings' | 'bids';

/** Citeste toate datele pentru o sectiune */
export async function readData<T>(section: Section): Promise<T | null> {
  try {
    if (section === 'settings') {
      const { data, error } = await supabaseAdmin
        .from('settings')
        .select('value')
        .eq('key', 'settings')
        .single();
      if (error || !data) return null;
      return data.value as T;
    }

    const { data, error } = await supabaseAdmin
      .from(section)
      .select('*')
      .order(section === 'process' ? 'numar' : section === 'services' ? 'sort_order' : 'id');
    if (error || !data) return null;
    return data as T;
  } catch {
    return null;
  }
}

/** Suprascrie toate datele pentru o sectiune */
export async function writeData<T>(section: Section, data: T): Promise<void> {
  if (section === 'settings') {
    await supabaseAdmin
      .from('settings')
      .upsert({ key: 'settings', value: data });
    return;
  }

  const rows = data as unknown[];
  if (!Array.isArray(rows)) return;

  // Sterge tot si re-insereaza (simplu si consistent cu comportamentul JSON anterior)
  await supabaseAdmin.from(section).delete().neq('id', '___never___');
  if (rows.length > 0) {
    await supabaseAdmin.from(section).insert(rows as never[]);
  }
}

/** Adauga un element la un array (folosit pentru bids) */
export async function appendToArray<T extends { id: string }>(section: Section, item: T): Promise<T[]> {
  await supabaseAdmin.from(section).insert(item as never);
  const { data } = await supabaseAdmin.from(section).select('*').order('id');
  return (data ?? []) as T[];
}
