import { Suspense } from "react";
import type { Metadata } from "next";
import ProductGrid from "@/components/products/ProductGrid";
import { getProducts, getCollectionIdsBySlugs } from "@/lib/products";
import {
  getCategoryName,
  getCategoryAndDescendantSlugs,
} from "@/lib/categories";
import { SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Shop our full range of gaming peripherals, PC components, SSDs, monitors and accessories. Free & Express UK delivery available.",
};

export const revalidate = 60;

const sortOptions = [
  { value: "newest", label: "NEWEST" },
  { value: "best-sellers", label: "BEST SELLERS" },
  { value: "price-asc", label: "PRICE: LOW → HIGH" },
  { value: "price-desc", label: "PRICE: HIGH → LOW" },
  { value: "name", label: "NAME A–Z" },
];

interface SearchParams {
  category?: string;
  sort?: string;
  q?: string;
  sale?: string;
  maxPrice?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, sort = "newest", q, sale, maxPrice } = searchParams;

  const collectionIds = category
    ? await getCollectionIdsBySlugs(getCategoryAndDescendantSlugs(category))
    : undefined;

  const products =
    category && collectionIds?.length === 0
      ? []
      : await getProducts({ limit: 50, collectionIds });

  const heading = category
    ? (getCategoryName(category) ??
      category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    : q
      ? `Search: "${q}"`
      : sale === "true"
        ? "Sale"
        : maxPrice
          ? `Under £${maxPrice}`
          : "All Products";

  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Page header */}
      <div className="relative py-16 border-b border-cyber-cyan/8 overflow-hidden">
        <div className="cyber-bg-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/60 to-cyber-black" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-cyber-cyan opacity-60" />
            <span className="font-orbitron text-[0.6rem] tracking-[0.35em] text-cyber-cyan/70 uppercase">
              {category || sale === "true" || maxPrice ? "Category" : "Shop"}
            </span>
          </div>
          <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-cyber-text">
            {heading}
          </h1>
          {products.length > 0 && (
            <p className="text-cyber-muted text-sm mt-2">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              found
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters bar */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-cyber-muted">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-orbitron text-xs tracking-widest">
              SORT BY
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {sortOptions.map(({ value, label }) => (
              <a
                key={value}
                href={`/products?${category ? `category=${category}&` : ""}sort=${value}`}
                className={`cyber-tag transition-colors cursor-pointer ${
                  sort === value
                    ? "text-cyber-cyan border-cyber-cyan/50"
                    : "text-cyber-muted/60 border-cyber-muted/20 hover:text-cyber-cyan hover:border-cyber-cyan/30"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="cyber-card overflow-hidden">
                  <div className="aspect-square bg-cyber-dark animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-cyber-dark rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-cyber-dark rounded animate-pulse" />
                    <div className="h-6 bg-cyber-dark rounded animate-pulse w-1/2 mt-3" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <ProductGrid products={products} />
        </Suspense>
      </div>
    </div>
  );
}
