'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import Link from 'next/link';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import styles from '@/components/forms/Formular.module.css';

/* ------------------------------------------------------------------ */
/*  Schema                                                              */
/* ------------------------------------------------------------------ */

const schema = z.object({
  serviciu: z.string().min(1, 'Alege un serviciu'),
  descriereProiect: z.string().min(10, 'Scrie cel puțin 10 caractere'),
  nume: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Email invalid'),
  telefon: z.string().min(10, 'Telefonul trebuie să aibă cel puțin 10 cifre'),
  websiteExistent: z.string().optional(),
  cumAiAflat: z.string().optional(),
  acordPrivacitate: z.literal<boolean>(true, {
    error: 'Trebuie să accepți politica de confidențialitate',
  }),
});

type FormValues = z.infer<typeof schema>;

// pentru serviciile care au configurator, sub lista apare linkul catre el
const CONFIGURATOARE: Record<string, { href: string; nume: string }> = {
  'Magazin Online': { href: '/configurare-magazin-online', nume: 'Configuratorul de magazin online' },
  'Website de Prezentare': { href: '/configurare-website-prezentare', nume: 'Configuratorul de website de prezentare' },
  'Aplicatie Web & SaaS': { href: '/configurare-aplicatie-web', nume: 'Configuratorul de aplicație web' },
  'Automatizari AI': { href: '/configurare-automatizari-ai', nume: 'Configuratorul de automatizări AI' },
};

/* ------------------------------------------------------------------ */
/*  Inner component (uses useSearchParams)                             */
/* ------------------------------------------------------------------ */

function OfertaFormInner() {
  const searchParams = useSearchParams();
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
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitStatus('success');
        trackConversions.formularOferta();
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
        <h2 className={styles.succesTitlu}>Cererea ta a fost trimisă</h2>
        <p className={styles.succesText}>
          Un consultant Inovex te contactează în maximum <strong>24 de ore</strong> pentru a discuta detaliile
          proiectului tău. Verifică telefonul și emailul în următoarele ore.
        </p>
        <Link href="/" className={styles.inca}>
          Înapoi la prima pagină
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.formular}>
      {/* Serviciu */}
      <div className={styles.camp}>
        <label htmlFor="of-serviciu" className={styles.eticheta}>
          Serviciu solicitat <span className={styles.obligatoriu}>*</span>
        </label>
        {/* valorile ajung asa in CRM si vin din linkurile „/oferta?serviciu=...”: se schimba doar etichetele */}
        <select
          id="of-serviciu"
          {...register('serviciu')}
          className={styles.select}
          data-gol={watchServiciuValue === ''}
          aria-invalid={!!errors.serviciu}
        >
          <option value="">Alege un serviciu</option>
          <option value="Magazin Online">Magazin online</option>
          <option value="Website de Prezentare">Website de prezentare</option>
          <option value="Aplicatie Web & SaaS">Aplicație web și SaaS</option>
          <option value="CMS, CRM & ERP">CMS, CRM și ERP</option>
          <option value="Aplicatie Mobila">Aplicație mobilă</option>
          <option value="Automatizari AI">Automatizări AI</option>
          <option value="Altul">Altul</option>
        </select>
        {errors.serviciu && <p className={styles.eroare}>{errors.serviciu.message}</p>}
        {CONFIGURATOARE[watchServiciuValue] && (
          <p className={styles.indiciu}>
            Preferi un formular ghidat, pas cu pas?{' '}
            <Link href={CONFIGURATOARE[watchServiciuValue].href}>{CONFIGURATOARE[watchServiciuValue].nume}</Link>
          </p>
        )}
      </div>

      {/* Descriere proiect */}
      <div className={styles.camp}>
        <label htmlFor="of-descriere" className={styles.eticheta}>
          Descrie pe scurt proiectul tău <span className={styles.obligatoriu}>*</span>
        </label>
        <textarea
          id="of-descriere"
          rows={4}
          className={styles.textarea}
          placeholder="Ex: Vreau un magazin online pentru vânzarea de produse cosmetice, am aproximativ 100 de produse..."
          aria-invalid={!!errors.descriereProiect}
          {...register('descriereProiect')}
        />
        {errors.descriereProiect && <p className={styles.eroare}>{errors.descriereProiect.message}</p>}
      </div>

      {/* Nume + Email */}
      <div className={styles.rand}>
        <div className={styles.camp}>
          <label htmlFor="of-nume" className={styles.eticheta}>
            Nume complet <span className={styles.obligatoriu}>*</span>
          </label>
          <input
            id="of-nume"
            autoComplete="name"
            placeholder="Ion Popescu"
            className={styles.input}
            aria-invalid={!!errors.nume}
            {...register('nume')}
          />
          {errors.nume && <p className={styles.eroare}>{errors.nume.message}</p>}
        </div>
        <div className={styles.camp}>
          <label htmlFor="of-email" className={styles.eticheta}>
            Email <span className={styles.obligatoriu}>*</span>
          </label>
          <input
            id="of-email"
            type="email"
            autoComplete="email"
            placeholder="ion@companie.ro"
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
            Telefon <span className={styles.obligatoriu}>*</span>
          </label>
          <input
            id="of-telefon"
            type="tel"
            autoComplete="tel"
            placeholder="07xx xxx xxx"
            className={styles.input}
            aria-invalid={!!errors.telefon}
            {...register('telefon')}
          />
          {errors.telefon && <p className={styles.eroare}>{errors.telefon.message}</p>}
        </div>
        <div className={styles.camp}>
          <label htmlFor="of-website" className={styles.eticheta}>
            Website existent <span className={styles.optional}>(opțional)</span>
          </label>
          <input
            id="of-website"
            type="url"
            placeholder="https://siteulmeu.ro"
            className={styles.input}
            {...register('websiteExistent')}
          />
        </div>
      </div>

      {/* Cum ai aflat de noi */}
      <div className={styles.camp}>
        <label htmlFor="of-sursa" className={styles.eticheta}>
          Cum ai aflat de noi? <span className={styles.optional}>(opțional)</span>
        </label>
        <select
          id="of-sursa"
          {...register('cumAiAflat')}
          className={styles.select}
          data-gol={watch('cumAiAflat') === ''}
        >
          <option value="">Alege o opțiune</option>
          <option value="Google">Google</option>
          <option value="Facebook / Instagram">Facebook / Instagram</option>
          <option value="Recomandare">Recomandare</option>
          <option value="TikTok">TikTok</option>
          <option value="Am mai lucrat cu voi">Am mai lucrat cu voi</option>
          <option value="Altul">Altul</option>
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
            Sunt de acord cu{' '}
            <Link href="/politica-de-confidentialitate" target="_blank">
              Politica de confidențialitate
            </Link>
          </label>
        </div>
        {errors.acordPrivacitate && <p className={styles.eroare}>{errors.acordPrivacitate.message}</p>}
      </div>

      {submitStatus === 'error' && (
        <div className={styles.esec} role="alert">
          <AlertCircle aria-hidden />
          A apărut o eroare. Te rugăm să încerci din nou sau să ne suni la {TELEFON.text}.
        </div>
      )}

      <button type="submit" className={styles.trimite} disabled={submitStatus === 'loading'}>
        {submitStatus === 'loading' ? 'Se trimite...' : 'Trimite cererea de ofertă'}
        {submitStatus !== 'loading' && <ArrowRight aria-hidden />}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported wrapper (Suspense boundary is in parent page.tsx)         */
/* ------------------------------------------------------------------ */

export function OfertaFormWrapper() {
  return <OfertaFormInner />;
}
