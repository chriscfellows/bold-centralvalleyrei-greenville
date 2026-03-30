/**
 * Greenville Thank You Page
 * Fires Google Ads conversion event on load.
 * Spec ref: Must Do #4 (conversion fires on /thank-you only)
 */

import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@boldstreet/shared-layout";
import { SITE_CONFIG, NAV_ITEMS } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { ThankYouClient } from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You — We Received Your Request | Central Valley REI Greenville",
  description: "Thank you for contacting Central Valley REI Greenville Cash Buyers. We will be in touch within 24 hours with your cash offer.",
  robots: { index: false, follow: false }, // No-index thank you page
};

export const dynamic = "force-dynamic";

export default async function ThankYouPage() {
  const config = await getSiteConfig();
  return (
    <>
      <SiteHeader config={config} navItems={NAV_ITEMS} currentPath="/thank-you" />
      <main className="min-h-[60vh] flex items-center justify-center py-20">
        <ThankYouClient
          phone={config.phone}
          conversionId={config.googleAdsConversionId}
          conversionLabel={config.googleAdsConversionLabel}
        />
      </main>
      <SiteFooter config={config} navItems={NAV_ITEMS} />
    </>
  );
}
