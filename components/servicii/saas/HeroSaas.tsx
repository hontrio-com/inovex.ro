'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceVideo from '@/components/sections/ServiceVideo';
import {
  Code2,
  CheckCircle,
  Clock,
  ArrowRight,
  Play,
  ChevronRight,
} from 'lucide-react';

const MARQUEE_ROW1_SAAS = ['Platforme SaaS', 'CRM Custom', 'ERP', 'Marketplace', 'Portal Clienti', 'Dashboard Analytics'];
const MARQUEE_ROW2_SAAS = ['Aplicatii B2B', 'Sisteme Rezervari', 'Platforme E-learning', 'Tools Interne', 'API-uri', 'Automatizari'];

export default function HeroSaas() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
      };

  const motionRightProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, delay: 0.2 },
      };

  const badgeMotionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4, delay: 0.05 },
      };

  return (
    <section className="relative bg-white border-b border-[#E8ECF0] pt-[140px] pb-[100px] max-md:pt-20 max-md:pb-16 overflow-hidden">
      {/* Decorative blur circle */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none -z-[1]"
        style={{
          background:
            'radial-gradient(circle, rgba(43,143,204,0.04) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-12">
          <a href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">
            Acasa
          </a>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <a href="/servicii" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">
            Servicii
          </a>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <span className="text-[#0D1117] font-semibold">Aplicatii Web &amp; SaaS</span>
        </nav>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div {...motionProps}>
            {/* Badge */}
            <motion.div {...badgeMotionProps}>
              <Badge className="mb-6 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
                <Code2 size={13} />
                Aplicatii Web &amp; SaaS
              </Badge>
            </motion.div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2.2rem,3.8vw,3.4rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.022em',
                color: '#0D1117',
              }}
              className="mb-5"
            >
              Construim aplicatia ta web, de la idee la{' '}
              <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>
                utilizatori reali
              </span>
            </h1>

            {/* Paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: '#4A5568',
                maxWidth: 500,
              }}
              className="mb-8"
            >
              Nu primesti un MVP fragil. Primesti o baza solida pe care
              construiesti ani de zile. Platforme SaaS, marketplace-uri,
              aplicatii de management sau portale B2B - arhitectam corect de la
              primul rand de cod.
            </p>

            {/* App type marquee */}
            <div className="mb-9">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-3">
                Construim:
              </p>
              <style>{`
                @keyframes marquee-saas-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
                @keyframes marquee-saas-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
                .marquee-saas-left { animation: marquee-saas-left 25s linear infinite; display: flex; }
                .marquee-saas-right { animation: marquee-saas-right 25s linear infinite; display: flex; }
              `}</style>
              <div style={{ overflow: 'hidden' }}>
                <div className="marquee-saas-left" style={{ gap: 8, width: 'max-content', marginBottom: 8 }}>
                  {[...MARQUEE_ROW1_SAAS, ...MARQUEE_ROW1_SAAS].map((item, i) => (
                    <span key={i} style={{ background: '#EAF5FF', border: '1px solid #BFDFFF', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#2B8FCC', whiteSpace: 'nowrap' }}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="marquee-saas-right" style={{ gap: 8, width: 'max-content' }}>
                  {[...MARQUEE_ROW2_SAAS, ...MARQUEE_ROW2_SAAS].map((item, i) => (
                    <span key={i} style={{ background: '#EAF5FF', border: '1px solid #BFDFFF', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#2B8FCC', whiteSpace: 'nowrap' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mb-9">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#4A5568]">
                <CheckCircle size={15} className="text-[#2B8FCC]" />
                50+ aplicatii livrate
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#4A5568]">
                <Clock size={15} className="text-[#2B8FCC]" />
                MVP in aprox. 14 zile
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                href="/oferta"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
              >
                Solicita oferta gratuita
              </Button>
              <Button
                size="lg"
                variant="outline"
                leftIcon={<Play size={16} className="text-[#2B8FCC]" />}
                onClick={() =>
                  document
                    .getElementById('demo-interactiv')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="border-[#2B8FCC] text-[#2B8FCC] hover:bg-[#EAF5FF]"
              >
                Vezi demo interactiv
              </Button>
            </div>
          </motion.div>

          {/* Right column - video */}
          <motion.div {...motionRightProps} className="relative">
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
              <ServiceVideo src="/imagini/servicii/aplicatie-web.mp4" loop={false} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
