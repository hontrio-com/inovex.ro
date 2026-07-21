import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { PacheteList } from './PacheteList';

export const metadata = { title: 'Pachete mentenanta | Admin Inovex', robots: 'noindex,nofollow' };

export default async function PachetePage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  const canManage = user.role === 'owner' || user.role === 'admin';
  return <PacheteList canManage={canManage} />;
}
