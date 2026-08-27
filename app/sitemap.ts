import type { MetadataRoute } from "next";

import { business } from "./business";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: business.url, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${business.url}/mentions-legales`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
