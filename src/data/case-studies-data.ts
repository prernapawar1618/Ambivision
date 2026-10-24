export interface CaseStudyItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  projectType: 'Concept Demonstration & Technical Architecture' | 'Verified Client Engagement';
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  architectureDecisions: { title: string; desc: string }[];
  keyFeatures: string[];
  techStack: string[];
  prototypeMetrics: { metric: string; value: string; label: string }[];
  lessonsLearned: string;
  relatedService: string;
}

export const CASE_STUDIES_DATA: Record<string, CaseStudyItem> = {
  'food-delivery-platform': {
    slug: 'food-delivery-platform',
    title: 'Hyper-Local Food Delivery & Real-Time Logistics Platform',
    client: 'SwiftBite (Concept Demonstration)',
    category: 'Full-Stack Web & Mobile Engineering',
    projectType: 'Concept Demonstration & Technical Architecture',
    metaTitle: 'SwiftBite — Real-Time Food Delivery Platform Case Study | AmbiVision',
    metaDescription: 'In-depth case study of SwiftBite: a real-time hyper-local food delivery prototype engineered with Next.js, React Native, WebSockets, and geospatial routing.',
    tagline: 'Engineering a Sub-Second Order Dispatch Engine with Live Driver Tracking',
    overview:
      'SwiftBite is an end-to-end concept demonstration showcasing how AmbiVision designs and engineers hyper-local on-demand delivery systems. The prototype includes a customer mobile interface, real-time kitchen display system (KDS), driver navigation dispatch, and an administrative analytics portal.',
    problem:
      'Hyper-local delivery applications struggle with real-time driver tracking latency, high database lock contention during lunch and dinner order surges, and poor mobile network connectivity in dense urban environments.',
    solution:
      'We engineered an event-driven architecture utilizing WebSocket connections, Redis Geo clustering for spatial driver queries, and an offline-first mobile app built on React Native with local SQLite caching.',
    architectureDecisions: [
      {
        title: 'Redis Geospatial Indexing for Driver Matching',
        desc: 'Instead of expensive relational SQL bounding-box calculations, we used Redis GEOADD and GEORADIUS commands, reducing driver matching latency from 850ms to 18ms.',
      },
      {
        title: 'Event-Driven Order State Machine',
        desc: 'Orders progress through a strict state machine (Placed → Confirmed → Cooking → Dispatched → Delivered) coordinated via event queues to eliminate race conditions.',
      },
      {
        title: 'Optimistic Mobile UI with Background Sync',
        desc: 'Cart updates and order status changes render instantly on the client while network synchronization occurs asynchronously in the background.',
      },
    ],
    keyFeatures: [
      'Customer Web & Mobile Ordering with Instant UPI / Card Checkout',
      'Real-Time Driver Tracking via Mapbox WebSockets',
      'Merchant Kitchen Order Display with Sound Alerts & Auto-Accept',
      'Automated Route Batching & Distance Matrix Calculations',
      'Administrative Analytics Dashboard for Commission & Cohort Retention',
    ],
    techStack: ['Next.js', 'React Native', 'Node.js', 'Redis Geo', 'PostgreSQL', 'WebSockets', 'Mapbox', 'Tailwind'],
    prototypeMetrics: [
      { metric: '<20ms', value: 'Geospatial Latency', label: 'Average driver discovery lookup speed' },
      { metric: '99.9%', value: 'Order Accuracy', label: 'Zero dropped events during simulated 10k surge' },
      { metric: '600ms', value: 'Storefront LCP', label: 'Largest Contentful Paint across 4G connections' },
    ],
    lessonsLearned:
      'Decoupling GPS location ingestion from the relational transactional database was critical. Streaming high-frequency driver coordinates into Redis and publishing batched state changes prevented PostgreSQL write saturation.',
    relatedService: 'mobile-app-development',
  },

  'ai-learning-management-system': {
    slug: 'ai-learning-management-system',
    title: 'Adaptive AI-Powered Learning & Curriculum Intelligence Platform',
    client: 'EduPulse AI (Concept Demonstration)',
    category: 'AI Solutions & Cloud Architecture',
    projectType: 'Concept Demonstration & Technical Architecture',
    metaTitle: 'EduPulse AI — Adaptive Learning Platform Case Study | AmbiVision',
    metaDescription: 'Explore the technical architecture of EduPulse AI: an adaptive learning management system utilizing RAG, vector embeddings, and real-time knowledge graphs.',
    tagline: 'Personalized Educational Trajectories Powered by Generative Knowledge Graphs',
    overview:
      'EduPulse AI is an advanced prototype illustrating how generative AI and knowledge retrieval can revolutionize modern corporate and higher-education learning management systems (LMS). The platform tailors quiz difficulty, curriculum depth, and study flashcards to each learner’s specific cognitive retention pace.',
    problem:
      'Static learning management systems offer rigid, one-size-fits-all video playlists with low student engagement, delayed quiz feedback, and no customized support for learners who encounter conceptual roadblocks.',
    solution:
      'We designed an interactive learning architecture combining course transcripts with a Pinecone vector database. An AI tutor analyzes learner errors in real-time, generates targeted Socratic explanations, and adjusts the course path dynamically.',
    architectureDecisions: [
      {
        title: 'Hybrid Chunking for Educational Textbooks',
        desc: 'Implemented recursive markdown chunking paired with parent-document retrieval so the AI model retains broad chapter context while retrieving exact formula definitions.',
      },
      {
        title: 'Socratic Prompt Guardrails',
        desc: 'Engineered specialized system prompts that prohibit the AI from simply revealing exam answers, guiding the student step-by-step through principles instead.',
      },
      {
        title: 'Low-Latency Streaming Responses',
        desc: 'Leveraged Server-Sent Events (SSE) with Vercel AI SDK to stream conversational tutor responses within 220ms Time-to-First-Token (TTFT).',
      },
    ],
    keyFeatures: [
      'Interactive Socratic AI Tutor with Course Document Retrieval',
      'Dynamic Quiz Generation with Automated Difficulty Calibration',
      'Visual Concept Dependency Graphs in Interactive SVG',
      'Educator Dashboard for Cohort Mastery Heatmaps & At-Risk Alerts',
      'Automated Audio-to-Summary Pipeline with Chapter Bookmarking',
    ],
    techStack: ['Next.js', 'FastAPI', 'Python', 'LangChain', 'Pinecone', 'OpenAI GPT-4o', 'Tailwind', 'PostgreSQL'],
    prototypeMetrics: [
      { metric: '220ms', value: 'TTFT Stream', label: 'Time-to-First-Token for AI tutor chat' },
      { metric: '94%', value: 'Retrieval Precision', label: 'Verified citations from textbook sources' },
      { metric: '3.2x', value: 'Study Engagement', label: 'Average session duration vs static video LMS' },
    ],
    lessonsLearned:
      'Strict temperature control and few-shot calibration were essential to prevent the LLM from making up historical dates or mathematical theorem derivations. Using ground-truth vector citations eliminated ungrounded assertions.',
    relatedService: 'ai-solutions',
  },

  'stock-market-dashboard': {
    slug: 'stock-market-dashboard',
    title: 'High-Frequency Financial Market Terminal & Portfolio Analytics',
    client: 'AlphaTrade Pro (Concept Demonstration)',
    category: 'Financial UI/UX & Real-Time Data',
    projectType: 'Concept Demonstration & Technical Architecture',
    metaTitle: 'AlphaTrade Pro — Real-Time Stock Market Dashboard | AmbiVision',
    metaDescription: 'Case study of AlphaTrade Pro: an ultra-low-latency financial dashboard prototype featuring interactive Canvas charting, WebSockets, and portfolio risk modeling.',
    tagline: 'Visualizing Millions of Data Points with Zero UI Lag and Canvas Rendering',
    overview:
      'AlphaTrade Pro is a concept demonstration for institutional trading desks and retail power investors. It provides real-time Level 2 market depth visualisations, customizable multi-monitor layouts, technical indicators, and automated portfolio risk calculations.',
    problem:
      'Standard DOM-based charting components freeze or drop frames when rendering thousands of incoming price ticks per second, causing severe browser thread lockup during volatile market hours.',
    solution:
      'We replaced traditional SVG chart rendering with an optimized HTML5 Canvas and WebGL charting pipeline. Incoming tick streams are buffered via Web Workers, ensuring silky-smooth 60fps rendering regardless of market volume.',
    architectureDecisions: [
      {
        title: 'Web Worker Tick Buffering',
        desc: 'All real-time tick parsing, RSI/MACD indicator computations, and JSON deserialization run in dedicated background Web Workers, keeping the main UI thread 100% responsive.',
      },
      {
        title: 'HTML5 Canvas High-Density Rendering',
        desc: 'Custom dual-buffered canvas engine capable of rendering 100,000 candlestick data points with instantaneous zoom and pan gestures.',
      },
      {
        title: 'Micro-Frontend Modular Grid Layout',
        desc: 'Drag-and-drop workspace layout system supporting custom docking, split panes, and multi-monitor state preservation via IndexedDB.',
      },
    ],
    keyFeatures: [
      'Sub-50ms Real-Time Tick Streaming via Secure WebSockets',
      'Dual-Buffered Canvas Candlestick & Volume Charts with 30+ Indicators',
      'Interactive Order Book Depth Visualizer (Level 2 Market Data)',
      'Value-at-Risk (VaR) & Portfolio Beta Stress-Testing Modules',
      'Keyboard-First Quick Execution Hotkeys & Dark Mode Terminal Aesthetic',
    ],
    techStack: ['Next.js', 'TypeScript', 'HTML5 Canvas', 'Web Workers', 'WebSockets', 'Go Microservices', 'Redis'],
    prototypeMetrics: [
      { metric: '60 FPS', value: 'Frame Rate', label: 'Steady rendering under 5,000 ticks/second' },
      { metric: '<35ms', value: 'Stream Latency', label: 'End-to-end WebSocket roundtrip latency' },
      { metric: '0%', value: 'Main Thread Drops', label: 'Zero frozen UI frames via Web Worker isolation' },
    ],
    lessonsLearned:
      'Garbage collection pauses in JavaScript were the main culprit behind stuttering charts. Reusing typed array buffers (Float64Array) instead of allocating new objects per price tick completely eliminated GC spikes.',
    relatedService: 'custom-software-development',
  },

  'ai-interview-agent': {
    slug: 'ai-interview-agent',
    title: 'Autonomous Conversational AI Interviewer & Recruiter Evaluation Suite',
    client: 'TalentSense AI (Concept Demonstration)',
    category: 'AI Solutions & Voice Interfaces',
    projectType: 'Concept Demonstration & Technical Architecture',
    metaTitle: 'TalentSense AI — Autonomous Interview Agent Case Study | AmbiVision',
    metaDescription: 'Detailed technical analysis of TalentSense AI: an autonomous conversational voice AI interview agent engineered with Whisper, WebRTC, and objective competency scoring.',
    tagline: 'Conducting Natural Voice Technical Screenings with Unbiased Rubric Evaluation',
    overview:
      'TalentSense AI is an enterprise concept platform showcasing autonomous voice-based candidate screening. The AI conducts natural 20-minute structured technical interviews, adapts follow-up questions to candidate responses, and compiles an objective competency scorecard for hiring managers.',
    problem:
      'Engineering hiring teams spend hundreds of hours per month on repetitive initial candidate screenings, while human interviewers introduce unconscious bias and inconsistent question rigor.',
    solution:
      'We built a conversational voice pipeline using WebRTC audio streaming, Whisper transcription, an LLM reasoning engine equipped with job-specific rubric criteria, and synthetic speech generation with natural conversational turn-taking.',
    architectureDecisions: [
      {
        title: 'Full-Duplex WebRTC Audio Streaming',
        desc: 'Bi-directional audio streaming ensures instantaneous interruption handling: if the candidate begins speaking, the AI immediately pauses without awkward collisions.',
      },
      {
        title: 'Blind Structured Scoring Rubrics',
        desc: 'The AI evaluates candidates purely on transcript technical depth, problem-solving structure, and concrete examples, completely isolated from demographic indicators.',
      },
      {
        title: 'Code Execution Sandbox Integration',
        desc: 'Built an integrated isolated Docker code sandbox so candidates can run and test code solutions live during technical coding questions.',
      },
    ],
    keyFeatures: [
      'Real-Time Voice Conversation with <450ms Natural Turn-Taking Latency',
      'Dynamic Technical Follow-Up Questioning Based on Candidate Statements',
      'Automated Rubric Scoring (System Design, Algorithms, Communication)',
      'Recruiter Comparison Matrix with Searchable Video/Transcript Timestamps',
      'Candidate Privacy Compliance with Auto-Redaction of PII',
    ],
    techStack: ['Next.js', 'Python', 'FastAPI', 'WebRTC', 'OpenAI Whisper', 'Claude 3.5 Sonnet', 'Docker', 'PostgreSQL'],
    prototypeMetrics: [
      { metric: '420ms', value: 'Audio Response', label: 'Full turnaround time from candidate silence to AI voice' },
      { metric: '91%', value: 'Recruiter Agreement', label: 'Correlation between AI scorecard and senior engineer ratings' },
      { metric: '75%', value: 'Screening Time Saved', label: 'Reduction in engineering time spent on round-one calls' },
    ],
    lessonsLearned:
      'Accurate voice activity detection (VAD) was more important for conversational naturalness than raw LLM generation speed. Tuning silence thresholds prevented the AI from interrupting candidates who were simply pausing to think.',
    relatedService: 'ai-solutions',
  },
};

// Route slug aliases to guarantee backward and cross-route compatibility
CASE_STUDIES_DATA['real-time-stock-market'] = {
  ...CASE_STUDIES_DATA['stock-market-dashboard'],
  slug: 'real-time-stock-market',
};
CASE_STUDIES_DATA['ai-powered-lms'] = {
  ...CASE_STUDIES_DATA['ai-learning-management-system'],
  slug: 'ai-powered-lms',
};
