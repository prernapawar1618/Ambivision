export interface JobPosition {
  id: string;
  title: string;
  department: 'Engineering' | 'AI & ML' | 'Design';
  type: 'Full-time' | 'Contract' | 'Internship';
  location: string;
  remoteStatus: 'Remote' | 'Hybrid (Nashik / Remote)' | 'On-site';
  experienceLevel: string;
  eligibility: string;
  shortDescription: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  isPublished: boolean;
  approvalStatus: 'Approved' | 'Proposed (Pending Project Approval)';
  statusNote?: string;
}

export const CAREERS_CONFIG = {
  // Master toggle: set to false if AmbiVision pauses all intake
  acceptingApplications: true,
  companyPitch:
    'At AmbiVision, we build category-defining digital products, autonomous AI agent pipelines, and high-performance web platforms. We operate with an engineering-first culture: high autonomy, mentorship, craftsmanship, and an uncompromising commitment to clean code and responsive digital experiences.',
  principles: [
    {
      title: 'Craft & Code Quality',
      desc: 'We care deeply about clean architecture, type safety, accessible UI, semantic markup, and thoughtful micro-interactions.',
    },
    {
      title: 'Continuous Learning',
      desc: 'Whether building foundational web components or orchestrating AI workflows, we encourage curiosity and practical experimentation.',
    },
    {
      title: 'Async & Autonomous',
      desc: 'We respect deep focus time, prioritize thoughtful written documentation, and work in clear, organized development sprints.',
    },
    {
      title: 'Practical Impact',
      desc: 'Every feature we ship directly drives performance, conversion, or real usability for products and client platforms.',
    },
  ],
};

/**
 * All proposed positions for AmbiVision.
 * Only positions marked `isPublished: true` are published on the active careers page.
 * Positions marked `isPublished: false` remain configurable proposed listings pending AmbiVision approval / project requirements.
 */
