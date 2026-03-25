-- Script untuk memperbaiki pesanan lama yang store_id-nya masih kosong (null)
-- Jalankan script ini di menu SQL Editor pada dashboard Supabase Anda.

UPDATE public.orders
SET store_id = subquery.store_id
FROM (
  SELECT oi.order_id, p.store_id 
  FROM public.order_items oi
  JOIN public.products p ON oi.product_id = p.id
  WHERE p.store_id IS NOT NULL
) AS subquery
WHERE public.orders.id = subquery.order_id
  AND public.orders.store_id IS NULL;
