/**
 * Shared type definitions for Bold Street lead gen site components.
 * All content is passed via props — no hardcoded location copy in components.
 */

export interface SiteConfig {
  siteName: string;
  metroArea: string;
  serviceArea: string;
  location: string;
  phone: string;
  domain: string;
  gtmContainerId?: string;
  googleAdsConversionId?: string;
  googleAdsConversionLabel?: string;
  ga4MeasurementId?: string;
  metaPixelId?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface Situation {
  title: string;
  icon?: string; // Lucide icon name or emoji (optional)
}

export interface ComparisonRow {
  feature: string;
  cashOffer: string;
  traditional: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  quote: string;
}
