-- LinkedIn Ads: click ID-ul reclamei (li_fat_id, din cookie-ul primar pus de Insight Tag cu
-- „Enhanced conversion tracking”) si platforma 'linkedin' pentru lead-urile venite din LinkedIn Ads,
-- ca sa primeasca semnale de calitate prin Conversions API cand devin Calificat / Convertit / Edinio.
-- Aplicata pe 2026-11-05 prin Supabase MCP (apply_migration).
alter table public.crm_leads add column if not exists li_fat_id text;

alter table public.crm_leads drop constraint if exists crm_leads_platform_check;
alter table public.crm_leads add constraint crm_leads_platform_check
  check (platform = any (array['meta', 'google', 'tiktok', 'openai', 'linkedin', 'website', 'manual']));
