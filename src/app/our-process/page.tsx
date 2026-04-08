/**
 * Greenville, SC — Our Process Page (SSR)
 * URL: /our-process
 * Direct buyer — first-person buyer language throughout.
 */
import type { Metadata } from "next";
import {
  SiteHeader,
  SiteFooter,
  ProcessSteps,
  ComparisonTable,
  CTASection,
  LeadCaptureForm,
} from "@boldstreet/shared-layout";
import { SITE_CONFIG, getNavItems, COMPARISON_ROWS, getSEO, WEBSITE_ID } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const seo = getSEO(config.siteName);
  return {
    title: seo.ourProcess.title,
    description: seo.ourProcess.description,
    alternates: { canonical: seo.ourProcess.canonical },
  };
}

export const dynamic = "force-dynamic";

const PROCESS_STEPS = [
  {
    number: 1,
    title: "Tell Us About Your Property",
    description:
      "Fill out our simple online form or give us a call. It only takes a few minutes, and your information is kept confidential. We will ask a few basic questions about your Greenville property.",
  },
  {
    number: 2,
    title: "We Will Contact You with an Offer",
    description:
      "Our team will review the details and present you with a fair, written, no-obligation cash offer for your house — often within 24 hours.",
  },
  {
    number: 3,
    title: "Close On Your Schedule",
    description:
      "If you accept, we can close in as little as 7 days. We work on your timeline so you can move on with your life. No repairs, no showings, no surprises.",
  },
];

export default async function OurProcessPage() {
  const siteConfig = await getSiteConfig();
  const navItems = getNavItems(siteConfig.siteName);

  return (
    <>
      <SiteHeader config={siteConfig} navItems={navItems} currentPath="/our-process" />
      <main>
        <section className="bg-[#0F172A] text-white py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              How to Sell Your Greenville Home for Cash
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Three simple steps to a fast, fair cash sale. No repairs, no showings, no commissions.
            </p>
          </div>
        </section>

        <ProcessSteps
          headline="Our Simple 3-Step Process"
          subheadline="We have streamlined the process to make selling your home as easy and stress-free as possible."
          steps={PROCESS_STEPS}
          variant="light"
        />

        <section className="bg-[#F1F5F9] py-16 lg:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">
              What to Expect at Each Step
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "Step 1 — Share Your Property Details",
                  body: "You can reach us by filling out the form on this page, calling us, or sending us a message. We will ask a few quick questions about your property — its condition, your timeline, and what you are hoping to get out of the sale. There is no obligation and no pressure.",
                },
                {
                  step: "Step 2 — Receive Your Written Cash Offer",
                  body: "After reviewing your property details, one of our team members will reach out — typically within 24 hours — with a fair, written cash offer. We will walk you through how we arrived at the number and answer any questions you have. You are never pressured to accept.",
                },
                {
                  step: "Step 3 — Close and Get Paid",
                  body: "If you accept our offer, we handle all the paperwork. We can close in as little as 7 days, or we can work around your schedule if you need more time. You choose the closing date. At closing, you receive your payment — no hidden fees, no last-minute surprises.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{item.step}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ComparisonTable
          headline="Cash Offer vs. Traditional Listing"
          subheadline={`See why selling to ${siteConfig.siteName} is often the best choice for Greenville homeowners who need to sell fast.`}
          cashOfferLabel={`${siteConfig.siteName} Cash Offer`}
          traditionalLabel="Traditional Agent Listing"
          rows={COMPARISON_ROWS}
        />

        <section className="bg-[#F1F5F9] py-16 lg:py-24">
          <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600">
                Fill out the form and we will have a cash offer for your Greenville home within 24 hours.
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
          subheadline="Our team is available to walk you through every step of the process."
          ctaText="Contact Us Today"
          ctaHref="/contact-us"
          phone={siteConfig.phone}
        />
      </main>
      <SiteFooter config={siteConfig} navItems={navItems} />
    </>
  );
}
