import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  Package,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatGBP, getProductImageUrl } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, proceedToCheckout, loading } =
    useCart();
  const lineItems = cart?.lineItems ?? [];

  const subtotalAmount = lineItems.reduce((acc: number, item) => {
    const p = item.price;
    const amt =
      typeof p === "string" ? parseFloat(p) : parseFloat(p?.amount ?? "0");
    return acc + amt * (item.quantity ?? 1);
  }, 0);
  const subtotal = formatGBP(subtotalAmount);

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
            <h1 className="font-orbitron font-black text-3xl text-cyber-text">
              YOUR CART
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {lineItems.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <div className="p-8 border border-cyber-cyan/10 text-cyber-muted/30">
              <Package className="w-12 h-12" />
            </div>
            <div>
              <h2 className="font-orbitron text-sm tracking-widest text-cyber-muted mb-2">
                YOUR CART IS EMPTY
              </h2>
              <p className="text-cyber-muted/60">
                Time to fill it up with some gear.
              </p>
            </div>
            <Link href="/products" className="cyber-btn cyber-btn-primary">
              BROWSE PRODUCTS
              <ArrowRight className="ml-2 w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {lineItems.map((item) => {
                const name = item.productName?.original ?? "Product";
                const qty = item.quantity ?? 1;
                const p = item.price;
                const price =
                  typeof p === "string"
                    ? p || "£0.00"
                    : (p?.formattedAmount ?? "£0.00");
                const imgUrl = item.image
                  ? getProductImageUrl(item.image, 200, 200)
                  : "/images/placeholder.jpg";

                return (
                  <div key={item._id} className="cyber-card flex gap-5 p-5">
                    {/* Image */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden bg-cyber-dark border border-cyber-cyan/10">
                      <Image
                        src={imgUrl}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-orbitron text-sm font-semibold text-cyber-text leading-snug">
                          {name}
                        </h3>
                        <button
                          onClick={() => item._id && removeFromCart(item._id)}
                          disabled={loading}
                          className="p-1.5 text-cyber-muted hover:text-cyber-pink transition-colors shrink-0 disabled:opacity-40"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="font-orbitron text-lg font-bold text-cyber-cyan">
                        {price}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center border border-cyber-cyan/15 w-fit">
                        <button
                          onClick={() =>
                            item._id &&
                            updateQuantity(item._id, Math.max(0, qty - 1))
                          }
                          disabled={loading}
                          className="px-3 py-2 text-cyber-muted hover:text-cyber-cyan transition-colors disabled:opacity-40"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 font-orbitron text-sm text-cyber-text border-x border-cyber-cyan/15 py-2 min-w-[48px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() =>
                            item._id && updateQuantity(item._id, qty + 1)
                          }
                          disabled={loading}
                          className="px-3 py-2 text-cyber-muted hover:text-cyber-cyan transition-colors disabled:opacity-40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="cyber-card p-6 sticky top-24">
                <h2 className="font-orbitron text-xs tracking-[0.25em] text-cyber-cyan mb-6">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-3 pb-6 border-b border-cyber-cyan/8">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-muted">Subtotal</span>
                    <span className="font-orbitron text-cyber-text">
                      {subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-muted">Shipping</span>
                    <span className="font-orbitron text-cyber-green text-xs">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-muted">VAT</span>
                    <span className="font-orbitron text-cyber-muted text-xs">
                      Included
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5">
                  <span className="font-orbitron text-xs tracking-widest text-cyber-muted">
                    TOTAL
                  </span>
                  <span className="font-orbitron text-2xl font-black text-cyber-cyan">
                    {subtotal}
                  </span>
                </div>

                <button
                  onClick={proceedToCheckout}
                  disabled={loading}
                  className="w-full cyber-btn cyber-btn-primary cyber-btn-lg justify-center disabled:opacity-40"
                >
                  {loading ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>

                <p className="text-cyber-muted/60 text-xs text-center mt-4">
                  Secure checkout powered by Wix Payments
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
