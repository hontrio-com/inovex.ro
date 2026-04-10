'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

interface Props {
  productTitle: string;
  productSlug: string;
  agentName?: string;
  agentRole?: string;
  triggerAfterSeconds?: number;
  whatsappNumber: string;
}

const STORAGE_KEY = 'inovex_proactive_chat_shown';

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ProactiveChatWidget({
  productTitle,
  agentName = 'Vlad',
  agentRole = 'Inovex',
  triggerAfterSeconds = 45,
  whatsappNumber,
}: Props) {
  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isMobile,  setIsMobile]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    timerRef.current = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }, triggerAfterSeconds * 1000);

    const cancelTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
    };

    document.querySelectorAll('[data-purchase-intent="true"]').forEach((el) => {
      el.addEventListener('click', cancelTimer);
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('resize', checkMobile);
      document.querySelectorAll('[data-purchase-intent="true"]').forEach((el) => {
        el.removeEventListener('click', cancelTimer);
      });
    };
  }, [triggerAfterSeconds]);

  function dismiss() {
    setDismissed(true);
    setTimeout(() => setVisible(false), 280);
  }

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Buna ziua, ma intereseaza "${productTitle}" de pe inovex.ro. Am cateva intrebari despre ce include si cum functioneaza livrarea.`
  )}`;

  if (!visible) return null;

  /* ── MOBILE: banner slim ── */
  if (isMobile) {
    return (
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 64 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'fixed', bottom: 80, left: 16, right: 16, zIndex: 9990 }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#25D366', borderRadius: 12, padding: '12px 16px',
              boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
            }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, textDecoration: 'none', color: '#fff' }}
              >
                <span style={{ color: '#fff' }}>{WA_ICON}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: '#fff' }}>
                  Ai intrebari? Scrie-ne pe WhatsApp
                </span>
              </a>
              <button onClick={dismiss} aria-label="Inchide" style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.8, padding: 0, marginLeft: 12 }}>
                <X size={16} color="#fff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  /* ── DESKTOP: popup card ── */
  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ position: 'fixed', bottom: 96, right: 24, zIndex: 9990, transformOrigin: 'bottom right' }}
        >
          {/* Card */}
          <div style={{
            width: 300, background: '#fff', borderRadius: 16, overflow: 'hidden',
            border: '1px solid #E8ECF0',
            boxShadow: '0 16px 48px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
          }}>
            {/* Header verde WhatsApp */}
            <div style={{ background: '#25D366', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: '#fff',
              }}>
                {agentName.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: '#fff', lineHeight: 1.2, margin: 0 }}>
                  {agentName} · {agentRole}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                  de obicei raspunde in 5 min
                </p>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', flexShrink: 0 }} />
              <button onClick={dismiss} aria-label="Inchide" style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.7, padding: 0, flexShrink: 0 }}>
                <X size={16} color="#fff" />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: 16 }}>
              <div style={{
                background: '#F0F7FF', borderRadius: '4px 14px 14px 14px',
                padding: '10px 14px', marginBottom: 14,
                fontFamily: 'var(--font-body)', fontSize: 13, color: '#1A202C',
                lineHeight: 1.6, fontWeight: 400,
              }}>
                Buna! Vad ca te intereseaza{' '}
                <strong style={{ fontWeight: 600 }}>{productTitle}</strong>
                . Ai intrebari despre ce include sau cum functioneaza livrarea?
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  data-purchase-intent="true"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    background: '#25D366', color: '#fff', borderRadius: 10, padding: '10px 16px',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, textDecoration: 'none',
                  }}
                >
                  {WA_ICON}
                  Da, vreau sa intreb
                </a>
                <button
                  onClick={dismiss}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
                    fontFamily: 'var(--font-body)', fontSize: 12, color: '#8A94A6', fontWeight: 500,
                    borderRadius: 10,
                  }}
                >
                  Nu, multumesc
                </button>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              borderTop: '1px solid #F4F6F8', padding: '8px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            }}>
              <MessageCircle size={11} color="#D1D5DB" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#8A94A6', fontWeight: 400 }}>
                Vei fi redirectionat pe WhatsApp
              </span>
            </div>
          </div>

          {/* Notch */}
          <div style={{
            position: 'absolute', bottom: -8, right: 24,
            width: 0, height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '8px solid #fff',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.06))',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
