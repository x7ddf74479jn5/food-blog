import { mockPickup } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { PickupArticleCarousel } from ".";

describe("components/organisms/PickupArticleCarousel", () => {
  const { articles } = mockPickup;

  it("OK: 初期表示が正しい", () => {
    render(<PickupArticleCarousel pickup={mockPickup} />);

    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });
});
