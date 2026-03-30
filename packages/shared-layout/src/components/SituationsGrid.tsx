/**
 * SituationsGrid — Server component.
 * White background. Left: headline + copy + 2-col checklist with orange checkmarks.
 * Right: house photo (optional). Matches reference site layout.
 */
import type { Situation } from "../types/index";

interface SituationsGridProps {
  headline: string;
  intro: string;
  situations: Situation[];
  ctaHref?: string;
  ctaText?: string;
  imageUrl?: string;
  variant?: "list" | "grid";
  columns?: 2 | 3 | 4;
}

export function SituationsGrid({
  headline,
  intro,
  situations,
  ctaHref = "/#lead-form",
  ctaText = "Get My Fair Cash Offer",
  imageUrl,
}: SituationsGridProps) {
  return (
    <section className="bg-[#F1F5F9] py-16 lg:py-24" aria-labelledby="situations-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <h2 id="situations-heading" className="text-3xl lg:text-4xl font-bold text-[#0F172A]">
              {headline}
            </h2>
            <p className="text-gray-600 leading-relaxed">{intro}</p>

            {/* 2-column checklist with orange checkmarks */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {situations.map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#E8521A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-[#0F172A]">{s.title}</span>
                </li>
              ))}
            </ul>

            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-[#E8521A] px-8 py-4 text-base font-bold text-white shadow hover:bg-[#E8521A]/90 transition-colors"
            >
              {ctaText}
            </a>
          </div>

          {/* Right: House photo */}
          <div className="relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Florida home"
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-80 lg:h-96 rounded-2xl bg-[#0F172A]/10 flex items-center justify-center">
                <svg className="h-24 w-24 text-[#0F172A]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
