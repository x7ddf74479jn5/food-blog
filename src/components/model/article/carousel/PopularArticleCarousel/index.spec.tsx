import { render, screen } from "jest/test-utils";
import { mockPopularArticles } from "mocks/data";

import { PopularArticleCarousel } from ".";

describe("components/model/article/carousel/PopularArticleCarousel", () => {
  it("OK: 初期表示が正しい", () => {
    render(<PopularArticleCarousel articles={mockPopularArticles} />);

    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(mockPopularArticles.length);
  });
});
