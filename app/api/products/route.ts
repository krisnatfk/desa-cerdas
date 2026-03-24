/**
 * app/api/products/route.ts
 * GET: List all UMKM products. POST: Create a new product (admin).
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dummyProducts } from '@/lib/dummy-data';

export async function GET() {
  if (supabase) {
    const { data, error } = await supabase.from('products').select('*').order('id');
    if (!error && data) return NextResponse.json(data);
  }
  return NextResponse.json(dummyProducts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, price, phone_number, image_url, user_id } = body;

  if (!name || !price || !phone_number) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('products')
      .insert({ name, description, price, phone_number, image_url, user_id })
      .select()
      .single();
    if (error) {
      console.error('[API] Error inserting product:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (data) return NextResponse.json(data, { status: 201 });
  }

  return NextResponse.json({ id: `product-${Date.now()}`, name, price, phone_number }, { status: 201 });
}
