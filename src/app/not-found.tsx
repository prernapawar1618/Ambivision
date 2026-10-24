import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section-pad" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="subpage-badge" style={{ margin: '0 auto 1.5rem' }}>
          Error 404 · Page Not Found
        </span>
        <h1
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            color: 'var(--c-text-primary)',
            marginBottom: '1rem',
          }}
        >
          Lost in the Digital Ether.
        </h1>
        <p
          style={{
            color: 'var(--c-text-secondary)',
            fontSize: 'var(--fs-lg)',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          The page or resource you are looking for has been moved, renamed, or does not exist. Explore our core services or return to the studio home.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary btn-lg">
            <Home style={{ width: '16px', height: '16px' }} />
            Return Home
          </Link>
          <Link href="/services" className="btn btn-ghost btn-lg">
            <Compass style={{ width: '16px', height: '16px', color: 'var(--c-cyan)' }} />
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
