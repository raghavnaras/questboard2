"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useRequireAuth } from "@/lib/useRequireAuth";

const BENEFITS = [
  {
    icon: "🎲",
    title: "Pro GMs, Vetted & Rated",
    body: "Every Game Master on QuestBoard is reviewed by real players. Browse ratings, read bios, and book with confidence.",
  },
  {
    icon: "📅",
    title: "Fit Your Schedule",
    body: "Games run morning to midnight across every timezone. One-shots, ongoing campaigns, weekends — find a table that actually works for you.",
  },
  {
    icon: "🌍",
    title: "Play Anywhere",
    body: "All games run online via your favourite virtual tabletop — Roll20, Foundry, Owlbear, or just a video call. No commute required.",
  },
  {
    icon: "🧙",
    title: "Every System, Every Style",
    body: "D&D 5e, Pathfinder, Call of Cthulhu, Blades in the Dark, and dozens more. Beginners and veterans both welcome.",
  },
  {
    icon: "🪑",
    title: "Jump In Solo",
    body: "No need to round up a full group yourself. Join an open seat at an existing table and meet fellow adventurers.",
  },
  {
    icon: "💬",
    title: "Session Zero Included",
    body: "Most GMs offer a free pre-game session to align on tone, safety tools, and character concepts before the dice hit the table.",
  },
];

const SYSTEMS = ["D&D 5e", "Pathfinder 2e", "Call of Cthulhu", "Blades in the Dark", "Vampire: the Masquerade", "Starfinder", "Shadowrun", "Mothership"];

export default function Home() {
  const { ready, user } = useRequireAuth();

  if (!ready || !user) return null;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <p className="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-4">
            The Tabletop RPG Marketplace
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-zinc-900 leading-tight tracking-tight mb-6">
            Find your table.<br />Roll with the best.
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            QuestBoard is the largest online platform for players to find tabletop roleplaying games
            and professional GMs for any game system and any virtual tabletop.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/games"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Find Games
            </Link>
            <Link
              href="/game-masters"
              className="inline-block bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg border border-zinc-200 transition-all"
            >
              Find Game Masters
            </Link>
          </div>
          <p className="mt-4 text-sm text-zinc-400">No account needed to browse · New games added daily</p>
        </section>

        {/* System chips */}
        <section className="border-y border-zinc-100 bg-zinc-50 py-5">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-2">
            {SYSTEMS.map((s) => (
              <span key={s} className="text-sm bg-white border border-zinc-200 text-zinc-600 font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                {s}
              </span>
            ))}
            <span className="text-sm bg-white border border-zinc-200 text-zinc-400 font-medium px-3.5 py-1.5 rounded-full shadow-sm">
              + dozens more
            </span>
          </div>
        </section>

        {/* What is QuestBoard */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-zinc-900 mb-5">What is QuestBoard?</h2>
            <div className="space-y-4 text-zinc-600 text-base leading-relaxed">
              <p>
                QuestBoard is the largest online platform for players to find tabletop roleplaying games
                and professional GMs for any game system and any virtual tabletop.
              </p>
              <p>
                Are you looking to play D&amp;D online or find a virtual Pathfinder 2e group? We&apos;re
                part D&amp;D group finder (amongst many other games) and part games marketplace — connecting
                players with the tables they&apos;ve been searching for.
              </p>
              <p>
                Our professional Game Masters are running games all over the world. Find a game that
                works for you and your schedule, whether you&apos;re a first-time adventurer or a grizzled
                veteran of a hundred campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits grid */}
        <section className="bg-zinc-50 border-t border-zinc-100 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-zinc-900 mb-10 text-center">Why QuestBoard?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map(({ icon, title, body }) => (
                <div key={title} className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                  <span className="text-3xl block mb-3">{icon}</span>
                  <h3 className="font-bold text-zinc-900 mb-2">{title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Ready to roll?</h2>
          <p className="text-zinc-500 mb-8 text-base">Hundreds of open seats across dozens of games. Your next adventure is one click away.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/games"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Find Games
            </Link>
            <Link
              href="/game-masters"
              className="inline-block bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg border border-zinc-200 transition-all"
            >
              Find Game Masters
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-100 py-8">
        <p className="text-center text-sm text-zinc-400">© 2026 QuestBoard · The Tabletop RPG Marketplace</p>
      </footer>
    </div>
  );
}
