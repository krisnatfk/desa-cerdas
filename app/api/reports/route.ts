/**
 * app/api/reports/route.ts
 * GET: List all reports. POST: Create a new report with AI classification.
 * Falls back to dummy data if Supabase is not connected.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyReports } from '@/lib/dummy-data';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
  // If Supabase is configured, use real data
  if (supabase) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Enrich each report with like_count and comment_count
      const enriched = await Promise.all(
        data.map(async (report: any) => {
          const [likesRes, commentsRes] = await Promise.all([
            supabase!.from('report_likes').select('*', { count: 'exact', head: true }).eq('report_id', report.id),
            supabase!.from('comments').select('*', { count: 'exact', head: true }).eq('report_id', report.id),
          ]);
          return {
            ...report,
            upvotes: likesRes.count ?? 0,
            comments_count: commentsRes.count ?? 0,
          };
        })
      );
      return NextResponse.json(enriched);
    }
  }

  // Fallback to dummy data
  return NextResponse.json(dummyReports);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, category, lat, lng, image_url } = body;

  const user = await currentUser();
  const user_id = user?.id || 'anon-user-id';
  let author_name = 'Warga Anonim';
  
  if (user) {
    author_name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    if (!author_name) author_name = user.username || 'Warga';
  }

  if (!title || !description || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // If Supabase is configured, insert into DB
  if (supabase) {
    const { data, error } = await supabase.from('reports').insert({
      title,
      description,
      category,
      lat,
      lng,
      image_url: image_url ?? null,
      user_id,
      author_name,
      status: 'pending',
    }).select().single();

    if (error) {
      console.error('[API] Error inserting report:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data) {
      return NextResponse.json(data, { status: 201 });
    }
  }

  // Fallback: return a mock created report if Supabase is entirely missing (not failed)
  const mockReport = {
    id: `report-${Date.now()}`,
    title,
    description,
    category,
    lat,
    lng,
    image_url,
    status: 'pending',
    created_at: new Date().toISOString(),
  };
  return NextResponse.json(mockReport, { status: 201 });
}
