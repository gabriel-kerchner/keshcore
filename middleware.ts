import { NextResponse, type NextRequest } from "next/server";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { WIX_SESSION_COOKIE } from "@/app/utils/constants";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(WIX_SESSION_COOKIE);

  if (!sessionCookie?.value) {
    try {
      const wixClient = createClient({
        auth: OAuthStrategy({
          clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        }),
      });
      const tokens = await wixClient.auth.generateVisitorTokens();
      const res = NextResponse.next();
      res.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(tokens), {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: false,
      });
      return res;
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
