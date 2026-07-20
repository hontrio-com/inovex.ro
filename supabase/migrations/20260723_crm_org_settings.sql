-- ============================================================
-- INOVEX.RO CRM — Faza E: Setari firma (pt contracte + semnatura auto)
-- Un singur rand (id=1). Datele firmei alimenteaza variabilele {{company_*}}
-- din contracte; signature_url = semnatura firmei aplicata automat pe PDF.
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_org_settings (
  id              int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  company_name    text,
  company_cui     text,
  company_reg_com text,
  company_address text,
  company_iban    text,
  company_bank    text,
  email           text,                 -- email firma (CC pe contracte)
  signer_name     text,                 -- reprezentant care semneaza
  signature_url   text,                 -- path in bucketul crm-files (PNG)
  reminder_days   int NOT NULL DEFAULT 3,   -- reminder dupa X zile nesemnat
  expiry_days     int NOT NULL DEFAULT 14,  -- contract expira dupa X zile
  updated_at      timestamptz NOT NULL DEFAULT now()
);

INSERT INTO crm_org_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

DROP TRIGGER IF EXISTS trg_crm_org_updated_at ON crm_org_settings;
CREATE TRIGGER trg_crm_org_updated_at BEFORE UPDATE ON crm_org_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE crm_org_settings ENABLE ROW LEVEL SECURITY;
