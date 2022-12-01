import { render, screen } from "jest/test-utils";
import { mockArticles } from "mocks/data";

import { RelatedArticles } from ".";

describe("components/model/article/RelatedArticles", () => {
  const { stock, tomatoSalad } = mockArticles;

  describe("記事がある", () => {
    it("OK: 初期表示が正しい", async () => {
      const { container } = render(await RelatedArticles({ thisArticle: tomatoSalad }));

      expect(container).toHaveTextContent("関連レシピ");
      const articleImages = screen.getAllByRole("img");
      expect(articleImages.length).toBe(1);
    });
  });

  describe("記事がない", () => {
    it("OK: 初期表示が正しい", async () => {
      const { container } = render(await RelatedArticles({ thisArticle: stock }));

      expect(container).toHaveTextContent("関連レシピ");
      expect(container).toHaveTextContent("関連するレシピは見つかりませんでした");
      const articleImages = screen.queryAllByRole("img");
      expect(articleImages.length).toBe(0);
    });
  });
});
