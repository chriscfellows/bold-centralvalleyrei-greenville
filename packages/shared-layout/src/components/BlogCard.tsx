/**
 * BlogCard — Server component.
 * Blog post listing card.
 * When `featured` is true, renders as a full-width hero card (latest post layout).
 * Spec ref: BL-001
 */

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  heroImageUrl?: string | null;
  publishDate?: Date | null;
  metaDescription?: string | null;
  /** When true, renders as a full-width featured hero card. */
  featured?: boolean;
}

export function BlogCard({ title, slug, excerpt, heroImageUrl, publishDate, featured }: BlogCardProps) {
  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  if (featured) {
    return (
      <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-10">
        <a href={`/blog/${slug}`} className="grid grid-cols-1 lg:grid-cols-2 group">
          {heroImageUrl ? (
            <div className="overflow-hidden">
              <img
                src={heroImageUrl}
                alt={title}
                className="w-full h-64 lg:h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            </div>
          ) : (
            <div className="bg-gray-100 h-64 lg:h-full" />
          )}
          <div className="p-8 lg:p-10 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block bg-[#E8521A] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                Latest Post
              </span>
              {formattedDate && (
                <time className="text-xs text-gray-400 font-medium uppercase tracking-wider" dateTime={publishDate?.toISOString()}>
                  {formattedDate}
                </time>
              )}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] leading-snug group-hover:text-[#E8521A] transition-colors">
              {title}
            </h2>
            {excerpt && (
              <p className="text-base text-gray-600 leading-relaxed line-clamp-4">{excerpt}</p>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F172A] group-hover:text-[#E8521A] transition-colors mt-2">
              Read Article
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </a>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {heroImageUrl && (
        <a href={`/blog/${slug}`} tabIndex={-1} aria-hidden="true">
          <img
            src={heroImageUrl}
            alt={title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </a>
      )}
      <div className="p-6 space-y-3">
        {formattedDate && (
          <time className="text-xs text-gray-400 font-medium uppercase tracking-wider" dateTime={publishDate?.toISOString()}>
            {formattedDate}
          </time>
        )}
        <h3 className="text-lg font-bold text-[#0F172A] leading-snug">
          <a href={`/blog/${slug}`} className="hover:text-[#E8521A] transition-colors">
            {title}
          </a>
        </h3>
        {excerpt && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{excerpt}</p>
        )}
        <a
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F172A] hover:text-[#E8521A] transition-colors"
        >
          Read More
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
}
