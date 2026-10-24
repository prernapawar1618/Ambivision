import React from "react";
import JsonLd from "@/components/JsonLd";
import AboutClientView from "@/components/AboutClientView";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";

export const metadata = buildMetadata({
  title: "About AmbiVision — Studio Mission, Principles & Leadership",
  description:
    "Learn about AmbiVision's engineering philosophy, mission, and leadership. We partner with ambitious enterprises and startups to build high-performance web platforms and autonomous AI systems.",
  path: "about",
});

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AmbiVision",
    description: "Learn about AmbiVision's engineering standards, mission, and leadership.",
    url: `${SITE_CONFIG.domain}/about/`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      legalName: SITE_CONFIG.legalName,
      url: SITE_CONFIG.domain,
      foundingDate: SITE_CONFIG.foundingDate,
    },
  };

  return (
    <>
      <JsonLd data={aboutSchema} />
      <AboutClientView />
    </>
  );
}
