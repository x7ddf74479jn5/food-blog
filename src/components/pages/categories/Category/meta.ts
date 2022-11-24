import { cache } from "react";

import { fetchCategory, fetchConfig } from "@/repositories";
import type { PageMeta } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

export const getCategoryPageMeta = cache(async (slug: string): Promise<PageMeta> => {
  const [config, category] = await Promise.all([fetchConfig(), fetchCategory(slug)]);
  const { host, siteDescription, siteTitle } = config;
  const title = formatPageTitle(`カテゴリー：${category.name}`, siteTitle);
  const url = formatPageUrl(`${urlTable.categories}/${category.slug}`, host);

  return { description: siteDescription, image: category.image.url, title, url };
});
