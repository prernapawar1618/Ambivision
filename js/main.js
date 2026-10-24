/**
 * AmbiVision Website — Main JavaScript
 * Version 2.0 Production
 */

'use strict';

/* ─── DOM Ready ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroCanvas();
  initProjectFilter();
  initFAQ();
  initScrollAnimations();
  initContactForm();
  initModals();
  initCasestudies();
  initToast();
  lucide.createIcons();
});

/* ─── NAVIGATION ─────────────────────────────────────────────── */
function initNav() {
  const navBar = document.getElementById('navBar');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll effect
  const onScroll = () => {
    if (window.scrollY > 60) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu open
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus trap
      mobileNavClose.focus();
    });
  }

  // Close mobile nav
  const closeMobileNav = () => {
    mobileNav.classList.remove('open');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    mobileNavToggle.focus();
  };

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  // Close on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Close on backdrop click (outside nav)
  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) closeMobileNav();
  });
}

/* ─── HERO CANVAS ────────────────────────────────────────────── */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Skip on mobile for performance
  if (window.matchMedia('(max-width: 768px)').matches) {
    canvas.style.display = 'none';
    return;
  }

  // Skip if reduced motion preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let animId;

  const resize = () => {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  };

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
  resize();

  const NUM = 50;
  const particles = [];
  const mouse = { x: null, y: null, radius: 130 };

  const onMouseMove = e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const onMouseLeave = () => { mouse.x = null; mouse.y = null; };
  window.addEventListener('mouseleave', onMouseLeave);

  for (let i = 0; i < NUM; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 0.6,
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? 'rgba(6,182,212,0.7)' : 'rgba(37,99,235,0.6)';
      ctx.fill();

      // Mouse connection
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Inter-particle connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    });

    animId = requestAnimationFrame(draw);
  };

  draw();

  // Cleanup when section leaves viewport
  const heroSection = document.getElementById('hero');
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (!animId) draw();
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  });
  if (heroSection) obs.observe(heroSection);
}

/* ─── PROJECT FILTER ─────────────────────────────────────────── */
function initProjectFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.filter;

      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.removeAttribute('data-hidden');
          card.style.animation = 'none';
          setTimeout(() => { card.style.animation = ''; }, 10);
        } else {
          card.setAttribute('data-hidden', 'true');
        }
      });
    });
  });
}

/* ─── FAQ ────────────────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const body = item.querySelector('.faq-body');
      const isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-body').style.maxHeight = null;
          openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        body.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

/* ─── SCROLL ANIMATIONS ──────────────────────────────────────── */
function initScrollAnimations() {
  // Immediately show hero elements
  document.querySelectorAll('.hero .anim-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 80);
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.anim-in').forEach(el => el.classList.add('visible'));
    return;
  }

  // Generous rootMargin so elements animate well before they'd be invisible
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

  // Observe all non-hero anim-in elements
  document.querySelectorAll('.anim-in').forEach(el => {
    if (!el.closest('.hero')) obs.observe(el);
  });
}

