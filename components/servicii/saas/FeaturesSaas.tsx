'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  ShieldCheck,
  CreditCard,
  LayoutDashboard,
  Server,
  GitBranch,
  Plug,
  Check,
} from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Autentificare & securitate',
    items: [
      'Login social (Google, GitHub, Apple)',
      'Autentificare 2FA prin TOTP',
      'Managementul sesiunilor active',
      'Role-based access control (RBAC)',
      'Audit log complet',
      'Criptare end-to-end pentru date sensibile',
    ],
  },
  {
    icon: CreditCard,
    title: 'Subscriptii & plati',
    items: [
      'Integrare Stripe Billing & Checkout',
      'Planuri Free / Pro / Enterprise',
      'Trial gratuit configurabil',
      'Facturare automata lunara/anuala',
      'Portal client pentru facturi',
      'Suport multi-currency',
    ],
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard-uri in timp real',
    items: [
      'Grafice si KPI-uri live via WebSocket',
      'Date actualizate sub 1 secunda',
      'Export CSV, PDF, Excel',
      'Filtre si segmentare avansata',
      'Dashboard-uri personalizabile',
      'Notificari in-app si email',
    ],
  },
  {
    icon: Server,
    title: 'Infrastructura scalabila',
    items: [
      'Deployment pe AWS / Vercel / GCP',
      'Auto-scaling bazat pe trafic',
      'CDN global pentru assets',
      'Backup automat zilnic',
      'Monitoring si alerting 24/7',
      'SLA uptime 99.9% garantat',
    ],
  },
  {
    icon: GitBranch,
    title: 'CI/CD & DevOps',
    items: [
      'Pipeline GitHub Actions complet',
      'Medii staging / production separate',
      'Feature flags pentru deploy gradual',
      'Rollback automat la erori',
      'Test suite automat la fiecare PR',
      'Documentatie tehnica predata',
    ],
  },
  {
    icon: Plug,
    title: 'API & integrari',
    items: [
      'REST API documentat cu OpenAPI',
      'Webhooks configurabile',
      'SDK JavaScript / Python',
      'Integrare Zapier / Make',
      'Single Sign-On (SSO) SAML',
      'Rate limiting si API keys management',
    ],
  },
];

export default function FeaturesSaas() {
  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="max-w-[640px] mx-auto text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 border-[#C8E6F8] text-[#2B8FCC]"
          >
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
            className="mb-4"
          >
            Tot ce ai nevoie{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>
              sa functioneze
            </span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Fiecare aplicatie pe care o construim include un set complet de
            functionalitati production-ready, nu doar o interfata vizuala.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={idx * 0.07}>
                <Card className="border border-[#E8ECF0] hover:-translate-y-[3px] hover:shadow-md transition-all duration-200 h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-[#EAF5FF] rounded-xl flex items-center justify-center">
                      <Icon size={20} className="text-[#2B8FCC]" />
                    </div>
                    <p className="font-semibold text-[#0D1117] mt-4 mb-3 text-sm">
                      {feature.title}
                    </p>
                    <ul className="space-y-2">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check
                            size={14}
                            className="text-[#2B8FCC] mt-0.5 shrink-0"
                          />
                          <span className="text-sm text-[#4A5568]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
