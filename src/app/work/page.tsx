import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, ExternalLink, Cpu } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";
import { CASE_STUDIES_DATA } from "@/data/case-studies-data";

export const metadata = buildMetadata({
  title: "Engineering Portfolio & Case Studies — AmbiVision",
  description:
    "Explore AmbiVision's engineering portfolio: high-concurrency fintech platforms, autonomous AI interview agents, hyper-local logistics, and adaptive LMS architectures.",
  path: "work",
});

export default function WorkPage() {
  const canonicalSlugs = [
    'real-time-stock-market',
    'ai-powered-lms',
    'food-delivery-platform',
    'ai-interview-agent',
  ];
  const caseStudies = canonicalSlugs.map((slug) => CASE_STUDIES_DATA[slug]).filter(Boolean);

  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AmbiVision Digital Product Portfolio & Architecture Demonstrations",
    description: "Technical case studies and architectural blueprints engineered by AmbiVision.",
    url: `${SITE_CONFIG.domain}/work/`,
    hasPart: caseStudies.map((cs) => ({
      "@type": "CreativeWork",
      name: cs.title,
      headline: cs.tagline,
      description: cs.overview,
      url: `${SITE_CONFIG.domain}/work/${cs.slug}/`,
    })),
  };

  return (
    <>
      <JsonLd data={workSchema} />

      {/* ── Subpage Hero ────────────────────────────────────────── */}
      <section
        className="subpage-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "6rem 0 3rem",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumbs items={[{ name: "Work", url: "/work" }]} />

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
            Engineering Portfolio
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
            Crafted for Scale,
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 30%, #9e9ea6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Engineered for Speed.
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
            Explore our verified architectural blueprints and concept systems—spanning sub-second streaming backends, autonomous agent workflows, and reactive frontend design systems.
          </p>
        </div>
      </section>

      {/* ── Case Studies Grid ───────────────────────────────────── */}
      <section style={{ padding: "3rem 0 8rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "2rem",
            }}
          >
            {caseStudies.map((study, idx) => (
              <article
                key={study.slug}
                style={{
                  background: "#141418",
                  border: "1px solid #23232a",
                  borderRadius: "20px",
                  padding: "2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: "rgba(56, 189, 248, 0.12)",
                        color: "#38bdf8",
                        fontWeight: 700,
                      }}
                    >
                      {study.category}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "monospace",
                        color: "#71717a",
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "0.5rem",
                      fontFamily: "'Clash Display', sans-serif",
                    }}
                  >
                    <Link
                      href={`/work/${study.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {study.title}
                    </Link>
                  </h2>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--c-cyan)",
                      fontWeight: 500,
                      marginBottom: "1rem",
                    }}
                  >
                    {study.tagline}
                  </p>

                  <p
                    style={{
                      color: "var(--c-text-secondary)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {study.overview}
                  </p>

                  {/* Prototype Metrics Badge */}
                  {study.prototypeMetrics && study.prototypeMetrics.length > 0 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "0.75rem",
                        padding: "1rem",
                        borderRadius: "12px",
                        background: "#0c0c0e",
                        border: "1px solid #1f1f26",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {study.prototypeMetrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                          <div style={{ color: "#34d399", fontSize: "16px", fontWeight: 700, fontFamily: "monospace" }}>
                            {m.metric}
                          </div>
                          <div style={{ color: "#8e8e98", fontSize: "11px", marginTop: "2px" }}>
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "11px",
                          fontFamily: "monospace",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.04)",
                          color: "#d4d4d8",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/work/${study.slug}`}
                  className="btn btn-ghost btn-sm"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  View Architectural Deep Dive
                  <ArrowRight style={{ width: "14px", height: "14px" }} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
