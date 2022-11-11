import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles, mockTags } from "@mocks/data";
import type { NextRouter } from "jest/test-utils";
import { render, renderHook, screen, withMockedRouter } from "jest/test-utils";

import { formatPageTitle } from "@/utils/formatter";

import { Search, useQueryOption } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/search", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockTagList = Object.values(mockTags);
  const mockRouter: Partial<NextRouter> = {
    query: {
      q: "keyword",
    },
  };

  it("OK: 初期レンダリング", () => {
    render(
      withMockedRouter(
        mockRouter,
        <Search
          tags={mockTagList}
          categories={mockCategoryList}
          config={mockConfig}
          pickup={mockPickup}
          popularArticles={mockPopularArticles}
        />
      )
    );

    const expectedHeading = `検索結果：keyword`;
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });

  describe("useQueryOption", () => {
    it("OK: タグで検索したときのクエリが正しい", () => {
      const query = { tags: mockArticles.stock.tags.map((tag) => tag.id).join(",") };

      const { current } = renderHook(() => useQueryOption(query)).result;

      expect(current.filters).toEqual("tags[contains]11[and]tags[contains]9[and]tags[contains]8");
    });

    it("OK: カテゴリーで検索したときのクエリが正しい", () => {
      const query = { category: mockArticles.stock.category.id };

      const { current } = renderHook(() => useQueryOption(query)).result;

      expect(current.filters).toEqual(`categories[equals]${mockCategories.rice.id}`);
    });

    it("OK: 複数のフィルターを組み合わせたときのクエリが正しい", () => {
      const query = {
        category: mockArticles.stock.category.id,
        q: "基本の",
        tags: mockArticles.stock.tags.map((tag) => tag.id).join(","),
      };

      const { current } = renderHook(() => useQueryOption(query)).result;

      expect(current.q).toBe("基本の");
      expect(current.filters).toBe("categories[equals]1[and]tags[contains]11[and]tags[contains]9[and]tags[contains]8");
    });
  });
});
