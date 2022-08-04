import { mockArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import ArticleList from "../ArticleList";

describe("components/molecules/ArticleList", () => {
  const mockArticleList = Object.values(mockArticles);
  it("snapshot", () => {
    const tree = renderer.create(<ArticleList articles={mockArticleList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 表示が正しい", () => {
    render(<ArticleList articles={mockArticleList} />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(mockArticleList.length);
  });
});
