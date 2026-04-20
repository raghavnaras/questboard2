import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/startplaying", icon: "📸" },
  { label: "Facebook", href: "https://www.facebook.com/StartPlaying/", icon: "📘" },
  { label: "TikTok", href: "https://www.tiktok.com/@startplaying", icon: "🎵" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/startplaying", icon: "💼" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span>⚔️</span>
              <span className="font-bold text-zinc-900 tracking-tight">QuestBoard</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The largest online marketplace for tabletop RPG players and professional Game Masters.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Explore</p>
            <ul className="space-y-2">
              {[
                { label: "Browse Games", href: "/games" },
                { label: "Game Masters", href: "/game-masters" },
                { label: "Sign Up", href: "/signup" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Company</p>
            <ul className="space-y-2">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Follow Us</p>
            <ul className="space-y-2">
              {SOCIALS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">© 2026 QuestBoard · The Tabletop RPG Marketplace</p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-lg hover:scale-110 transition-transform"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
