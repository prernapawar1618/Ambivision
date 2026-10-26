import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Bot,
  Smartphone,
  LayoutGrid,
  ShoppingBag,
  Server,
  Search,
  Globe,
  CheckCircle,
  ArrowUpRight,
  Activity,
  PlayCircle,
  BookOpen,
  MapPin,
  Mic,
} from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/seo-config";
import { SERVICES_DATA } from "@/data/services-data";
import { CASE_STUDIES_DATA } from "@/data/case-studies-data";

export const metadata: Metadata = {
  title: {
    absolute: "AmbiVision | Turning Ambition Into Reality",
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: "https://ambivision.in/",
  },
  openGraph: {
    title: "AmbiVision | Turning Ambition Into Reality",
    description: SITE_CONFIG.description,
    url: "https://ambivision.in/",
    siteName: "AmbiVision",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://ambivision.in/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "AmbiVision — Turning Ambition Into Reality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmbiVision | Turning Ambition Into Reality",
    description: SITE_CONFIG.description,
    creator: "@ambivisionstudio",
    images: ["https://ambivision.in/images/og-default.png"],
  },
};

function FeaturedProjectCards({
  isDuplicate = false,
  keyPrefix = "p",
}: {
  isDuplicate?: boolean;
  keyPrefix?: string;
}) {
  return (
    <React.Fragment>
      {/* ---------------- PROJECT 1: STOCK MARKET ---------------- */}
      <Link
        key={`${keyPrefix}-stock`}
        href="/work/real-time-stock-market"
        className="project-marquee-card"
        tabIndex={isDuplicate ? -1 : undefined}
      >
        {/* Mockup Box */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/10",
            background: "#1C1C1F",
            border: "1px solid #2A2A30",
            borderRadius: "16px",
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderBottom: "1px solid #2A2A30",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#eab308",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              <Activity style={{ width: "14px", height: "14px" }} />
              <span>NASDAQ: AMBI • LIVE</span>
            </div>
            <span
              style={{
                color: "#34d399",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              +14.82% ▲
            </span>
          </div>
          <div
            style={{
              padding: "0 1rem 1rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                height: "12px",
                background: "#121214",
                borderRadius: "9999px",
                marginBottom: "1rem",
                width: "75%",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                height: "64px",
              }}
            >
              <div
                style={{
                  width: "16%",
                  height: "30%",
                  background: "#eab308",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                }}
              ></div>
              <div
                style={{
                  width: "16%",
                  height: "50%",
                  background: "#eab308",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                }}
              ></div>
              <div
                style={{
                  width: "16%",
                  height: "40%",
                  background: "#eab308",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                }}
              ></div>
              <div
                style={{
                  width: "16%",
                  height: "60%",
                  background: "#eab308",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                }}
              ></div>
              <div
                style={{
                  width: "16%",
                  height: "100%",
                  background: "#3b82f6",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "rgba(234, 179, 8, 0.1)",
              color: "#eab308",
              border: "1px solid rgba(234, 179, 8, 0.2)",
              fontSize: "9px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            FINTECH
          </span>
          <span
            style={{
              color: "#9E9EA6",
              fontSize: "11px",
              fontFamily: "monospace",
            }}
          >
            Real-Time WebSocket Data
          </span>
        </div>
        <h3
          style={{
            fontSize: "1.45rem",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "0.5rem",
          }}
        >
          Real-Time Stock Market App
        </h3>
        <p
          style={{
            color: "#9E9EA6",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            flexGrow: 1,
          }}
        >
          Ultra-low latency trading dashboard equipped with custom
          candlestick charts, algorithmic price alerts, and AI-driven
          market insights.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2A2A30",
            paddingTop: "1rem",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#eab308",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <PlayCircle style={{ width: "16px", height: "16px" }} />
            <span>Preview</span>
          </div>
          <span
            style={{
              color: "#64646C",
              fontSize: "10px",
              textTransform: "uppercase",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            Apex Financial
          </span>
        </div>


      </Link>

      {/* ---------------- PROJECT 2: AI LMS ---------------- */}
      <Link
        key={`${keyPrefix}-lms`}
        href="/work/ai-powered-lms"
        className="project-marquee-card"
        tabIndex={isDuplicate ? -1 : undefined}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16/10",
            background: "#1C1C1F",
            border: "1px solid #2A2A30",
            borderRadius: "16px",
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderBottom: "1px solid #2A2A30",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#c084fc",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              <BookOpen style={{ width: "14px", height: "14px" }} />
              <span>AI LMS • GENERATIVE QUIZ</span>
            </div>
            <span
              style={{
                color: "#9E9EA6",
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              98% Mastery
            </span>
          </div>
          <div
            style={{
              padding: "1rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  background: "#121214",
                  border: "1px solid #2A2A30",
                  borderRadius: "12px",
                  padding: "0.75rem",
                }}
              >
                <div
                  style={{
                    color: "#64646C",
                    fontSize: "10px",
                    marginBottom: "4px",
                  }}
                >
                  Adaptive Path
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Neural Networks 101
                </div>
              </div>
              <div
                style={{
                  background: "#121214",
                  border: "1px solid #2A2A30",
                  borderRadius: "12px",
                  padding: "0.75rem",
                }}
              >
                <div
                  style={{
                    color: "#64646C",
                    fontSize: "10px",
                    marginBottom: "4px",
                  }}
                >
                  AI Assistant
                </div>
                <div
                  style={{
                    color: "#eab308",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Active & Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "rgba(192, 132, 252, 0.1)",
              color: "#c084fc",
              border: "1px solid rgba(192, 132, 252, 0.2)",
              fontSize: "9px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            EDTECH / AI
          </span>
          <span
            style={{
              color: "#9E9EA6",
              fontSize: "11px",
              fontFamily: "monospace",
            }}
          >
            Personalized Learning Engine
          </span>
        </div>
        <h3
          style={{
            fontSize: "1.45rem",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "0.5rem",
          }}
        >
          AI-Powered LMS
        </h3>
        <p
          style={{
            color: "#9E9EA6",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            flexGrow: 1,
          }}
        >
          Intelligent learning management system featuring dynamic
          AI-generated quizzes, real-time student analytics, and custom
          progress tracking.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2A2A30",
            paddingTop: "1rem",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#eab308",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <PlayCircle style={{ width: "16px", height: "16px" }} />
            <span>Preview</span>
          </div>
          <span
            style={{
              color: "#64646C",
              fontSize: "10px",
              textTransform: "uppercase",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            EdTech Innovations
          </span>
        </div>
      </Link>

      {/* ---------------- PROJECT 3: LOGISTICS ---------------- */}
      <Link
        key={`${keyPrefix}-delivery`}
        href="/work/food-delivery-platform"
        className="project-marquee-card"
        tabIndex={isDuplicate ? -1 : undefined}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16/10",
            background: "#1C1C1F",
            border: "1px solid #2A2A30",
            borderRadius: "16px",
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderBottom: "1px solid #2A2A30",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#34d399",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              <MapPin style={{ width: "14px", height: "14px" }} />
              <span>LOGISTICS • LIVE MAP</span>
            </div>
            <span
              style={{
                color: "#ffffff",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              ETA: 12 mins
            </span>
          </div>
          <div
            style={{
              padding: "1rem",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "1.5rem",
            }}
          >
            <div
              style={{
                background: "#121214",
                border: "1px solid #2A2A30",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                width: "100%",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#eab308",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  letterSpacing: "0.05em",
                }}
              >
                GPS Routing Active
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "rgba(52, 211, 153, 0.1)",
              color: "#34d399",
              border: "1px solid rgba(52, 211, 153, 0.2)",
              fontSize: "9px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            LOGISTICS
          </span>
          <span
            style={{
              color: "#9E9EA6",
              fontSize: "11px",
              fontFamily: "monospace",
            }}
          >
            Real-Time Geolocation
          </span>
        </div>
        <h3
          style={{
            fontSize: "1.45rem",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "0.5rem",
          }}
        >
          Food Delivery Platform
        </h3>
        <p
          style={{
            color: "#9E9EA6",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            flexGrow: 1,
          }}
        >
          Comprehensive multi-vendor food ordering app featuring live GPS
          driver tracking, restaurant management dashboard, and instant
          push alerts.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2A2A30",
            paddingTop: "1rem",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#eab308",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <PlayCircle style={{ width: "16px", height: "16px" }} />
            <span>Preview</span>
          </div>
          <span
            style={{
              color: "#64646C",
              fontSize: "10px",
              textTransform: "uppercase",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            SwiftEats Logistics
          </span>
        </div>
      </Link>

      {/* ---------------- PROJECT 4: AI INTERVIEW AGENT ---------------- */}
      <Link
        key={`${keyPrefix}-interview`}
        href="/work/ai-interview-agent"
        className="project-marquee-card"
        tabIndex={isDuplicate ? -1 : undefined}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16/10",
            background: "#1C1C1F",
            border: "1px solid #2A2A30",
            borderRadius: "16px",
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderBottom: "1px solid #2A2A30",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#60a5fa",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              <Mic style={{ width: "14px", height: "14px" }} />
              <span>AI AGENT • VOICE V1</span>
            </div>
            <span
              style={{
                color: "#eab308",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              Analyzing...
            </span>
          </div>
          <div
            style={{
              padding: "1rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "16px",
                  background: "#3b82f6",
                  borderRadius: "9999px",
                }}
              ></div>
              <div
                style={{
                  width: "6px",
                  height: "32px",
                  background: "#60a5fa",
                  borderRadius: "9999px",
                }}
              ></div>
              <div
                style={{
                  width: "6px",
                  height: "48px",
                  background: "#eab308",
                  borderRadius: "9999px",
                }}
              ></div>
              <div
                style={{
                  width: "6px",
                  height: "28px",
                  background: "#60a5fa",
                  borderRadius: "9999px",
                }}
              ></div>
              <div
                style={{
                  width: "6px",
                  height: "20px",
                  background: "#3b82f6",
                  borderRadius: "9999px",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "rgba(96, 165, 250, 0.1)",
              color: "#60a5fa",
              border: "1px solid rgba(96, 165, 250, 0.2)",
              fontSize: "9px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            AI / HR TECH
          </span>
          <span
            style={{
              color: "#9E9EA6",
              fontSize: "11px",
              fontFamily: "monospace",
            }}
          >
            Voice & Behavioral Analytics
          </span>
        </div>
        <h3
          style={{
            fontSize: "1.45rem",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "0.5rem",
          }}
        >
          AI Interview Agent
        </h3>
        <p
          style={{
            color: "#9E9EA6",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            flexGrow: 1,
          }}
        >
          Autonomous conversational AI interviewer that evaluates
          technical proficiency, emotional intelligence, and candidate
          suitability in real time.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2A2A30",
            paddingTop: "1rem",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#eab308",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <PlayCircle style={{ width: "16px", height: "16px" }} />
            <span>Preview</span>
          </div>
          <span
            style={{
              color: "#64646C",
              fontSize: "10px",
              textTransform: "uppercase",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            TalentScale Global
          </span>
        </div>
      </Link>
    </React.Fragment>
  );
}

export default function HomePage() {
  const faqList = [
    {
      question: "What core services does AmbiVision provide?",
      answer:
        "AmbiVision provides end-to-end digital engineering: Next.js Web Development, UI/UX & Product Design, React Native Mobile App Development, Custom AI Solutions & Agents, Custom Backend Software, Headless E-commerce, and Technical SEO & AI Search Optimization (GEO).",
    },
    {
      question: "How long does a typical digital product project take?",
      answer:
        "Timelines vary by scope. A Startup MVP web platform typically takes 6–8 weeks. A mobile app takes 8–12 weeks. An enterprise custom software or AI agent workflow takes 12–20 weeks. We provide detailed sprint milestones during our initial architecture discovery.",
    },
    {
      question: "How is your pricing structured?",
      answer:
        "We work on fixed-scope milestone projects and dedicated monthly engineering retainers. All pricing is transparent with clear deliverable definitions and zero surprise fees.",
    },
    {
      question: "Do you work with international clients outside of India?",
      answer:
        "Yes. We collaborate seamlessly with clients across the United States, United Kingdom, United Arab Emirates, Singapore, Australia, and India using asynchronous communication and scheduled video alignment sprints.",
    },
    {
      question:
        "How does AmbiVision prepare websites for AI Search and Google AI Overviews?",
      answer:
        "We engineer websites with high information density, server-side rendered HTML, verified Schema.org JSON-LD, passing Core Web Vitals, and direct answer summaries that AI models (Google AI Overviews, ChatGPT Search, Gemini) cite as authoritative sources.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section id="hero" className="hero" aria-label="AmbiVision hero banner">
        <div className="hero-bg-orb hero-bg-orb-1" aria-hidden="true" />
        <div className="hero-bg-orb hero-bg-orb-2" aria-hidden="true" />
        <HeroCanvas />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-status-pill anim-in">
                <span className="hero-dot" aria-hidden="true" />
                Available for New Projects · 24*7
              </div>

              <h1 className="hero-title">
                <span className="sr-only">AmbiVision — </span>
                Turning Ambition
                <br />
                <em>Into Reality.</em>
              </h1>

              <p className="hero-desc anim-in anim-delay-2">
                At AmbiVision, we engineer high-performance web platforms,
                intelligent AI agents, intuitive mobile apps, and scalable digital
                systems for ambitious brands worldwide.
              </p>

              <div className="hero-actions anim-in anim-delay-3">
                <Link href="/#contact" className="btn btn-primary btn-lg">
                  Start Your Project
                  <ArrowRight
                    style={{ width: "16px", height: "16px" }}
                    aria-hidden="true"
                  />
                </Link>
                <Link href="/#work" className="btn btn-ghost btn-lg">
                  Explore Our Work
                </Link>
              </div>

              <div
                className="hero-stats anim-in anim-delay-4"
                aria-label="Studio highlights"
              >
                <div className="hero-stat">
                  <span className="hero-stat-value">99.9%</span>
                  <span className="hero-stat-label">Uptime Target</span>
                </div>
                <div className="hero-divider" aria-hidden="true" />
                <div className="hero-stat">
                  <span className="hero-stat-value">Full-Stack</span>
                  <span className="hero-stat-label">Web to AI</span>
                </div>
                <div className="hero-divider" aria-hidden="true" />
                <div className="hero-stat">
                  <span className="hero-stat-value">7</span>
                  <span className="hero-stat-label">Core Disciplines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES STRIP ──────────────────────────────────── */}
      <div className="capabilities-strip" aria-label="Technology capabilities">
        <div className="container">
          <div className="capabilities-inner">
            <div className="capabilities-label">
              <Layers
                style={{
                  width: "14px",
                  height: "14px",
                  color: "var(--c-cyan)",
                }}
                aria-hidden="true"
              />
              Built with industry-leading technologies
            </div>
            <div className="tech-list" role="list">
              <span className="tech-pill" role="listitem">
                Next.js
              </span>
              <span className="tech-pill" role="listitem">
                React.js
              </span>
              <span className="tech-pill" role="listitem">
                TypeScript
              </span>
              <span className="tech-pill" role="listitem">
                Python
              </span>
              <span className="tech-pill" role="listitem">
                MongoDB
              </span>
              <span className="tech-pill" role="listitem">
                Node.js
              </span>
              <span className="tech-pill" role="listitem">
                PostgreSQL
              </span>
              <span className="tech-pill" role="listitem">
                Canva
              </span>
              <span className="tech-pill" role="listitem">
                Figma
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CORE SERVICES SECTION ───────────────────────────────── */}
      <section
        id="services"
        className="section-pad"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="label">
                <LayoutGrid
                  style={{ width: "14px", height: "14px" }}
                  aria-hidden="true"
                />
                Engineering Disciplines
              </span>
              <h2 id="services-heading" className="section-title">
                We Build Digital Products
                <br />
                That Move Markets.
              </h2>
            </div>
            <p className="section-subtitle" style={{ maxWidth: "420px" }}>
              Seven focused engineering capabilities. One cohesive technical
              team. Built to deliver business outcomes, not just deliverables.
            </p>
          </div>

          <div className="services-grid">
            {/* 1. Web Development */}
            <article
              className="service-card featured"
              aria-label="Web Design & Development service"
            >
              <div>
                <div className="service-card-top">
                  <span className="service-number">01 / Web</span>
                  <div className="service-icon" aria-hidden="true">
                    <Globe style={{ width: "18px", height: "18px" }} />
                  </div>
                </div>
                <h3 className="service-name">
                  <Link
                    href="/services/web-design-development"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Web Design &amp; Development
                  </Link>
                </h3>
                <p className="service-desc">
                  Blazing-fast, SEO-optimised web platforms engineered on
                  Next.js, React, and Node.js with cloud infrastructure built to
                  perform under real-world traffic.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-tech">
                  Next.js · React · TypeScript · PostgreSQL
                </span>
                <Link
                  href="/services/web-design-development"
                  className="service-cta"
                  aria-label="View Web Design & Development service details"
                >
                  <ArrowRight style={{ width: "15px", height: "15px" }} />
                </Link>
              </div>
            </article>

            {/* 4. UI/UX Design */}
            <article className="service-card" aria-label="UI/UX Design service">
              <div>
                <div className="service-card-top">
                  <span className="service-number">04 / Design</span>
                  <div className="service-icon" aria-hidden="true">
                    <Layers style={{ width: "18px", height: "18px" }} />
                  </div>
                </div>
                <h3 className="service-name">
                  <Link
                    href="/services/ui-ux-design"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    UI/UX &amp; Product Design
                  </Link>
                </h3>
                <p className="service-desc">
                  Research-driven design systems, wireframes, prototypes, and
                  polished interfaces that convert users and elevate brand
                  equity.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-tech">
                  Figma · Design Systems · User Research
                </span>
                <Link
                  href="/services/ui-ux-design"
                  className="service-cta"
                  aria-label="View UI/UX Design service details"
                >
                  <ArrowRight style={{ width: "15px", height: "15px" }} />
                </Link>
              </div>
            </article>

            {/* 5. Custom Software */}
            <article
              className="service-card"
              aria-label="Custom Software Development service"
            >
              <div>
                <div className="service-card-top">
                  <span className="service-number">05 / Software</span>
                  <div className="service-icon" aria-hidden="true">
                    <Server style={{ width: "18px", height: "18px" }} />
                  </div>
                </div>
                <h3 className="service-name">
                  <Link
                    href="/services/custom-software-development"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Custom Software Development
                  </Link>
                </h3>
                <p className="service-desc">
                  Enterprise-grade backend architecture, microservices,
                  high-throughput APIs, and cloud-native infrastructure
                  engineered to scale.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-tech">
                  Go · Node.js · Docker · Kubernetes · AWS
                </span>
                <Link
                  href="/services/custom-software-development"
                  className="service-cta"
                  aria-label="View Custom Software service details"
                >
                  <ArrowRight style={{ width: "15px", height: "15px" }} />
                </Link>
              </div>
            </article>

            {/* 6. E-commerce */}
            <article
              className="service-card"
              aria-label="E-commerce Development service"
            >
              <div>
                <div className="service-card-top">
                  <span className="service-number">06 / E-Commerce</span>
                  <div className="service-icon" aria-hidden="true">
                    <ShoppingBag style={{ width: "18px", height: "18px" }} />
                  </div>
                </div>
                <h3 className="service-name">
                  <Link
                    href="/services/ecommerce-development"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    E-commerce Development
                  </Link>
                </h3>
                <p className="service-desc">
                  Custom headless storefronts with Next.js Commerce, Shopify
                  integrations, multi-currency checkout, and automated inventory
                  sync.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-tech">
                  Shopify · Next.js · Razorpay · Stripe
                </span>
                <Link
                  href="/services/ecommerce-development"
                  className="service-cta"
                  aria-label="View E-commerce service details"
                >
                  <ArrowRight style={{ width: "15px", height: "15px" }} />
                </Link>
              </div>
            </article>

            {/* 7. SEO & AI Search */}
            <article
              className="service-card"
              aria-label="SEO and AI Search Optimization service"
            >
              <div>
                <div className="service-card-top">
                  <span className="service-number">07 / SEO</span>
                  <div className="service-icon" aria-hidden="true">
                    <Search style={{ width: "18px", height: "18px" }} />
                  </div>
                </div>
                <h3 className="service-name">
                  <Link
                    href="/services/seo-ai-search-optimization"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Technical SEO &amp; AI Search (GEO)
                  </Link>
                </h3>
                <p className="service-desc">
                  Core Web Vitals remediation, semantic Schema.org JSON-LD
                  architecture, and readiness for Google AI Overviews and
                  ChatGPT Search.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-tech">
                  Schema.org · Core Web Vitals · Lighthouse
                </span>
                <Link
                  href="/services/seo-ai-search-optimization"
                  className="service-cta"
                  aria-label="View Technical SEO service details"
                >
                  <ArrowRight style={{ width: "15px", height: "15px" }} />
                </Link>
              </div>
            </article>
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/services" className="btn btn-ghost btn-lg">
              View Comprehensive Services Directory
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
          </div>
        </div>
      </section>


      {/* ── SELECTED WORK SECTION ───────────────────────────────── */}
      <section
        id="work"
        className="section-pad bg-carbon-section"
        aria-labelledby="work-heading"
        style={{ overflow: "hidden" }}
      >
        <div className="container">
          <div className="section-header-row mb-12">
            <div>
              <span className="label">
                <Layers
                  style={{ width: "14px", height: "14px" }}
                  aria-hidden="true"
                />
                Featured Projects
              </span>
              <h2 id="work-heading" className="section-title">
                Digital Products Built
                <br />
                for Real Impact.
              </h2>
            </div>
            <p className="section-subtitle" style={{ maxWidth: "420px" }}>
              Deep architectural case studies demonstrating our engineering
              standards, performance benchmarks, and problem-solving
              methodology.
            </p>
          </div>
        </div>

        {/* Continuous Right-to-Left Horizontal Scrolling Showcase */}
        <div
          className="projects-marquee-wrapper"
          aria-label="Featured Projects Showcase"
        >
          <div className="projects-marquee-track">
            {/* Primary Track Group */}
            <div className="projects-marquee-group">
              <FeaturedProjectCards isDuplicate={false} keyPrefix="track-a1" />
              <FeaturedProjectCards isDuplicate={true} keyPrefix="track-a2" />
            </div>

            {/* Duplicate Track Group for seamless infinite loop */}
            <div className="projects-marquee-group" aria-hidden="true">
              <FeaturedProjectCards isDuplicate={true} keyPrefix="track-b1" />
              <FeaturedProjectCards isDuplicate={true} keyPrefix="track-b2" />
            </div>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY SECTION ─────────────────────────────────── */}
      <section
        id="process"
        className="section-pad"
        aria-labelledby="process-heading"
      >
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3.5rem" }}>
            <span className="label" style={{ justifyContent: "center" }}>
              <CheckCircle
                style={{ width: "14px", height: "14px" }}
                aria-hidden="true"
              />
              Methodology
            </span>
            <h2 id="process-heading" className="section-title">
              How We Build
            </h2>
            <p
              className="section-subtitle"
              style={{
                margin: "1rem auto 0",
                maxWidth: "480px",
                textAlign: "center",
              }}
            >
              From your first idea to the final launch, we make the journey simple and bring your vision to life.
            </p>
          </div>

          <div className="process-grid">
            <article className="process-card">
              <span className="process-step">01</span>
              <h3 className="process-title">Discover</h3>
            </article>

            <article className="process-card">
              <span className="process-step">02</span>
              <h3 className="process-title">Strategize</h3>
            </article>

            <article className="process-card">
              <span className="process-step">03</span>
              <h3 className="process-title">Design</h3>
            </article>

            <article className="process-card">
              <span className="process-step">04</span>
              <h3 className="process-title">Develop</h3>
            </article>

            <article className="process-card">
              <span className="process-step">05</span>
              <h3 className="process-title">Test</h3>
            </article>

            <article className="process-card">
              <span className="process-step">06</span>
              <h3 className="process-title">Launch</h3>
            </article>

            <article className="process-card">
              <span className="process-step">07</span>
              <h3 className="process-title">Scale</h3>
            </article>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────── */}
      <section
        id="faq"
        className="section-pad bg-carbon-section"
        aria-labelledby="faq-heading"
      >
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label" style={{ justifyContent: "center" }}>
              Frequently Asked Questions
            </span>
            <h2 id="faq-heading" className="section-title">
              Answers to Common Questions
            </h2>
            <p
              className="section-subtitle"
              style={{ margin: "1rem auto 0", textAlign: "center" }}
            >
              Clear, transparent answers regarding our engineering standards,
              timelines, pricing, and project workflows.
            </p>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {faqList.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--r-xl)",
                  padding: "0.75rem 1.5rem",
                }}
              >
                <summary
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "var(--fs-lg)",
                    fontWeight: 500,
                    opacity: 0.5,
                    color: "var(--c-text-primary)",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {faq.question}
                </summary>
                <p
                  style={{
                    marginTop: "0.85rem",
                    color: "var(--c-text-secondary)",
                    lineHeight: 1.7,
                    fontSize: "var(--fs-base)",
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ─────────────────────────────────────── */}
      <section
        id="contact"
        className="section-pad"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <div className="contact-grid">
            <div>
              <span className="label">Start a Project</span>
              <h2
                id="contact-heading"
                className="section-title"
                style={{ fontSize: "var(--fs-4xl)", marginBottom: "1.25rem" }}
              >
                Let&apos;s Build Something
                <br />
                Exceptional Together.
              </h2>
              <p
                style={{
                  fontSize: "var(--fs-base)",
                  color: "var(--c-text-secondary)",
                  lineHeight: 1.8,
                  maxWidth: "440px",
                  marginBottom: "2.5rem",
                }}
              >
                Tell us about your project. Our principal engineers review all
                inquiries and respond within one business day with initial
                feedback and discovery scheduling.
              </p>

              <div className="contact-info">
                <div className="contact-detail">
                  <div>
                    <p className="contact-detail-label">Direct Email</p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="contact-detail-value"
                      style={{
                        color: "var(--c-cyan)",
                        textDecoration: "underline",
                      }}
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="contact-detail">
                  <div>
                    <p className="contact-detail-label">Response Guarantee</p>
                    <p className="contact-detail-value">
                      With in 1 business day
                    </p>
                  </div>
                </div>

                <div className="contact-detail">
                  <div>
                    <p className="contact-detail-label">Working With</p>
                    <p className="contact-detail-value">
                      India &amp; International Clients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>


    </>
  );
}
