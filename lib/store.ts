"use client";

import { useState, useCallback } from "react";
import { GAMES, Game } from "./data";

export function useGameStore() {
  const [games, setGames] = useState<Game[]>(GAMES);
  const [joinedGameIds, setJoinedGameIds] = useState<Set<string>>(new Set());

  const joinGame = useCallback((gameId: string) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === gameId && g.seatsAvailable > 0
          ? { ...g, seatsAvailable: g.seatsAvailable - 1 }
          : g
      )
    );
    setJoinedGameIds((prev) => new Set(prev).add(gameId));
  }, []);

  const myGames = games.filter((g) => joinedGameIds.has(g.id));

  return { games, joinedGameIds, joinGame, myGames };
}
