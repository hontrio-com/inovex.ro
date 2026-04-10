'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const INTENSITY_COLORS = [
  '#F4F6F8',
  '#EAF5FF',
  '#C8E6F8',
  '#4AADE8',
  '#2B8FCC',
];

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function getIntensityColor(val: number): string {
  return INTENSITY_COLORS[Math.min(val, 4)];
}

function generateHeatmapData(): { intensity: number; date: string }[] {
  const data: { intensity: number; date: string }[] = [];
  const start = new Date(2025, 3, 9); // 364 days before today
  start.setDate(start.getDate() - 363);

  for (let i = 0; i < 364; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const rand = Math.random();
    let intensity = 0;
    if (rand > 0.5) intensity = 1;
    if (rand > 0.7) intensity = 2;
    if (rand > 0.85) intensity = 3;
    if (rand > 0.95) intensity = 4;
    const dateStr = d.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const count = intensity === 0 ? 0 : intensity * 3 + Math.floor(Math.random() * 5);
    data.push({ intensity, date: `${dateStr}: ${count} actiuni` });
  }
  return data;
}

const FUNNEL_STAGES = [
  { label: 'Vizitatori', count: '10.000', percent: 100, sub: '100%' },
  { label: 'Trial', count: '2.340', percent: 23.4, sub: '23.4%' },
  { label: 'Platitori', count: '847', percent: 8.47, sub: '8.47%' },
  { label: 'Enterprise', count: '143', percent: 1.43, sub: '1.43%' },
];

export default function ViewAnalytics() {
  const heatmapData = useMemo(() => generateHeatmapData(), []);

  // Split 364 cells into 52 weeks x 7 days
  const weeks: { intensity: number; date: string }[][] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push(heatmapData.slice(w * 7, w * 7 + 7));
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Heatmap */}
        <Card className="border border-[#E8ECF0]">
          <CardHeader className="pb-2 px-5 pt-4">
            <CardTitle className="text-sm font-semibold text-[#0D1117]">
              Activitate utilizatori - ultimul an
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {/* Day labels */}
                <div className="flex flex-col gap-[2px] mr-1">
                  <div className="h-4" />{/* spacer for month labels */}
                  {DAY_LABELS.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-end pr-1"
                      style={{ height: '10px', fontSize: '8px', color: '#8A94A6', lineHeight: 1 }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
                {/* Weeks */}
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[2px]">
                    {/* Month label every ~4 weeks */}
                    <div style={{ height: '14px' }}>
                      {wi % 4 === 0 && (
                        <span
                          style={{
                            fontSize: '7px',
                            color: '#8A94A6',
                            whiteSpace: 'nowrap',
                            lineHeight: 1,
                          }}
                        >
                          {['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'][
                            Math.floor(wi / 4.3) % 12
                          ]}
                        </span>
                      )}
                    </div>
                    {week.map((cell, di) => (
                      <Tooltip key={di}>
                        <TooltipTrigger asChild>
                          <div
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '2px',
                              background: getIntensityColor(cell.intensity),
                              cursor: 'pointer',
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-[10px]">{cell.date}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="flex items-center gap-1.5 mt-3">
                <span style={{ fontSize: '9px', color: '#8A94A6' }}>Mai putine</span>
                {INTENSITY_COLORS.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: c,
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  />
                ))}
                <span style={{ fontSize: '9px', color: '#8A94A6' }}>Mai multe</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion funnel */}
        <Card className="border border-[#E8ECF0]">
          <CardHeader className="pb-2 px-5 pt-4">
            <CardTitle className="text-sm font-semibold text-[#0D1117]">
              Palnie conversie
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              {FUNNEL_STAGES.map((stage, idx) => {
                const gradients = [
                  'from-[#EAF5FF] to-[#C8E6F8]',
                  'from-[#C8E6F8] to-[#4AADE8]',
                  'from-[#4AADE8] to-[#2B8FCC]',
                  'from-[#2B8FCC] to-[#1a6fa8]',
                ];
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-24 shrink-0 text-right">
                      <p className="text-[10px] font-semibold text-[#8A94A6]">
                        {stage.label}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`bg-gradient-to-r ${gradients[idx]} rounded-md flex items-center justify-center`}
                        style={{
                          width: `${Math.max(stage.percent, 4)}%`,
                          height: '32px',
                          minWidth: '60px',
                          transition: 'width 0.6s ease-out',
                        }}
                      >
                        <span
                          className="text-[10px] font-bold text-[#0D1117] whitespace-nowrap px-2"
                          style={{ textShadow: 'none' }}
                        >
                          {stage.count}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 shrink-0 text-right">
                      <span className="text-[10px] font-semibold text-[#2B8FCC]">
                        {stage.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
