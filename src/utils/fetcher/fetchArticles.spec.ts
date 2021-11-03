import { mockArticles } from "@mocks/data";
import { server } from "mocks/msw/server";

import { fetchArticle, fetchArticles } from ".";
import { getTagFilters } from "./fetchArticles";

beforeAll(() => server.listen());
afterAll(() => server.close());

// FIXME: sdkとnextをアップグレードしたら壊れた
// serviceDomain or endpoint may be wrong.
// Details: FetchError: request to https://food-blog.microcms.io/api/v1/articles failed, reason: Invalid character in header field name

describe.skip("utils/fetcher/fetchArticles", () => {
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

  describe("getTagFilters", () => {
    it("OK: 2ペアのタググループを作る", () => {
      const filters = getTagFilters(mockArticles.tomatoSalad, "pairs");
      expect(filters).toBe(
        "(tags[contains]10[and]tags[contains]7)[or](tags[contains]10[and]tags[contains]12)[or](tags[contains]7[and]tags[contains]12)[and]id[not_equals]2"
      );
    });

    it("OK: 3ペアのタググループを作る", () => {
      const filters = getTagFilters(mockArticles.tomatoSalad, "trios");
      expect(filters).toBe("(tags[contains]10[and]tags[contains]7[and]tags[contains]12)[and]id[not_equals]2");
    });

    it("OK: 3ペアを作れる記事が存在しない", () => {
      const filters = getTagFilters(mockArticles.ohitashi, "trios");
      expect(filters).toBe("id[not_equals]3");
    });

    it("OK: 除外する記事が含まれない", () => {
      const filters1 = getTagFilters(mockArticles.ohitashi, "pairs", []);
      expect(filters1).toBe("(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3");
      const filters2 = getTagFilters(mockArticles.ohitashi, "pairs", [mockArticles.tomatoSalad]);
      expect(filters2).toBe("(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3[and]id[not_equals]2");
    });
  });
});
