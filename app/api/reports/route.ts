import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([]);
}

export async function POST() {
  return NextResponse.json({ success: true, id: 'dummy-report' });
}
export async function PATCH() {
  return NextResponse.json({ success: true });
}
