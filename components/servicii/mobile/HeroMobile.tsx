'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceVideo from '@/components/sections/ServiceVideo';
import {
  Smartphone,
  ArrowRight,
  ChevronRight,
  Play,
} from 'lucide-react';

const PLATFORM_CHIPS = ['iOS (App Store)', 'Android (Google Play)', 'React Native', 'Flutter', 'Swift (native)', 'Kotlin (native)'];

export default function HeroMobile() {
  const shouldReduceMotion = useReducedMotion();

  const motionLeft = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } };
  const motionRight = shouldReduceMotion ? {} : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.2 } };

  return (
    <section className="relative bg-white border-b border-[#E8ECF0] pt-[140px] pb-[100px] max-md:pt-20 max-md:pb-16 overflow-hidden">
      <div aria-hidden className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none -z-[1]" style={{ background: 'radial-gradient(circle, rgba(43,143,204,0.04) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-12">
          <a href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Acasa</a>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <a href="/servicii" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Servicii</a>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <span className="text-[#0D1117] font-semibold">Aplicatii Mobile</span>
        </nav>

        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.div {...motionLeft}>
            <motion.div initial={shouldReduceMotion ? {} : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <Badge className="mb-6 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
                <Smartphone size={13} />
                Aplicatii Mobile iOS &amp; Android
              </Badge>
            </motion.div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2.1rem,3.6vw,3.2rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.022em',
                color: '#0D1117',
              }}
              className="mb-5"
            >
              Aplicatii mobile{' '}
              <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>native</span>
              {', '}livrate pe ambele platforme
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', lineHeight: 1.75, color: '#4A5568', maxWidth: 500 }} className="mb-8">
              React Native si Flutter pentru lansare rapida pe iOS si Android din acelasi proiect. Design nativ per platforma, performanta de 60fps, publicare completa in App Store si Google Play - totul inclus.
            </p>

            {/* Platform chips */}
            <div className="mb-9">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-3">Construim pentru:</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_CHIPS.map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
                  >
                    <Badge variant="secondary" className="cursor-default hover:bg-[#e2e8f0] transition-colors duration-150">{chip}</Badge>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Button href="/oferta" size="lg" rightIcon={<ArrowRight size={16} />}>Solicita oferta gratuita</Button>
              <Button size="lg" variant="outline" className="border-[#2B8FCC] text-[#2B8FCC] hover:bg-[#EAF5FF]" onClick={() => document.getElementById('demo-interactiv')?.scrollIntoView({ behavior: 'smooth' })}>
                Exploreaza demo interactiv
              </Button>
            </div>
          </motion.div>

          {/* Right — video mockup */}
          <motion.div {...motionRight} className="relative">
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                aspectRatio: '16/10',
                background: '#F4F6F8',
                boxShadow:
                  '0 24px 64px rgba(0,0,0,0.12),0 8px 24px rgba(0,0,0,0.08),inset 0 0 0 1px rgba(0,0,0,0.06)',
              }}
            >
              <ServiceVideo src="/imagini/servicii/aplicatii-mobile.mp4" loop={false} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
