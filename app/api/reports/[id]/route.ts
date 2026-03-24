/**
 * app/api/reports/[id]/route.ts
 * GET: Single report details. PATCH: Update report status (admin).
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyReports } from '@/lib/dummy-data';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (supabase) {
    const { data, error } = await supabase.from('reports').select('*').eq('id', id).single();
    if (!error && data) return NextResponse.json(data);
  }

  const report = dummyReports.find((r) => r.id === id);
  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(report);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { status } = body;

  const VALID_STATUSES = ['pending', 'in_progress', 'completed'];
  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('reports')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (!error && data) return NextResponse.json(data);
  }

  // Fallback: return success mock
  return NextResponse.json({ id, status, updated_at: new Date().toISOString() });
}
