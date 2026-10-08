'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/meta-pixel';

interface MotionPixelEventProps {
  event: 'ViewContent' | 'Purchase';
  params: Record<string, unknown>;
  /** Acelasi id ca perechea server-side (Conversions API) => Meta deduplica. */
  eventId?: string;
  /** Daca e setat, evenimentul pleaca o singura data per browser (ex.: reload pe pagina de multumire). */
  onceKey?: string;
}

/**
 * Trimite un eveniment Meta Pixel la afisarea paginii. Pixelul se incarca dupa
 * hidratare (si doar cu acord de marketing), asa ca asteptam putin sa apara fbq.
 */
export default function MotionPixelEvent({ event, params, eventId, onceKey }: MotionPixelEventProps) {
  useEffect(() => {
    const storageKey = onceKey ? `motion-pixel:${onceKey}` : null;
    let tries = 0;

    const fire = () => {
      if (typeof window.fbq !== 'function') return false;
      try {
        if (storageKey && sessionStorage.getItem(storageKey)) return true;
        if (storageKey) sessionStorage.setItem(storageKey, '1');
      } catch { /* storage indisponibil — trimitem oricum */ }
      trackEvent(event, params, eventId);
      return true;
    };

    if (fire()) return;
    const timer = setInterval(() => {
      if (fire() || ++tries >= 20) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
