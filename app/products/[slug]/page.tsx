import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, Shield, Star } from 'lucide-react';
import { getProductBySlug } from '@/lib/products';
import { stripHtml } from '@/lib/utils';
import ProductGallery from '@/components/products/ProductGallery';
import AddToCartSection from '@/components/products/AddToCartSection';

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const images = [
    product.media?.mainMedia?.image?.url,
    ...(product.media?.items?.slice(1, 5).map((i) => i.image?.url) ?? []),
  ].filter(Boolean) as string[];

  const price = product.price?.formatted?.price ?? '£0.00';
  const discountedPrice = product.price?.formatted?.discountedPrice;
  const inStock = product.stock?.inStock !== false;
  const description = stripHtml(product.description ?? '');

  return (
    <div className="min-h-screen bg-cyber-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-orbitron text-[0.65rem] tracking-widest text-cyber-muted hover:text-cyber-cyan transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          BACK TO PRODUCTS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Image gallery (client) */}
          <ProductGallery images={images} name={product.name ?? 'Product'} />

          {/* Info */}
          <div className="flex flex-col gap-6">
            {/* Category */}
            {product.productType && (
              <span className="cyber-tag text-cyber-cyan/60 border-cyber-cyan/20 text-[10px] self-start">
                {product.productType}
              </span>
            )}

            {/* Name */}
            <h1 className="font-orbitron font-black text-2xl sm:text-3xl text-cyber-text leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-orbitron text-3xl font-bold text-cyber-cyan">
                {discountedPrice ?? price}
              </span>
              {discountedPrice && (
                <span className="font-orbitron text-lg text-cyber-muted line-through">{price}</span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-cyber-green' : 'bg-cyber-pink'}`} />
              <span className={`font-orbitron text-xs tracking-widest ${inStock ? 'text-cyber-green' : 'text-cyber-pink'}`}>
                {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>
            </div>

            {/* Description */}
            {description && (
              <p className="text-cyber-muted text-sm leading-relaxed border-t border-cyber-cyan/8 pt-5">
                {description}
              </p>
            )}

            {/* Variants + quantity + add to cart (client) */}
            <AddToCartSection product={product} />

            {/* Trust row */}
            <div className="border-t border-cyber-cyan/8 pt-5 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: Truck, label: 'Next Day\nUK Delivery' },
                { icon: Shield, label: 'Official\nWarranty' },
                { icon: Star, label: 'Expert\nSupport' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="w-4 h-4 text-cyber-cyan" />
                  <span className="text-cyber-muted text-[0.65rem] leading-tight whitespace-pre-line">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional info accordions */}
            {(product.additionalInfoSections ?? []).map((sec) => (
              <details key={sec.title} className="border border-cyber-cyan/10 group">
                <summary className="px-5 py-4 font-orbitron text-xs tracking-widest text-cyber-text cursor-pointer hover:text-cyber-cyan transition-colors list-none flex items-center justify-between">
                  {sec.title?.toUpperCase()}
                  <span className="text-cyber-muted group-open:rotate-90 transition-transform">›</span>
                </summary>
                <div
                  className="px-5 pb-4 text-cyber-muted text-sm leading-relaxed border-t border-cyber-cyan/8"
                  dangerouslySetInnerHTML={{ __html: sec.description ?? '' }}
                />
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
