import { mockArticles } from "@mocks/data";
import type { RenderResult } from "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react-hooks";
import { withMockedRouter } from "jest/test-utils";
import type { NextRouter } from "next/router";
import { SWRConfig } from "swr";
import * as useSWRInfinite from "swr/infinite";

import { apiRoute } from "@/utils/paths/url";

import useGetArticleListQuery from ".";

let spyUseSWRInfinite: jest.SpyInstance;
let spyMutate: jest.SpyInstance;

beforeAll(() => {
  spyUseSWRInfinite = jest.spyOn(useSWRInfinite, "default");
  // spyMutate = jest.spyOn(swr, "mutate");
  spyMutate = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("hooks/useGetArticleListQuery", () => {
  const q = "作り方";
  const endpoint = apiRoute.apiArticles;
  const router: Partial<NextRouter> = {
    query: { q },
  };
  const Wrapper: React.ComponentType<{ children: React.ReactNode; router: Partial<NextRouter> }> = ({ children }) => {
    return withMockedRouter(
      router,
      <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>
    );
  };
  let renderResult: RenderResult<ReturnType<typeof useGetArticleListQuery>>;
  // 4 * 3 articles
  const mockArticleList = [
    ...Object.values(mockArticles),
    ...Object.values(mockArticles),
    ...Object.values(mockArticles),
  ];

  it("OK: useSWRInfiniteが呼び出される", () => {
    const { result, unmount } = renderHook(() => useGetArticleListQuery({ endpoint }), {
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
      spyUseSWRInfinite.mockImplementationOnce((getKey, _fetcher, _options) => {
        let size = 0;
        getKey(size, null);
        size++;

        return {
          mutate: spyMutate,
          size,
          setSize: mockSetSize,
          data: [
            {
              contents: mockArticleList.slice(offset, offset + limit),
              totalCount: mockArticleList.length,
              offset,
              limit,
            },
          ],
        };
      });
    });

    it("default", () => {
      const args = {
        endpoint,
        getKeyOptions: undefined,
        fetcher: undefined,
        fallbackData: undefined,
        options: undefined,
      };

      const { result } = renderHook(() => useGetArticleListQuery(args), {
        wrapper: Wrapper,
      });
      renderResult = result;
      const { getCurrentKey, articles, hasNextPage, paginate, revalidate } = renderResult.current;

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
        endpoint,
        getKeyOptions: { q },
        fetcher: undefined,
        fallbackData: undefined,
        options: undefined,
      };

      const { result } = renderHook(() => useGetArticleListQuery(args), {
        wrapper: Wrapper,
      });
      renderResult = result;
      const { getCurrentKey, articles, hasNextPage, paginate, revalidate } = renderResult.current;

      expect(spyUseSWRInfinite).toBeCalledTimes(1);
      const key = getCurrentKey();
      const expectedKey = `${apiRoute.apiArticles}?limit=${limit}&q=${q}&pageIndex=0`;
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
          size,
          setSize: mockSetSize,
          data: [
            {
              contents: mockArticleList.slice(0, 10),
              totalCount: mockArticleList.length,
              offset,
              limit,
            },
          ],
        };
      });

      const { result } = renderHook(() => useGetArticleListQuery({ endpoint }), {
        wrapper: Wrapper,
      });
      renderResult = result;
      const { getCurrentKey, articles, hasNextPage } = renderResult.current;

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
        getKey(size, { contents: mockArticleList.slice(0, 10), offset, limit });
        size++;
        offset += limit;

        return {
          size,
          setSize: mockSetSize,
          data: [
            {
              contents: mockArticleList.slice(0, 10),
              totalCount: mockArticleList.length,
              offset: 0,
              limit,
            },
            {
              contents: mockArticleList.slice(10, 12),
              totalCount: mockArticleList.length,
              offset: 10,
              limit,
            },
          ],
        };
      });

      const { result } = renderHook(() => useGetArticleListQuery({ endpoint }), {
        wrapper: Wrapper,
      });
      renderResult = result;
      const { getCurrentKey, articles, hasNextPage } = renderResult.current;

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
        getKey(size, { contents: mockArticleList.slice(2, 4), offset, limit });
        offset += limit;

        return {
          size,
          setSize: mockSetSize,
          data: [
            {
              contents: mockArticleList.slice(0, 10),
              totalCount: mockArticleList.length,
              offset: 0,
              limit,
            },
            {
              contents: mockArticleList.slice(10, 12),
              totalCount: mockArticleList.length,
              offset: 10,
              limit,
            },
            {
              contents: [],
              totalCount: mockArticleList.length,
              offset: 12,
              limit,
            },
          ],
        };
      });

      const { result } = renderHook(() => useGetArticleListQuery({ endpoint }), {
        wrapper: Wrapper,
      });
      renderResult = result;
      const { getCurrentKey, articles, hasNextPage } = renderResult.current;

      const key = getCurrentKey();
      const expectedKey = `${apiRoute.apiArticles}?limit=${limit}&offset=${offset}&pageIndex=2`;
      expect(key).toBe(expectedKey);
      expect(articles).toStrictEqual(mockArticleList.slice(0, 12));
      expect(hasNextPage).toBeFalsy();
    });
  });
});
