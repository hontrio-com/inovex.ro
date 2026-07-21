-- Pachete de mentenanta + website-uri administrate + extinderi abonamente.

-- 1) Pachete de mentenanta (sabloane care se atribuie clientilor prin abonamente)
create table if not exists crm_maintenance_packages (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text,
  price         numeric,
  currency      text default 'RON',
  billing_cycle text default 'lunar',
  features      jsonb default '[]'::jsonb,
  is_active     boolean not null default true,
  sort_order    int not null default 0,
  created_by    uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table crm_maintenance_packages enable row level security;

-- 2) Website-uri administrate (sub mentenanta) cu date de logare criptate
create table if not exists crm_websites (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references crm_clients(id) on delete cascade,
  subscription_id uuid references crm_subscriptions(id) on delete set null,
  label           text,
  domain          text,
  platform        text,
  hosting         text,
  hosting_url     text,
  admin_url       text,
  status          text not null default 'activ',
  credentials_enc text,             -- JSON criptat AES-256-GCM: [{label,url,username,password}]
  notes           text,
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
alter table crm_websites enable row level security;
create index if not exists crm_websites_client_idx on crm_websites (client_id);
create index if not exists crm_websites_subscription_idx on crm_websites (subscription_id);

-- 3) Extinderi abonamente: legatura la pachet + evidenta reminder reinnoire
alter table crm_subscriptions
  add column if not exists package_id uuid references crm_maintenance_packages(id) on delete set null,
  add column if not exists renewal_reminder_sent_at timestamptz;

-- Trigger updated_at (functia set_updated_at exista deja din migrarea de baza CRM)
drop trigger if exists set_updated_at on crm_maintenance_packages;
create trigger set_updated_at before update on crm_maintenance_packages
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on crm_websites;
create trigger set_updated_at before update on crm_websites
  for each row execute function set_updated_at();
