import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { ClientiList } from './ClientiList';

export const metadata = { title: 'Clienti | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ClientiPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  const privileged = user.role === 'owner' || user.role === 'admin';

  return <ClientiList canAssign={privileged} canDelete={privileged} />;
}
