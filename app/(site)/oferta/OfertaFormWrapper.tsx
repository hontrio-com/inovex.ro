'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { pushEvent } from '@/lib/gtm';
import { trackEvent } from '@/lib/meta-pixel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

/* ------------------------------------------------------------------ */
/*  Schema                                                              */
/* ------------------------------------------------------------------ */

const schema = z.object({
  serviciu: z.string().min(1, 'Selecteaza un serviciu'),
  descriereProiect: z.string().min(10, 'Minim 10 caractere'),
  nume: z.string().min(2, 'Minim 2 caractere'),
  email: z.string().email('Email invalid'),
  telefon: z.string().min(10, 'Minim 10 cifre'),
  websiteExistent: z.string().optional(),
  cumAiAflat: z.string().optional(),
  acordPrivacitate: z.literal<boolean>(true, {
    error: 'Obligatoriu',
  }),
});

type FormValues = z.infer<typeof schema>;

/* ------------------------------------------------------------------ */
/*  Inner component (uses useSearchParams)                             */
/* ------------------------------------------------------------------ */

function OfertaFormInner() {
  const shouldReduceMotion = useReducedMotion();
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
    try {
      const res = await fetch('/api/oferta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitStatus('success');
        pushEvent('form_oferta_success', { serviciu: values.serviciu });
        trackEvent('SubmitApplication');
        trackEvent('Lead', { content_name: 'oferta', content_category: values.serviciu });
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
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl border border-[#E8ECF0] p-8 text-center"
      >
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          <CheckCircle2 size={64} className="text-[#10B981] mx-auto mb-6" />
        </motion.div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 'clamp(1.6rem,2.5vw,2rem)',
            color: '#0D1117',
          }}
          className="mb-3"
        >
          Cererea ta a fost trimisa cu succes!
        </h2>
        <p style={{ fontSize: '1.0625rem', color: '#4A5568', lineHeight: 1.7 }} className="mb-8">
          Un consultant Inovex te va contacta in maximum 24 de ore pentru a discuta detaliile
          proiectului tau.
        </p>
        <div className="bg-[#EAF5FF] border border-[#C8E6F8] rounded-xl p-5 mb-8 text-left">
          <p style={{ fontSize: '14px', color: '#0D1117', fontWeight: 600 }} className="mb-1">
            Verificati telefonul si emailul in urmatoarele ore.
          </p>
          <p style={{ fontSize: '13px', color: '#4A5568' }}>
            Numarul nostru: <strong>0750 456 096</strong>
          </p>
        </div>
        <Button href="/">Inapoi la inovex.ro</Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl border border-[#E8ECF0] p-6 sm:p-8"
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1.25rem',
            color: '#0D1117',
            marginBottom: '24px',
          }}
        >
          Detalii proiect
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          {/* Serviciu */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="of-serviciu">Serviciu solicitat *</Label>
            <select
              id="of-serviciu"
              {...register('serviciu')}
              className="w-full h-10 rounded-lg border border-[#E8ECF0] bg-white px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2B8FCC]"
              aria-invalid={!!errors.serviciu}
            >
              <option value="">Selecteaza un serviciu</option>
              <option value="Magazin Online">Magazin Online</option>
              <option value="Website de Prezentare">Website de Prezentare</option>
              <option value="Aplicatie Web & SaaS">Aplicatie Web &amp; SaaS</option>
              <option value="CMS, CRM & ERP">CMS, CRM &amp; ERP</option>
              <option value="Aplicatie Mobila">Aplicatie Mobila</option>
              <option value="Automatizari AI">Automatizari AI</option>
              <option value="Altul">Altul</option>
            </select>
            {errors.serviciu && (
              <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.serviciu.message}</p>
            )}
            {watchServiciuValue === 'Magazin Online' && (
              <p style={{ fontSize: '12px', color: '#4A5568', marginTop: '4px' }}>
                Preferi sa folosesti configuratorul dedicat?{' '}
                <Link
                  href="/configurare-magazin-online"
                  className="text-[#2B8FCC] hover:underline font-medium"
                >
                  Configurator Magazine Online
                </Link>
              </p>
            )}
            {watchServiciuValue === 'Website de Prezentare' && (
              <p style={{ fontSize: '12px', color: '#4A5568', marginTop: '4px' }}>
                Preferi sa folosesti configuratorul dedicat?{' '}
                <Link
                  href="/configurare-website-prezentare"
                  className="text-[#2B8FCC] hover:underline font-medium"
                >
                  Configurator Website Prezentare
                </Link>
              </p>
            )}
          </div>

          {/* Descriere proiect */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="of-descriere">Descrie pe scurt proiectul tau *</Label>
            <Textarea
              id="of-descriere"
              rows={4}
              style={{ minHeight: '120px' }}
              placeholder="Ex: Vreau un magazin online pentru vanzarea de produse cosmetice, am aproximativ 100 de produse..."
              aria-invalid={!!errors.descriereProiect}
              {...register('descriereProiect')}
            />
            {errors.descriereProiect && (
              <p style={{ fontSize: '12px', color: '#EF4444' }}>
                {errors.descriereProiect.message}
              </p>
            )}
          </div>

          {/* Nume + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="of-nume">Nume complet *</Label>
              <Input
                id="of-nume"
                placeholder="Ion Popescu"
                aria-invalid={!!errors.nume}
                {...register('nume')}
              />
              {errors.nume && (
                <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.nume.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="of-email">Email *</Label>
              <Input
                id="of-email"
                type="email"
                placeholder="ion@companie.ro"
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Telefon + Website existent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="of-telefon">Telefon *</Label>
              <Input
                id="of-telefon"
                type="tel"
                placeholder="0750 456 096"
                aria-invalid={!!errors.telefon}
                {...register('telefon')}
              />
              {errors.telefon && (
                <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors.telefon.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="of-website">
                Website existent{' '}
                <span style={{ color: '#8A94A6', fontWeight: 400 }}>(optional)</span>
              </Label>
              <Input
                id="of-website"
                type="url"
                placeholder="https://siteulmeu.ro"
                {...register('websiteExistent')}
              />
            </div>
          </div>

          {/* Cum ai aflat de noi */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="of-sursa">
              Cum ai aflat de noi?{' '}
              <span style={{ color: '#8A94A6', fontWeight: 400 }}>(optional)</span>
            </Label>
            <select
              id="of-sursa"
              {...register('cumAiAflat')}
              className="w-full h-10 rounded-lg border border-[#E8ECF0] bg-white px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2B8FCC]"
            >
              <option value="">Selecteaza o optiune</option>
              <option value="Google">Google</option>
              <option value="Facebook / Instagram">Facebook / Instagram</option>
              <option value="Recomandare">Recomandare</option>
              <option value="TikTok">TikTok</option>
              <option value="Am mai lucrat cu voi">Am mai lucrat cu voi</option>
              <option value="Altul">Altul</option>
            </select>
          </div>

          {/* GDPR */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="of-gdpr"
                checked={watchAcord === true}
                onCheckedChange={(checked) => {
                  setValue('acordPrivacitate', checked === true ? true : (undefined as unknown as true));
                }}
                aria-invalid={!!errors.acordPrivacitate}
              />
              <Label htmlFor="of-gdpr" className="cursor-pointer leading-relaxed">
                Sunt de acord cu{' '}
                <Link
                  href="/politica-de-confidentialitate"
                  className="text-[#2B8FCC] hover:underline"
                  target="_blank"
                >
                  Politica de Confidentialitate
                </Link>
              </Label>
            </div>
            {errors.acordPrivacitate && (
              <p style={{ fontSize: '12px', color: '#EF4444' }}>
                {errors.acordPrivacitate.message}
              </p>
            )}
          </div>

          {submitStatus === 'error' && (
            <div
              className="rounded-lg px-4 py-3"
              style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                fontSize: '14px',
                color: '#DC2626',
              }}
            >
              A aparut o eroare. Te rugam sa incerci din nou sau sa ne contactezi telefonic la 0750
              456 096.
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            loading={submitStatus === 'loading'}
            rightIcon={<Send size={16} />}
            className="w-full sm:w-auto"
          >
            Trimite cererea de oferta
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported wrapper (Suspense boundary is in parent page.tsx)         */
/* ------------------------------------------------------------------ */

export function OfertaFormWrapper() {
  return <OfertaFormInner />;
}
