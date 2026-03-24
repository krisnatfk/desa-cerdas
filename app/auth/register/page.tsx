'use client';
/**
 * app/auth/register/page.tsx — Premium Redesign v3 (Powered by Clerk pre-built UI)
 */
import Link from 'next/link';
import Image from 'next/image';
import { SignUp } from '@clerk/nextjs';
import { CheckCircle, Shield, MapPin, Phone } from 'lucide-react';

const BENEFITS = [
  { icon: MapPin,        text: 'Laporkan masalah desa langsung dari HP' },
  { icon: Shield,        text: 'Data pribadi aman & terenkripsi' },
  { icon: Phone,         text: 'Notifikasi perkembangan laporan Anda' },
  { icon: CheckCircle,   text: 'Gratis selamanya untuk warga desa' },
];

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ── Left decorative panel ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative overflow-hidden bg-primary-950">
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white border-r border-primary-900 border-opacity-20">
          <div className="mb-12">
            <Image src="/logo-putih.webp" alt="DesaMind" width={180} height={48} className="h-14 w-auto object-contain" priority />
          </div>

          <h2 className="text-4xl font-semibold text-center mb-6 leading-tight">
            Bergabung Bersama<br />
            <span className="text-accent-500">Warga DesaMind</span>
          </h2>
          <p className="text-primary-300 text-[11px] font-bold uppercase tracking-widest text-center max-w-sm leading-relaxed mb-12">
            Daftar gratis dan jadilah bagian dari ekosistem desa digital Labuhan Maringgai.
          </p>

          <div className="flex flex-col gap-px w-full max-w-sm bg-primary-900 bg-opacity-30 border border-primary-900 border-opacity-30">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 bg-primary-950 p-6">
                <div className="w-10 h-10 border border-primary-800 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent-500" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-300 leading-relaxed">{text}</p>
              </div>
            ))}
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
            <SignUp 
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
