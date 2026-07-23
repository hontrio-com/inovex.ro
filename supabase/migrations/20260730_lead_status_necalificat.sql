-- Status nou in pipeline-ul de lead-uri: 'necalificat' — lead triat rapid ca
-- nefiind niciodata un fit (spre deosebire de 'pierdut', care e un lead
-- CALIFICAT, urmarit, dar pierdut la inchidere). Separarea conteaza pentru
-- semnalele catre platformele de ads: un lead niciodata calificat e semnal
-- de targetare gresita; unul calificat dar pierdut nu ar trebui sa strice
-- targetarea, pentru ca profilul a fost totusi potrivit.

alter table crm_leads drop constraint if exists crm_leads_status_check;
alter table crm_leads add constraint crm_leads_status_check
  check (status = any (array['nou','calificat','convertit','edinio','necalificat','pierdut']));
