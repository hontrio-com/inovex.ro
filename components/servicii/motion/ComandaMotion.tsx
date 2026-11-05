'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Lock, ArrowRight, UploadCloud, FileIcon, X, Minus, Plus } from 'lucide-react';
import f from '@/components/forms/Formular.module.css';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import {
  MOTION_QUICK_OPTIONS, MOTION_POPULAR, MOTION_MAX_VIDEOS,
  MOTION_INCLUDED, MOTION_ALLOWED_EXT, MOTION_MAX_FILES, MOTION_MAX_FILE_SIZE,
  motionPrice, motionSavings, motionDiscountPercent, motionLabel, formatLei,
} from '@/lib/motion-design';
import styles from './Motion.module.css';

/* Comanda si plata (Stripe), in stilul redesign-ului (2026-10-29). S-a schimbat doar aspectul: preturile,
   validarea, incarcarea fisierelor, plata si evenimentele (Meta, ChatGPT Ads) sunt cele dinainte. */

/** Prima cantitate care nu mai are optiune proprie — de aici incepe "Mai multe". */
const MORE_MIN = Math.max(...MOTION_QUICK_OPTIONS) + 1;
const MAX_MB = MOTION_MAX_FILE_SIZE / (1024 * 1024);
const GENERIC_ERROR = 'Nu am putut porni plata. Încearcă din nou.';

type Field = 'descriere' | 'nume' | 'email' | 'telefon';

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

function StepTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h3 className={styles.pasTitlu}>
      <span className={styles.pasNr}>{n}</span>
      {children}
    </h3>
  );
}

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className={f.eticheta}>
      {children}{' '}
      {optional ? <span className={f.optional}>(opțional)</span> : <span className={f.obligatoriu}>*</span>}
    </label>
  );
}

function RadioDot({ active }: { active: boolean }) {
  return <span aria-hidden className={styles.radio} data-activ={active} />;
}

function DiscountTag({ percent, prefix = '' }: { percent: number; prefix?: string }) {
  return (
    <span className={styles.reducere}>
      {prefix}-{percent}%
    </span>
  );
}

