import { mockPopularArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { PopularArticleCarousel } from ".";

describe("components/organisms/PopularArticleCarousel", () => {
  it("OK: 初期表示が正しい", () => {
    render(<PopularArticleCarousel articles={mockPopularArticles} />);

    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(mockPopularArticles.length);
  });
});
