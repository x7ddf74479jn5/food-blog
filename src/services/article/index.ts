import type { MicroCMSQueries } from "microcms-js-sdk";

import { fetchArticle, fetchArticles, fetchPickupArticles } from "@/api";
import { runReport } from "@/lib/google-analytics/report";
import type { TArticle, TPickup, TRankedArticle, TTag } from "@/types";
import { generateImageBlurDataURL } from "@/utils/image";

const makeArticleWithPlaceholderImage = async (article: TArticle) => {
  const blurDataURL = await generateImageBlurDataURL(article.image.url);

  return { ...article, image: { ...article.image, blurDataURL } };
};

export const getArticle = async (id: string, queries?: MicroCMSQueries) => {
  const article = await fetchArticle(id, queries);

  return await makeArticleWithPlaceholderImage(article);
};

export const getArticles = async (queries: MicroCMSQueries) => {
  const res = await fetchArticles(queries);
  const articles: TArticle[] = await Promise.all(res.contents.map(await makeArticleWithPlaceholderImage));

  return { ...res, contents: articles };
};

/**
 * 走査対象のタグを重複なし2個ずつにグループ化
 *
 * @param {TTag[]} tags 走査対象のタグ
 * @param {string[]} [excludedId=[]] 除外する記事ID
 * @return {string[]} 検索フィルター
 */
export const buildTagPairsFilter = (tags: TTag[], excludedId: string[] = []) => {
  const _pairs = [];
  for (let t = 0; t < tags.length; t++) {
    for (let tt = t + 1; tt < tags.length; tt++) {
      _pairs.push(`(tags[contains]${tags[t].id}[and]tags[contains]${tags[tt].id})`);
    }
  }

  const excluded = excludedId.map((id) => `id[not_equals]${id}`).join("[and]");

  if (_pairs.length === 0) return "";

  return [_pairs.join("[or]"), excluded].join("[and]");
};

/**
 * 走査対象のタグを重複なし３個ずつにグループ化
 *
 * @param {TTag[]} tags 走査対象のタグ
 * @param {string[]} [excludedId=[]] 除外する記事ID
 * @return {string[]} 検索フィルター
 */
export const buildTagTriosFilter = (tags: TTag[], excludedId: string[] = []) => {
  const _trios = [];
  for (let t = 0; t < tags.length; t++) {
    for (let tt = t + 1; tt < tags.length; tt++) {
      for (let ttt = tt + 1; ttt < tags.length; ttt++) {
        _trios.push(`(tags[contains]${tags[t].id}[and]tags[contains]${tags[tt].id}[and]tags[contains]${tags[ttt].id})`);
      }
    }
  }

  const excluded = excludedId.map((id) => `id[not_equals]${id}`).join("[and]");

  if (_trios.length === 0) return "";

  return [_trios.join("[or]"), excluded].join("[and]");
};

export const getRelatedArticles = async (article: TArticle, limit = 4) => {
  const trioTagFilter = buildTagTriosFilter(article.tags, [article.id]);
  const trios = trioTagFilter ? await (await fetchArticles({ filters: trioTagFilter })).contents : [];
  const pairTagFilter = buildTagPairsFilter(article.tags, [article.id, ...trios.map((article) => article.id)]);
  const pairs = pairTagFilter ? (await fetchArticles({ filters: pairTagFilter })).contents : [];
  const combinedArticles = [...trios, ...pairs].slice(0, limit);
  const finalArticles = await Promise.all(combinedArticles.map(makeArticleWithPlaceholderImage));

  return finalArticles;
};

export const getPickupArticles = async (date: Date) => {
  const _date = date.toISOString();
  const filters = `startDate[less_than]${_date}[and]endDate[greater_than]${_date}`;
  const limit = 1;

  const res = await fetchPickupArticles({ filters, limit });
  const pickup: TPickup = res.contents[limit - 1];

  const finalArticles: TArticle[] = await Promise.all(pickup.articles.map(makeArticleWithPlaceholderImage));

  return { ...pickup, articles: finalArticles };
};

export const getPopularArticles = async () => {
  const report = await runReport();

  if (!report) return [];

  const ids = report.map((item) => item.id);
  const filters = ids.map((id) => `contentId[equals]${id}`).join("[or]");
  const limit = 5;

  const res = await fetchArticles({ filters, limit });

  const articles: TArticle[] = await Promise.all(res.contents.map(makeArticleWithPlaceholderImage));

  const sortedArticles: TRankedArticle[] = articles
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

  return sortedArticles;
};
