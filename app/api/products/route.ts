/**
 * app/api/products/route.ts
 * GET: List all UMKM products. POST: Create. PUT: Update. DELETE: Remove.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyProducts } from '@/lib/dummy-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const store_id = searchParams.get('store_id');

  if (supabase) {
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });
    if (store_id) {
      query = query.eq('store_id', store_id);
    }
    const { data, error } = await query;
    if (!error && data) return NextResponse.json(data);
  }
  return NextResponse.json(dummyProducts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, price, phone_number, image_url, user_id, category, seller_name, store_id, stock } = body;

  if (!name || !price) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('products')
      .insert({ name, description, price, phone_number, image_url, user_id, category, seller_name, store_id, stock })
      .select()
      .single();
    if (error) {
      console.error('[API] Error inserting product:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (data) return NextResponse.json(data, { status: 201 });
  }

  return NextResponse.json({ id: `product-${Date.now()}`, name, price }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
  if (!supabase) return NextResponse.json({ id, ...updates });

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
  if (!supabase) return NextResponse.json({ deleted: true });

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}

