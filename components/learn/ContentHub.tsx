'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SearchX, ChevronLeft, ChevronRight } from 'lucide-react'
import type { LearnContent, LearnCategory } from '@/types/learn'
import { ContentCard } from './ContentCard'
import { Button } from '@/components/ui/button'

interface ContentHubProps {
  initialItems: LearnContent[]
  categories: LearnCategory[]
  stats: { articole: number; resurse: number; tooluri: number; video: number }
}

const TYPE_TABS = [
  { key: '',        label: 'Toate' },
  { key: 'articol', label: 'Articole' },
  { key: 'resursa', label: 'Resurse' },
  { key: 'tool',    label: 'Tool-uri' },
  { key: 'video',   label: 'Video' },
]

const DIFFICULTY_OPTIONS = [
  { value: '',            label: 'Orice nivel' },
  { value: 'incepator',   label: 'Incepator' },
  { value: 'intermediar', label: 'Intermediar' },
  { value: 'avansat',     label: 'Avansat' },
]

const SORT_OPTIONS = [
  { value: 'newest',    label: 'Cele mai noi' },
  { value: 'oldest',    label: 'Cele mai vechi' },
  { value: 'views',     label: 'Cele mai vizualizate' },
  { value: 'downloads', label: 'Cele mai descarcate' },
]

const PER_PAGE = 12

function filterItems(
  items: LearnContent[],
  {
    search,
    type,
    categorySlug,
    difficulty,
    sort,
  }: { search: string; type: string; categorySlug: string; difficulty: string; sort: string }
): LearnContent[] {
  let result = [...items]

  if (type) result = result.filter((i) => i.type === type)
  if (categorySlug) result = result.filter((i) => i.category?.slug === categorySlug)
  if (difficulty) result = result.filter((i) => i.difficulty === difficulty)
  if (search) {
    const q = search.toLowerCase()
    result = result.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        (i.excerpt ?? '').toLowerCase().includes(q)
    )
  }

  switch (sort) {
    case 'oldest':
      result.sort((a, b) => new Date(a.published_at ?? a.created_at).getTime() - new Date(b.published_at ?? b.created_at).getTime())
      break
    case 'views':
      result.sort((a, b) => b.views - a.views)
      break
    case 'downloads':
      result.sort((a, b) => b.downloads - a.downloads)
      break
    default:
      result.sort((a, b) => new Date(b.published_at ?? b.created_at).getTime() - new Date(a.published_at ?? a.created_at).getTime())
  }

  return result
}

export function ContentHub({ initialItems, categories }: ContentHubProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '')
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [type, setType] = useState(searchParams.get('type') ?? '')
  const [categorySlug, setCategorySlug] = useState(searchParams.get('cat') ?? '')
  const [difficulty, setDifficulty] = useState(searchParams.get('diff') ?? '')
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'newest')
  const [page, setPage] = useState(parseInt(searchParams.get('page') ?? '1', 10))

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const syncUrl = useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams()
      Object.entries(params).forEach(([k, v]) => { if (v) sp.set(k, v) })
      router.replace(`?${sp.toString()}`, { scroll: false })
    },
    [router]
  )

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
      syncUrl({ q: searchInput, type, cat: categorySlug, diff: difficulty, sort, page: '1' })
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [searchInput]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleType(t: string) {
    setType(t)
    setPage(1)
    syncUrl({ q: search, type: t, cat: categorySlug, diff: difficulty, sort, page: '1' })
  }

  function handleCategory(slug: string) {
    const newSlug = categorySlug === slug ? '' : slug
    setCategorySlug(newSlug)
    setPage(1)
    syncUrl({ q: search, type, cat: newSlug, diff: difficulty, sort, page: '1' })
  }

  function handleDifficulty(d: string) {
    setDifficulty(d)
    setPage(1)
    syncUrl({ q: search, type, cat: categorySlug, diff: d, sort, page: '1' })
  }

  function handleSort(s: string) {
    setSort(s)
    setPage(1)
    syncUrl({ q: search, type, cat: categorySlug, diff: difficulty, sort: s, page: '1' })
  }

  function handlePage(p: number) {
    setPage(p)
    syncUrl({ q: search, type, cat: categorySlug, diff: difficulty, sort, page: String(p) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filtered = filterItems(initialItems, { search, type, categorySlug, difficulty, sort })
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <section className="bg-[#F8FAFB] py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search */}
        <div className="relative mb-6 max-w-lg">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cauta articole, resurse, tool-uri..."
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E8ECF0] bg-white text-[#0D1117] placeholder-[#8A94A6] outline-none focus:border-[#2B8FCC] focus:ring-2 focus:ring-[#2B8FCC]/20 transition-colors"
          />
        </div>

        {/* Type tabs */}
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleType(tab.key)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '6px 16px',
                borderRadius: 999,
                border: type === tab.key ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                background: type === tab.key ? '#2B8FCC' : '#fff',
                color: type === tab.key ? '#fff' : '#4A5568',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategory(cat.slug)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  padding: '5px 14px',
                  borderRadius: 999,
                  border: categorySlug === cat.slug ? `2px solid ${cat.color}` : '1px solid #E8ECF0',
                  background: categorySlug === cat.slug ? `${cat.color}1a` : '#fff',
                  color: categorySlug === cat.slug ? cat.color : '#4A5568',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 150ms ease',
                  flexShrink: 0,
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Filters row */}
        <div className="flex gap-3 mb-8 flex-wrap items-center">
          <select
            value={difficulty}
            onChange={(e) => handleDifficulty(e.target.value)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              padding: '7px 12px',
              borderRadius: 8,
              border: '1px solid #E8ECF0',
              background: '#fff',
              color: '#4A5568',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {DIFFICULTY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              padding: '7px 12px',
              borderRadius: 8,
              border: '1px solid #E8ECF0',
              background: '#fff',
              color: '#4A5568',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#8A94A6', marginLeft: 'auto' }}>
            {filtered.length} rezultate
          </span>
        </div>

        {/* Grid */}
        {paged.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <SearchX size={48} className="text-[#CBD5E1]" />
            <p style={{ fontFamily: 'var(--font-body)', color: '#8A94A6', fontSize: '1rem' }}>
              Niciun rezultat gasit. Incearca alte cuvinte cheie.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.2 }}
                >
                  <ContentCard item={item} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePage(page - 1)}
              disabled={page <= 1}
              leftIcon={<ChevronLeft size={14} />}
            >
              Anterior
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let p: number
                if (totalPages <= 7) {
                  p = i + 1
                } else if (page <= 4) {
                  p = i + 1
                } else if (page >= totalPages - 3) {
                  p = totalPages - 6 + i
                } else {
                  p = page - 3 + i
                }
                return (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border: p === page ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                      background: p === page ? '#2B8FCC' : '#fff',
                      color: p === page ? '#fff' : '#4A5568',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {p}
                  </button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePage(page + 1)}
              disabled={page >= totalPages}
              rightIcon={<ChevronRight size={14} />}
            >
              Urmator
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
