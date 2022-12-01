import { mockArticles } from "mocks/data";
import { server } from "mocks/msw/server";

import { fetchArticle, fetchArticles } from "..";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("repositories/article", () => {
  const testArticles = Object.values(mockArticles);

  describe("fetchArticles", () => {
    it("OK: 全件取得", async () => {
      const data = await fetchArticles();
      const { contents, totalCount } = data;
      expect(contents).toStrictEqual(testArticles);
      expect(totalCount).toBe(testArticles.length);
    });

    it("OK: qを含む記事が存在する", async () => {
      const data = await fetchArticles({ q: "出汁" });
      const { contents, totalCount } = data;
      expect(contents).toStrictEqual([mockArticles.stock]);
      expect(totalCount).toBe(1);
    });

    it("OK: qを含む記事が存在しない", async () => {
      const data = await fetchArticles({ q: "lorem ipsum" });
      const { contents, totalCount } = data;
      expect(contents).toStrictEqual([]);
      expect(totalCount).toBe(0);
    });

    it("OK: qが空欄の場合は全件取得", async () => {
      const data = await fetchArticles({ q: "" });
      const { contents, totalCount } = data;
      expect(contents).toStrictEqual(testArticles);
      expect(totalCount).toBe(testArticles.length);
    });

    it("OK: limit以内の件数を取得する", async () => {
      const data1 = await fetchArticles({ limit: 1 });
      const { totalCount: totalCount1 } = data1;
      expect(totalCount1).toBe(1);

      const data2 = await fetchArticles({ limit: 0 });
      const { totalCount: totalCount2 } = data2;
      expect(totalCount2).toBe(0);

      const data3 = await fetchArticles({ limit: 2 });
      const { totalCount: totalCount3 } = data3;
      expect(totalCount3).toBe(2);
    });

    it("OK: offset以降のdataを取得する", async () => {
      const data1 = await fetchArticles({ offset: 0 });
      const { totalCount: totalCount1 } = data1;
      expect(totalCount1).toBe(testArticles.length);

      const data2 = await fetchArticles({ offset: 1 });
      const { totalCount: totalCount2 } = data2;
      expect(totalCount2).toBe(testArticles.length - 1);

      const data3 = await fetchArticles({ offset: testArticles.length });
      const { totalCount: totalCount3 } = data3;
      expect(totalCount3).toBe(0);
    });
  });

  describe("fetchArticle", () => {
    it("OK: 1件取得", async () => {
      const data = await fetchArticle(mockArticles.stock.id);
      expect(data).toStrictEqual(mockArticles.stock);
    });
    it("NG: 存在しないid", async () => {
      await expect(async () => await fetchArticle("invalid_id")).rejects.toThrow();
    });
  });
});
