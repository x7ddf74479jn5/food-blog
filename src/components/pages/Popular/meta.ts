import { cache } from "react";

import { fetchConfig } from "@/repositories";
import type { PageMeta } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

export const getPopularPageMeta = cache(async (): Promise<PageMeta> => {
  const { host, siteDescription, siteImage, siteTitle } = await fetchConfig();
  const title = formatPageTitle("人気記事", siteTitle);
  const url = formatPageUrl(`${urlTable.popular}`, host);

  return { description: siteDescription, image: siteImage.url, title, url };
});
