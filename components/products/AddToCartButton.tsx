'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Props {
  productId: string;
  productName: string;
  inStock: boolean;
}

export default function AddToCartButton({ productId, productName, inStock }: Props) {
  const { addToCart, loading } = useCart();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;
    await addToCart(productId, undefined, 1);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!inStock || loading}
      aria-label={`Add ${productName} to cart`}
      className="cyber-btn p-2.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <ShoppingCart className="w-3.5 h-3.5" />
    </button>
  );
}
