import { redirect, notFound } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { canAccessClient } from '@/lib/crm/access';
import type { CrmClient } from '@/types/crm';
import { ClientProfile } from './ClientProfile';

export const metadata = { title: 'Client | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  const { id } = await params;
  const { data: client } = await supabaseAdmin
    .from('crm_clients')
    .select('*')
    .eq('id', id)
    .single();

  if (!client) notFound();

  if (!canAccessClient(user, client.assigned_to)) {
    return (
      <div style={{ padding: '48px 32px', maxWidth: 640 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 8 }}>
          Acces restrictionat
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B' }}>
          Acest client nu iti este alocat.
        </p>
      </div>
    );
  }

  const privileged = user.role === 'owner' || user.role === 'admin';

  return (
    <ClientProfile
      initialClient={client as CrmClient}
      canAssign={privileged}
      canDelete={privileged}
    />
  );
}
