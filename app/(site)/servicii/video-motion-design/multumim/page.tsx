import type { Metadata } from 'next';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MotionPixelEvent from '@/components/servicii/motion/MotionPixelEvent';
import { getStripe } from '@/lib/stripe';
import { motionLabel, formatLei, MOTION_PATH } from '@/lib/motion-design';

export const metadata: Metadata = {
  title: 'Comanda confirmata - Video Motion Design',
  robots: { index: false, follow: false },
};

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
    <section className="bg-white pt-[160px] pb-[120px] max-md:pt-28 max-md:pb-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 ${order ? 'bg-[#F0FDF4]' : 'bg-[#FEF3C7]'}`}>
          {order ? <CheckCircle size={28} className="text-[#059669]" /> : <AlertCircle size={28} className="text-[#D97706]" />}
        </div>

        <h1
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.8rem,3vw,2.5rem)', lineHeight: 1.12, letterSpacing: '-0.022em', color: '#0D1117' }}
          className="mb-4"
        >
          {order ? 'Plata a fost confirmata. Multumim!' : 'Nu am putut confirma plata'}
        </h1>

        {order ? (
          <>
            <MotionPixelEvent
              event="Purchase"
              params={{ content_name: 'motion-design', value: order.total, currency: 'RON' }}
              eventId={order.sessionId}
              onceKey={order.sessionId}
            />
            <p className="text-[#4A5568] text-[1.0625rem] leading-relaxed mb-8">
              Am primit brief-ul si materialele tale si ne apucam de videoclip. Daca avem nevoie de lamuriri, te contactam in maximum 24 de ore.
              {order.email && <> Confirmarea a fost trimisa la <strong className="text-[#0D1117]">{order.email}</strong>.</>}
            </p>
            <dl className="rounded-2xl border border-[#E8ECF0] bg-[#F8FAFB] text-left divide-y divide-[#E8ECF0] mb-8">
              {order.pachet && (
                <div className="flex justify-between gap-4 px-5 py-3.5">
                  <dt className="text-[14px] text-[#4A5568]">Comanda</dt>
                  <dd className="text-[14px] font-semibold text-[#0D1117]">{order.pachet}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 px-5 py-3.5">
                <dt className="text-[14px] text-[#4A5568]">Total platit</dt>
                <dd className="text-[14px] font-semibold text-[#0D1117]">{formatLei(order.total)}</dd>
              </div>
            </dl>
            <Button href="/" size="lg" variant="outline">Inapoi la prima pagina</Button>
          </>
        ) : (
          <>
            <p className="text-[#4A5568] text-[1.0625rem] leading-relaxed mb-8">
              Daca ai finalizat plata, vei primi confirmarea pe email in cateva minute. Daca nu, poti relua comanda sau ne poti scrie direct.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={`${MOTION_PATH}#comanda`} size="lg">Reia comanda</Button>
              <Button href="/contact" size="lg" variant="outline">Contacteaza-ne</Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
