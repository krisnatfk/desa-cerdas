'use client';
import { Camera, Plus, AlertCircle } from 'lucide-react';

export default function AdminGaleriPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-primary-900 border-l-4 border-primary-600 pl-4">Galeri Kegiatan</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-5">Manajemen dokumentasi foto desa</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors opacity-50 cursor-not-allowed" title="Mode Demo Lomba">
            <Plus className="w-4 h-4" /> Unggah Foto Baru
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 flex items-start gap-4 mb-8">
        <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-blue-900 mb-1">Mode Statis & Read-Only Aktif</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Halaman Kelola Galeri ini berada dalam mode simulasi statis/semi-dinamis untuk keperluan kompetisi UI/UX. Semua tindakan perubahan data backend dinonaktifkan sementara.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
         <div className="p-8 pb-4">
            <h3 className="text-sm font-semibold text-gray-900">Daftar Album Foto</h3>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-gray-50 border-b border-gray-200 border-t border-gray-100">
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Nama Kegiatan</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Jumlah Foto</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Tanggal Diunggah</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Aksi</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Festival Budaya Desa 2026</td>
                  <td className="px-6 py-4 text-sm text-gray-600">12 Foto</td>
                  <td className="px-6 py-4 text-xs text-gray-500">Minggu lalu</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:text-primary-800" disabled title="Terkunci di mode demo">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Musyawarah Perencanaan Pembangunan (Musrenbang)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">8 Foto</td>
                  <td className="px-6 py-4 text-xs text-gray-500">Bulan lalu</td>
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
