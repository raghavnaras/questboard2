import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PRO_GM_BENEFITS = [
  {
    title: "Built-In Advertising & Discovery",
    body: "StartPlaying is a discovery-first marketplace where players actively search for games like yours. You don't need to spend time or money on marketing. The platform helps new players find you based on system, theme, or play style, making it easier to grow your audience without building a following from scratch.",
  },
  {
    title: "Secure Payments with Stripe",
    body: "StartPlaying handles all payments, so you don't have to chase invoices or navigate awkward money conversations. Your earnings are stored in your Stripe-connected account, and you can choose when to cash out - secure, reliable, and built to support pros.",
  },
  {
    title: "Dedicated Trust & Safety",
    body: "Our team works to ensure that every Game Master and player has a welcoming, safe, and fun experience. If something goes wrong, support is there to help resolve issues quickly and keep your games on track. Built-in safety and moderation features empower you to create a space that fits your style and standards.",
  },
  {
    title: "Support & Resources",
    body: "StartPlaying gives you access to a growing library of resources designed to help you improve. Join onboarding calls, attend live webinars, explore articles and guides, and watch talks from top GMs. Whether you're refining your craft or learning how to grow your audience, you'll never level alone.",
  },
  {
    title: "Fraud Protection",
    body: "If a player ghosts on a Game Master, their payment fails, or they try to dispute a legitimate charge, StartPlaying has your back. Reach out to support and we'll cover the cost, so you still get paid for the session you ran.",
  },
  {
    title: "Opportunities Beyond the Table",
    body: "StartPlaying opens doors to more than just game nights. Get featured in promotions, actual play projects, and brand partnerships. Top GMs are often tapped for paid corporate gigs, sponsored games, and other unique opportunities.",
  },
  {
    title: "Join a Pro GM Community",
    body: "You're not alone. Get support, advice, and inspiration from an active Discord community of professional GMs. Share strategies, troubleshoot issues, and stay updated on the latest trends in TTRPGs and player behavior.",
  },
  {
    title: "Save Time on Admin",
    body: "StartPlaying handles the busywork so you can focus on running great games. Built-in tools take care of scheduling, payment processing, and player reviews. The system makes it easy to manage reminders, cancellations, and reschedules - so you can spend less time coordinating and more time telling great stories.",
  },
  {
    title: "Grow your Reputation",
    body: "Every game you run builds your public profile. Collect reviews and testimonials from players. Whether you're full-time or just starting out, StartPlaying helps you build long-term credibility as a professional GM.",
  },
];

export default function BecomeProDungeonMasterPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-4">For Game Masters</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
            Become a Professional Dungeon Master
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg max-w-3xl mx-auto">
            Everything you need to run paid games professionally, grow your audience, and build your long-term
            reputation as a GM.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRO_GM_BENEFITS.map(({ title, body }) => (
              <article key={title} className="bg-white border border-zinc-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-zinc-900 mb-2 leading-snug">{title}</h2>
                <p className="text-sm text-zinc-600 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-indigo-600 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to become a pro GM?</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-7">
              Visit StartPlaying to learn the full process and take your next step.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://startplaying.games/become-a-pro-dungeon-master"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-base px-8 py-4 rounded-xl transition-colors"
              >
                Open StartPlaying Guide
              </a>
              <Link
                href="/"
                className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
