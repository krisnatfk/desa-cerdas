'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  MapPin, Phone, Mail, Facebook, Twitter, Instagram,
  Youtube, ArrowRight, Heart, ExternalLink
} from 'lucide-react';

const SOCIAL = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname.startsWith('/umkm/toko')) {
    return null;
  }

  return (
    <footer className="bg-[#0f1211] text-white mt-auto py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-16">
          {/* Left Column: Brand & Contact Info */}
          <div>
            <Link href="/" className="inline-block mb-10">
              <Image 
                src="/Logo-putih.webp" 
                alt="DesaMind Logo" 
                width={180} 
                height={54} 
                className="h-10 w-auto object-contain"
              />
            </Link>
            
            <div className="space-y-4 text-[10px] md:text-xs text-gray-300 font-medium tracking-wide">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="max-w-[200px] leading-relaxed">
                  DesaMind Center, Gedung Inovasi Lt.3<br />
                  Jl. Teknologi Desa No. 1<br />
                  Jakarta Selatan, DKI Jakarta,<br />
                  12345
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 shrink-0" />
                <p>021-1234-5678</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 shrink-0" />
                <p>info@desamind.id</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="max-w-md">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase mb-3">Name *</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input type="text" className="w-full bg-white text-black p-2.5 outline-none rounded-none text-xs focus:ring-2 focus:ring-primary-600 transition-all" />
                    <p className="text-[9px] text-gray-400 mt-1.5 uppercase tracking-wide">First</p>
                  </div>
                  <div>
                    <input type="text" className="w-full bg-white text-black p-2.5 outline-none rounded-none text-xs focus:ring-2 focus:ring-primary-600 transition-all" />
                    <p className="text-[9px] text-gray-400 mt-1.5 uppercase tracking-wide">Last</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase mb-3">Email *</label>
                <input type="email" className="w-full bg-white text-black p-2.5 outline-none rounded-none text-xs focus:ring-2 focus:ring-primary-600 transition-all" />
              </div>
              
              <button type="button" className="bg-primary-600 hover:bg-primary-500 text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 transition-colors">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400 tracking-wider">
          <p>2026 DesaMind Indonesia</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
