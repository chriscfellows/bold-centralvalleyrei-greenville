/**
 * getSiteConfig — Server-side helper.
 * Merges the static SITE_CONFIG with dynamic values from BLP's websites table:
 *   - logoUrl: S3 URL of the uploaded logo
 *   - faviconUrl: S3 URL of the uploaded favicon
 *   - gtmContainerId: Google Tag Manager container ID
 *   - ga4MeasurementId: Google Analytics 4 measurement ID
 *   - googleAdsConversionId: Google Ads conversion ID
 *   - metaPixelId: Meta (Facebook) Pixel ID
 *
 * No in-memory caching — changes in BLP admin are reflected on the next
 * page request without requiring a redeploy.
 *
 * Spec ref: Must Do #3 (logo from S3 via BLP), LD-006 (website config from DB)
 */
import { getWebsiteConfig } from "@boldstreet/shared";
import { SITE_CONFIG } from "@/config/site";
import type { SiteConfig } from "@boldstreet/shared-layout";

/**
 * Returns SITE_CONFIG with all dynamic values resolved from BLP's DB.
 * Always fetches fresh from DB so BLP admin changes appear immediately.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const websiteConfig = await getWebsiteConfig();
    return {
      ...SITE_CONFIG,
      // Phone — DB-driven with static fallback
      phone: websiteConfig?.phone ?? SITE_CONFIG.phone,
      // S3 asset URLs
      logoUrl: websiteConfig?.logoUrl ?? SITE_CONFIG.logoUrl,
      faviconUrl: websiteConfig?.faviconUrl ?? SITE_CONFIG.faviconUrl,
      // Analytics IDs — fall back to static config values if not set in BLP
      gtmContainerId: websiteConfig?.gtmContainerId ?? SITE_CONFIG.gtmContainerId,
      googleAdsConversionId: websiteConfig?.googleAdsConversionId ?? SITE_CONFIG.googleAdsConversionId,
      googleAdsConversionLabel: websiteConfig?.googleAdsConversionLabel ?? SITE_CONFIG.googleAdsConversionLabel,
      ga4MeasurementId: websiteConfig?.ga4MeasurementId ?? SITE_CONFIG.ga4MeasurementId,
      metaPixelId: websiteConfig?.metaPixelId ?? SITE_CONFIG.metaPixelId,
      // Company type — determines badge sublabel (realtor vs cash_buyer)
      companyType: websiteConfig?.companyType ?? SITE_CONFIG.companyType,
    };
  } catch {
    // On any DB error, return static config as fallback
    return SITE_CONFIG;
  }
}
