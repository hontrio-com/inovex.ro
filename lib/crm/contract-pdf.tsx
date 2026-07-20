import React from 'react';
import path from 'path';
import { Document, Page, View, Text, Image, Font, StyleSheet, renderToBuffer } from '@react-pdf/renderer';
import { parse, HTMLElement, TextNode, type Node } from 'node-html-parser';

// Font cu diacritice romanesti (Helvetica built-in nu are s/t cu virgula).
let fontsReady = false;
function ensureFonts() {
  if (fontsReady) return;
  Font.register({
    family: 'DejaVu',
    fonts: [
      { src: path.join(process.cwd(), 'public/fonts/DejaVuSans.ttf') },
      { src: path.join(process.cwd(), 'public/fonts/DejaVuSans-Bold.ttf'), fontWeight: 'bold' },
    ],
  });
  Font.registerHyphenationCallback((w) => [w]); // fara despartire in silabe
  fontsReady = true;
}

const styles = StyleSheet.create({
  page:     { padding: 48, fontFamily: 'DejaVu', fontSize: 10.5, color: '#1e293b', lineHeight: 1.5 },
  h1:       { fontSize: 15, fontWeight: 'bold', marginBottom: 8, marginTop: 6 },
  h2:       { fontSize: 13, fontWeight: 'bold', marginBottom: 6, marginTop: 8 },
  h3:       { fontSize: 11.5, fontWeight: 'bold', marginBottom: 5, marginTop: 6 },
  p:        { marginBottom: 6 },
  li:       { flexDirection: 'row', marginBottom: 3 },
  bullet:   { width: 12 },
  liText:   { flex: 1 },
  bold:     { fontWeight: 'bold' },
  sigWrap:  { marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' },
  sigBox:   { width: '45%' },
  sigLabel: { fontSize: 9, color: '#64748b', marginBottom: 4 },
  sigImg:   { height: 48, marginBottom: 4, objectFit: 'contain' },
  sigName:  { fontSize: 10, fontWeight: 'bold' },
  audit:    { marginTop: 24, paddingTop: 8, borderTopWidth: 0.5, borderTopColor: '#cbd5e1', fontSize: 7.5, color: '#94a3b8' },
});

function renderInline(nodes: Node[], keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  nodes.forEach((n, i) => {
    const key = `${keyPrefix}-${i}`;
    if (n instanceof HTMLElement) {
      const tag = n.rawTagName?.toLowerCase();
      if (tag === 'strong' || tag === 'b') out.push(<Text key={key} style={styles.bold}>{renderInline(n.childNodes, key)}</Text>);
      else if (tag === 'br') out.push('\n');
      else out.push(...renderInline(n.childNodes, key));
    } else if (n instanceof TextNode) {
      if (n.text) out.push(n.text);
    }
  });
  return out;
}

function renderBlocks(nodes: Node[], keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  nodes.forEach((n, i) => {
    const key = `${keyPrefix}-b${i}`;
    if (n instanceof TextNode) {
      const t = n.text.trim();
      if (t) out.push(<Text key={key} style={styles.p}>{t}</Text>);
      return;
    }
    if (!(n instanceof HTMLElement)) return;
    const tag = n.rawTagName?.toLowerCase();
    switch (tag) {
      case 'h1': out.push(<Text key={key} style={styles.h1}>{n.text}</Text>); break;
      case 'h2': out.push(<Text key={key} style={styles.h2}>{n.text}</Text>); break;
      case 'h3': case 'h4': case 'h5': out.push(<Text key={key} style={styles.h3}>{n.text}</Text>); break;
      case 'p': out.push(<Text key={key} style={styles.p}>{renderInline(n.childNodes, key)}</Text>); break;
      case 'ul': case 'ol':
        n.childNodes.filter((c) => c instanceof HTMLElement && c.rawTagName?.toLowerCase() === 'li').forEach((li, j) => {
          out.push(
            <View key={`${key}-li${j}`} style={styles.li}>
              <Text style={styles.bullet}>{'•'}</Text>
              <Text style={styles.liText}>{renderInline((li as HTMLElement).childNodes, `${key}-li${j}`)}</Text>
            </View>,
          );
        });
        break;
      case 'br': break;
      case 'div': case 'section': case 'article': out.push(...renderBlocks(n.childNodes, key)); break;
      default: {
        const t = n.text.trim();
        if (t) out.push(<Text key={key} style={styles.p}>{renderInline(n.childNodes, key)}</Text>);
      }
    }
  });
  return out;
}

export interface SignedPdfInput {
  contractNumber: string;
  contentHtml: string;
  clientSignature: string;            // data URL image/png (semnatura desenata)
  clientName: string;
  signedAt: string;                   // ISO
  ip?: string | null;
  userAgent?: string | null;
  companySignature?: string | null;   // data URL (semnatura firmei)
  companySigner?: string | null;
}

/** Randeaza PDF-ul contractului semnat (continut + semnaturi + audit eIDAS). */
export async function renderSignedContractPdf(input: SignedPdfInput): Promise<Buffer> {
  ensureFonts();
  const root = parse(input.contentHtml);
  const signedStr = new Date(input.signedAt).toLocaleString('ro-RO');

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>{renderBlocks(root.childNodes, 'c')}</View>

        <View style={styles.sigWrap} wrap={false}>
          <View style={styles.sigBox}>
            <Text style={styles.sigLabel}>Beneficiar</Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image, nu <img> DOM */}
            <Image style={styles.sigImg} src={input.clientSignature} />
            <Text style={styles.sigName}>{input.clientName}</Text>
            <Text style={styles.sigLabel}>Semnat electronic la {signedStr}</Text>
          </View>
          {input.companySignature ? (
            <View style={styles.sigBox}>
              <Text style={styles.sigLabel}>Prestator</Text>
              {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image, nu <img> DOM */}
              <Image style={styles.sigImg} src={input.companySignature} />
              <Text style={styles.sigName}>{input.companySigner ?? ''}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.audit} fixed>
          Contract {input.contractNumber} · Semnatura electronica simpla (eIDAS) · Semnat {signedStr}
          {input.ip ? ` · IP ${input.ip}` : ''}
        </Text>
      </Page>
    </Document>
  );

  return await renderToBuffer(doc);
}
