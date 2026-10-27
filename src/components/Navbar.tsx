"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import roundLogo from "../assets/round-logo.png";

const ContactFormModal = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        color: "#9CA3AF",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      Loading form...
    </div>
  ),
});

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/" || pathname === "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    setModalOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: isHome ? "/#services" : "/services" },
    { name: "Work", href: isHome ? "/#work" : "/work" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: isHome ? "/#contact" : "/contact" },
  ];

  return (
    <>
      <header
        className={`site-header ${scrolled ? "scrolled" : ""}`}
        role="banner"
      >
        <nav
          className="nav-bar"
          role="navigation"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="AmbiVision — Home">
            <span className="image-logo">
              <Image
                src={roundLogo}
                alt="AmbiVision Logo"
                width={42}
                height={42}
                sizes="42px"
              />
            </span>

            <span className="logo-text-group">
              <span className="logo-name">AmbiVision</span>
              <span className="logo-tagline">
                Turning Ambition Into Reality
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links" role="menubar">
            {navLinks.map((link) => {
              const isActive =
                link.name === "Home"
                  ? isHome
                  : link.href.startsWith("/#")
                    ? false
                    : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  role="menuitem"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions & Mobile Button */}
          <div className="nav-actions">
            {/* Start a Project Button opens the Modal */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary btn-sm nav-cta-btn"
            >
              <span>Start a Project</span>
              <ArrowRight
                style={{ width: "13px", height: "13px" }}
                aria-hidden="true"
              />
            </button>

            <button
              className="nav-mobile-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X style={{ width: "20px", height: "20px" }} />
              ) : (
                <Menu style={{ width: "20px", height: "20px" }} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`mobile-nav-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <nav
        className={`mobile-nav ${mobileOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => setMobileOpen(false)}
            >
              <span>{link.name}</span>
              <ArrowRight
                style={{
                  width: "18px",
                  height: "18px",
                  color: "var(--c-text-muted)",
                }}
              />
            </Link>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <button
            onClick={() => {
              setMobileOpen(false);
              setModalOpen(true);
            }}
            tabIndex={mobileOpen ? 0 : -1}
            className="btn btn-primary btn-lg"
            style={{
              width: "100%",
              justifyContent: "center",
              cursor: "pointer",
              background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            }}
          >
            Start a Project
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      </nav>

      {/* Contact Form Popup Modal */}
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
            animation: "fadeIn 0.2s ease-out",
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
            {/* Close Modal Button */}
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
                transition: "background 0.2s",
              }}
              aria-label="Close form modal"
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: "1.5rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.5rem",
                }}
              >
                Let's Build Something Amazing
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>
                Fill out the details below and our team will get back to you within one business day.
              </p>
            </div>

            <Suspense
              fallback={
                <div
                  style={{
                    color: "#9CA3AF",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  Loading form...
                </div>
              }
            >
              <ContactFormModal />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
