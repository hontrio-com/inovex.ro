'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Lock, ArrowRight, UploadCloud, FileIcon, X, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import {
  MOTION_QUICK_OPTIONS, MOTION_POPULAR, MOTION_MAX_VIDEOS,
  MOTION_INCLUDED, MOTION_ALLOWED_EXT, MOTION_MAX_FILES, MOTION_MAX_FILE_SIZE,
  motionPrice, motionSavings, motionDiscountPercent, motionLabel, formatLei,
} from '@/lib/motion-design';

/** Prima cantitate care nu mai are optiune proprie — de aici incepe "Mai multe". */
const MORE_MIN = Math.max(...MOTION_QUICK_OPTIONS) + 1;
const MAX_MB = MOTION_MAX_FILE_SIZE / (1024 * 1024);
const GENERIC_ERROR = 'Nu am putut porni plata. Incearca din nou.';

type Field = 'descriere' | 'nume' | 'email' | 'telefon';

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

function StepTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', color: '#0D1117' }}>
      <span className="w-6 h-6 rounded-full bg-[#0D1117] text-white text-[12px] font-semibold flex items-center justify-center shrink-0">{n}</span>
      {children}
    </h3>
  );
}

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-[#0D1117] mb-1.5">
      {children}{' '}
      {optional ? <span className="text-[#8A94A6] font-normal">(optional)</span> : <span className="text-red-500">*</span>}
    </label>
  );
}

function RadioDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center',
        active ? 'border-[#2B8FCC]' : 'border-[#C5CCD6]'
      )}
    >
      {active && <span className="w-2 h-2 rounded-full bg-[#2B8FCC]" />}
    </span>
  );
}

