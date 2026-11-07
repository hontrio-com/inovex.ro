import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { DEZVOLTARE_WEB, SOLUTII_COMPLETE } from '@/components/layout/meniu-servicii/date';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import { cale, linkPagina, type Limba } from '@/lib/i18n/config';
import { dictionar, format } from '@/lib/i18n/dictionare';
import { SelectorLimba } from './SelectorLimba';
import { SetariCookies } from './SetariCookies';
import styles from './Footer.module.css';

/* Subsolul, in stilul redesign-ului (2026-10-29): un chenar alb ca al hero-ului, la --rama de
   marginile ecranului, cu rama de sticla pe ecranele mari. Sus: sigla, descrierea si retelele, apoi
   coloanele de linkuri; jos, sub o linie fina: drepturile, firma, insignele ANPC si setarile de
   cookies. Telefonul trimite conversia „telefon”, ca in antet.
   Din 2026-11-05 textele vin din dictionarul limbii; Marketplace, Invata gratuit si auditul (novin.ro, site
   romanesc) sunt doar pentru Romania, deci apar doar in romana. Din 2026-11-07: in EN/DE/FR fara adresa,
   firma si ANPC (cu link spre datele firmei din termeni), iar jos, langa setarile de cookies, selectorul de
   limba (mutat din antet; limba se alege automat in proxy.ts). */

const RETELE = [
  { href: 'https://www.facebook.com/inovex.ro', retea: 'Facebook', Icon: FacebookIcon },
  { href: 'https://www.instagram.com/inovex.ro', retea: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.tiktok.com/@inovex.ro', retea: 'TikTok', Icon: TikTokIcon },
];

// pastreaza doar linkurile care au unde duce in limba paginii
const areLink = <T extends { href: string | null }>(l: T): l is T & { href: string } => l.href !== null;

export function Footer({ lang }: { lang: Limba }) {
  const an = new Date().getFullYear();
  const d = dictionar(lang);
  const t = d.subsol;
  const ro = lang === 'ro';

  // serviciile din meniu, plus video motion design (scos din meniu, pagina ramane). In EN/DE/FR, unde pagina
  // serviciului nu e tradusa, linkul duce la configuratorul lui sau la cererea de oferta (linkPagina); un link
  // fara inlocuitor nu se afiseaza.
  const SERVICII = [
    ...[...DEZVOLTARE_WEB, ...SOLUTII_COMPLETE].map((intern) => ({ href: linkPagina(lang, intern), label: d.servicii.lista[intern]?.titlu })),
    { href: linkPagina(lang, '/servicii/video-motion-design'), label: d.servicii.motion },
  ].filter(areLink);

  const COMPANIE = [
    { href: linkPagina(lang, '/portofoliu'), label: t.portofoliu },
    ...(ro
      ? [
          { href: '/marketplace', label: t.marketplace },
          { href: '/invata-gratuit', label: t.invataGratuit },
        ]
      : []),
    { href: cale(lang, '/oferta'), label: t.oferta },
    { href: cale(lang, '/contact'), label: t.contact },
  ].filter(areLink);

  const EXTERN = ro ? [{ href: 'https://www.novin.ro', label: t.audit }] : [];

  // In EN/DE/FR subsolul nu mai arata adresa, firma si ANPC (cerut de proprietar, 2026-11-07); datele firmei
  // raman la un clic, in sectiunea 1 din termeni („Impressum” in Germania si „mentions légales” in Franta
  // sunt obligatorii si trebuie sa fie usor de gasit de pe orice pagina).
  const LEGAL = [
    ...(ro ? [] : [{ href: cale(lang, `/termeni-si-conditii#${t.impressumAncora}`), label: t.impressum }]),
    { href: cale(lang, '/termeni-si-conditii'), label: t.termeni },
    { href: cale(lang, '/politica-de-confidentialitate'), label: t.confidentialitate },
    { href: cale(lang, '/politica-cookies'), label: t.cookies },
  ];

  return (
    <footer className={styles.subsol}>
      <div className={styles.chenar}>
        <div className={styles.card}>
          <div className={styles.sus}>
            <div className={styles.brand}>
              <Link href={cale(lang, '/')} aria-label={d.antet.acasa} className={styles.logo}>
                <Image src="/imagini/logo-inovex-antet.png" alt="Inovex" width={95} height={22} unoptimized />
              </Link>
              <p className={styles.despre}>{t.despre}</p>
              <ul className={styles.retele}>
                {RETELE.map(({ href, retea, Icon }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={format(t.retea, { retea })}>
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav className={styles.coloane} aria-label={t.aria}>
              <div>
                <p className={styles.titlu}>{t.titluServicii}</p>
                <ul className={styles.linkuri}>
                  {SERVICII.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={styles.titlu}>{t.titluCompanie}</p>
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
                <p className={styles.titlu}>{t.titluLegal}</p>
                <ul className={styles.linkuri}>
                  {LEGAL.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={styles.titlu}>{t.titluContact}</p>
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
                      {d.telefon}
                    </LinkTelefon>
                  </li>
                  {ro && (
                    <li>
                      <span>
                        <MapPin aria-hidden />
                        {t.locatie}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>

          <div className={styles.jos}>
            <div className={styles.firma}>
              <p>{format(t.drepturi, { an })}</p>
              {ro && <p>VOID SFT GAMES SRL · CUI 43474393</p>}
            </div>
            <div className={styles.dreapta}>
              {/* pictograma SAL oficiala (anpc.ro), 250 x 50 px, cu link la platforma SAL: Ordinul ANPC 270/2026,
                  doar in romana. Pictograma SOL a plecat: platforma europeana ODR s-a inchis pe 20 iulie 2025
                  (Reg. UE 2024/3228). */}
              {ro && (
                <a className={styles.anpc} href="https://reclamatiisal.anpc.ro" target="_blank" rel="noopener noreferrer">
                  <Image src="/imagini/footer/anpc-sal.png" alt={t.sal} width={250} height={50} unoptimized />
                </a>
              )}
              {/* limba se alege automat (proxy.ts); aici se poate schimba de mana, discret */}
              <SelectorLimba lang={lang} t={d.limba} />
              <SetariCookies className={styles.cookies} text={t.setariCookies} />
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
