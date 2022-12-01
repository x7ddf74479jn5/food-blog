import type { MicroCMSQueries } from "microcms-js-sdk";
import { cache } from "react";

import { client } from "@/lib/microcms";
import type { TArticle, TArticleListResponse } from "@/types";
import type { TPickupListResponse } from "@/types/models/pickup";

export const fetchArticles = cache(async (queries?: MicroCMSQueries): Promise<TArticleListResponse> => {
  const data = await client.getList<TArticle>({
    endpoint: "articles",
    queries: { limit: 1000, ...queries },
  });
  return data;
});

export const fetchArticle = cache(async (id: string, queries?: MicroCMSQueries): Promise<TArticle> => {
  const data = await client.getListDetail<TArticle>({
    contentId: id,
    endpoint: `articles`,
    queries: {
      depth: 2,
      ...queries,
    },
  });
  return data;
});

export const fetchPickupArticles = cache(async (queries: MicroCMSQueries) => {
  const data = await client.get<TPickupListResponse>({
    endpoint: "pickups",
    queries: {
      depth: 2,
      orders: "-publishedAt",
      ...queries,
    },
  });
  return data;
});
