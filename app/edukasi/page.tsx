'use client';
/**
 * app/edukasi/page.tsx — Live Supabase Data
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Star, Users, Clock, ChevronRight, Search, BookOpen, Award, Loader2 } from 'lucide-react';
import { CardGridSkeleton } from '@/components/ui/Skeletons';
import { supabase } from '@/lib/supabase';
import { useTranslations } from 'next-intl';

type Module = {
  id: string; title: string; description: string | null; category: string;
  level: string; duration_minutes: number; image_url: string | null;
  rating: number; enrolled: number;
};

const CATEGORIES = ['Semua', 'Bisnis & Marketing', 'Pertanian', 'Lingkungan', 'Keuangan', 'Kesehatan & Keselamatan', 'Kerajinan & Seni'];
function getLevelStyles(t: any) {
  return {
    [t('lvl_beginner')]: 'bg-primary-950 text-white border-transparent',
    [t('lvl_intermediate')]: 'bg-gray-100 text-primary-950 border-gray-200',
    [t('lvl_advanced')]: 'bg-primary-600 text-white border-primary-600',
  };
}

function ModuleCard({ mod, t }: { mod: Module; t: any }) {
  const h = Math.floor(mod.duration_minutes / 60);
  const m = mod.duration_minutes % 60;
  const LEVEL_STYLES = getLevelStyles(t);
  
  // Actually, we must be careful with DB saving "Pemula" instead of "Beginner".
  // mod.level is from DB, likely Indonesian. So we should map DB value to translated string.
  // DB values: "Pemula", "Menengah", "Lanjutan"
  const DB_LEVEL_MAP: Record<string, string> = {
    Pemula: t('lvl_beginner'),
    Menengah: t('lvl_intermediate'),
    Lanjutan: t('lvl_advanced')
  };
  const translatedLevel = DB_LEVEL_MAP[mod.level] || mod.level;
  
  const originalLevelStyles: Record<string, string> = {
    Pemula: 'bg-primary-950 text-white border-transparent',
    Menengah: 'bg-gray-100 text-primary-950 border-gray-200',
    Lanjutan: 'bg-primary-600 text-white border-primary-600',
  };
  return (
    <div className="group bg-white border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col p-6">
      {mod.image_url ? (
        <div className="relative aspect-square mb-6 overflow-hidden bg-gray-100 h-48 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mod.image_url} alt={mod.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-4 right-4"><span className={`text-[9px] font-bold px-3 py-1 uppercase tracking-widest border ${originalLevelStyles[mod.level] ?? 'bg-gray-50 text-gray-600'}`}>{translatedLevel}</span></div>
          <div className="absolute bottom-4 left-4"><span className="text-[9px] font-bold px-3 py-1 bg-black/60 backdrop-blur-sm text-white uppercase tracking-widest">{mod.category}</span></div>
        </div>
      ) : (
        <div className="relative aspect-square mb-6 bg-gray-100 h-48 w-full flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-gray-300" />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-primary-950 leading-snug mb-3 line-clamp-2 text-lg group-hover:text-primary-600 transition-colors">{mod.title}</h3>
        <p className="text-[11px] text-gray-500 mb-6 line-clamp-2 leading-relaxed flex-1">{mod.description}</p>
        
        <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-6 flex-wrap">
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" />{mod.rating.toFixed(1)}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{mod.enrolled}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{h > 0 ? `${h}j ` : ''}{m > 0 ? `${m}m` : ''}</span>
        </div>
        
        <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-primary-600 flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> {t('free')}</span>
          <span className="text-[10px] uppercase font-bold text-gray-900 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">{t('learn')} <ChevronRight className="w-3.5 h-3.5" /></span>
        </div>
      </div>
    </div>
  );
}

export default function EdukasiPage() {
  const t = useTranslations('edukasi');
  const CATEGORIES = [t('cat_all'), t('cat_biz'), t('cat_agri'), t('cat_env'), t('cat_fin'), t('cat_health'), t('cat_art')];
  
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(t('cat_all'));

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from('training_modules').select('*').eq('is_published', true).order('created_at', { ascending: false });
      setModules(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = modules.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    
    const DB_CATS = ['Semua', 'Bisnis & Marketing', 'Pertanian', 'Lingkungan', 'Keuangan', 'Kesehatan & Keselamatan', 'Kerajinan & Seni'];
    const sIdx = CATEGORIES.indexOf(category);
    const dbCat = DB_CATS[sIdx];
    
    const matchCat = sIdx === 0 || m.category === dbCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col lg:flex-row lg:items-end gap-10 mb-16">
        <h1 className="text-4xl md:text-[42px] font-semibold text-primary-800 tracking-tight shrink-0">
          {t('title_1')}<br />{t('title_2')}
        </h1>
        <div className="flex-1" />
        <div className="flex gap-2 flex-wrap pb-1">
          {CATEGORIES.slice(0, 4).map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${category === c ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{c}</button>
          ))}
        </div>
      </div>
      
      <div className="mb-12 border-b border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {t('subtitle')}
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input type="text" placeholder={t('search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white text-xs border border-gray-200 focus:border-primary-900 focus:outline-none transition-colors" />
        </div>
      </div>
      {loading ? (
        <CardGridSkeleton count={6} cols={3} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(mod => <ModuleCard key={mod.id} mod={mod} t={t} />)}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-14 h-14 bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-3"><BookOpen className="w-7 h-7 text-gray-400" /></div>
              <p className="font-semibold text-gray-700">{modules.length === 0 ? t('empty_none') : t('empty_not_found')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
