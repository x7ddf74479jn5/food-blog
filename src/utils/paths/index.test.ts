import { getBackLinks, urlTable } from "./url";

describe("utils/url:getBackLinks", () => {
  it("「レシピ一覧」「カテゴリー別一覧」「タグ別一覧」のバックリンクが取得できる", () => {
    const paths = [urlTable.home, urlTable.categories, urlTable.tags] as Parameters<typeof getBackLinks>[0];
    const result = getBackLinks(paths);
    const expected = [
      { href: "/", label: "レシピ一覧へ" },
      { href: "/articles/categories", label: "カテゴリー別一覧へ" },
      { href: "/articles/tags", label: "タグ別一覧へ" },
    ];
    expect(result).toStrictEqual(expected);
  });
});
