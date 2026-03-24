/**
 * app/api/projects/route.ts
 * GET: List government projects. POST: Create a project (admin).
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyProjects } from '@/lib/dummy-data';

export async function GET() {
  if (supabase) {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error && data) return NextResponse.json(data);
  }
  return NextResponse.json(dummyProjects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, budget, category, start_date, end_date, contractor } = body;
  if (!title || !budget) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  if (supabase) {
    const { data, error } = await supabase.from('projects').insert({ title, description, budget, spent: 0, progress: 0, status: 'planning', category, start_date, end_date, contractor }).select().single();
    if (error) {
      console.error('[API] Error inserting project:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (data) return NextResponse.json(data, { status: 201 });
  }

  return NextResponse.json({ id: `proj-${Date.now()}`, title, budget, progress: 0, status: 'planning' }, { status: 201 });
}
