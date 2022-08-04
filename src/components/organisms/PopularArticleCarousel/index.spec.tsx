import { mockPopularArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

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
  it("snapshot", () => {
    const tree = renderer.create(<PopularArticleCarousel articles={mockPopularArticles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期表示が正しい", () => {
    const { container } = render(<PopularArticleCarousel articles={mockPopularArticles} />);
    expect(container).toHaveTextContent("POPULAR");
    expect(container).toHaveTextContent("人気記事ランキング");
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(mockPopularArticles.length);
  });
});
