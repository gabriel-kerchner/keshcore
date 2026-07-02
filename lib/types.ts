export interface WixProduct {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  price?: {
    currency?: string;
    price?: number;
    discountedPrice?: number;
    formatted?: {
      price?: string;
      discountedPrice?: string;
    };
  };
  media?: {
    mainMedia?: {
      image?: { url?: string; width?: number; height?: number };
    };
    items?: Array<{
      image?: { url?: string; width?: number; height?: number };
    }>;
  };
  stock?: {
    inStock?: boolean;
    quantity?: number;
    inventoryStatus?: string;
  };
  productType?: string;
  manageVariants?: boolean;
  variants?: Array<{
    _id?: string;
    choices?: Record<string, string>;
    stock?: { inStock?: boolean; quantity?: number };
    variant?: {
      priceData?: {
        price?: number;
        formatted?: { price?: string };
      };
    };
  }>;
  productOptions?: Array<{
    name?: string;
    optionType?: string;
    choices?: Array<{
      value?: string;
      description?: string;
      media?: { mainMedia?: { image?: { url?: string } } };
    }>;
  }>;
  additionalInfoSections?: Array<{
    title?: string;
    description?: string;
  }>;
}

export interface WixCollection {
  _id?: string;
  name?: string;
  slug?: string;
  media?: {
    mainMedia?: { image?: { url?: string } };
  };
}

export interface CartLineItem {
  _id?: string;
  productName?: { original?: string; translated?: string };
  quantity?: number;
  price?: string;
  fullPrice?: string;
  image?: string;
  url?: string;
  catalogReference?: {
    catalogItemId?: string;
    appId?: string;
    options?: Record<string, unknown>;
  };
}
