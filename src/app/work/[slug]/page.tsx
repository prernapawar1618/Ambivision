import React from "react";
import ProjectClientView from "./ProjectClientView";
import { CASE_STUDIES_DATA } from "@/data/case-studies-data";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";
import JsonLd from "@/components/JsonLd";

const SLUGS = [
  "real-time-stock-market",
  "ai-powered-lms",
  "food-delivery-platform",
  "ai-interview-agent",
  "stock-market-dashboard",
  "ai-learning-management-system",
];

// Required for Next.js static generation
export function generateStaticParams() {
  return SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES_DATA[slug];

  if (!caseStudy) {
    return buildMetadata({
      title: "Featured Case Study",
      description: "Technical case study of AmbiVision digital product engineering.",
      path: `work/${slug}`,
    });
  }

  return buildMetadata({
    title: caseStudy.metaTitle,
    description: caseStudy.metaDescription,
    path: `work/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "real-time-stock-market";
  const caseStudy = CASE_STUDIES_DATA[slug];

  const schema = caseStudy
    ? [
        {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: caseStudy.title,
          description: caseStudy.metaDescription,
          url: `${SITE_CONFIG.domain}/work/${slug}/`,
          author: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.domain,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
            logo: `${SITE_CONFIG.domain}/images/logo.png`,
          },
          about: caseStudy.category,
        },
      ]
    : undefined;

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <ProjectClientView slug={slug} />
    </>
  );
}
