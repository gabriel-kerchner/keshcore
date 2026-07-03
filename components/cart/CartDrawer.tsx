'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductImageUrl } from '@/lib/utils';

export default function CartDrawer() {
  const {
    cart,
    cartItemCount,
    cartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    proceedToCheckout,
    loading,
    checkoutError,
  } = useCart();

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  const lineItems = cart?.lineItems ?? [];

  const subtotalAmount = lineItems.reduce((acc: number, item) => {
    const p = item.price;
    const amt = typeof p === 'string' ? parseFloat(p) : parseFloat(p?.amount ?? '0');
    return acc + amt * (item.quantity ?? 1);
  }, 0);
  const subtotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: cart?.currency ?? 'GBP',
  }).format(subtotalAmount);

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 bg-cyber-black/70 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-cyber-dark border-l border-cyber-cyan/10 flex flex-col transition-transform duration-300 ease-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cyber-cyan/8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-4 h-4 text-cyber-cyan" />
            <span className="font-orbitron text-xs tracking-[0.2em] text-cyber-text">
              CART
            </span>
            {cartItemCount > 0 && (
              <span className="cyber-tag text-cyber-cyan border-cyber-cyan/30 text-[9px]">
                {cartItemCount} {cartItemCount === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-cyber-muted hover:text-cyber-cyan transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lineItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
              <div className="p-5 border border-cyber-cyan/10 text-cyber-muted/40">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <p className="font-orbitron text-xs tracking-widest text-cyber-muted mb-2">
                  YOUR CART IS EMPTY
                </p>
                <p className="text-cyber-muted/60 text-sm">
                  Add some gear to get started.
                </p>
              </div>
              <Link
                href="/products"
                onClick={closeCart}
                className="cyber-btn mt-2"
              >
                BROWSE PRODUCTS
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {lineItems.map((item) => {
                const name = item.productName?.original ?? 'Product';
                const qty = item.quantity ?? 1;
                const p = item.price;
                const price = typeof p === 'string' ? (p || '£0.00') : (p?.formattedAmount ?? '£0.00');
                const imgUrl = item.image
                  ? getProductImageUrl(item.image, 120, 120)
                  : '/images/placeholder.jpg';

                return (
                  <li key={item._id} className="flex gap-4 py-4 border-b border-cyber-cyan/6">
                    {/* Image */}
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-cyber-black border border-cyber-cyan/10">
                      <Image
                        src={imgUrl}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-orbitron text-xs font-semibold text-cyber-text leading-snug line-clamp-2 mb-2">
                        {name}
                      </h4>
                      <div className="font-orbitron text-sm font-bold text-cyber-cyan mb-3">
                        {price}
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-cyber-cyan/15">
                          <button
                            onClick={() => item._id && updateQuantity(item._id, Math.max(0, qty - 1))}
                            disabled={loading}
                            className="px-2.5 py-1.5 text-cyber-muted hover:text-cyber-cyan transition-colors disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-orbitron text-xs text-cyber-text border-x border-cyber-cyan/15 py-1.5">
                            {qty}
                          </span>
                          <button
                            onClick={() => item._id && updateQuantity(item._id, qty + 1)}
                            disabled={loading}
                            className="px-2.5 py-1.5 text-cyber-muted hover:text-cyber-cyan transition-colors disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => item._id && removeFromCart(item._id)}
                          disabled={loading}
                          className="p-1.5 text-cyber-muted hover:text-cyber-pink transition-colors disabled:opacity-40"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {lineItems.length > 0 && (
          <div className="px-6 py-5 border-t border-cyber-cyan/8">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-5">
              <span className="font-orbitron text-xs tracking-widest text-cyber-muted">SUBTOTAL</span>
              <span className="font-orbitron text-xl font-bold text-cyber-cyan">{subtotal}</span>
            </div>
            <p className="text-cyber-muted/60 text-xs mb-4">
              Shipping & taxes calculated at checkout
            </p>

            {checkoutError && (
              <p className="text-cyber-pink text-xs mb-4" role="alert">
                {checkoutError}
              </p>
            )}

            {/* Checkout button */}
            <button
              onClick={proceedToCheckout}
              disabled={loading}
              className="w-full cyber-btn cyber-btn-primary cyber-btn-lg justify-center disabled:opacity-50"
            >
              {loading ? 'PROCESSING...' : 'CHECKOUT'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>

            {/* View full cart */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-3 block text-center font-orbitron text-[0.65rem] tracking-widest text-cyber-muted hover:text-cyber-cyan transition-colors"
            >
              VIEW FULL CART
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
