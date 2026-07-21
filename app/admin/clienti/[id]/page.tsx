import { notFound } from 'next/navigation';
import { requireStaffPage } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import type { CrmClient } from '@/types/crm';
import { ClientProfile } from './ClientProfile';

export const metadata = { title: 'Client | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaffPage();

  const { id } = await params;
  const { data: client } = await supabaseAdmin
    .from('crm_clients')
    .select('*')
    .eq('id', id)
    .single();

  if (!client) notFound();

  return (
    <ClientProfile
      initialClient={client as CrmClient}
      canAssign
      canDelete
    />
  );
}
