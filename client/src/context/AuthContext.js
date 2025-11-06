
import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('authUser');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('authUser', JSON.stringify(user));
    else localStorage.removeItem('authUser');
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => {
    // Clear seen flag so animated auth shows again for this user
    try { localStorage.removeItem('seenAnimatedLogin'); } catch (e) {}
    setUser(null);
  };

  const register = async ({ fullName, email, password, role }) => {
    const data = await authService.register({ fullName, email, password, role });
    setUser(data);
    return data;
  };

  const loginWithEmail = async ({ email, password }) => {
    const data = await authService.login({ email, password });
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loginWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
