import { requireStaffPage } from '@/lib/auth';
import { PacheteList } from './PacheteList';

export const metadata = { title: 'Pachete mentenanta | Admin Inovex', robots: 'noindex,nofollow' };

export default async function PachetePage() {
  await requireStaffPage();
  return <PacheteList canManage />;
}
