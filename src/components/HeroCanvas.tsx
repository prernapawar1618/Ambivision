'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height =
        canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 12 : 36;
    const maxDist = isMobile ? 75 : 120;
    const maxDistSq = maxDist * maxDist;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.8,
      alpha: Math.random() * 0.35 + 0.2,
      color: Math.random() > 0.5 ? '6, 182, 212' : '37, 99, 235',
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw particle dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Mouse interaction
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdistSq = mdx * mdx + mdy * mdy;
        if (mdistSq < 19600) {
          // 140^2 = 19600
          const mdist = Math.sqrt(mdistSq);
          const force = (1 - mdist / 140) * 0.35;
          p.x += (mdx / mdist) * force * 1.5;
          p.y += (mdy / mdist) * force * 1.5;
        }
      }

      // 2. Draw connecting lines in batched paths to avoid per-line GPU stroke state changes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    };

    // Pause canvas animation when scrolled offscreen to conserve CPU/battery and eliminate TBT
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion) {
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(draw);
          } else {
            cancelAnimationFrame(animId);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Defer start slightly via requestIdleCallback to not compete with initial hydration & FID
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(() => {
        draw();
      });
    } else {
      timerId = setTimeout(() => {
        draw();
      }, 120);
    }

    return () => {
      cancelAnimationFrame(animId);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
