-- ============================================================
-- INOVEX.RO CRM — Faza E: coloana pentru reminderele de contract
-- Marcheaza cand s-a trimis reminderul, ca sa nu se trimita de mai multe ori.
-- ============================================================
ALTER TABLE crm_contracts ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz;
