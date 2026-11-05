'use client';

import { useState, useEffect } from 'react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { User, Building2, Target, Calendar, Presentation, HelpCircle } from 'lucide-react';
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
    if (!data.nume || data.nume.length < 2) newErrors.nume = 'Numele trebuie să aibă cel puțin 2 caractere';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Email invalid';
    if (!data.telefon || data.telefon.length < 10) newErrors.telefon = 'Telefonul trebuie să aibă cel puțin 10 cifre';
    if (!data.acordPrivacitate) newErrors.acordPrivacitate = 'Trebuie să accepți politica de confidențialitate';
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
      const metaEventId = generateEventId();
      const res = await fetch('/api/configurator/website-prezentare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorWebsite();
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
    return <Succes text="Un consultant Inovex te va contacta în maximum 24 de ore pentru a discuta detaliile proiectului tău." />;
  }

  /* ---------------------------------------------------------------- */
  /*  MAIN RENDER                                                       */
  /* ---------------------------------------------------------------- */
  return (
    <Cadru anunt="Peste 200 de website-uri profesionale livrate pentru firme din România" pasi={STEPS} pas={step}>
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
              <Titlu>Ești persoană fizică sau juridică?</Titlu>
              <Subtitlu>Alege tipul de entitate cu care vei semna contractul.</Subtitlu>

              <Grila>
                <CardOptiune
                  icon={User}
                  label="Persoană fizică"
                  sublabel="Fără firmă înregistrată"
                  selected={data.tipEntitate === 'Persoana fizica'}
                  onClick={() => setData((p) => ({ ...p, tipEntitate: 'Persoana fizica' }))}
                />
                <CardOptiune
                  icon={Building2}
                  label="Persoană juridică"
                  sublabel="SRL, PFA, II, SA"
                  selected={data.tipEntitate === 'Persoana juridica'}
                  onClick={() => setData((p) => ({ ...p, tipEntitate: 'Persoana juridica' }))}
                />
              </Grila>

              {/* atentionare pentru persoana fizica */}
              {data.tipEntitate === 'Persoana fizica' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                  <Avertisment>
                    <strong>Ne pare rău, lucrăm doar cu persoane juridice.</strong> Pentru a crea un website de
                    prezentare ai nevoie de o firmă înregistrată (SRL, PFA, II, SA). Dacă ai deja una, selectează{' '}
                    <strong>Persoană juridică</strong>.
                  </Avertisment>
                </motion.div>
              )}

              <Intrebare>În ce industrie activezi?</Intrebare>
              <Grila telefon={2} mare={4}>
                {INDUSTRII.map((ind) => (
                  <CardSimplu
                    key={ind}
                    label={ind}
                    selected={data.industrie === ind}
                    onClick={() => setData((p) => ({ ...p, industrie: ind, altDomeniu: '' }))}
                  />
                ))}
              </Grila>

              {/* alt domeniu, scris de mana */}
              {data.industrie === 'Alt domeniu' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 12 }}>
                  <input
                    autoFocus
                    className={f.input}
                    aria-label="Domeniul tău de activitate"
                    value={data.altDomeniu}
                    onChange={(e) => setData((p) => ({ ...p, altDomeniu: e.target.value }))}
                    placeholder="Scrie domeniul tău de activitate..."
                  />
                </motion.div>
              )}

              <StiaiCa>{STIAI_CA[1]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>Cum vrei să arate site-ul?</Titlu>
              <Subtitlu>Alege structura potrivită pentru tine.</Subtitlu>

              <Intrebare>Câte pagini aproximativ?</Intrebare>
              <Grila telefon={2} mare={4}>
                {[
                  { value: '1-5', sub: 'Site simplu' },
                  { value: '6-10', sub: 'Site mediu' },
                  { value: '11-20', sub: 'Site complex' },
                  { value: 'Personalizat', sub: 'Discutăm' },
                ].map(({ value, sub }) => (
                  <CardNumar
                    key={value}
                    value={value}
                    sublabel={sub}
                    selected={data.nrPagini === value}
                    onClick={() => setData((p) => ({ ...p, nrPagini: value }))}
                  />
                ))}
              </Grila>

              <Intrebare>Care este obiectivul principal?</Intrebare>
              <Grila>
                <CardOptiune
                  icon={Presentation}
                  label="Prezentare servicii"
                  sublabel="Portofoliu, servicii"
                  selected={data.obiectiv === 'Prezentare servicii'}
                  onClick={() => setData((p) => ({ ...p, obiectiv: 'Prezentare servicii' }))}
                />
                <CardOptiune
                  icon={Target}
                  label="Generare de lead-uri"
                  sublabel="Formular de contact, telefon"
                  selected={data.obiectiv === 'Generare de lead-uri'}
                  onClick={() => setData((p) => ({ ...p, obiectiv: 'Generare de lead-uri' }))}
                />
                <CardOptiune
                  icon={Calendar}
                  label="Rezervări online"
                  sublabel="Programări, booking"
                  selected={data.obiectiv === 'Rezervari online'}
                  onClick={() => setData((p) => ({ ...p, obiectiv: 'Rezervari online' }))}
                />
                <CardOptiune
                  icon={HelpCircle}
                  label="Nu știu încă"
                  sublabel="Mă ajutați voi"
                  selected={data.obiectiv === 'Nu stiu inca'}
                  onClick={() => setData((p) => ({ ...p, obiectiv: 'Nu stiu inca' }))}
                />
              </Grila>

              <StiaiCa>{STIAI_CA[2]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 3 ---- */}
          {step === 3 && (
            <>
              <Titlu>Ultimul pas: datele tale de contact</Titlu>
              <Subtitlu>Te contactăm în maximum 24 de ore cu o propunere.</Subtitlu>

              <div className={f.formular}>
                <div className={f.rand}>
                  <Camp id="wp-nume" eticheta="Nume complet" eroare={errors.nume}>
                    <input
                      id="wp-nume"
                      className={f.input}
                      value={data.nume}
                      onChange={(e) => setData((p) => ({ ...p, nume: e.target.value }))}
                      placeholder="Ion Popescu"
                      aria-invalid={!!errors.nume}
                    />
                  </Camp>
                  <Camp id="wp-email" eticheta="Email" eroare={errors.email}>
                    <input
                      id="wp-email"
                      type="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="ion@companie.ro"
                      aria-invalid={!!errors.email}
                    />
                  </Camp>
                </div>

                <Camp id="wp-telefon" eticheta="Telefon" eroare={errors.telefon}>
                  <input
                    id="wp-telefon"
                    type="tel"
                    className={f.input}
                    value={data.telefon}
                    onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                    placeholder="0750 456 096"
                    aria-invalid={!!errors.telefon}
                  />
                </Camp>

                <Camp id="wp-observatii" eticheta="Alte observații" optional>
                  <textarea
                    id="wp-observatii"
                    rows={4}
                    className={f.textarea}
                    value={data.observatii}
                    onChange={(e) => setData((p) => ({ ...p, observatii: e.target.value }))}
                    placeholder="Orice detalii suplimentare despre proiect..."
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