function DiscountTag({ percent, prefix = '' }: { percent: number; prefix?: string }) {
  return (
    <span className="text-[10.5px] font-bold tracking-wide text-[#047857] bg-[#D1FAE5] rounded-full px-2 py-0.5">
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
      if (!MOTION_ALLOWED_EXT.includes(ext)) { problem = `"${file.name}" nu este un tip de fisier acceptat.`; continue; }
      if (file.size > MOTION_MAX_FILE_SIZE) { problem = `"${file.name}" depaseste ${MAX_MB} MB.`; continue; }
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      if (next.length >= MOTION_MAX_FILES) { problem = `Poti atasa cel mult ${MOTION_MAX_FILES} fisiere.`; break; }
      next.push(file);
    }
    setFiles(next);
    setFileError(problem);
  }

  function validate(): boolean {
    const next: Partial<Record<Field, string>> = {};
    if (values.descriere.trim().length < 20) next.descriere = 'Spune-ne in cateva propozitii despre ce este videoclipul.';
    if (values.nume.trim().length < 2) next.nume = 'Introdu numele tau.';
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = 'Introdu o adresa de email valida.';
    if (values.telefon.replace(/\D/g, '').length < 10) next.telefon = 'Introdu un numar de telefon valid.';
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
    if (!res.ok) throw new Error(json.error || 'Nu am putut incarca fisierele. Incearca din nou.');

    await Promise.all(files.map(async (file, i) => {
      const body = new FormData();
      body.append('cacheControl', '3600');
      body.append('', file);
      const up = await fetch(json.uploads[i].signedUrl, { method: 'PUT', body });
      if (!up.ok) throw new Error(`Nu am putut incarca "${file.name}". Incearca din nou.`);
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
    <section id="comanda" className="py-[100px] max-md:py-16 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-12">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Comanda
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
            className="mb-4"
          >
            Configureaza-ti{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>videoclipul</span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Alege cate videoclipuri vrei, spune-ne despre ce sunt si ataseaza materialele tale. Cu cat comanzi mai multe, cu atat scade pretul pe fiecare, pana la -50%.
          </p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="max-w-[1040px] mx-auto grid lg:grid-cols-[1.35fr_1fr] rounded-2xl border border-[#E8ECF0] bg-white"
          style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.08),0 8px 24px rgba(0,0,0,0.04)' }}
        >
          {/* Configurator */}
          <div className="p-6 sm:p-9 space-y-9 min-w-0">
            {/* 1. Pachet */}
            <div>
              <StepTitle n={1}>Cate videoclipuri vrei?</StepTitle>
              <div role="radiogroup" aria-label="Numar de videoclipuri" className="space-y-2.5">
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
                      className={cn(
                        'w-full flex items-center gap-3.5 text-left rounded-xl border px-4 py-3 transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-[#2B8FCC]/30',
                        active ? 'border-[#2B8FCC] bg-[#EAF5FF]' : 'border-[#E8ECF0] bg-white hover:border-[#C8E6F8]'
                      )}
                    >
                      <RadioDot active={active} />
                      <span className="flex-1 min-w-0">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-[15px] font-semibold text-[#0D1117]">{motionLabel(n)}</span>
                          {n === MOTION_POPULAR && (
                            <span className="text-[10.5px] font-bold uppercase tracking-wide text-white bg-[#2B8FCC] rounded-full px-2 py-0.5">
                              Cel mai ales
                            </span>
                          )}
                          {optionSavings > 0 && <DiscountTag percent={motionDiscountPercent(n)} />}
                        </span>
                        <span className="block text-[12.5px] text-[#4A5568] mt-0.5">
                          {n > 1 ? `${formatLei(Math.round(motionPrice(n) / n))} / videoclip` : 'Un singur videoclip'}
                          {optionSavings > 0 && (
                            <span className="text-[#059669] font-semibold"> · economisesti {formatLei(optionSavings)}</span>
                          )}
                        </span>
                      </span>
                      <span className="text-[15px] font-semibold text-[#0D1117] whitespace-nowrap">{formatLei(motionPrice(n))}</span>
                    </button>
                  );
                })}

                {/* Mai multe: cantitate libera, reducerea creste pana la 50% */}
                <div
                  className={cn(
                    'rounded-xl border transition-all',
                    quick === null ? 'border-[#2B8FCC] bg-[#EAF5FF]' : 'border-[#E8ECF0] bg-white hover:border-[#C8E6F8]'
                  )}
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={quick === null}
                    onClick={() => setQuick(null)}
                    className="w-full flex items-center gap-3.5 text-left rounded-xl px-4 py-3 outline-none focus-visible:ring-[3px] focus-visible:ring-[#2B8FCC]/30"
                  >
                    <RadioDot active={quick === null} />
                    <span className="flex-1 min-w-0">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-semibold text-[#0D1117]">Mai multe videoclipuri</span>
                        <DiscountTag percent={quick === null ? motionDiscountPercent(moreCount) : 50} prefix={quick === null ? '' : 'pana la '} />
                      </span>
                      <span className="block text-[12.5px] text-[#4A5568] mt-0.5">
                        {quick === null ? (
                          <>
                            {formatLei(Math.round(motionPrice(moreCount) / moreCount))} / videoclip
                            <span className="text-[#059669] font-semibold"> · economisesti {formatLei(motionSavings(moreCount))}</span>
                          </>
                        ) : (
                          'Cu cat comanzi mai multe, cu atat creste reducerea'
                        )}
                      </span>
                    </span>
                    {quick === null && (
                      <span className="text-[15px] font-semibold text-[#0D1117] whitespace-nowrap">{formatLei(motionPrice(moreCount))}</span>
                    )}
                  </button>

                  {quick === null && (
                    <div className="flex items-center justify-between gap-4 border-t border-[#C8E6F8] px-4 py-3">
                      <span className="text-[13px] font-medium text-[#0D1117]">Numar de videoclipuri</span>
                      <span className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Mai putine videoclipuri"
                          disabled={moreCount <= MORE_MIN}
                          onClick={() => setMoreCount((c) => Math.max(MORE_MIN, c - 1))}
                          className="w-9 h-9 rounded-lg border border-[#C8E6F8] bg-white flex items-center justify-center text-[#0D1117] hover:border-[#2B8FCC] disabled:opacity-40 disabled:hover:border-[#C8E6F8] outline-none focus-visible:ring-[3px] focus-visible:ring-[#2B8FCC]/30"
                        >
                          <Minus size={15} />
                        </button>
                        <span aria-live="polite" className="w-9 text-center text-[16px] font-semibold text-[#0D1117] tabular-nums">{moreCount}</span>
                        <button
                          type="button"
                          aria-label="Mai multe videoclipuri"
                          disabled={moreCount >= MOTION_MAX_VIDEOS}
                          onClick={() => setMoreCount((c) => Math.min(MOTION_MAX_VIDEOS, c + 1))}
                          className="w-9 h-9 rounded-lg border border-[#C8E6F8] bg-white flex items-center justify-center text-[#0D1117] hover:border-[#2B8FCC] disabled:opacity-40 disabled:hover:border-[#C8E6F8] outline-none focus-visible:ring-[3px] focus-visible:ring-[#2B8FCC]/30"
                        >
                          <Plus size={15} />
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
              <div className="space-y-4">
                <div>
                  <FieldLabel htmlFor="motion-descriere">Descrierea videoclipului</FieldLabel>
                  <Textarea
                    id="motion-descriere"
                    rows={5}
                    maxLength={3000}
                    className="min-h-[130px]"
                    placeholder="Ce promovezi, cui te adresezi, ce mesaj vrei sa ramana si unde vei folosi videoclipul (site, reclame, social media). Pentru mai multe videoclipuri, descrie-l pe fiecare."
                    value={values.descriere}
                    onChange={set('descriere')}
                    aria-invalid={!!errors.descriere}
                  />
                  {errors.descriere && <p className="mt-1.5 text-[12.5px] text-[#DC2626]">{errors.descriere}</p>}
                </div>

                <div>
                  <FieldLabel htmlFor="motion-link" optional>Site sau pagina de social media</FieldLabel>
                  <Input id="motion-link" maxLength={300} placeholder="https://firma-ta.ro" value={values.link} onChange={set('link')} />
                </div>

                <div>
                  <FieldLabel htmlFor="motion-files" optional>Materiale: logo, imagini, texte</FieldLabel>
                  <label
                    htmlFor="motion-files"
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                    className={cn(
                      'flex flex-col items-center justify-center text-center gap-1.5 rounded-xl border border-dashed px-4 py-6 cursor-pointer transition-colors focus-within:ring-[3px] focus-within:ring-[#2B8FCC]/30',
                      dragging ? 'border-[#2B8FCC] bg-[#EAF5FF]' : 'border-[#C5CCD6] bg-[#F8FAFB] hover:border-[#2B8FCC]'
                    )}
                  >
                    <UploadCloud size={22} className="text-[#2B8FCC]" />
                    <span className="text-[14px] text-[#0D1117]">
                      <span className="font-semibold text-[#2B8FCC]">Alege fisierele</span> sau trage-le aici
                    </span>
                    <span className="text-[12px] text-[#8A94A6]">
                      Imagini, PDF, AI, PSD, ZIP, video · maximum {MOTION_MAX_FILES} fisiere, {MAX_MB} MB fiecare
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
                  {fileError && <p role="alert" className="mt-1.5 text-[12.5px] text-[#DC2626]">{fileError}</p>}
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((file) => (
                        <li key={`${file.name}-${file.size}`} className="flex items-center gap-2.5 rounded-lg border border-[#E8ECF0] px-3 py-2">
                          <FileIcon size={15} className="text-[#8A94A6] shrink-0" />
                          <span className="flex-1 min-w-0 truncate text-[13.5px] text-[#0D1117]">{file.name}</span>
                          <span className="text-[12px] text-[#8A94A6] whitespace-nowrap">{formatSize(file.size)}</span>
                          <button
                            type="button"
                            disabled={busy}
                            aria-label={`Elimina ${file.name}`}
                            onClick={() => { setFiles(files.filter((f) => f !== file)); setFileError(null); }}
                            className="p-1 -mr-1 rounded text-[#8A94A6] hover:text-[#DC2626] disabled:opacity-50"
                          >
                            <X size={15} />
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
          <div className="bg-[#F8FAFB] border-[#E8ECF0] max-lg:border-t lg:border-l max-lg:rounded-b-2xl lg:rounded-r-2xl">
            <div className="p-6 sm:p-9">
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', color: '#0D1117' }} className="mb-4">
                Ce primesti pentru fiecare videoclip
              </h3>
              <ul className="space-y-2.5 mb-7">
                {MOTION_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-[#2B8FCC] shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-[#0D1117] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* 3. Contact */}
              <div className="mb-7">
                <StepTitle n={3}>Datele tale de contact</StepTitle>
                <div className="space-y-4">
                  <div>
                    <FieldLabel htmlFor="motion-nume">Nume complet</FieldLabel>
                    <Input id="motion-nume" className="bg-white" autoComplete="name" maxLength={100} placeholder="Ion Popescu" value={values.nume} onChange={set('nume')} aria-invalid={!!errors.nume} />
                    {errors.nume && <p className="mt-1.5 text-[12.5px] text-[#DC2626]">{errors.nume}</p>}
                  </div>
                  <div>
                    <FieldLabel htmlFor="motion-email">Email</FieldLabel>
                    <Input id="motion-email" className="bg-white" type="email" autoComplete="email" placeholder="ion@firma.ro" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} />
                    {errors.email && <p className="mt-1.5 text-[12.5px] text-[#DC2626]">{errors.email}</p>}
                  </div>
                  <div>
                    <FieldLabel htmlFor="motion-telefon">Telefon</FieldLabel>
                    <Input id="motion-telefon" className="bg-white" type="tel" autoComplete="tel" maxLength={20} placeholder="07xx xxx xxx" value={values.telefon} onChange={set('telefon')} aria-invalid={!!errors.telefon} />
                    {errors.telefon && <p className="mt-1.5 text-[12.5px] text-[#DC2626]">{errors.telefon}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E8ECF0] pt-5">
                <div className="flex items-end justify-between gap-4 mb-5">
                  <span className="text-[13px] font-medium text-[#4A5568]">
                    {motionLabel(count)}
                    <span className="block text-[12px] font-normal text-[#8A94A6]">Total de plata</span>
                  </span>
                  <span className="text-right">
                    {savings > 0 && (
                      <span className="flex items-center justify-end gap-1.5 mb-1">
                        <span className="text-[13px] text-[#8A94A6] line-through">{formatLei(price + savings)}</span>
                        <DiscountTag percent={motionDiscountPercent(count)} />
                      </span>
                    )}
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.02em', color: '#0D1117' }}>
                      {formatLei(price)}
                    </span>
                  </span>
                </div>

                <style>{`
                  @keyframes motion-cta-glow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(43,143,204,0.55), 0 6px 18px rgba(43,143,204,0.25); }
                    50% { box-shadow: 0 0 0 9px rgba(43,143,204,0), 0 6px 26px rgba(43,143,204,0.5); }
                  }
                  .motion-cta-glow { animation: motion-cta-glow 2s ease-in-out infinite; }
                  .motion-cta-glow:disabled { animation: none; }
                  @media (prefers-reduced-motion: reduce) { .motion-cta-glow { animation: none; } }
                `}</style>
                <Button type="submit" size="lg" className="motion-cta-glow w-full h-12 text-[15px]" loading={busy} rightIcon={busy ? undefined : <ArrowRight size={16} />}>
                  {stage === 'uploading' ? 'Se incarca fisierele...' : stage === 'redirecting' ? 'Te ducem la plata...' : count === 1 ? 'Comanda videoclipul' : 'Comanda videoclipurile'}
                </Button>

                {error && (
                  <p role="alert" className="mt-3 text-[13px] text-[#DC2626] leading-relaxed">
                    {error}
                  </p>
                )}

                <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-[#8A94A6]">
                  <Lock size={12} />
                  Plata securizata cu cardul, prin Stripe
                </p>
                <p className="mt-2 text-center text-[12px] text-[#4A5568] leading-relaxed">
                  Factura se emite automat si ajunge in SPV (e-Factura).
                </p>
                <p className="mt-2 text-center text-[11.5px] text-[#8A94A6] leading-relaxed">
                  Prin trimiterea comenzii esti de acord cu{' '}
                  <Link href="/politica-de-confidentialitate" className="underline hover:text-[#4A5568]">Politica de confidentialitate</Link>.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
