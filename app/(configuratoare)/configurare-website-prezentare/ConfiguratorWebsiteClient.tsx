'use client';

import React, { useState, useEffect } from 'react';
import { trackConversions } from '@/lib/gtm';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  User,
  Building2,
  Target,
  Calendar,
  Presentation,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Send,
  CheckCircle2,
  Check,
  AlertTriangle,
  Lightbulb,
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

type WebsiteData = {
  tipEntitate: string;
  industrie: string;
  altDomeniu: string;
  nrPagini: string;
  obiectiv: string;
  nume: string;
  email: string;
  telefon: string;
  observatii: string;
  acordPrivacitate: boolean;
};

const INITIAL_DATA: WebsiteData = {
  tipEntitate: '',
  industrie: '',
  altDomeniu: '',
  nrPagini: '',
  obiectiv: '',
  nume: '',
  email: '',
  telefon: '',
  observatii: '',
  acordPrivacitate: false,
};

const LS_KEY = 'inovex_config_wp';

const STEPS = ['Entitate & Industrie', 'Structură', 'Contact'];

const INDUSTRII = [
  'Construcții',
  'Auto',
  'Pensiuni',
  'Restaurant',
  'Imobiliare',
  'Transport',
  'Fitness',
  'Alt domeniu',
];

const STIAI_CA: Record<number, string> = {
  1: 'Astăzi, 81% din consumatori caută online înainte de a contacta o firmă. Fără un website profesional, pierzi clienți în fiecare zi în favoarea concurenților.',
  2: 'Un website bine construit este cel mai rentabil instrument de marketing pe termen lung. Spre deosebire de reclamele plătite, un site optimizat îți aduce clienți și fără buget publicitar.',
};

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

function IndustryCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-[180ms] text-center w-full"
      style={{
        background: selected ? '#EAF5FF' : '#FFFFFF',
        border: `1.5px solid ${selected ? '#2B8FCC' : '#E8ECF0'}`,
        color: selected ? '#2B8FCC' : '#4A5568',
        boxShadow: selected ? '0 0 0 3px rgba(43,143,204,0.12)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function CounterCard({
  value,
  sublabel,
  selected,
  onClick,
}: {
  value: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-center p-5 rounded-xl transition-all duration-[180ms] w-full"
      style={{
        background: selected ? '#EAF5FF' : '#FFFFFF',
        border: `1.5px solid ${selected ? '#2B8FCC' : '#E8ECF0'}`,
        boxShadow: selected ? '0 0 0 3px rgba(43,143,204,0.12)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: selected ? '#2B8FCC' : '#0D1117',
        }}
      >
        {value}
      </span>
      {sublabel && (
        <span style={{ fontSize: '12px', color: selected ? '#2B8FCC' : '#8A94A6' }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#8A94A6',
        marginBottom: '12px',
        marginTop: '24px',
      }}
    >
      {text}
    </p>
  );
}

function StiaiCaBanner({ tip }: { tip: string }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl px-4 py-3 mt-8"
      style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
    >
      <Lightbulb size={16} className="shrink-0 mt-0.5" style={{ color: '#D97706' }} />
      <p style={{ fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
        <strong style={{ color: '#78350F' }}>Știai că?</strong> {tip}
      </p>
    </div>
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
      aria-label="Pași configurator"
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

export function ConfiguratorWebsiteClient() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<WebsiteData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof WebsiteData, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

  /* localStorage restore */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setData(JSON.parse(saved) as WebsiteData);
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

  /* ---- canContinue per step ---- */
  const industrie1Valid =
    data.industrie !== '' &&
    (data.industrie !== 'Alt domeniu' || data.altDomeniu.trim() !== '');

  const canContinue =
    step === 1
      ? data.tipEntitate === 'Persoana juridica' && industrie1Valid
      : step === 2
        ? data.nrPagini !== '' && data.obiectiv !== ''
        : data.nume.length >= 2 &&
          data.email.includes('@') &&
          data.telefon.length >= 10 &&
          data.acordPrivacitate;

  /* ---- validate step 3 ---- */
  const validateStep3 = (): boolean => {
    const newErrors: Partial<Record<keyof WebsiteData, string>> = {};
    if (!data.nume || data.nume.length < 2) newErrors.nume = 'Minim 2 caractere';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Email invalid';
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = 'Minim 10 cifre';
    if (!data.acordPrivacitate) newErrors.acordPrivacitate = 'Obligatoriu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- submit ---- */
  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitStatus('loading');
    try {
      const payload = {
        ...data,
        industrie: data.industrie === 'Alt domeniu' ? data.altDomeniu.trim() : data.industrie,
      };
      const res = await fetch('/api/configurator/website-prezentare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorWebsite();
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
    initial: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * 20,
    }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * -20,
    }),
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
          Cererea ta a fost trimisă cu succes!
        </h2>
        <p style={{ fontSize: '1.0625rem', color: '#4A5568', lineHeight: 1.7 }} className="mb-8">
          Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile
          proiectului tău.
        </p>
        <div className="bg-[#EAF5FF] border border-[#C8E6F8] rounded-xl p-5 mb-8 text-left">
          <p style={{ fontSize: '14px', color: '#0D1117', fontWeight: 600 }} className="mb-1">
            Verificați telefonul și emailul în următoarele ore.
          </p>
          <p style={{ fontSize: '13px', color: '#4A5568' }}>
            Numărul nostru: <strong>0750 456 096</strong>
          </p>
        </div>
        <Button href="/">Înapoi la inovex.ro</Button>
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
          Peste 200 de website-uri profesionale livrate pentru firme din România
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
                  Ești persoană fizică sau juridică?
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#4A5568',
                    marginBottom: '24px',
                  }}
                >
                  Alege tipul de entitate cu care vei semna contractul.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <OptionCard
                    icon={User}
                    label="Persoană fizică"
                    sublabel="Fără firmă înregistrată"
                    selected={data.tipEntitate === 'Persoana fizica'}
                    onClick={() => setData((p) => ({ ...p, tipEntitate: 'Persoana fizica' }))}
                  />
                  <OptionCard
                    icon={Building2}
                    label="Persoană juridică"
                    sublabel="SRL, PFA, II, SA"
                    selected={data.tipEntitate === 'Persoana juridica'}
                    onClick={() => setData((p) => ({ ...p, tipEntitate: 'Persoana juridica' }))}
                  />
                </div>

                {/* Amber warning for PF */}
                {data.tipEntitate === 'Persoana fizica' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-xl px-4 py-3 mt-4"
                    style={{ background: '#FFFBEB', border: '1px solid #FCD34D' }}
                  >
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                    <p style={{ fontSize: '13px', color: '#92400E', lineHeight: 1.6 }}>
                      <strong style={{ color: '#78350F' }}>Ne pare rău, lucrăm doar cu persoane juridice.</strong>{' '}
                      Pentru a crea un website de prezentare ai nevoie de o firmă înregistrată (SRL, PFA, II, SA).
                      Dacă ai deja una, selectează <strong>Persoană juridică</strong>.
                    </p>
                  </motion.div>
                )}

                {/* Industry section */}
                <SectionLabel text="În ce industrie activezi?" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INDUSTRII.map((ind) => (
                    <IndustryCard
                      key={ind}
                      label={ind}
                      selected={data.industrie === ind}
                      onClick={() => setData((p) => ({ ...p, industrie: ind, altDomeniu: '' }))}
                    />
                  ))}
                </div>

                {/* Alt domeniu input */}
                {data.industrie === 'Alt domeniu' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3"
                  >
                    <Input
                      autoFocus
                      value={data.altDomeniu}
                      onChange={(e) => setData((p) => ({ ...p, altDomeniu: e.target.value }))}
                      placeholder="Scrie domeniul tău de activitate..."
                      style={{ border: '1.5px solid #2B8FCC' }}
                    />
                  </motion.div>
                )}

                <StiaiCaBanner tip={STIAI_CA[1]} />
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
                  Cum vrei să arate site-ul?
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#4A5568',
                    marginBottom: '32px',
                  }}
                >
                  Alege structura potrivită pentru tine.
                </p>

                <SectionLabel text="Câte pagini aproximativ?" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: '1-5', sub: 'Site simplu' },
                    { value: '6-10', sub: 'Site mediu' },
                    { value: '11-20', sub: 'Site complex' },
                    { value: 'Personalizat', sub: 'Discutăm' },
                  ].map(({ value, sub }) => (
                    <CounterCard
                      key={value}
                      value={value}
                      sublabel={sub}
                      selected={data.nrPagini === value}
                      onClick={() => setData((p) => ({ ...p, nrPagini: value }))}
                    />
                  ))}
                </div>

                <SectionLabel text="Care este obiectivul principal?" />
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard
                    icon={Presentation}
                    label="Prezentare servicii"
                    sublabel="Portofoliu, servicii"
                    selected={data.obiectiv === 'Prezentare servicii'}
                    onClick={() => setData((p) => ({ ...p, obiectiv: 'Prezentare servicii' }))}
                  />
                  <OptionCard
                    icon={Target}
                    label="Generare de lead-uri"
                    sublabel="Formular de contact, telefon"
                    selected={data.obiectiv === 'Generare de lead-uri'}
                    onClick={() => setData((p) => ({ ...p, obiectiv: 'Generare de lead-uri' }))}
                  />
                  <OptionCard
                    icon={Calendar}
                    label="Rezervări online"
                    sublabel="Programări, booking"
                    selected={data.obiectiv === 'Rezervari online'}
                    onClick={() => setData((p) => ({ ...p, obiectiv: 'Rezervari online' }))}
                  />
                  <OptionCard
                    icon={HelpCircle}
                    label="Nu știu încă"
                    sublabel="Mă ajutați voi"
                    selected={data.obiectiv === 'Nu stiu inca'}
                    onClick={() => setData((p) => ({ ...p, obiectiv: 'Nu stiu inca' }))}
                  />
                </div>

                <StiaiCaBanner tip={STIAI_CA[2]} />
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
                  Ultimul pas - datele tale de contact
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#4A5568',
                    marginBottom: '32px',
                  }}
                >
                  Te contactăm în maximum 24 de ore cu o propunere.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wp-nume">Nume complet *</Label>
                      <Input
                        id="wp-nume"
                        value={data.nume}
                        onChange={(e) => setData((p) => ({ ...p, nume: e.target.value }))}
                        placeholder="Ion Popescu"
                        aria-invalid={!!errors.nume}
                      />
                      {errors.nume && (
                        <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.nume}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wp-email">Email *</Label>
                      <Input
                        id="wp-email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="ion@companie.ro"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="wp-telefon">Telefon *</Label>
                    <Input
                      id="wp-telefon"
                      type="tel"
                      value={data.telefon}
                      onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                      placeholder="0750 456 096"
                      aria-invalid={!!errors.telefon}
                    />
                    {errors.telefon && (
                      <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.telefon}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="wp-observatii">
                      Alte observații{' '}
                      <span style={{ color: '#8A94A6', fontWeight: 400 }}>(opțional)</span>
                    </Label>
                    <Textarea
                      id="wp-observatii"
                      rows={4}
                      value={data.observatii}
                      onChange={(e) => setData((p) => ({ ...p, observatii: e.target.value }))}
                      placeholder="Orice detalii suplimentare despre proiect..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="wp-gdpr"
                      checked={data.acordPrivacitate}
                      onCheckedChange={(checked) =>
                        setData((p) => ({ ...p, acordPrivacitate: checked === true }))
                      }
                      aria-invalid={!!errors.acordPrivacitate}
                    />
                    <Label htmlFor="wp-gdpr" className="cursor-pointer leading-relaxed">
                      Sunt de acord cu{' '}
                      <Link
                        href="/politica-de-confidentialitate"
                        className="text-[#2B8FCC] hover:underline"
                        target="_blank"
                      >
                        Politica de Confidențialitate
                      </Link>
                    </Label>
                  </div>
                  {errors.acordPrivacitate && (
                    <p style={{ fontSize: '12px', color: '#EF4444' }}>
                      {errors.acordPrivacitate}
                    </p>
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
                      A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi telefonic.
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack} leftIcon={<ArrowLeft size={16} />}>
                  Înapoi
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
                {step === 3 ? 'Trimite cererea' : 'Continuă'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
