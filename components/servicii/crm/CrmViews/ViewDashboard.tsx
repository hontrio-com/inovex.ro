'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DollarSign,
  Trophy,
  Timer,
  TrendingUp,
  TrendingDown,
  Funnel,
} from 'lucide-react';
import {
  TEAM_PERFORMANCE,
  RECENT_DEALS,
  TEAM_ACTIVITY,
} from '@/lib/crm-demo-data';

const PIPELINE_MONTHS = [
  { month: 'Ian', opps: 120, won: 55 },
  { month: 'Feb', opps: 95, won: 40 },
  { month: 'Mar', opps: 145, won: 70 },
  { month: 'Apr', opps: 180, won: 80 },
  { month: 'Mai', opps: 160, won: 72 },
  { month: 'Iun', opps: 135, won: 58 },
  { month: 'Iul', opps: 110, won: 48 },
  { month: 'Aug', opps: 90, won: 35 },
  { month: 'Sep', opps: 155, won: 65 },
  { month: 'Oct', opps: 170, won: 78 },
  { month: 'Nov', opps: 195, won: 88 },
  { month: 'Dec', opps: 200, won: 95 },
];

const MAX_OPPS = 200;
const MAX_CHART_HEIGHT = 120;

const DEAL_STATUS_COLOR: Record<string, string> = {
  Castigat: '#10B981',
  Negociere: '#F59E0B',
  'Propunere trimisa': '#2B8FCC',
  Calificat: '#8A94A6',
};

const GREEN_SPARKLINE = ['10%', '30%', '50%', '65%', '100%'];
const BLUE_SPARKLINE = ['20%', '40%', '55%', '70%', '100%'];

