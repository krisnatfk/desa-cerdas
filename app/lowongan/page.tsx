'use client';
import { useState } from 'react';
import { Briefcase, MapPin, Clock, Phone, Search, ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { dummyJobs } from '@/lib/dummy-data';


type Job = {
  id: string; title: string; company: string; description: string; category: string;
  type: string; location: string | null; deadline: string | null;
  salary_range: string | null; requirements: string[] | null;
  phone_number: string | null; is_active: boolean;
};

const CATEGORIES = ['Semua', 'Industri', 'Pemerintah', 'Digital', 'Pertanian', 'Pendidikan'];
const TYPE_CONFIG: Record<string, string> = {
  full_time: 'bg-blue-50 text-blue-700 border-blue-200',
  part_time: 'bg-violet-50 text-violet-700 border-violet-200',
  freelance: 'bg-orange-50 text-orange-700 border-orange-200',
  volunteer: 'bg-green-50 text-green-700 border-green-200',
};

function JobCard({ job, t, locale }: { job: Job; t: any; locale: string }) {
  const isExpiring = job.deadline ? new Date(job.deadline) <= new Date(Date.now() + 7 * 86400000) : false;
  const TYPE_LABEL: Record<string, string> = { full_time: t('type_full'), part_time: t('type_part'), freelance: t('type_free'), volunteer: t('type_vol') };
  return (
    <Link href={`/lowongan/${job.id}`} className="bg-white border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all p-6 md:p-8 flex flex-col group cursor-pointer block">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-primary-950 text-lg mb-1 group-hover:text-primary-700 transition-colors">{job.title}</h3>
          <p className="text-[11px] text-primary-600 font-bold uppercase tracking-widest">{job.company}</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[9px] font-bold px-3 py-1 uppercase tracking-widest bg-gray-100 text-gray-600">{TYPE_LABEL[job.type] ?? job.type}</span>
          {isExpiring && <span className="text-[9px] font-bold px-3 py-1 bg-red-600 text-white uppercase tracking-widest">{t('closing_soon')}</span>}
        </div>
      </div>
      
      <p className="text-[11px] text-gray-500 mb-6 line-clamp-2 leading-relaxed flex-1">{job.description}</p>
      
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
        {job.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>}
        {job.deadline && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{t('closes')} {new Date(job.deadline).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
        {job.salary_range && <span className="text-primary-600">{job.salary_range}</span>}
      </div>

      <div className="mt-auto border-t border-gray-100 pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-600">
        Lihat Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

export default function LowonganPage() {
  const t = useTranslations('lowongan');
  const locale = useLocale();
  const CATEGORIES = [t('cat_all'), t('cat_industry'), t('cat_gov'), t('cat_digital'), t('cat_agri'), t('cat_edu')];
  
  const [jobs] = useState<Job[]>(dummyJobs as any[]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(t('cat_all'));


  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    
    const DB_CATS = ['Semua', 'Industri', 'Pemerintah', 'Digital', 'Pertanian', 'Pendidikan'];
    const sIdx = CATEGORIES.indexOf(category);
    const dbCat = DB_CATS[sIdx];
    
    const matchCat = sIdx === 0 || j.category === dbCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col lg:flex-row lg:items-end gap-10 mb-16">
        <h1 className="text-4xl md:text-[42px] font-semibold text-primary-800 tracking-tight shrink-0 mr-8">
          {t('title_1')}<br />{t('title_2')}
        </h1>
        <div className="flex-1" />
        <div className="grid grid-cols-3 gap-6 w-full lg:w-auto">
          {[
            { label: t('stat_vacancies'), value: jobs.length },
            { label: t('stat_fulltime'), value: jobs.filter(j => j.type === 'full_time').length },
            { label: t('stat_open'), value: jobs.length },
          ].map(s => (
            <div key={s.label} className="border-l-2 border-primary-600 pl-4">
              <div className="text-[9px] font-bold uppercase tracking-widest text-primary-600 mb-1">{s.label}</div>
              <div className="text-sm font-bold text-primary-950">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-12 border-b border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-none w-full md:w-auto">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${category === c ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{c}</button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder={t('search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white text-xs border border-gray-200 focus:border-primary-900 focus:outline-none transition-colors" />
        </div>
      </div>

      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map(job => <JobCard key={job.id} job={job as any} t={t} locale={locale} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="font-bold text-gray-500">{jobs.length === 0 ? t('empty_none') : t('empty_not_found')}</p>
          </div>
        )}
        
        <div className="mt-20 border-t border-gray-200 pt-16 flex flex-col items-center text-center">
          <h3 className="font-bold text-2xl text-primary-950 tracking-tight mb-4">{t('cta_title')}</h3>
          <p className="text-gray-500 text-xs max-w-md leading-relaxed mb-8">{t('cta_desc')}</p>
          <a href="/auth/login" className="bg-primary-800 hover:bg-primary-950 text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3 transition-colors inline-block">
            {t('cta_btn')}
          </a>
        </div>
      </>

    </div>
  );
}
