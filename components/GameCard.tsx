"use client";

import { Game } from "@/lib/data";

const SYSTEM_COLORS: Record<string, string> = {
  "D&D 5e": "bg-red-100 text-red-700",
  "Pathfinder 2e": "bg-amber-100 text-amber-700",
  "Pathfinder 1e": "bg-orange-100 text-orange-700",
  "Call of Cthulhu": "bg-green-100 text-green-700",
  "Blades in the Dark": "bg-zinc-800 text-zinc-100",
  "Vampire: The Masquerade": "bg-rose-900 text-rose-100",
  "Starfinder": "bg-blue-100 text-blue-700",
  "Mothership": "bg-slate-800 text-slate-100",
  "Cyberpunk Red": "bg-yellow-100 text-yellow-800",
  "Deadlands": "bg-stone-200 text-stone-800",
  "Hunter: The Reckoning": "bg-purple-100 text-purple-700",
  "Lancer": "bg-cyan-100 text-cyan-700",
  "Old-School Essentials": "bg-lime-100 text-lime-800",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

interface Props {
  game: Game;
  joined: boolean;
  onClick: () => void;
}

export default function GameCard({ game, joined, onClick }: Props) {
  const systemColor = SYSTEM_COLORS[game.system] ?? "bg-purple-100 text-purple-700";
  const seatsLeft = game.seatsAvailable;
  const seatsColor =
    seatsLeft === 0
      ? "text-red-500"
      : seatsLeft === 1
      ? "text-amber-500"
      : "text-emerald-600";

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${systemColor}`}>
            {game.system}
          </span>
          {joined && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 shrink-0">
              Joined ✓
            </span>
          )}
        </div>

        <h3 className="font-bold text-zinc-900 text-base leading-snug mb-1 group-hover:text-indigo-700 transition-colors">
          {game.title}
        </h3>
        <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{game.shortDescription}</p>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
            {game.gm.avatar}
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-800">{game.gm.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-xs">{"★".repeat(Math.round(game.gm.rating))}</span>
              <span className="text-xs text-zinc-400">{game.gm.rating} ({game.gm.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600">
          <div className="flex items-center gap-1.5">
            <span>📅</span>
            <span>{formatDate(game.dateTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🕐</span>
            <span>{formatTime(game.dateTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>⏱</span>
            <span>{game.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>💰</span>
            <span className="font-medium text-zinc-800">${game.pricePerSession}/session</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
          <span className={`text-xs font-semibold ${seatsColor}`}>
            {seatsLeft === 0
              ? "Full"
              : `${seatsLeft} seat${seatsLeft !== 1 ? "s" : ""} left`}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: game.totalSeats }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < game.totalSeats - game.seatsAvailable
                    ? "bg-zinc-300"
                    : "bg-emerald-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
