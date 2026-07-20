import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { getSessionUser } from '@/lib/auth';
import { AdminShell } from './AdminShell';

export const metadata: Metadata = {
  title: 'Admin | Inovex',
  robots: 'noindex,nofollow',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  return (
    <>
      <AdminShell
        role={user?.role ?? null}
        userEmail={user?.email ?? null}
        userName={user?.fullName ?? null}
      >
        {children}
      </AdminShell>
      <Toaster position="top-right" richColors />
    </>
  );
}
