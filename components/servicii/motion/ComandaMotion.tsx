'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Lock, ArrowRight, UploadCloud, FileIcon, X, Minus, Plus } from 'lucide-react';
import f from '@/components/forms/Formular.module.css';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import { cale, type Limba } from '@/lib/i18n/config';
import { completeaza, etichetaVideo } from '@/lib/i18n/completeaza';
import type { TextMotion } from '@/lib/i18n/pagini/motion';
import {
  MOTION_QUICK_OPTIONS, MOTION_POPULAR, MOTION_MAX_VIDEOS,
  MOTION_ALLOWED_EXT, MOTION_MAX_FILES, MOTION_MAX_FILE_SIZE,
  motionPrice, motionSavings, motionDiscountPercent, formatPret, monedaMotion,
} from '@/lib/motion-design';
import styles from './Motion.module.css';

/* Comanda si plata (Stripe), in stilul redesign-ului (2026-10-29). Preturile, validarea, incarcarea
   fisierelor, plata si evenimentele (Meta, ChatGPT Ads) sunt cele dinainte. Din 2026-11-06 textele vin
   din lib/i18n/pagini/motion.ts (prin props), iar in engleza, germana si franceza preturile sunt in euro;
   pretul platit il calculeaza tot serverul (/api/checkout/motion-design), dupa limba trimisa. */

