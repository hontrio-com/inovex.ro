import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { AbonamenteList } from './AbonamenteList';

export const metadata = { title: 'Abonamente | Admin Inovex', robots: 'noindex,nofollow' };

export default async function AbonamentePage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  return <AbonamenteList />;
}
