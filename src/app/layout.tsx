import type { Metadata, Viewport } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: "AmbiVision | Turning Ambition Into Reality",
    template: "%s | AmbiVision",
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: "AmbiVision Engineering Team", url: SITE_CONFIG.domain }],
  generator: "Next.js",
  keywords: SITE_CONFIG.keywords,
  referrer: "origin-when-cross-origin",
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: getCanonicalUrl(""),
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: getCanonicalUrl(""),
    siteName: SITE_CONFIG.name,
    title: "AmbiVision | Turning Ambition Into Reality",
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.domain}/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: "AmbiVision — Turning Ambition Into Reality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmbiVision | Turning Ambition Into Reality",
    description: SITE_CONFIG.description,
    creator: "@ambivisionstudio",
    images: [`${SITE_CONFIG.domain}/images/og-default.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Global Schema.org Structured Data
  const globalSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_CONFIG.domain}/#organization`,
      name: SITE_CONFIG.name,
      legalName: SITE_CONFIG.legalName,
      url: `${SITE_CONFIG.domain}/`,
      logo: `${SITE_CONFIG.domain}/images/round-logo.png`,
      image: `${SITE_CONFIG.domain}/images/round-logo.png`,
      description: SITE_CONFIG.description,
      foundingDate: SITE_CONFIG.foundingDate,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.telephone,
      sameAs: [
        SITE_CONFIG.social.linkedin,
        SITE_CONFIG.social.instagram,
        SITE_CONFIG.social.github,
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.streetAddress,
        addressLocality: SITE_CONFIG.address.addressLocality,
        addressRegion: SITE_CONFIG.address.addressRegion,
        postalCode: SITE_CONFIG.address.postalCode,
        addressCountry: SITE_CONFIG.address.addressCountry,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.telephone,
        contactType: "customer service",
        email: SITE_CONFIG.email,
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.domain}/#website`,
      url: `${SITE_CONFIG.domain}/`,
      name: SITE_CONFIG.name,
      alternateName: ["Ambivision", "ambivision.in"],
      description: SITE_CONFIG.description,
      publisher: {
        "@id": `${SITE_CONFIG.domain}/#organization`,
      },
      inLanguage: "en",
    },
  ];

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/ClashDisplayBold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <JsonLd data={globalSchema} />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
