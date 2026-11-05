'use client';

import { useState, useEffect } from 'react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Briefcase,
  MapPin,
  LayoutGrid,
  MessageCircle,
  CheckSquare,
  Database,
  Repeat,
  FileText,
  Sparkles,
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

type AutomatizariData = {
  tipAfacere: string;
  proceseAutomatizare: string[];
  descriereAltceva: string;
  numeComplet: string;
  email: string;
  telefon: string;
  gdprConsent: boolean;
};

const INITIAL_DATA: AutomatizariData = {
  tipAfacere: '',
  proceseAutomatizare: [],
  descriereAltceva: '',
  numeComplet: '',
  email: '',
  telefon: '',
  gdprConsent: false,
};

const LS_KEY = 'inovex_configurator_automatizari_ai';

const STEPS = ['Tipul afacerii', 'Ce automatizezi', 'Contact'];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

// „Știai că?” din kit, care apare animat cand `visible` devine true
function StiaiCaBanner({ text, visible }: { text: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <StiaiCa>{text}</StiaiCa>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Main client component                                               */
/* ------------------------------------------------------------------ */

export function ConfiguratorAutomatizariClient() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<AutomatizariData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof AutomatizariData | 'proceseMin', string>>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [stiaiVisible, setStiaiVisible] = useState(false);
  const [altcevaCount, setAltcevaCount] = useState(0);

  /* localStorage restore */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AutomatizariData;
        setData(parsed);
        setAltcevaCount(parsed.descriereAltceva?.length ?? 0);
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

  const altcevaSelected = data.proceseAutomatizare.includes('altceva');

  /* ---- toggle multi-select ---- */
  const toggleProces = (value: string) => {
    setData((p) => ({
      ...p,
      proceseAutomatizare: p.proceseAutomatizare.includes(value)
        ? p.proceseAutomatizare.filter((v) => v !== value)
        : [...p.proceseAutomatizare, value],
    }));
    setErrors((e) => ({ ...e, proceseMin: undefined }));
  };

  /* ---- canContinue per step ---- */
  const altcevaValid = !altcevaSelected || data.descriereAltceva.trim().length >= 10;

  const canContinue =
    step === 1
      ? data.tipAfacere !== ''
      : step === 2
        ? data.proceseAutomatizare.length > 0 && altcevaValid
        : data.numeComplet.length >= 2 &&
          data.telefon.length >= 10 &&
          data.gdprConsent;

  /* ---- validate step 3 ---- */
  const validateStep3 = (): boolean => {
    const newErrors: Partial<Record<keyof AutomatizariData | 'proceseMin', string>> = {};
    if (!data.numeComplet || data.numeComplet.length < 2) newErrors.numeComplet = 'Numele trebuie să aibă cel puțin 2 caractere';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Email invalid';
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = 'Telefonul trebuie să aibă cel puțin 10 cifre';
    if (!data.gdprConsent) newErrors.gdprConsent = 'Trebuie să accepți politica de confidențialitate';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- validate step 2 ---- */
  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof AutomatizariData | 'proceseMin', string>> = {};
    if (data.proceseAutomatizare.length === 0) {
      newErrors.proceseMin = 'Te rugăm să alegi cel puțin un proces';
    }
    if (altcevaSelected && data.descriereAltceva.trim().length < 10) {
      newErrors.descriereAltceva = 'Te rugăm să descrii ce proces vrei să automatizezi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- submit ---- */
  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitStatus('loading');
    const metaEventId = generateEventId();
    try {
      const res = await fetch('/api/configurator/automatizari-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        body: JSON.stringify({ ...data, gdprConsent: true }),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorAutomatizari(metaEventId);
        trackTikTok.configuratorAutomatizari();
        trackEvent('Lead', { content_name: 'configurator_automatizari_ai' }, metaEventId);
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
    if (step === 2 && !validateStep2()) return;
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
    return <Succes text="Un specialist Inovex în automatizări te va contacta în maximum 24 de ore." />;
  }

  /* ---------------------------------------------------------------- */
  /*  MAIN RENDER                                                       */
  /* ---------------------------------------------------------------- */
  return (
    <Cadru anunt="Automatizările AI pot economisi zilnic ore întregi echipei tale" pasi={STEPS} pas={step}>
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
              <Titlu>Hai să configurăm automatizările tale</Titlu>
              <Subtitlu>Câteva întrebări rapide pentru a înțelege afacerea ta</Subtitlu>

              <Intrebare>Tip afacere</Intrebare>

              <Grila telefon={2} mare={4}>
                {[
                  { value: 'magazin-online',    icon: ShoppingCart, label: 'Magazin online',     sub: 'eCommerce, vânzări produse online' },
                  { value: 'prestari-servicii', icon: Briefcase,    label: 'Prestări servicii',  sub: 'Consultanță, servicii profesionale' },
                  { value: 'afacere-locala',    icon: MapPin,       label: 'Afacere locală',     sub: 'Clinică, salon, restaurant etc.' },
                  { value: 'alt-tip',           icon: LayoutGrid,   label: 'Alt tip',            sub: 'Altă categorie de business' },
                ].map(({ value, icon, label, sub }) => (
                  <CardOptiune
                    key={value}
                    icon={icon}
                    label={label}
                    sublabel={sub}
                    selected={data.tipAfacere === value}
                    onClick={() => setData((p) => ({ ...p, tipAfacere: value }))}
                  />
                ))}
              </Grila>

              <StiaiCaBanner
                text="Majoritatea afacerilor pierd zilnic ore întregi pe taskuri repetitive."
                visible={stiaiVisible}
              />
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>Ce vrei să automatizezi?</Titlu>
              <Subtitlu>Poți selecta mai multe variante</Subtitlu>

              <Intrebare>Ce procese dorești să automatizezi?</Intrebare>

              <Grila telefon={2} mare={3}>
                {[
                  { value: 'comunicare-clienti',  icon: MessageCircle, label: 'Comunicarea cu clienții',               sub: 'Mesaje, emailuri automate' },
                  { value: 'confirmare-comenzi',  icon: CheckSquare,   label: 'Confirmarea comenzilor',                sub: 'Notificări și confirmare automată' },
                  { value: 'gestionare-date',     icon: Database,      label: 'Introducerea / gestionarea datelor',    sub: 'Actualizare automată baze de date' },
                  { value: 'taskuri-interne',     icon: Repeat,        label: 'Taskuri repetitive interne',            sub: 'Procese recurente ale echipei' },
                  { value: 'facturi-documente',   icon: FileText,      label: 'Facturi / documente',                   sub: 'Generare și trimitere automată' },
                  { value: 'altceva',             icon: Sparkles,      label: 'Altceva',                               sub: 'Descrie mai jos ce ai nevoie' },
                ].map(({ value, icon, label, sub }) => (
                  <CardOptiune
                    key={value}
                    multipla
                    icon={icon}
                    label={label}
                    sublabel={sub}
                    selected={data.proceseAutomatizare.includes(value)}
                    onClick={() => toggleProces(value)}
                  />
                ))}
              </Grila>

              {errors.proceseMin && (
                <p className={f.eroare} style={{ marginTop: '8px' }}>
                  {errors.proceseMin}
                </p>
              )}

              {/* Textarea conditionata — apare doar daca "Altceva" e selectat */}
              <AnimatePresence>
                {altcevaSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ marginTop: '16px' }}
                  >
                    <Camp id="aut-altceva" eticheta="Descrie pe scurt ce vrei să automatizezi">
                      <textarea
                        id="aut-altceva"
                        rows={3}
                        className={f.textarea}
                        value={data.descriereAltceva}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 500);
                          setData((p) => ({ ...p, descriereAltceva: val }));
                          setAltcevaCount(val.length);
                          setErrors((er) => ({ ...er, descriereAltceva: undefined }));
                        }}
                        placeholder="Ex: Vreau să automatizez trimiterea rapoartelor săptămânale pe email către echipa mea..."
                        aria-invalid={!!errors.descriereAltceva}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                        }}
                      >
                        {errors.descriereAltceva ? (
                          <p className={f.eroare}>{errors.descriereAltceva}</p>
                        ) : (
                          <span />
                        )}
                        <span className={f.indiciu} style={{ fontSize: '12px', color: '#8A94A6', flexShrink: 0 }}>
                          {altcevaCount} / 500
                        </span>
                      </div>
                    </Camp>
                  </motion.div>
                )}
              </AnimatePresence>

              <StiaiCaBanner
                text="Automatizarea proceselor poate reduce semnificativ costurile operaționale."
                visible={stiaiVisible}
              />
            </>
          )}

          {/* ---- STEP 3 ---- */}
          {step === 3 && (
            <>
              <Titlu>Aproape gata!</Titlu>
              <Subtitlu>Un specialist Inovex în automatizări îți va răspunde în maximum 24 de ore.</Subtitlu>

              <div className={f.formular}>
                <Camp id="aut-nume" eticheta="Nume complet" eroare={errors.numeComplet}>
                  <input
                    id="aut-nume"
                    className={f.input}
                    value={data.numeComplet}
                    onChange={(e) => setData((p) => ({ ...p, numeComplet: e.target.value }))}
                    placeholder="Numele tău complet"
                    aria-invalid={!!errors.numeComplet}
                  />
                </Camp>

                <div className={f.rand}>
                  <Camp id="aut-email" eticheta="Email" optional eroare={errors.email}>
                    <input
                      id="aut-email"
                      type="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="adresa@email.ro"
                      aria-invalid={!!errors.email}
                    />
                  </Camp>

                  <Camp id="aut-telefon" eticheta="Telefon" eroare={errors.telefon}>
                    <input
                      id="aut-telefon"
                      type="tel"
                      className={f.input}
                      value={data.telefon}
                      onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                      placeholder="07XX XXX XXX"
                      aria-invalid={!!errors.telefon}
                    />
                  </Camp>
                </div>

                <Acord
                  id="aut-gdpr"
                  checked={data.gdprConsent}
                  onChange={(bifat) => setData((p) => ({ ...p, gdprConsent: bifat }))}
                  eroare={errors.gdprConsent}
                >
                  {' '}și prelucrarea datelor mele în scopul răspunsului la această cerere.
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
