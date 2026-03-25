import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-1.5-flash' });

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // 1. Fetch the image from the provided URL
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image from URL');
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

    // 2. Prepare the prompt
    const prompt = `
      Anda adalah seorang asisten ahli untuk platform marketplace produk UMKM desa di Indonesia.
      Tugas Anda adalah mengidentifikasi gambar produk yang diunggah dan menghasilkan data produk yang relevan untuk dijual.
      Berikan respons Anda HANYA dalam format JSON yang valid dengan struktur berikut, tanpa tambahan markdown formating (\`\`\`json) atau teks pengantar:
      {
        "name": "Judul Produk Singkat dan Menarik (Maks 5 kata)",
        "description": "Deskripsi produk yang menarik, menjelaskan fungsi, dan keunggulannya sesuai gambar.",
        "category": "Pilih satu dari: Makanan, Kerajinan, Pertanian, Fashion, Jasa"
      }
      Pastikan bahasanya Indonesia yang baik dan profesional. Jika gambar tidak jelas, tebak dengan masuk akal mendekati salah satu kategori tersebut.
    `;

    // 3. Call Gemini API
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType,
        },
      },
    ]);

    const responseText = result.response.text();
    
    // 4. Parse JSON from response
    // Sometimes the model wraps it in markdown blocks even if instructed not to.
    const cleanJsonString = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    const productData = JSON.parse(cleanJsonString);

    return NextResponse.json(productData);

  } catch (error: any) {
    console.error('AI Product Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate product data' }, { status: 500 });
  }
}
