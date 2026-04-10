'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save } from 'lucide-react';
import { A, Field, Inp, Textarea, Sel, SaveBar, ImageField, ArrayItem } from '@/app/admin/_components/AdminPage';
import type { MarketplaceProduct, MarketplaceCategory } from '@/types/marketplace';
import { CATEGORY_LABELS, PLATFORM_OPTIONS } from '@/types/marketplace';

/* ── helpers ─────────────────────────────────── */
const CAT_OPTIONS = (Object.keys(CATEGORY_LABELS) as MarketplaceCategory[]).map((v) => ({
  value: v, label: CATEGORY_LABELS[v],
}));

const ICON_NAMES = ['ClipboardList','Settings','Eye','Rocket','Headphones','Package','Truck','Shield','Star','Mail','Phone','Globe','Code2','Database','Smartphone'];

const DELIVERY_ICONS = ['ClipboardList','Settings','Eye','Rocket','Headphones'];

function tagArr(s: string): string[] { return s.split(',').map((x) => x.trim()).filter(Boolean); }
function arrTag(a: string[]): string  { return a.join(', '); }

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/* ── default empty product ───────────────────── */
export function emptyProduct(): MarketplaceProduct {
  return {
    id: '',
    slug: '',
    category: 'magazin-online',
    platform: 'WooCommerce',
    niche: '',
    title: '',
    tagline: '',
    description: '',
    fullDescription: '',
    mainImage: '',
    gallery: [],
    demoUrl: '',
    price: 999,
    deliveryDays: 2,
    badge: undefined,
    featured: false,
    status: 'published',
    totalSales: 0,
    publishedAt: new Date().toISOString().split('T')[0],
    seo: { metaTitle: '', metaDescription: '' },
    relatedSlugs: [],
    includedPages: [],
    includedFeatures: [],
    notIncluded: [],
    techSpecs: { platform: '', phpVersion: '', hostingRequirements: '', browserCompatibility: 'Chrome, Firefox, Safari, Edge', language: 'Romana', technologies: [] },
    deliverySteps: [],
    faq: [],
  };
}

