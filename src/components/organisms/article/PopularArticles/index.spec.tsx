import { mockArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { PopularArticles } from ".";

describe("components/organisms/PopularArticles", () => {
  const mockArticleList = Object.values(mockArticles).map((article, index) => ({ ...article, order: ++index }));
  describe("記事がある", () => {
    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PopularArticles popularArticles={mockArticleList} />);

      expect(container).toHaveTextContent("人気レシピ");
      const articleImages = screen.getAllByRole("img");
      expect(articleImages.length).toBe(mockArticleList.length);
    });
  });

  describe("記事がない", () => {
    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PopularArticles popularArticles={[]} />);

      expect(container).toHaveTextContent("人気レシピ");
      expect(container).toHaveTextContent("レシピは見つかりませんでした");
      const articleImages = screen.queryAllByRole("img");
      expect(articleImages.length).toBe(0);
    });
  });
});
