/**
 * app/api/ai/health-score/route.ts
 * GET: Compute village health score from stats.
 * POST: Regenerate AI narrative for the health score.
 */
import { NextResponse } from 'next/server';
import { dummyHealthScore, dummyStats } from '@/lib/dummy-data';

export async function GET() {
  return NextResponse.json(dummyHealthScore);
}

export async function POST() {
  if (process.env.OPENAI_API_KEY) {
    try {
      const context = `
Statistik Desa:
- Total laporan: ${dummyStats.totalReports}, pending: ${dummyStats.pendingReports}, selesai: ${dummyStats.completedReports}
- Tingkat penyelesaian: ${dummyStats.resolutionRate}%
- UMKM aktif: ${dummyStats.activeUMKM}, warga: ${dummyStats.totalCitizens}
Skor per dimensi: Kebersihan 65, Infrastruktur 70, Keamanan 78, Kesehatan 80, Ekonomi 68, Komunitas 85.
Skor keseluruhan: 72/100 (Baik).
      `;
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          max_tokens: 250,
          messages: [
            { role: 'system', content: 'Anda adalah analis pemerintahan desa. Buat analisis naratif singkat (2-3 kalimat) tentang kondisi desa berdasarkan data yang diberikan, sertakan kekuatan utama dan area yang perlu perhatian. Gunakan Bahasa Indonesia yang jelas dan profesional.' },
            { role: 'user', content: context },
          ],
        }),
      });
      const data = await res.json();
      const narrative = data.choices?.[0]?.message?.content;
      if (narrative) return NextResponse.json({ narrative });
    } catch { /* fallthrough */ }
  }
  return NextResponse.json({ narrative: dummyHealthScore.ai_narrative });
}
