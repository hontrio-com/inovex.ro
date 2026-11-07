'use client';

import { useState, useEffect } from 'react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { User, Building2, ShoppingBag, HelpCircle, type LucideIcon } from 'lucide-react';
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

// textele (pasii, bugetele, „Știai că?” etc.) vin in limba paginii din lib/i18n/pagini/configuratoare.ts;
// valorile trimise raman cele romanesti (bugetul tot in lei; in celelalte limbi pagina il arata in euro)
const ICON_ENTITATE: Record<string, LucideIcon> = { 'Persoana fizica': User, 'Persoana juridica': Building2 };
const ICON_PRODUSE: Record<string, LucideIcon> = { da: ShoppingBag, nu: HelpCircle };

/* ------------------------------------------------------------------ */
/*  Main client component                                               */
/* ------------------------------------------------------------------ */

export function ConfiguratorMagazinClient({ t }: { t: TextConfiguratoare['magazin'] }) {
  const { lang, t: c } = useConfigurator();
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
    if (!validateContactStep()) return;
    setSubmitStatus('loading');
    const metaEventId = generateEventId();
    try {
      const res = await fetch('/api/configurator/magazin-online', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        // limba paginii: confirmarea pleaca in limba clientului, iar in CRM sursa o arata
        body: JSON.stringify({ ...data, limba: lang }),
      });
      if (res.ok) {
        localStorage.removeItem(LS_KEY);
        trackConversions.configuratorMagazin(metaEventId);
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

              <Intrebare>{t.produse}</Intrebare>
              <textarea
                rows={3}
                className={f.textarea}
                aria-label={t.produse}
                value={data.produseVandute}
                onChange={(e) => setData((p) => ({ ...p, produseVandute: e.target.value }))}
                placeholder={t.exProduse}
              />

              <StiaiCa>{t.stiaiCa[0]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 2 ---- */}
          {step === 2 && (
            <>
              <Titlu>{t.stoc.titlu}</Titlu>
              <Subtitlu>{t.stoc.subtitlu}</Subtitlu>

              <Grila>
                {t.areProduse.map((o) => (
                  <CardOptiune
                    key={o.valoare}
                    icon={ICON_PRODUSE[o.valoare]}
                    label={o.eticheta}
                    sublabel={o.desc}
                    selected={data.areProduse === o.valoare}
                    onClick={() =>
                      setData((p) => ({ ...p, areProduse: o.valoare, ...(o.valoare === 'nu' ? { nrProduse: '' } : {}) }))
                    }
                  />
                ))}
              </Grila>

              {/* numarul de produse, doar daca are produse */}
              {data.areProduse === 'da' && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                  <Intrebare>{t.cateProduse}</Intrebare>
                  <Grila telefon={2} mare={4}>
                    {t.nrProduse.map((o) => (
                      <CardNumar
                        key={o.valoare}
                        value={o.eticheta}
                        selected={data.nrProduse === o.valoare}
                        onClick={() => setData((p) => ({ ...p, nrProduse: o.valoare }))}
                      />
                    ))}
                  </Grila>
                </motion.div>
              )}

              <StiaiCa>{t.stiaiCa[1]}</StiaiCa>
            </>
          )}

          {/* ---- STEP 3 (Buget) ---- */}
          {step === 3 && (
            <>
              <Titlu>{t.buget.titlu}</Titlu>
              <Subtitlu>{t.buget.subtitlu}</Subtitlu>

              <Grila telefon={1} mare={2}>
                {t.bugete.map((o) => (
                  <CardSimplu
                    key={o.valoare}
                    label={o.eticheta}
                    selected={data.buget === o.valoare}
                    onClick={() => setData((p) => ({ ...p, buget: o.valoare }))}
                  />
                ))}
              </Grila>
            </>
          )}

          {/* ---- STEP 4 ---- */}
          {step === 4 && (
            <>
              <Titlu>{c.contact.titlu}</Titlu>
              <Subtitlu>{c.contact.subtitlu}</Subtitlu>

              <div className={f.formular}>
                <div className={f.rand}>
                  <Camp id="mo-nume" eticheta={c.contact.nume} eroare={errors.nume}>
                    <input
                      id="mo-nume"
                      autoComplete="name"
                      className={f.input}
                      value={data.nume}
                      onChange={(e) => setData((p) => ({ ...p, nume: e.target.value }))}
                      placeholder={t.ex.nume}
                      aria-invalid={!!errors.nume}
                    />
                  </Camp>
                  <Camp id="mo-email" eticheta={c.contact.email} eroare={errors.email}>
                    <input
                      id="mo-email"
                      type="email"
                      autoComplete="email"
                      className={f.input}
                      value={data.email}
                      onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                      placeholder={t.ex.email}
                      aria-invalid={!!errors.email}
                    />
                  </Camp>
                </div>

                <Camp id="mo-telefon" eticheta={c.contact.telefon} eroare={errors.telefon}>
                  <input
                    id="mo-telefon"
                    type="tel"
                    autoComplete="tel"
                    className={f.input}
                    value={data.telefon}
                    onChange={(e) => setData((p) => ({ ...p, telefon: e.target.value }))}
                    placeholder={t.ex.telefon}
                    aria-invalid={!!errors.telefon}
                  />
                </Camp>

                <Camp id="mo-observatii" eticheta={c.contact.observatii} optional>
                  <textarea
                    id="mo-observatii"
                    rows={4}
                    className={f.textarea}
                    value={data.observatii}
                    onChange={(e) => setData((p) => ({ ...p, observatii: e.target.value }))}
                    placeholder={c.contact.exObservatii}
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
