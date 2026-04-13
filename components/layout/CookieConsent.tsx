'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getCookieConsent,
  setCookieConsent,
  hasConsented,
  acceptAll as acceptAllFn,
  rejectAll as rejectAllFn,
} from '@/lib/cookies';

// ---------------------------------------------------------------------------
// Toggle row (reused in compact + panel)
// ---------------------------------------------------------------------------

function ToggleRow({
  title,
  description,
  checked,
  disabled,
  onChange,
  alwaysBadge,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  alwaysBadge?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '12px 0',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
              fontFamily: 'var(--font-body)',
            }}
          >
            {title}
          </span>
          {alwaysBadge && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 20,
                background: '#064E3B',
                color: '#6EE7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Intotdeauna active
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.50)',
            lineHeight: 1.5,
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          {description}
        </p>
      </div>

      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          position: 'relative',
          flexShrink: 0,
          width: 42,
          height: 24,
          borderRadius: 12,
          background: checked ? '#2B8FCC' : 'rgba(255,255,255,0.15)',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 200ms ease',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 21 : 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            transition: 'left 200ms ease',
          }}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main banner
// ---------------------------------------------------------------------------

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!hasConsented()) {
      const t = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(t);
    }
    // Load saved prefs for panel
    const c = getCookieConsent();
    if (c) {
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
    }
  }, []);

  function handleAcceptAll() {
    acceptAllFn();
    setVisible(false);
  }

  function handleRejectAll() {
    rejectAllFn();
    setVisible(false);
  }

  function handleSaveSelected() {
    setCookieConsent({ analytics, marketing });
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: '#0D1117',
            boxShadow: '0 -4px 32px rgba(0,0,0,0.25)',
          }}
        >
          <AnimatePresence mode="wait">
            {showPanel ? (
              /* Personalize panel */
              <motion.div
                key="panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  maxWidth: 640,
                  margin: '0 auto',
                  padding: '24px 24px 20px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                }}
              >
                {/* Panel header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <h2
                    id="cookie-banner-title"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      fontSize: 18,
                      color: '#fff',
                      margin: 0,
                    }}
                  >
                    Personalizeaza preferintele de cookie-uri
                  </h2>
                  <button
                    onClick={() => setShowPanel(false)}
                    aria-label="Inchide panoul"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.40)',
                      padding: 4,
                      display: 'flex',
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Toggle rows */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    marginTop: 8,
                  }}
                >
                  <ToggleRow
                    title="Cookie-uri esentiale"
                    description="Necesare pentru functionarea de baza a site-ului. Nu pot fi dezactivate."
                    checked={true}
                    disabled
                    onChange={() => {}}
                    alwaysBadge
                  />
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
                  <ToggleRow
                    title="Cookie-uri analitice (Google Analytics 4)"
                    description="Ne ajuta sa intelegem cum folosesti site-ul. Datele sunt anonimizate."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
                  <ToggleRow
                    title="Cookie-uri de marketing (Google Ads, TikTok)"
                    description="Folosite pentru masurarea eficientei campaniilor noastre publicitare. Nu afisam reclame pe site."
                    checked={marketing}
                    onChange={setMarketing}
                  />
                </div>

                {/* Panel footer */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: 16,
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <Link
                    href="/politica-cookies"
                    style={{
                      fontSize: 12,
                      color: '#4AADE8',
                      textDecoration: 'underline',
                    }}
                  >
                    Politica de cookies completa
                  </Link>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                      size="sm"
                      onClick={handleSaveSelected}
                      style={{ background: '#2B8FCC', color: '#fff', border: 'none' }}
                    >
                      Accepta selectate
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      style={{ background: '#10B981', color: '#fff', border: 'none' }}
                    >
                      Accepta toate
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Compact banner */
              <motion.div
                key="compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ padding: '20px 24px' }}
              >
                <style>{`
                  @media (max-width: 767px) {
                    .cookie-inner { flex-direction: column !important; }
                    .cookie-actions { width: 100% !important; }
                    .cookie-actions button, .cookie-actions a { width: 100% !important; justify-content: center !important; }
                  }
                `}</style>
                <div
                  id="cookie-banner-title"
                  className="cookie-inner"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    maxWidth: 1200,
                    margin: '0 auto',
                  }}
                >
                  {/* Text */}
                  <p
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.80)',
                      lineHeight: 1.6,
                      margin: 0,
                      maxWidth: 600,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Folosim cookie-uri pentru a imbunatati experienta ta pe site si pentru a analiza traficul.{' '}
                    <Link
                      href="/politica-cookies"
                      style={{ color: '#4AADE8', textDecoration: 'underline' }}
                    >
                      Politica de cookies
                    </Link>
                  </p>

                  {/* Actions */}
                  <div
                    className="cookie-actions"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexShrink: 0,
                      flexWrap: 'wrap',
                    }}
                  >
                    <button
                      onClick={() => setShowPanel(true)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.20)',
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.80)',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Personalizeaza
                    </button>
                    <button
                      onClick={handleRejectAll}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Refuza toate
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      style={{
                        padding: '8px 20px',
                        borderRadius: 8,
                        border: 'none',
                        background: '#2B8FCC',
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Accepta toate
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
