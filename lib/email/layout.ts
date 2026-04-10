/* ─────────────────────────────────────────────────────────────────────────────
   lib/email/layout.ts
   HTML wrapper pentru toate emailurile Inovex.
   Foloseste tabele pentru compatibilitate Outlook.
   Zero CSS extern, zero fonturi Google — doar Arial/Georgia.
───────────────────────────────────────────────────────────────────────────── */

export interface LayoutOptions {
  content: string;
  previewText: string;
  headerTag: string;
}

/* ── Helpers reutilizabili exportati ── */

export function sectionHeading(title: string): string {
  return `
    <div style="padding:0 40px;margin-top:28px;margin-bottom:12px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;
                  text-transform:uppercase;letter-spacing:1.5px;color:#8A94A6;">
        ${title}
      </div>
      <div style="border-top:1px solid #E8ECF0;margin-top:8px;"></div>
    </div>`;
}

export function dataRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;width:40%;vertical-align:top;
                 font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8A94A6;">
        ${label}
      </td>
      <td style="padding:10px 0;vertical-align:top;
                 font-family:Arial,Helvetica,sans-serif;font-size:13px;
                 color:#0D1117;font-weight:600;">
        ${esc(value)}
      </td>
    </tr>`;
}

export function dataTable(rows: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px;margin-bottom:8px;">
      ${rows}
    </table>`;
}

export function blueBox(content: string): string {
  return `
    <div style="margin:20px 40px;padding:16px 20px;
                background-color:#EAF5FF;border-left:4px solid #2B8FCC;
                border-radius:0 8px 8px 0;">
      ${content}
    </div>`;
}

export function greenAlertBox(title: string, text: string): string {
  return `
    <div style="margin:20px 40px;padding:16px 20px;
                background-color:#F0FDF4;border:1px solid #A7F3D0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                  font-weight:bold;color:#059669;margin-bottom:6px;">
        ${title}
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;
                  color:#047857;line-height:1.6;">
        ${text}
      </div>
    </div>`;
}

export function paragraph(text: string): string {
  return `
    <p style="margin:0;padding:0 40px 16px;
              font-family:Arial,Helvetica,sans-serif;font-size:15px;
              color:#4A5568;line-height:1.75;">
      ${text}
    </p>`;
}

export function heading(text: string): string {
  return `
    <h1 style="margin:0;padding:32px 40px 8px;
               font-family:Georgia,serif;font-size:26px;font-weight:bold;
               color:#0D1117;line-height:1.2;">
      ${esc(text)}
    </h1>`;
}

export function separator(): string {
  return `<div style="border-top:1px solid #F0F0F0;margin:24px 40px;"></div>`;
}

export function primaryButton(url: string, text: string, bg = '#2B8FCC'): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"
           style="margin:0 auto;">
      <tr>
        <td style="border-radius:8px;background-color:${bg};">
          <a href="${url}"
             style="display:inline-block;padding:14px 28px;
                    font-family:Arial,Helvetica,sans-serif;font-size:14px;
                    font-weight:bold;color:#FFFFFF;text-decoration:none;
                    border-radius:8px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>`;
}

export function metadataFooter(text: string): string {
  return `
    <div style="padding:16px 40px;background-color:#F8FAFB;border-top:1px solid #E8ECF0;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;
                  color:#8A94A6;line-height:1.6;">
        ${text}
      </div>
    </div>`;
}

export function quickActionButtons(phone: string, email: string): string {
  const waPhone = phone.replace(/\D/g, '').replace(/^0/, '40');
  return `
    <div style="text-align:center;padding:16px 40px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"
             style="margin:0 auto;">
        <tr>
          <td style="padding-right:8px;">
            <a href="tel:+${waPhone}"
               style="display:inline-block;padding:10px 18px;border-radius:6px;
                      background-color:#2B8FCC;color:#fff;text-decoration:none;
                      font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;">
              Suna acum
            </a>
          </td>
          <td style="padding-right:8px;">
            <a href="https://wa.me/${waPhone}"
               style="display:inline-block;padding:10px 18px;border-radius:6px;
                      background-color:#25D366;color:#fff;text-decoration:none;
                      font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;">
              WhatsApp
            </a>
          </td>
          <td>
            <a href="mailto:${esc(email)}"
               style="display:inline-block;padding:10px 18px;border-radius:6px;
                      background-color:#0D1117;color:#fff;text-decoration:none;
                      font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;">
              Raspunde email
            </a>
          </td>
        </tr>
      </table>
    </div>`;
}

export function timeline(steps: Array<{ title: string; desc: string }>): string {
  const rows = steps.map((s, i) => {
    const isLast = i === steps.length - 1;
    return `
      <tr>
        <td width="48" valign="top" style="padding:0 16px 0 40px;">
          <div style="width:36px;height:36px;border-radius:50%;background-color:#2B8FCC;
                      text-align:center;line-height:36px;
                      font-family:Arial,Helvetica,sans-serif;font-size:14px;
                      font-weight:bold;color:#fff;">
            ${i + 1}
          </div>
          ${!isLast ? `<div style="width:2px;height:24px;background:repeating-linear-gradient(to bottom,#E8ECF0,#E8ECF0 4px,transparent 4px,transparent 8px);margin:4px auto;"></div>` : ''}
        </td>
        <td valign="top" style="padding:4px 40px ${isLast ? '0' : '20px'} 0;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                      font-weight:bold;color:#0D1117;margin-bottom:4px;">
            ${esc(s.title)}
          </div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;
                      color:#4A5568;line-height:1.6;">
            ${s.desc}
          </div>
        </td>
      </tr>`;
  }).join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="margin-bottom:8px;">
      ${rows}
    </table>`;
}

