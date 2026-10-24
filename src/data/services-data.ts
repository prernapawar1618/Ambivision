export interface ServiceItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywordClusters: string[];
  badge: string;
  tagline: string;
  directAnswer: string;
  benefits: { title: string; desc: string }[];
  capabilities: string[];
  techStack: string[];
  process: { step: string; title: string; desc: string }[];
  investmentTiers: { name: string; timeline: string; budgetINR: string; budgetUSD: string; idealFor: string }[];
  faqs: { question: string; answer: string }[];
  relatedCaseStudy: string;
}

export const SERVICES_DATA: Record<string, ServiceItem> = {
  'web-design-development': {
    slug: 'web-design-development',
    title: 'Web Design & Development Services',
    metaTitle: 'Web Design & Development Company in India — Next.js & React',
    metaDescription: 'Custom web application design and engineering on Next.js, React, and cloud platforms. We build lightning-fast, SEO-optimised platforms engineered for conversion and scale.',
    keywordClusters: [
      'web development company in India',
      'website design and development services',
      'custom web application development',
      'Next.js development agency',
      'enterprise web development Bengaluru',
    ],
    badge: 'Core Discipline 01',
    tagline: 'Engineering High-Speed, Conversion-Driven Web Platforms That Scale',
    directAnswer:
      'AmbiVision provides end-to-end web design and development services using modern React and Next.js architectures. We design, build, and deploy production-grade websites and web applications with sub-second load times, rigorous Core Web Vitals compliance, server-side rendering for search discoverability, and cloud infrastructure on AWS, Vercel, and Cloudflare.',
    benefits: [
      {
        title: 'Sub-Second Page Speeds & Core Web Vitals',
        desc: 'Engineered from line one for maximum Lighthouse scores (95+), low Cumulative Layout Shift (CLS < 0.05), and instantaneous Interaction to Next Paint (INP < 100ms).',
      },
      {
        title: 'Search-First Server-Side Architecture',
        desc: 'Server-side rendering (SSR) and static generation (SSG) ensure search engines and AI crawlers immediately index complete HTML, metadata, and structured data.',
      },
      {
        title: 'Scalable Component Architecture',
        desc: 'Built with modular TypeScript, reusable atomic design systems, and strict type safety so your platform can scale from 10,000 to 1,000,000 monthly active users without refactoring.',
      },
      {
        title: 'Direct Enterprise API & CRM Integrations',
        desc: 'Native integrations with Stripe, Razorpay, HubSpot, Salesforce, Supabase, PostgreSQL, and custom headless CMS solutions.',
      },
    ],
    capabilities: [
      'Next.js App Router & Server Components Architecture',
      'React 19 & TypeScript Frontend Engineering',
      'Full-Stack Node.js, Express & Nest.js APIs',
      'Headless CMS Integrations (Sanity, Strapi, Contentful)',
      'Enterprise Authentication (NextAuth, Supabase Auth, Clerk)',
      'PostgreSQL, Prisma ORM, and Supabase Database Modeling',
      'CI/CD Pipeline Setup (GitHub Actions, Docker, Cloudflare)',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind/CSS', 'AWS', 'Vercel'],
    process: [
      {
        step: '01',
        title: 'Technical Discovery & Architecture',
        desc: 'We map out user flows, database schemas, API contracts, third-party integrations, and performance benchmarks before writing a line of code.',
      },
      {
        step: '02',
        title: 'High-Fidelity UI/UX & Design System',
        desc: 'Collaborative Figma designs, interactive component library, typography tokens, responsive breakpoints, and accessibility compliance (WCAG 2.1 AA).',
      },
      {
        step: '03',
        title: 'Iterative Sprint Development',
        desc: 'Two-week agile sprints with working staging builds, continuous test integration, and weekly milestone demos with your team.',
      },
      {
        step: '04',
        title: 'Production Hardening, SEO & Launch',
        desc: 'Rigorous end-to-end testing, Core Web Vitals audit, schema verification, Google Search Console integration, and seamless zero-downtime DNS deployment.',
      },
    ],
    investmentTiers: [
      {
        name: 'Startup MVP Platform',
        timeline: '6–8 weeks',
        budgetINR: '₹1,50,000 – ₹2,50,000',
        budgetUSD: '$1,800 – $3,000',
        idealFor: 'Early-stage startups needing a polished, high-speed product launch to validate market fit.',
      },
      {
        name: 'Growth Scale Application',
        timeline: '8–14 weeks',
        budgetINR: '₹2,50,000 – ₹4,80,000',
        budgetUSD: '$3,000 – $5,800',
        idealFor: 'Scale-ups requiring custom dashboards, user authentication, multi-tenant DB, and CRM automation.',
      },
      {
        name: 'Enterprise Custom Ecosystem',
        timeline: '14–22 weeks',
        budgetINR: '₹5,00,000+',
        budgetUSD: '$6,000+',
        idealFor: 'Large organisations needing bespoke microservices, strict security audits, and high-concurrency systems.',
      },
    ],
    faqs: [
      {
        question: 'Why does AmbiVision recommend Next.js over standard single-page React apps?',
        answer:
          'Standard client-side React apps render an empty HTML div that requires JavaScript execution before content displays. Next.js delivers pre-rendered HTML to the browser, ensuring immediate Largest Contentful Paint (LCP) and enabling search engines and AI assistants (Google AI Overviews, ChatGPT Search) to instantly read and index your content.',
      },
      {
        question: 'Do you hand over full source code ownership upon project completion?',
        answer:
          'Yes, 100%. All repository code, Figma assets, database migration scripts, API documentation, and deployment configurations belong entirely to you with zero vendor lock-in.',
      },
      {
        question: 'How do you ensure web accessibility and cross-browser compatibility?',
        answer:
          'We test against WCAG 2.1 Level AA standards, ensuring keyboard navigation, high contrast ratios, screen-reader semantic tags, and cross-browser consistency across Chrome, Safari, Firefox, and mobile viewports.',
      },
      {
        question: 'Can you migrate our existing legacy website to a modern Next.js platform?',
        answer:
          'Yes. We perform a zero-downtime migration that preserves all your existing SEO rankings, backlink structures, and 301 URL redirects while dramatically modernizing visual appeal and performance.',
      },
    ],
    relatedCaseStudy: 'food-delivery-platform',
  },

  'ui-ux-design': {
    slug: 'ui-ux-design',
    title: 'UI/UX & Product Design Services',
    metaTitle: 'UI/UX Design Studio in India — Product Design & Design Systems',
    metaDescription: 'Research-driven UI/UX design, interactive Figma prototypes, and comprehensive design systems. We turn complex user journeys into elegant, intuitive digital interfaces.',
    keywordClusters: [
      'UI/UX design services',
      'product design agency India',
      'Figma design system services',
      'user experience design company',
      'SaaS interface design',
    ],
    badge: 'Core Discipline 02',
    tagline: 'Transforming Business Complexity Into Intuitive, Conversion-Focused Interfaces',
    directAnswer:
      'AmbiVision crafts user experience (UX) and user interface (UI) designs for web platforms, SaaS applications, and mobile products. Our design workflow combines user research, competitive benchmarking, wireframing, high-fidelity Figma component systems, and interactive prototyping to produce interfaces that delight users and drive measurable commercial conversion.',
    benefits: [
      {
        title: 'Deep User Research & Journey Mapping',
        desc: 'We dissect your users’ pain points, behavioral friction, and core motivations through empathetic user flow diagrams and persona frameworks.',
      },
      {
        title: 'Scalable Enterprise Figma Design Systems',
        desc: 'Complete auto-layout Figma systems with color tokens, typography scales, light/dark modes, and modular UI components that streamline development.',
      },
      {
        title: 'Interactive High-Fidelity Prototyping',
        desc: 'Experience your digital product with lifelike micro-interactions and animations before writing a single line of backend code.',
      },
      {
        title: 'Engineer-Ready Handover',
        desc: 'Pixel-perfect specifications, CSS inspect values, responsive constraints, and asset exports ready for immediate frontend implementation.',
      },
    ],
    capabilities: [
      'User Research, Persona Modeling & Competitive Analysis',
      'Information Architecture & Low-Fidelity Wireframes',
      'High-Fidelity UI Design in Figma with Variables',
      'Comprehensive Design Systems (Typography, Colors, Spacing)',
      'Micro-Interactions & Motion Design Prototypes',
      'Usability Testing & Conversion Rate Optimization (CRO)',
      'WCAG 2.1 AA Accessibility Compliance Audits',
    ],
    techStack: ['Figma', 'FigJam', 'Principle', 'Adobe Creative Suite', 'Tokens Studio', 'Zeroheight'],
    process: [
      {
        step: '01',
        title: 'Research & User Empathy',
        desc: 'Stakeholder interviews, customer journey mapping, and industry benchmark analysis to identify differentiation opportunities.',
      },
      {
        step: '02',
        title: 'Information Architecture & Wireframes',
        desc: 'Low-fidelity layouts focusing on layout clarity, content hierarchy, and friction-free user flows.',
      },
      {
        step: '03',
        title: 'Visual Identity & High-Fidelity Design',
        desc: 'Crafting the visual language: bespoke typography, curated color harmony, elevated glassmorphism, and pixel-precise states.',
      },
      {
        step: '04',
        title: 'Interactive Prototype & Dev Handoff',
        desc: 'Clickable prototype testing, responsive layout documentation, and component variable exports for the frontend engineering team.',
      },
    ],
    investmentTiers: [
      {
        name: 'Sprint Design Package',
        timeline: '3–5 weeks',
        budgetINR: '₹80,000 – ₹1,50,000',
        budgetUSD: '$950 – $1,800',
        idealFor: 'Landing page suites, startup MVP flows, or redesigning an existing conversion funnel.',
      },
      {
        name: 'Full Product Design System',
        timeline: '6–10 weeks',
        budgetINR: '₹1,50,000 – ₹2,80,000',
        budgetUSD: '$1,800 – $3,400',
        idealFor: 'End-to-end SaaS products, mobile app suites, or enterprise platforms needing a comprehensive design system.',
      },
      {
        name: 'Continuous Product Design Retainer',
        timeline: 'Monthly ongoing',
        budgetINR: '₹1,00,000 / month',
        budgetUSD: '$1,200 / month',
        idealFor: 'Growing companies requiring continuous feature design, CRO testing, and sprint support.',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver source files in Figma?',
        answer:
          'Yes. You receive clean, fully documented Figma source files organized with auto-layout, components, variants, and design token variables.',
      },
      {
        question: 'How do you handle client feedback during the design phases?',
        answer:
          'We conduct two structured feedback rounds per phase (wireframes and visual designs) using Figma comments and recorded video walkthroughs to ensure rapid alignment.',
      },
      {
        question: 'Can you work with our existing brand guidelines?',
        answer:
          'Absolutely. We can adhere strictly to your existing brand book or evolve it into a modern, digital-first design system with elevated aesthetic depth.',
      },
      {
        question: 'Do you also implement the frontend code after design?',
        answer:
          'Yes. Our team can seamlessly transition from design into frontend Next.js/React engineering, ensuring the live product matches the Figma designs down to the pixel.',
      },
    ],
    relatedCaseStudy: 'stock-market-dashboard',
  },

  'mobile-app-development': {
    slug: 'mobile-app-development',
    title: 'Mobile App Development Services',
    metaTitle: 'Mobile App Development Company — React Native iOS & Android',
    metaDescription: 'Cross-platform iOS and Android mobile app development with React Native, Expo, and native modules. High-performance, offline-first mobile apps tailored for scale.',
    keywordClusters: [
      'mobile app development services',
      'React Native app development company',
      'iOS and Android app development India',
      'cross-platform mobile app developers',
      'custom mobile app engineering',
    ],
    badge: 'Core Discipline 03',
    tagline: 'High-Performance Cross-Platform Mobile Apps with Native Precision',
    directAnswer:
      'AmbiVision builds native-quality mobile applications for iOS and Android using React Native and Expo. We deliver smooth 60fps animations, offline-first data synchronization, secure biometrics, push notifications, and seamless background processing backed by robust cloud APIs.',
    benefits: [
      {
        title: 'Single Codebase, Native iOS & Android Quality',
        desc: 'Reduce development and maintenance costs by 40% with unified React Native architecture while preserving native gesture controls and performance.',
      },
      {
        title: 'Offline-First Data Architecture',
        desc: 'Built with local SQLite and WatermelonDB caching, ensuring your users enjoy seamless functionality even with intermittent or zero internet connectivity.',
      },
      {
        title: 'Enterprise Security & Biometrics',
        desc: 'Secure keychain storage, FaceID/TouchID biometric authentication, SSL pinning, and end-to-end data encryption.',
      },
      {
        title: 'App Store & Play Store Deployment Guarantee',
        desc: 'We manage the entire submission, provisioning profiles, privacy compliance, and store approval process on Apple App Store and Google Play Store.',
      },
    ],
    capabilities: [
      'Cross-Platform React Native & Expo Development',
      'Native Module Bridging (Swift & Kotlin)',
      'Real-Time WebSockets & Geolocation Tracking',
      'Push Notifications (OneSignal, Firebase FCM)',
      'In-App Purchases (StoreKit, RevenueCat)',
      'Offline Caching (WatermelonDB, SQLite, Zustand)',
      'App Store Optimization (ASO) & Release Management',
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Swift', 'Kotlin', 'Firebase', 'Supabase', 'Node.js'],
    process: [
      {
        step: '01',
        title: 'Mobile UX Architecture & Scoping',
        desc: 'Defining device constraints, permissions, touch ergonomics, screen flows, and offline sync strategies.',
      },
      {
        step: '02',
        title: 'Interactive Mobile Prototyping',
        desc: 'Designing native iOS and Android interface components following Apple Human Interface Guidelines and Google Material Design 3.',
      },
      {
        step: '03',
        title: 'React Native & API Engineering',
        desc: 'Building responsive screen layouts, state management, background services, device sensors, and API integrations.',
      },
      {
        step: '04',
        title: 'TestFlight, QA & Store Launch',
        desc: 'Beta distribution via Apple TestFlight and Google Play Internal Testing, automated device matrix QA, and final store publishing.',
      },
    ],
    investmentTiers: [
      {
        name: 'MVP Mobile Application',
        timeline: '8–12 weeks',
        budgetINR: '₹2,20,000 – ₹3,50,000',
        budgetUSD: '$2,600 – $4,200',
        idealFor: 'Early-stage startups launching core customer mobile features with essential backend APIs.',
      },
      {
        name: 'Advanced Real-Time Mobile App',
        timeline: '12–18 weeks',
        budgetINR: '₹3,50,000 – ₹6,00,000',
        budgetUSD: '$4,200 – $7,200',
        idealFor: 'On-demand services, fintech apps, social platforms, and logistics apps requiring live maps and notifications.',
      },
      {
        name: 'Enterprise Mobile Ecosystem',
        timeline: '18–26 weeks',
        budgetINR: '₹6,50,000+',
        budgetUSD: '$7,800+',
        idealFor: 'High-security financial apps, enterprise field operations, and healthcare systems with strict compliance requirements.',
      },
    ],
    faqs: [
      {
        question: 'Does a React Native app feel like a true native app?',
        answer:
          'Yes. React Native renders true native UI components (UIKit on iOS and Android Views on Android) rather than running in a webview wrapper, delivering genuine native fluidity, gestures, and haptic feedback.',
      },
      {
        question: 'Will our app work on both iPhone and Android devices simultaneously?',
        answer:
          'Yes. Approximately 85–90% of the codebase is shared across iOS and Android, allowing rapid feature updates and synchronized releases across both platforms.',
      },
      {
        question: 'Do you help with Apple App Store and Google Play Store rejection appeals?',
        answer:
          'Yes. We build strictly adhering to App Store Review Guidelines and handle all developer account setup, privacy policy manifests, and compliance submissions.',
      },
      {
        question: 'Can the app receive over-the-air (OTA) updates without waiting for app store review?',
        answer:
          'Yes. Using Expo EAS Update, we can deploy immediate JavaScript bug fixes and UI updates directly to your users without requiring an App Store review cycle.',
      },
    ],
    relatedCaseStudy: 'food-delivery-platform',
  },

  'ai-solutions': {
    slug: 'ai-solutions',
    title: 'AI Solutions & Intelligent Agents',
    metaTitle: 'AI Development Company in India — Custom LLMs, RAG & AI Agents',
    metaDescription: 'Enterprise AI solutions, autonomous agent workflows, RAG knowledge bases, and custom LLM integrations. Transform manual business operations into autonomous digital intelligence.',
    keywordClusters: [
      'AI development company in India',
      'AI agent development services',
      'custom LLM integration services',
      'RAG pipeline development company',
      'enterprise AI automation solutions',
    ],
    badge: 'Core Discipline 04',
    tagline: 'Empowering Businesses with Autonomous AI Agents & Intelligent Pipelines',
    directAnswer:
      'AmbiVision builds production-grade artificial intelligence solutions for businesses. We engineer autonomous AI agents, Retrieval-Augmented Generation (RAG) knowledge retrieval systems, voice AI assistants, and workflow automations powered by leading models (OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini 2.0) and secure open-source models (Llama 3, Mistral) hosted in your private infrastructure.',
    benefits: [
      {
        title: 'Autonomous Multi-Agent Workflows',
        desc: 'Deploy AI agents that reason, plan, use custom tools, query databases, and execute multi-step business actions without human bottlenecks.',
      },
      {
        title: 'Hallucination-Resistant Enterprise RAG',
        desc: 'Connect your internal PDFs, databases, knowledge bases, and documentation into a vector pipeline (Pinecone/Milvus) with verified citation references.',
      },
      {
        title: 'Privacy-Compliant Cloud & On-Premise Models',
        desc: 'Keep sensitive customer and company data confidential using private cloud endpoints, zero-data-retention APIs, or self-hosted open models.',
      },
      {
        title: 'Cost-Optimised Model Routing',
        desc: 'Intelligent inference routing directs simple queries to low-cost fast models and complex reasoning tasks to frontier models, cutting API costs by up to 60%.',
      },
    ],
    capabilities: [
      'Autonomous AI Agent Architecture (LangChain, LangGraph, CrewAI)',
      'Enterprise RAG Systems with Hybrid Semantic Search',
      'Vector Databases (Pinecone, Qdrant, Supabase pgvector)',
      'Conversational AI, Support Chatbots & Voice Interfaces (WebRTC, Whisper)',
      'Document Intelligence & Automated Data Extraction Pipelines',
      'Fine-Tuning & Prompt Engineering Optimization',
      'Custom Python & FastAPI AI Microservices',
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Anthropic Claude', 'Pinecone', 'Docker', 'PostgreSQL'],
    process: [
      {
        step: '01',
        title: 'AI Feasibility & Data Audit',
        desc: 'Assessing your unstructured data sources, volume, latency requirements, security constraints, and ROI potential.',
      },
      {
        step: '02',
        title: 'Knowledge Indexing & RAG Architecture',
        desc: 'Data chunking, embedding generation, semantic metadata indexing, and vector similarity benchmarking.',
      },
      {
        step: '03',
        title: 'Agent Tooling & Workflow Integration',
        desc: 'Developing specialized tool definitions, function calling, stateful memory handling, and guardrail validations.',
      },
      {
        step: '04',
        title: 'Evaluation, Hardening & Deployment',
        desc: 'Automated evaluation pipelines, red-teaming against prompt injections, latency optimization, and scalable cloud containerization.',
      },
    ],
    investmentTiers: [
      {
        name: 'Internal Knowledge RAG System',
        timeline: '6–10 weeks',
        budgetINR: '₹2,00,000 – ₹3,20,000',
        budgetUSD: '$2,400 – $3,800',
        idealFor: 'Companies seeking an accurate AI assistant to query internal documentation, manuals, or customer tickets.',
      },
      {
        name: 'Autonomous Multi-Agent Platform',
        timeline: '10–16 weeks',
        budgetINR: '₹3,20,000 – ₹5,80,000',
        budgetUSD: '$3,800 – $7,000',
        idealFor: 'Businesses automating end-to-end workflows such as candidate screening, document drafting, and data synthesis.',
      },
      {
        name: 'Enterprise AI Ecosystem',
        timeline: '16–24 weeks',
        budgetINR: '₹6,00,000+',
        budgetUSD: '$7,200+',
        idealFor: 'Large organisations requiring custom fine-tuning, private cloud deployments, and high-throughput real-time AI pipelines.',
      },
    ],
    faqs: [
      {
        question: 'Will our proprietary corporate data be used to train public AI models?',
        answer:
          'No. We exclusively utilize enterprise agreements with zero-data-retention policies (OpenAI Enterprise, Anthropic, AWS Bedrock) or deploy isolated open-source models within your private VPC so your data never leaves your perimeter.',
      },
      {
        question: 'How do you prevent hallucinations in business-critical answers?',
        answer:
          'We implement RAG with strict ground-truth citation requirements, fallback thresholds, hybrid vector-keyword search (BM25 + cosine distance), and deterministic guardrails that instruct the system to state when information is unavailable.',
      },
      {
        question: 'Can the AI agent integrate with our existing CRM and internal APIs?',
        answer:
          'Yes. We equip our AI agents with structured tools and OpenAPI schemas, enabling them to safely read from and write back to your Salesforce, HubSpot, Jira, Slack, or internal PostgreSQL databases.',
      },
      {
        question: 'What are the ongoing monthly costs for running these AI models?',
        answer:
          'Model API costs depend directly on token volume. With prompt compression and intelligent model routing, typical small-to-medium enterprise setups spend only $50–$300/month on inference tokens.',
      },
    ],
    relatedCaseStudy: 'ai-interview-agent',
  },

  'custom-software-development': {
    slug: 'custom-software-development',
    title: 'Custom Software Development Services',
    metaTitle: 'Custom Software Development Company in India — Backend & Cloud',
    metaDescription: 'Enterprise custom software development, resilient backend architecture, scalable microservices, and secure APIs. Built with Go, Node.js, PostgreSQL, and cloud-native systems.',
    keywordClusters: [
      'custom software development services',
      'enterprise software company India',
      'backend API engineering services',
      'cloud-native software development',
      'custom SaaS development agency',
    ],
    badge: 'Core Discipline 05',
    tagline: 'Mission-Critical Backend Architecture & Resilient Digital Systems',
    directAnswer:
      'AmbiVision engineers custom software systems, scalable backend architectures, and high-concurrency cloud infrastructure for enterprises and fast-growing startups. We design fault-tolerant microservices, robust relational database architectures, and secure RESTful and GraphQL APIs engineered to handle millions of transactions.',
    benefits: [
      {
        title: 'Built for High Concurrency & Uptime',
        desc: 'Engineered with non-blocking architectures, Redis caching, connection pooling, and auto-scaling Kubernetes clusters to sustain peak traffic surges.',
      },
      {
        title: 'Zero Technical Debt Architecture',
        desc: 'Strict Clean Architecture patterns, domain-driven design (DDD), comprehensive test coverage (unit, integration, e2e), and thorough API documentation.',
      },
      {
        title: 'Enterprise Security by Design',
        desc: 'Role-based access control (RBAC), OAuth2 / JWT authentication, data encryption at rest and in transit, and OWASP Top 10 hardening.',
      },
      {
        title: 'Cloud Cost Optimization',
        desc: 'Efficient resource allocation on AWS, Google Cloud, or Azure that prevents runaway cloud infrastructure bills.',
      },
    ],
    capabilities: [
      'Microservices & Distributed Systems Architecture',
      'High-Performance APIs (REST, GraphQL, gRPC)',
      'Database Modeling & Query Optimization (PostgreSQL, MySQL, Redis)',
      'Cloud Infrastructure as Code (Terraform, Docker, Kubernetes)',
      'Event-Driven Architectures (Kafka, RabbitMQ, AWS SQS)',
      'Payment Gateway & Banking Integrations',
      'Legacy Codebase Modernization & Cloud Migrations',
    ],
    techStack: ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP'],
    process: [
      {
        step: '01',
        title: 'System Architecture & Data Modeling',
        desc: 'Entity relationship diagrams, throughput analysis, API contracts, security posture, and failover strategy.',
      },
      {
        step: '02',
        title: 'Core Engine & Database Layer',
        desc: 'Database migrations, indexing strategies, caching layers, and transaction isolation levels.',
      },
      {
        step: '03',
        title: 'API Development & Integrations',
        desc: 'Implementing business logic, authentication handlers, external webhooks, and comprehensive rate limiting.',
      },
      {
        step: '04',
        title: 'Stress Testing, CI/CD & Launch',
        desc: 'Automated load testing with k6, penetration testing, CI/CD automation, and multi-region cloud deployment.',
      },
    ],
    investmentTiers: [
      {
        name: 'Custom Backend API & Database',
        timeline: '8–12 weeks',
        budgetINR: '₹2,50,000 – ₹4,00,000',
        budgetUSD: '$3,000 – $4,800',
        idealFor: 'Startups requiring a rock-solid, scalable backend foundation for their mobile or web frontends.',
      },
      {
        name: 'Full Enterprise Custom System',
        timeline: '12–20 weeks',
        budgetINR: '₹4,50,000 – ₹8,00,000',
        budgetUSD: '$5,400 – $9,600',
        idealFor: 'Mid-sized businesses digitizing complex internal operational workflows, ERPs, or proprietary portals.',
      },
      {
        name: 'Distributed Platform Ecosystem',
        timeline: '20–32 weeks',
        budgetINR: '₹8,50,000+',
        budgetUSD: '$10,000+',
        idealFor: 'Large enterprises requiring multi-tenant SaaS architecture, data pipelines, and multi-region high availability.',
      },
    ],
    faqs: [
      {
        question: 'Which backend programming languages does AmbiVision specialize in?',
        answer:
          'We primarily engineer backends using Node.js/TypeScript and Go for high-throughput services, Python for AI/data pipelines, and PostgreSQL as our core relational database of choice.',
      },
      {
        question: 'How do you ensure zero data loss during high-traffic spikes?',
        answer:
          'We leverage asynchronous event queues (Redis BullMQ, AWS SQS, or RabbitMQ) and transactional database outbox patterns so peak requests are reliably buffered and processed without dropped transactions.',
      },
      {
        question: 'Will our internal IT team be able to maintain this codebase?',
        answer:
          'Yes. We provide complete OpenAPI/Swagger API documentation, automated test suites, architectural decision records (ADRs), and hands-on handover sessions for your engineering team.',
      },
      {
        question: 'Do you offer ongoing SLA-backed maintenance and monitoring?',
        answer:
          'Yes. We provide maintenance retainers covering 24/7 uptime monitoring, Datadog/Sentry error alerts, security dependency patches, and continuous database performance tuning.',
      },
    ],
    relatedCaseStudy: 'stock-market-dashboard',
  },

  'ecommerce-development': {
    slug: 'ecommerce-development',
    title: 'E-commerce Website Development Services',
    metaTitle: 'Custom E-commerce Website Development — Headless Next.js & Shopify',
    metaDescription: 'Custom e-commerce platforms engineered for conversion, speed, and global scale. Headless Next.js stores, Shopify integrations, and lightning-fast checkout experiences.',
    keywordClusters: [
      'e-commerce website development',
      'headless commerce agency India',
      'custom e-commerce development company',
      'Shopify Next.js development',
      'online store development Bengaluru',
    ],
    badge: 'Core Discipline 06',
    tagline: 'High-Converting Headless E-commerce Stores Built to Outperform Competitors',
    directAnswer:
      'AmbiVision builds high-performance custom e-commerce stores designed to maximize average order value (AOV) and conversion rates. We specialize in headless commerce architectures pairing Next.js frontends with Shopify, Medusa, or custom backends, integrated with global payment gateways (Stripe, Razorpay, Cashfree) and lightning-fast checkout flows.',
    benefits: [
      {
        title: 'Instant Page Loads & Lower Bounce Rates',
        desc: 'Traditional theme-based online stores load slowly. Our headless Next.js storefronts load in under 600ms, directly reducing cart abandonment.',
      },
      {
        title: 'Frictionless Multi-Currency & Global Checkout',
        desc: 'Native support for INR, USD, EUR, and GBP with localized payment gateways (UPI, Credit Cards, NetBanking, Apple Pay, Google Pay).',
      },
      {
        title: 'Conversion Rate Optimised UX',
        desc: 'Engineered with sticky add-to-cart actions, 1-click checkout options, instant search filtering, and smart upsell bundles.',
      },
      {
        title: 'Automated Inventory & Shipping Sync',
        desc: 'Seamless real-time synchronization with Shiprocket, Delhivery, Zoho Inventory, and your existing ERP systems.',
      },
    ],
    capabilities: [
      'Headless Next.js Commerce Storefronts',
      'Custom Shopify & Shopify Plus Theme/App Engineering',
      'Medusa.js Open-Source Headless Commerce',
      'Payment Gateway Integration (Razorpay, Stripe, PayU, Cashfree)',
      'Automated Order, Inventory & Logistics Webhooks',
      'Dynamic Product Filtering & Instant Search (Algolia, Meilisearch)',
      'E-commerce Schema.org Structured Data (Product, Offer, Review)',
    ],
    techStack: ['Next.js', 'Shopify', 'Medusa.js', 'TypeScript', 'Tailwind', 'Stripe', 'Razorpay', 'Algolia'],
    process: [
      {
        step: '01',
        title: 'Catalog Architecture & Commerce Strategy',
        desc: 'Analyzing SKU volume, variant structures, payment requirements, shipping zones, and customer purchase pathways.',
      },
      {
        step: '02',
        title: 'E-commerce UI/UX & Conversion Design',
        desc: 'Designing high-converting product detail pages (PDP), category collection pages (PLP), cart drawers, and frictionless checkout flows.',
      },
      {
        step: '03',
        title: 'Headless Storefront Engineering',
        desc: 'Connecting Next.js frontend components with e-commerce APIs, cart state management, and localized payment gateways.',
      },
      {
        step: '04',
        title: 'Payment QA, Load Testing & Go-Live',
        desc: 'Comprehensive payment testing across cards and UPI, inventory sync verification, schema audit, and high-concurrency launch preparation.',
      },
    ],
    investmentTiers: [
      {
        name: 'Custom Direct-to-Consumer Store',
        timeline: '6–9 weeks',
        budgetINR: '₹1,60,000 – ₹2,80,000',
        budgetUSD: '$1,900 – $3,400',
        idealFor: 'D2C brands seeking a bespoke, high-converting digital storefront that stands out from generic Shopify templates.',
      },
      {
        name: 'Headless Commerce Platform',
        timeline: '10–15 weeks',
        budgetINR: '₹3,00,000 – ₹5,50,000',
        budgetUSD: '$3,600 – $6,600',
        idealFor: 'Growing retail brands needing sub-second speeds, international currencies, and deep CRM/ERP connections.',
      },
      {
        name: 'Omnichannel Enterprise Marketplace',
        timeline: '16–24 weeks',
        budgetINR: '₹6,00,000+',
        budgetUSD: '$7,200+',
        idealFor: 'Multi-vendor marketplaces or enterprise brands with tens of thousands of SKUs and complex fulfillment pipelines.',
      },
    ],
    faqs: [
      {
        question: 'Why choose headless e-commerce over standard Shopify themes?',
        answer:
          'Standard Shopify themes carry heavy liquid scripts and plugin bloat that slow down mobile load times. Headless commerce decouples the frontend using Next.js, yielding instantaneous page transitions, complete design freedom, and significantly higher conversion rates.',
      },
      {
        question: 'Can we still manage products and orders in our Shopify admin dashboard?',
        answer:
          'Yes! Your team continues using the familiar Shopify admin for managing products, collections, inventory, and customer orders while the custom Next.js frontend powers the customer-facing storefront.',
      },
      {
        question: 'Which payment gateways do you support for Indian and international customers?',
        answer:
          'We integrate Razorpay, Cashfree, and PayU for Indian customers (supporting UPI, cards, net banking, and EMI), and Stripe/PayPal for international buyers with automated currency conversion.',
      },
      {
        question: 'Is product rich schema included for Google Shopping visibility?',
        answer:
          'Yes. Every product page automatically includes valid Schema.org Product, Offer, and Breadcrumb JSON-LD markup so Google and AI search tools can display live pricing, availability, and product metadata.',
      },
    ],
    relatedCaseStudy: 'food-delivery-platform',
  },

  'seo-ai-search-optimization': {
    slug: 'seo-ai-search-optimization',
    title: 'Technical SEO & AI Search Optimization (GEO / AEO)',
    metaTitle: 'Technical SEO & AI Search Optimization Company — GEO & AEO',
    metaDescription: 'Next-generation technical SEO and Generative Engine Optimization (GEO). Ensure your business ranks on Google Search and gets cited by Google AI Overviews, ChatGPT Search, and Gemini.',
    keywordClusters: [
      'technical SEO services',
      'AI search optimization services',
      'Generative Engine Optimization GEO',
      'Answer Engine Optimization AEO company',
      'Google AI Overviews optimization India',
    ],
    badge: 'Core Discipline 07',
    tagline: 'Modern Technical SEO & Generative Engine Optimization for the AI Era',
    directAnswer:
      'AmbiVision provides advanced Technical SEO and Generative Engine Optimization (GEO/AEO). We prepare modern digital products to achieve dominant rankings in traditional Google organic search and earn authoritative citations across AI-driven discovery engines including Google AI Overviews, ChatGPT Search, Perplexity, and Google Gemini.',
    benefits: [
      {
        title: 'Core Web Vitals & Technical Speed Excellence',
        desc: 'Audit and remediate script blocking, layout shifts, oversized assets, and server response times to guarantee passing Core Web Vitals.',
      },
      {
        title: 'Comprehensive Schema.org Structured Data',
        desc: 'Deep semantic JSON-LD architecture (Organization, Service, Article, FAQPage, BreadcrumbList) that explicitly informs search bots of your entity relationships.',
      },
      {
        title: 'AI Answer Engine Optimization (GEO & AEO)',
        desc: 'Structure your web content with direct answer summaries, high information density, and unambiguous claims so generative models cite your brand as an authority.',
      },
      {
        title: 'Bot & Crawler Management (OAI-SearchBot, Googlebot)',
        desc: 'Configure robots.txt, sitemaps, and headers to invite legitimate search and AI discovery crawlers while blocking abusive scrapers.',
      },
    ],
    capabilities: [
      'Comprehensive Technical SEO Architecture Audits',
      'Core Web Vitals Remediation (LCP, INP, CLS)',
      'Schema.org JSON-LD Structured Data Engineering',
      'Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO)',
      'XML Sitemap & Dynamic Robots.txt Management',
      'Internal Linking Architecture & Semantic Topic Clusters',
      'Google Search Console & Google Analytics 4 Setup',
    ],
    techStack: ['Google Search Console', 'Lighthouse', 'Schema.org', 'Screaming Frog', 'Next.js', 'Google Analytics 4'],
    process: [
      {
        step: '01',
        title: 'Technical & Semantic Crawl Audit',
        desc: 'Deep scan of your website’s crawlability, indexing status, HTTP status codes, canonical tags, and rendered DOM content.',
      },
      {
        step: '02',
        title: 'Core Web Vitals & Rendering Optimization',
        desc: 'Eliminating render-blocking assets, lazy-loading offscreen elements, and optimizing server response times (TTFB).',
      },
      {
        step: '03',
        title: 'Structured Data & Entity Graph Setup',
        desc: 'Implementing and validating rich JSON-LD markup across all indexable routes and connecting entities to your brand graph.',
      },
      {
        step: '04',
        title: 'AEO Content Structuring & Search Console Setup',
        desc: 'Refining page content with clear answers and heading hierarchies, submitting clean XML sitemaps, and configuring tracking.',
      },
    ],
    investmentTiers: [
      {
        name: 'Technical SEO & GEO Audit + Fix Sprint',
        timeline: '3–5 weeks',
        budgetINR: '₹75,000 – ₹1,30,000',
        budgetUSD: '$900 – $1,600',
        idealFor: 'Existing websites needing immediate remediation for Core Web Vitals, broken canonicals, and missing schema.',
      },
      {
        name: 'Complete Search & AI Optimization Program',
        timeline: '8–12 weeks',
        budgetINR: '₹1,50,000 – ₹2,60,000',
        budgetUSD: '$1,800 – $3,200',
        idealFor: 'Brands looking to establish organic authority across Google Search, Google AI Overviews, and ChatGPT Search.',
      },
      {
        name: 'Ongoing Technical SEO & Content Authority Retainer',
        timeline: 'Monthly ongoing',
        budgetINR: '₹60,000 / month',
        budgetUSD: '$750 / month',
        idealFor: 'Continuous index monitoring, technical health checks, competitor gap analysis, and content cluster expansion.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between traditional SEO and Generative Engine Optimization (GEO)?',
        answer:
          'Traditional SEO focuses on keyword rankings and backlinks to win traditional search result blue links. Generative Engine Optimization (GEO) formats your content with direct definitions, authoritative citations, semantic schema, and high information density so AI models (Google AI Overviews, ChatGPT Search, Gemini) extract and cite your website as the primary source when answering user questions.',
      },
      {
        question: 'Do you guarantee a #1 ranking on Google?',
        answer:
          'No ethical agency guarantees a specific #1 ranking, as Google’s algorithms are proprietary and dynamic. However, we guarantee 100% technical compliance, passing Core Web Vitals, flawless structured data, and superior architectural crawlability that maximizes your ranking potential.',
      },
      {
        question: 'Does allowing OAI-SearchBot help my website get discovered in ChatGPT?',
        answer:
          'Yes. OAI-SearchBot is the crawler OpenAI uses specifically to find web links and surface citations in ChatGPT Search results. Allowing OAI-SearchBot in your robots.txt ensures ChatGPT can discover, reference, and link to your public pages.',
      },
      {
        question: 'How long does it take for Google to index new pages and structured data?',
        answer:
          'With a properly configured XML sitemap submitted through Google Search Console and clean internal links, Google typically crawls and indexes newly published pages within 2 to 7 days.',
      },
    ],
    relatedCaseStudy: 'stock-market-dashboard',
  },

  'saas-development': {
    slug: 'saas-development',
    title: 'SaaS Product Engineering & Multi-Tenant Architecture',
    metaTitle: 'SaaS Development Company in India — Multi-Tenant Cloud Software',
    metaDescription: 'End-to-end SaaS development services: multi-tenant architecture, Stripe subscription billing, RBAC, API integrations, and cloud scalability on Next.js, Node.js, and AWS.',
    keywordClusters: [
      'SaaS development company India',
      'custom SaaS application engineering',
      'multi-tenant software architecture',
      'B2B SaaS product development agency',
      'Next.js SaaS starter enterprise',
    ],
    badge: 'Core Discipline 08',
    tagline: 'Engineering Enterprise-Grade Multi-Tenant Cloud Software That Converts & Scales',
    directAnswer:
      'AmbiVision provides end-to-end SaaS development services, transforming product visions into high-velocity, scalable cloud platforms. We design multi-tenant data architectures, implement tiered subscription billing (Stripe, Lemon Squeezy, Razorpay), build granular role-based access control (RBAC), and deploy resilient microservices on AWS and Google Cloud.',
    benefits: [
      {
        title: 'Multi-Tenant Isolation & Data Security',
        desc: 'Architected with tenant-level data segregation, row-level security (RLS), and isolated database schemas ensuring zero cross-tenant data leakage and enterprise compliance.',
      },
      {
        title: 'Frictionless Subscription & Metered Billing',
        desc: 'Out-of-the-box billing pipelines for seat-based pricing, usage-based consumption meters, customer self-serve portals, trial handling, and automated invoice delivery.',
      },
      {
        title: 'High-Velocity Onboarding & Team Workspaces',
        desc: 'Built-in team management, invitation workflows, SAML/SSO authentication, custom subdomains, and granular permission matrices.',
      },
      {
        title: 'API-First & Webhook Ecosystem',
        desc: 'Expose robust RESTful and GraphQL APIs with developer portals, rate limiting, and webhook dispatch engines so customers can integrate your SaaS into their stacks.',
      },
    ],
    capabilities: [
      'Multi-Tenant Architecture & Database Partitioning',
      'Stripe, Lemon Squeezy & Razorpay Subscription Billing',
      'Team Workspaces, Role-Based Access Control (RBAC) & SSO',
      'Usage-Based Metering & Automated Invoicing',
      'Real-Time In-App Notifications & Transactional Emails',
      'Audit Logging, Compliance & Customer Security Controls',
      'Analytics Dashboards, Churn Tracking & Revenue Metrics',
      'Custom Domain Support & White-Label Subdomains',
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma / Drizzle', 'Redis', 'Stripe', 'Docker', 'AWS'],
    process: [
      {
        step: '01',
        title: 'Architecture & Multi-Tenancy Blueprint',
        desc: 'Defining data isolation models (shared schema vs. schema-per-tenant), authentication schemes, billing tiers, and data schemas.',
      },
      {
        step: '02',
        title: 'Core Engine, Auth & Workspace Layer',
        desc: 'Building multi-tenant user authentication, workspace creation, member invites, RBAC permissions, and session handling.',
      },
      {
        step: '03',
        title: 'Feature Engineering & Billing Pipeline',
        desc: 'Developing customer-facing product features, Stripe webhook listeners, automated plan upgrades/downgrades, and usage tracking.',
      },
      {
        step: '04',
        title: 'Security Audits, Load Testing & Cloud Deployment',
        desc: 'Conducting tenant isolation validation, penetration testing, database indexing, and deploying auto-scaling infrastructure on AWS / Vercel.',
      },
    ],
    investmentTiers: [
      {
        name: 'SaaS MVP & Fast-to-Market Foundation',
        timeline: '6–8 weeks',
        budgetINR: '₹2,50,000 – ₹4,20,000',
        budgetUSD: '$3,000 – $5,000',
        idealFor: 'Founders building a production-ready Minimum Viable Product (MVP) with authentication, subscription billing, and core feature workflow.',
      },
      {
        name: 'Full-Scale B2B SaaS Enterprise Platform',
        timeline: '12–16 weeks',
        budgetINR: '₹4,50,000 – ₹8,50,000',
        budgetUSD: '$5,500 – $10,500',
        idealFor: 'Growth-stage companies and enterprises requiring custom team workspaces, audit logs, advanced analytics, custom subdomains, and API portals.',
      },
    ],
    faqs: [
      {
        question: 'How do you ensure data isolation between different tenants in a multi-tenant SaaS?',
        answer:
          'We implement tenant-level isolation using PostgreSQL Row-Level Security (RLS) combined with strict tenant IDs on every table, or dedicated schemas per enterprise customer. Every query enforces tenant boundary constraints at both the application middleware and database engine levels.',
      },
      {
        question: 'Which billing systems do you support for SaaS subscriptions?',
        answer:
          'We primarily integrate Stripe Billing for global subscription management (recurring plans, metered billing, prorations, coupons, and dunning). For Indian domestic payments, we integrate Razorpay Subscriptions. We also support Lemon Squeezy and Paddle as Merchant of Record (MoR) providers.',
      },
      {
        question: 'Can you build custom domain support so our customers can use their own domains?',
        answer:
          'Yes. We build custom domain routing using Vercel Custom Domains API or Cloudflare for Platforms, providing automated SSL provisioning and CNAME verification for every tenant.',
      },
      {
        question: 'Do we own the full intellectual property (IP) and source code?',
        answer:
          'Yes, 100%. Upon project completion, full repository ownership, deployment credentials, design assets, and all intellectual property rights belong exclusively to you with zero vendor lock-in.',
      },
    ],
    relatedCaseStudy: 'stock-market-dashboard',
  },
};
