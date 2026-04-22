'use client';

import React, { useState, useEffect } from 'react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
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
  ArrowLeft,
  ArrowRight,
  Send,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

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

function OptionCard({
  icon: Icon,
  label,
  sublabel,
  selected,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-center p-4 rounded-xl transition-all duration-[180ms] w-full"
      style={{
        background: selected ? '#EAF5FF' : '#FFFFFF',
        border: `1.5px solid ${selected ? '#2B8FCC' : '#E8ECF0'}`,
        boxShadow: selected ? '0 0 0 3px rgba(43,143,204,0.12)' : 'none',
        color: selected ? '#2B8FCC' : '#0D1117',
      }}
    >
      <Icon size={28} color={selected ? '#2B8FCC' : '#8A94A6'} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px' }}>
        {label}
      </span>
      {sublabel && (
        <span style={{ fontSize: '12px', color: selected ? '#2B8FCC' : '#8A94A6' }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

function MultiCard({
  icon: Icon,
  label,
  sublabel,
  selected,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center gap-2 text-center p-4 rounded-xl transition-all duration-[180ms] w-full"
      style={{
        background: selected ? '#EAF5FF' : '#FFFFFF',
        border: `1.5px solid ${selected ? '#2B8FCC' : '#E8ECF0'}`,
        boxShadow: selected ? '0 0 0 3px rgba(43,143,204,0.12)' : 'none',
        color: selected ? '#2B8FCC' : '#0D1117',
      }}
    >
      {selected && (
        <div
          className="absolute top-2 right-2 flex items-center justify-center rounded-full"
          style={{ width: '18px', height: '18px', background: '#2B8FCC' }}
        >
          <Check size={10} color="#FFFFFF" strokeWidth={3} />
        </div>
      )}
      <Icon size={28} color={selected ? '#2B8FCC' : '#8A94A6'} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px' }}>
        {label}
      </span>
      {sublabel && (
        <span style={{ fontSize: '12px', color: selected ? '#2B8FCC' : '#8A94A6' }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

function StiaiCaBanner({ text, visible }: { text: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex items-start gap-3"
          style={{
            background: '#EAF5FF',
            borderLeft: '4px solid #2B8FCC',
            borderRadius: '0 8px 8px 0',
            padding: '14px 20px',
            marginTop: '24px',
          }}
        >
          <Sparkles size={16} className="shrink-0" style={{ color: '#2B8FCC', marginTop: '2px' }} />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#1a6fa8',
              lineHeight: 1.65,
            }}
          >
            {text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar                                                        */
/* ------------------------------------------------------------------ */

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div
      className="bg-white border-b border-[#F0F0F0] py-5"
      role="navigation"
      aria-label="Pasi configurator"
    >
      <div className="max-w-[640px] mx-auto px-4">
        <div className="flex items-center">
          {STEPS.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isActive = currentStep === stepNum;
            return (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isCompleted ? '#10B981' : isActive ? '#2B8FCC' : '#FFFFFF',
                      border: isCompleted
                        ? '1.5px solid #10B981'
                        : isActive
                          ? '1.5px solid #2B8FCC'
                          : '1.5px solid #E8ECF0',
                    }}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
                    ) : (
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: isActive ? '#FFFFFF' : '#8A94A6',
                        }}
                      >
                        {stepNum}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: isActive ? '#2B8FCC' : '#8A94A6',
                    }}
                  >
                    {label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-px mx-2 mb-5 transition-all duration-300"
                    style={{ background: currentStep > stepNum ? '#10B981' : '#E8ECF0' }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
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
    if (!data.numeComplet || data.numeComplet.length < 2) newErrors.numeComplet = 'Minim 2 caractere';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Email invalid';
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = 'Minim 10 cifre';
    if (!data.gdprConsent) newErrors.gdprConsent = 'Obligatoriu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- validate step 2 ---- */
  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof AutomatizariData | 'proceseMin', string>> = {};
    if (data.proceseAutomatizare.length === 0) {
      newErrors.proceseMin = 'Te rugam sa selectezi cel putin un proces';
    }
    if (altcevaSelected && data.descriereAltceva.trim().length < 10) {
      newErrors.descriereAltceva = 'Te rugam sa descrii ce proces vrei sa automatizezi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- submit ---- */
  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitStatus('loading');
    try {
      const res = await fetch('/api/configurator/automatizari-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, gdprConsent: true }),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorAutomatizari();
        trackTikTok.configuratorAutomatizari();
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
    return (
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[640px] mx-auto px-4 py-16 text-center"
      >
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          <CheckCircle2 size={64} className="text-[#10B981] mx-auto mb-6" />
        </motion.div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 'clamp(1.6rem,2.5vw,2rem)',
            color: '#0D1117',
          }}
          className="mb-3"
        >
          Cererea ta a fost trimisa cu succes!
        </h2>
        <p style={{ fontSize: '1.0625rem', color: '#4A5568', lineHeight: 1.7 }} className="mb-8">
          Un specialist Inovex in automatizari te va contacta in maximum 24 de ore.
        </p>
        <div className="bg-[#EAF5FF] border border-[#C8E6F8] rounded-xl p-5 mb-8 text-left">
          <p style={{ fontSize: '14px', color: '#0D1117', fontWeight: 600 }} className="mb-1">
            Verifica telefonul si emailul in urmatoarele ore.
          </p>
          <p style={{ fontSize: '13px', color: '#4A5568' }}>
            Numarul nostru: <strong>0750 456 096</strong>
          </p>
        </div>
        <Button href="/">Inapoi la inovex.ro</Button>
      </motion.div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  MAIN RENDER                                                       */
  /* ---------------------------------------------------------------- */
  return (
    <>
      {/* Announcement bar */}
      <div
        className="flex items-center justify-center"
        style={{ background: '#2B8FCC', height: '40px', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '14px',
            color: '#FFFFFF',
          }}
        >
          Automatizarile AI pot economisi zilnic ore intregi echipei tale
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar currentStep={step} />

      {/* Step content */}
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-10">
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
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.6rem,2.5vw,2rem)',
                    color: '#0D1117',
                    marginBottom: '8px',
                  }}
                >
                  Hai sa configuram automatizarile tale
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#4A5568',
                    marginBottom: '24px',
                  }}
                >
                  Cateva intrebari rapide pentru a intelege afacerea ta
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: '#0D1117',
                    marginBottom: '20px',
                  }}
                >
                  Tip afacere
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: 'magazin-online',    icon: ShoppingCart, label: 'Magazin online',     sub: 'eCommerce, vanzari produse online' },
                    { value: 'prestari-servicii', icon: Briefcase,    label: 'Prestari servicii',  sub: 'Consultanta, servicii profesionale' },
                    { value: 'afacere-locala',    icon: MapPin,       label: 'Afacere locala',     sub: 'Clinica, salon, restaurant, etc.' },
                    { value: 'alt-tip',           icon: LayoutGrid,   label: 'Alt tip',            sub: 'Alta categorie de business' },
                  ].map(({ value, icon, label, sub }) => (
                    <OptionCard
                      key={value}
                      icon={icon}
                      label={label}
                      sublabel={sub}
                      selected={data.tipAfacere === value}
                      onClick={() => setData((p) => ({ ...p, tipAfacere: value }))}
                    />
                  ))}
                </div>

                <StiaiCaBanner
                  text="Stiai ca majoritatea afacerilor pierd zilnic ore intregi pe taskuri repetitive?"
                  visible={stiaiVisible}
                />
              </>
            )}

            {/* ---- STEP 2 ---- */}
            {step === 2 && (
              <>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.6rem,2.5vw,2rem)',
                    color: '#0D1117',
                    marginBottom: '8px',
                  }}
                >
                  Ce vrei sa automatizezi?
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#4A5568',
                    marginBottom: '24px',
                  }}
                >
                  Poti selecta mai multe variante
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: '#0D1117',
                    marginBottom: '20px',
                  }}
                >
                  Ce procese doresti sa automatizezi?
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'comunicare-clienti',  icon: MessageCircle, label: 'Comunicarea cu clientii',               sub: 'Mesaje, emailuri automate' },
                    { value: 'confirmare-comenzi',  icon: CheckSquare,   label: 'Confirmarea comenzilor',                sub: 'Notificari si confirmare automata' },
                    { value: 'gestionare-date',     icon: Database,      label: 'Introducerea / gestionarea datelor',    sub: 'Actualizare automata baze de date' },
                    { value: 'taskuri-interne',     icon: Repeat,        label: 'Taskuri repetitive interne',            sub: 'Procese recurente ale echipei' },
                    { value: 'facturi-documente',   icon: FileText,      label: 'Facturi / documente',                   sub: 'Generare si trimitere automata' },
                    { value: 'altceva',             icon: Sparkles,      label: 'Altceva',                               sub: 'Descrie mai jos ce ai nevoie' },
                  ].map(({ value, icon, label, sub }) => (
                    <MultiCard
                      key={value}
                      icon={icon}
                      label={label}
                      sublabel={sub}
                      selected={data.proceseAutomatizare.includes(value)}
                      onClick={() => toggleProces(value)}
                    />
                  ))}
                </div>

                {errors.proceseMin && (
                  <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '8px' }}>
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
                      className="flex flex-col gap-1.5 mt-4"
                    >
                      <Label htmlFor="aut-altceva">
                        Descrie pe scurt ce vrei sa automatizezi *
                      </Label>
                      <Textarea
                        id="aut-altceva"
                        value={data.descriereAltceva}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 500);
                          setData((p) => ({ ...p, descriereAltceva: val }));
                          setAltcevaCount(val.length);
                          setErrors((er) => ({ ...er, descriereAltceva: undefined }));
                        }}
                        placeholder="Ex: Vreau sa automatizez trimiterea rapoartelor saptamanale pe email catre echipa mea..."
                        style={{ minHeight: '80px' }}
                        aria-invalid={!!errors.descriereAltceva}
                      />
                      <div className="flex items-center justify-between">
                        {errors.descriereAltceva ? (
                          <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.descriereAltceva}</p>
                        ) : (
                          <span />
                        )}
                        <span style={{ fontSize: '12px', color: '#8A94A6' }}>
                          {altcevaCount} / 500
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <StiaiCaBanner
                  text="Stiai ca automatizarea proceselor poate reduce semnificativ costurile operationale?"
                  visible={stiaiVisible}
                />
              </>
            )}

            {/* ---- STEP 3 ---- */}
            {step === 3 && (
              <>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.6rem,2.5vw,2rem)',
                    color: '#0D1117',
                    marginBottom: '8px',
                  }}
                >
                  Aproape gata!
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#4A5568',
                    marginBottom: '32px',
                  }}
                >
                  Un specialist Inovex in automatizari iti va raspunde in maximum 24 de ore.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="aut-nume">Nume complet *</Label>
                    <Input
                      id="aut-nume"
                      value={data.numeComplet}
                      onChange={(e) => setData((p) => ({ ...p, numeComplet: e.target.value }))}
                      placeholder="Numele tau complet"
                      aria-invalid={!!errors.numeComplet}
                    />
                    {errors.numeComplet && (
                      <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.numeComplet}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="aut-email">
                      Email{' '}
                      <span style={{ color: '#8A94A6', fontWeight: 400 }}>(optional)</span>
                    </Label>
                    <Input
                      id="aut-email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="adresa@email.ro"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.email}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="aut-telefon">Telefon *</Label>
                    <Input
                      id="aut-telefon"
                      type="tel"
                      value={data.telefon}
                      onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                      placeholder="07XX XXX XXX"
                      aria-invalid={!!errors.telefon}
                    />
                    {errors.telefon && (
                      <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.telefon}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="aut-gdpr"
                      checked={data.gdprConsent}
                      onCheckedChange={(checked) =>
                        setData((p) => ({ ...p, gdprConsent: checked === true }))
                      }
                      aria-invalid={!!errors.gdprConsent}
                      className="shrink-0 mt-0.5"
                    />
                    <Label htmlFor="aut-gdpr" className="cursor-pointer leading-relaxed">
                      Sunt de acord cu{' '}
                      <Link
                        href="/politica-de-confidentialitate"
                        className="text-[#2B8FCC] hover:underline"
                        target="_blank"
                      >
                        Politica de Confidentialitate
                      </Link>{' '}
                      si prelucrarea datelor mele in scopul raspunsului la aceasta cerere.
                    </Label>
                  </div>
                  {errors.gdprConsent && (
                    <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.gdprConsent}</p>
                  )}

                  {submitStatus === 'error' && (
                    <div
                      className="rounded-lg px-4 py-3"
                      style={{
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        fontSize: '14px',
                        color: '#DC2626',
                      }}
                    >
                      A aparut o eroare. Te rugam sa incerci din nou sau sa ne contactezi telefonic.
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack} leftIcon={<ArrowLeft size={16} />}>
                  Inapoi
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={handleNext}
                disabled={!canContinue}
                loading={submitStatus === 'loading'}
                rightIcon={step === 3 ? <Send size={16} /> : <ArrowRight size={16} />}
              >
                {step === 3 ? 'Trimite cererea' : 'Continua'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
