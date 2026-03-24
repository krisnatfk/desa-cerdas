'use client';
/**
 * app/umkm/page.tsx — Redesigned v2 with banner image
 */
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Search, Store, Plus, Star } from 'lucide-react';
import { CardGridSkeleton } from '@/components/ui/Skeletons';
import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/ui/ProductCard';
import { useTranslations } from 'next-intl';

export default function UMKMPage() {
  const t = useTranslations('umkm');
  const CATEGORIES = [t('cat_all'), t('cat_food'), t('cat_crafts'), t('cat_agri'), t('cat_fashion'), t('cat_services')];
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  useEffect(() => {
    async function loadProducts() {
      if (!supabase) return setLoading(false);
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const featured = products.filter((p) => p.featured);
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.seller_name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === t('cat_all') || p.category === category;
    return matchSearch && matchCat;
  });


  return (
    <div>
      {/* ── Banner matching Community Development ── */}
      <div className="bg-primary-900 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col justify-center max-w-md lg:ml-12 text-white order-1 lg:order-2 text-center lg:text-left">
            <h1 className="text-4xl md:text-[42px] font-semibold leading-tight mb-4">
              {t('title_1')} <br className="hidden lg:block"/> {t('title_2')}
            </h1>
            <p className="text-primary-200 text-xs tracking-wider mb-6 lg:mb-2">{t('subtitle')}</p>
          </div>
          <div className="w-full aspect-[21/9] lg:aspect-[4/3] relative rounded-none shadow-xl order-2 lg:order-1">
            <Image src="/umkm-banner.jpg" alt="Produk UMKM" fill className="object-cover" priority />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {[
            { label: t('stat_active'), value: products.length, color: 'bg-primary-50 text-primary-700 border-primary-100' },
            { label: t('stat_featured'), value: featured.length, color: 'bg-accent-50 text-amber-700 border-accent-100' },
            { label: t('stat_rating'), value: '4.8', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
          ].map((s) => (
            <div key={s.label} className={`p-4 sm:p-4 text-center border flex flex-row sm:flex-col items-center justify-between sm:justify-center ${s.color}`}>
              <div className="text-[10px] font-bold tracking-widest uppercase sm:mt-1 order-2 sm:order-2 text-right sm:text-center max-w-[50%] sm:max-w-none">{s.label}</div>
              <div className="text-2xl font-extrabold order-1 sm:order-1">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Featured section */}
        {featured.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
              <h2 className="font-bold text-gray-900">{t('featured_title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Filters and search area matching minimalist layout */}
        <div className="mb-10 text-center lg:text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Filter Kategori</p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-6">
            <div className="flex gap-2 w-full overflow-x-auto scrollbar-none pb-2 sm:pb-0">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 whitespace-nowrap px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    category === c ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-xs border border-gray-200 focus:border-primary-900 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* All products grid */}
        {loading ? (
          <CardGridSkeleton count={8} cols={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* CTA for sellers */}
        <div className="mt-20 border-t border-gray-200 pt-16 flex flex-col items-center">
          <h3 className="font-bold text-2xl text-primary-950 tracking-tight mb-4">{t('cta_title')}</h3>
          <p className="text-gray-500 text-xs max-w-md text-center leading-relaxed mb-8">{t('cta_desc')}</p>
          <a href="/auth/register" className="bg-primary-800 hover:bg-primary-950 text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3 transition-colors">
            {t('cta_btn')}
          </a>
        </div>
      </div>
    </div>
  );
}
