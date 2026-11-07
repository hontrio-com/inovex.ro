'use client';

import { useMemo, useState } from 'react';
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
import { cale, type Limba } from '@/lib/i18n/config';
import type { TextFormulare } from '@/lib/i18n/pagini/formulare';
import styles from './Formular.module.css';

type Text = TextFormulare['formularContact'];

// valorile serviciilor ajung asa in CRM (/api/contact), in orice limba: se traduc doar etichetele
// (lib/i18n/pagini/formulare.ts). Regulile de validare, cu mesajele in limba paginii:
const schemaPentru = (e: Text['erori']) =>
  z.object({
    nume:             z.string().min(2, e.nume),
    email:            z.string().email(e.email),
    telefon:          z.string().min(10, e.telefon),
    companie:         z.string().optional(),
    serviciu:         z.string().min(1, e.serviciu),
    mesaj:            z.string().min(10, e.mesaj),
    acordPrivacitate: z.literal<boolean>(true, { message: e.acord }),
  });

type FormData = z.infer<ReturnType<typeof schemaPentru>>;

export function ContactForm({ lang, t, telefon }: { lang: Limba; t: Text; telefon: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const schema = useMemo(() => schemaPentru(t.erori), [t.erori]);

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
        // limba: emailul de confirmare pleaca in limba paginii, iar in CRM se vede de unde a venit
        body:    JSON.stringify({ ...data, limba: lang }),
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
        <h3 className={styles.succesTitlu}>{t.succesTitlu}</h3>
        <p className={styles.succesText}>
          {t.succesText[0]}
          <strong>{t.succesText[1]}</strong>
          {t.succesText[2]}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className={styles.inca}>
          {t.altMesaj}
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
                  {t.nume} <span className={styles.obligatoriu}>*</span>
                </FormLabel>
                <FormControl>
                  <input autoComplete="name" placeholder={t.exNume} className={styles.input} {...field} />
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
                  {t.email} <span className={styles.obligatoriu}>*</span>
                </FormLabel>
                <FormControl>
                  <input type="email" autoComplete="email" placeholder={t.exEmail} className={styles.input} {...field} />
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
                  {t.telefon} <span className={styles.obligatoriu}>*</span>
                </FormLabel>
                <FormControl>
                  <input type="tel" autoComplete="tel" placeholder={t.exTelefon} className={styles.input} {...field} />
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
                  {t.companie} <span className={styles.optional}>{t.optional}</span>
                </FormLabel>
                <FormControl>
                  <input autoComplete="organization" placeholder={t.exCompanie} className={styles.input} {...field} />
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
                {t.serviciu} <span className={styles.obligatoriu}>*</span>
              </FormLabel>
              <FormControl>
                <select className={styles.select} data-gol={field.value === ''} {...field}>
                  {t.servicii.map((s) => (
                    <option key={s.valoare} value={s.valoare} disabled={s.valoare === ''}>
                      {s.eticheta}
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
                {t.mesaj} <span className={styles.obligatoriu}>*</span>
              </FormLabel>
              <FormControl>
                <textarea rows={5} placeholder={t.exMesaj} className={styles.textarea} {...field} />
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
                  {t.acord[0]}
                  <a href={cale(lang, '/politica-de-confidentialitate')} target="_blank">
                    {t.acord[1]}
                  </a>
                  {t.acord[2]}
                </FormLabel>
              </div>
              <FormMessage className={styles.eroare} />
            </FormItem>
          )}
        />

        {status === 'error' && (
          <div className={styles.esec} role="alert">
            <AlertCircle aria-hidden />
            {t.eroare.replace('{telefon}', telefon)}
          </div>
        )}

        <button type="submit" className={styles.trimite} disabled={status === 'loading'}>
          {status === 'loading' ? t.seTrimite : t.trimite}
          {status !== 'loading' && <ArrowRight aria-hidden />}
        </button>
      </form>
    </Form>
  );
}
