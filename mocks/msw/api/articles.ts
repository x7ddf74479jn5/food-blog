import { mockArticles } from "@mocks/data";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

import type { TArticle } from "@/types";

const searchArticlesByQ = (q: string): TArticle[] => {
  return Object.values(mockArticles).filter((article) => {
    const json = JSON.stringify(article);
    return json.includes(q);
  });
};

export const mockGetArticles: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const apiKey = req.headers.get("X-API-KEY");

  if (!apiKey) {
    res(ctx.status(400, "Invalid X-API-KEY"));
  }

  const q = req.url.searchParams.get("q");
  const limit = req.url.searchParams.get("limit") ?? 5;
  const offset = Number(req.url.searchParams.get("offset")) ?? 0;
  let articles: TArticle[] = [];

  if (q) {
    articles = searchArticlesByQ(q).slice(offset, Number(limit));
    return res(
      ctx.status(200),
      ctx.json({
        contents: articles,
        totalCount: articles.length,
        offset: offset,
        limit: limit,
      })
    );
  }

  articles = Object.values(mockArticles).slice(offset, Number(limit));

  return res(
    ctx.status(200),
    ctx.json({
      contents: articles,
      totalCount: articles.length,
      offset: offset,
      limit: limit,
    })
  );
};

const findArticle = (id: string): TArticle | undefined => {
  return Object.values(mockArticles).find((article) => article.id === id);
};

export const mockGetArticle: ResponseResolver<RestRequest, RestContext> = async (req, res, ctx) => {
  const apiKey = req.headers.get("X-API-KEY");

  if (!apiKey) {
    res(ctx.status(400, "Invalid X-API-KEY"));
  }

  const id = String(req.params.id);
  const article = findArticle(id);

  return res(ctx.status(200), ctx.json(article));
};
