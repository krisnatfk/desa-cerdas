'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Store, LayoutDashboard, Package, PlusSquare, ShoppingBag,
  LogOut, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';


export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Demo store always active
  const store = {
    name: 'Toko Demo DesaMind',
    status: 'active',
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto text-center bg-white border border-gray-200 p-10 mt-10 shadow-sm">
          <Store className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-primary-900 mb-3">Login Diperlukan</h1>
          <p className="text-sm text-gray-500 mb-6">Silakan login untuk mengakses dashboard toko.</p>
          <Link href="/auth/login" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }



  // Active Store Dashboard Layout
  const navItems = [
    { label: 'Dashboard', href: '/umkm/toko', icon: LayoutDashboard },
    { label: 'Tambah Produk', href: '/umkm/toko/produk/tambah', icon: PlusSquare },
    { label: 'Kelola Produk', href: '/umkm/toko/produk', icon: Package },
    { label: 'Pesanan', href: '/umkm/toko/pesanan', icon: ShoppingBag },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="px-6 py-6 border-b border-gray-200 flex flex-col gap-2 shrink-0">
        <Link href="/umkm">
          <Image src="/logo.webp" alt="DesaMind" width={140} height={36} className="h-8 w-auto object-contain mb-2" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 border border-primary-200 bg-primary-50 text-primary-800">
            <Store className="w-3 h-3" />
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">DASHBOARD TOKO</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/umkm/toko' ? pathname === '/umkm/toko' : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                'flex items-center gap-4 px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all',
                isActive
                  ? 'text-primary-950 bg-gray-50 border border-gray-200'
                  : 'text-gray-500 hover:text-primary-800 hover:bg-gray-50 border border-transparent'
              )}
            >
              <item.icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary-800' : 'text-gray-400')} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-6 border-t border-gray-100 space-y-2 bg-gray-50/30 shrink-0">
        <Link href="/umkm" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">
          <LogOut className="w-4 h-4 text-red-500 shrink-0" />
          Keluar Ke UMKM
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
      <div className={cn('fixed inset-0 z-50 md:hidden flex transition-opacity duration-300', mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
         <div className={cn('relative w-64 max-w-[80%] h-full flex flex-col shadow-2xl transition-transform duration-300 bg-white', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-50 rounded-lg hover:bg-gray-100/50">
               <X className="w-5 h-5" />
            </button>
            {SidebarContent}
         </div>
      </div>

      {/* Main Content */}
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
              <Store className="w-3 h-3 text-primary-600" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary-700">{store?.name || 'Toko UMKM'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-gray-800">{user?.name || 'Demo User'}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600">Pemilik Toko</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-white shadow-sm">
               {user?.avatar || 'DU'}
             </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
