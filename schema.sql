-- Supabase SQL Schema for DesaMind
-- Run this in your Supabase SQL Editor if you haven't created the tables yet.

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY, -- Maps to Clerk/Auth User ID
  role TEXT DEFAULT 'citizen',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  author_name TEXT DEFAULT 'Warga Anonim',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  seller_name TEXT NOT NULL,
  name TEXT NOT NULL,
  price BIGINT NOT NULL,
  phone_number TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  category TEXT DEFAULT 'Lainnya',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Optional depending on your access setup)
-- ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- NEW TABLES: Full Admin Feature Management
-- ============================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Infrastruktur',
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'ongoing', 'completed', 'paused')),
  budget BIGINT DEFAULT 0,
  spent BIGINT DEFAULT 0,
  progress INT DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  description TEXT,
  contractor TEXT,
  start_date TEXT,
  end_date TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Umum',
  type TEXT DEFAULT 'full_time' CHECK (type IN ('full_time', 'part_time', 'freelance', 'volunteer')),
  location TEXT,
  deadline DATE,
  salary_range TEXT,
  requirements TEXT[],
  phone_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.training_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Umum',
  level TEXT DEFAULT 'Pemula' CHECK (level IN ('Pemula', 'Menengah', 'Lanjutan')),
  duration_minutes INT DEFAULT 60,
  image_url TEXT,
  rating NUMERIC(3,1) DEFAULT 4.5,
  enrolled INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Sosial',
  date DATE,
  time TEXT,
  location TEXT,
  max_participants INT DEFAULT 20,
  current_participants INT DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'full', 'done')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'Umum',
  author TEXT DEFAULT 'Admin DesaMind',
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SOCIAL FEATURES: Comments & Likes
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
