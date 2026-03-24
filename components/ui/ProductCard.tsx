/**
 * components/ui/ProductCard.tsx — Redesigned v2
 * UMKM Product card with modern design: image, price, WhatsApp CTA.
 */
import Image from 'next/image';
import { Phone, Star, ShoppingBag, TrendingUp, Award } from 'lucide-react';
import type { Product } from '@/lib/dummy-data';

function formatRupiah(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export function ProductCard({ product }: { product: Product }) {
  const waText = encodeURIComponent(`Halo ${product.seller_name}, saya tertarik dengan produk "${product.name}" yang saya lihat di DesaMind. Apakah masih tersedia?`);

  return (
    <div className="group bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {product.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-500 text-white text-[10px] font-bold shadow-sm">
            <Award className="w-3 h-3" />
            Unggulan
          </div>
        )}
        {product.sales_count && product.sales_count > 50 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
            <TrendingUp className="w-3 h-3" />
            Bestseller
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-1">{product.category}</p>
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{product.description}</p>

        {/* Rating + sales */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className={`w-3 h-3 ${i <= Math.round(product.rating ?? 4) ? 'text-accent-500 fill-accent-500' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">({product.sales_count ?? 0} terjual)</span>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
            <ShoppingBag className="w-3.5 h-3.5 text-primary-600" />
          </div>
          <span className="text-xs text-gray-600 font-medium">{product.seller_name}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <div className="text-lg font-extrabold text-gray-900">{formatRupiah(product.price)}</div>
          </div>
          <a
            href={`https://wa.me/${product.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition"
          >
            <Phone className="w-3.5 h-3.5" />
            Pesan
          </a>
        </div>
      </div>
    </div>
  );
}
