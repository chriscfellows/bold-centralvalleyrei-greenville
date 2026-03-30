/**
 * BlogPostContent — Server component.
 * Renders full HTML+CSS blog post content from DB.
 * Content is sanitized against XSS but preserves HTML structure and embedded CSS.
 * Spec ref: BL-002
 */

interface BlogPostContentProps {
  content: string;
  title: string;
  publishDate?: Date | null;
  heroImageUrl?: string | null;
}

/**
 * Basic server-side HTML sanitization.
 * Removes script tags and dangerous attributes while preserving structure and CSS.
 * For production, consider using DOMPurify on the client or a server-side library.
 */
function sanitizeHtml(html: string): string {
  return html
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // Remove event handlers
    .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, "")
    // Remove javascript: protocol
    .replace(/javascript:/gi, "")
    // Remove data: URIs in src/href
    .replace(/(src|href)\s*=\s*["']data:[^"']*["']/gi, "");
}

export function BlogPostContent({ content, title, publishDate, heroImageUrl }: BlogPostContentProps) {
  const sanitized = sanitizeHtml(content);

  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {heroImageUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img
            src={heroImageUrl}
            alt={title}
            className="w-full h-64 lg:h-80 object-cover"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">{title}</h1>
        {formattedDate && (
          <time className="text-sm text-gray-500" dateTime={publishDate?.toISOString()}>
            Published {formattedDate}
          </time>
        )}
      </header>

      {/* Blog content — full HTML+CSS from AI agent, sanitized */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-[#0F172A] prose-a:text-[#0F172A] prose-a:underline"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </article>
  );
}
