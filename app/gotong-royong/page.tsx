'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Users, Calendar, MapPin, ChevronRight, UserPlus, Clock, CheckCircle2, Search } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { dummyActions } from '@/lib/dummy-data';


type Action = {
  id: string; title: string; description: string; category: string;
  date: string | null; time: string | null; location: string | null;
  max_participants: number; current_participants: number; status: string;
};

const CATEGORIES = ['Semua', 'Lingkungan', 'Infrastruktur', 'Sosial', 'Pendidikan', 'Kesehatan'];
const STATUS_STYLES: Record<string, { badge: string }> = {
  open: { badge: 'bg-green-50 text-green-700 border border-green-200' },
  full: { badge: 'bg-amber-50 text-amber-700 border border-amber-200' },
  done: { badge: 'bg-gray-100 text-gray-600 border border-gray-200' },
};

function ActionCard({ action, t, locale }: { action: Action; t: any; locale: string }) {
  const pct = Math.min(100, Math.round((action.current_participants / action.max_participants) * 100));
  const statusStyle = STATUS_STYLES[action.status] ?? STATUS_STYLES.open;
  
  const STATUS_LABEL: Record<string, string> = { open: t('stat_open'), full: t('stat_full'), done: t('stat_done') };
  return (
    <Link href={`/gotong-royong/${action.id}`} className="group bg-white border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col p-6 block">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-2">{action.category}</p>
          <h3 className="font-bold text-primary-950 text-lg leading-snug group-hover:text-primary-600 transition-colors">{action.title}</h3>
        </div>
        <span className={`text-[9px] font-bold px-3 py-1 uppercase tracking-widest shrink-0 ${statusStyle.badge}`}>{STATUS_LABEL[action.status]}</span>
      </div>
      <p className="text-[11px] text-gray-500 mb-6 line-clamp-2 leading-relaxed flex-1">{action.description}</p>
      
      <div className="flex flex-col gap-2 text-[10px] uppercase tracking-widest text-gray-400 mb-6 font-bold">
        {action.date && <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{new Date(action.date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
        {action.time && <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{action.time}</span>}
        {action.location && <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{action.location}</span>}
      </div>
      
      <div className="mt-auto border-t border-gray-100 pt-4">
        <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-2">
          <span className="text-gray-500 flex items-center gap-1.5"><Users className="w-3 h-3" />{action.current_participants} / {action.max_participants} {t('participants')}</span>
          <span className="text-primary-700">{pct}%</span>
        </div>
        <div className="h-1 bg-gray-100 overflow-hidden">
          <div className={`h-full transition-all ${pct >= 100 ? 'bg-gray-400' : pct > 70 ? 'bg-amber-400' : 'bg-primary-600'}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Link>
  );
}

export default function GotongRoyongPage() {
  const t = useTranslations('gotong_royong');
  const locale = useLocale();
  const CATEGORIES = [t('cat_all'), t('cat_env'), t('cat_infra'), t('cat_social'), t('cat_edu'), t('cat_health')];
  
  const [actions] = useState<Action[]>(dummyActions as any[]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(t('cat_all'));


  const filtered = actions.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    
    const DB_CATS = ['Semua', 'Lingkungan', 'Infrastruktur', 'Sosial', 'Pendidikan', 'Kesehatan'];
    const sIdx = CATEGORIES.indexOf(category);
    const dbCat = DB_CATS[sIdx];
    
    const matchCat = sIdx === 0 || a.category === dbCat;
    return matchSearch && matchCat;
  });

  const stats = [
    { label: t('stat_active'), value: actions.filter(a => a.status === 'open').length, color: 'bg-green-50 text-green-700 border-green-100' },
    { label: t('stat_joined'), value: actions.reduce((sum, a) => sum + a.current_participants, 0), color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { label: t('stat_completed'), value: actions.filter(a => a.status === 'done').length, color: 'bg-gray-100 text-gray-600 border-gray-200' },
  ];

  return (
    <div>
      <div className="bg-primary-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white">
          <div className="flex flex-col justify-center max-w-md">
            <h1 className="text-4xl md:text-[42px] font-semibold leading-tight mb-4">
              {t('title_1')}<br />{t('title_2')}
            </h1>
            <p className="text-primary-200 text-xs tracking-wider mb-2 leading-relaxed max-w-sm">{t('desc')}</p>
          </div>
          <div className="w-full aspect-[21/9] lg:aspect-[4/3] relative bg-primary-800 shadow-xl">
             <div className="absolute inset-0 flex items-center justify-center">
               <Users className="w-16 h-16 text-primary-600 mix-blend-overlay" />
             </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className={`p-4 text-center border ${s.color}`}>
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-[10px] font-bold tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        {/* Filters and search area matching minimalist layout */}
        <div className="mb-12 border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${category === c ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder={t('search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white text-xs border border-gray-200 focus:border-primary-900 focus:outline-none transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(action => <ActionCard key={action.id} action={action as any} t={t} locale={locale} />)}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-14 h-14 bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-3"><Users className="w-7 h-7 text-gray-400" /></div>
              <p className="font-semibold text-gray-700">{actions.length === 0 ? t('empty_none') : t('empty_not_found')}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
