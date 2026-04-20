"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { Game, GMS } from "@/lib/data";
import GameCard from "@/components/GameCard";
import GameModal from "@/components/GameModal";
import FilterBar from "@/components/FilterBar";
import MyGames from "@/components/MyGames";
import Header from "@/components/Header";
import { useRequireAuth } from "@/lib/useRequireAuth";


export default function GamesPage() {
  return (
    <Suspense>
      <GamesPageInner />
    </Suspense>
  );
}

function GamesPageInner() {
  const { ready, user } = useRequireAuth();
  const { games, joinedGameIds, joinGame, myGames, hydrated } = useGameStore();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [systemFilter, setSystemFilter] = useState<string | null>(null);
  const [seatsFilter, setSeatsFilter] = useState(0);

  const searchParams = useSearchParams();
  const gmFilter = searchParams.get("gm");
  const activeGM = gmFilter ? GMS.find((g) => g.id === gmFilter) ?? null : null;

  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      if (gmFilter && g.gm.id !== gmFilter) return false;
      if (systemFilter && g.system !== systemFilter) return false;
      if (seatsFilter > 0 && g.seatsAvailable < seatsFilter) return false;
      return true;
    });
  }, [games, gmFilter, systemFilter, seatsFilter]);

  function handleJoin() {
    if (!selectedGame) return;
    joinGame(selectedGame.id);
  }

  const currentSelectedGame = selectedGame
    ? games.find((g) => g.id === selectedGame.id) ?? null
    : null;

  if (!ready || !user || !hydrated) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-1">
            Welcome back, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-zinc-500 text-base">
            Find your next adventure. {games.filter((g) => g.seatsAvailable > 0).length} games with open seats.
          </p>
        </div>

        <MyGames games={myGames} onOpen={setSelectedGame} />

        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-lg font-bold text-zinc-900">
              {activeGM ? `Games by ${activeGM.name}` : "Upcoming Games"}
            </h2>
            {activeGM && (
              <Link
                href="/games"
                className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition-colors"
              >
                <span>✕</span>
                <span>Clear filter</span>
              </Link>
            )}
          </div>
          <FilterBar
            systemFilter={systemFilter}
            seatsFilter={seatsFilter}
            onSystemChange={setSystemFilter}
            onSeatsChange={setSeatsFilter}
          />
        </section>


        {filteredGames.length === 0 ? (
          <div className="text-center py-16 text-zinc-400">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="font-semibold text-zinc-600">No games match your filters</p>
            <p className="text-sm mt-1">Try adjusting the system or seat filters above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                joined={joinedGameIds.has(game.id)}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>
        )}
      </main>

      {currentSelectedGame && (
        <GameModal
          game={currentSelectedGame}
          joined={joinedGameIds.has(currentSelectedGame.id)}
          onJoin={handleJoin}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
}
