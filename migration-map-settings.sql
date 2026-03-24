-- ============================================================
-- MIGRATION: App Settings Table for Dynamic Map Configuration
-- Jalankan SQL ini di Supabase SQL Editor Anda.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.app_settings (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Identitas Desa / Kelurahan / Kota
  village_name  TEXT    NOT NULL DEFAULT 'Labuhan Maringgai',
  district_name TEXT    NOT NULL DEFAULT 'Labuhan Maringgai',
  city_name     TEXT    NOT NULL DEFAULT 'Lampung Timur',
  province_name TEXT    NOT NULL DEFAULT 'Lampung',
  -- Titik pusat (koordinat balai desa / kantor kelurahan)
  center_lat    DOUBLE PRECISION NOT NULL DEFAULT -5.3428912,
  center_lng    DOUBLE PRECISION NOT NULL DEFAULT 105.7938069,
  -- Peta batas wilayah presisi (GeoJSON Polygon, format: [[lng,lat], ...])
  boundary_geojson  JSONB DEFAULT NULL,
  -- Radius fallback (meter) — digunakan jika boundary_geojson kosong
  fallback_radius_m INT   NOT NULL DEFAULT 2500,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Satu baris saja yang boleh ada (Singleton)
CREATE UNIQUE INDEX IF NOT EXISTS app_settings_singleton ON public.app_settings ((true));

-- Isi data awal (Labuhan Maringgai sebagai default)
INSERT INTO public.app_settings (village_name, district_name, city_name, province_name, center_lat, center_lng, fallback_radius_m)
VALUES ('Labuhan Maringgai', 'Labuhan Maringgai', 'Lampung Timur', 'Lampung', -5.3428912, 105.7938069, 2500)
ON CONFLICT DO NOTHING;
