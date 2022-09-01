// @jest-environment node

import { mockArticles } from "mocks/data";
import { server } from "mocks/msw/server";
import { testApiHandler } from "next-test-api-route-handler";

import * as fetchArticles from "@/api/fetchArticles";
import type { TArticleListResponse } from "@/types";

import handler from "./index.page";

jest.mock("@/api/fetchArticles");

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("src/pages/api/posts/index.test.ts", () => {
  const params = {
    handler,
    url: "/api/articles",
  };

  describe("GET", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    test("200", async () => {
      const mockArticleList = Object.values(mockArticles);
      const mockFetchArticlesReturn = { contents: mockArticleList } as unknown as TArticleListResponse;

      jest.spyOn(fetchArticles, "fetchArticles").mockImplementationOnce(async () => mockFetchArticlesReturn);

      await testApiHandler({
        ...params,
        params: { limit: "10", offset: "0", filters: "filters" },
        test: async ({ fetch }) => {
          const res = await fetch({ method: "GET" });
          expect(res.status).toEqual(200);
          await expect(res.json()).resolves.toStrictEqualmockFetchArticlesReturn;
        },
      });
    });

    test("400", async () => {
      await testApiHandler({
        ...params,
        params: {},
        test: async ({ fetch }) => {
          const res = await fetch({});
          expect(res.status).toEqual(400);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Bad Request",
          });
        },
      });
    });

    test("404", async () => {
      await testApiHandler({
        ...params,
        params: { limit: "10", offset: "0", filters: "filters" },
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toEqual(404);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Not Found",
          });
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
