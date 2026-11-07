import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyButtons } from '@/components/layout/StickyButtons';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { esteLimba, LIMBA_IMPLICITA } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';

// Componentele de client (antet, butoane, cookies) primesc doar textele lor, nu tot dictionarul.
export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = esteLimba(l) ? l : LIMBA_IMPLICITA;
  const t = dictionar(lang);

  return (
    <>
      <Header lang={lang} t={{ ...t.antet, telefon: t.telefon, meniu: t.servicii }} />
      <main id="main-content">{children}</main>
      <Footer lang={lang} />
      <StickyButtons lang={lang} t={t.butoane} telefon={t.telefon} />
      <CookieConsent lang={lang} t={t.cookies} />
    </>
  );
}