export default function ComandaMotion() {
  const [quick, setQuick] = useState<number | null>(MOTION_POPULAR);
  const [moreCount, setMoreCount] = useState(MORE_MIN);
  const [values, setValues] = useState({ descriere: '', link: '', nume: '', email: '', telefon: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'redirecting'>('idle');
  const [error, setError] = useState<string | null>(null);

  // quick === null inseamna ca e aleasa optiunea "Mai multe", cu moreCount videoclipuri.
  const count = quick ?? moreCount;
  const price = motionPrice(count);
  const savings = motionSavings(count);
  const busy = stage !== 'idle';

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const next = [...files];
    let problem: string | null = null;
    for (const file of Array.from(list)) {
      const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      if (!MOTION_ALLOWED_EXT.includes(ext)) { problem = `"${file.name}" nu este un tip de fișier acceptat.`; continue; }
      if (file.size > MOTION_MAX_FILE_SIZE) { problem = `"${file.name}" depășește ${MAX_MB} MB.`; continue; }
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      if (next.length >= MOTION_MAX_FILES) { problem = `Poți atașa cel mult ${MOTION_MAX_FILES} fișiere.`; break; }
      next.push(file);
    }
    setFiles(next);
    setFileError(problem);
  }

  function validate(): boolean {
    const next: Partial<Record<Field, string>> = {};
    if (values.descriere.trim().length < 20) next.descriere = 'Spune-ne în câteva propoziții despre ce este videoclipul.';
    if (values.nume.trim().length < 2) next.nume = 'Introdu numele tău.';
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = 'Introdu o adresă de email validă.';
    if (values.telefon.replace(/\D/g, '').length < 10) next.telefon = 'Introdu un număr de telefon valid.';
    setErrors(next);
    const first = (['descriere', 'nume', 'email', 'telefon'] as Field[]).find((f) => next[f]);
    if (first) document.getElementById(`motion-${first}`)?.focus();
    return !first;
  }

  /** Urca fisierele direct in storage, prin URL-uri semnate. Intoarce id-ul comenzii. */
  async function uploadFiles(): Promise<string> {
    const res = await fetch('/api/checkout/motion-design/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: files.map((f) => ({ name: f.name, size: f.size })) }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || 'Nu am putut încărca fișierele. Încearcă din nou.');

    await Promise.all(files.map(async (file, i) => {
      const body = new FormData();
      body.append('cacheControl', '3600');
      body.append('', file);
      const up = await fetch(json.uploads[i].signedUrl, { method: 'PUT', body });
      if (!up.ok) throw new Error(`Nu am putut încărca „${file.name}”. Încearcă din nou.`);
    }));
    return json.orderId;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !validate()) return;
    setError(null);
    const metaEventId = generateEventId();
    try {
      let orderId: string | undefined;
      if (files.length) {
        setStage('uploading');
        orderId = await uploadFiles();
      }
      setStage('redirecting');
      const res = await fetch('/api/checkout/motion-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        body: JSON.stringify({
          videoclipuri: count,
          nume: values.nume.trim(),
          email: values.email.trim(),
          telefon: values.telefon.trim(),
          descriere: values.descriere.trim(),
          link: values.link.trim() || undefined,
          orderId,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.url) throw new Error(json.error || GENERIC_ERROR);
      trackEvent('Lead', { content_name: 'motion-design', content_category: `${count}-video` }, metaEventId);
      // ChatGPT Ads: acelasi event id ca la Meta => perechea server-side se deduplica.
      oaiqMeasure('lead_created', {}, metaEventId);
      trackEvent('InitiateCheckout', { content_name: 'motion-design', content_category: `${count}-video`, value: price, currency: 'RON' });
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : GENERIC_ERROR);
      setStage('idle');
    }
  }

  return (
    <section id="comanda" className={`${styles.sectiune} ${styles.ultima}`} aria-labelledby="comanda-titlu">
      <h2 id="comanda-titlu" className={styles.titlu}>
        Configurează-ți videoclipul
      </h2>
      <p className={styles.lead}>
        Alege câte videoclipuri vrei, spune-ne despre ce sunt și atașează materialele tale. Cu cât comanzi mai
        multe, cu atât scade prețul pe fiecare, până la -50%.
      </p>

      <form onSubmit={submit} noValidate className={styles.comanda}>
        {/* Configurator */}
        <div className={styles.configurator}>
          {/* 1. Pachet */}
          <div>
            <StepTitle n={1}>Câte videoclipuri vrei?</StepTitle>
            <div role="radiogroup" aria-label="Număr de videoclipuri" className={styles.pachete}>
              {MOTION_QUICK_OPTIONS.map((n) => {
                const active = quick === n;
                const optionSavings = motionSavings(n);
                return (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setQuick(n)}
                    className={styles.pachet}
                    data-ales={active}
                  >
                    <RadioDot active={active} />
                    <span className={styles.pachetText}>
                      <span className={styles.pachetRand}>
                        <span className={styles.pachetNume}>{motionLabel(n)}</span>
                        {n === MOTION_POPULAR && <span className={styles.popular}>Cel mai ales</span>}
                        {optionSavings > 0 && <DiscountTag percent={motionDiscountPercent(n)} />}
                      </span>
                      <span className={styles.pachetDetalii}>
                        {n > 1 ? `${formatLei(Math.round(motionPrice(n) / n))} / videoclip` : 'Un singur videoclip'}
                        {optionSavings > 0 && (
                          <span className={styles.economie}> · economisești {formatLei(optionSavings)}</span>
                        )}
                      </span>
                    </span>
                    <span className={styles.pachetPret}>{formatLei(motionPrice(n))}</span>
                  </button>
                );
              })}

              {/* Mai multe: cantitate libera, reducerea creste pana la 50% */}
              <div className={styles.maiMulte} data-ales={quick === null}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={quick === null}
                  onClick={() => setQuick(null)}
                  className={styles.pachet}
                >
                  <RadioDot active={quick === null} />
                  <span className={styles.pachetText}>
                    <span className={styles.pachetRand}>
                      <span className={styles.pachetNume}>Mai multe videoclipuri</span>
                      <DiscountTag percent={quick === null ? motionDiscountPercent(moreCount) : 50} prefix={quick === null ? '' : 'până la '} />
                    </span>
                    <span className={styles.pachetDetalii}>
                      {quick === null ? (
                        <>
                          {formatLei(Math.round(motionPrice(moreCount) / moreCount))} / videoclip
                          <span className={styles.economie}> · economisești {formatLei(motionSavings(moreCount))}</span>
                        </>
                      ) : (
                        'Cu cât comanzi mai multe, cu atât crește reducerea'
                      )}
                    </span>
                  </span>
                  {quick === null && <span className={styles.pachetPret}>{formatLei(motionPrice(moreCount))}</span>}
                </button>

                {quick === null && (
                  <div className={styles.contor}>
                    <span>Număr de videoclipuri</span>
                    <span className={styles.contorButoane}>
                      <button
                        type="button"
                        aria-label="Mai puține videoclipuri"
                        disabled={moreCount <= MORE_MIN}
                        onClick={() => setMoreCount((c) => Math.max(MORE_MIN, c - 1))}
                      >
                        <Minus aria-hidden />
                      </button>
                      <span aria-live="polite" className={styles.contorValoare}>
                        {moreCount}
                      </span>
                      <button
                        type="button"
                        aria-label="Mai multe videoclipuri"
                        disabled={moreCount >= MOTION_MAX_VIDEOS}
                        onClick={() => setMoreCount((c) => Math.min(MOTION_MAX_VIDEOS, c + 1))}
                      >
                        <Plus aria-hidden />
                      </button>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Brief */}
          <div>
            <StepTitle n={2}>Despre ce este videoclipul?</StepTitle>
            <div className={f.formular}>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-descriere">Descrierea videoclipului</FieldLabel>
                <textarea
                  id="motion-descriere"
                  rows={5}
                  maxLength={3000}
                  className={f.textarea}
                  placeholder="Ce promovezi, cui te adresezi, ce mesaj vrei să rămână și unde vei folosi videoclipul (site, reclame, social media). Pentru mai multe videoclipuri, descrie-l pe fiecare."
                  value={values.descriere}
                  onChange={set('descriere')}
                  aria-invalid={!!errors.descriere}
                />
                {errors.descriere && <p className={f.eroare}>{errors.descriere}</p>}
              </div>

              <div className={f.camp}>
                <FieldLabel htmlFor="motion-link" optional>Site sau pagina de social media</FieldLabel>
                <input id="motion-link" maxLength={300} className={f.input} placeholder="https://firma-ta.ro" value={values.link} onChange={set('link')} />
              </div>

              <div className={f.camp}>
                <FieldLabel htmlFor="motion-files" optional>Materiale: logo, imagini, texte</FieldLabel>
                <label
                  htmlFor="motion-files"
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                  className={styles.incarcare}
                  data-trage={dragging}
                >
                  <span className={styles.incarcareIcon}>
                    <UploadCloud aria-hidden />
                  </span>
                  <span className={styles.incarcareText}>
                    <strong>Alege fișierele</strong> sau trage-le aici
                  </span>
                  <span className={styles.incarcareNota}>
                    Imagini, PDF, AI, PSD, ZIP, video · maximum {MOTION_MAX_FILES} fișiere, {MAX_MB} MB fiecare
                  </span>
                  <input
                    id="motion-files"
                    type="file"
                    multiple
                    accept={MOTION_ALLOWED_EXT.join(',')}
                    className="sr-only"
                    onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
                  />
                </label>
                {fileError && <p role="alert" className={f.eroare}>{fileError}</p>}
                {files.length > 0 && (
                  <ul className={styles.fisiere}>
                    {files.map((file) => (
                      <li key={`${file.name}-${file.size}`}>
                        <FileIcon aria-hidden />
                        <span className={styles.fisierNume}>{file.name}</span>
                        <span className={styles.fisierMarime}>{formatSize(file.size)}</span>
                        <button
                          type="button"
                          disabled={busy}
                          aria-label={`Elimină ${file.name}`}
                          onClick={() => { setFiles(files.filter((f) => f !== file)); setFileError(null); }}
                        >
                          <X aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sumar + plata */}
        <div className={styles.sumar}>
          <h3 className={styles.sumarTitlu}>Ce primești pentru fiecare videoclip</h3>
          <ul className={styles.inclus}>
            {MOTION_INCLUDED.map((item) => (
              <li key={item}>
                <Check aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* 3. Contact */}
          <div className={styles.contact}>
            <StepTitle n={3}>Datele tale de contact</StepTitle>
            <div className={f.formular}>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-nume">Nume complet</FieldLabel>
                <input id="motion-nume" className={`${f.input} ${styles.alb}`} autoComplete="name" maxLength={100} placeholder="Ion Popescu" value={values.nume} onChange={set('nume')} aria-invalid={!!errors.nume} />
                {errors.nume && <p className={f.eroare}>{errors.nume}</p>}
              </div>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-email">Email</FieldLabel>
                <input id="motion-email" className={`${f.input} ${styles.alb}`} type="email" autoComplete="email" placeholder="ion@firma.ro" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} />
                {errors.email && <p className={f.eroare}>{errors.email}</p>}
              </div>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-telefon">Telefon</FieldLabel>
                <input id="motion-telefon" className={`${f.input} ${styles.alb}`} type="tel" autoComplete="tel" maxLength={20} placeholder="07xx xxx xxx" value={values.telefon} onChange={set('telefon')} aria-invalid={!!errors.telefon} />
                {errors.telefon && <p className={f.eroare}>{errors.telefon}</p>}
              </div>
            </div>
          </div>

          <div className={styles.total}>
            <div className={styles.totalRand}>
              <span className={styles.totalEticheta}>
                {motionLabel(count)}
                <span>Total de plată</span>
              </span>
              <span className={styles.totalPret}>
                {savings > 0 && (
                  <span className={styles.totalVechi}>
                    <s>{formatLei(price + savings)}</s>
                    <DiscountTag percent={motionDiscountPercent(count)} />
                  </span>
                )}
                <span className={styles.totalValoare}>{formatLei(price)}</span>
              </span>
            </div>

            <button type="submit" className={styles.plateste} disabled={busy}>
              {stage === 'uploading' ? 'Se încarcă fișierele...' : stage === 'redirecting' ? 'Te ducem la plată...' : count === 1 ? 'Comandă videoclipul' : 'Comandă videoclipurile'}
              {!busy && <ArrowRight aria-hidden />}
            </button>

            {error && (
              <p role="alert" className={styles.eroarePlata}>
                {error}
              </p>
            )}

            <p className={styles.securizat}>
              <Lock aria-hidden />
              Plată securizată cu cardul, prin Stripe
            </p>
            <p className={styles.nota}>Factura se emite automat și ajunge în SPV (e-Factura).</p>
            <p className={styles.notaMica}>
              Prin trimiterea comenzii ești de acord cu{' '}
              <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
