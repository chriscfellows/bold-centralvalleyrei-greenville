/**
 * /database-check — Diagnostic page.
 * Prints all core values returned from the BLP database for this website.
 * Helps debug missing logo, favicon, analytics, and other DB-driven fields.
 */
import { getWebsiteConfig, getClientConfig } from "@boldstreet/shared";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { SITE_CONFIG, WEBSITE_ID } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DatabaseCheckPage() {
  const websiteId = WEBSITE_ID();
  let rawConfig: Record<string, unknown> | null = null;
  let rawError: string | null = null;
  let siteConfig: Record<string, unknown> | null = null;
  let siteConfigError: string | null = null;
  let clientConfig: Record<string, unknown> | null = null;
  let clientError: string | null = null;

  // 1. Raw DB query
  try {
    const result = await getWebsiteConfig();
    rawConfig = result ? (result as unknown as Record<string, unknown>) : null;
  } catch (err: unknown) {
    rawError = err instanceof Error ? err.message : String(err);
  }

  // 1b. Client config query
  try {
    const clientId = rawConfig?.clientId as number | undefined;
    if (clientId) {
      const result = await getClientConfig(clientId);
      clientConfig = result ? (result as unknown as Record<string, unknown>) : null;
    }
  } catch (err: unknown) {
    clientError = err instanceof Error ? err.message : String(err);
  }

  // 2. getSiteConfig (merged)
  try {
    const result = await getSiteConfig();
    siteConfig = result as unknown as Record<string, unknown>;
  } catch (err: unknown) {
    siteConfigError = err instanceof Error ? err.message : String(err);
  }

  const envVars = {
    WEBSITE_ID: process.env.WEBSITE_ID ?? "(NOT SET)",
    DATABASE_URL: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 30)}...` : "(NOT SET)",
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN ?? "(NOT SET)",
  };

  const coreDbFields = [
    "id", "name", "clientId", "url", "domain", "customDomain",
    "logoUrl", "faviconUrl", "logoData",
    "phone", "location", "metroArea",
    "googleAdsConversionId", "googleAdsConversionLabel",
    "gtmContainerId", "ga4MeasurementId", "metaPixelId",
    "primaryColor", "blogEnabled", "isActive",
  ];

  const coreClientFields = [
    "id", "name", "companyType", "isActive",
  ];

  const coreSiteConfigFields = [
    "siteName", "metroArea", "serviceArea", "location", "phone", "domain",
    "logoUrl", "faviconUrl", "companyType",
    "gtmContainerId", "googleAdsConversionId", "googleAdsConversionLabel",
    "ga4MeasurementId", "metaPixelId",
  ];

  return (
    <div style={{ fontFamily: "monospace", padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Database Check — Website ID: {websiteId}</h1>

      {/* Environment Variables */}
      <h2 style={{ fontSize: "1.2rem", marginTop: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
        Environment Variables
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Variable</th>
            <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(envVars).map(([key, val]) => (
            <tr key={key}>
              <td style={{ padding: "6px 10px", border: "1px solid #ddd", fontWeight: "bold" }}>{key}</td>
              <td style={{ padding: "6px 10px", border: "1px solid #ddd", color: val === "(NOT SET)" ? "red" : "green" }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Static SITE_CONFIG (no logoUrl/faviconUrl expected) */}
      <h2 style={{ fontSize: "1.2rem", marginTop: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
        Static SITE_CONFIG (from site.ts)
      </h2>
      <pre style={{ background: "#f8f8f8", padding: "1rem", overflow: "auto", fontSize: "0.85rem", border: "1px solid #ddd" }}>
        {JSON.stringify(SITE_CONFIG, null, 2)}
      </pre>

      {/* Raw DB result */}
      <h2 style={{ fontSize: "1.2rem", marginTop: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
        Raw getWebsiteConfig() Result
      </h2>
      {rawError ? (
        <p style={{ color: "red", fontWeight: "bold" }}>ERROR: {rawError}</p>
      ) : rawConfig === null ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Returned NULL — no row found for WEBSITE_ID={websiteId}</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Field</th>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Value</th>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {coreDbFields.map((field) => {
              const val = rawConfig![field];
              const display = val === null ? "NULL" : val === undefined ? "UNDEFINED" : String(val);
              const color = val === null || val === undefined ? "red" : val === "" ? "orange" : "green";
              return (
                <tr key={field}>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", fontWeight: "bold" }}>{field}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", color, wordBreak: "break-all" }}>{display}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", color: "#888" }}>{typeof val}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Raw Client Config */}
      <h2 style={{ fontSize: "1.2rem", marginTop: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
        Raw getClientConfig() Result (clients table)
      </h2>
      {clientError ? (
        <p style={{ color: "red", fontWeight: "bold" }}>ERROR: {clientError}</p>
      ) : clientConfig === null ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Returned NULL — no client row found (clientId from website: {rawConfig?.clientId as number ?? "N/A"})</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Field</th>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Value</th>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {coreClientFields.map((field) => {
              const val = clientConfig![field];
              const display = val === null ? "NULL" : val === undefined ? "UNDEFINED" : String(val);
              const color = val === null || val === undefined ? "red" : val === "" ? "orange" : "green";
              return (
                <tr key={field}>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", fontWeight: "bold" }}>{field}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", color, wordBreak: "break-all" }}>{display}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", color: "#888" }}>{typeof val}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Merged getSiteConfig result */}
      <h2 style={{ fontSize: "1.2rem", marginTop: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
        Merged getSiteConfig() Result
      </h2>
      {siteConfigError ? (
        <p style={{ color: "red", fontWeight: "bold" }}>ERROR: {siteConfigError}</p>
      ) : siteConfig === null ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Returned NULL</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Field</th>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Value</th>
              <th style={{ textAlign: "left", padding: "6px 10px", border: "1px solid #ddd" }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {coreSiteConfigFields.map((field) => {
              const val = siteConfig![field];
              const display = val === null ? "NULL" : val === undefined ? "UNDEFINED" : String(val);
              const color = val === null || val === undefined ? "red" : val === "" ? "orange" : "green";
              return (
                <tr key={field}>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", fontWeight: "bold" }}>{field}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", color, wordBreak: "break-all" }}>{display}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #ddd", color: "#888" }}>{typeof val}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: "2rem", color: "#888", fontSize: "0.8rem" }}>
        Generated at: {new Date().toISOString()} | force-dynamic, no cache
      </p>
    </div>
  );
}
