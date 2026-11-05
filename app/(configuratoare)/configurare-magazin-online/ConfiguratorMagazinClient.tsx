'use client';

import { useState, useEffect } from 'react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { User, Building2, ShoppingBag, HelpCircle } from 'lucide-react';
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

type MagazinData = {
  tipEntitate: string;
  produseVandute: string;
  areProduse: string;
  nrProduse: string;
  buget: string;
  nume: string;
  email: string;
  telefon: string;
  observatii: string;
  acordPrivacitate: boolean;
};

const INITIAL_DATA: MagazinData = {
  tipEntitate: '',
  produseVandute: '',
  areProduse: '',
  nrProduse: '',
  buget: '',
  nume: '',
  email: '',
  telefon: '',
  observatii: '',
  acordPrivacitate: false,
};

const LS_KEY = 'inovex_config_mo';

const STEPS = ['Entitate & Industrie', 'Produse', 'Buget', 'Contact'];

const BUGET_OPTIONS = [
  'Sub 5.000 lei',
  'Între 5.000 și 10.000 lei',
  'Peste 10.000 lei',
  'Nu știu încă',
];

const STIAI_CA: Record<number, string> = {
  1: 'Un magazin online lucrează 24/7 fără să plătești angajați. 70% din comenzile online se plasează în afara orelor de program.',
  2: 'Magazinele cu un catalog bine organizat și imagini de calitate au o rată de conversie cu până la 40% mai mare decât cele cu imagini slabe sau categorii haotice.',
};

/* ------------------------------------------------------------------ */
/*  Main client component                                               */
/* ------------------------------------------------------------------ */

