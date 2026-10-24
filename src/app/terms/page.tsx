import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";

export const metadata = buildMetadata({
  title: "Terms of Service — AmbiVision",
  description:
    "AmbiVision Terms of Service. Review the conditions governing our digital product engineering services, website access, and technical engagements.",
  path: "terms",
});

export default function TermsPage() {
  return (
    <article style={{ padding: "6rem 0 8rem" }}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <Breadcrumbs items={[{ name: "Terms of Service", url: "/terms" }]} />

        <div style={{ marginTop: "1.5rem", marginBottom: "3rem" }}>
          <span className="subpage-badge">
            <FileText style={{ width: "13px", height: "13px" }} />
            Legal Agreement
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
            Terms of Service
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
            These Terms of Service ("Terms") govern your access to and use of the website located at <strong>ambivision.in</strong> and related digital engineering services provided by AmbiVision Digital Technologies Private Limited ("AmbiVision"). By accessing our website or submitting project inquiries, you agree to these Terms.
          </p>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              1. Permitted Use of Website
            </h2>
            <p>
              You agree to use this website only for legitimate business purposes. You must not:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
              <li>Attempt to compromise or bypass server rate limiting, authentication, or network security.</li>
              <li>Submit automated, spoofed, abusive, or spam inquiries or fraudulent job applications.</li>
              <li>Upload malicious code, disguised executables, or corrupted files through our forms.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              2. Intellectual Property Rights
            </h2>
            <p>
              All proprietary code, branding, visual designs, copywriting, and architecture diagrams displayed on this site are the exclusive intellectual property of AmbiVision. You may not copy, reproduce, or republish our materials without prior written consent.
            </p>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              3. Concept Demonstrations &amp; Case Studies
            </h2>
            <p>
              Certain architectural case studies featured in our portfolio (such as SwiftBite and MarketPulse) are concept demonstrations engineered to showcase technical capabilities in high-concurrency event streaming, WebSockets, and geospatial routing. They illustrate our engineering standards and do not represent formal endorsement by third-party brand names used for context.
            </p>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              4. Engagement Scopes &amp; Master Services Agreements
            </h2>
            <p>
              Submitting an inquiry through our contact form does not create a binding development contract. All commercial engagements, deliverables, warranties, sprint schedules, and payment milestones are governed by separate, mutually executed Master Services Agreements (MSA) and Statements of Work (SOW).
            </p>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: "'Clash Display', sans-serif" }}>
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts of Nashik, Maharashtra, India.
            </p>
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
