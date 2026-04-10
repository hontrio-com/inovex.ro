'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Users,
  DollarSign,
  Target,
  UserMinus,
  TrendingUp,
  Activity,
} from 'lucide-react';
import {
  REVENUE_MONTHLY,
  ACTIVITY,
  PLAN_DISTRIBUTION,
  TOP_INTEGRATIONS,
} from '@/lib/demo-data';

const AVATAR_COLORS = [
  'from-[#2B8FCC] to-[#1a6fa8]',
  'from-[#16a34a] to-[#15803d]',
  'from-[#9333ea] to-[#7e22ce]',
  'from-[#ea580c] to-[#c2410c]',
  'from-[#0891b2] to-[#0e7490]',
  'from-[#db2777] to-[#be185d]',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const MAX_VALUE = 48320;

export default function ViewOverview() {
  const [barHeights, setBarHeights] = useState<number[]>(
    new Array(REVENUE_MONTHLY.length).fill(0)
  );
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const timer = setTimeout(() => {
      setBarHeights(REVENUE_MONTHLY.map((item) => item.value));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      label: 'Utilizatori activi',
      icon: <Users size={16} className="text-[#2B8FCC]" />,
      value: '2.847',
      trend: '+12.4%',
      showProgress: false,
      progressValue: 0,
      sparkline: [30, 50, 40, 70, 100],
    },
    {
      label: 'MRR',
      icon: <DollarSign size={16} className="text-[#2B8FCC]" />,
      value: '€48.320',
      trend: '+8.2%',
      showProgress: false,
      progressValue: 0,
      sparkline: [20, 45, 55, 80, 100],
    },
    {
      label: 'Conversie',
      icon: <Target size={16} className="text-[#2B8FCC]" />,
      value: '23.4%',
      trend: '+2.1%',
      showProgress: true,
      progressValue: 23,
      sparkline: [60, 55, 65, 70, 100],
    },
    {
      label: 'Churn',
      icon: <UserMinus size={16} className="text-[#2B8FCC]" />,
      value: '2.1%',
      trend: '-0.3%',
      showProgress: true,
      progressValue: 21,
      sparkline: [80, 60, 70, 50, 40],
    },
  ];

  const sparklineHeights = ['10%', '30%', '50%', '80%', '100%'];

  return (
    <TooltipProvider>
      <div className="space-y-5">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((card, idx) => (
            <Card key={idx} className="border border-[#E8ECF0]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-medium text-[#8A94A6] uppercase tracking-wide">
                    {card.label}
                  </span>
                  <div className="w-6 h-6 bg-[#EAF5FF] rounded-md flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                    className="text-xl text-[#0D1117] leading-none"
                  >
                    {card.value}
                  </p>
                  {/* Mini sparkline */}
                  <div className="flex items-end gap-[2px] h-8">
                    {sparklineHeights.map((h, i) => (
                      <div
                        key={i}
                        className="w-[4px] rounded-sm"
                        style={{
                          height: h,
                          background: `rgba(43,143,204,${0.3 + i * 0.175})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={11} className="text-[#16a34a]" />
                  <span className="text-[11px] font-medium text-[#16a34a]">
                    {card.trend} luna aceasta
                  </span>
                </div>
                {card.showProgress && (
                  <Progress
                    value={card.progressValue}
                    className="mt-2 h-1 bg-[#E8ECF0]"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue bar chart */}
        <Card className="border border-[#E8ECF0]">
          <CardHeader className="pb-2 px-5 pt-4">
            <CardTitle className="text-sm font-semibold text-[#0D1117]">
              Evolutie venituri
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <div className="flex gap-2 items-end">
              {/* Y axis */}
              <div className="flex flex-col justify-between h-[180px] pr-2 text-[9px] text-[#8A94A6] text-right shrink-0">
                <span>50k</span>
                <span>40k</span>
                <span>30k</span>
                <span>20k</span>
                <span>10k</span>
                <span>0</span>
              </div>
              {/* Bars */}
              <div className="flex-1 flex items-end gap-[3px] h-[180px]">
                {REVENUE_MONTHLY.map((item, i) => {
                  const targetHeight = Math.round(
                    (barHeights[i] / MAX_VALUE) * 180
                  );
                  return (
                    <Tooltip key={item.month}>
                      <TooltipTrigger asChild>
                        <div className="flex-1 flex flex-col items-center gap-1 cursor-pointer group">
                          <div
                            className="w-full bg-[#2B8FCC] rounded-t-sm group-hover:opacity-80"
                            style={{
                              height: `${targetHeight}px`,
                              transition: 'height 0.8s ease-out',
                              minHeight: '2px',
                            }}
                          />
                          <span className="text-[9px] text-[#8A94A6] hidden sm:block">
                            {item.month}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-xs font-medium">
                          {item.month}: €{item.value.toLocaleString('ro-RO')}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row 3: Activity + Plan distribution + Integrations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Recent activity */}
          <Card className="border border-[#E8ECF0] lg:col-span-1">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117] flex items-center gap-2">
                <Activity size={14} className="text-[#2B8FCC]" />
                Activitate recenta
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-0">
              {ACTIVITY.map((item, idx) => (
                <div key={item.id}>
                  <div className="flex items-start gap-3 py-2.5">
                    <Avatar className="w-7 h-7 shrink-0">
                      <AvatarFallback
                        className={`text-[9px] font-bold text-white bg-gradient-to-br ${
                          AVATAR_COLORS[idx % AVATAR_COLORS.length]
                        }`}
                      >
                        {getInitials(item.user)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0D1117] leading-tight truncate">
                        {item.user}
                      </p>
                      <p className="text-[10px] text-[#8A94A6] leading-snug mt-0.5 line-clamp-2">
                        {item.action}
                      </p>
                    </div>
                    <span className="text-[9px] text-[#8A94A6] shrink-0 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  {idx < ACTIVITY.length - 1 && (
                    <Separator className="bg-[#F4F6F8]" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Plan distribution */}
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">
                Distributie planuri
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {PLAN_DISTRIBUTION.map((plan) => (
                <div key={plan.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-medium text-[#4A5568]">
                      {plan.label}
                    </span>
                    <span className="font-semibold text-[#0D1117]">
                      {plan.percent}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#F4F6F8] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${plan.percent}%`,
                        background: plan.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top integrations */}
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">
                Top integrari
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {TOP_INTEGRATIONS.map((integration) => (
                <div key={integration.name}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-medium text-[#4A5568] truncate">
                      {integration.name}
                    </span>
                    <span className="font-semibold text-[#0D1117] ml-2 shrink-0">
                      {integration.users.toLocaleString('ro-RO')}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F4F6F8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2B8FCC] rounded-full"
                      style={{
                        width: `${Math.round(
                          (integration.users / TOP_INTEGRATIONS[0].users) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
