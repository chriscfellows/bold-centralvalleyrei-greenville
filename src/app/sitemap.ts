import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN
  ? "https://" + process.env.NEXT_PUBLIC_DOMAIN
  : "https://sellgreenvillehomefast.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: BASE_URL + "/our-process", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: BASE_URL + "/why-centralvalleyrei-realty", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: BASE_URL + "/contact-us", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: BASE_URL + "/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: BASE_URL + "/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: BASE_URL + "/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
