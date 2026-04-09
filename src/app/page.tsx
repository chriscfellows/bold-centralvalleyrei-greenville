/**
 * Greenville, SC Home Page — Server Component (SSR).
 * Direct buyer — first-person buyer language throughout.
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
  WEBSITE_ID,
  getNavItems,
  getAboutContent,
  getSEO,
  PROCESS_STEPS,
  SITUATIONS,
  COMPARISON_ROWS,
} from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const seo = getSEO(config.siteName);
  return {
    title: seo.home.title,
    description: seo.home.description,
    alternates: { canonical: seo.home.canonical },
    openGraph: {
      title: seo.home.title,
      description: seo.home.description,
      url: seo.home.canonical,
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    },
  };
}

export const dynamic = "force-dynamic";

const HEADLINE_PARTS = [
  { text: "Sell Your Greenville Home Fast for a " },
  { text: "Fair Cash Offer", highlight: true },
];
const SUBHEADLINE =
  "We buy homes for cash in any condition across Greenville, Spartanburg, and Upstate South Carolina. No fees, no commissions, and no repairs needed. Get a no-obligation cash offer today!";
const TRUST_POINTS = ["No Repairs", "No Fees", "Close in 7 Days"];

export default async function HomePage() {
  const [dbTestimonials, siteConfig] = await Promise.all([
    getTestimonials(WEBSITE_ID()),
    getSiteConfig(),
  ]);
  const siteName = siteConfig.siteName;
  const navItems = getNavItems(siteName);
  const aboutContent = getAboutContent(siteName);

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
        `I needed to sell my house fast after losing my job and ${siteName} made it so easy. They made a fair cash offer and we closed in just over a week. I couldn't believe how stress-free the whole process was.`,
    },
    {
      id: 2,
      name: "Robert T.",
      location: "Spartanburg, SC",
      quote:
        `My house needed major repairs I couldn't afford. I was worried I'd never be able to sell it. ${siteName} bought my home as-is. I didn't have to fix a single thing. Professional and honest from start to finish.`,
    },
    {
      id: 3,
      name: "Patricia H.",
      location: "Greenville, SC",
      quote:
        `After inheriting my father's home in Greenville, I was completely overwhelmed. I didn't have the time or energy to list it. ${siteName} gave me a fair cash offer and handled everything. It was an enormous relief.`,
    },
  ];

  const testimonials: TestimonialItem[] =
    dbTestimonials.length > 0 ? dbTestimonials : FALLBACK_TESTIMONIALS;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `${siteName} ${siteConfig.metroArea} Cash Home Buyers`,
    description: getSEO(siteName).home.description,
    url: `https://${siteConfig.domain}`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader config={siteConfig} navItems={navItems} currentPath="/" />

      <main id="main-content">
        <HeroSection
          config={siteConfig}
          websiteId={WEBSITE_ID()}
          headlineParts={HEADLINE_PARTS}
          subheadline={SUBHEADLINE}
          trustPoints={TRUST_POINTS}
        />

        <TrustBar />

        <ProcessSteps
          headline="Sell Your Greenville House in 3 Simple Steps"
          steps={PROCESS_STEPS}
          variant="light"
        />

        <SituationsGrid
          headline="We Help Greenville Homeowners in Any Situation"
          intro="Are you looking to sell your house fast in Greenville, Spartanburg, or Upstate South Carolina? We understand that selling a home can be stressful, especially when you are facing difficult circumstances. We buy homes for cash regardless of the situation."
          situations={SITUATIONS}
          variant="grid"
          columns={4}
          imageUrl="/images/greenville-home-situations.jpg"
        />

        <ComparisonTable
          headline="Sell to a Cash Buyer in the Network vs. List on the Market"
          cashOfferLabel="Sell to a Cash Buyer in the Network"
          traditionalLabel="List on the Market"
          rows={COMPARISON_ROWS}
          closingText="It all depends on your situation, your goals, and what matters most to you. We're here to help you compare your options and choose the path that works best for you."
        />

        <AboutSection
          headline={aboutContent.headline}
          body={aboutContent.body}
          stats={aboutContent.stats}
          variant="image-right"
          imageUrl="/images/greenville-home-about.jpg"
          imageAlt="Greenville SC neighborhood home"
          badgeLabel={siteName}
          companyType={siteConfig.companyType}
        />

        <TestimonialsGrid
          headline="What Our Greenville Clients Are Saying"
          testimonials={testimonials}
          variant="grid"
          columns={3}
        />

        <CTASection
          headline="Ready to Sell Your Greenville Home Fast?"
          subheadline="Every homeowner's situation is different. Some want speed, simplicity, and certainty. Others are willing to go through the full sales process in hopes of getting top market value. We help you compare both options so you can choose what works best for you."
          ctaText="Get My Free Cash Offer"
          ctaHref="/contact-us"
          phone={siteConfig.phone}
        />
      </main>

      <SiteFooter config={siteConfig} navItems={navItems} />
    </>
  );
}
