"use client";

import { useEffect } from "react";
import Link from "next/link";
import { GM, GAMES } from "@/lib/data";

const TIMEZONE_LABELS: Record<string, string> = {
  "America/New_York": "Eastern (ET)",
  "America/Chicago": "Central (CT)",
  "America/Denver": "Mountain (MT)",
  "America/Los_Angeles": "Pacific (PT)",
  "Europe/Dublin": "Irish (IST)",
};

const SOCIAL_ICONS: Record<string, { label: string; icon: string }> = {
  twitch: { label: "Twitch", icon: "🎮" },
  youtube: { label: "YouTube", icon: "▶️" },
  twitter: { label: "Twitter / X", icon: "𝕏" },
  instagram: { label: "Instagram", icon: "📸" },
};

interface Props {
  gm: GM;
  onClose: () => void;
}

function TagPill({ label, color = "zinc" }: { label: string; color?: string }) {
  const styles: Record<string, string> = {
    zinc: "bg-zinc-100 text-zinc-600",
    indigo: "bg-indigo-100 text-indigo-700",
    amber: "bg-amber-100 text-amber-700",
    emerald: "bg-emerald-100 text-emerald-700",
    rose: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[color] ?? styles.zinc}`}>
      {label}
    </span>
  );
}

export default function GMModal({ gm, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const gmGames = GAMES.filter((g) => g.gm.id === gm.id);
  const openGames = gmGames.filter((g) => g.seatsAvailable > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-zinc-100 px-6 pt-5 pb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg flex items-center justify-center shrink-0">
              {gm.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 leading-tight">{gm.name}</h2>
              <p className="text-sm text-zinc-400">{gm.pronouns}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-amber-400 text-sm">{"★".repeat(Math.round(gm.rating))}</span>
                <span className="text-sm font-semibold text-zinc-700">{gm.rating}</span>
                <span className="text-sm text-zinc-400">({gm.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 space-y-7">

          {/* Identity tags */}
          <div className="flex flex-wrap gap-2">
            {gm.identityTags.map((t) => (
              <TagPill key={t} label={t} color="indigo" />
            ))}
          </div>

          {/* At a glance */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">At a Glance</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: gm.gamesHosted.toLocaleString(), label: "Games Hosted" },
                { value: `${gm.yearsOnPlatform}y`, label: "On QuestBoard" },
                { value: gm.responseTime, label: "Avg Response" },
                { value: gm.responseRate, label: "Response Rate" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-zinc-50 rounded-xl p-3 text-center">
                  <p className="text-base font-bold text-zinc-900">{value}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price + meta */}
          <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
            <span>💰 <strong className="text-zinc-900">${gm.pricePerSession}</strong> per session</span>
            <span>🌍 {TIMEZONE_LABELS[gm.timezone] ?? gm.timezone}</span>
            <span>🗣 {gm.languages.join(", ")}</span>
            <span>⏱ {gm.yearsExperience} years experience</span>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">About</h3>
            <div className="space-y-3">
              {gm.bio.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-zinc-600 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Known For</h3>
            <div className="flex flex-wrap gap-2">
              {gm.highlights.map((h) => (
                <TagPill key={h} label={h} color="amber" />
              ))}
            </div>
          </div>

          {/* Systems / Themes / Platforms */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { heading: "Systems", items: gm.systems, color: "indigo" as const },
              { heading: "Themes", items: gm.themes, color: "emerald" as const },
              { heading: "Platforms", items: gm.platforms, color: "zinc" as const },
            ].map(({ heading, items, color }) => (
              <div key={heading}>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">{heading}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <TagPill key={item} label={item} color={color} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Open games */}
          {openGames.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                Open Games ({openGames.length})
              </h3>
              <div className="space-y-2">
                {openGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between gap-3 bg-zinc-50 rounded-xl px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 truncate">{game.title}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {new Date(game.dateTime).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                        {" · "}{game.seatsAvailable} seat{game.seatsAvailable !== 1 ? "s" : ""} left
                        {" · "}${game.pricePerSession}/session
                      </p>
                    </div>
                    <span className="text-xs bg-white border border-zinc-200 text-zinc-600 font-medium px-2.5 py-1 rounded-full shrink-0">
                      {game.system}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social */}
          {Object.keys(gm.social).length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Social</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(gm.social).map(([platform, handle]) => {
                  const meta = SOCIAL_ICONS[platform];
                  return (
                    <span key={platform} className="flex items-center gap-1.5 text-sm bg-zinc-100 text-zinc-700 font-medium px-3 py-1.5 rounded-full">
                      <span>{meta?.icon}</span>
                      <span>{handle}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white border-t border-zinc-100 px-6 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            {openGames.length > 0
              ? <><span className="font-semibold text-emerald-600">{openGames.length} game{openGames.length !== 1 ? "s" : ""}</span> with open seats</>
              : "No open seats right now"}
          </p>
          <Link
            href={`/games?gm=${gm.id}`}
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
          >
            See All Games →
          </Link>
        </div>
      </div>
    </div>
  );
}
