import React from "react";
import JsonLd from "@/components/JsonLd";
import ServicesClientView from "@/components/ServicesClientView";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo-config";
import { SERVICES_DATA } from "@/data/services-data";

export const metadata = buildMetadata({
  title: "Digital Engineering & AI Product Services Directory",
  description:
    "Explore AmbiVision’s comprehensive engineering disciplines: Next.js Web Development, UI/UX Design, React Native Mobile Apps, Custom AI Agents, Enterprise Software, E-commerce, and Technical SEO & GEO.",
  path: "services",
});

export default function ServicesPage() {
  const serviceList = Object.values(SERVICES_DATA);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AmbiVision Digital Product & AI Engineering Services",
    description:
      "Comprehensive directory of engineering and design disciplines offered by AmbiVision.",
    url: `${SITE_CONFIG.domain}/services/`,
    hasPart: serviceList.map((svc) => ({
      "@type": "Service",
      name: svc.title,
      description: svc.directAnswer,
      url: `${SITE_CONFIG.domain}/services/${svc.slug}/`,
      provider: {
        "@id": `${SITE_CONFIG.domain}/#organization`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={servicesSchema} />
      <ServicesClientView />
    </>
  );
}
