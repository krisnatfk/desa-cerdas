'use client';
/**
 * components/layout/Navbar.tsx
 * Modern sticky navbar with animated dropdown mega-menu.
 * Fully responsive: desktop mega-menu + mobile slide-in drawer.
 */
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MapPin, LayoutDashboard,  MessageSquare, Bot, ShoppingBag,
  GraduationCap, Users, ShieldCheck,
  TrendingUp, Map, Briefcase, Activity, Plus, Menu, X, ChevronDown, ShieldAlert, LogIn, Instagram, Linkedin, Zap, Landmark, Newspaper
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { setLocaleCookie } from '@/app/actions/locale';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// ── Nav structure ──────────────────────────────────────────────
type NavItem = {
  label: string;
  href?: string;
  children?: { href: string; icon: any; label: string; desc: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'home', href: '/' },
  { label: 'report', href: '/laporan' },
  { label: 'map', href: '/peta' },
  { label: 'marketplace', href: '/umkm' },
  {
    label: 'services',
    children: [
      { href: '/gotong-royong', icon: Users, label: 'gotong_royong', desc: 'gotong_royong_desc' },
      { href: '/asisten', icon: Bot, label: 'assistant', desc: 'assistant_desc' },
      { href: '/skor-desa', icon: Activity, label: 'score', desc: 'score_desc' },
      { href: '/prediksi', icon: Zap, label: 'predictions', desc: 'predictions_desc' },
    ],
  },
  {
    label: 'info',
    children: [
      { href: '/transparansi', icon: Landmark, label: 'transparency', desc: 'transparency_desc' },
      { href: '/lowongan', icon: Briefcase, label: 'jobs', desc: 'jobs_desc' },
      { href: '/edukasi', icon: GraduationCap, label: 'education', desc: 'education_desc' },
      { href: '/komunitas', icon: Newspaper, label: 'community', desc: 'community_desc' },
    ],
  },
];

// ── Language Switcher Component ────────────────────────────────
function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleSwitch = async (newLocale: string) => {
    if (newLocale === locale) return;
    await setLocaleCookie(newLocale);
    router.refresh();
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-2 border border-gray-200">
      <button 
        onClick={() => handleSwitch('id')} 
        className={cn("px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-md transition-all", locale === 'id' ? "bg-white shadow-sm text-primary-900 border border-gray-100" : "text-gray-400 hover:text-gray-600")}
      >
        ID
      </button>
      <button 
        onClick={() => handleSwitch('en')} 
        className={cn("px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-md transition-all", locale === 'en' ? "bg-white shadow-sm text-primary-900 border border-gray-100" : "text-gray-400 hover:text-gray-600")}
      >
        EN
      </button>
    </div>
  );
}

