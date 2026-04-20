"use client";

import { useEffect } from "react";
import { Game } from "@/lib/data";

const SYSTEM_COLORS: Record<string, string> = {
  "D&D 5e": "bg-red-100 text-red-700",
  "Pathfinder 2e": "bg-amber-100 text-amber-700",
  "Call of Cthulhu": "bg-green-100 text-green-700",
  "Blades in the Dark": "bg-zinc-800 text-zinc-100",
  "Vampire: the Masquerade": "bg-rose-900 text-rose-100",
  "Starfinder": "bg-blue-100 text-blue-700",
  "Mothership": "bg-slate-800 text-slate-100",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

interface Props {
  game: Game;
  joined: boolean;
  onJoin: () => void;
  onClose: () => void;
}

export default function GameModal({ game, joined, onJoin, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const systemColor = SYSTEM_COLORS[game.system] ?? "bg-purple-100 text-purple-700";
  const seatsLeft = game.seatsAvailable;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-zinc-100 px-6 pt-5 pb-4 flex items-start justify-between gap-4 z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${systemColor}`}>
                {game.system}
              </span>
              {joined && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                  Joined ✓
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-zinc-900 leading-snug">{game.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📅", label: "Date & Time", value: formatDateTime(game.dateTime) },
              { icon: "⏱", label: "Duration", value: game.duration },
              { icon: "💰", label: "Price", value: `$${game.pricePerSession} per session` },
              {
                icon: "🪑",
                label: "Seats",
                value:
                  seatsLeft === 0
                    ? "Full"
                    : `${seatsLeft} of ${game.totalSeats} available`,
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-zinc-50 rounded-xl p-3">
                <p className="text-lg mb-0.5">{icon}</p>
                <p className="text-xs text-zinc-500 font-medium">{label}</p>
                <p className="text-sm font-semibold text-zinc-800 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Full description */}
          <div>
            <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wide mb-2">About This Game</h3>
            <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
              {game.fullDescription.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span key={tag} className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* GM Bio */}
          <div className="bg-indigo-50 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wide mb-3">Your Game Master</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-200 text-indigo-800 font-bold text-sm flex items-center justify-center shrink-0">
                {game.gm.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-zinc-900">{game.gm.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-sm">{"★".repeat(Math.round(game.gm.rating))}</span>
                    <span className="text-sm text-zinc-500">
                      {game.gm.rating} · {game.gm.reviewCount} reviews
                    </span>
                  </div>
                </div>
                <p className="text-xs text-indigo-700 font-medium mt-0.5 mb-2">
                  {game.gm.yearsExperience} years experience
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">{game.gm.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / CTA */}
        <div className="sticky bottom-0 bg-white border-t border-zinc-100 px-6 py-4 flex items-center justify-between gap-4">
          <div className="text-sm text-zinc-500">
            {seatsLeft > 0 ? (
              <span>
                Only <strong className="text-zinc-800">{seatsLeft} seat{seatsLeft !== 1 ? "s" : ""}</strong> remaining
              </span>
            ) : (
              <span className="text-red-500 font-medium">This game is full</span>
            )}
          </div>
          {joined ? (
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
              <span className="text-lg">🎲</span>
              You&apos;re in!
            </div>
          ) : (
            <button
              onClick={() => { onJoin(); }}
              disabled={seatsLeft === 0}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              {seatsLeft === 0 ? "Game Full" : "Join Game"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
