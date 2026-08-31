import { supabaseAdmin } from '@/lib/supabase';

/**
 * Obiective de vanzari: cate conversii s-au strans intr-o perioada, in ce ritm
 * merge treaba si daca ritmul asta duce la tinta.
 *
 * Tot ce se afiseaza in bara de Goal se calculeaza aici, din date reale — nu
 * exista cifre hardcodate.
 */

export type GoalStatus = 'neinceput' | 'atins' | 'inainte' | 'in_termen' | 'in_urma' | 'risc' | 'expirat';

export interface CrmGoal {
  id: string;
  title: string;
  metric: 'leads_converted';
  target: number;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GoalProgress {
  goal: CrmGoal;
  /** Conversii stranse de la start pana acum. */
  done: number;
  remaining: number;
  /** 0..1 (poate depasi 1 daca s-a sarit peste tinta). */
  percent: number;
  /** Cat din perioada a trecut, 0..1 — pozitia reperului "unde ar trebui sa fii". */
  percentTime: number;
  expectedByNow: number;
  /** done - expectedByNow: pozitiv = inaintea graficului. */
  delta: number;

  daysTotal: number;
  daysGone: number;
  daysLeft: number;

  /** Conversii/zi de la startul obiectivului. */
  paceCurrent: number;
  /** Conversii/zi in cele 30 de zile dinaintea startului. */
  paceHistoric: number;
  /** Ritmul folosit in proiectie (vezi blendedPace). */
  pace: number;
  /** Unde ajungi la final in ritmul curent. */
  projected: number;

  neededPerDay: number;
  neededPerWeek: number;

  /** Rata de conversie a lead-urilor din ultimele 90 de zile (0..1). */
  conversionRate: number;
  /** Cate lead-uri noi ar trebui sa intre ca sa acoperi diferenta, la rata de mai sus. */
  leadsNeeded: number | null;
  leadsPerDay: number | null;
  /** Lead-uri intrate de la startul obiectivului. */
  leadsInWindow: number;

  status: GoalStatus;
  tip: string;
  detail: string;
}

const DAY_MS = 86_400_000;

/** Indexul zilei calendaristice, ca sa scadem date fara batai de cap cu orele. */
const dayIndex = (isoDate: string) => Math.floor(Date.parse(`${isoDate}T00:00:00Z`) / DAY_MS);

/** Data de azi in fusul in care lucreaza firma, nu in UTC-ul serverului. */
export function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Bucharest' }).format(new Date());
}

const startOfDayISO = (d: string) => `${d}T00:00:00.000Z`;
const endOfDayISO = (d: string) => `${d}T23:59:59.999Z`;
const addDays = (isoDate: string, n: number) => new Date((dayIndex(isoDate) + n) * DAY_MS).toISOString().slice(0, 10);

/**
 * Lead-urile convertite intr-un interval. Conversia lasa urme DIFERITE in
 * functie de cum a fost facuta, deci se aduna din trei surse:
 *   1. butonul "Converteste in client" — seteaza converted_at (dar NU logheaza status_change);
 *   2. mutarea pe "convertit" din Kanban / popup — logheaza status_change (dar NU seteaza converted_at);
 *   3. lead creat direct cu statusul "convertit" — nu lasa niciuna din urmele de mai sus.
 * Se returneaza id-uri unice, ca un lead trecut de doua ori prin "convertit" sa nu fie numarat dublu.
 */
