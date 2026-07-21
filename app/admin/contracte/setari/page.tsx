import { requireStaffPage } from '@/lib/auth';
import { SetariClient } from './SetariClient';

export const metadata = { title: 'Setari firma | Admin Inovex', robots: 'noindex,nofollow' };

export default async function SetariFirmaPage() {
  await requireStaffPage();
  return <SetariClient />;
}
