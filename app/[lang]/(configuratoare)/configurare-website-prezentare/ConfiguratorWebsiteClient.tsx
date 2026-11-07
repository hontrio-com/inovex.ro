'use client';

import { useState, useEffect } from 'react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { User, Building2, Target, Calendar, Presentation, HelpCircle, type LucideIcon } from 'lucide-react';
import type { TextConfiguratoare } from '@/lib/i18n/pagini/configuratoare';
import {
  Acord,
  Avertisment,
  Cadru,
  Camp,
  CardNumar,
  CardOptiune,
  CardSimplu,
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

// textele (pasii, industriile, „Știai că?” etc.) vin in limba paginii din lib/i18n/pagini/configuratoare.ts;
// valorile trimise raman cele romanesti, iar iconitele se aleg dupa valoare
const ICON_ENTITATE: Record<string, LucideIcon> = { 'Persoana fizica': User, 'Persoana juridica': Building2 };
const ICON_OBIECTIV: Record<string, LucideIcon> = {
  'Prezentare servicii': Presentation,
  'Generare de lead-uri': Target,
  'Rezervari online': Calendar,
  'Nu stiu inca': HelpCircle,
};

/* ------------------------------------------------------------------ */
/*  Main client component                                               */
/* ------------------------------------------------------------------ */

export function ConfiguratorWebsiteClient({ t }: { t: TextConfiguratoare['website'] }) {
  const { lang, t: c } = useConfigurator();
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
    if (!data.nume || data.nume.length < 2) newErrors.nume = c.erori.nume;
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = c.erori.email;
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = c.erori.telefon;
    if (!data.acordPrivacitate) newErrors.acordPrivacitate = c.erori.acord;
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
        // limba paginii: confirmarea pleaca in limba clientului, iar in CRM sursa o arata
        limba: lang,
      };
      const metaEventId = generateEventId();
      const res = await fetch('/api/configurator/website-prezentare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorWebsite(metaEventId);
        trackTikTok.configuratorWebsite();
        trackEvent('Lead', { content_name: 'configurator_website_prezentare' }, metaEventId);
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
              <Titlu>{c.entitate.titlu}</Titlu>
              <Subtitlu>{c.entitate.subtitlu}</Subtitlu>

              <Grila>
                {c.entitate.optiuni.map((o) => (
                  <CardOptiune
                    key={o.valoare}
                    icon={ICON_ENTITATE[o.valoare]}
                    label={o.eticheta}
                    sublabel={o.desc}
                    selected={data.tipEntitate === o.valoare}
                    onClick={() => setData((p) => ({ ...p, tipEntitate: o.valoare }))}
                  />
                ))}
              </Grila>

              {/* atentionare pentru persoana fizica */}
              {data.tipEntitate === 'Persoana fizica' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                  <Avertisment>
                    <strong>{t.avertisment[0]}</strong> {t.avertisment[1]}
                    <strong>{c.entitate.optiuni[1].eticheta}</strong>
                    {t.avertisment[2]}
                  </Avertisment>
                </motion.div>
              )}

              <Intrebare>{t.industrie}</Intrebare>
              <Grila telefon={2} mare={4}>
                {t.industrii.map((o) => (
                  <CardSimplu
                    key={o.valoare}
                    label={o.eticheta}
                    selected={data.industrie === o.valoare}
                    onClick={() => setData((p) => ({ ...p, industrie: o.valoare, altDomeniu: '' }))}
                  />
                ))}
              </Grila>

              {/* alt domeniu, scris de mana */}
              {data.industrie === 'Alt domeniu' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 12 }}>
                  <input
                    autoFocus
                    className={f.input}
                    aria-label={t.altDomeniu}
                    value={data.altDomeniu}
                    onChange={(e) => setData((p) => ({ ...p, altDomeniu: e.target.value }))}
                    placeholder={t.exAltDomeniu}
                  />
                </motion.div>
              )}

              <StiaiCa>{t.stiaiCa[0]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>{t.structura.titlu}</Titlu>
              <Subtitlu>{t.structura.subtitlu}</Subtitlu>

              <Intrebare>{t.pagini}</Intrebare>
              <Grila telefon={2} mare={4}>
                {t.nrPagini.map((o) => (
                  <CardNumar
                    key={o.valoare}
                    value={o.eticheta}
                    sublabel={o.desc}
                    selected={data.nrPagini === o.valoare}
                    onClick={() => setData((p) => ({ ...p, nrPagini: o.valoare }))}
                  />
                ))}
              </Grila>

              <Intrebare>{t.obiectiv}</Intrebare>
              <Grila>
                {t.obiective.map((o) => (
                  <CardOptiune
                    key={o.valoare}
                    icon={ICON_OBIECTIV[o.valoare]}
                    label={o.eticheta}
                    sublabel={o.desc}
                    selected={data.obiectiv === o.valoare}
                    onClick={() => setData((p) => ({ ...p, obiectiv: o.valoare }))}
                  />
                ))}
              </Grila>

              <StiaiCa>{t.stiaiCa[1]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 3 ---- */}
          {step === 3 && (
            <>
              <Titlu>{c.contact.titlu}</Titlu>
              <Subtitlu>{c.contact.subtitlu}</Subtitlu>

              <div className={f.formular}>
                <div className={f.rand}>
                  <Camp id="wp-nume" eticheta={c.contact.nume} eroare={errors.nume}>
                    <input
                      id="wp-nume"
                      className={f.input}
                      value={data.nume}
                      onChange={(e) => setData((p) => ({ ...p, nume: e.target.value }))}
                      placeholder={t.ex.nume}
                      aria-invalid={!!errors.nume}
                    />
                  </Camp>
                  <Camp id="wp-email" eticheta={c.contact.email} eroare={errors.email}>
                    <input
                      id="wp-email"
                      type="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder={t.ex.email}
                      aria-invalid={!!errors.email}
                    />
                  </Camp>
                </div>

                <Camp id="wp-telefon" eticheta={c.contact.telefon} eroare={errors.telefon}>
                  <input
                    id="wp-telefon"
                    type="tel"
                    className={f.input}
                    value={data.telefon}
                    onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                    placeholder={t.ex.telefon}
                    aria-invalid={!!errors.telefon}
                  />
                </Camp>

                <Camp id="wp-observatii" eticheta={c.contact.observatii} optional>
                  <textarea
                    id="wp-observatii"
                    rows={4}
                    className={f.textarea}
                    value={data.observatii}
                    onChange={(e) => setData((p) => ({ ...p, observatii: e.target.value }))}
                    placeholder={c.contact.exObservatii}
                  />
                </Camp>

                <Acord
                  id="wp-gdpr"
                  checked={data.acordPrivacitate}
                  onChange={(bifat) => setData((p) => ({ ...p, acordPrivacitate: bifat }))}
                  eroare={errors.acordPrivacitate}
                />

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
