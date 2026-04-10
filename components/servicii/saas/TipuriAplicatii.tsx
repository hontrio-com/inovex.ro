'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Star, Check, Clock } from 'lucide-react';

/* ---- Visual mockups (pure CSS/Tailwind) ---- */

function SaaSMockup() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { name: 'Free', price: '€0', items: ['5 proiecte', '1 user', 'Support email'], highlighted: false },
        { name: 'Pro', price: '€49', items: ['Proiecte nelimitate', '10 users', 'Support prioritar'], highlighted: true },
        { name: 'Enterprise', price: '€199', items: ['Totul din Pro', 'Users nelimitati', 'SLA dedicat'], highlighted: false },
      ].map((plan) => (
        <div
          key={plan.name}
          className={`rounded-lg p-3 border ${plan.highlighted ? 'border-[#2B8FCC] bg-[#EAF5FF]' : 'border-[#E8ECF0] bg-white'} relative`}
        >
          {plan.highlighted && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold bg-[#2B8FCC] text-white rounded-full px-2 py-0.5 whitespace-nowrap">
              Recomandat
            </span>
          )}
          <p className="text-[10px] font-bold text-[#0D1117] mb-1">{plan.name}</p>
          <p className={`text-base font-bold mb-2 ${plan.highlighted ? 'text-[#2B8FCC]' : 'text-[#0D1117]'}`} style={{ fontFamily: 'var(--font-display)' }}>
            {plan.price}
          </p>
          <ul className="space-y-1">
            {plan.items.map((item) => (
              <li key={item} className="flex items-start gap-1">
                <Check size={8} className={plan.highlighted ? 'text-[#2B8FCC] mt-0.5 shrink-0' : 'text-[#8A94A6] mt-0.5 shrink-0'} />
                <span className="text-[8px] text-[#4A5568]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MarketplaceMockup() {
  return (
    <div className="space-y-2">
      <div className="bg-white border border-[#E8ECF0] rounded-lg px-3 py-2 flex items-center gap-2">
        <div className="flex-1 h-5 bg-[#F4F6F8] rounded" />
        <div className="w-14 h-5 bg-[#2B8FCC] rounded text-[8px] text-white flex items-center justify-center font-semibold">
          Cauta
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['Produs A', 'Produs B', 'Produs C'].map((p, i) => (
          <div key={p} className="bg-white border border-[#E8ECF0] rounded-lg p-2">
            <div className="h-10 bg-[#F4F6F8] rounded mb-2" />
            <p className="text-[8px] font-semibold text-[#0D1117] mb-1">{p}</p>
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={7} className={s < 4 - i % 2 ? 'text-amber-400 fill-amber-400' : 'text-[#E8ECF0]'} />
              ))}
            </div>
            <p className="text-[8px] font-bold text-[#2B8FCC]">€{(i + 1) * 19}.99</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagementMockup() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {[
        { col: 'Backlog', color: '#F4F6F8', tasks: ['Task 1', 'Task 2'] },
        { col: 'In lucru', color: '#EAF5FF', tasks: ['Task 3', 'Task 4'] },
        { col: 'Done', color: '#F0FDF4', tasks: ['Task 5'] },
      ].map(({ col, color, tasks }) => (
        <div key={col} className="flex-1 rounded-lg p-2" style={{ background: color }}>
          <p className="text-[8px] font-bold text-[#4A5568] mb-1.5">{col}</p>
          <div className="space-y-1.5">
            {tasks.map((t) => (
              <div key={t} className="bg-white border border-[#E8ECF0] rounded p-1.5">
                <p className="text-[7px] font-semibold text-[#0D1117]">{t}</p>
                <div className="mt-1 h-1 w-full bg-[#E8ECF0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2B8FCC] rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PortalB2BMockup() {
  return (
    <div className="flex gap-2 h-[120px]">
      <div className="w-20 bg-[#0D1117] rounded-lg p-2 flex flex-col gap-1">
        {['Dashboard', 'Comenzi', 'Facturi', 'Suport'].map((item, i) => (
          <div
            key={item}
            className={`text-[7px] px-1.5 py-1 rounded ${i === 0 ? 'bg-[#2B8FCC] text-white font-semibold' : 'text-[rgba(255,255,255,0.5)]'}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1">
        {[
          { id: '#1024', status: 'Livrat', color: 'bg-green-100 text-green-700' },
          { id: '#1025', status: 'In procesare', color: 'bg-amber-100 text-amber-700' },
          { id: '#1026', status: 'Nou', color: 'bg-[#EAF5FF] text-[#2B8FCC]' },
        ].map((order) => (
          <div key={order.id} className="bg-white border border-[#E8ECF0] rounded px-2 py-1.5 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-[#0D1117]">{order.id}</span>
            <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full ${order.color}`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ElearningMockup() {
  return (
    <div className="flex gap-2">
      <div className="flex-1 space-y-1.5">
        <div className="bg-[#0D1117] rounded-lg h-16 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white ml-0.5" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-[#EAF5FF] rounded p-1 text-center">
            <p className="text-[8px] font-bold text-[#2B8FCC]">12</p>
            <p className="text-[7px] text-[#8A94A6]">Lectii</p>
          </div>
          <div className="bg-[#EAF5FF] rounded p-1 text-center">
            <p className="text-[8px] font-bold text-[#2B8FCC]">4h</p>
            <p className="text-[7px] text-[#8A94A6]">Video</p>
          </div>
          <div className="bg-[#EAF5FF] rounded p-1 text-center">
            <p className="text-[8px] font-bold text-[#2B8FCC]">3</p>
            <p className="text-[7px] text-[#8A94A6]">Quiz</p>
          </div>
        </div>
      </div>
      <div className="w-32 space-y-1">
        {['Introducere', 'Modulul 1', 'Modulul 2', 'Quiz final'].map((lesson, i) => (
          <div key={lesson} className="bg-white border border-[#E8ECF0] rounded px-2 py-1 flex items-center gap-1.5">
            <Clock size={8} className={i < 2 ? 'text-[#2B8FCC]' : 'text-[#8A94A6]'} />
            <span className="text-[7px] text-[#4A5568] flex-1 truncate">{lesson}</span>
            {i < 2 && <Check size={7} className="text-[#16a34a] shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  {
    id: 'saas',
    label: 'SaaS',
    title: 'Platforme SaaS cu subscriptii',
    description:
      'Construim platforme cu abonamente recurente, self-service onboarding si management complet al utilizatorilor. De la trial gratuit la planuri enterprise cu facturare automata.',
    mockup: <SaaSMockup />,
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    title: 'Marketplace-uri multi-vendor',
    description:
      'Construim platforme de tip eMag, Trendyol sau Etsy: vendori multipli, comisioane automate, recenzii verificate, sistem de dispute si plati escrow. Scalabile de la zeci la mii de vendori.',
    mockup: <MarketplaceMockup />,
  },
  {
    id: 'management',
    label: 'Management intern',
    title: 'Aplicatii de management intern',
    description:
      'CRM-uri, ERP-uri, sisteme de ticketing si project management. Inlocuim Excel-urile si procesele manuale cu aplicatii dedicate pentru echipa ta.',
    mockup: <ManagementMockup />,
  },
  {
    id: 'b2b',
    label: 'Portal B2B',
    title: 'Portale clienti si extranet-uri B2B',
    description:
      'Zone private pentru clientii tai B2B: comenzi, facturi, documentatie, rapoarte. Acces securizat cu SSO si permisiuni granulare per cont.',
    mockup: <PortalB2BMockup />,
  },
  {
    id: 'elearning',
    label: 'E-learning',
    title: 'Platforme de cursuri online',
    description:
      'Video hosting integrat, module si sectiuni, quiz-uri interactive, certificate automate. Integrare Stripe pentru vanzarea cursurilor si management complet.',
    mockup: <ElearningMockup />,
  },
];

export default function TipuriAplicatii() {
  const [activeTab, setActiveTab] = useState('saas');

  return (
    <section className="py-[100px] bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - LEFT aligned */}
        <div className="max-w-[520px] mb-12">
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 border-[#C8E6F8] text-[#2B8FCC]"
          >
            Ce construim
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
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>Orice</span>{' '}
            tip de aplicatie web
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            De la SaaS-uri B2C la portale enterprise, am construit zeci de
            aplicatii complexe. Iata ce putem face pentru tine.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex-wrap h-auto gap-1 bg-transparent p-0">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-full border border-[#E8ECF0] bg-white data-[state=active]:bg-[#2B8FCC] data-[state=active]:text-white data-[state=active]:border-[#2B8FCC] text-[13px] px-4 py-1.5 h-auto"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <AnimatePresence mode="wait">
                {activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                  >
                    {/* Text side */}
                    <div>
                      <h3
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                        className="text-xl text-[#0D1117] mb-4"
                      >
                        {tab.title}
                      </h3>
                      <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed mb-6">
                        {tab.description}
                      </p>
                      <Button
                        href="/oferta"
                        rightIcon={<ArrowRight size={16} />}
                      >
                        Solicita oferta
                      </Button>
                    </div>

                    {/* Visual side */}
                    <div className="bg-white rounded-2xl border border-[#E8ECF0] p-6 shadow-sm">
                      {tab.mockup}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
