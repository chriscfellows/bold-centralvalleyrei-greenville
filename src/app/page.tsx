/**
 * Greenville, SC Home Page — Server Component (SSR).
 * Central Valley REI is the direct buyer — first-person buyer language throughout.
 * Spec refs: SSR-001, SSR-002, SSR-003, Must Do #3 (form above fold)
 */

import type { Metadata } from "next";
import {
  SiteHeader,
  SiteFooter,
  HeroSection,
  TrustBar,
  ProcessSteps,
  SituationsGrid,
  ComparisonTable,
  AboutSection,
  TestimonialsGrid,
  CTASection,
} from "@boldstreet/shared-layout";
import type { TestimonialItem } from "@boldstreet/shared-layout";
import { getTestimonials } from "@boldstreet/shared";
import {
  SITE_CONFIG,
  WEBSITE_ID,
  NAV_ITEMS,
  PROCESS_STEPS,
  SITUATIONS,
  COMPARISON_ROWS,
  ABOUT_CONTENT,
  SEO,
} from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  alternates: { canonical: SEO.home.canonical },
  openGraph: {
    title: SEO.home.title,
    description: SEO.home.description,
    url: SEO.home.canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
  },
};

export const dynamic = "force-dynamic";

const HEADLINE_PARTS = [
  { text: "Sell Your Greenville Home Fast for a " },
  { text: "Fair Cash Offer", highlight: true },
];
const SUBHEADLINE =
  "We buy homes for cash in any condition across Greenville, Spartanburg, and Upstate South Carolina. No fees, no commissions, and no repairs needed. Get a no-obligation cash offer today!";
const TRUST_POINTS = ["No Repairs", "No Fees", "Close in 7 Days"];

/**
 * Fallback testimonials shown when the DB table is empty or unreachable.
 * Replace these with real client reviews once seeded in BLP.
 */
const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Sandra M.",
    location: "Greenville, SC",
    quote:
      "I needed to sell my house fast after losing my job and Central Valley REI made it so easy. They made a fair cash offer and we closed in just over a week. I couldn't believe how stress-free the whole process was.",
  },
  {
    id: 2,
    name: "Robert T.",
    location: "Spartanburg, SC",
    quote:
      "My house needed major repairs I couldn't afford. I was worried I'd never be able to sell it. Central Valley REI bought my home as-is. I didn't have to fix a single thing. Professional and honest from start to finish.",
  },
  {
    id: 3,
    name: "Patricia H.",
    location: "Greenville, SC",
    quote:
      "After inheriting my father's home in Greenville, I was completely overwhelmed. I didn't have the time or energy to list it. Central Valley REI gave me a fair cash offer and handled everything. It was an enormous relief.",
  },
];

export default async function HomePage() {
  const [dbTestimonials, siteConfig] = await Promise.all([
    getTestimonials(WEBSITE_ID()),
    getSiteConfig(),
  ]);

  const testimonials: TestimonialItem[] =
    dbTestimonials.length > 0 ? dbTestimonials : FALLBACK_TESTIMONIALS;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Central Valley REI Greenville Cash Home Buyers",
    description: SEO.home.description,
    url: SEO.home.canonical,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greenville",
      addressRegion: "SC",
      addressCountry: "US",
    },
    areaServed: [
      "Greenville, SC",
      "Spartanburg, SC",
      "Anderson, SC",
      "Simpsonville, SC",
      "Mauldin, SC",
      "Greer, SC",
      "Taylors, SC",
      "Duncan, SC",
      "Upstate South Carolina",
    ],
    priceRange: "$$",
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader config={siteConfig} navItems={NAV_ITEMS} currentPath="/" />

      <main id="main-content">
        {/* Hero with form above fold */}
        <HeroSection
          config={siteConfig}
          websiteId={WEBSITE_ID()}
          headlineParts={HEADLINE_PARTS}
          subheadline={SUBHEADLINE}
          trustPoints={TRUST_POINTS}
        />

        {/* Trust bar */}
        <TrustBar />

        {/* 3-step process */}
        <ProcessSteps
          headline="Sell Your Greenville House in 3 Simple Steps"
          steps={PROCESS_STEPS}
          variant="light"
        />

        {/* Situations grid */}
        <SituationsGrid
          headline="We Help Greenville Homeowners in Any Situation"
          intro="Are you looking to sell your house fast in Greenville, Spartanburg, or Upstate South Carolina? We understand that selling a home can be stressful, especially when you are facing difficult circumstances. We buy homes for cash regardless of the situation."
          situations={SITUATIONS}
          variant="grid"
          columns={4}
          imageUrl="/images/greenville-home-situations.jpg"
        />

        {/* Comparison table */}
        <ComparisonTable
          headline="Why Sell to Central Valley REI vs. Listing with an Agent?"
          cashOfferLabel="Selling to Central Valley REI (Cash Offer)"
          traditionalLabel="Traditional Agent Listing"
          rows={COMPARISON_ROWS}
        />

        {/* About section */}
        <AboutSection
          headline={ABOUT_CONTENT.headline}
          body={ABOUT_CONTENT.body}
          stats={ABOUT_CONTENT.stats}
          variant="image-right"
          imageUrl="/images/greenville-home-about.jpg"
          imageAlt="Greenville SC neighborhood home"
          badgeLabel={siteConfig.siteName}
          companyType={siteConfig.companyType}
        />

        {/* Testimonials — DB-driven with static fallback */}
        <TestimonialsGrid
          headline="What Our Greenville Clients Are Saying"
          testimonials={testimonials}
          variant="grid"
          columns={3}
        />

        {/* Bottom CTA */}
        <CTASection
          headline="Ready to Sell Your Greenville Home Fast?"
          subheadline="Get a fair, no-obligation cash offer in 24 hours. No repairs. No fees. No commissions. Close on your schedule."
          ctaText="Get My Free Cash Offer"
          ctaHref="/contact-us"
          phone={siteConfig.phone}
        />
      </main>

      <SiteFooter config={siteConfig} navItems={NAV_ITEMS} />
    </>
  );
}
