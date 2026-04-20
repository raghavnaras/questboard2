export interface User {
  name: string;
  email: string;
}

const CURRENT_USER_KEY = "questboard:currentUser";
const ACCOUNTS_KEY = "questboard:accounts";

const SEED: User & { password: string } = {
  name: "Alex Rivera",
  email: "alex@test.com",
  password: "password",
};

function getAccounts(): Array<User & { password: string }> {
  if (typeof window === "undefined") return [SEED];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const stored = raw ? JSON.parse(raw) : [];
    const hasSeed = stored.some((a: { email: string }) => a.email === SEED.email);
    return hasSeed ? stored : [SEED, ...stored];
  } catch {
    return [SEED];
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function signIn(email: string, password: string): User | null {
  const match = getAccounts().find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );
  if (!match) return null;
  const user: User = { name: match.name, email: match.email };
  setCurrentUser(user);
  return user;
}

export function signUp(name: string, email: string, password: string): User | null {
  const accounts = getAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) return null;
  const newAccount = { name, email, password };
  const filtered = accounts.filter((a) => a.email !== SEED.email);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...filtered, newAccount]));
  const user: User = { name, email };
  setCurrentUser(user);
  return user;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
