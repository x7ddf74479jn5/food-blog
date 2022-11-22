import { render, screen } from "jest/test-utils";
import { mockArticles } from "mocks/data";

import { ArticleItem } from ".";

describe("components/article/ArticleItem", () => {
  const mockArticleStock = mockArticles.stock;

  it("OK: 表示が正しい", () => {
    render(<ArticleItem article={mockArticleStock} />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent(mockArticleStock.title);
    const description = screen.getByText(mockArticleStock.description);
    expect(description).toBeInTheDocument();
  });

  it("OK: リンクが正しい", () => {
    render(<ArticleItem article={mockArticleStock} />);
    const anchors = screen.getAllByRole("link");
    anchors.forEach((anchor) => expect(anchor).toHaveAttribute("href", `/articles/${mockArticleStock.id}`));
  });
});
