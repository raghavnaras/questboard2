import Link from "next/link";
import Footer from "@/components/Footer";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/startplaying", icon: "📸", handle: "@startplaying" },
  { label: "Facebook", href: "https://www.facebook.com/StartPlaying/", icon: "📘", handle: "StartPlaying" },
  { label: "TikTok", href: "https://www.tiktok.com/@startplaying", icon: "🎵", handle: "@startplaying" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/startplaying", icon: "💼", handle: "QuestBoard" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">⚔️</span>
            <span className="font-bold text-zinc-900 text-lg tracking-tight">QuestBoard</span>
          </Link>
          <Link href="/games" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            Browse Games →
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-3">Contact Us</h1>
        <p className="text-zinc-500 text-lg mb-12">We'd love to hear from you — whether you're a player, a GM, or just curious about QuestBoard.</p>

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {[
            { icon: "🎲", title: "Player Support", body: "Questions about joining a game, booking a seat, or finding the right GM? We're here to help.", email: "players@questboard.gg" },
            { icon: "🧙", title: "GM Support", body: "Looking to list your games, manage your profile, or grow your player base? Reach out anytime.", email: "gms@questboard.gg" },
            { icon: "🔒", title: "Trust & Safety", body: "Report a concern, flag inappropriate content, or ask about our community standards.", email: "safety@questboard.gg" },
            { icon: "💼", title: "Business & Press", body: "Partnership opportunities, press enquiries, or media requests — we'd love to connect.", email: "hello@questboard.gg" },
          ].map(({ icon, title, body, email }) => (
            <div key={title} className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6">
              <span className="text-3xl block mb-3">{icon}</span>
              <h2 className="font-bold text-zinc-900 mb-1">{title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-3">{body}</p>
              <a href={`mailto:${email}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                {email}
              </a>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Find us on social media</h2>
          <p className="text-zinc-500 text-sm mb-6">Follow along for new GM spotlights, game announcements, and community highlights.</p>
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map(({ label, href, icon, handle }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 hover:bg-white text-zinc-700 font-medium text-sm px-4 py-2.5 rounded-xl transition-all"
              >
                <span className="text-lg">{icon}</span>
                <span>{handle}</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
