import { WIX_SESSION_COOKIE } from "@/app/utils/constants";
import { createClient, OAuthStrategy, type Tokens } from "@wix/sdk";
import { products, collections } from "@wix/stores";

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID!;

export function createServerClient(tokens?: Tokens) {
  return createClient({
    modules: { products, collections },
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
