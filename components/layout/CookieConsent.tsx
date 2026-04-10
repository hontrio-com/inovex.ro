'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const CONSENT_KEY = 'inovex_consent';
const CONSENT_TTL = 180 * 24 * 60 * 60 * 1000;

function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: ConsentState = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CONSENT_TTL) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const state: ConsentState = { analytics, marketing, timestamp: Date.now() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
}

export function CookieConsent() {
  const [visible,     setVisible]     = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics,   setAnalytics]   = useState(false);
  const [marketing,   setMarketing]   = useState(false);

  useEffect(() => {
    if (!getConsent()) setTimeout(() => setVisible(true), 1500);
  }, []);

  function acceptAll() {
    saveConsent(true, true);
    setVisible(false);
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as Window & { dataLayer: unknown[] }).dataLayer.push({ event: 'consent_update', analytics: true, marketing: true });
    }
  }

  function rejectAll()        { saveConsent(false, false); setVisible(false); }
  function savePreferences()  { saveConsent(analytics, marketing); setVisible(false); }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] p-4"
          role="dialog"
          aria-labelledby="cookie-banner-titlu"
          aria-modal="true"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-5 lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 id="cookie-banner-titlu" className="text-base font-semibold text-gray-950 mb-1">
                    Utilizăm cookie-uri
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Folosim cookie-uri pentru a îmbunătăți experiența ta pe site. Unele sunt necesare funcționării,
                    altele ne ajută să înțelegem cum este utilizat site-ul.{' '}
                    <Link href="/politica-cookies" className="text-blue-600 hover:underline">
                      Politica Cookies
                    </Link>
                  </p>
                </div>
                <button
                  onClick={rejectAll}
                  className="shrink-0 p-1 text-gray-400 hover:text-gray-500 transition-colors rounded-md hover:bg-gray-100"
                  aria-label="Refuză și închide"
                >
                  <X size={18} />
                </button>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                      <ToggleRow
                        titlu="Cookie-uri strict necesare"
                        descriere="Necesare pentru funcționarea site-ului. Nu pot fi dezactivate."
                        checked={true} disabled onChange={() => {}}
                      />
                      <ToggleRow
                        titlu="Cookie-uri analitice (Google Analytics)"
                        descriere="Ne ajută să înțelegem cum interacționezi cu site-ul."
                        checked={analytics} onChange={setAnalytics}
                      />
                      <ToggleRow
                        titlu="Cookie-uri de marketing (Meta Pixel, TikTok)"
                        descriere="Folosite pentru reclame personalizate."
                        checked={marketing} onChange={setMarketing}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Button onClick={acceptAll} size="sm">
                  Acceptă tot
                </Button>
                {showDetails ? (
                  <Button onClick={savePreferences} variant="secondary" size="sm">
                    Salvează preferințele
                  </Button>
                ) : (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Settings size={14} />
                    Personalizează
                    <ChevronDown size={14} />
                  </button>
                )}
                <button onClick={rejectAll} className="text-sm text-gray-400 hover:text-gray-500 transition-colors">
                  Refuză
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToggleRow({ titlu, descriere, checked, disabled, onChange }: {
  titlu: string; descriere: string; checked: boolean; disabled?: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-sm font-semibold text-gray-900">{titlu}</div>
        <div className="text-xs text-gray-400">{descriere}</div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative shrink-0 w-10 h-6 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-gray-300',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <span className={cn(
          'absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        )} />
      </button>
    </div>
  );
}
