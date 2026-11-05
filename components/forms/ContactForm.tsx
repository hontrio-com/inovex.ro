'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackConversions } from '@/lib/gtm';
import { trackTikTok } from '@/lib/tiktok';
import { trackEvent, generateEventId } from '@/lib/meta-pixel';
import { measure as oaiqMeasure } from '@/lib/openai-pixel';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import styles from './Formular.module.css';

// valorile ajung asa in CRM (/api/contact): se schimba doar etichetele
const SERVICII = [
  { value: '', label: 'Alege un serviciu' },
  { value: 'magazin-online', label: 'Magazin online' },
  { value: 'website-prezentare', label: 'Website de prezentare' },
  { value: 'aplicatii-mobile', label: 'Aplicații mobile iOS și Android' },
  { value: 'automatizari-ai', label: 'Automatizări AI' },
  { value: 'aplicatii-web-saas', label: 'Aplicații web și SaaS' },
  { value: 'cms-crm-erp', label: 'CMS, CRM și ERP' },
  { value: 'seo-marketing', label: 'SEO și marketing digital' },
  { value: 'altele', label: 'Altele / Nu știu încă' },
];

const schema = z.object({
  nume:             z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email:            z.string().email('Email invalid'),
  telefon:          z.string().min(10, 'Telefonul trebuie să aibă cel puțin 10 cifre'),
  companie:         z.string().optional(),
  serviciu:         z.string().min(1, 'Te rugăm să alegi un serviciu'),
  mesaj:            z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
  acordPrivacitate: z.literal<boolean>(true, { message: 'Trebuie să accepți politica de confidențialitate' }),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nume: '', email: '', telefon: '', companie: '',
      serviciu: '', mesaj: '', acordPrivacitate: false,
    },
  });

  async function onSubmit(data: FormData) {
    setStatus('loading');
    const metaEventId = generateEventId();
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'X-Meta-Event-Id': metaEventId },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
      trackConversions.formularContact(metaEventId);
      trackTikTok.formularContact();
      trackEvent('Contact');
      trackEvent('Lead', { content_name: 'contact', content_category: data.serviciu }, metaEventId);
      // ChatGPT Ads: acelasi event id ca la Meta => perechea server-side se deduplica.
      oaiqMeasure('lead_created', {}, metaEventId);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.succes} role="status">
        <span className={styles.succesIcon}>
          <CheckCircle2 aria-hidden />
        </span>
        <h3 className={styles.succesTitlu}>Mesaj trimis cu succes</h3>
        <p className={styles.succesText}>
          Te contactăm în maximum <strong>24 de ore</strong>.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className={styles.inca}>
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className={styles.formular}>
        <div className={styles.rand}>
          <FormField
            control={form.control}
            name="nume"
            render={({ field }) => (
              <FormItem className={styles.camp}>
                <FormLabel className={styles.eticheta}>
                  Nume complet <span className={styles.obligatoriu}>*</span>
                </FormLabel>
                <FormControl>
                  <input autoComplete="name" placeholder="Ion Popescu" className={styles.input} {...field} />
                </FormControl>
                <FormMessage className={styles.eroare} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={styles.camp}>
                <FormLabel className={styles.eticheta}>
                  Email <span className={styles.obligatoriu}>*</span>
                </FormLabel>
                <FormControl>
                  <input type="email" autoComplete="email" placeholder="ion@firma.ro" className={styles.input} {...field} />
                </FormControl>
                <FormMessage className={styles.eroare} />
              </FormItem>
            )}
          />
        </div>

        <div className={styles.rand}>
          <FormField
            control={form.control}
            name="telefon"
            render={({ field }) => (
              <FormItem className={styles.camp}>
                <FormLabel className={styles.eticheta}>
                  Telefon <span className={styles.obligatoriu}>*</span>
                </FormLabel>
                <FormControl>
                  <input type="tel" autoComplete="tel" placeholder="07xx xxx xxx" className={styles.input} {...field} />
                </FormControl>
                <FormMessage className={styles.eroare} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companie"
            render={({ field }) => (
              <FormItem className={styles.camp}>
                <FormLabel className={styles.eticheta}>
                  Companie <span className={styles.optional}>(opțional)</span>
                </FormLabel>
                <FormControl>
                  <input autoComplete="organization" placeholder="Firma SRL" className={styles.input} {...field} />
                </FormControl>
                <FormMessage className={styles.eroare} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="serviciu"
          render={({ field }) => (
            <FormItem className={styles.camp}>
              <FormLabel className={styles.eticheta}>
                Serviciu de interes <span className={styles.obligatoriu}>*</span>
              </FormLabel>
              <FormControl>
                <select className={styles.select} data-gol={field.value === ''} {...field}>
                  {SERVICII.map((s) => (
                    <option key={s.value} value={s.value} disabled={s.value === ''}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage className={styles.eroare} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mesaj"
          render={({ field }) => (
            <FormItem className={styles.camp}>
              <FormLabel className={styles.eticheta}>
                Mesaj <span className={styles.obligatoriu}>*</span>
              </FormLabel>
              <FormControl>
                <textarea rows={5} placeholder="Descrie pe scurt ce ai nevoie..." className={styles.textarea} {...field} />
              </FormControl>
              <FormMessage className={styles.eroare} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acordPrivacitate"
          render={({ field }) => (
            <FormItem className={styles.camp}>
              <div className={styles.acord}>
                <FormControl>
                  <input
                    type="checkbox"
                    className={styles.bifa}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormLabel className={styles.acordText}>
                  Sunt de acord cu{' '}
                  <a href="/politica-de-confidentialitate" target="_blank">
                    Politica de confidențialitate
                  </a>
                </FormLabel>
              </div>
              <FormMessage className={styles.eroare} />
            </FormItem>
          )}
        />

        {status === 'error' && (
          <div className={styles.esec} role="alert">
            <AlertCircle aria-hidden />
            A apărut o eroare. Încearcă din nou sau sună la {TELEFON.text}.
          </div>
        )}

        <button type="submit" className={styles.trimite} disabled={status === 'loading'}>
          {status === 'loading' ? 'Se trimite...' : 'Trimite mesajul'}
          {status !== 'loading' && <ArrowRight aria-hidden />}
        </button>
      </form>
    </Form>
  );
}
