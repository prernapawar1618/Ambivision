/**
 * AmbiVision SEO & Site Configuration
 * Production domain: https://ambivision.in
 * Never uses localhost as the canonical domain.
 */

export const SITE_CONFIG = {
  name: "AmbiVision",
  legalName: "AmbiVision Digital Technologies Private Limited",
  tagline: "Turning Ambition Into Reality",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://ambivision.in",
  email: "prernapawar1618@ambivision.in",
  telephone: "+91 80 4567 8900",
  description:
    "AmbiVision is a premier digital product studio engineering high-performance web platforms, intelligent AI agents, intuitive mobile apps, and scalable custom software for ambitious businesses worldwide.",
  foundingDate: "2024-01-15",
  locale: "en_IE",
  social: {
    linkedin: "https://www.linkedin.com/in/ambivision-technology-b42457446",
    instagram: "https://www.instagram.com/ambivision_technology",
    github: "https://github.com/ambivision-in",
  },
  address: {
    streetAddress: "Nashik",
    addressLocality: "Nashik",
    addressRegion: "Nashik",
    postalCode: "422001",
    addressCountry: "IN",
  },
  services: [
    {
      slug: "web-design-development",
      title: "Web Design & Development",
      shortDesc:
        "High-performance, SEO-optimised Next.js web applications and digital platforms.",
    },
    {
      slug: "ui-ux-design",
      title: "UI/UX & Product Design",
      shortDesc:
        "Research-backed design systems, conversion-driven UX, and pixel-perfect Figma prototypes.",
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      shortDesc:
        "Cross-platform iOS and Android apps engineered with React Native and native performance.",
    },
    {
      slug: "ai-solutions",
      title: "AI Solutions & Intelligent Agents",
      shortDesc:
        "Custom LLM integrations, autonomous agentic workflows, RAG pipelines, and enterprise automation.",
    },
    {
      slug: "custom-software-development",
      title: "Custom Software Development",
      shortDesc:
        "Enterprise-grade microservices, cloud-native architecture, secure APIs, and robust databases.",
    },
    {
      slug: "ecommerce-development",
      title: "E-commerce Development",
      shortDesc:
        "High-converting custom digital storefronts with Next.js Commerce, Shopify headless, and global checkout.",
    },
    {
      slug: "seo-ai-search-optimization",
      title: "Technical SEO & AI Search (GEO / AEO)",
      shortDesc:
        "Core Web Vitals optimisation, structured data architecture, and readiness for Google AI Overviews and ChatGPT Search.",
    },
  ],
  keywords: [
    "web development company in India",
    "website design and development services",
    "custom web application development",
    "UI/UX design services",
    "AI development company",
    "AI agent development services",
    "mobile app development services",
    "e-commerce website development",
    "technical SEO services",
    "AI search optimization services",
    "Generative Engine Optimization GEO",
    "Answer Engine Optimization AEO",
    "Next.js development agency",
    "digital product in Bengaluru India",
  ],
};

export function getCanonicalUrl(path = ""): string {
  const base = SITE_CONFIG.domain.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") return `${base}/`;
  return `${base}${cleanPath.replace(/\/+$/, "")}/`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.png",
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}) {
  const canonical = getCanonicalUrl(path);
  // Strip redundant brand suffixes so Next.js root layout template `%s | AmbiVision` formats titles cleanly
  const cleanTitle = title.replace(/\s*\|\s*AmbiVision.*$/i, "").trim();
  const ogTitle = `${cleanTitle} | AmbiVision`;

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type,
      images: [
        {
          url: image.startsWith("http")
            ? image
            : `${SITE_CONFIG.domain}${image}`,
          width: 1200,
          height: 630,
          alt: `${cleanTitle} — AmbiVision`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      creator: "@ambivisionstudio",
      images: [
        image.startsWith("http") ? image : `${SITE_CONFIG.domain}${image}`,
      ],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
