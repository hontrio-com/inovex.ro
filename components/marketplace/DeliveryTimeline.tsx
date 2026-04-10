'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardList, Settings, Eye, Rocket, Headphones } from 'lucide-react';
import type { MarketplaceProduct } from '@/types/marketplace';

const ICON_MAP = {
  ClipboardList,
  Settings,
  Eye,
  Rocket,
  Headphones,
};

interface Props { product: MarketplaceProduct }

export function DeliveryTimeline({ product }: Props) {
  const reduce = useReducedMotion() ?? false;
  const steps  = product.deliverySteps;

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {/* Linie verticala */}
        <div style={{
          position: 'absolute', left: 19, top: 20, bottom: 20,
          width: 2,
          background: 'linear-gradient(to bottom, #2B8FCC 0%, #E8ECF0 100%)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((step, i) => {
            const IconComp = ICON_MAP[step.icon] ?? ClipboardList;
            return (
              <motion.div
                key={step.stepNumber}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: 'flex', gap: 20, position: 'relative' }}
              >
                {/* Icon container */}
                <div style={{
                  width: 40, height: 40, flexShrink: 0, zIndex: 1,
                  background: '#fff',
                  border: '2px solid #2B8FCC',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 0 4px rgba(43,143,204,0.08)',
                }}>
                  <IconComp size={17} color="#2B8FCC" />
                </div>

                {/* Continut */}
                <div style={{ flex: 1, paddingTop: 6 }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                    textTransform: 'uppercase', letterSpacing: '0.07em', color: '#2B8FCC',
                    marginBottom: 4,
                  }}>
                    {step.timeframe}
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: '#0D1117', marginBottom: 4 }}>
                    {step.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.65 }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
