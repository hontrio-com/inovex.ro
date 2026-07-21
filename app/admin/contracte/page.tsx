import { requireStaffPage } from '@/lib/auth';
import { ContracteList } from './ContracteList';

export const metadata = { title: 'Contracte | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ContractePage() {
  await requireStaffPage();
  return <ContracteList canManageConfig />;
}
