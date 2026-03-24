import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Raleway } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SOSButton } from '@/components/ui/SOSButton';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DesaMind — Platform Desa Cerdas',
  description: 'Platform AI terpadu untuk warga desa: laporkan masalah, temukan UMKM lokal, akses lowongan kerja, dan dapatkan bantuan dari asisten AI kami.',
  keywords: ['desa cerdas', 'smart village', 'laporan warga', 'UMKM', 'AI desa', 'gotong royong'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={`flex flex-col min-h-screen bg-bg ${raleway.className}`}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            {/* Global floating SOS emergency button — visible on all pages */}
            <SOSButton />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
