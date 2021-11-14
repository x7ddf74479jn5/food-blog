import type { MicroCMSQueries } from "microcms-js-sdk/dist/cjs/types";

import { client } from "@/lib/client";
import type { TArticle, TArticleListResponse, TTag } from "@/types";
import type { TPickupListResponse } from "@/types/pickup";
import { HttpError } from "@/utils/error/Http";

export const fetchArticles = async (queries?: MicroCMSQueries): Promise<TArticleListResponse> => {
  try {
    const data = await client.get<TArticleListResponse>({
      endpoint: "articles",
      queries: queries,
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

/**
 * 走査対象のタグを重複なし2個ずつにグループ化
 *
 * @param {TTag[]} tags 走査対象のタグ
 * @param {string[]} [excludedId=[]] 除外する記事ID
 * @return {string[]} 検索フィルター
 */
const buildTagPairsFilter = (tags: TTag[], excludedId: string[] = []) => {
  const _pairs = [];
  for (let t = 0; t < tags.length; t++) {
    for (let tt = t + 1; tt < tags.length; tt++) {
      _pairs.push(`(tags[contains]${tags[t].id}[and]tags[contains]${tags[tt].id})`);
    }
  }

  const excluded = excludedId.map((id) => `id[not_equals]${id}`).join("[and]");

  if (_pairs.length === 0) return excluded;

  return [_pairs.join("[or]"), excluded].join("[and]");
};

/**
 * 走査対象のタグを重複なし３個ずつにグループ化
 *
 * @param {TTag[]} tags 走査対象のタグ
 * @param {string[]} [excludedId=[]] 除外する記事ID
 * @return {string[]} 検索フィルター
 */
const buildTagTriosFilter = (tags: TTag[], excludedId: string[] = []) => {
  const _trios = [];
  for (let t = 0; t < tags.length; t++) {
    for (let tt = t + 1; tt < tags.length; tt++) {
      for (let ttt = tt + 1; ttt < tags.length; ttt++) {
        _trios.push(`(tags[contains]${tags[t].id}[and]tags[contains]${tags[tt].id}[and]tags[contains]${tags[ttt].id})`);
      }
    }
  }

  const excluded = excludedId.map((id) => `id[not_equals]${id}`).join("[and]");

  if (_trios.length === 0) return excluded;

  return [_trios.join("[or]"), excluded].join("[and]");
};

type TFilterType = "pairs" | "trios";

export const getTagFilters = (article: TArticle, variant: TFilterType, excluded: TArticle[] = []) => {
  // 自身と除外する記事
  const _excludedIds = [article.id, ...excluded.map((article) => article.id)];
  switch (variant) {
    case "pairs": {
      return buildTagPairsFilter(article.tags, _excludedIds);
    }
    case "trios": {
      return buildTagTriosFilter(article.tags, _excludedIds);
    }
    default: {
      throw new Error("Unexpected Error");
    }
  }
};

export const fetchRelatedArticles = async (
  article: TArticle,
  filterType: TFilterType,
  excluded?: TArticle[]
): Promise<TArticle[]> => {
  const filters = getTagFilters(article, filterType, excluded);
  if (!filters) return [];
  return (await fetchArticles({ filters })).contents;
};

export const getRelatedArticles = async (article: TArticle, limit = 4) => {
  const trios = await fetchRelatedArticles(article, "trios");
  const pairs = await fetchRelatedArticles(article, "pairs", trios);

  return [...trios, ...pairs].slice(0, limit);
};

export const fetchPickupArticles = async (date: Date) => {
  const _date = date.toISOString();
  const filters = `startDate[less_than]${_date}[and]endDate[greater_than]${_date}`;
  const limit = 1;
  try {
    const data = await client.get<TPickupListResponse>({
      endpoint: "pickups",
      queries: { limit, orders: "-publishedAt", filters: filters, depth: 2 },
    });
    return data.contents[limit - 1];
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw new Error("記事の取得に失敗しました。");
    }
    throw error;
  }
};
