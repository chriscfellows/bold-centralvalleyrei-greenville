/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile inlined shared packages (located in ./packages/)
  transpilePackages: [
    "@boldstreet/shared-layout",
    "@boldstreet/shared",
    "@boldstreet/db-schema",
  ],
  // Ensure server-side rendering for all pages
  // No static export — SSR required for blog and testimonials from DB
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
