'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TrendingUp } from 'lucide-react';
import {
  REVENUE_MONTHLY,
  REVENUE_QUARTERLY,
  REVENUE_ANNUAL,
  REVENUE_BREAKDOWN,
} from '@/lib/demo-data';

interface BarChartProps {
  data: { label: string; value: number }[];
  maxHeight?: number;
}

function BarChart({ data, maxHeight = 160 }: BarChartProps) {
  const [animated, setAnimated] = useState(false);
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <TooltipProvider>
      <div className="flex gap-1 items-end" style={{ height: maxHeight }}>
        {data.map((item) => {
          const targetH = animated
            ? Math.max(4, Math.round((item.value / maxVal) * maxHeight))
            : 0;
          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <div className="flex-1 flex flex-col items-center gap-1 cursor-pointer group">
                  <div
                    className="w-full bg-[#2B8FCC] rounded-t-sm group-hover:opacity-80"
                    style={{
                      height: `${targetH}px`,
                      transition: 'height 0.8s ease-out',
                    }}
                  />
                  <span className="text-[9px] text-[#8A94A6]">{item.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs font-medium">
                  {item.label}: €{item.value.toLocaleString('ro-RO')}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export default function ViewRevenue() {
  const monthlyData = REVENUE_MONTHLY.map((d) => ({
    label: d.month,
    value: d.value,
  }));
  const quarterlyData = REVENUE_QUARTERLY.map((d) => ({
    label: d.quarter,
    value: d.value,
  }));
  const annualData = REVENUE_ANNUAL.map((d) => ({
    label: d.year,
    value: d.value,
  }));

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'MRR', value: '€48.320', sub: 'luna curenta' },
          { label: 'ARR', value: '€579.840', sub: 'proiectie anuala' },
          { label: 'Crestere', value: '+8.2%', sub: 'MoM' },
        ].map((s) => (
          <Card key={s.label} className="border border-[#E8ECF0]">
            <CardContent className="p-4">
              <p className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide mb-1">
                {s.label}
              </p>
              <p
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                className="text-xl text-[#0D1117] leading-none"
              >
                {s.value}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <TrendingUp size={10} className="text-[#16a34a]" />
                <span className="text-[10px] text-[#8A94A6]">{s.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs chart */}
      <Card className="border border-[#E8ECF0]">
        <CardHeader className="pb-2 px-5 pt-4">
          <CardTitle className="text-sm font-semibold text-[#0D1117]">
            Evolutie venituri
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <Tabs defaultValue="lunar">
            <TabsList className="mb-4 h-8">
              <TabsTrigger value="lunar" className="text-xs h-7">
                Lunar
              </TabsTrigger>
              <TabsTrigger value="trimestrial" className="text-xs h-7">
                Trimestrial
              </TabsTrigger>
              <TabsTrigger value="anual" className="text-xs h-7">
                Anual
              </TabsTrigger>
            </TabsList>
            <TabsContent value="lunar">
              <BarChart data={monthlyData} />
            </TabsContent>
            <TabsContent value="trimestrial">
              <BarChart data={quarterlyData} />
            </TabsContent>
            <TabsContent value="anual">
              <BarChart data={annualData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Revenue breakdown table */}
      <Card className="border border-[#E8ECF0]">
        <CardHeader className="pb-2 px-5 pt-4">
          <CardTitle className="text-sm font-semibold text-[#0D1117]">
            Defalcare venituri
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E8ECF0]">
                  {['Plan', 'Utilizatori', 'MRR', 'Pondere'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide pb-2 pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REVENUE_BREAKDOWN.map((row, idx) => {
                  const isTotal = row.plan === 'Total';
                  return (
                    <tr
                      key={row.plan}
                      className={`${idx < REVENUE_BREAKDOWN.length - 1 ? 'border-b border-[#F4F6F8]' : 'border-t border-[#E8ECF0]'} ${isTotal ? 'font-bold' : ''}`}
                    >
                      <td className={`py-2.5 pr-4 ${isTotal ? 'text-[#0D1117]' : 'text-[#4A5568]'}`}>
                        {row.plan}
                      </td>
                      <td className={`py-2.5 pr-4 ${isTotal ? 'text-[#0D1117]' : 'text-[#4A5568]'}`}>
                        {row.users.toLocaleString('ro-RO')}
                      </td>
                      <td className={`py-2.5 pr-4 ${isTotal ? 'text-[#0D1117]' : 'text-[#16a34a] font-semibold'}`}>
                        {row.mrr}
                      </td>
                      <td className={`py-2.5 ${isTotal ? 'text-[#0D1117]' : 'text-[#4A5568]'}`}>
                        {row.percent}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
