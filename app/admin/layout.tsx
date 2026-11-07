import type { Metadata } from 'next';
import '../globals.css';
import { clasaHtml } from '../fonturi';
import { Pixeli } from '@/components/analytics/Pixeli';
import { Toaster } from '@/components/ui/sonner';
import { getSessionUser } from '@/lib/auth';
import { AdminShell } from './AdminShell';

/* Layout radacina al adminului (din 2026-11-05, de cand site-ul public are layout-ul lui sub app/[lang]):
   aceleasi fonturi si pixeli ca inainte, cand tot site-ul avea un singur app/layout.tsx. */

export const metadata: Metadata = {
  title: 'Admin | Inovex',
  robots: 'noindex,nofollow',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  return (
    <html lang="ro" className={clasaHtml}>
      <body className="min-h-full flex flex-col">
        <Pixeli />
        <AdminShell
          role={user?.role ?? null}
          userEmail={user?.email ?? null}
          userName={user?.fullName ?? null}
        >
          {children}
        </AdminShell>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