/* ─── CONTACT FORM ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('formSubmitBtn');
  const formBody = document.getElementById('formBody');
  const formSuccess = document.getElementById('formSuccess');
  const formErrorState = document.getElementById('formErrorState');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // Show loading
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';
    submitBtn.querySelector('.btn-spinner').style.display = 'flex';

    // Simulate submission (replace with real endpoint)
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // NOTE: Replace with your actual form endpoint
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      // For now, we simulate a delay and show the "not configured" state
      await delay(1200);

      // Because no backend is configured, we show an honest message
      formBody.style.display = 'none';
      formErrorState.classList.add('show');
      formErrorState.querySelector('.error-message').textContent =
        'The contact form backend is not yet configured. Please email us directly at hello@ambivision.studio or WhatsApp to discuss your project.';

    } catch (err) {
      formBody.style.display = 'none';
      formErrorState.classList.add('show');
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      submitBtn.querySelector('.btn-spinner').style.display = 'none';
    }
  });
}

function validateForm(form) {
  let isValid = true;

  // Clear previous errors
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
    field.classList.remove('error');
    const errEl = field.parentElement.querySelector('.form-error');
    if (errEl) errEl.classList.remove('visible');
  });

  // Required fields
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      const errEl = field.parentElement.querySelector('.form-error');
      if (errEl) {
        errEl.textContent = 'This field is required.';
        errEl.classList.add('visible');
      }
      isValid = false;
    }
  });

  // Email validation
  const emailField = form.querySelector('#formEmail');
  if (emailField && emailField.value.trim()) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(emailField.value.trim())) {
      emailField.classList.add('error');
      const errEl = emailField.parentElement.querySelector('.form-error');
      if (errEl) {
        errEl.textContent = 'Please enter a valid email address.';
        errEl.classList.add('visible');
      }
      isValid = false;
    }
  }

  if (!isValid) {
    // Focus first error
    const firstErr = form.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
    if (firstErr) firstErr.focus();
  }

  return isValid;
}

/* ─── MODALS ─────────────────────────────────────────────────── */
let activeModal = null;

function initModals() {
  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) closeModal(overlay.id);
    });
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) closeModal(activeModal);
  });
}

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  activeModal = id;
  document.body.style.overflow = 'hidden';

  // Focus first focusable element
  setTimeout(() => {
    const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }, 100);

  lucide.createIcons();
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  activeModal = null;
  document.body.style.overflow = '';
}

