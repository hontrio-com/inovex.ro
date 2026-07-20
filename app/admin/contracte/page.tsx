import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { ContracteList } from './ContracteList';

export const metadata = { title: 'Contracte | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ContractePage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  const privileged = user.role === 'owner' || user.role === 'admin';
  return <ContracteList canManageConfig={privileged} />;
}
