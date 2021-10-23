import { rest } from "msw";

import { mockGetArticle, mockGetArticles } from "./api/articles";
import { mockGetCategories } from "./api/categories";
import { mockGetConfig } from "./api/configs";
import { mockGetTags } from "./api/tags";

const API_HOST = process.env.API_HOST;

export const handlers = [
  rest.get(`${API_HOST}/articles`, mockGetArticles),
  rest.get(`${API_HOST}/articles/:id`, mockGetArticle),
  rest.get(`${API_HOST}/categories`, mockGetCategories),
  rest.get(`${API_HOST}/tags`, mockGetTags),
  rest.get(`${API_HOST}/configs`, mockGetConfig),
];