/* ══════════════════════════════════════════════
   PRODUCT FORM
══════════════════════════════════════════════ */
export function ProductForm({ initial, isNew }: { initial: MarketplaceProduct; isNew: boolean }) {
  const router   = useRouter();
  const [p, setP] = useState<MarketplaceProduct>(initial);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  /* ── field updater ── */
  function upd<K extends keyof MarketplaceProduct>(key: K, val: MarketplaceProduct[K]) {
    setP((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  }
  function updSeo(key: keyof MarketplaceProduct['seo'], val: string) {
    setP((prev) => ({ ...prev, seo: { ...prev.seo, [key]: val } }));
  }
  function updTech(key: keyof MarketplaceProduct['techSpecs'], val: string | string[]) {
    setP((prev) => ({ ...prev, techSpecs: { ...prev.techSpecs, [key]: val } }));
  }

  /* ── save ── */
  async function save() {
    setSaving(true);
    const url    = isNew ? '/api/admin/marketplace' : `/api/admin/marketplace/${p.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    const updated = await res.json();
    setSaving(false);
    setSaved(true);
    if (isNew) router.push(`/admin/marketplace/${updated.id}`);
  }

  /* ── gallery helpers ── */
  function addGallery()  { upd('gallery', [...p.gallery, { src: '', label: '', alt: '' }]); }
  function updGallery(i: number, key: string, val: string) {
    const g = [...p.gallery] as typeof p.gallery;
    g[i] = { ...g[i], [key]: val };
    upd('gallery', g);
  }
  function removeGallery(i: number) { upd('gallery', p.gallery.filter((_, idx) => idx !== i)); }

  /* ── includedPages helpers ── */
  function addPage()  { upd('includedPages', [...p.includedPages, { pageName: '', pageDescription: '' }]); }
  function updPage(i: number, key: string, val: string) {
    const arr = [...p.includedPages];
    arr[i] = { ...arr[i], [key]: val };
    upd('includedPages', arr);
  }
  function removePage(i: number) { upd('includedPages', p.includedPages.filter((_, idx) => idx !== i)); }

  /* ── includedFeatures (categories) helpers ── */
  function addFeatureCat()  { upd('includedFeatures', [...p.includedFeatures, { category: '', features: [] }]); }
  function updFeatureCat(i: number, key: string, val: string | string[]) {
    const arr = [...p.includedFeatures];
    arr[i] = { ...arr[i], [key]: val };
    upd('includedFeatures', arr);
  }
  function removeFeatureCat(i: number) { upd('includedFeatures', p.includedFeatures.filter((_, idx) => idx !== i)); }

  /* ── notIncluded helpers ── */
  function addNotIncl() { upd('notIncluded', [...p.notIncluded, { item: '', explanation: '' }]); }
  function updNotIncl(i: number, key: string, val: string) {
    const arr = [...p.notIncluded];
    arr[i] = { ...arr[i], [key]: val };
    upd('notIncluded', arr);
  }
  function removeNotIncl(i: number) { upd('notIncluded', p.notIncluded.filter((_, idx) => idx !== i)); }

  /* ── delivery steps helpers ── */
  function addStep() {
    upd('deliverySteps', [...p.deliverySteps, {
      stepNumber: p.deliverySteps.length + 1,
      timeframe: '', title: '', description: '',
      icon: 'ClipboardList' as const,
    }]);
  }
  function updStep(i: number, key: string, val: string | number) {
    const arr = [...p.deliverySteps] as typeof p.deliverySteps;
    arr[i] = { ...arr[i], [key]: val } as typeof arr[0];
    upd('deliverySteps', arr);
  }
  function removeStep(i: number) { upd('deliverySteps', p.deliverySteps.filter((_, idx) => idx !== i)); }

  /* ── FAQ helpers ── */
  function addFaq() { upd('faq', [...p.faq, { question: '', answer: '' }]); }
  function updFaq(i: number, key: string, val: string) {
    const arr = [...p.faq];
    arr[i] = { ...arr[i], [key]: val };
    upd('faq', arr);
  }
  function removeFaq(i: number) { upd('faq', p.faq.filter((_, idx) => idx !== i)); }

  const platformOpts = (p.category ? PLATFORM_OPTIONS[p.category] : []).map((v) => ({ value: v, label: v }));

  const sec = A.section;
  const secTitle = A.sectionTitle;

  return (
    <>
      <SaveBar saving={saving} onSave={save} saved={saved} />
      <div style={{ padding: '24px 32px 48px', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* ── 1. Informatii de baza ── */}
        <div style={sec}>
          <p style={secTitle}>Informatii de baza</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Titlu produs *">
              <Inp value={p.title} onChange={(v) => {
                upd('title', v);
                if (isNew) upd('slug', generateSlug(v));
              }} placeholder="ex: Magazin Online Fashion" />
            </Field>
            <Field label="Slug URL *">
              <Inp value={p.slug} onChange={(v) => upd('slug', v)} placeholder="magazin-online-fashion" />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Categorie *">
              <Sel value={p.category} onChange={(v) => { upd('category', v as MarketplaceCategory); upd('platform', PLATFORM_OPTIONS[v as MarketplaceCategory][0] ?? 'Custom'); }}
                options={CAT_OPTIONS} />
            </Field>
            <Field label="Platforma *">
              <Sel value={p.platform} onChange={(v) => upd('platform', v)} options={platformOpts} />
            </Field>
            <Field label="Nisa">
              <Inp value={p.niche} onChange={(v) => upd('niche', v)} placeholder="ex: Fashion si Imbracaminte" />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Pret (EUR) *">
              <input type="number" value={p.price} onChange={(e) => upd('price', Number(e.target.value))} style={A.input} />
            </Field>
            <Field label="Zile livrare *">
              <input type="number" value={p.deliveryDays} onChange={(e) => upd('deliveryDays', Number(e.target.value))} style={A.input} />
            </Field>
            <Field label="Status">
              <Sel value={p.status} onChange={(v) => upd('status', v as MarketplaceProduct['status'])}
                options={[{ value: 'published', label: 'Publicat' }, { value: 'draft', label: 'Draft' }, { value: 'sold', label: 'Vandut' }]} />
            </Field>
            <Field label="Data publicare">
              <input type="date" value={p.publishedAt} onChange={(e) => upd('publishedAt', e.target.value)} style={A.input} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <Field label="Badge (text custom, ex: NOU, CEL MAI VANDUT)">
              <Inp value={p.badge ?? ''} onChange={(v) => upd('badge', v || undefined)} placeholder="Lasa gol daca nu vrei badge" />
            </Field>
            <Field label="Total vanzari (numar)">
              <input type="number" value={p.totalSales} onChange={(e) => upd('totalSales', Number(e.target.value))} style={A.input} />
            </Field>
            <Field label="Featured (apare in teaser homepage)">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 42 }}>
                <input type="checkbox" id="featured" checked={p.featured} onChange={(e) => upd('featured', e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }} />
                <label htmlFor="featured" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  Da, afiseaza in featured
                </label>
              </div>
            </Field>
          </div>
        </div>

        {/* ── 2. Descrieri si media ── */}
        <div style={sec}>
          <p style={secTitle}>Descrieri si Media</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Tagline (subtitlu scurt)">
              <Inp value={p.tagline} onChange={(v) => upd('tagline', v)} placeholder="Afacere digitala gata de folosit..." />
            </Field>
            <Field label="Descriere scurta (afisata pe card)">
              <Textarea value={p.description} onChange={(v) => upd('description', v)} rows={2} />
            </Field>
            <Field label="Descriere completa (pagina produs)">
              <Textarea value={p.fullDescription} onChange={(v) => upd('fullDescription', v)} rows={4} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <ImageField value={p.mainImage} onChange={(v) => upd('mainImage', v)} dir="marketplace" label="Imagine principala" />
              <Field label="Link demo live">
                <Inp value={p.demoUrl} onChange={(v) => upd('demoUrl', v)} placeholder="https://demo.inovex.ro" />
              </Field>
            </div>
          </div>
        </div>

        {/* ── 3. Galerie ── */}
        <div style={sec}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ ...secTitle, marginBottom: 0 }}>Galerie foto</p>
            <button onClick={addGallery} style={A.btnOutline}><Plus size={13} />Adauga imagine</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.gallery.map((g, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 10, alignItems: 'end' }}>
                <Field label={i === 0 ? 'URL imagine' : ''}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" value={g.src} onChange={(e) => updGallery(i, 'src', e.target.value)} placeholder="/imagini/..." style={{ ...A.input, flex: 1 }} />
                    <label style={{ ...A.btnOutline, cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                      Upload
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData(); fd.append('file', file); fd.append('dir', 'marketplace');
                        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                        const json = await res.json();
                        if (json.url) updGallery(i, 'src', json.url);
                      }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                    </label>
                  </div>
                </Field>
                <Field label={i === 0 ? 'Label (ex: Homepage)' : ''}>
                  <input type="text" value={g.label} onChange={(e) => updGallery(i, 'label', e.target.value)} placeholder="Homepage" style={A.input} />
                </Field>
                <Field label={i === 0 ? 'Alt text' : ''}>
                  <input type="text" value={g.alt} onChange={(e) => updGallery(i, 'alt', e.target.value)} placeholder="descriere imagine" style={A.input} />
                </Field>
                <button onClick={() => removeGallery(i)} style={{ ...A.btnDanger, marginTop: i === 0 ? 22 : 0 }}><Trash2 size={13} /></button>
              </div>
            ))}
            {p.gallery.length === 0 && <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '0.875rem' }}>Nicio imagine adaugata inca.</p>}
          </div>
        </div>

        {/* ── 4. Pagini incluse ── */}
        <div style={sec}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ ...secTitle, marginBottom: 0 }}>Pagini incluse</p>
            <button onClick={addPage} style={A.btnOutline}><Plus size={13} />Adauga pagina</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.includedPages.map((pg, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 10, alignItems: 'end' }}>
                <Field label={i === 0 ? 'Nume pagina' : ''}>
                  <input type="text" value={pg.pageName} onChange={(e) => updPage(i, 'pageName', e.target.value)} placeholder="Homepage" style={A.input} />
                </Field>
                <Field label={i === 0 ? 'Descriere' : ''}>
                  <input type="text" value={pg.pageDescription} onChange={(e) => updPage(i, 'pageDescription', e.target.value)} placeholder="Hero cu colectii..." style={A.input} />
                </Field>
                <button onClick={() => removePage(i)} style={{ ...A.btnDanger, marginTop: i === 0 ? 22 : 0 }}><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Functionalitati incluse ── */}
        <div style={sec}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ ...secTitle, marginBottom: 0 }}>Functionalitati incluse</p>
            <button onClick={addFeatureCat} style={A.btnOutline}><Plus size={13} />Adauga categorie</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {p.includedFeatures.map((cat, ci) => (
              <div key={ci} style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                  <Field label="Categorie (ex: Plati & Checkout)">
                    <Inp value={cat.category} onChange={(v) => updFeatureCat(ci, 'category', v)} placeholder="Plati & Checkout" />
                  </Field>
                  <button onClick={() => removeFeatureCat(ci)} style={{ ...A.btnDanger, marginTop: 22, flexShrink: 0 }}><Trash2 size={13} /></button>
                </div>
                <Field label="Functii (una per rand)">
                  <Textarea
                    value={cat.features.join('\n')}
                    onChange={(v) => updFeatureCat(ci, 'features', v.split('\n').map((s) => s.trim()).filter(Boolean))}
                    rows={4}
                    placeholder="Plata cu cardul prin Stripe&#10;Plata ramburs&#10;Coduri de reducere"
                  />
                </Field>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. Ce NU include ── */}
        <div style={sec}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ ...secTitle, marginBottom: 0 }}>Ce NU este inclus</p>
            <button onClick={addNotIncl} style={A.btnOutline}><Plus size={13} />Adauga element</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.notIncluded.map((n, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 10, alignItems: 'end' }}>
                <Field label={i === 0 ? 'Element' : ''}>
                  <input type="text" value={n.item} onChange={(e) => updNotIncl(i, 'item', e.target.value)} placeholder="Hosting si domeniu" style={A.input} />
                </Field>
                <Field label={i === 0 ? 'Explicatie' : ''}>
                  <input type="text" value={n.explanation ?? ''} onChange={(e) => updNotIncl(i, 'explanation', e.target.value)} placeholder="Necesita hosting..." style={A.input} />
                </Field>
                <button onClick={() => removeNotIncl(i)} style={{ ...A.btnDanger, marginTop: i === 0 ? 22 : 0 }}><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7. Specificatii tehnice ── */}
        <div style={sec}>
          <p style={secTitle}>Specificatii tehnice</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Platforma (ex: WordPress + WooCommerce)">
              <Inp value={p.techSpecs.platform} onChange={(v) => updTech('platform', v)} />
            </Field>
            <Field label="Versiune PHP (optional)">
              <Inp value={p.techSpecs.phpVersion ?? ''} onChange={(v) => updTech('phpVersion', v)} placeholder="8.2+" />
            </Field>
            <Field label="Cerinte hosting">
              <Inp value={p.techSpecs.hostingRequirements} onChange={(v) => updTech('hostingRequirements', v)} />
            </Field>
            <Field label="Compatibilitate browser">
              <Inp value={p.techSpecs.browserCompatibility} onChange={(v) => updTech('browserCompatibility', v)} />
            </Field>
            <Field label="Limba">
              <Inp value={p.techSpecs.language} onChange={(v) => updTech('language', v)} />
            </Field>
            <Field label="Tehnologii (separate prin virgula)">
              <Inp value={arrTag(p.techSpecs.technologies)} onChange={(v) => updTech('technologies', tagArr(v))} placeholder="WordPress 6.x, WooCommerce, PHP 8.2" />
            </Field>
          </div>
        </div>

        {/* ── 8. Timeline livrare ── */}
        <div style={sec}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ ...secTitle, marginBottom: 0 }}>Timeline livrare</p>
            <button onClick={addStep} style={A.btnOutline}><Plus size={13} />Adauga pas</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {p.deliverySteps.map((s, i) => (
              <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem', color: '#374151' }}>Pasul {i + 1}</span>
                  <button onClick={() => removeStep(i)} style={A.btnDanger}><Trash2 size={13} /></button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
                  <Field label="Timeframe">
                    <input type="text" value={s.timeframe} onChange={(e) => updStep(i, 'timeframe', e.target.value)} placeholder="Ziua 1 - ora 1" style={A.input} />
                  </Field>
                  <Field label="Icona">
                    <select value={s.icon} onChange={(e) => updStep(i, 'icon', e.target.value)} style={A.select}>
                      {DELIVERY_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </Field>
                  <Field label="Titlu pas">
                    <input type="text" value={s.title} onChange={(e) => updStep(i, 'title', e.target.value)} placeholder="Colectare date" style={A.input} />
                  </Field>
                  <Field label="Descriere">
                    <input type="text" value={s.description} onChange={(e) => updStep(i, 'description', e.target.value)} placeholder="Trimiti logo..." style={A.input} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 9. FAQ ── */}
        <div style={sec}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ ...secTitle, marginBottom: 0 }}>Intrebari frecvente</p>
            <button onClick={addFaq} style={A.btnOutline}><Plus size={13} />Adauga intrebare</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {p.faq.map((f, i) => (
              <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem', color: '#374151' }}>Intrebarea {i + 1}</span>
                  <button onClick={() => removeFaq(i)} style={A.btnDanger}><Trash2 size={13} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Field label="Intrebare">
                    <input type="text" value={f.question} onChange={(e) => updFaq(i, 'question', e.target.value)} placeholder="Pot adauga produse dupa livrare?" style={A.input} />
                  </Field>
                  <Field label="Raspuns">
                    <textarea value={f.answer} onChange={(e) => updFaq(i, 'answer', e.target.value)} rows={3} style={A.textarea} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 10. SEO ── */}
        <div style={sec}>
          <p style={secTitle}>SEO</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Meta titlu (max 60 caractere)">
              <Inp value={p.seo.metaTitle} onChange={(v) => updSeo('metaTitle', v)} />
            </Field>
            <Field label="Meta descriere (max 160 caractere)">
              <Textarea value={p.seo.metaDescription} onChange={(v) => updSeo('metaDescription', v)} rows={2} />
            </Field>
          </div>
        </div>

        {/* ── 11. Produse similare ── */}
        <div style={sec}>
          <p style={secTitle}>Produse similare</p>
          <Field label="Sluguri produse similare (separate prin virgula)">
            <Inp
              value={arrTag(p.relatedSlugs)}
              onChange={(v) => upd('relatedSlugs', tagArr(v))}
              placeholder="magazin-online-fashion, website-prezentare-salon"
            />
          </Field>
        </div>

        {/* Save bottom */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
          {saved && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center' }}>✓ Salvat</span>}
          <button onClick={save} disabled={saving} style={A.btnPrimary}>
            <Save size={15} />
            {saving ? 'Se salveaza...' : 'Salveaza'}
          </button>
        </div>
      </div>
    </>
  );
}
