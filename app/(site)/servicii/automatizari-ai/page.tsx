import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import HeroAi from '@/components/servicii/ai/HeroAi';
import DemoWorkflow from '@/components/servicii/ai/DemoWorkflow';
import FeaturesAi from '@/components/servicii/ai/FeaturesAi';
import PentruCineAi from '@/components/servicii/ai/PentruCineAi';
import ExempleImpact from '@/components/servicii/ai/ExempleImpact';
import ProcessAi from '@/components/servicii/ai/ProcessAi';
import { FAQ } from '@/components/sections/FAQ';
import CTAAi from '@/components/servicii/ai/CTAAi';

export const metadata: Metadata = {
  title: 'Automatizari AI si Agenti Inteligenti - Elimini Munca Repetitiva',
  description:
    'Implementam automatizari AI care lucreaza pentru tine 24/7: chatboti antrenati pe datele tale, procesare automata emailuri, calificare lead-uri si rapoarte generate automat. Solicita consultatie gratuita.',
  alternates: { canonical: 'https://inovex.ro/servicii/automatizari-ai' },
  openGraph: {
    title: 'Automatizari AI si Agenti Inteligenti',
    description:
      'Implementam automatizari AI care lucreaza pentru tine 24/7: chatboti, procesare emailuri, calificare lead-uri, rapoarte automate.',
    images: [{ url: '/images/og/automatizari-ai.jpg', width: 1200, height: 630 }],
  },
};

const FAQ_ITEMS = [
  {
    id: '1',
    q: 'Cat dureaza implementarea unei automatizari AI?',
    a: 'O automatizare simpla (ex: clasificare emailuri sau procesare documente) se livreaza in 1-2 saptamani. Un flux complex cu mai multi pasi, integrari multiple si logica conditionala poate dura 3-6 saptamani. Stabilim timeline-ul exact dupa sesiunea de audit a proceselor.',
  },
  {
    id: '2',
    q: 'Am nevoie de cunostinte tehnice pentru a folosi automatizarile?',
    a: 'Nu. Automatizarile ruleaza in fundal, independent. Echipa ta vede doar rezultatele: lead-urile calificate in CRM, documentele arhivate, rapoartele trimise. Includem un dashboard simplu de monitorizare si training complet pentru echipa.',
  },
  {
    id: '3',
    q: 'Ce se intampla daca AI-ul greseste sau automatizarea esueaza?',
    a: 'Construim mecanisme de fallback in orice automatizare: cazurile incerte sunt trimise spre revizuire umana, nu procesate automat. Toate executiile sunt logate si poti vedea exact ce s-a intamplat cu fiecare item procesat. Alertele automate iti notifica echipa daca ceva iese din parametrii normali.',
  },
  {
    id: '4',
    q: 'Datele mele sunt in siguranta? Pot folosi modele AI locale?',
    a: 'Da. Putem configura automatizarile sa foloseasca modele AI rulate local pe infrastructura ta, fara ca datele sa paraseasca reteaua interna. Pentru date mai putin sensibile, folosim API-urile OpenAI sau Anthropic cu acorduri de procesare date conforme GDPR.',
  },
  {
    id: '5',
    q: 'Se poate integra cu sistemele pe care le folosim deja (CRM, ERP, etc.)?',
    a: 'Da. Lucram cu aproape orice sistem care are un API sau export de date: Salesforce, HubSpot, sistemele ERP romanesti, Google Workspace, Microsoft 365, Slack, WhatsApp Business si multe altele. Daca sistemul tau nu are API, construim un conector custom.',
  },
  {
    id: '6',
    q: 'Care este diferenta intre automatizare clasica (ex: Zapier) si automatizare AI?',
    a: 'Automatizarile clasice urmeaza reguli fixe: "daca X atunci Y". Automatizarile AI inteleg contextul si pot lua decizii: clasifica un email chiar daca nu contine exact cuvintele din regula, extrage date dintr-un document chiar daca formatul difera, sau genereaza un raspuns personalizat pentru fiecare situatie. Folosim adesea ambele: logica clasica pentru structura, AI pentru judecata.',
  },
  {
    id: '7',
    q: 'Cum masurati ROI-ul automatizarilor?',
    a: 'Inainte de implementare, masuram impreuna timpul actual petrecut pe procesul de automatizat, volumul zilnic si costul per ora. Dupa implementare, comparam cu datele reale. In mod tipic, clientii nostri recupereaza investitia in 2-4 luni prin ore economisite si erori eliminate.',
  },
];

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Automatizari AI si Agenti Inteligenti"
        description="Implementam automatizari AI care elimina munca repetitiva: chatboti, procesare emailuri, calificare lead-uri si rapoarte generate automat."
        url="https://inovex.ro/servicii/automatizari-ai"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Servicii', url: 'https://inovex.ro/servicii' },
          { name: 'Automatizari AI', url: 'https://inovex.ro/servicii/automatizari-ai' },
        ]}
      />
      <HeroAi />
      <DemoWorkflow />
      <FeaturesAi />
      <PentruCineAi />
      <ExempleImpact />
      <ProcessAi />
      <FAQ items={FAQ_ITEMS} />
      <CTAAi />
    </>
  );
}
