import { cache } from "react";

import { fetchConfig } from "@/repositories";
import type { PageMeta } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

export const getPickupPageMeta = cache(async (): Promise<PageMeta> => {
  const { host, siteDescription, siteImage, siteTitle } = await fetchConfig();
  const title = formatPageTitle("おすすめ記事", siteTitle);
  const url = formatPageUrl(`${urlTable.pickup}`, host);

  return { description: siteDescription, image: siteImage.url, title, url };
});
