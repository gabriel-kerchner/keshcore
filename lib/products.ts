import { getWixServerClient } from "./wix-client";
import type { WixProduct, WixCollection } from "./types";

export async function getProducts(options?: {
  limit?: number;
  collectionId?: string;
}): Promise<WixProduct[]> {
  try {
    const client = await getWixServerClient();

    let query = client.products.queryProducts();

    if (options?.limit) query = query.limit(options.limit);
    const { items } = await query.find();

    return items as unknown as WixProduct[];
  } catch (err) {
    console.error("[getProducts]", err);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<WixProduct | null> {
  try {
    const client = await getWixServerClient();
    const { items } = await client.products
      .queryProducts()
      .eq("slug", slug)
      .limit(1)
      .find();
    return (items[0] as unknown as WixProduct) ?? null;
  } catch (err) {
    console.error("[getProductBySlug]", err);
    return null;
  }
}

export async function getCollections(): Promise<WixCollection[]> {
  try {
    const client = await getWixServerClient();
    const { items } = await client.collections.queryCollections().find();
    return items as unknown as WixCollection[];
  } catch (err) {
    console.error("[getCollections]", err);
    return [];
  }
}

export async function searchProducts(term: string): Promise<WixProduct[]> {
  try {
    const client = await getWixServerClient();
    const { items } = await client.products
      .queryProducts()
      .startsWith("name", term)
      .limit(12)
      .find();
    return items as unknown as WixProduct[];
  } catch {
    return [];
  }
}
