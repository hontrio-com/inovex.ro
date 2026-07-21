import {
  buildEmail, heading, paragraph, dataTable, dataRow, separator, metadataFooter, esc,
} from '@/lib/email/layout';

/* ── Reminder intern: abonament pe cale sa expire / se reinnoieste ── */
export interface RenewalReminderData {
  subscriptionName: string;
  clientName: string;
  renewalDate: string; // formatat
  daysLeft: number;
  price?: string | null;
}

export function renewalReminderSubject(clientName: string, days: number): string {
  return days <= 0
    ? `Abonament ajuns la reinnoire — ${clientName} | Inovex`
    : `Abonament in reinnoire (${days} ${days === 1 ? 'zi' : 'zile'}) — ${clientName} | Inovex`;
}

export function renewalReminderHtml(d: RenewalReminderData): string {
  const when = d.daysLeft <= 0
    ? 'a ajuns la data de reinnoire'
    : `expira peste <strong>${d.daysLeft} ${d.daysLeft === 1 ? 'zi' : 'zile'}</strong>`;
  const content = `
    ${heading('Un abonament se apropie de reinnoire')}
    ${paragraph(`Abonamentul <strong>${esc(d.subscriptionName)}</strong> pentru clientul <strong>${esc(d.clientName)}</strong> ${when}.`)}
    ${dataTable(
      dataRow('Client', d.clientName) +
      dataRow('Abonament', d.subscriptionName) +
      dataRow('Data reinnoirii', d.renewalDate) +
      (d.price ? dataRow('Valoare', d.price) : ''),
    )}
    ${separator()}
    ${metadataFooter('Reinnoieste sau actualizeaza statusul abonamentului din panoul CRM.')}
  `;
  return buildEmail({ content, previewText: `Reinnoire abonament ${d.clientName}`, headerTag: 'Abonament' });
}
