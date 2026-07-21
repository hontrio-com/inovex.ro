-- Status nou in pipeline-ul de lead-uri: 'edinio' — lead directionat catre
-- platforma SaaS Edinio.com (oferta custom prea mare / buget insuficient).

alter table crm_leads drop constraint if exists crm_leads_status_check;
alter table crm_leads add constraint crm_leads_status_check
  check (status = any (array['nou','calificat','convertit','edinio','pierdut']));
