'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { trackConversions } from '@/lib/gtm';
import { cale, linkPagina, type Limba } from '@/lib/i18n/config';
import type { Dictionar } from '@/lib/i18n/dictionare/ro';
import { DEZVOLTARE_WEB, SOLUTII_COMPLETE, TELEFON } from './meniu-servicii/date';
import { MeniuServicii } from './meniu-servicii/MeniuServicii';
import styles from './Header.module.css';

// Meniul mare de servicii (meniu-servicii/MeniuServicii) e ascuns pentru moment, la cererea
// proprietarului (2026-10-29): „Servicii” duce la sectiunea de servicii de pe prima pagina. Cu `true`
// revine meniul mare pe desktop si lista pliabila pe telefon.
const MENIU_SERVICII = false;

/** Textele antetului (din dictionarul limbii, primite de la layout-ul site-ului). */
export type TextAntet = Dictionar['antet'] & { telefon: string; meniu: Dictionar['servicii'] };

type Pagina = { href: string; label: string; nou?: boolean };

// „Învață gratuit” e scos din meniu pentru moment (2026-10-29); pagina ramane. Marketplace e doar pentru
// Romania, deci apare doar in romana (2026-11-05). Linkurile trec prin linkPagina: o pagina netradusa e
// inlocuita de echivalentul ei tradus sau nu apare.
function pagini(lang: Limba, t: TextAntet): Pagina[] {
  const lista: { href: string | null; label: string; nou?: boolean }[] = [
    { href: linkPagina(lang, '/servicii/video-motion-design'), label: t.motion, nou: true },
    { href: linkPagina(lang, '/portofoliu'), label: t.portofoliu },
    ...(lang === 'ro' ? [{ href: '/marketplace', label: t.marketplace }] : []),
    { href: linkPagina(lang, '/contact'), label: t.contact },
  ];
  return lista.filter((p): p is Pagina => p.href !== null);
}

// eticheta „Nou” de langa un link din meniu
function Nou({ text }: { text: string }) {
  return <span className={styles.nou}>{text}</span>;
}

const esteActiv = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

// Antetul se desprinde de marginea de sus de indata ce pagina s-a derulat putin. Citit din
// fereastra si la incarcare, deci si o pagina redeschisa la jumatate porneste cu bara desprinsa.
const abonareDerulare = (anunta: () => void) => {
  window.addEventListener('scroll', anunta, { passive: true });
  return () => window.removeEventListener('scroll', anunta);
};
const esteDerulat = () => window.scrollY > 16;
const peServer = () => false;

export function Header({ lang, t }: { lang: Limba; t: TextAntet }) {
  const pathname = usePathname();
  const PAGINI = pagini(lang, t);
  const serviciiAncora = cale(lang, '/#servicii');
  const derulat = useSyncExternalStore(abonareDerulare, esteDerulat, peServer);
  // Meniurile tin minte pagina pe care au fost deschise: dupa o navigare se inchid singure.
  const [serviciiPe, setServiciiPe] = useState<string | null>(null);
  const [meniuPe, setMeniuPe] = useState<string | null>(null);
  const serviciiOpen = serviciiPe === pathname;
  const meniuOpen = meniuPe === pathname;
  // cu meniul de pe telefon deschis bara e desprinsa si sus, ca sa stea deasupra cardului cu meniul
  const plutitor = derulat || meniuOpen;
  const serviciiRef = useRef<HTMLDivElement>(null);
  const meniuButonRef = useRef<HTMLButtonElement>(null);
  const inchidereServicii = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Escape inchide meniurile; un clic in afara inchide lista de servicii.
  useEffect(() => {
    if (!serviciiOpen && !meniuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (meniuOpen) meniuButonRef.current?.focus();
      setServiciiPe(null);
      setMeniuPe(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (serviciiRef.current && !serviciiRef.current.contains(e.target as Node)) setServiciiPe(null);
    };
    window.addEventListener('keydown', onKey);
    if (serviciiOpen) document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [serviciiOpen, meniuOpen]);

  // Cat e deschis meniul de pe telefon, pagina de dedesubt nu se deruleaza.
  useEffect(() => {
    if (!meniuOpen) return;
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = '';
    };
  }, [meniuOpen]);

  const deschideServicii = () => {
    if (inchidereServicii.current) clearTimeout(inchidereServicii.current);
    setServiciiPe(pathname);
  };
  const inchideServicii = () => {
    inchidereServicii.current = setTimeout(() => setServiciiPe(null), 120);
  };

  return (
    <>
      {/* fundalul intunecat din spatele meniului de pe telefon; un clic pe el inchide meniul */}
      {meniuOpen && <div className={styles.fundal} onClick={() => setMeniuPe(null)} aria-hidden />}
      {/* sub meniul de servicii pagina se estompeaza putin */}
      {serviciiOpen && <div className={styles.fundalServicii} aria-hidden />}

      <header className={styles.antet} data-plutitor={plutitor} data-meniu={meniuOpen} data-servicii={serviciiOpen}>
        <div className={styles.bara}>
          <Link href={cale(lang, '/')} aria-label={t.acasa} className={styles.logo}>
            {/* logo decupat pe litere, la 3x: mic (5 KB), se incarca direct, fara optimizatorul de imagini */}
            <Image src="/imagini/logo-inovex-antet.png" alt="Inovex" width={95} height={22} unoptimized loading="eager" />
          </Link>

          <nav aria-label={t.navigare} className={styles.nav}>
            {!MENIU_SERVICII && (
              <Link href={serviciiAncora} className={styles.navLink}>
                {t.servicii}
              </Link>
            )}
            {MENIU_SERVICII && (
            <div
              ref={serviciiRef}
              className={styles.servicii}
              onMouseEnter={deschideServicii}
              onMouseLeave={inchideServicii}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setServiciiPe(null);
              }}
            >
              <button
                type="button"
                aria-expanded={serviciiOpen}
                aria-controls="meniu-servicii"
                // de la tastatura (detail 0) butonul deschide si inchide; cu mouse-ul lista e deja deschisa la hover
                onClick={(e) => (e.detail === 0 && serviciiOpen ? setServiciiPe(null) : deschideServicii())}
                className={styles.navLink}
                data-activ={pathname.startsWith(cale(lang, '/servicii'))}
              >
                {t.servicii}
                <ChevronDown aria-hidden className={styles.chevron} />
              </button>
              {serviciiOpen && (
                <div id="meniu-servicii" className={styles.panouPoz}>
                  <MeniuServicii lang={lang} t={t.meniu} onNavigate={() => setServiciiPe(null)} plutitor={plutitor} />
                </div>
              )}
            </div>
            )}

            {PAGINI.map((pagina) => {
              const activ = esteActiv(pathname, pagina.href);
              return (
                <Link
                  key={pagina.href}
                  href={pagina.href}
                  aria-current={activ ? 'page' : undefined}
                  className={styles.navLink}
                  data-activ={activ}
                >
                  {pagina.label}
                  {pagina.nou && <Nou text={t.nou} />}
                </Link>
              );
            })}
          </nav>

          <div className={styles.actiuni}>
            <a href={TELEFON.href} onClick={() => trackConversions.telefon()} className={styles.telefon}>
              <Phone aria-hidden />
              {t.telefon}
            </a>
            <Link href={cale(lang, '/oferta')} className={styles.cta}>
              {t.oferta}
            </Link>
            <button
              ref={meniuButonRef}
              type="button"
              onClick={() => setMeniuPe(meniuOpen ? null : pathname)}
              aria-expanded={meniuOpen}
              aria-controls="meniu-mobil"
              aria-label={meniuOpen ? t.inchideMeniul : t.deschideMeniul}
              className={styles.meniuBtn}
            >
              {meniuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>

        {meniuOpen && (
          <MeniuMobil
            lang={lang}
            t={t}
            pagini={PAGINI}
            serviciiAncora={serviciiAncora}
            pathname={pathname}
            onNavigate={() => setMeniuPe(null)}
          />
        )}
      </header>
    </>
  );
}

