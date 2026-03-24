/**
 * app/api/dashboard/stats/route.ts
 * GET: Aggregated statistics for the admin dashboard.
 * Returns real data from Supabase or dummy stats.
 */
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyStats, dummyCategoryData, dummyTrendData } from '@/lib/dummy-data';

export async function GET() {
  if (supabase) {
    try {
      // Fetch report counts grouped by status and category
      const [{ count: total }, { count: pending }, { count: completed }, { data: products }] = await Promise.all([
        supabase.from('reports').select('*', { count: 'exact', head: true }),
        supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('products').select('id'),
      ]);

      const totalCount = total ?? 0;
      const pendingCount = pending ?? 0;
      const completedCount = completed ?? 0;

      return NextResponse.json({
        totalReports: totalCount,
        pendingReports: pendingCount,
        completedReports: completedCount,
        resolutionRate: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
        activeUMKM: products?.length ?? 0,
        categoryData: dummyCategoryData,  // TODO: aggregate from real data
        trendData: dummyTrendData,        // TODO: aggregate from real data
      });
    } catch {
      // Fallthrough to dummy
    }
  }

  // Fallback to dummy stats
  return NextResponse.json({
    ...dummyStats,
    categoryData: dummyCategoryData,
    trendData: dummyTrendData,
  });
}
