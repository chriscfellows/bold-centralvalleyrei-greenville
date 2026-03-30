/**
 * @boldstreet/shared-layout
 * Shared server-rendered page section components for Bold Street lead gen sites.
 * All components are server components by default (no 'use client').
 * Client-interactive components are explicitly marked with 'use client'.
 *
 * Color palette: Navy #0F172A, Gold #E8521A, White #ffffff
 */

// Layout
export { SiteHeader } from "./components/SiteHeader";
export { SiteFooter } from "./components/SiteFooter";

// Page Sections (server components)
export { HeroSection } from "./components/HeroSection";
export { TrustBar } from "./components/TrustBar";
export { ProcessSteps } from "./components/ProcessSteps";
export { SituationsGrid } from "./components/SituationsGrid";
export { ComparisonTable } from "./components/ComparisonTable";
export { AboutSection } from "./components/AboutSection";
export { TestimonialsGrid } from "./components/TestimonialsGrid";
export { CTASection } from "./components/CTASection";

// Lead Capture Form (client component — requires 'use client')
export { LeadCaptureForm } from "./components/LeadCaptureForm";

// Blog components
export { BlogCard } from "./components/BlogCard";
export { BlogPostContent } from "./components/BlogPostContent";

// Types
export type { SiteConfig, NavItem, ProcessStep, Situation, ComparisonRow, TestimonialItem } from "./types/index";
