/**
 * Greenville, SC site configuration.
 * Direct buyer — first-person buyer language is correct here.
 * All location-specific content is defined here — components are generic.
 * Spec ref: Must Not #1 (no hardcoded location copy in components)
 *
 * IMPORTANT: Company name MUST come from the database (clients.name) via
 * getSiteConfig().siteName. The siteName below is only a static fallback.
 */

import type { SiteConfig, NavItem, ProcessStep, Situation, ComparisonRow } from "@boldstreet/shared-layout";

export const SITE_CONFIG: SiteConfig = {
  siteName: "Central Valley REI",
  metroArea: "Greenville",
  serviceArea: "Greenville, Spartanburg & Upstate SC",
  location: "Greenville, SC",
  phone: "864-000-0000",
  domain: process.env.NEXT_PUBLIC_DOMAIN || "sellgreenvillehomefast.com",
  gtmContainerId: "",
  googleAdsConversionId: "",

  companyType: "cash_buyer",
};

export function WEBSITE_ID(): number {
  return parseInt(process.env.WEBSITE_ID || "5");
}

/**
 * Derives the "why" page slug from client.name.
 * e.g., "Central Valley REI" → "/why-central-valley-rei"
 */
export function getWhySlug(siteName: string): string {
  return "/why-" + siteName.toLowerCase().replace(/\s+/g, "-");
}

export function getNavItems(siteName: string): NavItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "Our Process", href: "/our-process" },
    { label: `Why ${siteName}`, href: getWhySlug(siteName) },
    { label: "Contact", href: "/contact-us" },
    { label: "Blog", href: "/blog" },
  ];
}

