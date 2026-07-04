import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { WixProduct } from "@/lib/types";
import { getProductImageUrl } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: WixProduct;
}

export default function ProductCard({ product }: Props) {
  const imageUrl = getProductImageUrl(
    product.media?.mainMedia?.image?.url,
    500,
    500,
  );
  const price = product.price?.formatted?.price ?? "£0.00";
  const discountedPrice = product.price?.formatted?.discountedPrice;
  const inStock = product.stock?.inStock !== false;
  const hasDiscount =
    discountedPrice && product.price?.discountedPrice !== product.price?.price;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group cyber-card flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cyber-dark/70">
        <Image
          src={imageUrl}
          alt={product.name ?? "Product image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-cyber-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="cyber-btn py-2 px-3 text-[10px] backdrop-blur-sm">
            <Eye className="w-3 h-3 mr-1.5" />
            VIEW
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {!inStock && (
            <span className="cyber-tag text-cyber-pink border-cyber-pink/40 text-[9px]">
              Out of Stock
            </span>
          )}
          {hasDiscount && inStock && (
            <span className="cyber-tag text-cyber-green border-cyber-green/40 text-[9px]">
              Sale
            </span>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {product.productType && (
          <span className="cyber-tag text-cyber-cyan/50 border-cyber-cyan/15 text-[9px] mb-2.5 self-start">
            {product.productType}
          </span>
        )}

        <h3 className="font-orbitron text-xs sm:text-sm font-semibold text-cyber-text group-hover:text-cyber-cyan transition-colors duration-200 leading-snug line-clamp-2 mb-3 flex-1">
          {product.name}
        </h3>

        {/* Price + cart button */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="font-orbitron text-base font-bold text-cyber-cyan">
              {hasDiscount ? discountedPrice : price}
            </span>
            {hasDiscount && (
              <span className="font-orbitron text-xs text-cyber-muted line-through">
                {price}
              </span>
            )}
          </div>

          <AddToCartButton product={product} inStock={inStock} />
        </div>
      </div>
    </Link>
  );
}
