'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Lightbulb,
  HelpCircle,
  MessageSquare,
  Users,
  ShoppingBag,
  CalendarCheck,
  Briefcase,
  LayoutGrid,
} from 'lucide-react';
import {
  Acord,
  Cadru,
  Camp,
  CardOptiune,
  EroareTrimitere,
  Grila,
  Intrebare,
  Navigare,
  StiaiCa,
  Subtitlu,
  Succes,
  Titlu,
} from '@/components/configurator/Configurator';
import f from '@/components/forms/Formular.module.css';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type AplicatieWebData = {
  ideaClaritate: string;
  tipAplicatie: string;
  descriereIdeea: string;
  numeComplet: string;
  email: string;
  telefon: string;
  gdprConsent: boolean;
};

const INITIAL_DATA: AplicatieWebData = {
  ideaClaritate: '',
  tipAplicatie: '',
  descriereIdeea: '',
  numeComplet: '',
  email: '',
  telefon: '',
  gdprConsent: false,
};

const LS_KEY = 'inovex_configurator_aplicatie_web';

const STEPS = ['Ideea ta', 'Tipul aplicației', 'Contact'];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

// „Știai că?” care apare cu o mica intarziere (vezi stiaiVisible)
function StiaiCaAnimat({ visible, children }: { visible: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <StiaiCa>{children}</StiaiCa>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Main client component                                               */
/* ------------------------------------------------------------------ */

export function ConfiguratorAplicatieWebClient() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<AplicatieWebData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof AplicatieWebData, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [stiaiVisible, setStiaiVisible] = useState(false);
  const [descriereCount, setDescriereCount] = useState(0);

  /* localStorage restore */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AplicatieWebData;
        setData(parsed);
        setDescriereCount(parsed.descriereIdeea?.length ?? 0);
      }
    } catch {
      /* ignore */
    }
  }, []);

  /* localStorage save */
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  /* "Stiai ca?" delay per step */
  useEffect(() => {
    setStiaiVisible(false);
    if (step === 1 || step === 2) {
      const t = setTimeout(() => setStiaiVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, [step]);

  /* ---- canContinue per step ---- */
  const canContinue =
    step === 1
      ? data.ideaClaritate !== ''
      : step === 2
        ? data.tipAplicatie !== ''
        : data.numeComplet.length >= 2 &&
          data.telefon.length >= 10 &&
          data.gdprConsent;

  /* ---- validate step 3 ---- */
  const validateStep3 = (): boolean => {
    const newErrors: Partial<Record<keyof AplicatieWebData, string>> = {};
    if (!data.numeComplet || data.numeComplet.length < 2) newErrors.numeComplet = 'Numele trebuie să aibă cel puțin 2 caractere';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Email invalid';
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = 'Telefonul trebuie să aibă cel puțin 10 cifre';
    if (!data.gdprConsent) newErrors.gdprConsent = 'Trebuie să accepți politica de confidențialitate';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- submit ---- */
  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitStatus('loading');
    const metaEventId = generateEventId();
    try {
      const res = await fetch('/api/configurator/aplicatie-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        body: JSON.stringify({ ...data, gdprConsent: true }),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorAplicatieWeb(metaEventId);
        trackTikTok.configuratorAplicatieWeb();
        trackEvent('Lead', { content_name: 'configurator_aplicatie_web' }, metaEventId);
        // ChatGPT Ads: acelasi event id ca la Meta => perechea server-side se deduplica.
        oaiqMeasure('lead_created', {}, metaEventId);
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  /* ---- navigation ---- */
  const handleNext = () => {
    if (step === 3) {
      handleSubmit();
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  /* ---- animation variants ---- */
  const variants = {
    initial: (dir: number) => ({ opacity: 0, x: shouldReduceMotion ? 0 : dir * 20 }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: shouldReduceMotion ? 0 : dir * -20 }),
  };

  /* ---------------------------------------------------------------- */
  /*  SUCCESS STATE                                                     */
  /* ---------------------------------------------------------------- */
  if (submitStatus === 'success') {
    return <Succes text="Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile aplicației tale." />;
  }

  /* ---------------------------------------------------------------- */
  /*  MAIN RENDER                                                       */
  /* ---------------------------------------------------------------- */
  return (
    <Cadru
      anunt="Peste 50 de aplicații web și platforme SaaS livrate pentru antreprenori din România"
      pasi={STEPS}
      pas={step}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ---- STEP 1 ---- */}
          {step === 1 && (
            <>
              <Titlu>Hai să configurăm aplicația ta web</Titlu>
              <Subtitlu>Spune-ne câteva detalii despre ce vrei să construiești</Subtitlu>

              <Intrebare>Ai deja o idee clară pentru aplicația ta?</Intrebare>

              <Grila telefon={1} mare={3}>
                <CardOptiune
                  icon={Lightbulb}
                  label="Da, știu exact ce vreau"
                  sublabel="Am viziunea clară și vreau să o implementăm"
                  selected={data.ideaClaritate === 'da-stiu-exact'}
                  onClick={() => setData((p) => ({ ...p, ideaClaritate: 'da-stiu-exact' }))}
                />
                <CardOptiune
                  icon={HelpCircle}
                  label="Am o idee, dar nu este încă bine definită"
                  sublabel="Știu direcția, dar mai am întrebări"
                  selected={data.ideaClaritate === 'am-o-idee'}
                  onClick={() => setData((p) => ({ ...p, ideaClaritate: 'am-o-idee' }))}
                />
                <CardOptiune
                  icon={MessageSquare}
                  label="Nu, am nevoie de ajutor"
                  sublabel="Vreau să discutăm și să găsim soluția potrivită"
                  selected={data.ideaClaritate === 'am-nevoie-de-ajutor'}
                  onClick={() => setData((p) => ({ ...p, ideaClaritate: 'am-nevoie-de-ajutor' }))}
                />
              </Grila>

              <StiaiCaAnimat visible={stiaiVisible}>
                Majoritatea aplicațiilor de succes pornesc de la o idee simplă, dar bine executată.
              </StiaiCaAnimat>
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>Tipul aplicației tale</Titlu>
              <Subtitlu>Selectează varianta care se potrivește cel mai bine</Subtitlu>

              <Intrebare>Cum ai descrie pe scurt aplicația ta?</Intrebare>

              <Grila telefon={1} mare={2}>
                {[
                  { value: 'platforma-utilizatori', icon: Users,          label: 'Platformă cu utilizatori',       sub: 'Conturi, panou de control, diferite funcții' },
                  { value: 'marketplace',           icon: ShoppingBag,    label: 'Marketplace',                    sub: 'Stil eMag, OLX, platforme de vânzare între utilizatori' },
                  { value: 'aplicatie-servicii',    icon: CalendarCheck,  label: 'Aplicație de servicii',          sub: 'Programări, rezervări, booking online' },
                  { value: 'sistem-intern',         icon: Briefcase,      label: 'Sistem intern pentru business',  sub: 'Gestionare clienți, comenzi, procese interne' },
                  { value: 'alt-tip',               icon: LayoutGrid,     label: 'Alt tip',                        sub: 'Alt tip de aplicație web' },
                ].map(({ value, icon, label, sub }) => (
                  <CardOptiune
                    key={value}
                    icon={icon}
                    label={label}
                    sublabel={sub}
                    selected={data.tipAplicatie === value}
                    onClick={() => setData((p) => ({ ...p, tipAplicatie: value }))}
                  />
                ))}
              </Grila>

              <div className={f.formular} style={{ marginTop: '24px' }}>
                <Camp id="aw-descriere" eticheta="Descrie pe scurt ideea ta" optional>
                  <textarea
                    id="aw-descriere"
                    rows={3}
                    className={f.textarea}
                    value={data.descriereIdeea}
                    onChange={(e) => {
                      const val = e.target.value.slice(0, 500);
                      setData((p) => ({ ...p, descriereIdeea: val }));
                      setDescriereCount(val.length);
                    }}
                    placeholder="Ex: Vreau o platformă unde furnizorii pot lista servicii și clienții le pot rezerva online, cu plata integrată..."
                  />
                  <span style={{ fontSize: '12px', color: '#8A94A6', textAlign: 'right' }}>
                    {descriereCount} / 500
                  </span>
                </Camp>
              </div>

              <StiaiCaAnimat visible={stiaiVisible}>
                Aplicațiile SaaS pot genera venit recurent lunar, nu doar vânzări unice.
              </StiaiCaAnimat>
            </>
          )}

          {/* ---- STEP 3 ---- */}
          {step === 3 && (
            <>
              <Titlu>Aproape gata!</Titlu>
              <Subtitlu>
                Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile
                aplicației tale.
              </Subtitlu>

              <div className={f.formular}>
                <Camp id="aw-nume" eticheta="Nume complet" eroare={errors.numeComplet}>
                  <input
                    id="aw-nume"
                    autoComplete="name"
                    className={f.input}
                    value={data.numeComplet}
                    onChange={(e) => setData((p) => ({ ...p, numeComplet: e.target.value }))}
                    placeholder="Numele tău complet"
                    aria-invalid={!!errors.numeComplet}
                  />
                </Camp>

                <div className={f.rand}>
                  <Camp id="aw-email" eticheta="Email" optional eroare={errors.email}>
                    <input
                      id="aw-email"
                      type="email"
                      autoComplete="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="adresa@email.ro"
                      aria-invalid={!!errors.email}
                    />
                  </Camp>
                  <Camp id="aw-telefon" eticheta="Telefon" eroare={errors.telefon}>
                    <input
                      id="aw-telefon"
                      type="tel"
                      autoComplete="tel"
                      className={f.input}
                      value={data.telefon}
                      onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                      placeholder="07XX XXX XXX"
                      aria-invalid={!!errors.telefon}
                    />
                  </Camp>
                </div>

                <Acord
                  id="aw-gdpr"
                  checked={data.gdprConsent}
                  onChange={(bifat) => setData((p) => ({ ...p, gdprConsent: bifat }))}
                  eroare={errors.gdprConsent}
                >
                  {' '}
                  și prelucrarea datelor mele în scopul răspunsului la această cerere.
                </Acord>

                {submitStatus === 'error' && <EroareTrimitere />}
              </div>
            </>
          )}

          <Navigare
            onInapoi={step > 1 ? handleBack : undefined}
            onInainte={handleNext}
            dezactivat={!canContinue}
            seTrimite={submitStatus === 'loading'}
            ultimul={step === 3}
          />
        </motion.div>
      </AnimatePresence>
    </Cadru>
  );
}
