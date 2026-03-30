/**
 * TestimonialsGrid — Server component.
 * Cream background, 3-column white card grid with orange stars.
 * Design matches sellmytampahomefast.com testimonials section.
 * Renders testimonials from DB (published=true only).
 * Spec ref: Must Do #10 (testimonials from DB, not hardcoded)
 */
import type { TestimonialItem } from "../types/index";

interface TestimonialsGridProps {
  headline: string;
  subheadline?: string;
  testimonials: TestimonialItem[];
  variant?: "grid" | "list";
  columns?: 2 | 3;
}

function StarRating() {
  return (
    <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className="h-5 w-5 text-[#E8521A]"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AvatarInitial({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div
      className="h-10 w-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

export function TestimonialsGrid({
  headline,
  subheadline = "We pride ourselves on providing a 5-star experience for every homeowner we work with.",
  testimonials,
  variant = "grid",
  columns = 3,
}: TestimonialsGridProps) {
  if (testimonials.length === 0) return null;

  const colClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      className="bg-[#F5F0E8] py-16 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl lg:text-4xl font-bold text-[#0F172A] font-serif"
          >
            {headline}
          </h2>
          {subheadline && (
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
              {subheadline}
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div className={`grid ${colClass} gap-6`}>
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col"
            >
              {/* Stars */}
              <StarRating />

              {/* Quote body */}
              <p className="text-gray-700 italic text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Reviewer */}
              <footer className="flex items-center gap-3">
                <AvatarInitial name={t.name} />
                <div>
                  <cite className="not-italic font-bold text-[#0F172A] text-sm block">
                    {t.name}
                  </cite>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
