import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – Chief of Staff AI",
  description: "Terms of Service for Chief of Staff AI",
};

export default function TermsPage() {
  const lastUpdated = "May 18, 2026";

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.7, color: "#111" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Terms of Service</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Last updated: {lastUpdated}</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>1. Acceptance</h2>
        <p>
          By using Chief of Staff AI (the &ldquo;Service&rdquo;), you agree to these Terms of Service. If you do not
          agree, do not use the Service.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>2. Description of Service</h2>
        <p>
          Chief of Staff AI is an AI-powered email management assistant. It connects to your Gmail or Outlook account
          via OAuth to classify incoming messages, generate draft replies, apply labels, and surface action items
          from your inbox.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>3. Google API Usage</h2>
        <p>
          Our use of information received from Google APIs adheres to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy" style={{ color: "#2563eb" }}>
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. We do not use Google user data for advertising or to train
          generalized machine learning models.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>4. User Responsibilities</h2>
        <p>You agree to:</p>
        <ul>
          <li>Use the Service only for lawful purposes</li>
          <li>Not use the Service to send spam or unsolicited messages</li>
          <li>Maintain the security of your account credentials</li>
          <li>Promptly notify us of any unauthorized access to your account</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>5. Beta Access</h2>
        <p>
          During the beta period, the Service is provided free of charge. We reserve the right to modify, suspend,
          or discontinue any aspect of the Service at any time. Beta features may be unstable or change without notice.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>6. Limitation of Liability</h2>
        <p>
          The Service is provided &ldquo;as is&rdquo; without warranty of any kind. We are not liable for any
          indirect, incidental, or consequential damages arising from your use of the Service, including any errors
          in AI-generated email drafts or classifications.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>7. Termination</h2>
        <p>
          You may stop using the Service at any time by revoking our access via your Google Account settings. We may
          terminate access for violations of these Terms.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>8. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the Service after changes constitutes
          acceptance of the updated Terms.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>9. Contact</h2>
        <p>
          Questions about these Terms:{" "}
          <a href="mailto:giovannilima262@gmail.com" style={{ color: "#2563eb" }}>giovannilima262@gmail.com</a>
        </p>
      </section>
    </main>
  );
}