/** @deprecated Use getNavItems(siteName) instead. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Process", href: "/our-process" },
  { label: "Why Central Valley REI", href: "/why-central-valley-rei" },
  { label: "Contact", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Tell Us About Your Property",
    description:
      "Fill out our simple online form or give us a call. It only takes a few minutes, and your information is kept completely confidential.",
  },
  {
    number: 2,
    title: "We'll Contact You with an Offer",
    description:
      "We'll review the details and present you with a fair, written, no-obligation cash offer for your Greenville home — often within 24 hours.",
  },
  {
    number: 3,
    title: "Close On Your Schedule",
    description:
      "If you accept, we can close in as little as 7 days. We work on your timeline so you can move forward with your life.",
  },
];

export const SITUATIONS: Situation[] = [
  { title: "Avoiding Foreclosure", icon: "🏚️" },
  { title: "Inherited Property", icon: "🏠" },
  { title: "Divorce", icon: "📋" },
  { title: "Relocating Fast", icon: "🚚" },
  { title: "Tired Landlord", icon: "🔑" },
  { title: "Needs Major Repairs", icon: "🔨" },
  { title: "Behind on Payments", icon: "💰" },
  { title: "Downsizing", icon: "📦" },
  { title: "Probate", icon: "⚖️" },
  { title: "Vacant Property", icon: "🏗️" },
  { title: "Job Loss", icon: "💼" },
  { title: "Medical Bills", icon: "🏥" },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Best For", cashOffer: "Homeowners who want a faster, simpler sale", traditional: "Homeowners who want to test the market for the highest possible price" },
  { feature: "Closing Time", cashOffer: "As little as 7 days", traditional: "Typically 30 to 90+ days" },
  { feature: "Commissions / Fees", cashOffer: "No agent commissions. Terms depend on the buyer and transaction structure.", traditional: "Agent commissions plus typical closing costs" },
  { feature: "Repairs Required", cashOffer: "Often sold as-is", traditional: "Repairs, cleaning, and prep are often needed" },
  { feature: "Appraisal / Financing", cashOffer: "May avoid appraisal and lender delays when working with cash buyers", traditional: "Often depends on buyer financing and appraisal" },
  { feature: "Showings", cashOffer: "Usually minimal property access", traditional: "Multiple showings and open houses are common" },
  { feature: "Certainty", cashOffer: "More speed and convenience, depending on the buyer", traditional: "Potential for higher market value, but with more time and uncertainty" },
];

export function getHeroContent(siteName: string) {
  return {
    headline: "Sell Your Greenville Home Fast — Get a Fair Cash Offer in 24 Hours",
    subheadline:
      `${siteName} buys houses for cash in any condition across Greenville, Spartanburg, and Upstate South Carolina. No repairs, no fees, no commissions. Close in as little as 7 days.`,
    trustPoints: [
      "No Repairs Required",
      "No Commissions or Fees",
      "Close in 7 Days",
      "Direct Cash Buyer",
      "100% No-Obligation Offer",
    ],
  };
}

export function getAboutContent(siteName: string) {
  return {
    headline: "Your Trusted Local Cash Home Buyer in Greenville, SC",
    body: [
      `We are not just another cash home buying company. ${siteName} is a local, experienced real estate investment company that has been buying homes directly from homeowners across Greenville, Spartanburg, and Upstate South Carolina.`,
      "We have a deep understanding of the Greenville real estate market and are committed to making you a fair offer based on real local data. We buy your home directly — no middlemen, no agents, no commissions.",
      "Our goal is to provide you with a fair and transparent cash offer on your house. No pressure, no obligation — just a straightforward conversation about your situation and a fast, guaranteed close.",
    ],
    stats: [
      { value: "7 Days", label: "Average Close Time" },
      { value: "100%", label: "No-Obligation Offers" },
      { value: "$0", label: "Fees or Commissions" },
      { value: "Direct", label: "Cash Buyer" },
    ],
  };
}

export function getSEO(siteName: string) {
  return {
    home: {
      title: `Sell My House Fast Greenville SC | Cash Offer in 24 Hours | ${siteName}`,
      description:
        `Get a fair cash offer for your Greenville SC home in 24 hours. ${siteName} buys houses as-is — no repairs, no fees, no commissions. Serving Greenville, Spartanburg & Upstate SC. Call 864-000-0000.`,
      canonical: "https://sellgreenvillehomefast.com",
    },
    howItWorks: {
      title: `How It Works | Sell Your Greenville SC House Fast | ${siteName}`,
      description:
        "Learn how to sell your Greenville SC home for cash in 3 simple steps. No repairs, no fees, no commissions. Get your offer in 24 hours and close in 7 days.",
      canonical: "https://sellgreenvillehomefast.com/how-it-works",
    },
    blog: {
      title: `Greenville SC Real Estate Blog | ${siteName} Cash Buyers`,
      description:
        "Expert advice on selling your Greenville SC home fast. Tips on avoiding foreclosure, handling inherited properties, and getting the best cash offer in Greenville, Spartanburg, and Upstate South Carolina.",
      canonical: "https://sellgreenvillehomefast.com/blog",
    },
    ourProcess: {
      title: `Our Process | How to Sell Your Greenville SC House for Cash | ${siteName}`,
      description:
        "Learn how to sell your Greenville SC home for cash in 3 simple steps. No repairs, no fees, no commissions. Get your offer in 24 hours and close in 7 days.",
      canonical: "https://sellgreenvillehomefast.com/our-process",
    },
    whyCompany: {
      title: `Why ${siteName} | Direct Cash Home Buyers in Greenville SC`,
      description:
        `Discover why Greenville SC homeowners choose ${siteName} over traditional agents and investors. Direct cash buyer, fair offers, zero fees, and a guaranteed closing.`,
      canonical: `https://${SITE_CONFIG.domain}${getWhySlug(siteName)}`,
    },
    contactUs: {
      title: `Contact Us | Get Your Cash Offer | ${siteName} Greenville SC`,
      description:
        `Ready to sell your Greenville SC home fast? Contact ${siteName} today for a free, no-obligation cash offer. We respond within 24 hours. Call 864-000-0000.`,
      canonical: "https://sellgreenvillehomefast.com/contact-us",
    },
  };
}

/** @deprecated Use getSEO(siteName) instead. */
export const SEO = getSEO(SITE_CONFIG.siteName);

/** @deprecated Use getHeroContent(siteName) instead. */
export const HERO_CONTENT = getHeroContent(SITE_CONFIG.siteName);

/** @deprecated Use getAboutContent(siteName) instead. */
export const ABOUT_CONTENT = getAboutContent(SITE_CONFIG.siteName);
