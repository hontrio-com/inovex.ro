import { requireStaffPage } from '@/lib/auth';
import { AbonamenteList } from './AbonamenteList';

export const metadata = { title: 'Abonamente | Admin Inovex', robots: 'noindex,nofollow' };

export default async function AbonamentePage() {
  await requireStaffPage();
  return <AbonamenteList />;
}
