import { render, screen } from "jest/test-utils";
import { mockArticles } from "mocks/data";

import { ArticleTipWithThumb, ArticleTipWithThumbList } from ".";

describe("components/model/article/ArticleTipList", () => {
  const mockArticleList = Object.values(mockArticles);
  const mockArticleStock = mockArticles.stock;

  describe("ArticleTipWithThumb", () => {
    it("OK: 表示が正しい", () => {
      render(<ArticleTipWithThumb article={mockArticleStock} />);
      const articleLink = screen.getAllByRole("link")[0];
      expect(articleLink).toHaveAttribute("href", `/articles/${mockArticleStock.id}`);
      const title = screen.getByText(mockArticleStock.title);
      expect(title).toBeInTheDocument();
      mockArticleStock.tags.forEach((tag) => {
        const tagEl = screen.getByText(`#${tag.name}`);
        expect(tagEl).toBeInTheDocument();
      });
    });
  });

  describe("ArticleTipWithThumbList", () => {
    it("OK: 表示が正しい", () => {
      render(<ArticleTipWithThumbList articles={mockArticleList} />);
      const articleImages = screen.getAllByRole("img");
      expect(articleImages.length).toBe(mockArticleList.length);
    });
  });
});
