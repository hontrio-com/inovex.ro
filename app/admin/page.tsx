import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { DashboardClient } from './DashboardClient';

export const metadata = { title: 'Dashboard | Admin Inovex', robots: 'noindex,nofollow' };

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  return <DashboardClient userName={user.fullName || user.email} />;
}
