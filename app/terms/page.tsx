import Link from "next/link";
import Footer from "@/components/Footer";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-zinc-900 mb-3">{title}</h2>
      <div className="text-sm text-zinc-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">⚔️</span>
            <span className="font-bold text-zinc-900 text-lg tracking-tight">QuestBoard</span>
          </Link>
          <Link href="/privacy" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
            Privacy Policy →
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <p className="text-sm text-zinc-400 mb-2">Last updated: April 20, 2026</p>
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-3">Terms of Service</h1>
        <p className="text-zinc-500 text-lg mb-12">By using QuestBoard, you agree to these terms. Please read them carefully.</p>

        <Section title="1. Acceptance of Terms">
          <p>By creating an account or using QuestBoard in any way, you agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>. If you do not agree, do not use the platform.</p>
        </Section>

        <Section title="2. Eligibility">
          <p>You must be at least 18 years old to create an account and book sessions on QuestBoard. By using the platform, you represent that you meet this requirement.</p>
        </Section>

        <Section title="3. Player Responsibilities">
          <p>Players agree to attend booked sessions on time, treat GMs and fellow players with respect, follow each game's content expectations as agreed in Session Zero, and not harass, threaten, or abuse other users.</p>
          <p>Repeated no-shows or disruptive behaviour may result in account suspension.</p>
        </Section>

        <Section title="4. Game Master Responsibilities">
          <p>GMs agree to run sessions as advertised, disclose session content themes honestly, honour their listed price and schedule, and maintain a safe and inclusive table environment.</p>
          <p>GMs are independent providers, not employees of QuestBoard. QuestBoard does not guarantee any particular income for GMs.</p>
        </Section>

        <Section title="5. Payments & Refunds">
          <p>Session prices are set by individual GMs. QuestBoard processes payments on their behalf and charges a platform service fee. Refund eligibility depends on the cancellation policy of the individual GM, disclosed at booking.</p>
          <p>QuestBoard reserves the right to issue refunds at its discretion in cases of GM no-shows or verified misconduct.</p>
        </Section>

        <Section title="6. Prohibited Conduct">
          <p>You may not use QuestBoard to: engage in harassment, hate speech, or discrimination; share another user's personal information without consent; attempt to circumvent platform payments; create fake reviews or manipulate ratings; or violate any applicable law.</p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>All QuestBoard branding, design, and platform code is owned by QuestBoard and protected by copyright. GMs retain ownership of their original adventure content. By posting content on QuestBoard, you grant us a non-exclusive licence to display it on the platform.</p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>QuestBoard provides the platform on an "as-is" basis. We are not liable for the quality of individual GM sessions, player conduct, or any indirect or consequential damages arising from use of the platform. Our total liability is limited to the fees paid in the 30 days preceding any claim.</p>
        </Section>

        <Section title="9. Termination">
          <p>We reserve the right to suspend or terminate accounts that violate these Terms. You may close your account at any time by contacting support. Termination does not affect any outstanding payment obligations.</p>
        </Section>

        <Section title="10. Changes to Terms">
          <p>We may update these Terms from time to time. Continued use of QuestBoard after changes are posted constitutes acceptance. Material changes will be communicated by email to registered users.</p>
        </Section>

        <Section title="11. Governing Law">
          <p>These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of law principles. Any disputes shall be resolved by binding arbitration, except where prohibited by law.</p>
        </Section>

        <Section title="12. Contact">
          <p>Questions about these Terms? Contact us at <a href="mailto:legal@questboard.gg" className="text-indigo-600 hover:underline">legal@questboard.gg</a> or visit our <Link href="/contact" className="text-indigo-600 hover:underline">Contact page</Link>.</p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
