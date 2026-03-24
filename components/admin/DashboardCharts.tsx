'use client';
/**
 * components/admin/DashboardCharts.tsx
 * Client component for Recharts visualizations — prevents SSR issues.
 */
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { dummyCategoryData, dummyTrendData } from '@/lib/dummy-data';

export function CategoryBarChart() {
  return (
    <div className="bg-white p-6 border border-gray-200">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Laporan per Kategori</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={dummyCategoryData} barSize={36}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{ borderRadius: 0, border: '1px solid #e5e7eb', fontSize: 12 }}
            cursor={{ fill: '#f0fdf4' }}
          />
          <Bar dataKey="count" name="Jumlah" fill="#133D3A" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendLineChart() {
  return (
    <div className="bg-white p-6 border border-gray-200">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Tren Laporan 6 Bulan Terakhir</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={dummyTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{ borderRadius: 0, border: '1px solid #e5e7eb', fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="laporan"
            name="Total Laporan"
            stroke="#133D3A"
            strokeWidth={2.5}
            dot={{ fill: '#133D3A', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="selesai"
            name="Terselesaikan"
            stroke="#FBC02D"
            strokeWidth={2.5}
            dot={{ fill: '#FBC02D', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
