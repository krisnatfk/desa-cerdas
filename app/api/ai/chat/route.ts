/**
 * app/api/ai/chat/route.ts
 * POST: AI Assistant chat endpoint.
 * Uses OpenAI if key is available, else returns a local fallback response.
 */
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Anda adalah AI Asisten Desa DesaMind yang ramah dan membantu. 
Tugas Anda adalah membantu warga desa dengan pertanyaan seputar:
- Prosedur administrasi desa (KTP, KK, surat keterangan, dll)
- Layanan kesehatan dan posyandu
- Program bantuan dan UMKM
- Informasi jadwal kegiatan desa
- Cara melaporkan masalah
Selalu gunakan Bahasa Indonesia yang sopan dan mudah dipahami. 
Jika Anda tidak tahu jawabannya, arahkan warga untuk menghubungi kantor desa secara langsung.`;

/** Local fallback responses for common questions */
function localFallback(message: string): string {
  const lower = message.toLowerCase();

  if (/ktp|kartu tanda penduduk/.test(lower)) {
    return '📋 Untuk mengurus KTP, Anda perlu membawa: KK asli, surat pengantar RT/RW, dan pas foto 3x4. Proses dapat diselesaikan di kantor desa dalam 1-3 hari kerja. Jam layanan: Senin-Jumat, 08:00-15:00 WIB.';
  }
  if (/kk|kartu keluarga/.test(lower)) {
    return '👨‍👩‍👧 Pengurusan Kartu Keluarga memerlukan: surat nikah/cerai, akte kelahiran anggota keluarga, dan KTP kepala keluarga. Datang langsung ke kantor desa atau hubungi RT setempat untuk bantuan.';
  }
  if (/posyandu|imunisasi|bayi/.test(lower)) {
    return '🏥 Posyandu diadakan setiap bulan di masing-masing RW. Jadwal umum: minggu pertama setiap bulan. Layanan meliputi penimbangan bayi, imunisasi, dan konsultasi gizi. Hubungi kader posyandu RT Anda untuk jadwal pasti.';
  }
  if (/lapor|laporan|masalah/.test(lower)) {
    return '📝 Untuk melaporkan masalah, Anda dapat menggunakan fitur "Lapor Masalah" di menu utama. Lengkapi judul, deskripsi, foto, dan lokasi GPS. Laporan akan langsung diterima perangkat desa dan ditangani sesuai prioritas.';
  }
  if (/umkm|usaha|jualan|produk/.test(lower)) {
    return '🏪 Untuk mendaftarkan usaha UMKM Anda di platform DesaMind, hubungi kantor desa atau klik menu UMKM dan pilih "Daftarkan Produk Saya". Kami membantu UMKM lokal menjangkau lebih banyak pembeli.';
  }
  if (/terima kasih|makasih/.test(lower)) {
    return '😊 Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, jangan ragu untuk bertanya. Bersama DesaMind, kemajuan desa adalah tanggung jawab kita bersama! 🌿';
  }

  return '🤝 Terima kasih atas pertanyaan Anda. Saat ini saya belum bisa terhubung dengan AI cloud, namun saya siap membantu dengan informasi dasar. Untuk pertanyaan lebih detail, silakan kunjungi kantor desa atau hubungi kepala RT/RW setempat. Ada hal lain yang bisa saya bantu?';
}

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === 'user')?.content ?? '';

  // Try Gemini API if key is configured
  if (process.env.GEMINI_API_KEY) {
    try {
      const formattedHistory = messages.map((m: any) => `${m.role === 'user' ? 'Warga' : 'AI'}: ${m.content}`).join('\n');
      const prompt = `${SYSTEM_PROMPT}\n\nRiwayat Percakapan:\n${formattedHistory}\n\nBalasan AI:`;

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const targetModel = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      const model = genAI.getGenerativeModel({ model: targetModel });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const reply = response.text();
      
      if (reply) return NextResponse.json({ reply });
    } catch (error: any) {
      console.error("[Gemini SDK Error]", error);
      return NextResponse.json({ reply: `Maaf, koneksi ke sistem AI ditolak. Pesan sistem: ${error.message || 'Kunci API (API Key) mungkin kadaluarsa atau wilayah Anda dibatasi.'}` });
    }
  }

  // Local fallback response
  const reply = localFallback(lastUserMessage);
  return NextResponse.json({ reply });
}
