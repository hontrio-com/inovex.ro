import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import HeroMotion from '@/components/servicii/motion/HeroMotion';
import BeneficiiMotion from '@/components/servicii/motion/BeneficiiMotion';
import PortfolioMotion from '@/components/servicii/motion/PortfolioMotion';
import ComandaMotion from '@/components/servicii/motion/ComandaMotion';
import StickyComandaMotion from '@/components/servicii/motion/StickyComandaMotion';
import MotionPixelEvent from '@/components/servicii/motion/MotionPixelEvent';
import { Intrebari } from '@/components/sections/intrebari/Intrebari';
import { motionPrice } from '@/lib/motion-design';
import type { FaqItem } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Videoclipuri Animate de Promovare pentru Afaceri - Gata in 48 de Ore',
  description:
    'Videoclipuri animate (motion design) pentru promovarea afacerii tale: reclame video, clipuri promo si trailere pentru site si social media. De la 249 lei, livrare in maximum 48 de ore, comanda online.',
  alternates: { canonical: 'https://inovex.ro/servicii/video-motion-design' },
  openGraph: {
    title: 'Videoclipuri Animate de Promovare pentru Afaceri - Gata in 48 de Ore',
    description:
      'Reclame video, clipuri promo si trailere animate pentru afacerea ta. De la 249 lei, gata in maximum 48 de ore.',
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    q: 'Ce se întâmplă după ce plătesc?',
    a: 'Primești confirmarea pe email și ne apucăm imediat de lucru, pe baza descrierii și a materialelor trimise la comandă. În maximum 48 de ore ai videoclipul. Dacă avem nevoie de lămuriri, te contactăm noi.',
  },
  {
    id: '2',
    q: 'Ce trebuie să vă trimit?',
    a: 'În formularul de comandă ne spui pe scurt despre ce este videoclipul și atașezi logo-ul, imagini sau alte materiale de brand. Dacă ai deja texte sau capturi de ecran, ne ajută, dar nu sunt obligatorii.',
  },
  {
    id: '3',
    q: 'Cât durează până primesc videoclipul?',
    a: 'Maximum 48 de ore de la plată. Termenul curge din momentul în care avem comanda plătită, cu descrierea și materialele tale.',
  },
  {
    id: '4',
    q: 'Pot cere modificări?',
    a: 'Da. Reviziile incluse în preț acoperă ajustări de text, ritm, culori și sunet. Un concept complet nou se discută separat.',
  },
  {
    id: '5',
    q: 'De ce e mai ieftin dacă iau mai multe videoclipuri?',
    a: 'Cu cât comanzi mai multe, cu atât scade prețul pe fiecare: reducerea pornește de la 20% la două videoclipuri și ajunge până la 50%. Fiecare videoclip poate fi despre alt produs, alt serviciu sau altă campanie.',
  },
  {
    id: '6',
    q: 'Primesc factură?',
    a: 'Da. La plată completezi datele firmei și codul fiscal, iar factura se emite automat și se transmite în SPV (e-Factura).',
  },
  {
    id: '7',
    q: 'Am nevoie de un video mai lung sau de un proiect mai complex. Se poate?',
    a: 'Sigur. Pachetele de pe pagină acoperă cele mai frecvente cereri. Pentru videoclipuri mai lungi, serii de clipuri sau animație 3D, scrie-ne și îți facem o ofertă personalizată.',
  },
];

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Videoclipuri Motion Design"
        description="Videoclipuri motion design pentru promovarea afacerilor: clipuri promo, trailere si reclame animate pentru site si social media."
        url="https://inovex.ro/servicii/video-motion-design"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Servicii', url: 'https://inovex.ro/servicii' },
          { name: 'Video Motion Design', url: 'https://inovex.ro/servicii/video-motion-design' },
        ]}
      />
      <MotionPixelEvent
        event="ViewContent"
        params={{ content_name: 'motion-design', content_category: 'servicii', value: motionPrice(1), currency: 'RON' }}
      />
      <HeroMotion />
      <BeneficiiMotion />
      <PortfolioMotion />
      <ComandaMotion />
      <Intrebari items={FAQ_ITEMS} />
      <StickyComandaMotion />
    </>
  );
}
