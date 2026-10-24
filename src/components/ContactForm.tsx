"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  initialService?: string;
}

function ContactFormInner({ initialService = "" }: ContactFormProps) {
  const searchParams = useSearchParams();
  const [service, setService] = useState(initialService);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    timeline: "",
    description: "",
    hp_check: "", // Honeypot field for bot detection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const queryService = searchParams?.get("service");
    if (queryService) {
      setService(queryService);
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "service") {
      setService(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (serverError) setServerError(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!service) newErrors.service = "Please select a core service discipline.";
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = "Please provide at least 10 characters detailing your project.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setServerError(null);

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service,
          budget: formData.budget.trim(),
          timeline: formData.timeline.trim(),
          description: formData.description.trim(),
          hp_check: formData.hp_check,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setStatus("error");
        setServerError(
          data?.error ||
            "Unable to submit inquiry at this time. Please email us directly at prernapawar1618@ambivision.in."
        );
        return;
      }

      setInquiryId(data.inquiryId || null);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(
        "Network connection error. Please verify your internet connection or email prernapawar1618@ambivision.in."
      );
    }
  };

  return (
    <div className="contact-form">
      {status === "success" ? (
        <div style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
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
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "var(--fs-2xl)",
              fontWeight: 700,
              color: "var(--c-text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Inquiry Accepted for Delivery
          </h3>
          <p
            style={{
              color: "var(--c-text-secondary)",
              fontSize: "var(--fs-base)",
              lineHeight: 1.7,
              maxWidth: "460px",
              margin: "0 auto 1.5rem",
            }}
          >
            Thank you, {formData.name}. Your project inquiry has been securely routed to our leadership team at{" "}
            <span style={{ color: "var(--c-cyan)" }}>prernapawar1618@ambivision.in</span>. Our principal architects will review your requirements and respond within one business day.
          </p>
          {inquiryId && (
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--c-text-muted)",
                fontSize: "12px",
                fontFamily: "monospace",
                marginBottom: "2rem",
              }}
            >
              Ref ID: {inquiryId}
            </div>
          )}
          <div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setStatus("idle");
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  budget: "",
                  timeline: "",
                  description: "",
                  hp_check: "",
                });
                setService("");
                setInquiryId(null);
                setServerError(null);
              }}
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Project inquiry form"
        >
          {serverError && (
            <div
              role="alert"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
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

          {/* Honeypot field - invisible to real humans, traps spam bots */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="formHpCheck">Leave this empty</label>
            <input
              type="text"
              id="formHpCheck"
              name="hp_check"
              value={formData.hp_check}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="formName">
                Name{" "}
                <span className="required" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="formName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your full name"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formEmail">
                Work Email{" "}
                <span className="required" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="email"
                id="formEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="name@company.com"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formCompany">
                Organization{" "}
                <span style={{ color: "var(--c-text-muted)", fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <input
                type="text"
                id="formCompany"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-input"
                placeholder="Company name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formService">
                Service Required{" "}
                <span className="required" aria-hidden="true">
                  *
                </span>
              </label>
              <select
                id="formService"
                name="service"
                value={service}
                onChange={handleChange}
                className="form-select"
                required
                aria-required="true"
                aria-invalid={!!errors.service}
              >
                <option value="" disabled>
                  Select a core service
                </option>
                <option value="web">Web Design &amp; Development</option>
                <option value="ai">
                  AI Solutions &amp; Intelligent Agents
                </option>
                <option value="mobile">Mobile App Development</option>
                <option value="uiux">UI/UX &amp; Product Design</option>
                <option value="ecommerce">E-commerce Stores</option>
                <option value="seo">
                  Technical SEO &amp; AI Search (GEO / AEO)
                </option>
                <option value="custom">Custom Software Architecture</option>
                <option value="saas">SaaS Product Engineering</option>
              </select>
              {errors.service && (
                <span className="form-error">{errors.service}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formBudget">
                Estimated Budget{" "}
                <span style={{ color: "var(--c-text-muted)", fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <select
                id="formBudget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select an investment tier</option>
                <option value="Tier 1 ($2,000 – $5,000 / ₹1.5L – ₹4L)">$2,000 – $5,000 / ₹1.5L – ₹4L</option>
                <option value="Tier 2 ($5,000 – $15,000 / ₹4L – ₹12L)">$5,000 – $15,000 / ₹4L – ₹12L</option>
                <option value="Tier 3 ($15,000+ / ₹12L+)">$15,000+ / ₹12L+ (Enterprise / Retainer)</option>
                <option value="Exploring / Undecided">Exploring / Undecided</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formTimeline">
                Expected Timeline{" "}
                <span style={{ color: "var(--c-text-muted)", fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <select
                id="formTimeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select project timeline</option>
                <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                <option value="1 to 3 months">1 to 3 months</option>
                <option value="3 to 6 months">3 to 6 months</option>
                <option value="Flexible / Q3-Q4">Flexible</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "1.25rem" }}>
            <label className="form-label" htmlFor="formDescription">
              Project Scope &amp; Goals{" "}
              <span className="required" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="formDescription"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="form-textarea"
              placeholder="Tell us about what you want to build, key features, target audience, and current stage..."
              required
              aria-required="true"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary btn-lg"
              style={{ minWidth: "180px", justifyContent: "center" }}
            >
              {status === "loading" ? (
                <>
                  <Loader2
                    style={{
                      width: "16px",
                      height: "16px",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Submitting Inquiry...
                </>
              ) : (
                <>
                  Submit Inquiry
                  <Send
                    style={{ width: "15px", height: "15px" }}
                    aria-hidden="true"
                  />
                </>
              )}
            </button>

            <span
              style={{
                fontSize: "12px",
                color: "var(--c-text-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              🔒 Delivered securely to prernapawar1618@ambivision.in · Reply within 24h
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            textAlign: "center",
            padding: "2.5rem 1rem",
            color: "var(--c-text-muted)",
            fontSize: "14px",
          }}
        >
          Loading inquiry form...
        </div>
      }
    >
      <ContactFormInner {...props} />
    </Suspense>
  );
}
