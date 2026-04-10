'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { FaqItem } from '@/lib/site-data';

const INTREBARI: FaqItem[] = [
  { id: '1', q: 'Cât durează realizarea unui magazin online?',             a: 'Un magazin online se realizează în 14 până la 35 de zile lucrătoare, în funcție de complexitatea proiectului și de numărul de produse adăugate.' },
  { id: '2', q: 'Oferiți garanție pentru proiectele dezvoltate?',          a: 'Da. Toate proiectele vin cu 1 an garanție. Orice problemă apărută din vina noastră este remediată gratuit în această perioadă.' },
  { id: '3', q: 'Pot să îmi administrez singur site-ul după lansare?',     a: 'Da. Integrăm un panou de administrare intuitiv și la finalizarea proiectului îți facem un tutorial video complet în care îți arătăm absolut tot. Nu ai nevoie de cunoștințe tehnice pentru a adăuga produse, articole sau a modifica conținut.' },
  { id: '4', q: 'Lucrați cu clienți din toată România sau doar local?',    a: 'Colaborăm cu firme din toată țara. Nu contează unde ești, ne descurcăm perfect și la distanță.' },
  { id: '5', q: 'Ce se întâmplă dacă nu sunt mulțumit de design?',        a: 'Procesul nostru include revizii nelimitate în faza de design, înainte de a trece la dezvoltare. Nu trecem la cod până când nu ești 100% mulțumit de aspectul vizual.' },
  { id: '6', q: 'Oferiți servicii de mentenanță?',                         a: 'Da. Avem pachete de mentenanță lunară care includ actualizări de securitate, backup zilnic, monitorizare uptime, modificări de conținut și suport tehnic prioritar. Hosting-ul nu este inclus, însă te putem îndruma către soluțiile potrivite.' },
  { id: '7', q: 'Puteți prelua un proiect existent neterminat sau vechi?', a: 'Da, analizăm orice proiect existent și oferim o evaluare onestă. Uneori este mai eficient să reconstruim, alteori optimizăm ce există. Recomandăm întotdeauna soluția în interesul clientului.' },
];

export function FAQ({ items }: { items?: FaqItem[] } = {}) {
  const data = items && items.length > 0 ? items : INTREBARI;

  return (
    <section className="py-20 lg:py-28 bg-gray-50" aria-labelledby="faq-titlu">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 id="faq-titlu" className="text-h2 text-gray-950 mb-4">Întrebări frecvente</h2>
          <p className="text-gray-500">Răspunsuri la cele mai comune întrebări despre colaborarea cu Inovex.</p>
        </ScrollReveal>

        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
          {data.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <AccordionItem
                value={`item-${i}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden px-5 data-[state=open]:border-blue/30 transition-colors"
              >
                <AccordionTrigger className="text-[15px] font-semibold text-gray-900 hover:no-underline py-4 [&>svg]:text-gray-400">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-[15px] leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </ScrollReveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
