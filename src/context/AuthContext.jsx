import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("portfolio_auth_token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("portfolio_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem("portfolio_user", JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn("Session expired or invalid token:", err);
          logout();
        }
      }
      setIsLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const res = await authApi.login(username, password);
      if (res.success && res.token) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem("portfolio_auth_token", res.token);
        localStorage.setItem("portfolio_user", JSON.stringify(res.user));
        return { success: true, message: res.message || "Logged in successfully!" };
      }
      return { success: false, message: res.message || "Login failed" };
    } catch (err) {
      const message = err.response?.data?.message || "Invalid username or password";
      return { success: false, message };
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("portfolio_auth_token");
    localStorage.removeItem("portfolio_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
