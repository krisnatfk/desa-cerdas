-- =============================================
-- DesaMind — Migration Fix
-- Run this ONCE in Supabase SQL Editor
-- Fixes: UUID type mismatch + RLS permissions
-- =============================================

-- ============================================================
-- 1. Change user_id from UUID to TEXT (Clerk IDs are strings)
-- ============================================================
ALTER TABLE public.reports ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
ALTER TABLE public.reports ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.products ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
ALTER TABLE public.products ALTER COLUMN user_id DROP NOT NULL;

-- Also fix author_name to be nullable (for anonymous reports)
ALTER TABLE public.reports ALTER COLUMN author_name DROP NOT NULL;

-- ============================================================
-- 2. Disable RLS on ALL tables so anon key can read/write
-- ============================================================
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_actions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- 3. Grant full CRUD permissions to anon and authenticated roles
-- ============================================================
GRANT ALL ON public.users TO anon, authenticated;
GRANT ALL ON public.reports TO anon, authenticated;
GRANT ALL ON public.products TO anon, authenticated;
GRANT ALL ON public.projects TO anon, authenticated;
GRANT ALL ON public.jobs TO anon, authenticated;
GRANT ALL ON public.training_modules TO anon, authenticated;
GRANT ALL ON public.community_actions TO anon, authenticated;
GRANT ALL ON public.articles TO anon, authenticated;

-- Grant usage on sequences (for auto-generated UUIDs)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ============================================================
-- 4. Create Storage Bucket for report images
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('report-images', 'report-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload and read from the bucket
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'report-images');

CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'report-images');

-- ============================================================
-- 5. Create Comments & Likes tables
-- ============================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id TEXT,
  author_name TEXT DEFAULT 'Warga Anonim',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.report_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(report_id, user_id)
);

ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_likes DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.comments TO anon, authenticated;
GRANT ALL ON public.report_likes TO anon, authenticated;
