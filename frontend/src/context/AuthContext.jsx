import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from "react";

import { API_URL } from "../config/api";

const TOKEN_KEY = "aspirev_token";
const REFRESH_KEY = "aspirev_refresh";
const REMEMBER_KEY = "aspirev_remember";

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
};

const getStoredRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY) || null;
};

const getIsRemembered = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(REMEMBER_KEY) === "true";
};

const storeTokens = (accessToken, refreshToken, rememberMe) => {
  if (typeof window === "undefined") return;
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(REMEMBER_KEY, "true");
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
  } else {
    sessionStorage.setItem(TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }
};

const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
};

const AuthContext = createContext(null);

const extractTokens = (json) => ({
  accessToken: json.accessToken || json.token || null,
  refreshToken: json.refreshToken || null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(true);
  const [isRemembered, setIsRemembered] = useState(getIsRemembered);
  const refreshTimeoutRef = useRef(null);
  const refreshTokenRef = useRef(getStoredRefreshToken());
  const isRefreshingRef = useRef(false);
  const refreshQueueRef = useRef([]);

  const scheduleRefresh = useCallback((accessToken) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    if (!accessToken) return;

    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const expiresAt = payload.exp * 1000;
      const now = Date.now();
      // Refresh 1 minute before the access token expires (min 30s safety)
      const refreshIn = Math.max(expiresAt - now - 60000, 30000);

      refreshTimeoutRef.current = setTimeout(async () => {
        const currentRefresh = refreshTokenRef.current;
        if (!currentRefresh) return;
        try {
          const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: currentRefresh }),
          });
          const json = await res.json();
          if (json.success) {
            const { accessToken: newAccess, refreshToken: newRefresh } = extractTokens(json);
            const remember = getIsRemembered();
            storeTokens(newAccess, newRefresh, remember);
            refreshTokenRef.current = newRefresh;
            setToken(newAccess);
            if (newAccess) scheduleRefresh(newAccess);
          } else {
            clearTokens();
            refreshTokenRef.current = null;
            setToken(null);
            setUser(null);
          }
        } catch {
          // network error — will retry on next request
        }
      }, refreshIn);
    } catch {
      // malformed token
    }
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = getStoredToken();
      const storedRefresh = getStoredRefreshToken();

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
          refreshTokenRef.current = storedRefresh;
          if (storedToken) scheduleRefresh(storedToken);
        } else if (res.status === 401 && storedRefresh) {
          try {
            const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: storedRefresh }),
            });
            const refreshJson = await refreshRes.json();
            if (refreshJson.success) {
              const { accessToken: newAccess, refreshToken: newRefresh } = extractTokens(refreshJson);
              const remember = getIsRemembered();
              storeTokens(newAccess, newRefresh, remember);
              refreshTokenRef.current = newRefresh;
              setToken(newAccess);
              if (newAccess) scheduleRefresh(newAccess);

              const meRes = await fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${newAccess}` },
              });
              const meJson = await meRes.json();
              if (meJson.success) {
                setUser(meJson.user);
              } else {
                clearTokens();
                refreshTokenRef.current = null;
                setToken(null);
                setUser(null);
              }
            } else {
              clearTokens();
              refreshTokenRef.current = null;
              setToken(null);
              setUser(null);
            }
          } catch {
            clearTokens();
            refreshTokenRef.current = null;
            setToken(null);
            setUser(null);
          }
        } else {
          clearTokens();
          refreshTokenRef.current = null;
          setToken(null);
          setUser(null);
        }
      } catch {
        clearTokens();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();

    return () => {
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, [scheduleRefresh]);

  const register = async (firstName, lastName, username, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });
    const json = await res.json();
    return json;
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const json = await res.json();
      if (json.success) {
        const { accessToken, refreshToken } = extractTokens(json);
        storeTokens(accessToken, refreshToken, rememberMe);
        refreshTokenRef.current = refreshToken;
        setToken(accessToken);
        setUser(json.user);
        setIsRemembered(rememberMe);
        if (accessToken) scheduleRefresh(accessToken);
      }
      return json;
    } catch (err) {
      return { success: false, error: "Could not connect to server." };
    }
  };

  const logout = async () => {
    try {
      const storedRefresh = getStoredRefreshToken();
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ refreshToken: storedRefresh }),
        });
      }
    } catch {
      // proceed with local cleanup regardless
    }

    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    clearTokens();
    refreshTokenRef.current = null;
    setToken(null);
    setUser(null);
    setIsRemembered(false);
  };

  const getAuthHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const doRefresh = useCallback(async () => {
    const currentRefresh = refreshTokenRef.current;
    if (!currentRefresh) throw new Error("No refresh token");
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: currentRefresh }),
    });
    const json = await res.json();
    if (!json.success) throw new Error("Refresh failed");
    const { accessToken: newAccess, refreshToken: newRefresh } = extractTokens(json);
    const remember = getIsRemembered();
    storeTokens(newAccess, newRefresh, remember);
    refreshTokenRef.current = newRefresh;
    setToken(newAccess);
    if (newAccess) scheduleRefresh(newAccess);
    return newAccess;
  }, [scheduleRefresh]);

  const authFetch = useCallback(async (url, options = {}) => {
    const currentToken = token;
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${currentToken}`,
    };

    let res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
      if (isRefreshingRef.current) {
        // Wait for the in-flight refresh to finish
        const newToken = await new Promise((resolve, reject) => {
          refreshQueueRef.current.push({ resolve, reject });
        });
        const retryHeaders = { ...options.headers, Authorization: `Bearer ${newToken}` };
        return fetch(url, { ...options, headers: retryHeaders });
      }

      isRefreshingRef.current = true;
      try {
        const newAccessToken = await doRefresh();
        // Resolve all queued requests
        refreshQueueRef.current.forEach(({ resolve }) => resolve(newAccessToken));
        refreshQueueRef.current = [];
        const retryHeaders = { ...options.headers, Authorization: `Bearer ${newAccessToken}` };
        res = await fetch(url, { ...options, headers: retryHeaders });
      } catch (refreshErr) {
        refreshQueueRef.current.forEach(({ reject }) => reject(refreshErr));
        refreshQueueRef.current = [];
        clearTokens();
        refreshTokenRef.current = null;
        setToken(null);
        setUser(null);
        throw refreshErr;
      } finally {
        isRefreshingRef.current = false;
      }
    }

    return res;
  }, [token, doRefresh]);

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...updatedFields };
    });
  };

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
        authFetch,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export default AuthContext;
