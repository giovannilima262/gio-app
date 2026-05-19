import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Chief of Staff AI",
  description: "Privacy Policy for Chief of Staff AI",
};

export default function PrivacyPage() {
  const lastUpdated = "May 18, 2026";

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.7, color: "#111" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Privacy Policy</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Last updated: {lastUpdated}</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>1. Overview</h2>
        <p>
          Chief of Staff AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) provides an AI-powered email
          management assistant that connects to your Gmail and Outlook accounts to help you triage, classify, and
          respond to email. This Privacy Policy explains what data we access, how we use it, and how we protect it.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>2. Data We Access</h2>
        <p>When you connect your Gmail account, we request the <strong>gmail.modify</strong> scope, which allows us to:</p>
        <ul>
          <li>Read your email messages and threads</li>
          <li>Read and modify labels on messages</li>
          <li>Send email on your behalf (only when you explicitly trigger an action)</li>
          <li>Mark messages as read or unread</li>
          <li>Archive or move messages</li>
        </ul>
        <p>
          We do <strong>not</strong> read email content for advertising, sell your data to third parties, or share
          your email with any third party except as described in this policy.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>3. How We Use Your Data</h2>
        <p>We use your email data exclusively to:</p>
        <ul>
          <li>Classify and triage incoming messages using AI models</li>
          <li>Generate draft replies for your review and approval</li>
          <li>Apply labels and archive messages according to your configured rules</li>
          <li>Surface action items and important information from your inbox</li>
        </ul>
        <p>
          AI analysis of your email is performed using industry-standard large language models (LLMs). Email content
          sent to AI models is not stored by us beyond the current session and is governed by the respective model
          provider&rsquo;s data processing terms.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>4. Data Retention</h2>
        <p>
          We store minimal metadata (message IDs, thread IDs, labels) necessary for the service to function. Email
          body content is processed in-memory and is not persisted to our databases. You may delete your account and
          all associated data at any time by contacting us at the address below.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>5. Third-Party Services</h2>
        <p>
          Our service integrates with Google Gmail via Google&rsquo;s official OAuth 2.0 API. We comply with
          Google&rsquo;s API Services User Data Policy, including the Limited Use requirements. We do not use Google
          user data to develop, improve, or train generalized AI or ML models.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>6. Security</h2>
        <p>
          OAuth tokens are encrypted at rest. We use TLS 1.2+ for all data in transit. Access tokens are scoped to
          the minimum permissions required. You may revoke access at any time through your Google Account security
          settings at <a href="https://myaccount.google.com/permissions" style={{ color: "#2563eb" }}>myaccount.google.com/permissions</a>.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the data we hold about you</li>
          <li>Request deletion of your data</li>
          <li>Revoke our access to your Gmail account at any time</li>
          <li>Export your data</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>8. Contact</h2>
        <p>
          For privacy questions or data requests, contact:{" "}
          <a href="mailto:giovannilima262@gmail.com" style={{ color: "#2563eb" }}>giovannilima262@gmail.com</a>
        </p>
      </section>
    </main>
  );
}
