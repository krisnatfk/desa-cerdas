/**
 * app/api/actions/route.ts
 * GET: List community actions. POST: Create a new action.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyActions } from '@/lib/dummy-data';

export async function GET() {
  if (supabase) {
    const { data, error } = await supabase.from('community_actions').select('*').order('date');
    if (!error && data) return NextResponse.json(data);
  }
  return NextResponse.json(dummyActions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, category, location, date, time, max_participants } = body;
  if (!title || !date) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  if (supabase) {
    const { data, error } = await supabase.from('community_actions').insert({ title, description, category, location, date, time, max_participants, current_participants: 0 }).select().single();
    if (error) {
      console.error('[API] Error inserting action:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (data) return NextResponse.json(data, { status: 201 });
  }

  return NextResponse.json({ id: `act-${Date.now()}`, title, status: 'open', created_at: new Date().toISOString() }, { status: 201 });
}
