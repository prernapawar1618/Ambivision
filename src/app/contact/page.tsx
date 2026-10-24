import React, { Suspense } from "react";
import { Mail, MapPin, Clock, ShieldCheck, MessageSquare } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";

export const metadata = buildMetadata({
  title: "Contact AmbiVision — Start a Project Inquiry",
  description:
    "Get in touch with AmbiVision's principal engineers and design leads. Inquire about Next.js web platforms, AI agents, mobile apps, or enterprise software development.",
  path: "contact",
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact AmbiVision",
    description: "Inquire about engineering services, custom software, and digital products.",
    url: `${SITE_CONFIG.domain}/contact/`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.telephone,
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />

      {/* ── Contact Hero ────────────────────────────────────────── */}
      <section
        className="subpage-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "6rem 0 3rem",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "99px",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              color: "#38bdf8",
              fontSize: "12px",
              fontFamily: "monospace",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "1.5rem 0 1rem",
            }}
          >
            Direct Technical Inquiry
          </div>

          <h1
            className="subpage-title"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            Let's Build Something
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 30%, #9e9ea6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Remarkable Together.
            </span>
          </h1>

          <p
            className="subpage-desc"
            style={{
              fontSize: "1.15rem",
              color: "#9E9EA6",
              maxWidth: "680px",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            Discuss your technical requirements directly with our principal architects. We provide transparent architectural assessments and sprint proposals within one business day.
          </p>
        </div>
      </section>

      {/* ── Contact Grid: Form + Info ───────────────────────────── */}
      <section style={{ padding: "2rem 0 6rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "flex-start",
            }}
          >
            {/* Form Column */}
            <div
              style={{
                background: "#141418",
                border: "1px solid #23232a",
                borderRadius: "24px",
                padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div style={{ marginBottom: "1.75rem" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    color: "var(--c-cyan)",
                    fontWeight: 700,
                  }}
                >
                  Project Inquiry Form
                </span>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginTop: "0.25rem",
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  Tell Us About Your Goals
                </h2>
              </div>

              <Suspense
                fallback={
                  <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#8e8e98" }}>
                    Loading inquiry form...
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Studio Details Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div
                style={{
                  background: "#141418",
                  border: "1px solid #23232a",
                  borderRadius: "20px",
                  padding: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "1.5rem",
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  Direct Studio Contacts
                </h3>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "rgba(56, 189, 248, 0.1)",
                        border: "1px solid rgba(56, 189, 248, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Mail style={{ width: "18px", height: "18px", color: "#38bdf8" }} />
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#8e8e98", display: "block", marginBottom: "2px" }}>
                        Direct Inquiries &amp; Hiring
                      </span>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        style={{ color: "#ffffff", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </li>

                  <li style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "rgba(168, 85, 247, 0.1)",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MapPin style={{ width: "18px", height: "18px", color: "#c084fc" }} />
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#8e8e98", display: "block", marginBottom: "2px" }}>
                        Headquarters
                      </span>
                      <span style={{ color: "#ffffff", fontWeight: 500, fontSize: "14px" }}>
                        {SITE_CONFIG.address.streetAddress}, {SITE_CONFIG.address.addressLocality},{" "}
                        {SITE_CONFIG.address.postalCode}, India
                      </span>
                    </div>
                  </li>

                  <li style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "rgba(52, 211, 153, 0.1)",
                        border: "1px solid rgba(52, 211, 153, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Clock style={{ width: "18px", height: "18px", color: "#34d399" }} />
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#8e8e98", display: "block", marginBottom: "2px" }}>
                        Working Cadence
                      </span>
                      <span style={{ color: "#ffffff", fontWeight: 500, fontSize: "14px" }}>
                        Mon – Sat, 9:00 AM – 7:00 PM IST (Global Async)
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Guarantees Box */}
              <div
                style={{
                  background: "#141418",
                  border: "1px solid #23232a",
                  borderRadius: "20px",
                  padding: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <ShieldCheck style={{ width: "18px", height: "18px", color: "var(--c-cyan)" }} />
                  Our Commitment to Inquirers
                </h3>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    color: "var(--c-text-secondary)",
                    fontSize: "13px",
                    lineHeight: 1.7,
                  }}
                >
                  <li><strong>Strict Confidentiality:</strong> We execute mutual NDAs before reviewing sensitive technical assets or IP.</li>
                  <li><strong>Fast Turnaround:</strong> You will hear directly from a lead engineer within 24 hours.</li>
                  <li><strong>No Sales Pressure:</strong> We only take on engagements where our technical stack can deliver verifiable ROI.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
