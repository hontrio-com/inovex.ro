/* Unelte mici pentru texte, fara date: se pot folosi si in componentele de client fara sa aduca in
   browser textele tuturor limbilor (cum ar face un import din lib/i18n/pagini/...). */

/** Inlocuieste {cheie} intr-un text: completeaza('De la {pret}', { pret: '249 lei' }). */
export const completeaza = (text: string, valori: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, k: string) => String(valori[k] ?? `{${k}}`));

/** „1 videoclip”, „3 videos”, „2 Videos”: textele vin din lib/i18n/pagini/motion.ts (`eticheta`). */
export const etichetaVideo = (t: { unu: string; mai: string }, n: number) => (n === 1 ? t.unu : t.mai.replace('{n}', String(n)));