export function ConfiguratorMagazinClient() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<MagazinData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof MagazinData, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

  /* localStorage restore */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      // Merge cu INITIAL_DATA — protejeaza campurile noi (ex. buget) daca
      // exista un progres salvat dintr-o versiune anterioara a formularului.
      if (saved) setData({ ...INITIAL_DATA, ...JSON.parse(saved) });
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
  const produseValid = data.produseVandute.trim() !== '';

  const canContinue =
    step === 1
      ? data.tipEntitate === 'Persoana juridica' && produseValid
      : step === 2
        ? data.areProduse !== '' && (data.areProduse === 'nu' || data.nrProduse !== '')
        : step === 3
          ? data.buget !== ''
          : data.nume.length >= 2 &&
            data.email.includes('@') &&
            data.telefon.length >= 10 &&
            data.acordPrivacitate;

  /* ---- validate contact step ---- */
  const validateContactStep = (): boolean => {
    const newErrors: Partial<Record<keyof MagazinData, string>> = {};
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
    if (!validateContactStep()) return;
    setSubmitStatus('loading');
    const metaEventId = generateEventId();
    try {
      const res = await fetch('/api/configurator/magazin-online', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorMagazin();
        trackTikTok.configuratorMagazin();
        trackEvent('Lead', { content_name: 'configurator_magazin_online' }, metaEventId);
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
    if (step === 4) {
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
    <Cadru anunt="Peste 200 de magazine online livrate pentru antreprenori din România" pasi={STEPS} pas={step}>
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
                    <strong>Ne pare rău, lucrăm doar cu persoane juridice.</strong> Pentru a crea un magazin online
                    ai nevoie de o firmă înregistrată (SRL, PFA, II, SA). Dacă ai deja una, alege{' '}
                    <strong>Persoană juridică</strong>.
                  </Avertisment>
                </motion.div>
              )}

              <Intrebare>Ce produse vinzi?</Intrebare>
              <textarea
                rows={3}
                className={f.textarea}
                aria-label="Ce produse vinzi?"
                value={data.produseVandute}
                onChange={(e) => setData((p) => ({ ...p, produseVandute: e.target.value }))}
                placeholder="Ex: Haine și accesorii pentru femei, genți din piele, bijuterii handmade..."
              />

              <StiaiCa>{STIAI_CA[1]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>Ai deja stocul de produse?</Titlu>
              <Subtitlu>Acest lucru ne ajută să recomandăm soluția potrivită.</Subtitlu>

              <Grila>
                <CardOptiune
                  icon={ShoppingBag}
                  label="Da, am produse"
                  sublabel="Știu ce vreau să vând"
                  selected={data.areProduse === 'da'}
                  onClick={() => setData((p) => ({ ...p, areProduse: 'da' }))}
                />
                <CardOptiune
                  icon={HelpCircle}
                  label="Nu, încă"
                  sublabel="Sunt în curs de planificare"
                  selected={data.areProduse === 'nu'}
                  onClick={() => setData((p) => ({ ...p, areProduse: 'nu', nrProduse: '' }))}
                />
              </Grila>

              {/* numarul de produse, doar daca are produse */}
              {data.areProduse === 'da' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                  <Intrebare>Câte produse vrei să vinzi?</Intrebare>
                  <Grila telefon={2} mare={4}>
                    {['1-50', '50-200', '200-1000', 'Peste 1000'].map((value) => (
                      <CardNumar
                        key={value}
                        value={value}
                        selected={data.nrProduse === value}
                        onClick={() => setData((p) => ({ ...p, nrProduse: value }))}
                      />
                    ))}
                  </Grila>
                </motion.div>
              )}

              <StiaiCa>{STIAI_CA[2]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 3 (Buget) ---- */}
          {step === 3 && (
            <>
              <Titlu>Care este bugetul estimat pentru proiect?</Titlu>
              <Subtitlu>Ne ajută să îți recomandăm de la bun început soluția potrivită.</Subtitlu>

              <Grila telefon={1} mare={2}>
                {BUGET_OPTIONS.map((b) => (
                  <CardSimplu
                    key={b}
                    label={b}
                    selected={data.buget === b}
                    onClick={() => setData((p) => ({ ...p, buget: b }))}
                  />
                ))}
              </Grila>
            </>
          )}

          {/* ---- STEP 4 ---- */}
          {step === 4 && (
            <>
              <Titlu>Ultimul pas: datele tale de contact</Titlu>
              <Subtitlu>Te contactăm în maximum 24 de ore cu o propunere.</Subtitlu>

              <div className={f.formular}>
                <div className={f.rand}>
                  <Camp id="mo-nume" eticheta="Nume complet" eroare={errors.nume}>
                    <input
                      id="mo-nume"
                      autoComplete="name"
                      className={f.input}
                      value={data.nume}
                      onChange={(e) => setData((p) => ({ ...p, nume: e.target.value }))}
                      placeholder="Ion Popescu"
                      aria-invalid={!!errors.nume}
                    />
                  </Camp>
                  <Camp id="mo-email" eticheta="Email" eroare={errors.email}>
                    <input
                      id="mo-email"
                      type="email"
                      autoComplete="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="ion@companie.ro"
                      aria-invalid={!!errors.email}
                    />
                  </Camp>
                </div>

                <Camp id="mo-telefon" eticheta="Telefon" eroare={errors.telefon}>
                  <input
                    id="mo-telefon"
                    type="tel"
                    autoComplete="tel"
                    className={f.input}
                    value={data.telefon}
                    onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                    placeholder="07xx xxx xxx"
                    aria-invalid={!!errors.telefon}
                  />
                </Camp>

                <Camp id="mo-observatii" eticheta="Alte observații" optional>
                  <textarea
                    id="mo-observatii"
                    rows={4}
                    className={f.textarea}
                    value={data.observatii}
                    onChange={(e) => setData((p) => ({ ...p, observatii: e.target.value }))}
                    placeholder="Orice detalii suplimentare despre proiect..."
                  />
                </Camp>

                <Acord
                  id="mo-gdpr"
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
            ultimul={step === 4}
          />
        </motion.div>
      </AnimatePresence>
    </Cadru>
  );
}
