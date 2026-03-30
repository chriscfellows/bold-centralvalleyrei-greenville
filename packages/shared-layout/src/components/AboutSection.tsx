/**
 * AboutSection — Server component.
 * Dark #0F172A background. Circular house photo on left, copy on right.
 * LPT badge below copy. Matches reference site.
 */
interface AboutSectionProps {
  headline: string;
  body: string[];
  imageUrl?: string;
  imageAlt?: string;
  variant?: "image-left" | "image-right" | "centered";
  stats?: { value: string; label: string }[];
}

export function AboutSection({
  headline,
  body,
  imageUrl,
  imageAlt,
}: AboutSectionProps) {
  return (
    <section className="bg-[#0F172A] py-16 lg:py-24" aria-labelledby="about-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Circular house photo */}
          <div className="flex justify-center">
            <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageAlt || "Florida home"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <svg className="h-24 w-24 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Right: Copy */}
          <div className="space-y-5 text-white">
            <h2 id="about-heading" className="text-3xl lg:text-4xl font-bold">
              {headline}
            </h2>
            {body.map((para, i) => (
              <p key={i} className="text-white/75 leading-relaxed">{para}</p>
            ))}

            {/* LPT badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs tracking-wider">lpt</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Licensed Real Estate</p>
                <p className="text-white/60 text-sm">Professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
