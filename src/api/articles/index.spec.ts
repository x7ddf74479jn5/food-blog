// @jest-environment node

import { mockArticles } from "mocks/data";
import { server } from "mocks/msw/server";
import { rest } from "msw";
import { testApiHandler } from "next-test-api-route-handler";

import type { TArticleListResponse } from "@/types";

import handler from ".";

beforeAll(() => server.listen());
afterAll(() => server.close());

jest.mock("@/utils/image", () => {
  const generateImageBlurDataURL = jest.fn((_src) => "blurDataURL");
  return { generateImageBlurDataURL };
});

describe("src/pages/api/articles", () => {
  const params = {
    handler,
    url: "/api/articles",
  };

  describe("GET", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    test("200", async () => {
      const mockArticleList = Object.values(mockArticles);
      const mockFetchArticlesReturn = {
        contents: mockArticleList,
        limit: 10,
        offset: 0,
        totalCount: 4,
      } as unknown as TArticleListResponse;

      const mockApi = rest.get(`https://food-blog.microcms.io/api/v1/articles`, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockFetchArticlesReturn));
      });

      server.use(mockApi);

      await testApiHandler({
        ...params,
        params: { filters: "filters", limit: "10", offset: "0", q: "" },
        test: async ({ fetch }) => {
          const res = await fetch({ method: "GET" });
          expect(res.status).toEqual(200);
          await expect(res.json()).resolves.toStrictEqual(mockFetchArticlesReturn);
        },
      });
    });
  });

  describe("PUT", () => {
    test("405", async () => {
      await testApiHandler({
        ...params,
        test: async ({ fetch }) => {
          const res = await fetch({ method: "PUT" });
          await expect(res.json()).resolves.toStrictEqual({
            message: "Method Not Allowed",
          });
        },
      });
    });
  });
});
