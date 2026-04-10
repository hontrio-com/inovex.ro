'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, ArrowRight, Store, Shield, Clock } from 'lucide-react';

export default function CTAMobile() {
  const scrollToDemo = () => {
    document.getElementById('demo-interactiv')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative py-[100px] overflow-hidden text-center bg-[#0D1117]"
    >

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge
          className="mb-6 inline-flex items-center gap-1.5 bg-white/[0.08] text-[#4AADE8] border border-white/[0.12]"
        >
          <Smartphone size={13} />
          Hai sa construim
        </Badge>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.9rem,3.2vw,2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.022em',
            color: 'white',
          }}
          className="mb-5"
        >
          Aplicatia ta mobila, publicata in{' '}
          <span style={{ fontStyle: 'italic' }}>60 de zile</span>
        </h2>

        <p
          style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.0625rem', lineHeight: 1.7 }}
          className="mb-10 max-w-xl mx-auto"
        >
          De la prima consultatie la aplicatia live in App Store si Google Play. Gestionam tot, tu te concentrezi pe afacere.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Button
            href="/oferta?serviciu=aplicatii-mobile"
            size="lg"
            rightIcon={<ArrowRight size={16} />}
            className="bg-white text-[#0D1117] hover:bg-white/90 font-semibold"
          >
            Solicita oferta gratuita
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToDemo}
            className="bg-transparent border-[rgba(255,255,255,0.30)] text-white hover:bg-white/10 hover:text-white hover:border-[rgba(255,255,255,0.50)] font-semibold"
          >
            Reexploreaza demo-ul
          </Button>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {[
            { Icon: Store, text: 'Publicare App Store & Google Play inclusa' },
            { Icon: Shield, text: 'Garantie 30 zile post-lansare' },
            { Icon: Clock, text: 'Consultatie gratuita in 24h' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.60)', fontSize: 13, fontWeight: 500 }}>
              <Icon size={15} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
