import { cache } from "react";

import { fetchArticle, fetchConfig } from "@/repositories";
import type { PageMeta } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

export const getArticleDetailPageMeta = cache(async (id: string): Promise<PageMeta> => {
  const [article, config] = await Promise.all([fetchArticle(id), fetchConfig()]);
  const { host, siteTitle } = config;
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);
  const title = formatPageTitle(article.title, siteTitle);

  return { description: article.description, image: article.image.url, title, url };
});
