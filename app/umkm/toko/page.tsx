'use client';
import { Package, DollarSign, ShoppingBag, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { StatCard } from '@/components/ui/StatCard';
import { StatCardSkeleton } from '@/components/ui/Skeletons';

export default function SellerDashboardHome() {
  const { user } = useUser();
  const [stats, setStats] = useState({
     products: 0, earnings: 0, orders: 0, reviews: 0,
     pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     async function loadStats() {
        if (!user) {
          setLoading(false);
          return;
        }
        try {
          const storeRes = await fetch('/api/stores');
          const stores = await storeRes.json();
          const myStore = Array.isArray(stores) ? stores.find((s: any) => s.user_id === user.id) : null;
          if (myStore) {
             const [prodRes, ordersRes] = await Promise.all([
               fetch(`/api/products?store_id=${myStore.id}`),
               fetch(`/api/orders?store_id=${myStore.id}`)
             ]);
             const prods = await prodRes.json();
             const ordersData = await ordersRes.json();
             const allOrders = Array.isArray(ordersData) ? ordersData : [];
             
             const completedOrders = allOrders.filter((o: any) => o.status === 'selesai');
             const pendingOrders = allOrders.filter((o: any) => ['pending', 'terbayar', 'diproses'].includes(o.status));
             const totalEarnings = completedOrders.reduce((s: number, o: any) => s + Number(o.total_amount || 0), 0);

             setStats({
               products: Array.isArray(prods) ? prods.length : 0,
               earnings: totalEarnings,
               orders: completedOrders.length,
               pendingOrders: pendingOrders.length,
               reviews: 0
             });
          }
        } catch { } finally {
          setLoading(false);
        }
     }
     loadStats();
  }, [user]);

  const mockData = [
     { name: 'Jan', orders: 12 }, { name: 'Feb', orders: 19 },
     { name: 'Mar', orders: 15 }, { name: 'Apr', orders: 25 },
     { name: 'Mei', orders: 22 }, { name: 'Jun', orders: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-primary-900 border-l-4 border-primary-600 pl-4">Dashboard Toko</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-5">
          SELAMAT DATANG, PEMILIK TOKO. BERIKUT RINGKASAN AKTIVITAS.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <>{Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}</>
        ) : (
          <>
            <StatCard icon={Package} label="TOTAL PRODUK" value={stats.products} trend="12%" trendUp />
            <StatCard icon={Clock} label="MENUNGGU" value={stats.pendingOrders} trend="5%" trendUp={false} />
            <StatCard icon={CheckCircle} label="PESANAN SELESAI" value={stats.orders} trend="18%" trendUp />
            <StatCard icon={DollarSign} label="TOTAL PENDAPATAN" value={formatRupiah(stats.earnings)} trend="8%" trendUp accent />
          </>
        )}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
         <div className="bg-white border border-gray-200 overflow-hidden xl:col-span-2">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">TREN PENJUALAN 6 BULAN TERAKHIR</h3>
            </div>
            <div className="p-6 h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                     <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'none' }} />
                     <Area type="monotone" dataKey="orders" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* AI Insights placeholder for Toko matching Admin Theme */}
         <div className="bg-white border border-gray-200 xl:col-span-1 flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
               <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">AI Sales Support</h3>
               </div>
               <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-bold uppercase tracking-widest border border-green-200">
                  LIVE
               </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
               <div className="p-5 border-l-2 border-primary-500 bg-primary-50/50 relative">
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                     Produk UMKM lokal Anda memiliki potensi peningkatan konversi minggu ini (<span className="text-primary-600 font-bold">&uarr; 18%</span>). Tambahkan foto yang lebih menarik untuk mengundang pembeli!
                  </p>
                  <Link href="/umkm/toko/produk" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary-700 mt-4 hover:text-primary-900 transition-colors">
                     KELOLA PRODUK SEKARANG &gt;
                  </Link>
               </div>
            </div>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
         <Link href="/umkm/toko/produk/tambah" className="bg-primary-900 text-white px-6 py-3 rounded-lg text-xs tracking-wider uppercase font-bold hover:bg-primary-950 transition flex items-center gap-2">
           <Package className="w-4 h-4" />
           Tambah Produk
         </Link>
         <Link href="/umkm/toko/pesanan" className="bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-lg text-xs tracking-wider uppercase font-bold hover:bg-gray-50 transition flex items-center gap-2">
           <ShoppingBag className="w-4 h-4" />
           Lihat Pesanan
         </Link>
      </div>
    </div>
  );
}
