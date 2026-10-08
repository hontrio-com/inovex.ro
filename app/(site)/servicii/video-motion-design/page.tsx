import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import HeroMotion from '@/components/servicii/motion/HeroMotion';
import BeneficiiMotion from '@/components/servicii/motion/BeneficiiMotion';
import PortfolioMotion from '@/components/servicii/motion/PortfolioMotion';
import ComandaMotion from '@/components/servicii/motion/ComandaMotion';
import StickyComandaMotion from '@/components/servicii/motion/StickyComandaMotion';
import MotionPixelEvent from '@/components/servicii/motion/MotionPixelEvent';
import { FAQ } from '@/components/sections/FAQ';
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
    q: 'Ce se intampla dupa ce platesc?',
    a: 'Primesti confirmarea pe email si ne apucam imediat de lucru, pe baza descrierii si a materialelor trimise la comanda. In maximum 48 de ore ai videoclipul. Daca avem nevoie de lamuriri, te contactam noi.',
  },
  {
    id: '2',
    q: 'Ce trebuie sa va trimit?',
    a: 'In formularul de comanda ne spui pe scurt despre ce este videoclipul si atasezi logo-ul, imagini sau alte materiale de brand. Daca ai deja texte sau capturi de ecran, ne ajuta, dar nu sunt obligatorii.',
  },
  {
    id: '3',
    q: 'Cat dureaza pana primesc videoclipul?',
    a: 'Maximum 48 de ore de la plata. Termenul curge din momentul in care avem comanda platita, cu descrierea si materialele tale.',
  },
  {
    id: '4',
    q: 'Pot cere modificari?',
    a: 'Da. Reviziile incluse in pret acopera ajustari de text, ritm, culori si sunet. Un concept complet nou se discuta separat.',
  },
  {
    id: '5',
    q: 'De ce e mai ieftin daca iau mai multe videoclipuri?',
    a: 'Cu cat comanzi mai multe, cu atat scade pretul pe fiecare: reducerea porneste de la 20% la doua videoclipuri si ajunge pana la 50%. Fiecare videoclip poate fi despre alt produs, alt serviciu sau alta campanie.',
  },
  {
    id: '6',
    q: 'Primesc factura?',
    a: 'Da. La plata completezi datele firmei si codul fiscal, iar factura se emite automat si se transmite in SPV (e-Factura).',
  },
  {
    id: '7',
    q: 'Am nevoie de un video mai lung sau de un proiect mai complex. Se poate?',
    a: 'Sigur. Pachetele de pe pagina acopera cele mai frecvente cereri. Pentru videoclipuri mai lungi, serii de clipuri sau animatie 3D, scrie-ne si iti facem o oferta personalizata.',
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
      <FAQ items={FAQ_ITEMS} />
      <StickyComandaMotion />
    </>
  );
}
