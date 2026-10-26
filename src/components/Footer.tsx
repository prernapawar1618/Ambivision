import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  Mail,
  Phone,
  MapPin,
  Instagram,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo-config";
import roundLogo from "../assets/round-logo.png";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-main">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link
              href="/"
              className="nav-logo"
              aria-label="AmbiVision — Back to top"
            >
              <span className="image-logo">
                <Image
                  src={roundLogo}
                  alt="AmbiVision Logo"
                  width={52}
                  height={52}
                  loading="lazy"
                  sizes="52px"
                />
              </span>

              <div className="logo-text-group">
                <span className="logo-name">AmbiVision</span>
                <span className="logo-tagline">{SITE_CONFIG.tagline}</span>
              </div>
            </Link>
            <p className="footer-tagline">
              We turn ambitious ideas into reality through innovative
              technology, thoughtful design, and exceptional
              engineering—building digital solutions that drive growth and
              create lasting impact.
            </p>
            <div className="footer-social" aria-label="Social media profiles">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <Instagram style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github style={{ width: "16px", height: "16px" }} />
              </a>
            </div>
          </div>

          {/* Core Services */}
          <nav aria-label="Footer services navigation">
            <p className="footer-col-title">Core Services</p>
            <ul className="footer-links">
              <li>
                <Link
                  href="/services/web-design-development"
                  className="footer-link"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux-design" className="footer-link">
                  UI/UX Design
                </Link>
              </li>

              <li>
                <Link href="/services/ai-solutions" className="footer-link">
                  AI Solutions & Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom-software-development"
                  className="footer-link"
                >
                  Custom Software
                </Link>
              </li>
              <li>
                <Link
                  href="/services/saas-development"
                  className="footer-link"
                >
                  SaaS Development
                </Link>
              </li>
            </ul>
          </nav>

          {/* Portfolio & Insights */}
          <nav aria-label="Footer case studies and insights">
            <p className="footer-col-title">Studio &amp; Insights</p>
            <ul className="footer-links">
              <li>
                <Link href="/work" className="footer-link">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/careers" className="footer-link">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Details */}
          <div>
            <p className="footer-col-title">Get in Touch</p>
            <ul className="footer-links" style={{ marginBottom: "1.5rem" }}>
              <li
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Mail
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "var(--c-cyan)",
                  }}
                />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="footer-link"
                  style={{ color: "var(--c-cyan)" }}
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "var(--fs-xs)",
                  color: "var(--c-text-muted)",
                }}
              >
                <MapPin
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "var(--c-text-muted)",
                  }}
                />
                <span>
                  {SITE_CONFIG.address.addressLocality},{" "}
                  {SITE_CONFIG.address.addressCountry}
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "var(--fs-xs)",
                  color: "var(--c-text-muted)",
                }}
              >
                <Phone
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "var(--c-text-muted)",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <a href="tel:+916264368530" className="footer-link" style={{ color: "var(--c-text-muted)" }}>
                    +91 6264368530
                  </a>
                  <a href="tel:+919763200253" className="footer-link" style={{ color: "var(--c-text-muted)" }}>
                    +91 9763200253
                  </a>
                </div>
              </li>
              <li
                style={{
                  fontSize: "var(--fs-xs)",
                  color: "var(--c-text-muted)",
                }}
              >
                <span>Mon–Sat, 9am–7pm IST · Global Async</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved. Turning Ambition Into Reality.
          </p>
          <nav className="footer-legal" aria-label="Legal terms">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
