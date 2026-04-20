"use client";

import { GAMES } from "@/lib/data";

const SYSTEMS = Array.from(new Set(GAMES.map((g) => g.system))).sort();

const SEAT_OPTIONS = [
  { label: "Any Seats", value: 0 },
  { label: "1+ Open", value: 1 },
  { label: "2+ Open", value: 2 },
  { label: "3+ Open", value: 3 },
];

interface Props {
  systemFilter: string | null;
  seatsFilter: number;
  onSystemChange: (s: string | null) => void;
  onSeatsChange: (n: number) => void;
}

export default function FilterBar({ systemFilter, seatsFilter, onSystemChange, onSeatsChange }: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
      <span className="text-sm font-semibold text-zinc-500 mr-1">Filter:</span>

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
        {SYSTEMS.map((sys) => (
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
  );
}
