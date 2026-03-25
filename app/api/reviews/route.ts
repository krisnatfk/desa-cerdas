import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order_id, product_id, buyer_id, rating, comment } = body;

    if (!order_id || !product_id || !buyer_id || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Insert review
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ order_id, product_id, buyer_id, rating, comment }])
      .select()
      .single();

    if (error) {
       // Check for duplicate constraint
       if (error.code === '23505') {
          return NextResponse.json({ error: 'Anda sudah memberikan ulasan untuk produk ini.' }, { status: 409 });
       }
       throw error;
    }

    // Mark order as reviewed
    await supabase.from('orders').update({ is_reviewed: true }).eq('id', order_id);

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    console.error('Review API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
