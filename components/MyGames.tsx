"use client";

import { Game } from "@/lib/data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

interface Props {
  games: Game[];
  onOpen: (game: Game) => void;
}

export default function MyGames({ games, onOpen }: Props) {
  if (games.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎲</span>
        <h2 className="text-lg font-bold text-zinc-900">My Games</h2>
        <span className="text-sm bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
          {games.length}
        </span>
      </div>
      <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onOpen(game)}
            className="w-full text-left px-5 py-4 hover:bg-indigo-50 transition-colors flex items-center justify-between gap-4 group"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-zinc-900 text-sm truncate group-hover:text-indigo-700 transition-colors">
                {game.title}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {game.gm.name} · {formatDate(game.dateTime)} · ${game.pricePerSession}/session
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 shrink-0">
              {game.system}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
