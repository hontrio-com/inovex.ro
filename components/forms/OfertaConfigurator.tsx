'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Schema completă — câmpurile opționale per pas sunt validate la submit
const schema = z.object({
  tipEntitate: z.string().min(1, 'Selectează tipul entității'),
  tipProiect: z.array(z.string()).min(1, 'Selectează cel puțin un tip de proiect'),
  industrie: z.string().optional(),
  detalii: z.record(z.string(), z.string()),
  timeline: z.string().min(1, 'Selectează un timeline'),
  buget: z.string().min(1, 'Selectează un buget'),
  nume: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Email invalid'),
  telefon: z.string().min(10, 'Telefonul trebuie să aibă cel puțin 10 cifre'),
  companie: z.string().optional(),
  websiteExistent: z.string().optional(),
  mesajAditional: z.string().optional(),
  acordPrivacitate: z.literal(true, 'Trebuie să accepți politica de confidențialitate'),
});

type FormData = z.infer<typeof schema>;

const ENTITATI = [
  { value: 'persoana-fizica', label: 'Persoană fizică / Freelancer' },
  { value: 'microintreprindere', label: 'Microîntreprindere (< 10 angajați)' },
  { value: 'imm', label: 'IMM (10-250 angajați)' },
  { value: 'companie-mare', label: 'Companie mare / Corporație' },
  { value: 'startup', label: 'Start-up (< 1 an)' },
];

const TIP_PROIECT = [
  'Magazin Online',
  'Website de Prezentare',
  'Aplicație Web / SaaS',
  'CMS / CRM / ERP',
  'Aplicație Mobilă',
  'Blog / Portal de știri',
  'Landing Page campanie',
];

const INDUSTRII = [
  'Fashion / Îmbrăcăminte', 'Electronice', 'Cosmetice / Parfumuri', 'Mobilă / Decorațiuni',
  'Alimentar / Produse naturale', 'Sport / Fitness', 'Auto', 'Imobiliare',
  'Construcții / Renovări', 'Medical / Stomatologie', 'Juridic / Contabilitate',
  'HoReCa / Restaurant', 'Turism / Agenție vacanțe', 'Educație / Cursuri online',
  'Servicii B2B', 'Altele',
];

const TIMELINE = [
  { value: 'urgent', label: 'Cât mai repede posibil (urgent)' },
  { value: '1-2-luni', label: '1-2 luni' },
  { value: '2-4-luni', label: '2-4 luni' },
  { value: '4-6-luni', label: '4-6 luni' },
  { value: 'flexibil', label: 'Flexibil, important calitatea' },
];

const BUGETE = [
  { value: 'sub-1000', label: 'Sub 1.000 EUR' },
  { value: '1000-3000', label: '1.000 - 3.000 EUR' },
  { value: '3000-7000', label: '3.000 - 7.000 EUR' },
  { value: '7000-15000', label: '7.000 - 15.000 EUR' },
  { value: 'peste-15000', label: 'Peste 15.000 EUR' },
  { value: 'nespecificat', label: 'Prefer să nu specific' },
];

const PASI = ['Entitate', 'Proiect', 'Industrie', 'Detalii', 'Timeline & Buget', 'Contact'];

const STORAGE_KEY = 'inovex_oferta_draft';

