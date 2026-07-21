import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { WebsitesList } from './WebsitesList';

export const metadata = { title: 'Website-uri | Admin Inovex', robots: 'noindex,nofollow' };

export default async function WebsitesPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  if (user.role !== 'owner' && user.role !== 'admin') {
    return (
      <div style={{ padding: '48px 32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A' }}>Acces restrictionat</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B' }}>Sectiunea de website-uri si date de logare este disponibila doar administratorilor.</p>
      </div>
    );
  }

  return <WebsitesList />;
}
