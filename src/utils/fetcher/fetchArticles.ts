import type { MicroCMSQueries } from "microcms-js-sdk/dist/cjs/types";

import { client } from "@/lib/client";
import type { TArticle, TArticleListResponse } from "@/types";
import type { TPickupListResponse } from "@/types/pickup";
import { HttpError } from "@/utils/error/Http";

export const fetchArticles = async (queries?: MicroCMSQueries): Promise<TArticleListResponse> => {
  try {
    const data = await client.get<TArticleListResponse>({
      endpoint: "articles",
      queries: { limit: 1000, ...queries },
    });
    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw new Error("記事の取得に失敗しました。");
    }
    throw error;
  }
};

export const fetchArticle = async (id: string, queries?: MicroCMSQueries): Promise<TArticle> => {
  try {
    const data = await client.get<TArticle>({
      endpoint: `articles`,
      contentId: id,
      queries: {
        depth: 2,
        ...queries,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw new Error("記事の取得に失敗しました。");
    }
    throw error;
  }
};

export const fetchPickupArticles = async (queries: MicroCMSQueries) => {
  try {
    const data = await client.get<TPickupListResponse>({
      endpoint: "pickups",
      queries: {
        orders: "-publishedAt",
        depth: 2,
        ...queries,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw new Error("記事の取得に失敗しました。");
    }
    throw error;
  }
};
