"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  BookOpen,
  MapPin,
  Mic,
  PlayCircle,
  CheckCircle2,
  Cpu,
  Zap,
} from "lucide-react";

const PROJECT_DETAILS: Record<string, any> = {
  "real-time-stock-market": {
    title: "Real-Time Stock Market App",
    category: "FINTECH",
    client: "Apex Financial",
    duration: "8 Weeks",
    services: ["UX Research", "Web Architecture", "Frontend Engineering"],
    overview:
      "Transforming high-frequency trading data into a seamless, low-latency dashboard that empowers traders to execute decisions without visual or performance lag.",
    challenge:
      "During periods of extreme market volatility, retail and institutional day traders experienced frequent chart freezes, delayed order book updates, and bloated interfaces. This lag caused users to miss critical pricing windows and arbitrage opportunities.",
    painPoints: [
      "High DOM re-rendering latency during high-volume market spikes",
      "Cluttered interfaces causing cognitive overload and misclicks under pressure",
      "Lack of intuitive customization for multi-monitor or dark-mode trading environments",
    ],
    solution:
      "We engineered an ultra-lightweight, high-frequency rendering pipeline using HTML5 Canvas and Next.js, combined with a dedicated WebSocket architecture. The UI was stripped of unnecessary visual noise, establishing a razor-sharp hierarchy that prioritizes real-time price action and rapid execution triggers.",
    architecture: [
      "Next.js App Router for instant initial server-side hydration",
      "Dedicated WebSocket clusters managing 50,000+ concurrent live tickers",
      "Tailwind CSS & Canvas pipeline engineered for stable 60fps rendering",
      "Redis caching layer ensuring sub-millisecond order book synchronization",
    ],
    metrics: [
      { label: "Data Latency", value: "< 14ms" },
      { label: "Concurrent Users", value: "50,000+" },
      { label: "Uptime SLA", value: "99.99%" },
    ],
  },
  "ai-powered-lms": {
    title: "AI-Powered LMS",
    category: "EDTECH / AI",
    client: "EdTech Innovations",
    duration: "10 Weeks",
    services: ["UX/UI Design", "AI Integration", "Full-Stack Development"],
    overview:
      "Reimagining online education through an intelligent Learning Management System that adapts dynamically to every student's individual learning speed and comprehension level.",
    challenge:
      "Traditional online courses force a rigid 'one-size-fits-all' progression. Advanced students grew bored by redundant lessons, while struggling learners fell behind due to a lack of immediate, personalized feedback loops.",
    painPoints: [
      "High drop-off rates caused by unengaging, linear course structures",
      "Delayed grading cycles (24-48 hours) killing student motivation",
      "Instructors spending excessive manual hours creating custom quizzes",
    ],
    solution:
      "We designed a gamified, distraction-free student workspace driven by background AI models. The platform continuously evaluates user answer accuracy, automatically spinning up custom diagnostic quizzes and micro-lessons targeted precisely at identified knowledge gaps.",
    architecture: [
      "OpenAI GPT-4o integration for real-time quiz generation & automated essay assessment",
      "Pinecone vector database for context-aware tutoring and instant query retrieval",
      "Next.js Server Actions for seamless, lag-free state management",
      "PostgreSQL database with Prisma ORM for secure tracking of learner metrics",
    ],
    metrics: [
      { label: "Quiz Generation Speed", value: "1.2s avg" },
      { label: "Student Retention", value: "+42%" },
      { label: "Engagement Score", value: "98/100" },
    ],
  },
  "food-delivery-platform": {
    title: "Food Delivery Platform",
    category: "LOGISTICS",
    client: "SwiftEats Logistics",
    duration: "12 Weeks",
    services: ["Product Strategy", "Mobile & Web UI/UX", "Logistics Mapping"],
    overview:
      "A comprehensive multi-vendor food ordering and logistics ecosystem built to give independent restaurants direct customer channels and real-time delivery visibility.",
    challenge:
      "Independent restaurants were losing up to 30% of their margins to third-party aggregator commissions. Meanwhile, customers suffered from anxiety caused by inaccurate delivery ETAs and lack of communication during peak hours.",
    painPoints: [
      "High aggregator commissions squeezing restaurant profit margins",
      "Customer frustration due to lack of live, accurate map tracking for orders",
      "Fragmented communication between restaurants, drivers, and hungry patrons",
    ],
    solution:
      "We crafted a streamlined 3-step checkout flow, a merchant management dashboard, and a rider tracking app. By integrating real-time geospatial queries, customers can watch their delivery live on an interactive map, drastically cutting down support inquiries.",
    architecture: [
      "Real-time geospatial indexing using Redis Geo commands for accurate rider matching",
      "React Native cross-platform mobile app paired with a lightning-fast Next.js merchant portal",
      "Stripe Connect integration for automated multi-vendor split-payments",
      "Automated push notification & SMS dispatch pipelines via Firebase and Twilio",
    ],
    metrics: [
      { label: "Order Dispatch Speed", value: "45 sec" },
      { label: "Order Accuracy", value: "99.4%" },
      { label: "Active Delivery Riders", value: "1,200+" },
    ],
  },
  "ai-interview-agent": {
    title: "AI Interview Agent",
    category: "AI / HR TECH",
    client: "TalentScale Global",
    duration: "6 Weeks",
    services: ["Conversational UX", "WebRTC Audio Pipeline", "Dashboard UI"],
    overview:
      "An autonomous conversational AI interviewer designed to streamline initial recruitment screening through natural voice interaction and automated, unbiased candidate evaluations.",
    challenge:
      "HR teams and hiring managers waste countless hours conducting repetitive initial screening calls. This bottleneck leads to delayed hiring pipelines, scheduling conflicts, and unconscious human screening bias.",
    painPoints: [
      "Recruiters overwhelmed by hundreds of initial resume-screening calls",
      "Candidate drop-offs due to rigid interview scheduling conflicts",
      "Inconsistent and subjective evaluation criteria across different interviewers",
    ],
    solution:
      "We designed an accessible, human-centric candidate interface paired with an ultra-low-latency voice agent. The AI speaks naturally, listens to technical reasoning via speech-to-text, maps answers against strict custom rubrics, and generates instant, objective scorecards for hiring managers.",
    architecture: [
      "WebRTC audio streaming pipeline for real-time, zero-lag voice conversation",
      "Whisper Speech-to-Text (STT) combined with customized LLM evaluation logic",
      "Vector database scoring matrix for consistent, bias-free candidate rubrics",
      "Secure encrypted storage for audio logs, transcripts, and evaluation metrics",
    ],
    metrics: [
      { label: "Evaluation Time", value: "Instant" },
      { label: "Bias Reduction", value: "-68%" },
      { label: "Hiring Manager NPS", value: "78" },
    ],
  },
};

