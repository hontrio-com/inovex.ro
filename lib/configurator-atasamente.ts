/* Atasamentele de la configuratorul de aplicatie web (2026-11-07, cerut de proprietar: la pasul 2, langa
   descriere, un plan, o schita sau o structura a aplicatiei). Ca la Video Motion Design: fisierele urca direct
   din browser in bucket-ul privat crm-files, sub configurator-atasamente/<id>/, prin URL-uri semnate date de
   /api/configurator/aplicatie-web/upload (o functie Vercel nu primeste corpuri mai mari de 4.5 MB). La
   trimiterea cererii, serverul citeste fisierele din storage (nu ce declara browserul) si le pune in emailul
   intern si in CRM ca linkuri spre /api/admin/atasamente-configurator (doar pentru cei logati in admin). */

export const ATASAMENTE_BUCKET = 'crm-files';
export const ATASAMENTE_PREFIX = 'configurator-atasamente';
export const ATASAMENTE_MAX = 5;
export const ATASAMENTE_MAX_MB = 20;
export const ATASAMENTE_MAX_BYTES = ATASAMENTE_MAX_MB * 1024 * 1024;

// documente, imagini, foi de calcul, prezentari si arhive (planuri, schite, wireframe-uri, specificatii)
export const ATASAMENTE_EXT = [
  '.pdf',
  '.png', '.jpg', '.jpeg', '.webp',
  '.doc', '.docx', '.odt', '.rtf', '.txt', '.md',
  '.xls', '.xlsx', '.ods', '.csv',
  '.ppt', '.pptx', '.odp',
  '.zip',
];

/** Extensia unui fisier, cu punct si cu litere mici (`.pdf`); '' daca nu are. */
export const extensie = (nume: string) => {
  const i = nume.lastIndexOf('.');
  return i > 0 ? nume.slice(i).toLowerCase() : '';
};

/** Marimea pentru oameni, in limba paginii: „2.4 MB” (engleza), „2,4 MB” (romana, germana), „2,4 Mo” (franceza). */
export const marime = (bytes: number, lang = 'en') => {
  const mo = lang === 'fr';
  const zecimale = lang === 'en' ? '.' : ',';
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1).replace('.', zecimale)} ${mo ? 'Mo' : 'MB'}`
    : `${Math.max(1, Math.round(bytes / 1024))} ${mo ? 'Ko' : 'KB'}`;
};
