'use client';
/**
 * app/admin/pengaturan-peta/page.tsx
 * Admin Map Settings — Draw village boundary on a satellite map,
 * set center-point, and configure village name/district info.
 * All changes are saved to Supabase via /api/settings.
 */
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Save, Map, CheckCircle, AlertTriangle } from 'lucide-react';

// Load the drawing map lazily (Leaflet requires browser)
const AdminMapDrawer = dynamic(() => import('@/components/map/AdminMapDrawer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400 text-sm gap-3">
      <Loader2 className="w-5 h-5 animate-spin" />
      Memuat Kanvas Peta...
    </div>
  ),
});

type Coord = [number, number];

interface Settings {
  village_name: string;
  district_name: string;
  city_name: string;
  province_name: string;
  center_lat: number;
  center_lng: number;
  boundary_geojson: Coord[][] | null;
  fallback_radius_m: number;
}

const DEFAULT: Settings = {
  village_name: 'Labuhan Maringgai',
  district_name: 'Labuhan Maringgai',
  city_name: 'Lampung Timur',
  province_name: 'Lampung',
  center_lat: -5.3428912,
  center_lng: 105.7938069,
  boundary_geojson: null,
  fallback_radius_m: 2500,
};

export default function AdminMapSettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load existing settings from API
  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setSettings({ ...DEFAULT, ...d }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleChange(key: keyof Settings, value: unknown) {
    setSettings(s => ({ ...s, [key]: value }));
    setStatus('idle');
  }

  async function handleSave() {
    setSaving(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
    }
  }

  const mapCenter: [number, number] = [settings.center_lat, settings.center_lng];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
        <span className="text-sm font-medium">Memuat pengaturan...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 border-l-4 border-primary-600 pl-4">
          <h1 className="text-2xl font-bold text-primary-900">Pengaturan Wilayah & Peta</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Konfigurasi Batas Desa / Kelurahan
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-primary-900 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-primary-950 disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>

      {/* Status Alert */}
      {status === 'success' && (
        <div className="flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-100 text-green-700 text-sm font-medium">
          <CheckCircle className="w-5 h-5 shrink-0" />
          Berhasil! Pengaturan wilayah telah disimpan. Semua fitur pemetaan akan otomatis menggunakan data baru ini.
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-100 text-red-700 text-sm font-medium">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          Gagal menyimpan. Pastikan tabel <code className="text-xs bg-red-100 px-1 rounded">app_settings</code> sudah dibuat di Supabase menggunakan file <code className="text-xs bg-red-100 px-1 rounded">migration-map-settings.sql</code>.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left: Info Form ─────────────────────────────────── */}
        <div className="xl:col-span-1 space-y-4">
          {/* Village Identity */}
          <div className="bg-white border border-gray-200 p-6 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pb-2 border-b border-gray-100">
              Identitas Wilayah
            </h3>
            {(
              [
                { key: 'village_name',  label: 'Nama Desa / Kelurahan', placeholder: 'cth: Labuhan Maringgai' },
                { key: 'district_name', label: 'Kecamatan',              placeholder: 'cth: Labuhan Maringgai' },
                { key: 'city_name',     label: 'Kabupaten / Kota',       placeholder: 'cth: Lampung Timur' },
                { key: 'province_name', label: 'Provinsi',               placeholder: 'cth: Lampung' },
              ] as { key: keyof Settings; label: string; placeholder: string }[]
            ).map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  value={settings[key] as string}
                  onChange={e => handleChange(key as keyof Settings, e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-primary-600 bg-gray-50 transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Center Point */}
          <div className="bg-white border border-gray-200 p-6 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pb-2 border-b border-gray-100">
              Titik Pusat (Balai Desa / Kantor)
            </h3>
            <p className="text-[11px] text-gray-400">Koordinat ini menentukan posisi tengah kamera peta saat pertama kali dibuka.</p>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Latitude</label>
              <input
                type="number" step="any"
                value={settings.center_lat}
                onChange={e => handleChange('center_lat', parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-primary-600 bg-gray-50 font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Longitude</label>
              <input
                type="number" step="any"
                value={settings.center_lng}
                onChange={e => handleChange('center_lng', parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-primary-600 bg-gray-50 font-mono"
              />
            </div>
          </div>

          {/* Fallback radius */}
          <div className="bg-white border border-gray-200 p-6 space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pb-2 border-b border-gray-100">
              Radius Cadangan
            </h3>
            <p className="text-[11px] text-gray-400">
              Digunakan sebagai validasi Geofencing jika Anda <strong>belum menggambar batas polygon</strong> pada peta di sebelah kanan.
            </p>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
                Radius (meter)
              </label>
              <input
                type="number" min={100}
                value={settings.fallback_radius_m}
                onChange={e => handleChange('fallback_radius_m', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-primary-600 bg-gray-50 font-mono"
              />
            </div>
          </div>

          {/* Polygon status */}
          <div className={`p-4 border text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 ${settings.boundary_geojson ? 'bg-green-50 border-green-100 text-green-700' : 'bg-yellow-50 border-yellow-100 text-yellow-700'}`}>
            <Map className="w-4 h-4 shrink-0" />
            {settings.boundary_geojson
              ? `✓ Poligon aktif (${settings.boundary_geojson[0].length - 1} titik sudut)`
              : 'Belum ada poligon — gambar di peta kanan'}
          </div>
        </div>

        {/* ── Right: Drawing Map ──────────────────────────────── */}
        <div className="xl:col-span-2 bg-white border border-gray-200 overflow-hidden" style={{ minHeight: 560 }}>
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Kanvas Pemetaan Wilayah</h3>
              <p className="text-xs text-gray-400 mt-0.5">Klik ikon polygon di sisi kiri atas peta, lalu gambar batas wilayah Anda dengan mengklik setiap sudutnya. Klik ganda untuk menyelesaikan.</p>
            </div>
          </div>
          <div className="h-[500px] w-full">
            <AdminMapDrawer
              center={mapCenter}
              existingPolygon={settings.boundary_geojson}
              onPolygonChange={coords => handleChange('boundary_geojson', coords)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
