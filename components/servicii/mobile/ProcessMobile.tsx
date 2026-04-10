'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Layers,
  Code2,
  TestTube2,
  Upload,
  Headphones,
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery & Cercetare',
    description: 'Analizam nisa, concurenta din store-uri si comportamentul utilizatorilor. Definim functionalitatile pentru MVP inainte de orice design.',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Design & Prototip',
    description: 'Wireframes si design complet in Figma pentru ambele platforme. Prototip interactiv pentru testare UX inainte de dezvoltare.',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Dezvoltare Sprint',
    description: 'Sprints de 2 saptamani cu build distribuibil la finalul fiecaruia. Testezi pe dispozitiv real prin TestFlight (iOS) si Play Store internal.',
  },
  {
    num: '04',
    icon: TestTube2,
    title: 'Testare pe Dispozitive',
    description: 'Testare pe minim 5 modele iOS si 5 modele Android. Raport complet de QA, performanta si accesibilitate.',
  },
  {
    num: '05',
    icon: Upload,
    title: 'Publicare in Store-uri',
    description: 'Submittem in App Store si Google Play cu toate materialele necesare: screenshots, descriere optimizata ASO, categorii si rating content.',
  },
  {
    num: '06',
    icon: Headphones,
    title: 'Suport Post-Lansare',
    description: '30 zile suport inclus. Monitorizam recenziile, crash reports si performanta. Actualizari rapide la orice problema post-lansare.',
  },
];

export default function ProcessMobile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="py-[100px] bg-[#F8FAFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={sectionRef}>
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Cum lucram
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
            className="mb-4"
          >
            De la idee la aplicatia{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>in buzunarul clientilor tai</span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Un proces riguros, de la prima discutie pana la publicare in store-uri.
          </p>
        </div>

        {/* Desktop: 6-col grid with connecting line */}
        <div className="hidden lg:block relative">
          {/* Connecting SVG line */}
          <svg
            className="absolute top-[28px] left-0 w-full h-[2px] pointer-events-none"
            height="2"
            style={{ zIndex: 0 }}
          >
            <line
              x1="8.33%"
              y1="1"
              x2="91.67%"
              y2="1"
              stroke="rgba(43,143,204,0.3)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={isInView ? 0 : 1000}
              style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
            />
          </svg>

          <div className="grid grid-cols-6 gap-4 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-[#2B8FCC]/30 flex items-center justify-center relative z-10 shadow-sm">
                      <Icon size={22} className="text-[#2B8FCC]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#2B8FCC] tracking-widest uppercase mb-1 block">
                      {step.num}
                    </span>
                    <h3
                      className="text-[13px] font-semibold text-[#0D1117] mb-2 leading-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stacked */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;
            return (
              <div key={step.num} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#2B8FCC]/30 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon size={16} className="text-[#2B8FCC]" />
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-[rgba(43,143,204,0.20)] my-1" />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <Badge variant="outline" className="mb-2 border-[#2B8FCC]/30 text-[#2B8FCC] text-[10px]">
                    Pasul {step.num}
                  </Badge>
                  <Card className="bg-white border-[#E8ECF0] mt-2">
                    <CardContent className="p-4">
                      <h3
                        className="text-sm font-semibold text-[#0D1117] mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-[#6B7280] leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
