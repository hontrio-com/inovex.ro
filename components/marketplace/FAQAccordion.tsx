'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ProductFAQ } from '@/types/marketplace';

interface Props {
  items: ProductFAQ[];
}

export function FAQAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              border: `1px solid ${isOpen ? '#BFDBFE' : '#E8ECF0'}`,
              borderRadius: 12,
              overflow: 'hidden',
              background: isOpen ? '#F0F7FF' : '#fff',
              transition: 'border-color 200ms ease, background 200ms ease',
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '16px 20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              aria-expanded={isOpen}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  color: isOpen ? '#1D4ED8' : '#0D1117',
                  lineHeight: 1.4,
                }}
              >
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                style={{ flexShrink: 0, color: isOpen ? '#2B8FCC' : '#9CA3AF' }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: '#374151',
                      lineHeight: 1.7,
                      padding: '0 20px 18px',
                    }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
