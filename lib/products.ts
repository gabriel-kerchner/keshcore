import { getWixServerClient } from "./wix-client";
import type { WixProduct, WixCollection } from "./types";

export async function getProducts(options?: {
  limit?: number;
  collectionIds?: string[];
}): Promise<WixProduct[]> {
  try {
    const client = await getWixServerClient();

    let query = client.products.queryProducts();

    const filterByCollection = Boolean(options?.collectionIds?.length);
    query = query.limit(filterByCollection ? 100 : (options?.limit ?? 100));

    const { items } = await query.find();
    let products = items as unknown as WixProduct[];

    if (filterByCollection) {
      const idSet = new Set(options!.collectionIds);
      products = products.filter((p) =>
        p.collectionIds?.some((id) => idSet.has(id)),
      );
      if (options?.limit) products = products.slice(0, options.limit);
    }

    return products;
  } catch (err) {
    console.error("[getProducts]", err);
    return [];
  }
}

const STORES_CATEGORY_TREE = {
  appNamespace: "@wix/stores",
  treeKey: null,
} as const;

export async function getCollectionIdsBySlugs(
  slugs: string[],
): Promise<string[]> {
  if (!slugs.length) return [];
  try {
    const client = await getWixServerClient();
    const { items } = await client.categories
      .queryCategories({ treeReference: STORES_CATEGORY_TREE })
      .in("slug", slugs)
      .find();
    return items.map((c) => c._id).filter((id): id is string => Boolean(id));
  } catch (err) {
    console.error("[getCollectionIdsBySlugs]", err);
    return [];
  }
}

export interface CategoryBreadcrumbItem {
  categoryId?: string;
  categoryName?: string;
  categorySlug?: string;
}

export async function getCategoryBreadcrumb(
  collectionIds: string[],
): Promise<CategoryBreadcrumbItem[]> {
  if (!collectionIds.length) return [];
  try {
    const client = await getWixServerClient();
    const categories = await Promise.all(
      collectionIds.map((id) =>
        client.categories
          .getCategory(id, STORES_CATEGORY_TREE, {
            fields: ["BREADCRUMBS_INFO"],
          })
          .catch(() => null),
      ),
    );

    let deepest: CategoryBreadcrumbItem[] = [];
    for (const category of categories) {
      const breadcrumbs = category?.breadcrumbsInfo?.breadcrumbs ?? [];
      if (breadcrumbs.length > deepest.length) deepest = breadcrumbs;
    }
    return deepest;
  } catch (err) {
    console.error("[getCategoryBreadcrumb]", err);
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
    const { items } = await client.categories
      .queryCategories({ treeReference: STORES_CATEGORY_TREE })
      .find();
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
