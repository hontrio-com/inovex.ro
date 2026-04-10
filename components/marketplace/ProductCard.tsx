'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { MarketplaceProduct } from '@/types/marketplace';
import { CATEGORY_LABELS } from '@/types/marketplace';
import ExclusivityBadge from './ExclusivityBadge';

interface Props {
  product: MarketplaceProduct;
  compact?: boolean;
}

const GRADIENT_BG: Record<string, string> = {
  'magazin-online':    'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 50%,#EFF6FF 100%)',
  'website-prezentare':'linear-gradient(135deg,#F0FDF4 0%,#D1FAE5 50%,#F0FDF4 100%)',
  'aplicatie-web':     'linear-gradient(135deg,#FFF7ED 0%,#FED7AA 50%,#FFF7ED 100%)',
};

export function ProductCard({ product, compact = false }: Props) {
  const [hovered,     setHovered]     = useState(false);
  const [demoHovered, setDemoHovered] = useState(false);

  const pills      = product.techSpecs.technologies.slice(0, 3);
  const extraPills = product.techSpecs.technologies.length - 3;
  const gradientBg = GRADIENT_BG[product.category] ?? 'linear-gradient(135deg,#F5F3FF 0%,#DDD6FE 50%,#F5F3FF 100%)';

  return (
    <Link href={`/marketplace/${product.slug}`} className="block" aria-label={product.title}>
      <Card
        className={`overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-280 ${
          hovered
            ? 'border-blue/35 shadow-xl -translate-y-1'
            : 'border-[#E8ECF0] shadow-sm translate-y-0'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Imagine */}
        <div className="relative shrink-0" style={{ aspectRatio: '16/10', overflow: 'hidden', background: '#F0F7FF' }}>
          {/* Placeholder gradient */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-400"
            style={{ background: gradientBg, transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
          >
            <div className="w-[70%] max-w-[280px]">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-5 bg-black/[0.04] flex items-center gap-1 px-2">
                  {['#FF5F57','#FFBD2E','#28CA41'].map((c) => (
                    <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="p-2.5 flex flex-col gap-1">
                  <div className="h-1.5 w-4/5 bg-gray-200 rounded-sm" />
                  <div className="h-1 w-3/5 bg-gray-100 rounded-sm" />
                  <div className="h-4 w-14 bg-[#2B8FCC] rounded mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Gradient overlay */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.07] pointer-events-none" />

          {/* Badge categorie */}
          <div className="absolute top-2.5 left-2.5">
            <Badge variant="blue" className="text-[10px] uppercase tracking-[0.05em] backdrop-blur-sm bg-white/95 border-white/80">
              {CATEGORY_LABELS[product.category]}
            </Badge>
          </div>

          {/* Badge dreapta sus */}
          <div className="absolute top-2.5 right-2.5">
            {product.isExclusive ? (
              <ExclusivityBadge isSold={product.isSold} size="sm" />
            ) : product.badge ? (
              <Badge className="text-[10px] uppercase tracking-[0.06em]">
                {product.badge}
              </Badge>
            ) : null}
          </div>

          {/* Overlay produs vândut */}
          {product.isSold && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/88 backdrop-blur-sm">
              <Lock size={26} className="text-[#8A94A6]" />
              <p className="font-bold text-sm text-[#4A5568] mt-2.5">Acest produs a fost vândut</p>
              <p className="text-xs text-[#8A94A6] mt-1">Nu mai este disponibil</p>
            </div>
          )}

          {/* Preview Live overlay */}
          {product.demoUrl && (
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-280 ${hovered ? 'bg-black/30 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}>
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setDemoHovered(true)}
                onMouseLeave={() => setDemoHovered(false)}
                className={`flex items-center gap-1.5 bg-white rounded-lg px-4 py-2 font-semibold text-[13px] text-[#0D1117] no-underline whitespace-nowrap shadow-lg transition-all duration-280 ${
                  hovered ? (demoHovered ? 'scale-[1.04]' : 'scale-100') + ' opacity-100' : 'scale-90 opacity-0'
                }`}
              >
                <ExternalLink size={14} />
                Preview Live
              </a>
            </div>
          )}
        </div>

        {/* Conținut */}
        <CardContent className="flex flex-col flex-1 p-5">
          {/* Platform pill */}
          <div className="mb-2">
            <Badge variant="blue" className="text-[10px] uppercase tracking-[0.05em]">
              {product.platform}
            </Badge>
          </div>

          <h3 className="font-bold text-[0.9375rem] text-[#0D1117] leading-[1.35] mb-1.5 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-[0.8125rem] text-[#4A5568] leading-[1.55] mb-3.5 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Pills tehnologii */}
          {!compact && (
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {pills.map((tech) => (
                <Badge key={tech} variant="gray" className="text-[11px]">
                  {tech}
                </Badge>
              ))}
              {extraPills > 0 && (
                <Badge variant="outline" className="text-[11px] text-[#9CA3AF]">
                  +{extraPills}
                </Badge>
              )}
            </div>
          )}

          <Separator className="mb-3.5 mt-auto" />

          {product.isSold ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] text-[#8A94A6] font-medium">Indisponibil</span>
              <Button href="/oferta" variant="secondary" size="sm" onClick={(e) => e.stopPropagation()}>
                Solicită similar
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span className="font-bold text-[1.2rem] text-[#0D1117]" style={{ fontFamily: 'var(--font-display)' }}>
                {product.price.toLocaleString('ro-RO')} EUR
              </span>
              <Button size="sm" rightIcon={<ArrowRight size={13} />}>
                Vezi detalii
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
