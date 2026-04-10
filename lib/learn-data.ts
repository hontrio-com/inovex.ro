import { supabase } from '@/lib/supabase'
import type { LearnCategory, LearnContent, LearnComment } from '@/types/learn'

export async function getLearnCategories(): Promise<LearnCategory[]> {
  const { data, error } = await supabase
    .from('learn_categories')
    .select('*')
    .order('order', { ascending: true })
  if (error || !data) return []
  return data as LearnCategory[]
}

export interface GetLearnContentOptions {
  type?: string
  categorySlug?: string
  difficulty?: string
  sort?: 'newest' | 'oldest' | 'views' | 'downloads'
  page?: number
  perPage?: number
  search?: string
}

export interface PaginatedLearnContent {
  items: LearnContent[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export async function getLearnContent(opts: GetLearnContentOptions = {}): Promise<PaginatedLearnContent> {
  const { type, categorySlug, difficulty, sort = 'newest', page = 1, perPage = 12, search } = opts

  let query = supabase
    .from('learn_content')
    .select('*, category:learn_categories(*)', { count: 'exact' })
    .eq('status', 'published')

  if (type) query = query.eq('type', type)
  if (difficulty) query = query.eq('difficulty', difficulty)
  if (search) query = query.ilike('title', `%${search}%`)

  if (categorySlug) {
    const { data: cat } = await supabase
      .from('learn_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
    else return { items: [], total: 0, page, perPage, totalPages: 0 }
  }

  switch (sort) {
    case 'oldest':
      query = query.order('published_at', { ascending: true })
      break
    case 'views':
      query = query.order('views', { ascending: false })
      break
    case 'downloads':
      query = query.order('downloads', { ascending: false })
      break
    default:
      query = query.order('published_at', { ascending: false })
  }

  const from = (page - 1) * perPage
  const to = from + perPage - 1
  query = query.range(from, to)

  const { data, error, count } = await query
  if (error || !data) return { items: [], total: 0, page, perPage, totalPages: 0 }

  const total = count ?? 0
  return {
    items: data as LearnContent[],
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  }
}

export async function getLearnContentBySlug(slug: string): Promise<LearnContent | null> {
  const { data, error } = await supabase
    .from('learn_content')
    .select('*, category:learn_categories(*)')
    .eq('slug', slug)
    .single()
  if (error || !data) return null
  return data as LearnContent
}

export async function getFeaturedContent(): Promise<LearnContent[]> {
  const { data, error } = await supabase
    .from('learn_content')
    .select('*, category:learn_categories(*)')
    .eq('featured', true)
    .eq('status', 'published')
    .order('featured_order', { ascending: true })
    .limit(3)
  if (error || !data) return []
  return data as LearnContent[]
}

export interface ContentStats {
  articole: number
  resurse: number
  tooluri: number
  video: number
}

export async function getContentStats(): Promise<ContentStats> {
  const { data, error } = await supabase
    .from('learn_content')
    .select('type')
    .eq('status', 'published')

  if (error || !data) return { articole: 0, resurse: 0, tooluri: 0, video: 0 }

  const counts = { articole: 0, resurse: 0, tooluri: 0, video: 0 }
  for (const row of data) {
    if (row.type === 'articol') counts.articole++
    else if (row.type === 'resursa') counts.resurse++
    else if (row.type === 'tool') counts.tooluri++
    else if (row.type === 'video') counts.video++
  }
  return counts
}

export async function getRelatedContent(
  contentId: string,
  categoryId: string,
  limit = 3
): Promise<LearnContent[]> {
  const { data, error } = await supabase
    .from('learn_content')
    .select('*, category:learn_categories(*)')
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .neq('id', contentId)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error || !data) return []
  return data as LearnContent[]
}

export async function getApprovedComments(contentId: string): Promise<LearnComment[]> {
  const { data, error } = await supabase
    .from('learn_comments')
    .select('*')
    .eq('content_id', contentId)
    .eq('approved', true)
    .is('reply_to', null)
    .order('created_at', { ascending: true })

  if (error || !data) return []

  const topLevel = data as LearnComment[]

  const { data: repliesData } = await supabase
    .from('learn_comments')
    .select('*')
    .eq('content_id', contentId)
    .eq('approved', true)
    .not('reply_to', 'is', null)
    .order('created_at', { ascending: true })

  const replies = (repliesData ?? []) as LearnComment[]

  return topLevel.map((comment) => ({
    ...comment,
    replies: replies.filter((r) => r.reply_to === comment.id),
  }))
}

export interface PrevNextContent {
  prev: LearnContent | null
  next: LearnContent | null
}

export async function getPrevNextContent(
  contentId: string,
  categoryId: string
): Promise<PrevNextContent> {
  const { data } = await supabase
    .from('learn_content')
    .select('id, title, slug, type, published_at')
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .order('published_at', { ascending: true })

  if (!data || data.length < 2) return { prev: null, next: null }

  const idx = data.findIndex((item) => item.id === contentId)
  if (idx === -1) return { prev: null, next: null }

  return {
    prev: idx > 0 ? (data[idx - 1] as LearnContent) : null,
    next: idx < data.length - 1 ? (data[idx + 1] as LearnContent) : null,
  }
}
