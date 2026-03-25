import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ reports: 0, products: 0, resolved: 0 });
    }

    // 1. Total Reports
    const { count: reportsCount } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true });

    // 2. Total Products
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // 3. Resolved Issues (Reports 'completed')
    const { count: resolvedCount } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    return NextResponse.json({
      reports: reportsCount || 0,
      products: productsCount || 0,
      resolved: resolvedCount || 0
    });
  } catch (error) {
    console.error('[API_STATS_GET]', error);
    return NextResponse.json({ reports: 0, products: 0, resolved: 0 }, { status: 500 });
  }
}
