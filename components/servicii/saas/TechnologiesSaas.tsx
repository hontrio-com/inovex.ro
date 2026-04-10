'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const TECHNOLOGIES = [
  { name: 'Next.js',     category: 'Frontend',  logo: '/imagini/stack-icons/nextjs.svg',      darkBg: false },
  { name: 'React',       category: 'Frontend',  logo: '/imagini/stack-icons/react.svg',        darkBg: false },
  { name: 'TypeScript',  category: 'Frontend',  logo: '/imagini/stack-icons/typescript.svg',  darkBg: false },
  { name: 'Tailwind',    category: 'Frontend',  logo: '/imagini/stack-icons/tailwind-css.svg', darkBg: false },
  { name: 'Node.js',     category: 'Backend',   logo: '/imagini/stack-icons/nodejs.svg',       darkBg: false },
  { name: 'Python',      category: 'Backend',   logo: '/imagini/stack-icons/python.svg',       darkBg: false },
  { name: 'Supabase',    category: 'Backend',   logo: '/imagini/stack-icons/supabase.svg',     darkBg: true  },
  { name: 'Stripe',      category: 'Payments',  logo: '/imagini/stack-icons/stripe-4.svg',     darkBg: false },
];

export default function TechnologiesSaas() {
  return (
    <section className="py-[80px] bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="max-w-[600px] mx-auto text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 border-[#C8E6F8] text-[#2B8FCC]"
          >
            Stack tehnic
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
            Construit pentru{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>
              durabilitate
            </span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Folosim tehnologii mature, suportate pe termen lung si cu ecosisteme
            active. Nu experimente, ci solutii dovedite in productie.
          </p>
        </ScrollReveal>

        {/* Grid — 4 cols desktop, 4 tablet, 2 mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {TECHNOLOGIES.map((tech, idx) => (
            <ScrollReveal key={tech.name} delay={idx * 0.05}>
              <Card className="border border-[#E8ECF0] hover:border-[#C8E6F8] hover:shadow-sm transition-all duration-200 h-full">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      height: 36,
                      padding: tech.darkBg ? '4px 8px' : 0,
                      background: tech.darkBg ? '#1C1C1C' : 'transparent',
                    }}
                  >
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={80}
                      height={36}
                      style={{ height: 28, width: 'auto', maxWidth: 80, objectFit: 'contain' }}
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[13px] text-[#0D1117] leading-tight">{tech.name}</p>
                    <p className="text-[10px] text-[#8A94A6] uppercase tracking-wide font-medium mt-0.5">
                      {tech.category}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
