import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, CheckCircle2, ArrowRight, Share2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";
import { BLOG_POSTS_DATA } from "@/data/blog-data";

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA[slug];
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `blog/${slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA[slug];

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    dateModified: post.modifiedDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: `${SITE_CONFIG.domain}/images/logo.png`,
    },
    mainEntityOfPage: `${SITE_CONFIG.domain}/blog/${slug}/`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* ── Article Header ───────────────────────────────────────── */}
      <article style={{ padding: "6rem 0 8rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <Breadcrumbs
            items={[
              { name: "Blog", url: "/blog" },
              { name: post.category, url: "/blog" },
            ]}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "1.5rem 0 1rem",
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
            <span style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
              Published {post.publishDate} · {post.readTime}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#9E9EA6",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.25rem",
              borderRadius: "14px",
              background: "#141418",
              border: "1px solid #23232a",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #38bdf8, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#050508",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              AV
            </div>
            <div>
              <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "14px" }}>
                {post.author.name}
              </div>
              <div style={{ color: "var(--c-text-muted)", fontSize: "12px" }}>
                {post.author.role} · {post.author.bio}
              </div>
            </div>
          </div>

          {/* Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div
              style={{
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(168, 85, 247, 0.05))",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                borderRadius: "16px",
                padding: "2rem",
                marginBottom: "3.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  color: "#38bdf8",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                  fontWeight: 700,
                }}
              >
                Key Architecture Takeaways
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {post.keyTakeaways.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      color: "#e5e5e7",
                      fontSize: "15px",
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {post.content.map((sec, i) => (
              <section key={i}>
                <h2
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {sec.sectionTitle}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        color: "#c2c2ca",
                        fontSize: "16px",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div
            style={{
              marginTop: "5rem",
              paddingTop: "2rem",
              borderTop: "1px solid #23232a",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Link href="/blog" className="btn btn-ghost btn-sm">
              <ArrowLeft style={{ width: "14px", height: "14px" }} />
              All Articles
            </Link>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Discuss Your Project With Us
              <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
