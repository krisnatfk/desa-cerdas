/**
 * app/api/sos/route.ts
 * POST: Create a new emergency (SOS) alert.
 * Persists to Supabase and falls back to mock response.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyAlerts } from '@/lib/dummy-data';

export async function GET() {
  if (supabase) {
    const { data, error } = await supabase
      .from('emergency_alerts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return NextResponse.json(data);
  }
  return NextResponse.json(dummyAlerts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, description, location, lat, lng, user_id } = body;

  if (!type || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('emergency_alerts')
      .insert({ type, description, location, lat, lng, user_id, status: 'active' })
      .select()
      .single();
    if (!error && data) return NextResponse.json(data, { status: 201 });
  }

  // Mock success response
  return NextResponse.json({
    id: `sos-${Date.now()}`,
    type,
    description,
    location,
    status: 'active',
    created_at: new Date().toISOString(),
  }, { status: 201 });
}