async function convertedLeadIds(fromISO: string, toISO: string): Promise<Set<string>> {
  const ids = new Set<string>();

  const [{ data: byConvertedAt }, { data: byStatusChange }, { data: bornConverted }] = await Promise.all([
    supabaseAdmin.from('crm_leads').select('id')
      .not('converted_at', 'is', null).gte('converted_at', fromISO).lte('converted_at', toISO),
    supabaseAdmin.from('crm_activities').select('lead_id')
      .eq('type', 'status_change').like('title', '%convertit')
      .not('lead_id', 'is', null).gte('created_at', fromISO).lte('created_at', toISO),
    supabaseAdmin.from('crm_leads').select('id')
      .eq('status', 'convertit').is('converted_at', null)
      .gte('created_at', fromISO).lte('created_at', toISO),
  ]);

  byConvertedAt?.forEach((l) => ids.add(l.id));
  byStatusChange?.forEach((a) => { if (a.lead_id) ids.add(a.lead_id); });

  // Sursa 3 e valida doar daca lead-ul n-a trecut NICIODATA printr-un status_change
  // catre "convertit": altfel momentul real al conversiei e data acelei activitati
  // (posibil in afara intervalului), nu data crearii lead-ului.
  const candidates = (bornConverted ?? []).map((l) => l.id).filter((id) => !ids.has(id));
  if (candidates.length > 0) {
    const { data: everChanged } = await supabaseAdmin.from('crm_activities').select('lead_id')
      .eq('type', 'status_change').like('title', '%convertit').in('lead_id', candidates);
    const changed = new Set((everChanged ?? []).map((a) => a.lead_id));
    candidates.forEach((id) => { if (!changed.has(id)) ids.add(id); });
  }

  return ids;
}

async function countLeadsCreated(fromISO: string, toISO: string): Promise<number> {
  const { count } = await supabaseAdmin.from('crm_leads')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', fromISO).lte('created_at', toISO);
  return count ?? 0;
}

/**
 * Ritmul folosit in proiectie. In primele zile ale obiectivului ritmul curent e
 * zgomot statistic (o conversie in doua zile ar insemna 0,5/zi), asa ca pornim
 * de la ritmul istoric si trecem treptat pe cel curent, complet dupa 14 zile.
 */
function blendedPace(paceCurrent: number, paceHistoric: number, daysGone: number): number {
  const w = Math.min(1, daysGone / 14);
  return w * paceCurrent + (1 - w) * paceHistoric;
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const nf = (n: number) => new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 1 }).format(n);
const fmtDay = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' });

/** Obiectivul activ pentru metrica de conversii, sau null daca nu e setat niciunul. */
export async function getActiveGoal(): Promise<CrmGoal | null> {
  const { data } = await supabaseAdmin.from('crm_goals').select('*')
    .eq('metric', 'leads_converted').eq('is_active', true).maybeSingle();
  return (data as CrmGoal | null) ?? null;
}

