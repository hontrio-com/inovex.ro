import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyButtons } from '@/components/layout/StickyButtons';
import { CookieConsent } from '@/components/layout/CookieConsent';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <StickyButtons />
      <CookieConsent />
    </>
  );
}
