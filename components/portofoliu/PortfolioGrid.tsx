'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';

export function PortfolioGrid(): React.ReactElement {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              priority={index < 6}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA below grid */}
      <div className="flex flex-col items-center gap-4 mt-20 md:mt-24">
        <p className="text-[15px] text-[#8A94A6]">Si inca 175+ de proiecte in portofoliul complet</p>
        <a
          href="/oferta"
          className="inline-flex items-center gap-2 bg-[#0D1117] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#1a2332] transition-colors"
        >
          Solicita un proiect similar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
        <p className="text-[13px] text-[#8A94A6] text-center">
          Ai vazut ceva care ti-a placut? Il construim adaptat afacerii tale.
        </p>
      </div>
    </div>
  );
}
