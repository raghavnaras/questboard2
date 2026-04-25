"use client";

import { GAME_CATEGORIES, GameCategory, CATEGORY_STYLES } from "@/lib/data";

const SEAT_OPTIONS = [
  { label: "Any Seats", value: 0 },
  { label: "1+ Open", value: 1 },
  { label: "2+ Open", value: 2 },
  { label: "3+ Open", value: 3 },
];

interface Props {
  systems: string[];
  systemFilter: string | null;
  seatsFilter: number;
  categoryFilter: GameCategory | null;
  onSystemChange: (s: string | null) => void;
  onSeatsChange: (n: number) => void;
  onCategoryChange: (c: GameCategory | null) => void;
}

export default function FilterBar({
  systems,
  systemFilter,
  seatsFilter,
  categoryFilter,
  onSystemChange,
  onSeatsChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-3">
      {/* Category row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-zinc-500 mr-1">Type:</span>
        <button
          onClick={() => onCategoryChange(null)}
          className={`text-sm px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
            categoryFilter === null
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
          }`}
        >
          All Types
        </button>
        {GAME_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(categoryFilter === cat ? null : cat)}
            className={`text-sm px-3.5 py-1.5 rounded-full border font-medium transition-colors flex items-center gap-1.5 ${
              categoryFilter === cat
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <span aria-hidden>{CATEGORY_STYLES[cat].emoji}</span>
            <span>{cat}</span>
          </button>
        ))}
      </div>

      <div className="h-px bg-zinc-100" />

      {/* System + seats row */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-semibold text-zinc-500 mr-1">System:</span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onSystemChange(null)}
            className={`text-sm px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
              systemFilter === null
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            All Systems
          </button>
          {systems.map((sys) => (
            <button
              key={sys}
              onClick={() => onSystemChange(systemFilter === sys ? null : sys)}
              className={`text-sm px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
                systemFilter === sys
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {sys}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-zinc-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          {SEAT_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onSeatsChange(value)}
              className={`text-sm px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
                seatsFilter === value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
