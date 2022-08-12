import { mockPickup, mockPopularArticles } from "@mocks/data";
import { fireEvent, render, screen } from "jest/test-utils";

import { CarouselContainer } from ".";

jest.mock("react-slick", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn((args) => {
      return <div>{args.children}</div>;
    }),
  };
});

describe("components/organisms/CarouselContainer", () => {
  const { description, articles } = mockPickup;

  it("OK: PICKUP(4)と人気記事(4)のとき初期表示が正しい", () => {
    const { container, getByRole } = render(
      <CarouselContainer pickup={mockPickup} popularArticles={mockPopularArticles} />
    );
    expect(container).toHaveTextContent("PICKUP");
    expect(container).toHaveTextContent("POPULAR");
    expect(container).toHaveTextContent(description);
    expect(getByRole("tab", { name: "PICKUP" })).toHaveAttribute("aria-selected", "true");
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });

  it("OK: PICKUP(4)と人気記事(0)のとき初期表示が正しい", () => {
    const { container } = render(<CarouselContainer pickup={mockPickup} popularArticles={[]} />);
    expect(container).toHaveTextContent("PICKUP");
    expect(container).not.toHaveTextContent("POPULAR");
    expect(container).toHaveTextContent(description);
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });

  it("OK: PICKUP(0)と人気記事(4)のとき初期表示が正しい", () => {
    const { container } = render(<CarouselContainer pickup={undefined} popularArticles={mockPopularArticles} />);
    expect(container).not.toHaveTextContent("PICKUP");
    expect(container).toHaveTextContent("POPULAR");
    expect(container).toHaveTextContent("人気記事ランキング");
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });

  it("OK: PICKUP(0)と人気記事(0)のとき初期表示が正しい", () => {
    const { container } = render(<CarouselContainer pickup={undefined} popularArticles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("OK: タブクリックでコンテンツが切り替わる", () => {
    const { getByRole } = render(<CarouselContainer pickup={mockPickup} popularArticles={mockPopularArticles} />);

    expect(getByRole("tab", { name: "PICKUP" })).toHaveAttribute("aria-selected", "true");

    fireEvent.click(getByRole("tab", { name: "POPULAR" }));

    expect(getByRole("tab", { name: "POPULAR" })).toHaveAttribute("aria-selected", "true");
  });
});
