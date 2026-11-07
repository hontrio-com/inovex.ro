'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { completeaza } from '@/lib/i18n/completeaza';
import styles from './Motion.module.css';

/**
 * Bara lipita de marginea de jos, cu butonul „Comandă acum”. Apare dupa primul
 * scroll si dispare cat timp formularul de comanda este pe ecran. Textele (si pretul deja scris, in lei
 * sau in euro) vin de la pagina.
 */
export default function StickyComandaMotion({ t, pret }: { t: { tare: string; dela: string; buton: string }; pret: string }) {
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
          className={styles.lipit}
        >
          <div className={styles.lipitInterior}>
            <p className={styles.lipitText}>
              <strong>{t.tare}</strong> {completeaza(t.dela, { pret })}
            </p>
            <a href="#comanda" className={styles.primar}>
              {t.buton}
              <ArrowRight aria-hidden />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
