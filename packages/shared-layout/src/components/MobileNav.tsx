"use client";
/**
 * MobileNav — Client component (requires state for open/close).
 * Only this sub-component is 'use client' — surrounding header is server-rendered.
 * Spec ref: SSR-004
 */

import { useState } from "react";
import type { SiteConfig, NavItem } from "../types/index";

interface MobileNavProps {
  config: SiteConfig;
  navItems: NavItem[];
}

export function MobileNav({ config, navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 text-[#0F172A] hover:bg-[#0F172A]/10 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-[#0F172A]/10 bg-white shadow-lg">
          <nav className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-md px-4 py-3 text-sm font-medium text-[#0F172A] hover:bg-[#0F172A]/5 hover:text-[#E8521A] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-[#0F172A]/10">
              <a
                href={`tel:${config.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#0F172A]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
                {config.phone}
              </a>
              <a
                href="/#lead-form"
                className="block mx-4 mt-2 rounded-full bg-[#E8521A] px-5 py-3 text-center text-sm font-bold text-white"
                onClick={() => setIsOpen(false)}
              >
                Get Cash Offer
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
