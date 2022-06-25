import type { TArticle, TRankedArticle, TTag } from "@/types";
import { fetchArticles, fetchPickupArticles } from "@/utils/fetcher";
import { runReport } from "@/utils/ga/report";

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

export const getRelatedArticles = async (article: TArticle, limit = 4) => {
  const trios = await fetchArticles({ filters: getTagFilters(article, "trios") });
  const pairs = await fetchArticles({ filters: getTagFilters(article, "trios", trios.contents) });

  return [...trios.contents, ...pairs.contents].slice(0, limit);
};

export const getPickupArticles = async (date: Date) => {
  const _date = date.toISOString();
  const filters = `startDate[less_than]${_date}[and]endDate[greater_than]${_date}`;
  const limit = 1;

  const res = await fetchPickupArticles({ filters, limit });
  const articles = res.contents[limit - 1];

  return articles;
};

export const getPopularArticles = async () => {
  const report = await runReport();

  if (!report) return [];

  const ids = report.map((item) => item.id);
  const filters = ids.map((id) => `contentId[equals]${id}`).join("[or]");
  const limit = 5;

  const res = await fetchArticles({ filters, limit });

  const articles: TRankedArticle[] = res.contents
    .map((article) => {
      const r = report.find((row) => row.id === article.id);

      if (!r) {
        console.error("Mismatch between report and response");
        return { ...article, order: Infinity };
      }

      return { ...article, order: r?.order };
    })
    .sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });

  return articles;
};
