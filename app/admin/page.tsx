import { requireStaffPage } from '@/lib/auth';
import { DashboardClient } from './DashboardClient';

export const metadata = { title: 'Dashboard | Admin Inovex', robots: 'noindex,nofollow' };

export default async function AdminDashboardPage() {
  const user = await requireStaffPage();

  return <DashboardClient userName={user.fullName || user.email} />;
}
