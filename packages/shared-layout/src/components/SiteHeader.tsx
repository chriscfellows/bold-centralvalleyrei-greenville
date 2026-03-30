/**
 * SiteHeader — Server component.
 * Navigation header with logo, desktop nav links, phone CTA, and mobile hamburger.
 * Mobile hamburger is client-interactive — only that sub-component uses 'use client'.
 * Spec ref: SSR-004 (only interactive sub-components use 'use client')
 */

import type { SiteConfig, NavItem } from "../types/index";
import { MobileNav } from "./MobileNav";

interface SiteHeaderProps {
  config: SiteConfig;
  navItems: NavItem[];
  currentPath?: string;
}

export function SiteHeader({ config, navItems, currentPath }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0F172A]/10 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0">
            {config.logoUrl ? (
              <img
                src={config.logoUrl}
                alt={`${config.siteName} Logo`}
                className="h-8 w-auto"
                width={120}
                height={32}
              />
            ) : (
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[#0F172A] text-lg tracking-wide">{config.siteName}</span>
                <span className="text-xs text-[#0F172A]/70 tracking-widest uppercase">
                  {config.metroArea} Cash Buyers
                </span>
              </div>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#E8521A] ${
                  currentPath === item.href
                    ? "text-[#0F172A] font-semibold"
                    : "text-[#0F172A]/80"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Phone CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${config.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-[#0F172A] font-bold hover:text-[#E8521A] transition-colors"
              aria-label={`Call us at ${config.phone}`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
                />
              </svg>
              <span>{config.phone}</span>
            </a>
            <a
              href="/#lead-form"
              className="inline-flex items-center justify-center rounded-full bg-[#E8521A] px-5 py-2 text-sm font-bold text-white shadow hover:bg-[#E8521A]/90 transition-colors"
            >
              Get Cash Offer
            </a>
          </div>

          {/* Mobile hamburger */}
          <MobileNav config={config} navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
