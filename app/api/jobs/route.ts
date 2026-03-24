/**
 * app/api/jobs/route.ts
 * GET: List local job postings. POST: Create a job posting.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyJobs } from '@/lib/dummy-data';

export async function GET() {
  if (supabase) {
    const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
    if (!error && data) return NextResponse.json(data);
  }
  return NextResponse.json(dummyJobs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, company, location, type, phone_number, deadline, category } = body;
  if (!title || !phone_number) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  if (supabase) {
    const { data, error } = await supabase.from('jobs').insert({ title, description, company, location, type, phone_number, deadline, category }).select().single();
    if (error) {
      console.error('[API] Error inserting job:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (data) return NextResponse.json(data, { status: 201 });
  }

  return NextResponse.json({ id: `job-${Date.now()}`, title, company, created_at: new Date().toISOString() }, { status: 201 });
}
