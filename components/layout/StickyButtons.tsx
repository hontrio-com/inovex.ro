'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '40750456096';
const WA_MESSAGE = encodeURIComponent('Bună ziua, am o întrebare despre serviciile Inovex.');

export function StickyButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-5 z-[9999] flex flex-col gap-3"
          aria-label="Butoane contact rapid"
        >
          {/* WhatsApp */}
          <div className="relative group">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mesaj WhatsApp"
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <WhatsAppIcon />
            </a>
            <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1A202C] text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Mesaj WhatsApp
            </span>
          </div>

          {/* Telefon cu pulsing ring */}
          <div className="relative group">
            <a
              href="tel:+40750456096"
              aria-label="Sună acum"
              className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <Phone size={20} />
              {/* Pulsing ring */}
              <span
                className="absolute inset-0 rounded-full bg-blue-600 opacity-60 animate-ping"
                style={{ animationDuration: '2s' }}
                aria-hidden="true"
              />
            </a>
            <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1A202C] text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              0750 456 096
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.115 1.527 5.845L.057 24l6.303-1.654A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.364l-.358-.213-3.723.977.994-3.628-.234-.372A9.818 9.818 0 0112 2.182c5.423 0 9.818 4.395 9.818 9.818S17.423 21.818 12 21.818z" />
    </svg>
  );
}
