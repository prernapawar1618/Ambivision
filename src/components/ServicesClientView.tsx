"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SERVICES_DATA } from "@/data/services-data";
import ContactForm from "@/components/ContactForm";

export default function ServicesClientView() {
  const [modalOpen, setModalOpen] = useState(false);
  const serviceList = Object.values(SERVICES_DATA);

  return (
    <>
      {/* ── Subpage Hero ────────────────────────────────────────── */}
      <section
        className="subpage-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "6rem 0 4rem",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumbs items={[{ name: "Services", url: "/services" }]} />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "99px",
              background: "rgba(234, 179, 8, 0.1)",
              border: "1px solid rgba(234, 179, 8, 0.2)",
              color: "#eab308",
              fontSize: "12px",
              fontFamily: "monospace",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "1.5rem 0 1rem",
            }}
          >
            <Sparkles style={{ width: "14px", height: "14px" }} />
            Comprehensive Directory
          </div>

          <h1
            className="subpage-title"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            Digital Engineering &amp;
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 30%, #9e9ea6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Product Services.
            </span>
          </h1>

          <p
            className="subpage-desc"
            style={{
              fontSize: "1.15rem",
              color: "#9E9EA6",
              maxWidth: "720px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            We provide full-lifecycle technical execution for ambitious
            companies: from initial product discovery and high-fidelity Figma
            design systems to Next.js full-stack engineering, autonomous AI
            agent pipelines, and high-concurrency cloud architecture.
          </p>

          <div
            className="direct-answer-card"
            style={{
              background: "#161618",
              border: "1px solid #2A2A30",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                color: "#34d399",
                fontWeight: "bold",
                marginBottom: "8px",
                letterSpacing: "0.05em",
              }}
            >
              ⚡ Executive Summary · What AmbiVision Builds
            </span>
            <p
              style={{
                color: "#e5e5e5",
                fontSize: "15px",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              AmbiVision delivers seven core engineering disciplines tailored
              for modern enterprises and venture-backed scale-ups: Next.js Web
              Application Development, UI/UX &amp; Product Design, React Native
              Cross-Platform Mobile Apps, Autonomous AI Solutions &amp; RAG
              Systems, Custom Software Architecture, Headless E-commerce Stores,
              and Technical SEO &amp; Generative Engine Optimization (GEO).
              Every discipline is staffed by dedicated senior engineers adhering
              to strict clean architecture principles.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services Directory List ─────────────────────────────── */}
      <section style={{ padding: "4rem 0 8rem" }}>
        <div className="container">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
          >
            {serviceList.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                style={{
                  background: "#161618",
                  border: "1px solid #2A2A30",
                  borderRadius: "24px",
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#eab308",
                        background: "rgba(234, 179, 8, 0.1)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: "1px solid rgba(234, 179, 8, 0.2)",
                      }}
                    >
                      0{index + 1} / {service.badge}
                    </span>
                    <h2
                      style={{
                        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                        fontWeight: 800,
                        color: "#ffffff",
                        marginTop: "0.75rem",
                        letterSpacing: "-0.02em",
                        fontFamily: "'Clash Display', sans-serif",
                      }}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {service.title}
                      </Link>
                    </h2>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#ffffff",
                      color: "#121214",
                      padding: "12px 20px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                      transition: "transform 0.2s",
                    }}
                  >
                    View Discipline Guide
                    <ArrowRight style={{ width: "16px", height: "16px" }} />
                  </Link>
                </div>

                <p
                  style={{
                    color: "#9E9EA6",
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    marginBottom: "2.5rem",
                    maxWidth: "850px",
                  }}
                >
                  {service.directAnswer}
                </p>

                {/* Key Benefits Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "2.5rem",
                  }}
                >
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#1C1C1F",
                        border: "1px solid #2A2A30",
                        borderRadius: "16px",
                        padding: "1.5rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#ffffff",
                          marginBottom: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <CheckCircle2
                          style={{
                            width: "15px",
                            height: "15px",
                            color: "#34d399",
                            flexShrink: 0,
                          }}
                        />
                        {benefit.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#9E9EA6",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack & Links Footer */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #2A2A30",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "monospace",
                        textTransform: "uppercase",
                        color: "#64646C",
                        fontWeight: 600,
                      }}
                    >
                      Core Stack:
                    </span>
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: "#1C1C1F",
                          border: "1px solid #2A2A30",
                          color: "#e5e5e5",
                          fontSize: "12px",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontFamily: "monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/contact?service=${service.slug}`}
                    style={{
                      color: "#34d399",
                      fontSize: "14px",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                    }}
                  >
                    Inquire About {service.title}
                    <ArrowRight style={{ width: "14px", height: "14px" }} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering Standards CTA ───────────────────────────── */}
      <section
        style={{
          padding: "6rem 0",
          background: "#0D0D0F",
          borderTop: "1px solid #2A2A30",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "780px" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            Ready to Build a Category-Defining Product?
          </h2>
          <p
            style={{
              color: "#9E9EA6",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Speak directly with our technical leads. We assess requirements,
            offer candid architectural recommendations, and provide
            fixed-timeline sprint milestones.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: "#ffffff",
                color: "#121214",
                padding: "14px 28px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Schedule Call
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal Popup */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#121216",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "2rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.5rem",
                }}
              >
                Schedule a Discovery Call
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>
                Fill out the project details below and our team will get in
                touch with you within one business day.
              </p>
            </div>

            <Suspense
              fallback={
                <div
                  style={{
                    color: "#9CA3AF",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  Loading form...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
