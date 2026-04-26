import { supabase } from "./supabase";

export interface User {
  id: string;
  name: string;
  email: string;
}

export async function signIn(
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { user: null, error: error.message };
  const u = data.user;
  return {
    user: { id: u.id, name: u.user_metadata?.name ?? u.email ?? "", email: u.email! },
    error: null,
  };
}

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null; needsEmailConfirmation?: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) return { user: null, error: error.message };
  if (!data.user) return { user: null, error: "Signup failed." };
  return {
    user: { id: data.user.id, name, email: data.user.email! },
    error: null,
    needsEmailConfirmation: !data.session,
  };
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
