import { render, screen } from "jest/test-utils";
import { mockArticles } from "mocks/data";

import { PickupArticles } from ".";

describe("components/organisms/PickupArticles", () => {
  const mockArticleList = Object.values(mockArticles);
  describe("記事がある", () => {
    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PickupArticles pickupArticles={mockArticleList} />);

      expect(container).toHaveTextContent("PICKUP");
      const articleImages = screen.getAllByRole("img");
      expect(articleImages.length).toBe(mockArticleList.length);
    });
  });

  describe("記事がない", () => {
    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PickupArticles pickupArticles={[]} />);

      expect(container).toHaveTextContent("PICKUP");
      expect(container).toHaveTextContent("おすすめ記事は見つかりませんでした");
      const articles = screen.queryAllByRole("article");
      expect(articles.length).toBe(0);
    });
  });
});
