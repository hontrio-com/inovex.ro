'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Braces, ChevronDown,
} from 'lucide-react';
import { CONTRACT_VARS } from '@/lib/crm/contract-vars';

function Btn({ onClick, active, disabled, title, children }: { onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32,
        border: 'none', borderRadius: 7, cursor: disabled ? 'default' : 'pointer',
        background: active ? '#EFF6FF' : 'transparent', color: active ? '#2B8FCC' : '#475569',
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = '#F1F5F9'; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
    >{children}</button>
  );
}

const Sep = () => <span style={{ width: 1, height: 20, background: '#E2E8F0', margin: '0 4px' }} />;

export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [varsOpen, setVarsOpen] = useState(false);
  const varsRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const st = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e?.isActive('bold') ?? false,
      italic: e?.isActive('italic') ?? false,
      underline: e?.isActive('underline') ?? false,
      h1: e?.isActive('heading', { level: 1 }) ?? false,
      h2: e?.isActive('heading', { level: 2 }) ?? false,
      h3: e?.isActive('heading', { level: 3 }) ?? false,
      bullet: e?.isActive('bulletList') ?? false,
      ordered: e?.isActive('orderedList') ?? false,
      alignL: e?.isActive({ textAlign: 'left' }) ?? false,
      alignC: e?.isActive({ textAlign: 'center' }) ?? false,
      alignR: e?.isActive({ textAlign: 'right' }) ?? false,
      alignJ: e?.isActive({ textAlign: 'justify' }) ?? false,
    }),
  });

  useEffect(() => {
    function onDoc(e: MouseEvent) { if (varsRef.current && !varsRef.current.contains(e.target as Node)) setVarsOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  if (!editor) return <div style={{ height: 480, border: '1px solid #E2E8F0', borderRadius: 10 }} />;

  const insertVar = (key: string) => { editor.chain().focus().insertContent(`{{${key}}}`).run(); setVarsOpen(false); };

  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <style>{`
        .tiptap-doc .ProseMirror { outline: none; min-height: 420px; padding: 28px 34px; font-family: Georgia, serif; font-size: 0.95rem; color: #1e293b; line-height: 1.75; }
        .tiptap-doc .ProseMirror:focus { outline: none; }
        .tiptap-doc .ProseMirror h1 { font-size: 1.5rem; font-weight: 700; margin: 0.7em 0 0.35em; line-height: 1.25; }
        .tiptap-doc .ProseMirror h2 { font-size: 1.25rem; font-weight: 700; margin: 0.7em 0 0.35em; }
        .tiptap-doc .ProseMirror h3 { font-size: 1.08rem; font-weight: 700; margin: 0.6em 0 0.3em; }
        .tiptap-doc .ProseMirror p { margin: 0 0 0.65em; }
        .tiptap-doc .ProseMirror ul, .tiptap-doc .ProseMirror ol { padding-left: 1.5em; margin: 0 0 0.65em; }
        .tiptap-doc .ProseMirror li { margin-bottom: 0.25em; }
        .tiptap-doc .ProseMirror strong { font-weight: 700; }
      `}</style>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, padding: '7px 10px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', position: 'sticky', top: 0, zIndex: 5 }}>
        <Btn title="Bold (Ctrl+B)" active={st?.bold} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></Btn>
        <Btn title="Italic (Ctrl+I)" active={st?.italic} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></Btn>
        <Btn title="Subliniat (Ctrl+U)" active={st?.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16} /></Btn>
        <Sep />
        <Btn title="Titlu 1" active={st?.h1} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={16} /></Btn>
        <Btn title="Titlu 2" active={st?.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></Btn>
        <Btn title="Titlu 3" active={st?.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></Btn>
        <Sep />
        <Btn title="Lista" active={st?.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></Btn>
        <Btn title="Lista numerotata" active={st?.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
        <Sep />
        <Btn title="Aliniere stanga" active={st?.alignL} onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft size={16} /></Btn>
        <Btn title="Centrat" active={st?.alignC} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter size={16} /></Btn>
        <Btn title="Aliniere dreapta" active={st?.alignR} onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight size={16} /></Btn>
        <Btn title="Justified" active={st?.alignJ} onClick={() => editor.chain().focus().setTextAlign('justify').run()}><AlignJustify size={16} /></Btn>
        <Sep />
        <div ref={varsRef} style={{ position: 'relative' }}>
          <button type="button" onClick={() => setVarsOpen((o) => !o)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 32, padding: '0 10px', border: '1px solid #BFDBFE', borderRadius: 7, cursor: 'pointer', background: '#EFF6FF', color: '#2B8FCC', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600 }}>
            <Braces size={14} /> Variabila <ChevronDown size={13} />
          </button>
          {varsOpen && (
            <div style={{ position: 'absolute', top: 38, left: 0, zIndex: 20, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: 240, maxHeight: 300, overflowY: 'auto', padding: 6 }}>
              {CONTRACT_VARS.map((v) => (
                <button key={v.key} type="button" onClick={() => insertVar(v.key)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left', padding: '7px 10px', border: 'none', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#334155' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F1F5F9'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                  <span>{v.label}</span><code style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{`{{${v.key}}}`}</code>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="tiptap-doc" style={{ maxHeight: 520, overflowY: 'auto' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
