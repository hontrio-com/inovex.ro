'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { TEAM_PERFORMANCE } from '@/lib/crm-demo-data';

const MONTHS_DATA = [
  { luna: 'Ian', deals: 18, valoare: 285000, castigate: 14, conversie: 78, target: 92 },
  { luna: 'Feb', deals: 15, valoare: 224000, castigate: 11, conversie: 73, target: 85 },
  { luna: 'Mar', deals: 22, valoare: 348000, castigate: 17, conversie: 77, target: 105 },
  { luna: 'Apr', deals: 23, valoare: 387000, castigate: 18, conversie: 78, target: 110 },
  { luna: 'Mai', deals: 20, valoare: 312000, castigate: 15, conversie: 75, target: 98 },
  { luna: 'Iun', deals: 17, valoare: 265000, castigate: 13, conversie: 76, target: 88 },
  { luna: 'Iul', deals: 14, valoare: 198000, castigate: 10, conversie: 71, target: 75 },
  { luna: 'Aug', deals: 12, valoare: 167000, castigate: 8, conversie: 67, target: 68 },
  { luna: 'Sep', deals: 19, valoare: 298000, castigate: 14, conversie: 74, target: 95 },
  { luna: 'Oct', deals: 21, valoare: 334000, castigate: 16, conversie: 76, target: 102 },
  { luna: 'Nov', deals: 24, valoare: 398000, castigate: 19, conversie: 79, target: 115 },
  { luna: 'Dec', deals: 26, valoare: 425000, castigate: 21, conversie: 81, target: 124 },
];

const MAX_VAL = 425000;
const MAX_BAR = 100;

const DONUT_SEGMENTS = [
  { label: 'Referral', percent: 38, color: '#2B8FCC' },
  { label: 'Website', percent: 27, color: '#10B981' },
  { label: 'Social', percent: 21, color: '#F59E0B' },
  { label: 'Cold outreach', percent: 14, color: '#9333ea' },
];

type SortKey = 'agent' | 'apeluri' | 'emailuri' | 'intalniri' | 'oferte' | 'deals' | 'mrr';

const TEAM_TABLE = TEAM_PERFORMANCE.map((a, i) => ({
  agent: a.agent,
  initials: a.initials,
  color: a.color,
  apeluri: 42 + i * 8,
  emailuri: 87 + i * 12,
  intalniri: 14 + i * 3,
  oferte: 8 + i * 2,
  deals: a.deals,
  mrr: a.revenue,
}));

const FORECAST_CARDS = [
  {
    label: 'Conservatoare',
    mrr: '€285.000',
    growth: '+12% crestere estimata',
    color: '#8A94A6',
    bg: '#F8FAFB',
    sparkline: [30, 35, 38, 42, 45, 48],
  },
  {
    label: 'Realista',
    mrr: '€387.000',
    growth: '+24% crestere estimata',
    color: '#2B8FCC',
    bg: '#EAF5FF',
    sparkline: [30, 40, 52, 60, 70, 80],
  },
  {
    label: 'Optimista',
    mrr: '€510.000',
    growth: '+38% crestere estimata',
    color: '#10B981',
    bg: '#ECFDF5',
    sparkline: [30, 45, 58, 72, 88, 100],
  },
];

// Build conic-gradient string from segments
function buildConicGradient(segments: typeof DONUT_SEGMENTS): string {
  let cumulative = 0;
  const parts = segments.map((s) => {
    const start = cumulative;
    cumulative += s.percent;
    return `${s.color} ${start}% ${cumulative}%`;
  });
  return `conic-gradient(${parts.join(', ')})`;
}