export async function computeGoalProgress(goal: CrmGoal): Promise<GoalProgress> {
  const today = todayISO();
  const iStart = dayIndex(goal.start_date);
  const iEnd = dayIndex(goal.end_date);
  const iToday = dayIndex(today);

  const daysTotal = iEnd - iStart + 1;
  const daysGone = Math.max(0, Math.min(daysTotal, iToday - iStart + 1));
  const daysLeft = Math.max(0, daysTotal - daysGone);

  // Fereastra de numarare se opreste azi: conversiile "din viitor" nu exista, iar
  // daca perioada s-a incheiat ne oprim la data de final.
  const countUntil = iToday < iEnd ? today : goal.end_date;

  const [converted, leadsInWindow, historicConverted, leads90, converted90] = await Promise.all([
    daysGone > 0 ? convertedLeadIds(startOfDayISO(goal.start_date), endOfDayISO(countUntil)) : Promise.resolve(new Set<string>()),
    daysGone > 0 ? countLeadsCreated(startOfDayISO(goal.start_date), endOfDayISO(countUntil)) : Promise.resolve(0),
    convertedLeadIds(startOfDayISO(addDays(goal.start_date, -30)), endOfDayISO(addDays(goal.start_date, -1))),
    countLeadsCreated(startOfDayISO(addDays(today, -90)), endOfDayISO(today)),
    convertedLeadIds(startOfDayISO(addDays(today, -90)), endOfDayISO(today)),
  ]);

  const target = goal.target;
  const done = converted.size;
  const remaining = Math.max(0, target - done);

  const percent = target > 0 ? done / target : 0;
  const percentTime = daysTotal > 0 ? daysGone / daysTotal : 0;
  const expectedByNow = target * percentTime;
  const delta = done - expectedByNow;

  const paceCurrent = daysGone > 0 ? done / daysGone : 0;
  const paceHistoric = historicConverted.size / 30;
  const pace = blendedPace(paceCurrent, paceHistoric, daysGone);
  const projected = Math.max(done, done + pace * daysLeft);

  const neededPerDay = daysLeft > 0 ? remaining / daysLeft : remaining;
  const neededPerWeek = neededPerDay * 7;

  const conversionRate = leads90 > 0 ? converted90.size / leads90 : 0;
  const leadsNeeded = conversionRate > 0 ? Math.ceil(remaining / conversionRate) : null;
  const leadsPerDay = leadsNeeded != null && daysLeft > 0 ? leadsNeeded / daysLeft : null;

  /* ── Verdictul ── */
  let status: GoalStatus;
  if (iToday < iStart) status = 'neinceput';
  else if (done >= target) status = 'atins';
  else if (iToday > iEnd) status = 'expirat';
  else {
    const ratio = target > 0 ? projected / target : 0;
    if (ratio >= 1.1) status = 'inainte';
    else if (ratio >= 1) status = 'in_termen';
    else if (ratio >= 0.75) status = 'in_urma';
    else status = 'risc';
  }

  const proj = Math.round(projected);
  // Multiplicatorul se raporteaza la ritmul BLENDAT, nu la cel curent: in primele
  // zile paceCurrent poate fi 0 si impartirea ar da un "0x" fara sens.
  const speedUp = pace > 0 ? Math.max(1, neededPerDay / pace) : null;
  const tip = {
    neinceput: `Obiectivul porneste pe ${fmtDay(goal.start_date)}.`,
    atins: `Obiectiv atins: ${done} din ${target} clienti convertiti. Mai sunt ${daysLeft} zile — poti ridica tinta.`,
    expirat: `Perioada s-a incheiat cu ${done} din ${target} clienti convertiti.`,
    inainte: `Esti inaintea planului: in ritmul de pana acum ajungi la ~${proj} clienti, cu ${proj - target} peste tinta.`,
    in_termen: `Esti in termen. In ritmul de pana acum ajungi la ~${proj} din ${target} pana pe ${fmtDay(goal.end_date)}.`,
    in_urma: `Trebuie sa accelerezi: in ritmul de pana acum ajungi la ~${proj} din ${target}, iti lipsesc ${target - proj}.`,
    risc: `Ritmul de pana acum nu ajunge: ~${proj} din ${target} la final.${speedUp ? ` Ai nevoie de ~${nf(r1(speedUp))}x mai multe conversii pe zi.` : ''}`,
  }[status];

  const detailParts: string[] = [];
  if (status !== 'atins' && status !== 'expirat' && daysLeft > 0) {
    detailParts.push(`Iti trebuie ${nf(r1(neededPerDay))} conversii/zi (${nf(Math.round(neededPerWeek))}/saptamana) in cele ${daysLeft} zile ramase.`);
    if (leadsNeeded != null && leadsPerDay != null) {
      detailParts.push(`La rata ta de conversie de ${nf(r1(conversionRate * 100))}%, asta inseamna ~${leadsNeeded} lead-uri noi (~${nf(Math.round(leadsPerDay))}/zi).`);
    } else {
      detailParts.push('Inca nu exista destule date ca sa estimam cate lead-uri noi sunt necesare.');
    }
  }
  // Abaterea de la graficul liniar are sens abia dupa vreo saptamana; in ziua 2
  // "esti cu 0,9 sub grafic" e zgomot, nu informatie.
  if (daysGone >= 7 && status !== 'neinceput') {
    detailParts.push(delta >= 0
      ? `Esti cu ${nf(r1(Math.abs(delta)))} peste graficul liniar (${nf(r1(expectedByNow))} asteptate pana azi).`
      : `Esti cu ${nf(r1(Math.abs(delta)))} sub graficul liniar (${nf(r1(expectedByNow))} asteptate pana azi).`);
  }

  return {
    goal, done, remaining, percent, percentTime, expectedByNow, delta,
    daysTotal, daysGone, daysLeft,
    paceCurrent, paceHistoric, pace, projected,
    neededPerDay, neededPerWeek,
    conversionRate, leadsNeeded, leadsPerDay, leadsInWindow,
    status, tip, detail: detailParts.join(' '),
  };
}
