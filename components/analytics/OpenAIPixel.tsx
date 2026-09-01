'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { measure, setConsent } from '@/lib/openai-pixel'
import { isMarketingAllowed, CONSENT_CHANGED_EVENT } from '@/lib/cookies'

const PIXEL_ID = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID

/**
 * Pixelul OpenAI Ads (ChatGPT Ads).
 *
 * Doua lucruri verificate direct in SDK-ul oaiq (v0.1.32), nu presupuse:
 *  1. `init` NU declanseaza automat `page_viewed` — trebuie trimis explicit,
 *     o data in snippet (incarcarea completa a paginii) si apoi la fiecare
 *     navigare client-side. De-aia useEffect-ul sare peste prima rulare: acolo
 *     evenimentul a fost deja trimis din snippet.
 *  2. `page_viewed` cere forma de date `contents`, nu `customer_action`.
 *
 * Consimtamant: `oaiq("consent", false)` inainte de `init` cand marketingul nu
 * e acceptat (SDK-ul considera implicit ca e permis), apoi se comuta pe true
 * cand vizitatorul accepta, fara reincarcarea paginii.
 */
export function OpenAIPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const firstRun = useRef(true)

  // Navigari client-side. Prima rulare e incarcarea initiala, deja numarata.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    measure('page_viewed')
  }, [pathname, searchParams])

  // Reactie imediata la bannerul de cookie-uri.
  useEffect(() => {
    const sync = () => setConsent(isMarketingAllowed())
    window.addEventListener(CONSENT_CHANGED_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (!PIXEL_ID) return null

  return (
    <Script
      id="openai-ads-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;
var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];
f.parentNode.insertBefore(j,f)})(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
try{var c=JSON.parse(localStorage.getItem("cookie_consent")||"null");
if(!c||c.marketing!==true){oaiq("consent",false);}}catch(e){}
oaiq("init",{pixelId:"${PIXEL_ID}"});
oaiq("measure","page_viewed",{type:"contents"});
        `,
      }}
    />
  )
}
