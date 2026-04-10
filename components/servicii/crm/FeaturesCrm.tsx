'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Users, Package, FileText, Zap, ArrowLeftRight, GraduationCap } from 'lucide-react';

const FEATURES = [
  {
    icon: Users,
    title: 'CRM - Gestiune clienti & vanzari',
    desc: 'Pipeline vizual, urmarire lead-uri, automatizari email si rapoarte complete de performanta pentru echipa de vanzari.',
    items: [
      'Pipeline Kanban vizual',
      'Urmarire automata lead-uri',
      'Email automation',
      'Rapoarte vanzari in timp real',
      'Gestionare oferte si contracte',
      'Integrare calendar si activitati',
    ],
  },
  {
    icon: Package,
    title: 'ERP - Operatiuni & stoc',
    desc: 'Gestiunea completa a stocului, comenzilor, facturilor si proceselor operationale intr-un singur sistem integrat.',
    items: [
      'Gestiune stoc multi-depozit',
      'Comenzi si receptii',
      'Facturare si contabilitate primara',
      'Productie si retete',
      'Rapoarte operationale',
      'Integrare e-Factura ANAF',
    ],
  },
  {
    icon: FileText,
    title: 'CMS - Continut & publicatii',
    desc: 'Sistem de management al continutului flexibil, cu editor vizual, versioning si publicare pe mai multe canale.',
    items: [
      'Editor vizual drag & drop',
      'Versioning si draft-uri',
      'Multi-site si multi-limba',
      'SEO avansat integrat',
      'Gestionare media si documente',
      'API headless pentru integrari',
    ],
  },
  {
    icon: Zap,
    title: 'Automatizari & fluxuri',
    desc: 'Automatizeaza procesele repetitive: notificari, aprobari, rapoarte, email-uri si sincronizari intre sisteme.',
    items: [
      'Constructor vizual fluxuri',
      'Triggere pe evenimente',
      'Notificari email & SMS',
      'Aprobari si validari',
      'Sincronizare date externe',
      'Webhook-uri si API-uri',
    ],
  },
  {
    icon: ArrowLeftRight,
    title: 'Integratii & conectori',
    desc: 'Conectam sistemul tau cu toate aplicatiile pe care le folosesti deja: contabilitate, logistica, marketplace-uri.',
    items: [
      'ANAF & e-Factura',
      'Banci si procesatori plati',
      'Marketplace-uri (eMAG, etc.)',
      'Google Workspace & M365',
      'WhatsApp & SMS business',
      'API custom la cerere',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Training & suport inclus',
    desc: 'Nu te lasam sa te descurci singur. Training complet, documentatie in romana si suport tehnic dedicat.',
    items: [
      'Training personalizat pe rol',
      'Videoclipuri tutorial in romana',
      'Documentatie completa',
      'Suport tehnic 1 an inclus',
      'Sesiuni de refresher',
      'Manualul utilizatorului',
    ],
  },
];

export default function FeaturesCrm() {
  return (
    <section className="bg-white py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 max-w-[600px] mx-auto">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Serviciu complet
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
            Tot ce ai nevoie ca afacerea ta sa{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>functioneze organizat</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border border-[#E8ECF0] cursor-default"
                style={{ transition: 'all 280ms ease' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-3px)';
                  el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = '';
                  el.style.boxShadow = '';
                }}
              >
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-[#EAF5FF] rounded-xl flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#2B8FCC]" />
                  </div>
                  <h3
                    className="text-[15px] font-bold text-[#0D1117] mb-2 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[12.5px] text-[#4A5568] leading-relaxed mb-4">
                    {feature.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[12px] text-[#4A5568]">
                        <Check size={12} className="text-[#2B8FCC] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
