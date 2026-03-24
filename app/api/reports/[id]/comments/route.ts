/**
 * app/api/reports/[id]/comments/route.ts
 * GET: List comments for a report. POST: Add a new comment.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (supabase) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('report_id', id)
      .order('created_at', { ascending: true });

    if (!error && data) {
      return NextResponse.json(data);
    }
  }

  return NextResponse.json([]);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { content } = await req.json();

  if (!content || !content.trim()) {
    return NextResponse.json({ error: 'Komentar tidak boleh kosong' }, { status: 400 });
  }

  const user = await currentUser();
  const user_id = user?.id || 'anon';
  let author_name = 'Warga Anonim';
  if (user) {
    author_name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    if (!author_name) author_name = user.username || 'Warga';
  }

  if (supabase) {
    const { data, error } = await supabase.from('comments').insert({
      report_id: id,
      user_id,
      author_name,
      content: content.trim(),
    } as any).select().single();

    if (error) {
      console.error('[API] Error inserting comment:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  }

  // Fallback mock
  return NextResponse.json({
    id: `comment-${Date.now()}`,
    report_id: id,
    user_id,
    author_name,
    content: content.trim(),
    created_at: new Date().toISOString(),
  }, { status: 201 });
}
