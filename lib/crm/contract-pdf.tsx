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
      { src: path.join(process.cwd(), 'public/fonts/DejaVuSans-Oblique.ttf'), fontStyle: 'italic' },
      { src: path.join(process.cwd(), 'public/fonts/DejaVuSans-BoldOblique.ttf'), fontWeight: 'bold', fontStyle: 'italic' },
    ],
  });
  Font.registerHyphenationCallback((w) => [w]);
  fontsReady = true;
}

const BRAND = '#2B8FCC';
const INK = '#0F172A';
const BODY = '#1e293b';
const MUTED = '#64748b';
const LIGHT = '#94a3b8';

const styles = StyleSheet.create({
  page:          { paddingTop: 92, paddingBottom: 68, paddingHorizontal: 52, fontFamily: 'DejaVu', fontSize: 10.5, color: BODY, lineHeight: 1.55 },
  // header (repetat pe fiecare pagina)
  header:        { position: 'absolute', top: 32, left: 52, right: 52 },
  headerRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 7 },
  headerCompany: { fontSize: 13, fontWeight: 'bold', color: INK, letterSpacing: 0.3 },
  headerNr:      { fontSize: 9.5, color: MUTED },
  headerLine:    { height: 2, backgroundColor: BRAND, borderRadius: 1 },
  // footer (repetat)
  footer:        { position: 'absolute', bottom: 28, left: 52, right: 52 },
  footerLine:    { height: 0.7, backgroundColor: '#e2e8f0', marginBottom: 6 },
  footerRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  footerLegal:   { fontSize: 7.5, color: LIGHT, flex: 1, paddingRight: 12 },
  footerPage:    { fontSize: 7.5, color: LIGHT },
  audit:         { fontSize: 7, color: LIGHT, marginTop: 3 },
  // corp
  h1:            { fontSize: 15.5, fontWeight: 'bold', color: INK, marginBottom: 12, marginTop: 2 },
  h2:            { fontSize: 12.5, fontWeight: 'bold', color: INK, marginBottom: 6, marginTop: 13 },
  h3:            { fontSize: 11, fontWeight: 'bold', color: INK, marginBottom: 4, marginTop: 9 },
  p:             { marginBottom: 7, textAlign: 'justify' },
  li:            { flexDirection: 'row', marginBottom: 4 },
  bullet:        { width: 14, color: BRAND },
  liText:        { flex: 1 },
  bold:          { fontWeight: 'bold' },
  italic:        { fontStyle: 'italic' },
  underline:     { textDecoration: 'underline' },
  // semnaturi
  sigWrap:       { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' },
  sigBox:        { width: '44%' },
  sigRole:       { fontSize: 8.5, fontWeight: 'bold', color: BRAND, letterSpacing: 0.6, marginBottom: 6 },
  sigImg:        { height: 44, marginBottom: 3, objectFit: 'contain' },
  sigEmpty:      { height: 44, marginBottom: 3 },
  sigLine:       { height: 0.8, backgroundColor: '#94a3b8', marginBottom: 5 },
  sigName:       { fontSize: 10, fontWeight: 'bold', color: INK },
  sigMeta:       { fontSize: 8, color: MUTED, marginTop: 2 },
});

function renderInline(nodes: Node[], keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  nodes.forEach((n, i) => {
    const key = `${keyPrefix}-${i}`;
    if (n instanceof HTMLElement) {
      const tag = n.rawTagName?.toLowerCase();
      if (tag === 'strong' || tag === 'b') out.push(<Text key={key} style={styles.bold}>{renderInline(n.childNodes, key)}</Text>);
      else if (tag === 'em' || tag === 'i') out.push(<Text key={key} style={styles.italic}>{renderInline(n.childNodes, key)}</Text>);
      else if (tag === 'u') out.push(<Text key={key} style={styles.underline}>{renderInline(n.childNodes, key)}</Text>);
      else if (tag === 'br') out.push('\n');
      else out.push(...renderInline(n.childNodes, key));
    } else if (n instanceof TextNode) {
      if (n.text) out.push(n.text);
    }
  });
  return out;
}

function alignStyle(el: HTMLElement) {
  const style = el.getAttribute('style') ?? '';
  const m = /text-align:\s*(left|center|right|justify)/i.exec(style);
  return m ? { textAlign: m[1].toLowerCase() as 'left' | 'center' | 'right' | 'justify' } : {};
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
      case 'h1': out.push(<Text key={key} style={[styles.h1, alignStyle(n)]}>{n.text}</Text>); break;
      case 'h2': out.push(<Text key={key} style={[styles.h2, alignStyle(n)]}>{n.text}</Text>); break;
      case 'h3': case 'h4': case 'h5': out.push(<Text key={key} style={[styles.h3, alignStyle(n)]}>{n.text}</Text>); break;
      case 'p': out.push(<Text key={key} style={[styles.p, alignStyle(n)]}>{renderInline(n.childNodes, key)}</Text>); break;
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
  companyName?: string | null;
  companyCui?: string | null;
  companyRegCom?: string | null;
}

/** Randeaza PDF-ul contractului semnat, cu antet/footer profesional + semnaturi + audit eIDAS. */
export async function renderSignedContractPdf(input: SignedPdfInput): Promise<Buffer> {
  ensureFonts();
  const root = parse(input.contentHtml);
  const signedStr = new Date(input.signedAt).toLocaleString('ro-RO');
  const companyName = input.companyName || 'Contract';
  const legal = [input.companyName, input.companyCui ? `CUI ${input.companyCui}` : '', input.companyRegCom ? `Reg. Com. ${input.companyRegCom}` : '']
    .filter(Boolean).join('  ·  ');

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Antet (pe fiecare pagina) */}
        <View style={styles.header} fixed>
          <View style={styles.headerRow}>
            <Text style={styles.headerCompany}>{companyName}</Text>
            <Text style={styles.headerNr}>Contract nr. {input.contractNumber}</Text>
          </View>
          <View style={styles.headerLine} />
        </View>

        {/* Footer (pe fiecare pagina) */}
        <View style={styles.footer} fixed>
          <View style={styles.footerLine} />
          <View style={styles.footerRow}>
            <Text style={styles.footerLegal}>{legal}</Text>
            <Text style={styles.footerPage} render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} / ${totalPages}`} />
          </View>
          <Text style={styles.audit}>
            Semnatura electronica simpla (eIDAS)  ·  Semnat {signedStr}{input.ip ? `  ·  IP ${input.ip}` : ''}
          </Text>
        </View>

        {/* Corp contract */}
        <View>{renderBlocks(root.childNodes, 'c')}</View>

        {/* Semnaturi */}
        <View style={styles.sigWrap} wrap={false}>
          <View style={styles.sigBox}>
            <Text style={styles.sigRole}>BENEFICIAR</Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image, nu <img> DOM */}
            <Image style={styles.sigImg} src={input.clientSignature} />
            <View style={styles.sigLine} />
            <Text style={styles.sigName}>{input.clientName}</Text>
            <Text style={styles.sigMeta}>Semnat electronic  ·  {signedStr}</Text>
          </View>
          <View style={styles.sigBox}>
            <Text style={styles.sigRole}>PRESTATOR</Text>
            {input.companySignature ? (
              // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image, nu <img> DOM
              <Image style={styles.sigImg} src={input.companySignature} />
            ) : (
              <View style={styles.sigEmpty} />
            )}
            <View style={styles.sigLine} />
            <Text style={styles.sigName}>{input.companySigner || input.companyName || ''}</Text>
            <Text style={styles.sigMeta}>{input.companyName || ''}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return await renderToBuffer(doc);
}
