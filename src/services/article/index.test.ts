import { mockArticles } from "@mocks/data";
import { server } from "mocks/msw/server";

import { getTagFilters } from "@/services/article";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("getTagFilters", () => {
  it("OK: 2ペアのタググループを作る", () => {
    const filters = getTagFilters(mockArticles.tomatoSalad, "pairs");
    expect(filters).toBe(
      "(tags[contains]10[and]tags[contains]7)[or](tags[contains]10[and]tags[contains]12)[or](tags[contains]7[and]tags[contains]12)[and]id[not_equals]mm8oec5icb"
    );
  });

  it("OK: 3ペアのタググループを作る", () => {
    const filters = getTagFilters(mockArticles.tomatoSalad, "trios");
    expect(filters).toBe("(tags[contains]10[and]tags[contains]7[and]tags[contains]12)[and]id[not_equals]mm8oec5icb");
  });

  it("OK: 3ペアを作れる記事が存在しない", () => {
    const filters = getTagFilters(mockArticles.ohitashi, "trios");
    expect(filters).toBe("");
  });

  it("OK: 除外する記事が含まれない", () => {
    const filters1 = getTagFilters(mockArticles.ohitashi, "pairs", []);
    expect(filters1).toBe("(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3y-w7i75kmd");
    const filters2 = getTagFilters(mockArticles.ohitashi, "pairs", [mockArticles.tomatoSalad]);
    expect(filters2).toBe(
      "(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3y-w7i75kmd[and]id[not_equals]mm8oec5icb"
    );
  });
});
