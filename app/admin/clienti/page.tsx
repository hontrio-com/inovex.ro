import { requireStaffPage } from '@/lib/auth';
import { ClientiList } from './ClientiList';

export const metadata = { title: 'Clienti | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ClientiPage() {
  await requireStaffPage();

  return <ClientiList canAssign canDelete />;
}
