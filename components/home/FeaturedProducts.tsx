import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/products";

export default async function FeaturedProducts() {
  const products = await getProducts({ limit: 8 });

  return (
    <section className="py-20 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/[0.015] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-cyber-pink opacity-60" />
              <span className="font-orbitron text-[0.6rem] tracking-[0.35em] text-cyber-pink/70 uppercase">
                Hot right now
              </span>
            </div>
            <h2 className="section-title text-2xl sm:text-3xl text-cyber-text">
              Featured <span className="neon-text-pink">Products</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 font-orbitron text-[0.65rem] tracking-widest text-cyber-muted hover:text-cyber-cyan transition-colors group"
          >
            VIEW ALL
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <ProductGrid products={products} />

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/products" className="cyber-btn cyber-btn-primary">
            VIEW ALL PRODUCTS
            <ArrowRight className="ml-2 w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
