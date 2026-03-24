/**
 * app/api/reports/[id]/likes/route.ts
 * GET: Get like count + whether current user liked.
 * POST: Toggle like for the current user.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (supabase) {
    const { count } = await supabase
      .from('report_likes')
      .select('*', { count: 'exact', head: true })
      .eq('report_id', id);

    const user = await currentUser();
    let liked = false;

    if (user) {
      const { data } = await supabase
        .from('report_likes')
        .select('id')
        .eq('report_id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      liked = !!data;
    }

    return NextResponse.json({ count: count || 0, liked });
  }

  return NextResponse.json({ count: 0, liked: false });
}

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Anda harus login untuk mendukung laporan' }, { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json({ count: 1, liked: true });
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from('report_likes')
    .select('id')
    .eq('report_id', id)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    // Unlike
    await supabase.from('report_likes').delete().eq('id', existing.id);
  } else {
    // Like
    await supabase.from('report_likes').insert({
      report_id: id,
      user_id: user.id,
    } as any);
  }

  // Return updated count
  const { count } = await supabase
    .from('report_likes')
    .select('*', { count: 'exact', head: true })
    .eq('report_id', id);

  return NextResponse.json({ count: count || 0, liked: !existing });
}
