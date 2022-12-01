import { renderHook } from "@testing-library/react";
import type { AppRouterInstance } from "jest/test-utils";
import { withMockRouter } from "jest/test-utils";
import { mockArticles, mockCategories } from "mocks/data";

import { useNewSearchQueries, useSelectQueries } from ".";

describe("useNewSearchQueries", () => {
  it("OK: タグで検索したときのクエリが正しい", () => {
    const params = new URLSearchParams({ tags: mockArticles.stock.tags.map((tag) => tag.id).join(",") });
    const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<AppRouterInstance> }> = ({
      children,
    }) => {
      return withMockRouter(<>{children}</>, { context: { searchParams: params } });
    };
    const { current } = renderHook(() => useNewSearchQueries(), { wrapper: Wrapper }).result;

    expect(current.filters).toEqual("tags[contains]11[and]tags[contains]9[and]tags[contains]8");
  });

  it("OK: カテゴリーで検索したときのクエリが正しい", () => {
    const params = new URLSearchParams({ category: mockArticles.stock.category.id });
    const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<AppRouterInstance> }> = ({
      children,
    }) => {
      return withMockRouter(<>{children}</>, { context: { searchParams: params } });
    };
    const { current } = renderHook(() => useNewSearchQueries(), { wrapper: Wrapper }).result;

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
    const { current } = renderHook(() => useNewSearchQueries(), { wrapper: Wrapper }).result;

    expect(current.q).toBe("基本の");
    expect(current.filters).toBe("categories[equals]1[and]tags[contains]11[and]tags[contains]9[and]tags[contains]8");
  });
});

describe("useSelectQueries", () => {
  const params = new URLSearchParams({
    category: mockArticles.stock.category.id,
    q: "基本の",
    tags: mockArticles.stock.tags.map((tag) => tag.id).join(","),
  });
  it("パスが/search以外のときはprerenderのためのクエリを形成する", () => {
    const queryOptions = { filters: `category[equals]${mockCategories.rice.id}` };
    const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<AppRouterInstance> }> = ({
      children,
    }) => {
      return withMockRouter(<>{children}</>, { context: { pathname: "/articles", searchParams: params } });
    };
    const { current } = renderHook(() => useSelectQueries(queryOptions), { wrapper: Wrapper }).result;

    expect(current).toStrictEqual(queryOptions);
  });

  it("パスが/searchのときは新規検索用のクエリを形成する", () => {
    const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<AppRouterInstance> }> = ({
      children,
    }) => {
      return withMockRouter(<>{children}</>, { context: { pathname: "/search", searchParams: params } });
    };
    const { current } = renderHook(() => useSelectQueries(), { wrapper: Wrapper }).result;

    const expected = {
      filters: "categories[equals]1[and]tags[contains]11[and]tags[contains]9[and]tags[contains]8",
      q: "基本の",
    };
    expect(current).toStrictEqual(expected);
  });
});
