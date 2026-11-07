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
  type LucideIcon,
} from 'lucide-react';
import type { TextConfiguratoare } from '@/lib/i18n/pagini/configuratoare';
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
  useConfigurator,
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

// textele vin in limba paginii din lib/i18n/pagini/configuratoare.ts; valorile trimise raman aceleasi,
// iar iconitele se aleg dupa valoare
const ICON_AFACERE: Record<string, LucideIcon> = {
  'magazin-online': ShoppingCart,
  'prestari-servicii': Briefcase,
  'afacere-locala': MapPin,
  'alt-tip': LayoutGrid,
};
const ICON_PROCES: Record<string, LucideIcon> = {
  'comunicare-clienti': MessageCircle,
  'confirmare-comenzi': CheckSquare,
  'gestionare-date': Database,
  'taskuri-interne': Repeat,
  'facturi-documente': FileText,
  altceva: Sparkles,
};

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

export function ConfiguratorAutomatizariClient({ t }: { t: TextConfiguratoare['automatizari'] }) {
  const { lang, t: c } = useConfigurator();
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
    if (!data.numeComplet || data.numeComplet.length < 2) newErrors.numeComplet = c.erori.nume;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = c.erori.email;
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = c.erori.telefon;
    if (!data.gdprConsent) newErrors.gdprConsent = c.erori.acord;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- validate step 2 ---- */
  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof AutomatizariData | 'proceseMin', string>> = {};
    if (data.proceseAutomatizare.length === 0) {
      newErrors.proceseMin = t.erori.procese;
    }
    if (altcevaSelected && data.descriereAltceva.trim().length < 10) {
      newErrors.descriereAltceva = t.erori.altceva;
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
        // limba paginii: confirmarea pleaca in limba clientului, iar in CRM sursa o arata
        body: JSON.stringify({ ...data, gdprConsent: true, limba: lang }),
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
    return <Succes text={t.succes} />;
  }

  /* ---------------------------------------------------------------- */
  /*  MAIN RENDER                                                       */
  /* ---------------------------------------------------------------- */
  return (
    <Cadru anunt={t.anunt} pasi={t.pasi} pas={step}>
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
              <Titlu>{t.afacere.titlu}</Titlu>
              <Subtitlu>{t.afacere.subtitlu}</Subtitlu>

              <Intrebare>{t.afacere.intrebare}</Intrebare>

              <Grila telefon={2} mare={4}>
                {t.tipuri.map((o) => (
                  <CardOptiune
                    key={o.valoare}
                    icon={ICON_AFACERE[o.valoare]}
                    label={o.eticheta}
                    sublabel={o.desc}
                    selected={data.tipAfacere === o.valoare}
                    onClick={() => setData((p) => ({ ...p, tipAfacere: o.valoare }))}
                  />
                ))}
              </Grila>

              <StiaiCaBanner text={t.stiaiCa[0]} visible={stiaiVisible} />
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>{t.procese.titlu}</Titlu>
              <Subtitlu>{t.procese.subtitlu}</Subtitlu>

              <Intrebare>{t.procese.intrebare}</Intrebare>

              <Grila telefon={2} mare={3}>
                {t.listaProcese.map((o) => (
                  <CardOptiune
                    key={o.valoare}
                    multipla
                    icon={ICON_PROCES[o.valoare]}
                    label={o.eticheta}
                    sublabel={o.desc}
                    selected={data.proceseAutomatizare.includes(o.valoare)}
                    onClick={() => toggleProces(o.valoare)}
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
                    <Camp id="aut-altceva" eticheta={t.altceva}>
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
                        placeholder={t.exAltceva}
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

              <StiaiCaBanner text={t.stiaiCa[1]} visible={stiaiVisible} />
            </>
          )}

          {/* ---- STEP 3 ---- */}
          {step === 3 && (
            <>
              <Titlu>{t.contact.titlu}</Titlu>
              <Subtitlu>{t.contact.subtitlu}</Subtitlu>

              <div className={f.formular}>
                <Camp id="aut-nume" eticheta={c.contact.nume} eroare={errors.numeComplet}>
                  <input
                    id="aut-nume"
                    className={f.input}
                    value={data.numeComplet}
                    onChange={(e) => setData((p) => ({ ...p, numeComplet: e.target.value }))}
                    placeholder={t.ex.nume}
                    aria-invalid={!!errors.numeComplet}
                  />
                </Camp>

                <div className={f.rand}>
                  <Camp id="aut-email" eticheta={c.contact.email} optional eroare={errors.email}>
                    <input
                      id="aut-email"
                      type="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder={t.ex.email}
                      aria-invalid={!!errors.email}
                    />
                  </Camp>

                  <Camp id="aut-telefon" eticheta={c.contact.telefon} eroare={errors.telefon}>
                    <input
                      id="aut-telefon"
                      type="tel"
                      className={f.input}
                      value={data.telefon}
                      onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                      placeholder={t.ex.telefon}
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
                  {t.acordExtra}
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
