/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article' | 'product';
  schemaType?: 'WebApplication' | 'Product' | 'WebPage';
}

const DEFAULT_TITLE = 'ConnectStream | Cross-Platform Creator Automation Engine';
const DEFAULT_DESC =
  'Automate cross-platform dispatch across Instagram Reels and YouTube Shorts. Live telemetry, 4K HDR transcoding, and multi-channel scheduling in one terminal.';

export function updateSeoMetadata(config: Partial<SeoConfig> = {}) {
  const title = config.title ? `${config.title} | ConnectStream` : DEFAULT_TITLE;
  const description = config.description || DEFAULT_DESC;
  const canonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}${window.location.search}`
    : 'https://connectstream.studio';

  // 1. Update Title
  document.title = title;

  // 2. Helper to set or create meta tags
  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard SEO
  setMeta('name', 'description', description);

  // OpenGraph
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', config.type || 'website');
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:site_name', 'ConnectStream Creator Studio');

  // Twitter
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);

  // Canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonicalUrl);

  // JSON-LD Structured Data
  let ldJsonScript = document.getElementById('connectstream-jsonld') as HTMLScriptElement | null;
  if (!ldJsonScript) {
    ldJsonScript = document.createElement('script');
    ldJsonScript.id = 'connectstream-jsonld';
    ldJsonScript.type = 'application/ld+json';
    document.head.appendChild(ldJsonScript);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ConnectStream',
    url: canonicalUrl,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    description: description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '14-Day Free Trial available with Starter and Pro tiers'
    },
    creator: {
      '@type': 'Organization',
      name: 'ConnectStream Creator Technologies Inc.',
      url: 'https://connectstream.studio'
    }
  };

  ldJsonScript.textContent = JSON.stringify(structuredData);
}
