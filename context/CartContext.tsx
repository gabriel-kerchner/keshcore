"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { currentCart } from "@wix/ecom";
import { getBrowserClient, persistTokens, getSiteUrl } from "@/lib/wix-client";
import { WIX_STORES_APP_ID } from "@/app/utils/constants";

type Cart = currentCart.Cart;

interface CartContextType {
  cart: Cart | null;
  cartItemCount: number;
  loading: boolean;
  cartOpen: boolean;
  checkoutError: string | null;
  addToCart: (
    productId: string,
    catalogOptions?: Record<string, unknown> | undefined,
    quantity?: number,
  ) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  proceedToCheckout: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  clearCheckoutError: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const cartItemCount =
    cart?.lineItems?.reduce(
      (acc: number, item) => acc + (item.quantity ?? 0),
      0,
    ) ?? 0;

  const fetchCart = useCallback(async () => {
    const client = getBrowserClient();
    const cartData = await client.currentCart.getCurrentCart();
    setCart(cartData ?? null);
    persistTokens(client);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (
    productId: string,
    catalogOptions: Record<string, unknown> | undefined = undefined,
    quantity = 1,
  ) => {
    setLoading(true);
    try {
      const client = getBrowserClient();
      const { cart: updated } = await client.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              catalogItemId: productId,
              appId: WIX_STORES_APP_ID,
              ...(catalogOptions && {
                options: catalogOptions as Record<string, string>,
              }),
            },
            quantity,
          },
        ],
      });
      setCart(updated ?? null);
      persistTokens(client);
      setCartOpen(true);
    } catch (err) {
      console.error("[addToCart]", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    setLoading(true);
    try {
      const client = getBrowserClient();
      const { cart: updated } =
        await client.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
      setCart(updated ?? null);
    } catch (err) {
      console.error("[removeFromCart]", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    setLoading(true);
    try {
      const client = getBrowserClient();
      const { cart: updated } =
        await client.currentCart.updateCurrentCartLineItemQuantity([
          { _id: lineItemId, quantity },
        ]);
      setCart(updated ?? null);
    } catch (err) {
      console.error("[updateQuantity]", err);
    } finally {
      setLoading(false);
    }
  };

  const proceedToCheckout = async () => {
    setCartOpen(false);
    setCheckoutError(null);
    setLoading(true);
    try {
      const client = getBrowserClient();
      const { checkoutId } =
        await client.currentCart.createCheckoutFromCurrentCart({
          channelType: "WEB",
        });

      if (!checkoutId) throw new Error("No checkoutId returned");

      const siteUrl = getSiteUrl();
      const { redirectSession } = await client.redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
        callbacks: {
          postFlowUrl: siteUrl,
          thankYouPageUrl: `${siteUrl}/thank-you`,
          cartPageUrl: `${siteUrl}/cart`,
        },
      });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err: any) {
      console.error("[proceedToCheckout]", err);
      if (
        err?.details?.applicationError?.code ===
        "SITE_MUST_ACCEPT_PAYMENTS_TO_CREATE_CHECKOUT"
      ) {
        setCheckoutError(
          "This store isn't set up to accept payments yet. Please check back soon.",
        );
      } else {
        setCheckoutError(
          "Something went wrong starting checkout. Please try again.",
        );
      }
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        loading,
        cartOpen,
        checkoutError,
        addToCart,
        removeFromCart,
        updateQuantity,
        proceedToCheckout,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        clearCheckoutError: () => setCheckoutError(null),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
