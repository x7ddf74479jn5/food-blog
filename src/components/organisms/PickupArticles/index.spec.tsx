import { mockArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { PickupArticles } from ".";

describe("components/organisms/PickupArticles", () => {
  const mockArticleList = Object.values(mockArticles);
  describe("記事がある", () => {
    it("snapshot", () => {
      const tree = renderer.create(<PickupArticles pickupArticles={mockArticleList} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PickupArticles pickupArticles={mockArticleList} />);

      expect(container).toHaveTextContent("PICKUP");
      const articles = screen.getAllByRole("article");
      expect(articles.length).toBe(mockArticleList.length);
    });
  });

  describe("記事がない", () => {
    it("snapshot", () => {
      const tree = renderer.create(<PickupArticles pickupArticles={[]} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("OK: 初期表示が正しい", () => {
      const { container } = render(<PickupArticles pickupArticles={[]} />);

      expect(container).toHaveTextContent("PICKUP");
      expect(container).toHaveTextContent("おすすめ記事は見つかりませんでした");
      const articles = screen.queryAllByRole("article");
      expect(articles.length).toBe(0);
    });
  });
});
