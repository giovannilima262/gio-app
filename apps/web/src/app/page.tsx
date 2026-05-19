import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chief of Staff AI – Your AI-Powered Email Assistant",
  description: "Chief of Staff AI triages your inbox, classifies messages, and drafts replies so you can focus on what matters.",
};

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", color: "#111" }}>
      <header style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1rem 1rem" }}>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>
          Chief of Staff AI
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "1.5rem" }}>
          Your inbox,<br />under control.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#444", maxWidth: 520, marginBottom: "2rem", lineHeight: 1.6 }}>
          Chief of Staff AI connects to your Gmail and Outlook, classifies every incoming message, drafts replies
          for your review, and surfaces what actually needs your attention — so you spend less time in email.
        </p>
        <p style={{ fontSize: "0.875rem", color: "#888", marginTop: "0.75rem" }}>
          Free during beta · Gmail + Outlook · No credit card required
        </p>
      </header>

      <section style={{ maxWidth: 800, margin: "4rem auto", padding: "0 1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {[
            { title: "Triage on autopilot", body: "Every message is classified and prioritized before you even open your inbox." },
            { title: "Draft replies instantly", body: "AI drafts a reply for each message. You review, edit, and send — or skip." },
            { title: "Never miss action items", body: "Deadlines, requests, and follow-ups are surfaced in a single focused view." },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "1.5rem",
                background: "#fafafa",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{card.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#555", margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "2rem 1rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem", color: "#888" }}>
          &copy; {new Date().getFullYear()} Chief of Staff AI &nbsp;&middot;&nbsp;{" "}
          <Link href="/privacy" style={{ color: "#555" }}>Privacy Policy</Link>
          &nbsp;&middot;&nbsp;
          <Link href="/terms" style={{ color: "#555" }}>Terms of Service</Link>
        </p>
      </footer>
    </main>
  );
}
