import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([{ id: 'dummy-store-1', user_id: 'warga@desa.com', name: 'Toko Dummy', status: 'active' }]);
}

export async function POST(req: Request) {
  return NextResponse.json({ success: true, id: 'dummy-new-store' });
}
