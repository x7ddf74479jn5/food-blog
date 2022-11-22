import { fireEvent, render, screen } from "jest/test-utils";
import { mockPickup, mockPopularArticles } from "mocks/data";

import { composeCarouselItems } from "@/components/pages/Home";

import { CarouselContainer } from ".";

describe("components/organisms/CarouselContainer", () => {
  const { articles, description } = mockPickup;

  it("OK: PICKUP(4)と人気記事(4)のとき初期表示が正しい", () => {
    const items = composeCarouselItems({ pickup: mockPickup, popularArticles: mockPopularArticles });
    const { container, getByRole } = render(<CarouselContainer items={items} />);

    expect(container).toHaveTextContent("PICKUP");
    expect(container).toHaveTextContent("POPULAR");
    expect(container).toHaveTextContent(description);
    expect(getByRole("tab", { name: "PICKUP" })).toHaveAttribute("aria-selected", "true");
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });

  it("OK: PICKUP(4)と人気記事(0)のとき初期表示が正しい", () => {
    const items = composeCarouselItems({ pickup: mockPickup, popularArticles: [] });
    const { container } = render(<CarouselContainer items={items} />);

    expect(container).toHaveTextContent("PICKUP");
    expect(container).not.toHaveTextContent("POPULAR");
    expect(container).toHaveTextContent(description);
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });

  it("OK: PICKUP(0)と人気記事(4)のとき初期表示が正しい", () => {
    const items = composeCarouselItems({ pickup: undefined, popularArticles: mockPopularArticles });
    const { container } = render(<CarouselContainer items={items} />);

    expect(container).not.toHaveTextContent("PICKUP");
    expect(container).toHaveTextContent("POPULAR");
    expect(container).toHaveTextContent("人気記事ランキング");
    const articleEls = screen.getAllByRole("article");
    expect(articleEls.length).toBe(articles.length);
  });

  it("OK: PICKUP(0)と人気記事(0)のとき初期表示が正しい", () => {
    const items = composeCarouselItems({ pickup: undefined, popularArticles: [] });
    const { container } = render(<CarouselContainer items={items} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("OK: タブクリックでコンテンツが切り替わる", () => {
    const items = composeCarouselItems({ pickup: mockPickup, popularArticles: mockPopularArticles });
    const { getByRole } = render(<CarouselContainer items={items} />);

    expect(getByRole("tab", { name: "PICKUP" })).toHaveAttribute("aria-selected", "true");

    fireEvent.click(getByRole("tab", { name: "POPULAR" }));

    expect(getByRole("tab", { name: "POPULAR" })).toHaveAttribute("aria-selected", "true");
  });
});
