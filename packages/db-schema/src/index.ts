/**
 * @boldstreet/db-schema
 * Drizzle ORM schema for lead gen sites — read-only tables from BLP's PostgreSQL.
 * Lead gen sites may only READ from: websites, clients, blog_posts, testimonials.
 * Lead gen sites may only WRITE to: notifications (error reporting only).
 * All lead data flows through the BullMQ lead-ingestion queue — never direct DB writes.
 */

export {
  clients,
  websites,
  blogPosts,
  testimonials,
  notifications,
  notificationTypeEnum,
} from "./schema";

export type {
  Client,
  Website,
  BlogPost,
  Testimonial,
  Notification,
  InsertNotification,
} from "./schema";
