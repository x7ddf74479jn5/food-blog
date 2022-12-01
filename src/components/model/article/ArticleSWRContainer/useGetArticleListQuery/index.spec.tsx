import { renderHook } from "@testing-library/react";
import { withMockRouter } from "jest/test-utils";
import { mockArticles } from "mocks/data";
import type { NextRouter } from "next/router";
import * as useSWRInfinite from "swr/infinite";

import { apiRoute } from "@/utils/paths/url";

import useGetArticleListQuery from ".";

let spyUseSWRInfinite: jest.SpyInstance;
let spyMutate: jest.SpyInstance;

beforeAll(() => {
  spyUseSWRInfinite = jest.spyOn(useSWRInfinite, "default");
  spyMutate = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("model/article/ArticleSWRContainer/useGetArticleListQuery", () => {
  const q = encodeURIComponent("作り方");
  const params = new URLSearchParams({ q });

  const Wrapper: React.ComponentType<{ children: React.ReactNode; router?: Partial<NextRouter> }> = ({ children }) => {
    return withMockRouter(<>{children}</>, { context: { searchParams: params } });
  };

  // 4 * 3 articles
  const mockArticleList = [
    ...Object.values(mockArticles),
    ...Object.values(mockArticles),
    ...Object.values(mockArticles),
  ];

  it("OK: useSWRInfiniteが呼び出される", () => {
    const { result, unmount } = renderHook(() => useGetArticleListQuery({}), {
      wrapper: Wrapper,
    });

    expect(result).toBeTruthy();
    expect(spyUseSWRInfinite).toBeCalledTimes(1);
    unmount();
  });

  describe("OK: APIの結果が正しい", () => {
    const limit = 10;
    const mockSetSize = jest.fn();
    const offset = 0;
    beforeEach(() => {
      spyUseSWRInfinite.mockImplementationOnce((getKey) => {
        let size = 0;
        getKey(size, null);
        size++;

        return {
          data: [
            {
              contents: mockArticleList.slice(offset, offset + limit),
              limit,
              offset,
              totalCount: mockArticleList.length,
            },
          ],
          mutate: spyMutate,
          setSize: mockSetSize,
          size,
        };
      });
    });

    it("default", () => {
      const args = {
        fallbackData: undefined,
        queries: undefined,
      };

      const { result } = renderHook(() => useGetArticleListQuery(args), {
        wrapper: Wrapper,
      });

      const { articles, getCurrentKey, hasNextPage, paginate, revalidate } = result.current;

      expect(spyUseSWRInfinite).toBeCalledTimes(1);
      const key = getCurrentKey();
      const expectedKey = `${apiRoute.apiArticles}?limit=${limit}&pageIndex=0`;
      expect(key).toBe(expectedKey);

      expect(articles).toStrictEqual(mockArticleList.slice(0, 10));
      expect(hasNextPage).toBeTruthy();

      paginate();
      expect(mockSetSize).toBeCalledWith(2);

      revalidate();
      expect(spyMutate).toHaveBeenCalledTimes(1);
    });

    it("custom", () => {
      const args = {
        fallbackData: undefined,
        queries: { q },
      };

      const { result } = renderHook(() => useGetArticleListQuery(args), {
        wrapper: Wrapper,
      });
      const { articles, getCurrentKey, hasNextPage, paginate, revalidate } = result.current;

      expect(spyUseSWRInfinite).toBeCalledTimes(1);
      const key = getCurrentKey();
      const expectedKey = `${apiRoute.apiArticles}?limit=${limit}&q=${encodeURIComponent(q)}&pageIndex=0`;
      expect(key).toBe(expectedKey);

      expect(articles).toStrictEqual(mockArticleList.slice(0, 10));
      expect(hasNextPage).toBeTruthy();

      paginate();
      expect(mockSetSize).toBeCalledWith(2);

      revalidate();
      expect(spyMutate).toHaveBeenCalledTimes(1);
    });
  });

  describe("OK: keyとarticlesの対応が正しい", () => {
    it("1st: 取得数/総取得数/総記事数 10/10/12", () => {
      const limit = 10;
      const mockSetSize = jest.fn();
      const offset = 0;

      spyUseSWRInfinite.mockImplementationOnce((getKey) => {
        let size = 0;
        getKey(size, null);
        size++;

        return {
          data: [
            {
              contents: mockArticleList.slice(0, 10),
              limit,
              offset,
              totalCount: mockArticleList.length,
            },
          ],
          setSize: mockSetSize,
          size,
        };
      });

      const { result } = renderHook(() => useGetArticleListQuery({}), {
        wrapper: Wrapper,
      });
      const { articles, getCurrentKey, hasNextPage } = result.current;

      const key = getCurrentKey();
      const expectedKey = `${apiRoute.apiArticles}?limit=${limit}&pageIndex=0`;
      expect(key).toBe(expectedKey);
      expect(articles).toStrictEqual(mockArticleList.slice(0, 10));
      expect(hasNextPage).toBeTruthy();
    });

    it("2nd: 取得数/総取得数/総記事数 2/12/12", () => {
      const limit = 10;
      const mockSetSize = jest.fn();
      let offset = 10;
      spyUseSWRInfinite.mockImplementation((getKey) => {
        let size = 1;
        getKey(size, { contents: mockArticleList.slice(0, 10), limit, offset });
        size++;
        offset += limit;

        return {
          data: [
            {
              contents: mockArticleList.slice(0, 10),
              limit,
              offset: 0,
              totalCount: mockArticleList.length,
            },
            {
              contents: mockArticleList.slice(10, 12),
              limit,
              offset: 10,
              totalCount: mockArticleList.length,
            },
          ],
          setSize: mockSetSize,
          size,
        };
      });

      const { result } = renderHook(() => useGetArticleListQuery({}), {
        wrapper: Wrapper,
      });
      const { articles, getCurrentKey, hasNextPage } = result.current;

      const key = getCurrentKey();
      const expectedKey = `${apiRoute.apiArticles}?limit=${limit}&offset=${offset}&pageIndex=1`;
      expect(key).toBe(expectedKey);
      expect(articles).toStrictEqual(mockArticleList.slice(0, 12));
      expect(hasNextPage).toBeFalsy();
    });

    it("3rd 取得数/総取得数/総記事数 0/12/12", () => {
      const limit = 10;
      const mockSetSize = jest.fn();
      let offset = 12;
      spyUseSWRInfinite.mockImplementation((getKey) => {
        const size = 2;
        getKey(size, { contents: mockArticleList.slice(2, 4), limit, offset });
        offset += limit;

        return {
          data: [
            {
              contents: mockArticleList.slice(0, 10),
              limit,
              offset: 0,
              totalCount: mockArticleList.length,
            },
            {
              contents: mockArticleList.slice(10, 12),
              limit,
              offset: 10,
              totalCount: mockArticleList.length,
            },
            {
              contents: [],
              limit,
              offset: 12,
              totalCount: mockArticleList.length,
            },
          ],
          setSize: mockSetSize,
          size,
        };
      });

      const { result } = renderHook(() => useGetArticleListQuery({}), {
        wrapper: Wrapper,
      });
      const { articles, getCurrentKey, hasNextPage } = result.current;

      const key = getCurrentKey();
      const expectedKey = `${apiRoute.apiArticles}?limit=${limit}&offset=${offset}&pageIndex=2`;
      expect(key).toBe(expectedKey);
      expect(articles).toStrictEqual(mockArticleList.slice(0, 12));
      expect(hasNextPage).toBeFalsy();
    });
  });
});
