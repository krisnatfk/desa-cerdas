'use client';
/**
 * app/auth/login/page.tsx — Premium Redesign v3 (Powered by Clerk pre-built UI)
 */
import Link from 'next/link';
import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';
import { Shield, Users, BarChart3, Sparkles } from 'lucide-react';

const STATS = [
  { icon: Users,     label: 'Warga Terdaftar', value: '1.2K+' },
  { icon: BarChart3, label: 'Laporan Masuk',   value: '148' },
  { icon: Shield,    label: 'Masalah Selesai', value: '48%' },
  { icon: Sparkles,  label: 'UMKM Lokal',      value: '67' },
];

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ── Left decorative panel ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative overflow-hidden bg-primary-950">
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white border-r border-primary-900 border-opacity-20">
          <div className="mb-12">
            <Image src="/logo-putih.webp" alt="DesaMind" width={180} height={48} className="h-14 w-auto object-contain" priority />
          </div>

          <h2 className="text-4xl font-semibold text-center mb-6 leading-tight">
            Selamat Datang di<br />
            <span className="text-accent-500">DesaMind AI</span>
          </h2>
          <p className="text-primary-300 text-[11px] font-bold uppercase tracking-widest text-center max-w-sm leading-relaxed mb-12">
            Platform cerdas warga Desa Labuhan Maringgai. Laporkan masalah, akses layanan, dan bangun desa bersama.
          </p>

          <div className="grid grid-cols-2 gap-px w-full max-w-sm bg-primary-900 bg-opacity-30 border border-primary-900 border-opacity-30">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-primary-950 p-6 flex flex-col items-center text-center">
                <Icon className="w-5 h-5 text-accent-500 mb-4" />
                <div className="text-2xl font-semibold mb-1">{value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-primary-400">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-10 text-[9px] font-bold uppercase tracking-widest text-primary-500">
            <Shield className="w-3.5 h-3.5" />
            <span>Data aman & terenkripsi · Build with Clerk</span>
          </div>
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-bg overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-12 lg:hidden justify-center">
            <Image src="/logo.webp" alt="DesaMind" width={140} height={40} className="h-10 w-auto" />
          </div>
          
          <div className="w-full flex justify-center">
            <SignIn 
              routing="hash" 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border p-8 border-gray-200 bg-white rounded-none w-full",
                  headerTitle: "text-2xl font-semibold text-primary-900 mb-1",
                  headerSubtitle: "text-[10px] font-bold uppercase tracking-widest text-gray-500",
                  socialButtonsBlockButton: "rounded-none border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-primary-900 hover:bg-gray-50 py-4 transition-colors",
                  socialButtonsProviderIcon: "w-4 h-4",
                  formButtonPrimary: "rounded-none bg-primary-800 hover:bg-primary-950 text-white font-bold uppercase tracking-widest text-[10px] py-4 transition-colors shadow-none mt-2",
                  formFieldInput: "rounded-none border-gray-200 py-3 px-4 focus:ring-0 focus:border-primary-800 bg-gray-50 text-sm",
                  formFieldLabel: "mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500",
                  dividerText: "text-[9px] font-bold uppercase tracking-widest text-gray-400 font-sans",
                  dividerLine: "bg-gray-200",
                  formFieldWarningText: "text-[10px] font-bold uppercase tracking-widest text-red-600",
                  formFieldErrorText: "text-[10px] font-bold uppercase tracking-widest text-red-600",
                  footerActionLink: "text-primary-800 font-bold uppercase tracking-widest hover:text-primary-950 transition-colors",
                  footerActionText: "text-[10px] font-bold uppercase tracking-widest text-gray-400",
                  identityPreviewEditButtonIcon: "text-primary-800",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
