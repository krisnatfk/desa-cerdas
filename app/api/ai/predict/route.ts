import { NextResponse } from 'next/server';
import { dummyPredictions } from '@/lib/dummy-data';

export async function POST() {
  if (process.env.OPENAI_API_KEY) {
    try {
      const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/';
      const url = baseUrl.endsWith('/') ? `${baseUrl}chat/completions` : `${baseUrl}/chat/completions`;
      const modelName = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelName,
          max_tokens: 300,
          messages: [
            { role: 'system', content: 'Anda adalah sistem AI prediksi keamanan desa. Analisa data terakhir dan berikan prediksi.' },
            { role: 'user', content: 'Berdasarkan data minggu ini, apakah ada tren atau prediksi khusus yang perlu desa waspadai? Berikan JSON saja dengan struktur { predictions: [ {id, title, category, description, recommendation, risk_level, confidence} ] }' },
          ],
        }),
      });
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content;
      if (raw) {
        const cleanJsonString = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJsonString);
        if (parsed.predictions) return NextResponse.json(parsed);
      }
    } catch { /* fallthrough to dummy data */ }
  }
  return NextResponse.json({ predictions: dummyPredictions });
}
