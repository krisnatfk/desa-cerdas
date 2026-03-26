'use client';
import { Megaphone, Plus, AlertCircle } from 'lucide-react';

export default function AdminPengumumanPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-primary-900 border-l-4 border-primary-600 pl-4">Manajemen Pengumuman</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-5">Kelola informasi publik digital desa</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-950 transition-colors opacity-50 cursor-not-allowed" title="Mode Demo Lomba">
            <Plus className="w-4 h-4" /> Tambah Pengumuman
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 flex items-start gap-4 mb-8">
        <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-blue-900 mb-1">Mode Statis & Read-Only Aktif</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Halaman Kelola Pengumuman ini berada dalam mode simulasi statis/semi-dinamis untuk keperluan kompetisi UI/UX. Semua tindakan perubahan data backend dinonaktifkan sementara.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-gray-50 border-b border-gray-200">
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Judul Pengumuman</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Kategori</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Tanggal Posting</th>
                 <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Aksi</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Jadwal Vaksinasi & Posyandu Bulan Ini</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-[10px] font-bold bg-green-50 text-green-700 rounded-sm">Kesehatan</span></td>
                  <td className="px-6 py-4 text-xs text-gray-500">Beberapa hari yang lalu</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:text-primary-800" disabled title="Terkunci di mode demo">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Pembagian BLT Dana Desa Tahap III</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-sm">Ekonomi</span></td>
                  <td className="px-6 py-4 text-xs text-gray-500">Bulan lalu</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:text-primary-800" disabled title="Terkunci di mode demo">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Undangan Rapat Akbar Karang Taruna</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-[10px] font-bold bg-purple-50 text-purple-700 rounded-sm">Pemuda</span></td>
                  <td className="px-6 py-4 text-xs text-gray-500">2 Bulan lalu</td>
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
