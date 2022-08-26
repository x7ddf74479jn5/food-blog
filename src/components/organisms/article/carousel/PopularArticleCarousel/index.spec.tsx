import { mockPopularArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { PopularArticleCarousel } from ".";

jest.mock("react-slick", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn((args) => {
      return <div>{args.children}</div>;
    }),
  };
});

describe("components/organisms/PopularArticleCarousel", () => {
  it("OK: 初期表示が正しい", () => {
    render(<PopularArticleCarousel articles={mockPopularArticles} />);

    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(mockPopularArticles.length);
  });
});
