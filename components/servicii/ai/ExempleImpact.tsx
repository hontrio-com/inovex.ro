'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Home,
  Calculator,
  Package,
  TrendingDown,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Zap,
  Star,
} from 'lucide-react';

const EXAMPLES = [
  {
    icon: Home,
    iconBg: '#EAF5FF',
    iconColor: '#2B8FCC',
    badgeLabel: 'Imobiliare',
    badgeBg: '#EAF5FF',
    badgeColor: '#2B8FCC',
    situation:
      'Agentie imobiliara cu 8 agenti primea zilnic 80-120 emailuri cu cereri de oferte. Echipa petrecea 4-6 ore pe zi doar citind, clasificand si raspunzand manual.',
    solution:
      'Am implementat un agent AI care citeste emailurile, extrage parametrii cautarii, califica lead-ul si trimite un raspuns personalizat cu ofertele potrivite in mai putin de un minut.',
    results: [
      { icon: TrendingDown, text: '4-6h raspuns -> 45 secunde' },
      { icon: Users, text: 'Cei 2 angajati relocati pe vanzari directe' },
      { icon: TrendingUp, text: '+67% lead-uri calificate lunar' },
    ],
  },
  {
    icon: Calculator,
    iconBg: '#F3F0FF',
    iconColor: '#8B5CF6',
    badgeLabel: 'Contabilitate',
    badgeBg: '#F3F0FF',
    badgeColor: '#8B5CF6',
    situation:
      'Firma de contabilitate cu 12 angajati verifica manual 400-600 facturi pe luna. Procesul dura 3 zile intregi si implica introducere manuala in sistemul contabil cu risc ridicat de erori.',
    solution:
      'Am construit un pipeline OCR + AI care extrage datele din facturi, le valideaza si le inregistreaza automat in sistem. Exceptiile sunt trimise spre verificare umana.',
    results: [
      { icon: Clock, text: '3 zile/luna -> 2 ore verificare' },
      { icon: Shield, text: 'Zero facturi pierdute sau introduse gresit' },
      { icon: TrendingDown, text: 'Economie echivalenta 0.5 FTE' },
    ],
  },
  {
    icon: Package,
    iconBg: '#ECFDF5',
    iconColor: '#10B981',
    badgeLabel: 'Distributie',
    badgeBg: '#ECFDF5',
    badgeColor: '#10B981',
    situation:
      'Companie de distributie cu 200+ clienti activi. Comenzile veneau pe email, WhatsApp si telefon. Procesarea manuala dura 1-2 ore per comanda si genera frecvent erori de preluare.',
    solution:
      'Am automatizat receptia comenzilor din toate canalele: AI extrage produsele, cantitatile si datele clientului, verifica stocul si creeaza comanda in ERP in cateva secunde.',
    results: [
      { icon: Zap, text: 'Procesare comanda: 2h -> instant' },
      { icon: TrendingUp, text: '+40% capacitate comenzi fara personal suplimentar' },
      { icon: Star, text: 'Satisfactie clienti: 6.2 -> 8.9 din 10' },
    ],
  },
];

export default function ExempleImpact() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="bg-white py-[100px]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <Badge className="mb-5 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Rezultate reale
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
            Ce s-a schimbat concret{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>pentru clientii nostri</span>
          </h2>
          <p style={{ color: '#4A5568', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Exemple din implementari reale. Fara exagerari, fara estimari optimiste.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {EXAMPLES.map((ex, idx) => {
            const Icon = ex.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
              >
                <Card className="h-full border-[#E8ECF0]">
                  <CardContent style={{ padding: 28 }}>
                    {/* Badge + Icon row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          background: ex.badgeBg,
                          color: ex.badgeColor,
                          borderRadius: 20,
                          padding: '3px 10px',
                        }}
                      >
                        {ex.badgeLabel}
                      </span>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: ex.iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={22} color={ex.iconColor} />
                      </div>
                    </div>

                    {/* Situation */}
                    <div style={{ marginBottom: 14 }}>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#8A94A6',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          marginBottom: 6,
                        }}
                      >
                        Situatie:
                      </p>
                      <p style={{ fontSize: 13.5, color: '#4A5568', lineHeight: 1.6 }}>
                        {ex.situation}
                      </p>
                    </div>

                    {/* Solution */}
                    <div style={{ marginBottom: 18 }}>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#8A94A6',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          marginBottom: 6,
                        }}
                      >
                        Solutie:
                      </p>
                      <p style={{ fontSize: 13.5, color: '#4A5568', lineHeight: 1.6 }}>
                        {ex.solution}
                      </p>
                    </div>

                    {/* Results box */}
                    <div
                      style={{
                        background: 'rgba(16,185,129,0.04)',
                        border: '1px solid #D1FAE5',
                        borderRadius: 10,
                        padding: 16,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#065F46',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          marginBottom: 10,
                        }}
                      >
                        Rezultate
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {ex.results.map((r, ri) => {
                          const RIcon = r.icon;
                          return (
                            <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <RIcon size={14} color="#10B981" style={{ flexShrink: 0 }} />
                              <span style={{ fontSize: 13, fontWeight: 500, color: '#047857' }}>
                                {r.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
