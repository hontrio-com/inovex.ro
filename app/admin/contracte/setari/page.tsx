import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { SetariClient } from './SetariClient';

export const metadata = { title: 'Setari firma | Admin Inovex', robots: 'noindex,nofollow' };

export default async function SetariFirmaPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  if (user.role !== 'owner' && user.role !== 'admin') {
    return (
      <div style={{ padding: '48px 32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A' }}>Acces restrictionat</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B' }}>Doar owner/admin.</p>
      </div>
    );
  }
  return <SetariClient />;
}