export default function ViewDashboard() {
  const [animated, setAnimated] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const kpiCards = [
    {
      label: 'Venituri luna curenta',
      icon: <DollarSign size={14} className="text-[#2B8FCC]" />,
      value: '€124.800',
      trend: '+18.3%',
      trendUp: true,
      sub: null as string | null,
      progress: null as number | null,
      sparkline: BLUE_SPARKLINE,
    },
    {
      label: 'Deal-uri castigate',
      icon: <Trophy size={14} className="text-[#2B8FCC]" />,
      value: '23',
      trend: '+5 fata de luna trecuta',
      trendUp: true,
      sub: null,
      progress: null,
      sparkline: GREEN_SPARKLINE,
    },
    {
      label: 'Pipeline activ',
      icon: <Funnel size={14} className="text-[#2B8FCC]" />,
      value: '€387.000',
      trend: null as string | null,
      trendUp: true,
      sub: '47 de oportunitati active',
      progress: 62,
      sparkline: BLUE_SPARKLINE,
    },
    {
      label: 'Timp mediu vanzare',
      icon: <Timer size={14} className="text-[#2B8FCC]" />,
      value: '18 zile',
      trend: '-3 zile fata de trimestrul trecut',
      trendUp: true,
      sub: 'de la primul contact la semnare',
      progress: null,
      sparkline: GREEN_SPARKLINE,
    },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpiCards.map((card, idx) => (
            <Card key={idx} className="border border-[#E8ECF0]">
              <CardContent className="p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-medium text-[#8A94A6] uppercase tracking-wide leading-tight pr-2">
                    {card.label}
                  </span>
                  <div className="w-6 h-6 bg-[#EAF5FF] rounded-md flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p
                    className="text-[18px] font-bold text-[#0D1117] leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {card.value}
                  </p>
                  <div className="flex items-end gap-[2px] h-7">
                    {card.sparkline.map((h, i) => (
                      <div
                        key={i}
                        className="w-[3px] rounded-sm"
                        style={{
                          height: h,
                          background: `rgba(43,143,204,${0.25 + i * 0.175})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                {card.trend && (
                  <div className="flex items-center gap-1 mt-1.5">
                    {card.trendUp ? (
                      <TrendingUp size={10} className="text-[#16a34a]" />
                    ) : (
                      <TrendingDown size={10} className="text-red-500" />
                    )}
                    <span className="text-[10px] font-medium text-[#16a34a]">
                      {card.trend}
                    </span>
                  </div>
                )}
                {card.sub && (
                  <p className="text-[10px] text-[#8A94A6] mt-1">{card.sub}</p>
                )}
                {card.progress !== null && (
                  <Progress value={card.progress} className="mt-2 h-1 bg-[#E8ECF0]" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pipeline dual bar chart */}
        <Card className="border border-[#E8ECF0]">
          <CardHeader className="pb-2 px-4 pt-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-[#0D1117]">Evolutie pipeline</CardTitle>
            <Select defaultValue="lunar">
              <SelectTrigger className="h-7 text-xs w-[120px] border-[#E8ECF0]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lunar" className="text-xs">Lunar</SelectItem>
                <SelectItem value="trimestrial" className="text-xs">Trimestrial</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {/* Legend */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#2B8FCC]" />
                <span className="text-[10px] text-[#4A5568]">Oportunitati noi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-[10px] text-[#4A5568]">Deal-uri castigate</span>
              </div>
            </div>
            <div className="flex gap-2 items-end">
              {/* Y axis */}
              <div className="flex flex-col justify-between h-[130px] pr-1 text-[9px] text-[#8A94A6] text-right shrink-0">
                <span>200k</span>
                <span>150k</span>
                <span>100k</span>
                <span>50k</span>
                <span>0</span>
              </div>
              {/* Bars */}
              <div className="flex-1 flex items-end gap-[2px] h-[130px]">
                {PIPELINE_MONTHS.map((item) => {
                  const oppsH = animated ? Math.round((item.opps / MAX_OPPS) * MAX_CHART_HEIGHT) : 0;
                  const wonH = animated ? Math.round((item.won / MAX_OPPS) * MAX_CHART_HEIGHT) : 0;
                  return (
                    <Tooltip key={item.month}>
                      <TooltipTrigger asChild>
                        <div className="flex-1 flex flex-col items-center gap-0 cursor-pointer group">
                          <div className="flex items-end gap-[1px] w-full">
                            <div
                              className="flex-1 bg-[#2B8FCC] rounded-t-[2px] group-hover:opacity-80"
                              style={{
                                height: `${oppsH}px`,
                                transition: 'height 0.8s ease-out',
                                minHeight: 2,
                              }}
                            />
                            <div
                              className="flex-1 bg-[#10B981] rounded-t-[2px] group-hover:opacity-80"
                              style={{
                                height: `${wonH}px`,
                                transition: 'height 0.8s ease-out 0.1s',
                                minHeight: 2,
                              }}
                            />
                          </div>
                          <span className="text-[8px] text-[#8A94A6] mt-1 hidden sm:block">
                            {item.month}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-semibold">{item.month}</p>
                        <p>Oportunitati: €{(item.opps * 1000).toLocaleString('ro-RO')}</p>
                        <p>Castigate: €{(item.won * 1000).toLocaleString('ro-RO')}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Team activity */}
          <Card className="border border-[#E8ECF0] lg:col-span-1">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Activitate echipa</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-0">
              {TEAM_ACTIVITY.map((item, idx) => (
                <div key={item.id}>
                  <div className="flex items-start gap-2.5 py-2">
                    <Avatar className="w-7 h-7 shrink-0">
                      <AvatarFallback
                        className={`text-[9px] font-bold text-white bg-gradient-to-br ${item.color}`}
                      >
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0D1117] leading-tight">
                        {item.agent}
                      </p>
                      <p className="text-[10px] text-[#4A5568] leading-snug mt-0.5">
                        {item.action}{' '}
                        <span className="font-semibold text-[#0D1117]">{item.company}</span>
                      </p>
                    </div>
                    <span className="text-[9px] text-[#8A94A6] shrink-0 whitespace-nowrap">{item.time}</span>
                  </div>
                  {idx < TEAM_ACTIVITY.length - 1 && <Separator className="bg-[#F4F6F8]" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top agents */}
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Top agenti</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {TEAM_PERFORMANCE.map((agent, i) => (
                <div key={agent.agent}>
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback
                        className={`text-[8px] font-bold text-white bg-gradient-to-br ${agent.color}`}
                      >
                        {agent.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[11px] font-medium text-[#4A5568] flex-1 truncate">
                      {agent.agent}
                    </span>
                    <span className="text-[11px] font-bold text-[#0D1117]">{agent.target}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F4F6F8] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#2B8FCC] transition-all duration-1000"
                      style={{ width: animated ? `${agent.target}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent deals */}
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Deal-uri recente</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-0">
              {RECENT_DEALS.map((deal, idx) => (
                <div key={deal.id}>
                  <div className="flex items-center gap-2 py-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: DEAL_STATUS_COLOR[deal.status] ?? '#8A94A6' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0D1117] truncate">{deal.company}</p>
                      <p className="text-[10px] text-[#8A94A6]">{deal.date}</p>
                    </div>
                    <p
                      className="text-[11px] font-bold text-[#0D1117] shrink-0"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      €{deal.value.toLocaleString('ro-RO')}
                    </p>
                  </div>
                  {idx < RECENT_DEALS.length - 1 && <Separator className="bg-[#F4F6F8]" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