/* ─── CASE STUDIES ───────────────────────────────────────────── */
const CASE_STUDIES = {
  stock: {
    category: 'FinTech / Data',
    title: 'Real-Time Stock Market Dashboard',
    subtitle: 'Portfolio concept — demonstration project',
    objective: 'Build a high-performance trading dashboard with real-time charts, a watchlist, and simulated price alerts for a FinTech product studio.',
    features: [
      'Interactive candlestick & line charts with realistic sample data',
      'Configurable watchlist with simulated price change indicators',
      'Simulated price alert system with threshold configuration',
      'Responsive layout adapting from mobile to large desktop',
      'Dark-mode first design built on a custom component library',
    ],
    stack: ['React', 'TypeScript', 'Recharts', 'WebSocket (demo)', 'Node.js', 'Redis', 'PostgreSQL'],
    note: 'All price data shown is simulated and for demonstration only. This project does not connect to live market data.',
  },
  lms: {
    category: 'EdTech / AI',
    title: 'AI-Powered Learning Management System',
    subtitle: 'Portfolio concept — demonstration project',
    objective: 'Design and develop a smart LMS where AI generates adaptive quizzes, tracks student progress, and provides a conversational learning assistant.',
    features: [
      'AI-generated quiz questions tailored to course content',
      'Student progress dashboard with completion tracking',
      'Conversational AI learning assistant (sample responses)',
      'Instructor analytics panel with engagement metrics',
      'Responsive course player with bookmarking',
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    note: 'This is a concept demonstration. Student data and AI responses shown are simulated.',
  },
  delivery: {
    category: 'Logistics / Mobile',
    title: 'Food Delivery Platform',
    subtitle: 'Portfolio concept — demonstration project',
    objective: 'Create a full-stack food delivery ecosystem including a customer app, driver app, restaurant dashboard, and order management backend.',
    features: [
      'Restaurant discovery with cuisine filters and ratings',
      'Order flow: cart, checkout, real-time status updates',
      'Simulated GPS delivery tracking interface',
      'Merchant dashboard for menu and order management',
      'Driver-facing order queue and navigation prompts',
    ],
    stack: ['React Native', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'Redis', 'Google Maps API'],
    note: 'This is a portfolio concept. All order data, restaurant listings, and tracking coordinates are simulated.',
  },
  interview: {
    category: 'AI / HR Tech',
    title: 'AI Interview Agent',
    subtitle: 'Portfolio concept — demonstration project',
    objective: 'Build an autonomous AI-powered interview platform that conducts structured interviews, evaluates responses, and generates candidate evaluation summaries.',
    features: [
      'Conversational AI interview flow with configurable question banks',
      'Candidate-facing interview interface with progress indicator',
      'Voice input demonstration with simulated transcription',
      'Automated evaluation report with scoring breakdown',
      'Recruiter dashboard with candidate comparison',
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI Whisper', 'GPT-4', 'Supabase', 'Tailwind CSS'],
    note: 'This is a concept project. Evaluation results shown are generated examples, not real AI assessments.',
  },
};

function initCasestudies() {
  document.querySelectorAll('.project-card[data-case]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.case;
      openCaseStudy(key);
    });

    // Keyboard support
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const key = card.dataset.case;
        openCaseStudy(key);
      }
    });
  });

  // Service card inquiry CTAs
  document.querySelectorAll('[data-service-inquire]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const key = btn.dataset.serviceInquire;
      const svcSelect = document.getElementById('formService');
      if (svcSelect && key) {
        svcSelect.value = key;
      }
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function openCaseStudy(key) {
  const data = CASE_STUDIES[key];
  if (!data) return;

  const container = document.getElementById('caseStudyContent');
  if (!container) return;

  container.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge badge-cyan" style="margin-bottom: 0.75rem;">${data.category}</span>
      <h2 class="font-display" style="font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; color: var(--c-text-primary); margin: 0.5rem 0;">${data.title}</h2>
      <p style="font-size: 0.75rem; color: var(--c-text-muted); font-family: monospace; letter-spacing: 0.06em; text-transform: uppercase;">${data.subtitle}</p>
    </div>

    <div style="background: rgba(39,39,45,0.3); border: 1px solid var(--c-border); border-radius: var(--r-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
      <p style="font-size: 0.7rem; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; color: var(--c-cyan); margin-bottom: 0.5rem;">Project Objective</p>
      <p style="font-size: var(--fs-sm); color: var(--c-text-secondary); line-height: 1.75;">${data.objective}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <p style="font-size: 0.7rem; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; color: var(--c-text-muted); margin-bottom: 0.875rem;">Key Features</p>
      <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${data.features.map(f => `
          <li style="display: flex; align-items: flex-start; gap: 0.625rem; font-size: var(--fs-sm); color: var(--c-text-secondary);">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--c-cyan); flex-shrink: 0; margin-top: 0.45rem;"></span>
            ${f}
          </li>
        `).join('')}
      </ul>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <p style="font-size: 0.7rem; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; color: var(--c-text-muted); margin-bottom: 0.75rem;">Technology Stack</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
        ${data.stack.map(t => `<span class="badge">${t}</span>`).join('')}
      </div>
    </div>

    <div style="background: rgba(180,83,9,0.07); border: 1px solid rgba(180,83,9,0.2); border-radius: var(--r-md); padding: 0.875rem 1rem; margin-bottom: 1.75rem;">
      <p style="font-size: var(--fs-xs); color: #fbbf24; line-height: 1.65;">⚠️ ${data.note}</p>
    </div>

    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button
        onclick="closeCaseStudy()"
        class="btn btn-primary"
        style="flex: 1; min-width: 140px;"
        id="startSimilarBtn"
      >
        Start a Similar Project
      </button>
      <button onclick="closeCaseStudy()" class="btn btn-ghost" style="min-width: 100px;">
        Close
      </button>
    </div>
  `;

  // Wire up "Start Similar" to contact
  setTimeout(() => {
    const startBtn = document.getElementById('startSimilarBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        closeCaseStudy();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      });
    }
    lucide.createIcons();
  }, 50);

  openModal('caseStudyModal');
}

function closeCaseStudy() {
  closeModal('caseStudyModal');
}

/* ─── TOAST ──────────────────────────────────────────────────── */
let toastTimeout;

function initToast() {
  // Global for use from inline calls if needed
  window.showToast = showToast;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">
      ${type === 'success'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
      }
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* ─── UTILITIES ──────────────────────────────────────────────── */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Smooth scroll for CTA buttons pointing to sections
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
