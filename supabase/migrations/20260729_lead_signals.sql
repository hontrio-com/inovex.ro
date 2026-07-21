-- Semnale de calitate trimise inapoi catre platformele de ads (Meta CAPI,
-- TikTok Events API, Google Ads offline conversions). Audit complet + retry.

create table if not exists crm_lead_signals (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references crm_leads(id) on delete cascade,
  platform   text not null,                    -- meta | tiktok | google
  stage      text not null,                    -- calificat | convertit | edinio | pierdut
  status     text not null default 'pending',  -- pending | sent | failed | skipped
  attempts   int  not null default 0,
  last_error text,
  sent_at    timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table crm_lead_signals enable row level security;

create index if not exists crm_lead_signals_lead_idx    on crm_lead_signals (lead_id);
create index if not exists crm_lead_signals_status_idx  on crm_lead_signals (status);
-- Un singur semnal per lead + platforma + etapa (dedublare; platformele oricum dedupe).
create unique index if not exists crm_lead_signals_unique on crm_lead_signals (lead_id, platform, stage);

drop trigger if exists set_updated_at on crm_lead_signals;
create trigger set_updated_at before update on crm_lead_signals
  for each row execute function set_updated_at();
