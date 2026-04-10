'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Map, Code2, GraduationCap, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Audit procese',
    description:
      'Identificam sarcinile repetitive cu cel mai mare potential de automatizare. Analizam volumele, timpii si costurile actuale pentru a prioritiza ce aduce ROI maxim.',
  },
  {
    num: '02',
    icon: Map,
    title: 'Design workflow',
    description:
      'Proiectam fluxul de automatizare complet: trigger-e, logica AI, actiuni si gestionarea erorilor. Primesti o diagrama clara inainte sa scriem un rand de cod.',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Implementare si Testare',
    description:
      'Construim si testam automatizarea pe date reale din afacerea ta. Iteram pana cand acuratetea si viteza sunt la standardul agreat.',
  },
  {
    num: '04',
    icon: GraduationCap,
    title: 'Training echipa',
    description:
      'Prezentam sistemul echipei tale, explicam cum sa monitorizeze executiile si cum sa intervina cand e cazul. Documentatie completa inclusa.',
  },
  {
    num: '05',
    icon: TrendingUp,
    title: 'Monitorizare si Optimizare',
    description:
      'Urmarim performanta automatizarii in primele saptamani si optimizam pe baza datelor reale. Sistemul devine mai bun in timp, nu mai rau.',
  },
];

export default function ProcessAi() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="py-[100px] bg-[#F8FAFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={sectionRef}>
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <Badge className="mb-5 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Cum lucram
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
              marginBottom: 16,
            }}
          >
            De la audit la automatizare functionala{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>in 4 saptamani</span>
          </h2>
          <p style={{ color: '#4A5568', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Fiecare implementare urmeaza acelasi proces structurat, de la prima discutie pana la automatizarea activa in productie.
          </p>
        </div>

        {/* Desktop: 5 column grid */}
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
              stroke="rgba(43,143,204,0.25)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={isInView ? 0 : 1000}
              style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
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
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: 'white',
                        border: '2px solid rgba(43,143,204,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(43,143,204,0.12)',
                      }}
                    >
                      <Icon size={22} color="#2B8FCC" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#2B8FCC',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: 4,
                      }}
                    >
                      {step.num}
                    </span>
                    <h3
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#0D1117',
                        marginBottom: 8,
                        lineHeight: 1.3,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 11, color: '#4A5568', lineHeight: 1.65 }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;
            return (
              <div key={step.num} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'white',
                      border: '2px solid rgba(43,143,204,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color="#2B8FCC" />
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        background: 'rgba(43,143,204,0.20)',
                        margin: '4px 0',
                      }}
                    />
                  )}
                </div>

                <div className="pb-8 flex-1">
                  <Badge className="mb-2 bg-[#EAF5FF] text-[#2B8FCC] border-[#C8E6F8] text-[10px]">
                    Pasul {step.num}
                  </Badge>
                  <Card className="bg-white border-[#E8ECF0] mt-2">
                    <CardContent className="p-4">
                      <h3
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#0D1117',
                          marginBottom: 6,
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>
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
