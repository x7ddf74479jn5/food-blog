import { render, screen } from "jest/test-utils";
import { mockArticles } from "mocks/data";

import { ArticleList } from ".";

describe("components/model/article/ArticleSWRContainer/ArticleList", () => {
  const mockArticleList = Object.values(mockArticles);

  it("OK: 表示が正しい", () => {
    render(<ArticleList articles={mockArticleList} />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(mockArticleList.length);
  });
});
