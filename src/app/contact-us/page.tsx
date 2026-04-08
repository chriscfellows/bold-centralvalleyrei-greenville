/**
 * Greenville — Contact Us Page (SSR)
 * Copy direction: kerncountyhomebuyers.com/contact-us + market-customized for Greenville
 */
import type { Metadata } from "next";
import {
  SiteHeader,
  SiteFooter,
  LeadCaptureForm,
  CTASection,
} from "@boldstreet/shared-layout";
import { SITE_CONFIG, getNavItems, SEO, WEBSITE_ID } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export const metadata: Metadata = {
  title: SEO.contactUs.title,
  description: SEO.contactUs.description,
  alternates: { canonical: SEO.contactUs.canonical },
};

export const dynamic = "force-dynamic";

const CONTACT_REASONS = [
  "You want a no-obligation cash offer on your Greenville home",
  "You have questions about our process or timeline",
  "You are not sure if selling for cash is the right move",
  "You are facing foreclosure and need to act quickly",
  "You inherited a property and do not know where to start",
  "You just want to talk to a real person — no pressure",
];

export default async function ContactUsPage() {
  const siteConfig = await getSiteConfig();
  const navItems = getNavItems(siteConfig.siteName);

  return (
    <>
      <SiteHeader config={siteConfig} navItems={navItems} currentPath="/contact-us" />
      <main>
        <section className="bg-[#0F172A] text-white py-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              We are real people — team members who are ready to help. Reach out any time.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-4">
                    We Would Love to Hear From You
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Whether you are ready to get a cash offer or just have a few questions, we are here to help. There is no obligation, no pressure, and no sales pitch — just a straightforward conversation about your situation.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We respond to every inquiry within 24 hours, and in most cases we will get back to you the same day.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-4">Reach out if...</h3>
                  <ul className="space-y-3">
                    {CONTACT_REASONS.map((reason, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-[#E8521A] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#F1F5F9] rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#0F172A]">Prefer to Talk?</h3>
                  <a href={"tel:" + siteConfig.phone.replace(/\D/g, "")} className="flex items-center gap-3 text-[#0F172A] hover:text-[#E8521A] transition-colors font-semibold text-lg">
                    <svg className="h-6 w-6 text-[#E8521A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                    </svg>
                    {siteConfig.phone}
                  </a>
                  <p className="text-sm text-gray-500">
                    Available Monday through Saturday, 8am to 7pm EST.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3">Areas We Serve</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We buy homes throughout the greater Greenville area, including Greenville, Spartanburg, Anderson, Simpsonville, Mauldin, Greer, Taylors, Duncan, and surrounding Upstate South Carolina communities.
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Get Your Free Cash Offer</h2>
                  <p className="text-gray-600">
                    Fill out the form below and we will reach out within 24 hours with your no-obligation offer.
                  </p>
                </div>
                <LeadCaptureForm websiteId={WEBSITE_ID()} metroArea={SITE_CONFIG.metroArea} ctaText="Send My Request" />
              </div>
            </div>
          </div>
        </section>

        <CTASection
          headline="Not Ready to Fill Out a Form?"
          subheadline="That is completely fine. Give us a call and we will have a no-pressure conversation about your options."
          ctaText="Call Us Now"
          ctaHref={"tel:" + siteConfig.phone.replace(/\D/g, "")}
          phone={siteConfig.phone}
        />
      </main>
      <SiteFooter config={siteConfig} navItems={navItems} />
    </>
  );
}
