import { requireStaffPage } from '@/lib/auth';
import { SabloaneClient } from './SabloaneClient';

export const metadata = { title: 'Sabloane contracte | Admin Inovex', robots: 'noindex,nofollow' };

export default async function SabloanePage() {
  await requireStaffPage();
  return <SabloaneClient />;
}
