import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { SabloaneClient } from './SabloaneClient';

export const metadata = { title: 'Sabloane contracte | Admin Inovex', robots: 'noindex,nofollow' };

export default async function SabloanePage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  if (user.role !== 'owner' && user.role !== 'admin') {
    return (
      <div style={{ padding: '48px 32px', maxWidth: 640 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 8 }}>Acces restrictionat</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B' }}>Doar owner/admin pot gestiona sabloanele de contract.</p>
      </div>
    );
  }
  return <SabloaneClient />;
}
