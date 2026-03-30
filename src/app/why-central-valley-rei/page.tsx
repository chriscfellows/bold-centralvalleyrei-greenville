/**
 * Greenville, SC — Why Central Valley REI Page (SSR)
 * URL: /why-central-valley-rei
 */
import type { Metadata } from "next";
import {
  SiteHeader,
  SiteFooter,
  ComparisonTable,
  AboutSection,
  CTASection,
  LeadCaptureForm,
} from "@boldstreet/shared-layout";
import { SITE_CONFIG, NAV_ITEMS, COMPARISON_ROWS, SEO, WEBSITE_ID } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export const metadata: Metadata = {
  title: SEO.whyCentralValleyRei.title,
  description: SEO.whyCentralValleyRei.description,
  alternates: { canonical: SEO.whyCentralValleyRei.canonical },
};

export const dynamic = "force-dynamic";

const ABOUT_BODY = [
  "We are not just another cash home buying company. Central Valley REI is a local, experienced real estate investment company that buys homes directly from homeowners across Greenville, Spartanburg, and Upstate South Carolina.",
  "This means we have a deep understanding of the Greenville real estate market and are held to the highest ethical standards. Our goal is to provide you with a fair and transparent cash offer on your house.",
  "We are committed to helping you find the best solution for your unique situation, whether that is a fast cash sale or exploring other options.",
];

const DIFFERENTIATORS = [
  {
    title: "We Are the Direct Buyer",
    body: "Unlike most cash home buying investors, we are experienced real estate investors. That means we are held to the highest ethical and legal standards in South Carolina — and you can verify our licenses with the state.",
  },
  {
    title: "We Know the Greenville Market",
    body: "We live and work in Greenville. We know the neighborhoods, the comps, and the local market dynamics — from the Westside to the Valley to Ventura County. You get a fair offer based on real local data.",
  },
  {
    title: "No Fees, No Commissions, No Surprises",
    body: "When we buy your home, you pay zero agent commissions, zero closing costs, and zero hidden fees. The offer amount is what you receive at closing. Period.",
  },
  {
    title: "You Choose the Closing Date",
    body: "Need to close in 7 days? We can do that. Need 60 days to find your next home? That works too. We work around your schedule — not ours.",
  },
  {
    title: "No Repairs or Cleaning Required",
    body: "We buy homes in any condition — fire damage, foundation issues, outdated kitchens, you name it. You do not need to fix a thing before closing.",
  },
  {
    title: "A Guaranteed Sale",
    body: "Traditional listings fall through all the time. With us, once you accept our offer, the sale is guaranteed. No contingencies, no surprises.",
  },
];

export default async function WhyCentralValleyREIPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <SiteHeader config={siteConfig} navItems={NAV_ITEMS} currentPath="/why-central-valley-rei" />
      <main>
        <section className="bg-[#0F172A] text-white py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Why Choose Central Valley REI to Sell Your Greenville Home?
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Licensed agents. Local experts. Fair cash offers. Zero fees. Here is what makes us different.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">
              The Central Valley REI Advantage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DIFFERENTIATORS.map((item, i) => (
                <div key={i} className="bg-[#F1F5F9] rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-start gap-3 mb-4">
                    <svg className="h-6 w-6 text-[#E8521A] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ComparisonTable
          headline="Central Valley REI vs. Traditional Listing"
          subheadline="A side-by-side look at what you can expect from each path."
          cashOfferLabel="Central Valley REI Cash Offer"
          traditionalLabel="Traditional Agent Listing"
          rows={COMPARISON_ROWS}
        />

        <AboutSection
          headline="Your Trusted Local Cash Home Buyer in Greenville, SC"
          body={ABOUT_BODY}
          imageUrl="/images/greenville-home-about.jpg"
          imageAlt="Greenville SC home sold by Central Valley REI cash buyers"
          variant="image-left"
          badgeLabel={siteConfig.siteName}
        />

        <section className="bg-[#F1F5F9] py-16 lg:py-24">
          <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">
                Ready to Get Your Cash Offer?
              </h2>
              <p className="text-gray-600">
                Fill out the form below and a licensed Greenville agent will reach out within 24 hours with your no-obligation cash offer.
              </p>
            </div>
            <LeadCaptureForm
              websiteId={WEBSITE_ID()}
              metroArea={SITE_CONFIG.metroArea}
              ctaText="Get My Free Cash Offer"
            />
          </div>
        </section>

        <CTASection
          headline="Have Questions? We are Happy to Help."
          subheadline="Our team is available to answer any questions you have about the process."
          ctaText="Contact Us Today"
          ctaHref="/contact-us"
          phone={siteConfig.phone}
        />
      </main>
      <SiteFooter config={siteConfig} navItems={NAV_ITEMS} />
    </>
  );
}
