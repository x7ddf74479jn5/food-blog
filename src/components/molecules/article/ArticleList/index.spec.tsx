import { mockArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import ArticleList from ".";

describe("components/molecules/article/ArticleList", () => {
  const mockArticleList = Object.values(mockArticles);

  it("OK: 表示が正しい", () => {
    render(<ArticleList articles={mockArticleList} />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(mockArticleList.length);
  });
});