// ── Dropdown & Link component ──────────────────────────────────
function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const t = useTranslations('navbar');

  const getNavStyle = (active: boolean) => cn(
    'group/nav relative flex items-center gap-1.5 h-full text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer',
    active ? 'text-primary-900' : 'text-gray-500 hover:text-primary-900'
  );

  const getUnderlineStyle = (active: boolean) => cn(
    'absolute bottom-6 left-0 h-[2px] bg-primary-900 transition-all duration-300 ease-out',
    active ? 'w-full' : 'w-0 group-hover/nav:w-full'
  );

  if (item.href) {
    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
    return (
      <Link href={item.href} className={getNavStyle(isActive)}>
        {t(item.label as any)}
        <div className={getUnderlineStyle(isActive)} />
      </Link>
    );
  }

  const isActive = item.children?.some((c) => pathname.startsWith(c.href)) ?? false;

  return (
    <div className="relative group/nav h-full flex items-center">
      <div className={getNavStyle(isActive)}>
        {t(item.label as any)}
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/nav:rotate-180" />
        <div className={getUnderlineStyle(isActive)} />
      </div>

      {item.children && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50">
          <div className="w-64 bg-primary-800 shadow-xl border border-primary-700 py-3">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="relative flex items-start px-6 py-3.5 transition-all duration-300 group/link hover:bg-primary-700"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-400 scale-y-0 group-hover/link:scale-y-100 transition-transform origin-center" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1.5 group-hover/link:translate-x-1 transition-transform">{t(child.label as any)}</p>
                  <p className="text-[10px] leading-relaxed text-primary-100/70 group-hover/link:translate-x-1 transition-transform">{t(child.desc as any)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────────────
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const t = useTranslations('navbar');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'top-0 sm:top-4 mx-0 sm:mx-4 bg-white shadow-md sm:shadow-xl border-b sm:border border-gray-200'
            : 'top-0 bg-white border-b border-gray-100'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo area - fixed width to balance right side */}
          <div className="flex items-center shrink-0 w-[240px]">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.webp" 
                alt="DesaMind Logo" 
                width={180} 
                height={48} 
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop nav - centered */}
          <nav className="hidden lg:flex items-center justify-center gap-8 flex-1 h-full">
            {NAV_ITEMS.map((item) => <NavItemComponent key={item.label} item={item} />)}
          </nav>

          {/* Desktop actions - fixed width matching left */}
          <div className="hidden lg:flex items-center justify-end gap-5 w-[320px]">
            <LanguageSwitcher />

            {/* Minimal Lapor */}
            <Link
              href="/laporan/baru"
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-primary-900 hover:text-primary-600 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('create_report')}</span>
            </Link>

            <div className="w-px h-3 bg-gray-300 hidden xl:block" />

            {!isSignedIn ? (
              <Link href="/auth/login">
                <button className="text-[11px] font-bold tracking-widest uppercase text-gray-400 hover:text-primary-900 transition-colors">
                  {t('login')}
                </button>
              </Link>
            ) : (
              <UserButton>
                <UserButton.MenuItems>
                  {user?.publicMetadata?.isAdmin === true && (
                    <UserButton.Link
                      href="/admin"
                      label={t('admin')}
                      labelIcon={<LayoutDashboard className="w-4 h-4" />}
                    />
                  )}
                </UserButton.MenuItems>
              </UserButton>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition ml-auto"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer panel */}
      <div
        className={cn(
          'fixed inset-0 z-50 w-full bg-white lg:hidden flex flex-col transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100">
          <Image src="/logo.webp" alt="DesaMind" width={140} height={36} className="h-8 w-auto object-contain" />
          <div className="flex items-center justify-end gap-4">
             <LanguageSwitcher />
             <button onClick={() => setMobileOpen(false)} className="text-gray-800 hover:text-red-600 transition-colors">
                <X className="w-7 h-7" strokeWidth={1} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-8 px-6 pb-20 flex flex-col">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((group) => (
              <div key={group.label} className="border-b border-gray-100 pb-2 mb-2">
                {group.href ? (
                  <Link
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center py-4 text-[13px] font-bold tracking-widest uppercase text-gray-800 hover:text-primary-700 transition-colors"
                  >
                    {t(group.label as any)}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileOpenGroup(mobileOpenGroup === group.label ? null : group.label)}
                      className="w-full flex items-center justify-between py-4 text-[13px] font-bold tracking-widest uppercase text-gray-800 hover:text-primary-700 transition-colors"
                    >
                      <span>{t(group.label as any)}</span>
                      {mobileOpenGroup === group.label ? (
                        <X className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                      ) : (
                        <Plus className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                      )}
                    </button>
                    {mobileOpenGroup === group.label && group.children && (
                      <div className="flex flex-col gap-5 pt-2 pb-6 pl-4">
                        {group.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-[13px] text-gray-600 hover:text-primary-700 font-medium tracking-wide"
                          >
                            {t(child.label as any)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            
            {/* Lapor as normal menu link */}
            <div className="border-b border-gray-100 pb-2 mb-2">
              <Link href="/laporan/baru" onClick={() => setMobileOpen(false)} className="flex items-center py-4 text-[13px] font-bold tracking-widest uppercase text-gray-800 hover:text-primary-700 transition-colors">
                {t('create_report')}
              </Link>
            </div>

            {/* Masuk as normal menu link */}
            {!isSignedIn ? (
              <div className="border-b border-gray-100 pb-2 mb-2">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex items-center py-4 text-[13px] font-bold tracking-widest uppercase text-gray-800 hover:text-primary-700 transition-colors">
                  {t('login')}
                </Link>
              </div>
            ) : (
              <div className="py-6 flex items-center gap-3">
                <UserButton />
                <span className="text-[13px] font-bold tracking-widest uppercase text-gray-800">Akun Saya</span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-10 flex flex-col gap-4">
            <Image src="/logo.webp" alt="DesaMind" width={100} height={24} className="h-6 w-auto object-contain opacity-50 grayscale" />
            <div className="flex items-center gap-5 text-gray-400">
              <Instagram className="w-5 h-5 hover:text-primary-600 transition-colors" strokeWidth={1.5} />
              <Linkedin className="w-5 h-5 hover:text-primary-600 transition-colors" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-2">© 2026 DesaMind</p>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  );
}
