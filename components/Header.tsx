"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getInitials } from "@/lib/auth";

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl">⚔️</span>
          <span className="font-bold text-zinc-900 text-lg tracking-tight">QuestBoard</span>
        </Link>

        <nav className="flex items-center gap-5">
          <Link href="/game-masters" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors hidden sm:block">
            Game Masters
          </Link>
          <Link href="/games" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            Browse Games
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2.5 focus:outline-none group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-zinc-900 leading-tight">{user.name}</p>
                  <p className="text-xs text-zinc-400">Player</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center ring-2 ring-transparent group-hover:ring-indigo-300 transition-all">
                  {getInitials(user.name)}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-zinc-200 shadow-lg py-1 overflow-hidden">
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="text-sm font-semibold text-zinc-900 truncate">{user.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
