import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion, Phone, Plus } from 'lucide-react';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import type { FaqItem } from '@/lib/site-data';
import styles from './Intrebari.module.css';

/* Intrebarile frecvente de pe prima pagina, in stilul prezentei nationale (2026-10-29): intr-o parte
   textul, cu butoanele de contact, in cealalta intrebarile, despartite de linii fine. Pe ecranele
   mari, totul sta intr-un chenar ca al hero-ului; pe telefon si tableta, intr-un card. Intrebarile se
   deschid fara JavaScript (<details> cu acelasi `name`: se deschide una singura odata); prima e
   deschisa. Intrebarile vin din admin (datele 'faq'); daca acolo nu e nimic, raman cele de mai jos. */

const INTREBARI: FaqItem[] = [
  { id: '1', q: 'Cât durează realizarea unui magazin online?', a: 'Un magazin online se realizează în 14 până la 35 de zile lucrătoare, în funcție de complexitatea proiectului și de numărul de produse adăugate.' },
  { id: '2', q: 'Oferiți garanție pentru proiectele dezvoltate?', a: 'Da. Toate proiectele vin cu 1 an garanție. Orice problemă apărută din vina noastră este remediată gratuit în această perioadă.' },
  { id: '3', q: 'Pot să îmi administrez singur site-ul după lansare?', a: 'Da. Integrăm un panou de administrare intuitiv și la finalizarea proiectului îți facem un tutorial video complet în care îți arătăm absolut tot. Nu ai nevoie de cunoștințe tehnice pentru a adăuga produse, articole sau a modifica conținut.' },
  { id: '4', q: 'Lucrați cu clienți din toată România sau doar local?', a: 'Colaborăm cu firme din toată țara. Nu contează unde ești, ne descurcăm perfect și la distanță.' },
  { id: '5', q: 'Ce se întâmplă dacă nu sunt mulțumit de design?', a: 'Procesul nostru include revizii nelimitate în faza de design, înainte de a trece la dezvoltare. Nu trecem la cod până când nu ești 100% mulțumit de aspectul vizual.' },
  { id: '6', q: 'Oferiți servicii de mentenanță?', a: 'Da. Avem pachete de mentenanță lunară care includ actualizări de securitate, backup zilnic, monitorizare uptime, modificări de conținut și suport tehnic prioritar. Hosting-ul nu este inclus, însă te putem îndruma către soluțiile potrivite.' },
  { id: '7', q: 'Puteți prelua un proiect existent neterminat sau vechi?', a: 'Da, analizăm orice proiect existent și oferim o evaluare onestă. Uneori este mai eficient să reconstruim, alteori optimizăm ce există. Recomandăm întotdeauna soluția în interesul clientului.' },
];

export function Intrebari({ items }: { items?: FaqItem[] } = {}) {
  const lista = items && items.length > 0 ? items : INTREBARI;

  return (
    <section className={styles.intrebari} aria-labelledby="intrebari-titlu">
      <div className={styles.chenar}>
        <div className={styles.card}>
          <div className={styles.text}>
            <span className={styles.icon}>
              <MessageCircleQuestion strokeWidth={1.6} aria-hidden />
            </span>
            <h2 id="intrebari-titlu" className={styles.titlu}>
              Întrebări frecvente
            </h2>
            <p className={styles.descriere}>
              {/* cratimele care nu se rup (U+2011): „sună-ne” nu se mai desparte la capat de rand */}
              Răspunsuri clare, fără surprize, la tot ce vrei să știi înainte să începem. Nu găsești răspunsul
              aici? Scrie‑ne sau sună‑ne.
            </p>
            <div className={styles.actiuni}>
              <Link href="/oferta" className={styles.primar}>
                Solicită ofertă
                <ArrowRight aria-hidden />
              </Link>
              <LinkTelefon className={styles.secundar}>
                <Phone aria-hidden />
                {TELEFON.text}
              </LinkTelefon>
            </div>
          </div>

          <div className={styles.lista}>
            {lista.map((item, k) => (
              <details key={item.id} name="intrebari-frecvente" className={styles.intrebare} open={k === 0}>
                <summary className={styles.rand}>
                  <h3 className={styles.q}>{item.q}</h3>
                  <span className={styles.plus} aria-hidden>
                    <Plus />
                  </span>
                </summary>
                <p className={styles.a}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
