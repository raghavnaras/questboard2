"use client";

import { useState, useCallback, useEffect } from "react";
import { Game } from "./data";

const REGISTRATIONS_KEY = "questboard:registrations";
const SEAT_COUNTS_KEY = "questboard:seatCounts";

function loadRegistrations(): Set<string> {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function loadSeatCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(SEAT_COUNTS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function saveRegistrations(ids: Set<string>) {
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([...ids]));
}

function saveSeatCounts(counts: Record<string, number>) {
  localStorage.setItem(SEAT_COUNTS_KEY, JSON.stringify(counts));
}

function buildGames(seatCounts: Record<string, number>, baseGames: Game[]): Game[] {
  return baseGames.map((g) =>
    g.id in seatCounts ? { ...g, seatsAvailable: seatCounts[g.id] } : g
  );
}

export function useGameStore(initialGames: Game[]) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [joinedGameIds, setJoinedGameIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Read localStorage once on mount
  useEffect(() => {
    const registrations = loadRegistrations();
    const seatCounts = loadSeatCounts();
    setJoinedGameIds(registrations);
    setGames(buildGames(seatCounts, initialGames));
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinGame = useCallback((gameId: string) => {
    setGames((prev) => {
      const next = prev.map((g) =>
        g.id === gameId && g.seatsAvailable > 0
          ? { ...g, seatsAvailable: g.seatsAvailable - 1 }
          : g
      );
      const counts: Record<string, number> = {};
      next.forEach((g) => { counts[g.id] = g.seatsAvailable; });
      saveSeatCounts(counts);
      return next;
    });

    setJoinedGameIds((prev) => {
      const next = new Set(prev).add(gameId);
      saveRegistrations(next);
      return next;
    });
  }, []);

  const myGames = games.filter((g) => joinedGameIds.has(g.id));

  return { games, joinedGameIds, joinGame, myGames, hydrated };
}
