import { client } from "@/lib/client";
import type { TArticle, TArticleListResponse, TTag } from "@/types";
import { HttpError } from "@/utils/error/Http";

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

  const excluded = excludedId ? excludedId.map((id) => `id[not_equals]${id}`) : [];

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

  const excluded = excludedId.map((id) => `id[not_equals]${id}`);

  return [_trios.join("[or]"), excluded].join("[and]");
};

type TFilterType = "pairs" | "trios";

const getTagFilters = (article: TArticle, variant: TFilterType, excluded: TArticle[] = []) => {
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
  try {
    const data = await client.get<TArticleListResponse>({
      endpoint: "articles",
      queries: { filters: filters, limit: 20 },
    });
    return data.contents;
  } catch (error) {
    if (error instanceof HttpError)
      // eslint-disable-next-line no-console
      console.log(error);
    return [];
  }
};

export const getRelatedArticles = async (article: TArticle, limit = 4) => {
  const trios = await fetchRelatedArticles(article, "trios");
  const pairs = await fetchRelatedArticles(article, "pairs", trios);

  return [...trios, ...pairs].slice(0, limit);
};
