import { requireStaffPage } from '@/lib/auth';
import { WebsitesList } from './WebsitesList';

export const metadata = { title: 'Website-uri | Admin Inovex', robots: 'noindex,nofollow' };

export default async function WebsitesPage() {
  await requireStaffPage();
  return <WebsitesList />;
}
