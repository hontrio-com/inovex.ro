'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Play, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function CTASaas() {
  return (
    <section className="bg-[#0D1117] py-[100px] text-center relative overflow-hidden">
      {/* Decorative radial gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(43,143,204,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Badge
          variant="outline"
          className="mb-6 inline-flex items-center gap-1.5 border-[rgba(43,143,204,0.30)] text-[#4AADE8] bg-transparent"
        >
          <Sparkles size={12} />
          Hai sa construim ceva
        </Badge>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.8rem,3vw,2.8rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.022em',
            color: 'white',
          }}
          className="mb-5"
        >
          Ai o idee de aplicatie? Sa o transformam in{' '}
          <span style={{ fontStyle: 'italic', color: '#4AADE8' }}>
            produs real
          </span>
          .
        </h2>

        <p className="text-[rgba(255,255,255,0.60)] text-[0.9375rem] leading-relaxed max-w-[500px] mx-auto mb-10">
          Prima discutie este gratuita si fara niciun angajament. Iti spunem
          sincer daca si cum putem construi ce ai in minte.
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          <Button
            href="/oferta?serviciu=aplicatii-web-saas"
            size="lg"
            rightIcon={<ArrowRight size={16} />}
            className="bg-white text-[#0D1117] hover:opacity-90"
          >
            Solicita consultatie gratuita
          </Button>
          <Button
            size="lg"
            variant="outline"
            leftIcon={<Play size={16} />}
            onClick={() =>
              document
                .getElementById('demo-interactiv')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-transparent border-[rgba(255,255,255,0.30)] text-white hover:bg-white/10 hover:text-white hover:border-[rgba(255,255,255,0.50)]"
          >
            Reincarca demo-ul
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center flex-wrap gap-8 mt-10">
          <span className="flex items-center gap-2 text-[13px] font-medium text-[rgba(255,255,255,0.40)]">
            <ShieldCheck size={14} />
            Cod sursa predat integral
          </span>
          <span className="flex items-center gap-2 text-[13px] font-medium text-[rgba(255,255,255,0.40)]">
            <Clock size={14} />
            Raspuns in 24 de ore
          </span>
          <span className="flex items-center gap-2 text-[13px] font-medium text-[rgba(255,255,255,0.40)]">
            <CheckCircle size={14} />
            Fara angajamente la prima discutie
          </span>
        </div>
      </div>
    </section>
  );
}
