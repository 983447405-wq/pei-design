import type { MetadataRoute } from "next";
import { locales, localizedPath } from "@/lib/i18n";
import { site } from "@/lib/seo";
import { posts } from "@/content/blog";
import { projects } from "@/content/projects";
import { resources } from "@/content/resources";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/about", "/blog", "/resources", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      entries.push({
        url: `${site.url}${localizedPath(locale, route)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.7
      });
    });

    projects.forEach((project) => {
      entries.push({
        url: `${site.url}${localizedPath(locale, `/projects/${project.slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8
      });
    });

    posts.forEach((post) => {
      entries.push({
        url: `${site.url}${localizedPath(locale, `/blog/${post.slug}`)}`,
        lastModified: new Date(post.updated),
        changeFrequency: "monthly",
        priority: post.featured ? 0.8 : 0.65
      });
    });

    resources.forEach((resource) => {
      entries.push({
        url: `${site.url}${localizedPath(locale, `/resources/${resource.slug}`)}`,
        lastModified: new Date(resource.updated),
        changeFrequency: "monthly",
        priority: resource.featured ? 0.75 : 0.6
      });
    });
  });

  return entries;
}
