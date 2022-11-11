import type { TArticle, TComparatorArticle } from "@/types";

import { comparatorDateDesc, sortArticles } from "./sorter";
/**
 * 対象の記事に類似している記事を返す
 * @param src 当該記事
 * @param articles 検索対象の記事
 * @param count ピックアップする数
 */
export const getRelatedTArticles = (src: TArticle, articles: TArticle[], count = 4) => {
  // 現状は、タグの一致度のみを見て返す
  return getRelatedTArticlesByTags(src, articles, count);
};

/**
 * 対象の記事につけられたタグを、より多く含んでいる記事を順序付けて返す
 * @param src 当該記事
 * @param articles 検索対象の記事
 * @param count ピックアップする数
 */
export const getRelatedTArticlesByTags = (src: TArticle, articles: TArticle[], count: number) => {
  return articles
    .filter((a) => a.id !== src.id) // 自分と同じ記事は外す
    .map((article) => {
      // タグの一致数を数える
      const matchedTagCount = article.tags.reduce(
        (count, t) => (src.tags.some((tt) => tt === t) ? count + 1 : count),
        0
      );
      return { article, matchedTagCount };
    })
    .filter((a) => a.matchedTagCount) // 1つ以上タグがマッチしているものだけを対象にする
    .sort((a, b) => b.matchedTagCount - a.matchedTagCount) // マッチ数で並べ替える
    .slice(0, count) // ピックアップ数ぶんで絞る
    .map((s) => s.article); // TArticle だけ返す
};

/**
 * 対象の記事の、前の記事と次の記事を返す
 * @param src 当該記事
 * @param articles 検索対象の記事（並べ替えはしなくて良い）
 */
export const getPrevAndNextTArticle = (
  src: TArticle,
  articles: TArticle[],
  comparator?: TComparatorArticle
): { prevTArticle: TArticle | null; nextTArticle: TArticle | null } => {
  const articlesOrderByDate = sortArticles(articles, comparator ?? comparatorDateDesc);
  const articleIndex = articlesOrderByDate.findIndex((a) => a.id === src.id);
  if (articleIndex < 0) return { nextTArticle: null, prevTArticle: null };

  const prevTArticle = articlesOrderByDate[articleIndex - 1] ?? null;
  const nextTArticle = articlesOrderByDate[articleIndex + 1] ?? null;
  return { nextTArticle, prevTArticle };
};
