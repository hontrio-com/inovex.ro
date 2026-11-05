import Image from 'next/image';
import Link from 'next/link';
import { FileText, Phone, Receipt, Shield } from 'lucide-react';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import { PhoneLink } from '@/components/ui/PhoneLink';
import styles from './configuratoare.module.css';

/* Cadrul configuratoarelor (2026-10-29): fara meniu, ca vizitatorul sa ramana pe formular. Sus, o bara
   alba cu sigla si telefonul (PhoneLink: conversia „telefon” la Google si TikTok); jos, o bara fixa cu
   cele trei garantii. */

const GARANTII = [
  { Icon: FileText, text: 'Contract de prestări servicii' },
  { Icon: Receipt, text: 'Factură fiscală inclusă' },
  { Icon: Shield, text: 'Garanție și asistență gratuită' },
];

export default function ConfiguratoareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={styles.antet}>
        <div className={styles.bara}>
          <Link href="/" aria-label="Inovex, prima pagină" className={styles.logo}>
            <Image src="/imagini/logo-inovex-antet.png" alt="Inovex" width={95} height={22} unoptimized loading="eager" />
          </Link>
          <PhoneLink className={styles.telefon}>
            <Phone aria-hidden />
            {TELEFON.text}
          </PhoneLink>
        </div>
      </header>

      <main>{children}</main>

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

      <CookieConsent />
    </>
  );
}
