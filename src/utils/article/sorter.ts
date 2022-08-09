import isAfter from "date-fns/isAfter";
import isEqual from "date-fns/isEqual";

import type { TArticle, TComparatorArticle } from "../../types/index";

export type ComparatorArticle = (a: TArticle, b: TArticle) => number;

/** 記事を日付降順で並べ替える comparator */
export const comparatorDateDesc = (a: TArticle, b: TArticle) => {
  if (!a.publishedAt || !b.publishedAt) return 0;
  const dateA = new Date(a.publishedAt);
  const dateB = new Date(b.publishedAt);

  if (isEqual(dateA, dateB)) return 0;
  return isAfter(dateA, dateB) ? -1 : 1;
};

/** 記事を日付昇順で並べ替える comparator */
export const comparatorDateAsc = (a: TArticle, b: TArticle) => -comparatorDateDesc(a, b);

/** 記事を slug 昇順で並べ替える comparator */
export const comparatorSlugAsc = (a: TArticle, b: TArticle) => a.id.localeCompare(b.id);

/**
 * 記事を指定の comparator で並べ替え、新しい配列を返す
 * @param articles 記事
 */
export const sortArticles = (articles: TArticle[], comparator: TComparatorArticle) => {
  return articles.slice().sort(comparator);
};

/**
 * 記事を日付降順で並べ替え、新しい配列を返す
 * @param articles 記事
 */
export const sortTArticlesByDateDesc = (articles: TArticle[]) => {
  return articles.slice().sort(comparatorDateDesc);
};