function MeniuMobil({
  lang,
  t,
  pagini: PAGINI,
  serviciiAncora,
  pathname,
  onNavigate,
}: {
  lang: Limba;
  t: TextAntet;
  pagini: Pagina[];
  serviciiAncora: string;
  pathname: string;
  onNavigate: () => void;
}) {
  // pe o pagina de serviciu lista de servicii porneste deschisa
  const [serviciiDeschise, setServiciiDeschise] = useState(pathname.startsWith(cale(lang, '/servicii')));

  return (
    <div id="meniu-mobil" className={styles.mobil}>
      <nav aria-label={t.navigare}>
        {!MENIU_SERVICII && (
          <Link href={serviciiAncora} onClick={onNavigate} className={styles.mobilRand}>
            {t.servicii}
          </Link>
        )}
        {MENIU_SERVICII && (
        <button
          type="button"
          onClick={() => setServiciiDeschise(!serviciiDeschise)}
          aria-expanded={serviciiDeschise}
          aria-controls="mobil-servicii"
          className={styles.mobilRand}
        >
          {t.servicii}
          <ChevronDown aria-hidden className={styles.chevron} />
        </button>
        )}
        {MENIU_SERVICII && serviciiDeschise && (
          <ul id="mobil-servicii" className={styles.mobilServicii}>
            {[...DEZVOLTARE_WEB, ...SOLUTII_COMPLETE].map((intern) => {
              const href = linkPagina(lang, intern);
              return (
                href && (
                  <li key={intern}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={pathname === href ? 'page' : undefined}
                      className={styles.mobilServiciu}
                    >
                      {t.meniu.lista[intern]?.titlu}
                    </Link>
                  </li>
                )
              );
            })}
          </ul>
        )}

        <ul>
          {PAGINI.map((pagina) => (
            <li key={pagina.href}>
              <Link
                href={pagina.href}
                onClick={onNavigate}
                aria-current={esteActiv(pathname, pagina.href) ? 'page' : undefined}
                className={styles.mobilRand}
              >
                <span className={styles.mobilEticheta}>
                  {pagina.label}
                  {pagina.nou && <Nou text={t.nou} />}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.mobilActiuni}>
        <Link href={cale(lang, '/oferta')} onClick={onNavigate} className={styles.mobilCta}>
          {t.oferta}
        </Link>
        <a href={TELEFON.href} onClick={() => trackConversions.telefon()} className={styles.mobilTelefon}>
          <Phone aria-hidden />
          {t.suna}: {t.telefon}
        </a>
      </div>
    </div>
  );
}
