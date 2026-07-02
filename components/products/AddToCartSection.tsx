"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { WixProduct } from "@/lib/types";

interface Props {
  product: WixProduct;
}

export default function AddToCartSection({ product }: Props) {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [added, setAdded] = useState(false);

  const inStock = product.stock?.inStock !== false;
  const opts = product.productOptions ?? [];
  const hasOptions = opts.length > 0;

  const allOptionsSelected =
    !hasOptions || opts.every((opt) => opt.name && selectedOptions[opt.name]);

  const buildCatalogOptions = (): Record<string, unknown> | undefined => {
    if (!hasOptions) return undefined;

    if (product.manageVariants) {
      const match = product.variants?.find(
        (v) =>
          v.choices &&
          opts.every(
            (opt) =>
              opt.name && v.choices![opt.name] === selectedOptions[opt.name],
          ),
      );
      return match?._id ? { variantId: match._id } : undefined;
    }

    return { options: selectedOptions };
  };

  const handleAddToCart = async () => {
    if (!product._id || !allOptionsSelected) return;
    await addToCart(product._id, buildCatalogOptions(), quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Variants */}
      {opts.map((opt) => (
        <div key={opt.name} className="space-y-2">
          <label className="font-orbitron text-[0.65rem] tracking-widest text-cyber-muted uppercase">
            {opt.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {opt.choices?.map((choice) => (
              <button
                key={choice.value}
                onClick={() =>
                  setSelectedOptions((prev) => ({
                    ...prev,
                    [opt.name!]: choice.value!,
                  }))
                }
                className={`cyber-tag transition-all ${
                  selectedOptions[opt.name!] === choice.value
                    ? "text-cyber-cyan border-cyber-cyan/60"
                    : "text-cyber-muted border-cyber-muted/20 hover:border-cyber-cyan/40 hover:text-cyber-cyan"
                }`}
              >
                {choice.description ?? choice.value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div className="space-y-2">
        <label className="font-orbitron text-[0.65rem] tracking-widest text-cyber-muted">
          QUANTITY
        </label>
        <div className="flex items-center border border-cyber-cyan/15 w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-cyber-muted hover:text-cyber-cyan transition-colors font-orbitron text-sm"
          >
            –
          </button>
          <span className="px-5 py-3 font-orbitron text-sm text-cyber-text border-x border-cyber-cyan/15 min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-3 text-cyber-muted hover:text-cyber-cyan transition-colors font-orbitron text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock || loading || !allOptionsSelected}
        className="cyber-btn cyber-btn-primary cyber-btn-lg w-full sm:w-auto justify-center disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {added ? (
          <>
            <Check className="w-4 h-4 mr-2 text-cyber-green" />
            ADDED TO CART
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            {loading
              ? "ADDING..."
              : !allOptionsSelected
                ? "SELECT OPTIONS"
                : "ADD TO CART"}
          </>
        )}
      </button>
    </div>
  );
}
