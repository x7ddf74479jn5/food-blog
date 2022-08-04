import { mockArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { RelatedArticles } from ".";

describe("components/organisms/RelatedArticles", () => {
  const mockArticleList = Object.values(mockArticles);
  describe("記事がある", () => {
    it("snapshot", () => {
      const tree = renderer.create(<RelatedArticles relatedArticles={mockArticleList} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期表示が正しい", () => {
      const { container } = render(<RelatedArticles relatedArticles={mockArticleList} />);

      expect(container).toHaveTextContent("関連レシピ");
      const articles = screen.getAllByRole("article");
      expect(articles.length).toBe(mockArticleList.length);
    });
  });

  describe("記事がない", () => {
    it("snapshot", () => {
      const tree = renderer.create(<RelatedArticles relatedArticles={[]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期表示が正しい", () => {
      const { container } = render(<RelatedArticles relatedArticles={[]} />);

      expect(container).toHaveTextContent("関連レシピ");
      expect(container).toHaveTextContent("関連するレシピは見つかりませんでした");
      const articles = screen.queryAllByRole("article");
      expect(articles.length).toBe(0);
    });
  });
});
