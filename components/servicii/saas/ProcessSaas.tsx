'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  FileText,
  Code2,
  TestTube2,
  Rocket,
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Analiza',
    description:
      'Intelegem produsul, publicul tinta, competitorii si fluxurile de lucru. Definim exact ce construim inainte sa scriem un rand de cod.',
  },
  {
    num: '02',
    icon: FileText,
    title: 'Arhitectura & Propunere',
    description:
      'Primesti un document tehnic complet: stack ales, arhitectura, timeline per milestone si tot ce este inclus in proiect.',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Dezvoltare',
    description:
      'Sprints de 2 saptamani cu demo la finalul fiecaruia. Ai acces permanent la mediul de staging pe toata durata proiectului.',
  },
  {
    num: '04',
    icon: TestTube2,
    title: 'Testare & QA',
    description:
      'Testare completa: unit tests, integration tests, load testing. Zero bug-uri critice la lansare.',
  },
  {
    num: '05',
    icon: Rocket,
    title: 'Lansare & Suport',
    description:
      'Deployment in productie, monitoring activat, documentatie predata. Suport 30 zile post-lansare inclus.',
  },
];

export default function ProcessSaas() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="py-[100px] bg-[#0D1117] relative overflow-hidden">
      {/* Subtle radial gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(43,143,204,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={sectionRef}>
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <Badge
            className="mb-4 inline-flex items-center gap-1.5 border-[rgba(43,143,204,0.4)] text-[#4AADE8] bg-transparent"
            variant="outline"
          >
            Cum lucram
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'white',
            }}
            className="mb-4"
          >
            Procesul nostru{' '}
            <span style={{ fontStyle: 'italic', color: '#4AADE8' }}>
              in 5 pasi
            </span>
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] text-[0.9375rem] leading-relaxed">
            Fiecare proiect urmeaza acelasi proces riguros, de la prima discutie
            pana la lansare si suport.
          </p>
        </div>

        {/* Desktop: 6 column grid */}
        <div className="hidden lg:block relative">
          {/* Connecting SVG line */}
          <svg
            className="absolute top-[28px] left-0 w-full h-[2px] pointer-events-none"
            height="2"
            style={{ zIndex: 0 }}
          >
            <line
              ref={lineRef}
              x1="8.33%"
              y1="1"
              x2="91.67%"
              y2="1"
              stroke="rgba(43,143,204,0.3)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={isInView ? 0 : 1000}
              style={{
                transition: 'stroke-dashoffset 1.5s ease-out',
              }}
            />
          </svg>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Icon circle */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#161B22] border-2 border-[#2B8FCC]/40 flex items-center justify-center relative z-10">
                      <Icon size={22} className="text-[#4AADE8]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#2B8FCC] tracking-widest uppercase mb-1 block">
                      {step.num}
                    </span>
                    <h3
                      className="text-[13px] font-semibold text-white mb-2 leading-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-[rgba(255,255,255,0.45)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stacked with left border */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;
            return (
              <div key={step.num} className="flex gap-4 relative">
                {/* Left line + icon */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#161B22] border-2 border-[#2B8FCC]/40 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#4AADE8]" />
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-[rgba(43,143,204,0.20)] my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 flex-1">
                  <Badge
                    variant="outline"
                    className="mb-2 border-[rgba(43,143,204,0.3)] text-[#4AADE8] text-[10px]"
                  >
                    Pasul {step.num}
                  </Badge>
                  <Card className="bg-[#161B22] border-[rgba(255,255,255,0.06)] mt-2">
                    <CardContent className="p-4">
                      <h3
                        className="text-sm font-semibold text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-[rgba(255,255,255,0.50)] leading-relaxed">
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
