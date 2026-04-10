'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { AppScreen } from './apps/AppEcommerce';

interface PhoneScreenProps {
  screens: AppScreen[];
  currentScreen: number;
  direction: number;
  onNavigate: (index: number) => void;
}

const EASE = [0.4, 0, 0.2, 1] as const;
const DIST = 280;

export default function PhoneScreen({ screens, currentScreen, direction, onNavigate }: PhoneScreenProps) {
  const screen = screens[currentScreen];
  if (!screen) return null;
  const ScreenComponent = screen.component;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={screen.id + currentScreen}
          custom={direction}
          initial={{ x: direction >= 0 ? DIST : -DIST, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction >= 0 ? -DIST : DIST, opacity: 0.6 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <ScreenComponent onNavigate={onNavigate} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
