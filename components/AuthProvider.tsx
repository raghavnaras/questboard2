"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSupabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User } from "@/lib/auth";

interface AuthContextValue {
  user: User | null;
  ready: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  ready: false,
  signOut: async () => {},
});

function toUser(u: SupabaseUser | null | undefined): User | null {
  if (!u) return null;
  return {
    id: u.id,
    name: u.user_metadata?.name ?? u.email ?? "",
    email: u.email!,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getSupabase().auth.getSession().then(({ data }) => {
      setUser(toUser(data.session?.user));
      setReady(true);
    });

    const {
      data: { subscription },
    } = getSupabase().auth.onAuthStateChange((_event, session) => {
      setUser(toUser(session?.user));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        signOut: () => getSupabase().auth.signOut().then(() => {}),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
