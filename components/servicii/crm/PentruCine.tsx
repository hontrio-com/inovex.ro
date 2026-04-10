import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const POTRIVIT_ITEMS = [
  'Ai peste 3 angajati care lucreaza cu clienti sau stocuri',
  'Pierde timp cu rapoarte manuale in Excel',
  'Nu stii ce face echipa ta in timp real',
  'Clientii se plang ca nu le raspunzi la timp',
  'Ai informatii raspandite in emailuri si foi de calcul',
  'Vrei sa scalezi dar procesele actuale nu tin pasul',
  'Ai nevoie de trasabilitate si audituri clare',
  'Vrei sa automatizezi aprobari, notificari si rapoarte',
];

const NEPOTRIVIT_ITEMS = [
  'Esti solopreneur fara angajati sau colaboratori',
  'Afacerea ta nu implica clienti repetitivi sau stocuri',
  'Cauti o solutie standard gata-facuta la cheie (WordPress, Odoo)',
  'Bugetul nu permite o investitie initiala intr-un sistem custom',
  'Nu esti dispus sa aloci timp pentru training si adoptie',
];

export default function PentruCine() {
  return (
    <section className="bg-[#F8FAFB] py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Potrivit pentru
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
          >
            Un sistem custom este solutia ta{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>daca...</span>
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Potrivit */}
          <div
            className="bg-white rounded-2xl p-6 border border-[#E8ECF0]"
            style={{ borderLeft: '3px solid #10B981' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={18} className="text-[#10B981]" />
              <p className="text-[14px] font-bold text-[#0D1117]">Recomandat daca te regasesti in:</p>
            </div>
            <ul className="space-y-2.5">
              {POTRIVIT_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#4A5568] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nepotrivit */}
          <div
            className="bg-white rounded-2xl p-6 border border-[#E8ECF0]"
            style={{ borderLeft: '3px solid #F59E0B' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <AlertCircle size={18} className="text-[#F59E0B]" />
              <p className="text-[14px] font-bold text-[#0D1117]">Poate nu esti gata daca:</p>
            </div>
            <ul className="space-y-2.5">
              {NEPOTRIVIT_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <X size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#4A5568] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Note */}
        <p className="text-[14px] text-[#4A5568] mt-8 text-center">
          Nu esti sigur daca esti pregatit?{' '}
          <a href="/contact" className="text-[#2B8FCC] font-semibold hover:underline">
            Hai la o consultatie gratuita
          </a>{' '}
          - analizam procesele tale si iti spunem sincer daca un sistem custom aduce valoare.
        </p>
      </div>
    </section>
  );
}
