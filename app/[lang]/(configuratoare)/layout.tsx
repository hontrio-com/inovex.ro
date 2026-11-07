import Image from 'next/image';
import Link from 'next/link';
import { FileText, Phone, Receipt, Shield } from 'lucide-react';
import { ConfiguratorProvider } from '@/components/configurator/Configurator';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { PhoneLink } from '@/components/ui/PhoneLink';
import { cale, esteLimba, LIMBA_IMPLICITA } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textConfiguratoare } from '@/lib/i18n/pagini/configuratoare';
import styles from './configuratoare.module.css';

/* Cadrul configuratoarelor (2026-10-29): fara meniu, ca vizitatorul sa ramana pe formular. Sus, o bara
   alba cu sigla si telefonul (PhoneLink: conversia „telefon” la Google si TikTok); jos, o bara fixa cu
   cele trei garantii. Din 2026-11-07 da configuratoarelor, prin context, limba si textele comune. */

export default async function ConfiguratoareLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: l } = await params;
  const lang = esteLimba(l) ? l : LIMBA_IMPLICITA;
  const t = dictionar(lang);
  const GARANTII = [
    { Icon: FileText, text: t.configuratoare.contract },
    { Icon: Receipt, text: t.configuratoare.factura },
    { Icon: Shield, text: t.configuratoare.garantie },
  ];

  return (
    <>
      <header className={styles.antet}>
        <div className={styles.bara}>
          <Link href={cale(lang, '/')} aria-label={t.antet.acasa} className={styles.logo}>
            <Image src="/imagini/logo-inovex-antet.png" alt="Inovex" width={95} height={22} unoptimized loading="eager" />
          </Link>
          <PhoneLink className={styles.telefon}>
            <Phone aria-hidden />
            {t.telefon}
          </PhoneLink>
        </div>
      </header>

      <main>
        <ConfiguratorProvider lang={lang} t={textConfiguratoare(lang).comun} telefon={t.telefon}>
          {children}
        </ConfiguratorProvider>
      </main>

      <footer className={styles.jos}>
        <ul className={styles.garantii}>
          {GARANTII.map(({ Icon, text }) => (
            <li key={text}>
              <Icon aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </footer>

      <CookieConsent lang={lang} t={t.cookies} />
    </>
  );
}
