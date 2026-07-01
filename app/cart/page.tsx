import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import CartContent from '@/components/cart/CartContent';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Page header */}
      <div className="relative py-14 border-b border-cyber-cyan/8 overflow-hidden">
        <div className="cyber-bg-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/60 to-cyber-black" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-orbitron text-[0.65rem] tracking-widest text-cyber-muted hover:text-cyber-cyan transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            CONTINUE SHOPPING
          </Link>
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-cyber-cyan" />
            <h1 className="font-orbitron font-black text-3xl text-cyber-text">YOUR CART</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CartContent />
      </div>
    </div>
  );
}
