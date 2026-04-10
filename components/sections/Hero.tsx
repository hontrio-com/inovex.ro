'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fu = (d: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: E },
});

const CARD_GAP = 14;
const IMG_W = 1424;
const IMG_H = 2560;

type Card = { id: string; src: string; label: string };

const COL_A: Card[] = [
  { id: 'a1', src: '/imagini/hero/HONTRIO.COM.png',            label: 'Hontrio.com'        },
  { id: 'a2', src: '/imagini/hero/CUTIADEMAGIE.RO.jpg',        label: 'Cutiademagie.ro'    },
  { id: 'a3', src: '/imagini/hero/DSMOTOR.RO.png',             label: 'Dsmotor.ro'         },
  { id: 'a4', src: '/imagini/hero/FORTASESTATE.RO.png',        label: 'Fortasestate.ro'    },
];
const COL_B: Card[] = [
  { id: 'b1', src: '/imagini/hero/ATPAUTOTEILE.png',           label: 'ATP Autoteile'      },
  { id: 'b2', src: '/imagini/hero/JUNIORFAMILY.RO.png',        label: 'Juniorfamily.ro'    },
  { id: 'b3', src: '/imagini/hero/MEDITATIILEVELUP.RO.png',    label: 'Meditatii Level Up' },
  { id: 'b4', src: '/imagini/hero/NEMESCAR.RO.jpg',            label: 'Nemescar.ro'        },
];
const COL_C: Card[] = [
  { id: 'c1', src: '/imagini/hero/PROFESORULDEAI.RO.png',      label: 'Profesoruldeai.ro'  },
  { id: 'c2', src: '/imagini/hero/TIGLOBALIMPORT1010.COM.png', label: 'TI Global Import'   },
  { id: 'c3', src: '/imagini/hero/VARLAN-EISENBAU.COM.png',    label: 'Varlan Eisenbau'    },
  { id: 'c4', src: '/imagini/hero/HONTRIO.COM.png',            label: 'Hontrio.com'        },
];

export function Hero() {
  return (
    <section
      className="relative bg-white overflow-hidden"
      style={{ paddingTop: '66px' }}
      aria-label="Secțiunea principală"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-spotlight pointer-events-none" aria-hidden />

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pointer-events-none">
          <div
            className="lg:w-[54%] xl:w-[52%] flex flex-col justify-center pointer-events-auto"
            style={{ minHeight: 'calc(100svh - 66px)', paddingBlock: '4rem' }}
          >
            <HeroText />
          </div>
        </div>
        <DesktopColumns />
      </div>

      {/* Mobile */}
      <div className="lg:hidden" style={{ overflow: 'hidden', maxWidth: '100vw' }}>
        <div className="px-5 pt-8 pb-6">
          <HeroText />
        </div>
        <MobileStrip />
      </div>
    </section>
  );
}

function HeroText() {
  return (
    <>
      <motion.div {...fu(0)} className="mb-5">
        <Link
          href="/portofoliu"
          className="inline-flex items-center gap-0 rounded-full border border-blue-100 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200 overflow-hidden"
          style={{ boxShadow: '0 1px 6px rgba(43,143,204,0.08)' }}
        >
          <span className="pl-4 pr-3 py-2 text-[13px] font-medium text-gray-600 whitespace-nowrap">
            Peste 200 de proiecte livrate
          </span>
          <span className="flex items-center gap-1.5 mr-1.5 my-1.5 px-3 py-1 rounded-full btn-shimmer text-[13px] font-semibold whitespace-nowrap">
            Citește mai mult
            <ArrowRight size={12} />
          </span>
        </Link>
      </motion.div>

      <motion.h1
        {...fu(0.06)}
        className="font-extrabold text-[#030712] mb-[1.1rem]"
        style={{
          fontFamily:    'var(--font-display, Plus Jakarta Sans, sans-serif)',
          fontSize:      'clamp(1.85rem, 3.1vw, 3rem)',
          letterSpacing: '-0.03em',
          lineHeight:    1.12,
        }}
      >
        Construim{' '}
        <span className="text-gradient-blue">magazine online și website-uri</span>{' '}
        care îți aduc clienți, nu doar trafic
      </motion.h1>

      <motion.p {...fu(0.14)} className="text-[15px] leading-[1.75] text-gray-500 mb-6 max-w-[540px]">
        De la magazine online și website-uri de prezentare până la aplicații web și
        platforme SaaS, dezvoltăm soluții rapide, optimizate SEO și construite pentru conversii.
      </motion.p>

      <motion.div {...fu(0.22)} className="flex flex-wrap items-center gap-3 mb-3">
        <Button href="/oferta" size="lg" className="btn-shimmer border-0 shadow-sm">
          Solicită Ofertă
        </Button>
        <Button href="/portofoliu" size="lg" variant="outline">
          Vezi portofoliul
        </Button>
      </motion.div>

      <motion.p {...fu(0.28)} className="text-[12.5px] text-blue-600 font-medium">
        Primești o ofertă personalizată în maximum 24 de ore
      </motion.p>
    </>
  );
}

