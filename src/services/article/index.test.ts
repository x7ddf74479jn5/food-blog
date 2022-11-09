import { mockArticles, mockTags } from "@mocks/data";

import { buildFilterString, concatTagsThroughCombination } from ".";

describe("getRelatedArticles", () => {
  const tomatoSalad = mockArticles.tomatoSalad;
  const ohitashi = mockArticles.ohitashi;

  it("OK: トマトサラダの記事は3ペアのタググループを1つ、2ペアのタググループを2つ作る", () => {
    const result = concatTagsThroughCombination(tomatoSalad.tags);
    expect(result).toStrictEqual([
      [mockTags.tomato, mockTags.onion, mockTags.ooba],
      [mockTags.tomato, mockTags.onion],
      [mockTags.tomato, mockTags.ooba],
      [mockTags.onion, mockTags.ooba],
    ]);
  });

  it("OK: 油揚げと小松菜のタグを含み、おひたしのidを除外するフィルターを作る", () => {
    const result = buildFilterString([[mockTags.aburaage, mockTags.komatsuna]], ohitashi.id);
    expect(result).toStrictEqual("(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3y-w7i75kmd");
  });
});
