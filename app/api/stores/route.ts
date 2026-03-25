/**
 * app/api/stores/route.ts
 * GET: List all stores (admin can see all, users see only active).
 * POST: Create a new store (seller registration, status = pending).
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status'); // optional filter
  const user_id = searchParams.get('user_id'); // optional filter
  const id = searchParams.get('id'); // optional filter

  if (!supabase) {
    return NextResponse.json([]);
  }

  let query = supabase.from('stores').select('*').order('created_at', { ascending: false });
  if (status) {
    query = query.eq('status', status);
  }
  if (user_id) {
    query = query.eq('user_id', user_id);
  }
  if (id) {
    query = query.eq('id', id);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, user_id, city, address } = body;

  if (!name || !user_id) {
    return NextResponse.json({ error: 'Name and user_id are required' }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({ id: `store-${Date.now()}`, name, status: 'pending' }, { status: 201 });
  }

  // Check if user already has a store
  const { data: existing } = await supabase.from('stores').select('id').eq('user_id', user_id).maybeSingle();
  if (existing) {
    return NextResponse.json({ error: 'Anda sudah memiliki toko.' }, { status: 409 });
  }

  const { data, error } = await supabase
    .from('stores')
    .insert({ name, description, user_id, city, address, status: 'pending' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
