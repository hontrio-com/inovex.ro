-- ============================================================
-- INOVEX.RO CRM — Faza B: Schema completa
-- Core (clienti, lead-uri, contracte, semnaturi, activitati) +
-- extensii (fisiere, abonamente, dashboard, integrari) +
-- numerotare atomica contracte + bucket privat crm-files.
-- Idempotenta. Scrierile/citirile trec prin service role (bypass RLS).
-- Depinde de: 20260721_auth_profiles.sql (profiles, set_updated_at()).
-- ============================================================

-- ============================================================
-- CLIENTI
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_clients (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text NOT NULL,                          -- denumire firma / nume persoana
  type           text NOT NULL DEFAULT 'PJ' CHECK (type IN ('PF','PJ')),
  cui            text,                                    -- CUI / CIF
  reg_com        text,                                   -- nr. Registrul Comertului
  iban           text,
  bank           text,                                   -- banca
  address        text,                                   -- adresa completa
  city           text,
  county         text,                                   -- judet
  country        text DEFAULT 'Romania',
  website        text,
  email          text,
  phone          text,
  contact_person text,                                   -- persoana de contact principala
  status         text NOT NULL DEFAULT 'activ' CHECK (status IN ('activ','inactiv','prospect')),
  source         text,                                   -- sursa (meta/google/website/referral/manual...)
  assigned_to    uuid REFERENCES profiles(id) ON DELETE SET NULL,
  gdpr_consent   boolean DEFAULT false,
  notes          text,
  legacy_source  text,                                   -- 'perfex' / 'mentenanta' (migrare)
  legacy_id      text,
  created_by     uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_clients_assigned ON crm_clients(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_clients_status   ON crm_clients(status);
CREATE INDEX IF NOT EXISTS idx_crm_clients_cui      ON crm_clients(cui);
CREATE INDEX IF NOT EXISTS idx_crm_clients_email    ON crm_clients(email);
CREATE INDEX IF NOT EXISTS idx_crm_clients_legacy   ON crm_clients(legacy_source, legacy_id);

-- ============================================================
-- SABLOANE CONTRACTE
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_contract_templates (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  content     text NOT NULL,                             -- HTML cu variabile {{client_name}}, {{cui}}, {{value}}...
  is_active   boolean NOT NULL DEFAULT true,
  created_by  uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- LEAD-URI (clienti potentiali)
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_leads (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text,
  company             text,
  email               text,
  phone               text,
  status              text NOT NULL DEFAULT 'nou'
                        CHECK (status IN ('nou','contactat','calificat','oferta_trimisa','castigat','pierdut')),
  source              text,
  platform            text CHECK (platform IN ('meta','google','tiktok','website','manual')),
  campaign            text,
  estimated_value     numeric(14,2),
  currency            text DEFAULT 'RON',
  assigned_to         uuid REFERENCES profiles(id) ON DELETE SET NULL,
  lost_reason         text,
  -- Click id-uri & tracking (integrari Ads — sect. 7)
  fbclid              text,
  gclid               text,
  ttclid              text,
  fbp                 text,
  platform_lead_id    text,                              -- id lead din platforma sursa (dedublare)
  raw_payload         jsonb,                             -- payload original webhook (audit/debug)
  -- Conversions API outbound (idempotenta)
  capi_sent           boolean DEFAULT false,
  capi_sent_at        timestamptz,
  -- Conversie in client
  converted_client_id uuid REFERENCES crm_clients(id) ON DELETE SET NULL,
  converted_at        timestamptz,
  notes               text,
  created_by          uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_leads_status   ON crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_assigned ON crm_leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_leads_platform ON crm_leads(platform);
CREATE INDEX IF NOT EXISTS idx_crm_leads_campaign ON crm_leads(campaign);
CREATE INDEX IF NOT EXISTS idx_crm_leads_created  ON crm_leads(created_at DESC);
-- Dedublare pe (platform, platform_lead_id) doar cand exista platform_lead_id
CREATE UNIQUE INDEX IF NOT EXISTS uq_crm_leads_platform_leadid
  ON crm_leads(platform, platform_lead_id) WHERE platform_lead_id IS NOT NULL;

-- ============================================================
-- CONTRACTE (snapshot content, numerotare INV-YYYY-NNNN)
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_contracts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       uuid REFERENCES crm_clients(id) ON DELETE CASCADE,
  template_id     uuid REFERENCES crm_contract_templates(id) ON DELETE SET NULL,  -- referinta informativa
  contract_number text UNIQUE,                           -- INV-YYYY-NNNN (atomic, vezi next_contract_number)
  title           text,
  content         text NOT NULL,                         -- SNAPSHOT randat (nu referinta la sablon)
  status          text NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','trimis','semnat','expirat','anulat')),
  value           numeric(14,2),
  currency        text DEFAULT 'RON',
  sign_token      text,                                  -- token public de semnare (random, imposibil de ghicit)
  sent_at         timestamptz,
  expires_at      timestamptz,
  signed_at       timestamptz,
  signed_pdf_url  text,                                  -- PDF semnat (bucket crm-files)
  assigned_to     uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_by      uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_contracts_client ON crm_contracts(client_id);
CREATE INDEX IF NOT EXISTS idx_crm_contracts_status ON crm_contracts(status);
CREATE UNIQUE INDEX IF NOT EXISTS uq_crm_contracts_sign_token
  ON crm_contracts(sign_token) WHERE sign_token IS NOT NULL;

-- ============================================================
-- SEMNATURI CONTRACTE (audit semnare electronica)
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_contract_signatures (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id   uuid NOT NULL REFERENCES crm_contracts(id) ON DELETE CASCADE,
  signer_name   text NOT NULL,
  signer_email  text,
  signature_url text,                                    -- PNG semnatura (bucket crm-files)
  ip_address    text,
  user_agent    text,
  signed_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_signatures_contract ON crm_contract_signatures(contract_id);

-- ============================================================
-- ACTIVITATI (timeline: note, apeluri, schimbari status, system)
-- Legate polimorfic de client / lead / contract.
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_activities (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type        text NOT NULL DEFAULT 'note'
                CHECK (type IN ('note','call','email','meeting','task','status_change','system')),
  title       text,
  body        text,
  client_id   uuid REFERENCES crm_clients(id) ON DELETE CASCADE,
  lead_id     uuid REFERENCES crm_leads(id) ON DELETE CASCADE,
  contract_id uuid REFERENCES crm_contracts(id) ON DELETE CASCADE,
  created_by  uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_activities_client  ON crm_activities(client_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_lead    ON crm_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_created ON crm_activities(created_at DESC);

-- ============================================================
-- FISIERE CLIENT (fizic in bucket privat crm-files)
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_client_files (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   uuid NOT NULL REFERENCES crm_clients(id) ON DELETE CASCADE,
  file_name   text NOT NULL,
  file_url    text NOT NULL,                             -- path in bucket crm-files
  mime_type   text,
  size_bytes  bigint,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_client_files_client ON crm_client_files(client_id);

-- ============================================================
-- ABONAMENTE MENTENANTA
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_subscriptions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         uuid NOT NULL REFERENCES crm_clients(id) ON DELETE CASCADE,
  name              text NOT NULL,
  type              text NOT NULL DEFAULT 'mentenanta',
  status            text NOT NULL DEFAULT 'activ' CHECK (status IN ('activ','suspendat','anulat')),
  price             numeric(14,2),
  currency          text DEFAULT 'RON',
  billing_cycle     text DEFAULT 'lunar' CHECK (billing_cycle IN ('lunar','trimestrial','anual')),
  start_date        date,
  next_renewal_date date,
  contract_id       uuid REFERENCES crm_contracts(id) ON DELETE SET NULL,
  notes             text,
  legacy_source     text,
  legacy_id         text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_subscriptions_client  ON crm_subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_crm_subscriptions_status  ON crm_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_crm_subscriptions_renewal ON crm_subscriptions(next_renewal_date);

-- ============================================================
-- DASHBOARD PERSONALIZABIL (1 rand / user)
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_dashboard_layouts (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  layout     jsonb NOT NULL DEFAULT '[]'::jsonb,         -- [{key, position, size, config}]
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- INTEGRARI ADS (status + config NE-secret; token-urile stau in env)
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_integrations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform     text NOT NULL UNIQUE CHECK (platform IN ('meta','google','tiktok')),
  enabled      boolean NOT NULL DEFAULT false,
  config       jsonb NOT NULL DEFAULT '{}'::jsonb,       -- DOAR date ne-secrete (account/pixel/form ids, mapari)
  last_sync_at timestamptz,
  last_error   text,
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- NUMEROTARE ATOMICA CONTRACTE (INV-YYYY-NNNN)
-- Upsert cu lock pe rand => fara duplicate la scriere concurenta.
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_contract_counters (
  year        int PRIMARY KEY,
  last_number int NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION next_contract_number()
RETURNS text AS $$
DECLARE
  y int := EXTRACT(year FROM now())::int;
  n int;
BEGIN
  INSERT INTO crm_contract_counters (year, last_number)
  VALUES (y, 1)
  ON CONFLICT (year) DO UPDATE SET last_number = crm_contract_counters.last_number + 1
  RETURNING last_number INTO n;
  RETURN 'INV-' || y || '-' || lpad(n::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERE updated_at
-- ============================================================
DROP TRIGGER IF EXISTS trg_crm_clients_updated_at ON crm_clients;
CREATE TRIGGER trg_crm_clients_updated_at BEFORE UPDATE ON crm_clients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_crm_templates_updated_at ON crm_contract_templates;
CREATE TRIGGER trg_crm_templates_updated_at BEFORE UPDATE ON crm_contract_templates
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_crm_leads_updated_at ON crm_leads;
CREATE TRIGGER trg_crm_leads_updated_at BEFORE UPDATE ON crm_leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_crm_contracts_updated_at ON crm_contracts;
CREATE TRIGGER trg_crm_contracts_updated_at BEFORE UPDATE ON crm_contracts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_crm_subscriptions_updated_at ON crm_subscriptions;
CREATE TRIGGER trg_crm_subscriptions_updated_at BEFORE UPDATE ON crm_subscriptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_crm_dashboard_updated_at ON crm_dashboard_layouts;
CREATE TRIGGER trg_crm_dashboard_updated_at BEFORE UPDATE ON crm_dashboard_layouts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_crm_integrations_updated_at ON crm_integrations;
CREATE TRIGGER trg_crm_integrations_updated_at BEFORE UPDATE ON crm_integrations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- RLS — activata pe toate tabelele CRM.
-- Fara politici permisive: accesul se face exclusiv prin service role
-- (supabaseAdmin) din rutele API, care ocoleste RLS. Deny-by-default
-- pentru anon/authenticated.
-- ============================================================
ALTER TABLE crm_clients             ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contract_templates  ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads               ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contracts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contract_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities          ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_client_files        ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_subscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_dashboard_layouts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_integrations        ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contract_counters   ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STORAGE — bucket privat pentru fisiere client + PDF-uri semnate
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('crm-files', 'crm-files', false)
ON CONFLICT (id) DO NOTHING;
