'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Mail,
  Users,
  CheckSquare,
  Zap,
  FileText,
} from 'lucide-react';
import { CRM_ACTIVITIES } from '@/lib/crm-demo-data';
import type { ActivityType } from '@/lib/crm-demo-data';

const TYPE_CONFIG: Record<ActivityType, { color: string; bg: string; icon: React.ElementType; label: string }> = {
  Phone: { color: '#2B8FCC', bg: '#EAF5FF', icon: Phone, label: 'Apel' },
  Mail: { color: '#F59E0B', bg: '#FEF3C7', icon: Mail, label: 'Email' },
  Meeting: { color: '#10B981', bg: '#ECFDF5', icon: Users, label: 'Intalnire' },
  Task: { color: '#6B7280', bg: '#F4F6F8', icon: CheckSquare, label: 'Task' },
  Auto: { color: '#8B5CF6', bg: '#F3E8FF', icon: Zap, label: 'Auto' },
  Note: { color: '#6B7280', bg: '#F4F6F8', icon: FileText, label: 'Nota' },
};

const STATUS_BADGE: Record<string, string> = {
  Finalizat: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
  Programat: 'bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]',
  Intarziat: 'bg-red-50 text-red-600 border border-red-200',
};

// Days that have activities - simulate April 2026
const ACTIVITY_DAYS = [9, 10, 11, 14, 15, 16, 17, 21, 22, 23, 28];

export default function ViewActivitati() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 3, 9));

  const activityDates = ACTIVITY_DAYS.map((d) => new Date(2026, 3, d));

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Calendar */}
      <div
        className="lg:w-[55%] shrink-0 bg-white rounded-xl border border-[#E8ECF0] p-4 flex flex-col items-start"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-3">
          Calendarul activitatilor
        </p>
        <style>{`
          .has-activity .rdp-day_button::after {
            content: '';
            display: block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #2B8FCC;
            margin: 1px auto 0;
          }
        `}</style>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          defaultMonth={new Date(2026, 3)}
          modifiers={{ hasActivity: activityDates }}
          modifiersClassNames={{ hasActivity: 'has-activity' }}
          className="w-full"
        />
        <div className="mt-3 flex items-center gap-4 text-[10px] text-[#8A94A6]">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#2B8FCC]" />
            <span>Are activitati</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#0D1117]" />
            <span>Azi</span>
          </div>
        </div>
      </div>

      {/* Activity list */}
      <div className="flex-1 bg-white rounded-xl border border-[#E8ECF0] p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A94A6]">
            Activitati azi - 9 Apr 2026
          </p>
          <Badge className="bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8] text-[10px]">
            {CRM_ACTIVITIES.length} activitati
          </Badge>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          <div className="absolute left-[13px] top-0 bottom-0 w-[1.5px] bg-[#E8ECF0]" />
          <div className="space-y-4">
            {CRM_ACTIVITIES.map((activity) => {
              const config = TYPE_CONFIG[activity.type];
              const Icon = config.icon;
              return (
                <div key={activity.id} className="flex gap-3 relative">
                  {/* Timeline dot */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-[1]"
                    style={{ background: config.bg, border: `1.5px solid ${config.color}` }}
                  >
                    <Icon size={12} style={{ color: config.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <p
                        className="text-[13px] font-bold text-[#0D1117] leading-none mr-auto"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {activity.time}
                      </p>
                      <Badge
                        className={`text-[9px] px-1.5 py-0 ${STATUS_BADGE[activity.status] ?? ''}`}
                      >
                        {activity.status}
                      </Badge>
                      {activity.important && (
                        <Badge className="bg-red-50 text-red-600 border border-red-200 text-[9px] px-1.5 py-0">
                          Important
                        </Badge>
                      )}
                      {activity.auto && (
                        <Badge className="bg-[#F3E8FF] text-[#8B5CF6] border border-purple-200 text-[9px] px-1.5 py-0">
                          Auto
                        </Badge>
                      )}
                    </div>
                    <p className="text-[12px] font-semibold text-[#0D1117] mt-1 leading-tight">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#8A94A6]">
                      <span>{activity.agent}</span>
                      {activity.company && (
                        <>
                          <span>-</span>
                          <span className="text-[#4A5568] font-medium truncate">{activity.company}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
