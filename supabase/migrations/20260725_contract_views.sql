-- ============================================================
-- INOVEX.RO CRM — Statistici deschideri link contract
-- Fiecare deschidere a paginii publice de semnare = un rand aici.
-- ============================================================
CREATE TABLE IF NOT EXISTS crm_contract_views (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid NOT NULL REFERENCES crm_contracts(id) ON DELETE CASCADE,
  viewed_at   timestamptz NOT NULL DEFAULT now(),
  ip_address  text,
  user_agent  text
);
CREATE INDEX IF NOT EXISTS idx_crm_contract_views_contract ON crm_contract_views(contract_id);
ALTER TABLE crm_contract_views ENABLE ROW LEVEL SECURITY;
