/**
 * app/api/stores/[id]/route.ts
 * PATCH: Update store (admin approval/rejection or seller edit).
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  if (!supabase) {
    return NextResponse.json({ id, ...body });
  }

  const { data, error } = await supabase
    .from('stores')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
