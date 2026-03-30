/**
 * HeroSection — Server component.
 * Dark #0F172A background. Headline with orange highlighted words (headlineParts array).
 * Form card on right, above the fold on desktop and mobile.
 * Spec refs: Must Do #3 (form above fold), SSR-001, SSR-002
 */
import { LeadCaptureForm } from "./LeadCaptureForm";
import type { SiteConfig } from "../types/index";

interface HeadlinePart {
  text: string;
  highlight?: boolean;
}

interface HeroSectionProps {
  config: SiteConfig;
  websiteId: number;
  headlineParts: HeadlinePart[];
  subheadline: string;
  trustPoints: string[];
}

export function HeroSection({
  config,
  websiteId,
  headlineParts,
  subheadline,
  trustPoints,
}: HeroSectionProps) {
  return (
    <section
      className="relative bg-[#0F172A] text-white overflow-hidden"
      aria-label="Hero section"
    >
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            {/* Location badge */}
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              <svg className="mr-2 h-3.5 w-3.5 text-[#E8521A]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Serving {config.serviceArea}
            </div>

            {/* H1 with optional orange highlighted words */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {headlineParts.map((part, i) =>
                part.highlight ? (
                  <span key={i} className="text-[#E8521A]">{part.text}</span>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </h1>

            <p className="text-lg text-white/80 leading-relaxed max-w-lg">
              {subheadline}
            </p>

            {/* Trust points */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Key benefits">
              {trustPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <svg className="h-4 w-4 text-[#E8521A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Lead Capture Form — above the fold */}
          <div id="lead-form" className="w-full scroll-mt-20">
            <LeadCaptureForm
              websiteId={websiteId}
              metroArea={config.metroArea}
              ctaText="Get My Cash Offer!"
              compact={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
