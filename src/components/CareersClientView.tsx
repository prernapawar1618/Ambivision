"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  FileText,
  Upload,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Layers,
  Code2,
  Compass,
} from "lucide-react";
import {
  JobPosition,
  OPEN_POSITIONS,
  CAREERS_CONFIG,
} from "@/data/careers-data";

export default function CareersClientView() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Opportunities");
  const [activeJob, setActiveJob] = useState<JobPosition | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [generalApplyOpen, setGeneralApplyOpen] = useState(false);

  // Application form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolioUrl: "",
    resumeUrl: "",
    coverNote: "",
    hp_field: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const filterOptions = [
    "All Opportunities",
    "Internships",
    "Engineering",
    "AI & ML",
    "Design",
  ];

  // Robust filter logic
  const getFilteredJobs = (): JobPosition[] => {
    switch (selectedFilter) {
      case "Internships":
        return OPEN_POSITIONS.filter((j) => j.type === "Internship");
      case "Engineering":
        return OPEN_POSITIONS.filter((j) => j.department === "Engineering");
      case "AI & ML":
        return OPEN_POSITIONS.filter((j) => j.department === "AI & ML");
      case "Design":
        return OPEN_POSITIONS.filter((j) => j.department === "Design");
      case "All Opportunities":
      default:
        return OPEN_POSITIONS;
    }
  };

  const filteredJobs = getFilteredJobs();

  // Helper count for filter badges
  const getFilterCount = (filterName: string): number => {
    switch (filterName) {
      case "Internships":
        return OPEN_POSITIONS.filter((j) => j.type === "Internship").length;
      case "Engineering":
        return OPEN_POSITIONS.filter((j) => j.department === "Engineering").length;
      case "AI & ML":
        return OPEN_POSITIONS.filter((j) => j.department === "AI & ML").length;
      case "Design":
        return OPEN_POSITIONS.filter((j) => j.department === "Design").length;
      case "All Opportunities":
      default:
        return OPEN_POSITIONS.length;
    }
  };

  const handleOpenJob = (job: JobPosition) => {
    setActiveJob(job);
    setFormData((prev) => ({ ...prev, position: job.title }));
    setModalOpen(true);
    setGeneralApplyOpen(false);
    setFormErrors({});
    setServerError(null);
    setSubmittedAppId(null);
  };

  const handleOpenGeneralApply = (customPosition?: string) => {
    setActiveJob(null);
    setFormData((prev) => ({
      ...prev,
      position: customPosition || "General Application (Talent Pool)",
    }));
    setGeneralApplyOpen(true);
    setModalOpen(false);
    setFormErrors({});
    setServerError(null);
    setSubmittedAppId(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setGeneralApplyOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setFormErrors((prev) => ({
        ...prev,
        resume: "Only PDF format files (.pdf) are permitted.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        resume: "File size exceeds 5MB limit. Please compress your PDF.",
      }));
      return;
    }

    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
    setResumeFile(file);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.position.trim()) {
      errs.position = "Please specify the position.";
    }
    if (!formData.experience.trim() || formData.experience.trim().length < 10) {
      errs.experience = "Please summarize your skills and experience (at least 10 characters).";
    }
    if (formData.portfolioUrl.trim()) {
      try {
        new URL(formData.portfolioUrl.trim());
      } catch {
        errs.portfolioUrl = "Please enter a valid URL (starting with https://).";
      }
    }
    if (formData.resumeUrl.trim()) {
      try {
        new URL(formData.resumeUrl.trim());
      } catch {
        errs.resumeUrl = "Please enter a valid URL (starting with https://).";
      }
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("position", formData.position.trim());
      payload.append("experience", formData.experience.trim());
      payload.append("portfolioUrl", formData.portfolioUrl.trim());
      payload.append("resumeUrl", formData.resumeUrl.trim());
      payload.append("coverNote", formData.coverNote.trim());
      payload.append("hp_field", formData.hp_field);

      if (resumeFile) {
        payload.append("resume", resumeFile);
      }

      const res = await fetch("/api/careers/apply/", {
        method: "POST",
        body: payload,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setServerError(
          data?.error ||
            "Unable to submit application at this moment. Please email prernapawar1618@ambivision.in directly."
        );
        setSubmitting(false);
        return;
      }

      setSubmittedAppId(data.applicationId || "app_submitted");
      setSubmitting(false);
    } catch {
      setServerError(
        "Network connection failed. Please check your connection or contact prernapawar1618@ambivision.in directly."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="careers-section" style={{ paddingBottom: "6rem" }}>
      {/* ── Culture & Growth Philosophy ──────────────────────────── */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <div className="container">
          <div style={{ maxWidth: "760px", marginBottom: "3rem" }}>
            <span className="subpage-badge">
              <Sparkles style={{ width: "13px", height: "13px" }} />
              Growth &amp; Studio Principles
            </span>
            <h2
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "#ffffff",
                marginTop: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              Built for Those Who Value Craft, Mentorship, and Growth.
            </h2>
            <p
              style={{
                color: "var(--c-text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              {CAREERS_CONFIG.companyPitch}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
              marginBottom: "3.5rem",
            }}
          >
            {CAREERS_CONFIG.principles.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "#141418",
                  border: "1px solid #23232a",
                  borderRadius: "16px",
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    color: "var(--c-cyan)",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    marginBottom: "0.5rem",
                  }}
                >
                  0{i + 1} // PILLAR
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "var(--c-text-secondary)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Opportunities Section ────────────────────────── */}
      <section id="open-positions" style={{ padding: "2rem 0 4rem" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              borderBottom: "1px solid #23232a",
              paddingBottom: "1.5rem",
            }}
          >
            <div>
              <span className="subpage-badge">
                <Briefcase style={{ width: "13px", height: "13px" }} />
                Active Openings
              </span>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginTop: "0.5rem",
                  marginBottom: "0.25rem",
                }}
              >
                Open Opportunities
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--c-text-muted)",
                  margin: 0,
                }}
              >
                Showing {filteredJobs.length} active position{filteredJobs.length === 1 ? "" : "s"}
              </p>
            </div>

            {/* Opportunity Filter Tabs */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
              role="tablist"
              aria-label="Job category filters"
            >
              {filterOptions.map((filter) => {
                const count = getFilterCount(filter);
                const isSelected = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedFilter(filter)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      minHeight: "40px",
                      background: isSelected
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.05)",
                      color: isSelected ? "#0c0c0e" : "#a1a1aa",
                      border: isSelected
                        ? "1px solid #ffffff"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <span>{filter}</span>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "1px 6px",
                        borderRadius: "99px",
                        background: isSelected
                          ? "rgba(12, 12, 14, 0.15)"
                          : "rgba(255, 255, 255, 0.08)",
                        color: isSelected ? "#0c0c0e" : "#71717a",
                        fontWeight: 700,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job List or Empty State */}
          {filteredJobs.length === 0 ? (
            <div
              style={{
                background: "#141418",
                border: "1px solid #23232a",
                borderRadius: "20px",
                padding: "3.5rem 2rem",
                textAlign: "center",
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(56, 189, 248, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  color: "#38bdf8",
                }}
              >
                <Compass style={{ width: "26px", height: "26px" }} />
              </div>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "0.75rem",
                }}
              >
                No active openings in {selectedFilter} at the moment
              </h3>
              <p
                style={{
                  color: "var(--c-text-secondary)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                {selectedFilter === "AI & ML" ? (
                  <>
                    Our proposed <strong>AI/ML Engineer</strong> role is subject to actual project requirements and client pipeline confirmation, and is not currently published for immediate hiring. We actively maintain a talent network for candidates with relevant AI, LLM, and machine learning backgrounds.
                  </>
                ) : (
                  <>
                    We hire based on project requirements and team capacity. If you have relevant skills, coursework, personal projects, or professional experience in {selectedFilter}, we would love to review your profile.
                  </>
                )}
              </p>
              <button
                type="button"
                onClick={() => handleOpenGeneralApply(selectedFilter === "AI & ML" ? "AI & ML (General Talent Pool)" : undefined)}
                className="btn btn-primary"
              >
                Submit General Application
                <ArrowRight style={{ width: "15px", height: "15px" }} />
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.25rem",
              }}
            >
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    background: "#141418",
                    border: "1px solid #23232a",
                    borderRadius: "16px",
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                >
                  <div style={{ maxWidth: "700px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        flexWrap: "wrap",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {/* Department Badge */}
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: "rgba(56, 189, 248, 0.12)",
                          color: "#38bdf8",
                          border: "1px solid rgba(56, 189, 248, 0.25)",
                        }}
                      >
                        {job.department}
                      </span>

                      {/* Type Badge */}
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background:
                            job.type === "Internship"
                              ? "rgba(168, 85, 247, 0.12)"
                              : "rgba(16, 185, 129, 0.12)",
                          color:
                            job.type === "Internship" ? "#c084fc" : "#34d399",
                          border:
                            job.type === "Internship"
                              ? "1px solid rgba(168, 85, 247, 0.25)"
                              : "1px solid rgba(16, 185, 129, 0.25)",
                        }}
                      >
                        {job.type}
                      </span>

                      {/* Remote status */}
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--c-text-muted)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <MapPin style={{ width: "13px", height: "13px" }} />
                        {job.remoteStatus}
                      </span>

                      {/* Experience Level */}
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--c-text-muted)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock style={{ width: "13px", height: "13px" }} />
                        {job.experienceLevel}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {job.title}
                    </h3>
                    
                    <p
                      style={{
                        color: "var(--c-text-secondary)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {job.shortDescription}
                    </p>

                    {/* Eligibility Indicator */}
                    <div
                      style={{
                        fontSize: "12.5px",
                        color: "#a1a1aa",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <GraduationCap style={{ width: "14px", height: "14px", color: "var(--c-cyan)" }} />
                      <span>{job.eligibility}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button
                      type="button"
                      onClick={() => handleOpenJob(job)}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: "10px" }}
                    >
                      View Details &amp; Apply
                      <ArrowRight style={{ width: "14px", height: "14px" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* General Application Banner */}
          <div
            style={{
              marginTop: "3rem",
              background: "linear-gradient(135deg, #15151b 0%, #1a1a24 100%)",
              border: "1px solid #2b2b38",
              borderRadius: "20px",
              padding: "2.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--c-cyan)",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Don&apos;t see your exact role?
              </span>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginTop: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              >
                Join the AmbiVision Talent Network
              </h3>
              <p
                style={{
                  color: "var(--c-text-secondary)",
                  fontSize: "14px",
                  maxWidth: "560px",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Whether you are a student, recent graduate, junior engineer, or bringing years of professional experience in frontend, full-stack, design, or AI engineering, we welcome your profile. We review all submissions and reach out when relevant opportunities emerge.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenGeneralApply()}
              className="btn btn-ghost"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Submit General Application
            </button>
          </div>
        </div>
      </section>

      {/* ── Job Detail & Application Modal ───────────────────────── */}
      {(modalOpen || generalApplyOpen) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.82)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "760px",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "#121216",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "2.5rem 2rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.85)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
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
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {submittedAppId ? (
              <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  <CheckCircle
                    style={{
                      width: "28px",
                      height: "28px",
                      color: "var(--c-success)",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Application Submitted
                </h3>
                <p
                  style={{
                    color: "var(--c-text-secondary)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    maxWidth: "480px",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  Thank you, <strong>{formData.fullName}</strong>. Your application for{" "}
                  <strong>{formData.position}</strong> has been securely delivered to our hiring team at{" "}
                  <span style={{ color: "var(--c-cyan)" }}>prernapawar1618@ambivision.in</span>. We review every candidate profile thoroughly.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleCloseModal}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                {/* Job Overview Header */}
                {activeJob ? (
                  <div style={{ marginBottom: "2rem", borderBottom: "1px solid #23232a", paddingBottom: "1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: "rgba(56, 189, 248, 0.12)",
                          color: "#38bdf8",
                        }}
                      >
                        {activeJob.department}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background:
                            activeJob.type === "Internship"
                              ? "rgba(168, 85, 247, 0.12)"
                              : "rgba(16, 185, 129, 0.12)",
                          color:
                            activeJob.type === "Internship" ? "#c084fc" : "#34d399",
                        }}
                      >
                        {activeJob.type}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
                        {activeJob.remoteStatus} · {activeJob.experienceLevel}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: "1.65rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {activeJob.title}
                    </h2>

                    <p style={{ color: "var(--c-text-secondary)", fontSize: "14px", lineHeight: 1.6, marginBottom: "1rem" }}>
                      {activeJob.overview}
                    </p>

                    {/* Eligibility Box */}
                    <div
                      style={{
                        background: "rgba(56, 189, 248, 0.05)",
                        border: "1px solid rgba(56, 189, 248, 0.2)",
                        borderRadius: "10px",
                        padding: "0.85rem 1rem",
                        marginBottom: "1.25rem",
                        fontSize: "13px",
                        color: "#e0f2fe",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong>Eligibility &amp; Experience:</strong> {activeJob.eligibility}
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <h4 style={{ fontSize: "13px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                        Key Responsibilities:
                      </h4>
                      <ul style={{ paddingLeft: "1.25rem", color: "var(--c-text-secondary)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                        {activeJob.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <h4 style={{ fontSize: "13px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                        Requirements &amp; Valued Skills:
                      </h4>
                      <ul style={{ paddingLeft: "1.25rem", color: "var(--c-text-secondary)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                        {activeJob.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: "2rem", borderBottom: "1px solid #23232a", paddingBottom: "1.25rem" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: "rgba(56, 189, 248, 0.12)",
                        color: "#38bdf8",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Layers style={{ width: "12px", height: "12px" }} />
                      Talent Pool Application
                    </div>
                    <h2
                      style={{
                        fontSize: "1.65rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "0.5rem",
                      }}
                    >
                      General Application · Talent Pool
                    </h2>
                    <p style={{ color: "var(--c-text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                      Tell us about your background, projects you have built, technologies you enjoy, and how you want to contribute to AmbiVision. Candidates of all experience levels (from students to experienced professionals) are welcome.
                    </p>
                  </div>
                )}

                {/* Candidate Application Form */}
                <form onSubmit={handleSubmitApplication} noValidate>
                  {serverError && (
                    <div
                      role="alert"
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "12px",
                        padding: "1rem",
                        color: "#fca5a5",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <AlertCircle style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "2px" }} />
                      <div>{serverError}</div>
                    </div>
                  )}

                  {/* Honeypot anti-bot protection */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="hp_field"
                      value={formData.hp_field}
                      onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="appFullName">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="appFullName"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: "" });
                        }}
                        className="form-input"
                        placeholder="Your full name"
                        required
                        aria-invalid={!!formErrors.fullName}
                      />
                      {formErrors.fullName && <span className="form-error">{formErrors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="appEmail">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="appEmail"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                        }}
                        className="form-input"
                        placeholder="you@example.com"
                        required
                        aria-invalid={!!formErrors.email}
                      />
                      {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="appPhone">
                        Phone Number <span style={{ color: "var(--c-text-muted)" }}>(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="appPhone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="appPosition">
                        Position Applied For <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="appPosition"
                        value={formData.position}
                        onChange={(e) => {
                          setFormData({ ...formData, position: e.target.value });
                          if (formErrors.position) setFormErrors({ ...formErrors, position: "" });
                        }}
                        className="form-input"
                        placeholder="e.g. Frontend Developer Intern"
                        required
                        aria-invalid={!!formErrors.position}
                      />
                      {formErrors.position && <span className="form-error">{formErrors.position}</span>}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="appPortfolio">
                      Portfolio / GitHub / LinkedIn URL <span style={{ color: "var(--c-text-muted)" }}>(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="appPortfolio"
                      value={formData.portfolioUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, portfolioUrl: e.target.value });
                        if (formErrors.portfolioUrl) setFormErrors({ ...formErrors, portfolioUrl: "" });
                      }}
                      className="form-input"
                      placeholder="https://github.com/username or https://linkedin.com/in/username"
                      aria-invalid={!!formErrors.portfolioUrl}
                    />
                    {formErrors.portfolioUrl && <span className="form-error">{formErrors.portfolioUrl}</span>}
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="appExperience">
                      Relevant Skills, Projects &amp; Experience <span className="required">*</span>
                    </label>
                    <textarea
                      id="appExperience"
                      rows={3}
                      value={formData.experience}
                      onChange={(e) => {
                        setFormData({ ...formData, experience: e.target.value });
                        if (formErrors.experience) setFormErrors({ ...formErrors, experience: "" });
                      }}
                      className="form-textarea"
                      placeholder="Summarize key technologies you work with, projects you have built, prior internships, or professional experience..."
                      required
                      aria-invalid={!!formErrors.experience}
                    />
                    {formErrors.experience && <span className="form-error">{formErrors.experience}</span>}
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="appResumeUrl">
                      Secure Private Resume Link <span style={{ color: "var(--c-text-muted)" }}>(Google Drive, Dropbox, Notion, or LinkedIn link)</span>
                    </label>
                    <input
                      type="url"
                      id="appResumeUrl"
                      value={formData.resumeUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, resumeUrl: e.target.value });
                        if (formErrors.resumeUrl) setFormErrors({ ...formErrors, resumeUrl: "" });
                      }}
                      className="form-input"
                      placeholder="https://drive.google.com/... or https://notion.so/..."
                      aria-invalid={!!formErrors.resumeUrl}
                    />
                    {formErrors.resumeUrl && <span className="form-error">{formErrors.resumeUrl}</span>}
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="appResume">
                      Or Upload Resume File (PDF format, max 5MB) <span style={{ color: "var(--c-text-muted)" }}>(optional)</span>
                    </label>
                    <div
                      style={{
                        position: "relative",
                        border: "1px dashed #3a3a46",
                        borderRadius: "12px",
                        padding: "1.25rem",
                        textAlign: "center",
                        background: "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        id="appResume"
                        accept=".pdf,application/pdf"
                        onChange={handleFileChange}
                        style={{
                          position: "absolute",
                          inset: 0,
                          opacity: 0,
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        {resumeFile ? (
                          <>
                            <FileText style={{ width: "24px", height: "24px", color: "var(--c-cyan)" }} />
                            <span style={{ fontSize: "14px", color: "#ffffff", fontWeight: 600 }}>
                              {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                            <span style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
                              Click to choose a different PDF file
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload style={{ width: "22px", height: "22px", color: "#8e8e98" }} />
                            <span style={{ fontSize: "14px", color: "#e5e5e7", fontWeight: 500 }}>
                              Click or drag your PDF resume here
                            </span>
                            <span style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
                              PDF format only · Max 5MB
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {formErrors.resume && <span className="form-error">{formErrors.resume}</span>}
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label" htmlFor="appCoverNote">
                      Cover Note / Why AmbiVision? <span style={{ color: "var(--c-text-muted)" }}>(optional)</span>
                    </label>
                    <textarea
                      id="appCoverNote"
                      rows={2}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      className="form-textarea"
                      placeholder="Brief note about your aspirations, why you want to join AmbiVision, or what you hope to build..."
                    />
                  </div>

                  {/* Candidate Privacy Statement */}
                  <div
                    style={{
                      marginTop: "1.25rem",
                      padding: "0.85rem 1rem",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "12px",
                      color: "var(--c-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    <ShieldCheck style={{ width: "16px", height: "16px", flexShrink: 0, marginTop: "2px", color: "var(--c-cyan)" }} />
                    <div>
                      <strong>Candidate Confidentiality:</strong> Your application and uploaded resume are transmitted securely to AmbiVision hiring leadership at <strong>prernapawar1618@ambivision.in</strong> and handled in strict confidence.
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "1.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary btn-lg"
                      style={{ minWidth: "210px", justifyContent: "center" }}
                    >
                      {submitting ? (
                        <>
                          <Loader2
                            style={{
                              width: "16px",
                              height: "16px",
                              animation: "spin 1s linear infinite",
                            }}
                          />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight style={{ width: "15px", height: "15px" }} />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
