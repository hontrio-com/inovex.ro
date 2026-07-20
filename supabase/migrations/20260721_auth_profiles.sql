-- ============================================================
-- INOVEX.RO CRM — Faza A: Autentificare & Roluri (profiles)
-- Fundatia de auth cu Supabase Auth + roluri owner/admin/agent.
-- Migratie idempotenta — poate fi rulata de mai multe ori in siguranta.
-- ============================================================

-- ============================================================
-- ENUM ROLURI
-- ============================================================
DO $$ BEGIN
  CREATE TYPE crm_role AS ENUM ('owner', 'admin', 'agent');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================
-- FUNCTIE TRIGGER updated_at (partajata in tot CRM-ul)
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- PROFILES — 1:1 cu auth.users (rolul si datele de aplicatie)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text,
  full_name   text,
  role        crm_role NOT NULL DEFAULT 'agent',
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role  ON profiles(role);

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- TRIGGER: creare automata a profilului la signup
-- Owner-ul de bootstrap (contact@inovex.ro) primeste rol 'owner';
-- restul primesc 'agent' (implicit). SECURITY DEFINER => bypass RLS la insert.
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role crm_role := 'agent';
BEGIN
  IF NEW.email = 'contact@inovex.ro' THEN
    v_role := 'owner';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    v_role
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- RLS
-- Scrierile si citirile cross-user se fac prin service role (supabaseAdmin),
-- care oricum ocoleste RLS. Politica de mai jos permite fiecarui user sa-si
-- citeasca doar propriul profil (fara recursivitate RLS).
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
