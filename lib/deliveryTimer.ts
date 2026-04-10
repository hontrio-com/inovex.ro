export interface DeliveryInfo {
  targetDate: Date;
  targetDateLabel: string;
  targetTimeLabel: string;
  urgencyMessage: string;
  isUrgent: boolean;
}

// Sarbatori legale Romania 2025-2026
const ROMANIAN_HOLIDAYS: string[] = [
  '2025-01-01', '2025-01-02', '2025-01-24',
  '2025-04-18', '2025-04-20', '2025-04-21',
  '2025-05-01', '2025-06-01', '2025-06-08', '2025-06-09',
  '2025-08-15', '2025-11-30', '2025-12-01',
  '2025-12-25', '2025-12-26',
  '2026-01-01', '2026-01-02', '2026-01-24',
  '2026-04-10', '2026-04-12', '2026-04-13',
  '2026-05-01', '2026-06-01', '2026-06-08',
  '2026-08-15', '2026-11-30', '2026-12-01',
  '2026-12-25', '2026-12-26',
];

const CUTOFF_HOUR = 12;
const WORK_END_HOUR = 18;

function toDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isHoliday(date: Date): boolean {
  return ROMANIAN_HOLIDAYS.includes(toDateStr(date));
}

function isWorkDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6 && !isHoliday(date);
}

function getNextWorkDay(from: Date): Date {
  const next = new Date(from);
  next.setDate(next.getDate() + 1);
  while (!isWorkDay(next)) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

function addWorkDays(from: Date, days: number): Date {
  let current = new Date(from);
  for (let i = 0; i < days; i++) {
    current = getNextWorkDay(current);
  }
  return current;
}

export function calculateDelivery(workingDays = 2): DeliveryInfo {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const todayIsWorkDay = isWorkDay(now);

  let processingStart: Date;
  if (todayIsWorkDay && currentHour < CUTOFF_HOUR) {
    processingStart = new Date(now);
  } else {
    processingStart = getNextWorkDay(now);
  }

  const deliveryDay = addWorkDays(processingStart, workingDays - 1);
  deliveryDay.setHours(WORK_END_HOUR, 0, 0, 0);

  const DAY_NAMES = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
  const MONTH_NAMES = [
    'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
    'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
  ];

  const targetDateLabel = `${DAY_NAMES[deliveryDay.getDay()]}, ${deliveryDay.getDate()} ${MONTH_NAMES[deliveryDay.getMonth()]}`;
  const targetTimeLabel = 'ora 18:00';

  const hoursLeft = CUTOFF_HOUR - currentHour - (currentMinute > 0 ? 1 : 0);
  const isUrgent = todayIsWorkDay && currentHour < CUTOFF_HOUR && hoursLeft <= 3;

  let urgencyMessage: string;
  if (todayIsWorkDay && currentHour < CUTOFF_HOUR) {
    const h = CUTOFF_HOUR - currentHour - (currentMinute > 0 ? 1 : 0);
    const m = currentMinute > 0 ? 60 - currentMinute : 0;
    const minPart = m > 0 ? ` ${m}min` : '';
    urgencyMessage = `Comanda in ${h}h${minPart} pentru livrare ${DAY_NAMES[deliveryDay.getDay()].toLowerCase()}`;
  } else if (!todayIsWorkDay) {
    urgencyMessage = 'Comanda ta va fi procesata in prima zi lucratoare';
  } else {
    urgencyMessage = 'Comenzile de azi vor fi procesate maine dimineata';
  }

  return { targetDate: deliveryDay, targetDateLabel, targetTimeLabel, urgencyMessage, isUrgent };
}
