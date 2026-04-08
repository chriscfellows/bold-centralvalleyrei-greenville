/**
 * Greenville Thank You Page
 * Fires Google Ads conversion event on load.
 * Spec ref: Must Do #4 (conversion fires on /thank-you only)
 */

import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@boldstreet/shared-layout";
import { SITE_CONFIG, getNavItems } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { ThankYouClient } from "./ThankYouClient";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: `Thank You — We Received Your Request | ${config.siteName} ${config.metroArea}`,
    description: `Thank you for contacting ${config.siteName} ${config.metroArea} Cash Buyers. We will be in touch within 24 hours with your cash offer.`,
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default async function ThankYouPage() {
  const config = await getSiteConfig();
  const navItems = getNavItems(config.siteName);
  return (
    <>
      <SiteHeader config={config} navItems={navItems} currentPath="/thank-you" />
      <main className="min-h-[60vh] flex items-center justify-center py-20">
        <ThankYouClient
          phone={config.phone}
          conversionId={config.googleAdsConversionId}
          conversionLabel={config.googleAdsConversionLabel}
        />
      </main>
      <SiteFooter config={config} navItems={navItems} />
    </>
  );
}
