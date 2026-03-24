/**
 * app/api/settings/route.ts
 * GET  — Fetch the singleton app_settings row.
 * POST — Upsert the singleton app_settings row (admin only).
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }
  const { data, error } = await sb
    .from('app_settings')
    .select('*')
    .limit(1)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }
  const body = await req.json();

  const payload = {
    village_name:      body.village_name,
    district_name:     body.district_name,
    city_name:         body.city_name,
    province_name:     body.province_name,
    center_lat:        body.center_lat,
    center_lng:        body.center_lng,
    boundary_geojson:  body.boundary_geojson ?? null,
    fallback_radius_m: body.fallback_radius_m ?? 2500,
    updated_at:        new Date().toISOString(),
  };

  // 1. Check if a settings row already exists
  const { data: existing } = await sb
    .from('app_settings')
    .select('id')
    .limit(1)
    .single();

  let data, error;

  if (existing?.id) {
    // 2a. UPDATE existing row
    ({ data, error } = await sb
      .from('app_settings')
      .update(payload)
      .eq('id', existing.id)
      .select()
      .single());
  } else {
    // 2b. INSERT new row (first-time setup)
    ({ data, error } = await sb
      .from('app_settings')
      .insert(payload)
      .select()
      .single());
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
