/**
 * Greenville Blog Post Detail Page — SSR
 * Renders individual blog post from BLP DB by slug.
 * Spec refs: BL-002, SSR-001, SEO-001
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter, BlogPostContent, CTASection } from "@boldstreet/shared-layout";
import { getBlogPost, getBlogPosts } from "@boldstreet/shared";
import { SITE_CONFIG, NAV_ITEMS, WEBSITE_ID } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

interface BlogPostPageProps {
  params: { slug: string };
}

// Revalidate every 10 minutes
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(WEBSITE_ID(), params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Central Valley REI Greenville`,
    description: post.metaDescription || post.excerpt || undefined,
    alternates: {
      canonical: `https://sellgreenvillehomefast.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt || undefined,
      url: `https://sellgreenvillehomefast.com/blog/${post.slug}`,
      images: post.heroImageUrl ? [{ url: post.heroImageUrl }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(WEBSITE_ID());
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, siteConfig] = await Promise.all([getBlogPost(WEBSITE_ID(), params.slug), getSiteConfig()]);
  if (!post) notFound();

  // Schema.org Article structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.publishDate?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name: "Central Valley REI Greenville Cash Buyers",
    },
    publisher: {
      "@type": "Organization",
      name: "Central Valley REI Greenville Cash Buyers",
      url: "https://sellgreenvillehomefast.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sellgreenvillehomefast.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader config={siteConfig} navItems={NAV_ITEMS} currentPath="/blog" />
      <main>
        <BlogPostContent
          content={post.content}
          title={post.title}
          publishDate={post.publishDate}
          heroImageUrl={post.heroImageUrl}
        />
        <CTASection
          headline="Ready to Sell Your Greenville Home Fast?"
          subheadline="Get a fair, no-obligation cash offer in 24 hours. No repairs. No fees. Close on your schedule."
          ctaText="Get My Free Cash Offer"
          ctaHref="/contact-us"
          phone={SITE_CONFIG.phone}
        />
      </main>
      <SiteFooter config={siteConfig} navItems={NAV_ITEMS} />
    </>
  );
}
