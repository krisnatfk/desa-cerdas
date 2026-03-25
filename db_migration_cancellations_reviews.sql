-- Script Migrasi untuk Fitur Pembatalan, Penyelesaian dengan Foto, dan Ulasan
-- Jalankan script ini di menu SQL Editor pada dashboard Supabase Anda.

-- 1. Tambahkan kolom baru pada tabel orders
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS cancellation_reason text,
ADD COLUMN IF NOT EXISTS cancellation_requested_by text,
ADD COLUMN IF NOT EXISTS cancellation_status text,
ADD COLUMN IF NOT EXISTS completion_photo_base64 text,
ADD COLUMN IF NOT EXISTS is_reviewed boolean DEFAULT false;

-- 2. Pastikan tabel reviews menggunakan tipe 'text' untuk order_id agar sesuai dengan tabel orders
-- Drop foreign key lama jika ada
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_order_id_fkey;

-- Ubah tipe data order_id dari uuid menjadi text
ALTER TABLE public.reviews ALTER COLUMN order_id TYPE text USING order_id::text;

-- Tambahkan kembali foreign key yang merujuk ke tabel orders
ALTER TABLE public.reviews ADD CONSTRAINT reviews_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;

-- (Opsional) Jika tabel reviews belum ada, ini akan membuatnya:
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  buyer_id text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(order_id, product_id, buyer_id)
);
