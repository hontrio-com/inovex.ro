import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import HeroSaas from '@/components/servicii/saas/HeroSaas';
import DemoInteractiv from '@/components/servicii/saas/DemoInteractiv';
import FeaturesSaas from '@/components/servicii/saas/FeaturesSaas';
import TipuriAplicatii from '@/components/servicii/saas/TipuriAplicatii';
import ProcessSaas from '@/components/servicii/saas/ProcessSaas';
import TechnologiesSaas from '@/components/servicii/saas/TechnologiesSaas';
import { FAQ } from '@/components/sections/FAQ';
import CTASaas from '@/components/servicii/saas/CTASaas';

export const metadata: Metadata = {
  title: 'Dezvoltare Aplicatii Web & SaaS - Platforme Scalabile',
  description:
    'Construim aplicatii web complexe si platforme SaaS de la zero: autentificare, subscriptii, dashboard-uri in timp real, API-uri documentate. MVP sau platforma enterprise. Solicita oferta gratuita.',
  alternates: { canonical: 'https://inovex.ro/servicii/aplicatii-web-saas' },
  openGraph: {
    title: 'Dezvoltare Aplicatii Web & SaaS',
    description:
      'Platforme SaaS, marketplace-uri, aplicatii de management. De la MVP la enterprise.',
    images: [
      { url: '/images/og/aplicatii-web-saas.jpg', width: 1200, height: 630 },
    ],
  },
};

const FAQ_ITEMS = [
  {
    id: '1',
    q: 'Cat dureaza construirea unei aplicatii web?',
    a: 'Depinde de complexitate. Un MVP cu functionalitatile de baza se livreaza in aproximativ 14 zile. O platforma completa cu toate modulele poate dura intre 1 luna si 6 luni, in functie de complexitate. Stabilim timeline-ul exact in faza de analiza, cu milestone-uri clare si demo-uri la fiecare sprint.',
  },
  {
    id: '2',
    q: 'Pot sa vad progresul pe parcursul dezvoltarii?',
    a: 'Da. Ai acces permanent la un mediu de staging unde poti testa tot ce se construieste. La finalul fiecarui sprint de 2 saptamani faci un demo complet cu echipa noastra si aprobi directia inainte sa continuam.',
  },
  {
    id: '3',
    q: 'Ce se intampla cu codul dupa predare?',
    a: 'Primesti accesul complet la repository-ul Git cu istoricul integral al codului. Nu exista dependente ascunse de Inovex. Poti continua dezvoltarea cu orice echipa sau dezvoltator dupa predare.',
  },
  {
    id: '4',
    q: 'Construiti si backend-ul sau doar frontend-ul?',
    a: 'Construim aplicatia completa: frontend, backend, baza de date, API-uri, infrastructura cloud si CI/CD. Predam un produs functional end-to-end, nu doar o interfata vizuala.',
  },
  {
    id: '5',
    q: 'Cum gestionati scalarea daca numarul de utilizatori creste rapid?',
    a: 'Arhitectam de la inceput pentru scalare. Folosim infrastructura cloud cu scalare automata, caching la multiple niveluri si load balancing. Aplicatiile noastre au suportat cresteri de trafic de 10x fara downtime.',
  },
  {
    id: '6',
    q: 'Oferiti mentenanta si suport dupa lansare?',
    a: 'Da. Inclus: 30 de zile suport post-lansare. Optional: contract de mentenanta lunara care include actualizari de securitate, backup monitorizat, remediere bug-uri si ore de dezvoltare pentru functionalitati noi.',
  },
  {
    id: '7',
    q: 'Pot porni cu un MVP si extinde ulterior?',
    a: 'Aceasta este abordarea pe care o recomandam cel mai des. Construim MVP-ul cu arhitectura corecta de la start, astfel ca extinderea ulterioara nu necesita rescrierea bazei. Fiecare feature nou se adauga fara a destabiliza ce exista deja.',
  },
];

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Dezvoltare Aplicatii Web & SaaS"
        description="Construim platforme SaaS, marketplace-uri si aplicatii web complexe de la zero."
        url="https://inovex.ro/servicii/aplicatii-web-saas"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Servicii', url: 'https://inovex.ro/servicii' },
          {
            name: 'Aplicatii Web & SaaS',
            url: 'https://inovex.ro/servicii/aplicatii-web-saas',
          },
        ]}
      />
      <HeroSaas />
      <DemoInteractiv />
      <FeaturesSaas />
      <TipuriAplicatii />
      <ProcessSaas />
      <TechnologiesSaas />
      <FAQ items={FAQ_ITEMS} />
      <CTASaas />
    </>
  );
}
