'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const STATS = [
  { to: 200, suffix: '+', label: 'Proiecte Livrate' },
  { to: 7, suffix: '+', label: 'Ani Experiență' },
  { to: 98, suffix: '%', label: 'Clienți Mulțumiți' },
  { to: 24, suffix: 'h', label: 'Timp Răspuns' },
];

const TECHNOLOGIES = [
  'WordPress', 'Shopify', 'WooCommerce', 'Webflow',
  'React', 'Next.js', 'Laravel', 'Node.js', 'React Native', 'Flutter',
];

export function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100 py-12" aria-label="Statistici și tehnologii">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
              <div
                className="text-4xl lg:text-5xl font-bold text-gray-950 mb-1 tabular-nums"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <AnimatedCounter to={stat.to} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </ScrollReveal>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-100 mb-10" />

        {/* Tehnologii */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="flex-shrink-0 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em] whitespace-nowrap">
              Lucrăm cu
            </span>
            <div className="hidden sm:flex flex-wrap items-center gap-x-8 gap-y-2">
              {TECHNOLOGIES.map((tech) => (
                <span
                  key={tech}
                  className="text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="sm:hidden overflow-hidden w-full">
              <div className="flex gap-8 animate-marquee whitespace-nowrap">
                {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
                  <span key={`${tech}-${i}`} className="text-[13px] font-medium text-gray-400">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
