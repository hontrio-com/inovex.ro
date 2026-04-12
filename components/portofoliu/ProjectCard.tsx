'use client';

import { Check, ExternalLink, LockKeyhole, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { PortfolioProject } from '@/lib/portfolio-data';

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  priority?: boolean;
}

const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBAUREiExBkH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmWu5Vl2dI7Y5JsGNx4OPIbxNZGGN0jfRaVfWyM/LDiP+0p3r1alYq1IKtaFkMELAyONgwGtA8AAf/9k=';

export function ProjectCard({ project, index, priority = false }: ProjectCardProps): React.ReactElement {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
      className="block rounded-2xl overflow-hidden border border-[#E8ECF0] bg-white cursor-pointer"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      {/* BROWSER CHROME AREA */}
      <div className="flex items-center h-7 md:h-8 bg-[#F4F6F8] border-b border-[#F0F0F0] px-2.5 gap-1.5">
        {/* Dots */}
        <div className="flex gap-1 shrink-0">
          <div className="w-[7px] h-[7px] md:w-2 md:h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-[7px] h-[7px] md:w-2 md:h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-[7px] h-[7px] md:w-2 md:h-2 rounded-full bg-[#28CA41]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 mx-1.5 h-[16px] md:h-[18px] bg-white rounded flex items-center gap-1 px-2 overflow-hidden">
          <LockKeyhole size={8} className="text-[#8A94A6] shrink-0" />
          <span className="text-[9px] md:text-[10px] text-[#4A5568] whitespace-nowrap overflow-hidden text-ellipsis">
            {project.urlDisplay}
          </span>
        </div>
        <ExternalLink size={11} className="text-[#C0C8D4] shrink-0" />
      </div>

      {/* SCREENSHOT AREA */}
      <div className="relative bg-[#F8FAFB] overflow-hidden group">
        <Image
          src={project.image}
          alt={`Screenshot ${project.title}`}
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          quality={90}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />

        {/* Bottom gradient overlay - always visible */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.04))' }}
        />

        {/* Hover overlay - HIDDEN on mobile */}
        <div
          className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(13,17,23,0.45)' }}
          onClick={(e) => {
            e.preventDefault();
            window.open(project.url, '_blank');
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.16)' }}
          >
            <ExternalLink size={14} className="text-[#0D1117]" />
            <span className="text-[13px] font-semibold text-[#0D1117]">Viziteaza site-ul</span>
          </motion.div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="px-4 pt-3.5 pb-4 md:px-5 md:pt-4 md:pb-5">
        {/* Row 1: Category badge + URL */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.05em] px-2 py-0.5 rounded bg-[#EAF5FF] text-[#2B8FCC]">
            {project.categoryLabel}
          </span>
          <span className="text-[10px] md:text-[11px] text-[#8A94A6] truncate max-w-[120px]">
            {project.urlDisplay}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[0.9375rem] md:text-[1rem] font-bold text-[#0D1117] leading-tight truncate mb-1">
          {project.title}
        </h3>

        {/* Description - 2 lines clamp */}
        <p
          className="text-[0.75rem] md:text-[0.8125rem] text-[#4A5568] leading-relaxed mb-2.5"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Separator */}
        <div className="h-px bg-[#F4F6F8] mb-2.5" />

        {/* Features */}
        <div className="flex flex-col gap-1 mb-2.5">
          {project.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <Check size={11} className="text-[#2B8FCC] shrink-0" />
              <span className="text-[11px] md:text-[12px] font-medium text-[#4A5568] leading-tight">{f}</span>
            </div>
          ))}
        </div>

        {/* Footer: Detalii link */}
        <div className="flex justify-end">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] md:text-[12px] font-semibold text-[#8A94A6] hover:text-[#2B8FCC] transition-colors duration-150"
          >
            Vezi live <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </motion.a>
  );
}
