export type LearnType = 'articol' | 'resursa' | 'tool' | 'video'
export type LearnStatus = 'draft' | 'published' | 'archived'
export type LearnDifficulty = 'incepator' | 'intermediar' | 'avansat'
export type ToolComponentKey = 'CostCalculatorMagazin' | 'CostCalculatorWebsite' | 'ChecklistLansareMagazin' | 'SeoAuditChecker'

export interface LearnCategory {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  icon_name: string
  order: number
  created_at: string
}

export interface LearnContent {
  id: string
  title: string
  slug: string
  type: LearnType
  category_id: string | null
  category?: LearnCategory
  tags: string[]
  featured_image_url: string | null
  excerpt: string | null
  content: Record<string, unknown> | null
  read_time: number | null
  resource_description: string | null
  resource_file_url: string | null
  resource_preview_urls: string[]
  resource_benefits: string[]
  requires_email: boolean
  tool_description: string | null
  tool_component_key: ToolComponentKey | null
  tool_requires_email: boolean
  youtube_url: string | null
  video_duration: string | null
  seo_title: string | null
  seo_description: string | null
  featured: boolean
  featured_order: number | null
  difficulty: LearnDifficulty | null
  allow_comments: boolean
  views: number
  downloads: number
  status: LearnStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface LearnComment {
  id: string
  content_id: string
  author_name: string
  author_email: string
  content: string
  approved: boolean
  reply_to: string | null
  ip_address: string | null
  created_at: string
  replies?: LearnComment[]
}

export interface LearnLead {
  id: string
  name: string
  email: string
  resource_id: string | null
  resource_title: string | null
  ip_address: string | null
  user_agent: string | null
  gdpr_consent: boolean
  already_subscribed: boolean
  downloaded_at: string | null
  created_at: string
}
