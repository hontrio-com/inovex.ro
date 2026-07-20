import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { UsersClient } from './UsersClient';

export const metadata = {
  title: 'Utilizatori | Admin Inovex',
  robots: 'noindex,nofollow',
};

/** Management utilizatori — accesibil doar owner-ului (enforce si server-side). */
export default async function UtilizatoriPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  if (user.role !== 'owner') {
    return (
      <div style={{ padding: '48px 32px', maxWidth: 640 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 8 }}>
          Acces restrictionat
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B' }}>
          Doar contul de tip <strong>owner</strong> poate gestiona utilizatorii.
        </p>
      </div>
    );
  }

  return <UsersClient currentUserId={user.id} />;
}
