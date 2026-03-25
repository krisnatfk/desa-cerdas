'use client';
/**
 * app/umkm/daftar/page.tsx
 * Seller / Store Registration Page
 * - If user not logged in → show login prompt
 * - If user already has a store → show store status (pending/active/rejected)
 * - If user has no store → show registration form
 */
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Store, Loader2, CheckCircle, AlertCircle, ShoppingBag, ArrowLeft, Clock, XCircle, Activity } from 'lucide-react';
import Link from 'next/link';

export default function DaftarUMKMPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [formData, setFormData] = useState({ name: '', description: '', city: '', address: '' });
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedProv, setSelectedProv] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [existingStore, setExistingStore] = useState<any>(null);

  // Check if user already has a store
  useEffect(() => {
    async function checkExistingStore() {
      if (!user) { setChecking(false); return; }
      try {
        const res = await fetch('/api/stores?user_id=' + user.id);
        const stores = await res.json();
        if (Array.isArray(stores) && stores.length > 0) {
          // Find user's store
          const myStore = stores.find((s: any) => s.user_id === user.id);
          if (myStore) setExistingStore(myStore);
        }
      } catch { /* empty */ }
      setChecking(false);
    }
    if (isLoaded && isSignedIn) {
      checkExistingStore();
    } else if (isLoaded) {
      setChecking(false);
    }
  }, [user, isLoaded, isSignedIn]);

  // Fetch Provinces
  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(e => console.error(e));
  }, []);

  // Fetch Cities when Province changes
  useEffect(() => {
    if (selectedProv) {
      setFormData(prev => ({ ...prev, city: '' }));
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProv}.json`)
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(e => console.error(e));
    } else {
      setCities([]);
    }
  }, [selectedProv]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          city: formData.city,
          address: formData.address,
          user_id: user.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal mendaftarkan toko');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  // Loading state
  if (!isLoaded || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-bg pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white border border-gray-200 p-10">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-primary-900 mb-3">Login Diperlukan</h1>
            <p className="text-sm text-gray-500 mb-6">
              Anda harus login terlebih dahulu untuk mendaftarkan toko UMKM.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors"
            >
              Login / Daftar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User already has a store → show status
  if (existingStore) {
    const statusMap: Record<string, { label: string; desc: string; icon: any; color: string; bg: string }> = {
      pending: {
        label: 'Menunggu Persetujuan',
        desc: 'Toko Anda sedang ditinjau oleh admin. Proses persetujuan biasanya memakan waktu 1-3 hari kerja. Anda akan mendapat notifikasi setelah disetujui.',
        icon: Clock,
        color: 'text-amber-700',
        bg: 'bg-amber-50 border-amber-200',
      },
      active: {
        label: 'Toko Aktif',
        desc: 'Toko Anda sudah aktif! Anda bisa langsung mengelola produk dan menerima pesanan melalui Dashboard Toko.',
        icon: Activity,
        color: 'text-green-700',
        bg: 'bg-green-50 border-green-200',
      },
      rejected: {
        label: 'Ditolak',
        desc: 'Maaf, pendaftaran toko Anda ditolak oleh admin. Silakan hubungi admin untuk informasi lebih lanjut.',
        icon: XCircle,
        color: 'text-red-700',
        bg: 'bg-red-50 border-red-200',
      },
    };

    const status = statusMap[existingStore.status] || statusMap.pending;
    const StatusIcon = status.icon;

    return (
      <div className="min-h-screen bg-bg pt-28 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <Link href="/umkm" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Marketplace
          </Link>

          <div className="bg-white border border-gray-200">
            <div className="p-5 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary-900 flex items-center gap-2">
                <Store className="w-4 h-4" />
                Status Toko Anda
              </h2>
            </div>

            <div className="p-6 space-y-5">
              {/* Store info */}
              <div className="p-4 bg-primary-50/50 border border-primary-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-2">Nama Toko</p>
                <p className="text-lg font-bold text-primary-900">{existingStore.name}</p>
                {existingStore.description && (
                  <p className="text-sm text-gray-500 mt-1">{existingStore.description}</p>
                )}
              </div>

              {/* Status badge */}
              <div className={`p-4 border ${status.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  <p className={`text-sm font-bold ${status.color}`}>{status.label}</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{status.desc}</p>
              </div>

              {/* Actions based on status */}
              {existingStore.status === 'active' && (
                <Link
                  href="/umkm/toko"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors"
                >
                  <Store className="w-4 h-4" />
                  Buka Dashboard Toko
                </Link>
              )}

              <p className="text-[10px] text-gray-400 text-center">
                Didaftarkan pada {new Date(existingStore.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-bg pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white border border-gray-200 p-10">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-50 border border-green-200 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-primary-900 mb-3">Pendaftaran Berhasil!</h1>
            <p className="text-sm text-gray-500 mb-2">
              Toko <strong className="text-primary-800">{formData.name}</strong> telah didaftarkan.
            </p>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Status toko Anda saat ini: <span className="font-bold text-amber-600">Menunggu Persetujuan</span>. 
              Admin akan memverifikasi dan menyetujui toko Anda dalam 1-3 hari kerja.
            </p>
            <Link
              href="/umkm"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors"
            >
              Kembali ke Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Registration form
  return (
    <div className="min-h-screen bg-bg pt-28 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/umkm" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-primary-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Marketplace
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-4">
            <ShoppingBag className="w-4 h-4 text-primary-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-700">Daftar Seller</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-950 tracking-tight mb-2">Buka Toko Anda</h1>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Daftarkan UMKM Anda di marketplace desa. Jual produk unggulan dan jangkau lebih banyak pembeli.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary-900 flex items-center gap-2">
              <Store className="w-4 h-4" />
              Informasi Toko
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Owner info from Clerk */}
            <div className="p-4 bg-primary-50/50 border border-primary-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-2">Pemilik Toko</p>
              <div className="flex items-center gap-3">
                {user.imageUrl && (
                  <img src={user.imageUrl} alt="avatar" className="w-10 h-10 rounded-full border border-primary-200" />
                )}
                <div>
                  <p className="text-sm font-semibold text-primary-900">{user.fullName || user.firstName || 'User'}</p>
                  <p className="text-xs text-gray-500">{user.emailAddresses[0]?.emailAddress}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nama Toko *</label>
              <input
                type="text"
                required
                maxLength={100}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="contoh: Toko Keripik Ibu Warni"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Provinsi Toko *</label>
                 <select
                   required
                   className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-primary-500 bg-white"
                   value={selectedProv}
                   onChange={(e) => setSelectedProv(e.target.value)}
                 >
                   <option value="">-- Pilih Provinsi --</option>
                   {provinces.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                   ))}
                 </select>
               </div>
               
               <div className="space-y-1">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Kota / Kabupaten *</label>
                 <select
                   required
                   disabled={!selectedProv}
                   className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-primary-500 bg-white disabled:bg-gray-50"
                   value={formData.city}
                   onChange={(e) => setFormData({ ...formData, city: e.target.selectedOptions[0].text })}
                 >
                   <option value="">-- Pilih Kota/Kab. --</option>
                   {cities.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                   ))}
                 </select>
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Alamat Lengkap Toko *</label>
               <textarea
                 required
                 className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-primary-500 h-20 resize-none"
                 value={formData.address}
                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                 placeholder="Jalan, RT/RW, Patokan Gudang/Toko"
               />
               <p className="text-[9px] text-gray-400 mt-1">Alamat ini akan digunakan sebagai alamat penjemputan (origin) paket oleh kurir.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Deskripsi Toko</label>
              <textarea
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-primary-500 transition-colors h-28 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Jelaskan toko Anda, jenis produk yang dijual, dll..."
              />
            </div>

            {/* Info box */}
            <div className="p-4 bg-amber-50 border border-amber-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1">Catatan Penting</p>
              <ul className="text-xs text-amber-600 space-y-1 leading-relaxed">
                <li>• Toko Anda akan berstatus <strong>Pending</strong> sampai disetujui admin.</li>
                <li>• Setelah disetujui, Anda bisa menambahkan produk.</li>
                <li>• Satu akun hanya bisa memiliki satu toko.</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Store className="w-4 h-4" />
                  Daftarkan Toko
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
