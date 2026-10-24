import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";

export const metadata = buildMetadata({
  title: "Privacy Policy — AmbiVision",
  description:
    "AmbiVision Privacy Policy. Learn how we collect, process, and protect your inquiry information, project specifications, and job application data.",
  path: "privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <article style={{ padding: "6rem 0 8rem" }}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy-policy" }]} />

        <div style={{ marginTop: "1.5rem", marginBottom: "3rem" }}>
          <span className="subpage-badge">
            <ShieldCheck style={{ width: "13px", height: "13px" }} />
            Data Protection &amp; Security
          </span>
          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "var(--c-text-muted)", fontSize: "14px" }}>
            Effective Date: April 2026 · Last Updated: October 2026
          </p>
        </div>

        <div
          style={{
            color: "#c2c2ca",
            fontSize: "15px",
            lineHeight: 1.8,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <p>
            AmbiVision Digital Technologies Private Limited ("AmbiVision", "we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines our transparent data practices across our website (<strong>ambivision.in</strong>), project inquiry forms, and career application workflows.
          </p>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              1. Information We Collect
            </h2>
            <p>We collect only information that you voluntarily provide directly to us:</p>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
              <li>
                <strong>Project Inquiries:</strong> Full name, corporate email address, organization/company name, selected engineering service, budget tier, timeline, and project scope details submitted via our contact forms.
              </li>
              <li>
                <strong>Career &amp; Job Applications:</strong> Full name, personal email, phone number, role applied for, professional profile links (GitHub, LinkedIn, portfolio), resume/CV files (in PDF format), and optional cover notes.
              </li>
              <li>
                <strong>Technical Diagnostics:</strong> Client IP address and browser User-Agent strings collected strictly for server-side rate limiting, spam defense, and brute-force prevention.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              2. How We Use and Deliver Your Information
            </h2>
            <p>Your data is used strictly for legitimate commercial and recruitment communication:</p>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
              <li>To evaluate project feasibility, prepare architectural proposals, and schedule technical discovery conversations.</li>
              <li>To evaluate job applicants for confirmed vacancies and communicate recruitment decisions.</li>
              <li>Inquiry notifications and candidate applications are routed through secure, encrypted transactional email infrastructure (Resend REST API / verified SMTP) directly to our leadership team at <strong>prernapawar1618@ambivision.in</strong>.</li>
              <li>We <strong>never sell, lease, or monetize</strong> your personal details or corporate specifications to third-party advertisers or data brokers.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              3. Resume &amp; Candidate Document Security
            </h2>
            <p>
              Candidate resumes uploaded to our careers portal are subjected to strict binary validation (verifying valid PDF headers) to prevent execution of untrusted scripts. Uploaded documents are transmitted privately to authorized hiring personnel and are never exposed via publicly crawlable web directories.
            </p>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              4. Data Retention &amp; Your Rights
            </h2>
            <p>
              We retain project inquiries and candidate data only as long as necessary to fulfill the purpose for which it was collected. You have the right to request access to your submitted data, request correction of inaccurate details, or request full deletion of your contact records and resume from our systems.
            </p>
            <p>
              To exercise these rights, email us directly at{" "}
              <a href="mailto:prernapawar1618@ambivision.in" style={{ color: "var(--c-cyan)" }}>
                prernapawar1618@ambivision.in
              </a>.
            </p>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              5. Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact our data compliance officer at:
            </p>
            <div style={{ background: "#141418", border: "1px solid #23232a", padding: "1.25rem", borderRadius: "12px", marginTop: "0.5rem" }}>
              <div><strong>AmbiVision Digital Technologies Private Limited</strong></div>
              <div>Nashik, Maharashtra 422001, India</div>
              <div>Direct: <a href="mailto:prernapawar1618@ambivision.in" style={{ color: "var(--c-cyan)" }}>prernapawar1618@ambivision.in</a></div>
            </div>
          </section>
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #23232a" }}>
          <Link href="/" className="btn btn-ghost btn-sm">
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Return to Home
          </Link>
        </div>
      </div>
    </article>
  );
}
