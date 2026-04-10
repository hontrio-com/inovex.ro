'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

/* ── Stiluri pentru secțiuni și butoane (backward compat) ── */
export const A = {
  section: {
    background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14,
    padding: 24, marginBottom: 20,
  } as React.CSSProperties,
  sectionTitle: {
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', marginBottom: 18,
  } as React.CSSProperties,
  row: {
    display: 'grid', gap: 16,
  } as React.CSSProperties,
  /* Butoane — stil inline pentru paginile admin existente */
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    height: 42, padding: '0 20px', borderRadius: 9,
    background: '#2B8FCC', color: '#fff', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem',
    transition: 'background 180ms ease',
  } as React.CSSProperties,
  btnOutline: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    height: 38, padding: '0 16px', borderRadius: 8,
    background: '#fff', color: '#374151', border: '1px solid #E2E8F0', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem',
    transition: 'border-color 150ms ease',
  } as React.CSSProperties,
  btnDanger: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, borderRadius: 6,
    background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', cursor: 'pointer',
    flexShrink: 0, transition: 'background 150ms ease',
  } as React.CSSProperties,
  label: {
    display: 'block', marginBottom: 6,
    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem', color: '#374151',
  } as React.CSSProperties,
  input: {
    width: '100%', height: 42, border: '1px solid #E2E8F0', borderRadius: 8,
    padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A',
    background: '#fff', outline: 'none', boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  textarea: {
    width: '100%', border: '1px solid #E2E8F0', borderRadius: 8,
    padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A',
    background: '#fff', outline: 'none', resize: 'vertical' as const,
    lineHeight: 1.6, boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  select: {
    width: '100%', height: 42, border: '1px solid #E2E8F0', borderRadius: 8,
    padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A',
    background: '#fff', outline: 'none', cursor: 'pointer',
  } as React.CSSProperties,
};

/* ── Field wrapper ─────────────────────────────── */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

/* ── Input helper ──────────────────────────────── */
export function Inp({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

/* ── Textarea helper ───────────────────────────── */
export function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <ShadcnTextarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="resize-none"
    />
  );
}

/* ── Select helper ─────────────────────────────── */
export function Sel({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  const placeholder = options.find((o) => o.value === '')?.label;
  const items = options.filter((o) => o.value !== '');
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* ── Image upload helper ────────────────────────── */
export function ImageField({ value, onChange, dir = 'uploads', label = 'Imagine' }: {
  value: string; onChange: (url: string) => void; dir?: string; label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('dir', dir);
      const res  = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.url) onChange(json.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/imagini/..."
          className="flex-1"
        />
        <label className="relative">
          <Button variant="outline" size="sm" asChild>
            <span className="cursor-pointer">
              <Upload size={14} />
              {uploading ? 'Upload...' : 'Upload'}
            </span>
          </Button>
          <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>
      </div>
      {value && (
        <div className="w-20 h-12 rounded-md overflow-hidden border border-gray-200 mt-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

/* ── Save bar ───────────────────────────────────── */
export function SaveBar({ saving, onSave, saved }: { saving: boolean; onSave: () => void; saved: boolean }) {
  return (
    <div className="sticky top-0 z-10 bg-[rgba(248,250,252,0.95)] backdrop-blur-sm border-b border-gray-200 px-8 py-3 flex items-center justify-end gap-3">
      {saved && (
        <span className="text-[0.8125rem] text-emerald-600 font-semibold flex items-center gap-1.5">
          <CheckCircle size={14} /> Salvat cu succes
        </span>
      )}
      <Button onClick={onSave} disabled={saving} loading={saving} leftIcon={<Save size={15} />}>
        {saving ? 'Se salvează...' : 'Salvează modificările'}
      </Button>
    </div>
  );
}

/* ── Page header ────────────────────────────────── */
export function AdminHeader({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="px-8 pt-7 pb-0 flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="font-bold text-[1.35rem] text-[#0F172A] mb-1">{title}</h1>
        {desc && <p className="text-[0.875rem] text-[#64748B]">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

/* ── Array item wrapper ─────────────────────────── */
export function ArrayItem({ index, total, onRemove, children, collapsed, onToggle }: {
  index: number; total: number; onRemove: () => void; children: React.ReactNode;
  collapsed?: boolean; onToggle?: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div
        className={cn(
          'flex items-center gap-2.5 px-3.5 py-2.5 bg-gray-50',
          !collapsed && 'border-b border-gray-200',
          onToggle && 'cursor-pointer'
        )}
        onClick={onToggle}
      >
        <GripVertical size={14} className="text-gray-300" />
        <span className="font-semibold text-[0.8125rem] text-gray-700 flex-1">Item #{index + 1}</span>
        {onToggle && (collapsed
          ? <ChevronDown size={14} className="text-gray-400" />
          : <ChevronUp   size={14} className="text-gray-400" />
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
        >
          <Trash2 size={13} />
        </Button>
      </div>
      {!collapsed && <div className="p-4">{children}</div>}
    </div>
  );
}
