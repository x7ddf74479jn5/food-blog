import { render, screen } from "jest/test-utils";
import { mockArticles } from "mocks/data";

import { RelatedArticles } from ".";

describe("components/organisms/RelatedArticles", () => {
  const mockArticleList = Object.values(mockArticles);
  describe("記事がある", () => {
    it("OK: 初期表示が正しい", () => {
      const { container } = render(<RelatedArticles relatedArticles={mockArticleList} />);

      expect(container).toHaveTextContent("関連レシピ");
      const articleImages = screen.getAllByRole("img");
      expect(articleImages.length).toBe(mockArticleList.length);
    });
  });

  describe("記事がない", () => {
    it("OK: 初期表示が正しい", () => {
      const { container } = render(<RelatedArticles relatedArticles={[]} />);

      expect(container).toHaveTextContent("関連レシピ");
      expect(container).toHaveTextContent("関連するレシピは見つかりませんでした");
      const articleImages = screen.queryAllByRole("img");
      expect(articleImages.length).toBe(0);
    });
  });
});
