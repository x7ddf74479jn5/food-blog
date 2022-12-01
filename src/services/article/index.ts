import type { MicroCMSQueries } from "microcms-js-sdk";
import { cache } from "react";

import { runReport } from "@/lib/google-analytics/report";
import { fetchArticle, fetchArticles, fetchPickupArticles } from "@/repositories";
import type { TArticle, TPickup, TRankedArticle } from "@/types";
import { combination } from "@/utils";
import { generateImageBlurDataURL } from "@/utils/image";

const makeArticleWithPlaceholderImage = async (article: TArticle) => {
  const blurDataURL = await generateImageBlurDataURL(article.image.url);

  return { ...article, image: { ...article.image, blurDataURL } };
};

export const getArticle = cache(async (id: string, queries?: MicroCMSQueries) => {
  const article = await fetchArticle(id, queries);

  return await makeArticleWithPlaceholderImage(article);
});

export const getArticles = cache(async (queries: MicroCMSQueries) => {
  const res = await fetchArticles(queries);
  const articles: TArticle[] = await Promise.all(res.contents.map(await makeArticleWithPlaceholderImage));

  return { ...res, contents: articles };
});

const buildTagFilterString = (tagIdsList: string[][]) => {
  if (tagIdsList.length < 1) return "";

  const tagFilterString = tagIdsList
    .map((tagIds) => {
      const partial = "(" + tagIds.map((id) => `tags[contains]${id}`).join("[and]") + ")";
      return partial;
    })
    .join("[or]");

  return tagFilterString;
};

export const concatTagGroupThroughCombination = (tagIds: string[]) => {
  const trioTags = Array.from(combination(tagIds, 3));
  const pairTags = Array.from(combination(tagIds, 2));

  return [...trioTags, ...pairTags];
};

export const buildFilterString = (tagIdsList: string[][], excludedArticleId: string) => {
  const tagFilterString = buildTagFilterString(tagIdsList);
  const excludedArticleFilterString = `id[not_equals]${excludedArticleId}`;

  return tagFilterString + "[and]" + excludedArticleFilterString;
};

export const getRelatedArticles = cache(async (article: TArticle, limit = 4) => {
  const tagIds = article.tags.map((tag) => tag.id);
  const tagGroups = concatTagGroupThroughCombination(tagIds);

  if (tagGroups.length === 0) return [];

  const filters = buildFilterString(tagGroups, article.id);
  const resArticles = (await fetchArticles({ filters })).contents;
  const descByRelevance = resArticles.slice(0, limit);
  const finalArticles = await Promise.all(descByRelevance.map(makeArticleWithPlaceholderImage));

  return finalArticles;
});

export const getPickupArticles = cache(async (date: Date = new Date()) => {
  const _date = date.toISOString();
  const filters = `startDate[less_than]${_date}[and]endDate[greater_than]${_date}`;
  const limit = 1;
  const res = await fetchPickupArticles({ filters, limit });
  const pickup: TPickup = res.contents[limit - 1];
  const finalArticles: TArticle[] = await Promise.all(pickup.articles.map(makeArticleWithPlaceholderImage));

  return { ...pickup, articles: finalArticles };
});

export const getPopularArticles = cache(async () => {
  const report = await runReport();

  if (!report || report.length === 0) return [];

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
});
