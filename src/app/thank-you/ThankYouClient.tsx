"use client";
/**
 * ThankYouClient — fires Google Ads conversion event on mount.
 * conversionId and conversionLabel are passed from the server component (page.tsx)
 * which reads them from the BLP DB via getSiteConfig(). Nothing is hardcoded here.
 *
 * The full send_to value is constructed as: `${conversionId}/${conversionLabel}`
 * The event fires only when both props are present.
 *
 * Spec ref: Must Do #4 (conversion fires on /thank-you only)
 */

import { useEffect } from "react";

interface ThankYouClientProps {
  phone: string;
  conversionId?: string;
  conversionLabel?: string;
}

export function ThankYouClient({ phone, conversionId, conversionLabel }: ThankYouClientProps) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as any).gtag &&
      conversionId &&
      conversionLabel
    ) {
      (window as any).gtag("event", "conversion", {
        send_to: `${conversionId}/${conversionLabel}`,
        value: 1000.0,
        currency: "USD",
      });
    }
  }, [conversionId, conversionLabel]);

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
        <svg
          className="h-10 w-10 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[#0F172A] mb-4">
        Thank You! We Received Your Request.
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        A member of our team will be in touch within{" "}
        <strong className="text-[#0F172A]">24 hours</strong> with your fair cash offer.
        No obligation. No pressure.
      </p>

      <div className="bg-[#E8521A]/20 border border-[#E8521A] rounded-2xl p-6 mb-8">
        <p className="text-[#0F172A] font-medium mb-2">
          Want to talk to someone right now?
        </p>
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="inline-flex items-center gap-2 text-[#0F172A] font-bold text-xl hover:text-[#E8521A] transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
            />
          </svg>
          {phone}
        </a>
      </div>

      <a
        href="/"
        className="inline-flex items-center gap-2 text-[#0F172A]/70 hover:text-[#0F172A] transition-colors text-sm"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </a>
    </div>
  );
}
