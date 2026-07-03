export interface CategoryItem {
  name: string;
  slug: string;
  /** Overrides the default `/products?category=<slug>` link (used by Deals filters). */
  href?: string;
  children?: CategoryItem[];
}

export const categories: CategoryItem[] = [
  {
    name: 'Gaming',
    slug: 'gaming',
    children: [
      {
        name: 'Gaming Peripherals',
        slug: 'gaming-peripherals',
        children: [
          { name: 'Gaming Mice', slug: 'gaming-mice' },
          { name: 'Gaming Keyboards', slug: 'gaming-keyboards' },
          { name: 'Gaming Headsets', slug: 'gaming-headsets' },
          { name: 'Mouse Pads', slug: 'mouse-pads' },
        ],
      },
      {
        name: 'Retro & Handheld Gaming',
        slug: 'retro-handheld-gaming',
        children: [
          { name: 'DS / 3DS Accessories', slug: 'ds-3ds-accessories' },
          { name: 'USB Card Readers', slug: 'retro-usb-card-readers' },
        ],
      },
      {
        name: 'Console Accessories',
        slug: 'console-accessories',
        children: [
          { name: 'Controller Accessories', slug: 'controller-accessories' },
          { name: 'Charging Cables', slug: 'charging-cables' },
          { name: 'Carry Cases', slug: 'carry-cases' },
        ],
      },
      {
        name: 'Gaming Setup Accessories',
        slug: 'gaming-setup-accessories',
        children: [
          { name: 'Stands', slug: 'gaming-setup-stands' },
          { name: 'Hubs', slug: 'gaming-setup-hubs' },
          { name: 'Cable Management', slug: 'cable-management' },
        ],
      },
    ],
  },
  {
    name: 'PC Parts',
    slug: 'pc-parts',
    children: [
      { name: 'CPUs', slug: 'cpus' },
      { name: 'Graphics Card', slug: 'graphics-card' },
      { name: 'Motherboards', slug: 'motherboards' },
      { name: 'RAM', slug: 'ram' },
      { name: 'Cooling', slug: 'cooling' },
      { name: 'Power Supplies', slug: 'power-supplies' },
      { name: 'PC Cases', slug: 'pc-cases' },
    ],
  },
  {
    name: 'Storage',
    slug: 'storage',
    children: [
      {
        name: 'SSDs',
        slug: 'ssds',
        children: [
          { name: 'NVMe SSDs', slug: 'nvme-ssds' },
          { name: 'SATA SSDs', slug: 'sata-ssds' },
        ],
      },
      { name: 'HDDs', slug: 'hdds' },
      {
        name: 'Memory Cards',
        slug: 'memory-cards',
        children: [
          { name: 'MicroSD Cards', slug: 'microsd-cards' },
          { name: 'SD Cards', slug: 'sd-cards' },
        ],
      },
      {
        name: 'Card Readers & Adapters',
        slug: 'card-readers-adapters',
        children: [
          { name: 'USB Card Readers', slug: 'storage-usb-card-readers' },
          { name: 'MicroSD Adapters', slug: 'microsd-adapters' },
          { name: 'Gaming Storage Adapters', slug: 'gaming-storage-adapters' },
        ],
      },
    ],
  },
  {
    name: 'Monitors',
    slug: 'monitors',
    children: [
      { name: 'Gaming Monitors', slug: 'gaming-monitors' },
      { name: 'Monitor Accessories', slug: 'monitor-accessories' },
    ],
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    children: [
      { name: 'Cables', slug: 'cables' },
      { name: 'USB Hubs', slug: 'usb-hubs' },
      { name: 'Stands', slug: 'stands' },
      { name: 'Desk Accessories', slug: 'desk-accessories' },
      { name: 'Tech Essentials', slug: 'tech-essentials' },
    ],
  },
  {
    name: 'Deals',
    slug: 'deals',
    children: [
      { name: 'Sale', slug: 'sale', href: '/products?sale=true' },
      { name: 'New Arrivals', slug: 'new-arrivals', href: '/products?sort=newest' },
      { name: 'Best Sellers', slug: 'best-sellers', href: '/products?sort=best-sellers' },
      { name: 'Under £20', slug: 'under-20', href: '/products?maxPrice=20' },
      { name: 'Under £50', slug: 'under-50', href: '/products?maxPrice=50' },
    ],
  },
];

export function getCategoryHref(item: CategoryItem): string {
  return item.href ?? `/products?category=${item.slug}`;
}

/** Finds a category anywhere in the tree by slug and returns it with its ancestor chain. */
export function findCategoryPath(
  slug: string,
  nodes: CategoryItem[] = categories,
  trail: CategoryItem[] = [],
): CategoryItem[] | null {
  for (const node of nodes) {
    const path = [...trail, node];
    if (node.slug === slug) return path;
    if (node.children) {
      const found = findCategoryPath(slug, node.children, path);
      if (found) return found;
    }
  }
  return null;
}

export function getCategoryName(slug: string): string | null {
  const path = findCategoryPath(slug);
  return path ? path[path.length - 1].name : null;
}

/** Returns the category's own slug plus every descendant slug (so a parent page includes its children). */
export function getCategoryAndDescendantSlugs(slug: string): string[] {
  const path = findCategoryPath(slug);
  if (!path) return [slug];

  const slugs: string[] = [];
  const collect = (node: CategoryItem) => {
    slugs.push(node.slug);
    node.children?.forEach(collect);
  };
  collect(path[path.length - 1]);
  return slugs;
}
