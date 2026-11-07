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
  type LucideIcon,
} from 'lucide-react';
import type { TextConfiguratoare } from '@/lib/i18n/pagini/configuratoare';
import {
  Acord,
  Cadru,
  Camp,
  CampAtasamente,
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

// textele vin in limba paginii din lib/i18n/pagini/configuratoare.ts; valorile trimise raman aceleasi,
// iar iconitele se aleg dupa valoare
const ICON_CLARITATE: Record<string, LucideIcon> = {
  'da-stiu-exact': Lightbulb,
  'am-o-idee': HelpCircle,
  'am-nevoie-de-ajutor': MessageSquare,
};
const ICON_TIP: Record<string, LucideIcon> = {
  'platforma-utilizatori': Users,
  marketplace: ShoppingBag,
  'aplicatie-servicii': CalendarCheck,
  'sistem-intern': Briefcase,
  'alt-tip': LayoutGrid,
};

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

export function ConfiguratorAplicatieWebClient({ t }: { t: TextConfiguratoare['aplicatie'] }) {
  const { lang, t: c } = useConfigurator();
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<AplicatieWebData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof AplicatieWebData, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [stiaiVisible, setStiaiVisible] = useState(false);
  const [descriereCount, setDescriereCount] = useState(0);
  // atasamentele de la pasul 2 (un plan, o schita): raman doar in pagina, se urca la trimitere
  const [fisiere, setFisiere] = useState<File[]>([]);
  const [eroareFisiere, setEroareFisiere] = useState<string | null>(null);
  const [seIncarca, setSeIncarca] = useState(false);
  const [eroareIncarcare, setEroareIncarcare] = useState<string | null>(null);

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
    if (!data.numeComplet || data.numeComplet.length < 2) newErrors.numeComplet = c.erori.nume;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = c.erori.email;
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = c.erori.telefon;
    if (!data.gdprConsent) newErrors.gdprConsent = c.erori.acord;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Urca atasamentele direct in storage, prin URL-uri semnate (ca la Motion Design); intoarce id-ul lor. */
  const incarcaAtasamente = async (): Promise<string> => {
    const res = await fetch('/api/configurator/aplicatie-web/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fisiere: fisiere.map((x) => ({ nume: x.name, marime: x.size })), limba: lang }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.id) throw new Error(json.error || t.atasamente.eroare);
    await Promise.all(
      fisiere.map(async (fisier, i) => {
        const body = new FormData();
        body.append('cacheControl', '3600');
        body.append('', fisier);
        const up = await fetch(json.incarcari[i].url, { method: 'PUT', body });
        if (!up.ok) throw new Error(t.atasamente.eroare);
      }),
    );
    return json.id;
  };

  /* ---- submit ---- */
  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitStatus('loading');
    setEroareIncarcare(null);
    const metaEventId = generateEventId();

    // intai atasamentele; daca nu urca, cererea nu pleaca: clientul poate reincerca sau le poate scoate
    let atasamenteId: string | undefined;
    if (fisiere.length) {
      setSeIncarca(true);
      try {
        atasamenteId = await incarcaAtasamente();
      } catch (err) {
        setEroareIncarcare(err instanceof Error ? err.message : t.atasamente.eroare);
        setSubmitStatus('idle');
        return;
      } finally {
        setSeIncarca(false);
      }
    }

    try {
      const res = await fetch('/api/configurator/aplicatie-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        // limba paginii: confirmarea pleaca in limba clientului, iar in CRM sursa o arata
        body: JSON.stringify({ ...data, gdprConsent: true, limba: lang, atasamenteId }),
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
              <Titlu>{t.idee.titlu}</Titlu>
              <Subtitlu>{t.idee.subtitlu}</Subtitlu>

              <Intrebare>{t.idee.intrebare}</Intrebare>

              <Grila telefon={1} mare={3}>
                {t.claritate.map((o) => (
                  <CardOptiune
                    key={o.valoare}
                    icon={ICON_CLARITATE[o.valoare]}
                    label={o.eticheta}
                    sublabel={o.desc}
                    selected={data.ideaClaritate === o.valoare}
                    onClick={() => setData((p) => ({ ...p, ideaClaritate: o.valoare }))}
                  />
                ))}
              </Grila>

              <StiaiCaAnimat visible={stiaiVisible}>{t.stiaiCa[0]}</StiaiCaAnimat>
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>{t.tip.titlu}</Titlu>
              <Subtitlu>{t.tip.subtitlu}</Subtitlu>

              <Intrebare>{t.tip.intrebare}</Intrebare>

              <Grila telefon={1} mare={2}>
                {t.tipuri.map((o) => (
                  <CardOptiune
                    key={o.valoare}
                    icon={ICON_TIP[o.valoare]}
                    label={o.eticheta}
                    sublabel={o.desc}
                    selected={data.tipAplicatie === o.valoare}
                    onClick={() => setData((p) => ({ ...p, tipAplicatie: o.valoare }))}
                  />
                ))}
              </Grila>

              <div className={f.formular} style={{ marginTop: '24px' }}>
                <Camp id="aw-descriere" eticheta={t.descriere} optional>
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
                    placeholder={t.exDescriere}
                  />
                  <span style={{ fontSize: '12px', color: '#8A94A6', textAlign: 'right' }}>
                    {descriereCount} / 500
                  </span>
                </Camp>

                <CampAtasamente
                  id="aw-atasamente"
                  t={t.atasamente}
                  fisiere={fisiere}
                  onSchimba={(noi) => {
                    setFisiere(noi);
                    setEroareIncarcare(null);
                  }}
                  eroare={eroareFisiere}
                  onEroare={setEroareFisiere}
                  dezactivat={submitStatus === 'loading'}
                />
              </div>

              <StiaiCaAnimat visible={stiaiVisible}>{t.stiaiCa[1]}</StiaiCaAnimat>
            </>
          )}

          {/* ---- STEP 3 ---- */}
          {step === 3 && (
            <>
              <Titlu>{t.contact.titlu}</Titlu>
              <Subtitlu>{t.contact.subtitlu}</Subtitlu>

              <div className={f.formular}>
                <Camp id="aw-nume" eticheta={c.contact.nume} eroare={errors.numeComplet}>
                  <input
                    id="aw-nume"
                    autoComplete="name"
                    className={f.input}
                    value={data.numeComplet}
                    onChange={(e) => setData((p) => ({ ...p, numeComplet: e.target.value }))}
                    placeholder={t.ex.nume}
                    aria-invalid={!!errors.numeComplet}
                  />
                </Camp>

                <div className={f.rand}>
                  <Camp id="aw-email" eticheta={c.contact.email} optional eroare={errors.email}>
                    <input
                      id="aw-email"
                      type="email"
                      autoComplete="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder={t.ex.email}
                      aria-invalid={!!errors.email}
                    />
                  </Camp>
                  <Camp id="aw-telefon" eticheta={c.contact.telefon} eroare={errors.telefon}>
                    <input
                      id="aw-telefon"
                      type="tel"
                      autoComplete="tel"
                      className={f.input}
                      value={data.telefon}
                      onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                      placeholder={t.ex.telefon}
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
                  {t.acordExtra}
                </Acord>

                {eroareIncarcare && <EroareTrimitere text={eroareIncarcare} />}
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
            textInCurs={seIncarca ? t.atasamente.seIncarca : undefined}
          />
        </motion.div>
      </AnimatePresence>
    </Cadru>
  );
}