export const ALL_PROPOSED_POSITIONS: JobPosition[] = [
  {
    id: 'frontend-developer-intern',
    title: 'Frontend Developer Intern',
    department: 'Engineering',
    type: 'Internship',
    location: 'Nashik / Remote',
    remoteStatus: 'Remote',
    experienceLevel: 'Internship · Students & Aspiring Developers',
    eligibility:
      'Open to students, recent graduates, self-taught developers, and career switchers. Candidates with prior internship or practical project experience are also eligible and welcome.',
    shortDescription:
      'Build modern, interactive user interfaces with React, JavaScript, and CSS. Learn best practices in component design and responsive layout.',
    overview:
      'We are looking for a motivated Frontend Developer Intern to join our engineering workflow. You will collaborate with developers to build responsive web interfaces, refine styling, and implement clean UI components.',
    responsibilities: [
      'Implement responsive web interfaces using HTML5, modern CSS, and React.',
      'Translate design wireframes and component specs into functional, accessible UI elements.',
      'Collaborate on code reviews, debugging, and cross-browser testing across mobile and desktop.',
      'Learn modern build tooling, Git workflows, and component-driven development practices.',
    ],
    requirements: [
      'Solid foundational understanding of HTML, CSS, and modern JavaScript (ES6+).',
      'Familiarity with React basics (components, props, state management).',
      'Demonstrated enthusiasm through personal projects, coursework, open-source work, or past internships.',
      'Good written and verbal communication, with an eagerness to learn and receive constructive feedback.',
    ],
    niceToHave: [
      'Basic knowledge of Next.js or TypeScript.',
      'Familiarity with Git and GitHub version control.',
    ],
    isPublished: true,
    approvalStatus: 'Approved',
  },
  {
    id: 'web-development-intern',
    title: 'Web Development Intern',
    department: 'Engineering',
    type: 'Internship',
    location: 'Nashik / Remote',
    remoteStatus: 'Remote',
    experienceLevel: 'Internship · Practical Web Development',
    eligibility:
      'Open to candidates looking for practical development experience, including students, freshers, or individuals with hands-on coding experience through projects or previous work.',
    shortDescription:
      'Gain practical, hands-on development experience building web pages, testing APIs, and maintaining clean frontend architectures.',
    overview:
      'Join our studio as a Web Development Intern to gain practical development experience across real client platforms and web applications. You will work alongside experienced engineers to turn specifications into working code.',
    responsibilities: [
      'Assist in developing and updating web pages, landing experiences, and UI modules.',
      'Test web pages for responsiveness, accessibility, and visual consistency across devices.',
      'Connect frontend components to REST APIs and handle data display cleanly.',
      'Maintain clean, documented code and participate in sprint syncs.',
    ],
    requirements: [
      'Working knowledge of core web technologies: HTML, CSS, and JavaScript.',
      'Understanding of responsive design principles and mobile-first layouts.',
      'Ability to share code samples, academic projects, personal websites, or GitHub repositories.',
      'A proactive, problem-solving mindset and willingness to ask questions and learn.',
    ],
    niceToHave: [
      'Experience with CSS frameworks or preprocessors.',
      'Basic understanding of server-side concepts or API endpoints.',
    ],
    isPublished: true,
    approvalStatus: 'Approved',
  },
  {
    id: 'ui-ux-design-intern',
    title: 'UI/UX Design Intern',
    department: 'Design',
    type: 'Internship',
    location: 'Nashik / Remote',
    remoteStatus: 'Remote',
    experienceLevel: 'Internship · Aspiring & Developing Designers',
    eligibility:
      'Open to aspiring and developing designers, design students, and self-taught creatives. Prior freelance, project, or internship experience is welcomed.',
    shortDescription:
      'Design intuitive user flows, dark-theme wireframes, and component systems in Figma under design mentorship.',
    overview:
      'We are seeking an aspiring UI/UX Design Intern with an eye for clean aesthetics, visual hierarchy, and intuitive user experiences. You will assist in prototyping web and mobile interfaces and building design components.',
    responsibilities: [
      'Create wireframes, user flows, and high-fidelity screen designs in Figma.',
      'Contribute to our design library: icons, buttons, typography tokens, and layout guidelines.',
      'Collaborate with frontend engineers to review visual fidelity and responsive adjustments.',
      'Participate in design critiques and incorporate feedback into iterative prototypes.',
    ],
    requirements: [
      'Working familiarity with Figma (auto-layout, components, basic prototyping).',
      'Understanding of design fundamentals: typography, color harmony, spacing, and layout grids.',
      'Portfolio or design samples demonstrating web, mobile, or conceptual interface work.',
      'Curiosity about user psychology, digital ergonomics, and dark aesthetic design trends.',
    ],
    niceToHave: [
      'Basic understanding of HTML and CSS layout constraints.',
      'Experience preparing assets and design specs for developer handoff.',
    ],
    isPublished: true,
    approvalStatus: 'Approved',
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Nashik / Remote',
    remoteStatus: 'Remote',
    experienceLevel: 'Entry-level to 2 Years',
    eligibility:
      'Open to entry-level candidates with strong project portfolios as well as developers with up to 2 years of relevant professional, internship, or freelance experience.',
    shortDescription:
      'Develop fast, responsive, and accessible web applications using React, Next.js, and modern CSS/TypeScript.',
    overview:
      'We are hiring a Frontend Developer to build polished web interfaces and client experiences. You will turn Figma designs into production-ready React/Next.js code with a strong emphasis on performance and clean code.',
    responsibilities: [
      'Develop modular, reusable UI components using React, Next.js, and TypeScript.',
      'Optimize web pages for performance, Core Web Vitals, and smooth interactive animations.',
      'Integrate backend REST/GraphQL APIs and manage frontend application state reliably.',
      'Ensure cross-browser compatibility and adherence to accessibility (WCAG) guidelines.',
    ],
    requirements: [
      'Entry-level to 2 years of relevant experience in web and frontend development.',
      'Solid command of JavaScript/TypeScript, React, HTML5, and modern CSS.',
      'Understanding of responsive design, CSS layout (Flexbox/Grid), and state management.',
      'Experience using Git in collaborative software workflows.',
    ],
    niceToHave: [
      'Experience with Next.js App Router and server-side rendering concepts.',
      'Knowledge of web performance audits (Lighthouse, Core Web Vitals).',
    ],
    isPublished: true,
    approvalStatus: 'Approved',
  },
  {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Nashik / Remote',
    remoteStatus: 'Remote',
    experienceLevel: '0–3 Years',
    eligibility:
      'Open to candidates ranging from 0 years of experience (demonstrated project builders/graduates) to 3 years of relevant professional development experience.',
    shortDescription:
      'Build end-to-end features across Next.js frontends, Node.js/Python API routes, and database models.',
    overview:
      'We are looking for an adaptable Full-Stack Developer to work across both client and server tiers. You will develop interactive user interfaces, design backend API endpoints, and handle database interactions.',
    responsibilities: [
      'Build and maintain full-stack web applications using TypeScript, Next.js/React, and Node.js.',
      'Design, implement, and document secure RESTful API endpoints and data schemas.',
      'Integrate databases (PostgreSQL, MongoDB, or SQLite) and optimize queries.',
      'Write clean, testable code and assist with deployment and monitoring workflows.',
    ],
    requirements: [
      '0–3 years of relevant software development experience (internships, projects, or professional roles).',
      'Strong grasp of JavaScript or TypeScript across both frontend and backend environments.',
      'Familiarity with modern React, API design principles, and database fundamentals.',
      'Good understanding of web security fundamentals (validation, authentication, sanitization).',
    ],
    niceToHave: [
      'Experience with Python / FastAPI or serverless architectures.',
      'Familiarity with cloud hosting providers and CI/CD pipelines.',
    ],
    isPublished: true,
    approvalStatus: 'Approved',
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Nashik / Remote',
    remoteStatus: 'Remote',
    experienceLevel: 'Entry-level to 3 Years',
    eligibility:
      'Open to entry-level designers with strong design portfolios as well as professionals with up to 3 years of UI/UX, product, or digital agency experience.',
    shortDescription:
      'Create modern dark-theme interfaces, cohesive design systems, and responsive web/mobile prototypes.',
    overview:
      'We are looking for a UI/UX Designer to shape the visual and functional identity of our digital products. You will turn product briefs into wireframes, design systems, and developer-ready prototypes in Figma.',
    responsibilities: [
      'Design user-centric web and mobile interfaces that balance visual polish with usability.',
      'Develop and maintain Figma design systems, component libraries, and style tokens.',
      'Collaborate closely with developers to ensure accurate implementation of typography and layout.',
      'Create high-fidelity interactive prototypes to communicate animations and flows.',
    ],
    requirements: [
      'Entry-level to 3 years of relevant experience in UI/UX or product design.',
      'Proficiency in Figma (auto-layout, components, variants, responsive constraints).',
      'Strong portfolio demonstrating typography, grid systems, dark mode aesthetics, and web flows.',
      'Ability to explain design decisions clearly and iterate based on feedback.',
    ],
    niceToHave: [
      'Understanding of frontend implementation (HTML/CSS constraints).',
      'Experience designing SaaS dashboards or agency client deliverables.',
    ],
    isPublished: true,
    approvalStatus: 'Approved',
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    department: 'AI & ML',
    type: 'Full-time',
    location: 'Nashik / Remote',
    remoteStatus: 'Hybrid (Nashik / Remote)',
    experienceLevel: 'Entry-level to 3 Years',
    eligibility:
      'Entry-level to 3 years of relevant experience; open to candidates with practical machine learning or LLM project experience. Subject to actual project requirements.',
    shortDescription:
      'Implement AI/ML workflows, prompt evaluation, retrieval pipelines, and model integrations based on project scope.',
    overview:
      'Proposed role focused on implementing AI solutions, LLM agent integrations, and machine learning components. Position availability and specific scope are subject to actual project requirements and client pipeline confirmation.',
    responsibilities: [
      'Build and integrate AI/ML pipelines and API endpoints using Python (FastAPI/Flask).',
      'Work with retrieval-augmented generation (RAG), vector embeddings, and prompt orchestration.',
      'Collaborate with frontend and full-stack developers to connect model outputs to UI components.',
      'Evaluate model outputs, response latencies, and accuracy across real-world test cases.',
    ],
    requirements: [
      'Entry-level to 3 years of relevant machine learning or data science experience.',
      'Proficiency in Python and familiarity with data manipulation and ML libraries.',
      'Practical understanding of LLM APIs, embedding models, or vector databases.',
      'Solid foundations in code cleanliness, Git, and RESTful API integration.',
    ],
    niceToHave: [
      'Experience with LangChain, LlamaIndex, or agentic frameworks.',
      'Familiarity with fine-tuning or open-source model deployment.',
    ],
    // Position is proposed and subject to actual project requirements; kept unapproved until confirmed
    isPublished: false,
    approvalStatus: 'Proposed (Pending Project Approval)',
    statusNote:
      'Proposed position subject to actual client project requirements. Currently unapproved for active intake.',
  },
];

/**
 * Currently published active openings (approved by AmbiVision).
 */
export const OPEN_POSITIONS: JobPosition[] = ALL_PROPOSED_POSITIONS.filter(
  (job) => job.isPublished,
);

/**
 * Proposed positions that remain unapproved or pending project confirmation.
 */
export const UNAPPROVED_POSITIONS: JobPosition[] = ALL_PROPOSED_POSITIONS.filter(
  (job) => !job.isPublished,
);
