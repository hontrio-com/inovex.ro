-- Actualizeaza constrangerile CHECK dupa simplificarea pipeline-ului de lead-uri
-- si extinderea abonamentelor (status Expirat + ciclu Semestrial).

-- Lead-uri: nou / calificat / convertit / pierdut
alter table crm_leads drop constraint if exists crm_leads_status_check;
alter table crm_leads add constraint crm_leads_status_check
  check (status = any (array['nou','calificat','convertit','pierdut']));

-- Abonamente: status + interval de facturare
alter table crm_subscriptions drop constraint if exists crm_subscriptions_status_check;
alter table crm_subscriptions add constraint crm_subscriptions_status_check
  check (status = any (array['activ','suspendat','expirat','anulat']));

alter table crm_subscriptions drop constraint if exists crm_subscriptions_billing_cycle_check;
alter table crm_subscriptions add constraint crm_subscriptions_billing_cycle_check
  check (billing_cycle = any (array['lunar','trimestrial','semestrial','anual']));