export function OfertaConfigurator() {
  const [pas, setPas] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [tipProiectSelectat, setTipProiectSelectat] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipProiect: [],
      detalii: {},
    },
  });

  // Salvare draft în localStorage
  useEffect(() => {
    const draft = localStorage.getItem(STORAGE_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        Object.entries(parsed).forEach(([k, v]) => setValue(k as keyof FormData, v as never));
        if (parsed.tipProiect) setTipProiectSelectat(parsed.tipProiect);
      } catch { /* ignorăm erorile de parsare */ }
    }
  }, [setValue]);

  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);

  function toggleTipProiect(tip: string) {
    const updated = tipProiectSelectat.includes(tip)
      ? tipProiectSelectat.filter((t) => t !== tip)
      : [...tipProiectSelectat, tip];
    setTipProiectSelectat(updated);
    setValue('tipProiect', updated);
  }

  async function onSubmit(data: FormData) {
    setStatus('loading');
    try {
      const res = await fetch('/api/oferta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center max-w-xl mx-auto">
        <CheckCircle size={56} className="text-green-500 mx-auto mb-5" />
        <h2 className="text-2xl font-semibold text-gray-950 mb-3">Cererea a fost trimisă!</h2>
        <p className="text-gray-500 leading-relaxed">
          Vei fi contactat în maximum <strong>24 de ore</strong> cu o estimare personalizată.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 text-xs text-gray-400">
          <span>Pasul {pas + 1} din {PASI.length}</span>
          <span>{PASI[pas]}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={false}
            animate={{ width: `${((pas + 1) / PASI.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={pas}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pas 1 — Tip entitate */}
            {pas === 0 && (
              <PasWrapper titlu="Spune-ne despre tine">
                <div className="space-y-3">
                  {ENTITATI.map((e) => (
                    <RadioCard
                      key={e.value}
                      {...register('tipEntitate')}
                      value={e.value}
                      label={e.label}
                      checked={watchedValues.tipEntitate === e.value}
                    />
                  ))}
                </div>
                {errors.tipEntitate && <ErrorMsg msg={errors.tipEntitate.message} />}
              </PasWrapper>
            )}

            {/* Pas 2 — Tip proiect */}
            {pas === 1 && (
              <PasWrapper titlu="Ce dorești să construiești?">
                <div className="space-y-3">
                  {TIP_PROIECT.map((tip) => (
                    <CheckCard
                      key={tip}
                      label={tip}
                      checked={tipProiectSelectat.includes(tip)}
                      onChange={() => toggleTipProiect(tip)}
                    />
                  ))}
                </div>
                {errors.tipProiect && <ErrorMsg msg={errors.tipProiect.message as string} />}
              </PasWrapper>
            )}

            {/* Pas 3 — Industrie */}
            {pas === 2 && (
              <PasWrapper titlu="Ce industrie reprezinți?">
                <div className="grid sm:grid-cols-2 gap-2">
                  {INDUSTRII.map((ind) => (
                    <RadioCard
                      key={ind}
                      {...register('industrie')}
                      value={ind}
                      label={ind}
                      checked={watchedValues.industrie === ind}
                    />
                  ))}
                </div>
              </PasWrapper>
            )}

            {/* Pas 4 — Detalii */}
            {pas === 3 && (
              <PasWrapper titlu="Câteva detalii despre proiect">
                {tipProiectSelectat.includes('Magazin Online') && (
                  <div className="space-y-4">
                    <SelectField label="Câte produse estimat?">
                      <select {...register('detalii.produse')} className={inputClass}>
                        <option value="">Selectează...</option>
                        <option value="sub-50">Sub 50</option>
                        <option value="50-200">50-200</option>
                        <option value="200-1000">200-1.000</option>
                        <option value="1000+">Peste 1.000</option>
                      </select>
                    </SelectField>
                    <SelectField label="Platformă preferată?">
                      <select {...register('detalii.platforma')} className={inputClass}>
                        <option value="">Selectează...</option>
                        <option value="woocommerce">WooCommerce</option>
                        <option value="shopify">Shopify</option>
                        <option value="nu-stiu">Nu știu, recomandați voi</option>
                      </select>
                    </SelectField>
                  </div>
                )}
                {tipProiectSelectat.includes('Website de Prezentare') && (
                  <div className="space-y-4 mt-4">
                    <SelectField label="Câte pagini estimat?">
                      <select {...register('detalii.pagini')} className={inputClass}>
                        <option value="">Selectează...</option>
                        <option value="sub-5">Sub 5</option>
                        <option value="5-15">5-15</option>
                        <option value="15-30">15-30</option>
                        <option value="30+">Peste 30</option>
                      </select>
                    </SelectField>
                  </div>
                )}
                {(tipProiectSelectat.includes('Aplicație Web / SaaS') ||
                  tipProiectSelectat.includes('CMS / CRM / ERP') ||
                  tipProiectSelectat.includes('Aplicație Mobilă')) && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">Descriere scurtă</label>
                    <textarea
                      {...register('detalii.descriere')}
                      rows={4}
                      maxLength={500}
                      placeholder="Descrie pe scurt ce funcționalități trebuie să aibă..."
                      className={inputClass}
                    />
                  </div>
                )}
                {tipProiectSelectat.length === 0 && (
                  <p className="text-gray-400 text-sm">Selectează tipul de proiect în pasul anterior pentru a vedea detalii specifice.</p>
                )}
              </PasWrapper>
            )}

            {/* Pas 5 — Timeline & Buget */}
            {pas === 4 && (
              <PasWrapper titlu="Timeline și buget estimat">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-3">Când ai nevoie de proiect?</div>
                    <div className="space-y-2">
                      {TIMELINE.map((t) => (
                        <RadioCard
                          key={t.value}
                          {...register('timeline')}
                          value={t.value}
                          label={t.label}
                          checked={watchedValues.timeline === t.value}
                        />
                      ))}
                    </div>
                    {errors.timeline && <ErrorMsg msg={errors.timeline.message} />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-3">Buget estimat</div>
                    <div className="space-y-2">
                      {BUGETE.map((b) => (
                        <RadioCard
                          key={b.value}
                          {...register('buget')}
                          value={b.value}
                          label={b.label}
                          checked={watchedValues.buget === b.value}
                        />
                      ))}
                    </div>
                    {errors.buget && <ErrorMsg msg={errors.buget.message} />}
                  </div>
                </div>
              </PasWrapper>
            )}

            {/* Pas 6 — Contact */}
            {pas === 5 && (
              <PasWrapper titlu="Date de contact">
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Nume complet" error={errors.nume?.message} required>
                      <input {...register('nume')} type="text" placeholder="Ion Popescu" className={inputClass} />
                    </FormField>
                    <FormField label="Email" error={errors.email?.message} required>
                      <input {...register('email')} type="email" placeholder="ion@firma.ro" className={inputClass} />
                    </FormField>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Telefon" error={errors.telefon?.message} required>
                      <input {...register('telefon')} type="tel" placeholder="07xx xxx xxx" className={inputClass} />
                    </FormField>
                    <FormField label="Companie">
                      <input {...register('companie')} type="text" placeholder="Firma SRL" className={inputClass} />
                    </FormField>
                  </div>
                  <FormField label="Website existent">
                    <input {...register('websiteExistent')} type="url" placeholder="https://site-ul-tau.ro" className={inputClass} />
                  </FormField>
                  <FormField label="Mesaj adițional">
                    <textarea {...register('mesajAditional')} rows={3} placeholder="Orice alte detalii relevante..." className={inputClass} />
                  </FormField>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input {...register('acordPrivacitate')} type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600" />
                      <span className="text-sm text-gray-500">
                        Sunt de acord cu{' '}
                        <a href="/politica-de-confidentialitate" className="text-blue-600 hover:underline" target="_blank">
                          Politica de Confidențialitate
                        </a>
                      </span>
                    </label>
                    {errors.acordPrivacitate && <ErrorMsg msg={errors.acordPrivacitate.message} />}
                  </div>
                </div>
              </PasWrapper>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigare pași */}
        <div className="flex items-center justify-between mt-8">
          {pas > 0 ? (
            <button
              type="button"
              onClick={() => setPas(pas - 1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <ChevronLeft size={16} />
              Înapoi
            </button>
          ) : <div />}

          {pas < PASI.length - 1 ? (
            <button
              type="button"
              onClick={() => setPas(pas + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-[#1a6fa8] transition-colors font-semibold text-sm"
            >
              Continuă
              <ChevronRight size={16} />
            </button>
          ) : (
            <Button type="submit" loading={status === 'loading'} rightIcon={<Send size={18} />}>
              Trimite Cererea de Ofertă
            </Button>
          )}
        </div>

        {status === 'error' && (
          <div className="mt-4 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <AlertCircle size={16} />
            A apărut o eroare. Încearcă din nou sau sună la 0750 456 096.
          </div>
        )}
      </form>
    </div>
  );
}

// Sub-componente

function PasWrapper({ titlu, children }: { titlu: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-950 mb-6">{titlu}</h2>
      {children}
    </div>
  );
}

const RadioCard = ({
  value,
  label,
  checked,
  name,
  onChange,
  onBlur,
  ref,
}: {
  value: string;
  label: string;
  checked: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
}) => (
  <label className={cn(
    'flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all',
    checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-200'
  )}>
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} onBlur={onBlur} ref={ref} className="sr-only" />
    <span className={cn('w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all', checked ? 'border-blue-500 bg-blue-600' : 'border-gray-300')} />
    <span className={cn('text-sm font-medium', checked ? 'text-blue-600' : 'text-gray-500')}>{label}</span>
  </label>
);
RadioCard.displayName = 'RadioCard';

function CheckCard({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={cn(
      'flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all',
      checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-200'
    )}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={cn(
        'w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all',
        checked ? 'border-blue-500 bg-blue-600' : 'border-gray-300'
      )}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
      </span>
      <span className={cn('text-sm font-medium', checked ? 'text-blue-600' : 'text-gray-500')}>{label}</span>
    </label>
  );
}

function SelectField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function FormField({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <ErrorMsg msg={error} />}
    </div>
  );
}

function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <AlertCircle size={12} /> {msg}
    </p>
  );
}

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-colors';
