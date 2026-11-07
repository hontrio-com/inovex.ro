'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import Link from 'next/link';
import { cale, existaIn, type Limba } from '@/lib/i18n/config';
import type { TextFormulare } from '@/lib/i18n/pagini/formulare';
import styles from '@/components/forms/Formular.module.css';

type Text = TextFormulare['formularOferta'];

/* ------------------------------------------------------------------ */
/*  Schema                                                              */
/* ------------------------------------------------------------------ */

// regulile de validare, cu mesajele in limba paginii (lib/i18n/pagini/formulare.ts)
const schemaPentru = (e: Text['erori']) =>
  z.object({
    serviciu: z.string().min(1, e.serviciu),
    descriereProiect: z.string().min(10, e.descriere),
    nume: z.string().min(2, e.nume),
    email: z.string().email(e.email),
    telefon: z.string().min(10, e.telefon),
    websiteExistent: z.string().optional(),
    cumAiAflat: z.string().optional(),
    acordPrivacitate: z.literal<boolean>(true, {
      error: e.acord,
    }),
  });

type FormValues = z.infer<ReturnType<typeof schemaPentru>>;

// pentru serviciile care au configurator, sub lista apare linkul catre el (doar in limbile in care
// configuratorul e tradus); numele lui, in limba paginii, e in t.configuratoare
const CONFIGURATOARE: Record<string, string> = {
  'Magazin Online': '/configurare-magazin-online',
  'Website de Prezentare': '/configurare-website-prezentare',
  'Aplicatie Web & SaaS': '/configurare-aplicatie-web',
  'Automatizari AI': '/configurare-automatizari-ai',
};

type Props = { lang: Limba; t: Text; telefon: string };

/* ------------------------------------------------------------------ */
/*  Inner component (uses useSearchParams)                             */
/* ------------------------------------------------------------------ */

