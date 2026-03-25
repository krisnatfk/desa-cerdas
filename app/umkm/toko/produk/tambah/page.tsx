'use client';

import { useState, useEffect, Suspense } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowLeft, X, UploadCloud, Sparkles } from 'lucide-react';
import { IKContext, IKUpload } from 'imagekitio-react';
import Link from 'next/link';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/9vtqch760";
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "public_0mvXhk/vVsGASxItm3hSlvr5KoA=";

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit/auth");
    if (!response.ok) throw new Error("Auth failed");
    return await response.json();
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function ProductForm() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const [store, setStore] = useState<any>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: 'Makanan', image_url: '', phone_number: '', stock: '10',
  });

  useEffect(() => {
    async function init() {
      if (!user) return;
      try {
        const storeRes = await fetch('/api/stores');
        const stores = await storeRes.json();
        const myStore = Array.isArray(stores) ? stores.find((s: any) => s.user_id === user.id) : null;
        if (myStore) setStore(myStore);

        if (editId && myStore) {
          const prodRes = await fetch(`/api/products?store_id=${myStore.id}`);
          const prods = await prodRes.json();
          const p = prods.find((p: any) => p.id === editId);
          if (p) {
            setFormData({
              name: p.name, description: p.description || '', price: String(p.price),
              category: p.category || 'Makanan', image_url: p.image_url || '',
              phone_number: p.phone_number || '', stock: String(p.stock ?? 10),
            });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingConfig(false);
      }
    }
    init();
  }, [user, editId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!store) return;
    setSaving(true);
    const payload = {
      ...formData,
      price: Number(formData.price), stock: Number(formData.stock),
      store_id: store.id, seller_name: store.name,
    };

    try {
      if (editId) {
        await fetch(`/api/products`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editId, ...payload }),
        });
      } else {
        await fetch('/api/products', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      router.push('/umkm/toko/produk');
    } catch (e) {
      console.error(e);
      setSaving(false);
    }
  }

  if (loadingConfig) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>;

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/umkm/toko/produk" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h2 className="text-xl font-bold text-gray-800">{editId ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* IMAGE UPLOAD */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Gambar Produk *</label>
            <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
              <div className="flex flex-col gap-3">
                {formData.image_url ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-green-100 bg-green-50/50 rounded-xl">
                    <div className="relative w-24 h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm group/img border border-black/5 ring-2 ring-white">
                      <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setFormData({ ...formData, image_url: '' })}
                        className="absolute top-1 right-1 bg-white/95 p-1 rounded-full shadow-md text-red-600 hover:bg-red-50 opacity-0 group-hover/img:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-green-800 mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Gambar Terunggah
                      </p>
                      <p className="text-xs text-green-600 leading-relaxed">
                        Gambar ini akan ditampilkan di katalog marketplace. Klik tombol silang pada gambar jika ingin mengganti dengan foto lain.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={`relative border-2 border-dashed rounded-xl p-5 md:p-8 flex flex-col items-center justify-center transition-colors ${uploadingImage ? 'border-primary-400 bg-primary-50/50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50/50'}`}>
                    {!uploadingImage && (
                      <IKUpload
                        fileName="product.jpg"
                        tags={["product"]}
                        useUniqueFileName={true}
                        folder={"/desacerdas/products"}
                        accept="image/*"
                        validateFile={(file: File) => {
                          if (file.size > 5000000) { alert("Ukuran gambar maksimal 5MB"); return false; }
                          return true;
                        }}
                        onError={(err: any) => {
                          console.error("Upload Error", err); setUploadingImage(false); alert("Gagal mengunggah gambar. Silakan coba lagi.");
                        }}
                        onSuccess={async (res: any) => {
                          setFormData(prev => ({ ...prev, image_url: res.url }));
                          setUploadingImage(false);
                          
                          // AI Generation
                          setIsGeneratingAI(true);
                          try {
                            const aiRes = await fetch('/api/ai/generate-product', {
                              method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: res.url }),
                            });
                            if (aiRes.ok) {
                              const data = await aiRes.json();
                              setFormData(prev => ({
                                ...prev,
                                name: data.name || prev.name,
                                description: data.description || prev.description,
                                category: data.category || prev.category,
                              }));
                            }
                          } catch (error) { console.error("AI Generation Error", error); } finally { setIsGeneratingAI(false); }
                        }}
                        onUploadStart={() => setUploadingImage(true)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                    )}
                    {uploadingImage ? (
                      <div className="flex flex-col items-center text-primary-600 py-2">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p className="text-[11px] font-bold uppercase tracking-widest text-primary-800">Mengunggah Gambar...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <UploadCloud className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-[13px] font-bold text-gray-700 mb-1">Klik atau lepaskan gambar di sini</p>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Maksimal 5MB (JPG/PNG)</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </IKContext>
            {!formData.image_url && !uploadingImage && <p className="text-[9px] text-red-500 mt-1">Gambar produk wajib diunggah untuk marketplace.</p>}
          </div>

          {/* AI Banner */}
          {isGeneratingAI && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center gap-3 animate-pulse">
              <div className="bg-white p-2 rounded-lg border border-indigo-100 shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-800 mb-0.5">Asisten AI Sedang Bekerja</p>
                <p className="text-[13px] text-indigo-600 font-medium">Menganalisis gambar dan menyusun deskripsi produk otomatis...</p>
              </div>
            </div>
          )}

          <hr className="border-gray-100" />

          {/* Text Inputs */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nama Produk *</label>
              <input type="text" required className="w-full border border-gray-200 p-3.5 text-sm rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50/50" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Deskripsi</label>
              <textarea className="w-full border border-gray-200 p-3.5 text-sm rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50/50 h-28 resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Harga (Rp) *</label>
                <input type="number" required min={0} className="w-full border border-gray-200 p-3.5 text-sm rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50/50" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Stok *</label>
                <input type="number" required min={0} className="w-full border border-gray-200 p-3.5 text-sm rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50/50" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Kategori *</label>
                <select className="w-full border border-gray-200 p-3.5 text-sm rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50/50" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option>Makanan</option>
                  <option>Kerajinan</option>
                  <option>Pertanian</option>
                  <option>Fashion</option>
                  <option>Jasa</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">No. WhatsApp</label>
                <input type="text" className="w-full border border-gray-200 p-3.5 text-sm rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50/50" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} placeholder="628xxxxxxxxxx" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-4 bg-primary-800 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors disabled:opacity-50 rounded-xl shadow-md shadow-primary-900/20"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editId ? 'Simpan Perubahan' : 'Terbitkan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>}>
      <ProductForm />
    </Suspense>
  );
}
