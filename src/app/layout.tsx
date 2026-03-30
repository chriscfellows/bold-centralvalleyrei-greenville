/**
 * Greenville Root Layout
 * All analytics IDs (GTM, GA4, Google Ads, Meta Pixel) are pulled from BLP DB
 * at runtime via getSiteConfig() — no hardcoded IDs in this file.
 * Changes made in BLP admin take effect on the next page request, no redeploy needed.
 *
 * - UTM capture script (runs on all pages, stores to localStorage with 90-day window)
 * - Favicon injected at runtime from BLP DB (faviconUrl)
 * Spec refs: SSR-001, SEO-001, UTM-001, UTM-002
 */

import type { Metadata } from "next";
import "./globals.css";
import { UTMCapture } from "@/lib/UTMCapture";
import { getSiteConfig } from "@/lib/getSiteConfig";

export const metadata: Metadata = {
  metadataBase: new URL("https://sellgreenvillehomefast.com"),
  title: {
    default: "Sell My House Fast Greenville SC | Cash Offer in 24 Hours | Central Valley REI",
    template: "%s | Central Valley REI",
  },
  description:
    "Get a fair cash offer for your Greenville SC home in 24 hours. Central Valley REI buys houses as-is — no repairs, no fees, no commissions. Close in as little as 7 days.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Central Valley REI",
    url: "https://sellgreenvillehomefast.com",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();
  const faviconHref = config.faviconUrl ?? "/favicon.ico";
  const gtmId = config.gtmContainerId;
  const ga4Id = config.ga4MeasurementId;
  const gadsId = config.googleAdsConversionId;
  const metaPixelId = config.metaPixelId;

  return (
    <html lang="en">
      <head>
        {/* Dynamic favicon — pulled from BLP DB at runtime */}
        <link rel="icon" href={faviconHref} />
        <link rel="shortcut icon" href={faviconHref} />
        <link rel="apple-touch-icon" href={faviconHref} />

        {/* Google Tag Manager — only rendered if GTM ID is configured in BLP */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}

        {/* Google Analytics 4 — only rendered if GA4 ID is configured in BLP */}
        {ga4Id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}');`,
              }}
            />
          </>
        )}

        {/* Google Ads — only rendered if Google Ads conversion ID is configured in BLP */}
        {gadsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gadsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gadsId}');`,
              }}
            />
          </>
        )}

        {/* Meta Pixel — only rendered if Meta Pixel ID is configured in BLP */}
        {metaPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`,
            }}
          />
        )}
      </head>
      <body>
        {/* GTM noscript — must be immediately after opening body tag per Google spec */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* UTM capture — client component, captures gclid/utm params to localStorage */}
        <UTMCapture />
        {children}
      </body>
    </html>
  );
}
