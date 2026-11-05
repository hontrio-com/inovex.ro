import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { DEZVOLTARE_WEB, SOLUTII_COMPLETE, TELEFON } from '@/components/layout/meniu-servicii/date';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import { SetariCookies } from './SetariCookies';
import styles from './Footer.module.css';

/* Subsolul, in stilul redesign-ului (2026-10-29): un chenar alb ca al hero-ului, la --rama de
   marginile ecranului, cu rama de sticla pe ecranele mari. Sus: sigla, descrierea si retelele, apoi
   coloanele de linkuri; jos, sub o linie fina: drepturile, firma, insignele ANPC si setarile de
   cookies. Telefonul trimite conversia „telefon”, ca in antet. */

// serviciile din meniu, plus video motion design (scos din meniu, pagina ramane)
const SERVICII = [
  ...[...DEZVOLTARE_WEB, ...SOLUTII_COMPLETE].map((s) => ({ href: s.href, label: s.titlu })),
  { href: '/servicii/video-motion-design', label: 'Video motion design' },
];

const COMPANIE = [
  { href: '/portofoliu', label: 'Portofoliu' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/invata-gratuit', label: 'Învață gratuit' },
  { href: '/oferta', label: 'Solicită ofertă' },
  { href: '/contact', label: 'Contact' },
];

const EXTERN = [{ href: 'https://www.novin.ro', label: 'Audit website gratuit' }];

const LEGAL = [
  { href: '/termeni-si-conditii', label: 'Termeni și condiții' },
  { href: '/politica-de-confidentialitate', label: 'Politica de confidențialitate' },
  { href: '/politica-cookies', label: 'Politica de cookies' },
];

const RETELE = [
  { href: 'https://www.facebook.com/inovex.ro', label: 'Inovex pe Facebook', Icon: FacebookIcon },
  { href: 'https://www.instagram.com/inovex.ro', label: 'Inovex pe Instagram', Icon: InstagramIcon },
  { href: 'https://www.tiktok.com/@inovex.ro', label: 'Inovex pe TikTok', Icon: TikTokIcon },
];

export function Footer() {
  const an = new Date().getFullYear();

  return (
    <footer className={styles.subsol}>
      <div className={styles.chenar}>
        <div className={styles.card}>
          <div className={styles.sus}>
            <div className={styles.brand}>
              <Link href="/" aria-label="Inovex, prima pagină" className={styles.logo}>
                <Image src="/imagini/logo-inovex-antet.png" alt="Inovex" width={95} height={22} unoptimized />
              </Link>
              <p className={styles.despre}>
                Construim magazine online, website-uri de prezentare și aplicații web care se încarcă rapid,
                arată profesional și aduc rezultate reale pentru afacerea ta.
              </p>
              <ul className={styles.retele}>
                {RETELE.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav className={styles.coloane} aria-label="Subsol">
              <div>
                <p className={styles.titlu}>Servicii</p>
                <ul className={styles.linkuri}>
                  {SERVICII.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={styles.titlu}>Companie</p>
                <ul className={styles.linkuri}>
                  {COMPANIE.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                  {EXTERN.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={styles.titlu}>Legal</p>
                <ul className={styles.linkuri}>
                  {LEGAL.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={styles.titlu}>Contact</p>
                <ul className={styles.contact}>
                  <li>
                    <a href="mailto:contact@inovex.ro">
                      <Mail aria-hidden />
                      contact@inovex.ro
                    </a>
                  </li>
                  <li>
                    <LinkTelefon>
                      <Phone aria-hidden />
                      {TELEFON.text}
                    </LinkTelefon>
                  </li>
                  <li>
                    <span>
                      <MapPin aria-hidden />
                      Târgu Jiu / București
                    </span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className={styles.jos}>
            <div className={styles.firma}>
              <p>© {an} Inovex. Toate drepturile rezervate.</p>
              <p>VOID SFT GAMES SRL · CUI 43474393</p>
            </div>
            <div className={styles.dreapta}>
              <div className={styles.anpc}>
                <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
                  <Image src="/imagini/footer/SAL.png" alt="Soluționarea alternativă a litigiilor (ANPC)" width={70} height={35} />
                </a>
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                  <Image src="/imagini/footer/SOL.png" alt="Soluționarea online a litigiilor (Comisia Europeană)" width={70} height={35} />
                </a>
              </div>
              <SetariCookies className={styles.cookies} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.81a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z" />
    </svg>
  );
}