// Route key aliases for robust deep linking
PROJECT_DETAILS["stock-market-dashboard"] = PROJECT_DETAILS["real-time-stock-market"];
PROJECT_DETAILS["ai-learning-management-system"] = PROJECT_DETAILS["ai-powered-lms"];


export default function ProjectClientView({ slug }: { slug: string }) {
  const project =
    PROJECT_DETAILS[slug] || PROJECT_DETAILS["real-time-stock-market"];

  // Interactive Widget States
  const [stockPrice, setStockPrice] = useState(148.2);
  const [isTradingActive, setIsTradingActive] = useState(true);

  const [quizTopic, setQuizTopic] = useState("Neural Networks");
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const [orderStatus, setOrderStatus] = useState("Driver Assigned");
  const [driverPos, setDriverPos] = useState(20);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(
    "Press 'Start Speaking' to test the AI interviewer voice agent...",
  );

  useEffect(() => {
    if (slug !== "real-time-stock-market" || !isTradingActive) return;
    const interval = setInterval(() => {
      setStockPrice((prev) => +(prev + (Math.random() * 2 - 0.9)).toFixed(2));
    }, 1500);
    return () => clearInterval(interval);
  }, [slug, isTradingActive]);

  return (
    <div
      style={{
        background: "#121214",
        color: "#ffffff",
        minHeight: "100vh",
        paddingBottom: "6rem",
      }}
    >
      {/* Top Navigation Bar */}
      <div
        style={{ borderBottom: "1px solid #2A2A30", padding: "1.25rem 2rem" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#9E9EA6",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
            Back to AmbiVision Home
          </Link>
          <span
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
              color: "#eab308",
              background: "rgba(234, 179, 8, 0.1)",
              padding: "4px 10px",
              borderRadius: "99px",
              border: "1px solid rgba(234, 179, 8, 0.2)",
            }}
          >
            INTERACTIVE PREVIEW MODE
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "4rem auto 3rem",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(234, 179, 8, 0.1)",
              color: "#eab308",
              border: "1px solid rgba(234, 179, 8, 0.2)",
              fontSize: "11px",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              color: "#9E9EA6",
              fontSize: "13px",
              fontFamily: "monospace",
            }}
          >
            Client: {project.client}
          </span>
        </div>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
          }}
        >
          {project.title}
        </h1>
        <p
          style={{
            color: "#9E9EA6",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            maxWidth: "800px",
          }}
        >
          {project.overview}
        </p>
      </div>

      {/* ── LIVE INTERACTIVE SIMULATION WIDGET ────────────────────── */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto 4rem", padding: "0 2rem" }}
      >
        <div
          style={{
            background: "#161618",
            border: "1px solid #2A2A30",
            borderRadius: "24px",
            padding: "2rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              borderBottom: "1px solid #2A2A30",
              paddingBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 10px #34d399",
                }}
              ></div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  letterSpacing: "0.05em",
                  fontFamily: "monospace",
                }}
              >
                LIVE SANDBOX ENVIRONMENT — {project.title.toUpperCase()}
              </h3>
            </div>
            <span
              style={{
                fontSize: "12px",
                color: "#64646C",
                fontFamily: "monospace",
              }}
            >
              Fully Interactive
            </span>
          </div>

          {/* PROJECT 1 WIDGET: STOCK MARKET */}
          {slug === "real-time-stock-market" && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    background: "#1C1C1F",
                    padding: "1.25rem",
                    borderRadius: "16px",
                    border: "1px solid #2A2A30",
                  }}
                >
                  <div
                    style={{
                      color: "#9E9EA6",
                      fontSize: "12px",
                      marginBottom: "6px",
                    }}
                  >
                    NASDAQ: AMBI (Live Ticker)
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: 900,
                      color: "#34d399",
                    }}
                  >
                    ${stockPrice}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#34d399",
                      marginTop: "4px",
                    }}
                  >
                    ▲ +2.41% Today
                  </div>
                </div>
                <div
                  style={{
                    background: "#1C1C1F",
                    padding: "1.25rem",
                    borderRadius: "16px",
                    border: "1px solid #2A2A30",
                  }}
                >
                  <div
                    style={{
                      color: "#9E9EA6",
                      fontSize: "12px",
                      marginBottom: "6px",
                    }}
                  >
                    Algorithm Status
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: isTradingActive ? "#eab308" : "#ef4444",
                    }}
                  >
                    {isTradingActive ? "AI Arbitrage Active" : "Paused"}
                  </div>
                  <button
                    onClick={() => setIsTradingActive(!isTradingActive)}
                    style={{
                      marginTop: "8px",
                      background: isTradingActive
                        ? "rgba(239, 68, 68, 0.2)"
                        : "rgba(52, 211, 153, 0.2)",
                      color: isTradingActive ? "#ef4444" : "#34d399",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {isTradingActive ? "Pause Stream" : "Resume Stream"}
                  </button>
                </div>
              </div>
              <div
                style={{
                  background: "#121214",
                  padding: "1.5rem",
                  borderRadius: "16px",
                  border: "1px solid #2A2A30",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "#9E9EA6",
                    fontSize: "14px",
                    marginBottom: "1rem",
                  }}
                >
                  Simulating live WebSocket order book updates and candlestick
                  fluctuations.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "12px",
                    alignItems: "flex-end",
                    height: "120px",
                  }}
                >
                  {[
                    40,
                    65,
                    45,
                    80,
                    60,
                    95,
                    75,
                    110,
                    stockPrice > 149 ? 130 : 90,
                  ].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: "24px",
                        height: `${h}px`,
                        background: i % 2 === 0 ? "#eab308" : "#3b82f6",
                        borderRadius: "4px",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 2 WIDGET: AI LMS */}
          {slug === "ai-powered-lms" && (
            <div
              style={{
                background: "#1C1C1F",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid #2A2A30",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    color: "#c084fc",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  AI TUTOR GENERATOR
                </span>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                >
                  Adaptive Quiz: {quizTopic}
                </h4>
              </div>
              {!quizGenerated ? (
                <div>
                  <p
                    style={{
                      color: "#9E9EA6",
                      fontSize: "14px",
                      marginBottom: "1rem",
                    }}
                  >
                    Select a study module for the AI to generate a custom
                    diagnostic test:
                  </p>
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {[
                      "Neural Networks",
                      "Quantum Computing",
                      "Advanced Next.js",
                    ].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setQuizTopic(topic);
                          setQuizGenerated(true);
                        }}
                        style={{
                          background: "#2A2A30",
                          color: "#ffffff",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        Test on {topic}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      background: "#121214",
                      padding: "1rem",
                      borderRadius: "12px",
                      marginBottom: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Q: What is the primary function of an activation function
                      in deep learning?
                    </p>
                    {[
                      "To introduce non-linearity into the network",
                      "To compile TypeScript code faster",
                      "To increase database query speed",
                    ].map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => setUserAnswer(idx)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "8px",
                          background:
                            userAnswer === idx
                              ? idx === 0
                                ? "rgba(52, 211, 153, 0.2)"
                                : "rgba(239, 68, 68, 0.2)"
                              : "#1C1C1F",
                          border: `1px solid ${userAnswer === idx ? (idx === 0 ? "#34d399" : "#ef4444") : "#2A2A30"}`,
                          marginTop: "8px",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        {opt}{" "}
                        {userAnswer === idx &&
                          (idx === 0
                            ? "✅ Correct!"
                            : "❌ Incorrect. Try again!")}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setQuizGenerated(false);
                      setUserAnswer(null);
                    }}
                    style={{
                      background: "#c084fc",
                      color: "#000",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    Reset Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PROJECT 3 WIDGET: FOOD DELIVERY LOGISTICS */}
          {slug === "food-delivery-platform" && (
            <div
              style={{
                background: "#1C1C1F",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid #2A2A30",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#34d399",
                      fontSize: "12px",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    GPS DISPATCH SIMULATOR
                  </span>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginTop: "4px",
                    }}
                  >
                    Order #SV-9021
                  </h4>
                </div>
                <span
                  style={{
                    background: "rgba(52, 211, 153, 0.1)",
                    color: "#34d399",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {orderStatus}
                </span>
              </div>
              <div
                style={{
                  background: "#121214",
                  height: "8px",
                  borderRadius: "99px",
                  width: "100%",
                  marginBottom: "1.5rem",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${driverPos}%`,
                    height: "100%",
                    background: "#34d399",
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    setOrderStatus("Driver Assigned");
                    setDriverPos(20);
                  }}
                  style={{
                    background: "#2A2A30",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Step 1: Assign Driver
                </button>
                <button
                  onClick={() => {
                    setOrderStatus("Picked Up & En Route");
                    setDriverPos(65);
                  }}
                  style={{
                    background: "#2A2A30",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Step 2: En Route
                </button>
                <button
                  onClick={() => {
                    setOrderStatus("Delivered Successfully 🎉");
                    setDriverPos(100);
                  }}
                  style={{
                    background: "#34d399",
                    color: "#000",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Step 3: Deliver
                </button>
              </div>
            </div>
          )}

          {/* PROJECT 4 WIDGET: AI INTERVIEW AGENT */}
          {slug === "ai-interview-agent" && (
            <div
              style={{
                background: "#1C1C1F",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid #2A2A30",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    color: "#60a5fa",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  VOICE AGENT SESSION
                </span>
                <span
                  style={{
                    color: isRecording ? "#ef4444" : "#64646C",
                    fontSize: "12px",
                    fontFamily: "monospace",
                  }}
                >
                  {isRecording ? "🔴 RECORDING..." : "⚪ IDLE"}
                </span>
              </div>
              <div
                style={{
                  background: "#121214",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  marginBottom: "1rem",
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#e5e5e5",
                    fontStyle: "italic",
                  }}
                >
                  "{transcript}"
                </p>
              </div>
              <button
                onClick={() => {
                  setIsRecording(true);
                  setTranscript(
                    "Listening... Please describe your experience with scalable microservices.",
                  );
                  setTimeout(() => {
                    setIsRecording(false);
                    setTranscript(
                      "AI Analysis: Candidate demonstrated strong command over distributed systems. Score: 94/100.",
                    );
                  }, 4000);
                }}
                disabled={isRecording}
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {isRecording
                  ? "Listening to Voice..."
                  : "🎤 Start Speaking to AI Agent"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── ELOQWNT-STYLE CASE STUDY SECTIONS ────────────────────── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        {/* Row 1: The Challenge & Key User Pain Points */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            style={{
              background: "#161618",
              border: "1px solid #2A2A30",
              borderRadius: "24px",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#ef4444",
              }}
            >
              ⚠️ The Challenge
            </h3>
            <p
              style={{
                color: "#9E9EA6",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              {project.challenge}
            </p>
          </div>

          <div
            style={{
              background: "#161618",
              border: "1px solid #2A2A30",
              borderRadius: "24px",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#f97316",
              }}
            >
              🛑 Key User Pain Points
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {project.painPoints.map((point: string, idx: number) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    color: "#9E9EA6",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#f97316", fontWeight: "bold" }}>
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2: Strategic Solution & Architecture Stack */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            style={{
              background: "#161618",
              border: "1px solid #2A2A30",
              borderRadius: "24px",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#eab308",
              }}
            >
              💡 The Strategic Solution
            </h3>
            <p
              style={{
                color: "#9E9EA6",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              {project.solution}
            </p>
          </div>

          <div
            style={{
              background: "#161618",
              border: "1px solid #2A2A30",
              borderRadius: "24px",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Cpu
                style={{ width: "20px", height: "20px", color: "#eab308" }}
              />
              Architecture & Tech Stack
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {project.architecture.map((item: string, idx: number) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    color: "#9E9EA6",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#34d399",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Measured Impact & Metrics */}
        <div
          style={{
            background: "#161618",
            border: "1px solid #2A2A30",
            borderRadius: "24px",
            padding: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Zap style={{ width: "20px", height: "20px", color: "#34d399" }} />
            Measured Impact & Metrics
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {project.metrics.map((metric: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: "#1C1C1F",
                  padding: "1rem 1.25rem",
                  borderRadius: "14px",
                  border: "1px solid #2A2A30",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#9E9EA6", fontSize: "13px" }}>
                  {metric.label}
                </span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: "900",
                    fontFamily: "monospace",
                  }}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