export function contactDirect(): string {
  return `
    <div style="text-align:center;padding:20px 40px 8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8A94A6;margin-bottom:8px;">
        Nu vrei sa astepti? Suna-ne direct:
      </div>
      <a href="tel:+40750456096"
         style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;
                color:#2B8FCC;text-decoration:none;">
        0750 456 096
      </a>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A94A6;margin-top:4px;">
        Luni-Vineri, 09:00-18:00
      </div>
    </div>`;
}

export function smallDisclaimer(text: string): string {
  return `
    <div style="text-align:center;padding:8px 40px 24px;">
      <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8A94A6;">
        ${text}
      </span>
    </div>`;
}

/* ── Escape HTML ── */
export function esc(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Layout principal ── */
export function buildEmail({ content, previewText, headerTag }: LayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Inovex</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F4F6F8;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">

  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#F4F6F8;opacity:0;">
    ${esc(previewText)}&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#F4F6F8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 16px rgba(0,0,0,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#2B8FCC;padding:28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;
                                 font-weight:bold;color:#FFFFFF;letter-spacing:2px;">
                      INOVEX
                    </span>
                    <div style="margin-top:4px;font-family:Arial,Helvetica,sans-serif;
                                font-size:12px;color:rgba(255,255,255,0.70);">
                      Agentie Web Design Romania
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="background-color:rgba(255,255,255,0.20);color:#FFFFFF;
                                 font-family:Arial,Helvetica,sans-serif;font-size:11px;
                                 font-weight:bold;text-transform:uppercase;letter-spacing:1px;
                                 padding:5px 12px;border-radius:20px;">
                      ${esc(headerTag)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="background-color:#FFFFFF;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0D1117;padding:24px 40px;">
              <div style="margin-bottom:14px;">
                <a href="https://www.facebook.com/inovex.ro"
                   style="color:rgba(255,255,255,0.45);font-family:Arial,Helvetica,sans-serif;
                          font-size:12px;text-decoration:none;margin-right:16px;">
                  Facebook
                </a>
                <a href="https://www.instagram.com/inovex.ro"
                   style="color:rgba(255,255,255,0.45);font-family:Arial,Helvetica,sans-serif;
                          font-size:12px;text-decoration:none;margin-right:16px;">
                  Instagram
                </a>
                <a href="https://www.tiktok.com/@inovex.ro"
                   style="color:rgba(255,255,255,0.45);font-family:Arial,Helvetica,sans-serif;
                          font-size:12px;text-decoration:none;">
                  TikTok
                </a>
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;
                          color:rgba(255,255,255,0.35);line-height:1.6;">
                <div>2026 Inovex - VOID SFT GAMES SRL, CUI 43474393</div>
                <div>
                  <a href="mailto:contact@inovex.ro"
                     style="color:rgba(255,255,255,0.35);text-decoration:none;">
                    contact@inovex.ro
                  </a>
                  &nbsp;·&nbsp;
                  <a href="tel:+40750456096"
                     style="color:rgba(255,255,255,0.35);text-decoration:none;">
                    0750 456 096
                  </a>
                  &nbsp;·&nbsp;
                  <a href="https://inovex.ro"
                     style="color:rgba(255,255,255,0.35);text-decoration:none;">
                    inovex.ro
                  </a>
                </div>
                <div style="margin-top:4px;">Targu Jiu, Gorj &nbsp;·&nbsp; Bucuresti</div>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
