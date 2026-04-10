-- ============================================================
-- INOVEX.RO — "Invata Gratuit" — Database Migration
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================================

-- ============================================================
-- LEARN CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS learn_categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  slug        text NOT NULL UNIQUE,
  description text,
  color       text DEFAULT '#2B8FCC',
  icon_name   text DEFAULT 'BookOpen',
  "order"     integer DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- ============================================================
-- LEARN CONTENT (articles, resources, tools, videos)
-- ============================================================
CREATE TABLE IF NOT EXISTS learn_content (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title                   text NOT NULL,
  slug                    text NOT NULL UNIQUE,
  type                    text NOT NULL CHECK (type IN ('articol','resursa','tool','video')),
  category_id             uuid REFERENCES learn_categories(id) ON DELETE SET NULL,
  tags                    text[] DEFAULT '{}',
  featured_image_url      text,
  excerpt                 text,
  content                 jsonb,
  read_time               integer,
  -- Resource fields
  resource_description    text,
  resource_file_url       text,
  resource_preview_urls   text[] DEFAULT '{}',
  resource_benefits       text[] DEFAULT '{}',
  requires_email          boolean DEFAULT true,
  -- Tool fields
  tool_description        text,
  tool_component_key      text CHECK (tool_component_key IN ('CostCalculatorMagazin','CostCalculatorWebsite','ChecklistLansareMagazin','SeoAuditChecker')),
  tool_requires_email     boolean DEFAULT false,
  -- Video fields
  youtube_url             text,
  video_duration          text,
  -- SEO
  seo_title               text,
  seo_description         text,
  -- Display
  featured                boolean DEFAULT false,
  featured_order          integer,
  difficulty              text CHECK (difficulty IN ('incepator','intermediar','avansat')),
  allow_comments          boolean DEFAULT true,
  -- Stats (updated by API, bypasses RLS)
  views                   integer DEFAULT 0,
  downloads               integer DEFAULT 0,
  -- Status
  status                  text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at            timestamptz,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- ============================================================
-- LEARN COMMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS learn_comments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id    uuid NOT NULL REFERENCES learn_content(id) ON DELETE CASCADE,
  author_name   text NOT NULL,
  author_email  text NOT NULL,
  content       text NOT NULL CHECK (char_length(content) <= 1000),
  approved      boolean DEFAULT false,
  reply_to      uuid REFERENCES learn_comments(id) ON DELETE SET NULL,
  ip_address    text,
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- LEARN LEADS (email captures from resource downloads)
-- ============================================================
CREATE TABLE IF NOT EXISTS learn_leads (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name               text NOT NULL,
  email              text NOT NULL,
  resource_id        uuid REFERENCES learn_content(id) ON DELETE SET NULL,
  resource_title     text,
  ip_address         text,
  user_agent         text,
  gdpr_consent       boolean DEFAULT false,
  already_subscribed boolean DEFAULT false,
  downloaded_at      timestamptz,
  created_at         timestamptz DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_learn_content_status   ON learn_content(status);
CREATE INDEX IF NOT EXISTS idx_learn_content_type     ON learn_content(type);
CREATE INDEX IF NOT EXISTS idx_learn_content_category ON learn_content(category_id);
CREATE INDEX IF NOT EXISTS idx_learn_content_slug     ON learn_content(slug);
CREATE INDEX IF NOT EXISTS idx_learn_content_featured ON learn_content(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_learn_comments_content ON learn_comments(content_id);
CREATE INDEX IF NOT EXISTS idx_learn_comments_approve ON learn_comments(approved);
CREATE INDEX IF NOT EXISTS idx_learn_leads_email      ON learn_leads(email);
CREATE INDEX IF NOT EXISTS idx_learn_leads_resource   ON learn_leads(resource_id);

-- ============================================================
-- RLS POLICIES
-- ============================================================
ALTER TABLE learn_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE learn_content    ENABLE ROW LEVEL SECURITY;
ALTER TABLE learn_comments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE learn_leads      ENABLE ROW LEVEL SECURITY;

-- Public: read categories + published content + approved comments
DROP POLICY IF EXISTS "public_read_categories" ON learn_categories;
CREATE POLICY "public_read_categories"
  ON learn_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_published_content" ON learn_content;
CREATE POLICY "public_read_published_content"
  ON learn_content FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "public_read_approved_comments" ON learn_comments;
CREATE POLICY "public_read_approved_comments"
  ON learn_comments FOR SELECT USING (approved = true);

-- Service role bypasses RLS automatically (used in API routes via supabaseAdmin)

-- ============================================================
-- SEED: 6 default categories
-- ============================================================
INSERT INTO learn_categories (name, slug, description, color, icon_name, "order") VALUES
  ('Magazine Online',           'magazine-online',     'Articole despre ecommerce, WooCommerce, Shopify',       '#2B8FCC', 'ShoppingCart', 1),
  ('Website-uri de Prezentare', 'website-prezentare',  'Ghiduri despre prezenta online si web design',          '#8B5CF6', 'Monitor',      2),
  ('SEO si Performanta',        'seo-performanta',     'Optimizare motoare cautare, viteza si performanta',     '#10B981', 'TrendingUp',   3),
  ('Marketing Digital',         'marketing-digital',   'META Ads, Google Ads, TikTok si social media',         '#F59E0B', 'Megaphone',    4),
  ('Tool-uri Gratuite',         'tool-uri-gratuite',   'Calculatoare, generatoare si checklist-uri',           '#EF4444', 'Wrench',       5),
  ('Ghiduri Video',             'ghiduri-video',       'Tutoriale video pe YouTube despre web si digital',     '#0D1117', 'Play',         6)
ON CONFLICT (slug) DO NOTHING;
