import { requireStaffPage } from '@/lib/auth';
import { IntegrariClient } from './IntegrariClient';

export const metadata = { title: 'Integrari Ads | Admin Inovex', robots: 'noindex,nofollow' };

export default async function IntegrariPage() {
  await requireStaffPage();
  return <IntegrariClient />;
}
