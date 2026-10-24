import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Cpu,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";
import { SERVICES_DATA } from "@/data/services-data";
import { CASE_STUDIES_DATA } from "@/data/case-studies-data";

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const relatedCaseStudy = CASE_STUDIES_DATA[service.relatedCaseStudy];

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_CONFIG.domain}/services/${service.slug}/#service`,
      name: service.title,
      description: service.directAnswer,
      provider: {
        "@id": `${SITE_CONFIG.domain}/#organization`,
      },
      serviceType: service.title,
      areaServed: [
        "India",
        "United States",
        "United Kingdom",
        "United Arab Emirates",
        "Singapore",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} Packages`,
        itemListElement: service.investmentTiers.map((tier, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: tier.name,
            description: tier.idealFor,
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "INR",
            description: `${tier.budgetINR} (approx. ${tier.budgetUSD})`,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />

      {/* ── Subpage Hero ────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "6rem 0 4rem",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumbs
            items={[
              { name: "Services", url: "/services" },
              { name: service.title, url: `/services/${service.slug}` },
            ]}
          />

          <span
            style={{
              display: "inline-block",
              fontFamily: "monospace",
              fontSize: "12px",
              textTransform: "uppercase",
              color: "#eab308",
              background: "rgba(234, 179, 8, 0.1)",
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid rgba(234, 179, 8, 0.2)",
              fontWeight: "bold",
              letterSpacing: "0.08em",
              margin: "1.5rem 0 1rem",
            }}
          >
            {service.badge}
          </span>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
              color: "#ffffff",
            }}
          >
            {service.title}
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#9E9EA6",
              maxWidth: "800px",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            {service.tagline}
          </p>

          {/* High Information Density Direct Answer Box */}
          <div
            style={{
              background: "#161618",
              border: "1px solid #2A2A30",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              marginBottom: "2.5rem",
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
              💡 Executive Summary · Direct Answer
            </span>
            <p
              style={{
                color: "#e5e5e5",
                fontSize: "15px",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {service.directAnswer}
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href={`/contact?service=${service.slug}`}
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
              }}
            >
              Start a Project in {service.title}
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <Link
              href="#process"
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid #2A2A30",
                padding: "14px 28px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              View Delivery Process &amp; Tiers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key Benefits & Outcomes ─────────────────────────────── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }}>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#34d399",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Value Proposition
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                color: "#ffffff",
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Why AmbiVision for {service.title}?
            </h2>
            <p
              style={{
                color: "#9E9EA6",
                fontSize: "1.05rem",
                marginTop: "0.5rem",
                maxWidth: "580px",
                lineHeight: 1.6,
              }}
            >
              Engineered with clean code, sub-second performance, and verified
              commercial value from initial sprint to long-term scale.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                style={{
                  background: "#161618",
                  border: "1px solid #2A2A30",
                  borderRadius: "20px",
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(52, 211, 153, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    border: "1px solid rgba(52, 211, 153, 0.2)",
                  }}
                >
                  <CheckCircle2
                    style={{ width: "20px", height: "20px", color: "#34d399" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    color: "#9E9EA6",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities & Technical Stack ───────────────────────── */}
      <section
        style={{
          padding: "6rem 0",
          background: "#161618",
          borderTop: "1px solid #2A2A30",
          borderBottom: "1px solid #2A2A30",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: "#eab308",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Technical Depth
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  margin: "0.5rem 0 1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Full-Spectrum Capabilities
              </h2>
              <p
                style={{
                  color: "#9E9EA6",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                We avoid restrictive cookie-cutter templates. Every system is
                built to your specific database models, traffic concurrency
                requirements, and security compliance boundaries.
              </p>

              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {service.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      color: "#e5e5e5",
                      fontSize: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#34d399",
                        flexShrink: 0,
                        boxShadow: "0 0 8px #34d399",
                      }}
                    />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                background: "#1C1C1F",
                border: "1px solid #2A2A30",
                borderRadius: "24px",
                padding: "2.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Cpu
                  style={{ width: "22px", height: "22px", color: "#eab308" }}
                />
                Core Technology Stack
              </h3>
              <p
                style={{
                  color: "#9E9EA6",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  marginBottom: "1.75rem",
                }}
              >
                Selected for long-term maintainability, global developer talent
                availability, and minimal vendor lock-in.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  marginBottom: "2.5rem",
                }}
              >
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: "#121214",
                      border: "1px solid #2A2A30",
                      color: "#ffffff",
                      fontSize: "13px",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontFamily: "monospace",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {relatedCaseStudy && (
                <div
                  style={{
                    padding: "1.5rem",
                    background: "#121214",
                    border: "1px solid #2A2A30",
                    borderRadius: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      color: "#eab308",
                      letterSpacing: "0.08em",
                      fontWeight: "bold",
                    }}
                  >
                    ✨ Relevant Architecture Prototype
                  </span>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      margin: "0.35rem 0 0.75rem",
                    }}
                  >
                    {relatedCaseStudy.title}
                  </p>
                  <Link
                    href={`/work/${relatedCaseStudy.slug}`}
                    style={{
                      color: "#34d399",
                      fontSize: "13px",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                    }}
                  >
                    Read Architecture Breakdown{" "}
                    <ArrowRight style={{ width: "14px", height: "14px" }} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-Step Process ───────────────────────────────────────── */}
      <section id="process" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#34d399",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Delivery Lifecycle
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                color: "#ffffff",
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Our {service.title} Process
            </h2>
            <p
              style={{
                color: "#9E9EA6",
                fontSize: "1.05rem",
                margin: "0.75rem auto 0",
                maxWidth: "500px",
                lineHeight: 1.6,
              }}
            >
              Structured, predictable milestone delivery engineered to eliminate
              surprises.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {service.process.map((step) => (
              <div
                key={step.step}
                style={{
                  background: "#161618",
                  border: "1px solid #2A2A30",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    fontFamily: "monospace",
                    color: "#eab308",
                    marginBottom: "1rem",
                  }}
                >
                  {step.step}
                </span>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#9E9EA6",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Tiers ─────────────────────────────────────── */}
      <section
        style={{
          padding: "6rem 0",
          background: "#161618",
          borderTop: "1px solid #2A2A30",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#eab308",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Transparent Investment Guidance
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                color: "#ffffff",
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Indicative Scopes &amp; Timelines
            </h2>
            <p
              style={{
                color: "#9E9EA6",
                fontSize: "1.05rem",
                margin: "0.75rem auto 0",
                maxWidth: "540px",
                lineHeight: 1.6,
              }}
            >
              Indicative starting ranges based on project complexity. Final
              fixed-bid pricing is delivered after our collaborative
              architecture discovery call.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {service.investmentTiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: "#1C1C1F",
                  border: "1px solid #2A2A30",
                  borderRadius: "24px",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "13px",
                      fontFamily: "monospace",
                      color: "#34d399",
                      marginBottom: "1.5rem",
                    }}
                  >
                    ⏱️ Timeline: {tier.timeline}
                  </div>
                  <div
                    style={{
                      marginBottom: "1.5rem",
                      paddingBottom: "1.5rem",
                      borderBottom: "1px solid #2A2A30",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: 900,
                        color: "#ffffff",
                        fontFamily: "monospace",
                      }}
                    >
                      {tier.budgetINR}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#9E9EA6",
                        marginTop: "2px",
                      }}
                    >
                      approx. {tier.budgetUSD}
                    </div>
                  </div>
                  <p
                    style={{
                      color: "#9E9EA6",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      marginBottom: "2rem",
                    }}
                  >
                    <strong style={{ color: "#ffffff" }}>Ideal for:</strong>{" "}
                    {tier.idealFor}
                  </p>
                </div>

                <Link
                  href={`/contact?service=${service.slug}`}
                  style={{
                    background: "#ffffff",
                    color: "#121214",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  Discuss This Scope
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs Section ─────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#34d399",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Frequently Asked Questions
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                color: "#ffffff",
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {service.title} FAQs
            </h2>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: "#161618",
                  border: "1px solid #2A2A30",
                  borderRadius: "16px",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <summary
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  {faq.question}
                </summary>
                <p
                  style={{
                    marginTop: "1rem",
                    color: "#9E9EA6",
                    lineHeight: 1.7,
                    fontSize: "15px",
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA Banner ──────────────────────────────────── */}
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
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s Build Your {service.title} Project.
          </h2>
          <p
            style={{
              color: "#9E9EA6",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Schedule an initial discovery conversation with our senior technical
            team. We reply within one business day.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={`/contact?service=${service.slug}`}
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
              }}
            >
              Start Project Inquiry
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <Link
              href="/services"
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid #2A2A30",
                padding: "14px 28px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ArrowLeft style={{ width: "16px", height: "16px" }} />
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
