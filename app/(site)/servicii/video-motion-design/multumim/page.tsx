import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import MotionPixelEvent from '@/components/servicii/motion/MotionPixelEvent';
import { getStripe } from '@/lib/stripe';
import { motionLabel, formatLei, MOTION_PATH } from '@/lib/motion-design';
import styles from './multumim.module.css';

export const metadata: Metadata = {
  title: 'Comandă confirmată - Video Motion Design',
  robots: { index: false, follow: false },
};

/* Pagina de dupa plata (Stripe), in stilul redesign-ului (2026-10-29): un chenar alb centrat, cu iconita
   in casuta gri, titlul, comanda si totalul pe randuri despartite de linii fine si butoanele negru + gri.
   Verificarea platii si evenimentul Purchase sunt cele dinainte. */

async function getPaidOrder(sessionId: string | undefined) {
  const stripe = getStripe();
  if (!stripe || !sessionId) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid' || session.metadata?.serviciu !== 'motion-design') return null;
    return {
      sessionId: session.id,
      pachet: Number(session.metadata?.videoclipuri) > 0 ? motionLabel(Number(session.metadata?.videoclipuri)) : null,
      total: (session.amount_total ?? 0) / 100,
      email: session.customer_details?.email ?? null,
    };
  } catch {
    return null;
  }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const order = await getPaidOrder(session_id);

  return (
    <section className={styles.pagina}>
      <div className={styles.card}>
        <span className={styles.icon} data-stare={order ? 'platit' : 'neconfirmat'}>
          {order ? <CheckCircle2 aria-hidden /> : <AlertCircle aria-hidden />}
        </span>

        <h1 className={styles.titlu}>{order ? 'Plata a fost confirmată. Mulțumim!' : 'Nu am putut confirma plata'}</h1>

        {order ? (
          <>
            <MotionPixelEvent
              event="Purchase"
              params={{ content_name: 'motion-design', value: order.total, currency: 'RON' }}
              eventId={order.sessionId}
              onceKey={order.sessionId}
            />
            <p className={styles.text}>
              Am primit brief-ul și materialele tale și ne apucăm de videoclip. Dacă avem nevoie de lămuriri, te
              contactăm în maximum 24 de ore.
              {order.email && (
                <>
                  {' '}
                  Confirmarea a fost trimisă la <strong>{order.email}</strong>.
                </>
              )}
            </p>

            <dl className={styles.detalii}>
              {order.pachet && (
                <div>
                  <dt>Comanda</dt>
                  <dd>{order.pachet}</dd>
                </div>
              )}
              <div>
                <dt>Total plătit</dt>
                <dd className={styles.total}>{formatLei(order.total)}</dd>
              </div>
              <div>
                <dt>Livrare</dt>
                <dd>În maximum 48 de ore</dd>
              </div>
            </dl>

            <div className={styles.actiuni}>
              <Link href="/" className={styles.primar}>
                Înapoi la prima pagină
                <ArrowRight aria-hidden />
              </Link>
              <Link href="/portofoliu" className={styles.secundar}>
                Vezi portofoliul
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className={styles.text}>
              Dacă ai finalizat plata, vei primi confirmarea pe email în câteva minute. Dacă nu, poți relua comanda
              sau ne poți scrie direct.
            </p>
            <div className={styles.actiuni}>
              <Link href={`${MOTION_PATH}#comanda`} className={styles.primar}>
                Reia comanda
                <ArrowRight aria-hidden />
              </Link>
              <Link href="/contact" className={styles.secundar}>
                Contactează-ne
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
