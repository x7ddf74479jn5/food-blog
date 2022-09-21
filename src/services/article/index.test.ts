import { mockArticles } from "@mocks/data";
import { server } from "mocks/msw/server";

import { buildTagPairsFilter, buildTagTriosFilter } from "@/services/article";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("getTagFilters", () => {
  const tomatoSalad = mockArticles.tomatoSalad;
  const ohitashi = mockArticles.ohitashi;

  it("OK: 2ペアのタググループを作る", () => {
    const filters = buildTagPairsFilter(tomatoSalad.tags, [tomatoSalad.id]);
    expect(filters).toBe(
      "(tags[contains]10[and]tags[contains]7)[or](tags[contains]10[and]tags[contains]12)[or](tags[contains]7[and]tags[contains]12)[and]id[not_equals]mm8oec5icb"
    );
  });

  it("OK: 3ペアのタググループを作る", () => {
    const filters = buildTagTriosFilter(tomatoSalad.tags, [tomatoSalad.id]);

    expect(filters).toBe("(tags[contains]10[and]tags[contains]7[and]tags[contains]12)[and]id[not_equals]mm8oec5icb");
  });

  it("OK: 3ペアを作れる記事が存在しない", () => {
    const filters = buildTagTriosFilter(ohitashi.tags, [ohitashi.id]);
    expect(filters).toBe("");
  });

  it("OK: 除外する記事が含まれない", () => {
    const filters1 = buildTagPairsFilter(ohitashi.tags, [ohitashi.id]);
    expect(filters1).toBe("(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3y-w7i75kmd");
    const filters2 = buildTagPairsFilter(ohitashi.tags, [ohitashi.id, tomatoSalad.id]);
    expect(filters2).toBe(
      "(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3y-w7i75kmd[and]id[not_equals]mm8oec5icb"
    );
  });
});
