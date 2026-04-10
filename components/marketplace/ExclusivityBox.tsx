'use client';

import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isSold: boolean;
  soldToBusinessName?: string;
}

const RIGHTS = [
  'Drepturi de utilizare comerciala complete si exclusive',
  'Poti modifica orice element de design dupa livrare',
  'Poti vinde produse prin magazinul tau fara restrictii',
  'Proprietatea intelectuala a design-ului este transferata integral',
  'Niciun alt client Inovex nu va detine acelasi design',
];

export default function ExclusivityBox({ isSold, soldToBusinessName }: Props) {
  if (isSold) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          borderRadius: 12, padding: 20, margin: '32px 0',
          background: '#F8FAFB', border: '1px solid #E8ECF0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
            background: '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lock size={18} color="#8A94A6" />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#1A202C', marginBottom: 6 }}>
              Acest design a fost vandut
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A5568', lineHeight: 1.65, margin: 0 }}>
              Conform politicii noastre de exclusivitate, fiecare design se vinde o singura data.
              {soldToBusinessName && ` A fost achizitionat de ${soldToBusinessName}.`}
            </p>
            <Link
              href="/oferta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 14, padding: '8px 18px', borderRadius: 8,
                background: '#2B8FCC', color: '#fff', textDecoration: 'none',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13,
              }}
            >
              Solicita un design similar personalizat
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{
        borderRadius: 12, padding: 20, margin: '32px 0',
        background: '#0D1117', border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(43,143,204,0.15)', border: '1px solid rgba(43,143,204,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Lock size={18} color="#4AADE8" />
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>
            Design exclusiv, vandut o singura data
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.50)', margin: 0 }}>
            La cumparare, devii singurul proprietar al acestui design
          </p>
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 14 }} />

      {/* Lista drepturi */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {RIGHTS.map((right, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
          >
            <CheckCircle size={14} color="#4AADE8" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
              {right}
            </span>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          Odata achizitionat, produsul este retras permanent din marketplace.
          Niciun alt client nu va putea cumpara acelasi design.
        </span>
      </div>
    </motion.div>
  );
}
