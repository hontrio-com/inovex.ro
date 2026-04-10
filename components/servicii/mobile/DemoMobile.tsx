'use client';

import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PhoneMockup from './PhoneMockup';
import PhoneScreen from './PhoneScreen';
import { APP_METAS, type AppType } from '@/lib/mobile-demo-data';
import { ecommerceScreens } from './apps/AppEcommerce';
import { rezervariScreens } from './apps/AppRezervari';
import { fitnessScreens } from './apps/AppFitness';
import { livariScreens } from './apps/AppLivrari';
import { businessScreens } from './apps/AppBusiness';
import type { AppScreen } from './apps/AppEcommerce';
import {
  ShoppingBag,
  CalendarCheck,
  Activity,
  Truck,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

const APP_SCREENS: Record<AppType, AppScreen[]> = {
  ecommerce: ecommerceScreens,
  rezervari: rezervariScreens,
  fitness: fitnessScreens,
  livrari: livariScreens,
  business: businessScreens,
};

const ICONS: Record<AppType, React.ReactNode> = {
  ecommerce: <ShoppingBag size={18} />,
  rezervari: <CalendarCheck size={18} />,
  fitness: <Activity size={18} />,
  livrari: <Truck size={18} />,
  business: <Briefcase size={18} />,
};

export default function DemoMobile() {
  const shouldReduceMotion = useReducedMotion();
  const [activeApp, setActiveApp] = useState<AppType>('ecommerce');
  const [activeScreen, setActiveScreen] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeMeta = APP_METAS.find(m => m.id === activeApp)!;
  const screens = APP_SCREENS[activeApp];

  const handleAppChange = useCallback((app: AppType) => {
    setActiveApp(app);
    setActiveScreen(0);
    setDirection(1);
  }, []);

  const handleNavigate = useCallback((idx: number) => {
    setDirection(idx > activeScreen ? 1 : -1);
    setActiveScreen(idx);
  }, [activeScreen]);

  const handlePrev = () => {
    if (activeScreen > 0) handleNavigate(activeScreen - 1);
  };

  const handleNext = () => {
    if (activeScreen < screens.length - 1) handleNavigate(activeScreen + 1);
  };

  return (
    <section id="demo-interactiv" className="py-[100px] bg-[#F8FAFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-[640px] mx-auto text-center mb-10">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Demo interactiv
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
            className="mb-4"
          >
            Exploreaza{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>5 tipuri de aplicatii</span>
            {' '}in actiune
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed mb-5">
            Naviga prin ecrane reale si descopera cum arata o aplicatie mobila construita de Inovex.
          </p>
          {/* Disclaimer bar */}
          <div className="inline-flex items-center gap-2 bg-[#EAF5FF] border border-[#C8E6F8] rounded-lg px-4 py-2">
            <Info size={14} className="text-[#2B8FCC] shrink-0" />
            <span className="text-[12px] text-[#2B8FCC]">Demo simulat. Ecranele ilustreaza functionalitati reale, nu o aplicatie live.</span>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">

          {/* LEFT - App selector */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-1">
              Alege tipul de aplicatie
            </p>
            {APP_METAS.map((meta) => {
              const isActive = activeApp === meta.id;
              return (
                <button
                  key={meta.id}
                  onClick={() => handleAppChange(meta.id)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border transition-all duration-200"
                  style={{
                    background: isActive ? '#EAF5FF' : '#FFFFFF',
                    borderColor: isActive ? '#2B8FCC' : '#E8ECF0',
                    color: isActive ? '#2B8FCC' : '#4A5568',
                  }}
                >
                  {ICONS[meta.id]}
                  <span className="text-[13px] font-semibold">{meta.label}</span>
                </button>
              );
            })}

            {/* Info card */}
            <div className="mt-2 bg-white border border-[#E8ECF0] rounded-xl p-4">
              <p className="text-[13px] font-semibold text-[#0D1117] mb-3">{activeMeta.infoTitle}</p>
              <div className="flex flex-col gap-2 mb-4">
                {activeMeta.infoFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check size={13} className="text-[#2B8FCC] shrink-0 mt-0.5" />
                    <span className="text-[12px] text-[#4A5568]">{f}</span>
                  </div>
                ))}
              </div>
              <Button href="/oferta" size="sm" className="w-full text-[12px]">
                Solicita oferta
              </Button>
            </div>
          </div>

          {/* CENTER - Phone */}
          <div className="flex flex-col items-center">
            <PhoneMockup size="lg">
              <PhoneScreen
                screens={screens}
                currentScreen={activeScreen}
                direction={direction}
                onNavigate={handleNavigate}
              />
            </PhoneMockup>
          </div>

          {/* RIGHT - Context info */}
          <div className="flex flex-col gap-4">
            <Badge className="w-fit bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
              Ecranul {activeScreen + 1} din 3
            </Badge>

            <motion.div
              key={`title-${activeApp}-${activeScreen}`}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  color: '#0D1117',
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}
              >
                {activeMeta.screenTitles[activeScreen]}
              </h3>
              <p className="text-[13px] text-[#4A5568] leading-relaxed">
                {activeMeta.screenDescriptions[activeScreen]}
              </p>
            </motion.div>

            <Separator />

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-3">
                Functionalitati in acest ecran:
              </p>
              <motion.div
                key={`features-${activeApp}-${activeScreen}`}
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                {activeMeta.screenFeatures[activeScreen].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check size={13} className="text-[#2B8FCC] shrink-0 mt-0.5" />
                    <span className="text-[12px] text-[#4A5568] leading-relaxed">{f}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <Separator />

            {/* Dots navigation */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => handleNavigate(i)}
                    style={{
                      width: activeScreen === i ? 20 : 8,
                      height: 8,
                      borderRadius: 99,
                      background: activeScreen === i ? '#2B8FCC' : '#D1D5DB',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    aria-label={`Ecran ${i + 1}`}
                  />
                ))}
              </div>
              {/* Prev/next arrows */}
              <button
                onClick={handlePrev}
                disabled={activeScreen === 0}
                className="w-8 h-8 rounded-full border border-[#E8ECF0] bg-white flex items-center justify-center disabled:opacity-30 hover:border-[#2B8FCC] transition-colors"
              >
                <ChevronLeft size={15} className="text-[#4A5568]" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeScreen === screens.length - 1}
                className="w-8 h-8 rounded-full border border-[#E8ECF0] bg-white flex items-center justify-center disabled:opacity-30 hover:border-[#2B8FCC] transition-colors"
              >
                <ChevronRight size={15} className="text-[#4A5568]" />
              </button>
            </div>

            <Button href="/oferta?tip=mobile" variant="outline" className="w-fit border-[#2B8FCC] text-[#2B8FCC] hover:bg-[#EAF5FF]">
              Solicita o aplicatie similara
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
