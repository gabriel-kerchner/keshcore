"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import { createClient, OAuthStrategy, type Tokens } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import { WIX_SESSION_COOKIE } from "@/app/utils/constants";

const WIX_STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e";

function getBrowserClient() {
  const raw = Cookies.get(WIX_SESSION_COOKIE);
  const tokens = raw ? (JSON.parse(raw) as Tokens) : undefined;

  const client = createClient({
    modules: { currentCart, redirects },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens,
    }),
  });

  return client;
}

function persistTokens(client: ReturnType<typeof getBrowserClient>) {
  try {
    const tokens = client.auth.getTokens();
    if (tokens?.refreshToken?.value) {
      Cookies.set(WIX_SESSION_COOKIE, JSON.stringify(tokens), {
        expires: 30,
        path: "/",
      });
    }
  } catch {
    // ignore
  }
}

type Cart = currentCart.Cart;

interface CartContextType {
  cart: Cart | null;
  cartItemCount: number;
  loading: boolean;
  cartOpen: boolean;
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
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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
              ...(catalogOptions && { options: catalogOptions as Record<string, string> }),
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
    setLoading(true);
    try {
      const client = getBrowserClient();
      const { checkoutId } =
        await client.currentCart.createCheckoutFromCurrentCart({
          channelType: "WEB",
        });

      if (!checkoutId) throw new Error("No checkoutId returned");

      const { redirectSession } = await client.redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
        callbacks: {
          postFlowUrl:
            process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin,
          thankYouPageUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/thank-you`,
        },
      });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.error("[proceedToCheckout]", err);
    } finally {
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
        addToCart,
        removeFromCart,
        updateQuantity,
        proceedToCheckout,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
