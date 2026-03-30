/**
 * Drizzle ORM schema — subset of BLP tables accessible to lead gen sites.
 * READ-ONLY: clients, websites, blog_posts, testimonials
 * WRITE (error reporting only): notifications
 */
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

// ─── Clients (read-only) ───
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Client = typeof clients.$inferSelect;

// ─── Websites (read-only) ───
export const websites = pgTable("websites", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  domain: varchar("domain", { length: 500 }),
  customDomain: varchar("custom_domain", { length: 500 }),
  googleAdsConversionId: varchar("google_ads_conversion_id", { length: 100 }),
  googleAdsConversionLabel: varchar("google_ads_conversion_label", { length: 100 }),
  gtmContainerId: varchar("gtm_container_id", { length: 100 }),
  ga4MeasurementId: varchar("ga4_measurement_id", { length: 100 }),
  metaPixelId: varchar("meta_pixel_id", { length: 100 }),
  primaryColor: varchar("primary_color", { length: 20 }),
  logoUrl: text("logo_url"),
  faviconUrl: text("favicon_url"),
  logoData: text("logo_data"),
  location: varchar("location", { length: 500 }),
  metroArea: varchar("metro_area", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  blogEnabled: boolean("blog_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Website = typeof websites.$inferSelect;
export type InsertWebsite = typeof websites.$inferInsert;

// ─── Blog Posts (read-only) ───
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  metaDescription: text("meta_description"),
  heroImageUrl: text("hero_image_url"),
  published: boolean("published").default(false).notNull(),
  publishDate: timestamp("publish_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;

// ─── Testimonials (read-only) ───
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  websiteId: integer("website_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  quote: text("quote").notNull(),
  published: boolean("published").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;

// ─── Notifications (write access — error reporting only) ───
export const notificationTypeEnum = pgEnum("notification_type", ["error", "warning", "info"]);

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  message: text("message").notNull(),
  leadId: integer("lead_id"),
  clientId: integer("client_id"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
