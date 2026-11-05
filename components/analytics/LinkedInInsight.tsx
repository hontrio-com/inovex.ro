'use client';

import { useEffect } from 'react';
import { CONSENT_CHANGED_EVENT, isMarketingAllowed } from '@/lib/cookies';
import { LINKEDIN_PARTNER_ID } from '@/lib/linkedin';

/* LinkedIn Insight Tag: scriptul din Campaign Manager, incarcat doar cu acordul pentru marketing — la
   deschiderea paginii, daca vizitatorul a acceptat deja, sau imediat ce accepta in banner, fara reincarcare.
   Paginile vazute fara reincarcare le numara singur (insight.min.js urmareste History API: pushState,
   popstate). Fara pixelul <noscript> din scriptul original: ar trimite vizita fara acord. Daca vizitatorul
   isi retrage acordul, „Setări cookies” reincarca pagina, iar tagul nu se mai incarca. */

function incarca() {
  const w = window;
  if (w._linkedin_data_partner_ids?.includes(LINKEDIN_PARTNER_ID)) return;
  w._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || [];
  w._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
  if (!w.lintrk) {
    const coada: unknown[] = [];
    w.lintrk = Object.assign((a: string, b?: Record<string, unknown>) => void coada.push([a, b]), { q: coada });
  }
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  document.head.appendChild(s);
}

export function LinkedInInsight() {
  useEffect(() => {
    const verifica = () => {
      if (isMarketingAllowed()) incarca();
    };
    verifica();
    window.addEventListener(CONSENT_CHANGED_EVENT, verifica);
    window.addEventListener('storage', verifica);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, verifica);
      window.removeEventListener('storage', verifica);
    };
  }, []);

  return null;
}
