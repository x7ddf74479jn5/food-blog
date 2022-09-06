import { rest } from "msw";

import { mockGetArticle, mockGetArticles } from "./api/articles";
import { mockGetCategories } from "./api/categories";
import { mockGetConfig } from "./api/configs";
import { mockGetAnalyticsReport } from "./api/google-analytics";
import { mockGetPickups } from "./api/pickups";
import { mockGetTags } from "./api/tags";

const MICROCMS_API_BASE_URL = `https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1`;
const GA_ENDPOINT = "https://analyticsdata.googleapis.com/v1beta/properties/293317598:runReport";

export const handlers = [
  rest.get(`${MICROCMS_API_BASE_URL}/articles`, mockGetArticles),
  rest.get(`${MICROCMS_API_BASE_URL}/articles/:id`, mockGetArticle),
  rest.get(`${MICROCMS_API_BASE_URL}/categories`, mockGetCategories),
  rest.get(`${MICROCMS_API_BASE_URL}/tags`, mockGetTags),
  rest.get(`${MICROCMS_API_BASE_URL}/configs`, mockGetConfig),
  rest.get(`${MICROCMS_API_BASE_URL}/pickups`, mockGetPickups),
  rest.get(GA_ENDPOINT, mockGetAnalyticsReport),
];
