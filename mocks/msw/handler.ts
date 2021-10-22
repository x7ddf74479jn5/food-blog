import { rest } from "msw";

import { mockGetArticle, mockGetArticles } from "./api/articles";

const API_HOST = process.env.API_HOST;

export const handlers = [
  rest.get(`${API_HOST}/articles`, mockGetArticles),
  rest.get(`${API_HOST}/articles/:id`, mockGetArticle),
];
