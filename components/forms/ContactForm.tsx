'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const SERVICII = [
  { value: '', label: 'Selecteaza un serviciu' },
  { value: 'magazin-online', label: 'Magazin Online' },
  { value: 'website-prezentare', label: 'Website de Prezentare' },
  { value: 'aplicatii-mobile', label: 'Aplicatii Mobile iOS & Android' },
  { value: 'automatizari-ai', label: 'Automatizari AI' },
  { value: 'aplicatii-web-saas', label: 'Aplicatii Web / SaaS' },
  { value: 'cms-crm-erp', label: 'CMS / CRM / ERP' },
  { value: 'seo-marketing', label: 'SEO & Marketing Digital' },
  { value: 'altele', label: 'Altele / Nu stiu inca' },
];

const schema = z.object({
  nume:             z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email:            z.string().email('Email invalid'),
  telefon:          z.string().min(10, 'Telefonul trebuie să aibă cel puțin 10 cifre'),
  companie:         z.string().optional(),
  serviciu:         z.string().min(1, 'Te rugam sa selectezi un serviciu'),
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
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-16 px-8 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl">
        <CheckCircle2 size={52} className="text-[#16A34A] mb-4" />
        <h3
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem', color: '#0D1117' }}
          className="mb-2"
        >
          Mesaj trimis cu succes!
        </h3>
        <p className="text-[#4A5568] text-[0.9375rem] mb-6">
          Te contactam in maximum <strong>24 de ore</strong>.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-[#2B8FCC] hover:underline font-medium"
        >
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

        {/* Rand 1: Nume + Email */}
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="nume"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1117] font-semibold text-[13px]">
                  Nume complet <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ion Popescu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1117] font-semibold text-[13px]">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ion@firma.ro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Rand 2: Telefon + Companie */}
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="telefon"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1117] font-semibold text-[13px]">
                  Telefon <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="07xx xxx xxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companie"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1117] font-semibold text-[13px]">
                  Companie <span className="text-[#8A94A6] font-normal">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Firma SRL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Rand 3: Serviciu */}
        <FormField
          control={form.control}
          name="serviciu"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0D1117] font-semibold text-[13px]">
                Serviciu de interes <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full h-10 rounded-lg border border-[#E8ECF0] bg-white px-3 text-[14px] text-[#0D1117] focus:outline-none focus:ring-2 focus:ring-[#2B8FCC] focus:border-transparent transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {SERVICII.map((s) => (
                    <option key={s.value} value={s.value} disabled={s.value === ''}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rand 4: Mesaj */}
        <FormField
          control={form.control}
          name="mesaj"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0D1117] font-semibold text-[13px]">
                Mesaj <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Descrie pe scurt ce ai nevoie..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GDPR */}
        <FormField
          control={form.control}
          name="acordPrivacitate"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                </FormControl>
                <FormLabel className="text-[13px] text-[#4A5568] font-normal cursor-pointer leading-relaxed">
                  Sunt de acord cu{' '}
                  <a href="/politica-de-confidentialitate" className="text-[#2B8FCC] hover:underline" target="_blank">
                    Politica de Confidentialitate
                  </a>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error */}
        {status === 'error' && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            A aparut o eroare. Incearca din nou sau suna la 0750 456 096.
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          loading={status === 'loading'}
          rightIcon={<Send size={16} />}
          className="w-full sm:w-auto"
        >
          Trimite mesajul
        </Button>
      </form>
    </Form>
  );
}
