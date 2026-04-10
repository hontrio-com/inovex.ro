'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Clock, Shield, CheckCircle } from 'lucide-react';

export default function CTAAi() {
  const shouldReduceMotion = useReducedMotion();

  const makeMotion = (i: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: i * 0.08 },
        };

  return (
    <section
      style={{
        background: '#0D1117',
        padding: '100px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative: radial gradient */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 800px 600px at 50% 0%, rgba(43,143,204,0.10), transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern */}
      <svg
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.025,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <defs>
          <pattern id="cta-ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-ai-grid)" />
      </svg>

      {/* Blur circles */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(43,143,204,0.06)',
          top: -80,
          left: -80,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'rgba(43,143,204,0.05)',
          bottom: -60,
          right: -60,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(74,173,232,0.04)',
          top: '40%',
          left: '65%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{ position: 'relative', zIndex: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div className="flex justify-center mb-7" {...makeMotion(0)}>
          <Badge
            style={{
              background: 'rgba(43,143,204,0.10)',
              borderColor: 'rgba(43,143,204,0.30)',
              color: '#4AADE8',
            }}
            className="inline-flex items-center gap-1.5"
          >
            <Sparkles size={13} />
            Hai sa vorbim
          </Badge>
        </motion.div>

        {/* H2 */}
        <motion.h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.9rem, 3.2vw, 3rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.022em',
            color: 'white',
            maxWidth: 680,
            margin: '0 auto 20px',
          }}
          {...makeMotion(1)}
        >
          Cate ore pierde echipa ta azi pe sarcini pe care le-ar putea face{' '}
          <span style={{ fontStyle: 'italic', color: '#4AADE8' }}>AI-ul</span>?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            maxWidth: 500,
            margin: '0 auto 40px',
          }}
          {...makeMotion(2)}
        >
          Programeaza un audit gratuit al proceselor tale. In 45 de minute identificam impreuna ce poate fi automatizat si estimam ROI-ul real.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
          {...makeMotion(3)}
        >
          <Button
            href="/oferta?serviciu=automatizari-ai"
            size="lg"
            rightIcon={<ArrowRight size={16} />}
            style={{ background: '#2B8FCC' }}
            className="hover:opacity-90 font-semibold text-white"
          >
            Solicita audit gratuit al proceselor
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.70)] hover:bg-white/10 hover:text-white"
            onClick={() =>
              document.getElementById('demo-interactiv')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Ruleaza demo din nou
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 500 }}
          {...makeMotion(4)}
        >
          <span className="flex items-center gap-2">
            <Clock size={14} />
            Consultatie gratuita, fara angajamente
          </span>
          <span className="flex items-center gap-2">
            <Shield size={14} />
            Date confidentiale procesate local
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={14} />
            ROI masurabil in prima luna
          </span>
        </motion.div>
      </div>
    </section>
  );
}