/** Prima cantitate care nu mai are optiune proprie — de aici incepe "Mai multe". */
const MORE_MIN = Math.max(...MOTION_QUICK_OPTIONS) + 1;
const MAX_MB = MOTION_MAX_FILE_SIZE / (1024 * 1024);

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

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: string }) {
  return (
    <label htmlFor={htmlFor} className={f.eticheta}>
      {children}{' '}
      {optional ? <span className={f.optional}>{optional}</span> : <span className={f.obligatoriu}>*</span>}
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

export default function ComandaMotion({
  lang,
  t,
  eticheta,
}: {
  lang: Limba;
  t: TextMotion['comanda'];
  eticheta: TextMotion['eticheta'];
}) {
  const [quick, setQuick] = useState<number | null>(MOTION_POPULAR);
  const [moreCount, setMoreCount] = useState(MORE_MIN);
  const [values, setValues] = useState({ descriere: '', link: '', nume: '', email: '', telefon: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'redirecting'>('idle');
  const [error, setError] = useState<string | null>(null);

  const moneda = monedaMotion(lang);
  const bani = (suma: number) => formatPret(suma, moneda, lang);
  const pret = (n: number) => motionPrice(n, moneda);
  const economie = (n: number) => motionSavings(n, moneda);
  const reducere = (n: number) => motionDiscountPercent(n, moneda);

  // quick === null inseamna ca e aleasa optiunea "Mai multe", cu moreCount videoclipuri.
  const count = quick ?? moreCount;
  const price = pret(count);
  const savings = economie(count);
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
      if (!MOTION_ALLOWED_EXT.includes(ext)) { problem = completeaza(t.fisierTip, { nume: file.name }); continue; }
      if (file.size > MOTION_MAX_FILE_SIZE) { problem = completeaza(t.fisierMare, { nume: file.name, mb: MAX_MB }); continue; }
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      if (next.length >= MOTION_MAX_FILES) { problem = completeaza(t.fisiereMax, { n: MOTION_MAX_FILES }); break; }
      next.push(file);
    }
    setFiles(next);
    setFileError(problem);
  }

  function validate(): boolean {
    const next: Partial<Record<Field, string>> = {};
    if (values.descriere.trim().length < 20) next.descriere = t.descriereEroare;
    if (values.nume.trim().length < 2) next.nume = t.numeEroare;
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = t.emailEroare;
    if (values.telefon.replace(/\D/g, '').length < 10) next.telefon = t.telefonEroare;
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
      body: JSON.stringify({ files: files.map((f) => ({ name: f.name, size: f.size })), limba: lang }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || t.eroareFisiere);

    await Promise.all(files.map(async (file, i) => {
      const body = new FormData();
      body.append('cacheControl', '3600');
      body.append('', file);
      const up = await fetch(json.uploads[i].signedUrl, { method: 'PUT', body });
      if (!up.ok) throw new Error(completeaza(t.eroareFisier, { nume: file.name }));
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
          limba: lang,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.url) throw new Error(json.error || t.eroare);
      trackEvent('Lead', { content_name: 'motion-design', content_category: `${count}-video` }, metaEventId);
      // ChatGPT Ads: acelasi event id ca la Meta => perechea server-side se deduplica.
      oaiqMeasure('lead_created', {}, metaEventId);
      trackEvent('InitiateCheckout', { content_name: 'motion-design', content_category: `${count}-video`, value: price, currency: moneda });
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : t.eroare);
      setStage('idle');
    }
  }

  return (
    <section id="comanda" className={`${styles.sectiune} ${styles.ultima}`} aria-labelledby="comanda-titlu">
      <h2 id="comanda-titlu" className={styles.titlu}>
        {t.titlu}
      </h2>
      <p className={styles.lead}>{t.lead}</p>

      <form onSubmit={submit} noValidate className={styles.comanda}>
        {/* Configurator */}
        <div className={styles.configurator}>
          {/* 1. Pachet */}
          <div>
            <StepTitle n={1}>{t.pas1}</StepTitle>
            <div role="radiogroup" aria-label={t.grup} className={styles.pachete}>
              {MOTION_QUICK_OPTIONS.map((n) => {
                const active = quick === n;
                const optionSavings = economie(n);
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
                        <span className={styles.pachetNume}>{etichetaVideo(eticheta, n)}</span>
                        {n === MOTION_POPULAR && <span className={styles.popular}>{t.celMaiAles}</span>}
                        {optionSavings > 0 && <DiscountTag percent={reducere(n)} />}
                      </span>
                      <span className={styles.pachetDetalii}>
                        {n > 1 ? completeaza(t.perVideo, { pret: bani(Math.round(pret(n) / n)) }) : t.unSingur}
                        {optionSavings > 0 && (
                          <span className={styles.economie}>{completeaza(t.economisesti, { suma: bani(optionSavings) })}</span>
                        )}
                      </span>
                    </span>
                    <span className={styles.pachetPret}>{bani(pret(n))}</span>
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
                      <span className={styles.pachetNume}>{t.maiMulte}</span>
                      <DiscountTag percent={quick === null ? reducere(moreCount) : 50} prefix={quick === null ? '' : t.panaLa} />
                    </span>
                    <span className={styles.pachetDetalii}>
                      {quick === null ? (
                        <>
                          {completeaza(t.perVideo, { pret: bani(Math.round(pret(moreCount) / moreCount)) })}
                          <span className={styles.economie}>{completeaza(t.economisesti, { suma: bani(economie(moreCount)) })}</span>
                        </>
                      ) : (
                        t.maiMulteDetalii
                      )}
                    </span>
                  </span>
                  {quick === null && <span className={styles.pachetPret}>{bani(pret(moreCount))}</span>}
                </button>

                {quick === null && (
                  <div className={styles.contor}>
                    <span>{t.numar}</span>
                    <span className={styles.contorButoane}>
                      <button
                        type="button"
                        aria-label={t.minus}
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
                        aria-label={t.plus}
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
            <StepTitle n={2}>{t.pas2}</StepTitle>
            <div className={f.formular}>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-descriere">{t.descriere}</FieldLabel>
                <textarea
                  id="motion-descriere"
                  rows={5}
                  maxLength={3000}
                  className={f.textarea}
                  placeholder={t.descriereIndiciu}
                  value={values.descriere}
                  onChange={set('descriere')}
                  aria-invalid={!!errors.descriere}
                />
                {errors.descriere && <p className={f.eroare}>{errors.descriere}</p>}
              </div>

              <div className={f.camp}>
                <FieldLabel htmlFor="motion-link" optional={t.optional}>{t.link}</FieldLabel>
                <input id="motion-link" maxLength={300} className={f.input} placeholder={t.linkIndiciu} value={values.link} onChange={set('link')} />
              </div>

              <div className={f.camp}>
                <FieldLabel htmlFor="motion-files" optional={t.optional}>{t.materiale}</FieldLabel>
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
                    <strong>{t.alege}</strong>{t.trage}
                  </span>
                  <span className={styles.incarcareNota}>{completeaza(t.notaFisiere, { n: MOTION_MAX_FILES, mb: MAX_MB })}</span>
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
                          aria-label={completeaza(t.elimina, { nume: file.name })}
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
          <h3 className={styles.sumarTitlu}>{t.sumarTitlu}</h3>
          <ul className={styles.inclus}>
            {t.inclus.map((item) => (
              <li key={item}>
                <Check aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* 3. Contact */}
          <div className={styles.contact}>
            <StepTitle n={3}>{t.pas3}</StepTitle>
            <div className={f.formular}>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-nume">{t.nume}</FieldLabel>
                <input id="motion-nume" className={`${f.input} ${styles.alb}`} autoComplete="name" maxLength={100} placeholder={t.numeIndiciu} value={values.nume} onChange={set('nume')} aria-invalid={!!errors.nume} />
                {errors.nume && <p className={f.eroare}>{errors.nume}</p>}
              </div>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-email">{t.email}</FieldLabel>
                <input id="motion-email" className={`${f.input} ${styles.alb}`} type="email" autoComplete="email" placeholder={t.emailIndiciu} value={values.email} onChange={set('email')} aria-invalid={!!errors.email} />
                {errors.email && <p className={f.eroare}>{errors.email}</p>}
              </div>
              <div className={f.camp}>
                <FieldLabel htmlFor="motion-telefon">{t.telefon}</FieldLabel>
                <input id="motion-telefon" className={`${f.input} ${styles.alb}`} type="tel" autoComplete="tel" maxLength={20} placeholder={t.telefonIndiciu} value={values.telefon} onChange={set('telefon')} aria-invalid={!!errors.telefon} />
                {errors.telefon && <p className={f.eroare}>{errors.telefon}</p>}
              </div>
            </div>
          </div>

          <div className={styles.total}>
            <div className={styles.totalRand}>
              <span className={styles.totalEticheta}>
                {etichetaVideo(eticheta, count)}
                <span>{t.total}</span>
              </span>
              <span className={styles.totalPret}>
                {savings > 0 && (
                  <span className={styles.totalVechi}>
                    <s>{bani(price + savings)}</s>
                    <DiscountTag percent={reducere(count)} />
                  </span>
                )}
                <span className={styles.totalValoare}>{bani(price)}</span>
              </span>
            </div>

            <button type="submit" className={styles.plateste} disabled={busy}>
              {stage === 'uploading' ? t.seIncarca : stage === 'redirecting' ? t.spre : count === 1 ? t.comandaUnul : t.comandaMai}
              {!busy && <ArrowRight aria-hidden />}
            </button>

            {error && (
              <p role="alert" className={styles.eroarePlata}>
                {error}
              </p>
            )}

            <p className={styles.securizat}>
              <Lock aria-hidden />
              {t.securizat}
            </p>
            <p className={styles.nota}>{t.factura}</p>
            <p className={styles.notaMica}>
              {t.acord}{' '}
              <Link href={cale(lang, '/politica-de-confidentialitate')}>{t.politica}</Link>.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
