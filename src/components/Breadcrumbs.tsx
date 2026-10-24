import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/seo-config';
import JsonLd from './JsonLd';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items,
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => {
      const fullUrl = item.url === '/' 
        ? `${SITE_CONFIG.domain}/`
        : `${SITE_CONFIG.domain}${item.url.startsWith('/') ? item.url : `/${item.url}`}/`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <React.Fragment key={item.url}>
              {index > 0 && <span className="breadcrumbs-sep" aria-hidden="true">/</span>}
              {isLast ? (
                <span className="breadcrumbs-current" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url}>
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
