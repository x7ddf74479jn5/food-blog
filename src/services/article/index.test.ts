import { mockArticles, mockTags } from "@mocks/data";

import { buildFilterString, concatTagGroupThroughCombination } from ".";

describe("getRelatedArticles", () => {
  const tomatoSalad = mockArticles.tomatoSalad;
  const ohitashi = mockArticles.ohitashi;

  it("OK: トマトサラダの記事は3ペアのタググループを1つ、2ペアのタググループを2つ作る", () => {
    const tagIds = tomatoSalad.tags.map((tag) => tag.id);
    const result = concatTagGroupThroughCombination(tagIds);
    expect(result).toStrictEqual([
      [mockTags.tomato.id, mockTags.onion.id, mockTags.ooba.id],
      [mockTags.tomato.id, mockTags.onion.id],
      [mockTags.tomato.id, mockTags.ooba.id],
      [mockTags.onion.id, mockTags.ooba.id],
    ]);
  });

  it("OK: 油揚げと小松菜のタグを含み、おひたしのidを除外するフィルターを作る", () => {
    const result = buildFilterString([[mockTags.aburaage.id, mockTags.komatsuna.id]], ohitashi.id);
    expect(result).toStrictEqual("(tags[contains]6[and]tags[contains]1)[and]id[not_equals]3y-w7i75kmd");
  });
});
