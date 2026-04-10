'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  Sparkles,
  Clock,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Shield,
} from 'lucide-react';

const STAGGER_ITEMS = [
  'breadcrumb',
  'badge',
  'h1',
  'p',
  'counter',
  'buttons',
  'trust',
];

export default function HeroAi() {
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
        padding: '160px 0 120px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Decorative: radial gradient */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 800px 600px at 50% 0%, rgba(43,143,204,0.12), transparent 70%)',
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
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <defs>
          <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ai-grid)" />
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
          top: -100,
          left: -100,
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
          bottom: -50,
          right: -80,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(74,173,232,0.04)',
          top: '50%',
          left: '60%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{ position: 'relative', zIndex: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Breadcrumb */}
        <motion.nav
          aria-label="breadcrumb"
          className="flex items-center justify-center gap-1 text-sm mb-10"
          {...makeMotion(0)}
        >
          <a href="/" style={{ color: 'rgba(255,255,255,0.35)' }} className="hover:opacity-70 transition-opacity">
            Acasa
          </a>
          <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.20)' }} />
          <a href="/servicii" style={{ color: 'rgba(255,255,255,0.35)' }} className="hover:opacity-70 transition-opacity">
            Servicii
          </a>
          <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.20)' }} />
          <span style={{ color: 'rgba(255,255,255,0.70)', fontWeight: 600 }}>Automatizari AI</span>
        </motion.nav>

        {/* Badge */}
        <motion.div className="flex justify-center mb-7" {...makeMotion(1)}>
          <Badge
            style={{
              background: 'rgba(43,143,204,0.15)',
              borderColor: 'rgba(43,143,204,0.30)',
              color: '#4AADE8',
            }}
            className="inline-flex items-center gap-1.5"
          >
            <Sparkles size={13} />
            Automatizari AI
          </Badge>
        </motion.div>

        {/* H1 */}
        <motion.h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#FFFFFF',
            maxWidth: 780,
            margin: '0 auto 24px',
          }}
          {...makeMotion(2)}
        >
          Lasa{' '}
          <span style={{ fontStyle: 'italic', color: '#4AADE8' }}>AI-ul</span>{' '}
          sa faca munca repetitiva. Tu concentreaza-te pe ce conteaza.
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          style={{
            color: 'rgba(255,255,255,0.60)',
            fontSize: '1.125rem',
            lineHeight: 1.75,
            maxWidth: 580,
            margin: '0 auto 40px',
          }}
          {...makeMotion(3)}
        >
          Implementam agenti AI si fluxuri de automatizare care elimina munca repetitiva, reduc costurile operationale si iti dau inapoi timpul pentru ce genereaza cu adevarat valoare in afacerea ta.
        </motion.p>

        {/* Counter */}
        <motion.div className="flex justify-center mb-10" {...makeMotion(4)}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100,
              padding: '12px 28px',
            }}
          >
            <Clock size={18} style={{ color: 'rgba(255,255,255,0.40)' }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: 'white',
                }}
              >
                4.2h
              </span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)', marginLeft: 8 }}>
                economisite per angajat pe zi
              </span>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.10)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', maxWidth: 120 }}>
              in medie pentru clientii nostri
            </span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
          {...makeMotion(5)}
        >
          <Button
            href="/oferta?serviciu=automatizari-ai"
            size="lg"
            rightIcon={<ArrowRight size={16} />}
            style={{ background: '#2B8FCC' }}
            className="hover:opacity-90 font-semibold text-white"
          >
            Solicita consultatie gratuita
          </Button>
          <Button
            size="lg"
            variant="outline"
            leftIcon={<Play size={16} style={{ color: '#4AADE8' }} />}
            className="bg-transparent border-[rgba(255,255,255,0.20)] text-[rgba(255,255,255,0.80)] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
            onClick={() =>
              document.getElementById('demo-interactiv')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Vezi workflow demo
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13, fontWeight: 500 }}
          {...makeMotion(6)}
        >
          <span className="flex items-center gap-2">
            <CheckCircle size={14} />
            Implementare in 2-4 saptamani
          </span>
          <span className="flex items-center gap-2">
            <Zap size={14} />
            ROI vizibil in prima luna
          </span>
          <span className="flex items-center gap-2">
            <Shield size={14} />
            Date procesate local daca e necesar
          </span>
        </motion.div>

        {/* Bottom decorative line */}
        <div
          style={{
            width: 120,
            height: 1,
            background: 'rgba(43,143,204,0.30)',
            margin: '48px auto 0',
            boxShadow: '0 0 20px rgba(43,143,204,0.40)',
          }}
        />
      </div>
    </section>
  );
}
