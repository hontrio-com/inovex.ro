'use client';

import { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Euro } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { BidPayload } from '@/types/marketplace';

interface Props {
  open: boolean;
  onClose: () => void;
  productSlug: string;
  productTitle: string;
  listedPrice: number;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function BidModal({ open, onClose, productSlug, productTitle, listedPrice }: Props) {
  const [name,         setName]         = useState('');
  const [email,        setEmail]        = useState('');
  const [phone,        setPhone]        = useState('');
  const [offeredPrice, setOfferedPrice] = useState('');
  const [message,      setMessage]      = useState('');
  const [status,       setStatus]       = useState<Status>('idle');
  const [errorMsg,     setErrorMsg]     = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const price = parseFloat(offeredPrice);
    if (!name || !email || !phone || isNaN(price) || price <= 0) return;

    setStatus('loading');
    setErrorMsg('');

    const payload: BidPayload = { productSlug, productTitle, name, email, phone, offeredPrice: price, message: message || undefined };

    try {
      const res = await fetch('/api/marketplace/bid', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('server');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('A apărut o eroare. Încearcă din nou sau contactează-ne direct.');
    }
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && status !== 'loading') {
      onClose();
      setTimeout(() => {
        setStatus('idle');
        setErrorMsg('');
        setName(''); setEmail(''); setPhone('');
        setOfferedPrice(''); setMessage('');
      }, 300);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl p-0">

        <DialogHeader className="px-7 pt-6 pb-0">
          <DialogTitle className="text-[1.15rem] text-[#0D1117]">Fă o ofertă de preț</DialogTitle>
          <DialogDescription className="text-[0.8125rem] text-gray-500">
            {productTitle}, pret listat:{' '}
            <strong className="text-[#0D1117]">{listedPrice.toLocaleString('ro-RO')} EUR</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="px-7 pb-7 pt-5">
          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="font-bold text-[1.1rem] text-[#0D1117] mb-2">Ofertă trimisă cu succes!</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Am primit oferta ta. Te contactăm în maxim <strong>24 de ore</strong> cu răspunsul nostru.
              </p>
              <Button onClick={onClose}>Închide</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Preț oferit — prominent */}
              <div className="bg-[#F0F7FF] border border-[#BFDBFE] rounded-xl p-4">
                <Label className="text-[#1D4ED8] font-semibold mb-2 block text-[0.8125rem]">
                  Oferta ta de preț *
                </Label>
                <div className="relative">
                  <Euro size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B8FCC]" />
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    placeholder={`Max. ${listedPrice} EUR`}
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    required
                    className="pl-9 font-bold text-base"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Prețul listat este {listedPrice.toLocaleString('ro-RO')} EUR. Vom analiza oferta ta și te contactăm.
                </p>
              </div>

              {/* Date contact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Nume *</Label>
                  <Input placeholder="Numele tău" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Telefon *</Label>
                  <Input type="tel" placeholder="07xx xxx xxx" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Email *</Label>
                <Input type="email" placeholder="email@exemplu.ro" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-1.5">
                <Label>Mesaj (opțional)</Label>
                <Textarea
                  placeholder="Explică-ne de ce consideri această ofertă corectă..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                  <span className="text-[0.8125rem] text-red-700">{errorMsg}</span>
                </div>
              )}

              <Button type="submit" loading={status === 'loading'} size="lg" className="w-full" rightIcon={<Send size={15} />}>
                Trimite oferta
              </Button>

              <p className="text-[11px] text-gray-400 text-center">
                Prin trimitere ești de acord cu{' '}
                <a href="/politica-de-confidentialitate" className="text-[#2B8FCC]" target="_blank" rel="noopener">
                  politica de confidențialitate
                </a>.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
