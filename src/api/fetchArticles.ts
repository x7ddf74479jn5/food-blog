import type { MicroCMSQueries } from "microcms-js-sdk";

import { client } from "@/lib/microcms";
import type { TArticle, TArticleListResponse } from "@/types";
import type { TPickupListResponse } from "@/types/models/pickup";

export const fetchArticles = async (queries?: MicroCMSQueries): Promise<TArticleListResponse> => {
  const data = await client.get<TArticleListResponse>({
    endpoint: "articles",
    queries: { limit: 1000, ...queries },
  });
  return data;
};

export const fetchArticle = async (id: string, queries?: MicroCMSQueries): Promise<TArticle> => {
  const data = await client.get<TArticle>({
    endpoint: `articles`,
    contentId: id,
    queries: {
      depth: 2,
      ...queries,
    },
  });
  return data;
};

export const fetchPickupArticles = async (queries: MicroCMSQueries) => {
  const data = await client.get<TPickupListResponse>({
    endpoint: "pickups",
    queries: {
      orders: "-publishedAt",
      depth: 2,
      ...queries,
    },
  });
  return data;
};
