import { rest } from "msw";

import { mockGetArticle, mockGetArticles } from "./api/articles";
import { mockGetCategories } from "./api/categories";
import { mockGetConfig } from "./api/configs";
import { mockGetAnalyticsReport } from "./api/google-analytics";
import { mockGetPickups } from "./api/pickups";
import { mockGetTags } from "./api/tags";

const API_HOST = "https://food-blog.microcms.io/api/v1";
const GA_ENDPOINT = "https://analyticsdata.googleapis.com/v1beta/properties/293317598:runReport";

export const handlers = [
  rest.get(`${API_HOST}/articles`, mockGetArticles),
  rest.get(`${API_HOST}/articles/:id`, mockGetArticle),
  rest.get(`${API_HOST}/categories`, mockGetCategories),
  rest.get(`${API_HOST}/tags`, mockGetTags),
  rest.get(`${API_HOST}/configs`, mockGetConfig),
  rest.get(`${API_HOST}/pickups`, mockGetPickups),
  rest.get(GA_ENDPOINT, mockGetAnalyticsReport),
];
