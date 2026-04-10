import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import HeroMobile from '@/components/servicii/mobile/HeroMobile';
import DemoMobile from '@/components/servicii/mobile/DemoMobile';
import FeaturesMobile from '@/components/servicii/mobile/FeaturesMobile';
import PlatformComparison from '@/components/servicii/mobile/PlatformComparison';
import ProcessMobile from '@/components/servicii/mobile/ProcessMobile';
import { FAQ } from '@/components/sections/FAQ';
import CTAMobile from '@/components/servicii/mobile/CTAMobile';
import type { FaqItem } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Dezvoltare Aplicatii Mobile iOS & Android | React Native & Flutter | Inovex',
  description:
    'Construim aplicatii mobile native si cross-platform pentru iOS si Android. React Native, Flutter, design nativ per platforma, publicare App Store si Google Play incluse. Solicita oferta gratuita.',
  alternates: { canonical: 'https://inovex.ro/servicii/aplicatii-mobile' },
  openGraph: {
    title: 'Aplicatii Mobile iOS & Android | React Native & Flutter | Inovex',
    description:
      'Aplicatii mobile native si cross-platform pentru iOS si Android. Design nativ, publicare inclusa.',
    images: [{ url: '/images/og/aplicatii-mobile.jpg', width: 1200, height: 630 }],
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    q: 'Cat costa un cont Apple Developer si Google Play?',
    a: 'Contul Apple Developer costa 99 USD/an si este necesar pentru publicarea in App Store. Contul Google Play costa 25 USD, o singura data. Aceste costuri sunt ale tale si nu sunt incluse in proiect, dar te ghidam pas cu pas la creare si configurare.',
  },
  {
    id: '2',
    q: 'Cat dureaza aprobarea in App Store si Google Play?',
    a: 'Google Play aproba aplicatiile in 1-3 zile. Apple App Store dureaza 1-7 zile in mod normal, uneori mai mult pentru aplicatii noi sau cu functionalitati sensibile. Includem buffer pentru revizii in timeline-ul proiectului.',
  },
  {
    id: '3',
    q: 'Pot actualiza aplicatia dupa publicare fara sa retrimit la review?',
    a: 'Da, pentru aplicatiile React Native folosim actualizari OTA prin Expo EAS Update - modificarile de continut si logica ajung la utilizatori instant, fara App Store review. Modificarile native sau cele care schimba functionalitatile core necesita retrimitere la review.',
  },
  {
    id: '4',
    q: 'Functioneaza aplicatia si fara internet?',
    a: 'Implementam offline-first pentru functionalitatile cheie - utilizatorul poate folosi aplicatia fara conexiune, iar datele se sincronizeaza automat la reconectare. Comportamentul exact offline depinde de natura aplicatiei si se stabileste in faza de design.',
  },
  {
    id: '5',
    q: 'Pot vedea cum arata aplicatia inainte de lansare?',
    a: 'Da. Pe parcursul dezvoltarii primesti build-uri de test distribuite prin TestFlight (iOS) si Play Store Internal Testing (Android), astfel ca poti testa aplicatia pe dispozitivul real inainte de orice lansare.',
  },
  {
    id: '6',
    q: 'Ce se intampla daca Google sau Apple schimba regulile store-ului?',
    a: 'Monitorizam activ modificarile de politici ale ambelor platforme. In cei 30 de zile de suport post-lansare, orice actualizare necesara pentru conformitate este inclusa. Ulterior, o acoperim prin contractul de mentenanta.',
  },
  {
    id: '7',
    q: 'Putem adauga functionalitati noi dupa lansare?',
    a: 'Da, absolut. Proiectam arhitectura sa permita extindere fara rescrierea aplicatiei. Putem adauga module noi, integratii sau functionalitati printr-un contract de development continuu dupa lansarea initiala.',
  },
];

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Dezvoltare Aplicatii Mobile iOS & Android"
        description="Construim aplicatii mobile native si cross-platform pentru iOS si Android. React Native, Flutter, design nativ per platforma, publicare App Store si Google Play incluse."
        url="https://inovex.ro/servicii/aplicatii-mobile"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Servicii', url: 'https://inovex.ro/servicii' },
          { name: 'Aplicatii Mobile', url: 'https://inovex.ro/servicii/aplicatii-mobile' },
        ]}
      />
      <HeroMobile />
      <DemoMobile />
      <FeaturesMobile />
      <PlatformComparison />
      <ProcessMobile />
      <FAQ items={FAQ_ITEMS} />
      <CTAMobile />
    </>
  );
}
