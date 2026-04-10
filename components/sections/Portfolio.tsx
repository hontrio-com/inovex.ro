'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink, LockKeyhole } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { PortfolioItem } from '@/lib/site-data';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  niche: string;
  description: string;
  screenshot: string;
  imgWidth: number;
  imgHeight: number;
  liveUrl: string;
  technologies: string[];
  slug: string;
}

const PROJECTS: PortfolioProject[] = [
  {
    id: '1', title: 'DsMotor.ro', category: 'magazin-online', categoryLabel: 'Magazin Online',
    niche: 'Piese Auto', description: 'Magazin online modern pentru piese și utilaje agricole, optimizat pentru conversii și navigare rapidă între categorii.',
    screenshot: '/imagini/hero/DSMOTOR.RO.png', imgWidth: 1424, imgHeight: 2560,
    liveUrl: 'https://dsmotor.ro', technologies: ['WordPress', 'WooCommerce'], slug: 'dsmotor-ro',
  },
  {
    id: '2', title: 'Profesorul de AI', category: 'website-prezentare', categoryLabel: 'Website de Prezentare',
    niche: 'Cursuri', description: 'Website de prezentare pentru un brand educațional axat pe cursuri de creare videoclipuri cu inteligență artificială.',
    screenshot: '/imagini/hero/PROFESORULDEAI.RO.png', imgWidth: 1424, imgHeight: 2560,
    liveUrl: 'https://profesoruldeai.ro', technologies: ['Node.js'], slug: 'profesoruldeai-ro',
  },
  {
    id: '3', title: 'CutiadeMagie.ro', category: 'magazin-online', categoryLabel: 'Magazin Online',
    niche: 'Accesorii Personalizare', description: 'Magazin online cu design elegant și feminin, dedicat produselor pentru creații handmade și cadouri personalizate.',
    screenshot: '/imagini/hero/CUTIADEMAGIE.RO.jpg', imgWidth: 1424, imgHeight: 2560,
    liveUrl: 'https://cutiademagie.ro', technologies: ['WordPress', 'WooCommerce'], slug: 'cutiademagie-ro',
  },
  {
    id: '4', title: 'Hontrio.com', category: 'aplicatii-web', categoryLabel: 'SaaS',
    niche: 'Platformă Automatizări', description: 'Platformă SaaS bazată pe AI, dedicată automatizării și optimizării produselor din magazinele online.',
    screenshot: '/imagini/hero/HONTRIO.COM.png', imgWidth: 1424, imgHeight: 2560,
    liveUrl: 'https://hontrio.com', technologies: ['Next.js'], slug: 'hontrio-com',
  },
];

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export type { PortfolioProject };

export function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const domain = (() => {
    try { return new URL(project.liveUrl).hostname.replace('www.', ''); }
    catch { return project.liveUrl; }
  })();

  const visibleTechs   = project.technologies.slice(0, 3);
  const remainingCount = project.technologies.length - 3;

  const handleLive = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index < 6 ? index * 0.07 : 0, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleLive}
      aria-label={`Proiect: ${project.title}`}
      style={{
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <Card className={`overflow-hidden border transition-all duration-300 ${hovered ? 'border-blue/30 shadow-xl' : 'border-[#E8ECF0] shadow-sm'}`}>
        {/* Browser mockup */}
        <div className="relative bg-[#F4F6F8] border-b border-[#E8ECF0]">
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Chrome */}
            <div className="h-8 bg-white border-b border-[#F0F0F0] flex items-center px-3 gap-2 shrink-0 relative z-[2]">
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#28CA41]" />
              </div>
              <div className="flex-1 h-[18px] bg-[#F4F6F8] rounded mx-2 flex items-center justify-center gap-1 px-2">
                <LockKeyhole size={9} className="text-[#8A94A6]" />
                <span className="font-medium text-[10px] text-[#4A5568] truncate max-w-[120px]">{domain}</span>
              </div>
              <button onClick={handleLive} aria-label="Vizitează site-ul live" className="bg-none border-none cursor-pointer p-0.5 flex items-center">
                <ExternalLink size={12} className={`transition-colors ${hovered ? 'text-[#2B8FCC]' : 'text-[#C0C8D4]'}`} />
              </button>
            </div>

            {/* Screenshot */}
            <div className="flex-1 overflow-hidden relative bg-[#F8FAFB]">
              <Image
                src={project.screenshot}
                alt={`Screenshot ${project.title}`}
                width={project.imgWidth}
                height={project.imgHeight}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImWNgYGD4z8DAwMDIyMjwn4GBQY6BgeE/AwMDA8P/////BwYGBgYGBob/DAwMAFarCdFVGCVxAAAAAElFTkSuQmCC"
              />
              {/* Hover overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'bg-[#0D1117]/40 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}>
                <div className={`inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 font-semibold text-[13px] text-[#0D1117] shadow-lg transition-all duration-280 ${hovered ? 'scale-100 opacity-100' : 'scale-85 opacity-0'}`}>
                  <ExternalLink size={14} />
                  Vizualizează live
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden className="absolute inset-0 border border-black/[0.06] pointer-events-none z-[3] rounded-none" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-center">
            <Badge variant="blue" className="text-[10px] uppercase tracking-[0.06em] rounded">
              {project.categoryLabel}
            </Badge>
            <span className="text-[11px] text-[#8A94A6] italic">{project.niche}</span>
          </div>

          <p className="font-bold text-base text-[#0D1117] mt-2.5 truncate">{project.title}</p>

          <p className="text-[13px] text-[#4A5568] leading-relaxed mt-1 line-clamp-2">{project.description}</p>

          <div className="h-px bg-[#F4F6F8] my-3.5" />

          <div className="flex gap-1.5 flex-nowrap overflow-hidden">
            {visibleTechs.map((tech) => (
              <Badge key={tech} variant="gray" className="text-[11px] rounded">
                {tech}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="outline" className="text-[11px] rounded text-[#8A94A6]">
                +{remainingCount}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export function Portfolio({ proiecte: _proiecte }: { proiecte?: PortfolioItem[] } = {}) {
  const reduce = useReducedMotion() ?? false;

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
              Proiecte care <em className="italic">vorbesc</em> de la sine
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
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
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
