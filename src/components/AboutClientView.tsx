"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Users,
  Target,
  ShieldCheck,
  X,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

export default function AboutClientView() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ── About Hero Section ────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "6rem 0 4rem",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumbs items={[{ name: "About", url: "/about" }]} />

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
            Who We Are
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
              color: "#ffffff",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            Engineering the Future
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 30%, #9e9ea6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Of Digital Products.
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#9E9EA6",
              maxWidth: "720px",
              lineHeight: 1.7,
              marginBottom: "3rem",
            }}
          >
            AmbiVision is a premier digital product engineering and AI studio.
            We partner with ambitious startups and enterprises to build scalable
            web applications, autonomous AI agents, and high-performance
            software architecture.
          </p>

          {/* Core Values / Grid Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginBottom: "5rem",
            }}
          >
            <div
              style={{
                background: "#161618",
                border: "1px solid #2A2A30",
                borderRadius: "20px",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(234, 179, 8, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: "#eab308",
                }}
              >
                <Target size={24} />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.75rem",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                Mission &amp; Vision
              </h3>
              <p
                style={{
                  color: "#9E9EA6",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                To transform complex business challenges into sleek,
                high-performing, and reliable digital systems that scale
                effortlessly.
              </p>
            </div>

            <div
              style={{
                background: "#161618",
                border: "1px solid #2A2A30",
                borderRadius: "20px",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(52, 211, 153, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: "#34d399",
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.75rem",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                Uncompromising Quality
              </h3>
              <p
                style={{
                  color: "#9E9EA6",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Every line of code adheres to clean architecture principles,
                rigorous testing, and optimized Core Web Vitals for supreme
                performance.
              </p>
            </div>

            <div
              style={{
                background: "#161618",
                border: "1px solid #2A2A30",
                borderRadius: "20px",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(96, 165, 250, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: "#60a5fa",
                }}
              >
                <Users size={24} />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.75rem",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                Expert Leadership
              </h3>
              <p
                style={{
                  color: "#9E9EA6",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Led by seasoned engineers and product strategists dedicated to
                clear communication, transparency, and fixed milestones.
              </p>
            </div>
          </div>

          {/* CTA Banner inside About */}
          <div
            style={{
              background: "#161618",
              border: "1px solid #2A2A30",
              borderRadius: "24px",
              padding: "3rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "1rem",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              Ready to Collaborate With Our Team?
            </h2>
            <p
              style={{
                color: "#9E9EA6",
                fontSize: "1.05rem",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: 1.6,
              }}
            >
              Let's discuss your upcoming product roadmap or technical
              architecture over a discovery call.
            </p>

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
                transition: "transform 0.2s ease",
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
                  fontFamily: "'Clash Display', sans-serif",
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
                    padding: "1rem",
                    overflow: "hidden",
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
