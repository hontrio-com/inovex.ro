import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import MotionPixelEvent from '@/components/servicii/motion/MotionPixelEvent';
import { getStripe } from '@/lib/stripe';
import { cale, esteLimba, LIMBA_IMPLICITA, linkPagina, type Limba } from '@/lib/i18n/config';
import { etichetaVideo, textMotion } from '@/lib/i18n/pagini/motion';
import { formatPret, MOTION_PATH, type MonedaMotion } from '@/lib/motion-design';
import styles from './multumim.module.css';

/* Pagina de dupa plata (Stripe), in stilul redesign-ului (2026-10-29): un chenar alb centrat, cu iconita
   in casuta gri, titlul, comanda si totalul pe randuri despartite de linii fine si butoanele negru + gri.
   Verificarea platii si evenimentul Purchase sunt cele dinainte. Din 2026-11-06, in limba paginii, cu
   totalul in moneda platii (lei sau euro, din sesiunea Stripe). */

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ session_id?: string }> };

const limba = async (params: Props['params']): Promise<Limba> => {
  const { lang } = await params;
  return esteLimba(lang) ? lang : LIMBA_IMPLICITA;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await limba(params);
  return { title: textMotion(lang).multumim.meta, robots: { index: false, follow: false } };
}

async function getPaidOrder(sessionId: string | undefined) {
  const stripe = getStripe();
  if (!stripe || !sessionId) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid' || session.metadata?.serviciu !== 'motion-design') return null;
    return {
      sessionId: session.id,
      videoclipuri: Number(session.metadata?.videoclipuri) || 0,
      total: (session.amount_total ?? 0) / 100,
      moneda: (session.currency ?? 'ron').toUpperCase() as MonedaMotion,
      email: session.customer_details?.email ?? null,
    };
  } catch {
    return null;
  }
}

export default async function Page({ params, searchParams }: Props) {
  const lang = await limba(params);
  const t = textMotion(lang);
  const m = t.multumim;
  const { session_id } = await searchParams;
  const order = await getPaidOrder(session_id);
  // al doilea buton: portofoliul (prin linkPagina, deci si cand pagina lipseste intr-o limba); fara el, contactul
  const portofoliu = linkPagina(lang, '/portofoliu');

  return (
    <section className={styles.pagina}>
      <div className={styles.card}>
        <span className={styles.icon} data-stare={order ? 'platit' : 'neconfirmat'}>
          {order ? <CheckCircle2 aria-hidden /> : <AlertCircle aria-hidden />}
        </span>

        <h1 className={styles.titlu}>{order ? m.titluOk : m.titluEroare}</h1>

        {order ? (
          <>
            <MotionPixelEvent
              event="Purchase"
              params={{ content_name: 'motion-design', value: order.total, currency: order.moneda }}
              eventId={order.sessionId}
              onceKey={order.sessionId}
            />
            <p className={styles.text}>
              {m.textOk}
              {order.email && (
                <>
                  {' '}
                  {m.trimisa} <strong>{order.email}</strong>.
                </>
              )}
            </p>

            <dl className={styles.detalii}>
              {order.videoclipuri > 0 && (
                <div>
                  <dt>{m.comanda}</dt>
                  <dd>{etichetaVideo(t.eticheta, order.videoclipuri)}</dd>
                </div>
              )}
              <div>
                <dt>{m.total}</dt>
                <dd className={styles.total}>{formatPret(order.total, order.moneda, lang)}</dd>
              </div>
              <div>
                <dt>{m.livrare}</dt>
                <dd>{m.livrareValoare}</dd>
              </div>
            </dl>

            <div className={styles.actiuni}>
              <Link href={cale(lang, '/')} className={styles.primar}>
                {m.acasa}
                <ArrowRight aria-hidden />
              </Link>
              <Link href={portofoliu ?? cale(lang, '/contact')} className={styles.secundar}>
                {portofoliu ? m.portofoliu : m.contact}
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className={styles.text}>{m.textEroare}</p>
            <div className={styles.actiuni}>
              <Link href={`${cale(lang, MOTION_PATH)}#comanda`} className={styles.primar}>
                {m.reia}
                <ArrowRight aria-hidden />
              </Link>
              <Link href={cale(lang, '/contact')} className={styles.secundar}>
                {m.contact}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
