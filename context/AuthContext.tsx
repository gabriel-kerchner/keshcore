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
import { getBrowserClient, clearTokens, getSiteUrl } from "@/lib/wix-client";
import { OAUTH_DATA_COOKIE } from "@/app/utils/constants";

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getBrowserClient().auth.loggedIn());
  }, []);

  const login = useCallback(async () => {
    setLoading(true);
    try {
      const client = getBrowserClient();
      const oauthData = client.auth.generateOAuthData(
        `${getSiteUrl()}/auth/callback`,
        window.location.href,
      );
      Cookies.set(OAUTH_DATA_COOKIE, JSON.stringify(oauthData), { path: "/" });
      const { authUrl } = await client.auth.getAuthUrl(oauthData);
      window.location.href = authUrl;
    } catch (err) {
      console.error("[login]", err);
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const client = getBrowserClient();
      const { logoutUrl } = await client.auth.logout(window.location.href);
      clearTokens();
      window.location.href = logoutUrl;
    } catch (err) {
      console.error("[logout]", err);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
