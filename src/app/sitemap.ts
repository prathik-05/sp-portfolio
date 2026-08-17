import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prathik-05.vercel.app";
  const lastModified = new Date();

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1
    },
    ...projectEntries,
    {
      url: `${baseUrl}/notes`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/notes/sub-200ms-video-rag`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5
    },
    {
      url: `${baseUrl}/notes/cognito-eda-schema-safety`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5
    }
  ];
}