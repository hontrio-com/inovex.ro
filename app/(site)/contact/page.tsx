import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Mail, MapPin, MessageSquare, Phone, Timer } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import styles from '@/components/layout/PaginaFormular.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactează echipa Inovex pentru un proiect web. Răspundem în maximum 24 de ore. Telefon: 0750 456 096. Email: contact@inovex.ro.',
  alternates: { canonical: 'https://inovex.ro/contact' },
  openGraph: {
    title: 'Contact',
    description: 'Contactează echipa Inovex. Răspundem în maximum 24 de ore.',
    url: 'https://inovex.ro/contact',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    description: 'Contactează echipa Inovex. Răspundem în maximum 24 de ore.',
    images: ['/images/og/inovex-og.jpg'],
  },
};

/* Pagina de contact, in stilul primei pagini (2026-10-29): un singur chenar alb cu contur fin, ca
   randurile serviciilor si harta. Intr-o parte textul si datele de contact, despartite de linii fine;
   in cealalta, pe fundalul gri granulat al animatiilor, formularul intr-un card alb. Pe telefon,
   textul sus si formularul dedesubt. */

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Contact', url: 'https://inovex.ro/contact' },
        ]}
      />

      <section className={styles.contact} aria-labelledby="contact-titlu">
        <div className={styles.card}>
          <div className={styles.text}>
            <nav aria-label="Navigare secundară" className={styles.cale}>
              <Link href="/">Acasă</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">Contact</span>
            </nav>

            <span className={styles.icon}>
              <MessageSquare strokeWidth={1.6} aria-hidden />
            </span>
            <h1 id="contact-titlu" className={styles.titlu}>
              Hai să discutăm proiectul tău
            </h1>
            <p className={styles.descriere}>
              Completează formularul și îți răspundem în maximum 24 de ore. Fără presiune, fără angajamente.
            </p>

            <ul className={styles.date}>
              <li>
                <span className={styles.dateIcon}>
                  <Phone aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>Telefon</span>
                  <LinkTelefon className={styles.valoare}>{TELEFON.text}</LinkTelefon>
                </span>
              </li>
              <li>
                <span className={styles.dateIcon}>
                  <Mail aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>Email</span>
                  <a href="mailto:contact@inovex.ro" className={styles.valoare}>
                    contact@inovex.ro
                  </a>
                </span>
              </li>
              <li>
                <span className={styles.dateIcon}>
                  <Clock aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>Program</span>
                  <span className={styles.valoare}>Luni – Vineri, 09:00 – 18:00</span>
                </span>
              </li>
              <li>
                <span className={styles.dateIcon}>
                  <Timer aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>Timp de răspuns</span>
                  <span className={styles.valoare}>Sub 24 de ore, de obicei în aceeași zi</span>
                </span>
              </li>
              <li>
                <span className={styles.dateIcon}>
                  <MapPin aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>Sedii</span>
                  <span className={styles.valoare}>Târgu Jiu, Gorj · București</span>
                </span>
              </li>
            </ul>

            <p className={styles.firma}>VOID SFT GAMES SRL · CUI 43474393 · România</p>
          </div>

          <div className={styles.vizual}>
            <div className={styles.formular}>
              <h2 className={styles.formularTitlu}>Trimite-ne un mesaj</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
