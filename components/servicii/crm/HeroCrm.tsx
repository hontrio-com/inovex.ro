'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceVideo from '@/components/sections/ServiceVideo';
import {
  Database,
  CheckCircle,
  Clock,
  Shield,
  ArrowRight,
  Play,
  ChevronRight,
} from 'lucide-react';

const RESOLVE_ITEMS = [
  'Foi Excel imprastiate',
  'Emailuri pierdute',
  'Date duplicate',
  'Rapoarte manuale',
  'Procese neautomatizate',
  'Vizibilitate zero',
];

export default function HeroCrm() {
  const shouldReduceMotion = useReducedMotion();

  const motionLeftProps = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } };

  const motionRightProps = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.2 } };

  const badgeMotionProps = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: 0.05 } };

  return (
    <section className="relative bg-white border-b border-[#E8ECF0] pt-[140px] pb-[100px] max-md:pt-20 max-md:pb-16 overflow-hidden">
      {/* Decorative blur circle top-right */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none -z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(43,143,204,0.04) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-12">
          <a href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Acasa</a>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <a href="/servicii" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Servicii</a>
          <ChevronRight size={14} className="text-[#8A94A6]" />
          <span className="text-[#0D1117] font-semibold">CMS, CRM &amp; ERP</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div {...motionLeftProps}>
            <motion.div {...badgeMotionProps}>
              <Badge className="mb-6 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
                <Database size={13} />
                CMS, CRM &amp; ERP
              </Badge>
            </motion.div>

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
              Software de management la cheie, construit{' '}
              <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>exact pe procesele tale</span>
            </h1>

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
              Daca afacerea ta merge pe foi Excel, emailuri imprastiate si note lipite, construim sistemul care pune ordine in tot. Clienti, comenzi, stoc, facturi si echipa - gestionate dintr-un singur loc, adaptat exact cum lucrezi tu deja.
            </p>

            {/* Rezolvam chips */}
            <div className="mb-9">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-3">
                Rezolvam:
              </p>
              <div className="flex flex-wrap gap-2">
                {RESOLVE_ITEMS.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
                  >
                    <Badge
                      variant="secondary"
                      className="cursor-default hover:bg-[#e2e8f0] transition-colors duration-150"
                    >
                      {t}
                    </Badge>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mb-9">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#4A5568]">
                <CheckCircle size={15} className="text-[#2B8FCC]" />
                100% adaptat proceselor tale
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#4A5568]">
                <Clock size={15} className="text-[#2B8FCC]" />
                Analiza gratuita a proceselor
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#4A5568]">
                <Shield size={15} className="text-[#2B8FCC]" />
                Training complet inclus
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Button href="/oferta" size="lg" rightIcon={<ArrowRight size={16} />}>
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
                Vezi demo CRM interactiv
              </Button>
            </div>
          </motion.div>

          {/* Right column - video + floating cards */}
          <motion.div {...motionRightProps} className="relative">
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                aspectRatio: '16/10',
                background: '#F4F6F8',
                boxShadow: '0 24px 64px rgba(0,0,0,0.12),0 8px 24px rgba(0,0,0,0.08),inset 0 0 0 1px rgba(0,0,0,0.06)',
              }}
            >
              <ServiceVideo src="/imagini/servicii/crm-cms-erp.mp4" loop={false} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
