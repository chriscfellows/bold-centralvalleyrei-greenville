/**
 * getSiteConfig — Server-side helper.
 * Merges the static SITE_CONFIG with dynamic values from BLP's websites table
 * and the clients table (for company name, company_type, and disclosure fields).
 *
 * No in-memory caching — changes in BLP admin are reflected on the next
 * page request without requiring a redeploy.
 *
 * Spec ref: Must Do #3 (logo from S3 via BLP), LD-006 (website config from DB)
 */
import { getWebsiteConfig, getClientConfig } from "@boldstreet/shared";
import { SITE_CONFIG } from "@/config/site";
import type { SiteConfig } from "@boldstreet/shared-layout";

/**
 * Returns SITE_CONFIG with all dynamic values resolved from BLP's DB.
 * Always fetches fresh from DB so BLP admin changes appear immediately.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const websiteConfig = await getWebsiteConfig();

    // Fetch client data (company name, company_type, disclosure fields) from the clients table
    let companyType = SITE_CONFIG.companyType;
    let siteName = SITE_CONFIG.siteName;
    let clientConfig = null;
    if (websiteConfig?.clientId) {
      clientConfig = await getClientConfig(websiteConfig.clientId);
      companyType = clientConfig?.companyType ?? SITE_CONFIG.companyType;
      siteName = clientConfig?.name ?? SITE_CONFIG.siteName;
    }

    return {
      ...SITE_CONFIG,
      // Company name — from clients.name in DB
      siteName,
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
      // Company type — from clients table, determines badge sublabel (realtor vs cash_buyer)
      companyType,
      // Disclosure fields — from clients table (realtor-type clients only)
      owner: clientConfig?.owner ?? undefined,
      ownerLicense: clientConfig?.ownerLicense ?? undefined,
      licenseState: clientConfig?.licenseState ?? undefined,
      disclosureAgency: clientConfig?.disclosureAgency ?? undefined,
      disclosureCashbuyer: clientConfig?.disclosureCashbuyer ?? undefined,
      brokerageName: clientConfig?.brokerageName ?? undefined,
      brokerageLicense: clientConfig?.brokerageLicense ?? undefined,
      // Website name — from websites.name in DB (used in footer tagline for realtor sites)
      websiteName: websiteConfig?.name ?? undefined,
    };
  } catch {
    // On any DB error, return static config as fallback
    return SITE_CONFIG;
  }
}
