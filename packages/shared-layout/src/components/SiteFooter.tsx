/**
 * SiteFooter — Server component.
 * Spec ref: SSR-001, SEO-001
 */

import type { SiteConfig, NavItem } from "../types/index";

interface SiteFooterProps {
  config: SiteConfig;
  navItems: NavItem[];
}

export function SiteFooter({ config, navItems }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            {config.logoUrl ? (
              <img
                src={config.logoUrl}
                alt={`${config.siteName} Logo`}
                className="h-8 w-auto brightness-0 invert"
                width={120}
                height={32}
              />
            ) : (
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-lg tracking-wide">{config.siteName}</span>
                <span className="text-xs text-white/70 tracking-widest uppercase">
                  {config.metroArea} Cash Buyers
                </span>
              </div>
            )}
            <p className="text-white/70 text-sm max-w-xs">
              We provide fair cash offers for homes in {config.metroArea} and surrounding areas.
              Sell your house fast, as-is, with no fees or commissions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/70 text-sm hover:text-[#E8521A] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${config.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-white/70 text-sm hover:text-[#E8521A] transition-colors"
                >
                  <svg className="h-4 w-4 text-[#E8521A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  {config.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <svg className="h-4 w-4 text-[#E8521A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {config.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {year} {config.siteName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
