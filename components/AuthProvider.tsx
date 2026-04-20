"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User, getCurrentUser, clearCurrentUser } from "@/lib/auth";

interface AuthContextValue {
  user: User | null;
  ready: boolean;
  refresh: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  ready: false,
  refresh: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setUser(getCurrentUser());
  }, []);

  const signOut = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  useEffect(() => {
    setUser(getCurrentUser());
    setReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, refresh, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
