'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Map,
  Layers,
  Code2,
  TestTube2,
  GraduationCap,
  Headphones,
} from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    nr: '01',
    title: 'Analiza proceselor',
    desc: 'Intelegem cum lucrezi acum - ce merge, ce nu merge, unde pierzi timp si bani.',
  },
  {
    icon: Map,
    nr: '02',
    title: 'Arhitectura solutiei',
    desc: 'Proiectam structura sistemului: module, fluxuri, integrari si scalabilitate.',
  },
  {
    icon: Layers,
    nr: '03',
    title: 'Design UX/UI',
    desc: 'Cream interfata adaptata echipei tale: simpla, intuitiva si eficienta.',
  },
  {
    icon: Code2,
    nr: '04',
    title: 'Dezvoltare',
    desc: 'Construim sistemul incremental, cu demonstratii regulate si feedback rapid.',
  },
  {
    icon: TestTube2,
    nr: '05',
    title: 'Testare & migrare',
    desc: 'Testam exhaustiv si migram datele existente fara pierderi sau intreruperi.',
  },
  {
    icon: GraduationCap,
    nr: '06',
    title: 'Training echipa',
    desc: 'Sesiuni de training personalizate pe roluri, cu documentatie si video-tutoriale.',
  },
  {
    icon: Headphones,
    nr: '07',
    title: 'Suport continuu',
    desc: 'Suport tehnic inclus 12 luni, actualizari si imbunatatiri pe baza feedback-ului tau.',
  },
];

export default function ProcessCrm() {
  return (
    <section className="bg-white py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 max-w-[600px] mx-auto">
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
          >
            Procesul nostru in{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>7 pasi clari</span>
          </h2>
        </div>

        {/* Desktop: 7 columns */}
        <div className="hidden lg:block">
          {/* Icons row with connecting line */}
          <div className="relative flex justify-between items-center mb-6 px-8">
            {/* SVG line */}
            <svg
              className="absolute top-5 left-[8.5%] right-[8.5%] w-[83%] h-0.5"
              style={{ top: '20px' }}
            >
              <line x1="0" y1="0" x2="100%" y2="0" stroke="#E8ECF0" strokeWidth="2" strokeDasharray="6 4" />
            </svg>

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.nr} className="flex flex-col items-center z-[1]">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border-2 border-[#E8ECF0] mb-2"
                    style={{
                      background: i === 0 ? '#EAF5FF' : undefined,
                      borderColor: i === 0 ? '#2B8FCC' : undefined,
                    }}
                  >
                    <Icon size={18} className={i === 0 ? 'text-[#2B8FCC]' : 'text-[#4A5568]'} />
                  </div>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: '#8A94A6' }}
                  >
                    {step.nr}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-7 gap-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.nr} className="border border-[#E8ECF0]">
                  <CardContent className="p-3">
                    <p
                      className="text-[12px] font-bold text-[#0D1117] mb-1.5 leading-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.title}
                    </p>
                    <p className="text-[10.5px] text-[#4A5568] leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-5 top-0 bottom-0 w-[1.5px] bg-[#E8ECF0]" />
          <div className="space-y-6 pl-14">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.nr} className="relative">
                  {/* Icon dot */}
                  <div
                    className="absolute -left-9 w-8 h-8 rounded-xl flex items-center justify-center bg-white border-2 border-[#E8ECF0]"
                    style={{ zIndex: 1 }}
                  >
                    <Icon size={15} className="text-[#4A5568]" />
                  </div>

                  <Card className="border border-[#E8ECF0]">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-[#8A94A6]">{step.nr}</span>
                        <h3
                          className="text-[13px] font-bold text-[#0D1117]"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-[12px] text-[#4A5568] leading-relaxed">{step.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