function DesktopColumns() {
  return (
    <div className="absolute inset-y-0 right-0" style={{ left: '52%', overflow: 'hidden' }}>
      <div
        className="absolute flex"
        style={{
          gap: CARD_GAP, top: '-30%', bottom: '-30%',
          left: '-6%', right: '-15%',
          transform: 'rotate(-14deg)', transformOrigin: '50% 50%',
        }}
      >
        <ScrollColumn cards={COL_A} direction="up"   duration={38} startFrac={0}    />
        <ScrollColumn cards={COL_B} direction="down" duration={30} startFrac={0.45} />
        <ScrollColumn cards={COL_C} direction="up"   duration={46} startFrac={0.7}  />
      </div>
      <div className="absolute inset-y-0 left-0 w-52 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, white 35%, transparent)' }} />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"  style={{ background: 'linear-gradient(to bottom, white 20%, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, white 25%, transparent)' }} />
    </div>
  );
}

function MobileStrip() {
  return (
    <div style={{ position: 'relative', height: 320, overflow: 'hidden', clipPath: 'inset(0)' }}>
      <div
        className="absolute flex"
        style={{ gap: CARD_GAP, top: '-25%', bottom: '-25%', left: 0, right: 0, transform: 'rotate(-7deg)', transformOrigin: '50% 50%' }}
      >
        <ScrollColumn cards={COL_A} direction="up"   duration={24} startFrac={0}    />
        <ScrollColumn cards={COL_B} direction="down" duration={20} startFrac={0.5}  />
        <ScrollColumn cards={COL_C} direction="up"   duration={30} startFrac={0.25} />
      </div>
      <div className="absolute inset-x-0 top-0 h-14 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, white 5%, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, white 5%, transparent)' }} />
    </div>
  );
}

function ScrollColumn({ cards, direction, duration, startFrac, maxColWidth }: {
  cards: Card[]; direction: 'up' | 'down'; duration: number; startFrac: number; maxColWidth?: number;
}) {
  const y            = useMotionValue(0);
  const setH         = useRef(0);
  const ready        = useRef(false);
  const paused       = useRef(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const h = el.scrollHeight / 2;
      if (h === 0) return;
      setH.current = h;
      y.set(direction === 'up' ? -(h * startFrac) : -h + h * startFrac);
      ready.current = true;
      setVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useAnimationFrame((_, rawDelta) => {
    if (!ready.current || paused.current || setH.current === 0) return;
    const delta = Math.min(rawDelta, 50);
    const speed = setH.current / (duration * 1000);
    let cur = y.get();
    if (direction === 'up') {
      cur -= speed * delta;
      if (cur < -setH.current) cur += setH.current;
    } else {
      cur += speed * delta;
      if (cur >= 0) cur -= setH.current;
    }
    y.set(cur);
  });

  return (
    <div
      style={{ flex: 1, minWidth: 0, ...(maxColWidth ? { maxWidth: maxColWidth } : {}), overflow: 'hidden', height: '100%' }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <motion.div ref={containerRef} style={{ y, opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <CardSet cards={cards} suffix="a" />
        <CardSet cards={cards} suffix="b" />
      </motion.div>
    </div>
  );
}

function CardSet({ cards, suffix }: { cards: Card[]; suffix: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: CARD_GAP, paddingBottom: CARD_GAP }}>
      {cards.map(c => <SiteCard key={`${c.id}-${suffix}`} src={c.src} label={c.label} />)}
    </div>
  );
}

function SiteCard({ src, label }: { src: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        flexShrink: 0, width: '100%', aspectRatio: `${IMG_W} / ${IMG_H}`,
        borderRadius: 14, overflow: 'hidden', border: '1px solid #e5e7eb', cursor: 'default',
        filter:    hovered ? 'grayscale(0) brightness(1)'    : 'grayscale(1) brightness(0.93)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.14)' : '0 1px 4px rgba(0,0,0,0.07)',
        transition: 'filter 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }} />
    </div>
  );
}
