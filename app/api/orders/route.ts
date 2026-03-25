/**
 * app/api/orders/route.ts
 * GET: List orders (by buyer_id or store_id).
 * PATCH: Update order status / AWB number.
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const buyer_id = searchParams.get('buyer_id');
  const store_id = searchParams.get('store_id');

  if (!supabase) return NextResponse.json([]);

  let query = supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .order('created_at', { ascending: false });
  
  if (buyer_id) query = query.eq('buyer_id', buyer_id);
  if (store_id) query = query.eq('store_id', store_id);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { order_id, status, awb_number } = body;

  if (!order_id) {
    return NextResponse.json({ error: 'order_id is required' }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const updateData: any = { updated_at: new Date().toISOString() };
  if (status) updateData.status = status;
  if (awb_number) updateData.awb_number = awb_number;
  if (body.cancellation_reason !== undefined) updateData.cancellation_reason = body.cancellation_reason;
  if (body.cancellation_requested_by !== undefined) updateData.cancellation_requested_by = body.cancellation_requested_by;
  if (body.cancellation_status !== undefined) updateData.cancellation_status = body.cancellation_status;
  if (body.completion_photo_base64 !== undefined) updateData.completion_photo_base64 = body.completion_photo_base64;
  if (body.is_reviewed !== undefined) updateData.is_reviewed = body.is_reviewed;

  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', order_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
