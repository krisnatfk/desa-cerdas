import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ success: true, count: 1 });
}
export async function DELETE() {
  return NextResponse.json({ success: true, count: 0 });
}
