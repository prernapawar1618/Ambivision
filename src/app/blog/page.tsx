import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, User } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";
import { BLOG_POSTS_DATA } from "@/data/blog-data";

export const metadata = buildMetadata({
  title: "Engineering Blog & Technical Architecture Insights — AmbiVision",
  description:
    "In-depth engineering essays on Next.js App Router, autonomous AI agent pipelines, RAG architecture, and technical Core Web Vitals optimization.",
  path: "blog",
});

export default function BlogIndexPage() {
  const posts = Object.values(BLOG_POSTS_DATA);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AmbiVision Engineering Blog",
    description: "Deep technical articles on web performance, distributed systems, and AI engineering.",
    url: `${SITE_CONFIG.domain}/blog/`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.publishDate,
      dateModified: p.modifiedDate,
      author: {
        "@type": "Person",
        name: p.author.name,
      },
      url: `${SITE_CONFIG.domain}/blog/${p.slug}/`,
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />

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
          <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "99px",
              background: "rgba(168, 85, 247, 0.1)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              color: "#c084fc",
              fontSize: "12px",
              fontFamily: "monospace",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "1.5rem 0 1rem",
            }}
          >
            Engineering &amp; Research Insights
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
            Deep Technical Insights,
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 30%, #9e9ea6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Zero Industry Fluff.
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
            Rigorous engineering breakdowns on server components, autonomous agent orchestration, RAG latency bottlenecks, and real-world Core Web Vitals optimization.
          </p>
        </div>
      </section>

      {/* ── Articles Grid ───────────────────────────────────────── */}
      <section style={{ padding: "3rem 0 8rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "2rem",
            }}
          >
            {posts.map((post) => (
              <article
                key={post.slug}
                style={{
                  background: "#141418",
                  border: "1px solid #23232a",
                  borderRadius: "20px",
                  padding: "2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: "rgba(168, 85, 247, 0.12)",
                        color: "#c084fc",
                        fontWeight: 700,
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--c-text-muted)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock style={{ width: "12px", height: "12px" }} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "0.75rem",
                      lineHeight: 1.35,
                      fontFamily: "'Clash Display', sans-serif",
                    }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p
                    style={{
                      color: "var(--c-text-secondary)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {post.keywords.slice(0, 3).map((kw) => (
                      <span
                        key={kw}
                        style={{
                          fontSize: "11px",
                          fontFamily: "monospace",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.04)",
                          color: "#a1a1aa",
                        }}
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid #1f1f26",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
                    {post.publishDate}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      color: "var(--c-cyan)",
                      fontSize: "13px",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                    }}
                  >
                    Read Essay
                    <ArrowRight style={{ width: "14px", height: "14px" }} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
