import { cache } from "react";

import { fetchConfig } from "@/repositories";
import type { PageMeta } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

export const getSearchPageMeta = cache(async (): Promise<PageMeta> => {
  const { host, siteDescription, siteImage, siteTitle } = await fetchConfig();
  const title = formatPageTitle("検索", siteTitle);
  const url = formatPageUrl(`${urlTable.search}`, host);

  return { description: siteDescription, image: siteImage.url, title, url };
});
