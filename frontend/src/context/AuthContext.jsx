import React, { createContext, useState, useEffect, useContext } from "react";

import { API_URL } from "../config/api";

const TOKEN_KEY = "invikt_token";
const REMEMBER_KEY = "invikt_remember";

// ─── Helper: get token from correct storage ──────────────────────────────────
const getStoredToken = () => {
  // Check localStorage first (remember me), then sessionStorage (session only)
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
};

const storeToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REMEMBER_KEY, "true");
    sessionStorage.removeItem(TOKEN_KEY);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(true);
  const [isRemembered, setIsRemembered] = useState(
    localStorage.getItem(REMEMBER_KEY) === "true"
  );

  // On mount: verify stored token is still valid with the backend
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = getStoredToken();
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const json = await res.json();
        if (json.success) {
          setUser(json.user);
          setToken(storedToken);
        } else {
          // Token invalid/expired — clear everything
          clearToken();
          setToken(null);
          setUser(null);
        }
      } catch {
        // Network error — don't clear token, user might just be offline
        clearToken();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  // ─── Register ─────────────────────────────────────────────────────────────
  const register = async (firstName, lastName, username, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });
    const json = await res.json();
    if (json.success) {
      // Do not auto-login. The user will be redirected to the sign in page.
    }
    return json;
  };

  // ─── Login ────────────────────────────────────────────────────────────────
  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const json = await res.json();
      if (json.success) {
        // rememberMe=true → localStorage (persists after browser close)
        // rememberMe=false → sessionStorage (cleared when tab/browser closed)
        storeToken(json.token, rememberMe);
        setToken(json.token);
        setUser(json.user);
        setIsRemembered(rememberMe);
      }
      return json;
    } catch (err) {
      return { success: false, error: "Could not connect to server." };
    }
  };

  // ─── Logout ───────────────────────────────────────────────────────────────
  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
    setIsRemembered(false);
  };

  // ─── Auth headers helper for API calls ────────────────────────────────────
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isRemembered,
        register,
        login,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Custom hook ─────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export default AuthContext;
