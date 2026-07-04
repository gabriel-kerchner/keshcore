"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { trackPixelEvent } from "@/lib/meta-pixel";
import type { WixProduct } from "@/lib/types";

interface Props {
  product: WixProduct;
  inStock: boolean;
}

export default function AddToCartButton({ product, inStock }: Props) {
  const { addToCart, loading } = useCart();

  const variants = product.variants ?? [];
  const needsVariantChoice = product.manageVariants && variants.length > 1;
  const singleVariantId =
    product.manageVariants && variants.length === 1
      ? variants[0]._id
      : undefined;

  const handleClick = async (e: React.MouseEvent) => {
    if (needsVariantChoice) return;

    e.preventDefault();
    if (!inStock || !product._id) return;
    const catalogOptions = singleVariantId
      ? { variantId: singleVariantId }
      : undefined;
    await addToCart(product._id, catalogOptions, 1);

    const numericPrice =
      product.price?.discountedPrice ?? product.price?.price;
    trackPixelEvent("AddToCart", {
      content_ids: [product._id],
      content_name: product.name,
      content_type: "product",
      value: numericPrice,
      currency: product.price?.currency,
      contents: [{ id: product._id, quantity: 1, item_price: numericPrice }],
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={!inStock || loading}
      aria-label={`Add ${product.name ?? "product"} to cart`}
      className="cyber-btn p-2.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <ShoppingCart className="w-3.5 h-3.5" />
    </button>
  );
}
