"use client";

import { useState } from "react";
import { GMS, GAMES, GM } from "@/lib/data";
import GMModal from "@/components/GMModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRequireAuth } from "@/lib/useRequireAuth";

export default function GameMastersPage() {
  const { ready, user } = useRequireAuth();
  const [selectedGM, setSelectedGM] = useState<GM | null>(null);

  if (!ready || !user) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Game Masters</h1>
          <p className="text-zinc-500 text-base">
            Professional GMs running games across every system. Every GM is reviewed by real players.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GMS.map((gm) => {
            const upcomingCount = GAMES.filter((g) => g.gm.id === gm.id && g.seatsAvailable > 0).length;

            return (
              <button
                key={gm.id}
                onClick={() => setSelectedGM(gm)}
                className="group bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 text-left hover:shadow-md hover:border-zinc-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 font-bold text-base flex items-center justify-center shrink-0">
                    {gm.avatar}
                  </div>
                  <div>
                    <h2 className="font-bold text-zinc-900 text-base leading-tight group-hover:text-indigo-700 transition-colors">
                      {gm.name}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">{gm.pronouns}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-amber-400 text-xs">{"★".repeat(Math.round(gm.rating))}</span>
                      <span className="text-xs text-zinc-400">{gm.rating} · {gm.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                  {gm.bio.split("\n\n")[0]}
                </p>

                {/* Identity tags (first 2) */}
                <div className="flex flex-wrap gap-1.5">
                  {gm.identityTags.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-zinc-50 rounded-xl p-3 text-center">
                    <p className="text-base font-bold text-zinc-900">${gm.pricePerSession}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">per session</p>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-3 text-center">
                    <p className="text-base font-bold text-zinc-900">{gm.gamesHosted.toLocaleString()}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">games hosted</p>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-3 text-center">
                    <p className="text-base font-bold text-zinc-900">{gm.yearsExperience}y</p>
                    <p className="text-xs text-zinc-400 mt-0.5">experience</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                  <span className="text-xs text-zinc-500">
                    {upcomingCount > 0 ? (
                      <span className="font-semibold text-emerald-600">
                        {upcomingCount} open game{upcomingCount !== 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-zinc-400">No open seats right now</span>
                    )}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 group-hover:underline">
                    View profile →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <Footer />

      {selectedGM && (
        <GMModal gm={selectedGM} onClose={() => setSelectedGM(null)} />
      )}
    </div>
  );
}
