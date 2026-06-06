"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const res = await fetch("/api/auth/me");

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }

    checkUser();
  }, []);

  async function login() {
    await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
    });

    setUser({
      name: "Odose",
      username: "greatestodose",
    });
  }

  async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  setUser(null);
}

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
