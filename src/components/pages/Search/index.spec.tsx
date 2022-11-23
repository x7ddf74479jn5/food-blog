import type { AppRouterInstance } from "jest/test-utils";
import { render, renderHook, screen, withMockRouter } from "jest/test-utils";
import { mockArticles, mockCategories, mockConfig } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { Search } from ".";
import { useQueryOption } from "./Search.client";

describe("pages/search", () => {
  const params = new URLSearchParams({ q: "keyword" });

  it("OK: 初期レンダリング", async () => {
    render(withMockRouter(await Search(), { context: { searchParams: params } }));

    const expectedHeading = `検索結果：keyword`;
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });

  describe("useQueryOption", () => {
    it("OK: タグで検索したときのクエリが正しい", () => {
      const params = new URLSearchParams({ tags: mockArticles.stock.tags.map((tag) => tag.id).join(",") });
      const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<AppRouterInstance> }> = ({
        children,
      }) => {
        return withMockRouter(<>{children}</>, { context: { searchParams: params } });
      };
      const { current } = renderHook(() => useQueryOption(), { wrapper: Wrapper }).result;

      expect(current.filters).toEqual("tags[contains]11[and]tags[contains]9[and]tags[contains]8");
    });

    it("OK: カテゴリーで検索したときのクエリが正しい", () => {
      const params = new URLSearchParams({ category: mockArticles.stock.category.id });
      const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<AppRouterInstance> }> = ({
        children,
      }) => {
        return withMockRouter(<>{children}</>, { context: { searchParams: params } });
      };
      const { current } = renderHook(() => useQueryOption(), { wrapper: Wrapper }).result;

      expect(current.filters).toEqual(`categories[equals]${mockCategories.rice.id}`);
    });

    it("OK: 複数のフィルターを組み合わせたときのクエリが正しい", () => {
      const params = new URLSearchParams({
        category: mockArticles.stock.category.id,
        q: "基本の",
        tags: mockArticles.stock.tags.map((tag) => tag.id).join(","),
      });
      const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<AppRouterInstance> }> = ({
        children,
      }) => {
        return withMockRouter(<>{children}</>, { context: { searchParams: params } });
      };
      const { current } = renderHook(() => useQueryOption(), { wrapper: Wrapper }).result;

      expect(current.q).toBe("基本の");
      expect(current.filters).toBe("categories[equals]1[and]tags[contains]11[and]tags[contains]9[and]tags[contains]8");
    });
  });
});
