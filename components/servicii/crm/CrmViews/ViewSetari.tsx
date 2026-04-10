'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Zap, Plus, Check } from 'lucide-react';

const GENERAL_FIELDS = [
  { label: 'Numele organizatiei', value: 'Inovex CRM Demo SRL' },
  { label: 'Email contact', value: 'contact@inovex-demo.ro' },
  { label: 'Telefon', value: '+40 750 456 096' },
  { label: 'Moneda implicita', value: 'EUR (€)' },
  { label: 'Fusul orar', value: 'Europa/Bucuresti (UTC+3)' },
];

const GENERAL_TOGGLES = [
  { label: 'Notificari email activitati', defaultOn: true },
  { label: 'Raport saptamanal automat', defaultOn: true },
  { label: 'Alerte pipeline expirat', defaultOn: false },
  { label: 'Dosar client public', defaultOn: false },
];

const AUTOMATIONS = [
  {
    title: 'Email bun venit client nou',
    desc: 'Trimite automat un email de bun venit cand un contact este marcat ca "Client activ".',
    active: true,
    color: '#2B8FCC',
    bg: '#EAF5FF',
  },
  {
    title: 'Reminder oferta in asteptare',
    desc: 'Notifica agentul daca o oferta nu a primit raspuns in 5 zile lucratoare.',
    active: true,
    color: '#F59E0B',
    bg: '#FEF3C7',
  },
  {
    title: 'Raport saptamanal vanzari',
    desc: 'Genereaza si trimite managerului un raport PDF cu activitatea echipei in fiecare luni.',
    active: false,
    color: '#10B981',
    bg: '#ECFDF5',
  },
];

export default function ViewSetari() {
  const [toggles, setToggles] = useState(
    GENERAL_TOGGLES.map((t) => t.defaultOn)
  );
  const [autoToggles, setAutoToggles] = useState(
    AUTOMATIONS.map((a) => a.active)
  );

  return (
    <TooltipProvider>
      <Tabs defaultValue="general">
        <TabsList className="h-8 text-xs mb-4 flex-wrap">
          <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
          <TabsTrigger value="echipa" className="text-xs">Echipa</TabsTrigger>
          <TabsTrigger value="pipeline" className="text-xs">Pipeline</TabsTrigger>
          <TabsTrigger value="automatizari" className="text-xs">Automatizari</TabsTrigger>
          <TabsTrigger value="integratii" className="text-xs">Integratii</TabsTrigger>
          <TabsTrigger value="securitate" className="text-xs">Securitate</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="mt-0 space-y-4">
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Informatii organizatie</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {GENERAL_FIELDS.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4">
                  <Label className="text-[11.5px] text-[#4A5568] shrink-0">{f.label}</Label>
                  <div className="h-8 flex items-center px-3 rounded-lg border border-[#E8ECF0] bg-[#F8FAFB] text-[11.5px] text-[#0D1117] font-medium">
                    {f.value}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-[#E8ECF0]">
            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Preferinte notificari</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {GENERAL_TOGGLES.map((t, i) => (
                <div key={t.label} className="flex items-center justify-between">
                  <Label className="text-[12px] text-[#4A5568]">{t.label}</Label>
                  <Switch
                    checked={toggles[i]}
                    onCheckedChange={(v) => {
                      setToggles((prev) => {
                        const next = [...prev];
                        next[i] = v;
                        return next;
                      });
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Echipa */}
        <TabsContent value="echipa" className="mt-0">
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Membri echipa</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-2">
              {['Ion Popescu - Manager Vanzari', 'Elena Dumitrescu - Agent Senior', 'Andrei Stancu - Agent Senior', 'Maria Ionescu - Agent', 'Mihai Georgescu - Agent'].map((m) => (
                <div key={m} className="flex items-center justify-between p-2.5 border border-[#E8ECF0] rounded-lg">
                  <span className="text-[12px] text-[#0D1117] font-medium">{m}</span>
                  <Badge className="bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[10px]">
                    <Check size={9} className="mr-1" /> Activ
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline */}
        <TabsContent value="pipeline" className="mt-0">
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Etapele pipeline</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-2">
              {[
                { name: 'Calificat', color: '#8A94A6', prob: 20 },
                { name: 'Propunere trimisa', color: '#2B8FCC', prob: 45 },
                { name: 'Negociere', color: '#F59E0B', prob: 70 },
                { name: 'Castigat', color: '#10B981', prob: 100 },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-3 p-2.5 border border-[#E8ECF0] rounded-lg">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-[12px] font-medium text-[#0D1117] flex-1">{s.name}</span>
                  <span className="text-[11px] text-[#8A94A6]">{s.prob}% probabilitate</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automatizari */}
        <TabsContent value="automatizari" className="mt-0 space-y-3">
          {AUTOMATIONS.map((auto, i) => (
            <Card key={auto.title} className="border border-[#E8ECF0]">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: auto.bg }}
                  >
                    <Zap size={14} style={{ color: auto.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-[#0D1117]">{auto.title}</p>
                      <Switch
                        checked={autoToggles[i]}
                        onCheckedChange={(v) => {
                          setAutoToggles((prev) => {
                            const next = [...prev];
                            next[i] = v;
                            return next;
                          });
                        }}
                      />
                    </div>
                    <p className="text-[11.5px] text-[#4A5568] mt-0.5 leading-relaxed">{auto.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-fit">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 border-[#E8ECF0] text-[#8A94A6] cursor-not-allowed"
                  disabled
                >
                  <Plus size={12} className="mr-1" />
                  Adauga automatizare
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-xs">
              Disponibil in planul Business si Enterprise
            </TooltipContent>
          </Tooltip>
        </TabsContent>

        {/* Integratii */}
        <TabsContent value="integratii" className="mt-0">
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Integratii disponibile</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-2">
              {[
                { name: 'Google Workspace', status: 'Conectat', color: '#10B981', bg: '#ECFDF5' },
                { name: 'Microsoft 365', status: 'Neconectat', color: '#8A94A6', bg: '#F4F6F8' },
                { name: 'Slack', status: 'Conectat', color: '#10B981', bg: '#ECFDF5' },
                { name: 'Mailchimp', status: 'Neconectat', color: '#8A94A6', bg: '#F4F6F8' },
                { name: 'WhatsApp Business', status: 'Neconectat', color: '#8A94A6', bg: '#F4F6F8' },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between p-2.5 border border-[#E8ECF0] rounded-lg">
                  <span className="text-[12px] font-medium text-[#0D1117]">{int.name}</span>
                  <Badge
                    className="text-[10px]"
                    style={{ background: int.bg, color: int.color, border: `1px solid ${int.color}30` }}
                  >
                    {int.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Securitate */}
        <TabsContent value="securitate" className="mt-0">
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Setari securitate</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {[
                { label: 'Autentificare in doi factori (2FA)', on: true },
                { label: 'SSO (Single Sign-On)', on: false },
                { label: 'Audit log acces date', on: true },
                { label: 'Expirare sesiune automata (30 min)', on: true },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center justify-between">
                  <Label className="text-[12px] text-[#4A5568]">{s.label}</Label>
                  <Switch defaultChecked={s.on} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
}
