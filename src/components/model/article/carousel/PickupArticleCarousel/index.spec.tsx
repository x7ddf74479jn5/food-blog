import { render, screen } from "jest/test-utils";
import { mockPickup } from "mocks/data";

import { PickupArticleCarousel } from ".";

describe("components/model/article/carousel/PickupArticleCarousel", () => {
  const { articles } = mockPickup;

  it("OK: 初期表示が正しい", () => {
    render(<PickupArticleCarousel pickup={mockPickup} />);

    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });
});