function OfertaFormInner({ lang, t, telefon }: Props) {
  const searchParams = useSearchParams();
  const schema = useMemo(() => schemaPentru(t.erori), [t.erori]);
  const serviciiParam = searchParams.get('serviciu') ?? '';

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviciu: serviciiParam,
      descriereProiect: '',
      nume: '',
      email: '',
      telefon: '',
      websiteExistent: '',
      cumAiAflat: '',
      acordPrivacitate: undefined as unknown as true,
    },
  });

  const watchServiciuValue = watch('serviciu');
  const watchAcord = watch('acordPrivacitate');

  const onSubmit = async (values: FormValues) => {
    setSubmitStatus('loading');
    const metaEventId = generateEventId();
    try {
      const res = await fetch('/api/oferta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        // limba: emailul de confirmare pleaca in limba paginii, iar in CRM se vede de unde a venit
        body: JSON.stringify({ ...values, limba: lang }),
      });
      if (res.ok) {
        setSubmitStatus('success');
        trackConversions.formularOferta(metaEventId);
        trackTikTok.formularOferta();
        trackEvent('SubmitApplication');
        trackEvent('Lead', { content_name: 'oferta', content_category: values.serviciu }, metaEventId);
        // ChatGPT Ads: acelasi event id ca la Meta => perechea server-side se deduplica.
        oaiqMeasure('lead_created', {}, metaEventId);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  /* Success state */
  if (submitStatus === 'success') {
    return (
      <div className={styles.succes} role="status">
        <span className={styles.succesIcon}>
          <CheckCircle2 aria-hidden />
        </span>
        <h2 className={styles.succesTitlu}>{t.succesTitlu}</h2>
        <p className={styles.succesText}>
          {t.succesText[0]}
          <strong>{t.succesText[1]}</strong>
          {t.succesText[2]}
        </p>
        <Link href={cale(lang, '/')} className={styles.inca}>
          {t.inapoi}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.formular}>
      {/* Serviciu */}
      <div className={styles.camp}>
        <label htmlFor="of-serviciu" className={styles.eticheta}>
          {t.serviciu} <span className={styles.obligatoriu}>*</span>
        </label>
        {/* valorile ajung asa in CRM si vin din linkurile „/oferta?serviciu=...”: se schimba doar etichetele */}
        <select
          id="of-serviciu"
          {...register('serviciu')}
          className={styles.select}
          data-gol={watchServiciuValue === ''}
          aria-invalid={!!errors.serviciu}
        >
          {t.servicii.map((o) => (
            <option key={o.valoare} value={o.valoare}>
              {o.eticheta}
            </option>
          ))}
        </select>
        {errors.serviciu && <p className={styles.eroare}>{errors.serviciu.message}</p>}
        {CONFIGURATOARE[watchServiciuValue] && existaIn(lang, CONFIGURATOARE[watchServiciuValue]) && (
          <p className={styles.indiciu}>
            {t.ghidat}{' '}
            <Link href={cale(lang, CONFIGURATOARE[watchServiciuValue])}>{t.configuratoare[watchServiciuValue]}</Link>
          </p>
        )}
      </div>

      {/* Descriere proiect */}
      <div className={styles.camp}>
        <label htmlFor="of-descriere" className={styles.eticheta}>
          {t.descriere} <span className={styles.obligatoriu}>*</span>
        </label>
        <textarea
          id="of-descriere"
          rows={4}
          className={styles.textarea}
          placeholder={t.exDescriere}
          aria-invalid={!!errors.descriereProiect}
          {...register('descriereProiect')}
        />
        {errors.descriereProiect && <p className={styles.eroare}>{errors.descriereProiect.message}</p>}
      </div>

      {/* Nume + Email */}
      <div className={styles.rand}>
        <div className={styles.camp}>
          <label htmlFor="of-nume" className={styles.eticheta}>
            {t.nume} <span className={styles.obligatoriu}>*</span>
          </label>
          <input
            id="of-nume"
            autoComplete="name"
            placeholder={t.exNume}
            className={styles.input}
            aria-invalid={!!errors.nume}
            {...register('nume')}
          />
          {errors.nume && <p className={styles.eroare}>{errors.nume.message}</p>}
        </div>
        <div className={styles.camp}>
          <label htmlFor="of-email" className={styles.eticheta}>
            {t.email} <span className={styles.obligatoriu}>*</span>
          </label>
          <input
            id="of-email"
            type="email"
            autoComplete="email"
            placeholder={t.exEmail}
            className={styles.input}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && <p className={styles.eroare}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Telefon + Website existent */}
      <div className={styles.rand}>
        <div className={styles.camp}>
          <label htmlFor="of-telefon" className={styles.eticheta}>
            {t.telefon} <span className={styles.obligatoriu}>*</span>
          </label>
          <input
            id="of-telefon"
            type="tel"
            autoComplete="tel"
            placeholder={t.exTelefon}
            className={styles.input}
            aria-invalid={!!errors.telefon}
            {...register('telefon')}
          />
          {errors.telefon && <p className={styles.eroare}>{errors.telefon.message}</p>}
        </div>
        <div className={styles.camp}>
          <label htmlFor="of-website" className={styles.eticheta}>
            {t.website} <span className={styles.optional}>{t.optional}</span>
          </label>
          <input
            id="of-website"
            type="url"
            placeholder={t.exWebsite}
            className={styles.input}
            {...register('websiteExistent')}
          />
        </div>
      </div>

      {/* Cum ai aflat de noi */}
      <div className={styles.camp}>
        <label htmlFor="of-sursa" className={styles.eticheta}>
          {t.sursa} <span className={styles.optional}>{t.optional}</span>
        </label>
        <select
          id="of-sursa"
          {...register('cumAiAflat')}
          className={styles.select}
          data-gol={watch('cumAiAflat') === ''}
        >
          {t.surse.map((o) => (
            <option key={o.valoare} value={o.valoare}>
              {o.eticheta}
            </option>
          ))}
        </select>
      </div>

      {/* GDPR */}
      <div className={styles.camp}>
        <div className={styles.acord}>
          <input
            id="of-gdpr"
            type="checkbox"
            className={styles.bifa}
            checked={watchAcord === true}
            onChange={(e) => {
              setValue('acordPrivacitate', e.target.checked ? true : (undefined as unknown as true));
            }}
            aria-invalid={!!errors.acordPrivacitate}
          />
          <label htmlFor="of-gdpr" className={styles.acordText}>
            {t.acord[0]}
            <Link href={cale(lang, '/politica-de-confidentialitate')} target="_blank">
              {t.acord[1]}
            </Link>
            {t.acord[2]}
          </label>
        </div>
        {errors.acordPrivacitate && <p className={styles.eroare}>{errors.acordPrivacitate.message}</p>}
      </div>

      {submitStatus === 'error' && (
        <div className={styles.esec} role="alert">
          <AlertCircle aria-hidden />
          {t.eroare.replace('{telefon}', telefon)}
        </div>
      )}

      <button type="submit" className={styles.trimite} disabled={submitStatus === 'loading'}>
        {submitStatus === 'loading' ? t.seTrimite : t.trimite}
        {submitStatus !== 'loading' && <ArrowRight aria-hidden />}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported wrapper (Suspense boundary is in parent page.tsx)         */
/* ------------------------------------------------------------------ */

export function OfertaFormWrapper(props: Props) {
  return <OfertaFormInner {...props} />;
}
