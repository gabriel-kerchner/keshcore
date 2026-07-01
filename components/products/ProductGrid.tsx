import ProductCard from './ProductCard';
import type { WixProduct } from '@/lib/types';

interface ProductGridProps {
  products: WixProduct[];
  className?: string;
}

export default function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="font-orbitron text-cyber-muted text-sm tracking-widest mb-3">
          NO PRODUCTS FOUND
        </div>
        <p className="text-cyber-muted/60 text-sm">
          Check back later or try a different category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
