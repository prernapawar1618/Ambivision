import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CareersClientView from "@/components/CareersClientView";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";
import { OPEN_POSITIONS } from "@/data/careers-data";

export const metadata = buildMetadata({
  title: "Careers & Opportunities — Grow Your Career with AmbiVision",
  description:
    "Explore opportunities to learn, contribute, and build meaningful digital products. Whether you're starting your career or bringing professional experience, find a role that matches your skills and ambitions.",
  path: "careers",
});

export default function CareersPage() {
  const careersSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "AmbiVision Careers & Opportunities",
      description:
        "Explore opportunities to learn, contribute, and build meaningful digital products at AmbiVision.",
      url: `${SITE_CONFIG.domain}/careers/`,
    },
    ...OPEN_POSITIONS.map((job) => ({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: job.overview,
      datePosted: "2026-04-01",
      validThrough: "2026-12-31",
      employmentType:
        job.type === "Full-time"
          ? "FULL_TIME"
          : job.type === "Internship"
          ? "INTERN"
          : "CONTRACTOR",
      hiringOrganization: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        sameAs: SITE_CONFIG.domain,
        logo: `${SITE_CONFIG.domain}/images/logo.png`,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_CONFIG.address.addressLocality,
          addressRegion: SITE_CONFIG.address.addressRegion,
          addressCountry: SITE_CONFIG.address.addressCountry,
        },
      },
      jobLocationType: "TELECOMMUTE",
    })),
  ];

  return (
    <>
      <JsonLd data={careersSchema} />

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
          <Breadcrumbs items={[{ name: "Careers", url: "/careers" }]} />

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
            CAREERS &amp; OPPORTUNITIES
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
            Grow Your Career with{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 30%, #9e9ea6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AmbiVision
            </span>
          </h1>

          <p
            className="subpage-desc"
            style={{
              fontSize: "1.15rem",
              color: "#9E9EA6",
              maxWidth: "720px",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            Explore opportunities to learn, contribute, and build meaningful digital products. Whether you&apos;re starting your career or bringing professional experience, find a role that matches your skills and ambitions.
          </p>
        </div>
      </section>

      {/* ── Interactive Careers Content ─────────────────────────── */}
      <CareersClientView />
    </>
  );
}
