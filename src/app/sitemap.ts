import { MetadataRoute } from 'next';
import { SITE_CONFIG, getCanonicalUrl } from '@/lib/seo-config';
import { SERVICES_DATA } from '@/data/services-data';
import { CASE_STUDIES_DATA } from '@/data/case-studies-data';
import { BLOG_POSTS_DATA } from '@/data/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0];

  // Core Pages
  const coreRoutes = [
    {
      url: getCanonicalUrl(''),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: getCanonicalUrl('services'),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: getCanonicalUrl('work'),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('about'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('contact'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('careers'),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('blog'),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('privacy-policy'),
      lastModified: '2026-04-01',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: getCanonicalUrl('terms'),
      lastModified: '2026-04-01',
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // 7 Service Landing Pages
  const serviceRoutes = Object.keys(SERVICES_DATA).map((slug) => ({
    url: getCanonicalUrl(`services/${slug}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 4 Canonical Portfolio Case Studies
  const canonicalCaseStudySlugs = [
    'real-time-stock-market',
    'ai-powered-lms',
    'food-delivery-platform',
    'ai-interview-agent',
  ];
  const caseStudyRoutes = canonicalCaseStudySlugs.map((slug) => ({
    url: getCanonicalUrl(`work/${slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3 Deep Blog Articles
  const blogRoutes = Object.values(BLOG_POSTS_DATA).map((post) => ({
    url: getCanonicalUrl(`blog/${post.slug}`),
    lastModified: post.modifiedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...coreRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes];
}