export default function ViewRapoarte() {
  const [animated, setAnimated] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('mrr');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  const sortedTeam = [...TEAM_TABLE].sort((a, b) => {
    const av = a[sortKey as keyof typeof a];
    const bv = b[sortKey as keyof typeof b];
    if (typeof av === 'number' && typeof bv === 'number') {
      return sortDir === 'asc' ? av - bv : bv - av;
    }
    if (typeof av === 'string' && typeof bv === 'string') {
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    return 0;
  });

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp size={10} className="text-[#D0D5DD]" />;
    return sortDir === 'asc'
      ? <ChevronUp size={10} className="text-[#2B8FCC]" />
      : <ChevronDown size={10} className="text-[#2B8FCC]" />;
  }

  const totalRow = {
    luna: 'Total',
    deals: MONTHS_DATA.reduce((s, r) => s + r.deals, 0),
    valoare: MONTHS_DATA.reduce((s, r) => s + r.valoare, 0),
    castigate: MONTHS_DATA.reduce((s, r) => s + r.castigate, 0),
    conversie: Math.round(MONTHS_DATA.reduce((s, r) => s + r.conversie, 0) / MONTHS_DATA.length),
    target: MONTHS_DATA.reduce((s, r) => s + r.target, 0),
  };

  return (
    <Tabs defaultValue="vanzari">
      <TabsList className="h-8 text-xs mb-4">
        <TabsTrigger value="vanzari" className="text-xs">Vanzari</TabsTrigger>
        <TabsTrigger value="activitate" className="text-xs">Activitate echipa</TabsTrigger>
        <TabsTrigger value="prognoze" className="text-xs">Prognoze</TabsTrigger>
      </TabsList>

      {/* Vanzari */}
      <TabsContent value="vanzari" className="space-y-4 mt-0">
        <div className="flex justify-end">
          <Select defaultValue="2026">
            <SelectTrigger className="h-7 text-xs w-[100px] border-[#E8ECF0]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026" className="text-xs">2026</SelectItem>
              <SelectItem value="2025" className="text-xs">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dual bar chart realizat vs target */}
        <Card className="border border-[#E8ECF0]">
          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Realizat vs Target</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#2B8FCC]" />
                  <span className="text-[10px] text-[#4A5568]">Realizat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#E8ECF0]" />
                  <span className="text-[10px] text-[#4A5568]">Target</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex gap-2 items-end">
              <div className="flex flex-col justify-between h-[100px] pr-1 text-[9px] text-[#8A94A6] text-right shrink-0">
                <span>400k</span>
                <span>300k</span>
                <span>200k</span>
                <span>100k</span>
                <span>0</span>
              </div>
              <div className="flex-1 flex items-end gap-[2px] h-[100px]">
                {MONTHS_DATA.map((item) => {
                  const realH = animated ? Math.round((item.valoare / MAX_VAL) * MAX_BAR) : 0;
                  const targetH = animated ? Math.round((item.target * 3500 / MAX_VAL) * MAX_BAR) : 0;
                  return (
                    <div key={item.luna} className="flex-1 flex flex-col items-center">
                      <div className="flex items-end gap-[1px] w-full">
                        <div
                          className="flex-1 bg-[#2B8FCC] rounded-t-[2px]"
                          style={{ height: `${realH}px`, transition: 'height 0.8s ease-out', minHeight: 2 }}
                        />
                        <div
                          className="flex-1 bg-[#E8ECF0] rounded-t-[2px]"
                          style={{ height: `${targetH}px`, transition: 'height 0.8s ease-out 0.1s', minHeight: 2 }}
                        />
                      </div>
                      <span className="text-[8px] text-[#8A94A6] mt-1 hidden sm:block">{item.luna}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donut + Monthly table */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4">
          {/* Donut chart */}
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Surse lead-uri</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-24 h-24 rounded-full relative"
                  style={{ background: buildConicGradient(DONUT_SEGMENTS) }}
                >
                  <div className="absolute inset-[18px] rounded-full bg-white flex items-center justify-center">
                    <p className="text-[9px] font-bold text-[#0D1117] text-center leading-tight">Lead-uri<br />2026</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 w-full">
                  {DONUT_SEGMENTS.map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm" style={{ background: s.color }} />
                        <span className="text-[10px] text-[#4A5568]">{s.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#0D1117]">{s.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly table */}
          <Card className="border border-[#E8ECF0]">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold text-[#0D1117]">Sumar lunar</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-[#E8ECF0]">
                      <th className="text-left py-1.5 font-semibold text-[#8A94A6]">Luna</th>
                      <th className="text-right py-1.5 font-semibold text-[#8A94A6]">Deals</th>
                      <th className="text-right py-1.5 font-semibold text-[#8A94A6]">Valoare</th>
                      <th className="text-right py-1.5 font-semibold text-[#8A94A6]">Cas.</th>
                      <th className="text-right py-1.5 font-semibold text-[#8A94A6]">Conv.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHS_DATA.map((row) => (
                      <tr key={row.luna} className="border-b border-[#F4F6F8]">
                        <td className="py-1.5 font-medium text-[#4A5568]">{row.luna}</td>
                        <td className="py-1.5 text-right text-[#0D1117]">{row.deals}</td>
                        <td className="py-1.5 text-right font-semibold text-[#0D1117]">€{(row.valoare / 1000).toFixed(0)}k</td>
                        <td className="py-1.5 text-right text-[#10B981] font-semibold">{row.castigate}</td>
                        <td className="py-1.5 text-right text-[#4A5568]">{row.conversie}%</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-[#E8ECF0]">
                      <td className="py-1.5 font-bold text-[#0D1117]">Total</td>
                      <td className="py-1.5 text-right font-bold text-[#0D1117]">{totalRow.deals}</td>
                      <td className="py-1.5 text-right font-bold text-[#0D1117]">€{(totalRow.valoare / 1000).toFixed(0)}k</td>
                      <td className="py-1.5 text-right font-bold text-[#10B981]">{totalRow.castigate}</td>
                      <td className="py-1.5 text-right font-bold text-[#0D1117]">{totalRow.conversie}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Activitate echipa */}
      <TabsContent value="activitate" className="mt-0">
        <div className="border border-[#E8ECF0] rounded-xl overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8FAFB] border-b border-[#E8ECF0] hover:bg-[#F8FAFB]">
                {([
                  { key: 'agent' as SortKey, label: 'Agent' },
                  { key: 'apeluri' as SortKey, label: 'Apeluri' },
                  { key: 'emailuri' as SortKey, label: 'Emailuri' },
                  { key: 'intalniri' as SortKey, label: 'Intalniri' },
                  { key: 'oferte' as SortKey, label: 'Oferte' },
                  { key: 'deals' as SortKey, label: 'Deals' },
                  { key: 'mrr' as SortKey, label: 'Revenue' },
                ] as { key: SortKey; label: string }[]).map((col) => (
                  <TableHead
                    key={col.key}
                    className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 cursor-pointer select-none hover:text-[#4A5568]"
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      <SortIcon col={col.key} />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeam.map((row) => (
                <TableRow key={row.agent} className="border-b border-[#F4F6F8] last:border-0">
                  <TableCell className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-br ${row.color}`}
                      >
                        {row.initials}
                      </div>
                      <span className="text-[12px] font-semibold text-[#0D1117]">{row.agent}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5 text-[12px] text-[#4A5568]">{row.apeluri}</TableCell>
                  <TableCell className="py-2.5 text-[12px] text-[#4A5568]">{row.emailuri}</TableCell>
                  <TableCell className="py-2.5 text-[12px] text-[#4A5568]">{row.intalniri}</TableCell>
                  <TableCell className="py-2.5 text-[12px] text-[#4A5568]">{row.oferte}</TableCell>
                  <TableCell className="py-2.5 text-[12px] font-semibold text-[#10B981]">{row.deals}</TableCell>
                  <TableCell className="py-2.5">
                    <span
                      className="text-[12px] font-bold text-[#0D1117]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      €{(row.mrr / 1000).toFixed(0)}k
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      {/* Prognoze */}
      <TabsContent value="prognoze" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {FORECAST_CARDS.map((card) => (
            <Card key={card.label} className="border border-[#E8ECF0]">
              <CardHeader className="pb-2 px-5 pt-5">
                <CardTitle
                  className="text-sm font-semibold"
                  style={{ color: card.color }}
                >
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <p
                  className="text-[22px] font-bold text-[#0D1117] leading-none mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {card.mrr}
                </p>
                <p className="text-[11px] font-medium mb-4" style={{ color: card.color }}>
                  {card.growth}
                </p>
                {/* Sparkline */}
                <div className="flex items-end gap-1 h-10">
                  {card.sparkline.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-[2px]"
                      style={{
                        height: `${h}%`,
                        background: card.color,
                        opacity: 0.3 + (i / card.sparkline.length) * 0.7,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-lg" style={{ background: card.bg }}>
                  <p className="text-[10px] font-medium" style={{ color: card.color }}>
                    Ipoteza: crestere organica sustinuta, retentie 85%+, pipeline activ de 3x target
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
