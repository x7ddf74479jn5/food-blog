import { mockCategories } from "mocks/data";
import { server } from "mocks/msw/server";

import { fetchCategories, fetchCategory } from ".";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("utils/fetcher/fetchCategories", () => {
  const testCategories = Object.values(mockCategories);

  describe("fetchCategories", () => {
    it("OK: 全件取得", async () => {
      const categories = await fetchCategories();
      expect(categories).toStrictEqual(testCategories);
    });
  });

  describe("fetchCategory", () => {
    it("OK: 単コンテンツ取得", async () => {
      const category = await fetchCategory(mockCategories.rice.slug);
      expect(category).toStrictEqual(mockCategories.rice);
    });

    it("NG: 存在しないslugなら空配列", async () => {
      const category = await fetchCategory("invalid_slug");
      expect(category).toStrictEqual([]);
    });
  });
});
