"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { AlertTriangle, Loader2 } from "lucide-react";
import { getBrowserClient, persistTokens } from "@/lib/wix-client";
import { OAUTH_DATA_COOKIE } from "@/app/utils/constants";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const raw = Cookies.get(OAUTH_DATA_COOKIE);
      if (!raw) {
        router.replace("/");
        return;
      }

      const oauthData = JSON.parse(raw);
      const client = getBrowserClient();
      const returned = client.auth.parseFromUrl();

      if (returned.error) {
        setError(
          returned.errorDescription || "Login failed. Please try again.",
        );
        return;
      }

      try {
        const tokens = await client.auth.getMemberTokens(
          returned.code,
          returned.state,
          oauthData,
        );
        client.auth.setTokens(tokens);
        persistTokens(client);
        Cookies.remove(OAUTH_DATA_COOKIE, { path: "/" });
        router.replace(oauthData.originalUri || "/");
      } catch (err) {
        console.error("[auth callback]", err);
        setError("Something went wrong logging you in. Please try again.");
      }
    };

    run();
  }, [router]);

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-md mx-auto">
        {error ? (
          <>
            <div className="inline-flex p-6 border border-cyber-pink/20 bg-cyber-pink/5 text-cyber-pink mb-8">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h1 className="font-orbitron font-bold text-xl text-cyber-text mb-3">
              LOGIN FAILED
            </h1>
            <p className="text-cyber-muted text-sm mb-8">{error}</p>
            <Link href="/" className="cyber-btn cyber-btn-primary">
              BACK TO HOME
            </Link>
          </>
        ) : (
          <>
            <div className="inline-flex p-6 border border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan mb-8">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
            <h1 className="font-orbitron font-bold text-xl text-cyber-text mb-3">
              SIGNING YOU IN
            </h1>
            <p className="text-cyber-muted text-sm">One moment...</p>
          </>
        )}
      </div>
    </div>
  );
}
