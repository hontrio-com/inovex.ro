'use client';

import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/portofoliu/ProjectCard';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import type { PortfolioItem } from '@/lib/site-data';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function Portfolio({ proiecte: _proiecte }: { proiecte?: PortfolioItem[] } = {}) {
  const reduce = useReducedMotion() ?? false;

  const displayProjects = PORTFOLIO_PROJECTS.slice(0, 4);

  return (
    <section
      aria-labelledby="portofoliu-titlu"
      className="bg-white"
      style={{ paddingTop: 'clamp(80px,10vw,120px)', paddingBottom: 'clamp(80px,10vw,120px)' }}
    >
      <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,80px)]">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8 mb-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-px bg-[#2B8FCC]" />
              <span className="font-semibold text-[0.6875rem] uppercase tracking-[0.10em] text-[#2B8FCC]">Portofoliu</span>
            </div>
            <h2 id="portofoliu-titlu" className="font-extrabold text-[#0D1117] m-0" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.027em' }}>
              Proiecte care vorbesc de la sine
            </h2>
            <p className="text-[1.0625rem] leading-[1.7] text-[#4A5568] mt-3.5 max-w-[480px]">
              O parte din proiectele realizate de echipa noastră. Fiecare cu obiectivul lui, fiecare livrat la termen.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="hidden md:block"
          >
            <Button href="/portofoliu" variant="ghost" rightIcon={<ArrowRight size={16} />} className="text-[#0D1117] hover:text-[#2B8FCC] whitespace-nowrap">
              Vezi mai multe proiecte
            </Button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} priority={i < 2} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-14 flex flex-col items-center"
        >
          <Button href="/portofoliu" size="lg" rightIcon={<ArrowRight size={16} />} className="bg-[#0D1117] hover:bg-[#1a2030]">
            Vezi mai multe proiecte
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
