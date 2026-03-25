-- ==============================================================================
-- DesaMind AI Marketplace (UMKM) Database Schema Migration
-- Execute this script in your Supabase SQL Editor
-- ==============================================================================

-- 1. Create `stores` table
CREATE TABLE IF NOT EXISTS public.stores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL, -- Clerk User ID
  name text NOT NULL,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'rejected')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Alter `products` table (if it exists) to support the new schema
-- Alternatively, if it doesn't exist, here is the full create:
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text, -- Originally string for Clerk ID or admin
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  phone_number text NOT NULL,
  image_url text,
  category text DEFAULT 'Lainnya',
  seller_name text,
  store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE,
  stock integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add missing columns to existing products table just in case
DO $$ 
BEGIN 
    BEGIN
        ALTER TABLE public.products ADD COLUMN category text DEFAULT 'Lainnya';
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
    BEGIN
        ALTER TABLE public.products ADD COLUMN seller_name text;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
    BEGIN
        ALTER TABLE public.products ADD COLUMN store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
    BEGIN
        ALTER TABLE public.products ADD COLUMN stock integer DEFAULT 0;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
END $$;


-- 3. Create `orders` table
CREATE TABLE IF NOT EXISTS public.orders (
  id text PRIMARY KEY,
  buyer_id text NOT NULL, -- Clerk User ID
  store_id uuid REFERENCES public.stores(id) ON DELETE SET NULL,
  total_amount numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'terbayar', 'diproses', 'dikirim', 'selesai', 'dibatalkan')),
  payment_method text DEFAULT 'midtrans',
  buyer_name text,
  buyer_phone text,
  shipping_address text,
  awb_number text, -- Resi number
  payment_token text, -- Midtrans Snap Token
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create `order_items` table
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL, -- Price at the time of purchase
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create `reviews` table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  buyer_id text NOT NULL, -- Clerk User ID
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(order_id, product_id, buyer_id) -- Max 1 review per product in a single order
);

-- Enable Row Level Security (RLS) but set permissive policies for API route handling
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Note: In a production app with Clerk + Supabase JWT integration, you would use auth.uid()
-- For this setup (using Next.js API Routes / Service Role), we create open policies
-- Assuming you bypass RLS in the server-side API using a Service Role key or handle security in Next.js
CREATE POLICY "Enable read access for all users" ON "public"."stores" USING (true);
CREATE POLICY "Enable all access for all users" ON "public"."stores" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."products" USING (true);
CREATE POLICY "Enable all access for all users" ON "public"."products" USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON "public"."orders" USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON "public"."order_items" USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON "public"."reviews" USING (true) WITH CHECK (true);
