'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { cartItemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-cyber-muted hover:text-cyber-cyan transition-colors group"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5 group-hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.6)] transition-all" />
      {cartItemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-cyber-pink text-white text-[10px] font-bold font-orbitron rounded-full flex items-center justify-center px-1 animate-pulse-neon-pink">
          {cartItemCount}
        </span>
      )}
    </button>
  );
}
