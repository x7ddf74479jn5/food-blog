// @jest-environment node
import { mockArticles } from "mocks/data";
import { server } from "mocks/msw/server";
import { rest } from "msw";
import { testApiHandler } from "next-test-api-route-handler";

import * as ArticleService from "@/services/article";

import handler from ".";

jest.mock("@/services/article");

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("src/pages/api/preview", () => {
  const params = {
    handler,
    url: "/api/preview",
  };

  describe("GET", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    //  FiXME: res.setPreviewData
    //  Error: invariant: invalid previewModeId
    test.skip("307", async () => {
      jest.spyOn(ArticleService, "getArticle").mockImplementationOnce(async () => ({
        ...mockArticles.stock,
        image: { ...mockArticles.stock.image, blurDataURL: "" },
      }));
      const mockApi = rest.get(
        `https://food-blog.microcms.io/api/v1/articles/${mockArticles.stock.id}`,
        (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mockArticles.stock));
        }
      );

      server.use(mockApi);
      await testApiHandler({
        ...params,
        params: { draftKey: "draft", id: mockArticles.stock.id },
        test: async ({ fetch }) => {
          const res = await fetch({ method: "GET" });
          expect(res.status).toEqual(307);
          await expect(res.text).resolves.toEqual("Preview mode enabled");
        },
      });
    });

    test("400: missing draftKey", async () => {
      await testApiHandler({
        ...params,
        params: { id: mockArticles.stock.id },
        test: async ({ fetch }) => {
          const res = await fetch({});
          expect(res.status).toEqual(400);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Bad Request",
          });
        },
      });
    });

    test("400: missing id", async () => {
      await testApiHandler({
        ...params,
        params: { draftKey: "draft" },
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toEqual(400);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Bad Request",
          });
        },
      });
    });

    test("404", async () => {
      const mockApi = rest.get(`https://food-blog.microcms.io/api/v1/articles/:id`, (_req, res, ctx) => {
        return res(ctx.status(404));
      });

      server.use(mockApi);

      await testApiHandler({
        ...params,
        params: { draftKey: "draft", id: "id" },
        test: async ({ fetch }) => {
          expect(fetch()).rejects.toThrow();
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
