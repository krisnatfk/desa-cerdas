'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  MessageSquare, Bot, ShoppingBag, 
  GraduationCap, Users, ShieldCheck,
  Briefcase
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ReportCard } from '@/components/ui/ReportCard';
import { useTranslations } from 'next-intl';
import { dummyReports, dummyStats } from '@/lib/dummy-data';


export default function HomePage() {
  const t = useTranslations('home');
  const latestReports = dummyReports.slice(0, 4);
  const stats = {
    reports: dummyStats.totalReports,
    products: dummyStats.activeUMKM,
    resolved: dummyStats.completedReports,
  };



  return (
    <div className="flex flex-col w-full overflow-hidden bg-bg">
      
      {/* 1. HERO SECTION (Modern Minimalist & Elegant) */}
      <AnimatedSection className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gradient-to-br from-[#FAFAFA] via-surface to-[#F2EFE9] overflow-hidden">
        {/* Modern minimal background effects */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[800px] h-[800px] bg-primary-100/40 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary-50/50 rounded-full blur-[80px] -z-10 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Image Area (Top on Mobile, Right on Desktop) */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5 bg-gray-100 z-10">
              <Image
                src="/hero-banner.jpg" 
                alt="DesaCerdas"
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            {/* Minimalist Floating Badge (Repositioned to top-right on mobile, right-middle on desktop) */}
            <div className="absolute top-4 right-4 lg:top-1/2 lg:-translate-y-1/2 lg:-right-8 lg:bottom-auto bg-white/90 backdrop-blur-md px-3 py-2 lg:px-5 lg:py-4 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl border border-white/50 flex items-center gap-2 lg:gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 pointer-events-none z-20">
              <div className="bg-primary-50/80 p-1.5 lg:p-2.5 rounded-full border border-primary-100/50 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="text-[7px] lg:text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">{t('hero.badge_2_title')}</p>
                <p className="text-[9px] lg:text-[12px] font-bold text-gray-800">{t('hero.badge_2_desc')}</p>
              </div>
            </div>
            
            {/* Aesthetic Dot Pattern Decorator */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-60 z-0 hidden md:block" />
          </div>

          {/* Text Content (Bottom on Mobile, Left on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-20 text-center lg:text-left mt-8 lg:mt-0">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur border border-black/5 px-3.5 py-1.5 rounded-full mx-auto lg:mx-0 w-fit mb-5 lg:mb-6 shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary-600 animate-pulse"></span>
              <span className="text-[10px] lg:text-[11px] font-bold text-gray-600 tracking-widest uppercase">{t('hero.badge_1')}</span>
            </div>
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.2] md:leading-[1.15] font-extrabold text-gray-900 mb-4 lg:mb-6 tracking-tight max-w-2xl mx-auto lg:mx-0">
              {t('hero.title_1')} <span className="text-primary-800 block mt-1">{t('hero.title_2')}</span>
            </h1>
            <p className="text-gray-500 text-[14px] md:text-lg leading-relaxed font-light mb-8 max-w-lg mx-auto lg:mx-0">
              {t('hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
              {/* Primary Button */}
              <Link href="/laporan" className="flex items-center justify-center px-8 py-3.5 text-xs lg:text-sm font-bold rounded-full transition-all duration-300 w-full sm:w-auto text-center shadow-md hover:-translate-y-0.5 bg-primary-900 hover:bg-primary-950 text-white shadow-primary-900/20 border border-transparent">
                {t('hero.cta_report')}
              </Link>
              {/* Secondary Button */}
              <Link href="/umkm" className="flex items-center justify-center px-8 py-3.5 text-xs lg:text-sm font-bold rounded-full transition-all duration-300 w-full sm:w-auto text-center shadow-sm hover:-translate-y-0.5 bg-white hover:bg-gray-50 text-gray-700 hover:text-primary-900 shadow-black/5 border border-gray-200">
                {t('hero.cta_marketplace')}
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 2. INITIATIVES (Tall Hover Image Cards) */}
      <section className="py-32 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Text Block */}
          <AnimatedSection as="div" animation="fade-from-left" className="lg:col-span-5 lg:pr-8 py-4 flex flex-col h-full lg:min-h-[450px]">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-[50px] font-semibold text-primary-950 leading-[1.1] mb-6 tracking-tight">
                {t('initiatives.title_1')}<br />{t('initiatives.title_2')}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm mb-12 lg:mb-0">
                {t('initiatives.desc')}
              </p>
            </div>
            
            {/* Map illustration to fill empty space */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0 mt-auto opacity-70 mix-blend-multiply pt-8">
              <Image 
                src="/id.svg" 
                alt="Peta Indonesia" 
                width={500}
                height={250}
                className="w-full h-auto drop-shadow-sm"
              />
              {/* Optional aesthetic markers on the map */}
              <div className="absolute top-[55%] left-[32%] w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_15px_rgba(245,158,11,1)] animate-ping mix-blend-normal" />
              <div className="absolute top-[55%] left-[32%] w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_10px_rgba(245,158,11,1)] mix-blend-normal" />
              
              <div className="absolute top-[68%] left-[46%] w-1.5 h-1.5 rounded-full bg-primary-600 shadow-[0_0_10px_rgba(5,150,105,0.8)] animate-pulse mix-blend-normal" style={{ animationDelay: '1s'}} />
              <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse mix-blend-normal" style={{ animationDelay: '2s'}} />
            </div>
          </AnimatedSection>
          
          {/* Right Cards Block (2 Cards) */}
          <AnimatedSection as="div" animation="fade-from-right" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {/* Card 1: Peta */}
            <div className="relative h-[450px] w-full overflow-hidden group rounded-sm shadow-sm cursor-pointer">
              {/* Default Solid Background */}
              <div className="absolute inset-0 bg-[#38605A] transition-opacity duration-700 ease-in-out group-hover:opacity-0 z-10" />
              
              {/* Hover Image Background */}
              <div className="absolute inset-0 z-0 bg-primary-950">
                <Image 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Peta Interaktif Desa" 
                  fill 
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out opacity-80"
                />
                {/* Fixed gradient so text at bottom is always readable when image shows */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />
              </div>

              {/* Content (Always on top) */}
              <div className="relative z-20 h-full p-8 flex flex-col justify-between text-white transition-transform duration-500">
                <span className="text-[11px] font-medium opacity-80 tracking-wide">{t('initiatives.cards.map_tag')}</span>
                <h3 className="text-2xl md:text-[28px] font-medium tracking-wide font-sans leading-snug group-hover:translate-y-[-8px] transition-transform duration-500">
                  {t('initiatives.cards.map_title')}
                </h3>
              </div>
            </div>

            {/* Card 2: Laporan */}
            <div className="relative h-[450px] w-full overflow-hidden group rounded-sm shadow-sm cursor-pointer">
              {/* Default Solid Background */}
              <div className="absolute inset-0 bg-[#2B4A45] transition-opacity duration-700 ease-in-out group-hover:opacity-0 z-10" />
              
              {/* Hover Image Background */}
              <div className="absolute inset-0 z-0 bg-primary-950">
                <Image 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop" 
                  alt="Sistem Laporan Cerdas" 
                  fill 
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out opacity-80"
                />
                {/* Fixed gradient so text at bottom is always readable when image shows */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />
              </div>

              {/* Content (Always on top) */}
              <div className="relative z-20 h-full p-8 flex flex-col justify-between text-white transition-transform duration-500">
                <span className="text-[11px] font-medium opacity-80 tracking-wide">{t('initiatives.cards.reports_tag')}</span>
                <h3 className="text-2xl md:text-[28px] font-medium tracking-wide font-sans leading-snug group-hover:translate-y-[-8px] transition-transform duration-500">
                  {t('initiatives.cards.reports_title')}
                </h3>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. HOW WE TURN VISION INTO ACTION (Soft Cards) */}
      <section className="py-20 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <AnimatedSection as="div" animation="fade-from-left" className="lg:col-span-1 lg:pr-8 flex flex-col justify-start pt-4 mb-8 lg:mb-0">
              <h2 className="text-3xl lg:text-[40px] font-semibold text-primary-800 leading-[1.1] mb-6 tracking-tight">
                {t('vision.title_1')}<br />{t('vision.title_2')}
              </h2>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                {t('vision.desc')}
              </p>
            </AnimatedSection>
            
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
              {/* Card 1 */}
              <AnimatedSection as="div" animation="fade-up" delay={0.1} className="bg-[#F0F2F0] p-8 min-h-[320px] flex flex-col justify-start transition-colors duration-300 group hover:bg-primary-700">
                <MessageSquare className="w-8 h-8 text-primary-950 mb-10 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                <h4 className="font-bold text-primary-950 text-[17px] mb-4 group-hover:text-white transition-colors duration-300 leading-snug">
                  {t('vision.cards.report_title')}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-primary-50 transition-colors duration-300">
                  {t('vision.cards.report_desc')}
                </p>
              </AnimatedSection>
              
              {/* Card 2 */}
              <AnimatedSection as="div" animation="fade-up" delay={0.2} className="bg-[#F0F2F0] p-8 min-h-[320px] flex flex-col justify-start transition-colors duration-300 group hover:bg-primary-700">
                <Bot className="w-8 h-8 text-primary-950 mb-10 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                <h4 className="font-bold text-primary-950 text-[17px] mb-4 group-hover:text-white transition-colors duration-300 leading-snug">
                  {t('vision.cards.ai_title')}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-primary-50 transition-colors duration-300">
                  {t('vision.cards.ai_desc')}
                </p>
              </AnimatedSection>
              
              {/* Card 3 */}
              <AnimatedSection as="div" animation="fade-up" delay={0.3} className="bg-[#F0F2F0] p-8 min-h-[320px] flex flex-col justify-start transition-colors duration-300 group hover:bg-primary-700">
                <ShoppingBag className="w-8 h-8 text-primary-950 mb-10 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                <h4 className="font-bold text-primary-950 text-[17px] mb-4 group-hover:text-white transition-colors duration-300 leading-snug">
                  {t('vision.cards.market_title')}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-primary-50 transition-colors duration-300">
                  {t('vision.cards.market_desc')}
                </p>
              </AnimatedSection>

              {/* Card 4 */}
              <AnimatedSection as="div" animation="fade-up" delay={0.4} className="bg-[#F0F2F0] p-8 min-h-[320px] flex flex-col justify-start transition-colors duration-300 group hover:bg-primary-700">
                <GraduationCap className="w-8 h-8 text-primary-950 mb-10 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                <h4 className="font-bold text-primary-950 text-[17px] mb-4 group-hover:text-white transition-colors duration-300 leading-snug">
                  {t('vision.cards.edu_title')}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-primary-50 transition-colors duration-300">
                  {t('vision.cards.edu_desc')}
                </p>
              </AnimatedSection>

              {/* Card 5 */}
              <AnimatedSection as="div" animation="fade-up" delay={0.5} className="bg-[#F0F2F0] p-8 min-h-[320px] flex flex-col justify-start transition-colors duration-300 group hover:bg-primary-700">
                <Users className="w-8 h-8 text-primary-950 mb-10 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                <h4 className="font-bold text-primary-950 text-[17px] mb-4 group-hover:text-white transition-colors duration-300 leading-snug">
                  {t('vision.cards.forum_title')}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-primary-50 transition-colors duration-300">
                  {t('vision.cards.forum_desc')}
                </p>
              </AnimatedSection>

              {/* Card 6 */}
              <AnimatedSection as="div" animation="fade-up" delay={0.6} className="bg-[#F0F2F0] p-8 min-h-[320px] flex flex-col justify-start transition-colors duration-300 group hover:bg-primary-700">
                <ShieldCheck className="w-8 h-8 text-primary-950 mb-10 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                <h4 className="font-bold text-primary-950 text-[17px] mb-4 group-hover:text-white transition-colors duration-300 leading-snug">
                  {t('vision.cards.security_title')}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-primary-50 transition-colors duration-300">
                  {t('vision.cards.security_desc')}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE DIFFERENCE WE MAKE (Image left, states right) */}
      <section className="py-20 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection as="div" animation="fade-from-left" className="w-full aspect-[16/9] relative bg-gray-200">
            <Image src="/hero-banner.jpg" alt="Dampak Sosial" fill className="object-cover" />
          </AnimatedSection>
          
          <AnimatedSection as="div" animation="fade-from-right">
            <h2 className="text-3xl font-bold text-primary-700 mb-6 tracking-tight">
              {t('difference.title')}
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-16 max-w-md">
              {t('difference.desc')}
            </p>
            
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-primary-950 mb-1">{stats.reports}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('difference.stats.partners')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-950 mb-1">{stats.products}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('difference.stats.villages')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-950 mb-1">{stats.resolved}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('difference.stats.beneficiaries')}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. OUR FLAGSHIP PROGRAM */}
      <section className="py-20 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection as="div" animation="fade-up">
            <h2 className="text-2xl font-bold text-primary-700 mb-3 tracking-tight">{t('flagship.title')}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12">{t('flagship.desc')}</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedSection as="div" animation="fade-up" delay={0.1} className="bg-surface border border-gray-200 p-10 h-64 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden group hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-700 pointer-events-none">
                <Users className="w-48 h-48 text-primary-900" />
              </div>
              <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                <h4 className="font-bold text-primary-950 text-sm mb-4">{t('flagship.cards.gotong_title')}</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed group-hover:text-primary-900 transition-colors">
                  {t('flagship.cards.gotong_desc')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection as="div" animation="fade-up" delay={0.2} className="bg-surface border border-gray-200 p-10 h-64 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden group hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-700 pointer-events-none">
                <ShieldCheck className="w-48 h-48 text-primary-900" />
              </div>
              <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                <h4 className="font-bold text-primary-950 text-sm mb-4">{t('flagship.cards.transparency_title')}</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed group-hover:text-primary-900 transition-colors">
                  {t('flagship.cards.transparency_desc')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection as="div" animation="fade-up" delay={0.3} className="bg-surface border border-gray-200 p-10 h-64 flex flex-col justify-center hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden group hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-700 pointer-events-none">
                <Briefcase className="w-48 h-48 text-primary-900" />
              </div>
              <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                <h4 className="font-bold text-primary-950 text-sm mb-4">{t('flagship.cards.jobs_title')}</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed group-hover:text-primary-900 transition-colors">
                  {t('flagship.cards.jobs_desc')}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 6. LAPORAN TERBARU */}
      <section className="py-24 bg-bg border-t border-gray-200/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection as="div" animation="fade-from-left" className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-bold text-primary-950">{t('impact.title')}</h2>
            <Link href="/laporan" className="text-[10px] font-bold tracking-widest uppercase text-white bg-primary-700 px-6 py-2">
              {t('impact.view_all')}
            </Link>
          </AnimatedSection>

          {latestReports.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">Belum ada laporan.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestReports.map((report, i) => (
                <AnimatedSection as="div" animation="fade-up" delay={i * 0.15} key={report.id}>
                  <ReportCard report={report} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
