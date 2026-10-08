'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clapperboard, ArrowRight, ChevronRight, Play } from 'lucide-react';
import { motionPrice, formatLei } from '@/lib/motion-design';

const MARQUEE_ROW1_MOTION = ['Promo afacere', 'Trailer produs', 'Reclame Meta & TikTok', 'Explainer video', 'Lansare aplicatie', 'Logo animat'];
const MARQUEE_ROW2_MOTION = ['Reels & Shorts', 'Video pentru website', 'Prezentare servicii', 'Teaser eveniment', 'Video SaaS', 'Oferte & campanii'];

const FADE_MASK = 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function HeroMotion() {
  const shouldReduceMotion = useReducedMotion();

  const motionIn = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } };

  return (
    <section className="relative bg-white border-b border-[#E8ECF0] pt-[140px] pb-[90px] max-md:pt-20 max-md:pb-14 overflow-hidden">
      <div aria-hidden className="absolute top-0 left-1/2 w-[900px] h-[600px] rounded-full pointer-events-none -z-[1]" style={{ background: 'radial-gradient(circle, rgba(43,143,204,0.06) 0%, transparent 70%)', transform: 'translate(-50%, -40%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-12">
          <Link href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Acasa</Link>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <Link href="/servicii" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Servicii</Link>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <span className="text-[#0D1117] font-semibold">Video Motion Design</span>
        </nav>

        <motion.div {...motionIn} className="max-w-[760px] mx-auto text-center">
          <Badge className="mb-6 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            <Clapperboard size={13} />
            Videoclipuri animate de promovare
          </Badge>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(2.1rem,4.2vw,3.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.012em',
              wordSpacing: '0.06em',
              color: '#0D1117',
              textWrap: 'balance',
            }}
            className="mb-5"
          >
            Reclama video animata pentru afacerea ta,{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC', paddingRight: '0.08em' }}>gata in 48 de ore</span>
          </h1>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', lineHeight: 1.75, color: '#4A5568', maxWidth: 580 }} className="mb-8 mx-auto">
            Ne spui ce vinzi, iar noi iti facem un videoclip animat cu textele, culorile si logo-ul tau. Il pui direct in reclame pe Facebook, Instagram si TikTok sau pe site. Fara filmari, fara actori, de la {formatLei(motionPrice(1))}.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Button size="lg" rightIcon={<ArrowRight size={16} />} style={{ minWidth: 220 }} onClick={() => scrollTo('comanda')}>
              Comanda de la {formatLei(motionPrice(1))}
            </Button>
            <Button size="lg" variant="outline" leftIcon={<Play size={15} />} className="border-[#2B8FCC] text-[#2B8FCC] hover:bg-[#EAF5FF]" style={{ minWidth: 220 }} onClick={() => scrollTo('exemple')}>
              Vezi exemple
            </Button>
          </div>

          {/* Marquee */}
          <div>
            <style>{`
              @keyframes marquee-motion-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
              @keyframes marquee-motion-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
              .marquee-motion-left { animation: marquee-motion-left 25s linear infinite; display: flex; }
              .marquee-motion-right { animation: marquee-motion-right 25s linear infinite; display: flex; }
            `}</style>
            <div style={{ overflow: 'hidden', maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}>
              <div className="marquee-motion-left" style={{ gap: 8, width: 'max-content', marginBottom: 8 }}>
                {[...MARQUEE_ROW1_MOTION, ...MARQUEE_ROW1_MOTION].map((item, i) => (
                  <span key={i} style={{ background: '#EAF5FF', border: '1px solid #BFDFFF', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#2B8FCC', whiteSpace: 'nowrap' }}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="marquee-motion-right" style={{ gap: 8, width: 'max-content' }}>
                {[...MARQUEE_ROW2_MOTION, ...MARQUEE_ROW2_MOTION].map((item, i) => (
                  <span key={i} style={{ background: '#EAF5FF', border: '1px solid #BFDFFF', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#2B8FCC', whiteSpace: 'nowrap' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
