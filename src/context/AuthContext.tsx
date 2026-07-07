"use client";
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authApi } from '../services/api';

// ── Types ────────────────────────────────────────────────────
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ email: string }>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ── Context ──────────────────────────────────────────────────
export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = useCallback(async () => {
    try {
      // Tell the server to clear the HttpOnly cookie
      await authApi.logout();
    } catch {
      // Ignore errors — cookie will expire naturally
    } finally {
      localStorage.removeItem('gift_admin_user');
      localStorage.removeItem('gift_admin_last_activity');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Server sets HttpOnly cookie — we only store the non-sensitive email
    const { data } = await authApi.login(credentials);
    localStorage.setItem('gift_admin_user', data.email);
    localStorage.setItem('gift_admin_last_activity', Date.now().toString());
    setUser(data.email);
    setIsAuthenticated(true);
    return data as { email: string };
  };

  // On every page load, verify the session with the server.
  // The HttpOnly cookie is sent automatically by the browser.
  // JavaScript never reads the token.
  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await authApi.verify();
        setUser(data.email);
        setIsAuthenticated(true);
        localStorage.setItem('gift_admin_user', data.email);
      } catch {
        // 401 from server → not authenticated
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('gift_admin_user');
        localStorage.removeItem('gift_admin_last_activity');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const value: AuthContextValue = { user, isAuthenticated, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

