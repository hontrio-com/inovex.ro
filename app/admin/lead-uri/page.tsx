import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { LeadsBoard } from './LeadsBoard';

export const metadata = { title: 'Lead-uri | Admin Inovex', robots: 'noindex,nofollow' };

export default async function LeaduriPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  const privileged = user.role === 'owner' || user.role === 'admin';

  return <LeadsBoard canAssign={privileged} />;
}
