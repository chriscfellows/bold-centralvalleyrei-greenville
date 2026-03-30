/**
 * @boldstreet/shared
 * Shared utilities, services, and middleware for Bold Street lead gen sites.
 */

// Lead submission service (BullMQ publisher + error fallback)
export { submitLead, handleLeadError } from "./services/lead-submission";
export type { LeadIngestionMessage, LeadIngestionResult, LeadSubmissionError } from "./services/lead-submission";

// Database connection (read-only for config/blog, narrow write for notifications)
export { getDb, getWebsiteConfig, getBlogPosts, getBlogPost, getTestimonials } from "./db/connection";

// Spam protection middleware
export { checkSpamProtection } from "./middleware/spam-protection";
export type { SpamCheckResult } from "./middleware/spam-protection";

// UTM/gclid types
export type { UTMParams } from "./types/utm";
