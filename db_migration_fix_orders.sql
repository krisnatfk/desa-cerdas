-- ==============================================================================
-- FIX: Orders Table Migration
-- Jalankan script ini di Supabase SQL Editor
-- Mengubah orders.id dari uuid → text, dan menambah kolom payment_method
-- ==============================================================================

-- 1. Drop foreign keys yang mengacu ke orders.id
ALTER TABLE IF EXISTS public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE IF EXISTS public.reviews DROP CONSTRAINT IF EXISTS reviews_order_id_fkey;

-- 2. Ubah tipe orders.id dari uuid → text
ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN id SET DATA TYPE text USING id::text;

-- 3. Ubah tipe order_items.order_id dari uuid → text
ALTER TABLE public.order_items ALTER COLUMN order_id SET DATA TYPE text USING order_id::text;

-- 4. Ubah tipe reviews.order_id dari uuid → text  
ALTER TABLE public.reviews ALTER COLUMN order_id SET DATA TYPE text USING order_id::text;

-- 5. Re-create foreign keys
ALTER TABLE public.order_items ADD CONSTRAINT order_items_order_id_fkey 
  FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;

ALTER TABLE public.reviews ADD CONSTRAINT reviews_order_id_fkey 
  FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;

-- 6. Tambah kolom payment_method jika belum ada
DO $$ 
BEGIN 
    BEGIN
        ALTER TABLE public.orders ADD COLUMN payment_method text DEFAULT 'midtrans';
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
END $$;

-- 7. Tambah kolom shipping_address untuk menyimpan alamat pengiriman
DO $$ 
BEGIN 
    BEGIN
        ALTER TABLE public.orders ADD COLUMN shipping_address text;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN buyer_name text;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN buyer_phone text;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
END $$;

-- DONE! Sekarang orders.id bisa menerima string TRX-xxx
