'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const PLACEHOLDER_TABS = ['Echipa', 'Facturare', 'API', 'Securitate'];

export default function ViewSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFa, setTwoFa] = useState(false);

  return (
    <TooltipProvider>
      <Tabs defaultValue="general">
        <TabsList className="mb-4 h-8 flex-wrap">
          <TabsTrigger value="general" className="text-xs h-7">
            General
          </TabsTrigger>
          {PLACEHOLDER_TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab.toLowerCase()} className="text-xs h-7">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General tab */}
        <TabsContent value="general">
          <div className="space-y-4">
            {/* Company info */}
            <Card className="border border-[#E8ECF0]">
              <CardContent className="p-5 space-y-4">
                <p className="text-xs font-semibold text-[#0D1117] mb-3">
                  Informatii companie
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Nume companie', value: 'Inovex SRL' },
                    { label: 'Email contact', value: 'contact@inovex.ro' },
                    { label: 'Timezone', value: 'Europe/Bucharest (UTC+3)' },
                    { label: 'Limba', value: 'Romana (RO)' },
                  ].map((field) => (
                    <div key={field.label}>
                      <Label className="text-[10px] text-[#8A94A6] font-medium uppercase tracking-wide mb-1 block">
                        {field.label}
                      </Label>
                      <div className="h-8 px-3 flex items-center bg-[#F8FAFB] border border-[#E8ECF0] rounded-md text-xs text-[#4A5568]">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Plan */}
            <Card className="border border-[#E8ECF0]">
              <CardContent className="p-5">
                <p className="text-xs font-semibold text-[#0D1117] mb-3">
                  Plan curent
                </p>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
                      Pro
                    </Badge>
                    <span className="text-xs text-[#4A5568]">
                      €49/luna - pana la 1.000 utilizatori
                    </span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          size="sm"
                          className="h-7 text-xs opacity-50 cursor-not-allowed pointer-events-none"
                          disabled
                        >
                          Upgrade la Enterprise
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Demo read-only</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            {/* Switches */}
            <Card className="border border-[#E8ECF0]">
              <CardContent className="p-5 space-y-4">
                <p className="text-xs font-semibold text-[#0D1117] mb-3">
                  Preferinte
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-medium text-[#0D1117]">
                      Notificari email
                    </Label>
                    <p className="text-[10px] text-[#8A94A6] mt-0.5">
                      Primeste rezumate zilnice pe email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotif}
                    onCheckedChange={setEmailNotif}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-medium text-[#0D1117]">
                      2FA activ
                    </Label>
                    <p className="text-[10px] text-[#8A94A6] mt-0.5">
                      Autentificare in doi pasi pentru contul tau
                    </p>
                  </div>
                  <Switch
                    checked={twoFa}
                    onCheckedChange={setTwoFa}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save button */}
            <div className="flex justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      size="sm"
                      className="h-8 text-xs opacity-50 cursor-not-allowed pointer-events-none"
                      disabled
                    >
                      Salveaza modificarile
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Demo read-only</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TabsContent>

        {/* Placeholder tabs */}
        {PLACEHOLDER_TABS.map((tab) => (
          <TabsContent key={tab} value={tab.toLowerCase()}>
            <Card className="border border-[#E8ECF0]">
              <CardContent className="p-8 text-center">
                <p className="text-sm text-[#8A94A6]">
                  Aceasta sectiune nu este disponibila in demo.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </TooltipProvider>
  );
}
