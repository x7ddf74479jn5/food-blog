import { mockArticles } from "@mocks/data";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

import type { TArticle } from "@/types";

import { findContent, getSearchParams } from "./utils";

const searchArticlesByQ = (q: string): TArticle[] => {
  return Object.values(mockArticles).filter((article) => {
    const json = JSON.stringify(article);
    return json.includes(q);
  });
};

export const mockGetArticles: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const { apiKey, limit, offset, q } = getSearchParams(req);

  if (!apiKey) {
    res(ctx.status(400, "Invalid X_MICROCMS_API_KEY"));
  }

  let articles: TArticle[] = [];

  if (q) {
    articles = searchArticlesByQ(q).slice(offset, Number(limit));
    return res(
      ctx.status(200),
      ctx.json({
        contents: articles,
        limit: limit,
        offset: offset,
        totalCount: articles.length,
      })
    );
  }

  articles = Object.values(mockArticles).slice(offset, Number(limit));

  return res(
    ctx.status(200),
    ctx.json({
      contents: articles,
      limit: limit,
      offset: offset,
      totalCount: articles.length,
    })
  );
};

export const mockGetArticle: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const { apiKey, id } = getSearchParams(req);

  if (!apiKey) {
    res(ctx.status(400, "Invalid X_MICROCMS_API_KEY"));
  }

  const article = findContent<TArticle>(id, mockArticles);

  return res(ctx.status(200), ctx.json(article));
};
