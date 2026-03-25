'use client';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Package, Pencil, Trash2, Loader2, Plus } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import Link from 'next/link';

export default function ManageProductsPage() {
  const { user, isLoaded } = useUser();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      const storeRes = await fetch('/api/stores');
      const stores = await storeRes.json();
      const myStore = Array.isArray(stores) ? stores.find((s: any) => s.user_id === user.id) : null;
      if (myStore && myStore.status === 'active') {
        const prodRes = await fetch(`/api/products?store_id=${myStore.id}`);
        const prods = await prodRes.json();
        if (Array.isArray(prods)) setProducts(prods);
      }
    } catch { }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (isLoaded) loadData();
  }, [isLoaded, loadData]);

  async function handleDelete(productId: string) {
    if (!confirm('Hapus produk ini?')) return;
    setDeleting(productId);
    try {
      await fetch(`/api/products?id=${productId}`, { method: 'DELETE' });
      await loadData();
    } catch { }
    setDeleting(null);
  }

  if (!isLoaded || loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5" /> Kelola Produk
         </h2>
         <Link href="/umkm/toko/produk/tambah" className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-700 transition shadow-sm">
           <Plus className="w-4 h-4" /> Tambah Produk
         </Link>
      </div>

      {products.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
               <Package className="w-8 h-8 text-gray-300" />
             </div>
             <p className="text-gray-500 font-medium">Belum ada produk di etalase Anda.</p>
          </div>
      ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                   <tr className="border-b border-gray-200">
                      <th className="pb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Produk</th>
                      <th className="pb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Kategori</th>
                      <th className="pb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Harga</th>
                      <th className="pb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Stok</th>
                      <th className="pb-3 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Aksi</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                         <td className="py-4 flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-sm">
                               <Image src={product.image_url} alt="" fill className="object-cover" />
                            </div>
                            <span className="font-semibold text-gray-900 line-clamp-2 max-w-[200px] leading-snug">{product.name}</span>
                         </td>
                         <td className="py-4">
                            <span className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-primary-100">{product.category}</span>
                         </td>
                         <td className="py-4 font-bold text-gray-700">{formatRupiah(product.price)}</td>
                         <td className="py-4 text-sm font-medium text-gray-600">{product.stock}</td>
                         <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <Link href={`/umkm/toko/produk/tambah?edit=${product.id}`} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                                  <Pencil className="w-4 h-4" />
                               </Link>
                               <button onClick={() => handleDelete(product.id)} disabled={deleting === product.id} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                                  {deleting === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
      )}
    </div>
  );
}
