'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileCode, GraduationCap, Clock } from 'lucide-react';

export default function CTACrm() {
  return (
    <section className="bg-[#0D1117] py-[100px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="mb-6 inline-flex items-center gap-1.5 bg-white/[0.08] text-[#4AADE8] border border-white/[0.12]">
          Hai sa incepem
        </Badge>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.9rem,3.2vw,2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.022em',
            color: '#FFFFFF',
          }}
          className="mb-5"
        >
          Construim sistemul care{' '}
          <span style={{ fontStyle: 'italic', color: '#4AADE8' }}>organizeaza tot</span>
          {' '}in afacerea ta
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 560,
            margin: '0 auto 40px',
          }}
        >
          O analiza gratuita a proceselor tale, fara angajamente. Iti spunem sincer daca un sistem custom aduce valoare si cum ar arata solutia potrivita.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            href="/oferta?serviciu=cms-crm-erp"
            size="lg"
            className="bg-white text-[#0D1117] hover:bg-white/90 font-semibold"
            rightIcon={<ArrowRight size={16} />}
          >
            Solicita oferta gratuita
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-[rgba(255,255,255,0.30)] text-white hover:bg-white/10 hover:text-white hover:border-[rgba(255,255,255,0.50)]"
            onClick={() =>
              document
                .getElementById('demo-interactiv')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Vezi demo interactiv
          </Button>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-[13px] font-medium text-[rgba(255,255,255,0.55)]">
            <FileCode size={15} className="text-[#4AADE8]" />
            Dezvoltare 100% custom
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-[rgba(255,255,255,0.55)]">
            <GraduationCap size={15} className="text-[#4AADE8]" />
            Training complet inclus
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-[rgba(255,255,255,0.55)]">
            <Clock size={15} className="text-[#4AADE8]" />
            Analiza gratuita a proceselor
          </div>
        </div>
      </div>
    </section>
  );
}
