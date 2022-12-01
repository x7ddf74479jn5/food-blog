import { cache } from "react";

import { fetchConfig, fetchTag } from "@/repositories";
import type { PageMeta } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

export const getTagPageMeta = cache(async (slug: string): Promise<PageMeta> => {
  const [config, tag] = await Promise.all([fetchConfig(), fetchTag(slug)]);
  const { host, siteDescription, siteImage, siteTitle } = config;
  const title = formatPageTitle(`タグ：${tag.name}`, siteTitle);
  const url = formatPageUrl(`${urlTable.tags}/${tag.slug}`, host);

  return { description: siteDescription, image: siteImage.url, title, url };
});
