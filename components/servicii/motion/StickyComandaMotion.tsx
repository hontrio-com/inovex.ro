'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motionPrice, formatLei } from '@/lib/motion-design';

/**
 * Bara lipita de marginea de jos, cu butonul "COMANDA ACUM". Apare dupa primul
 * scroll si dispare cat timp formularul de comanda este pe ecran.
 */
export default function StickyComandaMotion() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      const form = document.querySelector('#comanda form');
      const rect = form?.getBoundingClientRect();
      const formOnScreen = !!rect && rect.top < window.innerHeight - 80 && rect.bottom > 80;
      setVisible(window.scrollY > 200 && !formOnScreen);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          className="fixed bottom-0 inset-x-0 z-[9000] bg-white/95 backdrop-blur-md border-t border-[#E8ECF0]"
          style={{ boxShadow: '0 -8px 24px rgba(0,0,0,0.06)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
            <p className="max-sm:hidden text-[14px] text-[#4A5568]">
              <span className="font-semibold text-[#0D1117]">Reclama video animata, gata in 48 de ore.</span>{' '}
              De la {formatLei(motionPrice(1))}.
            </p>
            <Button
              size="lg"
              className="max-sm:flex-1 h-11 px-7 text-[14px] font-bold tracking-wide"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => document.getElementById('comanda')?.scrollIntoView({ behavior: 'smooth' })}
            >
              COMANDA ACUM
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
