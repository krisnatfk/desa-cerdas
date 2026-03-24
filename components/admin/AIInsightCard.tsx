/**
 * components/admin/AIInsightCard.tsx
 * Displays AI-generated insights for the admin dashboard.
 */
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';

const insights = [
  {
    type: 'warning',
    icon: TrendingUp,
    message: 'Laporan jalan rusak di RT 02 meningkat tajam minggu ini (↑ 180%). Prioritaskan perbaikan segera.',
    action: 'Lihat Laporan RT 02',
  },
  {
    type: 'alert',
    icon: AlertTriangle,
    message: 'Terdapat 3 laporan sampah yang sudah melewati 14 hari tanpa penanganan di RW 05.',
    action: 'Tangani Sekarang',
  },
  {
    type: 'success',
    icon: CheckCircle,
    message: 'Tingkat penyelesaian laporan minggu ini meningkat 12% dibanding minggu lalu. Pertahankan!',
    action: 'Lihat Detail',
  },
];

const typeStyles = {
  warning: 'border-l-4 border-l-amber-500 bg-amber-50 border-y border-r border-gray-200 text-amber-900',
  alert: 'border-l-4 border-l-red-500 bg-red-50 border-y border-r border-gray-200 text-red-900',
  success: 'border-l-4 border-l-green-500 bg-green-50 border-y border-r border-gray-200 text-green-900',
};

export function AIInsightCard() {
  return (
    <div className="bg-white p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 border border-primary-200 bg-primary-50 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-800" />
        </div>
        <div>
          <h3 className="font-semibold text-primary-950 text-sm">AI Decision Support</h3>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Insight berbasis analisis</p>
        </div>
        <span className="ml-auto text-[9px] font-bold uppercase tracking-widest px-3 py-1 border border-green-200 bg-green-50 text-green-700">
          Live
        </span>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className={`p-4 ${typeStyles[insight.type as keyof typeof typeStyles]}`}>
            <div className="flex gap-3">
              <insight.icon className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs leading-relaxed font-medium">{insight.message}</p>
                <button className="mt-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity">
                  {insight.action} <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-6 pt-4 border-t border-gray-100 text-center">
        Diperbarui otomatis · Model: DesaMind v1
      </p>
    </div>
  );
}
