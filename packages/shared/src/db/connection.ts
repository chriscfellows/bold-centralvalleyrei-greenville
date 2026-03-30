/**
 * Database Connection — Read-only access to BLP's PostgreSQL.
 * Lead gen sites read: websites, clients, blog_posts, testimonials.
 * Narrow write access: notifications (error reporting only).
 *
 * Spec refs: LD-006, LD-007, SEC-001, SEC-002
 */

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, and } from "drizzle-orm";
import {
  websites,
  clients,
  blogPosts,
  testimonials,
  type Website,
  type BlogPost,
  type Testimonial,
} from "@boldstreet/db-schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (_db) return _db;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const sql = postgres(databaseUrl, { max: 5 });
  _db = drizzle(sql);
  return _db;
}

/**
 * Load website config from BLP's websites table using WEBSITE_ID env var.
 * Spec ref: LD-006 — site identifies itself via WEBSITE_ID env var.
 */
export async function getWebsiteConfig(): Promise<Website | null> {
  const websiteId = process.env.WEBSITE_ID;
  if (!websiteId) {
    console.error("[DB] WEBSITE_ID environment variable is not set");
    return null;
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(websites)
      .where(eq(websites.id, parseInt(websiteId)))
      .limit(1);

    return rows[0] ?? null;
  } catch (err) {
    console.error("[DB] Failed to load website config:", err);
    return null;
  }
}

/**
 * Get published blog posts for a website, sorted by publish_date desc.
 * Spec ref: BL-001
 */
export async function getBlogPosts(websiteId: number): Promise<BlogPost[]> {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.websiteId, websiteId), eq(blogPosts.published, true)))
      .orderBy(blogPosts.publishDate);

    // Sort descending in JS since drizzle orderBy direction needs import
    return rows.sort((a, b) => {
      const aDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
      const bDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;
      return bDate - aDate;
    });
  } catch (err) {
    console.error("[DB] Failed to load blog posts:", err);
    return [];
  }
}

/**
 * Get a single published blog post by slug.
 * Spec ref: BL-002
 */
export async function getBlogPost(websiteId: number, slug: string): Promise<BlogPost | null> {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.websiteId, websiteId),
          eq(blogPosts.slug, slug),
          eq(blogPosts.published, true)
        )
      )
      .limit(1);

    return rows[0] ?? null;
  } catch (err) {
    console.error("[DB] Failed to load blog post:", err);
    return null;
  }
}

/**
 * Get published testimonials for a website, sorted by sort_order.
 * Spec ref: Must Do #10 (testimonials from DB, not hardcoded)
 */
export async function getTestimonials(websiteId: number): Promise<Testimonial[]> {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(testimonials)
      .where(and(eq(testimonials.websiteId, websiteId), eq(testimonials.published, true)))
      .orderBy(testimonials.sortOrder);

    return rows;
  } catch (err) {
    console.error("[DB] Failed to load testimonials:", err);
    return [];
  }
}
