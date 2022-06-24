import { mockArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { PopularArticles } from ".";

describe("components/organisms/PopularArticles", () => {
  const mockArticleList = Object.values(mockArticles).map((article, index) => ({ ...article, order: ++index }));
  describe("記事がある", () => {
    it("snapshot", () => {
      const tree = renderer.create(<PopularArticles popularArticles={mockArticleList} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PopularArticles popularArticles={mockArticleList} />);

      expect(container).toHaveTextContent("人気レシピ");
      const articles = screen.getAllByRole("article");
      expect(articles.length).toBe(mockArticleList.length);
    });
  });

  describe("記事がない", () => {
    it("snapshot", () => {
      const tree = renderer.create(<PopularArticles popularArticles={[]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PopularArticles popularArticles={[]} />);

      expect(container).toHaveTextContent("人気レシピ");
      expect(container).toHaveTextContent("レシピは見つかりませんでした");
      const articles = screen.queryAllByRole("article");
      expect(articles.length).toBe(0);
    });
  });
});
