'use client';

/**
 * app/admin/layout.tsx
 * Admin sidebar layout — wraps all /admin pages.
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import {
  LayoutDashboard,
  FileText,
  Store,
  MapPin,
  Settings,
  Map,
  LogOut,
  Sparkles,
  Landmark,
  Briefcase,
  GraduationCap,
  Users,
  BookOpen,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin_layout');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMapSection = pathname.startsWith('/peta') || pathname.startsWith('/admin/pengaturan-peta');
  const isUmkmSection = pathname.startsWith('/admin/umkm');
  const [mapOpen, setMapOpen] = useState(isMapSection);
  const [umkmOpen, setUmkmOpen] = useState(isUmkmSection);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Keep map group open when navigating within it
  useEffect(() => {
    if (isMapSection) setMapOpen(true);
    if (isUmkmSection) setUmkmOpen(true);
  }, [isMapSection, isUmkmSection]);

  const navItems = [
    { href: '/admin', label: t('nav_dashboard'), icon: LayoutDashboard, exact: true },
    { href: '/admin/laporan', label: t('nav_laporan'), icon: FileText },
    { href: '/admin/transparansi', label: t('nav_transparansi'), icon: Landmark },
    { href: '/admin/lowongan', label: t('nav_lowongan'), icon: Briefcase },
    { href: '/admin/edukasi', label: t('nav_edukasi'), icon: GraduationCap },
    { href: '/admin/gotong-royong', label: t('nav_gotong_royong'), icon: Users },
    { href: '/admin/komunitas', label: t('nav_komunitas'), icon: BookOpen },
  ];

  const umkmSubItems = [
    { href: '/admin/umkm', label: 'Produk UMKM', icon: Store },
    { href: '/admin/umkm/toko', label: 'Manajemen Toko', icon: Settings },
  ];

  const mapSubItems = [
    { href: '/peta', label: t('nav_peta'), icon: MapPin },
    { href: '/admin/pengaturan-peta', label: 'Pengaturan Peta', icon: Settings },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="px-6 py-6 border-b border-gray-200 flex flex-col gap-2 shrink-0">
        <Link href="/">
          <Image src="/logo.webp" alt="DesaMind" width={140} height={36} className="h-8 w-auto object-contain mb-2" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 border border-primary-200 bg-primary-50 text-primary-800">
            <Sparkles className="w-3 h-3" />
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{t('admin_panel')}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all',
                active
                  ? 'text-primary-950 bg-gray-50 border border-gray-200'
                  : 'text-gray-500 hover:text-primary-800 hover:bg-gray-50 border border-transparent'
              )}
            >
              <item.icon className={cn('w-4 h-4 shrink-0', active ? 'text-primary-800' : 'text-gray-400')} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* UMKM Group (Collapsible) */}
        <div>
          <button
            onClick={() => setUmkmOpen(o => !o)}
            className={cn(
              'w-full flex items-center gap-4 px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all',
              isUmkmSection
                ? 'text-primary-950 bg-gray-50 border border-gray-200'
                : 'text-gray-500 hover:text-primary-800 hover:bg-gray-50 border border-transparent'
            )}
          >
            <Store className={cn('w-4 h-4 shrink-0', isUmkmSection ? 'text-primary-800' : 'text-gray-400')} />
            <span className="flex-1 text-left">{t('nav_umkm')}</span>
            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', umkmOpen ? 'rotate-180' : '')} />
          </button>

          <div className={cn('overflow-hidden transition-all duration-200', umkmOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0')}>
            {umkmSubItems.map((sub) => {
              const subActive = pathname === sub.href || (sub.href !== '/admin/umkm' && pathname.startsWith(sub.href));
              const exactActive = sub.href === '/admin/umkm' ? pathname === '/admin/umkm' : subActive;
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={cn(
                    'flex items-center gap-4 pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all',
                    exactActive
                      ? 'text-primary-950 bg-primary-50/50 border-l-2 border-primary-600'
                      : 'text-gray-400 hover:text-primary-800 hover:bg-gray-50 border-l-2 border-transparent'
                  )}
                >
                  <sub.icon className={cn('w-3.5 h-3.5 shrink-0', exactActive ? 'text-primary-800' : 'text-gray-400')} />
                  <span>{sub.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Peta Group (Collapsible) */}
        <div>
          <button
            onClick={() => setMapOpen(o => !o)}
            className={cn(
              'w-full flex items-center gap-4 px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all',
              isMapSection
                ? 'text-primary-950 bg-gray-50 border border-gray-200'
                : 'text-gray-500 hover:text-primary-800 hover:bg-gray-50 border border-transparent'
            )}
          >
            <Map className={cn('w-4 h-4 shrink-0', isMapSection ? 'text-primary-800' : 'text-gray-400')} />
            <span className="flex-1 text-left">Peta</span>
            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', mapOpen ? 'rotate-180' : '')} />
          </button>

          <div className={cn('overflow-hidden transition-all duration-200', mapOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0')}>
            {mapSubItems.map((sub) => {
              const subActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={cn(
                    'flex items-center gap-4 pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all',
                    subActive
                      ? 'text-primary-950 bg-primary-50/50 border-l-2 border-primary-600'
                      : 'text-gray-400 hover:text-primary-800 hover:bg-gray-50 border-l-2 border-transparent'
                  )}
                >
                  <sub.icon className={cn('w-3.5 h-3.5 shrink-0', subActive ? 'text-primary-800' : 'text-gray-400')} />
                  <span>{sub.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="px-4 py-6 border-t border-gray-100 space-y-2 bg-gray-50/30 shrink-0">
        <Link href="/admin/pengaturan" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all border border-transparent">
          <Settings className="w-4.5 h-4.5 text-gray-400" />
          {t('settings')}
        </Link>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">
          <LogOut className="w-4.5 h-4.5 text-red-500" />
          {t('logout')}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-0 h-screen">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 max-w-[80%] h-full flex flex-col shadow-2xl transition-transform animate-in slide-in-from-left">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-50 rounded-lg hover:bg-gray-100/50"
            >
              <X className="w-5 h-5" />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile & Desktop Header with Profile */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-8 py-3 shrink-0 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden">
              <Image src="/logo.webp" alt="DesaMind" width={110} height={28} className="h-6 w-auto object-contain" />
            </div>
            {/* Desktop breadcrumb/title */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-primary-50 rounded-full border border-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary-700">Administrator</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-gray-800">Admin DesaMind</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600">Super Admin</span>
             </div>
             <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
