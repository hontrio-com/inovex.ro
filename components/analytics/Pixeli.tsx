import { Suspense } from 'react';
import Script from 'next/script';
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { OpenAIPixel } from '@/components/analytics/OpenAIPixel';
import { LinkedInInsight } from '@/components/analytics/LinkedInInsight';

/* Toti pixelii, la inceputul lui <body>, in fiecare layout radacina (site, admin, semnarea contractelor),
   exact cum erau in vechiul app/layout.tsx unic. */
export function Pixeli() {
  return (
    <>
      <GoogleTagManager />
      <Suspense fallback={null}><MetaPixel /></Suspense>
      <Suspense fallback={null}><OpenAIPixel /></Suspense>
      <LinkedInInsight />
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('CSJBSCJC77U0SUN6SKH0');
              ttq.page();
            }(window, document, 'ttq');
          `,
        }}
      />
    </>
  );
}
