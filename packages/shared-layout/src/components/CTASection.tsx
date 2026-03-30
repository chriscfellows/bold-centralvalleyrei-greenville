/**
 * CTASection — Server component.
 * White background with centered headline and orange CTA button.
 * Orange is used only on the button, NOT as section background.
 */
interface CTASectionProps {
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaHref?: string;
  phone: string;
}

export function CTASection({
  headline,
  subheadline,
  ctaText = "Get My Free Cash Offer!",
  ctaHref = "/#lead-form",
  phone,
}: CTASectionProps) {
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="cta-heading">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold text-[#0F172A]">
          {headline}
        </h2>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">{subheadline}</p>
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-[#E8521A] px-10 py-4 text-base font-bold text-white shadow-lg hover:bg-[#E8521A]/90 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
