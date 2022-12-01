import { mockTags } from "mocks/data";
import { server } from "mocks/msw/server";

import { fetchTag, fetchTags } from ".";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("utils/fetcher/fetchTags", () => {
  const testTags = Object.values(mockTags);

  describe("fetchTags", () => {
    it("OK: 全件取得", async () => {
      const tags = await fetchTags();
      expect(tags).toStrictEqual(testTags);
    });
  });

  describe("fetchTag", () => {
    it("OK: 単コンテンツ取得", async () => {
      const tag = await fetchTag(mockTags.rice.slug);
      expect(tag).toStrictEqual(mockTags.rice);
    });

    it("NG: 存在しないslugなら空配列", async () => {
      const tag = await fetchTag("invalid_slug");
      expect(tag).toStrictEqual([]);
    });
  });
});
