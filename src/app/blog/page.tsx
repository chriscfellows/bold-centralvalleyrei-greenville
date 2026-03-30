/**
 * Greenville Blog Index Page — SSR
 * Renders published blog posts from BLP DB.
 * Latest post is displayed as a full-width featured hero card.
 * Remaining posts are tiled in a 3-column grid below.
 * Spec refs: BL-001, SSR-001
 */

import type { Metadata } from "next";
import { SiteHeader, SiteFooter, BlogCard, CTASection } from "@boldstreet/shared-layout";
import { getBlogPosts } from "@boldstreet/shared";
import { SITE_CONFIG, NAV_ITEMS, SEO, WEBSITE_ID } from "@/config/site";
import { getSiteConfig } from "@/lib/getSiteConfig";

export const metadata: Metadata = {
  title: SEO.blog.title,
  description: SEO.blog.description,
  alternates: { canonical: SEO.blog.canonical },
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, siteConfig] = await Promise.all([getBlogPosts(WEBSITE_ID()), getSiteConfig()]);

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <>
      <SiteHeader config={siteConfig} navItems={NAV_ITEMS} currentPath="/blog" />
      <main>
        <section className="bg-[#0F172A] text-white py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Greenville Real Estate Blog
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Expert advice on selling your Greenville home fast. Tips on avoiding foreclosure, handling inherited properties, and getting the best cash offer.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <>
                {/* Featured latest post — full width */}
                <BlogCard
                  key={featuredPost.id}
                  title={featuredPost.title}
                  slug={featuredPost.slug}
                  excerpt={featuredPost.excerpt}
                  heroImageUrl={featuredPost.heroImageUrl}
                  publishDate={featuredPost.publishDate}
                  metaDescription={featuredPost.metaDescription}
                  featured
                />

                {/* Remaining posts — 3-column grid */}
                {remainingPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {remainingPosts.map((post) => (
                      <BlogCard
                        key={post.id}
                        title={post.title}
                        slug={post.slug}
                        excerpt={post.excerpt}
                        heroImageUrl={post.heroImageUrl}
                        publishDate={post.publishDate}
                        metaDescription={post.metaDescription}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <CTASection
          headline="Ready to Sell Your Greenville Home?"
          subheadline="Get a fair cash offer in 24 hours. No repairs. No fees. Close on your schedule."
          ctaText="Get My Free Cash Offer"
          ctaHref="/contact-us"
          phone={siteConfig.phone}
        />
      </main>
      <SiteFooter config={siteConfig} navItems={NAV_ITEMS} />
    </>
  );
}
