import Cookies from "js-cookie";
import { WIX_SESSION_COOKIE } from "@/app/utils/constants";
import { createClient, OAuthStrategy, type Tokens } from "@wix/sdk";
import { products } from "@wix/stores";
import { categories } from "@wix/categories";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID!;

export function createServerClient(tokens?: Tokens) {
  return createClient({
    modules: { products, categories },
    auth: OAuthStrategy({ clientId, tokens }),
  });
}

export async function getWixServerClient() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const raw = cookieStore.get(WIX_SESSION_COOKIE)?.value;
    const tokens = raw ? (JSON.parse(raw) as Tokens) : undefined;
    return createServerClient(tokens);
  } catch {
    return createServerClient();
  }
}

export function createBrowserClient(tokens?: Tokens) {
  return createClient({
    modules: { currentCart, redirects },
    auth: OAuthStrategy({ clientId, tokens }),
  });
}

export function getBrowserClient() {
  const raw = Cookies.get(WIX_SESSION_COOKIE);
  const tokens = raw ? (JSON.parse(raw) as Tokens) : undefined;
  return createBrowserClient(tokens);
}

export function persistTokens(client: ReturnType<typeof createBrowserClient>) {
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

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
}
