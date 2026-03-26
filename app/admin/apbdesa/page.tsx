'use client';
import { PieChart, Plus, AlertCircle } from 'lucide-react';

export default function AdminAPBDesaPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-primary-900 border-l-4 border-primary-600 pl-4">Master Data APBDesa</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-5">Konfigurasi alokasi & realisasi dana desa</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors opacity-50 cursor-not-allowed" title="Mode Demo Lomba">
            <Plus className="w-4 h-4" /> Entri Laporan Baru
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 flex items-start gap-4 mb-8">
        <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-blue-900 mb-1">Mode Statis & Read-Only Aktif</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Halaman pengaturan APBDesa ini berada dalam mode simulasi. Chart dan data APBDesa akan dirender statis di UI publik untuk keperluan penjurian kompetisi.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
         <div className="p-8 pb-4">
            <h3 className="text-sm font-semibold text-gray-900">Rekapitulasi Anggaran Tahun Berjalan</h3>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-gray-50 border-b border-gray-200 border-t border-gray-100">
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Bidang Alokasi</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Pagu Anggaran</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Realisasi (%)</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Aksi</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Pembangunan Infrastruktur</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">Rp 450.000.000</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 flex overflow-hidden">
                       <div className="bg-primary-600 h-full w-[80%] rounded-full"></div>
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1 block">80% Terserap</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:text-primary-800" disabled title="Terkunci di mode demo">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Pemberdayaan Masyarakat</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">Rp 200.000.000</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 flex overflow-hidden">
                       <div className="bg-primary-600 h-full w-[45%] rounded-full"></div>
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1 block">45% Terserap</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:text-primary-800" disabled title="Terkunci di mode demo">Edit</button>
                  </td>
                </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
