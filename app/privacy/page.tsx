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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">⚔️</span>
            <span className="font-bold text-zinc-900 text-lg tracking-tight">QuestBoard</span>
          </Link>
          <Link href="/terms" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
            Terms of Service →
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <p className="text-sm text-zinc-400 mb-2">Last updated: April 20, 2026</p>
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-3">Privacy Policy</h1>
        <p className="text-zinc-500 text-lg mb-12">QuestBoard is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights.</p>

        <Section title="1. Information We Collect">
          <p><strong>Account information:</strong> When you sign up, we collect your name and email address. Passwords are hashed and never stored in plain text.</p>
          <p><strong>Usage data:</strong> We collect information about how you interact with the platform — games browsed, sessions booked, and preferences set — to improve your experience.</p>
          <p><strong>Communications:</strong> If you contact us directly, we may retain the contents of your message and your contact details to respond to your enquiry.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use your information to provide and improve QuestBoard's services, match you with suitable games and GMs, send important account notifications, and resolve disputes or troubleshoot issues.</p>
          <p>We do not sell your personal data to third parties. We do not use your information for advertising profiling or share it with data brokers.</p>
        </Section>

        <Section title="3. Cookies & Local Storage">
          <p>QuestBoard uses browser localStorage to store your session and account preferences. No third-party tracking cookies are used on our platform. You can clear this data at any time through your browser settings.</p>
        </Section>

        <Section title="4. Data Sharing">
          <p>We may share limited data with trusted service providers who help us operate the platform (e.g. hosting, analytics) under strict confidentiality agreements. We will disclose information if required by law or to protect the safety of our users.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain your account data for as long as your account is active. If you delete your account, we will remove your personal information within 30 days, except where retention is required by law.</p>
        </Section>

        <Section title="6. Your Rights">
          <p>Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:privacy@questboard.gg" className="text-indigo-600 hover:underline">privacy@questboard.gg</a>. We will respond within 30 days.</p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>QuestBoard is intended for users aged 18 and over. We do not knowingly collect data from children under 13. If you believe a child has provided us with personal information, please contact us immediately.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. We will notify registered users of material changes by email or via a notice on the platform. Continued use of QuestBoard after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="9. Contact">
          <p>Questions about this policy? Reach us at <a href="mailto:privacy@questboard.gg" className="text-indigo-600 hover:underline">privacy@questboard.gg</a> or visit our <Link href="/contact" className="text-indigo-600 hover:underline">Contact page</Link>.</p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
